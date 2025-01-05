import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import styles from './FavPropertyCard.module.css';

function FavPropertyCard({ property }) {
  const { toggleFavorite } = useFavorites();
  const { id, type, bedrooms, price, location, picture, tenure } = property;

  const imagePath = picture.startsWith('/') ? picture.slice(1) : picture;

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {/* <img src={picture} alt={`Property ${id}`} className={styles.image} /> */}
        <img src={`/${imagePath}`} alt={`Property ${id}`} className={styles.image} />
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.price}>
            £{price.toLocaleString()}
            {tenure === 'Leasehold' && <span className={styles.perMonth}> per month</span>}
          </h3>
          <button 
            className={styles.favoriteButton}
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(property);
            }}
          >
            <FavoriteIcon className={styles.favoriteIcon} />
          </button>
        </div>
        <p className={styles.type}>{type} - {bedrooms} bedrooms</p>
        <p className={styles.location}>{location}</p>
        <Link to={`/property/${id}`} className={styles.viewButton}>
          View Property
        </Link>
      </div>
    </div>
  );
}

export default FavPropertyCard; 