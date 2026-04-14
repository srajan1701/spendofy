import React, { useEffect, useState } from 'react'
import { FiBell, FiSearch } from 'react-icons/fi'
import '../styles/Topbar.css'

export default function Topbar(){

  const [initials, setInitials] = useState('U')

  useEffect(() => {
   
    const user = JSON.parse(localStorage.getItem("user"))

    if(user?.name){
      const nameParts = user.name.trim().split(" ")
      const first = nameParts[0]?.charAt(0) || ''
      const last = nameParts[1]?.charAt(0) || ''
      setInitials((first + last).toUpperCase())
    }
  }, [])

  return (
    <div className="topbar">
      <div className="topbar-left">
        <div className="searchbox">
          <FiSearch className="search-icon" />
          <input 
            placeholder="Search transactions, notes..." 
            className="search-input" 
          />
        </div>
      </div>

      <div className="topbar-right">
        <FiBell className="top-icon" />
        <div className="avatar">{initials}</div>
      </div>
    </div>
  )
}