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
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index} className={styles.tabPanel}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function PropertyProfile() {
  const [tabValue, setTabValue] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const { id } = useParams();
  const property = propertyData.properties.find(p => p.id === id);
  const { isFavorite, toggleFavorite } = useFavorites();

  // Generate array of image paths
  const images = Array.from({ length: 8 }, (_, i) => `src/assets/images/${property.id}/pic${i + 1}.jpeg`);

  if (!property) {
    return <div>Error! - Property not found!</div>
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const mapContainerStyle = {
    width: '100%',
    height: '500px'
  };

  const center = {
    lat: property.coordinates.lat,
    lng: property.coordinates.lng
  };

  return (
    <>
      <Header />
      <div className={styles.page}>
        <div className={styles.container}>
          <div>
            <Link to="/search" className={styles.backLink}>⬅ Back to Search</Link>
          </div>
          
          <div className={styles.propertyCard}>
            <div className={styles.imageSection}>
              <div className={styles.mainImageContainer}>
                <img src={`/${images[selectedImage]}`} alt={`Main view of ${property.id}`} />
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
              <div className={styles.thumbnailStrip}>
                {images.map((image, index) => (
                  <div 
                    key={index}
                    className={`${styles.thumbnail} ${selectedImage === index ? styles.selectedThumbnail : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={`/${image}`} alt={`View ${index + 1} of ${property.id}`} />
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.mainInfo}>
              <h2 className={styles.price}>
                £{property.price.toLocaleString()}
                {property.tenure === 'Leasehold' && <span className={styles.perMonth}> per month</span>}
              </h2>
              <p className={styles.type}>{property.type} - {property.bedrooms} bedrooms</p>
              <p className={styles.location}>{property.location}</p>
              <p className={styles.date}>Added: {property.added.month} {property.added.day}, {property.added.year}</p>
            </div>
          </div>

          <div className={styles.tabsContainer}>
            <Box sx={{ borderBottom: '1rem', borderColor: 'divider' }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="fullWidth"
                sx={{
                  '& .MuiTabs-indicator': {
                    backgroundColor: '#000000',
                    height: 5
                  },
                  '& .MuiTab-root': {
                    minWidth: {
                      xs: '33.33%',
                      sm: 'auto'
                    }
                  }
                }}
              >
                <Tab 
                  label="Description" 
                  sx={{
                    fontFamily: 'Poppins', 
                    fontWeight: '700', 
                    fontSize: {
                      xs: '1rem',
                      sm: '1.2rem'
                    },
                    color: 'black !important', 
                    textTransform: 'none', 
                    padding: {
                      xs: '0.5rem',
                      sm: '1rem 2rem'
                    }
                  }} 
                />
                <Tab 
                  label="Floor Plan" 
                  sx={{
                    fontFamily: 'Poppins', 
                    fontWeight: '700', 
                    fontSize: {
                      xs: '1rem',
                      sm: '1.2rem'
                    },
                    color: 'black !important', 
                    textTransform: 'none', 
                    padding: {
                      xs: '0.5rem',
                      sm: '1rem 2rem'
                    }
                  }}
                />
                <Tab 
                  label="Map" 
                  sx={{
                    fontFamily: 'Poppins', 
                    fontWeight: '700', 
                    fontSize: {
                      xs: '1rem',
                      sm: '1.2rem'
                    },
                    color: 'black !important', 
                    textTransform: 'none', 
                    padding: {
                      xs: '0.5rem',
                      sm: '1rem 2rem'
                    }
                  }}
                />
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
                <LoadScript googleMapsApiKey="AIzaSyDKJKDcTMgfwZ1tFT0EbrwPSNixIaB3GWw">
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={15}
                  >
                    <MarkerF
                      position={center}
                      title={property.location}
                    />
                  </GoogleMap>
                </LoadScript>
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