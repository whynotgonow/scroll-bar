import React, { Component } from "react";
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import classnames from 'classnames';


function setTransform(style, v) {
  style.transform = v;
  style.webkitTransform = v;
  style.mozTransform = v;
}

function isTransformSupported(style) {
  return 'transform' in style ||
    'webkitTransform' in style ||
    'MozTransform' in style;
}


class ScrollBar extends Component {
  static propTypes = {
    onPrevClick: PropTypes.func,
    onNextClick: PropTypes.func,
    isIconOccupy: PropTypes.bool,
    barWidth: PropTypes.number,
    iconSize: PropTypes.number
  }

  static defaultProps = {
    isIconOccupy: false,
    barWidth: 58,
    iconSize: 16
  }

  constructor() {
    super();
    this.offset = 0;
    this.state = {
      componentH: 0,
      prev: true,
      next: true
    }
  }

  componentDidMount() {
    this.setNextPrev()
    this.getComponentH()
  }

  componentWillReceiveProps() {
    this.setNextPrev()
    this.getComponentH()
  }

  getComponentH = () => {
    if (this.refs.scroll) {
      let childEle = this.refs.scroll.firstElementChild;
      childEle && this.setState({
        componentH: this.getOffsetH(childEle)
      })
    }
  }

  /**
   * 根据传入element的宽度，这是prev next的显示
   */
  setNextPrev = () => {
    const scrollNode = this.refs.scroll;
    const scrollNodeWH = this.getOffsetW(scrollNode);
    const scrollWrapNode = this.refs.scrollWrap;
    const scrollWrapNodeWH = this.getOffsetW(scrollWrapNode);

    let { offset } = this;
    const minOffset = scrollWrapNodeWH - scrollNodeWH;
    let { next, prev } = this.state;

    if (minOffset >= 0) {
      // scrollWrap元素的宽度 大于 传入element的宽度的时候，偏移量为0
      next = false;
      this.setOffset(0, false);
      offset = 0;
    } else if (minOffset < offset) {
      // 偏移量(小于0)的长度(绝对值) 小于 两者差值(<0)的长度(绝对值)，此时，next是可点的
      next = true;
    } else {
      // 偏移量(小于0)的长度(绝对值) 大于 两者差值(<0)的长度(绝对值)，此时，next是不可点的
      next = false;
      this.setOffset(minOffset, false);
      offset = minOffset;
    }

    if (offset < 0) {
      prev = true;
    } else {
      prev = false;
    }

    this.setNext(next);
    this.setPrev(prev);
  }


  /**
   * 设置传入element的偏移量
   * @param offset 向左的偏移量
   * @param checkNextPrev 是否要检查next，prev的状态
   */
  setOffset = (offset, checkNextPrev = true) => {
    const target = Math.min(0, offset);

    if (this.offset !== target) {

      this.offset = target;
      let scrollOffset = {};
      const scrollStyle = this.refs.scroll.style;
      const transformSupported = isTransformSupported(scrollStyle);

      if (transformSupported) {
        scrollOffset = {
          value: `translate3d(${target}px,0,0)`,
        };
      } else {
        scrollOffset = {
          name: 'left',
          value: `${target}px`,
        };
      }

      if (transformSupported) {
        setTransform(scrollStyle, scrollOffset.value);
      } else {
        scrollStyle[scrollOffset.name] = scrollOffset.value;
      }

      if (checkNextPrev) {
        this.setNextPrev();
      }
    }
  }

  /**
   * 设置prev的state值
   */
  setPrev = (v) => {
    if (this.state.prev !== v) {
      this.setState({
        prev: v
      })
    }
  }

  /**
   * 设置next的state值
   */
  setNext = (v) => {
    if (this.state.next !== v) {
      this.setState({
        next: v
      })
    }
  }

  /**
   * 点击向左移动的函数
   */
  prev = (e) => {
    let { onPrevClick } = this.props;
    onPrevClick && onPrevClick(e);
    const scrollWrapNode = this.refs.scrollWrap;
    const scrollWrapNodeWH = this.getOffsetW(scrollWrapNode);
    const { offset } = this;
    this.setOffset(offset + scrollWrapNodeWH);
  }

  /**
   * 点击向右移动的函数
   */
  next = (e) => {
    let { onNextClick } = this.props;
    onNextClick && onNextClick(e);
    const scrollWrapNode = this.refs.scrollWrap;
    const scrollWrapNodeWH = this.getOffsetW(scrollWrapNode);
    const { offset } = this;
    this.setOffset(offset - scrollWrapNodeWH);
  }

  /**
   * 获取元素的宽度
   */
  getOffsetW = (node) => {
    let prop = 'offsetWidth';
    return node[prop];
  }

  /**
  * 获取元素的高度
  */
  getOffsetH = (node) => {
    let prop = 'offsetHeight';
    return node[prop];
  }

  render() {
    const { next, prev, componentH } = this.state;
    let { barWidth, iconSize, isIconOccupy } = this.props;
    let barW = barWidth > 16 ? barWidth : 16;

    let nextButton;
    let prevButton;
    const showNextPrev = prev || next;

    if (showNextPrev) {
      prevButton = prev ? (
        <span
          onClick={prev ? this.prev : null}
          unselectable="unselectable"
          style={{ height: `${componentH}px`, lineHeight: `${componentH}px`, width: `${barW}px` }}
          className={classnames("scrollable-bar-btn", "scrollable-bar-btn-prev", {
            "scrollable-bar-btn-disabled": !prev,
          })}
        >
          {/* <span className="scrollable-bar-icon scrollable-bar-icon-prev"> */}
          <span className="uf uf-arrow-left" style={{ fontSize: `${iconSize}px` }}></span>
          {/* </span> */}
        </span>
      ) : null;

      nextButton = next ? (
        <span
          onClick={next ? this.next : null}
          unselectable="unselectable"
          style={{ height: `${componentH}px`, lineHeight: `${componentH}px`, width: `${barW}px` }}
          className={classnames("scrollable-bar-btn", "scrollable-bar-btn-next", {
            "scrollable-bar-btn-disabled": !next,
          })}
        >
          {/* <span className="scrollable-bar-icon scrollable-bar-icon-next"> */}
          <span className="uf uf-arrow-right" style={{ fontSize: `${iconSize}px` }}></span>
          {/* </span> */}
        </span>
      ) : null;
    }

    let Content = this.props.children
    return (
      <div
        className='scrollable-bar-container scrollable-bar-container-scrolling'
        style={{ padding: isIconOccupy ? `0 ${barWidth}px` : "0" }}
        key="container"
        ref="container"
      >
        {prevButton}
        {nextButton}
        <div className='scrollable-bar-wrap' ref="scrollWrap">
          <div className='scrollable-bar-scroll'>
            <div className='scrollable-bar-content' ref="scroll">
              {Content}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ScrollBar;