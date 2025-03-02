import React, { useEffect, useState } from "react";
import { fetchExpenses, addExpense, deleteExpense } from "./api";
import { useNavigate } from "react-router-dom";
import "../dashboard.css";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({ title: "", amount: "" });
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchExpenses(token)
      .then((res) => setExpenses(res.data))
      .catch(console.error);
  }, [navigate, token]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addExpense(formData, token);
      setExpenses([...expenses, res.data]);
      setFormData({ title: "", amount: "" });
    } catch (error) {
      console.error("Error adding expense", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteExpense(id, token);
      setExpenses(expenses.filter((expense) => expense._id !== id));
    } catch (error) {
      console.error("Error deleting expense", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  // Calculate total expenses
  const totalExpenses = expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Finance Manager</h2>
        <ul>
          <li className="active">Dashboard</li>
          <li onClick={handleLogout} className="logout-btn">Logout</li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        <h1>Dashboard</h1>

        {/* Expense Form */}
        <form onSubmit={handleSubmit} className="expense-form">
          <input
            type="text"
            name="title"
            placeholder="Expense Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
          <button type="submit" className="add-btn">Add Expense</button>
        </form>

        {/* Expense Table */}
        <div className="expenses-table">
          <h3>Expenses</h3>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense._id}>
                  <td>{expense.title}</td>
                  <td>₹{expense.amount}</td>
                  <td>{new Date(expense.date).toLocaleDateString()}</td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDelete(expense._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="total-row">
                <td colSpan="4" className="total-expense-cell">
                  <strong>Total Expenses: ₹{totalExpenses.toFixed(2)}</strong>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
