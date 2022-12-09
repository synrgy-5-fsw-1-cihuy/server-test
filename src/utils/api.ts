import axios from "axios";

axios.defaults.baseURL = process.env.API_HOST ?? "https://jsonplaceholder.typicode.com";

const getAllCar = () => {
  return null;
};

const getCarById = () => {
  return null;
};

export { getAllCar, getCarById };
