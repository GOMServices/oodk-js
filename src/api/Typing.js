	
	
	OODKAPI.factory('Typing', {

		'initialize': function initialize(){

			var syntaxer = xmlHttp.data.syntaxer;

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

			OODKAOP.advisor.factory('afterReturn', '*', undefined, function(target){

				var member = target.getContextValue('member');

				if(member.isTyped()){

					var r = target.getReturnValue();

					var type = member.getReturnType();

					if(!OODKObject.is(r, type)){
						OODKSystem.throw(OODK.foundation.TypeError, 'Return type of '+member.getClass()+ '.' + member.getName() + ' is invalid: '+ OODKLang.valToString(r) + ' is not of type '+OODKLang.typeToString(type));
					}
				}
			});

			OODKAOP.advisor.factory('before', '*', undefined, function(target){

				var member = target.getContextValue('member');

				var argsType = member.getArgumentsType();

				if(typeof argsType !== 'undefined'){

					var args = target.getSourceArguments();

					//console.log(args, argsType);

					if(argsType.length !== args.length){
						OODKSystem.throw(OODK.foundation.TypeError, 'Wrong number of arguments for '+member.getClass()+ '.' + member.getName());
					}

					OODKObject.forEach(args, function(v, k, i){

						if(!OODKObject.is(v, argsType[i])){
							OODKSystem.throw(OODK.foundation.TypeError, 'Invalid argument type for '+member.getClass()+ '.' + member.getName() + ': '+ OODKLang.valToString(v) + ' is not of type '+OODKLang.typeToString(argsType[i]));
						}
					});
					
				}
			});
		},

		'keywords': {

			'declare': {

				'member': {

					'int': function returnInt(){
		    			this.__returnType = OODK.int;
		    			return this;
		    		},

		    		'string': function returnString(){
		    			this.__returnType = String;
		    			return this;
		    		},
		    		'float': function returnFloat(){
		    			this.__returnType = OODK.float;
		    			return this;
		    		},
		    		'number': function returnNumber(){
		    			this.__returnType = Number;
		    			return this;
		    		},
		    		'bool': function returnBool(){
		    			this.__returnType = Boolean;
		    			return this;
		    		},
		    		'array': function returnArray(){
		    			this.__returnType = Array;
		    			return this;
		    		},
		    		'literal': function returnLiteral(){
		    			this.__returnType = OODK.literal;
		    			return this;
		    		},
		    		'void': function returnVoid(){
		    			this.__returnType = OODK.void;
		    			return this;
		    		},
		    		'type': function returnType(type){
		    			this.__returnType = type;
		    			return this;
		    		},
		    		'args': function args(){
		    			this.__args = OODKObject.toArray(arguments);
		    			return this;
		    		}
				},

				'static': {

					'int': function returnInt(){
		    			this.__returnType = OODK.int;
		    			return this;
		    		},

		    		'string': function returnString(){
		    			this.__returnType = String;
		    			return this;
		    		},
		    		'float': function returnFloat(){
		    			this.__returnType = OODK.float;
		    			return this;
		    		},
		    		'number': function returnNumber(){
		    			this.__returnType = Number;
		    			return this;
		    		},
		    		'bool': function returnBool(){
		    			this.__returnType = Boolean;
		    			return this;
		    		},
		    		'array': function returnArray(){
		    			this.__returnType = Array;
		    			return this;
		    		},
		    		'literal': function returnLiteral(){
		    			this.__returnType = OODK.literal;
		    			return this;
		    		},
		    		'void': function returnVoid(){
		    			this.__returnType = OODK.void;
		    			return this;
		    		},
		    		'type': function returnType(type){
		    			this.__returnType = type;
		    			return this;
		    		},
		    		'args': function args(){
		    			this.__args = OODKObject.toArray(arguments);
		    			return this;
		    		}
				}
			},

			'define': {

				'member': {

					'int': function returnInt(){
		    			return this;
		    		},

		    		'string': function returnString(){
		    			return this;
		    		},
		    		'array': function returnArray(){
		    			return this;
		    		},
		    		'literal': function returnLiteral(){
		    			return this;
		    		},
		    		'float': function returnFloat(){
		    			return this;
		    		},
		    		'number': function returnNumber(){
		    			return this;
		    		},
		    		'void': function returnVoid(){
		    			return this;
		    		},
		    		'bool': function returnBool(){
		    			return this;
		    		},
		    		'type': function returnType(){
		    			return this;
		    		},
		    		'args': function args(){
		    			return this;
		    		}
				},

				'static': {

					'int': function returnInt(){
		    			return this;
		    		},

		    		'string': function returnString(){
		    			return this;
		    		},
		    		'array': function returnArray(){
		    			return this;
		    		},
		    		'literal': function returnLiteral(){
		    			return this;
		    		},
		    		'float': function returnFloat(){
		    			return this;
		    		},
		    		'number': function returnNumber(){
		    			return this;
		    		},
		    		'void': function returnVoid(){
		    			return this;
		    		},
		    		'bool': function returnBool(){
		    			return this;
		    		},
		    		'type': function returnType(){
		    			return this;
		    		},
		    		'args': function args(){
		    			return this;
		    		}		
				}
			}
		}
	});