/**
 * Controller para tela inicial de cadastro de atividades
 *
 * @author Julio L.
 */
app.controller('CadastroController', function ($scope, $state, $stateParams, $ionicModal, UserService) {

    $scope.urlImage = null;

    $ionicModal.fromTemplateUrl('cadastrar-atividade.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal
    });

    $scope.$on('$destroy', function () {
        $scope.modal.remove();
    });

    self = this;
    // TODO adicionar ao usu�rio no servidor

    //Fun��o para pegar URL da imagem
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

    //Fun��o para captura URL de uma imagem do celular
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
            encodingType: Camera.EncodingType.JPEG,
            allowEdit : true,
            saveToPhotoAlbum: false,
            targetWidth: 400,
            targetHeight: 400,
            popoverOptions: CameraPopoverOptions,
            correctOrientation: true
        });
    };

    //Fun��o para captura URL de uma imagem do celular
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
            sourceType: Camera.PictureSourceType.CAMERA,
            mediaType: Camera.MediaType.PICTURE,
            encodingType: Camera.EncodingType.JPEG,
            allowEdit : true,
            saveToPhotoAlbum: false,
            targetWidth: 400,
            targetHeight: 400,
            popoverOptions: CameraPopoverOptions,
            correctOrientation: true
        });

    };

    /**
     * Fun��o ao clicar para adicionar uma atividade.
     * Bot�o floating action
     */
    this.adicionarAtividade = function () {
        $scope.modal.show();
    };

    /**
     * Fun��o para esconder o modal
     */
    function fecharModal() {
        $scope.modal.hide();
    };

    self = this;
    this.name = undefined;
    this.begin = undefined;
    this.end = undefined;
    this.priority = undefined;
    this.displayDay = true;

    this.atividades = UserService.getAtividadesSemana();

    /**
     * Salva o cadastro de uma nova atividade.
     */
    this.doneButton = function () {
        if (isCadastroValido) {
            var atividade = {
                name : self.name,
                begin : getInitDate(),
                end : getFinalDate(),
                priority : self.priority,
                date : new Date().getTime(),
                image: $scope.getUrlImage()
            };
            UserService.postAtividade(atividade);
            fecharModal();
            clear();
        }
    };

    this.display = function() {
        if (self.displayDay) {
            return 'Meu dia';
        }
        return 'Minha semana';
    };

    this.changeDisplay = function() {
        self.displayDay = !self.displayDay;
    };

    function isCadastroValido() {
        return !_.isUndefined(self.name)
            && !_.isUndefined(self.begin)
            && !_.isUndefined(self.end)
            && !_.isUndefined(self.priority);
    };

    function getInitDate() {
        var date = new Date();
        var hour = self.begin.getHours();
        var minutes = self.begin.getMinutes();
        date.setHours(hour);
        date.setMinutes(minutes);
        return date.getTime();
    };

    function getFinalDate() {
        var date = new Date();
        var date = new Date();
        var hour = self.end.getHours();
        var minutes = self.end.getMinutes();
        date.setHours(hour);
        date.setMinutes(minutes);
        if (self.end < self.begin) {
            date.setDate(date.getDate() + 1);
        }
        return date.getTime();
    };

    /**
     * Fun��o para limpar os campos do controller ap�s o cadastro.
     */
    function clear() {
        self.name = undefined;
        self.begin = undefined;
        self.end = undefined;
        self.priority = undefined;
    };

    this.verAtividade = function(index) {
        var id = self.atividades[index].$id;
        $state.go("app.view", {idActivity : id});
    };

    /**
     *  Fun��o do bot�o de cancelar.
     */
    this.cancelButton = function () {
        fecharModal();
        clear();
    };

    this.formataData = function(data) {
        var data = new Date(data);
        var hora = ("0" + (data.getHours())).slice(-2) + ":" + ("0" + (data.getMinutes())).slice(-2);
        var data = " - " + data.getDate() + "/" + ("0" + (data.getMonth() + 1)).slice(-2) + "/" + data.getFullYear();
        return hora + data;
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
