import Link from "next/link";
import { IoIosSearch } from "react-icons/io";
const Header = () => {
  return (
    <div className="w-full ">
      <div className="flex justify-between items-center px-8 py-4 bg-[rgba(0,0,0,0.4)] my-3 rounded-md shadow-[5px_5px_5px_2px_rgba(0,0,0,0.2)]">
        <Link href={"/"} className="font-semibold text-gray-300 ">
          IMDB-next
        </Link>
        <div className="flex text-gray-300  space-x-4">
          <form className="rounded-full flex bg-gray-400 items-center px-2 py-1">
            <input type="text" className=" bg-transparent" />
            <IoIosSearch />
          </form>
          <Link href={"/movies"}>Movies</Link>
          <Link href={"/tvshows"}>TV Shows</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
