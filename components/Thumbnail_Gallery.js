import React from 'react';
import PropTypes from 'prop-types';
import Lightbox from './Lightbox';
import '../styles/components/ThumbnailGallery.scss';

class ThumbnailGallery extends React.Component {
  state = {
    open: false,
    imageLength: null,
    atIndex: null
  };

  static propTypes = {
    images: PropTypes.array.isRequired
  };

  openImage = ({ currentTarget }) => {
    const { images } = this.props;
    const { open } = this.state;

    if (!open) {
      this.setState({
        open: true,
        atIndex: parseInt(currentTarget.getAttribute('data-image-index')),
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
    const { images } = this.props;
    const imageData = images[atIndex];
    let lightboxImageSrc;

    if (imageData) {
      lightboxImageSrc = `${imageData.lightboxImageSrc}${
        imageData.lightboxImage
      }`;
    }

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
        <Lightbox
          images={images}
          lightboxImageSrc={lightboxImageSrc}
          open={open}
          onNextImage={this.onRightArrowClick}
          onPrevImage={this.onLeftArrowClick}
          onClose={this.closeImage}
        />
      </div>
    );
  }
}

export default ThumbnailGallery;
