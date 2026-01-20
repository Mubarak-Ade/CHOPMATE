import React from 'react'
import { FeaturesCard } from './FeaturesCard'
import { Book, Layers, LineChart } from 'lucide-react'

const infos = [
  {
    icon: Book, 
    title: "Smart Menus", 
    bgColor: "bg-punch-red", 
    content: "Centralize your menu management. One update here reflects everywhere — delivery apps, in-house tablets, and QR codes instantly."
  },
  {
    icon: Layers, 
    title: "Unified Orders", 
    bgColor: "bg-emerald", 
    content: "Eliminate tablet clutter. All third-party delivery orders flow directly into your POS and Kitchen Display System effortlessly."
  },
  {
    icon: LineChart, 
    title: "Deep Analytics", 
    bgColor: "bg-sandy-brown",
    content: "Get real-time insights into your best-selling items, peak hours, and server performance with visual, actionable reports."
  },
]

export const Features = () => {
  return (
    <div className='py-24 px-10 max-w-7xl mx-auto'>
         
        <div className="mb-16">
          <h3 className='text-[#e14949] text-center font-black tracking-widest text-sm mb-4 uppercase'>
            Core Capabilities
          </h3>
          <h1 className='font-black text-center text-5xl text-gray-900 leading-tight'>
            Engineered for speed, <br /> built for reliability.
          </h1>
        </div>

    
        <div className='flex flex-col md:flex-row gap-8'>
             {infos.map((info, index) => (
            <FeaturesCard 
              key={index}
              icon={info.icon} 
              title={info.title} 
              content={info.content}
              bgColor={info.bgColor}
            />
         ))}
        </div>
    </div>
  )
}