/*
---

name: MooPlaceholder

description: This simple plugin provides HTML 5 placeholder attribute to all browsers.

license: MIT-style

authors:
- Alexey Gromov
- Arian Stolwijk
- Phil Freo
- Andrew Sutherland

requires: [Core/Element]
provides: [Element.MooPlaceholder, MooPlaceholder]

Todo: fix passwords in IE (ie < 9 can't change input type)
See: https://github.com/danielstocks/jQuery-Placeholder/blob/master/jquery.placeholder.js

...
*/
(function() {

var placeholder = 'placeholder';

var placeholderSupported = function() {
	placeholderSupported = Function.from(placeholder in document.createElement('input'));
	return placeholderSupported();
};

Element.implement('MooPlaceholder', function(color) {
	var element = this;
	if (placeholderSupported()) return element;

	color = color || '#a9a9a9';	// default to same color as webkit's placeholder
	
	var text = element.get(placeholder),
		defaultColor = element.getStyle('color'),
		form = element.getParent('form');

	// ignore fields with no placeholder attribute value
	if (!text)
		return;

	// set the elements value to its placeholder if it doesn't already have a value defined
	// and if its not already focused
	var isFocused = document.activeElement && document.activeElement === element;
	if (element.get('value') === '' && !isFocused) {
		element.setStyle('color', color).set('value', text);
		if (!Browser.ie && element.get('type') === 'password') {
			element.store('isPassword', true).set('type', 'text');
		}
	}

	// check to see if we've already added events to this input;
	// this lets use call MooPlaceholder multiple times safely if we need to
	if (element.retrieve('placeholderHandled')) {
		return;
	}
	
	element.addEvents({
		focus: function(){
			var value = element.get('value');
			if (value === '' || value === text) {
				element.setStyle('color', defaultColor).set('value', '');
				if (!Browser.ie && element.retrieve('isPassword')) {
					element.set('type', 'password');
				}
			}
		},

		blur: function(){
			var value = element.get('value');
			if (value === '' || value === text) {
				element.setStyle('color', color).set('value', text);
				if (!Browser.ie && element.retrieve('isPassword')) {
					element.set('type', 'text');
				}
			}
		}
	});

	if (form) {
		form.addEvent('submit', function() {
			if (element.get('value') === text) {
				element.set('value', '');
			}
		});
	}
	
	element.store('placeholderHandled', true);
	
	return element;
});


this.MooPlaceholder = function(color, selector) {
	// only need to look for inputs/textareas that have the placeholder attribute
	if (!selector) selector = 'input[' + placeholder + '],textarea[' + placeholder + ']';
	$$(selector).MooPlaceholder(color);
};

})();