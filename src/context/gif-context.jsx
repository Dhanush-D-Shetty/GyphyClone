import { GiphyFetch } from "@giphy/js-fetch-api";
import { createContext, useContext, useEffect, useState } from "react";

export const GifContext = createContext();

const GifProvider = ({ children }) => {
  const [gifs, setGifs] = useState([]);
  const [filter, setFilter] = useState("gifs");
  const [favorites, setFavorites] = useState([]);  // stores id of gifs

  const gf = new GiphyFetch(import.meta.env.VITE_GYPHY_KEY);

  const addToFavorites = (id) => {
    // console.log("favourites ",favorites);
    if (favorites.includes(id)) {    // if user id exists then remove it from list
      const updatedFavouites = favorites.filter((itemId) => itemId !== id);
      localStorage.setItem("favouriteGif", JSON.stringify(updatedFavouites));
      setFavorites(updatedFavouites);
    } else {
      const updatedFavouites = [...favorites];
      updatedFavouites.push(id);
      localStorage.setItem("favouriteGif", JSON.stringify(updatedFavouites));
      setFavorites(updatedFavouites);
    }
  }
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favouriteGif")) || [];
  }, [])

  return (
    <GifContext.Provider
      value={{ gf, gifs, setGifs, filter, setFilter, favorites, setFavorites, addToFavorites }}
    >
      {children}
    </GifContext.Provider>
  );
};

export const GifState = () => {
  return useContext(GifContext);
};

export default GifProvider;
