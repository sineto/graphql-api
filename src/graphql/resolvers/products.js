const db = require('../../database/pg.config');
const Products = require('../../services/pg/product.service')(db);

const getAllProducts = async (context, { options }) => {
  const { limit, offset, orderBy, order, categoryId } = options || {};

  let products;
  if (categoryId) {
    products = await Products.findAllByCategory(categoryId);
    return products;
  }

  products = await Products.findAll({ limit, offset, orderBy, order });
  return products;
}

const getProductById = async (context, { id }) => {
  const product = await Products.findById(id);
  return product;
};

const createProduct = async (context, { input }) => {
  const { name, price } = input;
  const product = await Products.create([name, price]);
  return product;
};

const updateProduct = async (context, {id, data}) => {
  const { name, price } = data;
  const product = await Products.update(id, [name, price]);
  return product;
};

const deleteProduct = async (context, { id }) => {
  await Products.destroy(id);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};

