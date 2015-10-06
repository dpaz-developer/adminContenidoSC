'use strict'

function UserController($scope, $http, $q, $upload, Users, Login, Broadcast) {

    $scope.name     = '';
    $scope.email    = '';
    $scope.pass     = '';
    $scope.typeUser = '';

    $scope.isCreateUser = true;
    $scope.isLogin = true;
    $scope.userResponseData = "no se hizo la llamda";

    var URL = window.URL || window.webkitURL;
    var dataUrl;
    $scope.resizeMaxHeight = 768;
    $scope.resizeMaxWidth = 1024;
    $scope.resizeQuality = 0.7;
    $scope.resizeType = 'image/jpeg';


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
        showSection();

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
    

    

    /* **** Para el tratado de la imagenes *********/

 
    var fileToDataURL = function (file) {
        console.log("iniciamos la conversion de file a url....");
        var deferred = $q.defer();
        var reader = new FileReader();
        reader.onload = function (e) {
            deferred.resolve(e.target.result);
        };
        reader.readAsDataURL(file);
        return deferred.promise;
    };

    var getResizeArea = function () {
        var resizeAreaId = 'fileupload-resize-area';
        var resizeArea = document.getElementById(resizeAreaId);
        if (!resizeArea) {
            resizeArea = document.createElement('canvas');
            resizeArea.id = resizeAreaId;
            resizeArea.style.visibility = 'hidden';
            document.body.appendChild(resizeArea);
        }
        return resizeArea;
    }

    var resizeImage = function (origImage, indexPicture) {
        console.log("Inicia e resize de la imagen....");
        var maxHeight = $scope.resizeMaxHeight;
        var maxWidth = $scope.resizeMaxWidth;
        var quality = $scope.resizeQuality;
        var type = $scope.resizeType;

        var canvas = getResizeArea();

        var height = origImage.height;
        var width = origImage.width;

        if (width > height) {
            if (width > maxWidth) {
                height = Math.round(height *= maxWidth / width);
                width = maxWidth;
            }
        } else {
            if (height > maxHeight) {
                width = Math.round(width *= maxHeight / height);
                height = maxHeight;
            }
        }

        canvas.width = width;
        canvas.height = height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(origImage, 0, 0, width, height);

        uploadImageApiPictures(canvas.toDataURL(type, quality), indexPicture);
        console.log("Entramos a subir la imagen");
        
        return canvas.toDataURL(type, quality);
    };

    var createImage = function (url, callback) {
        var image = new Image();
        image.onload = function () {
            callback(image);
        };
        image.src = url;
    };

    var doResizing = function (imageResult, indexPicture, callback) {
        createImage(imageResult.url, function (image) {
            var dataURL = resizeImage(image, indexPicture);
            imageResult.resized = {
                dataURL: dataURL,
                type: dataURL.match(/:(.+\/.+);/)[1],
            };
            callback(imageResult);
        });
    };

    var applyScope = function (imageResult) {
        $scope.$apply(function () {
            $scope.image = imageResult;
        });
    };

    function dataURLtoBlob(dataurl) {
        console.log("vamos a cambiar el daturl a un blob....");
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    }

    var uploadImageApiPictures = function (urlDataImage, indexPicture) {

        console.log("inciamos la carga de la imagen");
        var blob = dataURLtoBlob(urlDataImage);

        console.log("Llegamos a la carga con el blob = " + blob);
        
        /*
        $upload.upload({
            url: '/Banner/LoadPicture/', //upload.php script, node.js route, or servlet uplaod url)
            // data: { myObj: $scope.myModelObj },
            file: blob
        }).progress(function (evt) {
            console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
        }).success(function (data, status, headers, config) {
            console.log(data);
            console.log(status);
        }).error(function (error) {
            console.log("ocurrio un error en la carga de la imagen"+error);
        });
        */
    };




    $scope.onFileSelect = function ($files, indexPicture) {

        console.log("Entramos a la funcion de subida de fotografias");
        
        for (var i = 0; i < $files.length; i++) {
            var $file = $files[i];
            console.log("el file es" + $file.name);
           
           
            var imageResult = {
                file: $files[i],
                url: URL.createObjectURL($files[i])
            };
            console.log("creamos el file y la url" + imageResult.url);
            console.log("Llego aqui y despues..");
            
            fileToDataURL($files[i]).then(function (dataURL) {
                console.log("Entramos al fileToDataURL...");
                imageResult.dataURL = dataURL;
                console.log("LA url es" + dataUrl);
            });

            console.log("vamos a hacer el rezising....");
            if ($scope.resizeMaxHeight || $scope.resizeMaxWidth) {
                console.log("Entro al rezising....");
                doResizing(imageResult, indexPicture, function (imageResult) {
                    applyScope(imageResult);
                });
            }
            else {
                applyScope(imageResult);
            }
        }
        
    }
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