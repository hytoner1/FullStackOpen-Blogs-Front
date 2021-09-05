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
    headers: {Authorization: token}
  };

  const res = await axios.post(baseUrl, newObj, conf);
  return res.data;
};

const update = async (id, newObj) => {
  const conf = {
    headers: {Authorization: token}
  };

  const res = await axios.put(baseUrl + '/' + id, newObj, conf);
  return res.data;
};

const remove = async (id) => {
  const conf = {
    headers: {Authorization: token}
  };

  const res = await axios.delete(baseUrl + '/' + id, conf);
  return res.data;
};

export default {getAll, create, update, setToken, remove};