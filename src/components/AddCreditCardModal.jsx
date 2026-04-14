import React, { useState } from "react";
import axios from "axios";

export default function AddCreditCardModal({ userId, onClose, refresh }) {
  const [form, setForm] = useState({
    name: "",
    limit: "",
    interest: 0,
    due: 0,
    startDate: "",
    endDate: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.post("http://localhost:5000/api/credit-cards", {
        ...form,
        userId,
        used: 0,
      });

      refresh();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">

        <h2>CREATE NEW CREDIT CARD</h2>

        <label>Name</label>
        <input name="name" onChange={handleChange} />

        <label>Limit</label>
        <input name="limit" type="number" onChange={handleChange} />

        <label>Interest rate (%)</label>
        <input name="interest" type="number" onChange={handleChange} />

        <label>Due Amount</label>
        <input name="due" type="number" onChange={handleChange} />

        <label>Start Date</label>
        <input name="startDate" type="date" onChange={handleChange} />

        <label>End Date</label>
        <input name="endDate" type="date" onChange={handleChange} />

        <label>Notes</label>
        <textarea name="notes" onChange={handleChange} />

        <div className="modal-actions">
          <button onClick={onClose}>CANCEL</button>
          <button onClick={handleSave}>SAVE</button>
        </div>

      </div>
    </div>
  );
}