var angular = require('angular');

module.exports = angular.module('unicodeSurfaceAreas', [])
.directive('surfaceAreas', require('./surfaceAreasDirective'));