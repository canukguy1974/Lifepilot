'use client'

import { useState } from 'react';

export default function Home() {
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState([{ name: '', value: '' }]);
  const [response, setResponse] = useState('');

  const handleExpenseChange = (index: number, key: string, value: string) => {
    const updated = [...expenses];
    updated[index][key] = value;
    setExpenses(updated);
  };

  const addExpense = () => setExpenses([...expenses, { name: '', value: '' }]);

  const submitForm = async () => {
    const parsed = Object.fromEntries(
      expenses.filter(e => e.name && e.value).map(e => [e.name, parseFloat(e.value)])
    );

    const res = await fetch('/api/budgetbot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ income: parseFloat(income), expenses: parsed })
    });

    const data = await res.json();
    setResponse(data.reply || 'Something went wrong.');
  };

  return (
    <main className="min-h-screen bg-dark text-white p-8">
      <h1 className="text-3xl font-bold text-neon mb-6">LifePilot Budget Planner</h1>

      <div className="mb-6">
        <label className="block mb-2">Income ($)</label>
        <input type="number" value={income} onChange={e => setIncome(e.target.value)}
          className="text-black p-2 w-full max-w-sm" />
      </div>

      <h2 className="text-xl mb-2">Expenses</h2>
      {expenses.map((expense, i) => (
        <div key={i} className="flex gap-2 mb-2">
          <input
            placeholder="Category"
            value={expense.name}
            onChange={e => handleExpenseChange(i, 'name', e.target.value)}
            className="text-black p-2 w-1/2"
          />
          <input
            placeholder="Amount"
            type="number"
            value={expense.value}
            onChange={e => handleExpenseChange(i, 'value', e.target.value)}
            className="text-black p-2 w-1/2"
          />
        </div>
      ))}
      <button onClick={addExpense} className="bg-neon text-black px-4 py-2 mb-4">+ Add Expense</button>

      <br />
      <button onClick={submitForm} className="bg-white text-black px-6 py-3 font-bold">Analyze Budget</button>

      {response && (
        <div className="mt-6 bg-black border border-neon p-4 rounded max-w-2xl">
          <h3 className="text-neon text-lg mb-2">BudgetBot Says:</h3>
          <p>{response}</p>
        </div>
      )}
    </main>
  );
}
