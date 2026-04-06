import React from 'react';
import { Icon } from '../../components/custom/Icon';
import { ArrowLeft, MapIcon, Info } from 'lucide-react';
import { useGlobalContext } from '../../context/GlobalContext';
import { Input } from '../../components/custom/form/Input';
export const Location = () => {
    const { goToNextPage, goToPrevPage } = useGlobalContext();

    return (
        <div className="px-6" py-6>
            <h1 className="text-2xl font-bold mb-5 mt-5">Location & Contact info</h1>
            <p className="text-slate-grey mb-5">help customer and delivery find you</p>
            <div className="mb-5 bg-slate-grey/10 border border-slate-grey/20 p-10 rounded-xl">
                <Icon
                    icon={Info}
                    size={20}
                    className={'inline-block mr-2 fill-slate-grey text-white'}
                />
            </div>
            <form>
                <legend className="font-bold text-xl">Address and location</legend>
                <hr className="mt-4 border-slate-grey/20 mb-4" />
                <Input label={'Street Address'} placeholder={'e.g 123 main street'} />

                <div className="flex gap-10">
                    <Input label={'City/Area'} placeholder={'eg victoria island'} />
                    <Input label={'Postal Code'} placeholder={'eg 1777701'} />
                </div>
                <div className="mt-10">
                    <h4 className="font-medium text-lg mb-2">
                        Pin Location on Map{' '}
                        <span className="text-slate-gray-50 text-sm font-normal text-slate-grey">
                            (optional)
                        </span>
                    </h4>
                    <div className="flex items-center justify-center mb-2">
                        <Icon icon={MapIcon} size={50} className={'absolute'} />
                        <textarea className="relative bg-slate-grey/10 px-3 py-15 text-sm rounded-xl border border-slate-grey/80 mt-2 w-full" />
                    </div>
                    <p className="text-slate-grey text-sm">
                        Adjust the pin to the exact enteraance of the restaurant
                    </p>
                </div>
                <div></div>
            </form>
            <form className="mt-5">
                <legend className="font-bold">Conatact Details</legend>
                <hr className="mt-4 border-slate-grey/20 mb-4" />
                <div className="flex gap-10">
                    <Input label={'Business Phone Number'} placeholder={'+234(123456789)'} />
                    <Input label={'Business Email'} placeholder={'business@restaurant.com'} />
                </div>
                <p className="text-slate-grey mt-2 text-sm">This can be the same as owner's phone number</p>
            </form>
            <hr className="mt-4 border-slate-grey/20" />
            <div className="flex mt-5 mb-10 justify-between">
                <div className="flex gap-2 justify-items-start items-center">
                    <Icon icon={ArrowLeft} className={'absolute text-slate-grey'} size={20} />
                    <button onClick={goToPrevPage} className="font-bold px-6 py-3 text-lg relative text-slate-grey">
                        Back
                    </button>
                </div>
                <button
                    onClick={goToNextPage}
                    className="bg-punch-red px-8 py-2 text-white rounded-xl font-bold shadow-[0_2px_10px] shadow-punch-red/50"
                >
                    Continue
                </button>
            </div>
        </div>
    );
};
