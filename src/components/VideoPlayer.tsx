import React from "react";
import "./styles/custom.css";

const VideoPlayer = () => {
  return (
    <a
      href="https://player.vimeo.com/external/488076225.hd.mp4?s=9cf4808c4e76c0a9267abb75dbec48bc451a138f&profile_id=175"
      className="glightbox_video  group"
    >
      <svg
        width="90"
        height="90"
        viewBox="0 0 131 131"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Inner Circle */}
        <path
          className="inner-circle transition-all duration-400 ease-out group-hover:fill-[#BF2428] delay-300"
          d="M65 21C40.1488 21 20 41.1488 20 66C20 90.8512 40.1488 111 65 111C89.8512 111 110 90.8512 110 66C110 41.1488 89.8512 21 65 21Z"
          fill="white"
        />
        {/* Outer Circle */}
        <circle
          className="outer_circle stroke-white stroke-3 stroke-linecap-square"
          cx="65.5"
          cy="65.5"
          r="64"
        />
        {/* Play Icon */}
        <path
          className="play transition-all duration-400 ease-out delay-300 group-hover:fill-white"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M60 76V57L77 66.7774L60 76Z"
          fill="#BF2428"
        />
      </svg>
    </a>
  );
};

export default VideoPlayer;
