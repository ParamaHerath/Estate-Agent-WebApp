// Context for managing favorite properties across the application
import { createContext, useState, useContext, useEffect } from 'react';

const FavContext = createContext();

export function FavouritesProvider({ children }) {
  // Initialize favorites state from localStorage or empty array if none exists
  const [favourites, setFavourites] = useState(() => {
    const savedFavourites = localStorage.getItem('favourites');
    return savedFavourites ? JSON.parse(savedFavourites) : [];
  });

  // Persist favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  // Toggle a property's favorite status
  // If it's already favorited, remove it; if not, add it
  const toggleFavorite = (property) => {
    setFavourites(prev => {
      const isPropertyFavorited = prev.some(fav => fav.id === property.id);
      if (isPropertyFavorited) {
        return prev.filter(fav => fav.id !== property.id);
      } else {
        return [...prev, property];
      }
    });
  };

  // Check if a property is in the favorites list
  const isFavorite = (propertyId) => {
    return favourites.some(fav => fav.id === propertyId);
  };

  // Provide favorites state and methods to children components
  return (
    <FavContext.Provider value={{ favourites, toggleFavorite, isFavorite, setFavourites }}>
      {children}
    </FavContext.Provider>
  );
}

// Custom hook for accessing favorites context
export const useFavourites = () => useContext(FavContext); 