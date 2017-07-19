cerebro
.controller('mainCtrl', function($scope, $tempus) {
	$scope.tempus = $tempus;

	console.log( $tempus.format("dd MMM") );
});
