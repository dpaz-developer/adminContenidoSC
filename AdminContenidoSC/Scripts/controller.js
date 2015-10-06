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

    };

    /*
    function getGeneros(categoryId){

        var params = { categoryId:categoryId};

        Categories.get(params, function(data) {
            $scope.generos = data.children_categories;
        }, function (error){
            $scope.generos = [];
        });
    }


    $scope.stateEvents = function(){
        var params = {};
        States.stateEvents(params, function (data){
            $scope.stateEventsData = data.children_locations;
        }, function (error) {
            $scope.stateEventsData = '';
        });
    };

    $scope.stateEvents();

    $scope.socialEvents = function(){
        var params = {categoryId:$scope.categoryEvents};
        Categories.socialEvents(params, function (data){
            $scope.socialEventsData = data.children_categories;
        }, function (error) {
            $scope.socialEventsData = '';
        });
    };

    $scope.socialEvents();

    $scope.searchZipcodes = function() {
        var params = {
            action:$scope.zipcodeValue
        };
        Locations.zipcode(params, function (data) {
            $scope.zipcodeError     = '';
            $scope.zipcodeData      = data;
            $scope.cols             = data.neighborhoods;
            $scope.isValidZipcode   = true;
        }, function (error) {
            $scope.isValidZipcode   = false;
            $scope.zipcodeData      = '';
            $scope.zipcodeError     = "Codigo postal = "+$scope.zipcodeValue+" no encontrado";
        });
    };

    $scope.embedVideo = function (){
        $scope.isValidVideo = false;
        var urlVideo = $scope.urlVideo;
        if(urlVideo.indexOf("www.youtube.com") > 0) {
            var elem = urlVideo.split('v=');
            if (elem[1]) {
                var videoId     = elem[1];
                var urlEmbed    = "http://www.youtube.com/embed/video_id?rel=0&showinfo=0&controls=1";
                $scope.urlVideoEmbed = urlEmbed.replace("video_id", videoId);
                $scope.isValidVideo = true;
            }
        }
    };

    $scope.isAdjacentState = function (arrayStatesAdjacent, currentState){
        if(arrayStatesAdjacent) {
            var searchState = arrayStatesAdjacent.indexOf(currentState);
            if (searchState > 0) {
                return true;
            } else {
                return false;
            }
        }
    };

    var URL = window.URL || window.webkitURL;


    var fileToDataURL = function (file) {
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

    var resizeImage = function (origImage,indexPicture) {
        var maxHeight   = $scope.resizeMaxHeight ;
        var maxWidth    = $scope.resizeMaxWidth ;
        var quality     = $scope.resizeQuality ;
        var type        = $scope.resizeType ;

        var canvas = getResizeArea();

        var height  = origImage.height;
        var width   = origImage.width;

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
        return canvas.toDataURL(type, quality);
    };

    var createImage = function(url, callback) {
        var image = new Image();
        image.onload = function() {
            callback(image);
        };
        image.src = url;
    };

    var doResizing = function(imageResult,indexPicture, callback) {
        createImage(imageResult.url, function(image) {
            var dataURL = resizeImage(image, indexPicture);
            imageResult.resized = {
                dataURL: dataURL,
                type: dataURL.match(/:(.+\/.+);/)[1],
            };
            callback(imageResult);
        });
    };

    var applyScope = function(imageResult) {
        $scope.$apply(function() {
            $scope.image = imageResult;
        });
    };

    function dataURLtoBlob(dataurl) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type:mime});
    }

    var uploadImageApiPictures = function(urlDataImage, indexPicture){

        var blob = dataURLtoBlob(urlDataImage);

        //$scope.urlPic[indexPicture] = 'http://publica.maxibanda.mx/publica/loading_picture.gif';
        $scope.urlPic[indexPicture] = 'http://localhost:8080/publica/loading_picture.gif';

        $scope.upload = $upload.upload({

            url: apiBaseUrlImages, //upload.php script, node.js route, or servlet url
            method: 'POST',
            data: {myObj: $scope.myModelObj},
            file: blob
        }).progress(function (evt) {
            console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
        }).success(function (data, status, headers, config) {
            $scope.urlPic[indexPicture] = data.pictures[1].url;
            //TODO debemos revisar como hacemos para cuando quieren modificar una fotografia antes de subirla
            $scope.picturesJson.push({
                picture_id :data.id,
                url : data.pictures[1].url,
                size : '200x160',
                secure_url : ''});
            console.log ('el array ahora tiene = '+ JSON.stringify($scope.picturesJson));
        });

        //.error(...)
        //.then(success, error, progress);
        // access or attach event listeners to the underlying XMLHttpRequest.
        //.xhr(function(xhr){xhr.upload.addEventListener(...)})

    };


    $scope.onFileSelect = function($files, indexPicture) {

        for (var i = 0; i < $files.length; i++) {
            var file = $files[i];
            var imageResult = {
                file: $files[i],
                url: URL.createObjectURL($files[i])
            };

            fileToDataURL($files[i]).then(function (dataURL) {
                imageResult.dataURL = dataURL;
            });

            if($scope.resizeMaxHeight || $scope.resizeMaxWidth) {
                doResizing(imageResult,indexPicture, function(imageResult) {
                    applyScope(imageResult);
                });
            }
            else {
                applyScope(imageResult);
            }

        }
    }


    $scope.createBand = function (){

        console.log('vamos a crear la banda aqui comienzan las validaciones');

        console.log ('imprimiendo valores capturados');

        console.log('categoryID = '+$scope.categoryId);
        console.log('nombre = '+$scope.name);
        console.log('price = '+$scope.price);
        console.log('payForm = '+$scope.payForm);
        console.log('locationId = '+$scope.locationId);
        console.log('email = '+$scope.email);
        console.log('phones = '+$scope.phones);
        console.log('video = '+$scope.urlVideo);
        console.log('description = '+$scope.description);
        console.log('pictures = '+ JSON.stringify($scope.picturesJson));

        $scope.errorName        = false;
        $scope.errorCategory    = false;
        $scope.errorPrice       = false;
        $scope.errorLocationId  = false;
        $scope.errorEmail       = false;
        $scope.errorPhones      = false;
        $scope.errorZipcode     = false;


    }

    */


}

