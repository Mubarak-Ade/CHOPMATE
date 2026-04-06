import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import { links } from "../links";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const AppContext = createContext(null);

const readToken = () => localStorage.getItem("chopmate_token") || "";

const buildHeaders = (token, hasBody = false) => ({
  ...(hasBody ? { "Content-Type": "application/json" } : {}),
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

export const useGlobalContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within GlobalContext");
  }
  return context;
};

export const GlobalContext = ({ children }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState(readToken);
  const [authUser, setAuthUser] = useState(null);
  const [bootstrap, setBootstrap] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [ownerRestaurants, setOwnerRestaurants] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [roles, setRoles] = useState([]);
  const [staffMembers, setStaffMembers] = useState([]);
  const [myOrders, setMyOrders] = useState([]);
  const [restaurantOrders, setRestaurantOrders] = useState([]);
  const [myReservations, setMyReservations] = useState([]);
  const [restaurantReservations, setRestaurantReservations] = useState([]);
  const [cart, setCart] = useState({ items: [], totalAmount: 0 });
  const [inventoryItems, setInventoryItems] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [recommendations, setRecommendations] = useState({ restaurants: [], menuItems: [] });
  const [menuInsights, setMenuInsights] = useState([]);
  const [demandPrediction, setDemandPrediction] = useState({ peakHours: [] });
  const [customerSegments, setCustomerSegments] = useState([]);
  const [smartNotifications, setSmartNotifications] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [authLoading, setAuthLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [rolesLoading, setRolesLoading] = useState(false);
  const [staffLoading, setStaffLoading] = useState(false);
  const [myOrdersLoading, setMyOrdersLoading] = useState(false);
  const [restaurantOrdersLoading, setRestaurantOrdersLoading] = useState(false);
  const [myReservationsLoading, setMyReservationsLoading] = useState(false);
  const [restaurantReservationsLoading, setRestaurantReservationsLoading] = useState(false);
  const [subscriptionLoading, setSubscriptionLoading] = useState(false);
  const [inventoryLoading, setInventoryLoading] = useState(false);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);

  const activePage = links.find((link) => pathname.includes(link.path)) ?? links[0];
  const index = links.findIndex((link) => link.path === activePage.path);

  const apiRequest = async (path, options = {}) => {
    const hasBody = Boolean(options.body);
    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        ...buildHeaders(token, hasBody),
        ...(options.headers || {}),
      },
    });

    if (response.status === 204) {
      return null;
    }

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Request failed");
    }
    return data;
  };

  const saveSession = (payload) => {
    localStorage.setItem("chopmate_token", payload.accessToken);
    setToken(payload.accessToken);
    setAuthUser(payload.user);
  };

  const clearSession = () => {
    localStorage.removeItem("chopmate_token");
    setToken("");
    setAuthUser(null);
    setOwnerRestaurants([]);
    setUserProfile(null);
    setCart({ items: [], totalAmount: 0 });
  };

  const loadBootstrap = async () => {
    const plans = await apiRequest("/plans");
    setBootstrap({
      demoUsers: [
        { email: "owner@chopmate.app", password: "password123", role: "owner" },
        { email: "manager@chopmate.app", password: "password123", role: "manager" },
        { email: "customer@chopmate.app", password: "password123", role: "customer" },
        { email: "admin@chopmate.app", password: "password123", role: "admin" },
      ],
      plans,
    });
  };

  const loadRestaurants = async (search = "") => {
    const data = await apiRequest(`/restaurants${search ? `?search=${encodeURIComponent(search)}` : ""}`);
    setRestaurants(data);
    return data;
  };

  const loadRestaurantDetails = async (restaurantId) => {
    const data = await apiRequest(`/restaurants/${restaurantId}`);
    const menu = await apiRequest(`/menu/${restaurantId}`);
    const result = { ...data, menuItems: menu.items || [] };
    setSelectedRestaurant(result);
    return result;
  };

  const loadSession = async () => {
    if (!token) {
      return null;
    }

    setAuthLoading(true);
    try {
      const user = await apiRequest("/auth/me");
      setAuthUser(user);
      return user;
    } catch (_error) {
      clearSession();
      return null;
    } finally {
      setAuthLoading(false);
    }
  };

  const loadOwnerRestaurants = async () => {
    if (!authUser) {
      setOwnerRestaurants([]);
      return [];
    }

    const data = await apiRequest("/restaurants");
    const owned = data.filter((restaurant) => restaurant.owner === authUser._id);
    setOwnerRestaurants(owned);
    return owned;
  };

  const loadUserProfile = async () => {
    if (!token) {
      return null;
    }

    setProfileLoading(true);
    try {
      const data = await apiRequest("/users/me");
      setUserProfile(data);
      return data;
    } finally {
      setProfileLoading(false);
    }
  };

  const login = async (payload) => {
    const data = await apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    saveSession(data);
    return data;
  };

  const register = async (payload) => {
    const data = await apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    saveSession(data);
    return data;
  };

  const logout = async () => {
    if (token) {
      await apiRequest("/auth/logout", { method: "POST" }).catch(() => null);
    }
    clearSession();
    navigate("/");
  };

  const updateUserProfile = async (payload) => {
    const data = await apiRequest("/users/me", {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
    setUserProfile(data);
    setAuthUser((current) => (current ? { ...current, ...data } : current));
    return data;
  };

  const toggleFavoriteRestaurant = async (restaurantId) => {
    const data = await apiRequest(`/users/favorites/${restaurantId}`, {
      method: "POST",
    });
    setUserProfile(data);
    return data;
  };

  const loadCurrentSubscription = async (restaurantId) => {
    setSubscriptionLoading(true);
    try {
      const data = await apiRequest(`/subscriptions/${restaurantId}`);
      setCurrentSubscription(data);
      return data;
    } finally {
      setSubscriptionLoading(false);
    }
  };

  const loadRoles = async () => {
    setRolesLoading(true);
    try {
      const data = await apiRequest("/roles");
      setRoles(data);
      return data;
    } finally {
      setRolesLoading(false);
    }
  };

  const loadStaff = async (restaurantId) => {
    setStaffLoading(true);
    try {
      const data = await apiRequest(`/staff/${restaurantId}`);
      setStaffMembers(data);
      return data;
    } finally {
      setStaffLoading(false);
    }
  };

  const inviteStaff = async (payload) =>
    apiRequest("/staff/invite", {
      method: "POST",
      body: JSON.stringify(payload),
    });

  const updateStaffRole = async ({ membershipId, roleId, restaurantId }) => {
    const data = await apiRequest(`/staff/${membershipId}/role`, {
      method: "PATCH",
      body: JSON.stringify({ roleId }),
    });
    await loadStaff(restaurantId);
    return data;
  };

  const removeStaffMember = async ({ membershipId, restaurantId }) => {
    const data = await apiRequest(`/staff/${membershipId}`, { method: "DELETE" });
    await loadStaff(restaurantId);
    return data;
  };

  const getReservationAvailability = async (payload) =>
    apiRequest(
      `/reservations/availability?restaurantId=${payload.restaurantId}&date=${payload.date}&guests=${payload.guests}`
    );

  const createReservation = async (payload) => {
    const data = await apiRequest("/reservations", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    await loadMyReservations();
    return data;
  };

  const loadMyReservations = async () => {
    setMyReservationsLoading(true);
    try {
      const data = await apiRequest("/reservations/my");
      setMyReservations(data);
      return data;
    } finally {
      setMyReservationsLoading(false);
    }
  };

  const loadRestaurantReservations = async (restaurantId) => {
    setRestaurantReservationsLoading(true);
    try {
      const data = await apiRequest(`/reservations/restaurant/${restaurantId}`);
      setRestaurantReservations(data);
      return data;
    } finally {
      setRestaurantReservationsLoading(false);
    }
  };

  const updateReservationStatus = async (reservationId, status, restaurantId) => {
    const data = await apiRequest(`/reservations/${reservationId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    await Promise.all([loadMyReservations(), loadRestaurantReservations(restaurantId)]);
    return data;
  };

  const cancelReservation = async (reservationId) => {
    const data = await apiRequest(`/reservations/${reservationId}`, { method: "DELETE" });
    await loadMyReservations();
    return data;
  };

  const loadMyOrders = async () => {
    setMyOrdersLoading(true);
    try {
      const data = await apiRequest("/orders/my");
      setMyOrders(data);
      return data;
    } finally {
      setMyOrdersLoading(false);
    }
  };

  const loadRestaurantOrders = async (restaurantId) => {
    setRestaurantOrdersLoading(true);
    try {
      const data = await apiRequest(`/orders/restaurant/${restaurantId}`);
      setRestaurantOrders(data);
      return data;
    } finally {
      setRestaurantOrdersLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status, restaurantId) => {
    const data = await apiRequest(`/orders/${orderId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    await Promise.all([loadMyOrders(), loadRestaurantOrders(restaurantId)]);
    return data;
  };

  const loadCart = async () => {
    const data = await apiRequest("/cart");
    setCart(data);
    return data;
  };

  const addToCart = async (menuItemId, quantity = 1) => {
    const data = await apiRequest("/cart/add", {
      method: "POST",
      body: JSON.stringify({ menuItemId, quantity }),
    });
    setCart(data);
    return data;
  };

  const updateCartQuantity = async (menuItemId, quantity) => {
    const data = await apiRequest("/cart/update", {
      method: "PATCH",
      body: JSON.stringify({ menuItemId, quantity }),
    });
    setCart(data);
    return data;
  };

  const clearCart = async () => {
    await apiRequest("/cart/clear", { method: "DELETE" });
    setCart({ items: [], totalAmount: 0 });
  };

  const createOrder = async () => {
    const data = await apiRequest("/orders/checkout", { method: "POST" });
    await Promise.all([loadMyOrders(), loadCart()]);
    return data;
  };

  const loadInventory = async (restaurantId) => {
    setInventoryLoading(true);
    try {
      const data = await apiRequest(`/inventory/${restaurantId}`);
      setInventoryItems(data);
      return data;
    } finally {
      setInventoryLoading(false);
    }
  };

  const updateInventoryRecord = async (inventoryId, payload, restaurantId) => {
    const data = await apiRequest(`/inventory/${inventoryId}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
    await loadInventory(restaurantId);
    return data;
  };

  const loadAnalytics = async (restaurantId) => {
    setAnalyticsLoading(true);
    try {
      const data = await apiRequest(`/analytics/${restaurantId}`);
      setAnalytics(data);
      return data;
    } finally {
      setAnalyticsLoading(false);
    }
  };

  const loadRecommendations = async () => {
    const data = await apiRequest("/ai/recommendations");
    setRecommendations(data);
    return data;
  };

  const loadAiInsights = async (restaurantId) => {
    const [menu, demand, customers, notices] = await Promise.all([
      apiRequest(`/ai/menu-insights?restaurantId=${restaurantId}`),
      apiRequest(`/ai/demand?restaurantId=${restaurantId}`),
      apiRequest(`/ai/customers?restaurantId=${restaurantId}`),
      apiRequest(`/ai/notifications?restaurantId=${restaurantId}`),
    ]);

    setMenuInsights(menu);
    setDemandPrediction(demand);
    setCustomerSegments(customers);
    setSmartNotifications(notices);

    return { menu, demand, customers, notices };
  };

  const goToNextPage = () => {
    const nextLink = links[index + 1];
    if (nextLink) {
      navigate(`/signup/${nextLink.path}`);
    }
  };

  const goToPrevPage = () => {
    const previousLink = links[index - 1];
    if (previousLink) {
      navigate(`/signup/${previousLink.path}`);
    }
  };

  useEffect(() => {
    loadBootstrap();
    loadRestaurants();
  }, []);

  useEffect(() => {
    if (!token) {
      return;
    }

    loadSession().then((user) => {
      if (!user) {
        return;
      }

      loadOwnerRestaurants().catch(() => []);
      loadUserProfile().catch(() => null);
      loadCart().catch(() => null);
      loadMyOrders().catch(() => null);
      loadMyReservations().catch(() => null);
      loadRecommendations().catch(() => null);
    });
  }, [token]);

  useEffect(() => {
    if (!token) {
      return undefined;
    }

    const stream = new EventSource(`${API_BASE_URL}/realtime/events?token=${token}`);

    stream.onmessage = (event) => {
      const payload = JSON.parse(event.data);
      setNotifications((current) => [payload, ...current].slice(0, 12));
    };

    stream.onerror = () => {
      stream.close();
    };

    return () => stream.close();
  }, [token]);

  const value = useMemo(
    () => ({
      API_BASE_URL,
      activePage: activePage.path,
      addToCart,
      analytics,
      analyticsLoading,
      authLoading,
      authUser,
      bootstrap,
      cancelReservation,
      cart,
      clearCart,
      createOrder,
      createReservation,
      currentSubscription,
      customerSegments,
      demandPrediction,
      getReservationAvailability,
      goToNextPage,
      goToPrevPage,
      index,
      inventoryItems,
      inventoryLoading,
      inviteStaff,
      loadAiInsights,
      loadAnalytics,
      loadCart,
      loadCurrentSubscription,
      loadInventory,
      loadMyOrders,
      loadMyReservations,
      loadRecommendations,
      loadRestaurantDetails,
      loadRestaurantOrders,
      loadRestaurantReservations,
      loadRestaurants,
      loadRoles,
      loadStaff,
      login,
      logout,
      menuInsights,
      myOrders,
      myOrdersLoading,
      myReservations,
      myReservationsLoading,
      notifications,
      ownerRestaurants,
      profileLoading,
      recommendations,
      register,
      removeStaffMember,
      restaurantOrders,
      restaurantOrdersLoading,
      restaurantReservations,
      restaurantReservationsLoading,
      restaurants,
      roles,
      rolesLoading,
      selectedRestaurant,
      smartNotifications,
      staffLoading,
      staffMembers,
      subscriptionLoading,
      toggleFavoriteRestaurant,
      updateCartQuantity,
      updateInventoryRecord,
      updateOrderStatus,
      updateReservationStatus,
      updateStaffRole,
      updateUserProfile,
      userProfile,
    }),
    [
      activePage.path,
      analytics,
      analyticsLoading,
      authLoading,
      authUser,
      bootstrap,
      cart,
      currentSubscription,
      customerSegments,
      demandPrediction,
      index,
      inventoryItems,
      inventoryLoading,
      menuInsights,
      myOrders,
      myOrdersLoading,
      myReservations,
      myReservationsLoading,
      notifications,
      ownerRestaurants,
      profileLoading,
      recommendations,
      restaurantOrders,
      restaurantOrdersLoading,
      restaurantReservations,
      restaurantReservationsLoading,
      restaurants,
      roles,
      rolesLoading,
      selectedRestaurant,
      smartNotifications,
      staffLoading,
      staffMembers,
      subscriptionLoading,
      userProfile,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
