import Apartment from "../../../assets/header-apartment.png";
import IFTTT from "../../../assets/IFTTT Logo.svg";
import Amazon from "../../../assets/Amazon Logo.svg";
import Google from "../../../assets/Google Logo.svg";
import { ReactSVG } from "react-svg";

function Header() {
  return (
    <div className="w-full relative pt-20 sm:pt-[148px] bg-gradient-to-b from-[#F9FBFC] from-80% via-white via-80% to-white to-100%">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row h-full md:h-[760px]">
          <div className="w-full md:w-1/2 md:px-5 flex flex-col justify-between h-full">
            <div>
              <h2 className="mt-5 text-gray-500 font-bold text-6xl lg:text-7xl leading-snug lg:leading-[94px]">
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
              <div className="flex flex-wrap justify-between gap-4 mt-14">
                <ReactSVG className="" src={IFTTT} />
                <ReactSVG className="" src={Amazon} />
                <ReactSVG src={Google} />
              </div>
            </div>
          </div>
          <div className="md:absolute top-[148px] right-0 w-full md:w-1/2 md:h-[780px] md:pl-12 lg:pl-24 mt-8 md:mt-0">
            <img
              className="object-cover h-full min-w-full object-right-top"
              src={Apartment}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
