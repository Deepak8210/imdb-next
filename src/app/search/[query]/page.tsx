// "use client";
// import { useEffect, useState } from "react";
// import InfiniteScroll from "react-infinite-scroll-component";
// import { useParams } from "next/navigation";
// import axios from "axios";
// import Spinner from "@/components/Spinner";
// import MovieCard from "@/components/MovieCard";

// interface SearchResult {
//   page: number;
//   results: Array<{
//     id: number;
//     media_type: string;
//     title?: string;
//     name?: string;
//     poster_path?: string;
//   }>;
//   total_pages: number;
//   total_results: number;
// }

// const SearchResultsPage = () => {
//   const [data, setData] = useState<SearchResult | null>(null);
//   const [pageNum, setPageNum] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const baseUrl = "https://api.themoviedb.org/3";

//   const { query } = useParams();
//   const token = process.env.NEXT_PUBLIC_IMDB_TOKEN;

//   const fetchInitialData = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `${baseUrl}/search/multi?query=${query}&page=${pageNum}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setData(response.data);
//       setPageNum((prev) => prev + 1);
//     } catch (error) {
//       console.error("Error fetching initial data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchNextPageData = async () => {
//     try {
//       const response = await axios.get(
//         `${baseUrl}/search/multi?query=${query}&page=${pageNum}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setData((prev) => ({
//         ...prev!,
//         results: [...(prev?.results || []), ...response.data.results],
//       }));
//       setPageNum((prev) => prev + 1);
//     } catch (error) {
//       console.error("Error fetching next page data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchInitialData();
//     setPageNum(1);
//   }, [query]);

//   return (
//     <div className="pt-20 text-white px-[10%] min-h-screen">
//       {loading && <Spinner />}
//       {!loading && (
//         <div>
//           {data?.results && data.results.length > 0 ? (
//             <div>
//               <h1 className="text-3xl my-4">{`Search ${
//                 data?.total_results > 1 ? "results" : "result"
//               } for '${query}'`}</h1>

//               <InfiniteScroll
//                 dataLength={data?.results.length || 0}
//                 next={fetchNextPageData}
//                 hasMore={pageNum <= (data?.total_pages || 0)}
//                 loader={
//                   <div className="w-full py-4 flex justify-center">
//                     <Spinner />
//                   </div>
//                 }
//                 scrollThreshold={0.8}
//                 endMessage={
//                   <p className="text-center w-full my-4">
//                     No more content to load
//                   </p>
//                 }
//                 scrollableTarget="scrollableDiv"
//               >
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pb-20">
//                   {data?.results.map((item, index) => {
//                     if (item.media_type === "person") return null;
//                     return (
//                       <MovieCard key={`${item.id}-${index}`} data={item} />
//                     );
//                   })}
//                 </div>
//               </InfiniteScroll>
//             </div>
//           ) : (
//             <div className="flex justify-center items-center h-64">
//               <span className="text-xl">No results found!</span>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchResultsPage;

"use client";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "next/navigation";
import axios from "axios";
import Spinner from "@/components/Spinner";
import MovieCard from "@/components/MovieCard";

interface SearchResult {
  page: number;
  results: Array<{
    id: number;
    media_type: string;
    title?: string;
    name?: string;
    poster_path?: string;
  }>;
  total_pages: number;
  total_results: number;
}

// Skeleton component for card loading state
const MovieCardSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-700 h-[350px] w-full rounded-xl"></div>
      <div className="bg-gray-700 h-6 w-4/5 mt-6 rounded"></div>
      <div className="bg-gray-700 h-4 w-1/2 mt-2 rounded"></div>
    </div>
  );
};

const SearchResultsPage = () => {
  const [data, setData] = useState<SearchResult | null>(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const baseUrl = "https://api.themoviedb.org/3";

  const { query } = useParams();
  const token = process.env.NEXT_PUBLIC_IMDB_TOKEN;

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${baseUrl}/search/multi?query=${query}&page=${pageNum}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data);
      setPageNum((prev) => prev + 1);
    } catch (error) {
      console.error("Error fetching initial data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNextPageData = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/search/multi?query=${query}&page=${pageNum}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData((prev) => ({
        ...prev!,
        results: [...(prev?.results || []), ...response.data.results],
      }));
      setPageNum((prev) => prev + 1);
    } catch (error) {
      console.error("Error fetching next page data:", error);
    }
  };

  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [query]);

  // Create skeleton loading cards
  const renderSkeletons = () => {
    const skeletons = [];
    for (let i = 0; i < 10; i++) {
      skeletons.push(
        <div key={`skeleton-${i}`}>
          <MovieCardSkeleton />
        </div>
      );
    }
    return skeletons;
  };

  return (
    <div className="pt-20 text-white px-[10%] min-h-screen">
      {loading ? (
        <div>
          <div className="animate-pulse bg-gray-700 h-10 w-1/2 rounded mb-8"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pb-20">
            {renderSkeletons()}
          </div>
        </div>
      ) : (
        <div>
          {data?.results && data.results.length > 0 ? (
            <div>
              <h1 className="text-3xl my-4 mt-8">{`Search ${
                data?.total_results > 1 ? "results" : "result"
              } for '${query}'`}</h1>

              <InfiniteScroll
                dataLength={data?.results.length || 0}
                next={fetchNextPageData}
                hasMore={pageNum <= (data?.total_pages || 0)}
                loader={
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 my-4">
                    {renderSkeletons().slice(0, 5)}
                  </div>
                }
                scrollThreshold={0.8}
                endMessage={
                  <p className="text-center w-full my-4">
                    No more content to load
                  </p>
                }
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pb-20">
                  {data?.results.map((item, index) => {
                    if (item.media_type === "person") return null;
                    return (
                      <MovieCard key={`${item.id}-${index}`} data={item} />
                    );
                  })}
                </div>
              </InfiniteScroll>
            </div>
          ) : (
            <div className="flex justify-center items-center h-64">
              <span className="text-xl">No results found!</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
