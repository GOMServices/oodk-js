
OODK('foundation.util', function($, _){
	
	$.public().implements(OODK.foundation.EventBroadcaster).class(function Thread($, µ, _){

		$.protected('worker');

		$.protected('id');

		$.protected('name');

		$.protected('state');

		$.private(function __dispatchEvent(evt){});

		$.private(function __eventConsumed(evt){});

		$.private(function __approveListener(request){});

		$.public(function __initialize(file){

			_.self.count();

			µ.id = _.self.counter;

			µ.name = 'Thread-'+µ.id;

			if(!_.self.threadList.hasOwnProperty(µ.id)){
				_.self.threadList[µ.id] = this;
			}

			µ.worker = new Worker(file);

			µ.state = OODK.foundation.util.Thread.self.NEW;

			µ.worker.onmessage = function(evt){

				µ.processEvent(evt);
			}
		});

		$.public(function __finalize(){
			this.kill();
		});

		$.public(function getId(){
			return µ.id;
		});

		$.public(function setName(name){
			µ.name = name;
		});

		$.public(function getName(){
			return µ.name;
		});

		$.public(function getState(){
			return µ.state;
		});

		$.public(function isAlive(){
			return (µ.state === OODK.foundation.util.Thread.self.RUNNABLE);
		});

		$.public(function start(data){
			µ.worker.postMessage({'type': 'thread.initialize', 'id': µ.id, 'name': µ.name, 'data': data});
		});

		$.public(function stop(data){
			µ.worker.postMessage({'type': 'thread.terminate', 'data': data});
		});

		$.public(function kill(data){

			µ.worker.terminate();

			µ.state = OODK.foundation.util.Thread.self.TERMINATED;

			var e = µ.factoryEvent('thread.terminate');

			e.setData(data);

			$.trigger(e);
		});

		$.public(function send(type, data){

			data = $.serialize(data);

			µ.worker.postMessage({'type': type, 'data': data});
		});

		$.protected(function processEvent(evt){

			if(evt.data.type == 'thread.terminate'){

				this.kill(evt.data.data);
				
			}else if(evt.data.type == 'thread.initialize'){

				µ.state = OODK.foundation.util.Thread.self.RUNNABLE;

				var e = µ.factoryEvent(evt);

				e.setType('thread.ready');

				$.trigger(e);

			}else{

				// custom event

				var e = µ.factoryEvent(evt);

			    e.setData($.unserialize(evt.data.data));

				$.trigger(e);
			}
		});

		$.protected(function factoryEvent(evt){

			if($.is(evt, String)){
				var e = $.new(OODK.foundation.util.Event, evt, this);
			}else{
				var e = $.new(OODK.foundation.util.Event, evt.data.type, this);

				e.setSrcEvent(evt);
			}

			e.sync();

			return e;
		});

		$.static(function($, µ, _){

			$.final().public('NEW', 1);

			$.final().public('RUNNABLE', 2);

			$.final().public('TERMINATED', 3);

			$.private('counter', 0);

			$.private('threadList', {});

			$.private(function count(){
				_.counter++;
			});

			/**
			 * get all registered threads
			 */
			$.public(function getAllThreads(){

				var list = [];

				for(var i in _.threadList){
					list.push(_.threadList[i]);
				}

				return list;
			});

			$.public(function getThreadById(threadId){
				return _.threadList[threadId];
			});

			$.public(function getThreadByName(threadName){

				if(!$.is(threadName, String)){
					$.throw(OODK.foundation.IllegalArgumentException, threadName + ' is not a string')
				}

				var thread;

				OODKObject.forEach(_.threadList, function(thr){

					if(thr.getName() == threadName){
						thread = thr;
						return false;
					}
				});

				return thread;
			});

			$.public(function startAll(){

				OODKObject.forEach(_.threadList, function(thr){
					thr.start();
				});
			});

			$.public(function stopAll(){

				OODKObject.forEach(_.threadList, function(thr){
					thr.stop();
				});
			});

			$.public(function killAll(){

				OODKObject.forEach(_.threadList, function(thr){
					thr.kill();
				});
			});

			$.public(function sendAll(type, data){

				OODKObject.forEach(_.threadList, function(thr){
					thr.send(type, data);
				});
			});
		});
	});
});