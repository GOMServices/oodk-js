
OODK('foundation.util', function($, _){
	
	$.public().class(function Event($, µ, _){

		$.protected('target');

		$.protected('timeStamp');

		$.protected('type');

		$.protected('data');

		$.protected('srcEvent');

		$.protected('propagation');

		$.public(function __initialize(type){

			µ.type = type;

			µ.propagation = true;

			µ.timeStamp = 0;

			µ.data = {};
		});

		$.public(function getType(){
			return µ.type;
		});

		$.public(function stopPropagation(){
			µ.propagation = false;
		});

		$.public(function isPropagable(){
			return (µ.propagation === true);
		});

		$.public(function setTarget(target){
			µ.target = target;
		});

		$.public(function setSrcEvent(evt){
			µ.srcEvent = evt;
		});

		$.public(function getSrcEvent(){
			return µ.srcEvent;
		});

		$.public(function setData(data){

			data = $.default(data, {});

			µ.data = data;
		});

		$.public(function setDataValue(key, value){

			if(!OODKObject.is(key, String)){
				$.throw(OODK.foundation.IllegalArgumentException, key + ' is not a string');
			}

			µ.data[key] = value;
		});

		$.public(function getData(){
			return µ.data;
		});

		$.public(function getDataValue(key){

			if(!OODKObject.is(key, String)){
				$.throw(OODK.foundation.IllegalArgumentException, key + ' is not a string');
			}

			return µ.data[key];
		});
	});
});