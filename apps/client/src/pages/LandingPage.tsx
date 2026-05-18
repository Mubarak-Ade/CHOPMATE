import { motion } from "framer-motion";
import { ArrowRight, Building2, ChefHat, ClipboardList, Search, UtensilsCrossed } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "../components/common/Reveal";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { useRestaurants } from "../features/restaurants/hooks/useRestaurants";

const featureBullets = [
  "1-click payroll integration",
  "Dynamic menu engineering",
];

const easeOutExpo = [0.22, 1, 0.36, 1] as const;

export const LandingPage = () => {
  const featuredRestaurantsQuery = useRestaurants({});
  const featuredRestaurants = featuredRestaurantsQuery.data?.slice(0, 3) ?? [];

  return (
    <div className="bg-[#f8f4f1]">
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-10 md:px-6 md:py-16 xl:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8 pt-6"
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
        >
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.92 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <Badge className="rounded-full px-4 py-1 uppercase tracking-[0.14em]" variant="brand">
            Management & Discovery
            </Badge>
          </motion.div>

          <div className="max-w-3xl space-y-5">
            <motion.h1
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl font-sans text-5xl font-bold leading-[0.95] tracking-tight text-foreground md:text-7xl"
              initial={{ opacity: 0, y: 26 }}
              transition={{ delay: 0.14, duration: 0.55, ease: easeOutExpo }}
            >
              The simplest way to{" "}
              <span className="font-serif italic text-brand">manage and grow</span>{" "}
              your restaurant.
            </motion.h1>
            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="max-w-xl text-lg leading-8 text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.24, duration: 0.55, ease: easeOutExpo }}
            >
              Chopmate is a restaurant marketplace and management system in one place.
              Discover food, accept bookings, run service operations, and give small restaurants
              enterprise-grade tools without enterprise chaos.
            </motion.p>
          </div>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-4 sm:grid-cols-[260px_260px]"
            initial={{ opacity: 0, y: 22 }}
            transition={{ delay: 0.3, duration: 0.55, ease: easeOutExpo }}
          >
            <motion.div whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }}>
              <Card className="overflow-hidden rounded-3xl border-brand/10 bg-brand text-white shadow-md">
              <CardContent className="flex h-full flex-col justify-between p-6">
                <div className="flex items-start justify-between">
                  <UtensilsCrossed className="h-6 w-6" />
                  <ArrowRight className="h-5 w-5" />
                </div>
                <div className="space-y-3">
                  <h2 className="text-3xl font-semibold">Order Food</h2>
                  <p className="text-sm leading-6 text-white/80">
                    Discover the best cuisines in your neighborhood and find the right table fast.
                  </p>
                </div>
              </CardContent>
            </Card>
            </motion.div>

            <motion.div whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }}>
              <Link to="/partners/register">
                <Card className="overflow-hidden rounded-3xl border-white/80 bg-stone-100 shadow-sm">
                  <CardContent className="flex h-full flex-col justify-between p-6">
                    <div className="flex items-start justify-between">
                      <ChefHat className="h-6 w-6 text-brand" />
                      <ArrowRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="space-y-3">
                      <h2 className="text-3xl font-semibold text-foreground">List Your Restaurant</h2>
                      <p className="text-sm leading-6 text-muted-foreground">
                        Empower your kitchen with modern management tools, bookings, analytics, and
                        local discovery.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, x: 0 }}
          className="grid gap-4 xl:pt-16"
          initial={{ opacity: 0, x: 24 }}
          transition={{ delay: 0.18, duration: 0.65, ease: easeOutExpo }}
        >
          <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr] xl:grid-cols-1 xl:grid-rows-[280px_120px_160px]">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <Card className="group relative overflow-hidden rounded-[28px] border-0 bg-[#2a1f16] shadow-lg">
              <img
                alt="Restaurant dining room"
                className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105"
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-sm uppercase tracking-[0.18em] text-white/70">Reservations</p>
                <p className="mt-2 max-w-xs text-2xl font-semibold text-white">
                  Turn tonight&apos;s empty tables into booked experiences.
                </p>
              </div>
            </Card>
            </motion.div>

            <div className="grid gap-4 md:grid-rows-2 xl:grid-cols-[1fr_140px] xl:grid-rows-1">
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
              >
                <Card className="relative overflow-hidden rounded-[28px] border-0 shadow-md">
                <img
                  alt="Plated food"
                  className="h-full w-full object-cover"
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80"
                />
              </Card>
              </motion.div>
              <motion.div whileHover={{ rotate: 4, scale: 1.03 }}>
                <Card className="flex items-center justify-center rounded-[28px] border-0 bg-stone-200 shadow-sm">
                <Search className="h-10 w-10 text-brand" />
              </Card>
              </motion.div>
            </div>

            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
            >
              <Card className="relative overflow-hidden rounded-[28px] border-0 shadow-md">
              <img
                alt="Chef plating a dish"
                className="h-full w-full object-cover"
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1000&q=80"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="text-sm font-medium text-white">Operations that keep pace with service.</p>
              </div>
            </Card>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <Reveal className="border-y border-border/60 bg-stone-100/80" delay={0.05}>
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-sans text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Precision tools for modern tables.
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              We provide the infrastructure so you can focus on hospitality, not operational drag.
            </p>
          </div>

          <div className="mt-12 grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
            <Card className="rounded-[28px]">
              <CardContent className="grid gap-8 p-6 lg:grid-cols-[0.95fr_1.05fr] lg:p-10">
                <div className="space-y-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-white">
                    <ClipboardList className="h-5 w-5" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-3xl font-semibold text-foreground">Smart Management Suite</h3>
                    <p className="text-sm leading-7 text-muted-foreground">
                      Inventory tracking, staff scheduling, reservations, billing, and real-time
                      revenue analytics, all synchronized across your locations.
                    </p>
                  </div>
                  <div className="space-y-3">
                    {featureBullets.map((bullet) => (
                      <div className="flex items-center gap-3 text-sm text-foreground" key={bullet}>
                        <div className="h-2.5 w-2.5 rounded-full bg-brand" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Card className="overflow-hidden rounded-[22px] border-0 shadow-md">
                  <img
                    alt="Tablet restaurant dashboard"
                    className="h-full min-h-[280px] w-full object-cover"
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
                  />
                </Card>
              </CardContent>
            </Card>

            <Card className="rounded-[28px]">
              <CardContent className="flex h-full flex-col gap-8 p-6 lg:p-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ffb08a] text-foreground">
                  <Building2 className="h-5 w-5" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-3xl font-semibold text-foreground">Curated Discovery</h3>
                  <p className="text-sm leading-7 text-muted-foreground">
                    Our marketplace uses AI to match your restaurant with the diners who will love
                    it most, while keeping discovery simple for users who just want a great meal.
                  </p>
                </div>

                <Card className="mt-auto overflow-hidden rounded-[22px] border-0 shadow-md">
                  <img
                    alt="Curated food dishes"
                    className="h-[220px] w-full object-cover"
                    src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80"
                  />
                </Card>
              </CardContent>
            </Card>
          </div>
        </div>
      </Reveal>

      <Reveal className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20" delay={0.08}>
        <div className="rounded-[32px] bg-white px-6 py-10 shadow-sm md:px-12 md:py-14">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
                Marketplace snapshot
              </p>
              <h2 className="mt-3 font-sans text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Restaurants can be discovered and managed in the same system.
              </h2>
            </div>
            <Button asChild variant="secondary">
              <Link to="/marketplace">Explore the marketplace</Link>
            </Button>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {featuredRestaurants.length > 0
              ? featuredRestaurants.map((restaurant) => (
                  <Card className="rounded-[24px] bg-stone-50" key={restaurant._id}>
                    <CardContent className="space-y-3 p-5">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-foreground">{restaurant.name}</h3>
                        <Badge variant={restaurant.isOpen ? "success" : "danger"}>
                          {restaurant.isOpen ? "Open" : "Closed"}
                        </Badge>
                      </div>
                      <p className="text-sm leading-6 text-muted-foreground">{restaurant.address}</p>
                      <div className="flex flex-wrap gap-2">
                        {restaurant.cuisine.slice(0, 2).map((entry) => (
                          <Badge key={entry} variant="brand">
                            {entry}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))
              : Array.from({ length: 3 }).map((_, index) => (
                  <Card className="rounded-[24px] bg-stone-50" key={index}>
                    <CardContent className="space-y-3 p-5">
                      <div className="h-6 w-2/3 animate-pulse rounded bg-stone-200" />
                      <div className="h-4 w-full animate-pulse rounded bg-stone-200" />
                      <div className="h-4 w-5/6 animate-pulse rounded bg-stone-200" />
                    </CardContent>
                  </Card>
                ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="border-t border-border/50 bg-white" delay={0.1}>
        <div className="mx-auto max-w-6xl px-4 py-20 text-center md:px-6">
          <h2 className="font-sans text-4xl font-bold tracking-tight text-foreground md:text-6xl">
            Ready to elevate your hospitality experience?
          </h2>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link to="/partners/register">List Your Kitchen</Link>
            </Button>
            <Button size="lg" type="button" variant="outline">
              Book a Table
            </Button>
          </div>
        </div>
      </Reveal>

      <motion.footer
        className="border-t border-border/60 bg-[#f8f4f1]"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5, ease: easeOutExpo }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 text-sm text-muted-foreground md:flex-row md:items-end md:justify-between md:px-6">
          <div>
            <p className="font-sans text-xl font-bold tracking-[0.14em] text-brand">CHOPMATE</p>
            <p className="mt-3 max-w-sm leading-7">
              Restaurant marketplace and operations software for startups and small restaurants.
            </p>
            <p className="mt-4 text-xs">© 2026 Chopmate. All rights reserved.</p>
          </div>

          <div className="flex flex-wrap gap-6">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#partners">Partner Portal</a>
            <a href="#contact">Contact Us</a>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};
