
app.service('UserService', function($state, $rootScope, $firebase, $firebaseArray, $window, $firebaseObject) {

    self = this;
    this.url = 'https://timewasted.firebaseio.com/api/user';

    this.getAtividadesSemana = function() {
        var id = this.getId();
        var get = this.url + "/" + id + "/activity";
        return $firebaseArray(new Firebase(get));
    };

    this.getAtividade = function(idAtividade) {
        var id = getId();
        var get = this.url + "/" + id + "/activity/" + idAtividade;
        var ref = new Firebase(get);
        var atividade = $firebaseObject(ref);
        console.log("AQUI");
        console.log(atividade);
        return atividade;
    };

    this.save = function(auth) {
        $window.sessionStorage.token = auth.google.id;
    };

    this.clear = function() {
        $window.sessionStorage.token = undefined;
    };

    this.isLoginActive = function() {
        return _.isUndefined($window.sessionStorage.token);
    };

    this.getId = function() {
        return $window.sessionStorage.token;
    };

    this.getAllAtividades = function() {
        var id = getId();
        var get = this.url + "/" + id + "/activity";
        return $firebaseArray(new Firebase(get));
    };

    this.postAtividade = function(atividade) {
        var id = this.getId();
        var post = this.url + "/" + id + "/activity";
        var api = new Firebase(post);
        api.push(atividade);
    };

});
