import tw from "twin.macro";
import Apartment from "../../../assets/header-apartment.png";
import IFTTT from "../../../assets/IFTTT Logo.svg";
import Amazon from "../../../assets/Amazon Logo.svg";
import Google from "../../../assets/Google Logo.svg";
import { ReactSVG } from "react-svg";

function Header() {
  return (
    <div tw="w-full relative pt-[148px] bg-gradient-to-b from-[#F9FBFC] from-80% via-white via-80% to-white to-100%">
      <div tw="container mx-auto ">
        <div tw="flex h-[760px]">
          <div tw="w-1/2 px-5 flex flex-col justify-between h-full">
            <div>
              <h2 tw="mt-5 text-gray-500 font-bold text-7xl leading-[94px]">
                Find your best smart real estate
              </h2>
              <p tw="text-2xl text-[#8C959F] font-normal mt-7">
                We provide a complete service for the sale, purchase or rental
                of real estate
              </p>
            </div>
            <div>
              <h4 tw="text-gray-500 text-3xl mb-5">TrustedBy</h4>
              <p tw="text-xl text-[#8C959F]">
                More than 15,000+ brand trust homelun
              </p>
              <div tw="flex mt-14">
                <ReactSVG tw="mr-[70px]" src={IFTTT} />
                <ReactSVG tw="mr-[70px]" src={Amazon} />
                <ReactSVG src={Google} />
              </div>
            </div>
          </div>
          <div tw="absolute top-[148px] right-0 w-1/2 h-[780px] pl-24">
            <img tw="object-cover h-full min-w-full" src={Apartment} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
