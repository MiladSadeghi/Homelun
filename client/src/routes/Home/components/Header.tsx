import Apartment from "../../../assets/header-apartment.png";
import IFTTT from "../../../assets/IFTTT Logo.svg";
import Amazon from "../../../assets/Amazon Logo.svg";
import Google from "../../../assets/Google Logo.svg";
import { ReactSVG } from "react-svg";

function Header() {
  return (
    <div
      className="w-full relative pt-[148px] bg-gradient-to-b from-[#F9FBFC] from-80% via-white via-80% to-white to-100%">
      <div className="container mx-auto">
        <div className="flex h-[760px]">
          <div className="w-1/2 px-5 flex flex-col justify-between h-full">
            <div>
              <h2 className="mt-5 text-gray-500 font-bold text-7xl leading-[94px]">
                Find your best smart real estate
              </h2>
              <p className="text-2xl text-[#8C959F] font-normal mt-7">
                We provide a complete service for the sale, purchase or rental
                of real estate
              </p>
            </div>
            <div>
              <h4 className="text-gray-500 text-3xl mb-5">TrustedBy</h4>
              <p className="text-xl text-[#8C959F]">
                More than 15,000+ brand trust homelun
              </p>
              <div className="flex mt-14">
                <ReactSVG className="mr-[70px]" src={IFTTT}/>
                <ReactSVG className="mr-[70px]" src={Amazon}/>
                <ReactSVG src={Google}/>
              </div>
            </div>
          </div>
          <div className="absolute top-[148px] right-0 w-1/2 h-[780px] pl-24">
            <img className="object-cover h-full min-w-full" src={Apartment}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
