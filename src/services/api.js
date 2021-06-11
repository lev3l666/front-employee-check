import axios from 'axios';

const apiUrl = 'http://localhost:3010/api/';

let header = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  
  axios.interceptors.response.use(response => {
    return response;
  }, error => {
    return Promise.reject(error);
  });
    
  const get = async function (endpoint, params) {
    return new Promise(async (resolve) => {
      if (params) {
        resolve(axios.get(`${apiUrl + endpoint}/${params}`, {headers: header}));
      } else {
        resolve(axios.get(apiUrl + endpoint, {headers: header}));
      }
    });
  };
  
  const post = async function (endpoint, params) {
    if (params) {
      return axios.post(apiUrl + endpoint, params, {headers: header});
    }
    return axios.post(apiUrl + endpoint, '', {headers: header});
  };
  
  const put = function (endpoint, params) {
    return new Promise(async (resolve) => {
      axios
        .put(apiUrl + endpoint, params, {headers: header})
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
  
        });
    });
  };

export {post, get, put, apiUrl };