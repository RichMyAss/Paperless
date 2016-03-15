'use strict';

/* Directives */


angular.module('myApp.directives', [])

  	.directive('', [function() {

	    function link(scope, element, attrs) {

		      element.on('click', function() {
		        scope.toggleInvoice(scope.invoice, element.index);
		        console.log(element);
		      });
	    }

	    return {
	      link: link
	    }
	}]);