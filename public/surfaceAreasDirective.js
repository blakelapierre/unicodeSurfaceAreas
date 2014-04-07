var angular = require('angular'),
	_ = require('lodash');

module.exports = function() {
	return {
		restrict: 'E',
		template: require('./surfaceAreasTemplate.html'),
		controller: function($scope) {
			$scope.start = createNumberScope(0);
			$scope.range = createNumberScope(256);
			$scope.end = $scope.start.value + $scope.range.value;

			$scope.updateCharacters = _.debounce(function() {
				console.log('updating');
				var start = $scope.start.value,
					range = $scope.range.value,
					end = start + range;

				$scope.end = end;
				$scope.characters = [];

				for (var i = start; i < end; i++) {
					$scope.characters.push({
						value: String.fromCharCode(i)
					});
				}

				$scope.$apply();
			}, 30);

			$scope.updateCharacters();
		}
	};
};

var createNumberScope = function(initialValue) {
	var value = initialValue;
	return Object.defineProperties({}, {
		value: {
			get: function() { return value; },
			set: function(v) { value = parseInt(v); }
		}
	});
};