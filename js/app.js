(function() {
  'use strict';


  // Declare app level module which depends on filters, and services
  angular
    .module('myApp', ['ngResource','MeService','myApp.filters', 'myApp.services', 'myApp.directives'])
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/me', {templateUrl: 'partials/me.html', controller: "MeCtrl"});
      $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: "MyCtrl2"});
      $routeProvider.otherwise({redirectTo: '/me'});
    }]);
})();(function () {
  'use strict';

  var CONTROLLER_NAME = "MeCtrl",
      MODULE = "myApp";

  function controller($scope, me) {
    
    var config = {
      data: {},
      name: CONTROLLER_NAME
    };

    $scope.me = config;
    console.log("test");
    me.getData(function (data) {
      config.data = data;
    });

  }

  controller.$inject = ['$scope', 'me'];

  angular
  .module(MODULE) //retrieves the module
  .controller(CONTROLLER_NAME, controller); //register the controller by name, avoiding minification problems

})();

(function() {
  'use strict';

  /* Directives */


  angular.module('myApp.directives', []).
    directive('appVersion', ['version', function(version) {
      return function(scope, elm, attrs) {
        elm.text(version);
      };
    }]);

})();
(function () {
  'use strict';

  /* Filters */

  angular.module('myApp.filters', []).
    filter('interpolate', ['version', function(version) {
      return function(text) {
        return String(text).replace(/\%VERSION\%/mg, version);
      }
    }]);
})();(function() {
  'use strict';

  /* Services */


  // Demonstrate how to register services
  // In this case it is a simple value service.
  angular.module('myApp.services', []).
    value('version', '0.1');
})();(function (){
  "use strinct";

  // You should add MeService to the module dependencies to get the service me visible
  var MODULE_NAME = "MeService",
      SERVICE_NAME = "me";

  angular
  .module(MODULE_NAME, ['ngResource'])
  .factory(SERVICE_NAME, function($resource) {
    var me = $resource('/data/me.json', {})
    return {
      getData: function (callback) {
        me.get({}, function (u) {
          callback(u);
        });

      },
      service_name: SERVICE_NAME
    };
  });

})();

