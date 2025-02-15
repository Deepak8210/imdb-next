"use client";
import Card from "../components/Card";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useState, useEffect } from "react";
import { generateRandomNumber } from "../utils/generateRandom";
import {
  fetchBanner,
  fetchTrending,
  fetchPopular,
  fetchTopRated,
} from "../store/slices/providerSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import CardSkeleton from "../components/CardSkeleton";
import ToggleBtn from "@/components/ToggleBtn";

export default function Home() {
  const baseImageUrl = "https://image.tmdb.org/t/p/original";
  const [imageUrl, setImageUrl] = useState("");
  const [selectedPopularType, setSelectedPopularType] = useState("movie");
  const [selectedTopRatedType, setSelectedTopRatedType] = useState("movie");
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchBanner());
    dispatch(fetchTrending("day"));
    dispatch(fetchPopular(selectedPopularType));
    dispatch(fetchTopRated(selectedTopRatedType));
  }, [dispatch, selectedPopularType, selectedTopRatedType]);

  const banners = useSelector((state: any) => state.provider.banners.data) || {
    results: [],
  };
  const trending = useSelector((state: any) => state.provider.trending) || {
    results: [],
  };
  const popular = useSelector((state: any) => state.provider.popular) || {
    results: [],
    mediaType: selectedPopularType,
  };
  const topRated = useSelector((state: any) => state.provider.topRated) || {
    results: [],
    mediaType: selectedTopRatedType,
  };

  useEffect(() => {
    if (banners !== null && banners?.results?.length > 0) {
      const randomIndex = generateRandomNumber();
      const image = `${baseImageUrl}${banners?.results[randomIndex]?.backdrop_path}`;
      setImageUrl(image);
    }
  }, [banners]);

  // Helper function to render slides
  const renderSlides = (data: any, loading: boolean, mediaType: string) => {
    if (loading) {
      return Array(5)
        .fill(0)
        .map((_, index) => (
          <SplideSlide key={`skeleton-${index}`}>
            <CardSkeleton />
          </SplideSlide>
        ));
    }

    return data?.results?.map((item: any) => (
      <SplideSlide key={item.id}>
        <Card
          imageUrl={`${baseImageUrl}${item.backdrop_path}`}
          title={item.name || item.title}
          date={item.release_date || item.first_air_date}
          ratings={item.vote_average}
          id={item.id}
          media_type={item.media_type}
          mediaType={mediaType}
        />
      </SplideSlide>
    ));
  };

  return (
    <div className="w-full overflow-x-hidden">
      <section
        className="text-white h-screen flex flex-col justify-between items-center"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
        }}
      >
        <div className="w-full h-full absolute bg-[rgba(4,21,45,0.5)]"></div>
        <div className="h-20 w-full  bg-gradient-to-b from-custom-dark via-custom6faded to-custom-lighter"></div>
        <div className="w-full flex flex-col items-center justify-between z-10">
          <h1 className="text-[5.5rem] font-semibold leading-[5rem]">
            Welcome.
          </h1>
          <p className="text-[1.5rem]">
            Millions of movies, TV shows and artists to discover. Explore now.
          </p>
          <div className=" w-2/5 rounded-full flex justify-between mt-8">
            <input
              type="text"
              className="w-full rounded-[50px_0_0_50px] px-4 py-3 text-gray-700 focus:outline-none"
              placeholder="Search for movies, tv shows, actors..."
            />
            <button className="px-8  bg-gradient-to-r from-[#ff00cc] to-[#3c1053] rounded-[0_50px_50px_0]">
              Search
            </button>
          </div>
        </div>

        <div className="h-20 w-full  bg-gradient-to-t from-custom-dark via-custom-faded to-custom-lighter "></div>
      </section>

      <section className="w-full min-h-screen px-[10%]">
        <div className="mt-12">
          <div className="flex items-center justify-between">
            <h5 className="text-gray-100 text-2xl">Trending</h5>
            <div className="p-1 flex rounded-full space-x-4 my-4">
              <ToggleBtn filterLabel={["day", "week"]} category={"trending"} />
            </div>
          </div>
          <div>
            <Splide
              aria-label="Trending Movies and Shows"
              options={{ perPage: 5, perMove: 1, pagination: false }}
            >
              {renderSlides(trending?.data, trending?.loading, "movie")}
            </Splide>
          </div>
        </div>

        <div className="mt-12">
          <div className="flex items-center justify-between">
            <h5 className="text-gray-100 text-2xl">What's Popular</h5>
            <div className="p-1 flex rounded-full space-x-4 my-4">
              <ToggleBtn
                filterLabel={["movie", "tv"]}
                category={"popular"}
                onChange={(type: string) => setSelectedPopularType(type)}
              />
            </div>
          </div>
          <div>
            <Splide
              aria-label="Popular Movies and Shows"
              options={{ perPage: 5, perMove: 1, pagination: false }}
            >
              {renderSlides(popular?.data, popular?.loading, popular.mediaType)}
            </Splide>
          </div>
        </div>

        <div className="mt-12">
          <div className="flex items-center justify-between">
            <h5 className="text-gray-100 text-2xl">Top Rated</h5>
            <div className="p-1 flex rounded-full space-x-4 my-4">
              <ToggleBtn
                filterLabel={["movie", "tv"]}
                category={"topRated"}
                onChange={(type: string) => setSelectedTopRatedType(type)}
              />
            </div>
          </div>
          <div>
            <Splide
              aria-label="Top Rated Movies and Shows"
              options={{ perPage: 5, perMove: 1, pagination: false }}
            >
              {renderSlides(
                topRated?.data,
                topRated?.loading,
                topRated.mediaType
              )}
            </Splide>
          </div>
        </div>
      </section>
    </div>
  );
}
