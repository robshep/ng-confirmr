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