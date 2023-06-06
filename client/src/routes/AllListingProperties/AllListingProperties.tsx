/* eslint-disable react-hooks/exhaustive-deps */
import tw from "twin.macro";
import Select, { GroupBase, StylesConfig } from "react-select";
import { useEffect, useState } from "react";
import Range from "../../components/Range";
import { CiSearch } from "react-icons/ci";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TProperty } from "../../types/property";
import { PropertyCard, PropertySkeleton } from "../../components/PropertyCard";
import useDebounce from "../../hooks/useDebounce";
import ReactPaginate from "react-paginate";
import { CgMenuBoxed } from "react-icons/cg";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import useMediaQuery from "../../hooks/useMediaQuery.ts";

type TPropertyType = {
  value: "rent" | "sale";
  label: string;
};

const PropertyTypes: TPropertyType[] = [
  { value: "rent", label: "Rent" },
  { value: "sale", label: "Sale" },
];

type TSearchFilterOptions = {
  value: TSearchParams["sort"];
  label: string;
};

const searchFilterOptions: TSearchFilterOptions[] = [
  { value: "sort_new", label: "Sort By Newest" },
  { value: "sort_percent_off", label: "Sort By Percent Off" },
  { value: "sort_high_low", label: "Sort By Price: High To Low" },
  { value: "sort_low_high", label: "Sort By Price: Low To High" },
];

type TSearchParams = {
  sort?: "sort_new" | "sort_percent_off" | "sort_high_low" | "sort_low_high";
  bedroom_min?: number;
  bedroom_max?: number;
  bathroom_min?: number;
  bathroom_max?: number;
  square_fit_min?: number;
  square_fit_max?: number;
  status?: "rent" | "sale";
  q?: string;
};

function selectBoxStyles<T>():
  | StylesConfig<T, false, GroupBase<T>>
  | undefined {
  return {
    control: (baseStyles, state) => ({
      ...baseStyles,
      boxShadow: state.isFocused ? "none" : "none",
      outline: "none",
      borderColor: "#e3e3e3",
      padding: ".7rem 1.5rem",
      borderRadius: "none",
      "&:hover": { borderColor: "#e3e3e3" },
      position: "relative",
      zIndex: "999",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "#FF6653",
      ":hover": { color: "#FF6653" },
    }),
    option: (base, { isFocused }) => ({
      ...base,
      borderRadius: "none",
      background: isFocused ? "#FF6653" : "#fff",
      color: isFocused ? "#fff" : "#FF6653",
      position: "relative",
      zIndex: "40",
    }),
    container: (base) => ({ ...base, zIndex: "40" }),
    indicatorSeparator: () => ({ display: "none" }),
  };
}

