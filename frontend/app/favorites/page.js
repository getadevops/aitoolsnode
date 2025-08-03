// frontend/app/favorites/page.js
"use client";
import { useState, useEffect } from 'react';
import { getToken } from '../utils/auth';
import Link from 'next/link';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const token = getToken();
      if (!token) return;

      const res = await fetch('http://localhost:3001/api/favorites', {
        headers: { 'x-auth-token': token },
      });
      const data = await res.json();
      setFavorites(data);
    };
    fetchFavorites();
  }, []);

  const tools = favorites.filter(f => f.itemType === 'Tool');
  const jobs = favorites.filter(f => f.itemType === 'Job');

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">My Favorites</h1>

      <section>
        <h2 className="text-2xl font-bold mb-2">Favorite Tools</h2>
        {tools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map(fav => (
              <div key={fav._id} className="border p-4 rounded-lg">
                <h3 className="text-xl font-bold">
                  <Link href={`/tools/${fav.item._id}`}>{fav.item.name}</Link>
                </h3>
                <p className="text-gray-600">{fav.item.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>You have no favorite tools.</p>
        )}
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-2">Favorite Jobs</h2>
        {jobs.length > 0 ? (
          <div className="space-y-4">
            {jobs.map(fav => (
              <div key={fav._id} className="border p-4 rounded-lg">
                <h3 className="text-xl font-bold">
                  <Link href={`/jobs/${fav.item._id}`}>{fav.item.title}</Link>
                </h3>
                <p className="text-gray-600">{fav.item.company} - {fav.item.location}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>You have no favorite jobs.</p>
        )}
      </section>
    </div>
  );
};

export default FavoritesPage;
