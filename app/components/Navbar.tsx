import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-black p-4 flex justify-between items-center">
      <div className="flex items-center">
        <Link href="/" className="text-white font-bold text-xl">Aegis</Link>
      </div>
      <div className="flex items-center">
        <button className="bg-orange-600 text-white font-bold py-2 px-4 rounded">
          Login with Metamask
        </button>
      </div>
    </nav>
  );
};