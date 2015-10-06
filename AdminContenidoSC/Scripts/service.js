'use strict'


var module = angular.module('AdminControlSCServices', ['ngResource']);

module.factory('Users', function ($resource) {
    var url = "/User/:action";  //updateUser"; //newUser
    console.log("llegamos a la invocacion con la accion" + url);
    console.log("los parametros son " + $resource);
    return $resource(url, {}, {
        newUser: { method: "POST", params: { action: "newUser" }  }
        //updateUser: { method: "POST", params: { name: "david modificado", email: "david@elmail.com", pass: "standar", type: "Admin", status: "active", id: "2" } }
    });
});

module.factory("Login", function ($resource) {
    var url = "/User/processLogin";
    return $resource(url, {}, {
        post: { method: "POST", params: { email: "test@test.com.mx", pass: "1234" } }
    });
});

module.factory('Broadcast', function ($rootScope) {
    var broadcastService = {
        broadcast: function (event) {
            $rootScope.$broadcast.apply($rootScope, arguments);
        }
    };
    return broadcastService;
});

/*
module.factory('Locations',function ($resource){
    var url = apiBaseUrlLocations + "/locations/zipcodes/:action";
    return $resource(url, {}, {
        zipcode:{method:"GET"}
    });
});
*/

