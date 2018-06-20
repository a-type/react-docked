import styled from 'styled-components';

export default styled.ul`
  display: flex;
  flex-direction: column;
  list-style-type: none;
  background: var(--color-white);
  padding: 16px;
  margin: 5px 0 0 0;
  max-height: 350px;
  overflow-y: auto;
  border-radius: 8px;

  & > li {
    user-select: none;
    cursor: pointer;
    padding: 8px;
    border-bottom: 1px solid var(--color-dark);
  }
`;
