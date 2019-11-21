/* eslint-disable lines-around-directive */
/* eslint-disable import/extensions */
/* eslint-disable strict */
'use strict';

import { photos } from './photos.js';

const filterSection = document.querySelector('.main__filter');
const infoSection = document.querySelector('.films__info-container');
const list = document.querySelector('.films__list');
const queryInput = document.querySelector('.filter__input');


const ENDPOINT = 'https://ghibliapi.herokuapp.com/films';
const totoroImg = 'https://i.pinimg.com/originals/f7/f8/4d/f7f84dc6d93cb70b5ea612fd26f5dd24.jpg';
const totoroSad = 'images/totoroSad.gif';

let filmsData = [];
const filmsDirectors = [];

function createTag(tag, text, className, src) {
  const newTag = document.createElement(tag);
  newTag.classList.add(className);

  if (tag === 'img') {
    newTag.src = src;
    newTag.alt = text;
  } else {
    const newText = document.createTextNode(text);
    newTag.appendChild(newText);
  }

  return newTag;
}

function addEventToTag(tag, event, func) {
  tag.addEventListener(event, func);
}

function createImageTag(name) {
  const selectedImage = photos.find((photo) => photo.name === name);
  let newImage;

  if (selectedImage) {
    newImage = createTag('img', name, 'film__image', selectedImage.photo);
  } else {
    newImage = createTag('img', name, 'film__image', totoroImg);
  }

  return newImage;
}

function loader() {
  const newLoader = createTag('p', 'Loading...', 'spinner');

  return infoSection.appendChild(newLoader);
}

function noResults() {
  list.innerHTML = '';

  const noResult = `<div class="noResults__container">
                      <p class="noResults__text">No hay resultados :( </p>
                      <img class="noResults__gif" src=${totoroSad} alt="Gif no hay resultados" />
                    </div>`;

  infoSection.innerHTML = noResult;
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

function filterFilms() {
  const queryText = queryInput.value.toUpperCase();
  const querySelect = document.querySelector('.directors__select').value;
  const isDirectorSelected = querySelect !== 'Selecciona un director...';

  const filteredFilms = filmsData
    .filter((film) => (film.title.toUpperCase().includes(queryText) || film.description.toUpperCase().includes(queryText)))
    .filter((film) => (isDirectorSelected ? film.director === querySelect : true));

  if (!filteredFilms.length) {
    return noResults();
  }

  return printFilms(filteredFilms);
}

function createSelectorTag() {
  const newSelectContainer = createTag('div', '', 'filter__select-container');
  const newSelect = createTag('select', '', 'directors__select');
  const defaultOption = createTag('option', 'Selecciona un director...', 'directors__option');
  newSelect.appendChild(defaultOption);

  filmsDirectors.map((director) => {
    const newOption = createTag('option', director, 'directors__option');
    newSelect.appendChild(newOption);
    return newSelect;
  });

  addEventToTag(newSelect, 'change', filterFilms);

  newSelectContainer.appendChild(newSelect);
  filterSection.appendChild(newSelectContainer);
}

function getDirectors(films) {
  films.map((film) => {
    if (!filmsDirectors.includes(film.director)) {
      filmsDirectors.push(film.director);
    }
    return filmsDirectors;
  });

  createSelectorTag();
}

async function getFilms() {
  try {
    const res = await fetch(ENDPOINT);
    const data = await res.json();
    filmsData = data;

    infoSection.lastChild.remove();
    getDirectors(filmsData);
  } catch (error) {
    return error;
  }

  return printFilms(filmsData);
}

loader();
setTimeout(getFilms, 4000);

// addEventListeners
queryInput.addEventListener('keyup', filterFilms);
