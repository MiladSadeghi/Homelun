import { Link } from "react-router-dom";
import tw from "twin.macro";

const NotFound = () => {
  return (
    <Wrapper>
      <div className="flex flex-col items-center relative">
        <h1 className="text-[110px] font-bold mb-10">404</h1>
        <h1 className="text-5xl font-bold mb-5">Page Not Found</h1>
        <p className="text-black text-lg  w-1/2 mb-[70px]">
          The page you’re looking for isn’t available. Try another page or use
          the home button below.
        </p>
        <Link
          to="/"
          className="font-semibold text-base text-white bg-green-500 px-10 py-4 "
        >
          Back to home
        </Link>
        <span className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-500 text-opacity-5 text-[45vw] font-bold">
          404
        </span>
      </div>
    </Wrapper>
  );
};

const Wrapper = tw.div`container mx-auto mt-[178px] relative`;

export default NotFound;
