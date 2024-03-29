/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { IoCallOutline } from "react-icons/io5";
import Skeleton from "react-loading-skeleton";
import { useNavigate, useParams } from "react-router-dom";
import tw, { styled } from "twin.macro";
import { PropertyCard, PropertySkeleton } from "../../components/PropertyCard";
import { TAgent } from "../../types/agent";
import { TProperty } from "../../types/property";

const Agent = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"About me" | "Active listing">("About me");

  const getAgent = useQuery({
    queryKey: ["agent", { slug }],
    retry: false,
    queryFn: () =>
      axios
        .get<{
          error: boolean;
          agent: TAgent;
        }>(`/agents/${slug}`)
        .then((response) => response.data.agent),
  });

  const getAgentProperties = useQuery({
    queryKey: ["properties", { agentName: getAgent.data?.name }],
    queryFn: () =>
      axios
        .get<{
          error: boolean;
          properties: TProperty[];
        }>(`/properties/agent/${getAgent.data?._id}`)
        .then((response) => response.data.properties),
    enabled: false,
  });

  useEffect(() => {
    if (getAgent.isError) {
      navigate("/404");
    }
  }, [getAgent]);

  useEffect(() => {
    if (tab === "Active listing") {
      getAgentProperties.refetch();
    }
  }, [tab]);

  return (
    <div className="pt-[168px] bg-[#F6F9FB] ">
      <Container className="-mb-[190px]">
        <div className="grid lg:grid-cols-3 xl:grid-cols-4 px-12 pb-12 gap-12  bg-gradient-to-b from-[#F6F9FB] from-25% via-[white] via-25% to-white to-100%">
          {getAgent.isLoading ? (
            <Skeleton className="h-[415px] w-full" />
          ) : (
            <img
              src={getAgent.data?.cover}
              alt={getAgent.data?.slug}
              className="h-[415px] object-cover mx-auto"
            />
          )}
          <div className="lg:col-span-2 xl:col-span-3 flex flex-col justify-end py-6 h-full">
            <div className="mb-24">
              <h3 className="text-gray-500 font-bold text-[40px] mb-4">
                {getAgent.isLoading ? (
                  <Skeleton className="h-16" count={0.6} />
                ) : (
                  getAgent.data?.name
                )}
              </h3>
              <h5 className="text-[#8C959F] text-2xl">
                {getAgent.isLoading ? (
                  <Skeleton className="h-9" count={0.4} />
                ) : (
                  getAgent.data?.field
                )}
              </h5>
            </div>
            <div className="flex flex-wrap">
              {getAgent.isLoading ? (
                <Skeleton
                  count={0.8}
                  className="h-9 w-full"
                  containerClassName="w-full"
                />
              ) : (
                <>
                  <p className="text-[#8C959F] text-lg flex items-center">
                    <HiOutlineMail size={22} className="mr-4" />
                    MiladSadeghi2323@gmail.com
                  </p>
                  <p className="text-[#8C959F] text-lg flex items-center lg:ml-10">
                    <IoCallOutline size={22} className="mr-4" />
                    {getAgent.data?.phoneNumber}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </Container>
      <div className="pt-[270px] bg-white">
        <Container>
          <div className="p-5 md:p-20 border border-[#E3E3E3]">
            <div className="flex gap-6 mb-12 overflow-x-hidden">
              {getAgent.isLoading ? (
                <Skeleton
                  count={0.3}
                  className="h-full w-full"
                  containerClassName="h-16 w-full"
                />
              ) : (
                ["About me", "Active listing"].map((tabValue: any) => (
                  <Tab
                    key={tabValue}
                    active={(tab === tabValue).toString()}
                    onClick={() => setTab(tabValue)}
                  >
                    {tabValue}
                  </Tab>
                ))
              )}
            </div>
            <div>
              {tab === "About me" && (
                <>
                  <h5 className="text-2xl font-bold text-gray-500 mb-5">
                    {getAgent.isLoading ? (
                      <Skeleton
                        count={0.2}
                        className="h-full w-full"
                        containerClassName="h-8 w-full flex"
                      />
                    ) : (
                      "About me"
                    )}
                  </h5>
                  <p className="text-[#8C959F] text-xl leading-8">
                    {getAgent.isLoading ? (
                      <Skeleton count={7.3} />
                    ) : (
                      getAgent.data?.about
                    )}
                  </p>
                </>
              )}
              {tab === "Active listing" && (
                <>
                  <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
                    {getAgentProperties.isLoading && (
                      <PropertySkeleton cards={6} />
                    )}
                    {getAgentProperties.data &&
                      getAgentProperties.data.map((property: TProperty) => (
                        <PropertyCard key={property._id} property={property} />
                      ))}
                  </div>
                  {getAgentProperties.isError && (
                    <p className="font-bold text-7xl text-[#8C959F] text-center">
                      Please refresh the page
                    </p>
                  )}
                  {getAgentProperties.data?.length === 0 && (
                    <p className="font-bold text-7xl text-[#8C959F] text-center">
                      getAgentProperties
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

const Container = tw.div`container mx-auto`;
const Tab = styled.button<{
  active: string;
}>`
  ${tw`py-5 px-10 w-fit min-w-fit`} ${({ active }) =>
    active === "true"
      ? tw`bg-red-500 text-white font-semibold`
      : tw`border border-[#e3e3e3] text-[#8C959F]`}
`;

export default Agent;
