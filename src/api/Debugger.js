	
	
	OODKAPI.factory('Debugger', {

		'initialize': function initialize(){

			this.debugging = false;

			OODKImporter.import('{oodk}/foundation/utility/Dumper');

			var syntaxer = xmlHttp.data.syntaxer;

			OODKObject.forEach(this.keywords, function(def, name){

				if(!OODKSyntaxer.use.hasOwnProperty(name)){
					OODKSyntaxer.use[name] = def;
				}

				if(!syntaxer.hasOwnProperty(name)){
					syntaxer[name] = def;
				}
			});

			OODKAOP.advisor.factory('before', '*', '*', function(target){

				//if(!OODKString.startsWith(target.getMethodName(), '__')){
							
					if(OODKAPI.get('Debugger').isDebugging()){
						OODKAPI.get('Debugger').debug(target.getContextValue('trace'));
					}
				//}
			});

			OODKAOP.advisor.factory('after', function(target){

				if(OODKClass.instanceOf(target.getContext(), OODK.foundation.Throwable)){
				
					return false;
				}else{
					return true;
				}
			}, undefined, function(target){

				OODKAPI.get('Debugger').watcher.execute(target);
			});
		},

		'watcher': {

			'list': [],

			'factory': function add(obj, callback){

				var watcher = {
					'obj': obj,
					'callback': callback
				}

				this.list.push(watcher);

				return watcher;
			},

			'execute': function execute(target){

				OODKObject.forEach(this.list, function(watcher, i){

					watcher.callback.apply(null, [watcher.obj, target.getContextValue('trace')]);
				});
			}
		},

		/**
		 * Start the debugger
		 */
		'start': function start(){

			this.debugging = true;
		},

		/**
		 * Stop the debugger
		 */
		'stop': function stop(){

			this.debugging = false;
		},

		/**
		 * Test if debbugger is enabled
		 */
		'isDebugging': function isDebugging(){
			return(this.debugging === true);
		},

		/**
		 * Debug
		 */
		'debug': function debug(trace){

			if(typeof trace === 'object'){

				OODKConsole.info(trace.msg + ' (' + trace.file + ':' + trace.line + ')');
			}
		},

		/**
		 * Dump a value
		 */
		'dump': function dump(obj, ccc){

			var root, dump;

			if(typeof ccc === 'undefined'){
	        	ccc = [];
	        	root = true;
	      	}else{
	        	root = false;
	      	}

	      	for(var i in ccc){
	        	if(ccc[i].src === obj){
	          		return ccc[i].dump;
	        	}
	      	}

			if(typeof obj !== 'object'){
				/*dump = {
					'__type': (typeof obj),
					'value': obj
				}*/
				dump = obj;
			}else{

				var klass = OODKInstance.getClass(obj);

				/*if(OODKClass.isValid(klass) && !OODKClass.instanceOf(obj, OODK.foundation.Serializable)){
					OODKSystem.throw(OODK.foundation.SerializeNotSupportedException, ['Class '+klass.prototype.toString()+' does not implements the interface ' + OODK.foundation.Serializable.prototype.toString()]);
				}*/

		      	var constructor = OODKInstance.getClass(obj);

		      	if(OODKClass.isValid(constructor)){
		      		
		      		native = false;
		      	}else{
		      		native = true;
		      	}

		      	if(native){

		      		if(obj.constructor.name === 'Array'){
		      			dump = [];
		      		}else if(obj.constructor.name === 'Object'){
		      			dump = {};
		      		}else{
		      			dump = obj.constructor();
		      		}

		      		ccc.push({'src': obj, 'dump': dump});

		      		//dump.__type = obj.constructor.name;

			      	for(var i in obj){

			      		dump[i] = obj[i];
			      	}

			      	if(typeof obj.__dump === 'function'){

			      		var dumper = OODKClass.instantiate(OODK.foundation.util.Dumper, obj, ccc);

			      		obj.__dump.apply(obj, [dumper]);
			      	}
			    }else{

			    	var dumper = OODKClass.instantiate(OODK.foundation.util.Dumper, obj, ccc);

			    	OODKResource.invoke(obj, '__dump', [dumper]);

			    	dump = dumper.get();
			    }
			}
	      
	      	return dump;
		},

		'keywords': {

			'trace': function trace(msg){
				OODKAPI.get('Debugger').start();

				OODKAPI.get('Debugger').debug(OODKStack.getTrace('trace start'+ (typeof msg == 'string'? ': '+msg: ""), this.scope(), 4));
			},

			'snooze': function snooze(){
				OODKAPI.get('Debugger').stop();

				OODKAPI.get('Debugger').debug(OODKStack.getTrace('trace stop', this.scope(), 4));
			},

			'watch': function watch(){
				OODKAPI.get('Debugger').watcher.factory.apply(OODKAPI.get('Debugger').watcher, arguments);
			},

			'dump': function dump(obj, msg, ccc){

				var Debugger = OODKAPI.get('Debugger');
				
				var dump = Debugger.dump.apply(Debugger, [obj, ccc]);

				if(typeof msg === 'string'){
					msg = 'dump: '+ msg;
				}else{
					msg = 'dump';
				}

      			OODKAPI.get('Debugger').debug(OODKStack.getTrace(msg, this.scope(), 4));

        		OODKConsole.log(dump);
			}
		}
	});