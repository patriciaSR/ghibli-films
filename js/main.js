/* eslint-disable lines-around-directive */
/* eslint-disable import/extensions */
/* eslint-disable strict */
'use strict';

import { callApi } from './service.js';
import { createSelectorTag } from './createTags.js';

import { printFilms } from './printFilms.js';
import { loader, noResults } from './infoSection.js';

const queryInput = document.querySelector('.filter__input');
const infoSection = document.querySelector('.films__info-container');


const ENDPOINT = 'https://ghibliapi.herokuapp.com/films';

let filmsData = [];
const filmsDirectors = [];


function filterFilms() {
  const querySelect = document.querySelector('.directors__select').value;

  const queryText = queryInput.value.toUpperCase();
  const isDirectorSelected = querySelect !== 'Selecciona un director...';

  const filteredFilms = filmsData
    .filter((film) => (film.title.toUpperCase().includes(queryText) || film.description.toUpperCase().includes(queryText)))
    .filter((film) => (isDirectorSelected ? film.director === querySelect : true));

  if (!filteredFilms.length) {
    return noResults();
  }

  return printFilms(filteredFilms);
}

function getDirectors(films) {
  films.map((film) => {
    if (!filmsDirectors.includes(film.director)) {
      filmsDirectors.push(film.director);
    }
    return filmsDirectors;
  });

  createSelectorTag(filmsDirectors);
}

async function getFilms() {
  filmsData = await callApi(ENDPOINT);

  infoSection.lastChild.remove();
  getDirectors(filmsData);

  return printFilms(filmsData);
}

loader();
setTimeout(getFilms, 2000);

// addEventListeners
queryInput.addEventListener('keyup', filterFilms);

export { filterFilms };
