import React from "react";
import { HiMiniArrowTrendingUp } from "react-icons/hi2";
import { GifState } from "../context/gif-context";

const filters = [
    {
        title: "Gifs",
        value: "gifs",
        background:
            "bg-gradient-to-tr from-purple-600 via-purple-600 to-purple-500 rounded-full",
    },
    {
        title: "Stickers",
        value: "stickers",
        background: "bg-gradient-to-tr from-teal-500 via-teal-600 to-teal-500 rounded-full",
    },
    {
        title: "Text",
        value: "text",
        background: "bg-gradient-to-tr from-blue-600  via-blue-600 to-blue-500 rounded-full",
    },
];


const FilterGif = ({ alignLeft = false, showTrending = false }) => {

    const { filter, setFilter } = GifState();
    // const { filter, setFilter } = useContext(GifContext);

    return (
        <div className={`flex my-4 py-3 gap-3 sticky top-[128px] left-0 z-30 bg-gray-950 ${alignLeft ? "" : "justify-end"} ${showTrending ? "justify-between flex-col sm:flex-row sm:items-center" : ""}`}>
            {showTrending && (
                <span className="flex gap-2">
                    {showTrending && (
                        <HiMiniArrowTrendingUp size={25} className="text-teal-400" />
                    )}
                    <span className="font-semibold text-gray-400">Trending</span>
                </span>
            )}

            {/*  right part of filter (i.e gifs ,sticker and text ) */}
            <div className="flex min-w-80 rounded-full bg-gray-700">
                {filters.map((f) => {
                    return <span
                        onClick={() => setFilter(f.value)}
                        key={f.title}
                        className={`${filter === f.value ? f.background : ""} text-center font-semibold w-1/3 py-2 rounded cursor-pointer`}
                    > {f.title}
                    </span>
                })}
            </div>
        </div>
    );
};

export default FilterGif;
