import login from "./login.ts";
import register from "./register.ts";
import logout from "./logout.ts";

import {
  view as viewProducts,
  add as addProduct
} from "./auth/products.ts";
import viewStock from "./auth/stock.ts";

export {
    login, logout, register,
    viewProducts, addProduct,
    viewStock
};
