import { Link } from 'react-router-dom';
import styles from './PropertyCard.module.css';

function PropertyCard({ property }) {
  const { id, type, bedrooms, price, location, picture, description, added } = property;

  return (
    <div className={styles.card}>
      <img src={picture} alt={`Property ${id}`} className={styles.image} />
      <div className={styles.content}>
        <h3 className={styles.price}>£{price.toLocaleString()}</h3>
        <p className={styles.type}>{type} - {bedrooms} bedrooms</p>
        <p className={styles.location}>{location}</p>
        <p className={styles.description}>
          {description.substring(0, 150)}...
        </p>
        <p className={styles.date}>Added: {added.day} {added.month} {added.year}</p>
        <Link to={`/property/${id}`} className={styles.viewButton}>
          View Property
        </Link>
      </div>
    </div>
  );
}

export default PropertyCard;
