import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const IGNORED_DIRS = new Set([".git", "node_modules", "dist", "build", "target", "vendor", ".next", ".cache"]);

export function findText(targetDir = process.cwd(), query = "", options = {}) {
  const dir = path.resolve(targetDir);
  const maxResults = options.max || 50;
  const results = [];

  if (!query) {
    return { status: "error", data: { matches: [] }, errors: ["Query parameter is required"] };
  }

  // Tenta git grep se dentro de git repo
  if (fs.existsSync(path.join(dir, ".git"))) {
    try {
      const output = execSync(`git grep -n -I --fixed-strings "${query.replace(/"/g, '\\"')}"`, {
        cwd: dir,
        stdio: ["ignore", "pipe", "ignore"],
        maxBuffer: 10 * 1024 * 1024
      }).toString();

      for (const line of output.split("\n")) {
        if (!line.trim() || results.length >= maxResults) break;
        const firstColon = line.indexOf(":");
        const secondColon = line.indexOf(":", firstColon + 1);
        if (firstColon !== -1 && secondColon !== -1) {
          const file = line.substring(0, firstColon);
          const lineNum = parseInt(line.substring(firstColon + 1, secondColon), 10);
          const snippet = line.substring(secondColon + 1).trim();
          results.push({ file, line: lineNum, snippet });
        }
      }

      return {
        status: "ok",
        data: {
          query,
          type: "text",
          totalMatches: results.length,
          truncated: results.length >= maxResults,
          matches: results
        },
        warnings: [],
        errors: []
      };
    } catch {
      // Se git grep falhar (ex: código de saída 1 quando nada for encontrado), cai no fallback ou retorna vazio
    }
  }

  // Fallback recursivo nativo
  function scan(currentDir) {
    if (results.length >= maxResults) return;
    let entries;
    try {
      entries = fs.readdirSync(currentDir, { withFileTypes: true });
    } catch {
      return;
    }

    for (const entry of entries) {
      if (results.length >= maxResults) break;
      if (entry.isDirectory()) {
        if (!IGNORED_DIRS.has(entry.name)) {
          scan(path.join(currentDir, entry.name));
        }
      } else if (entry.isFile()) {
        const fullPath = path.join(currentDir, entry.name);
        try {
          const content = fs.readFileSync(fullPath, "utf-8");
          if (content.includes(query)) {
            const lines = content.split("\n");
            lines.forEach((lineText, idx) => {
              if (lineText.includes(query) && results.length < maxResults) {
                results.push({
                  file: path.relative(dir, fullPath),
                  line: idx + 1,
                  snippet: lineText.trim().substring(0, 150)
                });
              }
            });
          }
        } catch {}
      }
    }
  }

  scan(dir);

  return {
    status: "ok",
    data: {
      query,
      type: "text",
      totalMatches: results.length,
      truncated: results.length >= maxResults,
      matches: results
    },
    warnings: [],
    errors: []
  };
}

export function findFile(targetDir = process.cwd(), pattern = "", options = {}) {
  const dir = path.resolve(targetDir);
  const maxResults = options.max || 50;
  const results = [];

  function scan(currentDir) {
    if (results.length >= maxResults) return;
    let entries;
    try {
      entries = fs.readdirSync(currentDir, { withFileTypes: true });
    } catch {
      return;
    }

    for (const entry of entries) {
      if (results.length >= maxResults) break;
      if (entry.isDirectory()) {
        if (!IGNORED_DIRS.has(entry.name)) {
          scan(path.join(currentDir, entry.name));
        }
      } else if (entry.isFile()) {
        if (!pattern || entry.name.toLowerCase().includes(pattern.toLowerCase())) {
          results.push(path.relative(dir, path.join(currentDir, entry.name)));
        }
      }
    }
  }

  scan(dir);

  return {
    status: "ok",
    data: {
      pattern,
      type: "file",
      totalMatches: results.length,
      truncated: results.length >= maxResults,
      matches: results
    },
    warnings: [],
    errors: []
  };
}

export function findSymbol(targetDir = process.cwd(), symbol = "", options = {}) {
  const dir = path.resolve(targetDir);
  const maxResults = options.max || 50;
  const results = [];
  const symbolRegex = new RegExp(`\\b(function|class|interface|type|enum|const|let|var|fn|struct|def)\\s+${symbol}\\b`, "i");

  function scan(currentDir) {
    if (results.length >= maxResults) return;
    let entries;
    try {
      entries = fs.readdirSync(currentDir, { withFileTypes: true });
    } catch {
      return;
    }

    for (const entry of entries) {
      if (results.length >= maxResults) break;
      if (entry.isDirectory()) {
        if (!IGNORED_DIRS.has(entry.name)) {
          scan(path.join(currentDir, entry.name));
        }
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name);
        if ([".js", ".ts", ".jsx", ".tsx", ".rs", ".py", ".mjs", ".cjs"].includes(ext)) {
          const fullPath = path.join(currentDir, entry.name);
          try {
            const content = fs.readFileSync(fullPath, "utf-8");
            const lines = content.split("\n");
            lines.forEach((lineText, idx) => {
              if (symbolRegex.test(lineText) && results.length < maxResults) {
                results.push({
                  file: path.relative(dir, fullPath),
                  line: idx + 1,
                  declaration: lineText.trim()
                });
              }
            });
          } catch {}
        }
      }
    }
  }

  scan(dir);

  return {
    status: "ok",
    data: {
      symbol,
      type: "symbol",
      totalMatches: results.length,
      truncated: results.length >= maxResults,
      matches: results
    },
    warnings: [],
    errors: []
  };
}

