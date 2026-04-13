import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  FiGrid, FiList, FiCreditCard, FiPieChart,
  FiCalendar, FiDownload, FiSettings, FiHelpCircle,
  FiDollarSign, FiBarChart2, FiLogOut, FiChevronDown,
  FiMenu, FiX
} from 'react-icons/fi'

import '../styles/Sidebar.css'

export default function Sidebar(){

  const navigate = useNavigate()

  const [openMenu,setOpenMenu] = useState(null)  
  const [showSidebar,setShowSidebar] = useState(false)

  const menu = [
    {name:'Overview',path:'/app',icon:<FiGrid/>},
    {name:'Transactions',path:'/app/transactions',icon:<FiList/>},
    {name:'Accounts',path:'/app/accounts',icon:<FiDollarSign/>},
    {name:'Credit cards',path:'/app/creditcards',icon:<FiCreditCard/>},
    {name:'Budgets',path:'/app/budgets',icon:<FiPieChart/>},

    {
      name:'Charts',
      icon:<FiBarChart2/>,
      children:[
        {name:'Category',path:'/app/category-chart'},
        {name:'Time',path:'/app/category-time'}
      ]
    },

    {name:'Calendar',path:'/app/calendar',icon:<FiCalendar/>},

    {
      name:'Import/Export',
      icon:<FiDownload/>,
      children:[
        {name:'Export PDF file',path:'/app/export-pdf'},
        {name:'Export CSV file',path:'/app/export-csv'},
        {name:'Import CSV/PDF file',path:'/app/import'},
      ]
    },
  ]

  const settings = [
    {name:'Setting',path:'/app/setting',icon:<FiSettings/>},
    {name:'Help',path:'/support',icon:<FiHelpCircle/>},
  ]

  function toggleMenu(name){
    setOpenMenu(openMenu === name ? null : name)
  }

  function logout(){
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <>
     
      <div className="mobile-header">
        <button className="menu-btn" onClick={()=>setShowSidebar(true)}>
          <FiMenu/>
        </button>
      </div>

      {showSidebar && <div className="overlay" onClick={()=>setShowSidebar(false)}></div>}

      <aside className={`sidebar ${showSidebar ? "active" : ""}`}>

        <button className="close-btn" onClick={()=>setShowSidebar(false)}>
          <FiX/>
        </button>

       
        <div className="sidebar-brand">
          <div className="sidebar-logo">
            <img src="/financial-analysis.png" alt="logo"/>
          </div>
          <div>
            <div className="sidebar-title">Spendofy</div>
            <div className="sidebar-subtitle">Personal Finance</div>
          </div>
        </div>

       
        <nav className="sidebar-nav">

          {menu.map((m)=>{

            if(m.children){
              return(
                <div key={m.name}>
                  <div 
                    className="sidebar-link"
                    onClick={()=>toggleMenu(m.name)}
                  >
                    <span className="icon">{m.icon}</span>
                    <span>{m.name}</span>
                    <FiChevronDown 
                      style={{
                        marginLeft:'auto',
                        transform: openMenu===m.name ? 'rotate(180deg)' : 'rotate(0)',
                        transition:'0.3s'
                      }}
                    />
                  </div>

                  {openMenu === m.name && (
                    <div className="submenu">
                      {m.children.map((c)=>(
                        <NavLink
                          key={c.name}
                          to={c.path}
                          className={({isActive})=> 'sidebar-sublink' + (isActive? ' active':'')}
                          onClick={()=>setShowSidebar(false)}
                        >
                          {c.name}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              )
            }

            return(
              <NavLink
                key={m.name}
                to={m.path}
                end
                className={({isActive})=> 'sidebar-link' + (isActive? ' active':'')}
                onClick={()=>setShowSidebar(false)}
              >
                <span className="icon">{m.icon}</span>
                <span>{m.name}</span>
              </NavLink>
            )
          })}

         
          <div className="sidebar-sep" />

          {settings.map(s=>(
            <NavLink
              key={s.name}
              to={s.path}
              className={({isActive})=> 'sidebar-link' + (isActive? ' active':'')}
              onClick={()=>setShowSidebar(false)}
            >
              <span className="icon">{s.icon}</span>
              <span>{s.name}</span>
            </NavLink>
          ))}

        </nav>

        
        <div className="sidebar-bottom">
          <div className="sidebar-bottom-row">
            <div className="small">Dark mode</div>
            <input type="checkbox" onChange={e=>{
              document.documentElement.classList.toggle('dark', e.target.checked)
            }} />
          </div>

          <button className="sidebar-logout" onClick={logout}>
            <FiLogOut/> Logout
          </button>
        </div>

      </aside>
    </>
  )
}