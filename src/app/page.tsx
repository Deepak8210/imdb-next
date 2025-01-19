"use client";
import Card from "../components/Card";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Link from "next/link";
import { fetchTrending as fetchTrendings } from "../api/Trending";
import { useState, useEffect, use } from "react";
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
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
  const [trendings, setTrendings] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchBanner());
    dispatch(fetchTrending());
    dispatch(fetchPopular());
    dispatch(fetchTopRated());
  }, [dispatch]);

  const banners = useSelector((state: any) => state.provider.banners.data) || {
    results: [],
  };
  const trending = useSelector((state: any) => state.provider.trending) || {
    results: [],
  };
  const popular = useSelector((state: any) => state.provider.popular) || {
    results: [],
  };
  const topRated = useSelector((state: any) => state.provider.topRated) || {
    results: [],
  };

  useEffect(() => {
    if (banners !== null && banners?.results?.length > 0) {
      const randomIndex = generateRandomNumber();
      const image = `${baseImageUrl}${banners?.results[randomIndex]?.backdrop_path}`;
      setImageUrl(image);
    }
  }, [banners]);

  // Helper function to render slides
  const renderSlides = (data: any, loading: boolean) => {
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
        />
      </SplideSlide>
    ));
  };

  return (
    <div className="w-full">
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
              <ToggleBtn />
            </div>
          </div>
          <div>
            <Splide
              aria-label="Trending Movies and Shows"
              options={{ perPage: 5, perMove: 1, pagination: false }}
            >
              {renderSlides(trending?.data, trending?.loading)}
            </Splide>
          </div>
        </div>

        <div className="mt-12">
          <div className="flex items-center justify-between">
            <h5 className="text-gray-100 text-2xl">What's Popular</h5>
            <div className="p-1 flex rounded-full space-x-4 my-4">
              <ToggleBtn />
            </div>
          </div>
          <div>
            <Splide
              aria-label="Popular Movies and Shows"
              options={{ perPage: 5, perMove: 1, pagination: false }}
            >
              {renderSlides(popular?.data, popular?.loading)}
            </Splide>
          </div>
        </div>

        <div className="mt-12">
          <div className="flex items-center justify-between">
            <h5 className="text-gray-100 text-2xl">Top Rated</h5>
            <div className="p-1 flex rounded-full space-x-4 my-4">
              <ToggleBtn />
            </div>
          </div>
          <div>
            <Splide
              aria-label="Top Rated Movies and Shows"
              options={{ perPage: 5, perMove: 1, pagination: false }}
            >
              {renderSlides(topRated?.data, topRated?.loading)}
            </Splide>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#020c1a] h-fit p-5">
        <div className="flex space-x-6 justify-center text-gray-200 items-center px-[10%] py-8">
          <span>Terms Of Use</span>
          <span>Privacy-Policy</span>
          <span>About</span>
          <span>Blog</span>
          <span>FAQ</span>
        </div>
        <p className="w-1/2 text-center mx-auto text-sm text-gray-400">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut laboreet dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>
        <div className="w-full flex items-center justify-center space-x-4 mt-5 mb-5">
          <Link href={"/"} className="bg-[#04152D] p-3 rounded-full">
            <FaFacebook className="w-6 h-6 text-gray-300" />
          </Link>
          <Link href={"/"} className="bg-[#04152D] p-3 rounded-full">
            <FaInstagram className="w-6 h-6 text-gray-300" />
          </Link>
          <Link href={"/"} className="bg-[#04152D] p-3 rounded-full">
            <FaTwitter className="w-6 h-6 text-gray-300" />
          </Link>
          <Link href={"/"} className="bg-[#04152D] p-3 rounded-full">
            <FaLinkedin className="w-6 h-6 text-gray-300" />
          </Link>
        </div>
        <ToggleBtn />
      </section>
    </div>
  );
}
