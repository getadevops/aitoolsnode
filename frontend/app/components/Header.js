import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <div>
        <Link href="/">
          <h1>AI Toolify</h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;
