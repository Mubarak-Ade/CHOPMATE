import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";

import { useGlobalContext } from "../context/GlobalContext";

export const LoginPage = () => {
  const { authUser, bootstrap, login, register } = useGlobalContext();
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "owner@chopmate.app",
    password: "password123",
  });

  if (authUser) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      if (mode === "login") {
        await login({ email: form.email, password: form.password });
      } else {
        await register(form);
      }
      navigate("/dashboard");
    } catch (submissionError) {
      setError(submissionError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="dashboard-shell px-6 py-10 lg:px-10">
      <div className="section-shell grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="surface-card rounded-[2rem] p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">Access platform</p>
          <h1 className="mt-3 font-['DM_Serif_Display'] text-5xl text-carbon-black">
            {mode === "login" ? "Welcome back" : "Create account"}
          </h1>
          <div className="mt-6 flex gap-3">
            <button onClick={() => setMode("login")} className={`rounded-full px-4 py-2 text-sm font-semibold ${mode === "login" ? "bg-brand text-white" : "bg-brand-muted text-brand"}`}>
              Login
            </button>
            <button onClick={() => setMode("register")} className={`rounded-full px-4 py-2 text-sm font-semibold ${mode === "register" ? "bg-carbon-black text-white" : "bg-white text-carbon-black"}`}>
              Register
            </button>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {mode === "register" ? (
              <input
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                placeholder="Full name"
                className="w-full rounded-2xl border border-black/8 bg-white px-4 py-3 text-sm text-carbon-black"
              />
            ) : null}
            <input
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              placeholder="Email address"
              className="w-full rounded-2xl border border-black/8 bg-white px-4 py-3 text-sm text-carbon-black"
            />
            <input
              type="password"
              value={form.password}
              onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
              placeholder="Password"
              className="w-full rounded-2xl border border-black/8 bg-white px-4 py-3 text-sm text-carbon-black"
            />
            <button type="submit" disabled={submitting} className="w-full rounded-2xl bg-brand px-5 py-3 text-sm font-semibold text-white disabled:opacity-60">
              {submitting ? "Working…" : mode === "login" ? "Login" : "Create account"}
            </button>
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
          </form>
        </section>

        <aside className="surface-card rounded-[2rem] bg-carbon-black p-8 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">Demo credentials</p>
          <div className="mt-6 space-y-4">
            {(bootstrap?.demoUsers || []).map((user) => (
              <button
                key={user.email}
                onClick={() => setForm((current) => ({ ...current, email: user.email, password: user.password }))}
                className="block w-full rounded-[1.3rem] bg-white/8 p-4 text-left"
              >
                <p className="font-semibold capitalize">{user.role}</p>
                <p className="mt-1 text-sm text-white/75">{user.email}</p>
                <p className="text-sm text-white/55">password: {user.password}</p>
              </button>
            ))}
          </div>
          <Link to="/" className="mt-6 inline-flex rounded-2xl border border-white/15 px-4 py-3 text-sm font-semibold text-white">
            Back to marketplace
          </Link>
        </aside>
      </div>
    </div>
  );
};
