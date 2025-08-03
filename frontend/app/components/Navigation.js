import Link from 'next/link';

const Navigation = () => {
  return (
    <nav className="bg-gray-700 text-white p-4">
      <div className="container mx-auto">
        <ul className="flex space-x-4">
          <li><Link href="/tools">AI Tools</Link></li>
          <li><Link href="/news">AI News</Link></li>
          <li><Link href="/jobs">AI Jobs</Link></li>
          <li><Link href="/models">AI Models</Link></li>
          <li><Link href="/prompts">Prompts</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
