import React from "react";

const CardSkeleton = () => {
  return (
    <div className="mr-4">
      <div className="relative h-[350px] w-full animate-pulse">
        {/* Image Skeleton */}
        <div className="bg-gray-300 w-full h-full rounded-xl"></div>

        {/* Bottom Section Skeleton */}
        <div className="absolute -bottom-5 flex justify-between items-start w-full px-2">
          <span className="rounded-full text-md w-12 h-12 bg-gray-300 flex items-center justify-center"></span>
          <div className="flex space-x-2 items-center">
            <span className="bg-gray-300 text-transparent text-[0.8rem] font-thin py-[1px] px-2 rounded-sm w-16"></span>
            <span className="bg-gray-300 text-transparent text-[0.8rem] font-thin py-[1px] px-2 rounded-sm w-16"></span>
          </div>
        </div>
      </div>

      {/* Title Skeleton */}
      <div className="mt-6">
        <div className="bg-gray-300 w-[150px] h-6 rounded-lg"></div>
      </div>

      {/* Date Skeleton */}
      <div className="mt-2">
        <div className="bg-gray-300 w-[100px] h-4 rounded-lg"></div>
      </div>
    </div>
  );
};

export default CardSkeleton;
