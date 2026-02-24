import React from 'react'

export const Input=({label, placeholder}) => {
    return (
        <div className="mt-5 w-full">
            <label htmlFor="" className='font-semibold text-sm'>{label}</label>
            <input placeholder={placeholder} type="text" className='bg-slate-grey/10 placeholder:text-slate-grey/50 py-2.5 px-4 text-sm rounded-md border border-slate-grey/80 mt-2 w-full' />
        </div>
    )
}
