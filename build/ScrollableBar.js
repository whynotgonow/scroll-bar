'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

function setTransform(style, v) {
  style.transform = v;
  style.webkitTransform = v;
  style.mozTransform = v;
}

function isTransformSupported(style) {
  return 'transform' in style || 'webkitTransform' in style || 'MozTransform' in style;
}

var ScrollBar = function (_Component) {
  _inherits(ScrollBar, _Component);

  function ScrollBar() {
    _classCallCheck(this, ScrollBar);

    var _this = _possibleConstructorReturn(this, _Component.call(this));

    _this.getComponentH = function () {
      if (_this.refs.scroll) {
        var childEle = _this.refs.scroll.firstElementChild;
        childEle && _this.setState({
          componentH: _this.getOffsetH(childEle)
        });
      }
    };

    _this.setNextPrev = function () {
      var scrollNode = _this.refs.scroll;
      var scrollNodeWH = _this.getOffsetW(scrollNode);
      var scrollWrapNode = _this.refs.scrollWrap;
      var scrollWrapNodeWH = _this.getOffsetW(scrollWrapNode);

      var offset = _this.offset;

      var minOffset = scrollWrapNodeWH - scrollNodeWH;
      var _this$state = _this.state,
          next = _this$state.next,
          prev = _this$state.prev;


      if (minOffset >= 0) {
        // scrollWrap元素的宽度 大于 传入element的宽度的时候，偏移量为0
        next = false;
        _this.setOffset(0, false);
        offset = 0;
      } else if (minOffset < offset) {
        // 偏移量(小于0)的长度(绝对值) 小于 两者差值(<0)的长度(绝对值)，此时，next是可点的
        next = true;
      } else {
        // 偏移量(小于0)的长度(绝对值) 大于 两者差值(<0)的长度(绝对值)，此时，next是不可点的
        next = false;
        _this.setOffset(minOffset, false);
        offset = minOffset;
      }

      if (offset < 0) {
        prev = true;
      } else {
        prev = false;
      }

      _this.setNext(next);
      _this.setPrev(prev);
    };

    _this.setOffset = function (offset) {
      var checkNextPrev = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var target = Math.min(0, offset);

      if (_this.offset !== target) {

        _this.offset = target;
        var scrollOffset = {};
        var scrollStyle = _this.refs.scroll.style;
        var transformSupported = isTransformSupported(scrollStyle);

        if (transformSupported) {
          scrollOffset = {
            value: 'translate3d(' + target + 'px,0,0)'
          };
        } else {
          scrollOffset = {
            name: 'left',
            value: target + 'px'
          };
        }

        if (transformSupported) {
          setTransform(scrollStyle, scrollOffset.value);
        } else {
          scrollStyle[scrollOffset.name] = scrollOffset.value;
        }

        if (checkNextPrev) {
          _this.setNextPrev();
        }
      }
    };

    _this.setPrev = function (v) {
      if (_this.state.prev !== v) {
        _this.setState({
          prev: v
        });
      }
    };

    _this.setNext = function (v) {
      if (_this.state.next !== v) {
        _this.setState({
          next: v
        });
      }
    };

    _this.prev = function (e) {
      var onPrevClick = _this.props.onPrevClick;

      onPrevClick && onPrevClick(e);
      var scrollWrapNode = _this.refs.scrollWrap;
      var scrollWrapNodeWH = _this.getOffsetW(scrollWrapNode);
      var offset = _this.offset;

      _this.setOffset(offset + scrollWrapNodeWH);
    };

    _this.next = function (e) {
      var onNextClick = _this.props.onNextClick;

      onNextClick && onNextClick(e);
      var scrollWrapNode = _this.refs.scrollWrap;
      var scrollWrapNodeWH = _this.getOffsetW(scrollWrapNode);
      var offset = _this.offset;

      _this.setOffset(offset - scrollWrapNodeWH);
    };

    _this.getOffsetW = function (node) {
      var prop = 'offsetWidth';
      return node[prop];
    };

    _this.getOffsetH = function (node) {
      var prop = 'offsetHeight';
      return node[prop];
    };

    _this.offset = 0;
    _this.state = {
      componentH: 0,
      prev: true,
      next: true
    };
    return _this;
  }

  ScrollBar.prototype.componentDidMount = function componentDidMount() {
    this.setNextPrev();
    this.getComponentH();
  };

  ScrollBar.prototype.componentWillReceiveProps = function componentWillReceiveProps() {
    this.setNextPrev();
    this.getComponentH();
  };

  /**
   * 根据传入element的宽度，这是prev next的显示
   */


  /**
   * 设置传入element的偏移量
   * @param offset 向左的偏移量
   * @param checkNextPrev 是否要检查next，prev的状态
   */


  /**
   * 设置prev的state值
   */


  /**
   * 设置next的state值
   */


  /**
   * 点击向左移动的函数
   */


  /**
   * 点击向右移动的函数
   */


  /**
   * 获取元素的宽度
   */


  /**
  * 获取元素的高度
  */


  ScrollBar.prototype.render = function render() {
    var _state = this.state,
        next = _state.next,
        prev = _state.prev,
        componentH = _state.componentH;
    var _props = this.props,
        barWidth = _props.barWidth,
        iconSize = _props.iconSize,
        isIconOccupy = _props.isIconOccupy;

    var barW = barWidth > 16 ? barWidth : 16;

    var nextButton = void 0;
    var prevButton = void 0;
    var showNextPrev = prev || next;

    if (showNextPrev) {
      prevButton = prev ? _react2["default"].createElement(
        'span',
        {
          onClick: prev ? this.prev : null,
          unselectable: 'unselectable',
          style: { height: componentH + 'px', lineHeight: componentH + 'px', width: barW + 'px' },
          className: (0, _classnames2["default"])("scrollable-bar-btn", "scrollable-bar-btn-prev", {
            "scrollable-bar-btn-disabled": !prev
          })
        },
        _react2["default"].createElement('span', { className: 'uf uf-arrow-left', style: { fontSize: iconSize + 'px' } })
      ) : null;

      nextButton = next ? _react2["default"].createElement(
        'span',
        {
          onClick: next ? this.next : null,
          unselectable: 'unselectable',
          style: { height: componentH + 'px', lineHeight: componentH + 'px', width: barW + 'px' },
          className: (0, _classnames2["default"])("scrollable-bar-btn", "scrollable-bar-btn-next", {
            "scrollable-bar-btn-disabled": !next
          })
        },
        _react2["default"].createElement('span', { className: 'uf uf-arrow-right', style: { fontSize: iconSize + 'px' } })
      ) : null;
    }

    var Content = this.props.children;
    return _react2["default"].createElement(
      'div',
      {
        className: 'scrollable-bar-container scrollable-bar-container-scrolling',
        style: { padding: isIconOccupy ? '0 ' + barWidth + 'px' : "0" },
        key: 'container',
        ref: 'container'
      },
      prevButton,
      nextButton,
      _react2["default"].createElement(
        'div',
        { className: 'scrollable-bar-wrap', ref: 'scrollWrap' },
        _react2["default"].createElement(
          'div',
          { className: 'scrollable-bar-scroll' },
          _react2["default"].createElement(
            'div',
            { className: 'scrollable-bar-content', ref: 'scroll' },
            Content
          )
        )
      )
    );
  };

  return ScrollBar;
}(_react.Component);

ScrollBar.propTypes = {
  onPrevClick: _propTypes2["default"].func,
  onNextClick: _propTypes2["default"].func,
  isIconOccupy: _propTypes2["default"].bool,
  barWidth: _propTypes2["default"].number,
  iconSize: _propTypes2["default"].number
};
ScrollBar.defaultProps = {
  isIconOccupy: false,
  barWidth: 58,
  iconSize: 16
};
exports["default"] = ScrollBar;
module.exports = exports['default'];