import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import '../styles/components/Thumbnail_Gallery.scss';

class ThumbnailGallery extends React.Component {
  constructor() {
    super();

    this.state = {
      index: null,
      isOpen: false,
      imageLength: null,
      imageData: null
    };
  }

  componentWillMount() {
    document.addEventListener('click', this.handleGlobalClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleGlobalClick);
  }

  openImage = ({ currentTarget: { dataset: { imageIndex, imageData } } }) => {
    const { isOpen } = this.state;
    const arrayData = imageData.split(',').map((item, idx) => {
      return item.replace(/\_thumbnail/, '');
    });

    if (!isOpen) {
      this.setState({
        isOpen: true,
        index: parseInt(imageIndex),
        imageData: arrayData
      });
    }
  };

  closeImage = () => {
    this.setState({
      isOpen: false
    });
  };

  nextImage = () => {
    const { index } = this.state;
    this.setState({
      index: index + 1
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
    console.log(index);
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

  render() {
    const { isOpen, index, imageData } = this.state;
    /**
     * TODO: Optional: If the folders are separate, create a thumbnail src folder for thumbnails and
     * imageSrcd folder for the image files
     *
     * Create a src prop that contains both the thumbnails and images in a single folder
     * 
     * TODO: Do some refactoring
     */

    const Thumbnails = ({ thumbnailImages, src }) =>
      thumbnailImages.map((list, index, array) => (
        <div
          className="cell"
          onClick={this.openImage}
          key={index}
          data-image-index={index}
          data-image-length={array.length}
          data-image-data={array}
        >
          <img src={`${src}${list}`} className="responsive-img image" />
        </div>
      ));

    const Lightbox = ({ onLeftArrowClick, onRightArrowClick }) =>
      isOpen && (
        <div>
          <div className="lightbox-container">
            <div className="lightbox-img-container">
              <img src={`../Images/${imageData[index]}`} className="lightbox-img" />
            </div>
            <div className="navigation-container">
              <i
                className="icon-keyboard_arrow_left"
                onClick={onLeftArrowClick}
              />
              <i
                className="icon-keyboard_arrow_right"
                onClick={onRightArrowClick}
              />
            </div>
          </div>
          <div className="lightbox-overlay" />
        </div>
      );

    return (
      <div className="thumbnail-container">
        <div className="grid">
          <Thumbnails
            thumbnailImages={this.props.thumbnailImages}
            src={this.props.src}
          />
        </div>
        <Lightbox
          onLeftArrowClick={this.onLeftArrowClick}
          onRightArrowClick={this.onRightArrowClick}
        />
      </div>
    );
  }
}

export default ThumbnailGallery;
