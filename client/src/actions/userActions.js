import axios from "axios";
import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
} from "../constants/userConstants";

const url = "https://alfred-ai-server.onrender.com/api/v1";

export const getUser = () => async (dispatch) => {
  try {
    await axios
      .get(`${url}/login/success`, { withCredentials: true })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        dispatch({ type: LOGIN_SUCCESS, payload: res.data.user });
      });
  } catch (err) {
    dispatch({ type: LOGIN_FAIL, payload: err.res });
    console.log(err);
  }
};

export const logOut = (navigate) => async (dispatch) => {
  try {
    await axios.post(`${url}/logout`, {}, { withCredentials: true });
    localStorage.removeItem("user");
    navigate("/");
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (err) {
    console.log(err);
    dispatch({ type: LOGOUT_FAIL, payload: err.res.data.message });
  }
};
