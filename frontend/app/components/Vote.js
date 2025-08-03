"use client";
import { useState } from 'react';
import { getToken } from '../utils/auth';

const Vote = ({ initialScore, toolId }) => {
  const [score, setScore] = useState(initialScore);

  const handleVote = async (voteType) => {
    const token = getToken();
    if (!token) {
      alert('You must be logged in to vote.');
      return;
    }

    try {
      const res = await fetch(`http://localhost:3001/api/tools/${toolId}/${voteType}`, {
        method: 'POST',
        headers: {
          'x-auth-token': token,
        },
      });

      if (res.ok) {
        const updatedTool = await res.json();
        setScore(updatedTool.upvotes - updatedTool.downvotes);
      } else {
        const data = await res.json();
        alert(data.message || `Failed to ${voteType}`);
      }
    } catch (err) {
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button onClick={() => handleVote('upvote')} className="text-gray-500 hover:text-green-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>
      <span>{score}</span>
      <button onClick={() => handleVote('downvote')} className="text-gray-500 hover:text-red-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  );
};

export default Vote;
