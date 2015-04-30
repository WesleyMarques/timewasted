
app.service('UserService', function($state, $rootScope, $cacheFactory, $firebase, $firebaseArray) {

    self = this;
    this.cache = $cacheFactory('cache-user');
    this.url = 'https://timewasted.firebaseio.com/api/user';

    this.getAtividadesSemana = function() {
        var id = this.cache.get('user').google.id;
        var get = this.url + "/" + id + "/activity";
        return $firebaseArray(new Firebase(get));
    };

    this.getAllAtividades = function() {
        var id = this.cache.get('user').google.id;
        var get = this.url + "/" + id + "/activity";
        return $firebaseArray(new Firebase(get));
    };

    this.postAtividade = function(atividade) {
        var id = this.cache.get('user').google.id;
        var post = this.url + "/" + id + "/activity";
        var api = new Firebase(post);
        api.push(atividade);
    };

});