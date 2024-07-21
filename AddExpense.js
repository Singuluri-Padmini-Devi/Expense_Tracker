import React, { useState } from 'react';
import axios from 'axios';

const AddExpense = ({ token, onAdd }) => {
  const [formData, setFormData] = useState({
    date: '',
    amount: '',
    category: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/expenses', formData, {
        headers: { 'x-auth-token': token },
      });
      onAdd(response.data);
    } catch (error) {
      alert('Error adding expense');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="date" name="date" onChange={handleChange} />
      <input type="number" name="amount" placeholder="Amount" onChange={handleChange} />
      <input type="text" name="category" placeholder="Category" onChange={handleChange} />
      <input type="text" name="description" placeholder="Description" onChange={handleChange} />
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default AddExpense;
