import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchForm from '../components/SearchForm';
import PropertyCard from '../components/PropertyCard';
import propertiesData from '../assets/properties.json';
import styles from './Search.module.css';

function Search() {
  const [properties, setProperties] = useState(propertiesData.properties);
  const [filteredProperties, setFilteredProperties] = useState(properties);

  const handleSearch = (filters) => {
    let results = properties.filter(property => {
      // Type filter
      if (filters.type !== 'any' && property.type !== filters.type) return false;

      // Price filter
      if (filters.minPrice && property.price < filters.minPrice) return false;
      if (filters.maxPrice && property.price > filters.maxPrice) return false;

      // Bedrooms filter
      if (filters.minBedrooms && property.bedrooms < filters.minBedrooms) return false;
      if (filters.maxBedrooms && property.bedrooms > filters.maxBedrooms) return false;

      // Location filter
      if (filters.location) {
        const searchTerm = filters.location.toLowerCase();
        const propertyLocation = property.location.toLowerCase();
        if (!propertyLocation.includes(searchTerm)) return false;
      }

      // Date filter
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
        <div className={styles.container}>
          <h1>Your Dream Home Awaits – Start Searching Now!</h1>
          <p><b>It's really just a few clicks away!</b></p>
          <p>
            Browse through a wide range of houses and flats, and use our smart search filters to find the perfect match for your needs, whether you’re buying or renting. Start your journey today and make your dream home a reality!
          </p>
          <SearchForm onSearch={handleSearch} />
          <div className={styles.results}>
            {filteredProperties.length === 0 ? (
              <p className={styles.noResults}>No properties found matching your criteria</p>
            ) : (
              <div className={styles.propertyGrid}>
                {filteredProperties.map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Search;