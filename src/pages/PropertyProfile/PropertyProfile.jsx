// Page for detailed view  of each individual property listing
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Tabs, Tab, Box } from '@mui/material';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import propertyData from '../../assets/properties.json';
import { useFavourites } from '../../context/FavContext/FavContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import styles from './PropertyProfile.module.css';
import PropertyMap from '../../components/PropertyMap/PropertyMap';

// Reusable tab panel component for content sections
function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index} className={styles.tabPanel}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function PropertyProfile() {
  // State for active tab and selected image in gallery
  const [tabValue, setTabValue] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Get property ID from URL parameters
  const { id } = useParams();
  // Find the property data matching the ID
  const property = propertyData.properties.find(p => p.id === id);
  // Get favorite functionality from context
  const { isFavorite, toggleFavorite } = useFavourites();

  // Generate array of image paths for the property gallery
  const images = Array.from({ length: 8 }, (_, i) => `src/assets/images/${property.id}/pic${i + 1}.jpeg`);

  // Show error if property not found
  if (!property) {
    return <div>Error! - Property not found!</div>
  }

  // Handler for tab changes
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <Header />
      <div className={styles.page}>
        <div className={styles.container}>
          {/* Back navigation */}
          <div>
            <Link to="/search" className={styles.backLink}>⬅ Back to Search</Link>
          </div>
          
          {/* Main property card with images and basic info */}
          <div className={styles.propertyCard}>
            {/* Image gallery section */}
            <div className={styles.imageSection}>
              {/* Main image display */}
              <div className={styles.mainImageContainer}>
                <img src={`/${images[selectedImage]}`} alt={`Main view of ${property.id}`} />
                {/* Favorite toggle button */}
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
              {/* Thumbnail strip for image selection */}
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
            {/* Basic property information */}
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

          {/* Tabbed content section */}
          <div className={styles.tabsContainer}>
            {/* Tab navigation */}
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
                {/* Description tab */}
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
                {/* Floor plan tab */}
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
                {/* Map location tab */}
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

            {/* Tab content panels */}
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
                <PropertyMap coordinates={property.coordinates} />
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