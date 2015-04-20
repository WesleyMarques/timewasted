var app = angular.module('starter');

/**
 * Controller para tela inicial de cadastro de atividades
 *
 * @author Júlio L.
 */
app.controller('CadastroCtrl', function ($scope, $stateParams, $ionicModal) {

    $scope.urlImage = null;

    // Código apenas para o modal de cadastro
    $ionicModal.fromTemplateUrl('cadastrar-atividade.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal
    });

    $scope.$on('$destroy', function () {
        $scope.modal.remove();
    });
    // fim do código do modal

    self = this;
    // TODO adicionar ao usuário no servidor

    //Função para pegar URL da imagem
    $scope.getUrlImage = function(){
        if ($scope.imageUri == null) {
            return "img/icone_camera.jpg";
        }
        return $scope.imageUri;
    };

    $scope.setUrlImage = function(url){
        $scope.imageUri = url;
    };

    $scope.getPicture = function(type){
        if(type === 1){
            $scope.getPictureFromCamera();
        }else{
            $scope.getPictureFromGalery();
        }

    };

    //Função para captura URL de uma imagem do celular
    $scope.getPictureFromCamera  = function(){
        navigator.camera.getPicture(function (imageData) {
            $scope.setUrlImage("data:image/jpeg;base64," + imageData);
            document.getElementById("imageId").src = "data:image/jpeg;base64," + imageData;
            $scope.$apply();
        }, function () {
            alert("Nenhuma imagem foi selecionada");
        }, {
            mQuality: 100,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            mediaType: Camera.MediaType.PICTURE,
            saveToPhotoAlbum: false,
            targetWidth: 250,
            targetHeight: 250,
            correctOrientation: true
        });
    };

    //Função para captura URL de uma imagem do celular
    $scope.getPictureFromGalery  = function(){
        navigator.camera.getPicture(function (imageData) {
            $scope.setUrlImage("data:image/jpeg;base64," + imageData);
            document.getElementById("imageId").src = "data:image/jpeg;base64," + imageData;
            $scope.$apply();
        }, function () {
            alert("Nenhuma imagem foi selecionada");
        }, {
            mQuality: 100,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            mediaType: Camera.MediaType.PICTURE,
            saveToPhotoAlbum: false,
            targetWidth: 250,
            targetHeight: 250,
            correctOrientation: true
        });

    };






    // conjunto de atividades cadastradas
    self.semana = [
        {
            day: 'Sunday', atividades: []
        }, {
            day: 'Monday', atividades: []
        }, {
            day: 'Tuesday ', atividades: []
        }, {
            day: 'Wednesday ', atividades: []
        }, {
            day: 'Thursday ', atividades: []
        }, {
            day: 'Friday ', atividades: []
        }, {
            day: 'Saturday', atividades: []
        }
    ];

    this.name = undefined;
    this.hour = undefined;

    /**
     * Função ao clicar para adicionar uma atividade.
     * Botão floating action
     */
    this.adicionarAtividade = function () {
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
     * Função para obter o índice do dia da semana
     *
     * @param {@String} dia sigla do dia
     * @returns {number} o índice do dia da semana.
     */
    function getWeek(dia) {
        switch (dia) {
            case 'Sun':
                return 0;
            case 'Mon':
                return 1;
            case 'Tue':
                return 2;
            case 'Wed':
                return 3;
            case 'Thu':
                return 4;
            case 'Fri':
                return 5;
            default:
                return 6;
        }
    };

    /**
     * Salva o cadastro de uma nova atividade.
     */
    this.doneButton = function () {
        fecharModal();
        if (!_.isUndefined(self.name)
            && !_.isUndefined(self.hour) && !_.isUndefined(self.priority)) {
            var dia = getDay();
            self.semana[getWeek(dia)].atividades.push({
                name: self.name,
                hour: self.hour,
                priority: self.priority,
                day: dia
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
    this.cancelButton = function () {
        fecharModal();
        clear();
    };

    /*
     * if given group is the selected group, deselect it
     * else, select the given group
     */
    $scope.toggleGroup = function (group) {
        if ($scope.isGroupShown(group)) {
            $scope.shownGroup = null;
        } else {
            $scope.shownGroup = group;
        }
    };
    $scope.isGroupShown = function (group) {
        return $scope.shownGroup === group;
    };
});