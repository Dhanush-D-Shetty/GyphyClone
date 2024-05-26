import React, { Suspense, useEffect } from "react";
import { GifState } from "../context/gif-context";
import FilterGif from "../components/FilterGif";

import Gif from "../components/Gif";
// const Gif = React.lazy(() => import("../components/Gif"));

const Home = () => {
  const { gf, gifs, setGifs, filter } = GifState();

  const fetchTrendngGifs = async () => {
    const { data } = await gf.trending({
      limit: 40,
      type: filter,    // fetchs based on filter selected in homepage
      rating: "g",
    });
    setGifs(data);
    console.log(data);
  };

  useEffect(() => {
    fetchTrendngGifs();
  }, [filter]);

  return (
    <div>
      {/* image */}
      <img src="banner.gif" alt="earth banner" className="w-full rounded mt-5" />

      {/* filtergif component */}
      <FilterGif showTrending={true} />

      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2 text-white">
          {gifs.map((singleGif) => {
            return <Gif singleGif={singleGif} key={singleGif.id} />;
          })}  
      </div>
    </div>
  );
};

export default Home;
