import { ReactNode } from "react";

export interface ProductTypes {
  description: ReactNode;
  id: number;
  name: string;
  price: number;
  imageSrc: string;
  createDate: Date;
  liked: boolean;
}