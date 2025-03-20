import React from 'react';
import { useLoaderData, Form } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import AddBudgetForm from '../components/AddBudgetForm';
import AddExpenseForm from '../components/AddExpenseForm';
import BudgetItem from '../components/BudgetItem';
import Table from '../components/Table';
import {
  createBudget,
  createExpense,
  deleteItem,
  fetchData,
  waait,
} from '../helpers';

// Loader function to fetch data
export async function dashboardLoader() {
  const { user } = useAuth(); // Get authenticated user
  if (!user) {
    return redirect('/login'); // Redirect to login if user is not authenticated
  }

  const budgets = fetchData('budgets');
  const expenses = fetchData('expenses');
  return { userName: user.email, budgets, expenses }; // Use authenticated user's email
}

// Action function to handle form submissions
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

// Dashboard component
const DashboardPage = () => {
  const { userName, budgets, expenses } = useLoaderData();
  const { user } = useAuth(); // Get authenticated user

  if (!user) {
    return null; // Or a loading spinner
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard, {userName}!</p>
      <AddBudgetForm />
      <AddExpenseForm budgets={budgets} />
      <div>
        {budgets.map((budget) => (
          <BudgetItem key={budget.id} budget={budget} showDelete />
        ))}
      </div>
      <Table expenses={expenses} />
    </div>
  );
};

export default DashboardPage;