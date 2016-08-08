
OODK('foundation', function($){
	
	$.public().interface(function EventUnicaster($){

		$.abstract('__dispatchEvent');

		$.abstract('__approveListener');

		$.abstract('__eventConsumed');
	});
});