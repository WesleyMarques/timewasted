var app = angular.module('starter');

/**
 * Controller para login da aplica��o.
 *
 * @author J�lio L.
 */
app.controller('LoginController', function ($scope, $firebase, $state) {

    $scope.login = function() {
        var ref = new Firebase("https://timewasted.firebaseio.com");
        ref.authWithOAuthPopup("google", function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                console.log("Authenticated successfully with payload:", authData);
                $state.go('app.cadastro');
            }
        });
    };

});