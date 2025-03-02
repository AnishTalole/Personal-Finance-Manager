import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Change this to match your backend

export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/auth/register`, userData);
};

export const loginUser = async (userData) => {
  return await axios.post(`${API_URL}/auth/login`, userData);
};

export const fetchExpenses = async (token) => {
  return await axios.get(`${API_URL}/expenses`, {
    headers: { Authorization: token },
  });
};

export const addExpense = async (expenseData, token) => {
  return await axios.post(`${API_URL}/expenses`, expenseData, {
    headers: { Authorization: token },
  });
};

export const deleteExpense = async (id, token) => {
  return await axios.delete(`${API_URL}/expenses/${id}`, {
    headers: { Authorization: token },
  });
};
