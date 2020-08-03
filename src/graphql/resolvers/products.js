const db = require('../../database/pg.config');
const Products = require('../../services/pg/product.service')(db);

const getAllProducts = async (context, { options }) => {
  const { limit, offset, orderBy, order } = options || {};

  const products = await Products.findAll({ limit, offset, orderBy, order });
  console.log('getall', products);
  return products;
}

const createProduct = async (context, { input }) => {
  const { name, price } = input;
  const product = await Products.create([name, price]);
  return product;
};

module.exports = {
  getAllProducts,
  createProduct,
};

