const express = require('express');
const next = require('next');
const { buildSchema } = require('graphql');
const graphlHTTP = require('express-graphql');
const graphqlHTTP = require('express-graphql');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// resolvers
const {portfolioResolvers} = require('./graphql/resolver')
const {portfolioTypes} = require('./graphql/types')

app.prepare().then(() => {
  const server = express();

  // Construct a chema using graphql schema language
  const schema = buildSchema(`
    ${portfolioTypes}
    type Query {
      portfolio(id:ID): Portfolio
      portfolios: [Portfolio]
    }
    type Mutation {
      createPortfolio(input: PortfolioInput): Portfolio
    }
  `);

  // The root provides a resolver for each API endpoint
  const root = {
    ...portfolioResolvers
  };

  server.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  }));

  server.get('/a', (req, res) => {
    return app.render(req, res, '/a', req.query);
  });

  server.get('/b', (req, res) => {
    return app.render(req, res, '/b', req.query);
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});