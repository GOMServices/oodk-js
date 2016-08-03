OODK('foundation', function($, _){
	
	$.public().extends(this.Exception).class(function FileNotFoundException($, µ, _){

		$.public(function __initialize(file){
			µ.file = file;

			var msg = 'file '+ file + ' not found';

			$.super.__initialize(msg);
		});
	});
});