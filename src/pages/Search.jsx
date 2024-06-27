import React, { useEffect, useState } from "react";
import FilterGif from "../components/FilterGif";
import { useParams } from "react-router-dom";
import { GifState } from "../context/gif-context";
import Gif from "../components/Gif";
import LoadingBar from "react-top-loading-bar";

const search = () => {
  const { query } = useParams();      //  gettng data from thr url using useParams() hook
  const { gf, filter } = GifState();  // context api
  const [searchResult, setSearchResult] = useState([]);
  const [progress, setProgress] = useState(0) ;  // top loadng bar

  const fetchSearchResult = async () => {
      setProgress(40);

    const { data } = await gf.search(query, {
      sort: "relevant",
      lang: "en",
      type: filter,
      limit: 20,
    });
       setProgress(70);
    setSearchResult(data);
      setProgress(100);
    // console.log("searchResult : ", data);
  };

  useEffect(() => {
    fetchSearchResult();
  }, [filter, query]);

  return (

    <div className="my-4">
       <LoadingBar color='#f11946' progress={progress}   />

      <h1 className="text-4xl py-3 font-extrabold capitalize">{query}</h1>

      <FilterGif alignLeft={true} />

      {searchResult.length > 0 ? (
        <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
          {searchResult.map((gif) => {
            return <Gif singleGif={gif} key={gif.id} />;
          })}
        </div>
      ) : (
        <span> {filter.charAt(0).toUpperCase() + filter.slice(1)} not found for {query} . Try seatching stickers instead..</span>
      )}
    </div>

  );
};

export default search;
