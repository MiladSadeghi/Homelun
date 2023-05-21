import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import { styled } from "styled-components";
import tw from "twin.macro";
function Navbar() {
  return (
    <nav className="absolute top-0 left-0 w-full z-10">
      <div className="container mx-auto mt-7">
        <div className="relative flex h-14 items-center justify-between">
          <Logo textColor="text-gray-500" />
          <div tw="flex items-center h-full [&:nth-child(-n+3)]:mr-10">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about-us">About Us</NavLink>
            <NavLink to="/listings">Listings</NavLink>
            <NavLink to="/agents">Agents</NavLink>
            <NavLink
              to="/contact-us"
              tw="bg-green-500 text-white h-full px-8 flex items-center justify-center ml-[70px]"
            >
              Contact Us
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

const NavLink = styled(Link)`
  ${tw`text-[#727272]`}
`;

export default Navbar;
