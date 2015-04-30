
app.controller('MenuController', function($scope, $state, UserService) {

    $scope.logout = function() {
        UserService.clear();
        $state.go('login');
    };
});