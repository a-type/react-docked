import React from 'react';
import Docked from '../../../../../src';
import Downshift from 'downshift';
import Input from '../../Input';
import Dropdown from './Dropdown';

const options = new Array(50).fill(null).map((_, i) => `Item ${i}`);

export default class DockedSearch extends React.PureComponent {
  state = {
    value: null,
  };

  handleChange = value => this.setState({ value });

  render() {
    return (
      <Downshift onChange={this.handleChange}>
        {({
          getInputProps,
          getItemProps,
          getMenuProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItem,
        }) => (
          <div style={{ width: '100%' }}>
            <Docked
              attachment={['bottom', 'top']}
              alignment="stretch"
              desiredSize={400}
            >
              {({ anchorRef, renderDocked }) => (
                <React.Fragment>
                  <Input
                    {...getInputProps({
                      refKey: 'innerRef',
                      innerRef: anchorRef,
                      placeholder: 'Search items...',
                      type: 'text',
                      className: 'input-search',
                    })}
                  />
                  {isOpen &&
                    renderDocked(
                      <Dropdown
                        className="dropdown-search"
                        {...getMenuProps({ refKey: 'innerRef' })}
                      >
                        {options
                          .filter(
                            item =>
                              !inputValue ||
                              item
                                .toLowerCase()
                                .includes(inputValue.toLowerCase()),
                          )
                          .map((item, index) => (
                            <li
                              className={`item-search ${
                                highlightedIndex === index ? 'highlighted' : ''
                              }`}
                              {...getItemProps({
                                key: item,
                                index,
                                item,
                              })}
                            >
                              {item}
                            </li>
                          ))}
                      </Dropdown>,
                    )}
                </React.Fragment>
              )}
            </Docked>
          </div>
        )}
      </Downshift>
    );
  }
}
