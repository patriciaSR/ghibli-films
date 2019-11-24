import { createTag } from '../js/createTags.js';

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
  });
});
