
	OODKAOP = {

		'blackList': ['__local'],

		'define': function define(type, def, context, name, extra){

			if(this.blackList.indexOf(name) !== -1){
				return def;
			}
			
			return function(){

				var returnValue, err;

				var isExecuted = false;

				var srcArgs = arguments;

				var args = OODKObject.toArray(arguments);

				extra = (typeof extra === 'undefined')? {}: extra;

				var target = {
					'getType': function getType(){
						return type;
					},
					'getContext': function getContext(){
						return context;
					},
					'getMethodName': function getMethodName(){
						return name;
					},
					'getMethod': function getMethod(){
						return def;
					},
					'getError': function getError(){
						return err;
					},
					'setArguments': function setArguments(a){
						args = a;
					},
					'getArguments': function getArguments(){
						return args;
					},
					'getSourceArguments': function getSourceArguments(){
						return srcArgs;
					},
					'setReturnValue': function setReturnValue(v){
						returnValue = v;
					},
					'getReturnValue': function getReturnValue(){
						return returnValue;
					},
					'execute': function execute(){
						
						if(isExecuted === false){

							returnValue = def.apply(context, args);
							isExecuted = true;
						}
					},
					'setContextValue': function setContextValue(key, value){
						extra[key] = value;
					},
					'getContextValue': function getContextValue(key){
						return extra[key];
					}
				};

				OODKAOP.advisor.executeBefore(target);

				try{
					target.execute();

					OODKAOP.advisor.executeAfterReturn(target);
				} catch(e){

					err = e;

					OODKAOP.advisor.executeAfterCatch(target);
				}

				OODKAOP.advisor.executeAfter(target);

				return target.getReturnValue();
			}
		},

		'advisor': {

			'list': {},

			'execute': function execute(list, target){
				
				OODKObject.forEach(list, function(advisor, k){

					if(OODKAOP.advisor.match(advisor, target)){

						advisor.callback.apply(advisor, [target]);
					}
				});
			},

			'executeBefore': function executeBefore(target){
				
				this.execute(OODKAOP.advisor.list.before, target);
			},

			'executeAfter': function executeAfter(target){
				
				this.execute(OODKAOP.advisor.list.after, target);
			},

			'executeAfterCatch': function executeAfterCatch(target){
				
				this.execute(OODKAOP.advisor.list.afterCatch, target);
			},

			'executeAfterReturn': function executeAfterReturn(target){
				
				this.execute(OODKAOP.advisor.list.afterReturn, target);
			},

			'match': function match(advisor, target){

				var r = false;

				var selector;

				if(target.getType() === 'method' && typeof advisor.selectorMethod !== 'undefined'){
					selector =  advisor.selectorMethod;
				}else if(target.getType() === 'keyword' && typeof advisor.selectorKeyword !== 'undefined'){
					selector =  advisor.selectorKeyword;
				}

				if(typeof selector === 'undefined'){
					return false;
				}else if(typeof selector === 'string'){
					if(selector === '*'){
						return true;
					}else if(selector.indexOf('|') !== -1){
						return (selector.split('|').indexOf(target.getMethodName()) !== -1);
					}else if(selector === target.getMethodName()){
						return true;
					}
				}else if(typeof selector === 'function'){

					var r = selector.apply(null, [target]);

					return ((typeof r === 'boolean')? r: false);
				}

				return r;
			},

			'factory': function factory(type, selectorMethod, selectorKeyword, callback){

				var advisor = {
					'type': type,
					'selectorKeyword': selectorKeyword,
					'selectorMethod': selectorMethod,
					'callback': callback
				};

				if(!this.list.hasOwnProperty(type)){
					this.list[type] = [];
				}

				this.list[type].push(advisor);
			}
		}
		
	}