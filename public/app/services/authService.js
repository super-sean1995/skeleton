(function() {
    'use strict';

    angular
        .module('subscriptionApp')
        .factory('authService', [
            '$http',
            '$cookies',
            '$state',
            authService
        ]);

    function authService($http, $cookies, $state) {

        var authService = {
            login               : login,
            logout              : logout,
            signupParent        : signupParent,
            signupStudent       : signupStudent,
            signupPlan          : signupPlan,
            signupParentVerify  : signupParentVerify,
            // signup: signup,
            getUserData         : getUserData,
            isAuthenticated     : isAuthenticated
        };

        return authService;

        function login(username, password) {
            var reqObj = {
                method: 'POST',
                url: '/api/authenticate',
                data: {
                    username: username,
                    password: password
                }
            };

            return $http(reqObj).then(function(response) {
                if(response && response.data) {
                    response = response.data;

                    var expires = new Date(),
                        user = {};

                    user.username = response.username;
                    user.role = response.role;
                    user.token = response.token;

                    expires.setTime(expires.getTime() + (30 * 60 * 1000));

                    $cookies.put(
                        'user',
                        JSON.stringify(user),
                        { expires: expires }
                    );
                }
            });
        }

        function logout() {
            $cookies.remove('user');
            $state.go('index');
        }

        function isAuthenticated() {
            var user = $cookies.get('user');
            return user && user !== 'undefined';
        }

        function getUserData() {
            if(isAuthenticated()) {
                return JSON.parse($cookies.get('user'));
            }

            return false;
        }

        function signupParent(data) {
            var reqObj = {
                method: 'POST',
                url: '/api/signup/parent',
                data: data
            }

            return $http(reqObj);
        }

        function signupStudent(data) {
            var reqObj = {
                method: 'POST',
                url: '/api/signup/student',
                data: data
            }

            return $http(reqObj);
        }

        function signupPlan(data) {
            var reqObj = {
                method: 'POST',
                url   : '/api/signup/plan',
                data  : data
            }

            return $http(reqObj);
        }

        function signupParentVerify(data) {
            var reqObj = {
                method: 'POST',
                url: 'api/signup/parent/verify',
                data: data
            }

            return $http(reqObj);
        }

        // function signup(username, password) {
        //     var reqObj = {
        //         method: 'POST',
        //         url: '/api/signup',
        //         data: {
        //             username: username,
        //             password: password
        //         }
        //     };

        //     return $http(reqObj);
        // }
    }
})();