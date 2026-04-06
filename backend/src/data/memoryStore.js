import { hashValue } from "../utils/hash.js";

const now = () => new Date().toISOString();

const users = [
  {
    _id: "usr_owner_1",
    name: "Amina Bello",
    email: "owner@chopmate.app",
    password: hashValue("password123"),
    role: "owner",
    isVerified: true,
    favorites: ["rst_2"],
    createdAt: now(),
  },
  {
    _id: "usr_customer_1",
    name: "Tosin Ade",
    email: "customer@chopmate.app",
    password: hashValue("password123"),
    role: "customer",
    isVerified: true,
    favorites: ["rst_1"],
    createdAt: now(),
  },
  {
    _id: "usr_manager_1",
    name: "Ifeanyi Okoro",
    email: "manager@chopmate.app",
    password: hashValue("password123"),
    role: "customer",
    isVerified: true,
    favorites: [],
    createdAt: now(),
  },
  {
    _id: "usr_admin_1",
    name: "System Admin",
    email: "admin@chopmate.app",
    password: hashValue("password123"),
    role: "admin",
    isVerified: true,
    favorites: [],
    createdAt: now(),
  },
];

const restaurants = [
  {
    _id: "rst_1",
    owner: "usr_owner_1",
    name: "Suya & Spice Kitchen",
    description: "Modern Nigerian comfort food with smoky jollof and fast lunch service.",
    cuisine: ["Nigerian", "Grill"],
    address: "14 Allen Avenue, Ikeja, Lagos",
    location: {
      type: "Point",
      coordinates: [3.3489, 6.6018],
    },
    phone: "+234-801-555-0101",
    images: [],
    isOpen: true,
    rating: 4.7,
    createdAt: now(),
  },
  {
    _id: "rst_2",
    owner: "usr_owner_1",
    name: "Harbor Bowl",
    description: "Healthy bowls, smoothies, and weekday power lunches.",
    cuisine: ["Healthy", "Continental"],
    address: "25 Admiralty Way, Lekki, Lagos",
    location: {
      type: "Point",
      coordinates: [3.4722, 6.4474],
    },
    phone: "+234-801-555-0102",
    images: [],
    isOpen: true,
    rating: 4.4,
    createdAt: now(),
  },
];

const menus = [
  {
    _id: "men_1",
    restaurant: "rst_1",
    name: "Main Menu",
    categories: ["cat_1", "cat_2"],
  },
  {
    _id: "men_2",
    restaurant: "rst_2",
    name: "Main Menu",
    categories: ["cat_3"],
  },
];

const categories = [
  { _id: "cat_1", restaurant: "rst_1", name: "Mains" },
  { _id: "cat_2", restaurant: "rst_1", name: "Street Specials" },
  { _id: "cat_3", restaurant: "rst_2", name: "Bowls" },
];

const menuItems = [
  {
    _id: "itm_1",
    restaurant: "rst_1",
    category: "cat_1",
    name: "Jollof Rice Bowl",
    description: "Smoky jollof rice with grilled chicken and plantain.",
    price: 6500,
    image: "",
    isAvailable: true,
  },
  {
    _id: "itm_2",
    restaurant: "rst_1",
    category: "cat_2",
    name: "Suya Tacos",
    description: "Soft tacos packed with spiced beef suya and onions.",
    price: 5200,
    image: "",
    isAvailable: true,
  },
  {
    _id: "itm_3",
    restaurant: "rst_2",
    category: "cat_3",
    name: "Chicken Power Bowl",
    description: "Rice, grilled chicken, avocado, greens, and sauce.",
    price: 5900,
    image: "",
    isAvailable: true,
  },
];

const sessions = [];
const plans = [
  {
    _id: "pln_free",
    name: "free",
    price: 0,
    duration: 7,
    features: ["marketplace", "restaurant_profile", "basic_menu", "add_menu"],
    limits: {
      maxMenuItems: 10,
    },
  },
  {
    _id: "pln_pro",
    name: "pro",
    price: 25000,
    duration: 30,
    features: [
      "marketplace",
      "restaurant_profile",
      "basic_menu",
      "add_menu",
      "orders",
      "analytics",
      "inventory",
      "reservations",
      "priority_support",
      "staff",
    ],
    limits: {
      maxMenuItems: null,
    },
  },
  {
    _id: "pln_premium",
    name: "premium",
    price: 60000,
    duration: 30,
    features: [
      "marketplace",
      "restaurant_profile",
      "basic_menu",
      "add_menu",
      "orders",
      "analytics",
      "inventory",
      "reservations",
      "priority_support",
      "multi_location",
      "staff",
    ],
    limits: {
      maxMenuItems: null,
    },
  },
];

