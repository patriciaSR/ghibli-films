
import { callApi } from '../js/callApi.js';
import { filmsApi } from './fixtures/filmsApi.js';
import { ENDPOINTGOOD } from './fixtures/variables-fixtures.js';

describe('testing api', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('calls GibliApi with the rigth url', () => {
    fetch.mockResponseOnce(JSON.stringify(filmsApi));

    //assert on the response
    callApi(ENDPOINTGOOD);

    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(ENDPOINTGOOD);

    //assert on the times called and arguments given to fetch
    // expect(fetch.mock.calls.length).toEqual(1);
    // expect(fetch.mock.calls[0][0]).toEqual(ENDPOINTGOOD);
  });

  it('returns an error when fetch fails', async () => {
    const error = new Error('errorrrrrrrrrrrr');
    fetch.mockReject(error);

    //assert on the response
    const result = await callApi(ENDPOINTGOOD);

    expect(result).toEqual(error);
  });

  it('calls GibliApi and returns data to me', async () => {
    fetch.mockResponseOnce(JSON.stringify(filmsApi));

    //assert on the response
    // callApi(ENDPOINTGOOD).then((res) => {
    //   expect(res).toEqual(filmsApi);
    // });

    const result = await callApi(ENDPOINTGOOD);

    expect(result).toEqual(filmsApi);
  });
});
