import React from 'react';
import PropTypes from 'prop-types';
import '../styles/components/Thumbnail_Gallery.scss';

class ThumbnailGallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: null,
      isOpen: false,
      imageLength: null,
      lightboxImages: props.lightboxImages,
      isRepeat: false
    };
  }

  componentWillMount() {
    document.addEventListener('click', this.handleGlobalClick);

    if (this.props.repeat) {
      this.setState({
        isRepeat: true
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleGlobalClick);
  }

  openImage = ({ currentTarget: { dataset: { imageIndex } } }) => {
    const { isOpen, lightboxImages } = this.state;

    if (!isOpen) {
      this.setState({
        isOpen: true,
        index: parseInt(imageIndex),
        imageLength: lightboxImages.length
      });
    }
  };

  closeImage = () => {
    this.setState({
      isOpen: false
    });
  };

  nextImage = () => {
    const { index, imageLength } = this.state;

    this.setState({
      index: (index + 1) % imageLength
    });
  };

  prevImage = () => {
    const { index, imageLength } = this.state;
    const lastImage = imageLength - 1;

    if (index < 1) {
      this.setState({
        index: lastImage
      });
    } else {
      this.setState({
        index: index - 1
      });
    }
  };

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
    const { isOpen, index } = this.state;
    const { isTargetClassName, closeImage } = this;
    const classNames = [
      'lightbox-img',
      'icon-keyboard_arrow_left',
      'icon-keyboard_arrow_right'
    ];

    if (isOpen && !isTargetClassName(target, classNames)) {
      closeImage();
    }
  };

  onLeftArrowClick = () => {
    const { isOpen } = this.state;

    if (isOpen) {
      this.prevImage();
    }
  };

  onRightArrowClick = () => {
    const { isOpen } = this.state;

    if (isOpen) {
      this.nextImage();
    }
  };

  matchIndex = (currentIndex, imageIndex) => currentIndex === imageIndex;

  render() {
    const { lightboxImagesSrc, lightboxImages, thumbnailImagesSrc, thumbnailImages } = this.props;
    const { isOpen, index, imageLength, isRepeat } = this.state;

    const Arrow = ({ onArrowClick, arrowClass }) => (
      <i 
        className={arrowClass} 
        onClick={onArrowClick} 
      />
    )

    const LeftArrow = ({ onArrowLeftClick }) => (
      <Arrow arrowClass="icon-keyboard_arrow_left" 
        onArrowClick={onArrowLeftClick} 
      />
    )
    const RightArrow = ({ onArrowRightClick }) => (
      <Arrow 
        arrowClass="icon-keyboard_arrow_right" 
        onArrowClick={onArrowRightClick} 
      />
    )

    //HOC example
    const valueMatchLeftIndex = Component => props => (
        !this.matchIndex(index, 0) && <Component {...props} />
    );

    const valueMatchRightIndex = Component => props => (
        !this.matchIndex((index + 1), imageLength) && <Component {...props} />
    );
    
    const ExtendLeftArrow = !isRepeat ? valueMatchLeftIndex(LeftArrow) : LeftArrow;
    const ExtendRightArrow = !isRepeat ? valueMatchRightIndex(RightArrow) : RightArrow;

    const Lightbox = ({ lightboxImagesSrc, lightboxImages, onLeftArrowClick, onRightArrowClick }) =>
      isOpen && (
        <div className="lightbox-container">
          <div className="lightbox-img-container">
            <img
              src={`${lightboxImagesSrc}${lightboxImages}`}
              className="lightbox-img"
            />
          </div>
          <div className="navigation-container">
            <ExtendLeftArrow onArrowLeftClick={onLeftArrowClick}/>
            <ExtendRightArrow onArrowRightClick={onRightArrowClick}/>
          </div>
          <div className="lightbox-overlay" />
        </div>
      );

    return (
      <div className="thumbnail-container">
        <div className="grid">
          {thumbnailImages.map((list, index, array) => (
            <div
              className="cell"
              onClick={this.openImage}
              key={index}
              data-image-index={index}
            >
              <img
                src={`${thumbnailImagesSrc}${list}`}
                className="responsive-img image"
              />
            </div>
          ))}
        </div>
        <Lightbox
          onLeftArrowClick={this.onLeftArrowClick}
          onRightArrowClick={this.onRightArrowClick}
          lightboxImagesSrc={lightboxImagesSrc || thumbnailImages}
          lightboxImages={lightboxImages[index]}
        />
      </div>
    );
  }
}

export default ThumbnailGallery;
