import { staffService } from "./staff.service.js";

export const staffController = {
  invite(req, res) {
    res.status(201).json(staffService.inviteStaff(req.user._id, req.body));
  },

  acceptInvite(req, res) {
    res.status(200).json(staffService.acceptInvite(req.user._id, req.body.token));
  },

  list(req, res) {
    res.status(200).json(staffService.listStaff(req.user._id, req.params.restaurantId));
  },

  updateRole(req, res) {
    res.status(200).json(
      staffService.updateStaffRole(req.user._id, req.params.id, req.body.roleId)
    );
  },

  remove(req, res) {
    res.status(200).json(staffService.removeStaff(req.user._id, req.params.id));
  },
};
