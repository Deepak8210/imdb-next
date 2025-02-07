const MovieDetailsSkeleton = () => {
  return (
    <div className="pt-20 text-white px-[10%]">
      {/* Main Section Skeleton */}
      <section className="flex w-full py-12">
        {/* Image Section */}
        <div className="w-[65%] flex rounded-xl pr-16">
          <div className="w-full h-[500px] bg-gray-700 rounded-xl animate-pulse"></div>
        </div>

        {/* Details Section */}
        <div className="w-full">
          {/* Title Skeleton */}
          <div className="h-12 w-[70%] bg-gray-700 rounded animate-pulse mb-4"></div>

          {/* Tagline Skeleton */}
          <div className="h-6 w-[50%] bg-gray-700 rounded animate-pulse mb-6"></div>

          {/* Circular Progress Bar Skeleton */}
          <div className="flex items-center gap-4">
            <div className="w-24 h-20 bg-gray-700 rounded-full animate-pulse"></div>
            <div className="flex w-full items-center gap-4">
              <div className="w-20 h-20 bg-gray-700 rounded-full animate-pulse"></div>
              <div className="h-6 w-[30%] bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Overview Skeleton */}
          <div className="my-6">
            <div className="h-6 w-[20%] bg-gray-700 rounded animate-pulse mb-4"></div>
            <div className="h-4 w-full bg-gray-700 rounded animate-pulse mb-2"></div>
            <div className="h-4 w-[90%] bg-gray-700 rounded animate-pulse mb-2"></div>
            <div className="h-4 w-[80%] bg-gray-700 rounded animate-pulse mb-2"></div>
          </div>

          {/* Metadata Skeleton */}
          <div className="mt-8 border-b border-gray-700 flex text-lg gap-4 py-4">
            <div className="h-6 w-[20%] bg-gray-700 rounded animate-pulse"></div>
            <div className="h-6 w-[20%] bg-gray-700 rounded animate-pulse"></div>
            <div className="h-6 w-[20%] bg-gray-700 rounded animate-pulse"></div>
          </div>

          {/* Director and Writer Skeleton */}
          <div className="border-b border-gray-700 py-4">
            <div className="h-6 w-[20%] bg-gray-700 rounded animate-pulse mb-2"></div>
            <div className="h-6 w-[40%] bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Background Image Skeleton */}
        {/* <div className="w-[90%] mx-auto overflow-hidden flex h-full -z-10 absolute top-0 left-0 right-0 items-center justify-center">
          <div className="w-full h-full bg-gray-700 animate-pulse"></div>
        </div> */}
      </section>

      {/* Top Cast Skeleton */}
      <section className="min-h-screen">
        <div className="h-8 w-[20%] bg-gray-700 rounded animate-pulse mb-4"></div>
        <div className="flex gap-8 w-full overflow-x-scroll my-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="flex flex-col justify-center">
              <div className="w-40 h-40 bg-gray-700 rounded-full animate-pulse"></div>
              <div className="text-center mt-4">
                <div className="h-6 w-[80%] bg-gray-700 rounded animate-pulse mb-2"></div>
                <div className="h-4 w-[60%] bg-gray-700 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Official Videos Skeleton */}
        <div className="h-8 w-[20%] bg-gray-700 rounded animate-pulse mt-12 mb-4"></div>
        <div className="flex items-start gap-8 w-full overflow-x-scroll my-4">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="flex w-72 flex-col justify-center flex-shrink-0 rounded-t-xl"
            >
              <div className="h-40 w-full bg-gray-700 rounded-xl animate-pulse"></div>
              <div className="h-6 w-[80%] bg-gray-700 rounded animate-pulse mt-2"></div>
            </div>
          ))}
        </div>

        {/* Similar Movies Skeleton */}
        <div className="h-8 w-[20%] bg-gray-700 rounded animate-pulse mt-12 mb-6"></div>
        <div className="w-full">
          <div className="flex gap-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="w-[15.5rem]">
                <div className="h-72 bg-gray-700 rounded-xl animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations Skeleton */}
        <div className="h-8 w-[20%] bg-gray-700 rounded animate-pulse mt-12 mb-6"></div>
        <div className="w-full">
          <div className="flex gap-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="w-[15.5rem]">
                <div className="h-72 bg-gray-700 rounded-xl animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MovieDetailsSkeleton;
