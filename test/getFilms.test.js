function stubFunction(moduleName, fnName) {
  jest.mock(moduleName);

  const module = require(moduleName);

  module[fnName].mockImplementation(() => {});

  return module[fnName];
}

describe('getFilms function', () => {
  let printFilms;
  let addLoader;
  let removeLoader;
  let callApi;
  let getFilms;
  let timeout;

  beforeEach(() => {
    printFilms = stubFunction('../js/printFilms.js', 'printFilms');
    addLoader = stubFunction('../js/infoSection.js', 'addLoader');
    removeLoader = stubFunction('../js/infoSection.js', 'removeLoader');
    callApi = stubFunction('../js/callApi.js', 'callApi');
    timeout = stubFunction('../js/timeout.js', 'timeout');

    // Import "getFilms" aftermocking everything
    getFilms = require('../js/getFilms.js').getFilms;
  });

  afterEach(() =>{
    jest.resetModules();
  });

  test('it shows a loading spinner when called', async () => {
    const infoSection = 'foo';

    await getFilms(infoSection);

    expect(addLoader).toHaveBeenCalledWith(infoSection);
  });

  test('it waits 2 seconds before load the films', async () => {
    await getFilms();

    expect(timeout).toHaveBeenCalledWith(2000);
  });

  test('it removes the loading spinner when called', async () => {
    await getFilms();

    expect(removeLoader).toHaveBeenCalled();
  });

  test('it calls to the films API when called', async () => {
    const infoSection = 'foo';

    await getFilms(infoSection);

    expect(callApi).toHaveBeenCalled();
    expect(callApi.mock.calls[0][0]).toEqual(expect.stringMatching('https://'));
    expect(callApi.mock.calls[0][1]).toBe(infoSection);
  });

  test('it renders the films when called', async () => {
    const infoSection = 'foo';
    const films = 'films list....';
    const list = document.createElement('div');
    list.classList.add('films__list');
    document.body.appendChild(list);

    callApi.mockImplementation(() => films);

    await getFilms(infoSection);

    expect(printFilms).toHaveBeenCalledWith(list, infoSection, films);
  });

  test('it return the films', async () => {
    const films = 'films list....';

    callApi.mockImplementation(() => films);

    const result = await getFilms();

    expect(result).toBe(films);
  });

  // test('it really works ?¿', async () => {
  //   const time = 2000;
  //   const spyTime = jest.spyOn(timeModule, 'timeout');
  //   const spyEvent = jest.spyOn(tagsModule, 'addEventToTag');
  //   const spyPrint = jest.spyOn(printModule, 'printFilms');
  //   const spyLoader = jest.spyOn(infoModule, 'removeLoader');


  //   mainModule.getFilms().then((data) => {
  //     expect(data).toBe(filmsApi);

  //     const select = document.querySelector('select');
  //     const option = document.querySelector('option');
  //     const infoSection = document.querySelector('div');

  //     expect(select.tagName).toBe('SELECT');
  //     expect(option.tagName).toBe('OPTION');
  //     expect(infoSection.innerHTLM.legth).toBe(0);


  //     expect(spyLoader).toHaveBeenCalled();
  //     expect(spyEvent).toHaveBeenCalled();
  //   });

  //   expect(spyTime).toHaveBeenCalled();
  //   expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), time);
  // });
});
