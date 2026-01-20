import React from 'react'

export const Sidebar = () => {
  return (
    <ul className='w-100 border-r border-slate-grey/20 bg-slate-grey/10 min-h-screen p-4 space-y-12'>
        <li className='flex relative after:absolute items-center gap-4 after:h-full after:w-0.5 after:-bottom-12 after:left-5 after:bg-punch-red/20'>
            <button className='py-1.5 px-3.5 rounded-full bg-punch-red text-white text-xl'>1</button>
            <div className="">
                <h4 className='font-bold'>Account Creation</h4>
                <p className='text-sm text-slate-grey'>Set up your admin profile</p>
            </div>
        </li>
       <li className='flex relative after:absolute items-center gap-4 after:h-full after:w-0.5 after:-bottom-12 after:left-5 after:bg-punch-red/20'>
            <button className='py-1.5 px-3.5 rounded-full bg-punch-red text-white text-xl'>2</button>
            <div className="">
                <h4 className=' font-bold'>Verification</h4>
                <p className='text-sm text-slate-grey'>Verify email & phone</p>
            </div>
        </li>
        <li className='flex items-center gap-4 after:bg-punch-red/20'>
            <button className='py-1.5 px-3.5 rounded-full text-white bg-punch-red text-xl'>3</button>
            <div className="">
                <h4 className=' font-bold'>Bussiness Setup</h4>
                <p className='text-sm text-slate-grey'>Register your account</p>
            </div>
        </li>
    </ul>
  )
}
