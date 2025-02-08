"use client";
import { useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import CircularProgressBar from "../../../components/CircularProgressBar";
import VideoPlayer from "../../../components/VideoPlayer";
import Card from "../../../components/Card";
import { use, useEffect } from "react";
import {
  fetchDetails,
  fetchSimilarVideos,
} from "../../../store/slices/providerSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store/store";
import MovieDetailsSkeleton from "../../../components/MovieDetailsSkeleton";

const page = ({
  params,
}: {
  params: Promise<{ type: string; id: number }>;
}) => {
  const baseImageUrl = "https://image.tmdb.org/t/p/original";
  const dispatch = useDispatch<AppDispatch>();
  const resolvedParams = use(params);

  useEffect(() => {
    dispatch(
      fetchDetails({
        filterType: resolvedParams?.type,
        movieId: (resolvedParams?.id).toString(),
      })
    );
    dispatch(
      fetchSimilarVideos({
        filterType: resolvedParams?.type,
        movieId: (resolvedParams?.id).toString(),
      })
    );
  }, []);

  const {
    details: Details,
    credits: Credits,
    loading,
  } = useSelector((state: any) => state?.provider?.movieDetails) || {
    results: [],
  };

  const { videos, similar, recommendation } = useSelector(
    (state: any) => state?.provider?.similarVideos
  ) || {
    results: [],
  };

  return (
    <>
      {loading ? (
        <MovieDetailsSkeleton />
      ) : (
        <div className="pt-20 text-white px-[10%]">
          <section className="flex w-full py-12">
            <div className="w-[65%] flex rounded-xl pr-12">
              <img
                src={baseImageUrl + Details?.backdrop_path}
                alt="movie image"
                className="rounded-xl object-cover"
              />
            </div>
            <div className="w-full">
              <h5 className="text-[2.2rem]">
                {Details?.title || Details?.name}
              </h5>
              <h3 className="text-[1.3rem] italic text-gray-400">
                {Details?.tagline || "A must watch"}
              </h3>
              <div className="flex gap-2 my-4 mb-6">
                {Details?.genres?.map((genre: { id: string; name: string }) => (
                  <span
                    key={genre.id}
                    className="bg-pink-600 text-white text-sm px-1 rounded-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <div>
                  <CircularProgressBar
                    percentage={parseFloat(
                      (Details?.vote_average * 10 || 0).toFixed(0)
                    )}
                  />
                </div>
                <div className="flex w-full items-center gap-4 ">
                  <div className="relative">
                    <VideoPlayer />
                  </div>
                  <span className="text-2xl"> Watch Trailer</span>
                </div>
              </div>
              <h3 className=" my-3 text-2xl">Overview</h3>
              <p className="text-[1rem]">{Details?.overview}</p>
              <div className=" mt-8 border-b border-gray-500 flex text-lg gap-4 py-4">
                <p className="text-gray-500">
                  <span className="font-semibold text-white">
                    {" "}
                    Status :&nbsp;
                  </span>
                  {Details?.status}
                </p>
                <p className="text-gray-500">
                  <span className="font-semibold text-white">
                    Release Date :&nbsp;
                  </span>{" "}
                  {Details?.release_date || Details?.first_air_date}
                </p>
                {Details?.runtime && (
                  <p className="text-gray-500">
                    <span className="font-semibold text-white">
                      Runtime :&nbsp;{" "}
                    </span>{" "}
                    {`${Math.trunc(Details?.runtime / 60)}h ${
                      Details?.runtime % 60
                    }m`}
                  </p>
                )}
              </div>
              {Credits?.crew?.some(
                (credit: any) => credit?.department === "Directing"
              ) && (
                <p className="border-b border-gray-500 text-gray-500 py-4">
                  <span className="font-semibold text-white">
                    {" "}
                    Director :&nbsp;{" "}
                  </span>
                  {Credits?.crew
                    ?.filter(
                      (credit: any) => credit?.department === "Directing"
                    )
                    ?.map((director: any) => (
                      <span key={director.id}>{director.name + ",  "}</span>
                    ))}
                </p>
              )}
              {Credits?.crew?.some(
                (credit: any) => credit?.department === "Writing"
              ) && (
                <p className="border-b border-gray-500 text-gray-500 py-4">
                  <span className="font-semibold text-white">
                    {" "}
                    Writer :&nbsp;
                  </span>
                  {Credits?.crew
                    ?.filter((credit: any) => credit?.department === "Writing")
                    ?.map((director: any, i: string) => (
                      <span key={i}>{director.name + ",  "}</span>
                    ))}
                </p>
              )}
            </div>
            <div className="w-full mx-auto overflow-hidden flex h-full -z-10 absolute top-0 left-0 right-0 items-center justify-center">
              <img
                src={baseImageUrl + Details?.backdrop_path}
                alt=""
                className="object-cover"
              />
              <div className="w-full h-full bg-[rgba(4,21,45,0.91)] absolute top-0 left-0"></div>
            </div>
          </section>
          <section className="min-h-screen">
            <h5 className="text-2xl">Top Cast</h5>
            <div className="flex gap-8 w-full overflow-x-scroll my-4">
              {Credits?.cast?.map((cast: any) => (
                <div key={cast.id} className="flex flex-col justify-center">
                  <div className="w-40 h-40 flex rounded-full bg-red-500 flex-shrink-0">
                    <img
                      src={
                        cast?.profile_path !== null
                          ? baseImageUrl + cast?.profile_path
                          : "/avatar.png"
                      }
                      alt=""
                      className="object-cover rounded-full"
                    />
                  </div>
                  <div className="text-center mt-4">
                    <h6 className="font-semibold text-[0.9rem]">
                      {cast?.name}
                    </h6>
                    <p className="text-gray-400 text-[0.8rem]">
                      {cast?.character}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <h5 className="text-2xl mt-12">Official Videos</h5>
            <div className="flex items-start gap-8 w-full overflow-x-scroll my-4">
              {videos?.results.map((vid: any) => (
                <div
                  key={vid.id}
                  className="flex w-72  flex-col justify-center flex-shrink-0 rounded-t-xl"
                >
                  <div className=" h-40 flex w-full rounded-x relative">
                    <img
                      src={`https://img.youtube.com/vi/${vid.key}/mqdefault.jpg`}
                      alt=""
                      className="object-cover top rounded-xl"
                    />
                    <div className="absolute top-0 left-0 flex items-center justify-center  w-full h-full">
                      <VideoPlayer />
                    </div>
                  </div>

                  <p className="text-white text-[1rem] my-2 flex">
                    {vid?.name}
                  </p>
                </div>
              ))}
            </div>

            <h5 className="text-2xl mt-12 mb-6">Similar Movies</h5>
            <div className=" w-full">
              <Splide
                aria-label="Trending Movies and Shows"
                options={{ perPage: 5, perMove: 1, pagination: false }}
              >
                {similar?.results?.map((similar: any) => (
                  <SplideSlide key={similar.id}>
                    <div className="w-[15.5rem] ">
                      <Card
                        imageUrl={
                          similar?.backdrop_path !== null
                            ? baseImageUrl + similar.backdrop_path
                            : `/cardImg.jpg`
                        }
                        title={similar?.title}
                        date={similar?.release_date}
                        ratings={similar?.vote_average}
                        id={similar?.id}
                      />
                    </div>
                  </SplideSlide>
                ))}
              </Splide>
            </div>

            <h5 className="text-2xl mt-12 mb-6">Recommendations</h5>
            <div className=" w-full">
              <Splide
                aria-label="Trending Movies and Shows"
                options={{ perPage: 5, perMove: 1, pagination: false }}
              >
                {recommendation?.results?.map((recommend: any) => (
                  <SplideSlide key={recommend.id}>
                    <div className="w-[15.5rem] ">
                      <Card
                        imageUrl={
                          recommend?.backdrop_path !== null
                            ? baseImageUrl + recommend?.backdrop_path
                            : "/cardImg.jpg"
                        }
                        title={recommend?.title}
                        date={recommend?.release_date}
                        ratings={recommend?.vote_average}
                      />
                    </div>
                  </SplideSlide>
                ))}
              </Splide>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default page;
