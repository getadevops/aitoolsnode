import Link from 'next/link';

const Navigation = () => {
  return (
    <nav className="bg-gray-700 text-white p-4">
      <div className="container mx-auto">
        <ul className="flex space-x-4">
          <li><Link href="/tools" className="hover:text-gray-300">AI Tools</Link></li>
          <li><Link href="/news" className="hover:text-gray-300">AI News</Link></li>
          <li><Link href="/jobs" className="hover:text-gray-300">AI Jobs</Link></li>
          <li><Link href="/models" className="hover:text-gray-300">AI Models</Link></li>
          <li><Link href="/prompts" className="hover:text-gray-300">Prompts</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
