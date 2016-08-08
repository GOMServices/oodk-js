
OODK('foundation.util', function($, _){
	
	$.public().final().class(function EventListenerRequest($, µ, _){

		$.private('listener');

		$.private('type');

		$.private('state');

		$.public(function __initialize(eventType, listener){

			_.type = eventType;

			_.listener = listener;

			_.state = 1;
		});

		$.public(function getListener(){
			return _.listener;
		});

		$.public(function getEventType(){
			return _.eventType;
		});

		$.public(function discard(){
			return _.state = 0;
		});

		$.public(function isApproved(){
			return (_.state === 1);
		});
	});
});