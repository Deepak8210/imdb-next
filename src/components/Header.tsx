import Link from "next/link";
import { IoIosSearch } from "react-icons/io";
const Header = () => {
  return (
    <div className="w-full fixed z-20">
      <div className="flex justify-between items-center px-20 py-4 bg-[rgba(5,25,54,0.5)] backdrop-blur-md my-3  shadow-[5px_5px_5px_2px_rgba(0,0,0,0.2)]">
        <Link href={"/"} className="font-semibold text-gray-300 ">
          IMDB-next
        </Link>
        <div className="flex items-center text-gray-300  space-x-4">
          <span className="flex items-center text-xl">
            <IoIosSearch />
          </span>

          <Link href={"/movies"}>Movies</Link>
          <Link href={"/tvshows"}>TV Shows</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
