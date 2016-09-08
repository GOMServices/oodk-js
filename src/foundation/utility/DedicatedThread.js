
OODK('foundation.util', function($, _){
	
	$.implements(OODK.foundation.EventBroadcaster).class(function DedicatedThread($, µ, _){

		$.protected('id');

		$.protected('name');

		$.protected('state');

		$.private('reservedEventType');

		$.public(function __initialize(){

			_.reservedEventType = ['thread.terminate', 'thread.initialize'];

			µ.state = _.ns.DedicatedThread.self.NEW;

			onmessage = function(evt){

				µ.processEvent(evt);
			}
		});

		$.private(function __dispatchEvent(evt){});

		$.private(function __approveListener(request){});

		$.private(function __eventConsumed(evt){

			if(evt.getType() === 'thread.terminate'){

				this.stop(evt.getData());
			}
		});

		$.protected(function processEvent(evt){

			if(evt.data.type === 'thread.initialize'){

				if(typeof µ.id == 'undefined'){

					µ.state = _.ns.DedicatedThread.self.RUNNABLE;

					µ.id = evt.data.id;

					µ.name = evt.data.name;

					postMessage({'type': 'thread.initialize'});

					var e = µ.factoryEvent(evt);

					e.setType('thread.ready');

					$.trigger(e);
				}else{
					$.throw(OODK.foundation.IllegalStateException, 'Cannot start thread '+µ.name+' - Thread is already started');
				}
			}else if(evt.data.type === 'thread.terminate'){

				var e = µ.factoryEvent(evt);

				e.setCancelable(true);

				$.trigger(e);

			}else{

				// custom event

				if(this.isAlive()){

				    var e = µ.factoryEvent(evt);

				    var unserial = $.unserialize(evt.data.data);
				    
				    e.setData(unserial);

					$.trigger(e);
					
				}
			}
		});

		$.public(function resetQueue(){
			µ.queue = [];
		});

		$.public(function getId(){
			return µ.id;
		});

		$.public(function getName(){
			return µ.name;
		});

		$.public(function getState(){
			return µ.state;
		});

		$.public(function isAlive(){
			return (µ.state === _.ns.DedicatedThread.self.RUNNABLE);
		});

		/**
		 * send a message the main thread
		 * serialize the data argument before sending
		 */
		$.public(function send(type, data){

			if(_.reservedEventType.indexOf(type) !== -1){
				$.throw(OODK.foundation.IllegalArgumentException, 'Cannot send message ' + type + ' - it is reserved message type');
			}

			data = $.serialize(data);

			postMessage({'type': type, 'data': data});
		});

		$.protected(function factoryEvent(evt){

			var e = $.new(OODK.foundation.util.Event, evt.data.type, this);

			e.setSrcEvent(evt);

			e.sync();

			return e;
		});

		$.public(function stop(data){
			µ.state = _.ns.DedicatedThread.self.TERMINATED;

			postMessage({'type': 'thread.terminate', 'data': data});
		});

		$.static(function($, µ, _){

			$.final().public('NEW', 1);

			$.final().public('RUNNABLE', 2);

			$.final().public('TERMINATED', 3);
		});
	});
});