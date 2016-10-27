(function() {
'use strict';

angular.module('public')
.config(routeConfig);

/**
 * Configures the routes and views
 */
routeConfig.$inject = ['$stateProvider'];
function routeConfig ($stateProvider) {
  // Routes
  $stateProvider
    .state('public', {
      absract: true,
      templateUrl: 'src/public/public.html'
    })
    .state('public.home', {
      url: '/',
      templateUrl: 'src/public/home/home.html'
    })
    .state('public.menu', {
      url: '/menu',
      templateUrl: 'src/public/menu/menu.html',
      controller: 'MenuController',
      controllerAs: 'menuCtrl',
      resolve: {
        menuCategories: ['MenuService', function (MenuService) {
          return MenuService.getCategories();
        }]
      }
    })
    .state('public.menuitems', {
      url: '/menu/{category}',
      templateUrl: 'src/public/menu-items/menu-items.html',
      controller: 'MenuItemsController',
      controllerAs: 'menuItemsCtrl',
      resolve: {
        menuItems: ['$stateParams','MenuService', function ($stateParams, MenuService) {
          return MenuService.getMenuItems($stateParams.category);
        }]
      }
    })
    .state('public.signin', {
      url: '/signin',
      templateUrl: 'src/public/sign-in/sign-in.html',
      controller: 'SignInController',
      controllerAs: 'signinCtrl',
      resolve: {
        signIn: [
          'SigninService', function (SigninService) {
            return SigninService;
          }
        ],
        menuItem: ['MenuService', function (MenuService) {
          return MenuService;
        }]
      }
    })
    .state('public.myinfo', {
      url: '/myinfo',
      templateUrl: 'src/public/my-info/my-info.html',
      controller: 'MyInfoController',
      controllerAs: 'myinfoCtrl',
      resolve: {
        menuItem: ['MenuService', 'SigninService', function (MenuService, SigninService) {
          if (SigninService.getSignin() == undefined) {
            return {};
          }
          if (SigninService.getSignin().fdish == undefined) {
            return {};
          }
          return MenuService.getMenuItem(SigninService.getSignin().fdish);
        }],
        signIn: [
          'SigninService', function (SigninService) {
            return SigninService.getSignin();
          }
        ]
      }
    })
    ;
}
})();
