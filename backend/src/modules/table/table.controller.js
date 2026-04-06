import { tableService } from "./table.service.js";

export const tableController = {
  create(req, res) {
    res.status(201).json(tableService.createTable(req.user._id, req.body));
  },

  list(req, res) {
    res.status(200).json(tableService.listTables(req.user._id, req.params.restaurantId));
  },

  update(req, res) {
    res.status(200).json(tableService.updateTable(req.user._id, req.params.id, req.body));
  },

  remove(req, res) {
    res.status(200).json(tableService.deleteTable(req.user._id, req.params.id));
  },
};
