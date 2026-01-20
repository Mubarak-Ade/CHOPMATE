import React from 'react'

export const Brand = ({ button, head, paragraph }) => {
  return (
    <div className="flex gap-6 mb-12">
  
      <div className="flex-shrink-0 w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center">
        <span className="text-white font-bold">{button}</span>
      </div>
      <div>
        <h3 className="text-xl font-bold text-white mb-2">{head}</h3>
        <p className="text-gray-400 leading-relaxed max-w-md">
          {paragraph}
        </p>
      </div>
    </div>
  )
}