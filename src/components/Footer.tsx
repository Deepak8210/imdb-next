import Link from "next/link";
import { FaGithub, FaFacebookF } from "react-icons/fa";
import { FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
const Footer = () => {
  return (
    <section className="w-full bg-[#020c1a] h-fit p-5">
      <div className="flex space-x-6 justify-center text-gray-200 items-center px-[10%] py-8">
        <Link
          href={""}
          className="cursor-pointer hover:text-pink-600 text-white duration-200"
        >
          Terms Of Use
        </Link>
        <Link
          href={""}
          className="cursor-pointer hover:text-pink-600 text-white duration-200"
        >
          Privacy-Policy
        </Link>
        <Link
          href={""}
          className="cursor-pointer hover:text-pink-600 text-white duration-200"
        >
          About
        </Link>
        <Link
          href={""}
          className="cursor-pointer hover:text-pink-600 text-white duration-200"
        >
          Blog
        </Link>
        <Link
          href={""}
          className="cursor-pointer hover:text-pink-600 text-white duration-200"
        >
          FAQ
        </Link>
      </div>
      <p className="w-1/2 text-center mx-auto text-sm text-gray-400">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut laboreet dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur.
      </p>
      <div className="w-full flex items-center justify-center space-x-4 mt-5 mb-5">
        <Link
          href={"/"}
          className="bg-[#04152D] p-3 rounded-full hover:shadow-md hover:shadow-pink-600 group duration-"
        >
          <FaFacebookF className="w-6 h-6 text-gray-300 group-hover:text-pink-600 duration-" />
        </Link>
        <a
          href={"https://github.com/Deepak8210"}
          target="_blank"
          className="bg-[#04152D] p-3 rounded-full hover:shadow-md hover:shadow-pink-600 group duration-"
        >
          <FaGithub className="w-6 h-6 text-gray-300 group-hover:text-pink-600 duration-" />
        </a>
        <a
          href={"https://x.com/beasty_dr"}
          target="_blank"
          className="bg-[#04152D] p-3 rounded-full hover:shadow-md hover:shadow-pink-600 group duration-"
        >
          <FaXTwitter className="w-6 h-6 text-gray-300 group-hover:text-pink-600 duration-" />
        </a>
        <a
          href={"https://www.linkedin.com/in/deepak-kumar-49887a240/"}
          target="_blank"
          className="bg-[#04152D] p-3 rounded-full hover:shadow-md hover:shadow-pink-600 group duration-"
        >
          <FaLinkedinIn className="w-6 h-6 text-gray-300 group-hover:text-pink-600 duration-" />
        </a>
      </div>
    </section>
  );
};

export default Footer;
