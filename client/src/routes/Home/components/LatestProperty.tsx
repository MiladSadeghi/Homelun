import { TProperty } from "../../../types/property";
import tw, { styled } from "twin.macro";
import React, { useState } from "react";
import { HiArrowRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
import {
  LatestPropertyCard,
  LatestPropertySkeleton,
} from "../../../components/LatestProperty";

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
      <div tw="flex justify-between">
        <h1 tw="font-bold text-5xl text-gray-500 w-full">
          Latest property listings
        </h1>
        <p tw="font-normal text-xl leading-8 text-[#8C959F] w-full">
          We provide a complete service for the sale, purchase or rental of real
          estate. We provide a complete We provide a complete service for the
          sale.
        </p>
      </div>
      <hr tw="border-[#e3e3e3] my-[70px]" />
      <div tw="flex justify-between ">
        <div tw="flex gap-6">
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
          tw="px-20 py-4 text-lg outline-none text-white font-normal bg-green-500 flex items-center"
        >
          Explore All Listing <HiArrowRight tw="ml-2 mt-1" />
        </Link>
      </div>
      <div tw="mt-[70px] grid grid-cols-3 gap-6">
        {loading && <LatestPropertySkeleton cards={3} />}
        {properties &&
          properties[status].map((property: TProperty) => (
            <LatestPropertyCard key={property._id} property={property} />
          ))}
      </div>
    </Wrapper>
  );
};

const Wrapper = tw.div`container mx-auto p-20 mt-40`;
const Button = styled.button<{ active: string }>`
  ${tw`px-20 py-4  text-lg outline-none`} ${({ active }) =>
    JSON.parse(active)
      ? tw`bg-red-500 text-white font-semibold`
      : tw`border border-[#e3e3e3] text-[#8C959F] font-normal`}
`;

export default LatestProperty;
