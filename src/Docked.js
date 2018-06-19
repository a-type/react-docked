// @flow
import React, { type Component, type Node } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import DockedContainer, { type DockedContainerProps } from './DockedContainer';
import { type Point, type Attachment, type Alignment, type DockedMiddlewareFunction } from './types';

export type RenderPropArgs = {
  anchorRef(el: Element): mixed,
  renderDocked(node: Node): Node,
};

export type DockedProps = {
  attachment: Attachment | Attachment[],
  alignment: Alignment,
  desiredSpace: number,
  children(args: RenderPropArgs): Node,
  contextElementSelector: string,
  containerStyle: {},
  middleware: DockedMiddlewareFunction,
  Container: Component<DockedContainerProps>,
  environment: {
    window: any,
  },
};

type DockedState = {
  anchorElement: ?HTMLElement,
  contextElement: ?HTMLElement,
  anchorPoint: ?Point,
  currentAttachment: Attachment,
  anchorEdgeLength: number,
  availableSpace: number,
  availableOrthogonalSpace: number,
};

const getPrimaryAttachment = (
  attachment: Attachment | Attachment[],
): Attachment => {
  if (attachment instanceof Array) {
    return attachment[0];
  }
  return attachment;
};

/**
 * The Docked component renders an absolutely-positioned 'docked'
 * overlay anchored against a target element. It was designed to
 * render 'dropdown' style lists for search/select inputs. It uses
 * React portals to render the overlay element in relation to the
 * screen-space position of the anchor element. Supports polling
 * for position changes in more advanced cases where layout is not
 * reliably static.
 */
export default class Docked extends React.Component<DockedProps, DockedState> {
  static defaultProps = {
    attachment: 'bottom',
    desiredSpace: 0,
    contextElementSelector: 'body',
    containerStyle: {},
    middleware: null,
    Container: DockedContainer,
    environment: { window },
  };

  state = {
    anchorElement: null,
    contextElement: null,
    anchorPoint: null,
    currentAttachment: getPrimaryAttachment(this.props.attachment),
    anchorEdgeLength: 0,
    availableSpace: 0,
    availableOrthogonalSpace: 0,
  };

  handleResize = () => {
    this.updatePlacement(this.state.anchorElement);
  };
  resizeObserver = new window.ResizeObserver(this.handleResize);

  componentDidMount() {
    this.resizeObserver.observe(document.body);
  }

  componentWillUnmount() {
    if (this.state.anchorElement) {
      this.resizeObserver.unobserve(this.state.anchorElement);
    }
  }

  onAnchorRef = (el: Element) => {
    const { environment, contextElementSelector } = this.props;

    const contextElement =
      environment.window.document.querySelector(contextElementSelector) ||
      environment.window.document.body;

    // unobserve old anchorElement
    if (this.state.anchorElement) {
      this.resizeObserver.unobserve(this.state.anchorElement);
    }

    const anchorElement = ReactDOM.findDOMNode(el);
    if (anchorElement === null || anchorElement instanceof HTMLElement) {
      if (anchorElement) {
        this.resizeObserver.observe(anchorElement);
      }

      this.setState({ anchorElement, contextElement });

      this.updatePlacement(anchorElement);
    }
  };

  getWindowBounds = () => {
    const { environment: { window } } = this.props;
    return {
      scrollLeft: window.scrollX,
      scrollTop: window.scrollY,
      clientWidth: window.innerWidth || window.document.documentElement.clientWidth || window.document.body.clientWidth,
      clientHeight: window.innerHeight || window.document.documentElement.clientHeight || window.document.body.clientHeight,
      scrollWidth: window.document.documentElement.scrollWidth,
      scrollHeight: window.document.documentElement.scrollHeight,
    };
  }

