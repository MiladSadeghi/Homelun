export type TDropFeatureForm = {
  name: string;
  email: string;
};

export type TLatestNewsForm = {
  email: string;
};

export type TContactForm = {
  email: string;
  name: string;
  message: string;
  acceptTerms?: boolean;
}

export type TTakeTourForm = {
  name: string;
  email: string;
  message: string;
  acceptPrivacy?: boolean;
}