'use strict';

/* Controllers */

angular.module('myApp.controllers', [])

//FORM CONTROLLER
.controller('FormController', ['$scope', '$http', function($scope, $http) {

    //FORM TEMPLATE
    $scope.formTemplate = 'partials/form.html';
    var date = new Date();
    $scope.listFocus = false;

    //APPROVE INVOICE
    $scope.invSubmit = function() {
        console.log('approved');
        $scope.invoice.date = date.toDateString();
        $scope.invoice.status = "approved";
        $scope.invList.$save($scope.invoice);
    };

    $scope.invReject = function() {
        console.log('rejected');
        $scope.invoice.date = date.toDateString();
        $scope.invoice.status = "rejected";
        $scope.invList.$save($scope.invoice);
    };


    //LOAD CONTRACTORS INTO SUPPLIER DROPDOWN
    $http.get('./data/contractors.json')
        .success(function(data) {
                $scope.contractorList = data;
            })
            .error(function(data) {
                alert('failed to load contractors');
            });

    //LOAD GL CODES INTO GL DROPDOWN
    $http.get('./data/gl_codes.json')
        .success(function(data) {
                $scope.glList = data;
            })
            .error(function(data) {
                alert('failed to load GL codes');
            });

    //LOAD PROPERTY INFO INTO DROPDOWNS
    $http.get('./data/properties.json')
        .success(function(data) {
                $scope.propertyList = data;
            })
            .error(function(data) {
                alert('failed to load properties');
            });

}])

//INVOICE DASHBOARD CONTROLLER

.controller('DashboardController', ['$scope', '$http', '$firebase', function($scope, $http, $firebase) {

    //GENERAL INIT
    var isInvOpen;
    $scope.searchQuery = '';
    $scope.openedInvoice = false;

    //FIREBASE INIT
    var ref = new Firebase("https://paperlessdb.firebaseio.com/");
    var sync = $firebase(ref);

    //INVOICE TEMPLATE
    $scope.invoiceListTemplate = 'partials/invoiceList.html';
    $scope.activeInvoice = 'partials/activeInvoice.html';

    //LOAD INVOICES INTO VARS VIA FIREBASE
    $scope.invList = sync.$asArray();

    //LOAD INVOICES INTO VARS LOCALLY
    // $http.get('./data/invoices.json')
    //       .success(function( data ){
    //          $scope.invList = data;
    //      })
    //       .error(function( data ){alert('failed to load invoices');});

    //CLICK INVOICE
    $scope.toggleInvoice = function(invoice, index) {
        /*console.log('toggled');
        $scope.openedInvoice = !$scope.openedInvoice;
        this.openInv = $scope.openedInvoice;
        $scope.$parent.openInv = false;
        $scope.invoice = invoice;
        $scope.openInvNo = index;*/

    }



}]);


// DOM INTERACTIONS
$(document).ready(function(){

    //CLICK AN ITEM AND OPEN & SCROLL IF CLOSED
    $(document).on('click', '.invList li .container', function(){

        var $this = $(this);

        if($this.parent().hasClass('invHidden')){
            var $this = $(this);
            var scrollPos = $this.position().top;

            $('body').animate({
                scrollTop:scrollPos-100
            }, 300);
        }
        
        toggleInvoice($this.parent());   

    });

    //CLICK APPROVE OR REJECT TO CLOSE
    $(document).on('click', '.invSubmit, .invReject', function(){

       toggleInvoice($(this).parents('li'));   

    });

    //TOGGLE INVOICE DETAILS PANEL
    function toggleInvoice(element){

        element
            .toggleClass('invHidden')
            .siblings('.invList li').addClass('invHidden');
    }

});