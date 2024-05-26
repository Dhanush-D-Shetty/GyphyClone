import React, { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../context/gif-context";
import FollowOn from "../components/FollowOn";
import { HiMiniChevronDown, HiMiniChevronUp, HiMiniHeart } from "react-icons/hi2";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FaPaperPlane } from "react-icons/fa";
import { IoCodeSharp } from "react-icons/io5";
import Gif from "../components/Gif";
// const Gif = React.lazy(() => import("../components/Gif"));

const contentType = ["gifs", "stickers", "texts"];

const GifPage = () => {
  const { type, slug } = useParams();
  const { gf, favorites, addToFavorites } = GifState(); //  context api
  const [currentGif, setCurrentGif] = useState({});
  const [relatedGif, setRelatedGif] = useState([]);
  const [readMore, setReadMore] = useState(false);

  const fetchGif = async () => {
    const gifId = slug.split("-");
    const { data } = await gf.gif(gifId[gifId.length - 1]);
    const { data: related } = await gf.related(gifId[gifId.length - 1], {
      limit: 10,
    });
    setCurrentGif(data);
    setRelatedGif(related);
    console.log("CurrentGif : ", data);
  };

  useEffect(() => {
    if (!contentType.includes(type)) {
      throw new Error("invalid content type");
    }
    fetchGif();
  }, [slug]);       //  slug  in dependency

  const embedGif = () => {

  }
  const shareGif = () => {

  }

  return (
    <div className="grid grid-cols-4 my-10 gap-4">

      {/* gif information(left part of UI) visible in big screen hidden in small screen i.e mobile */}
      <div className="gifInfo hidden sm:block">
        {currentGif?.user && (
          <>
            <div className="flex gap-1">
              <img src={currentGif?.user?.avatar_url} alt={currentGif?.user?.display_name} className="h-14" />
              <div className="px-2">
                <div className="font-bold">{currentGif?.user?.display_name} </div>
                <div className="faded-text">@{currentGif?.user?.username}</div>
              </div>
            </div>

            {/* decription */}
            {currentGif?.user?.description && (
              <p className="text-sm py-4 whitespace-pre-line text-gray-400">
                {readMore ? currentGif?.user?.description : currentGif?.user?.description.slice(0, 80) + "..."}
                <div className=" flex items-center faded-text cursor-pointer" onClick={() => setReadMore(!readMore)}>
                  {readMore ? <>Read Less <HiMiniChevronUp size={20} />  </> : <>Read more <HiMiniChevronDown size={20} /> </>}
                </div>
              </p>
            )}
          </>
        )}

        <FollowOn />
        <div className="divider" />

        {currentGif?.source && <div className="source">
          <span className="faded-text">Source</span>
          <div className="flex items-center gap-1 text-sm font-bold">
            <HiOutlineExternalLink size={25} />
            <a href={currentGif?.source} target="_blank" className="truncate">{currentGif?.source}</a>
          </div>
        </div>}

      </div>

      <div className="bigGif col-span-4 sm:col-span-3">
        <div className="flex gap-6">
          <div className="w-full sm:w-3/4">
            <div className="faded-text truncate mb-2">{currentGif.title}</div>

              <Gif singleGif={currentGif} hover={false} />          

            {/* gif information visible in mobile small screen not in big screen*/}
            <div className="leftInSmallScreen flex justify-between gap-1 sm:hidden">
              <div className="flex gap-2">
                <img src={currentGif?.user?.avatar_url} alt={currentGif?.user?.display_name} className="h-14" />
                <div className="px-2">
                  <div className="font-bold">{currentGif?.user?.display_name} </div>
                  <div className="faded-text">@{currentGif?.user?.username}</div>
                </div>
              </div>
              <div className="flex gap-4">
                <button className=""  onClick={() => addToFavorites(currentGif.id)} >    {/* onClick={favourteGif} */}
                  <HiMiniHeart size={30} className={`${favorites.includes(currentGif.id) ? "text-red-500" : ""}`} />
                </button>
                <button className="">    {/* onClick={shareGif} */}
                  <FaPaperPlane size={25} />
                </button>
              </div>
            </div>
          </div>

          {/* right icons favourit ,share and embed which is viisible in large screen not n mobile */}
          <div className="hidden sm:flex flex-col gap-5">
            <button onClick={() => addToFavorites(currentGif.id)} className="flex gap-5 items-center font-bold text-lg">
              <HiMiniHeart size={30} className={`${favorites.includes(currentGif.id) ? "text-red-500" : ""}`} />
              Favourite
            </button>
            <button onClick={shareGif} className="flex gap-5 items-center font-bold text-lg">
              <FaPaperPlane size={30} />
              Share
            </button>
            <button onClick={embedGif} className="flex gap-5 items-center font-bold text-lg">
              <IoCodeSharp size={30} />
              Embed
            </button>
          </div>
        </div>

        {/* <div className="w-full my-2 mb-3 sm:hidden">
            <button onClick={() => addToFavorites(currentGif.id)} className="w-full flex justify-between font-bold text-lg">
              <span> Favourite  </span>
              <span><HiMiniHeart size={30} className={`${favorites.includes(currentGif.id) ? "text-red-500" : ""}`} />  </span>
            </button>
        </div> */}

        {/* related gifs */}
        <div className="relatedgifs">
          <span className="font-bold"> Related {type} : </span>
          <div className="columns-2 md:columns-3 gap-2">

            {relatedGif.slice(1).map((singleGif) => {
              return <Gif singleGif={singleGif} key={singleGif.id} />;
            })}
          </div>
            
        </div>
      </div>

    </div>
  );
};

export default GifPage;
