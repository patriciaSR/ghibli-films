import { getDirectors } from '../js/getDirectors.js';
import { mockFilms } from './fixtures/variables-fixtures.js';

describe('getDirectors function', () => {
  test('it returns an array with all directors', () => {
    const expected = ['patricia', 'paco', 'luis'];

    const result = getDirectors(mockFilms);

    expect(result.length).toBe(3);
    expect(result).toEqual(expected);
    expect(result[0]).toBe(expected[0]);
  });

  test('it returns an array with unique directors', () => {
    const expected = ['patricia', 'paco', 'luis'];

    const result = getDirectors(mockFilms);

    expect(result.length).toBe(3);
    expect(result).toEqual(expected);
    expect(result[0]).toBe(expected[0]);
  });

  test('it returns an empty array with no films array', () => {
    const result = getDirectors();

    expect(result.length).toBe(0);
  });
});
