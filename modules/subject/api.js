var only = require('only');
var model = require('./model.js');

// The publicly accessible methods
var api = [
  'byLesson',
  'addLesson',
  'get',
  'needed'
];

module.exports = only(require('./model'), api);
