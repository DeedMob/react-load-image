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
    srcSet: PropTypes.string,
    onLoad: PropTypes.func,
    onError: PropTypes.func,
    children: PropTypes.arrayOf(PropTypes.node),
    // Allow any extras
  };

  constructor(props) {
    super(props);
    this.state = {status: props.src ? Status.LOADING : Status.PENDING};
    if(React.Children.count(props.children) !== 3)
      console.error('wrong # of children provided to ImageLoader')
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

    const img = new Image();
    img.onload = ::this.handleLoad;
    img.onerror = ::this.handleError;
    img.src = this.props.src;

    // if srcSet is not passed in then use src for srcset
    // Setting srcset to a non-string is a bad idea. E.g. img.srcset = undefined actually sets srcset to the string "undefined", causing a load failure)
    img.srcset = this.props.srcSet || this.props.src;
    this.img = img;
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
    const { src, srcSet, onLoad, onError, wrapperProps, children } = this.props;
    const childrenArray = React.Children.toArray(children);

    return (
      <div {...wrapperProps} className={this.getClassName()}>
        {this.state.status === Status.LOADED &&
            React.cloneElement(childrenArray[0], { src, srcSet })
        }
        {this.state.status === Status.FAILED &&
          childrenArray[1]
        }
        {(this.state.status === Status.LOADING || this.state.status === Status.PENDING) &&
          childrenArray[2]
        }
      </div>
    )
  }
}
