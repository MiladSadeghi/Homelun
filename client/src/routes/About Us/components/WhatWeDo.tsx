import Gallery1 from "../../../assets/AboutUS_WhatWeDo_1.webp";
import Gallery2 from "../../../assets/AboutUS_WhatWeDo_2.webp";
import Gallery3 from "../../../assets/AboutUS_WhatWeDo_3.webp";
import Gallery4 from "../../../assets/AboutUS_WhatWeDo_4.webp";

const WhatWeDo = () => {
    return (
        <div>
            <div className="flex flex-col md:flex-row">
                <h2 className="font-bold text-4xl md:text-7xl  leading-10 md:leading-[94px] w-full">
                    Who we are and what we do
                </h2>
                <div className=" w-full mt-6">
                    <p className="text-[#8C959F] font-normal text-xl">
                        We provide a complete service for the sale, purchase or rental of
                        real estate. We provide a complete
                    </p>
                    <button className="font-semibold text-white text-lg px-10 py-4 bg-green-500 mt-[70px]">
                        Get Started
                    </button>
                </div>
            </div>
            <div className="mt-20 grid grid-cols-12 gap-6">
                <img
                    src={Gallery1}
                    className="col-span-8 object-cover h-[393px] w-full"
                />
                <img src={Gallery2} className="col-span-4 object-cover h-[393px] w-full"/>
                <img src={Gallery3} className="col-span-4 object-cover h-[393px] w-full"/>
                <img
                    src={Gallery4}
                    className="object-cover col-span-8 h-[393px] w-full "
                />
            </div>
        </div>
    );
};

export default WhatWeDo;
