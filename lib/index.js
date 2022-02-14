"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactTinyTransition = _interopRequireDefault(require("react-tiny-transition"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Crossfade =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Crossfade, _React$Component);

  function Crossfade() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Crossfade);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Crossfade)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      children: _this.props.disableInitialAnimation ? _this.props.children : null,
      height: _this.props.disableInitialAnimation ? "auto" : 0
    });

    _defineProperty(_assertThisInitialized(_this), "delayTimer", null);

    _defineProperty(_assertThisInitialized(_this), "heightTimer", null);

    _defineProperty(_assertThisInitialized(_this), "raf", null);

    _defineProperty(_assertThisInitialized(_this), "waitTwoFrames", function (callback) {
      _this.raf = requestAnimationFrame(function () {
        _this.raf = requestAnimationFrame(function () {
          callback();
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this), "setWrapperHeight", function () {
      var wrapper = _reactDom["default"].findDOMNode(_assertThisInitialized(_this));

      var child = wrapper && wrapper.firstElementChild;
      var newHeight = child ? child.offsetHeight : 0;
      _this.previousHeight = newHeight;
      clearTimeout(_this.heightTimer);

      _this.setState({
        height: newHeight
      }, function () {
        _this.heightTimer = setTimeout(function () {
          _this.setState({
            height: "auto"
          });
        }, _this.props.duration);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "transition", function (nextChildren) {
      clearTimeout(_this.delayTimer);
      clearTimeout(_this.heightTimer);

      _this.setState({
        children: null,
        height: _this.previousHeight
      }, function () {
        _this.delayTimer = setTimeout(function () {
          _this.waitTwoFrames(function () {
            _this.setState({
              children: nextChildren
            }, function () {
              _this.waitTwoFrames(function () {
                _this.setWrapperHeight();
              });
            });
          });
        }, _this.props.duration);
      });
    });

    return _this;
  }

  _createClass(Crossfade, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!this.props.disableInitialAnimation) {
        this.transition(this.props.children);
      } else {
        this.setWrapperHeight();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.children.key !== this.props.children.key) {
        this.transition(this.props.children);
      } else if (prevProps.children !== this.props.children) {
        this.setState({
          children: this.props.children
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearTimeout(this.delayTimer);
      clearTimeout(this.heightTimer);
      cancelAnimationFrame(this.raf);
    }
  }, {
    key: "render",
    value: function render() {
      var Component = this.props.component;
      return _react["default"].createElement(Component, {
        className: this.props.className,
        style: {
          height: this.state.height
        }
      }, _react["default"].createElement(_reactTinyTransition["default"], {
        classNames: this.props.classNames,
        duration: this.props.duration,
        disableInitialAnimation: this.props.disableInitialAnimation
      }, this.state.children));
    }
  }]);

  return Crossfade;
}(_react["default"].Component);

_defineProperty(Crossfade, "propTypes", {
  children: _propTypes["default"].node,
  className: _propTypes["default"].string,
  component: _propTypes["default"].string,
  disableInitialAnimation: _propTypes["default"].bool,
  duration: _propTypes["default"].number,
  classNames: _propTypes["default"].shape({
    beforeEnter: _propTypes["default"].string,
    entering: _propTypes["default"].string,
    beforeLeave: _propTypes["default"].string,
    leaving: _propTypes["default"].string
  })
});

_defineProperty(Crossfade, "defaultProps", {
  component: "div",
  disableInitialAnimation: false,
  duration: 500
});

var _default = Crossfade;
exports["default"] = _default;