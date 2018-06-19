// @flow
import React, { type Node } from 'react';
import { type Point, type Attachment, type Alignment } from './types';

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
            top: anchorPoint.top + anchorEdgeLength / 2,
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
    case 'right':
      switch (alignment) {
        case 'end':
          return {
            top: anchorPoint.top + anchorEdgeLength / 2,
            right: anchorPoint.left,
          };
        case 'center':
          return {
            top: anchorPoint.top,
            right: anchorPoint.left,
            transform: 'translateY(-50%)',
          };
        default:
          return {
            top: anchorPoint.top - anchorEdgeLength / 2,
            right: anchorPoint.left,
          };
      }
    case 'top':
      switch (alignment) {
        case 'end':
          return {
            bottom: anchorPoint.top,
            left: anchorPoint.left + anchorEdgeLength / 2,
          };
        case 'center':
          return {
            bottom: anchorPoint.top,
            left: anchorPoint.left,
            transform: 'translateX(-50%)',
          };
        default:
          return {
            bottom: anchorPoint.top,
            left: anchorPoint.left - anchorEdgeLength / 2,
          };
      }
    default:
      switch (alignment) {
        case 'end':
          return {
            top: anchorPoint.top,
            right: anchorPoint.left + anchorEdgeLength / 2,
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

export type DockedContainerProps = {
  anchorPoint: Point,
  attachment: Attachment,
  alignment: Alignment,
  anchorEdgeLength: number,
  availableSpace: number,
  availableOrthogonalSpace: number,
  children: Node,
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
      },
    };
  }

  state = { style: {} };

  render() {
    const { children } = this.props;
    const { style } = this.state;

    return (
      <div className="Docked--Container" style={style}>
        {children}
      </div>
    );
  }
}
