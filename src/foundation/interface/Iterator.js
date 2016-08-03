
OODK('foundation', function($){
	
	$.public().interface(function Iterator($){

		$.abstract('hasNext');

		$.abstract('next');

		$.abstract('nextIndex');

		$.abstract('reset');
	});
});