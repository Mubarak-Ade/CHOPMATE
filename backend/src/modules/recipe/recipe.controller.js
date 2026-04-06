import { inventoryService } from "../inventory/inventory.service.js";

export const recipeController = {
  create(req, res) {
    res.status(201).json(inventoryService.createRecipe(req.user._id, req.body));
  },

  getOne(req, res) {
    res.status(200).json(inventoryService.getRecipe(req.user._id, req.params.menuItemId));
  },

  update(req, res) {
    res.status(200).json(inventoryService.updateRecipe(req.user._id, req.params.id, req.body));
  },
};
