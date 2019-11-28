
import { callApi } from '../js/callApi.js';
import { filmsApi } from './fixtures/filmsApi.js';
import { ENDPOINTGOOD } from './fixtures/variables-fixtures.js';
import * as infoModule from '../js/infoSection.js';

describe('testing api', () => {
  beforeEach(() => {
    fetch.resetMocks();

    document.body.innerHTML = `
    <div></div>
    <ol></ol>
  `;
  });

  test('it calls GibliApi with the rigth url', () => {
    fetch.mockResponseOnce(JSON.stringify(filmsApi));

    // assert on the response
    callApi(ENDPOINTGOOD);

    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(ENDPOINTGOOD);

    // Other expects: assert on the times called and arguments given to fetch
    // expect(fetch.mock.calls.length).toEqual(1);
    // expect(fetch.mock.calls[0][0]).toEqual(ENDPOINTGOOD);
  });

  test('it returns an error when fetch fails', async () => {
    const error = new Error('errorrrrrrrrrrrr');
    fetch.mockReject(error);

    // assert on the response
    const infoSection = document.querySelector('div');
    const spyErrorFn = jest.spyOn(infoModule, 'errorMessage');

    const result = await callApi(ENDPOINTGOOD, infoSection);

    expect(result).toEqual(error);
    expect(spyErrorFn).toHaveBeenCalled();
  });

  test('it calls GibliApi and returns data', async () => {
    fetch.mockResponseOnce(JSON.stringify(filmsApi));

    // Using .then(): assert on the response
    // callApi(ENDPOINTGOOD).then((res) => {
    //   expect(res).toEqual(filmsApi);
    // });

    const result = await callApi(ENDPOINTGOOD);

    expect(result).toEqual(filmsApi);
  });
});
