'use strict';

import { callApi } from './callApi.js';
import { createSelectTag, addEventToTag } from './createTags.js';
import { printFilms } from './printFilms.js';
import { addLoader, removeLoader } from './infoSection.js';
import { filterFilms, getFilters } from './filterFilms.js';

const queryInput = document.querySelector('.filter__input');

const ENDPOINT = 'https://ghibliapi.herokuapp.com/films';

let filmsData = [];

function getDirectors(films) {
  const filmsDirectors = [];

  films.forEach((film) => {
    if (!filmsDirectors.includes(film.director)) {
      filmsDirectors.push(film.director);
    }
  });

  return filmsDirectors;
}

function createDirectorsSelect(films) {
  const directors = getDirectors(films);
  const newSelect = createSelectTag(directors, 'Selecciona un director...', 'directors');
  const filterSection = document.querySelector('.main__filter');

  addEventToTag(newSelect, 'change', () => {
    const filters = getFilters();
    const filteredFilms = filterFilms(films, filters);

    printFilms(filteredFilms);
  });

  filterSection.appendChild(newSelect);
}

function timeout(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

async function getFilms() {
  addLoader();
  await timeout(2000);
  filmsData = await callApi(ENDPOINT);

  removeLoader();
  createDirectorsSelect(filmsData);

  return printFilms(filmsData);
}

getFilms();

// addEventListeners
queryInput.addEventListener('keyup', () => {
  const filters = getFilters();

  const filteredFilms = filterFilms(filmsData, filters);

  printFilms(filteredFilms);
});
