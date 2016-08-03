	
	
	OODKAPI.factory('Observer', {

		'initialize': function initialize(){

			OODKImporter.import([
				'{oodk}/foundation/interface/Observer',
				'{oodk}/foundation/interface/Observable'
			]);

			var syntaxer = xmlHttp.data.syntaxer;

			OODKObject.forEach(this.keywords.use, function(def, name){

				if(!OODKSyntaxer.use.hasOwnProperty(name)){
					OODKSyntaxer.use[name] = def;
				}

				if(syntaxer && !syntaxer.hasOwnProperty(name)){
					syntaxer[name] = def;
				}
			});

			OODKObject.forEach(this.keywords.declare.member, function(def, name){

				if(!OODKSyntaxer.declare.member.hasOwnProperty(name)){
					OODKSyntaxer.declare.member[name] = def;
				}
			});

			OODKObject.forEach(this.keywords.declare.static, function(def, name){

				if(!OODKSyntaxer.declare.static.hasOwnProperty(name)){
					OODKSyntaxer.declare.static[name] = def;
				}
			});

			OODKObject.forEach(this.keywords.define.member, function(def, name){

				if(!OODKSyntaxer.define.member.hasOwnProperty(name)){
					OODKSyntaxer.define.member[name] = def;
				}
			});

			OODKObject.forEach(this.keywords.define.static, function(def, name){

				if(!OODKSyntaxer.define.static.hasOwnProperty(name)){
					OODKSyntaxer.define.static[name] = def;
				}
			});
		},

		'notify': function notify(observable, message, observer){

			var observers = OODKResource.get(observable, 'observers');

			if(OODKObject.isLiteral(observers)){

				if(OODKInstance.isValid(observer)){
					
					if(observers.hasOwnProperty(observer.__resource)){

						OODKResource.invoke(observer, 'update', [observable, message]);
					}
				}else{

					OODKObject.forEach(observers, function(observer, k, i){
						
						OODKResource.invoke(observer, 'update', [observable, message]);
					});
				}
			}
		},

		'observe': function observe(observer, observable){

			var observers = OODKResource.get(observable, 'observers');

			if(!OODKObject.isLiteral(observers)){
				var observers = {};
				OODKResource.set(observable, 'observers', observers);
			}

			if(!observers.hasOwnProperty(observer.__resource)){
				observers[observer.__resource] = observer;
			}
		},

		'unobserve': function observe(observer, observable){

			var observers = OODKResource.get(observable, 'observers');

			if(OODKObject.isLiteral(observers)){
				delete observers[observer.__resource];
			}
		},

		'keywords': {

			'declare': {

				'member': {

					'observable': function observable(){
		    			this.__observable = true;
		    			return this;
		    		}
				},

				'static': {

					'observable': function observable(){
		    			this.__observable = true;
		    			return this;
		    		}
				}
			},

			'define': {

				'member': {

					'observable': function observable(){
		    			return this;
		    		}
				},

				'static': {

					'observable': function observable(){
		    			return this;
		    		}		
				}
			},

			'use': {

				'notify': function notify(){
					return OODKAPI.get('Observer').notify.apply(OODKAPI.get('Observer'), arguments);
				},

				'observe': function observe(){
					return OODKAPI.get('Observer').observe.apply(OODKAPI.get('Observer'), arguments);
				},

				'unobserve': function unobserve(){
					return OODKAPI.get('Observer').unobserve.apply(OODKAPI.get('Observer'), arguments);
				}
			}
		}
	});