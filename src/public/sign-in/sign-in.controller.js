(function () {
"use strict";

angular.module('public')
.controller('SignInController', SignInController);

SignInController.$inject = ['signIn', 'menuItem'];
function SignInController(signIn, menuItem) {
  var $ctrl = this;
  $ctrl.signInServ = signIn;
  $ctrl.menServ = menuItem;

  $ctrl.go = function() {
    if ($ctrl.signin && !($ctrl.signin.fname == undefined ||
       $ctrl.signin.lname == undefined ||
       $ctrl.signin.email == undefined ||
       $ctrl.signin.phone == undefined ||
       $ctrl.signin.fdish == undefined)) {
      var   promise = $ctrl.menServ.getMenuItem($ctrl.signin.fdish);

       promise.then(function(response) {
         $ctrl.data = response;
         if (!$ctrl.data.status) {
           $ctrl.signInServ.putSignin($ctrl.signin);
         }
       });
    } else {
      $ctrl.signInServ.putSignin({});
    }
  };
}

})();
