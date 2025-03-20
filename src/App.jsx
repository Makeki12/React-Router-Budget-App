import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/Privateroute'; // Corrected import
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import DashboardPage from './pages/Dashboard';
import { toast } from 'react-toastify';
import {
  createBudget,
  createExpense,
  deleteItem,
  fetchData,
  waait,
} from './helpers'; // Corrected import

// Loader function to fetch data for the dashboard
export async function dashboardLoader() {
  const token = localStorage.getItem('token');
  if (!token) {
    return redirect('/login'); // Redirect to login if no token is found
  }

  try {
    const budgets = fetchData('budgets');
    const expenses = fetchData('expenses');
    return { budgets, expenses };
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw new Error('Failed to load dashboard data.');
  }
}

// Action function to handle form submissions for the dashboard
export async function dashboardAction({ request }) {
  await waait();

  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === 'newUser') {
    try {
      localStorage.setItem('userName', JSON.stringify(values.userName));
      return toast.success(`Welcome, ${values.userName}`);
    } catch (e) {
      throw new Error('There was a problem creating your account.');
    }
  }

  if (_action === 'createBudget') {
    try {
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      });
      return toast.success('Budget created!');
    } catch (e) {
      throw new Error('There was a problem creating your budget.');
    }
  }

  if (_action === 'createExpense') {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });
      return toast.success(`Expense ${values.newExpense} created!`);
    } catch (e) {
      throw new Error('There was a problem creating your expense.');
    }
  }

  if (_action === 'deleteExpense') {
    try {
      deleteItem({
        key: 'expenses',
        id: values.expenseId,
      });
      return toast.success('Expense deleted!');
    } catch (e) {
      throw new Error('There was a problem deleting your expense.');
    }
  }
}

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
            loader={dashboardLoader} // Add the loader function
            action={dashboardAction} // Add the action function
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;