import { callApi } from './callApi.js';
import { printFilms } from './printFilms.js';
import { removeLoader } from './infoSection.js';
import { filterFilms, getFilters } from './filterFilms.js';
import { timeout } from './timeout.js';
import { createDirectorsSelect } from './getDirectors.js';
import { addEventToTag } from './createTags.js';

const ENDPOINT = 'https://ghibliapi.herokuapp.com/films';

let filmsData = [];

const queryInput = document.querySelector('.filter__input');
const infoSection = document.querySelector('.films__info-container');
const list = document.querySelector('.films__list');

async function getFilms() {
  await timeout(2000);
  filmsData = await callApi(ENDPOINT, infoSection);

  removeLoader();
  const DirectorSelect = createDirectorsSelect(filmsData);

  addEventToTag(DirectorSelect, 'change', () => {
    const filters = getFilters(queryInput);
    const filteredFilms = filterFilms(filmsData, filters);

    printFilms(list, infoSection, filteredFilms);
  });

  return printFilms(list, infoSection, filmsData);
}

export { getFilms };
