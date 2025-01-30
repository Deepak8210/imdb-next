// import { useState } from "react";
// import { useDispatch, UseDispatch } from "react-redux";
// import { AppDispatch } from "../store/store";
// import {
//   fetchPopular,
//   fetchTopRated,
//   fetchTrending,
// } from "../store/slices/providerSlice";
// interface ToggleBtnProps {
//   filterLabel: string[]; // Array of button labels (e.g., ["day", "week"] or ["Movies", "Tv"])
// }

// const ToggleBtn: React.FC<ToggleBtnProps> = ({ filterLabel }) => {
//   const [isSelected, setIsSelected] = useState(true);
//   const dispatch = useDispatch<AppDispatch>();

//   return (
//     <div className="flex rounded-full border w-fit p-1 mx-auto  font-semibold text-lg relative bg-[rgba(255,255,255,0.9)]">
//       <button
//         onClick={() => {
//           if (filterLabel[0] === "day") {
//             dispatch(fetchTrending(filterLabel[0])), setIsSelected(true);
//           } else if (filterLabel[0] === "movie") {
//             dispatch(fetchPopular(filterLabel[0])), setIsSelected(true);
//           } else {
//             dispatch(fetchTopRated(filterLabel[0])), setIsSelected(true);
//           }
//         }}
//         className={`${
//           isSelected ? "text-white" : "text-gray-600"
//         } px-8 py-2 z-10`}
//       >
//         Day
//       </button>
//       <button
//         onClick={() => {
//           if (filterLabel[0] === "day") {
//             dispatch(fetchTrending(filterLabel[1])), setIsSelected(false);
//           } else if (filterLabel[0] === "movie") {
//             dispatch(fetchPopular(filterLabel[1])), setIsSelected(false);
//           } else {
//             dispatch(fetchTopRated(filterLabel[1])), setIsSelected(false);
//           }
//         }}
//         className={`${
//           isSelected ? "text-gray-600" : "text-white"
//         } px-8 py-2 z-10`}
//       >
//         Week
//       </button>
//       <div
//         className={`${
//           isSelected ? "translate-x-0" : "translate-x-[calc(100%-0.5rem)]"
//         } w-1/2 h-[calc(100%-0.5rem)] bg-gradient-to-r from-[#3c1053] to-[#ff00cc] absolute rounded-full top-1 left-1 transition-transform duration-300 ease-in-out`}
//       ></div>
//     </div>
//   );
// };

//export default ToggleBtn;

import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import {
  fetchPopular,
  fetchTopRated,
  fetchTrending,
} from "../store/slices/providerSlice";

interface ToggleBtnProps {
  filterLabel: string[]; // Array of button labels (e.g., ["day", "week"] or ["Movies", "Tv"])
}

const ToggleBtn: React.FC<ToggleBtnProps> = ({ filterLabel }) => {
  const [isSelected, setIsSelected] = useState(0); // 0 for the first button, 1 for the second
  const dispatch = useDispatch<AppDispatch>();

  const handleToggle = (index: number) => {
    const actionLabel = filterLabel[index];
    setIsSelected(index);

    switch (actionLabel) {
      case "day":
      case "week":
        dispatch(fetchTrending(actionLabel));
        break;
      case "movie":
      case "tv":
        dispatch(fetchPopular(actionLabel));
        break;
      default:
        dispatch(fetchTopRated(actionLabel));
        break;
    }
  };

  return (
    <div className="flex rounded-full border w-fit p-1 mx-auto font-semibold text-lg relative bg-[rgba(255,255,255,0.9)]">
      {filterLabel?.map((label, index) => (
        <button
          key={label}
          onClick={() => handleToggle(index)}
          className={`${
            isSelected === index ? "text-white" : "text-gray-600"
          } px-8 py-1 z-10`}
        >
          {label === "tvs"
            ? label.charAt(0).toUpperCase() + label.slice(1, -1)
            : label.charAt(0).toUpperCase() + label.slice(1)}
        </button>
      ))}
      <div
        className={`${
          isSelected === 0 ? "translate-x-0" : "translate-x-[calc(100%-0.5rem)]"
        } w-1/2 h-[calc(100%-0.5rem)] bg-gradient-to-r from-[#3c1053] to-[#ff00cc] absolute rounded-full top-1 left-1 transition-transform duration-300 ease-in-out`}
      ></div>
    </div>
  );
};

export default ToggleBtn;
