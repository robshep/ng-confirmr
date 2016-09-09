(function() {
  'use strict';

  angular
    .module('ng-confirmr', ['ui.bootstrap'])
    .service('confirmr', ['$uibModal', '$q', confirmrService])
    .controller('ConfirmrController',ConfirmrController)
    
    
  /** @ngInject */
  function confirmrService($uibModal, $q) 
  {
       function confirm(title, question, posText, negText, size)
       {
           var opts = {
               title: title,
               body: question,
               negText: negText,
               posText: posText
           }
           
           return $uibModal.open({
                templateUrl: 'confirmr.modal.html',
                size: size ? size : 'sm',
                controller: 'ConfirmrController',
                controllerAs: 'vm',
                resolve: {
                    opts: function () {
                        return opts;
                    }
                }   
           }).result.then(function(resp){
               if(resp === 'OK'){
                   return $q.resolve();
               }
               else {
                   return $q.reject();
               }
           })
       }
      
    return {
      confirm: confirm
    };
}

function ConfirmrController(opts) 
{
    var vm = this;
    vm.opts = opts;
}



})();
angular.module('ng-confirmr').run(['$templateCache', function($templateCache) {$templateCache.put('confirmr.modal.html','<div class="modal-header">\n    <h3 class="modal-title">{{vm.opts.title}}</h3>\n</div>\n<div class="modal-body">\n    \n    <div ng-if="vm.opts.body.tpl">\n        <ng-include ng-init="data = vm.opts.body.data" src="vm.opts.body.tpl"></ng-include>\n    </div>\n    \n    <div ng-if="vm.opts.body.form">\n        <formly-error-summary form="vm.opts.body.form.confirmForm" fields="vm.opts.body.form.fields"></formly-error-summary>\n        <form name="vm.opts.body.form.confirmForm" novalidate>\n            <formly-form model="vm.opts.body.form.model" fields="vm.opts.body.form.fields" options="vm.opts.body.form.options" form="vm.opts.body.form.confirmForm">\n            </formly-form>\n        </form>\n    </div>\n        \n    \n    <div ng-if="vm.opts.body.length" ng-bind-html="vm.opts.body">\n    </div>\n</div>\n<div class="modal-footer">\n    <button ng-if="vm.opts.negText" class="btn btn-warning" type="button" ng-click="$dismiss()">{{ vm.opts.negText ? vm.opts.negText : \'Cancel\' }}</button>\n    <button ng-if="vm.opts.posText" class="btn btn-success" type="button" ng-disabled="vm.opts.body.form && vm.opts.body.form.confirmForm.$invalid" ng-click="$close(\'OK\')">{{ vm.opts.posText ? vm.opts.posText : \'OK\'}}</button>\n</div>');}]);