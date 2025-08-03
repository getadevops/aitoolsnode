import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto">
        <Link href="/" className="text-2xl font-bold">
          AI Toolify
        </Link>
      </div>
    </header>
  );
};

export default Header;
