import React from 'react'
import Image from "../assets/images/HeroImage.png"
import {Icon} from './custom/Icon'
import {Youtube} from 'lucide-react'

export const Hero=() => {
    return (
        <div className='py-15 bg-slate-grey/10 flex gap-15 justify-center px-8'>
            <div className="max-w-lg w-full">
                <h1 className='text-7xl w-100 font-bold'>Scale Your Kitchen <span className='text-punch-red'>With Confidence.</span></h1>
                <p className='text-2xl mt-10'>The modern onboarding engine for restauranteurs. Automate menu deployment, sync orders instantly, and reclaim your time</p>
                <div className="mt-10 flex gap-5">
                    <button className='px-8 py-4 bg-black text-white font-bold rounded-2xl'>Get Started Now</button>
                    <button className='px-8 py-4 border rounded-2xl font-bold bg-white flex gap-3'> <Icon icon={Youtube} /> Watch Demo</button>
                </div>
            </div>
            <div className="max-w-xl mt-5 shadow-[0_10px_20px] shadow-slate-grey border-4 rounded-4xl overflow-hidden">
                <img src={Image} alt={Image} className='size-full' />
            </div>
        </div>
    )
}
