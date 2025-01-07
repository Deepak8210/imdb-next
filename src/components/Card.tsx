import Image from "next/image";
import cardImg from "../../public/cardImg.jpg";

const Card = ({ imageUrl, title, date, ratings }: any) => {
  return (
    <div className=" mr-4">
      <div className="relative  h-[350px] w-full ">
        <Image
          alt="card Image"
          src={imageUrl || cardImg}
          fill
          sizes="fit"
          className="object-cover relative rounded-xl "
        />
        <div className="absolute -bottom-5 flex justify-between items-start w-full px-2">
          <span className=" rounded-full text-md  w-12 h-12 font-medium flex items-center justify-center bg-white text-black outline  outline-2 outline-gray-600 -outline-offset-4 ">
            <span>{ratings?.toFixed(1)}</span>
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
      <h5 className="text-gray-100 text-lg mt-6">{title}</h5>
      <span className="text-gray-400 text-sm">{date}</span>
    </div>
  );
};

export default Card;
