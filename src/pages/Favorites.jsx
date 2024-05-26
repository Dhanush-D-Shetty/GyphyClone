import React, { Suspense, useEffect, useState } from 'react'
import { GifState } from '../context/gif-context';
import Gif from '../components/Gif';
// const Gif = React.lazy(() => import("../components/Gif"));


const Favorites = () => {

  const { gf, favorites } = GifState();  // context api
  const [favortieGifs, setFavortieGifs] = useState([]);

  const fetchFavorites = async () => {
    const { data } = await gf.gifs(favorites);
    setFavortieGifs(data);
    console.log("favortieGifs : ", data);
  };

  useEffect(() => {
    fetchFavorites();
  }, [favorites]);

  return (
    <div className='mt-2'>
      <span className='faded-text'>My Favorites</span>
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
        
        {favortieGifs.map((singleGif) => {
        return  <Suspense fallback={<span className='text-white'>Loadng</span>}>
           <Gif singleGif={singleGif} key={singleGif.id} />
        </Suspense>
        })}
        </div>
    </div>
  )
}

export default Favorites