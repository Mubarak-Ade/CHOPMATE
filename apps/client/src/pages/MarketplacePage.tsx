import { motion } from "framer-motion";
import {
  Clock3,
  Croissant,
  Drumstick,
  Martini,
  Pizza,
  Search,
  Soup,
  Star,
  UtensilsCrossed,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

const categoryItems = [
  { label: "Pizza", icon: Pizza },
  { label: "Rice", icon: Soup },
  { label: "Drinks", icon: Martini },
  { label: "Fast Food", icon: Drumstick },
  { label: "Desserts", icon: Croissant },
];

const recommendedItems = [
  {
    label: "Curated",
    title: "Artisan Truffle Pizza",
    restaurant: "Bella Napoli",
    price: "$24.00",
    rating: "4.9",
    reviews: "1.2k reviews",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80",
  },
  {
    label: "Premium",
    title: "Miso-Glazed Salmon",
    restaurant: "Orizuru Sushi",
    price: "$32.00",
    rating: "4.8",
    reviews: "850 reviews",
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80",
  },
  {
    label: "Popular",
    title: "The Heritage Burger",
    restaurant: "Grill Master",
    price: "$18.50",
    rating: "4.7",
    reviews: "2.4k reviews",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
  },
  {
    label: "Fresh",
    title: "Quinoa Harvest Bowl",
    restaurant: "Green Leaf",
    price: "$16.00",
    rating: "4.9",
    reviews: "500 reviews",
    image:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80",
  },
];

const restaurantItems = [
  {
    title: "The Velvet Room",
    cuisine: "Cocktails & Small Plates",
    price: "$$$",
    rating: "4.9",
    eta: "20-30 MIN",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Pasta Madre",
    cuisine: "Authentic Italian",
    price: "$$",
    rating: "4.8",
    eta: "15-25 MIN",
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Urban Forge",
    cuisine: "Modern American",
    price: "$$$",
    rating: "4.7",
    eta: "30-45 MIN",
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80&sat=-40",
  },
  {
    title: "Ichiraku Ramen",
    cuisine: "Japanese Ramen",
    price: "$",
    rating: "4.9",
    eta: "10-20 MIN",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80",
  },
];

const footerColumns = [
  {
    title: "Explore",
    links: ["Restaurants Near Me", "Popular Cuisines", "Gift Cards", "Premium Membership"],
  },
  {
    title: "Partner With Us",
    links: ["For Restaurants", "Become a Courier", "Business Catering"],
  },
  {
    title: "Support",
    links: ["Help Center", "Privacy Policy", "Terms of Service"],
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.45 },
};

export const MarketplacePage = () => (
  <div className="pb-0">
    <section className="mx-auto max-w-7xl px-4 pb-8 pt-5 md:px-6 md:pb-12">
      <div className="relative overflow-hidden rounded-[28px] bg-[#1f160f] shadow-[0_22px_60px_rgba(56,33,16,0.22)]">
        <img
          alt="Elegant restaurant interior"
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(25,14,8,0.15),rgba(25,14,8,0.45))] backdrop-blur-[6px]" />
        <div className="relative grid min-h-[270px] place-items-center px-6 py-14 text-center sm:min-h-[360px] sm:px-10">
          <div className="w-full max-w-2xl">
            <motion.h1
              animate={{ opacity: 1, y: 0 }}
              className="text-balance text-4xl font-bold tracking-[-0.05em] text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.3)] sm:text-6xl"
              initial={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.55 }}
            >
              Craving Excellence?
            </motion.h1>

            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto mt-8 flex max-w-xl flex-col gap-3 rounded-[30px] border border-white/40 bg-white p-3 shadow-[0_20px_50px_rgba(0,0,0,0.16)] sm:flex-row"
              initial={{ opacity: 0, y: 16 }}
              transition={{ delay: 0.08, duration: 0.55 }}
            >
              <div className="relative flex-1">
                <UtensilsCrossed className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                <Input
                  className="h-14 rounded-2xl border-transparent bg-transparent pl-11 shadow-none placeholder:text-stone-400 focus-visible:ring-0"
                  placeholder="Find food or restaurant..."
                  readOnly
                />
              </div>
              <Button
                className="h-14 rounded-2xl bg-[#c94a16] px-10 text-base font-semibold hover:bg-[#af3f12]"
                size="lg"
                type="button"
              >
                Search
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <motion.div {...fadeUp}>
        <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[#16110d]">
          Browse by Category
        </h2>
        <div className="mt-7 flex flex-wrap gap-4">
          {categoryItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                className="inline-flex items-center gap-3 rounded-2xl bg-white px-6 py-4 text-sm font-medium text-[#211712] shadow-[0_10px_24px_rgba(28,18,10,0.06)] transition-transform hover:-translate-y-0.5"
                key={item.label}
                type="button"
              >
                <Icon className="h-4 w-4 text-[#c53b12]" />
                {item.label}
              </button>
            );
          })}
        </div>
      </motion.div>
    </section>

    <section className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <motion.div {...fadeUp}>
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[#16110d]">
            Recommended For You
          </h2>
          <button className="text-sm font-semibold text-[#c53b12]" type="button">
            View All
          </button>
        </div>

        <div className="mt-7 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {recommendedItems.map((item) => (
            <article key={item.title}>
              <div className="group relative overflow-hidden rounded-[26px] bg-white shadow-[0_12px_28px_rgba(28,18,10,0.08)]">
                <img
                  alt={item.title}
                  className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={item.image}
                />
                <span className="absolute left-4 top-4 rounded-full bg-[#f4eadf] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#b64b22]">
                  {item.label}
                </span>
              </div>
              <div className="space-y-2 px-1 pt-4">
                <h3 className="text-xl font-semibold tracking-[-0.03em] text-[#1c140f]">
                  {item.title}
                </h3>
                <p className="text-sm text-stone-500">
                  {item.restaurant} • {item.price}
                </p>
                <div className="flex items-center gap-2 text-sm text-stone-500">
                  <Star className="h-3.5 w-3.5 fill-[#c53b12] text-[#c53b12]" />
                  <span className="font-semibold text-[#2a1e17]">{item.rating}</span>
                  <span>• {item.reviews}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </motion.div>
    </section>

    <section className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:pb-20">
      <motion.div {...fadeUp}>
        <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[#16110d]">
          Popular Restaurants
        </h2>

        <div className="mt-7 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {restaurantItems.map((item) => (
            <article
              className="overflow-hidden rounded-[26px] bg-white shadow-[0_14px_30px_rgba(28,18,10,0.08)]"
              key={item.title}
            >
              <div className="relative">
                <img alt={item.title} className="h-56 w-full object-cover" src={item.image} />
                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#c54b1f] px-3 py-1.5 text-[11px] font-bold text-white shadow-lg">
                    <Clock3 className="h-3 w-3" />
                    {item.eta}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/88 px-2.5 py-1 text-xs font-semibold text-[#2e2119] backdrop-blur">
                    <Star className="h-3 w-3 fill-[#c53b12] text-[#c53b12]" />
                    {item.rating}
                  </span>
                </div>
              </div>

              <div className="space-y-2 p-4">
                <h3 className="text-xl font-semibold tracking-[-0.03em] text-[#1c140f]">
                  {item.title}
                </h3>
                <p className="text-sm text-stone-500">
                  {item.cuisine} • {item.price}
                </p>
              </div>
            </article>
          ))}
        </div>
      </motion.div>
    </section>

    <footer className="bg-[#2d2928] text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 md:px-6 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="max-w-xs">
          <h3 className="text-[30px] font-bold tracking-[-0.04em]">CHOPMATE</h3>
          <p className="mt-5 text-sm leading-7 text-stone-300">
            Redefining digital service through editorial excellence and seamless culinary
            discovery.
          </p>
        </div>

        {footerColumns.map((column) => (
          <div key={column.title}>
            <h4 className="text-sm font-bold uppercase tracking-[0.18em] text-stone-100">
              {column.title}
            </h4>
            <div className="mt-5 grid gap-4 text-sm text-stone-300">
              {column.links.map((link) => (
                <button
                  className="w-fit text-left transition-colors hover:text-white"
                  key={link}
                  type="button"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 text-sm text-stone-400 md:flex-row md:items-center md:justify-between md:px-6">
          <p>© 2024 CHOPMATE. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button
              aria-label="Search social links"
              className="rounded-full p-2 transition-colors hover:bg-white/5"
              type="button"
            >
              <Search className="h-4 w-4" />
            </button>
            <button
              aria-label="Instagram"
              className="rounded-full p-2 transition-colors hover:bg-white/5"
              type="button"
            >
              <Star className="h-4 w-4" />
            </button>
            <button
              aria-label="Share"
              className="rounded-full p-2 transition-colors hover:bg-white/5"
              type="button"
            >
              <UtensilsCrossed className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  </div>
);
