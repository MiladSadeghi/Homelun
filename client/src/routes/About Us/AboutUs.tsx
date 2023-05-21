import tw from "twin.macro";
import WhatWeDo from "./components/WhatWeDo";
import OurValue from "./components/OurValue";
import Faq from "./components/Faq";

const AboutUs = () => {
  return (
    <Wrapper>
      <WhatWeDo />
      <OurValue />
      <Faq />
    </Wrapper>
  );
};

const Wrapper = tw.div`container mx-auto mt-[148px]`;
export default AboutUs;
