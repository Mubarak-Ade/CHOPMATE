import { memoryStore } from "../../data/memoryStore.js";

export const roleRepository = {
  findAll() {
    return memoryStore.roles;
  },

  findById(roleId) {
    return memoryStore.roles.find((role) => role._id === roleId);
  },

  findByName(name) {
    return memoryStore.roles.find((role) => role.name === name);
  },

  create(payload) {
    const role = {
      _id: memoryStore.nextId("rol"),
      ...payload,
    };
    memoryStore.roles.push(role);
    return role;
  },
};
