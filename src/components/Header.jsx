import { useState } from 'react';
import { Link } from 'react-router-dom';
import FavDropdown from './FavDropdown';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import styles from './Header.module.css';

function Header() {
  const [isFavouritesOpen, setIsFavouritesOpen] = useState(false);

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
            className={`${styles.navLink} ${styles.favouritesButton}`}
            onClick={() => setIsFavouritesOpen(!isFavouritesOpen)}
          >
            <span className={styles.linkText}>Favourites</span>
            <FavoriteIcon className={styles.icon} />
          </button>
        </nav>
      </div>
      <FavDropdown 
        isOpen={isFavouritesOpen} 
        onClose={() => setIsFavouritesOpen(false)} 
      />
    </header>
  );
}

export default Header; 