import { useState } from 'react';
import { Link } from 'react-router-dom';
import FavoritesDropdown from './FavoritesDropdown';
import styles from './Header.module.css';

function Header() {
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          NestQuest
        </Link>
        <nav className={styles.nav}>
          <Link to="/search" className={styles.navLink}>Browse</Link>
          <button 
            className={styles.navLink} 
            onClick={() => setIsFavoritesOpen(true)}
          >
            Favourites
          </button>
        </nav>
      </div>
      <FavoritesDropdown 
        isOpen={isFavoritesOpen} 
        onClose={() => setIsFavoritesOpen(false)} 
      />
    </header>
  );
}

export default Header; 