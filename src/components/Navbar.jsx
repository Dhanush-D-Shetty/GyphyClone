import React, {useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiDotsVertical } from "react-icons/hi";
import {GifState} from "../context/gif-context"
import GifSearch from "./GifSearch";

const Navbar = () => {
  const [showCategories, setShowCategories] = useState(false);
  const [categories, setCategories] = useState([]);

  // const { gf, gifs, setGifs, filter, setFilter, favorites, setFavorites } = useContext(GifContext);
  const { gf, gifs, setGifs, filter, setFilter, favorites, setFavorites } = GifState();

  const fetchGifCategories = async () => {
    const { data } = await gf.categories();
    setCategories(data);
    // console.log(data);
  };
  useEffect(() => {
    fetchGifCategories();
  }, []);

  return (
    <nav className="sticky top-0 left-0 z-50 py-2 bg-gray-950">
      <div className="relative flex justify-between items-center mb-2">
        <Link to="/" className="logo flex gap-2 items-center">
          <img src="logo.svg" alt="giphy logo" className="w-8" />
          <h1 className="text-3xl font-bold uppercase tracking-tight cursor-pointer">
            Giffe
          </h1>
        </Link>

        <div className="right flex gap-2 items-center font-bold ">
          {categories.slice(0, 5).map((category) => {
            return (
              <Link
                key={category.name}
                to={`/${category.name_encoded}`}
                className=" hidden hover:gradient px-4 py-1 border-b-4 lg:block"
              > {category.name}  </Link>
            );
          })}

          {/* button for show and hdding categories*/}
          <button onClick={() => setShowCategories(!showCategories)}>
            <HiDotsVertical size={35}   className={`py-0.5 border-b-4 hidden lg:block hover:gradient ${showCategories ? "gradient":""}`} />
          </button>

          {/*  displaying favorites if there is in favourite list */}
          {favorites.length > 0 && (
            <Link  to="/favorites" className=" bg-gray-700 h-9 px-6 pt-1.5 cursor-pointer rounded" >
              Favourite Gifs
            </Link>
          )}

         {/* button for show and hdding categories*/}
          <button className="hamburger "  onClick={() => setShowCategories(!showCategories)}>
            <GiHamburgerMenu size={20} className="block lg:hidden" />
          </button>
        </div>

        {showCategories && (
          <div className="Categories absolute right-0 top-14 w-full px-10 pt-6 pb-9 z-[1000] gradient">
            <span className="text-3xl font-extrabold" >Categories</span>
            <hr className="bg-gray-100 opacity-50 my-5"/>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 ">{
              categories?.map((category) => {
                return <Link key={category.name} to={`/${category.name_encoded}`} className="font-bold"  onClick={() => setShowCategories(!showCategories)} > {category.name}</Link>
              })
            }</div>
          </div>
        )}
      </div>

      <GifSearch />
    </nav>
  );
};

export default Navbar;
