
OODK('foundation.util', function($, _){
	
	$.public().extends(OODK.foundation.util.Event).class(function ThreadEvent($, µ, _){

		$.protected('thread');

		$.public(function __initialize(type, target){

			$.super.__initialize(type, target);
		});

		$.public(function setThread(thread){
			µ.thread = thread;
		});

		$.public(function getThread(){
			return µ.thread;
		});
	});
});