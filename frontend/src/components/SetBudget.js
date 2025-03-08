import React, { useState, useEffect } from "react";
import "../Allstyles/SetBudget.css"; // Import styles

const SetBudget = () => {
  const [budget, setBudget] = useState({ amount: 0, type: "monthly" });
  const [monthlyBudgets, setMonthlyBudgets] = useState([]);
  const [weeklyBudgets, setWeeklyBudgets] = useState([]);

  useEffect(() => {
    const savedBudget = JSON.parse(localStorage.getItem("budget"));
    const savedMonthlyBudgets = JSON.parse(localStorage.getItem("monthlyBudgets")) || [];
    const savedWeeklyBudgets = JSON.parse(localStorage.getItem("weeklyBudgets")) || [];

    if (savedBudget) setBudget(savedBudget);
    setMonthlyBudgets(savedMonthlyBudgets);
    setWeeklyBudgets(savedWeeklyBudgets);
  }, []);

  const handleChange = (e) => {
    setBudget({ ...budget, [e.target.name]: e.target.value });
  };

  const saveBudget = () => {
    localStorage.setItem("budget", JSON.stringify(budget));

    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString("default", { month: "long" });
    const currentWeek = `Week ${Math.ceil(currentDate.getDate() / 7)}, ${currentMonth}`;

    const newBudgetEntry = { label: budget.type === "monthly" ? currentMonth : currentWeek, amount: parseFloat(budget.amount) };

    if (budget.type === "monthly") {
      const updatedMonthlyBudgets = [...monthlyBudgets.filter(b => b.label !== currentMonth), newBudgetEntry];
      setMonthlyBudgets(updatedMonthlyBudgets);
      localStorage.setItem("monthlyBudgets", JSON.stringify(updatedMonthlyBudgets));
    } else {
      const updatedWeeklyBudgets = [...weeklyBudgets.filter(b => b.label !== currentWeek), newBudgetEntry];
      setWeeklyBudgets(updatedWeeklyBudgets);
      localStorage.setItem("weeklyBudgets", JSON.stringify(updatedWeeklyBudgets));
    }

    alert(`Budget of ₹${budget.amount} set for ${budget.type}!`);
  };

  return (
    <div className="set-budget-container">
      <div className="budget-card">
        <h1>Set Your Budget</h1>
        <input
          type="number"
          name="amount"
          placeholder="Enter budget"
          value={budget.amount}
          onChange={handleChange}
        />
        <select name="type" value={budget.type} onChange={handleChange}>
          <option value="monthly">Monthly</option>
          <option value="weekly">Weekly</option>
        </select>
        <button onClick={saveBudget}>Set Budget</button>
        <p>Your budget is <strong>₹{budget.amount}</strong> for <strong>{budget.type}</strong></p>
      </div>

      {/* Monthly Budgets Section */}
      <div className="budget-history">
        <div className="budget-section">
          <h2>Past Monthly Budgets</h2>
          <div className="budget-list">
            {monthlyBudgets.length > 0 ? (
              monthlyBudgets.map((b, index) => (
                <div key={index} className="budget-item">
                  <span>{b.label}</span>
                  <strong>₹{b.amount}</strong>
                </div>
              ))
            ) : (
              <p>No past monthly budgets recorded</p>
            )}
          </div>
        </div>

        {/* Weekly Budgets Section */}
        <div className="budget-section">
          <h2>Past Weekly Budgets</h2>
          <div className="budget-list">
            {weeklyBudgets.length > 0 ? (
              weeklyBudgets.map((b, index) => (
                <div key={index} className="budget-item">
                  <span>{b.label}</span>
                  <strong>₹{b.amount}</strong>
                </div>
              ))
            ) : (
              <p>No past weekly budgets recorded</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetBudget;
