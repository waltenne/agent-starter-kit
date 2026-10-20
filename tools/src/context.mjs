import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { findSymbol } from "./find.mjs";

export function getContext(targetDir = process.cwd(), query = "", options = {}) {
  const dir = path.resolve(targetDir);
  const result = {
    target: query,
    file: null,
    relatedFiles: [],
    recentCommits: [],
    exportedSymbols: []
  };

  if (!query) {
    return { status: "error", data: result, errors: ["Target query or file path is required"] };
  }

  const potentialFile = path.resolve(dir, query);
  if (fs.existsSync(potentialFile) && fs.statSync(potentialFile).isFile()) {
    const relFile = path.relative(dir, potentialFile);
    result.file = {
      path: relFile,
      sizeBytes: fs.statSync(potentialFile).size,
      lines: fs.readFileSync(potentialFile, "utf-8").split("\n").length
    };

    // Arquivos relacionados no mesmo diretório
    const dirname = path.dirname(potentialFile);
    const baseNameNoExt = path.basename(potentialFile, path.extname(potentialFile));
    try {
      const dirFiles = fs.readdirSync(dirname);
      for (const f of dirFiles) {
        if (f !== path.basename(potentialFile) && f.includes(baseNameNoExt)) {
          result.relatedFiles.push(path.relative(dir, path.join(dirname, f)));
        }
      }
    } catch {}

    // Commits recentes no arquivo
    if (fs.existsSync(path.join(dir, ".git"))) {
      try {
        const gitLog = execSync(`git log -3 --oneline -- "${relFile}"`, { cwd: dir, stdio: ["ignore", "pipe", "ignore"] }).toString();
        result.recentCommits = gitLog.split("\n").filter(Boolean);
      } catch {}
    }

    // Extrai símbolos
    try {
      const content = fs.readFileSync(potentialFile, "utf-8");
      const symbolRegex = /\b(export\s+(?:function|class|interface|type|const|let)|fn\s+|pub\s+fn\s+)(\w+)/g;
      let match;
      while ((match = symbolRegex.exec(content)) !== null) {
        result.exportedSymbols.push(match[2]);
      }
    } catch {}
  } else {
    // Busca por símbolo ou termo
    const symbolMatches = findSymbol(dir, query, { max: 10 });
    if (symbolMatches.data && symbolMatches.data.matches.length > 0) {
      result.relatedFiles = [...new Set(symbolMatches.data.matches.map(m => m.file))];
    }
  }

  return {
    status: "ok",
    data: result,
    warnings: [],
    errors: []
  };
}

