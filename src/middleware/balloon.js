import React, { type Node } from 'react';
import { type DockedContainerInfo } from '../types';

/**
 * This is really meant more as an example of such an implementation,
 * since you'll probably want to style things yourself.
 */

const OUTER_CLASS = 'Docked--Balloon--Outer';
const ARROW_CLASS = 'Docked--Balloon--Arrow';
const CONTENT_CLASS = 'Docked--Balloon--Content';

const TRIANGLE_SIZE = 10;
const BACKGROUND_COLOR = 'cyan';
const TRIANGLE_CORNER_OFFSET = 5;

const flexMap = {
  left: 'row-reverse',
  right: 'row',
  top: 'column-reverse',
  bottom: 'column',
};

const alignmentMap = {
  stretch: 'stretch',
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
};

export type BalloonConfig = {
  arrowSize: number,
  color: string,
  arrowCornerOffset: number,
  outerClassName: string,
  arrowClassName: string,
  contentClassName: string,
};

export default (config: BalloonConfig = {}) => {
  const defaultedConfig = {
    arrowSize: TRIANGLE_SIZE,
    arrowCornerOffset: TRIANGLE_CORNER_OFFSET,
    color: BACKGROUND_COLOR,
    outerClassName: OUTER_CLASS,
    arrowClassName: ARROW_CLASS,
    contentClassName: CONTENT_CLASS,
    ...config,
  };

  const triangleStyles = (info: DockedContainerInfo) => {
    switch (info.attachment) {
      case 'bottom':
        return {
          borderLeft: `${defaultedConfig.arrowSize}px solid transparent`,
          borderRight: `${defaultedConfig.arrowSize}px solid transparent`,
          borderBottom: `${defaultedConfig.arrowSize}px solid ${defaultedConfig.color}`,
        };
      case 'top':
        return {
          borderLeft: `${defaultedConfig.arrowSize}px solid transparent`,
          borderRight: `${defaultedConfig.arrowSize}px solid transparent`,
          borderTop: `${defaultedConfig.arrowSize}px solid ${defaultedConfig.color}`,
        };
      case 'right':
        return {
          borderTop: `${defaultedConfig.arrowSize}px solid transparent`,
          borderBottom: `${defaultedConfig.arrowSize}px solid transparent`,
          borderRight: `${defaultedConfig.arrowSize}px solid ${defaultedConfig.color}`,
        };
      case 'left':
        return {
          borderTop: `${defaultedConfig.arrowSize}px solid transparent`,
          borderBottom: `${defaultedConfig.arrowSize}px solid transparent`,
          borderLeft: `${defaultedConfig.arrowSize}px solid ${defaultedConfig.color}`,
        }
    }
  };
  
  return (children: Node) => (info: DockedContainerInfo): Node => (
    <div className={defaultedConfig.outerClassName} style={{
      display: 'flex',
      flexDirection: flexMap[info.attachment],
    }}>
      <div className={defaultedConfig.arrowClassName} style={{
        alignSelf: alignmentMap[info.alignment],
        margin: ['left', 'right'].includes(info.attachment) ? `${defaultedConfig.arrowCornerOffset}px 0` : `0 ${defaultedConfig.arrowCornerOffset}px`,
        width: 0,
        height: 0,
        ...triangleStyles(info), 
      }}/>
      <div className={defaultedConfig.contentClassName} style={{ background: defaultedConfig.color }}>
        {children}
      </div>
    </div>
  );
};
