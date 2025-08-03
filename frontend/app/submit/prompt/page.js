"use client"; // This is a client component
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '../../utils/auth';

const SubmitPromptPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [prompt, setPrompt] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = getToken();
    if (!token) {
      alert('You must be logged in to submit a prompt.');
      return;
    }

    try {
      const res = await fetch('http://localhost:3001/api/prompts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify({
          title,
          prompt,
          category,
        }),
      });

      if (res.ok) {
        router.push('/prompts');
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to submit prompt');
      }
    } catch (err) {
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Submit AI Prompt</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Prompt Title</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-700">Prompt</label>
          <textarea id="prompt" rows="3" value={prompt} onChange={(e) => setPrompt(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
        </div>
        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SubmitPromptPage;
