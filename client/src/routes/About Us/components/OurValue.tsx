import Megaphone from "../../../assets/About_Us_OurValue_megaphone.svg";
import Ticket from "../../../assets/About_Us_OurValue_ticket.svg";
import Desktop from "../../../assets/About_Us_OurValue_desktop.svg";
import PullRequest from "../../../assets/About_Us_OurValue_pullRequest.svg";
import { ReactSVG } from "react-svg";
import { useQuery } from "@tanstack/react-query";
import { TAgent } from "../../../types/agent";
import axios from "axios";
import OurTeam from "../../../components/OurTeam/OurTeam";

type TValues = {
  title: string;
  desc: string;
  icon: string;
};

type TAboutUsData = {
  agents: {
    agents: TAgent[];
  };
};

const Values: TValues[] = [
  {
    title: "Get online valuation",
    desc: "We provide a complete service for the sale, purchase or rental of real estate.",
    icon: Megaphone,
  },
  {
    title: "Sell your home",
    desc: "We provide a complete service for the sale, purchase or rental of real estate.",
    icon: Ticket,
  },
  {
    title: "Find a properties",
    desc: "We provide a complete service for the sale, purchase or rental of real estate.",
    icon: Desktop,
  },
  {
    title: "New developments",
    desc: "We provide a complete service for the sale, purchase or rental of real estate.",
    icon: PullRequest,
  },
];

const OurValue = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["home"],
    queryFn: () =>
      axios.get<TAboutUsData>("/home").then((response) => response.data),
  });
  return (
    <div className="mt-40">
      <div className="flex flex-col justify-center items-center">
        <h3 className="text-[40px] font-bold mb-5 text-gray-500">Our Value</h3>
        <p className="font-normal text-xl text-[#888888] w-1/2 text-center">
          We provide a complete service for the sale, purchase or rental of real
          estate. We provide a complete We provide a complete service for the
          sale.
        </p>
      </div>
      <div className="mt-20 grid grid-cols-4 gap-6">
        {Values.map((value: TValues) => (
          <div className="p-[40px] border border-solid border-[#E3E3E3]">
            <ReactSVG src={value.icon} />
            <h6 className="mt-7 mb-4 font-bold text-xl">{value.title}</h6>
            <p className="leading-7 text-[#888888] text-base">{value.desc}</p>
          </div>
        ))}
      </div>
      <OurTeam agents={data?.agents.agents as TAgent[]} loading={isLoading} />
    </div>
  );
};

export default OurValue;
