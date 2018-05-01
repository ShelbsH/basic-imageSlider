import React from 'react';
import PropTypes from 'prop-types';
import 'styles/components/app.scss';

import ThumbnailGallery from './Thumbnail_Gallery';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const Images = [
      {
        thumbnail: 'blessthefall_thumbnail.png',
        lightboxImage: 'blessthefall.png',
        thumbnailSrc: '../Images/thumbnails/',
        lightboxImageSrc: '../Images/'
      },
      {
        thumbnail: 'The_Amity_Affliction_thumbnail.png',
        lightboxImage: 'The_Amity_Affliction.png',
        thumbnailSrc: '../Images/thumbnails/',
        lightboxImageSrc: '../Images/'
      },
      {
        thumbnail: 'Falling_In_Reverse_thumbnail.png',
        lightboxImage: 'Falling_In_Reverse.png',
        thumbnailSrc: '../Images/thumbnails/',
        lightboxImageSrc: '../Images/'
      },
      {
        thumbnail: 'Trivium_thumbnail.png',
        lightboxImage: 'Trivium.png',
        thumbnailSrc: '../Images/thumbnails/',
        lightboxImageSrc: '../Images/'
      },
      {
        thumbnail: 'miss_may_i_thumbnail.png',
        lightboxImage: 'miss_may_i.png',
        thumbnailSrc: '../Images/thumbnails/',
        lightboxImageSrc: '../Images/'
      },
      {
        thumbnail: 'august_burns_red_thumbnail.png',
        lightboxImage: 'august_burns_red.png',
        thumbnailSrc: '../Images/thumbnails/',
        lightboxImageSrc: '../Images/'
      },
    ];
    return (
      <div className="flex-container">
        <div className="gallery-container">
          <h2 className="header">Thumbnail Gallery Demo</h2>
          <ThumbnailGallery 
            loopImages={true}
            images={Images} />
        </div>
      </div>
    );
  }
}
