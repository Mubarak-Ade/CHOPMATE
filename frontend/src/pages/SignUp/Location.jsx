import React from 'react'
import { Icon } from '../../components/custom/Icon'
import { ArrowLeft, MapIcon, Info } from 'lucide-react'
export const Location = () => {
  return (
    <div className='px-6' py-6>
      <h1 className='text-2xl font-bold mb-5 mt-5'>Location & Contact info</h1>
      <p className='text-slate-grey mb-5'>help customer and delivery find you</p>
      <div className='mb-5 bg-slate-grey/10 border border-slate-grey/20 p-10 rounded-xl'>
       <Icon icon={Info} size={20}  className={'inline-block mr-2 fill-slate-grey text-white'}/>
      </div>
      <form>
        <legend className="font-bold text-xl">Address and location</legend>
       <hr className='mt-4 border-slate-grey/20 mb-4'/>
        <div>
          <label htmlFor='' className='semi-bold'>Street Address</label>
        <input placeholder='e.g 123 main street' type="text" className='bg-slate-grey/20 px-3 py-4 text-sm rounded-xl border border-slate-grey/80 mt-4 w-full mb-5' /></div>
        <div className='flex gap-10'>
          <div className='w-full'>
            <label>City/Area</label>
          <input  placeholder='eg victoria island' type='text'  className='bg-slate-grey/20 px-3 py-4 text-sm rounded-xl border border-slate-grey/80 mt-4 w-full' />
          </div>
          <div className='w-full'>
            <label>Postal Code <span className='text-slate-gray-50'>(optional)</span></label>
          <input placeholder='eg 1777701' type='text' className='bg-slate-grey/20 px-3 py-4 text-sm rounded-xl border border-slate-grey/80 mt-4 w-full'  />
          </div>
        </div>
         <div className='mt-10'>
          <label className='font-bold text-xl'>Pin Location on Map <span className='text-slate-gray-50'>(optional)</span></label>
            <div className='flex items-center justify-center mb-2'>
              <Icon icon={MapIcon} size={50} className={'absolute'} />
              <textarea className='relative bg-slate-grey/20 px-3 py-15 text-sm rounded-xl border border-slate-grey/80 mt-2 w-full' />
            </div>
          <p className='text-slate-grey'>Ajust the pin to the exact enteraance of the restaurant</p>
         </div>
         <div>
           
         </div>
        </form>
        <form className='mt-5'>
          <legend className="font-bold">Conatact Details</legend>
          <hr className='mt-4 border-slate-grey/20 mb-4'/>
          <div className='flex gap-10'>
          <div className='w-full'>
            <label>Bussiness Phone Number</label>
          <input  placeholder='+234(123456789)' type='text'  className='bg-slate-grey/20 px-3 py-4 text-sm rounded-xl border border-slate-grey/80 mt-4 w-full' />
          </div>
          <div className='w-full'>
            <label>Support email <span>(optional)</span></label>
          <input placeholder='support@restaurant.com' type='text' className='bg-slate-grey/20 px-3 py-4 text-sm rounded-xl border border-slate-grey/80 mt-4 w-full'  />
         </div>
           </div>
         <p className='text-slate-grey mt-2'>this can be the same as owner's phone number</p>
        </form>
        <hr className='mt-4 border-slate-grey/20'/>
        <div className='flex mt-5 mb-10 justify-between'>
          <div className='flex gap-2 justify-items-start items-center'>
            <Icon icon={ArrowLeft} className={'absolute '} size={20}/>
          <button  className='font-bold px-6 py-3 text-lg relative'>Back</button>
          </div>
          <button className='bg-punch-red px-6 py-3 text-white rounded-xl font-bold shadow-[0_2px_10px] shadow-punch-red/50' >continue</button>
        </div>
    </div>
  )
}
