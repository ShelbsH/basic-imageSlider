import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import ThumbnailGallery from '../components/Thumbnail_Gallery';
import Lightbox from '../components/Lightbox';
import App from '../components/App';

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
  let props;
  let mountThumbnailGallery;
  const thumbnailGallery = () => {
    if (!mountThumbnailGallery) {
      mountThumbnailGallery = mount(<ThumbnailGallery {...props} />);
    }
    return mountThumbnailGallery;
  };

  beforeEach(() => {
    props = {
      loopImages: undefined,
      images: Images
    };
    mountThumbnailGallery = undefined;
  });

  it('renders the `ThumbnailGallery` component', () => {
    const thumbnailContainer = thumbnailGallery().find(
      'div.thumbnail-container'
    );
    expect(thumbnailContainer.length).toEqual(1);
  });

  describe('when the `ThumbnailGallery` is rendered', () => {
    it('should have three image thumbnails displayed', () => {
      const thumbnailContainer = thumbnailGallery().find('img.image');
      expect(thumbnailContainer.length).toEqual(3);
    });
  });

  describe('when the `Lightbox` component is not rendered', () => {
    it('should not be rendered if none of the images are clicked', () => {
      const lightbox = thumbnailGallery().find(Lightbox);
      expect(lightbox.exists()).toBe(false);
    });
  });

  describe('when the `Lightbox` component is rendered', () => {
    it('renders the `Lightbox` component when one of the images are clicked', () => {
      const thumbnailContainer = thumbnailGallery()
        .find('div.cell')
        .first();
      thumbnailContainer.simulate('click');
      const lightbox = thumbnailGallery().find(Lightbox);
      expect(lightbox.exists()).toBe(true);
    });
    it('unmounts the `Lightbox` component when one of the images are clicked', () => {});
  });

  describe('when the lightbox current image changes', () => {
    it('should display the next image', () => {
      const thumbnailContainer = thumbnailGallery()
        .find('div.cell')
        .first();
      thumbnailContainer.simulate('click');
      const lightbox = thumbnailGallery().find(Lightbox);
      const nextArrow = lightbox.find('i.icon-keyboard_arrow_right');
      const lightboxImage = lightbox.find('img').prop('src');
      nextArrow.simulate('click');
      console.log(nextArrow);
      expect(lightboxImage).toEqual('../Images/orange.png');
    });
  });
});
