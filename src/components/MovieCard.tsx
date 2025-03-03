"use client";
import { useState } from "react";
import Image from "next/image";
import fallBackImg from "../../public/no_poster.webp";
import { useRouter } from "next/navigation";

const MovieCard = ({ data }: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const baseImageUrl = "https://image.tmdb.org/t/p/w500";
  const router = useRouter();

  // Determine the correct image source
  const imageSource = data?.poster_path
    ? `${baseImageUrl}${data.poster_path}`
    : data?.backdrop_path
    ? `${baseImageUrl}${data.backdrop_path}`
    : fallBackImg;

  return (
    <div
      onClick={() => router.push(`/${data?.media_type}/${data?.id}`)}
      className="cursor-pointer"
    >
      <div className="relative h-[350px] w-[230px] overflow-hidden rounded-xl">
        <div
          className={`absolute inset-0 bg-gray-800 animate-pulse ${
            isLoading ? "visible" : "hidden"
          }`}
        />
        <Image
          alt={`Poster for ${data?.title || data?.name || "Unknown Title"}`}
          src={imageSource}
          fill
          sizes="230px"
          className={`object-cover rounded-xl transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88P//fwAJZAP4p2tdGwAAAABJRU5ErkJggg=="
          onLoadingComplete={() => setIsLoading(false)}
        />
      </div>
      <h5 className="text-gray-100 text-lg mt-2 truncate max-w-[230px]">
        {data?.title || data?.name || data?.original_name || "Unknown Title"}
      </h5>
      <span className="text-gray-400 text-sm">
        {data?.release_date || data?.first_air_date || "NA"}
      </span>
    </div>
  );
};

export default MovieCard;
