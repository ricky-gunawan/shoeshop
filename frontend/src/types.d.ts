declare type Product = {
  _id: string;
  name: string;
  img: string;
  price: string;
  brand: string;
  color: string;
  description: string;
};

declare type ProductData = {
  name: string;
  img: string;
  price: string;
  brand: string;
  color: string;
  description: string;
};

declare type CartItem = {
  _id: string;
  product: string;
  name: string;
  img: string;
  price: string;
  brand: string;
  color: string;
  quantity: number;
};

declare type CartItemData = {
  product: string;
  name: string;
  img: string;
  price: string;
  brand: string;
  color: string;
  quantity: number;
};

declare type Cart = {
  _id: string;
  user: string;
  items: [CartItem];
};

declare type UserCred = {
  roles: number[];
  accessToken: string;
};

declare type UserProfile = {
  _id: string;
  name: string;
  email: string;
  address: string;
};

declare type UserInfo = {
  _id: string;
  name: string;
  email: string;
  address: string;
  roles: number[];
};

declare type UserRegisterData = {
  name: string;
  email: string;
  password: string;
  address: string;
};

declare type UserUpdateData = {
  name?: string;
  email?: string;
  password?: string;
  address?: string;
};

declare type UserLoginData = {
  email: string;
  password: string;
};

declare type Order = {
  _id: string;
  user: string;
  date: string;
  items: {
    _id: string;
    product: string;
    name: string;
    img: string;
    price: string;
    brand: string;
    color: string;
    quantity: number;
  }[];
  totalItems: number;
  totalPrice: string;
  address: string;
  payment: string;
  isPaid: boolean;
};

declare type OrderData = {
  date: string;
  items: {
    product: string;
    name: string;
    img: string;
    price: string;
    brand: string;
    color: string;
    quantity: number;
  }[];
  totalItems: number;
  totalPrice: string;
  address: string;
  payment: string;
};

declare type ServerError = {
  message: string;
  status?: number;
  additionalInfo?: any;
};
