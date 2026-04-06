import { createError } from "../../lib/createError.js";
import {
  emitReservationCreated,
  emitReservationUpdated,
} from "../../realtime/handlers/reservation.handler.js";
import { authRepository } from "../auth/auth.repository.js";
import { restaurantRepository } from "../restaurant/restaurant.repository.js";
import { staffService } from "../staff/staff.service.js";
import { subscriptionService } from "../subscription/subscription.service.js";
import { tableRepository } from "../table/table.repository.js";
import { reservationRepository } from "./reservation.repository.js";

const SLOT_DURATION_HOURS = 2;
const PREDEFINED_SLOTS = ["10:00", "12:00", "14:00", "18:00", "20:00"];

const toMinutes = (time) => {
  const [hours, minutes] = String(time).split(":").map(Number);
  return hours * 60 + minutes;
};

const addDuration = (time, hoursToAdd) => {
  const totalMinutes = toMinutes(time) + hoursToAdd * 60;
  const hours = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
  const minutes = String(totalMinutes % 60).padStart(2, "0");
  return `${hours}:${minutes}`;
};

const overlaps = (startA, endA, startB, endB) =>
  toMinutes(startA) < toMinutes(endB) && toMinutes(endA) > toMinutes(startB);

const enrichReservation = (reservation) => ({
  ...reservation,
  user: authRepository.findUserById(reservation.user) || null,
  table: tableRepository.findById(reservation.table) || null,
  restaurant: restaurantRepository.findById(reservation.restaurant) || null,
});

const findBestAvailableTable = (restaurantId, date, guests, startTime, endTime) => {
  const candidateTables = tableRepository
    .listByRestaurant(restaurantId)
    .filter((table) => table.isActive && Number(table.capacity) >= Number(guests))
    .sort((left, right) => Number(left.capacity) - Number(right.capacity));

  return candidateTables.find((table) => {
    const conflicts = reservationRepository.listByTableAndDate(table._id, date);
    return !conflicts.some((reservation) =>
      overlaps(startTime, endTime, reservation.startTime, reservation.endTime)
    );
  });
};

export const reservationService = {
  getAvailability(query) {
    const { restaurantId, date, guests } = query;

    if (!restaurantRepository.findById(restaurantId)) {
      throw createError(404, "restaurant not found");
    }

    subscriptionService.ensureFeatureAccess(restaurantId, "reservations");

    const availableSlots = PREDEFINED_SLOTS.filter((slot) => {
      const endTime = addDuration(slot, SLOT_DURATION_HOURS);
      return Boolean(findBestAvailableTable(restaurantId, date, guests, slot, endTime));
    });

    return { availableSlots };
  },

  createReservation(userId, payload) {
    const { restaurantId, date, guests, startTime } = payload;

    if (!restaurantRepository.findById(restaurantId)) {
      throw createError(404, "restaurant not found");
    }

    subscriptionService.ensureFeatureAccess(restaurantId, "reservations");

    if (!date || !guests || !startTime) {
      throw createError(400, "date, guests, and startTime are required");
    }

    if (!PREDEFINED_SLOTS.includes(startTime)) {
      throw createError(400, "startTime must be one of the predefined slots");
    }

    const endTime = addDuration(startTime, SLOT_DURATION_HOURS);
    const table = findBestAvailableTable(restaurantId, date, guests, startTime, endTime);

    if (!table) {
      throw createError(409, "no table is available for the selected slot");
    }

    const reservation = enrichReservation(
      reservationRepository.create({
        user: userId,
        restaurant: restaurantId,
        table: table._id,
        date,
        startTime,
        endTime,
        guests: Number(guests),
        status: "pending",
        createdAt: new Date().toISOString(),
      })
    );

    emitReservationCreated(reservation);
    return reservation;
  },

  getMyReservations(userId) {
    return reservationRepository.listByUser(userId).map(enrichReservation);
  },

  getRestaurantReservations(userId, restaurantId) {
    staffService.ensurePermission(userId, restaurantId, "manage_reservations");
    return reservationRepository.listByRestaurant(restaurantId).map(enrichReservation);
  },

  updateReservationStatus(userId, reservationId, status) {
    const reservation = reservationRepository.findById(reservationId);
    if (!reservation) {
      throw createError(404, "reservation not found");
    }

    staffService.ensurePermission(userId, reservation.restaurant, "manage_reservations");

    if (!["pending", "confirmed", "cancelled", "completed"].includes(status)) {
      throw createError(400, "invalid reservation status");
    }

    const updatedReservation = enrichReservation(
      reservationRepository.update(reservationId, { status })
    );
    emitReservationUpdated(updatedReservation);
    return updatedReservation;
  },

  cancelReservation(userId, reservationId) {
    const reservation = reservationRepository.findById(reservationId);
    if (!reservation || reservation.user !== userId) {
      throw createError(404, "reservation not found");
    }

    const updatedReservation = enrichReservation(
      reservationRepository.update(reservationId, { status: "cancelled" })
    );
    emitReservationUpdated(updatedReservation);
    return updatedReservation;
  },
};
