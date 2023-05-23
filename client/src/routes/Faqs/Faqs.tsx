/* eslint-disable react-hooks/exhaustive-deps */
import tw from "twin.macro";
import { Faqs as FaqsA } from "../../utils/faqs";
import { TFaqs } from "../../utils/faqs";
import { useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useEffect } from "react";

const Faqs = () => {
  const { pathname, hash } = useLocation();
  const handleScroll = () => {
    const element = document.getElementById(hash.replace("#", ""));

    setTimeout(() => {
      window.scrollTo({
        behavior: element ? "smooth" : "auto",
        top: element ? element.offsetTop : 0,
      });
    }, 100);
  };

  useEffect(() => {
    handleScroll();
  }, [pathname, hash]);

  return (
    <Wrapper>
      <h1 className="text-gray-500 text-7xl font-bold text-center mb-20">
        Faqs
      </h1>
      {FaqsA.map((faq: TFaqs, index: number) => (
        <div className="mb-9">
          <HashLink
            key={index}
            to={`#${faq.question.replace(/\s/g, "-")}`}
            id={`${faq.question.replace(/\s/g, "-")}`}
            className="mb-3 block"
          >
            <h5 className="font-bold text-2xl">Q: {faq.question}</h5>
          </HashLink>

          <p className="leading-7">
            <strong>A: </strong>
            {faq.answer}
          </p>
        </div>
      ))}
    </Wrapper>
  );
};

const Wrapper = tw.div`container mx-auto mt-[178px]`;

export default Faqs;
