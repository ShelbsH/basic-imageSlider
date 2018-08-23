import React from 'react';
import PropTypes from 'prop-types';
import '../styles/components/Thumbnail_Gallery.scss';

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
    loopImages: PropTypes.bool
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
            src={lightboxImageSrc} //Main part right here...
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

class ImageGrid extends React.Component {
  state = {
    open: false,
    imageLength: null,
    atIndex: null
  };

  openImage = ({
    currentTarget: {
      dataset: { imageIndex }
    }
  }) => {
    const { images } = this.props;
    const { open } = this.state;

    if (!open) {
      this.setState({
        open: true,
        atIndex: parseInt(imageIndex),
        imageLength: images.length
      });
    }
  };

  closeImage = () => {
    this.setState({
      open: false
    });
  };

  nextImage = () => {
    const { atIndex, imageLength } = this.state;

    this.setState({
      atIndex: (atIndex + 1) % imageLength
    });
  };

  prevImage = () => {
    const { atIndex, imageLength } = this.state;
    const lastImage = imageLength - 1;
    let imageIndex = atIndex < 1 ? lastImage : atIndex - 1;

    //Set state to last image to loop the images
    this.setState({
      atIndex: imageIndex
    });
  };

  onLeftArrowClick = () => {
    const { open } = this.state;

    if (open) {
      this.prevImage();
    }
  };

  onRightArrowClick = () => {
    const { open } = this.state;

    if (open) {
      this.nextImage();
    }
  };

  render() {
    const { open, atIndex } = this.state;
    const { images, loopImages } = this.props;
    const imageData = images[atIndex];

    return (
      <div className="thumbnail-container">
        <div className="grid">
          {images.map((list, index) => (
            <div
              className="cell"
              onClick={this.openImage}
              key={index}
              data-image-index={index}
            >
              <img
                src={`${list.thumbnailSrc}${list.thumbnail}`}
                className="image imageAnimation"
                alt=""
              />
            </div>
          ))}
        </div>
        {open && (
          <Lightbox
            images={images}
            lightboxImageSrc={`${imageData.lightboxImageSrc}${
              imageData.lightboxImage
            }`}
            atIndex={atIndex}
            open={open}
            onNextImage={this.onRightArrowClick}
            onPrevImage={this.onLeftArrowClick}
            onClose={this.closeImage}
            loopImages={loopImages}
          />
        )}
      </div>
    );
  }
}

export default ImageGrid;
