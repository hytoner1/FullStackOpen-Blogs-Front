import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = newToken => {
  token = 'bearer ' + newToken;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = async newObj => {
  const conf = {
    header: {Authorization: token}
  };

  const res = await axios.post(baseUrl, newObj, conf);
  return res.data;
};

const update = (id, newObj) => {
  const req = axios.put(baseUrl + '/' + id, newObj);
  return req.then(response => response.data);
};

export default {getAll, create, update, setToken};