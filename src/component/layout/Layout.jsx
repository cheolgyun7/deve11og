import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Wrapper } from 'styles/SharedStyle';

const Layout = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      {children}
      <Footer />
    </Wrapper>
  );
};

export default Layout;
