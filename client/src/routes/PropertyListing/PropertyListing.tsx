/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import tw, { styled } from "twin.macro";
import { TAmenities, TGallery, TProperty } from "../../types/property";
import React, { useEffect, useState } from "react";
import { BsDot } from "react-icons/bs";
import { calculateOffPercent } from "../../utils/calculates";
import { AiOutlineClose } from "react-icons/ai";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { Link } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { IoCallOutline } from "react-icons/io5";
import LoadingIframe from "react-loading-iframe";
import Skeleton from "react-loading-skeleton";

type TPropertyListing = { error: boolean; property: TProperty };

const PropertyListing = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"Overview" | "Gallery" | "Location" | "Agent">(
    "Overview"
  );
  const [galleryModalOpen, setGalleryModalOpen] = useState<boolean>(false);

  const { isLoading, data, isError } = useQuery({
    queryKey: ["property", { slug }],
    queryFn: () =>
      axios
        .get<TPropertyListing>(`properties/${slug}`)
        .then((response) => response.data.property),
  });

  useEffect(() => {
    if (isError) {
      navigate("/404");
    }
  }, [isError]);

  useEffect(() => {
    if (!isLoading) {
      window.scrollTo({ top: 0 });
    }
  }, [isLoading]);

  useEffect(() => {
    if (galleryModalOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "15px";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    };
  }, [galleryModalOpen]);

  if (isLoading) return <>Loading...</>;

  const gallerySlides: React.ReactNode[] = [];
  data?.gallery.map((gallery: TGallery) => {
    gallerySlides.push(
      React.cloneElement(
        <SwiperSlide>
          <img className="object-contain h-full w-full" src={gallery.url} />
        </SwiperSlide>,
        { key: gallery._id }
      )
    );
  });

  return (
    <div className="relative">
      <Wrapper>
        <div className="grid grid-cols-2">
          <div>
            <img
              onClick={() => setGalleryModalOpen(true)}
              src={data?.gallery[0].url}
              className="h-[450px] w-full mb-4 object-cover cursor-pointer"
            />
            <div className="grid grid-cols-3 gap-4">
              {data?.gallery.slice(1, 4).map((gallery: TGallery) => (
                <div
                  onClick={() => setGalleryModalOpen(true)}
                  key={gallery._id}
                  data-content={`+${data.gallery.length - 4}`}
                  className={`relative cursor-pointer last-of-type:after:absolute last-of-type:after:left-0  last-of-type:after:top-0 last-of-type:after:flex last-of-type:after:justify-center last-of-type:after:items-center last-of-type:after:text-white last-of-type:after:bg-black last-of-type:after:bg-opacity-60  last-of-type:after:z-10 last-of-type:after:w-full last-of-type:after:h-full last-of-type:after:text-xl last-of-type:after:font-bold last-of-type:after:content-[attr(data-content)]`}
                >
                  <img src={gallery.url} />
                </div>
              ))}
            </div>
          </div>
          <div className="ml-16">
            <div className="flex items-center mb-4">
              <p className="capitalize text-base text-red-500">
                {data?.status}
              </p>
              {data?.furnished && (
                <>
                  <BsDot className=" text-red-500 " size={32} />
                  <p className=" text-red-500">Furnished</p>
                </>
              )}
            </div>
            <h3 className="font-semibold text-4xl mb-[70px]">
              {data?.address}
            </h3>
            <div className="flex items-center mb-14">
              {data?.offPercent === 0 ? (
                <></>
              ) : (
                <>
                  <h2 className="text-[44px] font-bold text-green-500">
                    {calculateOffPercent(
                      data?.price as string,
                      data?.offPercent as number
                    )}
                  </h2>
                  <h6 className="font-normal text-[#8C959F] text-xl ml-3 line-through">
                    {data?.price}
                  </h6>
                  <span className="py-.5 px-2.5 text-red-500 ml-5 bg-red-100">
                    {data?.offPercent}% Off
                  </span>
                </>
              )}
            </div>
            <div className="flex flex-wrap gap-6">
              <PropertyInformation>{data?.bedrooms} Bed</PropertyInformation>
              <PropertyInformation>{data?.bathrooms} bath</PropertyInformation>
              <PropertyInformation>{data?.area} Sq feet</PropertyInformation>
            </div>
          </div>
        </div>
        <div className="p-20 border border-[#E3E3E3] mt-28">
          <div className="flex gap-6 mb-12">
            {["Overview", "Gallery", "Location", "Agent"].map(
              (tabValue: any) => (
                <Tab
                  key={tabValue}
                  active={(tab === tabValue).toString()}
                  onClick={() => setTab(tabValue)}
                >
                  {tabValue}
                </Tab>
              )
            )}
          </div>
          <div>
            {tab === "Overview" && (
              <>
                <h5 className="font-semibold text-2xl mb-5">About Property</h5>
                <p className="text-[#8C959F] text-lg leading-7 mb-14">
                  {data?.about}
                </p>
                <h5 className="font-semibold text-2xl mb-5">
                  Property Amenities
                </h5>
                {data?.amenities.map((amenity: TAmenities) => (
                  <div className="mb-10" key={amenity._id}>
                    <h6 className="text-[#8C959F] text-lg mb-5">
                      {amenity.amenityTitle}
                    </h6>
                    <div className="gap-x-6 flex flex-wrap">
                      {amenity.amenity.map((data) =>
                        data
                          .split(", ")
                          .map((item) => <Amenity key={item}>{item}</Amenity>)
                      )}
                    </div>
                  </div>
                ))}
              </>
            )}
            {tab === "Gallery" && (
              <div className="grid grid-cols-3 gap-6">
                {data?.gallery.map((gallery: TGallery) => (
                  <img
                    className="cursor-pointer h-72 w-full object-cover"
                    key={gallery._id}
                    onClick={() => setGalleryModalOpen(true)}
                    src={gallery.url}
                  />
                ))}
              </div>
            )}
            {tab === "Location" && (
              <LoadingIframe
                skeleton={<Skeleton className="w-full h-[500px]" />}
                src={`https://www.google.com/maps/embed/v1/place?key=${
                  import.meta.env.VITE_GOOGLE_MAP_API_KEY
                }&q=${parseFloat(data?.location.lat as string)},${parseFloat(
                  data?.location.long as string
                )}`}
                className="!w-full !h-[500px]"
              />
            )}
            {tab === "Agent" && (
              <div className="grid grid-cols-2">
                <div className="flex flex-col justify-around">
                  <div>
                    <h5 className="font-semibold text-2xl mb-4">Realtor</h5>
                    <p className="text-[#8C959F] leading-8">
                      Feel free to contact our realtor or contact us via email
                      or phone.
                    </p>
                  </div>
                  <div>
                    <img
                      className="mb-6 font-semibold w-60"
                      src={data?.agent.cover}
                    />
                    <Link
                      className="mb-4 font-semibold text-[20px] leading-8"
                      to={`/agents/${data?.agent.slug}`}
                    >
                      {data?.agent.name}
                    </Link>
                    <p className="text-[#8C959F] text-base mb-10">
                      {data?.agent.field}
                    </p>
                    <div className="flex items-center">
                      <p className="text-[#8C959F] text-lg flex items-center">
                        <HiOutlineMail size={22} className="mr-4" />
                        MiladSadeghi2323@gmail.com
                      </p>
                      <p className="text-[#8C959F] text-lg flex items-center ml-10">
                        <IoCallOutline size={22} className="mr-4" />
                        {data?.agent.phoneNumber}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-16">
                  <h6 className="font-semibold text-[22px] mb-8">
                    Take a Tour
                  </h6>
                  <p className="text-xl text-[#8C959F] mb-10">
                    Schedule your showing today. Leave your contact, and we’ll
                    get back to you as soon as possible.
                  </p>
                  <div className="grid gap-4 mb-14">
                    <div className="grid grid-cols-2 gap-4">
                      <Input type="text" placeholder="Your Name" />
                      <Input type="email" placeholder="Your Email" />
                    </div>
                    <textarea
                      className="px-5 py-5 border border-[#E3E3E3] w-full outline-none resize-none"
                      defaultValue={`I am interested in ${data?.address}`}
                      rows={5}
                    />
                    <div>
                      <input type="checkbox" id="privacy" name="privacy" />
                      <label
                        className="text-lg text-[#8C959F] ml-4"
                        htmlFor="privacy"
                      >
                        I agree to the privacy policy
                      </label>
                    </div>
                  </div>
                  <Button>Submit</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Wrapper>
      <GalleryModal isopen={galleryModalOpen.toString()}>
        <div className="bg-white w-full h-full rounded-lg">
          <div className="flex justify-between items-center px-14 py-7 border-b border-b-gray-200">
            <h5 className="font-semibold text-3xl">Gallery</h5>
            <AiOutlineClose
              size={28}
              className="cursor-pointer"
              onClick={() => setGalleryModalOpen(false)}
            />
          </div>
          <div className="h-[89%] p-8">
            <Swiper
              slidesPerView={1}
              loop={true}
              navigation={true}
              modules={[Navigation]}
              className="mySwiper h-full"
            >
              {gallerySlides}
            </Swiper>
          </div>
        </div>
      </GalleryModal>
    </div>
  );
};
const Wrapper = tw.div`container mx-auto mt-[148px]`;
const PropertyInformation = tw.span`text-[#8C959F] py-4 px-6 border border-[#E3E3E3]`;
const Tab = styled.button<{ active: string }>`
  ${tw`py-5 px-10`} ${({ active }) =>
    active === "true"
      ? tw`bg-red-500 text-white font-semibold`
      : tw`border border-[#e3e3e3] text-[#8C959F]`}
`;
const Amenity = tw.span`py-[19px] px-10 border border-[#8C959F] text-[#8C959F] text-lg`;
const GalleryModal = styled.div<{ isopen: string }>`
  ${tw`fixed top-0 left-0 w-full h-screen bg-slate-800 bg-opacity-80 z-10 p-8 `} ${({
    isopen,
  }) => (isopen === "true" ? tw`block` : tw`hidden`)}
`;

const Input = tw.input`px-5 py-5 border border-[#E3E3E3] outline-none`;
const Button = tw.button`w-full text-base font-semibold text-white bg-green-500 py-5`;
export default PropertyListing;
