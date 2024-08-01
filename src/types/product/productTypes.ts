import { ReactNode } from "react";

export interface ProductTypes {
  rating: number | null | undefined;
  description: ReactNode;
  id: number;
  name: string;
  price: number;
  imageSrc: string;
  createDate: Date;
  liked: boolean;
}