var app = angular.module('starter');

/**
 * Controller para tela inicial de cadastro de atividades
 *
 * @author Júlio L.
 */
app.controller('ViewController', function ($scope, $stateParams, UserService, $firebaseObject) {


    this.url = 'https://timewasted.firebaseio.com/api/user'
        + "/" + UserService.getId() + "/activity/" + $stateParams.idActivity ;
    console.log(this.url);
    var ref = new Firebase(this.url);
    var sycn = $firebaseObject(ref);

    sycn.$bindTo($scope, "atividade");

});