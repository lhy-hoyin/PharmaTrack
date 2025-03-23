import login from "./login.ts";
import register from "./register.ts";
import logout from "./logout.ts";

import {
  getUserNameById
} from "./auth/users.ts";

import {
  view as viewProducts,
  info as getProductDetails,
  add as addProduct
} from "./auth/products.ts";

import {
  view as viewPurchaseOrderById,
  create as createPurchaseOrder
} from "./auth/orders.ts";

import viewStock from "./auth/stock.ts";

export {
  login, logout, register,
  getUserNameById,
  viewProducts, getProductDetails, addProduct,
  viewPurchaseOrderById, createPurchaseOrder,
  viewStock
};
