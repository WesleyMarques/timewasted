'use strict';
describe('Controllers', function(){
    var scope;

    // load the controller's module
    beforeEach(module('app'));

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        $controller('CadastroController', {$scope: scope});
    }));

    // tests start here
    it('should have enabled friends to be true', function(){
        expect(scope.urlImage).toEqual(null);
    });
});
