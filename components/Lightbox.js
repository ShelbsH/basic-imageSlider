import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const LightboxContainer = ({ lightboxImageSrc, children }) => (
  <div className="lightbox-container">
    <div className="lightbox-img-container">
      <img src={lightboxImageSrc} className="lightbox-img" />
    </div>
    {children}
  </div>
);

const Arrow = ({ arrowClass, ...rest }) => (
  <i className={arrowClass} {...rest} />
);

const LeftArrow = ({ ...rest }) => (
  <Arrow arrowClass="icon-keyboard_arrow_left" {...rest} />
);

const RightArrow = ({ ...rest }) => (
  <Arrow arrowClass="icon-keyboard_arrow_right" {...rest} />
);

const Arrows = ({ onPrevImage, onNextImage }) => (
  <div className="navigation-container">
    <LeftArrow onClick={onPrevImage} />
    <RightArrow onClick={onNextImage} />
  </div>
);

class Lightbox extends React.Component {
  static propTypes = {
    images: PropTypes.object.isRequired,
    loopImages: PropTypes.bool,
    onPrevImage: PropTypes.func.isRequired,
    onNextImage: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool
  };

  componentDidMount() {
    document.addEventListener('mouseup', this.handleGlobalClick);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.handleGlobalClick);

    if(this.props.open) {
      this.props.onClose();
    }
  }

  handleGlobalClick = ({ target }) => {
    const { open, onClose } = this.props;
    const islightboxOverlay = target.className === 'lightbox-overlay';
    const lightboxWrapper = ReactDOM.findDOMNode(this);

    /**
     * Close the displayed image if the click doesn't match
     * any of the target className elements
     */
    if ((open && !lightboxWrapper.contains(target)) || islightboxOverlay) {
      onClose();
    }
  };

  render() {
    const { open, lightboxImageSrc, ...arrows } = this.props;

    return (
      open && (
        <LightboxContainer lightboxImageSrc={lightboxImageSrc}>
          <Arrows {...arrows} />
          <div className="lightbox-overlay" />
        </LightboxContainer>
      )
    );
  }
}

export default Lightbox;
