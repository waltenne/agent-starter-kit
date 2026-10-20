import { loadCatalog } from "./catalog.mjs";
import { PROFILES } from "./recommend.mjs";

export function browseCatalog(options = {}) {
  const { data } = loadCatalog();
  const skills = data.skills;

  const categories = {};
  for (const s of skills) {
    const cat = s.category;
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(s);
  }

  return {
    status: "ok",
    data: {
      totalCategories: Object.keys(categories).length,
      totalComponents: skills.length,
      categories,
      profiles: PROFILES
    },
    warnings: [],
    errors: []
  };
}

