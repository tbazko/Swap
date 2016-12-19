'use strict';
const request = require('request');
const baseUrl = 'http://localhost:3000';
let fakeUser = {id: 1};
request.user = fakeUser;

describe('Index Page (routing check)', function() {
  it('GET / on render returns status code 200', function(done) {
    request.get(baseUrl, function(error, response, body) {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  it('GET /tag/:id/ on render returns status code 200', function(done) {
    request.get(baseUrl + '/tag/anime/', function(error, response, body) {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  it('GET /user/items on render returns status code 200', function(done) {
    request.get(baseUrl + '/user/items/', function(error, response, body) {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  it('GET /item/2 on render returns status code 200', function(done) {
    request.get(baseUrl + '/item/2', function(error, response, body) {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  it('GET /item/create on render returns status code 200', function(done) {
    request.get(baseUrl + '/item/create', function(error, response, body) {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  it('POST /user/items on render returns status code 200', function(done) {
    request.post(baseUrl + '/user/items', function(error, response, body) {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
});
