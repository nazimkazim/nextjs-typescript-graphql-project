import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import 'isomorphic-unfetch'
import '../styles/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/shared/NavBar';
import Hero from '../components/shared/Hero';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql'
});


const MyApp = ({ Component, pageProps }) => {
  const isHomePage = () => Component.name === 'Home'
  return (
    <ApolloProvider client={ client }>
      <div className="portfolio-app">
        <Navbar />
        { Component.name === 'Home' && <Hero /> }
        <div className="container">
          <Component { ...pageProps } />
        </div>
        { isHomePage() &&
          <footer id="sticky-footer" className="py-4 bg-black text-white-50 py-3">
            <div className="container text-center">
              <small>Copyright &copy; Your Website</small>
            </div>
          </footer>
        }
      </div>
    </ApolloProvider>
  );
};

export default MyApp;
