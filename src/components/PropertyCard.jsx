import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import styles from './PropertyCard.module.css';

function PropertyCard({ property }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { id, type, bedrooms, price, location, picture, added, tenure } = property;

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={picture} alt={`Property ${id}`} className={styles.image} />
        <button 
          className={styles.favoriteButton}
          onClick={() => toggleFavorite(property)}
        >
          {isFavorite(id) ? (
            <FavoriteIcon className={styles.favoriteIcon} />
          ) : (
            <FavoriteBorderIcon className={styles.favoriteIconOutline} />
          )}
        </button>
      </div>
      <div className={styles.content}>
        <h3 className={styles.price}>
          £{price.toLocaleString()}
          {tenure === 'Leasehold' && <span className={styles.perMonth}> per month</span>}
        </h3>
        <p className={styles.type}>{type} - {bedrooms} bedrooms</p>
        <p className={styles.location}>{location}</p>
        <p className={styles.date}>Added: {added.day} {added.month} {added.year}</p>
        <Link to={`/property/${id}`} className={styles.viewButton}>
          View Property
        </Link>
      </div>
    </div>
  );
}

export default PropertyCard;
