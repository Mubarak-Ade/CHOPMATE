import { reservationService } from "./reservation.service.js";

export const reservationController = {
  availability(req, res) {
    res.status(200).json(reservationService.getAvailability(req.query));
  },

  create(req, res) {
    res.status(201).json(reservationService.createReservation(req.user._id, req.body));
  },

  myReservations(req, res) {
    res.status(200).json(reservationService.getMyReservations(req.user._id));
  },

  restaurantReservations(req, res) {
    res.status(200).json(
      reservationService.getRestaurantReservations(req.user._id, req.params.id)
    );
  },

  updateStatus(req, res) {
    res.status(200).json(
      reservationService.updateReservationStatus(
        req.user._id,
        req.params.id,
        req.body.status
      )
    );
  },

  remove(req, res) {
    res.status(200).json(
      reservationService.cancelReservation(req.user._id, req.params.id)
    );
  },
};
