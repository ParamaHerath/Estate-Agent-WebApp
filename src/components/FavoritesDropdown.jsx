import { useRef, useEffect } from 'react';
import { useFavorites } from '../context/FavoritesContext';
import FavPropertyCard from './FavPropertyCard';
import styles from './FavoritesDropdown.module.css';

function FavoritesDropdown({ isOpen, onClose }) {
  const { favorites, setFavorites } = useFavorites();
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest('button')?.classList.contains(styles.favoritesButton)) {
        return;
      }
      
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div ref={dropdownRef} className={styles.dropdown}>
        <div className={styles.header}>
          <h2>Favourites</h2>
          {favorites.length > 0 && (
            <button 
              className={styles.clearButton}
              onClick={() => setFavorites([])}
            >
              Clear All
            </button>
          )}
        </div>
        <div className={styles.content}>
          {favorites.length === 0 ? (
            <p className={styles.noFavorites}>No favorites added yet</p>
          ) : (
            favorites.map(property => (
              <FavPropertyCard key={property.id} property={property} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default FavoritesDropdown; 