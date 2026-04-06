import React from 'react'
import {Icon} from "../../components/custom/Icon"
import {ArrowLeft, Camera, Image, Plus, X} from "lucide-react"
import {Input} from '../../components/custom/form/Input'
import {useGlobalContext} from '../../context/GlobalContext'

export const RestaurantInfo = () => {

    const {goToNextPage, goToPrevPage} = useGlobalContext()

  return (
    <div className='p-5'>
        <h1 className='text-3xl font-bold '>Restuarant Basic Info</h1>
        <h4 className='mt-2 text-slate-grey text-base'>Tell me about your restaurant to personalize your profile</h4>
        <div className="mt-5">
            <h2 className='text-xl font-bold'>Brand Identity</h2>
            <hr className='mt-2 border-slate-grey/20' />
            <div className="mt-4 flex gap-10">
                <div className="">
                    <h6 className='font-medium mb-2'>Brand Logo <span className='font-normal text-punch-red'>(optional)</span></h6>
                    <div className="flex items-center p-5 justify-center size-30 rounded-full border border-dashed border-punch-red flex-col gap-2">
                        <Icon icon={Camera} size={20} className="text-punch-red" />
                        <p className='text-sm text-punch-red'>Upload</p>
                    </div>
                </div>
                <div className="text-base font-light text-slate-grey">
                    <p>Upload a logo make your restaurant recognizable. </p>
                    <p>Recommended size: 512x512px</p>
                    <p>Formats: PNG, JPG</p>
                </div>
            </div>
        </div>
        <div className="mt-5">
            <h4 className='font-bold text-xl'>Restaurant Details</h4>
            <form action="">
                <Input label="Restaurant Name" placeholder="E.g Mama's Restaurant" />
                <div className="mt-5">
                    <label htmlFor="" className='font-semibold'>Cuisine Type(s)</label>
                    <p className='text-sm text-slate-grey'>Select all that apply or add your own</p>
                    <div className=" px-4 py-3 bg-slate-grey/10 flex rounded-xl border border-slate-grey/80 gap-4 mt-2 items-center">
                        <div className="flex items-center gap-2">
                            <span className='bg-punch-red/80 px-4 py-1 justify-center items-center rounded-xl text-white flex gap-2 '>Nigeria <Icon icon={X} size={15} /></span>
                            <span className='bg-punch-red/80 px-4 py-1 justify-center items-center rounded-xl text-white flex gap-2 '>Italian <Icon icon={X} size={15} /></span>
                        </div>
                        <input placeholder='e.g abdul umar' type="text" className=' px-4 h-full top-0 left-0 placeholder:text-slate-grey/50 text-sm  w-full' />
                    </div>
                    <div className="flex items-center gap-4 mt-4">
                        <span className='border border-punch-red px-2 py-0.5 rounded-full text-punch-red items-center flex gap-1 text-sm'><Icon icon={Plus} size={12} /> Chinese</span>
                        <span className='border border-punch-red px-2 py-0.5 rounded-full text-punch-red items-center flex gap-1 text-sm'><Icon icon={Plus} size={12} /> Continental</span>
                        <span className='border border-punch-red px-2 py-0.5 rounded-full text-punch-red items-center flex gap-1 text-sm'><Icon icon={Plus} size={12} /> Indian</span>
                        <span className='border border-punch-red px-2 py-0.5 rounded-full text-punch-red items-center flex gap-1 text-sm'><Icon icon={Plus} size={12} /> Others</span>
                    </div>
                </div>
                <div className="mt-5">
                    <label htmlFor="" className='font-semibold'>Category</label>
                    <select name="category" id=""  className='w-full px-4 py-3 border border-slate-grey/20 text-slate-grey/50  bg-slate-grey/10 rounded-xl mt-2'>
                        <option value="1">Option 1</option>
                        <option value="1">Option 2</option>
                        <option value="1">Option 3</option>
                    </select>
                </div>
            </form>
        </div>

        <hr className='border-slate-grey/20 mt-5' />

        <div className="mt-5 flex justify-between">
            <button onClick={goToPrevPage} className='text-punch-red font-bold flex gap-2 text-lg items-center cursor-pointer'> <Icon icon={ArrowLeft} /> Back</button>
            <button onClick={goToNextPage} className='bg-punch-red px-8 py-3 rounded-xl font-bold text-white cursor-pointer'>Continue</button>
        </div>
    </div>
  )
}
