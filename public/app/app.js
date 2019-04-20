(function() {
    'use strict';

    var subscriptionApp = angular.module('subscriptionApp', [
        'ui.router',
        'ngCookies'
    ]);

    // API Request Interceptor
    subscriptionApp.factory('requestInterceptor', [
        '$cookies',
        function($cookies) {
            return {
                request: function(config) {
                    var user = $cookies.get('user'),
                        token = null;

                    if(user) {
                        user = JSON.parse(user);
                        token = user.token ? user.token : null;
                    }

                    if(token) {
                        config.headers = config.headers || {};
                        config.headers.Authorization = token;
                    }

                    return config; 
                }
            };
        }
    ]);

    // Static data constant.
    var staticData = {};

    var userRoles = staticData.userRoles = {
        guest: 1,
        user: 2,
        admin: 4
    };

    staticData.accessLevels = {
        guest: userRoles.guest | userRoles.user | userRoles.admin,
        user: userRoles.user | userRoles.admin,
        admin: userRoles.admin
    };

    subscriptionApp.constant('staticData', staticData);

    // Config block.
    subscriptionApp.config([
        '$stateProvider',
        '$urlRouterProvider',
        '$httpProvider',
        '$locationProvider',
        'staticData',
        authConfig
    ]);

    function authConfig(
        $stateProvider,
        $urlRouterProvider,
        $httpProvider,
        $locationProvider,
        staticData ) {
        
        // Index route.
        $stateProvider.state('index', {
            url: '/',
            templateUrl: 'app/views/partials/partial-index.html'
        });

        // Login route.
        $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'app/views/partials/partial-login.html',
            controller: 'LoginController as lc'
        });

        // User area route.
        $stateProvider.state('profile', {
            url: '/profile',
            templateUrl: 'app/views/partials/partial-profile.html',
            controller: 'ProfileController as pc',
            data: {
                accessLevel: staticData.accessLevels.user
            }
        });

        // Admin area route.
        $stateProvider.state('admin', {
            url: '/admin',
            templateUrl: 'app/views/partials/partial-admin.html',
            controller: 'AdminController as ac',
            data: {
                accessLevel: staticData.accessLevels.admin
            }
        });

        // Signup parent route.
        $stateProvider.state('signup/parent', {
            url: '/signup',
            templateUrl: 'app/views/partials/signup/partial-signup-parent.html',
            params: {
                obj: null
            },
            controller: 'SignupParentController as spc'
        });

        // Signup student route.
        $stateProvider.state('signup/student', {
            url: '/signup',
            templateUrl: 'app/views/partials/signup/partial-signup-student.html',
            params: {
                obj: null
            },
            controller: 'SignupStudentController as ssc'
        });

        // Signup Plan route.
        $stateProvider.state('signup/plan', {
            url: '/signup',
            templateUrl: 'app/views/partials/signup/partial-signup-plan.html',
            params: {
                obj: null
            },
            controller: 'SignupPlanController as spnc'
        });

        // Signup Parent Verify route.
        $stateProvider.state('signup/parent/verify', {
            url: '/signup',
            templateUrl: 'app/views/partials/signup/partial-signup-parent-verify.html',
            params: {
                obj: null
            },
            controller: 'SignupParentVerifyController as spvc'
        });

        $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('requestInterceptor');
    }

    // Run block.
    subscriptionApp.run([
        '$rootScope',
        '$state',
        'authService',
        authRun
    ]);

    function authRun($rootScope, $state, authService) {
        $rootScope.$on('$stateChangeStart', function(event, toState) {
            if(toState.data && toState.data.accessLevel) {
                var user = authService.getUserData();
                if(!(toState.data.accessLevel & user.role)) {
                    event.preventDefault();
                    $state.go('index');
                    return;
                }
            }
        });
    }
})();