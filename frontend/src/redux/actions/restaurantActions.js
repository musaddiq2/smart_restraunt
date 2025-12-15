import axios from "../../api/axiosInstance";

export const FETCH_RESTAURANTS_REQUEST = "FETCH_RESTAURANTS_REQUEST";
export const FETCH_RESTAURANTS_SUCCESS = "FETCH_RESTAURANTS_SUCCESS";
export const FETCH_RESTAURANTS_FAIL = "FETCH_RESTAURANTS_FAIL";

export const fetchRestaurants = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_RESTAURANTS_REQUEST });

    const { data } = await axios.get("/restaurants");

    dispatch({
      type: FETCH_RESTAURANTS_SUCCESS,
      payload: data.data, // ensure backend returns data.data
    });
  } catch (error) {
    dispatch({
      type: FETCH_RESTAURANTS_FAIL,
      payload: error.response?.data?.message || "Failed to load restaurants",
    });
  }
};
