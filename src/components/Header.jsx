import { Link } from 'react-router-dom';
import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          Estate Agent WebApp
        </Link>
        <nav className={styles.nav}>
          <Link to="/search" className={styles.navLink}>Browse</Link>
          <Link to="/contact" className={styles.navLink}>Contact</Link>
          <Link to="/favourites" className={styles.navLink}>Favourites</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header; 