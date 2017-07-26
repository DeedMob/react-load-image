import React from 'react';
import PropTypes from 'prop-types';

const Status = {
  PENDING: 'pending',
  LOADING: 'loading',
  LOADED: 'loaded',
  FAILED: 'failed',
};

export default class ImageLoader extends React.Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    onLoad: PropTypes.func,
    onError: PropTypes.func,
    // Allow any extras
  };

  constructor(props) {
    super(props);
    this.state = {status: props.src ? Status.LOADING : Status.PENDING};
  }

  componentDidMount() {
    if (this.state.status === Status.LOADING) {
      this.createLoader();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.src !== nextProps.src) {
      this.setState({
        status: nextProps.src ? Status.LOADING : Status.PENDING,
      });
    }
  }

  componentDidUpdate() {
    if (this.state.status === Status.LOADING && !this.img) {
      this.createLoader();
    }
  }

  componentWillUnmount() {
    this.destroyLoader();
  }

  createLoader() {
    this.destroyLoader();  // We can only have one loader at a time.

    this.img = new Image();
    this.img.onload = ::this.handleLoad;
    this.img.onerror = ::this.handleError;
    this.img.src = this.props.src;
  }

  destroyLoader() {
    if (this.img) {
      this.img.onload = null;
      this.img.onerror = null;
      this.img = null;
    }
  }

  handleLoad(event) {
    this.destroyLoader();
    this.setState({status: Status.LOADED});

    if (this.props.onLoad) this.props.onLoad(event);
  }

  handleError(error) {
    this.destroyLoader();
    this.setState({status: Status.FAILED});

    if (this.props.onError) this.props.onError(error);
  }

  getClassName() {
    let className = `imageloader imageloader-${this.state.status}`;
    if (this.props.className) className = `${className} ${this.props.className}`;
    return className;
  }


  render() {
    const { src, onLoad, onError, wrapperProps } = this.props;

    return (
      <div {...wrapperProps} className={getClassName()}>
        {this.state.status === Status.LOADED &&
          React.cloneElement(this.props.children[0], { src:  this.props.src })
        }
        {this.state.status === Status.FAILED &&
          this.props.children[1]
        }
        {(this.state.status === Status.LOADING || this.state.status === Status.PENDING) &&
          this.props.children[2]
        }
      </div>
    )
  }
}
