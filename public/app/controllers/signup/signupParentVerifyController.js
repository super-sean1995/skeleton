(function() {
    'use strict';

    angular
        .module('subscriptionApp')
        .controller('SignupParentVerifyController', [
            '$scope',
            '$state',
            '$stateParams',
            'authService', 
            SignupParentVerifyController
        ]);

    function SignupParentVerifyController($scope, $state, $stateParams, authService) {
        var vm = this;

        vm.signupParentVerify = signupParentVerify;
        
        function  signupParentVerify() {
            var signupParentVerifyData = {
                verifyCode: vm.verifyCode
            }
            authService.signupParentVerify(signupParentVerifyData)
                .then(handleSuccessfulParentVerify)
                .catch(handleFailedParentVerify);
        }

        function handleSuccessfulParentVerify(response) {
            console.log(response.data);
        }

        function handleFailedParentVerify(response) {
            console.log(response.data)
        }
    }

})();