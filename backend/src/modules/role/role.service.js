import { createError } from "../../lib/createError.js";
import { roleRepository } from "./role.repository.js";

export const roleService = {
  getRoles() {
    return roleRepository.findAll();
  },

  getRole(roleId) {
    const role = roleRepository.findById(roleId);
    if (!role) {
      throw createError(404, "role not found");
    }

    return role;
  },

  createRole(payload) {
    if (!payload.name || !Array.isArray(payload.permissions)) {
      throw createError(400, "name and permissions are required");
    }

    if (roleRepository.findByName(payload.name)) {
      throw createError(409, "role already exists");
    }

    return roleRepository.create({
      name: payload.name,
      permissions: payload.permissions,
    });
  },
};
