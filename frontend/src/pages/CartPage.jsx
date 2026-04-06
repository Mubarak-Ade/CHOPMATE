import React from 'react';
import { Link } from 'react-router';
import { ArrowRight, BadgePercent, Minus, Plus, ShieldCheck, Trash2, Truck } from 'lucide-react';
import { Icon } from '../components/custom/Icon';
import Food1 from '../assets/images/Gemini_Generated_Image_wim5ftwim5ftwim5.png';
import Food2 from '../assets/images/Gemini_Generated_Image_wphtetwphtetwpht.png';

const cartItems = [
    {
        id: 1,
        name: 'Bruschetta Trio',
        restaurant: 'Casa Roma',
        description: 'Heirloom tomato, basil oil, toasted sourdough.',
        price: 6.99,
        quantity: 2,
        image: Food1,
    },
    {
        id: 2,
        name: 'Smoky Wings',
        restaurant: 'Firehouse Grill',
        description: 'Charred pepper glaze, sesame crunch.',
        price: 8.75,
        quantity: 1,
        image: Food2,
    },
];

const summary = {
    subtotal: 22.73,
    delivery: 2.5,
    tax: 1.89,
    discount: 3.0,
};

const total = summary.subtotal + summary.delivery + summary.tax - summary.discount;

export const CartPage = () => {
    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-bright-snow via-bright-snow to-sandy-brown/10">
            <div className="pointer-events-none absolute -left-32 top-16 h-72 w-72 rounded-full bg-punch-red/10 blur-3xl" />
            <div className="pointer-events-none absolute right-10 top-40 h-80 w-80 rounded-full bg-sandy-brown/25 blur-3xl" />

            <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16 font-['Space_Grotesk'] lg:px-10">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-grey">
                            Your Bag
                        </p>
                        <h1 className="mt-2 text-4xl font-semibold text-carbon-black font-['Fraunces']">
                            Cart Overview
                        </h1>
                        <p className="mt-3 max-w-xl text-sm text-slate-grey">
                            Review your picks, adjust quantities, and lock in delivery details when you are ready.
                        </p>
                    </div>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 rounded-full border border-slate-grey/30 bg-white px-5 py-2 text-sm font-semibold text-carbon-black shadow-sm"
                    >
                        Continue Shopping
                        <Icon icon={ArrowRight} size={16} className="text-punch-red" />
                    </Link>
                </div>

                <div className="grid gap-8 lg:grid-cols-[1.45fr_0.8fr]">
                    <section className="space-y-6">
                        {cartItems.map((item) => (
                            <article
                                key={item.id}
                                className="flex flex-col gap-5 rounded-2xl border border-slate-grey/15 bg-white p-5 shadow-[0_16px_45px_-35px] shadow-carbon-black/30 md:flex-row"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="h-32 w-full rounded-2xl object-cover md:h-32 md:w-40"
                                />
                                <div className="flex flex-1 flex-col gap-4">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-grey">
                                                {item.restaurant}
                                            </p>
                                            <h2 className="text-2xl font-semibold text-carbon-black font-['Fraunces']">
                                                {item.name}
                                            </h2>
                                            <p className="mt-2 text-sm text-slate-grey">{item.description}</p>
                                        </div>
                                        <button className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-grey">
                                            <Icon icon={Trash2} size={16} className="text-punch-red" />
                                            Remove
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap items-center justify-between gap-4">
                                        <p className="text-lg font-semibold text-carbon-black">
                                            ${item.price.toFixed(2)}
                                        </p>
                                        <div className="flex items-center gap-3 rounded-full bg-bright-snow px-4 py-2">
                                            <button className="rounded-full bg-white p-1 text-carbon-black">
                                                <Icon icon={Minus} size={20} />
                                            </button>
                                            <span className="text-sm font-semibold">{item.quantity}</span>
                                            <button className="rounded-full bg-punch-red p-1 text-white">
                                                <Icon icon={Plus} size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}

                        <div className="rounded-2xl border border-dashed border-slate-grey/30 bg-white/70 p-6">
                            <div className="flex flex-wrap items-center gap-3">
                                <div className="flex size-10 items-center justify-center rounded-full bg-punch-red/10">
                                    <Icon icon={BadgePercent} size={18} className="text-punch-red" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-carbon-black">
                                        Apply a promo code
                                    </p>
                                    <p className="text-xs text-slate-grey">
                                        Use code CHOPMATE10 for a quick 10% boost.
                                    </p>
                                </div>
                                <button className="ml-auto rounded-full bg-carbon-black px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                                    Add Code
                                </button>
                            </div>
                        </div>
                    </section>

                    <aside className="space-y-6">
                        <div className="rounded-2xl border border-slate-grey/15 bg-white p-6 shadow-[0_16px_40px_-35px] shadow-carbon-black/30">
                            <h3 className="text-xl font-semibold text-carbon-black font-['Fraunces']">
                                Order Summary
                            </h3>
                            <div className="mt-6 space-y-3 text-slate-grey">
                                <div className="flex items-center justify-between">
                                    <span>Subtotal</span>
                                    <span className="font-semibold text-carbon-black">
                                        ${summary.subtotal.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Delivery</span>
                                    <span className="font-semibold text-carbon-black">
                                        ${summary.delivery.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Tax</span>
                                    <span className="font-semibold text-carbon-black">
                                        ${summary.tax.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-emerald">
                                    <span>Discount</span>
                                    <span className="font-semibold">-${summary.discount.toFixed(2)}</span>
                                </div>
                            </div>
                            <div className="mt-6 flex items-center justify-between border-t border-slate-grey/20 pt-5">
                                <span className="text-sm font-semibold text-carbon-black">Total</span>
                                <span className="text-2xl font-semibold text-carbon-black">
                                    ${total.toFixed(2)}
                                </span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <input type="text" className='bg-slate-grey/10 rounded-xl w-full py-3 px-2' />
                                <button className='px-6 py-2 font-bold  rounded-xl bg-slate-grey/20'>Apply</button>
                            </div>
                            <button className="mt-6 flex w-full items-center font-['Work_Sans'] justify-center gap-3 rounded-xl bg-punch-red px-5 py-4 font-semibold text-white shadow-[0_12px_25px_-15px] shadow-punch-red/60">
                                Go to Checkout
                                <Icon icon={ArrowRight} size={18} />
                            </button>
                            <p className="mt-4 text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-grey">
                                Secure SSL Checkout
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-grey/15 bg-carbon-black p-6 text-white">
                            <h3 className="text-lg font-semibold font-['Fraunces']">
                                Delivery Promise
                            </h3>
                            <ul className="mt-4 space-y-3 text-sm text-bright-snow/80">
                                <li className="flex items-center gap-3">
                                    <span className="flex size-8 items-center justify-center rounded-full bg-white/10">
                                        <Icon icon={Truck} size={16} />
                                    </span>
                                    Live tracking on every order.
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="flex size-8 items-center justify-center rounded-full bg-white/10">
                                        <Icon icon={ShieldCheck} size={16} />
                                    </span>
                                    Temperature-sealed packaging.
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="flex size-8 items-center justify-center rounded-full bg-white/10">
                                        <Icon icon={BadgePercent} size={16} />
                                    </span>
                                    Loyalty points on every bite.
                                </li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};
