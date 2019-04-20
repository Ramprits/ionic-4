export interface IProduct {
  id: string;
  name: string;
  image: string;
}

// Generated by https://quicktype.io

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
  image: Image;
}

export interface Image {
  _id: string;
  name: string;
  sha256: string;
  hash: string;
  ext: string;
  mime: string;
  size: string;
  url: string;
  provider: string;
  related: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}