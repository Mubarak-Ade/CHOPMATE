import React from 'react'
import { Quote } from 'lucide-react'
import {Icon} from './custom/Icon'

export const TestimonialSection = () => {
  return (
    <div className="bg-gray-50 py-20 px-6">
      
      <div className="relative max-w-4xl mx-auto bg-white border border-gray-100 rounded-[40px] p-12 shadow-xl shadow-gray-200/50 mb-20">
        
        
        <div className="absolute -top-6 left-10 bg-[#e14949] w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/30">
          <Icon size={100} icon={Quote} className="text-white fill-white w-12 h-12" />
        </div>

      
        <blockquote className="text-2xl md:text-3xl font-black italic text-gray-800 leading-tight mb-10">
          "ChopMATE didn't just give us a new website; they gave us our weekends back. 
          The automated onboarding and menu sync saved us hundreds of manual hours."
        </blockquote>

         
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gray-200 overflow-hidden">
             <img src="" alt="Sarah" className="w-full h-full object-cover" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-lg">Sarah Jenkins</h4>
            <p className="text-gray-500 text-sm">Founder, The Artisan Kitchen</p>
          </div>
        </div>
      </div>

      {/* 2. Call to Action (CTA) Section */}
      <div className="max-w-5xl mx-auto bg-[#0a0a0a] rounded-[40px] p-12 md:p-20 text-center border border-white/10">
        <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
          Ready to transform <br className="hidden md:block"/> your restaurant?
        </h2>
        <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
          Join over 1,000 kitchens streamlining their operations. <br /> 
          No credit card required to start.
        </p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <button className="w-full md:w-auto bg-[#e14949] text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg shadow-red-500/40 hover:bg-red-600 transition-all">
            Get Started For Free
          </button>
          <button className="w-full md:w-auto bg-white text-black px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  )
}