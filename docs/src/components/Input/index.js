import styled from 'styled-components';

export default styled.input`
  color: var(--color-white);
  background: var(--color-dark);
  border: 0;
  border-radius: 8px;
  padding: 16px;
  width: 100%;

  &:focus,
  &:active {
    outline: none;
  }
`;