  updatePlacement = (anchorElement: ?HTMLElement) => {
    const { attachment, desiredSpace, alignment, environment } = this.props;
    if (!anchorElement) {
      return;
    }

    // get some basic values to work with

    const anchorBounds = anchorElement.getBoundingClientRect();
    const { scrollLeft, scrollTop, clientWidth, clientHeight, scrollWidth, scrollHeight } = this.getWindowBounds();
    console.info(this.getWindowBounds());

    console.info(anchorBounds);

    const anchorTop = anchorBounds.top - scrollTop;
    const anchorLeft = anchorBounds.left - scrollLeft;
    const anchorBottom = anchorTop + anchorBounds.height;
    const anchorRight = anchorLeft + anchorBounds.width;
    const anchorHorizontalCenter = anchorLeft + anchorBounds.width / 2;
    const anchorVerticalCenter = anchorTop + anchorBounds.height / 2;

    const anchorPoints: { [Attachment]: { top: number, left: number } } = {
      top: {
        left: anchorHorizontalCenter,
        top: anchorTop,
      },
      bottom: {
        left: anchorHorizontalCenter,
        top: anchorBottom,
      },
      left: {
        left: anchorLeft,
        top: anchorVerticalCenter,
      },
      right: {
        left: anchorRight,
        top: anchorVerticalCenter,
      },
    };
    console.info(anchorPoints);

    const surroundingSpace: { [Attachment]: number } = {
      bottom: clientHeight - anchorBottom,
      top: anchorTop,
      left: anchorLeft,
      right: clientWidth - anchorRight,
    };
    console.info(surroundingSpace);

    // iterate through attachments until one with preferred space is available
    const priorityListOfAttachments: Attachment[] = [].concat(attachment);
    const chosenAttachment: Attachment =
      priorityListOfAttachments.find(
        attachment => surroundingSpace[attachment] >= desiredSpace,
      ) || priorityListOfAttachments[0];

    const anchorEdgeLength: number = ['left', 'right'].includes(
      chosenAttachment,
    )
      ? anchorBounds.height
      : anchorBounds.width;

    const orthogonalSpace = (() => {
      switch (alignment) {
        case 'start':
          switch (chosenAttachment) {
            case 'bottom':
            case 'top':
              return anchorBounds.width + surroundingSpace.right;
            default:
              return anchorBounds.height + surroundingSpace.bottom;
          }
        case 'end':
          switch (chosenAttachment) {
            case 'bottom':
            case 'top':
              return anchorBounds.width + surroundingSpace.left;
            default:
              return anchorBounds.height + surroundingSpace.top;
          }
        default:
          switch (chosenAttachment) {
            case 'bottom':
            case 'top':
              return clientWidth;
            default:
              return clientHeight;
          }
      }
    })();
    console.info(orthogonalSpace);

    const addRightAndBottom = (point: { left: number, top: number }): Point => ({
      ...point,
      right: scrollWidth - point.left,
      bottom: scrollHeight - point.top,
    });
    const anchorPoint = addRightAndBottom(anchorPoints[chosenAttachment]);
    console.info(anchorPoint);

    this.setState({
      anchorPoint,
      availableSpace: surroundingSpace[chosenAttachment],
      anchorEdgeLength,
      currentAttachment: chosenAttachment,
      availableOrthogonalSpace: orthogonalSpace,
    });
  };

  getContainerProps = () => ({
    anchorPoint: this.state.anchorPoint,
    attachment: this.state.currentAttachment,
    alignment: this.props.alignment,
    anchorEdgeLength: this.state.anchorEdgeLength,
    availableSpace: this.state.availableSpace,
    availableOrthogonalSpace: this.state.availableOrthogonalSpace,
    extraStyle: this.props.containerStyle,
  });

  renderDocked = (node: Node) => {
    const { Container, middleware } = this.props;

    const containerProps = this.getContainerProps();

    return (
      this.state.contextElement &&
      ReactDOM.createPortal(
        <Container {...containerProps}>{middleware ? middleware(node) : node}</Container>,
        this.state.contextElement,
      )
    );
  };

  render() {
    const provided = {
      anchorRef: this.onAnchorRef,
      renderDocked: this.renderDocked,
    };
    return this.props.children(provided);
  }
}
