import React from 'react'
import {SoupIcon} from "lucide-react"
import {Icon} from './custom/Icon'
import {Link} from "react-router"

export const Header = () => {
  return (
    <header className='flex justify-between border border-slate-grey/20 bg-slate-grey/10 items-center px-10 py-5'>
        <div className="flex gap-3 justify-center text-center items-center">
            <Icon size={35} icon={SoupIcon} />
            <Link to="/"><h1 className='text-3xl font-bold'>CHOP<span className='text-punch-red'>MATE</span></h1></Link>
        </div>
        <ul className='flex gap-6 text-base font-bold uppercase'>
            <Link>Features</Link>
            <Link>Benefits</Link>
            <Link>Resources</Link>
        </ul>
        <div className="flex gap-3">
            <Link to="signup" className='font-bold px-6 py-3 text-lg'>Login</Link>
            <Link className='bg-punch-red px-6 py-3 text-white rounded-xl font-bold shadow-[0_2px_10px] shadow-punch-red/50'>Start Free</Link>
        </div>
    </header>
  )
}
