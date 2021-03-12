const express = require('express');
const next = require('next');
const { buildSchema } = require('graphql');
const graphlHTTP = require('express-graphql');
const graphqlHTTP = require('express-graphql');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const data = {
  portfolios: [
    {
      _id: "sad87daasdhjdjsb",
      title: 'Job in Netcentric',
      company: 'Netcentric',
      companyWebsite: 'www.google.com',
      location: 'Spain, Barcelona',
      jobTitle: 'Engineer',
      description: 'Doing something, programing....',
      startDate: '01/01/2014',
      endDate: '01/01/2016'
    },
    {
      _id: "da789ad1",
      title: 'Job in Siemens',
      company: 'Siemens',
      companyWebsite: 'www.google.com',
      location: 'Slovakia, Kosice',
      jobTitle: 'Software Engineer',
      description: 'Responsoble for parsing framework for JSON medical data.',
      startDate: '01/01/2011',
      endDate: '01/01/2013'
    },
    {
      _id: "sadcxv9",
      title: 'Work in USA',
      company: 'WhoKnows',
      companyWebsite: 'www.google.com',
      location: 'USA, Montana',
      jobTitle: 'Housekeeping',
      description: 'So much responsibility....Overloaaaaaad',
      startDate: '01/01/2010',
      endDate: '01/01/2011'
    }
  ]
};

app.prepare().then(() => {
  const server = express();

  // Construct a chema using graphql schema language
  const schema = buildSchema(`
    type Portfolio {
      _id: ID,
      title:String,
      company:String,
      companyWebsite:String,
      location:String,
      jobTitle:String,
      description:String,
      startDate:String,
      endDate:String,
    }
    type Query {
      portfolio(id:ID): Portfolio
      portfolios: [Portfolio]
    }
  `);

  // The root provides a resolver for each API endpoint
  const root = {
    portfolio: ({ id }) => {
      const portfolio = data.portfolios.find(p => p._id === id);
      return portfolio;
    },
    portfolios: () => {
      return data.portfolios;
    }
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