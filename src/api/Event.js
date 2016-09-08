	
	
	OODKAPI.factory('Event', {

		'callbackList': {},

		'initialize': function initialize(){

			OODKImporter.import([
				'{oodk}/foundation/utility/Event',
				'{oodk}/foundation/utility/EventListenerRequest',
				'{oodk}/foundation/interface/EventListener',
				'{oodk}/foundation/interface/EventUnicaster',
				'{oodk}/foundation/interface/EventBroadcaster'
			]);

			var syntaxer = xmlHttp.data.syntaxer;

			OODKObject.forEach(this.keywords, function(def, name){

				if(!OODKSyntaxer.use.hasOwnProperty(name)){
					OODKSyntaxer.use[name] = def;
				}

				if(syntaxer && !syntaxer.hasOwnProperty(name)){
					syntaxer[name] = def;
				}
			});


		},

		'isRegExp': function isRegExp(str){
			return OODKString.startsWith(str, '/');
		},

		'trigger': function trigger(target, type, data){

			var evt;

			if(OODKObject.is(target, String)){
				data = type;
				type = target;
				target = undefined;
			}

			if(OODKObject.is(type, String)){

				evt = OODKClass.instantiate(OODK.foundation.util.Event, type, target);

				evt.setData(data);

			}else if(OODKObject.instanceOf(target, OODK.foundation.util.Event)){
				evt = target;
			}else{
				OODKSystem.throw(OODK.foundation.IllegalArgumentException, OODKLang.valToString(type) + ' is not a valid event');
			}

			if(OODKObject.isset(target)){

				if(Array.isArray(target)){
					OODKResource.invoke(target[0], '__dispatchEvent', [evt]);
				}else{
					OODKResource.invoke(target, '__dispatchEvent', [evt]);
				}
			}

			if(evt.isConsumed()){
				OODKSystem.throw(OODK.foundation.IllegalStateException, 'Cannot dispatch event ' + evt.__resource+ ' - event is already consumed');
			}

			if(evt.isAsync()){

				var timer = (Math.random() * 100);

				var self = this;

				setTimeout(function(){

		          	self.consumeEvent(evt);

		        }, timer);
			}else{
				this.consumeEvent(evt);
			}
		},

		'consumeEvent': function consumeEvent(evt){

			evt.consume();

	       	type = evt.getType();

			if(this.callbackList.hasOwnProperty(type)){

				this.dispatchEvent(evt, this.callbackList[type]);

			}else{

				for(var _type in this.callbackList){

					if(this.isRegExp(_type)){

						var regExp = new RegExp(OODKString.middle(_type, '/', '/'), OODKString.rightBack(_type, '/'));

						if(regExp.test(type)){
							this.dispatchEvent(evt, this.callbackList[_type]);
						}
					}
				}
			}

			var target = evt.getTarget();

			if(OODKObject.isset(target) && !evt.isDefaultPrevented()){
				OODKResource.invoke(target, '__eventConsumed', [evt]);
			}
		},

		'dispatchEvent': function dispatchEvent(evt, listeners){

			var type = evt.getType();

			var targets = OODKResource.getProperty(evt, 'targets');

			if(targets.length == 0){

				OODKObject.forEach(listeners, function(pair){

					if(evt.getPropagationState() == -1){
						return false;
					}

					if(typeof pair.target == "undefined"){
						OODKResource.invoke(pair.listener, '__processEvent', [evt]);
					}
				});
          	}else{

          		var self = this;

          		if(evt.getPropagationMode() == OODK.foundation.util.Event.self.CAPTURE){
          			targets.reverse();
          		}

      			var caster = 'broadcast';

      			OODKObject.forEach(targets, function(target, key, index){

          			if(index>0 && evt.getPropagationState() == 0){
						return false;
					}else if(evt.getPropagationState() == -1){
						return false;
					}

					if(OODKClass.instanceOf(target, OODK.foundation.EventUnicaster)){
						caster = 'unicast';
					}

					OODKResource.setProperty(evt, 'currentTarget', target);

					OODKObject.forEach(listeners, function(pair){

						if(evt.getPropagationState() == -1){
							return false;
						}

						if(pair.target == target || (caster == 'broadcast' && typeof pair.target === 'undefined')){
							OODKResource.invoke(pair.listener, '__processEvent', [evt]);
						}
					});

					if(evt.isPropagable() == false){
						return false;
					}
				});

				if(evt.getPropagationMode() == OODK.foundation.util.Event.self.CAPTURE){
          			targets.reverse();
          		}
          		
          	}
		},

		'on': function on(target, type, listener){

			if(OODKObject.is(target, String)){
				listener = type;
				type = target;
				target = undefined;
			}

			var caster = 'broadcast';

			if(OODKObject.isset(target)){

				if(OODKClass.instanceOf(target, OODK.foundation.EventUnicaster)){
					caster = 'unicast'; 
				}else if(!OODKClass.instanceOf(target, OODK.foundation.EventBroadcaster)){
					OODKSystem.throw(OODK.foundation.IllegalArgumentException, OODKLang.valToString(target) + ' is not a valid publisher'); 
				}
			}

			if(!OODKClass.instanceOf(listener, OODK.foundation.EventListener)){
				OODKSystem.throw(OODK.foundation.IllegalArgumentException, OODKLang.valToString(listener) + ' does not implements ' + OODKLang.typeToString(OODK.foundation.EventListener));
			}

			if(!this.callbackList.hasOwnProperty(type)){
				this.callbackList[type] = [];
			}

			if(caster === 'unicast'){

				var error = false;

				var self = this;

				// test that only one listener is possible for this target, all events confounded
				OODKObject.forEach(this.callbackList, function(listeners, _type){

					OODKObject.forEach(listeners, function(pair){
					
						if(pair.listener !== listener && pair.target == target){
							error = true;
							return false;
						}
					});

					if(error == true){
						return false;
					}
				});

				if(error == true){
					return false;
				}
			}

			var found = false;

			OODKObject.forEach(this.callbackList[type], function(pair){
				
				if(pair.listener == listener && pair.target == target){
					found = true;
					return false;
				}
			});

			if(!found){

				var authorized;

				if(OODKObject.isset(target)){

					var request = OODKClass.instantiate(OODK.foundation.util.EventListenerRequest, type, listener);

					OODKResource.invoke(target, '__approveListener', [request]);

					authorized = request.isApproved();

					OODKInstance.destroy(request);
				}

				if(authorized !== false){
					this.callbackList[type].push({'listener': listener, 'target': target});

					return true;
				}
			}

			return false;
		},

		'off': function off(target, type, listener){

			var t;

			if(OODKObject.is(target, String)){

				t = 'event';
				type = target;
			}else if(OODKClass.instanceOf(target, OODK.foundation.EventListener)){

				if(arguments.length == 1){
					t = 'listener';
					listener = target;
				}else if(OODKObject.is(type, String) && arguments.length == 2){
					t = 'listener_event';
					listener = target;
				}
			}else if(OODKClass.instanceOf(target, OODK.foundation.EventBroadcaster) || OODKClass.instanceOf(target, OODK.foundation.EventUnicaster)){

				if(arguments.length == 1){
					t = 'target';
				}else if(OODKObject.is(type, String) && arguments.length == 2){
					t = 'target_event';
				}else if(OODKClass.instanceOf(type, OODK.foundation.EventListener) && arguments.length == 2){
					t = 'target_listener';
				}else if(OODKObject.is(type, String) && OODKClass.instanceOf(listener, OODK.foundation.EventListener) && arguments.length == 3){
					t = 'target_event_listener';
				}
			}

			if(t === 'event'){
				delete this.callbackList[type];
			}else if(t === 'listener'){

				//remove the listener for all events

				OODKObject.forEach(this.callbackList, function(list, _type){

					var index;

					OODKObject.forEach(list, function(pair, k, i){

						if(pair.listener == listener){
							index = i;
							return false;
						}
					});

					if(index){
						list.splice(index, 1);
					}
				});
				
			}else if(t === 'listener_event'){

				// remove the lsitener for the specified event

				if(this.callbackList.hasOwnProperty(type)){

					var index;

					OODKObject.forEach(this.callbackList[type], function(pair, k, i){

						if(pair.listener == listener){
							index = i;
							return false;
						}
					});

					if(index){
						list.splice(index, 1);
					}
				}
				
			}else if(t === 'target'){

				//remove the target for all events

				OODKObject.forEach(this.callbackList, function(list, _type){

					var index;

					OODKObject.forEach(list, function(pair, k, i){

						if(pair.target == target){
							index = i;
							return false;
						}
					});

					if(index){
						list.splice(index, 1);
					}
				});
				
			}else if(t === 'target_event'){

				// remove the lsitener for the specified event

				if(this.callbackList.hasOwnProperty(type)){

					var index;

					OODKObject.forEach(this.callbackList[type], function(pair, k, i){

						if(pair.target == target){
							index = i;
							return false;
						}
					});

					if(index){
						list.splice(index, 1);
					}
				}
				
			}else if(t === 'target_event_listener'){

				// remove the listener for the specified event and target

				if(this.callbackList.hasOwnProperty(type)){

					var index;

					OODKObject.forEach(this.callbackList[type], function(pair, k, i){

						if(pair.target == target && pair.listener == listener){
							index = i;
							return false;
						}
					});

					if(index){
						list.splice(index, 1);
					}
				}
				
			}else if(t === 'target_listener'){

				//remove the listener for all events of the specified target

				OODKObject.forEach(this.callbackList, function(list, _type){

					var index;

					OODKObject.forEach(list, function(pair, k, i){

						if(pair.listener == listener && pair.target == target){
							index = i;
							return false;
						}
					});

					if(index){
						list.splice(index, 1);
					}
				});
				
			}
		},

		'keywords': {

			'trigger': function trigger(){
				return OODKAPI.get('Event').trigger.apply(OODKAPI.get('Event'), arguments);
			},

			'on': function on(){
				return OODKAPI.get('Event').on.apply(OODKAPI.get('Event'), arguments);
			},

			'off': function off(){
				return OODKAPI.get('Event').off.apply(OODKAPI.get('Event'), arguments);
			}
		}
	});