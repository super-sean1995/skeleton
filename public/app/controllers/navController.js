(function() {
    'use strict';

    angular
        .module('subscriptionApp')
        .controller('NavController', [
            'authService',
            navController
        ]);

    function navController(authService) {
        var vm = this;

        vm.isAuthenticated = authService.isAuthenticated;
        vm.logout = authService.logout;
    }

})();