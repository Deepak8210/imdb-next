import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full">
      <section
        className="text-white h-screen flex flex-col justify-between items-center "
        style={{ background: "url('banner.jpg')" }}
      >
        <div className="h-20 w-full  bg-gradient-to-b from-custom-dark via-custom-faded to-custom-lighter "></div>
        <div className="w-full flex flex-col items-center justify-between">
          <h1 className="text-[5.5rem] font-semibold leading-[5rem]">
            Welcome.
          </h1>
          <p className="text-[1.5rem]">
            Millions of movies, TV shows and artists to discover. Explore now.
          </p>
          <div className=" w-2/5 rounded-full flex justify-between">
            <input
              type="text"
              className="w-full rounded-[50px_0_0_50px] px-4 py-[0.6rem] text-gray-700 focus:outline-none"
              placeholder="Search for movies, tv shows, actors..."
            />
            <button className="px-8  bg-gradient-to-r from-[#ff00cc] to-[#3c1053] rounded-[0_50px_50px_0]">
              Search
            </button>
          </div>
        </div>

        <div className="h-20 w-full  bg-gradient-to-t from-custom-dark via-custom-faded to-custom-lighter "></div>
      </section>
      <section className="w-full min-h-screen">
        <div></div>
      </section>
    </div>
  );
}
