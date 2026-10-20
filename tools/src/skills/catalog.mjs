import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const kitRoot = path.resolve(__dirname, "../../..");

export function loadCatalog(options = {}) {
  const internalPath = path.join(kitRoot, "catalog", "internal.json");
  const communityPath = path.join(kitRoot, "catalog", "community.json");

  let internalSkills = [];
  let communitySkills = [];

  if (fs.existsSync(internalPath)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(internalPath, "utf-8"));
      internalSkills = parsed.skills || [];
    } catch {}
  }

  if (fs.existsSync(communityPath)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(communityPath, "utf-8"));
      communitySkills = parsed.skills || [];
    } catch {}
  }

  let all = [...internalSkills, ...communitySkills];

  if (options.category) {
    all = all.filter(s => s.category.toLowerCase() === options.category.toLowerCase());
  }
  if (options.source) {
    all = all.filter(s => s.source.toLowerCase() === options.source.toLowerCase());
  }
  if (options.reviewStatus) {
    all = all.filter(s => s.reviewStatus === options.reviewStatus);
  }

  return {
    status: "ok",
    data: {
      total: all.length,
      internalCount: internalSkills.length,
      communityCount: communitySkills.length,
      skills: all
    },
    warnings: [],
    errors: []
  };
}

export function getSkillInfo(skillId) {
  if (!skillId) {
    return { status: "error", data: null, errors: ["Skill ID is required"] };
  }

  const { data } = loadCatalog();
  const skill = data.skills.find(s => s.id.toLowerCase() === skillId.toLowerCase());

  if (!skill) {
    return {
      status: "error",
      data: null,
      errors: [`Skill '${skillId}' não encontrada no catálogo`]
    };
  }

  return {
    status: "ok",
    data: skill,
    warnings: [],
    errors: []
  };
}

