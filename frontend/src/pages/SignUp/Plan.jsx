import React from 'react';
import { Icon } from '../../components/custom/Icon';
import { Check, ArrowLeft, ArrowRight } from 'lucide-react';
import {useGlobalContext} from '../../context/GlobalContext';

export const Plan = () => {
    const { goToNextPage, goToPrevPage } = useGlobalContext();

    return (
        <div className="w-full p-5">
            <h1 className="text-2xl font-bold mb-4">Choose Your Plan</h1>
            <p className="text-gray mb-6 text-slate-grey/80">
                select the best subscription plan to growth your bussiness
            </p>
            <hr className="border-slate-grey/20 mb-6" />
            <div className="flex gap-5">
                <div className="border-2 rounded-xl p-5 w-full space-y-2 hover:border-punch-red">
                    <h4 className="text-xl font-bold mb-4">Starter</h4>
                    <p>perfect for new bussiness</p>
                    <h1 className="text-3xl font-bold mb-4">Free</h1>
                    <button className="bg-punch-red px-6 py-1 text-white rounded-xl font-bold mb-5 ">
                        Select Plan
                    </button>
                    <h3>FEATURES</h3>
                    <div className="flex gap-2 items-center">
                        <Icon
                            icon={Check}
                            size={14}
                            className={'bg-emerald text-white rounded-full'}
                        />
                        <p className="">1 Restaurant Location</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <Icon
                            icon={Check}
                            size={14}
                            className={'bg-emerald text-white rounded-full'}
                        />
                        <p className="">1 Basic Online</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <Icon
                            icon={Check}
                            size={14}
                            className={'bg-emerald text-white rounded-full'}
                        />
                        <p className="">Up to 50 Oders/</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <Icon
                            icon={Check}
                            size={14}
                            className={'bg-emerald text-white rounded-full '}
                        />
                        <p className="">Email Support</p>
                    </div>
                </div>
                <div className="border-2 rounded-xl p-5 w-full space-y-2 hover:border-punch-red">
                    <h4 className="text-xl font-bold mb-4">Growth</h4>
                    <p>For growing restaurants</p>
                    <h1 className="text-2xl font-bold mb-4">
                        $49<span className="text-xl text-slate-grey/50">/month</span>
                    </h1>
                    <button className="bg-punch-red px-6 py-1 text-white rounded-xl font-bold mb-5 ">
                        Select Plan
                    </button>
                    <h3>EVERYTHING IN STARTER, PLUS</h3>
                    <div className="flex gap-2 items-center">
                        <Icon
                            icon={Check}
                            size={14}
                            className={'bg-emerald text-white rounded-full'}
                        />
                        <p className="">Up to 3 Location</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <Icon
                            icon={Check}
                            size={14}
                            className={'bg-emerald text-white rounded-full'}
                        />
                        <p className="">Advanced Menu Customization</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <Icon
                            icon={Check}
                            size={14}
                            className={'bg-emerald text-white rounded-full'}
                        />
                        <p className="">Unlimited Orders</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <Icon
                            icon={Check}
                            size={14}
                            className={'bg-emerald text-white rounded-full '}
                        />
                        <p className="">Sales Analytics Dashbord</p>
                    </div>
                </div>
                <div className="border-2 rounded-xl p-5 w-full space-y-2 hover:border-punch-red">
                    <h4 className="text-xl font-bold mb-4">Pro</h4>
                    <p>Scale without limits</p>
                    <h1 className="text-2xl font-bold mb-4">
                        $129<span className="text-xl text-slate-grey/50">/month</span>
                    </h1>
                    <button className="bg-punch-red px-6 py-1 text-white rounded-xl font-bold mb-5 ">
                        Select Plan
                    </button>
                    <h3>EVERYTHING IN GROWTH, PLUS</h3>
                    <div className="flex gap-2 items-center">
                        <Icon
                            icon={Check}
                            size={14}
                            className={'bg-emerald text-white rounded-full'}
                        />
                        <p className="">Unlimited Locations</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <Icon
                            icon={Check}
                            size={14}
                            className={'bg-emerald text-white rounded-full'}
                        />
                        <p className="">White-label Mobile App</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <Icon
                            icon={Check}
                            size={14}
                            className={'bg-emerald text-white rounded-full'}
                        />
                        <p className="">Priority 24/7 Support</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <Icon
                            icon={Check}
                            size={14}
                            className={'bg-emerald text-white rounded-full '}
                        />
                        <p className="">API Acess $ integrations</p>
                    </div>
                </div>
            </div>
            <hr className="mt-10 border-slate-grey/20 mb-4" />
            <div className="flex mt-5 mb-6 justify-between">
                <div className="flex gap-2 justify-items-start items-center">
                    <Icon icon={ArrowLeft} className={'absolute '} size={20} />
                    <button onClick={goToPrevPage}  className="font-bold px-6 py-3 text-lg relative">Back</button>
                </div>
                <button onClick={goToNextPage} className="bg-punch-red px-6 py-3 text-white rounded-xl font-bold shadow-[0_2px_10px] shadow-punch-red/50 flex gap-2">
                    Continue to Next Step{' '}
                    <span>
                        <Icon icon={ArrowRight} />
                    </span>
                </button>
            </div>
        </div>
    );
};
