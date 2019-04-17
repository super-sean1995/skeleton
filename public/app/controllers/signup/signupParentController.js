(function() {
    'use strict';

    angular
        .module('subscriptionApp')
        .controller('SignupParentController', [
            '$scope',
            '$state',
            'authService', 
            SignupParentController
        ]);

    function SignupParentController($scope, $state, authService) {
        var vm = this;

        vm.signupSuccess = false;
        vm.signupError = false
        vm.signupErrorMessage = null;
        vm.firstName = '';
        vm.lastName = '';
        vm.email = '';
        vm.password = '';

        vm.signupParent = signupParent;

        function signupParent() {
            vm.signupSuccess = false;
            vm.signupError = false
            vm.signupErrorMessage = null;
            
            var signupParentData = {
                firstName: vm.firstName,
                lastName: vm.lastName,
                email: vm.email,
                password: vm.password
            }

            authService.signupParent(signupParentData)
                .then(handleSuccessfulSignupParent)
                .catch(handleFailedSignupParent);
        }

        function handleSuccessfulSignupParent(response) {
            vm.signupSuccess = true;
            vm.signupParentSuccessMessage = response.data.message;
            setTimeout(() => {
                $state.go('signup/student', { obj: response.data });
            }, 800);
        }

        function handleFailedSignupParent(response) {
            console.log(response.data.message);
            vm.signupSuccess = false;

            if(response && response.data) {
                vm.signupErrorMessage = response.data.message;
                vm.signupError = true;
            }
        }
    }

})();