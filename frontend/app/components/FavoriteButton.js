// frontend/app/components/FavoriteButton.js
"use client";
import { getToken } from '../utils/auth';

const FavoriteButton = ({ itemId, itemType }) => {
  const handleFavorite = async () => {
    const token = getToken();
    if (!token) {
      alert('You must be logged in to add to favorites.');
      return;
    }

    try {
      const res = await fetch('http://localhost:3001/api/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify({ item: itemId, itemType }),
      });

      if (res.ok) {
        alert('Added to favorites!');
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to add to favorites');
      }
    } catch (err) {
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <button onClick={handleFavorite} className="text-gray-500 hover:text-yellow-500">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.539 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    </button>
  );
};

export default FavoriteButton;
