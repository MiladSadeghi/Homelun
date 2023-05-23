import tw from "twin.macro";
import Apartment from "../../assets/footer-apartemant.png";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

function Footer() {
  return (
    <footer tw="mt-36">
      <Banner>
        <div tw="flex bg-gradient-to-b from-white from-10% via-[#f6f9fb] via-10% to-[#f6f9fb] to-100% h-full">
          <div tw="flex items-center">
            <div tw="w-full mt-[99px] px-[70px] flex flex-col justify-center h-[460px]">
              <h5 tw="font-bold leading-[56px] text-[40px] mb-[70px] text-gray-500">
                Be the first to know when we drop a new feature or product
              </h5>
              <Input type="text" placeholder="Your Name" />
              <Input type="email" placeholder="Email" />
              <Button>Submit</Button>
              <p tw="text-[#888888] text-lg text-center">
                Still have any question?{" "}
                <Link to="/contact-us" tw="text-gray-500 font-semibold ">
                  Contact Us
                </Link>
              </p>
            </div>
          </div>
          <div tw="w-3/4 flex justify-center">
            <img src={Apartment} tw="-scale-x-100" />
            <img src={Apartment} tw="w-1/4 self-end object-contain -ml-5" />
          </div>
        </div>
      </Banner>
      <div tw="pt-[386px] bg-gray-500">
        <div tw="container mx-auto">
          <div tw="flex justify-between">
            <ul>
              <li>
                <Logo textColor="text-white" />
              </li>
              <Li tw="mt-7 text-[#C1C1C1]">MiladSadeghi</Li>
              <Li tw="mt-5">Call us: miladsadeghi2323@gmail.com</Li>
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
                <Link to="/terms">Terms</Link>
              </Li>
            </ul>
            <ul>
              <Li tw="text-lg mb-7 text-white font-semibold">Subscribe</Li>
              <Li tw="mb-8">Subscribe to get the latest news from us</Li>
              <Li tw="relative">
                <Input
                  type="email"
                  tw="py-3 mb-0"
                  placeholder="Email Address"
                />
                <BsFillArrowRightCircleFill tw="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 text-2xl cursor-pointer" />
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

const Banner = tw.div`container mx-auto h-[661px] -mb-[220px] relative`;
const Input = tw.input`py-4 px-6 border border-[#E3E3E3] outline-none w-full mb-6 text-[#888888]`;
const Button = tw.button`w-full text-white bg-green-500 py-5 mb-6`;
const Li = tw.li`text-[#C1C1C1] text-base font-normal`;

export default Footer;
