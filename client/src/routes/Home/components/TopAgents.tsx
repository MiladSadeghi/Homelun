import { useState } from "react";
import { styled } from "styled-components";
import tw from "twin.macro";
import TopAgent from "../../../assets/top-agent.webp";
import { TAgent } from "../../../types/agent";
import {
  TopAgentCard,
  TopAgentSkeletonCard,
} from "../../../components/TopAgent";

type TFeatures = {
  title: string;
  description: string;
};

type Props = {
  loading: boolean;
  data: TAgent[];
};

const HomelunFeatures: TFeatures[] = [
  {
    title: "Find excellent deals",
    description:
      "We provide a complete service for the sale, purchase or rental",
  },
  {
    title: "Property insurance",
    description:
      "We provide a complete service for the sale, purchase or rental",
  },
  {
    title: "Friendly host",
    description:
      "We provide a complete service for the sale, purchase or rental",
  },
  {
    title: "24 hours consultation",
    description:
      "We provide a complete service for the sale, purchase or rental",
  },
  {
    title: "Fast respond",
    description:
      "We provide a complete service for the sale, purchase or rental",
  },
  {
    title: "Company professional",
    description:
      "We provide a complete service for the sale, purchase or rental",
  },
];

const TopAgents = ({ loading, data }: Props) => {
  const [hoveredFeature, setHoveredFeature] = useState<number>(0);

  return (
    <Wrapper>
      <div tw="flex">
        <div tw="w-full">
          <h3 tw="text-4xl font-bold leading-[56px] text-gray-500">
            Hightest rated agents in the country
          </h3>
          <p tw="mt-5 text-xl text-gray-400 font-normal leading-8">
            We provide a complete service for the sale, purchase or rental of
            real estate.
          </p>
          <div tw="grid grid-cols-2 mt-20 gap-8">
            {HomelunFeatures.map((feature: TFeatures, index: number) => (
              <FeaturesWrapper
                key={index}
                className="group"
                index={index}
                hovered={hoveredFeature}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(0)}
              >
                <div className="mb-1 min-h-0 h-24 px-7 flex flex-col justify-center relative before:absolute before:left-0 before:w-1 before:h-8 before:bg-red-100 before:top-1/2 before:-translate-y-1/2 group-hover:before:h-full before:transition-all before:ease-in-out group-hover:before:bg-red-500">
                  <h5 tw="text-2xl text-gray-500 font-semibold">
                    {feature.title}
                  </h5>
                  <FeatureDesc>{feature.description}</FeatureDesc>
                </div>
              </FeaturesWrapper>
            ))}
          </div>
        </div>
        <div className="w-full relative">
          <div className="before:-z-10 before:absolute before:right-0 before:top-0 before:h-[81.2%] before:mt-[143px] before:w-full  before:bg-gradient-to-r before:from-white before:from-10% before:via-[#F6F9FB] before:via-10% before:to-[#F6F9FB] before:to-100% before:rounded-b-full ">
            <div tw="absolute top-0 left-0 w-5/12 h-max bg-white p-4 shadow-sm">
              <p tw="text-lg font-bold text-gray-500 mb-4">Top Agents (2)</p>
              {loading && <TopAgentSkeletonCard cards={2} />}
              {data &&
                data.map((agent: TAgent) => (
                  <TopAgentCard
                    key={agent._id}
                    cover={agent.cover}
                    name={agent.name}
                  />
                ))}
            </div>
            <img tw="rounded-b-full mt-12 " src={TopAgent} />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = tw.div`container mx-auto mt-32`;
const FeaturesWrapper = styled.div<{ index: number; hovered: number }>`
  ${({ hovered, index }) =>
    hovered === index
      ? tw`[& div]:(before:(h-full bg-red-500)) [& div>p]:(h-full visible opacity-100 mt-4)`
      : tw``}
`;
const FeatureDesc = tw.p`text-gray-500 h-0 text-base leading-7 invisible  opacity-0  transition-all ease-in-out`;

export default TopAgents;
