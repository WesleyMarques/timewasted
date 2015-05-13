'use strict';
describe('Controllers', function(){
    var scope,ctrl;

    // load the controller's module
    beforeEach(angular.mock.module('app'));  
    beforeEach(angular.mock.inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        ctrl =  $controller('CadastroController', {$scope: scope});
    }));  

    it('should have all Controllers started',function(){
        expect(ctrl).toBeDefined();
    });
    
});