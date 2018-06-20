import styled from 'styled-components';

export default styled.button`
  border: 0;
  border-radius: 8px;
  background: var(--color-primary);
  color: var(--color-white);
  padding: 16px;
  cursor: pointer;

  &:hover,
  &:focus {
    background: var(--color-primary-dark);
  }

  &:focus,
  &:active {
    outline: none;
  }
`;
