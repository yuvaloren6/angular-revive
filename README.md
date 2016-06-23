#<p style="text-align: center;">Revive</p>
##<p style="text-align: center;">Bring dead html alive</p>
The <b>revive</b> is a wrapper for other directives, or dead html, that can take advantage of its ability to interface with ngModel, and provide select-like
 management of any group of clickable regions. The directive's two-way binding with ngModel insures that any changes in the model has immediate 
effect on the view, and that any user interaction with underline directive is immediatelly propagated to the model.

####Selection mode
When operating in a single selection mode: repeated selections of the same item - selectes that item repeatedly, if you wish to 
de-select an item without selecting another, use null.

When operating in a multiple selections mode: selecting a selected item - de-select that item. 
###Dependencies
The <b>revive</b> sole dependency is on AngularJS 1.5.6 [get AngularJS](http://angularjs.org/)
###Demo
THe directive comes with an example project that lets you try out its various capabilities.
###Usage
<b>revive</b> directive is a transclusive directive that empower other directives by wrapping them.
With the addition of a few events, you can turn your dead html into an imaginative select.

You incorparate the directive in your html file in the follwoing manner:
```html
	<div universal-angular-select ng-model="scopeVariable" disabled-items="disableMapItems" reset-select="{{scopeVariable}}" 
        multiple="{{scopeVariable}}">
		<div your-direcive ...</div>
	</div>
```
###Properties
The directive exihibts the following properties
####ng-model - optional, watch
Two way binding between the directive and the model. Changes to the model are instantaneously reflected in the view and vice-versa.
####disabled-items - optional, watch
An array of items (identifiers) that cannot be manipulated (selected or de-selected should appear disabled) by the user. Content of the array is
immediatelly propagated to the transcluded directive via a $broadcast event. It's the responsibility of the transcluded directive to act upon
the event and disable/enable to appropriate selective data (regions).
####reset-select - optional, watch
Resets the directive state - clears the selections list and broadcasts a reset event to the underline directive. This is a one-way
 binding of a scope variable and you initiate a reset event by simply changing the value of the scope variable (true/false or 0/1 will do).
 Any change in value from the current value will initiate a reset event. 

Use this event with caution. You want to send a reset event, only if the state of your underline directive has changes in a major way and you want to start afresh. 
####multiple - optional, watch
Sets the mode of selection. If the <i>multiple</i> attribute is missing from the directive list of attributes then the directive allows only a single
selection (combobox mode). When the directive is in a single selection mode, the value of the ngModel input variable should be a string, as this is
the type of the output provided by the directive back to the ngModel.

 if the <i>multiple</i> attribute appears in the directive's attribute list, then the directive allows multiple selections
 to be made (listbox mode). if the <i>multiple</i> attribute has no value or its value is not a positive integer (i.e. <i>multiple</i>, <i>multiple="true"</i>,
 <i>multiple="false"</i>, etc' - take note that a value of 'false' has no bearing on the directive behavior) then the number of allowed selections is unlimited.
 However, if the value of the <i>multiple</i> attribute is a positive  integer, then that number is taken to be the maximum number of selections allowed.
 That is, if <i>multiple="2"</i>, then only 2 selections are allowed. Selections are cyclical, so the third object selected by the user will 
remove the first selected object from the selected item list. When the directive is in multiple selections mode, the value of the ngModel input
 variable should be an array, as this is the type of the ouput provided by the directive back to the ngModel.

When operating in a single selection mode: repeated selections of the same item - selectes that item repeatedly, if you wish to 
de-select an item without selecting another, use null.

When operating in a multiple selections mode: selecting a selected item - de-select that item. 
###Events
You only need to implement those events which you intend to respond to. If you are not intending to disable any items or reset the directive, 
then you do not need to implement those events.
####MessageItemSelected - emitted by the transcluded directive or its children
The event is transmitted by the transcluded directive or one of its children with the 'id' of the of the newly selected item. This is usually done from
 the directive's 'click' event handler (but that of course depends on your logic).

Use the conteroller $scope (or scope from link function) rather than $rootscope to transmit the event if use more than one <b>revive</b> directives
 in your page.

The following piece of code is the kind of logic you will need to implement in your directive:
```javascript
	$scope.clickEvent = function (event, id) {
		if (I'm Disabled - do nothing) {
			return;
		}
		$scope.$emit(MessageItemSelected, id);
	};
```
####MessageSelectionChanged - broadcasted by the directive
The event is broadcasted from the directive to its transcluded directive and its children in response to a change in the list of selected items, either by user 
interaction or model intervention. This gives the transcluded directive and/or its children the opprtunity to update (redraw) its/their selected and non-selected
 items (areas) accordingly.

The following piece of code is the kind of logic you will need to implement in your directive:
```javascript
	$scope.$on(MessageSelectionChanged, function (event, selections) {
		if (I'm in selected list) {
			show that I'm selected
		} else {
			show my normal representation
		}
	});
```
####MessageDisableItems - broadcasted by the directive
Whenever the list of disabled items is changes by the model, the directive will broadcast the updated list to its transcluded directive and its children.
 This will give the transcluded directive and its children the chance to update (redraw) the view based on changes made by the model.

The following piece of code is the kind of logic you will need to implement in your directive:  
```javascript
    $scope.$on(MessageDisableItems, function (event, disabledList) {
        if (I'm in list of disabled items) {
			disable myself
        } else {
			enable myself
        }
    });
```
####MessageSelectReset - broadcasted by the directive
You should use the reset event only if you made major changes to the underline directive in a way that requires the transcluded
 directive and/or its children to start afresh.

Take note, a resest event, clears the list of selected item, as one come to expect from a resets event, but it has no effect on the list 
of disabled items. The following piece of code is the kind of logic you will need to implement in your directive:
```javascript
    $scope.$on(MessageSelectReset, function (event) {
        reset logic - such as if I'm selected, de-select myself
    });
```

###Install with Bower
```sh
$ bower install revive
```
