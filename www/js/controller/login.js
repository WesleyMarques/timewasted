
/**
 * Controller para login da aplicação.
 *
 * @author Júlio L.
 */
app.controller('LoginController', function ($scope, $firebase, $state, UserService) {

    $scope.login = function() {
        var ref = new Firebase("https://timewasted.firebaseio.com");
        ref.authWithOAuthPopup("google", function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                UserService.save(authData);
                $state.go('app.cadastro');
            }
        });
    };

});
