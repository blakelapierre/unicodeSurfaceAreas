var angular = require('angular'),
	_ = require('lodash');

module.exports = function() {
	return {
		restrict: 'E',
		template: require('./surfaceAreasTemplate.html'),
		controller: function($scope) {
			$scope.start = createNumberScope(0);
			$scope.range = createNumberScope(64);
			$scope.end = $scope.start.value + $scope.range.value;
			$scope.fontSize = createNumberScope(12);

			var canvas = document.createElement('canvas'),
				ctx = canvas.getContext('2d');

			$scope.updateCharacters = _.debounce(function() {
				var start = $scope.start.value,
					range = $scope.range.value,
					end = start + range,
					fontSize = $scope.fontSize.value;

				var characters = [];
				$scope.end = end;

				ctx.font = fontSize + 'px sans-serif';


				for (var c = start; c < end; c++) {
					var character = String.fromCharCode(c),
						metric = ctx.measureText(character),
						usedArea = 0;

					if (metric.width > 0) {
						canvas.width = metric.width;
						canvas.height = fontSize;
						ctx.clearRect(0, 0, canvas.width, canvas.height);
						ctx.fillText(character, 0, fontSize);

						var imageData = ctx.getImageData(0, 0, metric.width, fontSize),
							data = imageData.data;

						for (var i = 0; i < data.length; i += 4) {
							if (data[i + 3] != 0) usedArea++;
						}
					}

					var totalArea = metric.width * fontSize;
					characters.push({
						value: c,
						character: character,
						totalArea: totalArea,
						usedArea: usedArea,
						usedRelativeArea: usedArea / totalArea,
						imageURL: metric.width > 0 ? canvas.toDataURL('image/png') : ''
					});
				}

				characters = _.sortBy(characters, ['usedArea']);

				$scope.characters = characters;

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