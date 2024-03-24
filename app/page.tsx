import Link from 'next/link';
import Navbar from "./components/Navbar";
import Homepage from "./homepage/introductionPage";

export default function Home() {
  return (
    <main>
      <Navbar></Navbar>
      <Homepage></Homepage>
    </main>
  );
}
