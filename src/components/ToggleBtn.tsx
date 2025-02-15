import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import {
  fetchPopular,
  fetchTopRated,
  fetchTrending,
} from "../store/slices/providerSlice";

interface ToggleBtnProps {
  onChange: (type: string) => void;
  filterLabel: string[]; // Array of button labels (e.g., ["day", "week"] or ["Movies", "Tv"])
  category: string; // Category to determine which action to dispatch
}

const ToggleBtn: React.FC<ToggleBtnProps> = ({ filterLabel, category }) => {
  const [isSelected, setIsSelected] = useState(0); // 0 for the first button, 1 for the second
  const dispatch = useDispatch<AppDispatch>();

  const handleToggle = (index: number) => {
    const actionLabel = filterLabel[index];
    setIsSelected(index);

    switch (category) {
      case "trending":
        dispatch(fetchTrending(actionLabel));
        break;
      case "popular":
        dispatch(fetchPopular(actionLabel));
        break;
      case "topRated":
        dispatch(fetchTopRated(actionLabel));
        break;
      default:
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
          } px-6  z-10`}
        >
          {label === "tv" || label === "tvs"
            ? "Tv Shows"
            : label === "movie"
            ? "Movies"
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
