const {
  getAllProducts,
} = require('./products');

const resolvers = {
  Query: {
    getAllProducts
  },
};

module.exports = resolvers;
