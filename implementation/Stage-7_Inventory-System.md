Now we’re stepping into **operational intelligence** — this is where restaurants stop guessing and start controlling their business.

---

# 📦 **STAGE 7 — INVENTORY SYSTEM (STOCK & SUPPLY ENGINE)**

## 🎯 **Goal of This Stage**

* Track ingredients (not just menu items)
* Auto-deduct stock when orders are placed
* Prevent overselling
* Reduce waste
* Enable smarter decisions (ties directly into analytics)

---

# 🧠 **1. CORE ARCHITECTURE OVERVIEW**

```txt id="inv-arch"
MenuItem → Recipe → InventoryItem → Stock Movement → Alerts
```

---

# ⚠️ **REALITY CHECK**

Inventory is where many systems fail.

Why? Because:

* Menu ≠ Inventory
* You don’t sell “chicken”, you sell “fried rice”
* But fried rice consumes:

  * rice
  * oil
  * chicken
  * spices

So you need a **recipe system**.

---

# 🗂️ **2. FOLDER STRUCTURE UPDATE**

```bash id="inv-folder"
src/modules/
├── inventory/
│   ├── inventory.controller.ts
│   ├── inventory.service.ts
│   ├── inventory.model.ts
│
├── recipe/
│   ├── recipe.model.ts
│   ├── recipe.service.ts
│
├── stock/
│   ├── stock.model.ts
│   ├── stock.service.ts
```

---

# 🧾 **3. SCHEMAS**

## **Inventory Item (Ingredient)**

```ts id="inv-item"
InventoryItem {
  _id: ObjectId
  restaurant: ObjectId
  name: string // "Rice", "Chicken"
  unit: "kg" | "litre" | "pcs"
  quantity: number
  lowStockThreshold: number
  createdAt: Date
}
```

---

## **Recipe Schema (LINKS MENU → INVENTORY)**

```ts id="recipe-schema"
Recipe {
  _id: ObjectId
  menuItem: ObjectId
  ingredients: [
    {
      item: ObjectId
      quantity: number
    }
  ]
}
```

---

## **Stock Movement (AUDIT LOG)**

```ts id="stock-move"
StockMovement {
  _id: ObjectId
  inventoryItem: ObjectId
  type: "in" | "out"
  quantity: number
  reason: "order" | "manual" | "waste" | "restock"
  referenceId: ObjectId // orderId (optional)
  createdAt: Date
}
```

---

# 🔥 **4. CORE LOGIC — AUTO STOCK DEDUCTION**

## **When an order is completed:**

```txt id="inv-flow"
Order → Loop items → Get recipe → Deduct ingredients
```

---

## **Pseudo Code**

```ts id="inv-pseudo"
for each item in order:
  recipe = findRecipe(item.menuItem)

  for each ingredient in recipe:
    deduct inventory.quantity
    create stock movement (type: "out")
```

---

# ⚠️ **CRITICAL RULE**

👉 Deduct stock ONLY when:

* Order is **paid** OR **confirmed**

NOT when:

* Added to cart ❌
* Order pending ❌

---

# 🔌 **5. ENDPOINTS**

## **Inventory**

```http id="inv-endpoints"
POST   /api/inventory
GET    /api/inventory/:restaurantId
PATCH  /api/inventory/:id
DELETE /api/inventory/:id
```

---

## **Recipe**

```http id="recipe-endpoints"
POST   /api/recipes
GET    /api/recipes/:menuItemId
PATCH  /api/recipes/:id
```

---

## **Stock Movement**

```http id="stock-endpoints"
GET /api/stock/history/:inventoryItemId
```

---

# 🧠 **6. LOW STOCK ALERT SYSTEM**

## **Logic**

```ts id="low-stock"
if (quantity <= lowStockThreshold):
  trigger alert
```

---

## **Alert Types**

* Email
* Dashboard notification
* (Later: SMS / push)

---

# 🧠 **7. BUSINESS RULES**

* Cannot create recipe without inventory items
* Cannot deduct below zero (optional strict mode)
* Manual stock adjustment allowed
* Inventory tied strictly to restaurant

---

# ⚡ **8. PERFORMANCE & CONSISTENCY**

## **Problem**

Multiple orders updating same inventory

---

## **Solutions**

### ✅ MVP

* Atomic update using Mongo `$inc`

```ts id="atomic"
$inc: { quantity: -5 }
```

---

### 🔥 Better

* MongoDB transactions

---

### 🧠 Advanced

* Queue system (Bull + Redis)

---

# 🔁 **9. REQUEST FLOW**

```txt id="inv-request"
Order completed

→ order.service
→ inventory.service
→ deduct stock
→ log movement
→ check threshold
→ trigger alert
```

---

# ⚠️ **10. EDGE CASES**

* Recipe missing → skip or block order
* Ingredient deleted but used in recipe
* Negative stock (overselling)
* Manual stock mismatch
* Bulk orders draining inventory

---

# 📊 **11. ANALYTICS INTEGRATION**

Now you can track:

* Most used ingredients
* Wastage levels
* Cost estimation
* Profit margins (future)

---

# 🚀 **WHAT YOU NOW HAVE**

After Stage 7:

✅ Full inventory tracking
✅ Auto stock deduction
✅ Low stock alerts
✅ Ingredient-level control

---
