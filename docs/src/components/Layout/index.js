import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Header from '../Header';
import styled from 'styled-components';

const Page = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-template-areas: 'header' 'content';
  grid-template-rows: auto 1fr;
  justify-items: center;

  & > *:nth-child(1) {
    grid-area: header;
  }
  & > *:nth-child(2) {
    grid-area: content;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  margin: auto;
`;

const Layout = ({ children }) => (
  <Page>
    <Helmet
      title="react-docked"
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />
    <Header siteTitle="react-docked" />
    <Content>{children}</Content>
  </Page>
);

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
