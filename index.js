const express = require('express');
const bodyParser = require('body-parser');

const gqlServer = require('./src/graphql');

const app = express();

app.listen()
app.use(bodyParser.json());

gqlServer.applyMiddleware({ app });

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3001;
const HOST = process.env.HOST || 'localhost';

app.listen(PORT, HOST, () => {
  console.log(`Server started at http://${HOST}:${PORT}`);
});
