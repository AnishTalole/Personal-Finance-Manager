import React, { useEffect, useState } from "react";
import axios from "axios";

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:5000/api/expenses", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setExpenses(res.data))
      .catch((err) => console.error(err));
  }, []);

  const addExpense = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/expenses/add", { title, amount }, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setExpenses([...expenses, res.data]))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h2>Expense Tracker</h2>
      <form onSubmit={addExpense}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <button type="submit">Add Expense</button>
      </form>
      <ul>
        {expenses.map((exp) => (
          <li key={exp._id}>{exp.title} - ${exp.amount}</li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseTracker;
