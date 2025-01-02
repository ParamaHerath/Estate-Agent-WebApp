import { createContext, useState, useContext } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (property) => {
    setFavorites(prev => {
      const isPropertyFavorited = prev.some(fav => fav.id === property.id);
      if (isPropertyFavorited) {
        return prev.filter(fav => fav.id !== property.id);
      } else {
        return [...prev, property];
      }
    });
  };

  const isFavorite = (propertyId) => {
    return favorites.some(fav => fav.id === propertyId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext); 