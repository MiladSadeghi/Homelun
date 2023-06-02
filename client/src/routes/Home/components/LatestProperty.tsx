import { TProperty } from "../../../types/property";
import tw, { styled } from "twin.macro";
import React, { useState } from "react";
import { HiArrowRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
import {
  PropertyCard,
  PropertySkeleton,
} from "../../../components/PropertyCard";

type Props = {
  loading: boolean;
  properties: {
    sale: TProperty[];
    rent: TProperty[];
  };
};

const LatestProperty: React.FC<Props> = ({ loading, properties }) => {
  const [status, setStatus] = useState<"rent" | "sale">("sale");

  return (
    <Wrapper>
      <div tw="flex flex-col md:flex-row text-center md:text-start justify-between">
        <h1 tw="font-bold text-5xl text-gray-500 w-full  mb-4 md:mb-0">
          Latest property listings
        </h1>
        <p tw="font-normal text-xl leading-8 text-[#8C959F] w-full">
          We provide a complete service for the sale, purchase or rental of real
          estate. We provide a complete We provide a complete service for the
          sale.
        </p>
      </div>
      <hr tw="border-[#e3e3e3] my-[70px]" />
      <div tw="flex flex-col gap-2 lg:flex-row justify-between">
        <div tw="flex gap-6 overflow-x-auto">
          <Button
            active={(status === "sale").toString()}
            onClick={() => setStatus("sale")}
          >
            For Sale
          </Button>
          <Button
            active={(status === "rent").toString()}
            onClick={() => setStatus("rent")}
          >
            For Rent
          </Button>
        </div>
        <Link
          to="/listings"
          tw="px-20 py-4 text-lg outline-none text-white font-normal bg-green-500 flex items-center justify-center lg:justify-start"
        >
          Explore All Listing <HiArrowRight tw="ml-2 mt-1" />
        </Link>
      </div>
      <div tw="mt-[70px] grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading && <PropertySkeleton cards={3} />}
        {properties &&
          properties[status].map((property: TProperty) => (
            <PropertyCard key={property._id} property={property} />
          ))}
      </div>
    </Wrapper>
  );
};

const Wrapper = tw.div`container mx-auto p-20 mt-40`;
const Button = styled.button<{ active: string }>`
  ${tw`px-20 py-4 text-lg outline-none min-w-fit w-7/12 sm:w-fit sm:min-w-fit`} ${({
    active,
  }) =>
    JSON.parse(active)
      ? tw`bg-red-500 text-white font-semibold`
      : tw`border border-[#e3e3e3] text-[#8C959F] font-normal`}
`;

export default LatestProperty;
