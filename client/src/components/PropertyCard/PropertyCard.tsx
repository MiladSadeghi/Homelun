import React from "react";
import { TProperty } from "../../types/property";
import { calculateOffPercent } from "../../utils/calculates";
import { Link } from "react-router-dom";
import { ImArrowRight2 } from "react-icons/im";

type Props = {
  property: TProperty;
  key: string;
};

const PropertyCard: React.FC<Props> = ({ property }) => {
  return (
    <div>
      <img className="h-72 w-full" src={property.gallery[0].url} />
      <div className="py-[30px] px-6">
        <h5 className="text-2xl text-gray-500 font-bold line-clamp-2 h-16">
          {property.address}
        </h5>
        <p className="mt-4 text-[#8C959F] text-lg font-normal">
          {property.agent.name}
        </p>
        <div className="flex justify-between items-center mt-6">
          <p className=" text-red-500 font-extrabold text-4xl leading-none">
            {property.offPercent !== 0 ? (
              <>
                {calculateOffPercent(property.price, property.offPercent)}
                <span className="ml-1 text-base text-[#8C959F] font-normal">
                  -{property.offPercent}%
                </span>
              </>
            ) : (
              Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(property.price)
            )}
          </p>
          <div>
            <Link
              className="flex items-center font-semibold text-gray-500 text-lg"
              to={`/listings/${property.slug}`}
            >
              Details <ImArrowRight2 size={15} className="ml-4 stroke-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PropertyCard };
