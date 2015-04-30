
app.controller('MenuController', function($scope, $state, UserService) {

    $scope.logout = function() {
        UserService.cache.put('user', undefined);
        $state.go('login');
    };
});