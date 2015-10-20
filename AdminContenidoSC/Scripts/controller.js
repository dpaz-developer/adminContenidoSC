'use strict'

function UserController($scope, $http, $q, $upload, Users, Login, Banners, Broadcast) {

    $scope.name     = '';
    $scope.email    = '';
    $scope.pass     = '';
    $scope.typeUser = '';

    $scope.isCreateUser = true;
    $scope.isLogin = true;
    $scope.userResponseData = "no se hizo la llamda";


    $scope.showDashHome         = true;

    $scope.showDashNewUser      = false;
    $scope.showDashUpdUser      = false;
    $scope.showDashSearchUser   = false;

    $scope.showDashNewBanner        = false;
    $scope.showDashUpdBanner        = false;
    $scope.showDashPreviewBanner    = false;
    



    $scope.init = function(){

        $scope.saludo = "Hola desde Angula en .NET";
        $scope.isCreateUser = true;
        $scope.classMenuInicio = 'active';
        //$scope.showSection;

    };

    

    /*********************** FUNCIONES DE ACCESO ************************************/

    $scope.login = function () {
        console.log("Iniciando el modulo de login");
        console.log("El email es" + $scope.email);
        console.log("El password es" + $scope.pass);

        Login.post({}, function (data) {
            console.log("Entramos al servicio de login");
            $scope.userLoginResponse = data;
            $scope.isLogin = true;
        }, function (error) {
            console.log("Un error en el login");
            $scope.userLoginResponse = "Ocurrio un error en el login" + error;
            $scope.isLogin = true;
        });
    };

    /*********************** FUNCIONES DE USER ************************************/
    $scope.createUser = function () {
        console.log("El nombre es" + $scope.name);
        console.log("El email es" + $scope.email);
        console.log("El pass es" + $scope.pass);
        console.log("El type es" + $scope.typeUser);

        var params = {
            name: $scope.name,
            email: $scope.email,
            pass: $scope.pass,
            type: $scope.typeUser
        };

        console.log("Invocando al metodo crear con accion =" + params.action);

        Users.newUser(params, {}, function (data) {
            console.log("La data es correcta y es" + data);
            $scope.userResponseData = data;
            $scope.isCreateUser = true;
        }, function (error) {
            console.log("ocurrio un error" + error);
            $scope.userResponseData = "ocurrio un error" + error;
            $scope.isCreateUser = true;
        });

    };

    $scope.updUser = function (id, name, email, pass, typeUser, status, userModifiedId) {
        console.log("Entramos a modificar un usuario");
        $scope.name = name;
        $scope.email = email;
        $scope.pass = pass;
        $scope.typeUser = typeUser;
        $scope.status = status;
    };

    
    $scope.modifyUser = function (userModifiedId) {
        console.log("Llegamos a la invocaion de la funcion para modificar un usuario con la data ");
        console.log("El nombre es" + $scope.name);
        console.log("El email es" + $scope.email);
        console.log("El pass es" + $scope.pass);
        console.log("El type es" + $scope.typeUser);

        /*
        var params = {
            action: "updateUser"
        };

        Users.updateUser(params,{}, function (data) {
            console.log("La data es correcta y es" + data);
            $scope.userResponseData = data;
            $scope.isCreateUser = true;
        }, function (error) {
            console.log("ocurrio un error" + error);
            $scope.userResponseData = "ocurrio un error" + error;
            $scope.isCreateUser = true;
        });
        */
        $scope.userResponseData = "USer modificado";
    };

    /*********************** FUNCIONES DE BANNER ************************************/
    
    $scope.createBanner = function () {
        
        $scope.isCreateBanner = true;
        console.log("Entramos a la funcion para crear banner");
        $scope.bannnerResponseData = "Entramos";

        //TODO = falta agregar el atributo del nombre al banner 

        var params = {
            seccionId: $scope.bnnrSection,
            imgMainUrl: "laurldelaimagenprincipal.com",
            imgButtonUrl: "laurldelboton.com",
            imgModalUrl:"laurldelmodela.com",
            mode:"modal",
            link:"ellinkdelapromocion",
            backgroundColor:"#CECECE",
            text:"aqui va el texto que queremos poner en el banner",
            registrationUserId:"2",
            status:"active"
        };
        $scope.bannnerResponseData = "Ok, construimos el params";
        
        Banners.newBanner(params, {}, function (data) {
            console.log("La data es correcta y es" + data);
            $scope.bannnerResponseData = data;
            $scope.isCreateBanner = true;
        }, function (error) {
            console.log("ocurrio un error" + error);
            $scope.bannnerResponseData = "ocurrio un error" + error;
            $scope.isCreateBanner = true;
        });

    };
    

    /* **** Para el tratado de la imagenes *********/


    $scope.onFileSelect = function ($files, indexPicture) {

        console.log("Entramos a la funcion de subida de fotografias");

        for (var i = 0; i < $files.length; i++) {
            var $file = $files[i];
            console.log("el file es" + $file.name);

            var fd = new FormData();
            fd.append('file', $file);
            $http.post('/Banner/LoadPicture', fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            })
            .success(function () {
            })
            .error(function () {
            });

        }

    };
    /**********************************/



    /************ FUNCION PARA EL SHOW DE LAS SECCIONES **********************/
    $scope.showSection = function (section) {
        switch (section) {
            case "home":
                $scope.showDashHome = true;

                $scope.showDashUser = false;
                $scope.showDashNewUser = false;
                $scope.showDashUpdUser = false;
                $scope.showDashSearchUser = false;

                $scope.showDashBanner = false;
                $scope.showDashNewBanner = false;
                $scope.showDashUpdBanner = false;
                $scope.showDashSearchBanner = false;
                $scope.showDashPreviewBanner = false;

                $scope.classMenuInicio = 'active';
                $scope.classMenuUsuarios = '';
                $scope.classMenuBanners = '';

                break;
            case "User":
                $scope.showDashHome = false;

                $scope.showDashUser = true;
                $scope.showDashNewUser = false;
                $scope.showDashUpdUser = false;
                $scope.showDashSearchUser = false;

                $scope.showDashBanner = false;
                $scope.showDashNewBanner = false;
                $scope.showDashUpdBanner = false;
                $scope.showDashSearchBanner = false;
                $scope.showDashPreviewBanner = false;

                $scope.classMenuInicio = '';
                $scope.classMenuUsuarios = 'active';
                $scope.classMenuBanners = '';
                break;
            case "newUser":
                $scope.showDashHome = false;

                $scope.showDashUser = true;
                $scope.showDashNewUser = true;
                $scope.showDashUpdUser = false;
                $scope.showDashSearchUser = false;

                $scope.showDashBanner = false;
                $scope.showDashNewBanner = false;
                $scope.showDashUpdBanner = false;
                $scope.showDashSearchBanner = false;
                $scope.showDashPreviewBanner = false;

                $scope.classMenuInicio = '';
                $scope.classMenuUsuarios = 'active';
                $scope.classMenuBanners = '';
                break;
            case "searchUser":
                $scope.showDashHome = false;

                $scope.showDashUser = true;
                $scope.showDashNewUser = false;
                $scope.showDashUpdUser = false;
                $scope.showDashSearchUser = true;

                $scope.showDashBanner = false;
                $scope.showDashNewBanner = false;
                $scope.showDashUpdBanner = false;
                $scope.showDashSearchBanner = false;
                $scope.showDashPreviewBanner = false;

                $scope.classMenuInicio = '';
                $scope.classMenuUsuarios = 'active';
                $scope.classMenuBanners = '';

                break;
            case "updUser":
                $scope.showDashHome = false;

                $scope.showDashUser = true;
                $scope.showDashNewUser = false;
                $scope.showDashUpdUser = true;
                $scope.showDashSearchUser = false;

                $scope.showDashBanner = false;
                $scope.showDashNewBanner = false;
                $scope.showDashUpdBanner = false;
                $scope.showDashSearchBanner = false;
                $scope.showDashPreviewBanner = false;

                $scope.classMenuInicio = '';
                $scope.classMenuUsuarios = 'active';
                $scope.classMenuBanners = '';

                break;
            case "Banner":
                $scope.showDashHome = false;

                $scope.showDashUser = false;
                $scope.showDashNewUser = false;
                $scope.showDashUpdUser = false;
                $scope.showDashSearchUser = false;

                $scope.showDashBanner = true;
                $scope.showDashNewBanner = false;
                $scope.showDashUpdBanner = false;
                $scope.showDashSearchBanner = false;
                $scope.showDashPreviewBanner = false;

                $scope.classMenuInicio = '';
                $scope.classMenuUsuarios = '';
                $scope.classMenuBanners = 'active';

                break;
            case "newBanner":
                $scope.showDashHome = false;

                $scope.showDashUser = false;
                $scope.showDashNewUser = false;
                $scope.showDashUpdUser = false;
                $scope.showDashSearchUser = false;

                $scope.showDashBanner = true;
                $scope.showDashNewBanner = true;
                $scope.showDashUpdBanner = false;
                $scope.showDashSearchBanner = false;
                $scope.showDashPreviewBanner = false;

                $scope.classMenuInicio = '';
                $scope.classMenuUsuarios = '';
                $scope.classMenuBanners = 'active';

                break;
            case "updBanner":
                $scope.showDashHome = false;

                $scope.showDashUser = false;
                $scope.showDashNewUser = false;
                $scope.showDashUpdUser = false;
                $scope.showDashSearchUser = false;

                $scope.showDashBanner = true;
                $scope.showDashNewBanner = false;
                $scope.showDashUpdBanner = true;
                $scope.showDashSearchBanner = false;
                $scope.showDashPreviewBanner = false;

                $scope.classMenuInicio = '';
                $scope.classMenuUsuarios = '';
                $scope.classMenuBanners = 'active';

                break;
            case "searchBanner":
                $scope.showDashHome = false;

                $scope.showDashUser = false;
                $scope.showDashNewUser = false;
                $scope.showDashUpdUser = false;
                $scope.showDashSearchUser = false;

                $scope.showDashBanner = true;
                $scope.showDashNewBanner = false;
                $scope.showDashUpdBanner = false;
                $scope.showDashSearchBanner = true;
                $scope.showDashPreviewBanner = false;

                $scope.classMenuInicio = '';
                $scope.classMenuUsuarios = '';
                $scope.classMenuBanners = 'active';

                break;
            case "previewBanner":
                $scope.showDashHome = false;

                $scope.showDashUser = false;
                $scope.showDashNewUser = false;
                $scope.showDashUpdUser = false;
                $scope.showDashSearchUser = false;

                $scope.showDashBanner = true;
                $scope.showDashNewBanner = false;
                $scope.showDashUpdBanner = false;
                $scope.showDashSearchBanner = false;
                $scope.showDashPreviewBanner = true;

                $scope.classMenuInicio = '';
                $scope.classMenuUsuarios = '';
                $scope.classMenuBanners = 'active';

                break;
            default:
                $scope.showDashHome = true;

                $scope.showDashUser = false;
                $scope.showDashNewUser = false;
                $scope.showDashUpdUser = false;
                $scope.showDashSearchUser = false;

                $scope.showDashBanner = false;
                $scope.showDashNewBanner = false;
                $scope.showDashUpdBanner = false;
                $scope.showDashSearchBanner = false;
                $scope.showDashPreviewBanner = false;

                $scope.classMenuInicio = 'active';
                $scope.classMenuUsuarios = '';
                $scope.classMenuBanners = '';
        }

    }


}
/*
function PasswordController ($scope, $http, $upload, Locations, Bands, Categories,States){

}
*/