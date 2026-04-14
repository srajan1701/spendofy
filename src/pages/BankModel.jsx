import React, { useState } from 'react'
import '../styles/BankModal.css'

export default function BankModal({open,setOpen,onLinked}){
  const [bank,setBank] = useState('')
  if(!open) return null
  return (
    <div className="bankmodal-backdrop">
      <div className="bankmodal">
        <h3>Link your bank </h3>
        <p className="small">This is a demo modal — production uses a bank connector like Plaid.</p>
        <div style={{display:'flex',gap:8,marginTop:12}}>
          <input className="input" placeholder="Search bank name" value={bank} onChange={e=>setBank(e.target.value)} />
          <button className="btn-primary" onClick={()=>{
            const demoTx = [{ date: new Date().toISOString().slice(0,10), type: 'expense', amount: 450, note: 'Bank import - coffee' }]
            const existing = JSON.parse(localStorage.getItem('demo-txs') || '[]')
            localStorage.setItem('demo-txs', JSON.stringify(demoTx.concat(existing)))
            if(onLinked) onLinked()
            setOpen(false)
          }}>Link</button>
        </div>
        <div style={{textAlign:'right',marginTop:12}}>
          <button className="btn" onClick={()=>setOpen(false)}>Close</button>
        </div>
      </div>
    </div>
  )
}
