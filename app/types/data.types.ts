import { StaticImageData } from "next/image";

export type Project = {
  title: string;
  description: string;
  tech: string[];
  platform: string;
  image: (string | StaticImageData)[];
  repo: string;
  demo: string;
};

export type Language = string[];

export type Computer = {
  cpu: string;
  gpu: string;
  ram: boolean;
};
