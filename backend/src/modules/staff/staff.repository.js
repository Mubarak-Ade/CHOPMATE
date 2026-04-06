import { memoryStore } from "../../data/memoryStore.js";

export const staffRepository = {
  listMembershipsByUser(userId) {
    return memoryStore.memberships.filter((membership) => membership.user === userId);
  },

  findMembership(userId, restaurantId) {
    return memoryStore.memberships.find(
      (membership) =>
        membership.user === userId &&
        membership.restaurant === restaurantId &&
        membership.isActive
    );
  },

  findMembershipById(membershipId) {
    return memoryStore.memberships.find((membership) => membership._id === membershipId);
  },

  listMembershipsByRestaurant(restaurantId) {
    return memoryStore.memberships.filter(
      (membership) => membership.restaurant === restaurantId && membership.isActive
    );
  },

  createMembership(payload) {
    const membership = {
      _id: memoryStore.nextId("mem"),
      ...payload,
    };
    memoryStore.memberships.push(membership);
    return membership;
  },

  updateMembership(membershipId, updates) {
    const membership = this.findMembershipById(membershipId);
    if (!membership) {
      return null;
    }

    Object.assign(membership, updates);
    return membership;
  },

  findInviteByEmailAndRestaurant(email, restaurantId) {
    return memoryStore.invites.find(
      (invite) =>
        invite.email.toLowerCase() === String(email).toLowerCase() &&
        invite.restaurant === restaurantId
    );
  },

  findInviteByToken(token) {
    return memoryStore.invites.find((invite) => invite.token === token);
  },

  createInvite(payload) {
    const invite = {
      _id: memoryStore.nextId("inv"),
      ...payload,
    };
    memoryStore.invites.push(invite);
    return invite;
  },

  removeInvite(token) {
    const index = memoryStore.invites.findIndex((invite) => invite.token === token);
    if (index >= 0) {
      memoryStore.invites.splice(index, 1);
    }
  },
};
