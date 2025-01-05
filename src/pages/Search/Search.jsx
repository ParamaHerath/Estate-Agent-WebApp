// Main search page component that handles property filtering and display
import { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import SearchForm from '../../components/SearchForm/SearchForm';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import propertiesData from '../../assets/properties.json';
import styles from './Search.module.css';

function Search() {
  // Initialize state with all properties and filtered results
  const [properties, setProperties] = useState(propertiesData.properties);
  const [filteredProperties, setFilteredProperties] = useState(properties);

  // Handler function to filter properties based on search criteria
  const handleSearch = (filters) => {
    let results = properties.filter(property => {
      // Apply each filter criterion sequentially
      // If any filter fails, the property is excluded

      // Check property tenure (sale/rent status)
      if (filters.availability !== 'any' && property.tenure !== filters.availability) return false;

      // Filter by property type (house/flat)
      if (filters.type !== 'any' && property.type !== filters.type) return false;

      // Apply price range filters
      if (filters.minPrice && property.price < filters.minPrice) return false;
      if (filters.maxPrice && property.price > filters.maxPrice) return false;

      // Filter by number of bedrooms
      if (filters.minBedrooms && property.bedrooms < filters.minBedrooms) return false;
      if (filters.maxBedrooms && property.bedrooms > filters.maxBedrooms) return false;

      // Search by location (case-insensitive partial match)
      if (filters.location) {
        const searchTerm = filters.location.toLowerCase();
        const propertyLocation = property.location.toLowerCase();
        if (!propertyLocation.includes(searchTerm)) return false;
      }

      // Filter by property listing date range
      if (filters.startDate || filters.endDate) {
        const propertyDate = new Date(property.added.year, 
          getMonthNumber(property.added.month), 
          property.added.day);
        
        if (filters.startDate && new Date(filters.startDate) > propertyDate) return false;
        if (filters.endDate && new Date(filters.endDate) < propertyDate) return false;
      }

      return true;
    });

    setFilteredProperties(results);
  };

  // Helper function to convert month names to numbers (0-11)
  const getMonthNumber = (monthName) => {
    const months = {
      'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
      'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
    };
    return months[monthName];
  };

  return (
    <>
      <Header />
      <div className={styles.page}>
        <div className={styles.layout}>
          {/* Sidebar with search filters - desktop view */}
          <aside className={styles.sidebar}>
            <SearchForm onSearch={handleSearch} />
          </aside>
          
          <main className={styles.mainContent}>
            {/* Introductory section */}
            <div className={styles.headerSection}>
              <h1>Click & Search - Find Your Ideal Home!</h1>
              <p><b>Finding your dream home has never been easier!</b></p>
              <p>
                With our smart filters and curated listings, turning your clicks into bricks has never been easier! Use the form on the left to help you find your perfect home. Whether you're buying or renting, from cozy flats to spacious houses, we'll help make your dream home a reality with just a few clicks!
              </p>
            </div>

            {/* Search filters - mobile view */}
            <div className={styles.sidebarMobile}>
              <SearchForm onSearch={handleSearch} />
            </div>

            {/* Property results section */}
            <div className={styles.resultsSection}>
              <h2 className={styles.subheading}>Search Results</h2>
              {filteredProperties.length === 0 ? (
                <p className={styles.noResults}>No properties found matching your criteria!</p>
              ) : (
                <div className={styles.propertyGrid}>
                  {filteredProperties.map(property => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Search;