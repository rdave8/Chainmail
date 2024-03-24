import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-black p-4 flex justify-between items-center">
      <div className="flex items-center">
        <Link href="/" className="text-white font-bold text-xl">Aegis</Link>
      </div>
      <Link href="/audit" passHref>
        <button type="button">Go to Audit Page</button>
      </Link>
      <div className="flex items-center">
        <button className="bg-purple-600 text-white font-bold py-2 px-4 rounded">
          Login with Metamask
        </button>
      </div>
    </nav>
  );
};