'use strict';

const list = document.querySelector('.films__list');
const queryInput = document.querySelector('.filter__input');

const ENDPOINT = 'https://ghibliapi.herokuapp.com/films';
const totoroImg = 'https://i.pinimg.com/originals/f7/f8/4d/f7f84dc6d93cb70b5ea612fd26f5dd24.jpg';

let filmsData = [];

loadingMsg();
setTimeout(sendRequest, 5000);

// //get films from API with fetch
// function sendRequest() {
//   fetch(ENDPOINT)
//     .then(res => res.json())
//     .then(data => {
//       filmsData = data;

//       return printList(filmsData)
//     })
//     .catch(error => console.log(error))
// }

function loadingMsg() {
  const newP = document.createElement('p');
  const newText = document.createTextNode('Loading...');
  newP.add
  newP.appendChild(newText);
  return list.appendChild(newP);
}

function printList(films) {
  list.innerHTML = '';

  const newFilms = films.map(film => {
    const newLi = document.createElement('li');
    newLi.classList.add('list__film');
    const newTitle = createTag('h2', film.title);
    const newImg = createTag('img', film.title, totoroImg);
    const newDescriptionTitle = createTag('h3', 'Descripción');
    const newDescription = createTag('p', film.description);
    
    
    newLi.appendChild(newTitle);
    newLi.appendChild(newImg);
    newLi.appendChild(newDescriptionTitle);
    newLi.appendChild(newDescription);

    return newLi;
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

function filterFilms() {
  const query = queryInput.value.toUpperCase();
  const filteredFilms = filmsData.filter(film => film.title.toUpperCase().includes(query));

  return printList(filteredFilms);
}

//addEventListeners
queryInput.addEventListener('keyup', filterFilms);




// Opción 2 --> get films from API with async/await

async function sendRequest() {
  try {
    let res = await fetch(ENDPOINT);
    let data = await res.json();
    let films = await getfilms(data);

    return films;

  } catch (error) {
    console.log(error);
  }
}

function getfilms(data) {
  filmsData = data;

  return printList(filmsData)
}
