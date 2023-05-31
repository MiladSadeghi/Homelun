import tw, { styled } from "twin.macro";
import { HiOutlineMail } from "react-icons/hi";
import { useMutation } from "@tanstack/react-query";
import { TContactForm } from "../../types/forms";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactForm } from "../../forms/schema.ts";

const ContactUs = () => {
  const contact = useForm<TContactForm>({ resolver: zodResolver(contactForm) });
  const contactMutation = useMutation({
    mutationFn: (data: TContactForm) =>
      axios.post<{ error: boolean; message: string }>("/contact", {
        email: data.email,
        name: data.name,
        message: data.message
      }),
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    },
    onSuccess: (data) => {
      toast.success(data.data.message);
      contact.reset();
    },
  });

  const handleContactForm = (formInputs: TContactForm) => {
    console.log(formInputs)
    contactMutation.mutate(formInputs);
  };

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
              <HiOutlineMail size={22} className="mr-4"/>
              MiladSadeghi2323@gmail.com
            </p>
          </div>
        </div>
        <div className="col-span-2 p-16">
          <h6 className="font-semibold text-[22px] mb-8">Contact Us</h6>
          <form onSubmit={contact.handleSubmit(handleContactForm)}>
            <div className="grid gap-4 mb-14">
              <div className="grid grid-cols-2 gap-4">
                <Input type="text" placeholder="Your Name"
                       $isError={Object.keys(contact.formState.errors).includes("name")} {...contact.register("name")}/>
                <Input $isError={Object.keys(contact.formState.errors).includes("email")} type="email"
                       placeholder="Your Email"  {...contact.register("email")}/>
              </div>
              <textarea
                className={`px-5 py-5 border border-[#E3E3E3] w-full outline-none resize-none ${Object.keys(contact.formState.errors).includes("message") && `border-red-500`}`}
                placeholder="Your Message"
                title={contact.formState?.errors?.message?.message}
                {...contact.register("message")}
              />

              <div>
                <input type="checkbox" id="privacy"
                       {...contact.register("acceptTerms")} />
                <label
                  className={`text-lg text-[#8C959F] ml-4 ${Object.keys(contact.formState.errors).includes("accessTerms") && "text-red-500"}`}
                  htmlFor="privacy"
                >
                  I agree to the privacy policy
                </label>
              </div>
            </div>
            <Button
              type="submit"
              className="disabled:opacity-60"
              disabled={
                !contact.formState.isValid || contactMutation.isLoading
              }
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = tw.div`container mx-auto mt-[148px]`;
const Input = styled.input<{
  $isError: boolean
}>`${tw`px-5 py-5 border border-[#E3E3E3] outline-none`} ${(({ $isError }) => $isError ? tw`border-red-500` : tw``)}`;
const Button = tw.button`w-full text-base font-semibold text-white bg-green-500 py-5 duration-100 transition-all ease-in-out`;

export default ContactUs;
