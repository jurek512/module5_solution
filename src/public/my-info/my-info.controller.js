(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['menuItem', 'signIn'];
function MyInfoController(menuItem, signIn) {
  var $ctrl = this;
  $ctrl.menuItem = menuItem;
  $ctrl.signin = signIn;
}

})();
