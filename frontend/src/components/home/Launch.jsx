
import React from 'react' 
import { Brand } from './Brand'

const infos = [
  {
    button: '01', 
    head: 'Brand Integration',
    paragraph: `Upload your logo, set your house colors, and define your restaurant's digital identity in our simple dashboard.`
  },
  {
    button: '02', 
    head: 'Menu Sync',
    paragraph: `Import your existing menus via PDF or CSV. Our AI automatically parses items, prices, and modifiers into structured data.`
  },
  {
    button: '03', 
    head: 'Instant Go-Live',
    paragraph: `Push to all platforms with a single click. Start receiving orders across web, mobile, and third-party delivery apps immediately.`
  },
]

export const Launch = () => {
  return (
    <div className='bg-[#121212] text-white py-24 px-12 lg:px-24 grid grid-cols-1 md:grid-cols-2 gap-16'>
       
      <div className='flex flex-col justify-center'>
        <h1 className='text-5xl font-black leading-tight mb-6'>
          Launch your system <br /> In minutes.
        </h1>
        <p className='text-gray-400 text-lg mb-8 max-w-sm'>
          We've removed the technical friction so you can focus on the culinary experience.
        </p>
         
        <div className='w-16 h-1 bg-red-500'></div>
      </div>

      <div className='flex flex-col justify-center'>
        {infos.map((info, index) => (
          <Brand 
            key={index}
            button={info.button}
            head={info.head}
            paragraph={info.paragraph}
          />
        ))}
      </div>
    </div>
  )
}