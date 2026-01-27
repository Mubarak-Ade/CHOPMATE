import {
    ArrowLeft,
    CheckCircle2Icon,
    Clock,
    Navigation,
    Star,
    Store,
    Utensils,
} from 'lucide-react';
import { Icon } from '../../components/custom/Icon';
import { InfoCard } from '../../components/signup/InfoCard';
import { useGlobalContext } from '../../context/GlobalContext';

export const ConfirmPage = () => {
    const { goToPrevPage } = useGlobalContext();
    return (
        <div className="p-5">
            <div className="">
                <h1 className="text-4xl font-bold">Review & Submit</h1>
                <h4 className="text-slate-grey text-sm mt-2">
                    Please review all information before submitting for approval
                </h4>
            </div>
            <hr className="my-5 border-slate-grey/20" />
            <div className="space-y-4">
                <InfoCard icon={Store} title="Restaurant Information">
                    <div className="flex gap-10 items-center">
                        <span className="p-10 border border-slate-grey bg-slate-grey/20 text-slate-grey fill-slate-grey rounded-xl">
                            <Icon icon={Utensils} size={40} />
                        </span>
                        <div className="grid grid-cols-2 w-full gap-5">
                            <div className="">
                                <h4 className="text-sm font-medium mb-1 text-slate-grey">
                                    RESTAURANT NAME
                                </h4>
                                <h6 className="font-medium text-sm">The Green Garden Bistro</h6>
                            </div>
                            <div className="">
                                <h4 className="text-sm font-medium mb-1 text-slate-grey">
                                    CUISINE TYPE
                                </h4>
                                <h6 className="font-medium text-sm">Vegetarian & Organic</h6>
                            </div>
                            <div className="">
                                <h4 className="text-sm font-medium mb-1 text-slate-grey">
                                    CATEGORY
                                </h4>
                                <h6 className="font-medium text-sm">Casual Dining</h6>
                            </div>
                            <div className="">
                                <h4 className="text-sm font-medium mb-1 text-slate-grey">
                                    WEBSITE
                                </h4>
                                <h6 className="font-medium text-sm">www.website.com</h6>
                            </div>
                        </div>
                    </div>
                </InfoCard>
                <InfoCard icon={Navigation} title="Location & Contact">
                    <div className="">
                        <h4 className="text-sm font-medium mb-1 text-slate-grey">FULL ADDRESS</h4>
                        <h6 className="font-medium text-sm">
                            102 street by the street, Gwale Local Government
                        </h6>
                    </div>
                    <div className="grid grid-cols-2 mt-5">
                        <div className="">
                            <h4 className="text-sm font-medium mb-1 text-slate-grey">
                                Phone Number
                            </h4>
                            <h6 className="font-medium text-sm">+234-123456789</h6>
                        </div>
                        <div className="">
                            <h4 className="text-sm font-medium mb-1 text-slate-grey">
                                Email Address
                            </h4>
                            <h6 className="font-bold text-sm">contact@gmail.com</h6>
                        </div>
                    </div>
                </InfoCard>
                <InfoCard icon={Clock} title="Operating Hours">
                    <div className="grid grid-cols-2 gap-5">
                        {Array.from([
                            'Monday',
                            'Tuesday',
                            'Wednesday',
                            'Thursday',
                            'Friday',
                            'Saturday',
                            'Sunday',
                        ]).map((day, index) => (
                            <div
                                key={index}
                                className="border-b py-2 border-slate-grey/20 flex justify-between"
                            >
                                <h6 className="text-slate-grey">{day}</h6>
                                <h5 className="text-carbon-black font-bold">09:00-21:00</h5>
                            </div>
                        ))}
                    </div>
                </InfoCard>
                <InfoCard icon={CheckCircle2Icon} title={'Selected Plan'}>
                    <div className="bg-white px-5 py-4 rounded-xl border border-slate-grey/20 flex gap-2 items-center">
                        <span className="size-14 rounded-full flex items-center justify-center p-3 bg-punch-red/20">
                            <Icon icon={Star} className="fill-punch-red text-punch-red" />
                        </span>
                        <div className="flex-1">
                            <h2 className="font-bold text-xl">Professional Plan</h2>
                            <h6 className="text-sm text-slate-grey mt-1">
                                Perfect for growing bussiness
                            </h6>
                        </div>
                        <div className="text-slate-grey">
                            <h2 className="text-base">
                                <span className="text-2xl font-bold text-carbon-black">$49</span>/mo
                            </h2>
                            <h6 className="text-sm">Billed Monthly</h6>
                        </div>
                    </div>
                </InfoCard>
                <div className="flex items-center gap-5 bg-slate-grey/10 rounded-xl border border-slate-grey px-5 py-4">
                    <input type="checkbox" className="size-5" />
                    <div className="">
                        <h6 className="font-medium">
                            I confirm that all the information provided is accurate
                        </h6>
                        <p className="text-sm text-slate-grey">
                            By clicking submit, you agree to our{' '}
                            <span className="text-punch-red font-medium">Terms of Service</span> and{' '}
                            <span className="text-punch-red font-medium">Privacy Policy</span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="mt-5 flex justify-between">
                <button
                    onClick={goToPrevPage}
                    className="text-slate-grey font-bold flex gap-2 text-lg items-center cursor-pointer"
                >
                    {' '}
                    <Icon icon={ArrowLeft} /> Back
                </button>
                <div className="flex gap-2">
                    <button className="border border-slate-grey px-8 py-3 rounded-xl font-bold text-black cursor-pointer">
                        Save Draft
                    </button>
                    <button className="bg-punch-red px-8 py-3 rounded-xl font-bold text-white cursor-pointer">
                        Submit for Approval
                    </button>
                </div>
            </div>
        </div>
    );
};
