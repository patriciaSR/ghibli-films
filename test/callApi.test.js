
import { callApi } from '../js/callApi.js';
import { filmsApi } from './fixtures/filmsApi.js';
import { ENDPOINTGOOD, ENDPOINTBAD } from './fixtures/variables-fixtures.js';

// describe('method callApi', () => {
//   test('test fetch to the Api', async () => {
//     expect.assertions(1);
//     const data = await callApi(ENDPOINTGOOD);
//     expect(data).toEqual(filmsApi);


//     expect(callApi(ENDPOINTGOOD)).toBeDefined();
//     // expect(callApi(ENDPOINTGOOD)).toEqual(filmsApi);
//   });
// });

describe('testing api', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('calls google and returns data to me', () => {
    fetch.mockResponseOnce(JSON.stringify(filmsApi));

    //assert on the response
    callApi(ENDPOINTGOOD).then(res => {
      expect(res.data).toEqual(filmsApi);
    });

    //assert on the times called and arguments given to fetch
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(ENDPOINTGOOD);
  });
});

// describe('testing api 2', () => {
//   it('testing api2', async () => {
//     expect.assertions(1);
//     const data = await callApi(ENDPOINTGOOD);
//     expect(data).toEqual(filmsApi);
//   });
// });
