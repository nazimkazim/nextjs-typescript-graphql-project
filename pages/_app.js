import App from 'next/app'
import React from 'react';
import '../styles/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/shared/NavBar';
import Hero from '../components/shared/Hero';


const MyApp = ({ Component, pageProps }) => {

  return (
    <div className="portfolio-app">
      <Navbar />
      {Component.name === 'Home' && <Hero /> }
      <div className="container">
        <Component { ...pageProps } />
      </div>
    </div>
  );
};

MyApp.getInitialProps = async (context) => {
  const intialProps = App.getInitialProps && await App.getInitialProps(context);
  return {
    pageProps: {
      appData: 'Hello app compnoent', ...intialProps.pageProps
    }
  };
};

export default MyApp;
