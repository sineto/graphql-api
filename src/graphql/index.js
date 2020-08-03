const { ApolloServer } = require('apollo-server-express');
const { loadSchemaSync } = require('@graphql-tools/load');
const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader');
const { addResolversToSchema } = require('@graphql-tools/schema');

const { join } = require('path');
const resolvers = require('./resolvers');

const typeDefs = loadSchemaSync(join(__dirname, './schemas/*.graphql'), {
  loaders: [ new GraphQLFileLoader() ]
});

const schema = addResolversToSchema({
  schema: typeDefs,
  resolvers
});

const gqlServer = new ApolloServer({ schema });
module.exports = gqlServer;
