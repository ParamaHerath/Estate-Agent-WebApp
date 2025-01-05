import { createContext, useState, useContext, useEffect } from 'react';

const FavContext = createContext();

export function FavouritesProvider({ children }) {
  const [favourites, setFavourites] = useState(() => {
    // Initialize state from localStorage
    const savedFavourites = localStorage.getItem('favourites');
    return savedFavourites ? JSON.parse(savedFavourites) : [];
  });

  // Update localStorage when favourites change
  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

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

  const isFavorite = (propertyId) => {
    return favourites.some(fav => fav.id === propertyId);
  };

  return (
    <FavContext.Provider value={{ favourites, toggleFavorite, isFavorite, setFavourites }}>
      {children}
    </FavContext.Provider>
  );
}

export const useFavourites = () => useContext(FavContext); 