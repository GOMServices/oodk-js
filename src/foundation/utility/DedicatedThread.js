
OODK('foundation.util', function($, _){
	
	$.implements(OODK.foundation.EventBroadcaster).class(function DedicatedThread($, µ, _){

		$.protected('id');

		$.protected('name');

		$.protected('state');

		$.protected('queue');

		$.private('reservedEventType');

		$.protected('lockList');

		$.public(function __initialize(){

			µ.queue = [];

			µ.lockList = {};

			_.reservedEventType = ['onsleep', 'onterminate', 'onawake', 'oninitialize'];

			µ.state = _.ns.DedicatedThread.self.NEW;

			onmessage = function(evt){

				µ.processEvent(evt);
			}
		});

		$.private(function __dispatchEvent(evt){});

		$.private(function __approveListener(request){});

		$.private(function __eventConsumed(evt){});

		$.protected(function processEvent(evt){

			if(evt.data.type === 'thread.initialize'){

				if(typeof µ.id == 'undefined'){

					µ.state = _.ns.DedicatedThread.self.RUNNABLE;

					µ.id = evt.data.id;

					µ.name = evt.data.name;

					postMessage({'type': 'thread.initialize'});

					var e = µ.factoryEvent(evt);

					$.trigger(e);
				}
			}else if(evt.data.type === 'thread.terminate'){

				µ.state = _.ns.DedicatedThread.self.TERMINATED;

				var e = µ.factoryEvent(evt);

				$.trigger(e);

				postMessage({'type': 'thread.terminate'});

			}else if(evt.data.type === 'thread.sleep'){

				µ.state = _.ns.DedicatedThread.self.WAITING;

				var e = µ.factoryEvent(evt);

				$.trigger(e);

			}else if(evt.data.type === 'thread.awake'){

				µ.state = _.ns.DedicatedThread.self.RUNNABLE;

				var e = µ.factoryEvent(evt);

				$.trigger(e);

				this.processQueue();

				this.resetQueue();

			}else if(evt.data.type === 'thread.responselock'){

				if(this.isAlive()){

					if(!this.isAsleep()){

						var e = µ.factoryEvent(evt);

					    e.setData({'result': result, 'lockId': lockId});

						$.trigger(e);

						var result = evt.data.result;

						if(result == 1){

							var lockId = evt.data.lockId;

							if(µ.lockList.hasOwnProperty(lockId)){

								//apply the callback
								µ.lockList[lockId].apply(null, []);

								delete µ.lockList[lockId];

								postMessage({'type': 'thread.unlock', 'lockId': lockId });
							}
						}
					}else{

						µ.queue.push(evt);
					}
				}

			} else{

				// custom event

				if(this.isAlive()){

					if(!this.isAsleep()){

					    var e = µ.factoryEvent(evt);

					    e.setData($.unserialize(evt.data.data));

						$.trigger(e);
					    
					}else{

						µ.queue.push(evt);
					}
				}
			}
		});

		$.public(function processQueue(){

			OODKObject.forEach(µ.queue, function(evt){
					
				µ.processEvent(evt);
			});
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
			return ([_.ns.DedicatedThread.self.RUNNABLE, _.ns.DedicatedThread.self.WAITING].indexOf(µ.state) !==-1);
		});

		$.public(function isAsleep(){
			return ([_.ns.DedicatedThread.self.WAITING].indexOf(µ.state) !==-1);
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

		$.private(function lock(lockId, callback){

			if(!µ.lockList.hasOwnProperty(lockId)){

				µ.lockList[lockId] = callback;

				postMessage({'type': 'onrequestlock', 'lockId': lockId});
			}
			
		});

		$.private(function unlock(lockId){

			if(µ.lockList.hasOwnProperty(lockId)){

				delete µ.lockList[lockId];

				postMessage({'type': 'thread.unlock', 'lockId': lockId});
			}
		});

		$.protected(function factoryEvent(evt){

			var e = $.new(OODK.foundation.util.ThreadEvent, evt.data.type, this);

			e.setSrcEvent(evt);

			e.setThread(this);

			e.sync();

			return e;
		});

		$.static(function($, µ, _){

			$.final().public('NEW', 1);

			$.final().public('RUNNABLE', 2);

			$.final().public('TERMINATED', 3);

			$.final().public('WAITING', 4);
		});
	});
});