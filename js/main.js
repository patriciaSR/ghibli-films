'use strict';

const listSection = document.querySelector('.films');
const list = document.querySelector('.films__list');
const queryInput = document.querySelector('.filter__input');

const ENDPOINT = 'https://ghibliapi.herokuapp.com/films';
const totoroImg = 'https://i.pinimg.com/originals/f7/f8/4d/f7f84dc6d93cb70b5ea612fd26f5dd24.jpg';

let filmsData = [];

loader();
setTimeout(getFilms, 4000);

// //get films from API with fetch
// function getFilms() {
//   fetch(ENDPOINT)
//     .then(res => res.json())
//     .then(data => {
//       filmsData = data;

//       return printList(filmsData)
//     })
//     .catch(error => console.log(error))
// }

function loader() {
  const newLoader= createTag('p', 'Loading...');
  newLoader.classList.add('spinner');
  
  return listSection.appendChild(newLoader);
}

function printList(films) {
  list.innerHTML = '';

  const newFilms = films.map(film => {
    const newFilm = document.createElement('li');
    newFilm.classList.add('list__film');
    
    const newTitle = createTag('h2', film.title);
    const newImage = createTag('img', film.title, totoroImg);
    const newDescriptionTitle = createTag('h3', 'Descripción >');
    const newDescription = createTag('p', film.description);
    
    newDescription.classList.add('hidden');

    addEventToTag(newDescriptionTitle, unfoldDescription);

    newFilm.appendChild(newTitle);
    newFilm.appendChild(newImage);
    newFilm.appendChild(newDescriptionTitle);
    newFilm.appendChild(newDescription);

    return newFilm;
  })

  for (const film of newFilms) {
    list.appendChild(film);
  }
};

function createTag(tag, text, src) {
  const newTag = document.createElement(tag);

  if (tag === 'img') {
    newTag.src = src;
    newTag.alt = text;

    return newTag
  } else {
    const newText = document.createTextNode(text);
    newTag.appendChild(newText);

    return newTag;
  }
}

function addEventToTag(tag, func) {
  tag.addEventListener('click', func);
}

function unfoldDescription(e) {
  const Descriptiontitle = event.currentTarget;
  const nextTextDescription = Descriptiontitle.nextSibling;
  nextTextDescription.classList.toggle('hidden');
}

function filterFilms() {
  const query = queryInput.value.toUpperCase();
  const filteredFilms = filmsData.filter(film => (film.title.toUpperCase().includes(query) || film.description.toUpperCase().includes(query)));

  return printList(filteredFilms);
}

//addEventListeners
queryInput.addEventListener('keyup', filterFilms);




// Opción 2 --> get films from API with async/await

async function getFilms() {
  try {
    let res = await fetch(ENDPOINT);
    let data = await res.json();
    filmsData = data;

    listSection.lastChild.remove();
    return printList(filmsData);

  } catch (error) {
    console.log(error);
  }
}

