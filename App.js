import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ExpenseList from './components/ExpenseList';
import AddExpense from './components/AddExpense';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleAddExpense = (expense) => {
    alert(`Added expense: ${expense.amount} - ${expense.category}`);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            token ? (
              <>
                <h1>Expense Tracker</h1>
                <AddExpense token={token} onAdd={handleAddExpense} />
                <ExpenseList token={token} />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
      </Routes>
    </Router>
  );
};

export default App;
