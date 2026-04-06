import { createError } from "../../lib/createError.js";
import { staffService } from "../staff/staff.service.js";
import { restaurantRepository } from "../restaurant/restaurant.repository.js";
import { tableRepository } from "./table.repository.js";

export const tableService = {
  createTable(userId, payload) {
    const restaurant = restaurantRepository.findById(payload.restaurantId);
    if (!restaurant) {
      throw createError(404, "restaurant not found");
    }

    staffService.ensurePermission(userId, payload.restaurantId, "manage_reservations");

    if (!payload.name || !payload.capacity) {
      throw createError(400, "name and capacity are required");
    }

    return tableRepository.create({
      restaurant: payload.restaurantId,
      name: payload.name,
      capacity: Number(payload.capacity),
      isActive: payload.isActive ?? true,
    });
  },

  listTables(userId, restaurantId) {
    staffService.ensurePermission(userId, restaurantId, "manage_reservations");
    return tableRepository.listByRestaurant(restaurantId);
  },

  updateTable(userId, tableId, updates) {
    const table = tableRepository.findById(tableId);
    if (!table) {
      throw createError(404, "table not found");
    }

    staffService.ensurePermission(userId, table.restaurant, "manage_reservations");

    return tableRepository.update(tableId, {
      name: updates.name ?? table.name,
      capacity: updates.capacity ?? table.capacity,
      isActive: updates.isActive ?? table.isActive,
    });
  },

  deleteTable(userId, tableId) {
    const table = tableRepository.findById(tableId);
    if (!table) {
      throw createError(404, "table not found");
    }

    staffService.ensurePermission(userId, table.restaurant, "manage_reservations");
    tableRepository.update(tableId, { isActive: false });
    return { success: true };
  },
};
