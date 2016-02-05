var angularModule = require('angular');

var app = angular.module('app', []);

app.directive('editableField', function($compile) {
  var savedValue = undefined;
  var templates = {
    defaultView: "<span ng-dblclick='dblClickHandler()'>{{value}}</span>",
    inputView: "<input type='text' ng-model='value' ng-keydown='onKeyUpHandler($event)'>",
    selectView: "<select ng-model='value' ng-keydown='onKeyUpHandler($event)'><option ng-repeat='item in items' value='{{item.name}}'>{{item.name}}</option></select>"
  }

  return {
    restrict: "E",
    replace: true,
    scope: true,
    
    controller: function($scope) {
      $scope.items = [
        {id: '1', name: 'Option A'},
        {id: '2', name: 'Option B'},
        {id: '3', name: 'Option C'}
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

      $scope.setValue = function(value) {
        $scope.value = value;
      },

      $scope.getTemplate = function(viewType) {
        return templates[viewType ? viewType + 'View' : 'defaultView'];
      }
    },

    link: function($scope, element, attrs) {
      $scope.setValue(attrs.model);
      $scope.doRender(element);

      $scope.dblClickHandler = function() {
        $scope.saveValue($scope.value);
        $scope.doRender(element, attrs);
      }

      $scope.onKeyUpHandler = function($event) {
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