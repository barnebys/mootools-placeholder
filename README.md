MooTools-Placeholder
====================

This simple plugin provides HTML 5 placeholder attribute to all browsers.

![Screenshot](https://github.com/arian/MooTools-Placeholder/raw/master/screenshot.png)

How to use
----------

Just include placeholder.js or placehoder-min.js to your HTML:

	#HTML
	<script type="text/javascript" src="/js/placeholder-min.js"></script>
	<form action="#">
		<input type="text" name="field" placeholder="Placeholder Text" />
	</form>

And then initialize the MooPlaceholder

	#JS
	window.addEvent('domready', function(){
		MooPlaceholder();
	}

Demo
----

[http://jsfiddle.net/Sqa4u/](http://jsfiddle.net/Sqa4u/)

Thanks to
---------

Thanks to Nikita Vasilyev for his genius solution: https://github.com/NV/placeholder.js
