import { filterFilms, getFilters } from '../js/filterFilms.js';
import { mockFilms } from './fixtures/variables-fixtures.js';


describe('filter films, filter films by queries', () => {
  test('it returns all elements if filter is empty', () => {
    const queryText = '';
    const director = null;
    const filters = {
      queryText,
      director,
    };

    const result = filterFilms(mockFilms, filters);

    expect(result).toEqual(mockFilms);
  });

  test('it returns all elements that contains "hola"', () => {
    const queryText = 'hola';
    const director = null;
    const filters = {
      queryText,
      director,
    };

    const result = filterFilms(mockFilms, filters);

    expect(result.length).toBe(1);
    expect(result).toContain(mockFilms[0]);
  });

  test('it returns all elements that contains "no"', () => {
    const queryText = 'no';
    const director = null;
    const filters = {
      queryText,
      director,
    };

    const expected = mockFilms.slice(0, 1);

    const result = filterFilms(mockFilms, filters);

    expect(result.length).toBe(2);
    expect(result).toEqual(expect.arrayContaining(expected));
  });

  test('it return all films that contains "adios" and "chus"s director', () => {
    const queryText = 'adios';
    const director = 'chus';
    const filters = {
      queryText,
      director,
    };

    const result = filterFilms(mockFilms, filters);

    expect(result.length).toBe(1);
    expect(result).toContain(mockFilms[1]);
  });

  test('it return all films that contains chus"s director', () => {
    const queryText = '';
    const director = 'chus';
    const filters = {
      queryText,
      director,
    };

    const result = filterFilms(mockFilms, filters);

    expect(result.length).toBe(1);
    expect(result).toContain(mockFilms[1]);
  });

  test('it throws an error if queryText is undefined', () => {
    const director = 'chus';
    const filters = {
      director,
    };

    expect(() => {
      filterFilms(mockFilms, filters);
    }).toThrow();
  });
});

describe('getFilters test', () => {
  // Lo que se ejecuta antes de cada test. Hay otros como:
  // afterEach, before y after.
  beforeEach(() => {
    document.body.innerHTML = `
      <input class="filter__input" />
      <select class="directors__select">
        <option value="Selecciona un director..."></option>
        <option value="foo">Foo</option>
        <option value="bar">Bar</option>
      </select>
    `;
  });

  test('it returns queryText filter', () => {
    const queryInput = document.querySelector('.filter__input');
    const queryText = 'hola';

    queryInput.value = queryText;
    const result = getFilters();

    expect(result.queryText).toEqual(queryText);
  });

  test('it returns director filter', () => {
    const querySelect = document.querySelector('.directors__select');
    const director = 'foo';

    querySelect.value = director;
    const result = getFilters();

    expect(result.director).toEqual(director);
  });

  test('it returns null director filter', () => {
    const querySelect = document.querySelector('.directors__select');
    const director = 'Selecciona un director...';

    querySelect.value = director;
    const result = getFilters();

    expect(result.director).toEqual(null);
    // expect(result.director).toBeNull();
  });
});
