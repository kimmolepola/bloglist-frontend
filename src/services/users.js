import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_BACKEND}/api/users`;

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};
export default { getAll };
