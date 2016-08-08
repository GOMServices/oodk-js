
OODK('foundation', function($){
	
	$.public().interface(function EventBroadcaster($){

		$.abstract('__dispatchEvent');

		$.abstract('__approveListener');

		$.abstract('__eventConsumed');
	});
});