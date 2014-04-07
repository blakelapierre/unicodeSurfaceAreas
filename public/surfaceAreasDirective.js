var angular = require('angular');

module.exports = function() {
	return {
		restrict: 'E',
		template: require('./surfaceAreasTemplate.html'),
		controller: function($scope) {
			$scope.characters = [];

			var start = 0xa0,
				range = 0xff,
				end = start + range;

			for (var i = start; i < end; i++) {
				$scope.characters.push({
					value: String.fromCharCode(i)
				});
			}
		}
	}
};