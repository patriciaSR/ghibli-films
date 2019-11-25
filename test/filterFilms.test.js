import { filterFilms, getFilters, isTextIncluded } from '../js/filterFilms.js';

const mockFilms = [
  {
    title: 'hola',
    description: 'no',
    director: 'patricia',
  },
  {
    title: 'adios',
    description: 'no',
    director: 'chus',
  },
  {
    title: 'byeo',
    description: 'yes',
    director: 'luis',
  },
];

describe('filter films', () => {
  describe('getFilters queries', () => {
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

    // test('it queries are 2', () => {
    //   const queryText = 'hola';
    //   const director = 'patricia';
    //   const filters = {
    //     queryText,
    //     director,
    //   };

    //   const result = getFilters();

    //   expect(result).toEqual(filters);
    // });

  });
});
