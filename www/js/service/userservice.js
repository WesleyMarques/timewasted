
app.service('UserService', function($state, $rootScope, $firebase, $firebaseArray, $window) {

    self = this;
    this.url = 'https://timewasted.firebaseio.com/api/user';

    this.getAtividadesSemana = function() {
        var id = getId();
        var get = this.url + "/" + id + "/activity";
        return $firebaseArray(new Firebase(get));
    };

    this.getAtividade = function(idAtividade) {
        var id = getId();
        var get = this.url + "/" + id + "/activity/" + idAtividade;
        var atividade;
        new Firebase(get).once('value', function(snap) {
             atividade = snap.val();
        });
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

    function getId() {
        return $window.sessionStorage.token;
    };

    this.getAllAtividades = function() {
        var id = getId();
        var get = this.url + "/" + id + "/activity";
        return $firebaseArray(new Firebase(get));
    };

    this.postAtividade = function(atividade) {
        var id = getId();;
        var post = this.url + "/" + id + "/activity";
        var api = new Firebase(post);
        api.push(atividade);
    };

});
