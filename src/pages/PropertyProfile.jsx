import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Tabs, Tab, Box } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import propertyData from '../assets/properties.json';
import { useFavorites } from '../context/FavoritesContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import styles from './PropertyProfile.module.css';

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index} className={styles.tabPanel}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function PropertyProfile() {
  const [tabValue, setTabValue] = useState(0);
  const { id } = useParams();
  const property = propertyData.properties.find(p => p.id === id);
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!property) {
    return <div>Error! - Property not found!</div>
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <Header />
      <div className={styles.page}>
        <div className={styles.container}>
          <div>
            <Link to="/search" className={styles.backLink}>⬅️ Back to Search</Link>
          </div>
          
          <div className={styles.propertyCard}>
            <div className={styles.imageContainer}>
              <img src={`/${property.picture}`} alt={`Main image of ${property.id}`} />
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
            <div className={styles.mainInfo}>
              <h2 className={styles.price}>£{property.price.toLocaleString()}</h2>
              <p className={styles.type}>{property.type} - {property.bedrooms} bedrooms</p>
              <p className={styles.location}>{property.location}</p>
              <p className={styles.date}>Added: {property.added.month} {property.added.day}, {property.added.year}</p>
            </div>
          </div>

          <div className={styles.tabsContainer}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab label="Description" />
                <Tab label="Floor Plan" />
                <Tab label="Map" />
              </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
              <div className={styles.description}>
                {property.description}
              </div>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <div className={styles.floorPlan}>
                <img src={`/${property.floorplan}`} alt={`Floorplan of ${property.id}`} className={styles.floorPlanImage} />
              </div>
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <div className={styles.map}>
                <p>Google Maps integration coming soon...</p>
              </div>
            </TabPanel>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PropertyProfile;