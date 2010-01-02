/*
---
description: This simple plugin provides HTML 5 placeholder attribute to all browsers.

license: MIT-style

authors:
- Alexey Gromov
- Arian Stolwijk

requires:
- core/1.2.4: '*'

provides: [Element.MooPlaceholder,MooPlaceholder]

...
*/

Element.implement('MooPlaceholder',function(color){
	if ('placeholder' in this) return;
	
	color = color ? color : '#aaa';
	
	var text = this.get('placeholder'), 
		defaultColor = this.getStyle('color');
	
	this.setStyle('color', color)
		.set('value',text)
		.addEvents({
		'focus': function(){
			if (this.get('value') == '' || this.get('value') == text) {
				this.setStyle('color', defaultColor);
				this.set('value','');
			}
		}.bind(this),
		
		'blur': function(){
			if (this.get('value') == '' || this.get('value') == text) {
				this.setStyle('color', color);
				this.set('value',text);
			}
		}.bind(this)
	});
	
	var form = this.getParent('form');
	if (form) {
		form.addEvent('submit', function(){
			if (this.get('value') == text) 
				this.set('value','');
		}.bind(this));
	}
	
});

var MooPlaceholder = function(color,selector){
	selector = selector ? selector : 'input';
	$$(selector).MooPlaceholder(color);
};
