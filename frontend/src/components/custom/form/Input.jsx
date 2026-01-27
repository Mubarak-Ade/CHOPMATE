import React from 'react'

export const Input=({label, placeholder}) => {
    return (
        <div className="mt-5">
            <label htmlFor="" className='font-semibold'>{label}</label>
            <input placeholder={placeholder} type="text" className='bg-slate-grey/10 placeholder:text-slate-grey/50 py-3 px-4 text-sm rounded-xl border border-slate-grey/80 mt-2 w-full' />
        </div>
    )
}
