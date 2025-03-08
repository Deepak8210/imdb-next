"use client";
import { useState } from "react";
import Link from "next/link";
import { IoIosSearch } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");

  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
  };

  const onSearchHandler = (e: any) => {
    e.preventDefault();
    router.push(`/search/${search}`);
    setSearch("");
  };

  return (
    <div className="w-full fixed z-20">
      <div className="flex justify-between items-center px-20 py-4 bg-[rgba(5,25,54,0.5)] backdrop-blur-md mt-3 shadow-[5px_5px_5px_2px_rgba(0,0,0,0.2)]">
        <Link href={"/"} className="font-semibold text-gray-300">
          IMDB-next
        </Link>
        <div className="flex items-center text-gray-300 space-x-4">
          <span
            className="flex items-center text-xl cursor-pointer"
            onClick={toggleSearch}
          >
            <IoIosSearch />
          </span>
        </div>
      </div>

      <div
        className={`absolute top-0 left-0 w-full shadow-md transition-all duration-500 ease-in-out ${
          showSearch
            ? "translate-y-[60px] opacity-100"
            : "translate-y-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-white h-12 flex items-center justify-center w-full">
          <form onSubmit={onSearchHandler} className="w-1/2">
            <input
              value={search}
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              className="text-gray-500 w-full h-full text-lg px-4 focus:outline-none"
              placeholder="Search for a movie or TV show..."
            />
          </form>

          <button
            className="text-gray-600 text-xl ml-4 cursor-pointer"
            onClick={toggleSearch}
          >
            <IoMdClose />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
