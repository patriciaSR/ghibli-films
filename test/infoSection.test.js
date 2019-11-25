import { noResults, addLoader } from '../js/infoSection.js';

describe('infoSection', () => {
  describe('no Results', () => {
    test('it creates a <div>', () => {
      document.body.innerHTML = `<div class="films__info-container"></div>`;
      const infoSection = document.querySelector('.films__info-container');

      const newLoader = `<p class="spinner">Loading...</p>`;

      addLoader(infoSection);

      expect(infoSection.innerHTML).toBe(newLoader);
    });
  });
});
