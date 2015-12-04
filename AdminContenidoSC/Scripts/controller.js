'use strict'

function UserController($scope, $http, $q, $upload, Users, Login, Banners, Broadcast) {

    $scope.name     = '';
    $scope.email    = '';
    $scope.pass     = '';
    $scope.typeUser = '';

    $scope.isCreateUser = true;
    $scope.isLogin = true;
    $scope.userResponseData = "no se hizo la llamda";
    $scope.urlPic = [];
    $scope.urlPic[0] = "";
    $scope.urlPic[1] = "";
    $scope.urlPic[2] = "";


    $scope.showDashHome         = true;

    $scope.showDashNewUser      = false;
    $scope.showDashUpdUser      = false;
    $scope.showDashSearchUser   = false;

    $scope.showDashNewBanner        = false;
    $scope.showDashUpdBanner        = false;
    $scope.showDashPreviewBanner    = false;
    $scope.showDashSelectSection    = false;

    $scope.showDashMonitor = false;
    $scope.showDashCCManual = false;
    
    $scope.bannersResult = [];

    $scope.init = function(){

        $scope.saludo = "Hola desde Angula en .NET";
        $scope.isCreateUser = true;
        $scope.classMenuInicio = 'active';
        $scope.isCreateBanner = false;
        $scope.isUpdateBanner = false;
        $scope.showDashSelectSection = false;
        $scope.showDashMonitor = false;
        $scope.showDashCCManual = false;

        $scope.urlImageMain = "Sin procesar.. Iniciado.....";

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
    
    $scope.updateBanner = function (bnnrid) {
        $scope.isCreateBanner = true;
        $scope.bannnerResponseData = "Entramos a actualizar";
        var params = {
            id: bnnrid,
            name: $scope.bnnrName,
            imgMainUrl: "laurldelaimagenprincipalmodificada.com",
            imgButtonUrl: "laurldelbotonmodificado.com",
            imgModalUrl: "laurldelmodelamodificado.com",
            mode: $scope.bnnrMode,
            link: $scope.bnnrLink,
            backgroundColor: $scope.bnnrBackgroudColor,
            text: $scope.bnnrText,
            registrationUserId: "3",
            status: $scope.bnnrStatus,
            startDateActivation: $scope.bnnrDateIni,
            endDateActivation: $scope.bnnrDateEnd,
            action: "updateBanner"
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

    $scope.selectSection = function (sectionId) {
        $scope.bnnrSection = sectionId;
    };

    function resetVariablesBanner() {
        $scope.bnnrName = "";
        $scope.urlPic[0] = null;
        $scope.urlPic[1] = null;
        $scope.urlPic[2] = null;
        $scope.bnnrMode = "";
        $scope.bnnrLink = "";
        $scope.bnnrBackgroudColor = "";
        $scope.bnnrText = "";
        $scope.bnnrStatus = "";
        $scope.bnnrDateIni = "";
        $scope.bnnrDateEnd = "";
    };

    $scope.createBanner = function () {
        
        $scope.isCreateBanner = true;
        console.log("Entramos a la funcion para crear banner");
        console.log("la fecha de inicion es" + $scope.bnnrDateIni);
        console.log("la fecha de fin es" + $scope.bnnrDateEnd);
        $scope.bannnerResponseData = "Entramos";
        console.log("Hola desde la aplicacion" + $scope.bnnrDateIni + "..---.." + $scope.bnnrDateEnd);        
        
        var params = {
            seccionId: $scope.bnnrSection,
            name: $scope.bnnrName,
            imgMainUrl: $scope.urlPic[0],
            imgButtonUrl: $scope.urlPic[1],
            imgModalUrl:$scope.urlPic[2],
            mode:$scope.bnnrMode,
            link:$scope.bnnrLink,
            backgroundColor: $scope.bnnrBackgroudColor,
            text: $scope.bnnrText,
            registrationUserId:"2",
            status: $scope.bnnrStatus,
            startDateActivation: $scope.bnnrDateIni,
            endDateActivation: $scope.bnnrDateEnd,
            action: "createBanner"
        };
        $scope.bannnerResponseData = "Ok, construimos el params";
        
        Banners.newBanner(params, {}, function (data) {
            console.log("La data es correcta y es" + data);
            $scope.bannnerResponseData = data;
            $scope.isCreateBanner = true;
            $scope.badCreateBanner = false;
            $scope.showDashNewBanner = false;
        }, function (error) {
            console.log("ocurrio un error" + error);
            $scope.bannnerResponseData = "ocurrio un error" + error;
            $scope.badCreateBanner = true;
            $scope.isCreateBanner = false;
            $scope.showDashNewBanner = false;
        });

    };

    $scope.srchBnnr = function () {
        console.log("Entramos a la busqueda general");
        fnSearchBannr();
    };

    $scope.srchBnnrId = function (bnnrId) {
        console.log("Entramos a la funcion con id = "+bnnrId);
        $scope.searchBannerId = bnnrId;
        fnSearchBannr();
        console.log("YA no hizo nada despues de la funcion");
    };

   function fnSearchBannr(){
        var bannerId;
        var status;
        var section;
        bannerId = $scope.searchBannerId;
        status = $scope.searchBannerStatus;
        section = $scope.searchBannerSectionId;
        if (!$scope.searchBannerId) {
            bannerId = "0";
        } 
        if (!$scope.searchBannerStatus) {
            status = "";
        }
        if (!$scope.searchBannerSectionId) {
            section = "";
        }

        var params = {
            bannerId: bannerId,
            status: status,
            sectionId: section,
            offset:0,
            resultForPage:5,
            action: "searchBanner"
        };

        Banners.searchBanner(params,{}, function (data) {
            console.log("si entro y la data es" + data);
            $scope.bannersResult = data;
        }, function (error) {
            console.log("no entro y el error es" + error);
            $scope.bannersResult = error;
        });

    };
    
    /* **** Para el tratado de la imagenes *********/


    $scope.onFileSelect = function ($files, indexPicture) {

        console.log("Entramos a la funcion de subida de fotografias");
        $scope.urlImageMain = "Sin procesar..";

        for (var i = 0; i < $files.length; i++) {
            var $file = $files[i];
            console.log("el file es" + $file.name);

            var fd = new FormData();
            fd.append('file', $file);
            $http.post('/Banner/LoadPicture?sectionName=' + $scope.bnnrSection, fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            })
            .success(function (response) {
                console.log("EL valor retornado es" + response);
                $scope.urlImageMain = response;
                $scope.urlPic[indexPicture] = response;
            })
            .error(function () {
            });

        }

    };
    /**********************************/

    /************************** funciones para el preview **************************************/
    $scope.showPreview = function () {
        window.open("/Preview/Index", '_blank');
    };
    /*******************************************************************************************/



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
                $scope.showDashSelectSection = false;

                $scope.classMenuInicio = 'active';
                $scope.classMenuUsuarios = '';
                $scope.classMenuBanners = '';

                $scope.showDashBannerDetail = false;

                $scope.showDashMonitor = false;
                $scope.showDashCCManual = false;

                $scope.isCreateBanner = false;
                $scope.badCreateBanner = false;

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
                $scope.showDashSelectSection = false;

                $scope.classMenuInicio = '';
                $scope.classMenuUsuarios = 'active';
                $scope.classMenuBanners = '';

                $scope.showDashBannerDetail = false;

                $scope.showDashMonitor = false;
                $scope.showDashCCManual = false;

                $scope.isCreateBanner = false;
                $scope.badCreateBanner = false;

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
                $scope.showDashSelectSection = false;

                $scope.classMenuInicio = '';
                $scope.classMenuUsuarios = 'active';
                $scope.classMenuBanners = '';

                $scope.showDashBannerDetail = false;

                $scope.showDashMonitor = false;
                $scope.showDashCCManual = false;

                $scope.isCreateBanner = false;
                $scope.badCreateBanner = false;

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
                $scope.showDashSelectSection = false;

                $scope.classMenuInicio = '';
                $scope.classMenuUsuarios = 'active';
                $scope.classMenuBanners = '';

                $scope.showDashBannerDetail = false;

                $scope.showDashMonitor = false;
                $scope.showDashCCManual = false;

                $scope.isCreateBanner = false;
                $scope.badCreateBanner = false;

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
                $scope.showDashSelectSection = false;

                $scope.classMenuInicio = '';
                $scope.classMenuUsuarios = 'active';
                $scope.classMenuBanners = '';

                $scope.showDashBannerDetail = false;

                $scope.showDashMonitor = false;
                $scope.showDashCCManual = false;

                $scope.isCreateBanner = false;
                $scope.badCreateBanner = false;

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
                $scope.showDashSelectSection = false;

                $scope.classMenuInicio = '';
                $scope.classMenuUsuarios = '';
                $scope.classMenuBanners = 'active';

                $scope.showDashBannerDetail = false;

                $scope.showDashMonitor = false;
                $scope.showDashCCManual = false;

                $scope.isCreateBanner = false;
                $scope.badCreateBanner = false;

                break;
            case "newBanner":
                resetVariablesBanner();
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
                $scope.showDashSelectSection = false;

                $scope.classMenuInicio = '';
                $scope.classMenuUsuarios = '';
                $scope.classMenuBanners = 'active';

                $scope.showDashBannerDetail = false;

                $scope.showDashMonitor = false;
                $scope.showDashCCManual = false;

                $scope.isCreateBanner = false;
                $scope.badCreateBanner = false;

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
                $scope.showDashSelectSection = false;

                $scope.classMenuInicio = '';
                $scope.classMenuUsuarios = '';
                $scope.classMenuBanners = 'active';

                $scope.showDashBannerDetail = false;

                $scope.showDashMonitor = false;
                $scope.showDashCCManual = false;

                $scope.isCreateBanner = false;
                $scope.badCreateBanner = false;

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
                $scope.showDashSelectSection = false;

                $scope.classMenuInicio = '';
                $scope.classMenuUsuarios = '';
                $scope.classMenuBanners = 'active';

                $scope.showDashBannerDetail = false;

                $scope.showDashMonitor = false;
                $scope.showDashCCManual = false;

                $scope.isCreateBanner = false;
                $scope.badCreateBanner = false;

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
                $scope.showDashSelectSection = false;

                $scope.classMenuInicio = '';
                $scope.classMenuUsuarios = '';
                $scope.classMenuBanners = 'active';

                $scope.showDashBannerDetail = false;

                $scope.showDashMonitor = false;
                $scope.showDashCCManual = false;

                $scope.isCreateBanner = false;
                $scope.badCreateBanner = false;

                break;
            case "selectSectionBanner":
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
                $scope.showDashSelectSection = true;

                $scope.classMenuInicio = '';
                $scope.classMenuUsuarios = '';
                $scope.classMenuBanners = 'active';

                $scope.showDashBannerDetail = false;

                $scope.showDashMonitor = false;
                $scope.showDashCCManual = false;

                $scope.isCreateBanner = false;
                $scope.badCreateBanner = false;

                break;
            case "detailBanner":
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
                $scope.showDashSelectSection = false;

                $scope.classMenuInicio = '';
                $scope.classMenuUsuarios = '';
                $scope.classMenuBanners = 'active';

                $scope.showDashBannerDetail = true;

                $scope.showDashMonitor = false;
                $scope.showDashCCManual = false;

                $scope.isCreateBanner = false;
                $scope.badCreateBanner = false;

                break;
            case "Monitor":
                $scope.showDashHome = false;

                $scope.showDashUser = false;
                $scope.showDashNewUser = false;
                $scope.showDashUpdUser = false;
                $scope.showDashSearchUser = false;

                $scope.showDashBanner = false;
                $scope.showDashNewBanner = false;
                $scope.showDashUpdBanner = false;
                $scope.showDashSearchBanner = false;
                $scope.showDashPreviewBanner = false;
                $scope.showDashSelectSection = false;

                $scope.classMenuInicio = '';
                $scope.classMenuUsuarios = '';
                $scope.classMenuBanners = '';

                $scope.showDashBannerDetail = false;

                $scope.showDashMonitor = true;
                $scope.showDashCCManual = false;

                $scope.isCreateBanner = false;
                $scope.badCreateBanner = false;

                break;
            case "CCManual":
                $scope.showDashHome = false;

                $scope.showDashUser = false;
                $scope.showDashNewUser = false;
                $scope.showDashUpdUser = false;
                $scope.showDashSearchUser = false;

                $scope.showDashBanner = false;
                $scope.showDashNewBanner = false;
                $scope.showDashUpdBanner = false;
                $scope.showDashSearchBanner = false;
                $scope.showDashPreviewBanner = false;
                $scope.showDashSelectSection = false;

                $scope.classMenuInicio = '';
                $scope.classMenuUsuarios = '';
                $scope.classMenuBanners = '';

                $scope.showDashBannerDetail = false;

                $scope.showDashMonitor = false;
                $scope.showDashCCManual = true;

                $scope.isCreateBanner = false;
                $scope.badCreateBanner = false;
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
                $scope.showDashSelectSection = false;

                $scope.classMenuInicio = 'active';
                $scope.classMenuUsuarios = '';
                $scope.classMenuBanners = '';

                $scope.showDashBannerDetail = false;

                $scope.showDashMonitor = false;
                $scope.showDashCCManual = false;

                $scope.isCreateBanner = false;
                $scope.badCreateBanner = false;
        }
    }
}
/*
function PasswordController ($scope, $http, $upload, Locations, Bands, Categories,States){

}
*/