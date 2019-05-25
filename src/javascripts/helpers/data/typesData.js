import axios from 'axios';

const loadTypes = () => axios.get('../db/types.json');

export default { loadTypes };
