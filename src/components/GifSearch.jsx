import React, { useState } from "react";
import { HiMiniXMark, HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const GifSearch = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const searchGifs = async (e) => {
    // console.log(e.target.tagName);
    if (query.trim() === "") return;

    if (
      e.keyCode === 13 ||
      e.target.tagName === "BUTTON" ||
      e.target.tagName === "svg"
    ) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="flex relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={searchGifs}
        className="w-full px-4 py-5 text-xl rounded-blx text-black border-none outline-none"
        placeholder="Search all Gifs and Stickers"
      />


      {query && (
        <button
          onClick={() => setQuery("")}
          className="absolute right-20 top-6  bg-gray-300 mr-2 rounded-full"
        >
          <HiMiniXMark size={22} />
        </button>
      )}


      <button
        onClick={searchGifs}
        className="bg-[#F15492] px-4 py-2 text-center rounded-br"
      >
        <HiOutlineMagnifyingGlass size={35} className="-scale-x-100" />
      </button>
    </div>
  );
};

export default GifSearch;
