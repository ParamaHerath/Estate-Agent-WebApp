import { useRef, useEffect } from 'react';
import { useFavourites } from '../context/FavContext';
import FavPropertyCard from './FavPropertyCard';
import styles from './FavDropdown.module.css';

function FavDropdown({ isOpen, onClose }) {
  const { favourites, setFavourites } = useFavourites();
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest('button')?.classList.contains(styles.favouritesButton)) {
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
          {favourites.length > 0 && (
            <button 
              className={styles.clearButton}
              onClick={() => setFavourites([])}
            >
              Clear All
            </button>
          )}
        </div>
        <div className={styles.content}>
          {favourites.length === 0 ? (
            <p className={styles.noFavourites}>No favourites added yet</p>
          ) : (
            favourites.map(property => (
              <FavPropertyCard key={property.id} property={property} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default FavDropdown; 