/*
---

name: MooPlaceholder

description: This simple plugin provides HTML 5 placeholder attribute to all browsers.

license: MIT-style

authors:
- Alexey Gromov
- Arian Stolwijk
- Phil Freo

requires: [Core/Element]
provides: [Element.MooPlaceholder, MooPlaceholder]

...
*/


(function(){

var placeholder = 'placeholder';

var placeholderSupported = function(){
	placeholderSupported = Function.from(placeholder in document.createElement('input'));
	return placeholderSupported();

};


Element.implement('MooPlaceholder', function(color){
	var element = this, value;
	if (placeholderSupported()) return element;

	if (!color) color = '#aaa';

	var text = element.get(placeholder),
		defaultColor = element.getStyle('color'),
		form = element.getParent('form');

	element.setStyle('color', color).set('value', text);

	element.addEvents({
		focus: function(){
			value = element.get('value');
			if (value == '' || value == text) element.setStyle('color', defaultColor).set('value', '');
		},

		blur: function(){
			value = element.get('value');
			if (value == '' || value == text) element.setStyle('color', color).set('value', text);
		}
	});

	if (form) form.addEvent('submit', function(){
		if (element.get('value') == text) element.set('value', '');
	});

	return element;
});


this.MooPlaceholder = function(color, selector){
	// only need to look for inputs/textareas that have the placeholder attribute
	if (!selector) selector = 'input[' + placeholder + '],textarea[' + placeholder + ']';
	$$(selector).MooPlaceholder(color);
};


})();
