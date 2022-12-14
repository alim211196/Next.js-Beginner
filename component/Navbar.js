import Link from 'next/link';
import React from 'react'
import styles from "../styles/Home.module.css";
const Navbar = () => {
  return (
    <nav className={styles.mainnav}>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About Us</Link>
        </li>
        <li>
          <Link href="/blog">Blog Post</Link>
        </li>
        <li>
          <Link href="/contact">Contact Us</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar