	
	
	OODKAPI.factory('Event', {

		'callbackList': {},

		'initialize': function initialize(){

			OODKImporter.import([
				'{oodk}/foundation/utility/Event',
				'{oodk}/foundation/interface/EventListener'
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

		'trigger': function trigger(type, data){

			var evt;

			if(OODKObject.is(type, String)){
				evt = OODKClass.instantiate(OODK.foundation.util.Event, type);
			}else if(OODKObject.instanceOf(type, OODK.foundation.util.Event)){
				evt = type;
			}else{
				OODKSystem.throw(OODK.foundation.IllegalArgumentException, OODKLang.valTostring(type) + ' is not a valid event');
			}

			type = evt.getType();

			if(this.callbackList.hasOwnProperty(type)){

				evt.setData(data);

				OODKObject.forEach(this.callbackList[type], function(obj){

					if(!evt.isPropagable()){
						return false;
					}

					evt.setTarget(obj);

					OODKResource.invoke(obj, '__on', [evt]);
				});
			}
		},

		'on': function on(obj, type){

			if(!OODKClass.instanceOf(obj, OODK.foundation.EventListener)){
				OODKSystem.throw(OODK.foundation.IllegalArgumentException, OODKLang.valToString(obj) + ' does not implements ' + OODKLang.typeToString(OODK.foundation.EventListener));
			}

			if(!this.callbackList.hasOwnProperty(type)){
				this.callbackList[type] = [];
			}

			if(this.callbackList[type].indexOf(obj) == -1){
				this.callbackList[type].push(obj);

				return true;
			}

			return false;
		},

		'off': function off(obj, type){

			var t;

			if(OODKObject.is(obj, String)){

				t = 'event';
				type = obj;
			}else if(OODKInstance.isValid(obj)){

				if(arguments.length == 1){
					t = 'instance';
				}else{
					t = 'instance_event';
				}
			}

			if(t === 'event'){
				delete this.callbackList[type];
			}else if(t === 'instance'){

				OODKObject.forEach(this.callbackList, function(list ,type){

					var index = list.indexOf(obj);

					if(index > -1){
						list.splice(index, 1);
					}
				});
				
			}else if(t === 'instance_event'){

				if(this.callbackList.hasOwnProperty(type)){

					var index = this.callbackList[type].indexOf(obj);

					if(index > -1){
						this.callbackList[type].splice(index, 1);
					}
				}
				
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