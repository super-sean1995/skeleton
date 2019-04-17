(function() {
    'use strict';

    angular
        .module('subscriptionApp')
        .controller('SignupStudentController', [
            '$scope',
            '$state',
            '$stateParams',
            'authService', 
            SignupStudentController
        ]);

    function SignupStudentController($scope, $state, $stateParams, authService) {
        var vm = this;

        vm.parentEmail = $stateParams.obj.email
        vm.signupStudent = signupStudent;



        function signupStudent() {
            var signupStudentData = {
                parentID: $stateParams.obj.parentID,
                firstName: vm.firstName,
                lastName: vm.lastName,
                email: vm.email,
                phoneNumber: vm.phoneNumber,
                state_id: vm.selectedState.id,
                school_id: vm.selectedShool.id,
                year: vm.selectedYear.name,
                major_id: vm.selectedMajor.id,
                sport_id: vm.selectedSport.id,
                activity_id: vm.selectedActivity.id,
                challenge_id: vm.selectedChallenge.id
            }

            console.log(signupStudentData);
            authService.signupStudent(signupStudentData)
                .then(handleSuccessfulSignupStudent)
                .catch(handleFailedSignupStudent);
        }

        function handleSuccessfulSignupStudent(response) {
            vm.signupSuccess = true;
            vm.signupParentSuccessMessage = response.data.message;
            var sendDataObj = {
                parentID: $stateParams.obj.parentID,
                parentEmail: $stateParams.obj.email,
                studentID: response.data.studentID,
                studentEmail: response.data.studentEmail
            }
            setTimeout(() => {
                $state.go('signup/plan', { obj: sendDataObj});
            }, 800);
        }

        function handleFailedSignupStudent(response) {
            vm.signupSuccess = false;

            if(response && response.data) {
                vm.signupErrorMessage = response.data.message;
                vm.signupError = true;
            }
        }

        vm.school = {}
        vm.schools = [
            {id: 1, name: 'aaaaa'},
            {id: 2, name: 'bbbbb'},
            {id: 3, name: 'ccccc'},
            {id: 4, name: 'ddddd'},
            {id: 5, name: 'eeeee'},
            {id: 6, name: 'fffff'},
            {id: 7, name: 'ggggg'},
            {id: 8, name: 'hhhhh'}
        ];

        vm.state = {}
        vm.states = [
            {id: 1, name: 'aaaaa'},
            {id: 2, name: 'bbbbb'},
            {id: 3, name: 'ccccc'},
            {id: 4, name: 'ddddd'},
            {id: 5, name: 'eeeee'},
            {id: 6, name: 'fffff'},
            {id: 7, name: 'ggggg'},
            {id: 8, name: 'hhhhh'}
        ];

        vm.year = {}
        vm.years = [
            {id: 1, name: '2000'},
            {id: 2, name: '2001'},
            {id: 3, name: '2002'},
            {id: 4, name: '2003'},
            {id: 5, name: '2004'},
            {id: 6, name: '2005'},
            {id: 7, name: '2006'},
            {id: 8, name: '2007'},
            {id: 1, name: '2008'},
            {id: 2, name: '2009'},
            {id: 3, name: '2010'},
            {id: 4, name: '2011'},
            {id: 5, name: '2012'},
            {id: 6, name: '2013'},
            {id: 7, name: '2014'},
            {id: 8, name: '2015'},
            {id: 3, name: '2016'},
            {id: 4, name: '2017'},
            {id: 5, name: '2018'},
            {id: 6, name: '2019'},
            {id: 7, name: '2020'}
        ];

        vm.major = {}
        vm.majors = [
            {id: 1, name: 'aaaaa'},
            {id: 2, name: 'bbbbb'},
            {id: 3, name: 'ccccc'},
            {id: 4, name: 'ddddd'},
            {id: 5, name: 'eeeee'},
            {id: 6, name: 'fffff'},
            {id: 7, name: 'ggggg'},
            {id: 8, name: 'hhhhh'}
        ];

        vm.sport = {}
        vm.sports = [
            {id: 1, name: 'aaaaa'},
            {id: 2, name: 'bbbbb'},
            {id: 3, name: 'ccccc'},
            {id: 4, name: 'ddddd'},
            {id: 5, name: 'eeeee'},
            {id: 6, name: 'fffff'},
            {id: 7, name: 'ggggg'},
            {id: 8, name: 'hhhhh'}
        ];

        vm.activity = {}
        vm.activities = [
            {id: 1, name: 'aaaaa'},
            {id: 2, name: 'bbbbb'},
            {id: 3, name: 'ccccc'},
            {id: 4, name: 'ddddd'},
            {id: 5, name: 'eeeee'},
            {id: 6, name: 'fffff'},
            {id: 7, name: 'ggggg'},
            {id: 8, name: 'hhhhh'}
        ];

        vm.challenge = {}
        vm.challenges = [
            {id: 1, name: 'aaaaa'},
            {id: 2, name: 'bbbbb'},
            {id: 3, name: 'ccccc'},
            {id: 4, name: 'ddddd'},
            {id: 5, name: 'eeeee'},
            {id: 6, name: 'fffff'},
            {id: 7, name: 'ggggg'},
            {id: 8, name: 'hhhhh'}
        ];
    }
})();