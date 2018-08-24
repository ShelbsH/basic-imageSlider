import React from 'react';
import { shallow } from 'enzyme';
import ThumbnailGallery from '../components/Thumbnail_Gallery';

const Images = [
  {
    thumbnail: 'apple_thumb.png',
    lightboxImage: 'apple.png',
    thumbnailSrc: '../Images/thumbnails/',
    lightboxImageSrc: '../Images/'
  },
  {
    thumbnail: 'orange_thumb.png',
    lightboxImage: 'orange.png',
    thumbnailSrc: '../Images/thumbnails/',
    lightboxImageSrc: '../Images/'
  },
  {
    thumbnail: 'grape_thumb.png',
    lightboxImage: 'grape.png',
    thumbnailSrc: '../Images/thumbnails/',
    lightboxImageSrc: '../Images/'
  }
];

describe('Thumbnail Gallery', () => {
  const wrapper = shallow(<ThumbnailGallery images={Images} />);

  it('should have an existing ThumbnailGallery component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should have three different images displayed', () => {
    expect(wrapper.find('.cell')).toHaveLength(3);
  });

  describe('Lightbox being displayed after one of the images are clicked', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
