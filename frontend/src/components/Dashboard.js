import React, { useEffect, useState } from "react";
import { fetchExpenses, addExpense, deleteExpense } from "./api";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "../dashboard.css";
import Reports from "./Reports";
import SetBudget from "./SetBudget";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({ title: "", amount: "" });
  const [activeTab, setActiveTab] = useState("dashboard");
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

  // Export to PDF Function
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Monthly Expenses Report", 20, 10);
  
    const filteredExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      const today = new Date();
      return (
        expenseDate.getMonth() === today.getMonth() &&
        expenseDate.getFullYear() === today.getFullYear()
      );
    });
  
    const tableColumn = ["Date", "Title", "Amount (₹)"];
    const tableRows = filteredExpenses.map((exp) => [
      new Date(exp.date).toLocaleDateString(),
      exp.title,
      `₹${exp.amount}`,
    ]);
  
    autoTable(doc, {  // <-- Use autoTable function instead of doc.autoTable
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });
  
    doc.save("Monthly_Expenses.pdf");
  };
  
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Finance Manager</h2>
        <ul>
          <li
            className={activeTab === "dashboard" ? "active" : ""}
            onClick={() => setActiveTab("dashboard")}
          >
            Dashboard
          </li>
          <li
            className={activeTab === "reports" ? "active" : ""}
            onClick={() => setActiveTab("reports")}
          >
            Reports
          </li>
          <li
            className={activeTab === "set-budget" ? "active" : ""}
            onClick={() => setActiveTab("set-budget")}
          >
            Set Budget
          </li>
          <li onClick={() => localStorage.clear() && navigate("/")} className="logout-btn">
            Logout
          </li>
        </ul>
      </aside>

      <div className="main-content">
        {activeTab === "dashboard" && (
          <>
            <h1>Dashboard</h1>
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
              <button type="submit" className="add-btn">
                Add Expense
              </button>
            </form>

            {/* Export to PDF Button */}
            <button className="export-btn" onClick={exportToPDF}>
              Export to PDF
            </button>

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
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(expense._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeTab === "reports" && <Reports expenses={expenses} />}
        {activeTab === "set-budget" && <SetBudget />}
      </div>
    </div>
  );
};

export default Dashboard;
