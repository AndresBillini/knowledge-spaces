"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import HomeIcon from '@/components/Icons/home.svg';
import CollectionIcon from '@/components/Icons/collections.svg';
import SpaceIcon from '@/components/Icons/spaces.svg';
import "./navbar.css";

export default function NavBar() {
  const pathname = usePathname();

  const handleHomeClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav className="nav-bar">
      <ul>
        <li><Link href="/" onClick={handleHomeClick}><Image src={HomeIcon} alt="Home icon" /> <span>Home</span></Link></li>
        <li><Link href="/my-collection"><Image src={CollectionIcon} alt="My Collection icon" /> <span>My Collection</span></Link></li>
        <li><Link href="/knowledge-spaces"><Image src={SpaceIcon} alt="Kowledge Space icon" /> <span>Knowledge Spaces</span></Link></li>
      </ul>
    </nav>
  );
}