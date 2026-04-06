import { inventoryService } from "./inventory.service.js";

export const inventoryController = {
  create(req, res) {
    res.status(201).json(inventoryService.createInventoryItem(req.user._id, req.body));
  },

  list(req, res) {
    res.status(200).json(inventoryService.getInventory(req.user._id, req.params.restaurantId));
  },

  update(req, res) {
    res.status(200).json(
      inventoryService.updateInventoryItem(req.user._id, req.params.id, req.body)
    );
  },

  remove(req, res) {
    res.status(200).json(inventoryService.deleteInventoryItem(req.user._id, req.params.id));
  },
};
