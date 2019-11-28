import { getFilms } from '../js/getFilms.js';
import { filmsApi } from './fixtures/filmsApi.js';
import * as timeModule from '../js/timeout.js';
import * as tagsModule from '../js/createTags.js';
import * as printModule from '../js/printFilms.js';
import * as infoModule from '../js/infoSection.js';



describe('', () => {
  jest.useFakeTimers();

  document.body.innerHTML = `
  <input />
  <section class="main__filter" />
  <ol></ol>
  <div>
    <p></p>
  </div>
`;


  test('', async () => {
    const time = 2000;
    const spyTime = jest.spyOn(timeModule, 'timeout');
    const spyEvent = jest.spyOn(tagsModule, 'addEventToTag');
    const spyPrint = jest.spyOn(printModule, 'printFilms');
    const spyLoader = jest.spyOn(infoModule, 'removeLoader');


    getFilms().then((data) => {
      expect(data).toBe(filmsApi);

      const select = document.querySelector('select');
      const option = document.querySelector('option');
      const infoSection = document.querySelector('div');

      expect(select.tagName).toBe('SELECT');
      expect(option.tagName).toBe('OPTION');
      expect(infoSection.innerHTLM.legth).toBe(0);


      expect(spyLoader).toHaveBeenCalled();
      expect(spyEvent).toHaveBeenCalled();
      expect(spyPrint).toHaveBeenCalled();
    });

    expect(spyTime).toHaveBeenCalled();
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), time);
  });
});
