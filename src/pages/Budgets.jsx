import React, { useEffect, useState } from 'react'
import '../styles/Budgets.css'
import { FiX, FiEdit2, FiCheck } from 'react-icons/fi'
import axios from "axios";

export default function Budgets() {

  const [list, setList] = useState([])
  const [transactions, setTransactions] = useState([])
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [editIndex, setEditIndex] = useState(null)

  const userId = localStorage.getItem("userId");

  //  LOAD BUDGETS
  useEffect(() => {
    setList(JSON.parse(localStorage.getItem('demo-budgets') || '[]'))
    fetchTransactions()
  }, [])

  //  FETCH TRANSACTIONS
  const fetchTransactions = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/transactions/${userId}`
      );
      setTransactions(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  function saveData(arr) {
    localStorage.setItem('demo-budgets', JSON.stringify(arr))
    setList(arr)
  }

  function add(e) {
    e.preventDefault()
    if (!name || !amount) return

    const arr = [...list]

    if (editIndex !== null) {
      arr[editIndex] = { ...arr[editIndex], name, amount }
      setEditIndex(null)
    } else {
      arr.push({ name, amount })
    }

    saveData(arr)
    setName('')
    setAmount('')
  }

  function remove(index) {
    const arr = [...list]
    arr.splice(index, 1)
    saveData(arr)
  }

  function edit(index) {
    setName(list[index].name)
    setAmount(list[index].amount)
    setEditIndex(index)
  }

  //  CALCULATE SPENT FROM TRANSACTIONS
  const getSpent = (budgetName) => {
    return transactions
      .filter((t) =>
        t.type === "expense" &&
        t.category?.toLowerCase() === budgetName?.toLowerCase()
      )
      .reduce((sum, t) => sum + t.amount, 0);
  }

  return (
    <div className="budgets-container">

      <h1 className="title">💰 Budgets</h1>

      <form onSubmit={add} className="budget-form">

        <input
          className="input"
          placeholder="Category"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <input
          className="input"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />

        <button className="btn-primary" type="submit">
          {editIndex !== null ? <FiCheck /> : 'Add'}
        </button>

      </form>

      <div className="budget-list">

        {list.length ? list.map((b, i) => {

          const spent = getSpent(b.name)
          const percent = Math.min((spent / b.amount) * 100, 100)

          return (
            <div key={i} className="budget-card">

              <div className="budget-top">

                <div>
                  <div className="budget-name">{b.name}</div>
                  <div className="budget-amount">₹{b.amount}</div>
                </div>

                <div className="actions">
                  <button onClick={() => edit(i)} className="edit-btn">
                    <FiEdit2 />
                  </button>
                  <button onClick={() => remove(i)} className="delete-btn">
                    <FiX />
                  </button>
                </div>

              </div>

              {/* Progress Bar */}
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${percent}%` }}
                ></div>
              </div>

              <div className="progress-text">
                ₹{spent} spent
              </div>

            </div>
          )

        }) : (
          <div className="empty">No budgets yet</div>
        )}

      </div>

    </div>
  )
}