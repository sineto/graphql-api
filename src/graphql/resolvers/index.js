const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('./products');

const resolvers = {
  Query: {
    getAllProducts,
    getProductById,
  },

  Mutation: {
    createProduct,
    updateProduct,
    deleteProduct
  }
};

module.exports = resolvers;
