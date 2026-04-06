Let’s go. This is the **core revenue engine + highest complexity module**. If you get this right, your platform becomes *dangerously real*. If you mess it up, users will expose it fast.

---

# 🧾 **STAGE 5 — ORDER SYSTEM (CORE TRANSACTION ENGINE)**

## 🎯 **Goal of This Stage**

* Allow users to place orders
* Handle payments (linked to Stage 2)
* Track order lifecycle
* Ensure data consistency under load

---

# 🧠 **1. CORE ARCHITECTURE OVERVIEW**

```txt id="7q9z3p"
User → Cart → Order → Payment → Kitchen Flow → Status Updates
```

---

# ⚠️ **REALITY CHECK**

Orders are NOT just:

> “User clicks buy”

You must handle:

* Price consistency
* Menu changes mid-order
* Payment failures
* Duplicate orders
* Race conditions

---

# 🗂️ **2. FOLDER STRUCTURE UPDATE**

```bash id="p3k9ab"
src/modules/
├── order/
│   ├── order.controller.ts
│   ├── order.service.ts
│   ├── order.model.ts
│
├── cart/
│   ├── cart.controller.ts
│   ├── cart.service.ts
│   ├── cart.model.ts
```

---

# 🧾 **3. SCHEMAS**

## **Cart Schema (Temporary State)**

```ts id="m1k2vx"
Cart {
  _id: ObjectId
  user: ObjectId
  restaurant: ObjectId
  items: [
    {
      menuItem: ObjectId
      name: string
      price: number
      quantity: number
    }
  ]
  totalAmount: number
  updatedAt: Date
}
```

---

## **Order Schema (Permanent Record)**

```ts id="k8z1vd"
Order {
  _id: ObjectId
  user: ObjectId
  restaurant: ObjectId

  items: [
    {
      menuItem: ObjectId
      name: string
      price: number
      quantity: number
    }
  ]

  totalAmount: number

  status:
    | "pending"
    | "paid"
    | "preparing"
    | "ready"
    | "completed"
    | "cancelled"

  paymentStatus:
    | "pending"
    | "paid"
    | "failed"

  paymentId: ObjectId

  createdAt: Date
}
```

---

# 🔥 **4. CRITICAL DESIGN DECISION**

### ❗ Snapshot pricing

NEVER rely on live menu price after order is placed.

```ts id="u9b2xt"
store:
- name
- price
- quantity
```

inside order.

---

# 🛒 **5. CART SYSTEM**

## **Endpoints**

```http id="q7h1zk"
POST   /api/cart/add
GET    /api/cart
PATCH  /api/cart/update
DELETE /api/cart/clear
```

---

## **Rules**

* One cart per user per restaurant
* Switching restaurant → clear cart
* Always recalculate total on backend

---

# 🧠 **6. ORDER CREATION FLOW**

```txt id="t3n9yu"
1. User clicks "Checkout"
2. Validate cart
3. Lock prices (snapshot)
4. Create Order (pending)
5. Initialize payment
6. Wait for webhook
7. Mark order as paid
```

---

# 💳 **7. PAYMENT INTEGRATION (CONNECTED TO STAGE 2)**

### Two flows:

---

## **A. Pay Before Order (Recommended MVP)**

```txt id="b8p4df"
User → Pay → Confirm → Create Order
```

---

## **B. Pay After Order**

```txt id="u4x6kr"
Order → Pay → Update status
```

---

👉 Use **A** for simplicity.

---

# 🔔 **8. ORDER STATUS FLOW**

```txt id="v5r8cm"
pending → paid → preparing → ready → completed
                 ↓
              cancelled
```

---

# 🔌 **9. ENDPOINTS**

## **Orders**

```http id="a2d6ws"
POST   /api/orders
GET    /api/orders/my
GET    /api/orders/restaurant/:id
PATCH  /api/orders/:id/status
```

---

## **Cart → Order**

```http id="c7k1rp"
POST /api/orders/checkout
```

---

# 🧠 **10. ORDER SERVICE LOGIC**

## **Checkout Logic**

```ts id="k3m8rt"
1. Get cart
2. Validate items exist
3. Recalculate total
4. Create order (pending)
5. Initialize payment
6. Return payment URL
```

---

## **Webhook (IMPORTANT)**

```ts id="n6z2pl"
if (payment.success) {
  update order:
    paymentStatus = "paid"
    status = "paid"
}
```

---

# ⚠️ **11. RACE CONDITIONS (DANGEROUS)**

## **Problem**

User clicks checkout twice → duplicate orders

---

## **Solutions**

### ✅ Basic (MVP)

* Disable button on frontend
* Check if recent pending order exists

---

### 🔥 Better

* Idempotency key

```ts id="x8f4yt"
orderKey: unique request ID
```

---

# 🧠 **12. BUSINESS RULES**

* Cannot order from multiple restaurants at once
* Cancel only before "preparing"
* Restaurant controls order flow
* Payment failure → auto cancel

---

# 🔔 **13. NOTIFICATIONS**

* Order received
* Order confirmed
* Order ready
* Order completed

---

# ⚠️ **14. EDGE CASES**

* Menu item deleted after added to cart
* Price changed before checkout
* Payment success but order not updated
* Network failure during checkout
* Partial payment (rare but real)

---

# 🔁 **15. REQUEST FLOW**

```txt id="z1q7lf"
POST /orders/checkout

→ authMiddleware
→ validate cart
→ create order
→ initialize payment
→ return payment URL
```

---

# ⚙️ **16. OPTIONAL (REAL-TIME UPDATES)**

Later:

* WebSockets (Socket.io)
* Live order tracking

---

# 🚀 **WHAT YOU NOW HAVE**

After Stage 5:

✅ Full ordering system
✅ Payment integration
✅ Order lifecycle
✅ Real transaction handling

---