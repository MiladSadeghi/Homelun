import tw, {styled} from "twin.macro";
import Apartment from "../../assets/footer-apartemant.png";
import {Link} from "react-router-dom";
import Logo from "../Logo/Logo";
import {BsFillArrowRightCircleFill} from "react-icons/bs";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {TDropFeatureForm, TLatestNewsForm} from "../../types/forms";
import {dropFeatureForm, latestNewsForm} from "../../forms/schema.ts";
import {useMutation} from "@tanstack/react-query";
import axios from "axios";
import {toast} from "react-toastify";

function Footer() {
    const dropFeature = useForm<TDropFeatureForm>({
        resolver: zodResolver(dropFeatureForm),
    });
    const latestNews = useForm<TLatestNewsForm>({
        resolver: zodResolver(latestNewsForm),
    });

    const dropFeatureMutation = useMutation({
        mutationFn: (data: TDropFeatureForm) =>
            axios.post<{ error: boolean; message: string }>("/drop-feature", {
                name: data.name,
                email: data.email,
            }),
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message);
            }
        },
        onSuccess: (data) => {
            toast.success(data.data.message);
            dropFeature.reset();
        },
    });

    const latestNewsMutation = useMutation({
        mutationFn: (data: TLatestNewsForm) =>
            axios.post<{ error: boolean; message: string }>("/latest-news", {
                email: data.email,
            }),
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message);
            }
        },
        onSuccess: (data) => {
            toast.success(data.data.message);
            dropFeature.reset();
        },
    });

    const handleDropFeatureForm = async (inputsData: TDropFeatureForm) => {
        await dropFeatureMutation.mutate(inputsData);
    };

    const handleLatestNewsForm = async (inputsData: TLatestNewsForm) => {
        await latestNewsMutation.mutate(inputsData);
    };

    return (
        <footer tw="mt-36">
            <Banner>
                <div
                    tw="flex flex-col lg:flex-row bg-gradient-to-b from-white from-0% lg:from-10% via-[#f6f9fb] via-0% lg:via-10% to-[#f6f9fb] to-100% h-full">
                    <div tw="flex items-center">
                        <div tw="w-full mt-[99px] px-10 sm:px-[70px] flex flex-col justify-center h-full lg:h-[460px]">
                            <h5 tw="font-bold leading-[56px] text-4xl sm:text-[40px] mb-[70px] text-gray-500">
                                Be the first to know when we drop a new feature or product
                            </h5>
                            <form onSubmit={dropFeature.handleSubmit(handleDropFeatureForm)}>
                                <Input
                                    type="text"
                                    placeholder="Your Name"
                                    {...dropFeature.register("name")}
                                    $isError={String(
                                        Object.keys(dropFeature.formState.errors).includes("name")
                                    )}
                                    title={dropFeature.formState.errors.name?.message}
                                />
                                <Input
                                    type="text"
                                    placeholder="Email"
                                    {...dropFeature.register("email")}
                                    $isError={String(
                                        Object.keys(latestNews.formState.errors).includes("email")
                                    )}
                                    title={dropFeature.formState.errors.email?.message}
                                />
                                <Button type="submit" disabled={dropFeatureMutation.isLoading}>
                                    Submit
                                </Button>
                            </form>
                            <p tw="text-[#888888] text-lg text-center">
                                Still have any question?{" "}
                                <Link to="/contact-us" tw="text-gray-500 font-semibold ">
                                    Contact Us
                                </Link>
                            </p>
                        </div>
                    </div>
                    <div tw="w-full lg:w-3/4 flex justify-center">
                        <img src={Apartment} tw="-scale-x-100 w-1/3 lg:w-fit"/>
                        <img src={Apartment} tw="w-1/4 self-end object-contain sm:-ml-5"/>
                    </div>
                </div>
            </Banner>
            <div tw="pt-[386px] bg-gray-500">
                <div tw="container mx-auto">
                    <div
                        tw="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-between gap-8 sm:gap-4">
                        <ul>
                            <li>
                                <Logo textColor="text-white"/>
                            </li>
                            <Li tw="mt-7 text-[#C1C1C1]">Milad Sadeghi</Li>
                            <Li tw="mt-5">Call us: MiladSadeghi2323@gmail.com</Li>
                        </ul>
                        <ul tw="[& li]:mb-5">
                            <Li>
                                <Link to="/about-us">About Us</Link>
                            </Li>
                            <Li>
                                <Link to="/agents">Agents</Link>
                            </Li>
                            <Li>
                                <Link to="listings">Listings</Link>
                            </Li>
                            <Li>
                                <Link to="/contact-us">Contact Us</Link>
                            </Li>
                        </ul>
                        <ul tw="[& li]:mb-5">
                            <Li>
                                <Link to="/privacy">Privacy</Link>
                            </Li>
                            <Li>
                                <Link to="/faqs">Faqs</Link>
                            </Li>
                            <Li>
                                <Link to="/terms-of-service">Terms</Link>
                            </Li>
                        </ul>
                        <ul>
                            <Li tw="text-lg mb-7 text-white font-semibold">Subscribe</Li>
                            <Li tw="mb-8 ">Subscribe to get the latest news from us</Li>
                            <Li>
                                <form
                                    tw="relative"
                                    onSubmit={latestNews.handleSubmit(handleLatestNewsForm)}
                                >
                                    <Input
                                        type="email"
                                        className="py-3 !mb-0 pr-12"
                                        placeholder="Email Address"
                                        disabled={latestNewsMutation.isLoading}
                                        {...latestNews.register("email")}
                                    />
                                    <button
                                        className="absolute right-4 top-1/2 -translate-y-1/2"
                                        type="submit"
                                    >
                                        <BsFillArrowRightCircleFill tw=" text-red-500 text-2xl cursor-pointer"/>
                                    </button>
                                </form>
                            </Li>
                        </ul>
                    </div>
                    <p tw="text-center text-[#c1c1c1b3] py-24 pb-16">
                        Copyright © 2023. Crafted with love By{" "}
                        <a
                            href="https://github.com/MiladSadeghi"
                            target="_blank"
                            tw="text-white font-semibold"
                        >
                            @MiladSadeghi
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}

const Banner = tw.div`container mx-auto h-full lg:h-[661px] -mb-[220px] relative`;
const Input = styled.input<{
    $isError?: string;
}>`
  ${tw`py-4 px-6 border border-[#E3E3E3] outline-none w-full mb-6 text-[#888888]`} ${({
                                                                                        $isError,
                                                                                      }) => ($isError === "true" ? tw`border-red-500` : tw``)}
`;
const Button = tw.button`w-full text-white bg-green-500 py-5 mb-6`;
const Li = tw.li`text-[#C1C1C1] text-base font-normal`;

export default Footer;
