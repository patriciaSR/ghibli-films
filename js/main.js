'use strict';

const list = document.querySelector('.films__list');
const queryInput = document.querySelector('.filter__input');

const ENDPOINT = 'https://ghibliapi.herokuapp.com/films';

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
    const newText = document.createTextNode(film.title);
    newLi.appendChild(newText);
    return newLi;
  })

  for (const film of newFilms) {
    list.appendChild(film);
  }
};

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
