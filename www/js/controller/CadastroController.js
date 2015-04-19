var app = angular.module('starter');

/**
 * Controller para tela inicial de cadastro de atividades
 *
 * @author Júlio L.
 */
app.controller('CadastroCtrl', function($scope, $stateParams, $ionicModal) {

    // Código apenas para o modal de cadastro
    $ionicModal.fromTemplateUrl('cadastrar-atividade.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal
    });

    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    // fim do código do modal

    self = this;
    // TODO adicionar ao usuário no servidor
    // conjunto de atividades cadastradas
    self.atividades = [];
    this.name = undefined;
    this.hour = undefined;

    /**
     * Função ao clicar para adicionar uma atividade.
     * Botão floating action
     */
    this.adicionarAtividade = function() {
        $scope.modal.show();
    };

    /**
     * Função para esconder o modal
     */
    function fecharModal() {
        $scope.modal.hide();
    }

    /**
     * Função para obter o dia da semana
     * em que a atividade está sendo cadastrada.
     *
     * @returns {String} contendo o dia da semana
     * que está sendo cadastrado. [Sun, Mon, Tue, Wed, Thu, Fri, Sat]
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
     * Função para limpar os campos do controller após o cadastro.
     */
    function clear() {
        self.name = undefined;
        self.hour = undefined;
    };

    /**
     *  Função do botão de cancelar.
     */
    this.cancelButton = function() {
        fecharModal();
        clear();
    };
});