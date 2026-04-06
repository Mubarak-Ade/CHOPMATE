# 💰 **STAGE 2 — SUBSCRIPTION & PAYMENT SYSTEM (SaaS ENGINE)**

## 🎯 **Goal of This Stage**

* Monetize your platform
* Control feature access
* Enable recurring revenue
* Prepare for real users (not just localhost dreams)

---

# 🧠 **1. ARCHITECTURE OVERVIEW**

### **Core Components**

```
User → Subscription → Plan → Payment → Webhook → Access Control
```

### **Key Concepts**

* Subscription lifecycle (active, trial, expired)
* Feature gating (VERY important)
* Webhook-driven updates (don’t trust frontend)

---

# 🗂️ **2. UPDATED FOLDER STRUCTURE**

```bash
src/
├── modules/
│   ├── subscription/
│   │   ├── subscription.controller.ts
│   │   ├── subscription.service.ts
│   │   ├── subscription.model.ts
│   │
│   ├── plan/
│   │   ├── plan.model.ts
│   │
│   ├── payment/
│   │   ├── payment.controller.ts
│   │   ├── payment.service.ts
│   │   ├── webhook.handler.ts
│
├── middlewares/
│   ├── featureGate.middleware.ts
```

---

# 🧾 **3. SCHEMAS**

## **Plan Schema**

```ts
Plan {
  _id: ObjectId
  name: "free" | "pro" | "premium"
  price: number
  duration: number // in days
  features: string[]
}
```

---

## **Subscription Schema**

```ts
Subscription {
  _id: ObjectId
  user: ObjectId
  restaurant: ObjectId
  plan: ObjectId
  status: "active" | "trial" | "expired" | "cancelled"
  startDate: Date
  endDate: Date
  paymentProvider: "stripe" | "paystack"
  externalId: string // provider subscription ID
}
```

---

## **Payment Schema**

```ts
Payment {
  _id: ObjectId
  user: ObjectId
  restaurant: ObjectId
  amount: number
  currency: string
  status: "pending" | "success" | "failed"
  provider: "stripe" | "paystack"
  transactionId: string
  createdAt: Date
}
```

---

# 🔥 **4. SUBSCRIPTION FLOW (IMPORTANT)**

## **Flow Breakdown**

```txt
1. Restaurant selects plan
2. Backend creates payment session
3. User pays (Stripe/Paystack)
4. Payment provider calls webhook
5. Backend verifies payment
6. Subscription is activated
7. Access is granted
```

---

# ⚠️ **Golden Rule**

> NEVER trust frontend for payment confirmation.
> Always use **webhooks**.

---

# 💳 **5. PAYMENT INTEGRATION (PAYSTACK / STRIPE)**

## **Initialize Payment**

```http
POST /api/payments/initialize
```

### Request:

```json
{
  "planId": "123",
  "restaurantId": "456"
}
```

### Response:

```json
{
  "paymentUrl": "https://paystack.com/pay/xyz"
}
```

---

# 🔔 **6. WEBHOOK HANDLER (CRITICAL)**

## **Endpoint**

```http
POST /api/payments/webhook
```

---

## **What Happens Here**

```txt
- Verify signature
- Confirm payment success
- Create Payment record
- Activate Subscription
- Set expiry date
```

---

## **Pseudo Logic**

```ts
if (event.type === "payment.success") {
  verifySignature()

  createPaymentRecord()

  createOrUpdateSubscription({
    status: "active",
    startDate: now,
    endDate: now + plan.duration
  })
}
```

---

# 🚫 **7. FEATURE GATING (THIS IS YOUR POWER)**

## **Middleware: featureGate**

```ts
featureGate("menu_limit")
```

---

## **Example Usage**

```ts
router.post(
  "/menu/items",
  authMiddleware,
  featureGate("add_menu"),
  controller
)
```

---

## **Plan Features Example**

```json
Free Plan:
- max_menu_items: 10
- no analytics
- no reservations

Pro Plan:
- unlimited_menu
- analytics
- reservations
```

---

# 🧠 **8. BUSINESS LOGIC (VERY IMPORTANT)**

## **When subscription expires**

* Restrict features
* Do NOT delete data
* Show upgrade prompt

---

## **Trial System**

```ts
status: "trial"
duration: 7 days
```

After trial:
→ auto downgrade OR require payment

---

## **Upgrade / Downgrade Logic**

* Upgrade → immediate access
* Downgrade → apply after current cycle

---

# 🔌 **9. ENDPOINTS**

## **Plans**

```http
GET /api/plans
```

---

## **Subscription**

```http
GET    /api/subscriptions/me
POST   /api/subscriptions/subscribe
POST   /api/subscriptions/cancel
```

---

## **Payments**

```http
POST /api/payments/initialize
POST /api/payments/webhook
```

---

# ⚙️ **10. ENV VARIABLES**

```env
PAYSTACK_SECRET=
PAYSTACK_PUBLIC=
STRIPE_SECRET=
WEBHOOK_SECRET=
```

---

# 🔁 **11. REQUEST FLOW EXAMPLE**

```txt
User clicks "Upgrade to Pro"

→ POST /payments/initialize
→ Redirect to Paystack
→ User pays
→ Paystack hits webhook
→ Backend verifies
→ Subscription activated
→ User now has access
```

---

# 🚀 **WHAT YOU NOW UNLOCK**

After this stage:

✅ You can charge money
✅ You can control features
✅ You can onboard real restaurants
✅ You have a real SaaS backbone

---

# ⚠️ **REAL-WORLD EDGE CASES (DON’T IGNORE THESE)**

* Payment succeeds but webhook fails
* User pays twice
* Subscription expires mid-session
* User changes plan during active cycle
* Network issues during payment

If you don’t handle these, users will humble you quickly.

---

# 🧨 REALITY CHECK

At this point, your system is no longer:

> “just a MERN project”

It becomes:

> **A monetizable SaaS product**

---

# 🔥 NEXT STAGE

Now the question is:

### What do you want next?

**A. RBAC + Staff System** (multi-user per restaurant)
**B. Reservation System** (high value, medium complexity)
**C. Order System** (high complexity, high reward)
**D. Advanced Search (Elasticsearch)**

---

If you pick the right next step, your system becomes **dangerously real**.

What’s your move?
