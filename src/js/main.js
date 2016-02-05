var angularModule = require('angular');

var app = angular.module('app', []);

app.controller('controller', function($scope) {});

app.directive('editableField', function($compile) {
  var savedValue = undefined;
  var templates = {
    defaultView: "<span ng-dblclick='dblClickHandler()'>{{value}}</span>",
    inputView: "<input type='text' ng-model='value' ng-keydown='onKeyDownHandler($event)'>",
    selectView: "<select ng-model='value' ng-keydown='onKeyDownHandler($event)'><option ng-repeat='item in items' value='{{item.name}}'>{{item.name}}</option></select>"
  }

  return {
    restrict: "E",
    replace: true,
    scope: {
      value: '@model',
      options: '=items'
    },
    
    controller: function($scope) {
      $scope.items = [
        {id: '1', name: 'Option A'},
        {id: '2', name: 'Option B'},
        {id: '3', name: 'Option C'},
        {id: '4', name: 'Option C'},
        {id: '5', name: 'Option C'}
      ],

      $scope.doRender = function(element, attrs) {
        var viewType = attrs ? attrs.type : '';
        var view = $scope.getTemplate(viewType);
        var content = $compile(view)($scope);

        element.empty();
        element.append(content);
      },

      $scope.saveValue = function(value) {
        savedValue = value;
      },

      $scope.setSavedValue = function() {
        $scope.value = savedValue;
      },

      $scope.getTemplate = function(viewType) {
        return templates[viewType ? viewType + 'View' : 'defaultView'];
      }
    },

    link: function($scope, element, attrs) {
      $scope.doRender(element);

      $scope.dblClickHandler = function() {
        $scope.saveValue($scope.value);
        $scope.doRender(element, attrs);

        if (attrs.type === 'input') {
          element.find('input')[0].focus();
        }
      }

      $scope.onKeyDownHandler = function($event) {
        if ($event.keyCode === 13) {
          $scope.doRender(element);
        }

        if ($event.keyCode === 27) {
          $scope.setSavedValue();
          $scope.doRender(element);
        }
      } 
    }   
  }
});
