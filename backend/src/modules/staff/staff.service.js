import { createError } from "../../lib/createError.js";
import { generateToken } from "../../utils/generateToken.js";
import { authRepository } from "../auth/auth.repository.js";
import { restaurantRepository } from "../restaurant/restaurant.repository.js";
import { roleRepository } from "../role/role.repository.js";
import { subscriptionService } from "../subscription/subscription.service.js";
import { staffRepository } from "./staff.repository.js";

const enrichMembership = (membership) => ({
  ...membership,
  user: authRepository.findUserById(membership.user) || null,
  role: roleRepository.findById(membership.role) || null,
});

const getMembershipContext = (userId, restaurantId) => {
  const membership = staffRepository.findMembership(userId, restaurantId);
  if (!membership) {
    throw createError(403, "you do not belong to this restaurant");
  }

  const role = roleRepository.findById(membership.role);
  if (!role) {
    throw createError(500, "membership role is invalid");
  }

  return { membership, role };
};

export const staffService = {
  getMembershipContext,

  ensurePermission(userId, restaurantId, permission) {
    const { role } = getMembershipContext(userId, restaurantId);
    if (!role.permissions.includes(permission)) {
      throw createError(403, `missing permission: ${permission}`);
    }
  },

  createOwnerMembership(restaurantId, userId) {
    return staffRepository.createMembership({
      user: userId,
      restaurant: restaurantId,
      role: "rol_owner",
      isActive: true,
      invitedBy: userId,
      createdAt: new Date().toISOString(),
    });
  },

  listStaff(userId, restaurantId) {
    this.ensurePermission(userId, restaurantId, "manage_staff");
    return staffRepository.listMembershipsByRestaurant(restaurantId).map(enrichMembership);
  },

  inviteStaff(userId, payload) {
    const restaurant = restaurantRepository.findById(payload.restaurantId);
    if (!restaurant) {
      throw createError(404, "restaurant not found");
    }

    subscriptionService.ensureFeatureAccess(payload.restaurantId, "staff");
    this.ensurePermission(userId, payload.restaurantId, "manage_staff");

    const role = roleRepository.findById(payload.roleId);
    if (!role) {
      throw createError(404, "role not found");
    }

    const existingUser = authRepository.findUserByEmail(payload.email);
    if (existingUser && staffRepository.findMembership(existingUser._id, payload.restaurantId)) {
      throw createError(409, "user already belongs to this restaurant");
    }

    const existingInvite = staffRepository.findInviteByEmailAndRestaurant(
      payload.email,
      payload.restaurantId
    );
    if (existingInvite) {
      throw createError(409, "invite already exists for this user");
    }

    return staffRepository.createInvite({
      email: payload.email.toLowerCase(),
      restaurant: payload.restaurantId,
      role: payload.roleId,
      token: generateToken(),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
      invitedBy: userId,
      createdAt: new Date().toISOString(),
    });
  },

  acceptInvite(userId, token) {
    const invite = staffRepository.findInviteByToken(token);
    if (!invite) {
      throw createError(404, "invite not found");
    }

    if (new Date(invite.expiresAt).getTime() < Date.now()) {
      throw createError(410, "invite has expired");
    }

    const user = authRepository.findUserById(userId);
    if (!user || user.email.toLowerCase() !== invite.email.toLowerCase()) {
      throw createError(403, "invite does not match the current account");
    }

    const existingMembership = staffRepository.findMembership(userId, invite.restaurant);
    if (existingMembership) {
      throw createError(409, "user already belongs to this restaurant");
    }

    const membership = staffRepository.createMembership({
      user: userId,
      restaurant: invite.restaurant,
      role: invite.role,
      isActive: true,
      invitedBy: invite.invitedBy,
      createdAt: new Date().toISOString(),
    });

    staffRepository.removeInvite(token);
    return enrichMembership(membership);
  },

  updateStaffRole(userId, membershipId, roleId) {
    const membership = staffRepository.findMembershipById(membershipId);
    if (!membership) {
      throw createError(404, "membership not found");
    }

    this.ensurePermission(userId, membership.restaurant, "manage_staff");

    const currentRole = roleRepository.findById(membership.role);
    if (currentRole?.name === "owner") {
      throw createError(400, "owner membership cannot be reassigned");
    }

    const role = roleRepository.findById(roleId);
    if (!role) {
      throw createError(404, "role not found");
    }

    return enrichMembership(staffRepository.updateMembership(membershipId, { role: roleId }));
  },

  removeStaff(userId, membershipId) {
    const membership = staffRepository.findMembershipById(membershipId);
    if (!membership) {
      throw createError(404, "membership not found");
    }

    this.ensurePermission(userId, membership.restaurant, "manage_staff");

    const currentRole = roleRepository.findById(membership.role);
    if (currentRole?.name === "owner") {
      throw createError(400, "owner cannot be removed");
    }

    staffRepository.updateMembership(membershipId, { isActive: false });
    return { success: true };
  },
};
