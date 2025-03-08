import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import "../Allstyles/Reports.css"

const Reports = ({ expenses }) => {
  const [filter, setFilter] = useState({ category: "", date: "" });

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const filteredExpenses = expenses.filter((expense) => {
    const matchesCategory = filter.category === "" || expense.title.toLowerCase().includes(filter.category.toLowerCase());
    const matchesDate = filter.date === "" || new Date(expense.date).toISOString().split("T")[0] === filter.date;
    return matchesCategory && matchesDate;
  });

  const chartData = {
    labels: filteredExpenses.map((expense) => expense.title),
    datasets: [
      {
        label: "Expenses",
        data: filteredExpenses.map((expense) => expense.amount),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h1>Expense Reports</h1>
      <div className="filters">
        <input type="text" name="category" placeholder="Enter expense name" value={filter.category} onChange={handleFilterChange} />
        <input type="date" name="date" value={filter.date} onChange={handleFilterChange} />
      </div>
      <div className="chart-container">
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default Reports;
