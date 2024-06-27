import React, { Suspense, useEffect, useState } from "react";
import { GifState } from "../context/gif-context";
import FilterGif from "../components/FilterGif";
import LoadingBar from 'react-top-loading-bar'

import Gif from "../components/Gif";
// const Gif = React.lazy(() => import("../components/Gif"));

const Home = () => {
  const [progress, setProgress] = useState(0)
  const { gf, gifs, setGifs, filter } = GifState();

  const fetchTrendngGifs = async () => {
    setProgress(30);
    const { data } = await gf.trending({
      limit: 40,
      type: filter,    // fetchs based on filter selected in homepage
      rating: "g",
    });
    setProgress(60);
    setGifs(data);
    setProgress(100);
    // console.log(data);
  };

  useEffect(() => {
    fetchTrendngGifs();
  }, [filter]);

  return (
    <div>
       <LoadingBar color='#f11946' progress={progress}   />
      {/* image */}
      <img src="banner.gif" alt="earth banner" className="w-full rounded mt-1" />

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
