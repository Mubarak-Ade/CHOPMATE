import React from 'react'
import {FeaturesCard} from './FeaturesCard'
import {BookIcon, icons, Info} from 'lucide-react'

const infos = [
    {icon: BookIcon, title: "Smart Menus", content: 
        "Centralize your menu management. one update here everywhere _delivery apps, in-house tablets, and QR code instantly."
    },
    {icon: BookIcon, title: "Smart Menus", content: 
        "Centralize your menu management. one update here everywhere _delivery apps, in-house tablets, and QR code instantly."
    },
    {icon: BookIcon, title: "Smart Menus", content: 
        "Centralize your menu management. one update here everywhere _delivery apps, in-house tablets, and QR code instantly."
    },

]
export const Features = () => {
  return (
    <div className='h-screen p-20'>
        <h3 className='text-punch-red text-center font-bold '>CORE CAPABILITIES</h3>
        <h1 className='font-bold text-center text-3xl'>Engineering for speed, built for reliability</h1>
         {infos.map((info, index) => (
            <FeaturesCard icon={info.icon} title={info.title} content={info.content}/>
         ))}
    </div>
  )
}
