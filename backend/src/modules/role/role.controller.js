import { roleService } from "./role.service.js";

export const roleController = {
  list(_req, res) {
    res.status(200).json(roleService.getRoles());
  },

  create(req, res) {
    res.status(201).json(roleService.createRole(req.body));
  },
};
