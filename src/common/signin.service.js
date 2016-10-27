(function () {
"use strict";

angular.module('common')
.service('SigninService', SigninService);


//MenuService.$inject = ['$http', 'ApiPath'];
function SigninService() {
  var service = this;
  //service.data = undefined;

  service.getSignin = function () {
    return service.data;
  };


  service.putSignin = function (data) {
    service.data = data;
  };

}



})();
