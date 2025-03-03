import React from "react";
const Spinner = () => {
  return (
    <div className="w-full my-2">
      <div className=" mx-auto p-2 animate-spin drop-shadow-2xl bg-gradient-to-bl from-pink-400 via-purple-400 to-indigo-600 md:w-20 md:h-20 h-20 w-20 aspect-square rounded-full">
        <div className="rounded-full h-full w-full bg-slate-100 dark:bg-[#04152D] background-blur-md"></div>
      </div>
    </div>
  );
};

export default Spinner;
