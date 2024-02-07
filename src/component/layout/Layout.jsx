import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Body } from 'styles/SharedStyle';

const Layout = ({ children }) => {
  return (
    <Body>
      <Header />
      {children}
      <Footer />
    </Body>
  );
};

export default Layout;
