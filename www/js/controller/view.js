var app = angular.module('starter');

/**
 * Controller para tela inicial de cadastro de atividades
 *
 * @author Júlio L.
 */
app.controller('ViewController', function ($scope, $stateParams, UserService) {
    $scope.atividade = undefined;


    $scope.atidade = UserService.getAtividade($stateParams.idActivity);

});