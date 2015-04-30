
/**
 * Controller para login da aplica��o.
 *
 * @author J�lio L.
 */
app.controller('LoginController', function ($scope, $firebase, $state, UserService) {

    $scope.login = function() {
        // TODO verificar se o cache do usuario esta preenchido
        // caso sim, verificar em seguida se est� com token v�lido
        if (!_.isUndefined(UserService.cache.get('user'))) {
            $state.go('app.cadastro');
        } else {
            var ref = new Firebase("https://timewasted.firebaseio.com");
            ref.authWithOAuthPopup("google", function(error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                } else {
                    UserService.cache.put('user', authData);
                    $state.go('app.cadastro');
                }
            });
        }
    };

});