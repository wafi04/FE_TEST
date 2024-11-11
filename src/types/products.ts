import { UserData } from "./user";
// Types definitions
export interface ProductImage {
  file: File;
}

export interface InventoryItem {
  size: string;
  quantity: number;
}

export interface ProductFormData {
  name: string;
  gender: "Men" | "Women";
  category: "RUNNING" | "JORDAN" | "BASKETBALL";
  description: string;
  color: string;
  price: number;
  image: File | null | string;
  Inventory: InventoryItem[];
}

export interface Inventory {
  id: number;
  size: string;
  quantity: number;
}

export interface ProductData {
  name: string;
  id: string;
  category: string;
  price: number;
  image: string;
  description: string;
  color: string;
  Inventory: Inventory[];
  sellerId: string;
  gender: string;
  createdAt: Date;
  updatedAt: Date;
  seller: UserData;
}

export type CATEGORY = "RUNNING" | "JORDAN" | "BASKETBALL";
export type GENDER = "Men" | "Women";

export type CreateInventoryType = {
  size: string;
  quantity: number;
};

export type ProductImageType = {
  file: File | null;
  preview: string;
};

export type CreateProductType = {
  name: string;
  gender: GENDER;
  category: CATEGORY;
  description: string;
  color: string;
  price: string | number;
  image: ProductImageType | null;
  Inventory?: CreateInventoryType[];
};
