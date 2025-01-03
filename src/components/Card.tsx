import Image from "next/image";
import cardImg from "../../public/cardImg.jpg";

const Card = () => {
  return (
    <div className=" mr-4">
      <div className="relative  h-[350px] w-full ">
        <Image
          alt="card Image"
          src={cardImg}
          fill
          className="object-cover relative rounded-xl "
        />
        <div className="absolute -bottom-5 flex justify-between items-start w-full px-2">
          <span className=" rounded-full text-xl font-medium p-2 bg-white text-black ">
            7.4
          </span>
          <div className="flex  space-x-2 items-center">
            <span className="text-white text-[0.8rem] font-thin bg-pink-600 py-[1px] px-2 rounded-sm">
              drama
            </span>
            <span className="text-white text-[0.8rem]  font-thin bg-pink-600  px-2 rounded-sm ">
              romance
            </span>
          </div>
        </div>
      </div>
      <h5 className="text-gray-100 text-lg mt-6">Wicked</h5>
      <span className="text-gray-400 text-sm">Nov 20,2024</span>
    </div>
  );
};

export default Card;
