"use client";
import { useState } from "react";
import Image from "next/image";
import cardImg from "../../public/no_poster.webp";
import CircularProgressBar from "./CircularProgressBar";
import { useRouter } from "next/navigation";

interface CardProps {
  id: number | string;
  imageUrl?: string;
  title: string;
  date?: string;
  ratings?: number;
  media_type?: string;
  mediaType?: string;
  genres?: Array<{ id: number; name: string }>;
}

const Card = ({
  id,
  imageUrl,
  title,
  date,
  ratings = 0,
  media_type,
  mediaType,
  genres = [],
}: CardProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // Show at most 2 genres
  const displayGenres = genres?.slice(0, 2) || [];

  // Calculate percentage safely
  const ratingPercentage = ratings ? parseFloat((ratings * 10).toFixed(0)) : 0;

  // Determine the correct media type (handle both property names)
  const type = media_type || mediaType || "movie";

  return (
    <div
      onClick={() => router.push(`/${type}/${id}`)}
      className="mr-4 cursor-pointer w-full max-w-[230px]"
    >
      <div className="relative h-[350px] w-full rounded-xl">
        {/* Loading placeholder */}
        <div
          className={`absolute inset-0 bg-gray-800 animate-pulse ${
            isLoading ? "visible" : "hidden"
          }`}
        />

        <Image
          alt={`Poster for ${title}`}
          src={imageUrl || cardImg}
          fill
          sizes="(max-width: 768px) 100vw, 230px"
          className={`object-cover relative rounded-xl transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={() => setIsLoading(false)}
          priority={false}
          loading="lazy"
        />

        <div className="absolute -bottom-4 left-0  flex justify-between items-start w-full px-2">
          {/* Only render CircularProgressBar if we have ratings */}
          {ratingPercentage > 0 && (
            <span className="ml-2 rounded-full text-md w-[3.5rem] h-[3.5rem] flex items-center justify-center bg-gray-100 outline-2 outline-gray-600 -outline-offset-4">
              <CircularProgressBar
                percentage={ratingPercentage}
                size={50}
                strokeWidth={4}
                stroke={"#FF0000"}
              />
            </span>
          )}

          {/* Only render genre tags if we have genres data */}
          {/* {displayGenres.length > 0 ? (
            <div className="flex space-x-2 items-center">
              {displayGenres.map((genre, index) => (
                <span
                  key={index}
                  className="text-white text-[0.8rem] font-thin bg-pink-600 py-[1px] px-2 rounded-sm truncate max-w-[80px]"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          ) : (
            <div className="flex space-x-2 items-center">
              <span className="text-white text-[0.8rem] font-thin bg-pink-600 py-[1px] px-2 rounded-sm">
                {type}
              </span>
            </div>
          )} */}
        </div>
      </div>

      <h5 className="text-gray-100 text-lg mt-6 truncate">{title}</h5>
      {date && <span className="text-gray-400 text-sm">{date}</span>}
    </div>
  );
};

export default Card;
