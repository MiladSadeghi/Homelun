import { z, ZodType } from "zod";
import { TContactForm, TDropFeatureForm, TLatestNewsForm, TTakeTourForm } from "../types/forms";

export const dropFeatureForm: ZodType<TDropFeatureForm> = z.object({
  name: z.string().min(3, "choose a right name..."),
  email: z.string().email("Invalid email address"),
});

export const latestNewsForm: ZodType<TLatestNewsForm> = z.object({
  email: z.string().email("Invalid email address"),
});

export const contactForm: ZodType<TContactForm> = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(3, "choose a valid name..."),
  message: z.string().min(10),
  acceptTerms: z.boolean().refine(value => value === true, {
    message: 'You should accept terms of services',
  }),
})

export const takeTourForm: ZodType<TTakeTourForm> = z.object({
  name: z.string().min(3, "choose a valid name..."),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10),
  acceptPrivacy: z.boolean().refine(value => value === true, {
    message: 'You should accept our privacy policy',
  }),
})