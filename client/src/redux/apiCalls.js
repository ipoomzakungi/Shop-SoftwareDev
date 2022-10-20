import { publicRequest, userRequest,setToken } from "../requestMethod";
import { loginFailure, loginStart, loginSuccess,logoutStart,
  updateFailure,updateStart,updateSuccess,
  registerSuccess,registerFailure,registerStart } from "./userRedux"
import { addOrderStart, addOrderSuccess, addOrderFailure,getOrderStart,getOrderFailure,getOrderSuccess} from "./orderRedux"


export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const logout = async (dispatch) => {
  try {
    dispatch(logoutStart());
    console.log("logout Success")

  } catch (err) {
    console.log("logout Failed")
  }
};

export const addOrder = async (order, dispatch) => {
  console.log("order", order)
  //console.log("dispatch",dispatch)

  dispatch((addOrderStart()));

  try {
    console.log("try")
    setToken()
    const res = await userRequest.post(`/orders`, order);
    dispatch(addOrderSuccess(res));
    console.log("fin")
  } catch (err) {
    dispatch(addOrderFailure());
    console.log("Failed add order")
  }

};

export const updateUser = async (user, dispatch) => {
  console.log("user", user)
  //console.log("dispatch",dispatch)

  dispatch((updateStart()));

  try {
    console.log("try")
    setToken()
    const res = await userRequest.put(`/users/${user.userid}`, user);
    dispatch(updateSuccess(res));
    console.log("fin")
  } catch (err) {
    dispatch(updateFailure());
    console.log("Failed updated")
  }

};

export const getOrder = async (dispatch) => {
  dispatch(getOrderStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getOrderSuccess(res.data));
  } catch (err) {
    dispatch(getOrderFailure());
  }
};

export const register = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    dispatch(registerSuccess(res.data));
  } catch (err) {
    dispatch(registerFailure());
  }
};

export const createConversations = async (pair) => {
  console.log("pair create", pair)
  //console.log("dispatch",dispatch)

  //dispatch((addConversationsStart()));

  try {
    console.log("try")
    setToken()
    const res = await userRequest.post(`/conversations`, pair);
    //dispatch(addConversationsSuccess(res));
    console.log("fin createConversation",res)
    return res
  } catch (err) {
    //dispatch(addConversationsFailure());
    console.log("Failed create conversations")
  }

};


export const checkConversations = async (pair) => {
  console.log("pair check", pair)

  try {
    console.log("try")
    setToken()
    const res = await userRequest.get(`/conversations/find/${pair.senderId}/${pair.receiverId}`);
    console.log("fin checkConversation",res)
    return res
  } catch (err) {
    console.log("Failed create conversations")
  }

};

export const getUserByUsername = async (username) => {
  try {
    const res = await userRequest.get(`/users/find/username/${username}`);
    console.log(res)
    return res
  } catch (err) {
    console.log(err)
  }
};
// export const createMessage = async (pair) => {
//   console.log("message", message)

//   try {
//     console.log("try")
//     setToken()
//     const res = await userRequest.get(`/conversations/find/${pair.senderId}/${pair.receiverId}`);
//     console.log("fin createMessage",res)
//     return await res
//   } catch (err) {
//     console.log("Failed createMessage")
//   }

// };