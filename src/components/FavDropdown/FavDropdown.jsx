import { useRef, useEffect } from 'react';
import { useFavourites } from '../../context/FavContext/FavContext';
import FavPropertyCard from '../FavPropertyCard/FavPropertyCard';
import styles from './FavDropdown.module.css';

function FavDropdown({ isOpen, onClose }) {
  const { favourites, setFavourites } = useFavourites();
  // Reference to dropdown container for click outside detection
  const dropdownRef = useRef();

  // Handle clicking outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Don't close if clicking the favorites button itself
      if (event.target.closest('button')?.classList.contains(styles.favouritesButton)) {
        return;
      }
      
      // Close if click is outside the dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    // Only add event listener when dropdown is open
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup event listener on unmount or when dropdown closes
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Don't render anything if dropdown is closed
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div ref={dropdownRef} className={styles.dropdown}>
        {/* Dropdown header with title and clear button */}
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

        {/* Dropdown content - list of favorite properties */}
        <div className={styles.content}>
          {favourites.length === 0 ? (
            <p className={styles.noFavourites}>No favourites added yet</p>
          ) : (
            favourites.map(property => (
              <FavPropertyCard key={property.id} property={property} onClose={onClose} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default FavDropdown; 