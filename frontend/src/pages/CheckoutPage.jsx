import React from 'react';
import { Icon } from '../components/custom/Icon';
import { ArrowRight, CreditCard, MapPin, Tag, User, WalletCards } from 'lucide-react';
import { Input } from '../components/custom/form/Input';
import Food1 from '../assets/images/Gemini_Generated_Image_wim5ftwim5ftwim5.png';
import Food2 from '../assets/images/Gemini_Generated_Image_wphtetwphtetwpht.png';

const foods = [
    {
        name: 'Bruschetta',
        categories: 'Appetizers',
        description: 'Toasted bread slices topped with tomatoes, garlic, and basil',
        price: '$6.99',
        image: Food1,
    },
    {
        name: 'Chicken Wings',
        categories: 'Appetizers',
        description: 'Crispy chicken wings with buffalo or BBQ sauce',
        price: '$7.99',
        image: Food2,
    },
];

export const CheckoutPage = () => {
    return (
        <div className="p-20">
            <h1 className="text-4xl font-medium">Checkout</h1>
            <div className="flex gap-8 mt-8">
                <div className="max-w-2xl w-full">
                    <div className="mt-4 bg-slate-grey/10 p-5 rounded-md">
                        <h1 className="flex gap-2 text-xl font-bold">
                            <Icon icon={MapPin} className="text-punch-red" /> Delivery Address
                        </h1>
                        <form action="">
                            <Input label={'Street Address'} placeholder={'402 Kofar Dawanau'} />
                            <div className="flex gap-4">
                                <Input
                                    label={'Appartment/Suite (Optional)'}
                                    placeholder={'E.g Apt 4B'}
                                />
                                <Input label={'City'} placeholder={'Kano City'} />
                            </div>
                            <div className="flex gap-4">
                                <Input label={'Postal Code'} placeholder={'11000'} />
                                <Input
                                    label={'Delivery Instructions'}
                                    placeholder={'Leave at the front door'}
                                />
                            </div>
                        </form>
                    </div>
                    <div className="mt-4 bg-slate-grey/10 p-5 rounded-md">
                        <h1 className="flex gap-2 text-xl font-bold">
                            <Icon icon={User} className="" /> Confirm Information
                        </h1>
                        <form action="">
                            <div className="flex gap-4">
                                <Input label={'First Name'} placeholder={'Alex'} />
                                <Input label={'Last Name'} placeholder={'John'} />
                            </div>
                            <div className="flex gap-4">
                                <Input label={'Email Address'} placeholder={'user@gmail.com'} />
                                <Input label={'Phone Number'} placeholder={'+234-123456789'} />
                            </div>
                        </form>
                    </div>
                    <div className="mt-4 bg-slate-grey/10 p-5 rounded-md">
                        <h1 className="flex gap-2 text-xl font-bold">
                            <Icon icon={WalletCards} className="" /> Payment Options
                        </h1>
                        <div className="mt-8 space-y-4">
                            <label className="border items-center border-slate-grey/20 px-3 py-2 flex justify-between rounded-xl has-checked:bg-punch-red/5 has-checked:border-punch-red">
                                <div className="flex items-center gap-2 px-2">
                                    <Icon icon={CreditCard} size={30} />
                                    <div className="p-2">
                                        <h4 className="font-bold">Credit or Debit Card</h4>
                                        <h6 className="text-sm text-slate-grey">
                                            Ending in ....4247
                                        </h6>
                                    </div>
                                </div>
                                <input
                                    type="radio"
                                    name="payment"
                                    id="wallet"
                                    className="cursor-pointer size-5 checked:accent-punch-red"
                                />
                            </label>
                            <label className="border items-center border-slate-grey/20 px-3 py-2 flex justify-between rounded-xl has-checked:bg-punch-red/5 has-checked:border-punch-red">
                                <div className="flex items-center gap-2 px-2">
                                    <Icon icon={CreditCard} size={30} />
                                    <div className="p-2">
                                        <h4 className="font-bold">Apple or Google Pay</h4>
                                        <h6 className="text-sm text-slate-grey">
                                            Fast and Secure Checkout
                                        </h6>
                                    </div>
                                </div>
                                <input
                                    type="radio"
                                    name="payment"
                                    id="wallet"
                                    className="cursor-pointer size-5 checked:accent-punch-red"
                                />
                            </label>
                            <label className="border items-center border-slate-grey/20 px-3 py-2 flex justify-between rounded-xl has-checked:bg-punch-red/5 has-checked:border-punch-red">
                                <div className="flex items-center gap-2 px-2">
                                    <Icon icon={CreditCard} size={30} />
                                    <div className="p-2">
                                        <h4 className="font-bold">Cash on Delivery</h4>
                                        <h6 className="text-sm text-slate-grey">
                                            Pay when your food arrives
                                        </h6>
                                    </div>
                                </div>
                                <input
                                    type="radio"
                                    name="payment"
                                    id="wallet"
                                    className="cursor-pointer size-5 checked:accent-punch-red"
                                />
                            </label>
                        </div>
                        <div className="">
                            <Input label={'Card Number'} placeholder={'.......4242'} />
                            <div className="flex gap-4">
                                <Input label={'Expiry Date'} placeholder={'12/26'} />
                                <Input label={'CVV'} placeholder={'...'} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-5 max-w-lg w-full">
                    <div className="bg-slate-grey/10 p-5 rounded-md">
                        <h1 className="text-xl font-bold">Order Summary</h1>
                        <ul className="mt-5 space-y-4">
                            {foods.map((food) => (
                                <li className="flex justify-between" key={food.name}>
                                    <div className="flex gap-5">
                                        <img className='size-20 rounded-md aspect-square object-cover' src={food.image} alt="" />
                                        <div className="">
                                            <h2 className='font-bold'>{food.name}</h2>
                                            <h4 className='line-clamp-1'>{food.description}</h4>
                                        </div>
                                    </div>
                                    <h6>{food.price}</h6>
                                </li>
                            ))}
                        </ul>
                        <div className="space-y-2 mt-4">
                            <div className="flex items-center justify-between text-slate-grey">
                                <h6>Subtotal</h6>
                                <span>$13.49</span>
                            </div>
                            <div className="flex items-center justify-between text-slate-grey">
                                <h6>Delivery Fee</h6>
                                <span>$13.49</span>
                            </div>
                            <div className="flex items-center justify-between text-slate-grey">
                                <h6>Tax and Service</h6>
                                <span>$13.49</span>
                            </div>
                            <div className="flex items-center justify-between text-green-500">
                                <h6>Discount (First30)</h6>
                                <span>$13.49</span>
                            </div>
                        </div>
                        <div className="mt-5">
                            <div className="flex justify-between">
                                <h1 className='text-xl font-bold'>Order Total</h1>
                                <h2 className='text-xl font-bold'>$26.30</h2>
                            </div>
                            <button className='mt-4 flex gap-2 py-4 w-full rounded-xl text-white font-bold justify-center bg-punch-red'>
                                Place Order <Icon icon={ArrowRight} />
                            </button>
                            <p className='text-center text-slate-grey/60 mt-5 '>SECURE SSL ENCRYPTED CHECKOUT</p>
                        </div>
                    </div>
                    <div className="flex justify-between mt-5 bg-slate-grey/10 p-5 rounded-xl">
                        <p className='flex items-center justify-center gap-2'><Icon className="fill-black text-white" icon={Tag} />Promo Code</p>
                        <button className='text-punch-red font-bold cursor-pointer'>Apply</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
