import {Outlet} from 'react-router'
import {Sidebar} from './Sidebar'

export const Layout = () => {
  return (
    <div className='flex w-full h-full'>
        <Sidebar />
        <main className='w-full h-full'>
         <Outlet />
        </main>
    </div>
  )
}
