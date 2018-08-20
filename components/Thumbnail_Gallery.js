import React from 'react';
import PropTypes from 'prop-types';
import '../styles/components/Thumbnail_Gallery.scss';

const Arrow = ({ arrowClass, onArrowClick }) => (
  <i 
    className={arrowClass} 
    onClick={onArrowClick} 
  />
);

class ThumbnailGallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: null,
      isOpen: false,
      imageLength: null,
      loopImages: false
    };
  }

  static propTypes = {
    images: PropTypes.array.isRequired,
    loopImages: PropTypes.bool
  }

  componentWillMount() {
    document.addEventListener('click', this.handleGlobalClick);

    if (this.props.loopImages) {
      this.setState({
        loopImages: true
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleGlobalClick);
  }
  
  openImage = ({ currentTarget: { dataset: { imageIndex } } }) => {
    const { isOpen, lightboxImages } = this.state;
    const { images } = this.props;

    if (!isOpen) {
      this.setState({
        isOpen: true,
        index: parseInt(imageIndex),
        imageLength: images.length
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
    let imageIndex = index < 1 ? lastImage : index - 1;

    //Set state to last image to loop the images

    this.setState({
      index: imageIndex
    });
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
      'icon-keyboard_arrow_right',
      'popAnimation'
    ];

    /**
     * Close the displayed image if the click doesn't match
     * any of the target className elements
     */

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

  matchIndex = ( currentIndex, imageIndex ) => currentIndex === imageIndex;
  
  LeftArrow = ({ onArrowLeftClick }) => (
    <Arrow arrowClass="icon-keyboard_arrow_left" 
      onArrowClick={onArrowLeftClick} 
    />
  )

  RightArrow = ({ onArrowRightClick }) => (
    <Arrow 
      arrowClass="icon-keyboard_arrow_right" 
      onArrowClick={onArrowRightClick} 
    />
  )

  render() {
    const { LeftArrow, RightArrow } = this;
    const { images } = this.props;
    const { isOpen, 
            index, 
            imageLength,
            currentImage, 
            loopImages } = this.state;
    const imageData = images[index];
    
    /**
     * Use conditional rendering with HOC to determine if the 
     * current index does not match the first and last index
     */
    
    const currentIndexMatchFirstIndex = Component => props => (
      !this.matchIndex(index, 0) && <Component {...props} />
    );

    const currentIndexMatchLastIndex = Component => props => (
      !this.matchIndex((index + 1), imageLength) && <Component {...props} />
    );
    
    const ExtendLeftArrow = !loopImages ? currentIndexMatchFirstIndex(LeftArrow) : LeftArrow;
    const ExtendRightArrow = !loopImages ? currentIndexMatchLastIndex(RightArrow) : RightArrow;

    return (
      <div className="thumbnail-container">
        <div className="grid">
          {images.map((list, index, array) => (
            <div
              className="cell"
              onClick={this.openImage}
              key={index}
              data-image-index={index}
            >
              <img
                src={`${list.thumbnailSrc}${list.thumbnail}`}
                className="image imageAnimation"
                alt=''
              />
            </div>
          ))}
        </div>
        {isOpen && (
        <div className="lightbox-container">
          <div className="lightbox-img-container">
          <img src={`${imageData.lightboxImageSrc}${imageData.lightboxImage}`}
            className={`lightbox-img ${isOpen ? 'popAnimation' : ''}`}
          />
          </div>
          <div className="navigation-container">
            <ExtendLeftArrow onArrowLeftClick={this.onLeftArrowClick}/>
            <ExtendRightArrow onArrowRightClick={this.onRightArrowClick}/>
          </div>
          <div className="lightbox-overlay" />
        </div>
        )}
      </div>
    );
  }
}

export default ThumbnailGallery;
