import { Link } from 'react-router-dom';
import { useFavourites } from '../../context/FavContext/FavContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import styles from './PropertyCard.module.css';

function PropertyCard({ property }) {
  // Getting favorite functionality from context
  const { isFavorite, toggleFavorite } = useFavourites();
  const { id, type, bedrooms, price, location, picture, added, tenure } = property;

  return (
    <div className={styles.card}>
      {/* Property image with favorite toggle button overlay */}
      <div className={styles.imageContainer}>
        <img src={picture} alt={`Property ${id}`} className={styles.image} />
        <button 
          className={styles.favoriteButton}
          onClick={() => toggleFavorite(property)}
        >
          {/* Show filled heart if favorited, outline if not */}
          {isFavorite(id) ? (
            <FavoriteIcon className={styles.favoriteIcon} />
          ) : (
            <FavoriteBorderIcon className={styles.favoriteIconOutline} />
          )}
        </button>
      </div>

      {/* Property details section */}
      <div className={styles.content}>
        <h3 className={styles.price}>
          £{price.toLocaleString()}
          {/* Show "per month" for rental properties */}
          {tenure === 'Leasehold' && <span className={styles.perMonth}> per month</span>}
        </h3>
        <p className={styles.type}>{type} - {bedrooms} bedrooms</p>
        <p className={styles.location}>{location}</p>
        <p className={styles.date}>Added: {added.day} {added.month} {added.year}</p>
        {/* Link to view detailed property page, passing the property ID in the URL */}
        <Link to={`/property/${id}`} className={styles.viewButton}>
          View Property
        </Link>
      </div>
    </div>
  );
}

export default PropertyCard;
