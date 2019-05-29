import productsData from '../helpers/data/productsdata';
import typesData from '../helpers/data/typesData';
import categoriesData from '../helpers/data/categoriesData';
import util from '../helpers/util';


const showProducts = (products) => {
  let domString = '';
  products.forEach((product) => {
    domString += '<div class="col-4">';
    domString += `<div id='${product.id}' class="card">`;
    domString += '<div class="card-body">';
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

const smashFunction = (categories, initialProducts, types) => {
  const tempProducts = [];
  const products = [];
  Object.keys(initialProducts[0]).forEach(productKey => tempProducts.push(initialProducts[0][productKey]));
  tempProducts.forEach((p) => {
    const product = p;
    types.forEach((type) => {
      if (product.type === type.id) {
        product.typeName = type.name;
        categories.forEach((cat) => {
          if (type.category === cat.id) {
            product.categoryName = cat.name;
          }
        });
      }
    });
    products.push(product);
  });

  showProducts(products);
};

const initCards = () => {
  Promise.all([categoriesData.loadCategories(), typesData.loadTypes(), productsData.loadProducts()])
    .then((resp) => {
      const { categories } = resp[0].data;
      const { types } = resp[1].data;
      const { products } = resp[2].data;
      smashFunction(categories, products, types);
    })
    .catch(err => console.error('error from data', err));
};

export default { initCards };
