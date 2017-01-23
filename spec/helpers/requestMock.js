'use strict';

let reqWithWrongData = {
  user: {
    id: -1
  },
  params: {
    id: -1
  },
  baseUrl: '/',
  path: 'path/to/smth'
}

let reqWithCorrectData = {
  user: {
    id: 1
  },
  params: {
    id: 2
  },
  baseUrl: '/',
  path: 'user/2'
}

module.exports.wrong = reqWithWrongData;
module.exports.correct = reqWithCorrectData;
