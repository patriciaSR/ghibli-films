import { createTag, createImageTag, addEventToTag } from './createTags.js';

const infoSection = document.querySelector('.films__info-container');

function unfoldDescription(event) {
  const Descriptiontitle = event.currentTarget;
  const nextTextDescription = Descriptiontitle.nextSibling;
  nextTextDescription.classList.toggle('hidden');
}

function printFilms(films) {
  const list = document.querySelector('.films__list');

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

export { printFilms };
