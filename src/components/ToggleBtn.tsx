import { useState } from "react";

const ToggleBtn = () => {
  const [isSelected, setIsSelected] = useState(true);

  return (
    <div className="flex rounded-full border w-fit p-1 mx-auto  font-semibold text-lg relative bg-[rgba(255,255,255,0.9)]">
      <button
        onClick={() => setIsSelected(true)}
        className={`${
          isSelected ? "text-white" : "text-gray-600"
        } px-8 py-2 z-10`}
      >
        Day
      </button>
      <button
        onClick={() => setIsSelected(false)}
        className={`${
          isSelected ? "text-gray-600" : "text-white"
        } px-8 py-2 z-10`}
      >
        Week
      </button>
      <div
        className={`${
          isSelected ? "translate-x-0" : "translate-x-[calc(100%-0.5rem)]"
        } w-1/2 h-[calc(100%-0.5rem)] bg-gradient-to-r from-[#3c1053] to-[#ff00cc] absolute rounded-full top-1 left-1 transition-transform duration-300 ease-in-out`}
      ></div>
    </div>
  );
};

export default ToggleBtn;
