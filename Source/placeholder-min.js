/*
---
description: Provides HTML 5 placeholder attribute to all browsers.

license: MIT-style

authors:
- Alexey Gromov

requires:
- core/1.2.4: '*'

...
*/
if(typeof NS=="undefined")NS={}; $(window).addEvent("domready",function(){"placeholder"in document.createElement("input")||$$("input").each(function(a){var b=a.getAttribute("placeholder"),d=a.getStyle("color");if(b){a.setStyle("color","#aaa");a.value=b;a.addEvent("focus",function(){if(a.value==""||a.value==b){a.setStyle("color",d);a.value=""}});a.addEvent("blur",function(){if(a.value==""||a.value==b){a.setStyle("color","#aaa");a.value=b}});var c=a.getParents("form");c.length&&c[0].addEvent("submit",function(){if(a.value==b)a.value= ""})}})});