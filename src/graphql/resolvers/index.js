const {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct
} = require('./products');

const resolvers = {
  Query: {
    getAllProducts,
    getProductById,
  },

  Mutation: {
    createProduct,
    deleteProduct
  }
};

module.exports = resolvers;
