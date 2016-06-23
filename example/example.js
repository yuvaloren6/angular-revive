/// <reference path="bower_components/angular/angular.js" />

angular.module('example', ['angular-revive', 'ui.bootstrap'])
.controller('exampleCtrl', function ($scope, $timeout, MessageItemSelected) {

    $scope.checkModel = {
        A: false,
        B: false,
        C: false,
        D: false
    };

    $scope.locations = [
        { location: 'A', top: '0%', left: '0%' },
        { location: 'B', top: '0%', left: '50%' },
        { location: 'C', top: '50%', left: '0%' },
        { location: 'D', top: '50%', left: '50%' },
    ];

    $scope.radioModel = 'select2';
    $scope.maxSelections = 2;
    $scope.resetMap = 0;
    $scope.disableMapRegions = [];

    $timeout(function () {
        $scope.mapSelections = ['A'];
    }, 1);


    // emit disable/enable item 
    $scope.checkClick = function (event, id) {

        var text = ($scope.checkModel[id] === true) ? 'Enable ' + id : 'Disable ' + id;

        event.target.innerText = text;

        // toggle item in/out disabled list
        i = $scope.disableMapRegions.indexOf(id);
        if (-1 == i) {
            $scope.disableMapRegions.unshift(id);
        } else {
            $scope.disableMapRegions.splice(i, 1);
        }
    };

    // set number of selections 
    $scope.radioClick = function (event, num) {
        $scope.maxSelections = num;
    };

    // toggle selection of region 'B' through ng-model
    $scope.toggleSelectionRegionB = function () {

        $timeout(function () {

            if ((null === $scope.mapSelections) || angular.isString($scope.mapSelections)) {
                $scope.mapSelections = 'B';
            } else {
                if ((angular.isArray($scope.mapSelections)) && (0 < $scope.mapSelections.length) && (-1 < (i = $scope.mapSelections.indexOf('B')))) {
                    $scope.mapSelections.splice(i, 1);
                } else {
                    $scope.mapSelections.unshift('B');
                }
                // hack - if ngModel is an array - angular will not update the view unless you re-initialize the array
                var a = $scope.mapSelections.slice(0);
                $scope.mapSelections = a.slice(0);
            }
        }, 1)
    }
})
.controller('mapController', function ($scope, MessageItemSelected, MessageDisableItems, MessageSelectionChanged, MessageSelectReset) {

    var meDisabled = false;

    // enable region
    $scope.enabledStateClass = 'map-region-enabled'

    // attach event to directive in order to set value on model variable
    $scope.clickEvent = function (event, id) {

        // item is disabled - do nothing
        if (meDisabled) {
            return;
        }

        $scope.$emit(MessageItemSelected, id);
    };

    // listen to disble event
    $scope.$on(MessageDisableItems, function (event, disabledList) {

        if (-1 < disabledList.indexOf($scope.$parent.location.location)) {
            $scope.enabledStateClass = 'map-region-disabled';
            meDisabled = true;
        } else {
            $scope.enabledStateClass = 'map-region-enabled';
            meDisabled = false;
        }
    });

    // listen to selection changed event
    selectionChangedEvent = $scope.$on(MessageSelectionChanged, function (event, selections) {

        if (-1 < selections.indexOf($scope.$parent.location.location)) {
            $scope.selectedStateClass = 'map-region-selected';
        } else {
            $scope.selectedStateClass = "";
        }
    });

    // listen to reset changed event
    SelectResetEvent = $scope.$on(MessageSelectReset, function (event) {

        $scope.selectedStateClass = "";
    });
})

