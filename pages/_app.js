import React from 'react';
import '../styles/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

function _app({ Component, pageProps }) {
  return <Component { ...pageProps } />;
}

export default _app;
