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

        console.log($stateParams.obj);
        
        function  signupParentVerify() {
            var signupParentVerifyData = {
                verifyCode: vm.verifyCode,
                parentID: $stateParams.obj.parentID
            }
            authService.signupParentVerify(signupParentVerifyData)
                .then(handleSuccessfulParentVerify)
                .catch(handleFailedParentVerify);
        }

        function handleSuccessfulParentVerify(response) {
            setTimeout(() => {
                $state.go('signup/parent/suffix', { obj: response.data });
            }, 800);
        }

        function handleFailedParentVerify(response) {
            console.log(response.data)
        }
    }
})();