const AllListingProperties = () => {
  const [propertyType, setPropertyType] = useState<TPropertyType | null>(null);
  const [bedroom, setBedroom] = useState<number[]>([1, 20]);
  const [bathroom, setBathroom] = useState<number[]>([1, 20]);
  const [squareFeet, setSquareFeet] = useState<number[]>([100, 10000]);
  const [searchFilter, setSearchFilter] = useState<TSearchFilterOptions | null>(
    searchFilterOptions[0]
  );
  const [searchParams, setSearchParams] = useState<TSearchParams>({
    sort: searchFilter?.value,
  });
  const [searchInput, setSearchInput] = useState<string>("");
  const [totalPage, setTotalPage] = useState<number>(1);
  const [filterMenuOpen, setFilterMenuOpen] = useState<boolean>(false);
  const isMobile = useMediaQuery("(min-width: 768px)");

  const { isLoading, data, refetch } = useQuery({
    queryKey: [
      "search",
      {
        params: searchParams,
      },
    ],
    queryFn: () =>
      axios
        .get<{ error: boolean; listings: TProperty[]; totalPage: number }>(
          "/properties/search",
          {
            params: searchParams,
          }
        )
        .then((response) => {
          setTotalPage(response.data.totalPage);
          return response.data.listings;
        }),
  });

  const changeBedroom = () => {
    setSearchParams((prevState) => ({
      ...prevState,
      bedroom_min: bedroom[0],
      bedroom_max: bedroom[1],
    }));
  };

  const changeBathroom = () => {
    setSearchParams((prevState) => ({
      ...prevState,
      bathroom_min: bathroom[0],
      bathroom_max: bathroom[1],
    }));
  };

  const changeSquareFit = () => {
    setSearchParams((prevState) => ({
      ...prevState,
      square_fit_min: squareFeet[0],
      square_fit_max: squareFeet[1],
    }));
  };

  const debouncedSearchInput = useDebounce(searchInput, 500);

  useEffect(() => {
    if (debouncedSearchInput !== "") {
      setSearchParams((prevState) => ({
        ...prevState,
        q: debouncedSearchInput,
      }));
    } else {
      setSearchParams((prevState: TSearchParams) => {
        if (debouncedSearchInput !== "") {
          return { ...prevState, q: debouncedSearchInput };
        } else {
          const { q, ...rest } = prevState;
          return rest;
        }
      });
    }
  }, [debouncedSearchInput]);

  useEffect(() => {
    setSearchParams((prevState: TSearchParams) => {
      if (propertyType) {
        return { ...prevState, status: propertyType.value };
      } else {
        const { status, ...rest } = prevState;
        return rest;
      }
    });
  }, [propertyType]);

  useEffect(() => {
    setSearchParams((prevState) => ({
      ...prevState,
      sort: searchFilter?.value,
    }));
  }, [searchFilter]);

  useEffect(() => {
    refetch();
  }, [searchParams]);

  useEffect(() => {
    console.log(isMobile);
    if (isMobile) setFilterMenuOpen(false);
  }, [isMobile]);

  const pageChanged = ({ selected }: { selected: number }) => {
    setSearchParams((prevState) => ({
      ...prevState,
      page: selected + 1,
    }));
  };

  return (
    <Wrapper>
      <div className="grid grid-cols-12 gap-10">
        <div
          className={`border border-[#E3E3E3] bg-white p-7 fixed bottom-20 left-5 md:sticky md:top-7 md:col-span-5 xl:col-span-4 overflow-hidden transition-all duration-300 ease-in-out md:w-auto md:h-fit z-30 ${
            filterMenuOpen
              ? "w-[280px] h-[514px] drop-shadow-lg"
              : "w-0 h-0 !p-0 border-none"
          }`}
        >
          <h5 className="font-semibold text-2xl mb-10">Find Property</h5>
          <div className="mb-5">
            <Select
              placeholder="Property Type"
              isSearchable={false}
              options={PropertyTypes}
              defaultValue={propertyType}
              onChange={setPropertyType}
              isClearable={true}
              styles={selectBoxStyles<TPropertyType>()}
            />
          </div>
          <div className=" border border-[#e3e3e3] h-[80px] flex flex-col justify-center-center mb-6">
            <h5 className="ml-2 px-2 -mt-[14px] bg-white w-fit font-semibold">
              Bedrooms
            </h5>
            <div className="w-full h-full my-4 px-8 mt-5">
              <Range
                values={bedroom}
                changeFn={setBedroom}
                finishedFn={changeBedroom}
                step={1}
                min={1}
                max={20}
              />
            </div>
          </div>
          <div className=" border border-[#e3e3e3] h-[80px] flex flex-col justify-center-center mb-6">
            <h5 className="ml-2 px-2 -mt-[14px] bg-white w-fit font-semibold">
              Bathrooms
            </h5>
            <div className="w-full h-full my-4 px-8 mt-5">
              <Range
                values={bathroom}
                changeFn={setBathroom}
                finishedFn={changeBathroom}
                step={1}
                min={1}
                max={20}
              />
            </div>
          </div>
          <div className=" border border-[#e3e3e3] h-[80px] flex flex-col justify-center-center">
            <h5 className="ml-2 px-2 -mt-[14px] bg-white w-fit font-semibold">
              By Square Feet
            </h5>
            <div className="w-full h-full my-4 px-8 mt-5">
              <Range
                values={squareFeet}
                changeFn={setSquareFeet}
                finishedFn={changeSquareFit}
                step={100}
                min={100}
                max={10000}
              />
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-7 xl:col-span-8">
          <div className="grid grid-cols-4 gap-5 mb-10">
            <div className="col-span-2 xl:col-span-3 relative">
              <CiSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500"
                size={24}
              />
              <Input
                type="search"
                placeholder="Search Property Address"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <div className="col-span-2 xl:col-span-1">
              <Select
                placeholder="Property Type"
                isSearchable={false}
                options={searchFilterOptions}
                value={searchFilter}
                onChange={setSearchFilter}
                styles={selectBoxStyles<TSearchFilterOptions>()}
              />
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-x-8 gap-y-6">
            {isLoading && <PropertySkeleton cards={8} />}
            {data &&
              data.map((property: TProperty) => (
                <PropertyCard key={property._id} property={property} />
              ))}
          </div>
          {totalPage > 0 && (
            <ReactPaginate
              onPageChange={pageChanged}
              pageRangeDisplayed={3}
              marginPagesDisplayed={1}
              pageCount={totalPage}
              breakLabel={"..."}
              previousLabel={
                <MdKeyboardArrowLeft className="w-7 h-7 flex text-center text-red-500 m-2" />
              }
              nextLabel={
                <MdKeyboardArrowRight className="w-7 h-7 flex text-center  text-red-500 m-2" />
              }
              containerClassName={"flex items-center justify-end mt-4"}
              pageLinkClassName={
                "w-7 h-7 flex justify-center items-center text-center m-2 rounded-md"
              }
              activeLinkClassName={"bg-red-500 text-white"}
            />
          )}
        </div>
      </div>
      <CgMenuBoxed
        size={48}
        className="fixed bottom-5 left-5 bg-white p-2 rounded-full text-red-500 drop-shadow md:hidden"
        onClick={() => setFilterMenuOpen(!filterMenuOpen)}
      />
    </Wrapper>
  );
};

const Wrapper = tw.div`container mx-auto mt-[148px] relative`;

const Input = tw.input`w-full border border-[#e3e3e3] outline-none h-full px-10`;

export { AllListingProperties };
