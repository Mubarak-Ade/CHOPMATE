import { inventoryService } from "../inventory/inventory.service.js";

export const stockController = {
  history(req, res) {
    res.status(200).json(
      inventoryService.getStockHistory(req.user._id, req.params.inventoryItemId)
    );
  },
};
