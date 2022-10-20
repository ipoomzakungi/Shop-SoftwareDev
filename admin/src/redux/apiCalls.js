import { publicRequest, userRequest, setToken } from "../requestMethod";
import {
  getProductFailure, getProductStart, getProductSuccess,
  deleteProductStart, deleteProductFailure, deleteProductSuccess,
  updateProductStart, updateProductFailure, updateProductSuccess,
  addProductStart, addProductFailure, addProductSuccess


} from "./productRedux";
import { loginFailure, loginStart, loginSuccess } from "./userRedux"

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  console.log(id)
  try {
    setToken()
    const res = await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    //dispatch(deleteProductSuccess(id));
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());

  try {
    console.log("try updateProduct")
    // update
    //dispatch(updateProductSuccess({id,product}));
    const res = await userRequest.put("/products/"+id,product)
    console.log(res.data)
  } catch (err) {
    //dispatch(deleteProductSuccess(id));
    dispatch(updateProductFailure());
  }
};
export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());

  try {
    setToken()

    const res = await userRequest.post(`/products`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    //dispatch(deleteProductSuccess(id));
    dispatch(addProductFailure());
  }
};

export const updateOrder = async (id, order) => {
  try {
    console.log("try updateOrder")
    // update
    //dispatch(updateProductSuccess({id,product}));
    const res = await userRequest.put("/orders/"+id,order)
    console.log(res.data)
    alert("Success")

  } catch (err) {
    //dispatch(deleteProductSuccess(id));
    console.log("Failed updateOrder")
  }
};
export const updateUser = async (id, user) => {
  try {
    console.log("try updateUser")
    // update
    //dispatch(updateProductSuccess({id,product}));
    const res = await userRequest.put("/users/"+id,user)
    console.log(res.data)
    alert("Success")
  } catch (err) {
    //dispatch(deleteProductSuccess(id));
    console.log("Failed updateUser")
  }
};

export const addUser = async (user) => {
  try {
    const res = await userRequest.post(`/auth/register/`, user);
    //dispatch(addProductSuccess(res.data));
    console.log("Success addUser",res)

  } catch (err) {
    console.log("Failed addUser")
  }
};