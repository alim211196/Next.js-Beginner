import Navbar from '../component/Navbar';
import '../styles/globals.css'
import styles from "../styles/Home.module.css";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <footer className={styles.footer}>
        <h1 className={styles.title}>
       {"Build and design by Alim Mohammad"}
        </h1>
      </footer>
    </>
  );
}

export default MyApp
