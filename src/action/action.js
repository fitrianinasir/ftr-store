import axios from "axios";
import { BASE_URL } from "../BASE_URL";

export const PRODUCTS = "PRODUCTS";

export const getProducts = () => {
  return (dispatch) => {
    // setLoading
    dispatch({
      type: PRODUCTS,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    // call API
    axios
      .get(`${BASE_URL}products/?categoryId=1`)
      .then((res) => {
        dispatch({
          type: PRODUCTS,
          payload: {
            loading: false,
            data: res.data,
            errorMessage: false
          }
        })
      })
      .catch((err) => {
        dispatch({
          type: PRODUCTS,
          payload: {
            loading: false,
            data: false,
            errorMessage: err.message
          }
        })
      });
  };
};
