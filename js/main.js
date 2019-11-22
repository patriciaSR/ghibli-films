/* eslint-disable lines-around-directive */
/* eslint-disable import/extensions */
/* eslint-disable strict */
'use strict';

import { callApi } from './service.js';
import { createTag, createImageTag, createSelectorTag, addEventToTag } from './createTags.js';
import { filterFilms } from './filterFilms.js';


const infoSection = document.querySelector('.films__info-container');
const list = document.querySelector('.films__list');
const queryInput = document.querySelector('.filter__input');


const ENDPOINT = 'https://ghibliapi.herokuapp.com/films';

let filmsData = [];
const filmsDirectors = [];


function loader() {
  const newLoader = createTag('p', 'Loading...', 'spinner');

  return infoSection.appendChild(newLoader);
}

function unfoldDescription(event) {
  const Descriptiontitle = event.currentTarget;
  const nextTextDescription = Descriptiontitle.nextSibling;
  nextTextDescription.classList.toggle('hidden');
}

function printFilms(films) {
  list.innerHTML = '';
  infoSection.innerHTML = '';

  const newFilms = films.map((film) => {
    const newFilm = createTag('li', '', 'list__film');

    const newTitle = createTag('h2', film.title, 'film__title');

    const newImage = createImageTag(film.title);

    const newDescriptionTitle = createTag('h3', 'Description >', 'film__description-title');
    const newDescription = createTag('p', film.description, 'film__description-text');

    newDescription.classList.add('hidden');

    addEventToTag(newDescriptionTitle, 'click', unfoldDescription);

    newFilm.appendChild(newTitle);
    newFilm.appendChild(newImage);
    newFilm.appendChild(newDescriptionTitle);
    newFilm.appendChild(newDescription);

    return newFilm;
  });

  newFilms.map((film) => list.appendChild(film));
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
