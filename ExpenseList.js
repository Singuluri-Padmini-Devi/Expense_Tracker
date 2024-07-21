import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExpenseList = ({ token }) => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/expenses', {
          headers: { 'x-auth-token': token },
        });
        setExpenses(response.data);
      } catch (error) {
        alert('Error fetching expenses');
      }
    };
    fetchExpenses();
  }, [token]);

  return (
    <ul>
      {expenses.map((expense) => (
        <li key={expense._id}>
          {expense.date}: {expense.category} - ${expense.amount} ({expense.description})
        </li>
      ))}
    </ul>
  );
};

export default ExpenseList;
