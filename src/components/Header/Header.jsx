import { useState } from 'react';
import { Link } from 'react-router-dom';
import FavDropdown from '../FavDropdown/FavDropdown';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import styles from './Header.module.css';

function Header() {
  // State to control whether the favourites dropdown is open or closed
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
          
          {/* Button to toggle the favourites dropdown */}
          <button 
            className={`${styles.navLink} ${styles.favouritesButton}`}
            onClick={() => setIsFavouritesOpen(!isFavouritesOpen)}
          >
            <span className={styles.linkText}>Favourites</span>
            <FavoriteIcon className={styles.icon} />
          </button>
        </nav>
      </div>

      {/* Conditionally rendering the FavDropdown based on the isFavouritesOpen state */}
      <FavDropdown 
        isOpen={isFavouritesOpen} 
        onClose={() => setIsFavouritesOpen(false)} 
      />
    </header>
  );
}

export default Header; 