import { Faqs, TFaqs } from "../../../utils/faqs";
import { BiRightArrowAlt } from "react-icons/bi";
import { HashLink } from "react-router-hash-link";

const Faq = () => {
  return (
    <div className="mt-60">
      <div className="flex flex-col items-center">
        <h3 className="text-[40px] font-bold mb-5 text-gray-500">
          Frequently asked questions
        </h3>
        <p className="font-normal text-xl text-[#888888] w-1/2 text-center">
          We provide a complete service for the sale, purchase or rental of real
          estate. We provide a complete We provide a complete service for the
          sale.
        </p>
      </div>
      <div className="mt-[70px] grid grid-cols-2 gap-6">
        {Faqs.slice(0, 6).map((faq: TFaqs, index: number) => (
          <HashLink
            key={index}
            to={`/faqs#${faq.question.replace(/\s/g, "-")}`}
            className="flex items-center justify-between border border-[#E3E3E3] w-full px-7 py-10"
          >
            <h5 className="font-bold text-xl text-gray-500">{faq.question}</h5>
            <BiRightArrowAlt size={23}/>
          </HashLink>
        ))}
      </div>
    </div>
  );
};

export default Faq;
