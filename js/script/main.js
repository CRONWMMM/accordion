





require.config({
	shim : {
		"accordion" : {
			deps : ["jquery"],
			exports : "accordion"			
		}
	},
	paths : {
		"jquery" : "../lib/jquery.min",
		"accordion" : "../plugins/accordion"
	}
});

require(["jquery","accordion"],function($,accordion){
	$('ul').accordion({
		selectors : {
			binder : 'ac-bind',
			module : 'ac-module'
		},
		show : 'closeall',
		autoslide : true,
		speed : 300
	});
});