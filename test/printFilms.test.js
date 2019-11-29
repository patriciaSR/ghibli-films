import { unfoldDescription, printFilm, printFilms } from '../js/printFilms.js';
import { mockFilms } from './fixtures/variables-fixtures.js';

describe('unfoldDescription function', () => {
  test('it toogles the class hidden in an element', () => {
    const textDescription = document.createElement('p');
    const mockEvent = {
      currentTarget: {
        nextSibling: textDescription,
      },
    };

    unfoldDescription(mockEvent);

    expect(textDescription.classList).toContain('hidden');

    unfoldDescription(mockEvent);

    expect(textDescription.classList).not.toContain('hidden');
  });
});

describe('printFilms', () => {
  describe('printFilm function', () => {
    test('it creates a new <li> with film info', () => {
      const result = printFilm(mockFilms[0]);
      const resultTitle = result.querySelector('.film__title');
      const resultImage = result.querySelector('.film__image');
      const resultDescription = result.querySelector('.film__description-text');

      expect(result.tagName).toBe('LI');
      expect(resultTitle.tagName).toBe('H2');
      expect(resultTitle.textContent).toBe(mockFilms[0].title);
      expect(resultImage.tagName).toBe('IMG');
      expect(resultDescription.tagName).toBe('P');
      expect(resultDescription.textContent).toBe(mockFilms[0].description);
      expect(resultDescription.classList).toContain('hidden');
    });
  });

  describe('printFilms', () => {
    document.body.innerHTML = `
      <ol></ol>
      <div></div>
    `;

    const list = document.querySelector('ol');
    const infoSection = document.querySelector('div');

    test('it print <ol> with al films <li>', () => {
      printFilms(list, infoSection, mockFilms);

      const resultLis = list.querySelectorAll('li');
      expect(resultLis.length).toBe(4);
      expect(infoSection.innerHTML.length).toBe(0);
    });

    test('it prints noResults <div>  with undefined filmsArray', () => {
      printFilms(list, infoSection);
      const noResultText = infoSection.querySelector('.noResults__container');

      expect(infoSection.innerHTML.length).not.toBe(0);
      expect(noResultText.tagName).toBe('DIV');
      expect(noResultText.classList).toContain('noResults__container');
    });
  });
});
