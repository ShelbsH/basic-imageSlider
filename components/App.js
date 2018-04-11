import React from 'react';
import 'styles/components/app.scss';

import ThumbnailGallery from './Thumbnail_Gallery';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const images = ['Images/blessthefall.png', 'Images/The_Amity_Affliction.png'];
    return (
      <div className="flex-container">
        <div className="gallery-container">
          <h2 className="header">Thumbnail Gallery Demo</h2>
          <ThumbnailGallery
            thumbnailImages={[
              'blessthefall_thumbnail.png',
              'The_Amity_Affliction_thumbnail.png',
              'Falling_In_Reverse_thumbnail.png',
              'Trivium_thumbnail.png',
              'miss_may_i_thumbnail.png',
              'august_burns_red_thumbnail.png'
            ]}
            src="../Images/thumbnails/"
          />
        </div>
      </div>
    );
  }
}
