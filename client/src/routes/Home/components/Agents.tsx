import tw from "twin.macro";
import { TAgent } from "../../../types/agent";
import { Link } from "react-router-dom";
import { AgentCard, AgentCardSkeleton } from "../../../components/AgentCard";

type Props = {
  loading: boolean;
  agents: TAgent[];
};

const Agents = ({ agents, loading }: Props) => {
  console.log(agents, loading);
  return (
    <Wrapper>
      <div tw="flex mb-[89px]">
        <h3 tw="text-gray-500 font-bold text-4xl leading-[56px] w-full">
          Meet our agents at your service
        </h3>
        <div tw="flex flex-col">
          <p tw="w-full text-[#8C959F] leading-8 text-xl">
            We provide a complete service for the sale, purchase or rental of
            real estate. We provide a complete We provide a complete service.
          </p>
          <Link
            to="/agents"
            tw="px-9 py-4 bg-green-500 mt-20 w-fit text-white font-semibold text-lg"
          >
            See All
          </Link>
        </div>
      </div>
      <div tw="grid grid-cols-3 gap-6">
        {loading && <AgentCardSkeleton cards={3} />}
        {agents &&
          agents.map((agent: TAgent) => (
            <AgentCard key={agent._id} agent={agent} />
          ))}
      </div>
    </Wrapper>
  );
};

const Wrapper = tw.div`container mx-auto mt-40 mb-48`;

export default Agents;
