import { useState } from 'react';
import { Link } from 'react-router-dom';
import FavoritesDropdown from './FavoritesDropdown';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
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
          <Link to="/search" className={styles.navLink}>
            <span className={styles.linkText}>Browse</span>
            <SearchIcon className={styles.icon} />
          </Link>
          <button 
            className={styles.navLink} 
            onClick={() => setIsFavoritesOpen(true)}
          >
            <span className={styles.linkText}>Favourites</span>
            <FavoriteIcon className={styles.icon} />
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