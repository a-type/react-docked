// @flow
import React, { type Node } from 'react';
import {
  type Point,
  type Attachment,
  type Alignment,
  type DockedContainerInfo,
} from './types';

const getPositionalStyles = ({
  attachment,
  anchorPoint,
  alignment,
  anchorEdgeLength,
}) => {
  switch (attachment) {
    case 'left':
      switch (alignment) {
        case 'end':
          return {
            bottom: anchorPoint.bottom - anchorEdgeLength / 2,
            right: anchorPoint.right,
          };
        case 'center':
          return {
            top: anchorPoint.top,
            right: anchorPoint.right,
            transform: 'translateY(-50%)',
          };
        default:
          return {
            top: anchorPoint.top - anchorEdgeLength / 2,
            right: anchorPoint.right,
          };
      }
    case 'right':
      switch (alignment) {
        case 'end':
          return {
            bottom: anchorPoint.bottom - anchorEdgeLength / 2,
            left: anchorPoint.left,
          };
        case 'center':
          return {
            top: anchorPoint.top,
            left: anchorPoint.left,
            transform: 'translateY(-50%)',
          };
        default:
          return {
            top: anchorPoint.top - anchorEdgeLength / 2,
            left: anchorPoint.left,
          };
      }
    case 'top':
      switch (alignment) {
        case 'end':
          return {
            bottom: anchorPoint.bottom,
            right: anchorPoint.right - anchorEdgeLength / 2,
          };
        case 'center':
          return {
            bottom: anchorPoint.bottom,
            left: anchorPoint.left,
            transform: 'translateX(-50%)',
          };
        default:
          return {
            bottom: anchorPoint.bottom,
            left: anchorPoint.left - anchorEdgeLength / 2,
          };
      }
    default:
      switch (alignment) {
        case 'end':
          return {
            top: anchorPoint.top,
            right: anchorPoint.right - anchorEdgeLength / 2,
          };
        case 'center':
          return {
            top: anchorPoint.top,
            left: anchorPoint.left,
            transform: 'translateX(-50%)',
          };
        default:
          return {
            top: anchorPoint.top,
            left: anchorPoint.left - anchorEdgeLength / 2,
          };
      }
  }
};

const getSizeStyles = ({
  attachment,
  anchorPoint,
  alignment,
  availableSpace,
  availableOrthogonalSpace,
  anchorEdgeLength,
}) => {
  switch (alignment) {
    case 'stretch':
      switch (attachment) {
        case 'left':
        case 'right':
          return { height: anchorEdgeLength, width: 'auto' };
        default:
          return { width: anchorEdgeLength, height: 'auto' };
      }
    default:
      switch (attachment) {
        case 'left':
        case 'right':
          return { maxHeight: availableOrthogonalSpace, width: 'auto' };
        default:
          return { maxWidth: availableOrthogonalSpace, height: 'auto' };
      }
  }
};

export type DockedContentRenderFunction = (info: DockedContainerInfo) => Node;

export type DockedContainerProps = DockedContainerInfo & {
  children: Node | DockedContentRenderFunction,
};

export type DockedContainerState = {
  style: {},
};

export default class DockedContainer extends React.PureComponent<
  DockedContainerProps,
  DockedContainerState,
> {
  static getDerivedStateFromProps(props: DockedContainerProps) {
    return {
      style: {
        position: 'absolute',
        ...getPositionalStyles(props),
        ...getSizeStyles(props),
        ...props.extraStyle,
      },
    };
  }

  state = { style: {} };

  renderChildren = () => {
    const { children, ...rest } = this.props;
    if (typeof children === 'function') {
      return children(rest);
    }
    return children;
  };

  render() {
    const { style } = this.state;

    return (
      <div className="Docked--Container" style={style}>
        {this.renderChildren()}
      </div>
    );
  }
}
