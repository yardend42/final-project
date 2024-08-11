import { loginAction } from "../Redux/AuthReducer";
import { store } from "../Redux/store";
import { decodeToken, isExpired } from "react-jwt";

let myDecoded: any = null;

export const checkJWT = () => {
  //check if we have jwt in storage
  let jwt = sessionStorage.getItem("jwt")?.split(" ")[1] || "";
  if (jwt.length < 10) {
    jwt = localStorage.getItem("jwt")?.split(" ")[1] || "";
  }
  
  if (jwt.length < 10) {
    return false;
  }

  //check if isExpired....
  if (isExpired(jwt)) {
    return false;
  }

  myDecoded = decodeToken(jwt);
  myDecoded.jwt = "Bearer " + jwt;
  store.dispatch(loginAction(myDecoded));

  return true;
};

export const getDecodedToken = () => myDecoded;
