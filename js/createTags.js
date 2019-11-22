import { photos } from './photos.js';
import { filterFilms } from './main.js';

const totoroImg = 'https://i.pinimg.com/originals/f7/f8/4d/f7f84dc6d93cb70b5ea612fd26f5dd24.jpg';

function addEventToTag(tag, event, func) {
  tag.addEventListener(event, func);
}

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

function createSelectorTag(filmsDirectors) {
  const filterSection = document.querySelector('.main__filter');

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

export {
  createTag,
  createImageTag,
  createSelectorTag,
  addEventToTag,
};
