import { noResults, addLoader } from '../js/infoSection.js';

describe('infoSection', () => {
  describe('addLoader', () => {
    test('it creates a <p> inside an element', () => {
      document.body.innerHTML = '<div></div>';
      const infoSection = document.querySelector('div');

      addLoader(infoSection);
      const result = infoSection.firstChild;

      expect(result.tagName).toBe('P');
      expect(result.textContent).toBe('Loading...');
      expect(result.classList).toContain('spinner');
    });

    test('it throws an error if container is undefined', () => {
      expect(() => {
        addLoader();
      }).toThrow();
    });
  });
});
