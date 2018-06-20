import React from 'react';
import Link from '../Link';
import styled from 'styled-components';

const Container = styled.div`
  background: var(--color-white);
  color: var(--color-dark);
  padding: 20px;

  & > h1 {
    color: inherit;
    margin: 0;
  }
`;

const Header = ({ siteTitle }) => (
  <div className="header-container">
    <h1 className="header-title">
      <Link to="/" className="header-link">
        {siteTitle}
      </Link>
    </h1>
  </div>
);

export default Header;
