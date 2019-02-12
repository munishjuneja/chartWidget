angular.module('uiRouterApp')
        .config(['$httpProvider','$stateProvider','$urlRouterProvider',function($httpProvider,$stateProvider,$urlRouterProvider){
            //$urlRouterProvider.otherwise('login');
			$urlRouterProvider.otherwise('dashboard');
			$stateProvider.state('dashboard',{
				url: '/dashboard',
				controller: 'dashboardCtrl',
				templateUrl: 'partials/home.html',
				controllerAs: 'dashboard'
			    })

        }]);
