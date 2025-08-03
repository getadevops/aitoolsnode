"use client";
import { useState, useEffect } from 'react';
import { getToken } from '../../../utils/auth';

const ManageToolsPage = () => {
  const [tools, setTools] = useState([]);

  useEffect(() => {
    const fetchTools = async () => {
      const res = await fetch('http://localhost:3001/api/tools', { cache: 'no-store' });
      const data = await res.json();
      setTools(data);
    };
    fetchTools();
  }, []);

  const handleApprove = async (id) => {
    const token = getToken();
    await fetch(`http://localhost:3001/api/tools/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
      body: JSON.stringify({ status: 'approved' }),
    });
    setTools(tools.map(t => t._id === id ? { ...t, status: 'approved' } : t));
  };

  const handleDelete = async (id) => {
    const token = getToken();
    await fetch(`http://localhost:3001/api/tools/${id}`, {
      method: 'DELETE',
      headers: {
        'x-auth-token': token,
      },
    });
    setTools(tools.filter(t => t._id !== id));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Manage Tools</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Name</th>
            <th className="py-2">Status</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tools.map(tool => (
            <tr key={tool._id}>
              <td className="border px-4 py-2">{tool.name}</td>
              <td className="border px-4 py-2">{tool.status}</td>
              <td className="border px-4 py-2">
                {tool.status === 'pending' && (
                  <button onClick={() => handleApprove(tool._id)} className="bg-green-500 text-white px-2 py-1 rounded mr-2">Approve</button>
                )}
                <button onClick={() => handleDelete(tool._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageToolsPage;
