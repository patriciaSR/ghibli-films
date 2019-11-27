import { createTag, findImage, createSelectTag, addEventToTag } from '../js/createTags.js';
import { photos } from '../js/photos.js';
import { mockPhotos, totoroImg } from './fixtures/variables-fixtures.js';


describe('createTags module', () => {
  describe('createTag function', () => {
    test('it creates a <div>', () => {
      const tagName = 'div';
      const text = 'foo';

      const result = createTag(tagName, text);

      expect(result.tagName).toBe(tagName.toUpperCase());
      expect(result.textContent).toBe(text);
    });

    test('it creates a <p> with a class', () => {
      const tagName = 'p';
      const text = 'foo';
      const className = 'foo';

      const result = createTag(tagName, text, className);

      expect(result.tagName).toBe(tagName.toUpperCase());
      expect(result.textContent).toBe(text);
      expect(result.classList).toContain(className);
      // Otra opción:
      // expect(result.classList.contains(className)).toBeTruthy();
    });

    test('it creates a <img>', () => {
      const tagName = 'img';
      const text = 'foo';
      const className = 'foo';
      // const findImage = jest.fn();
      const src = findImage(text, photos);

      const result = createTag(tagName, text, className);

      expect(result.tagName).toBe(tagName.toUpperCase());
      expect(result.alt).toBe(text);
      expect(result.src).toBe(src);
      expect(result.classList).toContain(className);
      // expect(findImage).toBeCalled();
    });
  });

  describe('createSelector function', () => {
    test('it creates a select node', () => {
      const options = ['patricia', 'clara', 'marta'];
      const defaultText = 'foo';
      const className = 'foo';

      const result = createSelectTag(options, defaultText, className);
      const select = result.querySelector(`.${className}__select`);
      const option = result.querySelector(`.${className}__option`);

      expect(select.tagName).toBe('SELECT');
      expect(select.length).toBe(4);
      expect(select.classList).toContain(`${className}__select`);

      expect(option.tagName).toBe('OPTION');
      expect(option.textContent).toBe(defaultText);
      expect(option.classList).toContain(`${className}__option`);
    });
  });

  describe('findImage src', () => {
    test('it find a image with a name', () => {
      const { name } = mockPhotos[0];

      const result = findImage(name, mockPhotos);

      expect(result).toBe(mockPhotos[0].photo);
    });

    test('it find a image with no matching name', () => {
      const name = 'lola';
      const defaultPhoto = totoroImg;

      const result = findImage(name, mockPhotos);

      expect(result).toBe(defaultPhoto);
    });
  });
});

describe('addEventListener function', () => {
  test('it add listener to a tag', () => {
    document.body.innerHTML = '<div></div>';

    const newTag = document.querySelector('div');
    const event = 'click';
    const func = jest.fn();

    addEventToTag(newTag, event, func);
    newTag.click();

    expect(func).toHaveBeenCalled();
  });
});
