import { TAgent } from "./agent";

type TAmenities = {
  _id: string;
  amenityTitle: string;
  amenity: string[];
};

type TGallery = {
  _id: string;
  url: string;
};

export type TProperty = {
  _id: string;
  address: string;
  furnished: boolean;
  exclusivity: string[];
  price: number;
  offPercent: number;
  about: string;
  amenities: TAmenities[];
  gallery: TGallery[];
  location: {
    long: string;
    lat: string;
  };
  agent: TAgent;
  createdAt: Date;
  updatedAt: Date;
  status: boolean;
  publish: boolean;
  status: "rent" | "buy";
  slug: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
};
