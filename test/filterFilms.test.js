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
    description: 'no',
    director: 'luis',
  },
];

describe('filter films', () => {
  describe('getFilters queries', () => {
    test('it queries are empty', () => {
      const queryText = '';
      const director = null;
      const filters = {
        queryText,
        director,
      };

      const result = filterFilms(mockFilms, filters);

      expect(result).toEqual(mockFilms);
    });

    test('it queryText is "o"', () => {
      const queryText = 'o';
      const director = null;
      const filters = {
        queryText,
        director,
      };

      const result = filterFilms(mockFilms, filters);

      expect(result).toBe(mockFilms);
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
