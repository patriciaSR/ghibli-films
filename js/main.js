'use strict';

import { callApi } from './callApi.js';
import { createSelectTag, addEventToTag } from './createTags.js';
import { printFilms } from './printFilms.js';
import { addLoader, removeLoader } from './infoSection.js';
import { filterFilms, getFilters } from './filterFilms.js';
import { timeout } from './timeout.js';
import { getDirectors } from './getDirectors.js';

const queryInput = document.querySelector('.filter__input');
const infoSection = document.querySelector('.films__info-container');
const list = document.querySelector('.films__list');

const ENDPOINT = 'https://ghibliapi.herokuapp.com/films';

let filmsData = [];

function createDirectorsSelect(films) {
  const directors = getDirectors(films);
  const newSelect = createSelectTag(directors, 'Selecciona un director...', 'directors');
  const filterSection = document.querySelector('.main__filter');

  addEventToTag(newSelect, 'change', () => {
    const filters = getFilters(queryInput);
    const filteredFilms = filterFilms(films, filters);

    printFilms(list, infoSection, filteredFilms);
  });

  filterSection.appendChild(newSelect);
}

async function getFilms() {
  addLoader(infoSection);
  await timeout(2000);
  filmsData = await callApi(ENDPOINT);

  removeLoader();
  createDirectorsSelect(filmsData);

  return printFilms(list, infoSection, filmsData);
}

getFilms();

// addEventListeners
queryInput.addEventListener('keyup', () => {
  const filters = getFilters();

  const filteredFilms = filterFilms(filmsData, filters);

  printFilms(list, infoSection, filteredFilms);
});
