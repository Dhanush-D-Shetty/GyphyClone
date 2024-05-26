import React from "react";
import { Link } from "react-router-dom";

const Gif = ({ singleGif, hover = true }) => {
  
  return (
   <Link to={`/${singleGif.type}s/${singleGif.slug}`} key={singleGif.slug}>
      <div className="w-full cursor-pointer mb-2 relative">
        <img src={singleGif?.images?.fixed_width.url} alt={singleGif.title}  className="w-full object-cover rounded transition-all duration-300"/>
      </div>
    </Link>
  );
};

export default Gif;
