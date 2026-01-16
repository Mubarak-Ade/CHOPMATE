import React from 'react'
import {Icon} from './custom/Icon'

export const FeaturesCard = ({ icon, title, content, bgColor }) => {
  return (
     
    <div className='flex-1 border-2 border-gray-100 rounded-[32px] px-8 py-10 bg-white shadow-sm'>
       
      <div className={`${bgColor} w-14 h-14 rounded-2xl flex items-center justify-center mb-6`}>
      <Icon icon={icon} className="text-white w-7 h-7"/>
      </div>
      
       
      <h1 className='font-black text-2xl text-gray-900 mb-4'>{title}</h1>
      
       
      <p className='text-gray-500 leading-relaxed font-medium'>{content}</p>
    </div>
  )
}