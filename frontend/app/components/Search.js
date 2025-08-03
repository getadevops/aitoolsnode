// frontend/app/components/Search.js
"use client";
import { useState } from 'react';
import Link from 'next/link';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newConversation = [...conversation, { role: 'user', content: query }];

    try {
      const res = await fetch('http://localhost:3001/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, conversationHistory: newConversation }),
      });
      const data = await res.json();
      setResults(data.results);
      setConversation([...newConversation, { role: 'assistant', content: data.conversationalResponse }]);
    } catch (err) {
      alert('An error occurred during the search.');
    } finally {
      setLoading(false);
      setQuery('');
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask me anything about AI..."
          className="w-full p-2 border rounded"
        />
        <button type="submit" disabled={loading} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      <div className="mt-4">
        {conversation.map((msg, index) => (
          <div key={index} className={`my-2 p-2 rounded ${msg.role === 'user' ? 'bg-gray-200' : 'bg-blue-100'}`}>
            <strong>{msg.role}:</strong> {msg.content}
          </div>
        ))}
      </div>

      <div className="mt-4">
        {/* TODO: Display results in categorized sections */}
        {results.map(item => (
          <div key={item._id} className="border p-2 my-2 rounded">
            <Link href={`/tools/${item._id}`}>{item.name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
