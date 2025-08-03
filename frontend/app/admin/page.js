// frontend/app/admin/page.js
import Link from 'next/link';

const AdminPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
      <ul className="space-y-2">
        <li><Link href="/admin/tools" className="text-blue-500 hover:underline">Manage Tools</Link></li>
        <li><Link href="/admin/users" className="text-blue-500 hover:underline">Manage Users</Link></li>
        {/* Add links for other management pages here */}
      </ul>
    </div>
  );
};

export default AdminPage;
