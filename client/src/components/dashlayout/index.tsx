import { Outlet } from 'react-router-dom'
import { DashFooter } from '../dashfooter'
import { DashHeader } from '../dashheader'

export const DashLayout = () => {
  return (
    <>
      <DashHeader />
      <div className='dash-container'>
        <Outlet />
      </div>
      <DashFooter />
    </>
  )
}
