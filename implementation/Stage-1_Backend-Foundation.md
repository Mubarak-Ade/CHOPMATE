# 📦 **STAGE 1 — BACKEND FOUNDATION (MVP)**

## 🎯 **Goal of This Stage**

Build the **core backend** that supports:

* Authentication
* Restaurant onboarding
* User system
* Basic marketplace (search + restaurant view)
* Menu management

No fancy stuff yet. If you can't ship this, the “monstrous” dream dies early.

---

# 🧠 **1. CORE ARCHITECTURE OVERVIEW**

### **Architecture Style**

* Monolithic (for now — don’t pretend you need microservices)
* Layered architecture:

  ```
  Controller → Service → Repository → Database
  ```

### **Key Concepts**

* Multi-tenant (each restaurant owns its data)
* Role-based access control (RBAC)
* Modular structure (feature-based)

---

# 🗂️ **2. FOLDER STRUCTURE (SCALABLE MERN BACKEND)**

```bash
src/
│
├── config/
│   ├── db.ts
│   ├── env.ts
│
├── modules/
│   ├── auth/
│   ├── user/
│   ├── restaurant/
│   ├── menu/
│   ├── category/
│
├── middlewares/
│   ├── auth.middleware.ts
│   ├── role.middleware.ts
│   ├── error.middleware.ts
│
├── utils/
│   ├── generateToken.ts
│   ├── hash.ts
│
├── types/
│   ├── global.types.ts
│
├── app.ts
├── server.ts
```

### ⚠️ Why this structure?

* Feature-based = easier scaling
* Each module is isolated = future microservice-ready

---

# 🔐 **3. AUTH MODULE**

## **Features**

* Register (user / restaurant owner)
* Login
* Refresh token
* Logout

---

## **Schema: User**

```ts
User {
  _id: ObjectId
  name: string
  email: string (unique)
  password: string
  role: "customer" | "owner" | "admin"
  isVerified: boolean
  createdAt: Date
}
```

---

## **Endpoints**

```http
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/refresh
POST   /api/auth/logout
GET    /api/auth/me
```

---

## **Auth Flow**

1. User logs in
2. Server returns:

   * Access token (short-lived)
   * Refresh token (stored in cookie)
3. Middleware protects routes

---

# 👤 **4. USER MODULE**

## **Features**

* Get profile
* Update profile
* Save favorite restaurants

---

## **Schema Extension**

```ts
User {
  favorites: ObjectId[] // Restaurant IDs
}
```

---

## **Endpoints**

```http
GET    /api/users/me
PATCH  /api/users/me
POST   /api/users/favorites/:restaurantId
GET    /api/users/favorites
```

---

# 🍽️ **5. RESTAURANT MODULE**

## **Features**

* Register restaurant
* Update restaurant profile
* View restaurant (public)
* Search restaurants

---

## **Schema: Restaurant**

```ts
Restaurant {
  _id: ObjectId
  owner: ObjectId (User)
  name: string
  description: string
  cuisine: string[]
  address: string
  location: {
    type: "Point",
    coordinates: [lng, lat]
  }
  phone: string
  images: string[]
  isOpen: boolean
  rating: number
  createdAt: Date
}
```

---

## **Indexes (IMPORTANT)**

```ts
location: 2dsphere
name: text
cuisine: text
```

---

## **Endpoints**

```http
POST   /api/restaurants          (owner)
PATCH  /api/restaurants/:id      (owner)
GET    /api/restaurants/:id      (public)
GET    /api/restaurants          (search/filter)
```

---

## **Search Query Example**

```http
GET /api/restaurants?cuisine=chinese&rating=4&lat=...&lng=...
```

---

# 📋 **6. MENU MODULE**

## **Features**

* Add menu
* Update menu
* View menu

---

## **Schema: Menu**

```ts
Menu {
  _id: ObjectId
  restaurant: ObjectId
  name: string
  categories: ObjectId[]
}
```

---

## **Schema: MenuItem**

```ts
MenuItem {
  _id: ObjectId
  restaurant: ObjectId
  category: ObjectId
  name: string
  description: string
  price: number
  image: string
  isAvailable: boolean
}
```

---

## **Endpoints**

```http
POST   /api/menu                (owner)
GET    /api/menu/:restaurantId
POST   /api/menu/items
PATCH  /api/menu/items/:id
DELETE /api/menu/items/:id
```

---

# 🗂️ **7. CATEGORY MODULE**

## **Schema**

```ts
Category {
  _id: ObjectId
  restaurant: ObjectId
  name: string
}
```

---

## **Endpoints**

```http
POST   /api/categories
GET    /api/categories/:restaurantId
```

---

# 🛡️ **8. MIDDLEWARES**

## **Auth Middleware**

```ts
verifyToken → attach user to req
```

## **Role Middleware**

```ts
allowRoles("owner", "admin")
```

## **Error Handler**

* Centralized error response

---

# 🔁 **9. REQUEST FLOW (IMPORTANT)**

```txt
Client → Route → Controller → Service → DB → Response
```

### Example:

```txt
POST /restaurant

→ controller
→ service (validate ownership)
→ save to DB
→ return response
```

---

# ⚙️ **10. ENV VARIABLES**

```env
PORT=
MONGO_URI=
JWT_SECRET=
REFRESH_SECRET=
CLOUDINARY_URL=
```

---