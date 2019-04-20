(function() {
    'use strict';

    angular
        .module('subscriptionApp')
        .controller('SignupAddSuffixController', [
            '$scope',
            '$state',
            '$stateParams',
            'authService', 
            SignupAddSuffixController
        ]);

    function SignupAddSuffixController($scope, $state, $stateParams, authService) {
        var vm = this;

        vm.setSuffix = setSuffix;

        function setSuffix() {
            var setSuffixData = {
                suffix : vm.setInputedSuffix,
                parentID : $stateParams.obj.parentID
            }
            authService.setSuffix(setSuffixData)
                .then(signupSuccessfulHandler)
                .catch(signupFailedHandler);
        }

        function signupSuccessfulHandler(response) {
            console.log(response.data);
        }

        function signupFailedHandler(response) {
            console.log(response.data);
        }
    }

})();