
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

			_.self.addThread(this);

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
			return ([OODK.foundation.util.Thread.self.RUNNABLE, OODK.foundation.util.Thread.self.WAITING].indexOf(µ.state) !==-1);
		});

		$.public(function start(){
			µ.worker.postMessage({'type': 'thread.initialize', 'id': µ.id, 'name': µ.name});
		});

		$.public(function stop(){

			µ.worker.postMessage({'type': 'thread.terminate'});
		});

		$.public(function kill(){

			µ.worker.terminate();

			µ.state = OODK.foundation.util.Thread.self.TERMINATED;
		});

		$.public(function sleep(millisec){
			µ.state = OODK.foundation.util.Thread.self.WAITING;

			µ.worker.postMessage({'type': 'thread.sleep'});

			if(OODKObject.is(millisec, Number)){

				var timer = setTimeout(function(){
					µ.worker.postMessage({'type': 'thread.awake'});
				}, millisec);

				return timer;
			}
		});

		$.public(function awake(){
			µ.state = OODK.foundation.util.Thread.self.RUNNABLE;

			µ.worker.postMessage({'type': 'thread.awake'});
		});

		$.public(function send(type, data){

			data = $.serialize(data);

			µ.worker.postMessage({'type': type, 'data': data});
		});

		$.protected(function processEvent(evt){

			if(evt.data.type == 'thread.terminate'){

				µ.state = OODK.foundation.util.Thread.self.RUNNABLE;

				var e = µ.factoryEvent(evt);

				$.trigger(e);

				this.kill();
			}else if(evt.data.type == 'thread.initialize'){

				µ.state = OODK.foundation.util.Thread.self.RUNNABLE;

				var e = µ.factoryEvent(evt);

				$.trigger(e);

			}else if(evt.data.type == 'thread.sleep'){

				µ.state = OODK.foundation.util.Thread.self.WAITING;

				var e = µ.factoryEvent(evt);

				$.trigger(e);

			}else if(evt.data.type == 'thread.awake'){

				µ.state = OODK.foundation.util.Thread.self.RUNNABLE;

				var e = µ.factoryEvent(evt);

				$.trigger(e);

			}else if(evt.data.type == 'thread.requestlock'){

				var e = µ.factoryEvent(evt);

			    e.setData({'lockId': lockId});

				$.trigger(e);

				_.self.addLock(evt.data.lockId, this);

			}else if(evt.data.type == 'onunlock'){

				var e = µ.factoryEvent(evt);

			    e.setData({'lockId': lockId});

				$.trigger(e);

				_.self.removeLock(evt.data.lockId, this);

			}else{

				// custom event

				var e = µ.factoryEvent(evt);

			    e.setData($.unserialize(evt.data.data));

				$.trigger(e);
			}
		});

		$.protected(function factoryEvent(evt){

			var e = $.new(OODK.foundation.util.ThreadEvent, evt.data.type, this);

			e.setSrcEvent(evt);

			e.sync();

			e.setThread(this);

			return e;
		});

		$.static(function($, µ, _){

			$.final().public('NEW', 1);

			$.final().public('RUNNABLE', 2);

			$.final().public('TERMINATED', 3);

			$.final().public('WAITING', 4);

			$.private('counter', 0);

			$.private('lockList', {});

			$.private('threadList', {});

			$.private(function count(){
				_.counter++;
			});

			$.private(function addThread(thread){

				if(!$.instanceOf(thread, OODK.foundation.util.Thread)){
					$.throw(OODK.foundation.IllegalArgumentException, thread + ' is not an instance of foundation.util.Thread');
				}

				var key = thread.getId();

				if(!_.threadList.hasOwnProperty(key)){
					_.threadList[key] = thread;
				}
			});

			$.public(function getAllThreads(){
				return _.threadList;
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

			$.private(function lock(lockId, callback){

				if($.envtype() == 'browser'){
					var thread = env;
				}else{
					$.throw(OODK.foundation.IllegalStateException, 'call to OODK.foundation.util.Thread::lock() from invalid context');
				}

				if(_.addLock(lockId, thread)){

					callback.apply(null, []);

					_.removeLock(lockId, thread);
					
				}else{

					_.lockList[lockId].callback = callback;
				}
			});

			$.private(function unlock(lockId){

				if($.envtype() == 'browser'){
					var thread = env;
				}else{
					$.throw(OODK.foundation.IllegalStateException, 'call to OODK.foundation.util.Thread::lock() from invalid context');
				}

				_.removeLock(lockId, thread);
			});

			$.private(function addLock(lockId, thread){

				if(!_.lockList.hasOwnProperty(lockId)){

					_.lockList[lockId] = {'lockee': thread, 'waiting': []};

					if(OODKClass.instanceOf(thread, OODK.foundation.util.Thread)){

						OODKResource.getProperty(thread, 'worker').postMessage({'type': 'onresponselock', 'result': 1, 'lockId': lockId});

						$.unicast('responselock', thread, 1, lockId);
					}

					return true;
					
				}else{

					if(_.lockList[lockId].lockee !== thread){

						if(_.lockList[lockId].waiting.indexOf(thread) === -1){

							_.lockList[lockId].waiting.push(thread);

							if(OODKClass.instanceOf(thread, OODK.foundation.util.Thread)){
							
								OODKResource.getProperty(thread, 'worker').postMessage({'type': 'onresponselock', 'result': 0, 'lockId': lockId});
							
								$.unicast('responselock', thread, 0, lockId);
							}
						}
					}

					return false;
				}
			});

			$.private(function removeLock(lockId, thread){

				if(_.lockList.hasOwnProperty(lockId)){

					if(_.lockList[lockId].lockee === thread){

						// natural unlocking

						if(_.lockList[lockId].waiting.length>0){

							var nextThread = _.lockList[lockId].waiting.shift();

							_.lockList[lockId].lockee = nextThread;

							if(OODKClass.instanceOf(nextThread, OODK.foundation.util.Thread)){
								OODKResource.getProperty(nextThread, 'worker').postMessage({'type': 'onresponselock', 'result': 1, 'lockId': lockId});
							
								$.unicast('responselock', thread, 1, lockId);
							}else{
								_.lockList[lockId].callback.apply(null,[]);

								_.removeLock(lockId, nextThread);
							}
						}else{
							delete _.lockList[lockId];
						}
					}else{

						// force unlocking

						var indexOf = _.lockList[lockId].waiting.indexOf(thread);

						if(indexOf > -1){
							_.lockList[lockId].waiting.splice(indexOf, 1);
						}
					}
				}
			});
		});
	});
});