import axios from 'axios';

const loadProducts = () => axios.get('../db/products.json');

export default { loadProducts };
