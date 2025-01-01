import { useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { NumericFormat } from 'react-number-format';
import { 
  Button, 
  Slider, 
  TextField,
  Box,
  Typography 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import "react-datepicker/dist/react-datepicker.css";
import styles from './SearchForm.module.css';

function SearchForm({ onSearch }) {
  const [filters, setFilters] = useState({
    type: { value: 'any', label: 'Any' },
    priceRange: [0, 2000000],
    minBedrooms: '',
    maxBedrooms: '',
    startDate: null,
    endDate: null,
    location: ''
  });

  const propertyTypes = [
    { value: 'any', label: 'Any' },
    { value: 'House', label: 'House' },
    { value: 'Flat', label: 'Flat' }
  ];

  const handleChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      ...filters,
      type: filters.type.value,
      minPrice: filters.priceRange[0],
      maxPrice: filters.priceRange[1]
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <Typography variant="subtitle1">Property Type</Typography>
        <Select
          value={filters.type}
          onChange={(option) => handleChange('type', option)}
          options={propertyTypes}
          className={styles.select}
        />
      </div>

      <div className={styles.formGroup}>
        <Typography variant="subtitle1">Price Range</Typography>
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
            <Typography>£{filters.priceRange[0].toLocaleString()}</Typography>
            <Typography>£{filters.priceRange[1].toLocaleString()}</Typography>
          </Box>
        </Box>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <Typography variant="subtitle1">Min Bedrooms</Typography>
          <NumericFormat
            customInput={TextField}
            value={filters.minBedrooms}
            onValueChange={(values) => handleChange('minBedrooms', values.value)}
            allowNegative={false}
            isAllowed={(values) => values.value <= 10}
            placeholder="Min Bedrooms"
          />
        </div>
        <div className={styles.formGroup}>
          <Typography variant="subtitle1">Max Bedrooms</Typography>
          <NumericFormat
            customInput={TextField}
            value={filters.maxBedrooms}
            onValueChange={(values) => handleChange('maxBedrooms', values.value)}
            allowNegative={false}
            isAllowed={(values) => values.value <= 10}
            placeholder="Max Bedrooms"
          />
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <Typography variant="subtitle1">Start Date</Typography>
          <DatePicker
            selected={filters.startDate}
            onChange={(date) => handleChange('startDate', date)}
            selectsStart
            startDate={filters.startDate}
            endDate={filters.endDate}
            dateFormat="dd/MM/yyyy"
            customInput={<TextField />}
          />
        </div>
        <div className={styles.formGroup}>
          <Typography variant="subtitle1">End Date</Typography>
          <DatePicker
            selected={filters.endDate}
            onChange={(date) => handleChange('endDate', date)}
            selectsEnd
            startDate={filters.startDate}
            endDate={filters.endDate}
            minDate={filters.startDate}
            dateFormat="dd/MM/yyyy"
            customInput={<TextField />}
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <Typography variant="subtitle1">Location/Postcode Area</Typography>
        <TextField
          fullWidth
          name="location"
          value={filters.location}
          onChange={(e) => handleChange('location', e.target.value)}
          placeholder="e.g. BR1, NW1, Birmingham"
        />
      </div>

      <Button 
        type="submit"
        variant="contained"
        size="large"
        startIcon={<SearchIcon />}
        fullWidth
        sx={{ mt: 2 }}
      >
        Search Properties
      </Button>
    </form>
  );
}

export default SearchForm;