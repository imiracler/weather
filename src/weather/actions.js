import {FETCH_STARTED, FETCH_SUCCESS, FETCH_FAILURE} from './actionTypes.js';

export const fetchWeather = (data, periods) => {
  const apiUrl = `http://118.25.135.109/music/lottery`;
  return {
    promise: fetch(apiUrl,
        {
          method: 'POST',
          //mode: "cors",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
          },
          body: JSON.stringify({"ids":data, "periods": periods})
        }
      ).then(response => {
      if (response.status !== 200) {
        throw new Error('Fail to get response with status');
      }
      return response.json().then( data =>
        data["data"]
      );
    }),
    types: [FETCH_STARTED, FETCH_SUCCESS, FETCH_FAILURE]
  };
}
