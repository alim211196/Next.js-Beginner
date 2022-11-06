import Link from "next/link";
import React,{useState} from "react";
import styles from "../styles/Home.module.css";
const Navbar = () => {
  const [mode, setMode] = useState(false);

  return (
    <nav className={mode === false ? styles.mainnav : styles.mainnav1}>
      <div>
        <Link href="/">
          {" "}
          <h1 className={mode === false ? styles.logotitle : styles.logotitle1}>
            {"<Hunting Coder/>"}
          </h1>
        </Link>
      </div>
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
        <li>
          <button
            type="submit"
            className={styles.btnstyle}
            onClick={() => {
              mode === false ? setMode(true) : setMode(false);
            }}
          >
            {mode === false ? "Light Mode" : "Dark Mode"}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