const subscriptions = [
  {
    _id: "sub_1",
    user: "usr_owner_1",
    restaurant: "rst_1",
    plan: "pln_pro",
    status: "active",
    startDate: now(),
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
    paymentProvider: "paystack",
    externalId: "ext_sub_1",
  },
  {
    _id: "sub_2",
    user: "usr_owner_1",
    restaurant: "rst_2",
    plan: "pln_free",
    status: "trial",
    startDate: now(),
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
    paymentProvider: "paystack",
    externalId: "ext_sub_2",
  },
];

const payments = [];
const roles = [
  {
    _id: "rol_owner",
    name: "owner",
    permissions: [
      "manage_restaurant",
      "manage_menu",
      "manage_orders",
      "view_orders",
      "manage_staff",
      "view_analytics",
      "manage_reservations",
    ],
  },
  {
    _id: "rol_manager",
    name: "manager",
    permissions: [
      "manage_menu",
      "manage_orders",
      "view_orders",
      "manage_staff",
      "view_analytics",
      "manage_reservations",
    ],
  },
  {
    _id: "rol_staff",
    name: "staff",
    permissions: ["view_orders", "manage_orders", "manage_reservations"],
  },
];

const memberships = [
  {
    _id: "mem_1",
    user: "usr_owner_1",
    restaurant: "rst_1",
    role: "rol_owner",
    isActive: true,
    invitedBy: "usr_owner_1",
    createdAt: now(),
  },
  {
    _id: "mem_2",
    user: "usr_owner_1",
    restaurant: "rst_2",
    role: "rol_owner",
    isActive: true,
    invitedBy: "usr_owner_1",
    createdAt: now(),
  },
  {
    _id: "mem_3",
    user: "usr_manager_1",
    restaurant: "rst_1",
    role: "rol_manager",
    isActive: true,
    invitedBy: "usr_owner_1",
    createdAt: now(),
  },
];

const invites = [];
const tables = [
  {
    _id: "tbl_1",
    restaurant: "rst_1",
    name: "A1",
    capacity: 2,
    isActive: true,
  },
  {
    _id: "tbl_2",
    restaurant: "rst_1",
    name: "A2",
    capacity: 4,
    isActive: true,
  },
  {
    _id: "tbl_3",
    restaurant: "rst_1",
    name: "B1",
    capacity: 6,
    isActive: true,
  },
];

const reservations = [
  {
    _id: "res_1",
    user: "usr_customer_1",
    restaurant: "rst_1",
    table: "tbl_2",
    date: "2026-04-10",
    startTime: "18:00",
    endTime: "20:00",
    guests: 4,
    status: "confirmed",
    createdAt: now(),
  },
];

const carts = [
  {
    _id: "crt_1",
    user: "usr_customer_1",
    restaurant: "rst_1",
    items: [
      {
        menuItem: "itm_2",
        name: "Suya Tacos",
        price: 5200,
        quantity: 1,
      },
    ],
    totalAmount: 5200,
    updatedAt: now(),
  },
];

const orders = [];
const inventoryItems = [
  {
    _id: "inv_1",
    restaurant: "rst_1",
    name: "Rice",
    unit: "kg",
    quantity: 20,
    lowStockThreshold: 5,
    createdAt: now(),
  },
  {
    _id: "inv_2",
    restaurant: "rst_1",
    name: "Chicken",
    unit: "kg",
    quantity: 15,
    lowStockThreshold: 4,
    createdAt: now(),
  },
  {
    _id: "inv_3",
    restaurant: "rst_1",
    name: "Tortilla",
    unit: "pcs",
    quantity: 50,
    lowStockThreshold: 10,
    createdAt: now(),
  },
];

const recipes = [
  {
    _id: "rcp_1",
    menuItem: "itm_1",
    ingredients: [
      { item: "inv_1", quantity: 0.4 },
      { item: "inv_2", quantity: 0.25 },
    ],
  },
  {
    _id: "rcp_2",
    menuItem: "itm_2",
    ingredients: [
      { item: "inv_2", quantity: 0.2 },
      { item: "inv_3", quantity: 2 },
    ],
  },
];

const stockMovements = [];
const alerts = [];

let sequence = 100;

export const memoryStore = {
  users,
  restaurants,
  menus,
  categories,
  menuItems,
  sessions,
  plans,
  subscriptions,
  payments,
  roles,
  memberships,
  invites,
  tables,
  reservations,
  carts,
  orders,
  inventoryItems,
  recipes,
  stockMovements,
  alerts,
  nextId(prefix) {
    sequence += 1;
    return `${prefix}_${sequence}`;
  },
};
