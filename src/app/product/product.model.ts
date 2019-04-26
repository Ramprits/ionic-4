export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  id: string;
  updatedAt: string;
  image: Image;
  createdAt?: string;
  __v?: number;
  offer?: boolean;
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
