import React from 'react';
import Button from '../../Button';
import Docked, { middleware } from '../../../../../src';
import styled from 'styled-components';

const CalloutContent = styled.div`
  color: var(--color-white);
  padding: 8px;
`;

const balloon = middleware.balloon({ color: 'var(--color-secondary)' });

export default class DockedCallout extends React.PureComponent {
  state = {
    show: false,
  };

  toggle = () => this.setState(({ show }) => ({ show: !show }));

  render() {
    return (
      <Docked
        middleware={balloon}
        attachment={['right', 'left', 'top', 'bottom']}
        alignment="center"
      >
        {({ anchorRef, renderDocked }) => (
          <React.Fragment>
            <Button innerRef={anchorRef} onClick={this.toggle}>
              Toggle
            </Button>
            {this.state.show &&
              renderDocked(<CalloutContent>Callout content!</CalloutContent>)}
          </React.Fragment>
        )}
      </Docked>
    );
  }
}
