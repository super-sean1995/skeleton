(function() {
    'use strict';

    angular
        .module('subscriptionApp')
        .controller('SignupPlanController', [
            '$scope',
            '$state',
            '$stateParams',
            'authService', 
            SignupPlanController
        ]);

    function SignupPlanController($scope, $state, $stateParams, authService) {
        var vm = this;

        vm.signupSuccess = false;
        vm.signupError = false;
        vm.parentEmail = $stateParams.obj.parentEmail;
        vm.studentEmail = $stateParams.obj.studentEmail;

        vm.signupPlan = signupPlan;

        function signupPlan() {
            var signupPlanData = {
                parentID       : $stateParams.obj.parentID,
                // planID         : vm.selectedPlan,
                planID         : 1,
                cardName       : vm.cardName,
                phoneNumber    : vm.phoneNumber,
                cardNumber     : vm.cardNumber,
                expirationDate : vm.expirationDate,
                cvc            : vm.cvc                 
            }

            console.log(signupPlanData);

            authService.signupPlan(signupPlanData)
                .then(handleSuccessfulSignupPlan)
                .catch(handleFailedSignupPlan);
        }

        function handleSuccessfulSignupPlan(response) {
            // vm.signupSuccess = true;
            // vm.signupParentSuccessMessage = response.data.message;
            // var sendDataObj = {
            //     parentID: $stateParams.obj.parentID,
            //     parentEmail: $stateParams.obj.email,
            //     studentID: response.data.studentID,
            //     studentEmail: response.data.studentEmail
            // }
            // setTimeout(() => {
            //     $state.go('signup/plan', { obj: sendDataObj});
            // }, 800);
        }

        function handleFailedSignupPlan(response) {
            // vm.signupSuccess = false;

            // if(response && response.data) {
            //     vm.signupErrorMessage = response.data.message;
            //     vm.signupError = true;
            // }
        }

        // console.log($stateParams);
    }

})();