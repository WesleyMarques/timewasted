var app = angular.module('starter');

/**
 * Controller para tela inicial de cadastro de atividades
 *
 * @author J�lio L.
 */
app.controller('CadastroCtrl', function($scope, $stateParams, $ionicModal) {

    // C�digo apenas para o modal de cadastro
    $ionicModal.fromTemplateUrl('cadastrar-atividade.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal
    });

    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    // fim do c�digo do modal

    self = this;
    // TODO adicionar ao usu�rio no servidor
    // conjunto de atividades cadastradas
    self.atividades = [];
    this.name = undefined;
    this.hour = undefined;

    /**
     * Fun��o ao clicar para adicionar uma atividade.
     * Bot�o floating action
     */
    this.adicionarAtividade = function() {
        $scope.modal.show();
    };

    /**
     * Fun��o para esconder o modal
     */
    function fecharModal() {
        $scope.modal.hide();
    }

    /**
     * Fun��o para obter o dia da semana
     * em que a atividade est� sendo cadastrada.
     *
     * @returns {String} contendo o dia da semana
     * que est� sendo cadastrado. [Sun, Mon, Tue, Wed, Thu, Fri, Sat]
     */
    function getDay() {
        var data = new Date();
        return data.toString().split(" ")[0];
    };

    /**
     * Salva o cadastro de uma nova atividade.
     */
    this.doneButton = function() {
        fecharModal();
        if (!_.isUndefined(self.name)
            && !_.isUndefined(self.hour)) {
            self.atividades.push({
                name : self.name,
                hour : self.hour,
                day : getDay()
            });
        }
        clear();
    };

    /**
     * Fun��o para limpar os campos do controller ap�s o cadastro.
     */
    function clear() {
        self.name = undefined;
        self.hour = undefined;
    };

    /**
     *  Fun��o do bot�o de cancelar.
     */
    this.cancelButton = function() {
        fecharModal();
        clear();
    };
});