import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken;

// const TOKEN =
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     .accessToken || "";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
let TOKEN = currentUser?.accessToken;
console.log(TOKEN)

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
    
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}`},
});

export const setToken = async () => {
  console.log("trySetToken")
  try {
    let TOKEN = currentUser?.accessToken;
    console.log("SetTokenSuccess",TOKEN)

  } catch (err) {
  console.log("SetTokenFailed")
  }
};