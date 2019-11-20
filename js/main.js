'use strict';

const filterSection = document.querySelector('.filter');
const infoSection = document.querySelector('.films__info-container');
const list = document.querySelector('.films__list');
const queryInput = document.querySelector('.filter__input');

const ENDPOINT = 'https://ghibliapi.herokuapp.com/films';
const totoroImg = 'https://i.pinimg.com/originals/f7/f8/4d/f7f84dc6d93cb70b5ea612fd26f5dd24.jpg';
const totoroSad = '../images/totoroSad.gif';

let filmsData = [];
let filmsDirectors = [];

loader();
setTimeout(getFilms, 4000);

//Opción --> get films from API with fetch
// function getFilms() {
//   fetch(ENDPOINT)
//   .then(res => res.json())
//   .then(data => {
//      filmsData = data;

//      return printList(filmsData)
//   })
//   .catch(error => console.log(error))
// }

// Opción 2 --> get films from API with async/await
async function getFilms() {
  try {
    let res = await fetch(ENDPOINT);
    let data = await res.json();
    filmsData = data;

    infoSection.lastChild.remove();

    return printList(filmsData), getDirectors(filmsData);

  } catch (error) {
      console.log(error);
  }
};

function loader() {
  const newLoader= createTag('p', 'Loading...');
  newLoader.classList.add('spinner');
  
  return infoSection.appendChild(newLoader);
};

function getDirectors(films) {
  films.map((film) => {
    if (!filmsDirectors.includes(film.director)) {
       return filmsDirectors.push(film.director);
    }
  });

  const newSelect = createTag('select', '', 'directors__select');
  const defaultOption = createTag('option', 'Selecciona un director...', 'option__default');
  newSelect.appendChild(defaultOption);
  
  for (const director of filmsDirectors) {
    const newOption = createTag('option', director, 'director__name');
    newSelect.appendChild(newOption);
  }

  addEventToTag(newSelect, 'change', filterFilms);

  filterSection.appendChild(newSelect);
}

function printList(films) {
  list.innerHTML = '';
  infoSection.innerHTML = '';

  const newFilms = films.map(film => {
    const newFilm = document.createElement('li');
    newFilm.classList.add('list__film');
    
    const newTitle = createTag('h2', film.title);

    const newImage = selectImage(film.title);
 
    const newDescriptionTitle = createTag('h3', 'Description >');
    const newDescription = createTag('p', film.description);
    
    newDescription.classList.add('hidden');

    addEventToTag(newDescriptionTitle, 'click', unfoldDescription);

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
};

function selectImage(name) {
  const selectImage = photos.find(photo => photo.name === name);
  let newImage;

  if(selectImage) {
    newImage = createTag('img', name, selectImage.photo);
  }else {
      newImage = createTag('img', name, totoroImg);
    };

  return newImage;
};

function addEventToTag(tag, event, func) {
  tag.addEventListener(event, func);
};

function unfoldDescription(e) {
  const Descriptiontitle = event.currentTarget;
  const nextTextDescription = Descriptiontitle.nextSibling;
  nextTextDescription.classList.toggle('hidden');
};

function filterFilms(e) {
  const query = queryInput.value.toUpperCase();
  const selectValue = e.currentTarget.value;
  const filteredFilms = filmsData
                        .filter(film => (film.title.toUpperCase().includes(query) || film.description.toUpperCase().includes(query)))
                        .filter(film => (selectValue !== 'Selecciona un director...') ? film.director === selectValue : true);

  if(!filteredFilms.length) {
    return noResults();
  }else {
    return printList(filteredFilms);    
  }
};

function noResults() {
  list.innerHTML= '';

  const noResult = `<div class="noResults__container">
                      <p class="noResults__text">No hay resultados :( </p>
                      <img class="noResults__gif" src=${totoroSad} alt="Gif no hay resultados" />
                    </div>`;

  return infoSection.innerHTML = noResult;
};

//addEventListeners
queryInput.addEventListener('keyup', filterFilms);






