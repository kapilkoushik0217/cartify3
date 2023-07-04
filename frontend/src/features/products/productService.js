import axios from "axios";
import { base_url, config } from "../../utils/axiosconfig";

const getProducts = async () => {
  const response = await axios.get(`${base_url}product/`);
  if (response.data) {
    return response.data;
  }
};

const getProduct = async (id) => {
  const response = await axios.get(`${base_url}product/${id}`, config);
  if (response.data) {
    return response.data;
  }
};
const addToWishlist = async (id) => {
  const response = await axios.put(
    `${base_url}product/wishlist`,
     {id} ,
    config
    
  );
  if (response.data) {
    return response.data;
  }
};
const productService = {
  getProducts,
  getProduct,
  addToWishlist,
};

export default productService;
