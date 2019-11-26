const ENDPOINTGOOD = './fixtures.filmsApi.js';
const ENDPOINTBAD = 'https://ghibliapi.herokuappjasdjkh';

const mockFilms = [
  {
    title: 'hola',
    description: 'no',
    director: 'patricia',
  },
  {
    title: 'adios',
    description: 'no',
    director: 'chus',
  },
  {
    title: 'byeo',
    description: 'yes',
    director: 'luis',
  },
];

const totoroImg = 'https://i.pinimg.com/originals/f7/f8/4d/f7f84dc6d93cb70b5ea612fd26f5dd24.jpg';

const photosFakeArr = [
  {
    name: 'patricia',
    photo: 'patriciaURL',
  },
  {
    name: 'paco',
    photo: 'pacoURL',
  },
];

export {
  ENDPOINTGOOD,
  ENDPOINTBAD,
  mockFilms,
  photosFakeArr,
  totoroImg,
};