function PasswordController ($scope, $http, $upload, Locations, Bands, Categories,States){

}
/*

 function resizeImagen(file) {
 var MAX_IMAGE_SIZE_PROCESS = 900;


 var reader = new FileReader();
 reader.onloadend = function () {
 var tempImg = new Image();
 tempImg.onload = function () {
 // Comprobamos con el aspect cómo será la reducción
 // MAX_IMAGE_SIZE_PROCESS es la N que definimos como máxima
 var MAX_WIDTH = MAX_IMAGE_SIZE_PROCESS;
 var MAX_HEIGHT = MAX_IMAGE_SIZE_PROCESS;
 var tempW = tempImg.width;
 var tempH = tempImg.height;
 if (tempW > tempH) {
 if (tempW > MAX_WIDTH) {
 tempH *= MAX_WIDTH / tempW;
 tempW = MAX_WIDTH;
 }
 } else {
 if (tempH > MAX_HEIGHT) {
 tempW *= MAX_HEIGHT / tempH;
 tempH = MAX_HEIGHT;
 }
 }

 // Creamos un canvas para la imagen reducida y la dibujamos
 var resizedCanvas = document.createElement('canvas');
 resizedCanvas.width = tempW;
 resizedCanvas.height = tempH;
 var ctx = resizedCanvas.getContext("2d");
 ctx.drawImage(this, 0, 0, tempW, tempH);
 var dataURL = resizedCanvas.toDataURL("image/jpeg");

 // Pasamos la dataURL que nos devuelve Canvas a objeto Blob
 // Envíamos por Ajax el objeto Blob
 // Cogiendo el valor de photo (nombre del input file)
 var file = dataURLtoBlob(dataURL);
 console.log("EL peso de la nueva imagen es"+file.size);
 var fd = new FormData();
 fd.append("photo", file);
 */
/*
 $.ajax({
 url: <<url del endpoint que se encarga de la subida>>,
 type: "POST",
 data: fd,
 processData: false,
 contentType: false,
 dataType: 'json',
 xhr: function() {
 var xhr = new window.XMLHttpRequest();
 xhr.upload.addEventListener("progress", function(evt) {
 if (evt.lengthComputable) {
 // Calculando el porcentaje de todo el proceso
 var percentComplete = evt.loaded / evt.total;
 progress(percentComplete * PERCENT_UPLOAD * 0.01);
 }
 }, false);
 return xhr;
 }
 }).done(function(respond) {
 // Una vez ha acabado la subida
 callback(respond);
 });
 };*/
/*
 tempImg.src = reader.result;
 }
 reader.readAsDataURL(file);
 }
 }

 */
/*
 function dataURLtoBlob(dataURL)
 {
 // Decodifica dataURL
 var binary = atob(dataURL.split(',')[1]);
 // Se transfiere a un array de 8-bit unsigned
 var array = [];
 var length = binary.length;
 for(var i = 0; i < length; i++) {
 array.push(binary.charCodeAt(i));
 }
 // Retorna el objeto Blob
 return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
 }
 */