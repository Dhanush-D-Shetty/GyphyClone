import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FollowOn from "../components/FollowOn";
import { GifState } from "../context/gif-context";
import Gif from "../components/Gif";
import LoadingBar from "react-top-loading-bar";

const category = () => {
  const { category } = useParams(); //  gettng data from thr url using useParams() hook
  const { gf, filter } = GifState(); //  context api
  const [results, setResults] = useState([]);
  const [progress, setProgress] = useState(0) ;  // top loadng bar


  const fetchOnCategory = async () => {
      setProgress(300);
    const { data } = await gf.gifs(category, category);
       setProgress(60);
    setResults(data);
       setProgress(100);
    // console.log("searchResult : ", data);
  };

  useEffect(() => {
    fetchOnCategory();
  }, [category]);

  return (
   
   <div className="flex flex-col sm:flex-row gap-5 my-4">
      <LoadingBar color='#f11946' progress={progress}   />

      {/* left part */}
      <div className="w-full sm:w-72">
        {results.length > 0 && <Gif singleGif={results[0]} hover={false} />}

        <span className="text-sm text-gray-400 pt-2">Dont tell t to me , gf t to me </span>

        <FollowOn />

        <div className="divider" />
      </div>

      {/* right part */}
      <div>
        <h2 className="text-4xl font-extrabold capitalize pb-1"> {category.split("-").join(" & ")} GIFS</h2>
        <h2 className="text-lg text-gray-400 pb-3 font-bold cursor-pointer hover:text-gray-50"> @{category}</h2>
        { results.length > 0 && (
          <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
              {results.slice(1).map((singleGif) => {
                return <Gif singleGif={singleGif} key={singleGif.id} />;
              })}
          </div>
        )}
      </div>

    </div>
  );
};

export default category;
