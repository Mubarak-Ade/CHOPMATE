import { memoryStore } from "../../data/memoryStore.js";

export const recipeRepository = {
  findById(recipeId) {
    return memoryStore.recipes.find((recipe) => recipe._id === recipeId);
  },

  findByMenuItem(menuItemId) {
    return memoryStore.recipes.find((recipe) => recipe.menuItem === menuItemId) || null;
  },

  create(payload) {
    const recipe = {
      _id: memoryStore.nextId("rcp"),
      ...payload,
    };
    memoryStore.recipes.push(recipe);
    return recipe;
  },

  update(recipeId, updates) {
    const recipe = this.findById(recipeId);
    if (!recipe) {
      return null;
    }

    Object.assign(recipe, updates);
    return recipe;
  },
};
