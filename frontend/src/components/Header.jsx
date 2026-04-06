import { SoupIcon } from "lucide-react";
import { Link, NavLink } from "react-router";

import { useGlobalContext } from "../context/GlobalContext";
import { Icon } from "./custom/Icon";

export const Header = () => {
  const { authUser, logout } = useGlobalContext();

  const links = authUser
    ? [
        { label: "Home", to: "/" },
        { label: "Dashboard", to: "/dashboard" },
        { label: "Orders", to: "/orders" },
        { label: "Reservations", to: "/reservations" },
        { label: "Inventory", to: "/inventory" },
        { label: "Staff", to: "/staff" },
        { label: "Analytics", to: "/analytics" },
      ]
    : [
        { label: "Marketplace", to: "/" },
        { label: "Login", to: "/login" },
      ];

  return (
    <header className="sticky top-0 z-20 border-b border-black/6 bg-white/80 px-6 py-4 backdrop-blur lg:px-10">
      <div className="section-shell flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-brand text-white">
            <Icon size={22} icon={SoupIcon} />
          </span>
          <Link to="/" className="text-3xl font-black tracking-tight text-carbon-black">
            CHOP<span className="text-brand">MATE</span>
          </Link>
        </div>
        <nav className="flex flex-wrap gap-2 text-sm font-semibold text-slate-grey">
          {links.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 ${isActive ? "bg-brand-muted text-brand" : "hover:text-carbon-black"}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex flex-wrap gap-3">
          {authUser ? (
            <>
              <Link to="/account" className="rounded-2xl border border-black/10 px-4 py-3 text-sm font-semibold text-carbon-black">
                {authUser.name?.split(" ")[0] || "Account"}
              </Link>
              <button onClick={logout} className="rounded-2xl bg-carbon-black px-4 py-3 text-sm font-semibold text-white">
                Logout
              </button>
            </>
          ) : (
            <Link to="/signup/account" className="rounded-2xl bg-brand px-4 py-3 text-sm font-semibold text-white">
              Start free
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
