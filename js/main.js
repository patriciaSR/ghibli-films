/* eslint-disable lines-around-directive */
/* eslint-disable import/extensions */
/* eslint-disable strict */
'use strict';

import { callApi } from './callApi.js';
import { createSelectorTag } from './createTags.js';

import { printFilms } from './printFilms.js';
import { addLoader, removeLoader } from './infoSection.js';
import { filterFilms, getFilters } from './filterFilms.js';

const queryInput = document.querySelector('.filter__input');
const infoSection = document.querySelector('.films__info-container');


const ENDPOINT = 'https://ghibliapi.herokuapp.com/films';

let filmsData = [];
const filmsDirectors = [];

function getDirectors(films) {
  films.map((film) => {
    if (!filmsDirectors.includes(film.director)) {
      filmsDirectors.push(film.director);
    }
    return filmsDirectors;
  });

  createSelectorTag(filmsDirectors, filmsData);
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
  getDirectors(filmsData);

  return printFilms(filmsData);
}

getFilms();

// addEventListeners
queryInput.addEventListener('keyup', () => {
  const filters = getFilters();

  const filteredFilms = filterFilms(filmsData, filters);

  printFilms(filteredFilms);
});
