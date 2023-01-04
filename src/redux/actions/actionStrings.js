import { ActionType } from "redux-promise-middleware";

export const actionStrings = {
  authLogin: "AUTH_LOGIN",
  authRegister: "AUTH_REGISTER",
  authForgot: "AUTH_FORGOT",
  authConfirm: "AUTH_CONFIRM",
  authLogout: "AUTH_LOGOUT",
  getProducts: "GET_PRODUCTS",
  getProductById: "GET_PRODUCT_BY_ID",
  addProduct: "CREATE_PRODUCT",
  editProduct: "EDIT_PRODUCT",
  deleteProduct: "DELETE_PRODUCT",
  getPromo: "GET_PROMO",
  addPromo: "ADD_PROMO",
  editPromo: "EDIT_PROMO",
  deletePromo: "DELETE_PROMO",
  pending: `_${ActionType.Pending}`,
  fulfilled: `_${ActionType.Fulfilled}`,
  rejected: `_${ActionType.Rejected}`,
  getProfile: "GET_PROFILE",
  editPassword: "EDIT_PASSWORD",
  editProfile: "EDIT_PROFILE",
  addToCart: "ADD_TO_CART",
  deleteCart: "DELETE_CART",
  deleteSingleCart: "DELETE_SINGLE_CART",
  createTransaction: "CREATE_TRANSACTION",
  getHistory: "GET_HISTORY",
  deleteHistory: "DELETE_HISTORY",
};
