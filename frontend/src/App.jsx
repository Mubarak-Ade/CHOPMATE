import { Route, Routes } from "react-router";

import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Layout } from "./components/signup/Layout";
import { AccountCenterPage } from "./pages/AccountCenterPage";
import { AnalyticsPage } from "./pages/AnalyticsPage";
import { DashboardPage } from "./pages/DashboardPage";
import { HomePage } from "./pages/HomePage";
import { InventoryPage } from "./pages/InventoryPage";
import { LoginPage } from "./pages/LoginPage";
import { OrdersPage } from "./pages/OrdersPage";
import { ReservationsPage } from "./pages/ReservationsPage";
import RestaurantDetails from "./pages/RestaurantDetails";
import { StaffPage } from "./pages/StaffPage";
import { Verification } from "./pages/SignUp/Verification";
import { RestaurantInfo } from "./pages/SignUp/RestaurantInfo";
import { Plan } from "./pages/SignUp/Plan";
import { Account } from "./pages/SignUp/Account";
import { ConfirmPage } from "./pages/SignUp/ConfirmPage";
import { Location } from "./pages/SignUp/Location";
import { OperatingHours } from "./pages/SignUp/OperatingHours";
import { CartPage } from "./pages/CartPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/restaurants/:id" element={<RestaurantDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/reservations" element={<ReservationsPage />} />
        <Route path="/staff" element={<StaffPage />} />
        <Route path="/account" element={<AccountCenterPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/signup" element={<Layout />}>
          <Route path="account" element={<Account />} />
          <Route path="verify" element={<Verification />} />
          <Route path="info" element={<RestaurantInfo />} />
          <Route path="location" element={<Location />} />
          <Route path="plan" element={<Plan />} />
          <Route path="operation" element={<OperatingHours />} />
          <Route path="confirm" element={<ConfirmPage />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
