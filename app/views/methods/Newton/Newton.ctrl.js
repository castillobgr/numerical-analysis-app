angular.module('numerical-analysis')
.controller('NewtonCtrl', function($state, $stateParams, $mdSidenav, $mdUtil, Newton, MethodCommons){
  'use strict';

  var self = this;
  var originatorEv;

  self.availableMethods = MethodCommons.getAvailableMethods();

  self.results = [];

  initParams();

  self.calculate = function (form){
    if(form.$invalid) {
      return;
    }
    self.results = Newton.calculate(
      self.params.fn,
	  self.params.dr,
      self.params.varName,
      self.params.a,
      self.params.nmax,
      self.params.tol || 0.0);
  };

  self.openMethodsMenu = function($mdOpenMenu, ev) {
    originatorEv = ev;
    $mdOpenMenu(ev);
  };

  self.onMethodSelected = function(method){
    $state.go('methods.' + method.replace(/\s/g, '-'), { fn: self.params.fn });
  }
  
  self.onMethodSelected = function(method){
    $state.go('methods.' + method.replace(/\s/g, '-'), { dr: self.params.dr });
  }

  self.toggleInfo = $mdUtil.debounce(function(){
      $mdSidenav('info').toggle();
    },
    300
  );

  self.closeInfo = function () {
    $mdSidenav('info').close();
  };

  function initParams() {
    self.params = {};
    self.params.fn = $stateParams.fn || 'exp(x) + 3 * sin(x) - (x^3) + 4 * x - 2';
	self.params.dr = $stateParams.dr || 'exp(x) + 3 * cos(x) - 3 * (x^2) + 4';
    self.params.varName = $stateParams.x || 'x';
    self.params.a = $stateParams.a || -2;
    self.params.nmax = $stateParams.nmax || 100;
    self.params.tol = $stateParams.tol || 0.0;
  }
});