import React from 'react'
import SideBar from './SideBar'
import { Outlet } from 'react-router-dom';

const AdminScreen = () => {
  return (
    <div>
      <SideBar />
      <Outlet />
    </div>
  )
}

export default AdminScreen;