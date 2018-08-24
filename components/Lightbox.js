import React from 'react';
import PropTypes from 'prop-types';

const Arrow = ({ arrowClass, ...rest }) => (
  <i className={arrowClass} {...rest} />
);

class Lightbox extends React.Component {
  constructor(props) {
    super(props);
    document.addEventListener('click', this.handleGlobalClick);

    let loopImages = false;

    if (props.loopImages) {
      loopImages = true;
    }

    this.state = {
      loopImages
    };
  }

  static propTypes = {
    images: PropTypes.array.isRequired,
    loopImages: PropTypes.bool,
    onPrevImage: PropTypes.func.isRequired,
    onNextImage: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    atIndex: PropTypes.number.isRequired,
    open: PropTypes.bool
  };

  componentWillUnmount() {
    document.removeEventListener('click', this.handleGlobalClick);
  }

  isTargetClassName = (targetElement, list) => {
    let isTrue = false;

    list.forEach(item => {
      if (targetElement.className === item) {
        isTrue = true;
      }
    });

    return isTrue;
  };

  handleGlobalClick = ({ target }) => {
    const { open } = this.props;
    const { isTargetClassName } = this;
    const classNames = [
      'lightbox-img',
      'icon-keyboard_arrow_left',
      'icon-keyboard_arrow_right',
      'popAnimation'
    ];

    /**
     * Close the displayed image if the click doesn't match
     * any of the target className elements
     */

    if (open && !isTargetClassName(target, classNames)) {
      this.props.onClose();
    }
  };

  matchIndex = (currentIndex, imageIndex) => currentIndex === imageIndex;

  LeftArrow = ({ ...rest }) => (
    <Arrow arrowClass="icon-keyboard_arrow_left" {...rest} />
  );

  RightArrow = ({ ...rest }) => (
    <Arrow arrowClass="icon-keyboard_arrow_right" {...rest} />
  );

  render() {
    const { LeftArrow, RightArrow } = this;
    const {
      images,
      open,
      atIndex,
      lightboxImageSrc,
      onNextImage,
      onPrevImage
    } = this.props;
    const { loopImages } = this.state;

    /**
     * Use conditional rendering with HOC to determine if the
     * current atIndex does not match the first and last atIndex
     */

    const currentIndexMatchFirstIndex = Component => props =>
      !this.matchIndex(atIndex, 0) && <Component {...props} />;

    const currentIndexMatchLastIndex = Component => props =>
      !this.matchIndex(atIndex + 1, images) && <Component {...props} />;

    const ExtendLeftArrow = !loopImages
      ? currentIndexMatchFirstIndex(LeftArrow)
      : LeftArrow;
    const ExtendRightArrow = !loopImages
      ? currentIndexMatchLastIndex(RightArrow)
      : RightArrow;

    return (
      <div className="lightbox-container">
        <div className="lightbox-img-container">
          <img
            src={lightboxImageSrc}
            className={`lightbox-img ${open ? 'popAnimation' : ''}`}
          />
        </div>
        <div className="navigation-container">
          <ExtendLeftArrow onClick={onPrevImage} />
          <ExtendRightArrow onClick={onNextImage} />
        </div>
        <div className="lightbox-overlay" />
      </div>
    );
  }
}

export default Lightbox;
