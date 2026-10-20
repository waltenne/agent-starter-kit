import fs from "fs";
import path from "path";

const SECRET_PATTERNS = [
  /BEGIN [A-Z ]+ KEY/g,
  /AKIA[0-9A-Z]{16}/g,
  /gh[pousr]_[A-Za-z0-9]{20,}/g,
  /sk-[A-Za-z0-9]{20,}/g,
  /(?:password|passwd|secret|token|apikey|api_key)\s*[:=]\s*["']?([^"'\s]+)["']?/gi
];

export function sanitizeText(text) {
  let sanitized = text;
  sanitized = sanitized.replace(/BEGIN [A-Z ]+ KEY/g, "[REDACTED_KEY]");
  sanitized = sanitized.replace(/AKIA[0-9A-Z]{16}/g, "[REDACTED_AWS_KEY]");
  sanitized = sanitized.replace(/gh[pousr]_[A-Za-z0-9]{20,}/g, "[REDACTED_GITHUB_TOKEN]");
  sanitized = sanitized.replace(/sk-[A-Za-z0-9]{20,}/g, "[REDACTED_API_KEY]");
  sanitized = sanitized.replace(/(password|passwd|secret|token|apikey|api_key)\s*([:=])\s*(["']?)[^"'\s]+(\3)/gi, "$1$2$3[REDACTED]$3");
  return sanitized;
}

export function collectLogs(logFilePath, options = {}) {
  const maxLines = options.max || 100;
  const fullPath = path.resolve(logFilePath);

  if (!fs.existsSync(fullPath)) {
    return { status: "error", data: null, errors: [`Log file not found: ${logFilePath}`] };
  }

  const raw = fs.readFileSync(fullPath, "utf-8");
  const lines = raw.split("\n").filter(Boolean);

  const errorMap = new Map();
  let errorCount = 0;
  let warnCount = 0;

  for (const line of lines) {
    const isError = /error|fatal|fail|exception/i.test(line);
    const isWarn = /warn/i.test(line);

    if (isError) {
      errorCount++;
      const cleaned = sanitizeText(line.trim().substring(0, 200));
      errorMap.set(cleaned, (errorMap.get(cleaned) || 0) + 1);
    } else if (isWarn) {
      warnCount++;
    }
  }

  const topErrors = Array.from(errorMap.entries())
    .map(([msg, count]) => ({ message: msg, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const sanitizedTail = lines.slice(-maxLines).map(sanitizeText);

  return {
    status: "ok",
    data: {
      totalLines: lines.length,
      errorCount,
      warnCount,
      topErrors,
      recentTail: sanitizedTail
    },
    warnings: [],
    errors: []
  };
}

