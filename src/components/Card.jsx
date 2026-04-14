import React from 'react'
import '../styles/Card.css'

export default function Card({ title, value, color }) {
  return (
    <div className="card card-shadow">
      <div className="small">{title}</div>
      <div style={{fontSize:20,fontWeight:700,color:color||'inherit'}}>{value}</div>
    </div>
  )
}
