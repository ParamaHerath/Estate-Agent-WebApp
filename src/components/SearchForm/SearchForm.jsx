import { useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { 
  Button, 
  Slider, 
  TextField,
  Box,
  Typography,
  FormLabel
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import "react-datepicker/dist/react-datepicker.css";
import styles from './SearchForm.module.css';

function SearchForm({ onSearch }) {
  // Initialize form state with default values
  const [filters, setFilters] = useState({
    availability: { value: 'any', label: 'Any' },
    type: { value: 'any', label: 'Any' },
    priceRange: [0, 2000000],
    minBedrooms: '',
    maxBedrooms: '',
    startDate: null,
    endDate: null,
    location: ''
  });

  // Predefined options for property availability (sale/rent)
  const availabilityOptions = [
    { value: 'any', label: 'Any' },
    { value: 'Freehold', label: 'For Sale' },
    { value: 'Leasehold', label: 'For Rent' }
  ];

  // Predefined options for property types
  const propertyTypes = [
    { value: 'any', label: 'Any' },
    { value: 'House', label: 'House' },
    { value: 'Flat', label: 'Flat' }
  ];

  // Generic handler for updating form state
  const handleChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Form submission handling
  const handleSubmit = (e) => {
    e.preventDefault();
    // Extracting necessary values before sending them to the parent component
    onSearch({
      ...filters,
      availability: filters.availability.value,
      type: filters.type.value,
      minPrice: filters.priceRange[0],
      maxPrice: filters.priceRange[1]
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Typography sx={{fontFamily: 'Poppins', color: 'black !important', fontSize: '0.9rem', marginBottom: '1rem'}}>
        Use the filters below to match your preferences & find your dream home!.
      </Typography>
      
      {/* Availability filter (sale/rent) */}
      <div className={styles.formGroup}>
        <FormLabel sx={{fontFamily: 'Poppins', color: 'black !important'}}>
          Offer Type
        </FormLabel>
        <Select
          value={filters.availability}
          onChange={(option) => handleChange('availability', option)}
          options={availabilityOptions}
          className={styles.select}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              fontWeight: 600,
              fontFamily: 'Poppins',
              backgroundColor: 'transparent',
              border: '1px solid #aaaaaa',
              borderRadius: '0.5rem'
            }),
            option: (baseStyles) => ({
              ...baseStyles,
              fontWeight: 600,
              fontFamily: 'Poppins'
            }),
            dropdownIndicator: (baseStyles) => ({
              ...baseStyles,
              color: '#2c3e50',
              '&:hover': {
                color: '#2980b9'
              }
            }),
            indicatorSeparator: (baseStyles) => ({
              ...baseStyles,
              backgroundColor: '#aaaaaa'
            })
          }}
        />
      </div>

      {/* Property type filter */}
      <div className={styles.formGroup}>
        <FormLabel sx={{fontFamily: 'Poppins', color: 'black !important'}}>
          Property Type
        </FormLabel>
        <Select
          value={filters.type}
          onChange={(option) => handleChange('type', option)}
          options={propertyTypes}
          className={styles.select}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              fontWeight: 600,
              fontFamily: 'Poppins',
              backgroundColor: 'transparent',
              border: '1px solid #aaaaaa',
              borderRadius: '0.5rem'
            }),
            option: (baseStyles) => ({
              ...baseStyles,
              fontWeight: 600,
              fontFamily: 'Poppins'
            }),
            dropdownIndicator: (baseStyles) => ({
              ...baseStyles,
              color: '#2c3e50',
              '&:hover': {
                color: '#2980b9'
              }
            }),
            indicatorSeparator: (baseStyles) => ({
              ...baseStyles,
              backgroundColor: '#aaaaaa'
            })
          }}
        />
      </div>

      {/* Price range slider */}
      <div className={styles.formGroup}>
        <FormLabel sx={{fontFamily: 'Poppins', color: 'black !important'}}>
          Price Range
        </FormLabel>
        <Box sx={{ width: '100%', padding: '0 10px' }}>
          <Slider
            value={filters.priceRange}
            onChange={(_, newValue) => handleChange('priceRange', newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={2000000}
            step={5000}
            valueLabelFormat={(value) => `£${value.toLocaleString()}`}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{fontFamily: 'Poppins', fontWeight: '600'}}>
              £{filters.priceRange[0].toLocaleString()}
            </Typography>
            <Typography sx={{fontFamily: 'Poppins', fontWeight: '600'}}>
              £{filters.priceRange[1].toLocaleString()}
            </Typography>
          </Box>
        </Box>
      </div>

      {/* Bedroom range inputs */}
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <FormLabel sx={{fontFamily: 'Poppins', color: 'black !important'}}>
            Minimum Bedrooms
          </FormLabel>
          <TextField
            type="number"
            value={filters.minBedrooms}
            onChange={(e) => handleChange('minBedrooms', e.target.value)}
            inputProps={{ min: "1" }}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '0.5rem',
                fontFamily: 'Poppins',
                fontWeight: '600'
              }
            }}
          />
        </div>
        <div className={styles.formGroup}>
          <FormLabel sx={{fontFamily: 'Poppins', color: 'black !important'}}>
            Maximum Bedrooms
          </FormLabel>
          <TextField
            type="number"
            value={filters.maxBedrooms}
            onChange={(e) => handleChange('maxBedrooms', e.target.value)}
            inputProps={{ min: "1" }}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '0.5rem',
                fontFamily: 'Poppins',
                fontWeight: '600'
              }
            }}
          />
        </div>
      </div>

      {/* Date range filters */}
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <FormLabel sx={{fontFamily: 'Poppins', color: 'black !important'}}>
            Added After
          </FormLabel>
          <div style={{ width: '100%' }}>
          <DatePicker
            selected={filters.startDate}
            onChange={(date) => handleChange('startDate', date)}
            selectsStart
            startDate={filters.startDate}
            endDate={filters.endDate}
            dateFormat="dd/MM/yyyy"
            customInput={
              <TextField
                sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-root': {
                    fontFamily: 'Poppins',
                    fontWeight: '600',
                    borderRadius: '0.5rem',
                  }
                }}
              />
            }
          />
          </div>
        </div>
        <div className={styles.formGroup}>
          <FormLabel sx={{fontFamily: 'Poppins', color: 'black !important'}}>
            Added Before
          </FormLabel>
          <DatePicker
            selected={filters.endDate}
            onChange={(date) => handleChange('endDate', date)}
            selectsEnd
            startDate={filters.startDate}
            endDate={filters.endDate}
            minDate={filters.startDate}
            dateFormat="dd/MM/yyyy"
            customInput={
              <TextField
                sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-root': {
                    fontFamily: 'Poppins',
                    fontWeight: '600',
                    borderRadius: '0.5rem'
                  }
                }}
              />
            }
          />
        </div>
      </div>

      {/* Location search input */}
      <div className={styles.formGroup}>
        <FormLabel sx={{fontFamily: 'Poppins', color: 'black !important'}}>
          Location or Postcode Area
        </FormLabel>
        <TextField
          fullWidth
          name="location"
          value={filters.location}
          onChange={(e) => handleChange('location', e.target.value)}
          placeholder="e.g. BR1, NW1, Birmingham"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '0.5rem',
              fontFamily: 'Poppins',
              fontWeight: '600'
            }
          }}
        />
      </div>

      {/* Search submit button */}
      <Button 
        type="submit"
        variant="contained"
        size="large"
        startIcon={<SearchIcon />}
        fullWidth
        sx={{
          fontFamily: 'Poppins', 
          marginTop: '1rem', 
          fontWeight: '600', 
          backgroundColor: 'blue', 
          borderRadius: '0.5rem',
          '&:hover': {
            backgroundColor: '#0000b7'
          }
        }}
      >
        Search Properties
      </Button>
    </form>
  );
}

export default SearchForm;