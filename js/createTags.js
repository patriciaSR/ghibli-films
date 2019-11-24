import { photos } from './photos.js';

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

function createSelectTag(options, defaultText, infoClass) {
  const newSelectContainer = createTag('div', '', 'filter__select-container');
  const newSelect = createTag('select', '', `${infoClass}__select`);
  const defaultOption = createTag('option', defaultText, `${infoClass}__option`);
  newSelect.appendChild(defaultOption);

  options.forEach((option) => {
    const newOption = createTag('option', option, `${infoClass}__option`);
    newSelect.appendChild(newOption);
  });

  newSelectContainer.appendChild(newSelect);

  return newSelectContainer;
}

export {
  createTag,
  createImageTag,
  createSelectTag,
  addEventToTag,
};
