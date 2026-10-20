import fs from "fs";
import path from "path";
import { execSync } from "child_process";

export function checkDbHealth(dbPath) {
  if (!dbPath) {
    return { status: "error", data: null, errors: ["Database path is required"] };
  }

  const fullPath = path.resolve(dbPath);
  if (!fs.existsSync(fullPath)) {
    return { status: "error", data: null, errors: [`Database file not found: ${dbPath}`] };
  }

  const stat = fs.statSync(fullPath);
  const result = {
    path: path.basename(fullPath),
    sizeBytes: stat.size,
    isSqlite: false,
    integrity: "unknown",
    tables: []
  };

  // Verifica header SQLite
  const fd = fs.openSync(fullPath, "r");
  const buffer = Buffer.alloc(16);
  fs.readSync(fd, buffer, 0, 16, 0);
  fs.closeSync(fd);

  if (buffer.toString("utf-8").startsWith("SQLite format 3")) {
    result.isSqlite = true;
  }

  // Tenta rodar sqlite3 CLI se disponível
  try {
    const integrityOut = execSync(`sqlite3 "${fullPath}" "PRAGMA integrity_check;"`, {
      stdio: ["ignore", "pipe", "ignore"],
      timeout: 5000
    }).toString().trim();

    result.integrity = integrityOut;

    const tablesOut = execSync(`sqlite3 "${fullPath}" ".tables"`, {
      stdio: ["ignore", "pipe", "ignore"],
      timeout: 5000
    }).toString().trim();

    result.tables = tablesOut.split(/\s+/).filter(Boolean);
  } catch {
    // sqlite3 CLI pode não estar instalado; fallback mantém verificação de integridade de cabeçalho
    if (result.isSqlite) {
      result.integrity = "header-valid (sqlite3 cli not in PATH)";
    }
  }

  return {
    status: "ok",
    data: result,
    warnings: [],
    errors: []
  };
}

