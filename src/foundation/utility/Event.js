
OODK('foundation.util', function($, _){
	
	$.public().class(function Event($, µ, _){

		/**
		 * source target of the event if any.
		 */
		$.protected('target');

		/**
		 * current target in case of bubbling.
		 */
		$.protected('currentTarget');

		/**
		 * list of all targets.
		 */
		$.protected('targets');

		/**
		 * timestamp of propagation of the event.
		 */
		$.private('timeStamp');

		/**
		 * type of the event.
		 */
		$.protected('type');

		/**
		 * custom data.
		 */
		$.protected('data');

		/**
		 * source event.
		 */
		$.protected('srcEvent');

		/**
		 * propagation state: true or false. Is the event is propageable to following listeners
		 */
		$.protected('propagation');

		/**
		 * default behavior state: true or false. Is the default action of the target (if any) is prevented to be executed.
		 */
		$.protected('defaultBehavior');

		/**
		 * is the event cancelable: true or false.
		 */
		$.private('cancelable');

		/**
		 * is the event interruptable: true or false.
		 */
		$.private('interruptable');

		/**
		 * how the event is dispatched: BUBBLE, from bottom target to top, CAPTURE, from top target to bottom.
		 */
		$.private('propagationMode');

		/**
		 * is the event propagable to the target hierarchy.
		 */
		$.private('propagable');

		/**
		 * is the event is dispatched asynchronously: true or false.
		 */
		$.protected('asynchrone');

		/**
		 * is the event is already dispatched: true or false
		 */
		$.private('consumed');

		/**
		 * initializer
		 */
		$.public(function __initialize(type, target){

			this.setType(type);

			µ.propagation = 1;

			µ.defaultBehavior = true;

			this.setCancelable(false);

			this.setInterruptable(true);

			_.propagationMode = $.ns.Event.self.BUBBLE;

			_.propagable = true;

			_.timeStamp = 0;

			this.async();

			this.setTarget(target);
		});

		/**
		 * Set the event type.
		 */
		$.public(function setType(type){

			µ.testConsumed();

			if(!$.is(type, String)){
				$.throw(OODK.foundation.IllegalArgumentException, OODKLang.valToString(type) + ' is not a string');
			}

			µ.type = type;
		});

		/**
		 * Get the event type.
		 */
		$.public(function getType(){
			return µ.type;
		});

		/**
		 * Is the event is consumed.
		 */
		$.public(function isConsumed(){
			return (_.timeStamp > 0);
		});

		/**
		 * Is the event is consumed.
		 */
		$.protected(function testConsumed(){
			
			if(this.isConsumed()){
				$.throw(OODK.foundation.IllegalOperationException, 'Cannot modify the event '+this.__resource+ ' - event is already consumed');
			}
		});

		/**
		 * consume the event, set the timeStamp attribute
		 */
		$.public(function consume(){
			_.timeStamp = new Date().getTime();
		});

 		/** 
 		 * Is the event is send asynchronously.
		 */
		$.public(function isAsync(){
			return (µ.asynchrone == true);
		});

		/** 
 		 * Set the asynchrone mode.
		 */
		$.public(function sync(){

			µ.testConsumed();

			µ.asynchrone = false;
		});

		/** 
 		 * Set the asynchrone mode.
		 */
		$.public(function async(){

			µ.testConsumed();

			µ.asynchrone = true;
		});

		/**
		 * prevent following listeners to be executed
		 */
		$.public(function stopImmediatePropagation(){

			if(_.interruptable === true){
				µ.propagation = -1;
			}
		});

		/**
		 * prevent following listeners to be executed and the event to be bubbled up the target hierarchy
		 */
		$.public(function stopPropagation(){

			if(_.interruptable === true){	
				µ.propagation = 0;
			}
		});

		/**
		 * is the event is propagble to folowing listeners
		 */
		$.public(function getPropagationState(){
			return µ.propagation;
		});

		/**
		 * Cancel the event, default behavior of the target is not executed
		 */
		$.public(function preventDefault(){

			if(_.cancelable === true){	
				µ.defaultBehavior = false;
			}
		});

		/**
		 * Is the default behavior of the target property is cancelled.
		 */
		$.public(function isDefaultPrevented(){
			return (µ.defaultBehavior === false);
		});

		/**
		 * Test if the event is cancelable.
		 */
		$.public(function isCancelable(){
			return (_.cancelable === true);
		});

		/**
		 * Test if the event is cancelable.
		 */
		$.public(function setCancelable(bool){

			µ.testConsumed();

			if(!$.is(bool, Boolean)){
				$.throw(OODK.foundation.IllegalArgumentException, OODKLang.valToString(bool) + ' is not a boolean');
			}

			_.cancelable = bool;
		});

		/**
		 * Test if the event is cancelable.
		 */
		$.public(function isInterruptable(){
			return (_.interruptable === true);
		});

		/**
		 * Test if the event is cancelable.
		 */
		$.public(function setInterruptable(bool){

			µ.testConsumed();

			if(!$.is(bool, Boolean)){
				$.throw(OODK.foundation.IllegalArgumentException, OODKLang.valToString(bool) + ' is not a boolean');
			}

			_.interruptable = bool;
		});

		/**
		 * set the propagation mode
		 */
		$.public(function setPropagationMode(mode){

			µ.testConsumed();

			if(mode !== $.ns.Event.self.BUBBLE && mode !== $.ns.Event.self.CAPTURE){
				$.throw(OODK.foundation.IllegalArgumentException, 'propagation mode is not valid');
			}

			 _.propagationMode = mode;
		});

		/**
		 * get the propagation mode.
		 */
		$.public(function getPropagationMode(){
			return _.propagationMode;
		});

		/**
		 * set if the event propagable to the target hierachy.
		 */
		$.public(function setPropagable(bool){

			µ.testConsumed();

			if(!$.is(bool, Boolean)){
				$.throw(OODK.foundation.IllegalArgumentException, OODKLang.valToString(bool) + 'is not a boolean');
			}

			_.propagable = bool;
		});

		/**
		 * test if the event is propagable to the target hierarchy.
		 */
		$.public(function isPropagable(){
			return (_.propagable === true);
		});

		/**
		 * Set target of the event
		 */
		$.public(function setTarget(target){

			µ.testConsumed();

			if(typeof target !== 'undefined'){

				if(!Array.isArray(target)){
					µ.targets = [target];
					µ.target = target;
				}else{
					µ.targets = target;
					µ.target = target[0];
				}
			}else{
				µ.targets = [];
			}
		});

		/**
		 * Get target of the event
		 */
		$.public(function getTarget(){
			return µ.target;
		});

		/**
		 * Get current target of the event in case of bubbling
		 */
		$.public(function getCurrentTarget(){
			return µ.currentTarget;
		});

		/**
		 * Get the timestamp of progation of the event
		 */
		$.public(function getTimeStamp(){
			return _.timeStamp;
		});

		/**
		 * Set the source event if any.
		 */
		$.public(function setSrcEvent(evt){

			µ.testConsumed();

			µ.srcEvent = evt;
		});

		/**
		 * Get the source event.
		 */
		$.public(function getSrcEvent(){
			return µ.srcEvent;
		});

		/**
		 * Set custom data to the event.
		 */
		$.public(function setData(data){

			µ.data = data;
		});

		/**
		 * Get custom data to the event.
		 */
		$.public(function getData(){
			return µ.data;
		});

		$.static(function($, µ, _){

			/**
			 * propagation mode by bubbling the event from bottom to top.
			 */
			$.final().public('BUBBLE', 1);

			/**
			 * propagation mode by capturing the event from top to bottom.
			 */
			$.final().public('CAPTURE', 2);
		})
	});
});