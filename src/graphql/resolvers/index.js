const {
  getAllProducts,
  getProductById,
  createProduct,
} = require('./products');

const resolvers = {
  Query: {
    getAllProducts,
    getProductById,
  },

  Mutation: {
    createProduct,
  }
};

module.exports = resolvers;
