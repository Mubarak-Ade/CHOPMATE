# 🪑 **STAGE 4 — RESERVATION SYSTEM (TABLE BOOKING ENGINE)**

## 🎯 **Goal of This Stage**

* Allow customers to book tables
* Prevent double-booking
* Give restaurants control over availability
* Introduce time-based logic (this is where backend gets real)

---

# 🧠 **1. CORE ARCHITECTURE OVERVIEW**

```txt
User → Reservation → Table → Time Slot → Availability Engine
```

---

# ⚠️ **REALITY CHECK**

Reservations are NOT just:

> “save date + time”

You must handle:

* Overlapping bookings
* Table capacity
* Time slots
* Peak hours
* Cancellations

If you mess this up → restaurants lose money → they leave your platform.

---

# 🗂️ **2. FOLDER STRUCTURE UPDATE**

```bash
src/modules/
├── reservation/
│   ├── reservation.controller.ts
│   ├── reservation.service.ts
│   ├── reservation.model.ts
│
├── table/
│   ├── table.model.ts
│   ├── table.service.ts
```

---

# 🧾 **3. SCHEMAS**

## **Table Schema**

```ts
Table {
  _id: ObjectId
  restaurant: ObjectId
  name: string // "Table 1"
  capacity: number // seats
  isActive: boolean
}
```

---

## **Reservation Schema**

```ts
Reservation {
  _id: ObjectId
  user: ObjectId
  restaurant: ObjectId
  table: ObjectId

  date: Date
  startTime: string // "18:00"
  endTime: string   // "20:00"

  guests: number

  status: "pending" | "confirmed" | "cancelled" | "completed"

  createdAt: Date
}
```

---

# 🧠 **4. TIME SLOT STRATEGY**

You have 2 options:

### ❌ Bad Approach (Don’t do this)

* Let users pick any time freely
  → Leads to chaos

---

### ✅ Recommended Approach

* Predefined time slots

```ts
[
  "10:00",
  "12:00",
  "14:00",
  "18:00",
  "20:00"
]
```

Each slot = fixed duration (e.g., 2 hours)

---

# ⚙️ **5. AVAILABILITY ENGINE (CORE LOGIC)**

## **Goal**

Check if a table is free before booking.

---

## **Logic**

```ts
Find reservations where:
- same table
- same date
- AND time overlaps
```

---

## **Overlap Formula**

```ts
(startA < endB) && (endA > startB)
```

If true → ❌ conflict

---

## **Example**

```txt
Existing: 18:00 - 20:00
New:      19:00 - 21:00

→ Overlaps → reject
```

---

# ⚡ **6. SMART TABLE ASSIGNMENT (BETTER UX)**

Instead of user picking table:
👉 Let system assign best table

---

## **Logic**

1. Filter tables by capacity ≥ guests
2. Sort by smallest suitable table
3. Check availability
4. Assign first free table

---

# 🔌 **7. ENDPOINTS**

## **Reservations**

```http
POST   /api/reservations
GET    /api/reservations/my
GET    /api/reservations/restaurant/:id
PATCH  /api/reservations/:id/status
DELETE /api/reservations/:id
```

---

## **Tables**

```http
POST   /api/tables
GET    /api/tables/:restaurantId
PATCH  /api/tables/:id
DELETE /api/tables/:id
```

---

## **Availability Check**

```http
GET /api/reservations/availability?restaurantId=123&date=2026-04-10&guests=4
```

### Response:

```json
{
  "availableSlots": ["18:00", "20:00"]
}
```

---

# 🔁 **8. RESERVATION FLOW**

```txt
User selects:
- date
- time
- guests

→ Check availability
→ Assign table
→ Create reservation (pending)
→ Restaurant confirms
```

---

# 🧠 **9. STATUS FLOW**

```txt
pending → confirmed → completed
           ↓
        cancelled
```

---

# ⚠️ **10. CONCURRENCY PROBLEM (VERY IMPORTANT)**

### Problem:

Two users book same slot at same time.

---

## **Solution Options**

### ✅ Option 1 (Simple MVP)

* Check availability → save immediately
* Accept small risk

---

### 🔥 Option 2 (Better)

* Use MongoDB transaction + locking logic

---

### 🧠 Option 3 (Advanced)

* Redis locking system

---

👉 For now: **Option 1 + fast writes**

---

# 🧠 **11. BUSINESS RULES**

* Max guests per reservation
* Reservation duration fixed (e.g., 2 hours)
* Auto-cancel if not confirmed in X minutes
* Limit reservations per user per day

---

# 🔔 **12. NOTIFICATIONS (BASIC)**

* Reservation created
* Reservation confirmed
* Reminder before time

(Email first, SMS later)

---

# ⚠️ **13. EDGE CASES**

* User cancels last minute
* Restaurant overbooks
* Table removed but has reservations
* Time zone issues
* No-show customers

---

# 🔁 **14. REQUEST FLOW**

```txt
POST /reservations

→ authMiddleware
→ validate input
→ check availability
→ assign table
→ create reservation
→ return success
```

---

# 🚀 **WHAT YOU NOW HAVE**

After this stage:

✅ Restaurants can manage tables
✅ Customers can book reservations
✅ System prevents conflicts
✅ Real-world use case unlocked
