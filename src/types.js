import { type Node } from 'react';

export type Point = {
  top: number,
  left: number,
  bottom: number,
  right: number,
};

export type Attachment = 'top' | 'bottom' | 'left' | 'right';
export type Alignment = 'start' | 'end' | 'center' | 'stretch';

export type DockedContainerInfo = {
  anchorPoint: Point,
  attachment: Attachment,
  alignment: Alignment,
  anchorEdgeLength: number,
  availableSpace: number,
  availableOrthogonalSpace: number,
  extraStyle: {},
};

export type MiddlewareFunction = (info: DockedContainerInfo) => Node;
