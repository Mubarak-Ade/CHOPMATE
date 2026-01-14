import React from 'react'
import {SoupIcon} from "lucide-react"
import {Icon} from './custom/Icon'

export const Header = () => {
  return (
    <header className='flex justify-between border-2 border-gray-200 items-center px-10 py-5'>
        <div className="flex gap-3 justify-center text-center items-center">
            <Icon size={35} icon={SoupIcon} />
            <h1 className='text-3xl font-bold'>CHOP<span className='text-punch-red'>MATE</span></h1>
        </div>
        <ul className='flex gap-6 text-lg font-bold uppercase'>
            <li>Features</li>
            <li>Benefits</li>
            <li>Resources</li>
        </ul>
        <div className="flex gap-3">
            <button className='font-bold px-6 py-3 text-lg'>Login</button>
            <button className='bg-punch-red px-6 py-3 text-white rounded-xl font-bold shadow-[0_2px_10px] shadow-punch-red/50'>Start Free</button>
        </div>
    </header>
  )
}
