import React from 'react';
import Search from '../components/examples/Search';
import Callout from '../components/examples/Callout';
import Layout from '../components/Layout';

const IndexPage = () => (
  <Layout>
    <h1>Use Cases</h1>
    <div>
      <h2>Search inputs and selects</h2>
      <Search />
      <h2>Callouts</h2>
      <Callout />
    </div>
  </Layout>
);

export default IndexPage;
