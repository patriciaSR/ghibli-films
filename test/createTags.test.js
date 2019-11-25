import { createTag, findImage } from '../js/createTags.js';

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
      const src = findImage(text);

      const result = createTag(tagName, text, className);

      expect(result.tagName).toBe(tagName.toUpperCase());
      expect(result.alt).toBe(text);
      expect(result.src).toBe(src);
      expect(result.classList).toContain(className);
      // expect(findImage).toBeCalled();
    });
  });
});
