import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import BankModal from '../pages/BankModel'
import '../styles/Layout.css'
import { Outlet } from 'react-router-dom'

export default function Layout(){

  const [openBank,setOpenBank] = useState(false)

  return (
    <div className="layout-root">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="layout-main">

        {/* HEADER */}
        <div className="layout-header">

         

          <div style={{
            display:'flex',
            gap:'10px',
            flexWrap:'wrap'
          }}>
          

            
          </div>

        </div>

        {/* TOPBAR */}
        <Topbar />

        {/* PAGE CONTENT */}
        <div className="layout-content">
          <Outlet />
        </div>

      </main>

      {/* MODAL */}
      <BankModal 
        open={openBank} 
        setOpen={setOpenBank} 
        onLinked={()=>window.location.reload()} 
      />

    </div>
  )
}