import {Link, useLocation} from "react-router-dom";
import Logo from "../Logo/Logo";
import {styled} from "styled-components";
import tw from "twin.macro";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import {useEffect, useState} from "react";

function Navbar() {
    const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
    const location = useLocation();

    useEffect(() => {
        setMenuIsOpen(false)
    }, [location])

    return (
        <nav className="absolute top-0 left-0 w-full z-10">
            <div className="container mx-auto mt-7">
                <div className="flex h-14 items-center justify-between relative">
                    <Logo textColor="text-gray-500"/>
                    <GiHamburgerMenu className="block md:hidden" size={24} onClick={() => setMenuIsOpen(true)}/>
                    <div
                        className={`fixed overflow-hidden top-0 left-0 w-full h-screen md:relative md:w-fit md:h-full bg-gray-300 md:bg-opacity-0 md:visible transition-all  ${menuIsOpen ? "bg-opacity-50 visible" : "bg-opacity-0 invisible"}`}>
                        <div
                            className={`transition-all fixed top-0 md:right-0 w-3/4 bg-white md:bg-transparent flex-col text-center md:w-fit md:flex-row md:relative flex items-center h-full shadow-sm md:shadow-none ${menuIsOpen ? "right-0" : "-right-3/4"} `}>
                            <IoMdClose className="absolute left-10 top-[2.7rem] md:hidden mr-0" size={24}
                                       onClick={() => setMenuIsOpen(false)}/>
                            <NavLink tw="mt-20" to="/">Home</NavLink>
                            <NavLink to="/about-us">About Us</NavLink>
                            <NavLink to="/listings">Listings</NavLink>
                            <NavLink to="/agents" className="!mr-0">Agents</NavLink>
                            <NavLink
                                to="/contact-us"
                                tw="bg-green-500 text-white h-14 mt-5 !mr-0 md:h-full px-8 flex items-center justify-center md:ml-[70px]"
                            >
                                Contact Us
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

const NavLink = styled(Link)`
  ${tw`text-[#727272] mt-7 md:mr-7 w-full md:w-fit md:!mt-0`}
`;

export default Navbar;
