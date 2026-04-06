Good. Now we move to the feature that separates toy apps from **real business software**.

👉 **STAGE 3 — RBAC + STAFF MANAGEMENT SYSTEM**

This is where your platform becomes something a **restaurant team can actually use**, not just the owner.

---

# 👥 **STAGE 3 — RBAC & STAFF SYSTEM**

## 🎯 **Goal of This Stage**

* Allow multiple users per restaurant
* Control what each user can access
* Prevent chaos (and accidental data damage)

---

# 🧠 **1. CORE IDEA (VERY IMPORTANT)**

Right now:

> 1 restaurant = 1 owner = 1 account ❌

After this stage:

> 1 restaurant = multiple users with roles ✅

---

# 🏗️ **2. ARCHITECTURE OVERVIEW**

```txt
User → Restaurant → Membership → Role → Permissions
```

---

# ⚠️ **CRITICAL DESIGN DECISION**

DO NOT store role directly in User like:

```ts
role: "admin"
```

That’s too global.

Instead:
👉 Roles should be **per restaurant**

Because:

* A user can be **owner in one restaurant**
* And **staff in another**

---

# 🗂️ **3. FOLDER STRUCTURE UPDATE**

```bash
src/modules/
├── staff/
│   ├── staff.controller.ts
│   ├── staff.service.ts
│   ├── staff.model.ts
│
├── role/
│   ├── role.model.ts
│   ├── role.service.ts
```

---

# 🧾 **4. SCHEMAS**

## **Membership (Staff) Schema — CORE MODEL**

```ts
Membership {
  _id: ObjectId
  user: ObjectId
  restaurant: ObjectId
  role: ObjectId
  isActive: boolean
  invitedBy: ObjectId
  createdAt: Date
}
```

---

## **Role Schema**

```ts
Role {
  _id: ObjectId
  name: string // "owner", "manager", "staff"
  permissions: string[]
}
```

---

## **Permission Examples**

```ts
[
  "manage_menu",
  "view_orders",
  "manage_orders",
  "manage_staff",
  "view_analytics"
]
```

---

# 🔐 **5. RBAC MIDDLEWARE**

## **Permission Middleware**

```ts
authorize("manage_menu")
```

---

## **Example Usage**

```ts
router.post(
  "/menu/items",
  authMiddleware,
  authorize("manage_menu"),
  controller
)
```

---

## **Middleware Logic**

```ts
1. Get user from token
2. Find Membership (user + restaurant)
3. Get role
4. Check if permission exists
5. Allow or reject
```

---

# 🔄 **6. STAFF INVITATION FLOW**

```txt
Owner invites staff → email sent → user accepts → added to restaurant
```

---

## **Steps**

1. Owner sends invite
2. System creates pending membership
3. Invite link sent (token)
4. User accepts → becomes active staff

---

## **Schema Addition (Invite Token)**

```ts
Invite {
  _id: ObjectId
  email: string
  restaurant: ObjectId
  role: ObjectId
  token: string
  expiresAt: Date
}
```

---

# 🔌 **7. ENDPOINTS**

## **Staff Management**

```http
POST   /api/staff/invite
POST   /api/staff/accept-invite
GET    /api/staff/:restaurantId
PATCH  /api/staff/:id/role
DELETE /api/staff/:id
```

---

## **Roles**

```http
GET    /api/roles
POST   /api/roles   (admin only)
```

---

# 🧠 **8. BUSINESS LOGIC**

## **Owner Rules**

* Can:

  * Add/remove staff
  * Assign roles
  * Delete restaurant
* Cannot:

  * Be removed (unless ownership transfer)

---

## **Manager Role**

* Manage menu
* View analytics
* Manage orders

---

## **Staff Role**

* Limited access
* Mostly operational

---

# 🔥 **9. PERMISSION DESIGN STRATEGY**

Don’t overcomplicate this early.

Start with:

```ts
const permissions = {
  MANAGE_MENU: "manage_menu",
  MANAGE_STAFF: "manage_staff",
  VIEW_ANALYTICS: "view_analytics",
  MANAGE_ORDERS: "manage_orders"
}
```

---

# ⚠️ **10. EDGE CASES**

* User invited twice
* User already belongs to restaurant
* Role removed while user is active
* Owner accidentally removes all managers
* Invite expires

---

# 🔁 **11. REQUEST FLOW**

```txt
User tries to add menu item

→ authMiddleware
→ authorize("manage_menu")
→ controller
→ success or 403
```

---

# 🚀 **WHAT YOU NOW UNLOCK**

After this stage:

✅ Multiple staff per restaurant
✅ Secure access control
✅ Real business usage
✅ Foundation for orders, reservations

---

