'use client';

import { useState } from 'react';

export default function SignUp() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'customer' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      alert(data.message);
    } catch (err) {
      console.error('Signup error:', err);
      alert('Something went wrong. Try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white shadow-md p-6 rounded-lg space-y-4">
        <h2 className="text-2xl font-bold text-center text-gray-800">Create Your Account 🚀</h2>

        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />

        <select
          name="role"
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="customer">Customer</option>
          <option value="freelancer">Freelancer</option>
        </select>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Sign Up
        </button>

        <p className="text-sm text-center text-gray-500">
          Already have an account?{' '}
          <a href="/signin" className="text-indigo-600 hover:underline">
            Sign in here
          </a>
        </p>
      </form>
    </div>
  );
}
