'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Status = {
  PENDING: 'pending',
  LOADING: 'loading',
  LOADED: 'loaded',
  FAILED: 'failed'
};

var ImageLoader = function (_React$Component) {
  _inherits(ImageLoader, _React$Component);

  function ImageLoader(props) {
    _classCallCheck(this, ImageLoader);

    var _this = _possibleConstructorReturn(this, (ImageLoader.__proto__ || Object.getPrototypeOf(ImageLoader)).call(this, props));

    _this.state = { status: props.src ? Status.LOADING : Status.PENDING };
    if (_react2.default.Children.count(props.children) !== 3) console.error('wrong # of children provided to ImageLoader');
    return _this;
  }

  _createClass(ImageLoader, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.state.status === Status.LOADING) {
        this.createLoader();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.src !== nextProps.src) {
        this.setState({
          status: nextProps.src ? Status.LOADING : Status.PENDING
        });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.state.status === Status.LOADING && !this.img) {
        this.createLoader();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.destroyLoader();
    }
  }, {
    key: 'createLoader',
    value: function createLoader() {
      this.destroyLoader(); // We can only have one loader at a time.

      var img = new Image();
      img.onload = this.handleLoad.bind(this);
      img.onerror = this.handleError.bind(this);
      img.src = this.props.src;

      // if srcSet is not passed in then use src for srcset
      // Setting srcset to a non-string is a bad idea. E.g. img.srcset = undefined actually sets srcset to the string "undefined", causing a load failure)
      img.srcset = this.props.srcSet || this.props.src;
      this.img = img;
    }
  }, {
    key: 'destroyLoader',
    value: function destroyLoader() {
      if (this.img) {
        this.img.onload = null;
        this.img.onerror = null;
        this.img = null;
      }
    }
  }, {
    key: 'handleLoad',
    value: function handleLoad(event) {
      this.destroyLoader();
      this.setState({ status: Status.LOADED });

      if (this.props.onLoad) this.props.onLoad(event);
    }
  }, {
    key: 'handleError',
    value: function handleError(error) {
      this.destroyLoader();
      this.setState({ status: Status.FAILED });

      if (this.props.onError) this.props.onError(error);
    }
  }, {
    key: 'getClassName',
    value: function getClassName() {
      var className = 'imageloader imageloader-' + this.state.status;
      if (this.props.className) className = className + ' ' + this.props.className;
      return className;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          src = _props.src,
          srcSet = _props.srcSet,
          onLoad = _props.onLoad,
          onError = _props.onError,
          wrapperProps = _props.wrapperProps,
          children = _props.children;

      var childrenArray = _react2.default.Children.toArray(children);

      return _react2.default.createElement(
        'div',
        _extends({}, wrapperProps, { className: this.getClassName() }),
        this.state.status === Status.LOADED && _react2.default.cloneElement(childrenArray[0], { src: src, srcSet: srcSet }),
        this.state.status === Status.FAILED && childrenArray[1],
        (this.state.status === Status.LOADING || this.state.status === Status.PENDING) && childrenArray[2]
      );
    }
  }]);

  return ImageLoader;
}(_react2.default.Component);

ImageLoader.propTypes = {
  src: _propTypes2.default.string.isRequired,
  srcSet: _propTypes2.default.string,
  onLoad: _propTypes2.default.func,
  onError: _propTypes2.default.func,
  children: _propTypes2.default.arrayOf(_propTypes2.default.node)
  // Allow any extras
};
exports.default = ImageLoader;