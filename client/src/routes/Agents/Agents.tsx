import tw from "twin.macro";
import { TAgent } from "../../types/agent";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AgentCard, AgentCardSkeleton } from "../../components/AgentCard";
import IFTTT from "../../assets/IFTTT Logo.svg";
import Amazon from "../../assets/Amazon Logo.svg";
import Google from "../../assets/Google Logo.svg";
import PayPal from "../../assets/PayPal Logo.svg";
import AirBnB from "../../assets/Airbnb Logo.svg";
import { ReactSVG } from "react-svg";

const Agents = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["agents"],
    queryFn: () =>
      axios
        .get<{ error: boolean; agents: TAgent[] }>("/agents")
        .then((response) => response.data.agents),
  });
  console.log(data);
  return (
    <Wrapper>
      <div className="flex flex-col items-center mb-24">
        <h2 className="font-bold text-7xl leading-[94px] mb-7 text-gray-500">
          Meet the team
        </h2>
        <p className="text-[#8C959F] font-normal text-xl">
          We provide a complete service for the sale, purchase or rental of real
          estate
        </p>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {isLoading && <AgentCardSkeleton cards={6} />}
        {data &&
          data.map((agent: TAgent) => (
            <AgentCard key={agent._id} agent={agent} />
          ))}
      </div>
      <div className="mt-[120px] flex flex-col items-center">
        <h3 className="font-bold text-[40px] text-gray-500 mb-5">TrustedBy</h3>
        <p className="font-normal text-xl text-gray-400 mb-14">
          More than 15,000+ brand trust homelun
        </p>
        <div tw="grid grid-cols-5 justify-center w-full [&>div]:mx-auto">
          <ReactSVG src={IFTTT} />
          <ReactSVG src={Amazon} />
          <ReactSVG src={Google} />
          <ReactSVG src={PayPal} />
          <ReactSVG src={AirBnB} />
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = tw.div`container mx-auto mt-[148px]`;

export default Agents;
