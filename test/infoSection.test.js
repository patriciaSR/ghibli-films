import { noResults, addLoader, removeLoader } from '../js/infoSection.js';

describe('infoSection testing', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div></div>
      <ol></ol>
    `;
  });

  describe('noResults function', () => {
    test('it creates a no results <div> inside an element', () => {
      const list = document.querySelector('ol');
      const infoSection = document.querySelector('div');

      noResults(list, infoSection);

      const result = infoSection.firstChild;
      const resultText = result.querySelector('.noResults__text');

      expect(result.tagName).toBe('DIV');
      expect(result.classList).toContain('noResults__container');
      expect(resultText.tagName).toBe('P');
      expect(resultText.textContent).toBe('No hay resultados :( ');
      expect(resultText.classList).toContain('noResults__text');
    });

    test('it throws an error if container is undefined', () => {
      expect(() => {
        noResults();
      }).toThrow();
    });
  });

  describe('addLoader function', () => {
    test('it creates a <p> inside an element', () => {
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

  describe('removeLoader function', () => {
    test('it removes spinner <p>', () => {
      document.body.innerHTML = `
        <div>
        <p class="spinner"></p>
        </div>
      `;
      const spinner = document.querySelector('p');

      removeLoader(spinner);
      const infoSection = document.querySelector('div');

      expect(infoSection.length).toBe(undefined);
    });

    test('it does nothing if spinner is undefined', () => {
      removeLoader();
      const infoSection = document.querySelector('div');

      expect(infoSection.length).toBe(undefined);
    });
  });
});
