export const fetchDataRequest = () => ({
  type: "FETCH_DATA_REQUEST",
});

export const fetchDataSuccess = (data) => ({
  type: "FETCH_DATA_SUCCESS",
  payload: data,
});

export const fetchDataFailure = (error) => ({
  type: "FETCH_DATA_FAILURE",
  payload: error,
});

export const clearData = () => ({
  type: "CLEAR_DATA",
});

export const fetchData = (url) => {
  return async (dispatch) => {
      dispatch(fetchDataRequest());

      try {
          const response = await fetch(url);
          if (!response.ok) {
              throw new Error("Ошибка при загрузке данных");
          }
          const data = await response.json();
          dispatch(fetchDataSuccess(data));
      } catch (error) {
          dispatch(fetchDataFailure(error.message));
      }
  };
};
