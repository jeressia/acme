import productsData from '../helpers/data/productsdata';
import typesData from '../helpers/data/typesData';
import categoriesData from '../helpers/data/categoriesData';
import util from '../helpers/util';


const showProducts = (products) => {
  let domString = '';
  Object.keys(products).forEach((product) => {
    domString += '<div class="col-4">';
    domString += `<div id='${product.id}' class="card">`;
    domString += '<div class="card-body">';
    console.error(product.name);
    domString += `<h3 class="card-title">${product.name}</h3>`;
    domString += `<h5 class="card-title">Category: ${product.categoryName}</h5>`;
    domString += `<h5 class="card-title">Type: ${product.typeName}</h5>`;
    domString += `<h5 class="card-title">${product.description}</h5>`;
    domString += '</div>';
    domString += '</div>';
    domString += '</div>';
  });
  util.printToDom('products', domString);
};

const initCards = () => {
  categoriesData.loadCategories()
    .then(resp => typesData.loadTypes(resp.data.categories))
    .then(resp => productsData.loadProducts(resp))
    .then(resp => showProducts(resp))
    .catch(err => console.error('error from initProducts requests', err));
};

export default { initCards };
