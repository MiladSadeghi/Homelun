import tw from "twin.macro";
import { HiOutlineMail } from "react-icons/hi";

const ContactUs = () => {
  return (
    <Wrapper>
      <div className="grid grid-cols-3">
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-gray-500 leading-[94px] text-[70px] mb-7 font-bold">
              Get in touch with us.
            </h1>
            <p className="font-normal text-xl leading-7 text-[#8C959F]">
              We provide a complete service for the sale, purchase.
            </p>
          </div>
          <div>
            <h6 className="font-semibold text-2xl mb-6">Reach out to us at</h6>
            <p className="text-[#8C959F] text-lg flex items-center">
              <HiOutlineMail size={22} className="mr-4" />
              MiladSadeghi2323@gmail.com
            </p>
          </div>
        </div>
        <div className="col-span-2 p-16">
          <h6 className="font-semibold text-[22px] mb-8">Contact Us</h6>
          <div className="grid gap-4 mb-14">
            <div className="grid grid-cols-2 gap-4">
              <Input type="text" placeholder="Your Name" />
              <Input type="email" placeholder="Your Email" />
            </div>
            <textarea
              className="px-5 py-5 border border-[#E3E3E3] w-full outline-none resize-none"
              placeholder="Your Message"
            />
            <div>
              <input type="checkbox" id="privacy" name="privacy" />
              <label className="text-lg text-[#8C959F] ml-4" htmlFor="privacy">
                I agree to the privacy policy
              </label>
            </div>
          </div>
          <Button>Submit</Button>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = tw.div`container mx-auto mt-[148px]`;
const Input = tw.input`px-5 py-5 border border-[#E3E3E3] outline-none`;
const Button = tw.button`w-full text-base font-semibold text-white bg-green-500 py-5`;

export default ContactUs;
