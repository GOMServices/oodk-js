	/**
	 * OODKClass handle class manipulation.
	 */
	OODKClass = {

		/**
		 * Test if the given argument is a valid OODK class.
		 * @method 
		 */
		'isValid': function isValid(fn){

			var struct = OODKResource.inspect(fn);

			return (typeof struct === 'object' && 
				struct.type === 'class'
			);
		},

		'isImmutable': function isImmutable(obj){

			var r = false;

			if(OODKInstance.isValid(obj)){

				var klass = OODKResource.get(obj, 'constructor');
				
				if(OODKClass.isValid(klass)){
					
					var struct = OODKResource.inspect(klass);

					r = (struct.mutable === false && struct.dynamic === false);
				}
			}

			return r;
		},

		/**
		 * Instantiate an OODK Class or native JS class.
		 * @method
		 * @param String|Function fqn The full qualified name of the Class or the Class itself.
		 * @param Array|Arguments args An array of arguments or an arguments object. 
		 */
		'instantiate': function instantiate(fqn){

			var args = [];

			var master, serial;

			for(var i=1; i<arguments.length; i++){

				if(OODKObject.isObject(arguments[i]) && arguments[i].__clone === true){
					master = arguments[i];
				}else if(OODKObject.isObject(arguments[i]) && arguments[i].__serial === true){
					serial = arguments[i];
				}else{
					args.push(arguments[i]);
				}
			}

			var klass;

			if(typeof fqn === 'string'){

				klass = OODKNamespace.getDeclaredClasses(OODK, fqn);
			}else if(typeof fqn === 'function'){
				klass = fqn;
			}

			if(typeof klass !== 'function'){
				OODKSystem.throw(OODK.foundation.InstantiationException, ((typeof fqn === 'string')?'"'+fqn+'"': fqn)+' is not a constructor');
			}

			var instance;

			if(!OODKClass.isValid(klass) && !OODKInterface.isValid(klass)){

				var q = [];

				if(typeof args === 'object'){

					for(var i=0; i<args.length; i++){
						q.push("args["+ i + "]");
					}
				}
				
				instance = eval('new klass('+ q.join(',') + ")");

			}else {

				var structure = OODKResource.inspect(klass);

				if(structure.native === true){

					var q = [];

					if(typeof args === 'object'){

						for(var i=0; i<args.length; i++){
							q.push("args["+ i + "]");
						}
					}

					instance = eval('new klass('+ q.join(',') + ")");

				}else if(structure.type === 'class'){

					var namespace = structure.namespace;

					instance = klass.self.__instantiate(klass, structure, args, master, serial, undefined, undefined, undefined, namespace);

				}else {
					OODKSystem.throw(OODK.foundation.InstantiationException, 'Cannot instantiate interface '+klass.toString());
				}
			}

			return instance;
		},

		'apply': function apply(fqn, args){

			if(typeof args === 'object' && !Array.isArray(args)){
				args = OODKObject.toArray(args);
			}

			if(!Array.isArray(args)){
				OODKSystem.throw('invoke(): arguments args is not an array');
			}

			var cln = OODKObject.toArray(args);
			
			cln.unshift(fqn);

			return OODKClass.instantiate.apply(OODKClass.instantiate, cln);
		},

		/**
		 * Test if the given object is an instance of the given class or interface.
		 * @access private
		 */
		'instanceOf': function instanceOf(obj, Class){

			var objClass;

			if(OODKInstance.isValid(obj)){
				objClass = OODKInstance.getClass(obj);
			}else{
				objClass = obj;
			}

			if(!OODKClass.isValid(objClass) && typeof obj === 'object' && typeof obj.constructor === 'function' && typeof Class === 'function' ){
				return (obj instanceof Class);
			}else{
				if(!OODKClass.isValid(objClass) && !OODKInterface.isValid(objClass)){
					return false;
				}else if(typeof Class !== 'function'){
					OODKSystem.throw(OODK.foundation.IllegalArgumentException, "Expecting a function in instanceof check, but got "+Class);
				}
			}

			var structure = OODKResource.inspect(objClass);

			var structureTest = OODKResource.inspect(Class);

			if(structure.type === 'class'){

				if(structureTest.type === 'class'){

					if(objClass === Class){
						return true;
					}

					do{
						objClass = OODKInstance.getSuperClass(objClass);

						if(objClass && objClass === Class){
							return true;
						}
					}while(objClass);

				}else if(structureTest.type === 'interface'){

					for(var i in structure.implements){

						var itf = structure.implements[i];

						if(itf === Class){
							return true;
						}
					}

					//not found check parents interfaces
					for(var i in structure.implements){

						var itf = structure.implements[i];

						if(OODKClass.instanceOf(itf, Class)){
							return true;
						}
					}
				}
			}else if(structure.type === 'interface'){

				for(var i in structure.extends){

					var itf = structure.extends[i];

					if(itf === Class){
						return true;
					}
				}

				//not found check parents interfaces
				for(var i in structure.extends){

					var itf = structure.extends[i];

					if(OODKClass.instanceOf(itf, Class)){
						return true;
					}
				}
			}

			return false;
		},

		'abstract': function abstract(){

			OODKKeywords.abstract = true;

			return this;
		},

		'dynamic': function dynamic(){

			OODKKeywords.dynamic = true;

			return this;
		},

		'mutable': function mutable(){

			OODKKeywords.mutable = true;

			return this;
		},

		'final': function final(){

			OODKKeywords.final = true;

			return this;
		},

		'proxy': function proxy(Klass){

			OODKKeywords.proxy = Klass;

			return this;
		},

		/**
		 * Wrap a standard js funtion to be declared as a OODK Class.
		 *
		 * @access private
		 * @param Function klass The function to convert to a class.
		 */
		'wrap': function wrap(klass, outerConstructor){

			if(typeof klass !== 'function'){
				OODKSystem.throw(OODK.foundation.SyntaxError, 'Cannot declare ' + klass + ' as a class');
			}

			var name = OODKString.getFuncName(klass);

			if(reservedKeywords.class.indexOf(name)>-1){
				OODKSystem.throw(OODK.foundation.SyntaxError, name +' is a reserved keyword and should not be used to assign a class');
			}

			//full qualified name of the class: namespace concant with class name 
			var fqn;

			if(!OODKNamespace.isValid(this.scope())){
				fqn = name;
			}else{
				fqn = OODKString.getFuncName(klass, this.scope());
			}

			//model to store class structure data
			var struct = {
				'name': fqn,
				'native': false,
				'type': "class",
				'file': OODKImporter.__file,
				'import': OODKImporter.__import,
				'declaredMembers': [],
			};

			if(OODKKeywords.extend){

				//in case of a class only one parent allowed
				OODKKeywords.extend = [OODKKeywords.extend[0]];

				var parentClass = OODKKeywords.extend[0];
				
				if(!OODKClass.isValid(parentClass) && (typeof parentClass !== 'function'  || OODKInterface.isValid(parentClass))){
					OODKSystem.throw(OODK.foundation.SyntaxError, 'Class '+fqn+' cannot extend from '+(OODKInterface.isValid(parentClass)? parentClass.toString(): parentClass));
				}

				var parentClassStructure = OODKResource.inspect(parentClass);

				if((typeof parentClassStructure !== 'object' && typeof parentClass === 'function') || parentClassStructure.native === true){
					struct.native = true;

					var _klass = klass;

					var $ = OODKSyntaxer.factory(undefined, this.scope());

					eval('klass = function '+(name === 'anonymous'? '': name)+'(){ $.__define(this, arguments, (OODKResource.inspect(this.constructor)).define); }');

					klass.prototype = Object.create(parentClass.prototype);

      				klass.prototype.constructor = klass;

      				struct.define = _klass;
	    		
				}

				struct.extends = OODKKeywords.extend;

			}else{
				struct.extends = [];
			}

			Object.defineProperty(klass, '__resource', {
				writable: false,
				configurable: false,
				value: OODKResource.id()
			});

	    	//the public static context of the class
	    	klass.self = {};

	    	//the public local static context of the class
	    	klass.local = {};

	    	klass.toString = function toString(){
	    		var structure = OODKResource.inspect(this);

	    		if(typeof structure === 'object'){
	    			return structure.name;
	    		}
	    	}

	    	if(OODKKeywords.implement){

	    		var itfList = OODKObject.toArray(OODKKeywords.implement);

	    		OODKObject.forEach(itfList, function(itf){
	    			if(!OODKInterface.isValid(itf)){
	    				OODKSystem.throw(OODK.foundation.SyntaxError, fqn + ' cannot implements ' + itf + ' - it is not a valid interface');
	    			}
	    		});

	    		struct.implements = itfList;
	    	}else{
	    		struct.implements = [];
	    	}

	    	struct.abstract = OODKKeywords.abstract;

	    	struct.final = OODKKeywords.final;

	    	struct.dynamic = OODKKeywords.dynamic;

	    	struct.mutable = OODKKeywords.mutable;

	    	struct.proxy = OODKKeywords.proxy;

	    	if(OODKKeywords.proxy !== false){

		    	if(!OODKClass.isValid(OODKKeywords.proxy) && !OODKInstance.isValid(OODKKeywords.proxy)){
					OODKSystem.throw(OODK.foundation.SyntaxError, 'Cannot declare class '+fqn + ' as proxy of class ' + OODKKeywords.proxy + ' - it is not a valid class or instance');
				}

				if(OODKClass.isValid(OODKKeywords.proxy)){
					struct.proxy = [OODKKeywords.proxy];
				}else{
					struct.proxy = [ OODKResource.get(OODKKeywords.proxy, 'constructor'), OODKKeywords.proxy];
				}
			}

	    	struct.namespace = this.scope();

	    	//store the constructor structure model
	    	OODKResource.set(klass, {
	    		'structure': struct,
	    		'magicMarker': false
	    	});

	    	if(struct.native === false){
	    		if(struct.extends.length === 1){
	    			struct.extends[0].self.__declare(klass, struct, this.scope());
	    		}else{
	    			OODKClass.declare.start(klass.self, OODKContext.factory(), klass, struct, undefined, this.scope());
	    		}
	    	}else{

	    		klass.apply(klass.prototype, []);
	    	}

	    	if(reservedKeywords.member.length === 0){

	    		reservedKeywords.member = ['self', 'outer', 'local', 'ns'];

	    		Object.keys(klass.prototype).forEach(function(v, i){
	    			reservedKeywords.member.push(v);
	    		});
	    	}

	    	if(OODKNamespace.isValid(this.scope())){

		    	if(OODKKeywords.access === 'public'){

		    		struct.access = 'public';

		    		OODKNamespace.register(this.scope(), name, klass, false);
		    	}else{
		    		struct.access = 'private';
		    		
		    		OODKNamespace.register(this.scope(), name, klass, true);
		    	}
		    }else{
		    	struct.access = 'local';
		    }

	    	OODKKeywords.reset();

			return klass;
		},

		'declare': {

			/**
			 * start declarating a class: validate properties and method, instantiate the static scope
			 */
			'start': function start(instance, protectedContext, constructor, structure, define, namespace){

				// model to store all private static members
				var privateContext = OODKContext.factory();

				OODKResource.set(constructor, 'protectedContext', protectedContext);

				OODKResource.set(constructor, 'privateContext', privateContext);

				var $ = OODKClass.declare.syntaxerFactory(instance, protectedContext, privateContext, constructor, structure, namespace);

				var staticSyntaxer;

				$.static(function($){
					staticSyntaxer = $;
				});

				OODKClass.declare.inherit(instance, protectedContext, privateContext, constructor, structure, staticSyntaxer);

				OODKClass.declare.construct(instance, protectedContext, privateContext, constructor, structure, staticSyntaxer, $, define, namespace);

				OODKClass.declare.afterInherit(instance, protectedContext, privateContext, constructor, structure, staticSyntaxer);

				OODKClass.declare.validateAbstractMethods(constructor, structure);

				/**
				 * Base instantiation method implemented in the master object to benefit the context and localContext which therefore
				 * become the the staticContext and localStaticContext in the future instance.
				 */
				OODKObject.declarePropertyNonEnumerable(instance, '__instantiate', function __instantiate(constructor, structure, args, master, serial, outer, instance, define, namespace){

					var privateContextes = OODKResource.getPrivateContextes(constructor); 

					if(typeof instance === 'undefined'){
						//OODK instance
						var instance = {};

						OODKResource.identify(instance);

						OODKResource.set(instance, {
							'constructor': constructor,
							'structure': {
								'type': "instance",
								'args': args
							},
							'privateContextes': {}
						});

						OODKClass.define.start(instance, OODKContext.factory(), protectedContext, privateContextes, args, constructor, structure, master, serial, outer, undefined, namespace);
					}else{
						//native js type inheritance
						instance.__resource = OODKResource.id();

						OODKResource.set(instance, {
							'constructor': constructor,
							'structure': {
								'type': "instance",
								'args': args
							},
							'privateContextes': {}
						});

						OODKClass.define.start(instance, OODKContext.factory(), protectedContext, privateContextes, args, constructor, structure, master, serial, outer, define, namespace);
					}

					return instance;
				});

				OODKObject.declarePropertyNonEnumerable(instance, '__declare', function __declare(constructor, structure, namespace){

					OODKClass.declare.start(instance, protectedContext, constructor, structure, undefined, namespace);
					constructor.self = instance;
				});

				OODKObject.declarePropertyNonEnumerable(instance, '__inheritStatic', function __inheritStatic(constructor, structure, childInstance, childContext, childClass, childStructure){

					//inherit all declared members
					for(var i in structure.declaredMembers){

						/*if(typeof childStructure.declaredMembers[i] !== 'undefined'){
							OODKSystem.throw("member "+childClass.prototype.toString()+"::"+i+" is already defined");
						}*/

						var member = structure.declaredMembers[i];

						if(member.access !== 'private'){
							childStructure.declaredMembers[i] = structure.declaredMembers[i];

							if(member.static === true){
								childInstance[i] = instance[i];

								childContext[i] = protectedContext[i];
							}
						}
					}

					//inherit public members
					for(var i in instance){
						childInstance[i] = instance[i];
					}

					//inherit protected members
					for(var i in protectedContext){
						childContext[i] = protectedContext[i];
					}
				});

				// we pass the local context (which become the local static context) of the parent class when instantiating the child
				OODKObject.declarePropertyNonEnumerable(instance, '__inherit',  function __inherit(constructor, structure, childInstance, childContext, staticProtectedContext, staticPrivateContextes, master, serial, outer, namespace){

					var __define;

					if(structure.native === true){
						__define = structure.define;
					}

					OODKClass.define.start(childInstance, childContext, staticProtectedContext, staticPrivateContextes, undefined, constructor, structure, master, serial, outer, __define, namespace);
				});

				var isIterable = OODKInterface.isValid(OODK.foundation.Iterable) && OODKClass.instanceOf(constructor, OODK.foundation.Iterable);

				OODKObject.forEach(structure.declaredMembers, function(member, name){

					if(member.isStatic()){

						if(member.isProperty()){
							
							if(member.isPrivate()){
								
								Object.defineProperty(privateContext, name, {
									enumerable: isIterable
								});
							}else if(member.isProtected()){
								
								Object.defineProperty(protectedContext, name, {
									enumerable: isIterable
								});
							}else if(member.isPublic()){
								
								Object.defineProperty(instance, name, {
									enumerable: isIterable
								});
							}
						}else{
							
							if(member.isPrivate()){
								
								Object.defineProperty(privateContext, name, {
									enumerable: false
								});
							}else if(member.isProtected()){
								
								Object.defineProperty(protectedContext, name, {
									enumerable: false
								});
							}else if(member.isPublic()){
								
								Object.defineProperty(instance, name, {
									enumerable: false
								});
							}
						}
					}
				});

				if(structure.dynamic === false && structure.mutable === false){
					Object.seal(privateContext);
				}

				if(structure.mutable === false){

					// block writable modifier on methods

					for(var name in privateContext){

						if(typeof privateContext[name] === 'function'){

		    				Object.defineProperty(privateContext, name, {
		    					writable: false,
		    					configurable: false
		    				});
	    				}
	    			}
				}
			},

			/**
			 * Apply the constructor: validate properties and method, instantiate static context
			 */
			'construct': function construct(instance, protectedContext, privateContext, constructor, structure, staticSyntaxer, $, define, namespace){

				//start defining properties and methods
				if(typeof define === 'function'){
					define.apply(instance, [$, protectedContext, privateContext]);
				}else if(typeof constructor === 'function'){
					constructor.apply(instance, [$, protectedContext, privateContext]);
				}

				if(structure.proxy !== false){

					$.public(function __initialize(){});
						
				}

				//freeze local and super context not be be modified later
		    	Object.freeze(staticSyntaxer.local);
				Object.freeze(constructor.local);
				Object.freeze(staticSyntaxer.super);
			},

			/**
			 * Apply inheritance while declaring 
			 */
			'inherit': function inherit(instance, protectedContext, privateContext, constructor, structure, syntaxer){

				if(typeof structure.extends === 'object' && structure.extends.length && structure.extends.length>0){

					for(var i in structure.extends){

						var parentClass = structure.extends[i];

						var parentClassStructure = OODKResource.inspect(parentClass);

						if(typeof parentClassStructure === 'object'){

							if(parentClassStructure.final === true){
								OODKSystem.throw(OODK.foundation.SyntaxError, "Class "+constructor.toString()+" may not inherit from final class ("+parentClass.toString()+")");
							}

							parentClass.self.__inheritStatic(parentClass, parentClassStructure, instance, protectedContext, constructor, structure);
						}
					}
				}
			},

			/**
			 * Validate that class is conformed to its interfaces if any declared.
			 */
			'validateAbstractMethods': function validateAbstractMethods(constructor, structure){

				if(structure.abstract !== true){
				
					if(typeof structure.implements === 'object' && structure.implements.length>0){

						var parents = Object.keys(structure.implements);

						for(var i in parents){

							var itf = structure.implements[parents[i]];

							itf.prototype.apply(constructor);
						}
					}

					OODKObject.forEach(structure.declaredMembers, function(member, name){

						if(member.abstract === true){
							OODKSystem.throw(OODK.foundation.SyntaxError, "Class "+constructor.toString()+" contains 1 abstract method and must therefore be declared abstract or implement the remaining methods "+name+'()');
						}
					});
				}
			},

			/**
			 * Update the local constructor structure after the inheritance has been made 
			 */
			'afterInherit': function afterInherit(instance, protectedContext, privateContext, constructor, structure, syntaxer){

				if(typeof structure.extends === 'object' && structure.extends.length && structure.extends.length>0){

					for(var i in structure.extends){

						var parentClass = structure.extends[i];

						var parentClassStructure = OODKResource.inspect(parentClass);

						if(typeof parentClassStructure === 'object' && parentClassStructure.native === false){

							for(var i in parentClassStructure.implements){

								var itf = parentClassStructure.implements[i];

								if(structure.implements.indexOf(itf) === -1){
									structure.implements.push(itf);
								}
							}
						}
					}
				}
			},

			/**
			 * Generate a syntaxer for a class declaration
			 */
			'syntaxerFactory': function syntaxerFactory(instance, protectedContext, privateContext, constructor, structure, namespace){

				//here we implements the define, public, protected methods to benefit the context var scope
				function declareMember(name, def, protected, private, final, abstract, transient, proxy, returnType, argsType){

					if(typeof name === 'function'){
		    			def = name;
		    			name = OODKString.getFuncName(name);
		    		}

					if(typeof name !== 'string'){
		    			OODKSystem.throw('invalid argument passed when declaring a class member');
		    		}

		    		/*if(reservedKeywords.member.indexOf(name)>-1){
		    			throw new OODK.Error(name+ " is a reserved keyword and can't be use to define a class member", OODK, 'system');
		    		}*/

		    		if(abstract === true){

		    			if(typeof def !== 'undefined'){
		    				OODKSystem.throw(OODK.foundation.SyntaxError, "Properties cannot be declared abstract");
		    			}else if(structure.abstract !== true){
	    					OODKSystem.throw(OODK.foundation.SyntaxError, "Class "+constructor.toString()+" contains 1 abstract method and must therefore be declared abstract or implement the remaining methods "+name+'()');
	    				}
	    			}

		    		var members = structure.declaredMembers;

		    		if(members.hasOwnProperty(name)){

		    			if(members[name].static === true && name.indexOf('__') !== 0){
		    				OODKSystem.throw(OODK.foundation.SyntaxError, "Cannot make static method "+members[name].class.toString()+"::"+name+"() non static in class "+constructor.toString());
		    			}else if(members[name].access === 'public' && (protected === true || private === true) && name.indexOf('__') !== 0){
		    				OODKSystem.throw(OODK.foundation.SyntaxError, "Access level to "+constructor.toString()+"::"+name+"() must be public (as in class "+members[name].class.toString()+")");
		    			}else if(members[name].final === true){
		    				OODKSystem.throw(OODK.foundation.SyntaxError, "Cannot override final "+((members[name].type === 'method')? 'method': 'property')+" "+members[name].class.toString()+"::"+name+((members[name].type === 'method')? '()': ''));
		    			}
		    		}

		    		if(returnType !== false && typeof def !== 'undefined' && typeof def !== 'function'){

    					if(!OODKObject.is(def, returnType)){
							OODKSystem.throw(OODK.foundation.TypeError, 'Return type of '+constructor.toString()+ '.' + name + ' is invalid: '+ OODKLang.valToString(def) + ' is not of type '+OODKLang.typeToString(returnType));
						}
					}

		    		OODKClassMember.factory(constructor, structure, name, def, ((private===true)? 'private': (protected === true)? 'protected': (abstract === false)? 'public': ''), false, final, abstract, transient, proxy, returnType, argsType);
		    		
		    	}

		    	function private(name, def){

		    		if(arguments.length === 0){
		    			//inner class declaration
		    			OODKKeywords.access = 'private';
		    			return this;
		    		}else{
		    			// member declaration
			    		var final = this.__final;
			    		var transient = this.__transient;
			    		var def = declareMember(name, def, false, true, final, false, transient, this.__proxy, this.__returnType, this.__args);
			    		this.__final = false;
			    		this.__transient = false;
			    		this.__proxy = false;
			    		this.__args = false;
			    	}
		    	}

		    	function public(name, def){

		    		var final = this.__final;
		    		var transient = this.__transient;
		    		var def = declareMember(name, def, false, false, final, false, transient, this.__proxy, this.__returnType, this.__args);
		    		this.__final = false;
		    		this.__transient = false;
		    		this.__proxy = false;
		    		this.__returnType = false;
		    		this.__args = false;
		    	}

		    	function protected(name, def){

		    		if(arguments.length === 0){
		    			OODKKeywords.access = 'protected';
		    			return this;
		    		}else{
			    		var final = this.__final;
			    		var transient = this.__transient;
			    		var def = declareMember(name, def, true, false, final, false, transient, this.__proxy, this.__returnType, this.__args);
			    		this.__final = false;
			    		this.__transient = false;
			    		this.__proxy = false;
			    		this.__returnType = false;
			    		this.__args = false;
			    		this.__async = false;
			    	}
		    	}

		    	function abstract(name, def){

		    		var def = declareMember(name, def, false, false, false, true, false, false, false, false, false);
		    		this.__final = false;
		    		this.__transient = false;
		    		this.__proxy = false;
		    		this.__returnType = false;
		    		this.__args = false;
		    		this.__async = false;
		    	}

				/**
		    	 * Define the class syntaxer.
		    	 */
		    	var classSyntaxer = OODKSyntaxer.factory({

		    		'__final': false,
		    		'__transient': false,
		    		'__proxy': false,
		    		'__returnType': false,
		    		'__args': false,

		    		'private': private,
		    		'protected': protected,
		    		'public': public,
		    		'abstract': abstract,
		    		'final': function final(){
		    			this.__final = true;
		    			return this;
		    		},
		    		'transient': function transient(){
		    			this.__transient = true;
		    			return this;
		    		},
		    		'proxy': function proxy(){
		    			this.__proxy = OODKObject.toArray(arguments);
		    			return this;
		    		},
		    		'static': function static(fn){

		    			function declareStaticMember(name, def, protected, private, final, abstract, transient, proxy, returnType, argsType){

		    				if(typeof name === 'function'){
				    			def = name;
				    			name = OODKString.getFuncName(name);
				    		}

							if(typeof name !== 'string'){
				    			OODKSystem.throw(OODK.foundation.SyntaxError, 'invalid argument passed when declaring a class member');
				    		}

				    		/*if(reservedKeywords.member.indexOf(name)>-1){
				    			throw new OODK.Error(name+ " is a reserved keyword and can't be use to define a class member", OODK, 'system');
				    		}*/

				    		if(abstract === true){

				    			if(typeof name !== 'string'){
				    				OODKSystem.throw(OODK.foundation.SyntaxError, "Properties cannot be declared abstract");
				    			}else if(structure.abstract !== true){
			    					OODKSystem.throw(OODK.foundation.SyntaxError, "Class "+constructor.toString()+" contains 1 abstract method and must therefore be declared abstract or implement the remaining methods "+name+'()');
			    				}
			    			}

				    		var members = structure.declaredMembers;

				    		if(members.hasOwnProperty(name)){

				    			if(members[name].static === false && name.indexOf('__') !== 0){
				    				OODKSystem.throw(OODK.foundation.SyntaxError, "Cannot make non static method "+members[name].class.toString()+"::"+name+"() static in class "+constructor.toString());
				    			}

				    			if(members[name].final === true){
				    				OODKSystem.throw(OODK.foundation.SyntaxError, "Cannot override final static "+((members[name].type === 'method')? 'method': 'property')+" "+members[name].class.toString()+"::"+name+((members[name].type === 'method')? '()': ''));
				    			}
				    		}

				    		if(returnType !== false && typeof def !== 'undfined' && typeof def !== 'function'){

		    					if(!OODKObject.is(def, returnType)){
									OODKSystem.throw(OODK.foundation.TypeError, 'Return type of '+constructor.toString()+ '.' + name + ' is invalid: '+ OODKLang.valToString(def) + ' is not of type '+OODKLang.typeToString(returnType));
								}
							}

							if(proxy !== false){
								if(structure.proxy === false && !(Array.isArray(proxy) && proxy.length>0)){
									OODKSystem.throw(OODK.foundation.SyntaxError, 'No proxy definition found for ' + OODKLang.typeToString(constructor)+'.'+name);
								}else if(structure.proxy !== false && Array.isArray(proxy) && proxy.length>0){
									OODKSystem.throw(OODK.foundation.SyntaxError, 'Proxy definition is invalid ' + OODKLang.typeToString(constructor)+'.'+name + ' - cannot override the proxy definition of the class');
								}
							}

							if(async !== false){
								if(!OODK.isFunc(def)){
									OODKSystem.throw(OODK.foundation.SyntaxError, 'Cannot declare property '+ name +' asynchrone - apply only on method');
								}
							}

				    		var member = OODKClassMember.factory(constructor, structure, name, def, ((private===true)? 'private': (protected === true)? 'protected': (abstract === false)? 'public': ''), true, final, abstract, transient, proxy, returnType, argsType);

				    		if(abstract !== true){

					    		//store the member in the local context
					    		staticSyntaxer.local[name] = def;

					    		if(private !== true){

					    			//overriding: inject parent protected/public methods in the super context 

					    			if(typeof instance[name] === 'function'){

						    			staticSyntaxer.super[name] = instance[name];

						    		}else if(typeof protectedContext[name] === 'function'){

						    			staticSyntaxer.super[name] = protectedContext[name];
						    		}
						    	}

						    	//wrap the method to be called within the static instance context
						    	if(typeof def === 'function' && proxy === false){

				    				def = (function(method, name){

					    				return function(){

					    					if(reservedKeywords.member.indexOf(name) === -1){
					    						OODKResource.set(constructor ,'magicMarker', true);
					    					}

					    					var r = method.apply(instance, arguments);

					    					if(reservedKeywords.member.indexOf(name) === -1){
					    						OODKResource.set(constructor ,'magicMarker', false);
					    					}

					    					return r;
					    				}
					    			})(def, name);
				    			}
				    			
				    			if(private){

						    		OODKClass.member.define(privateContext, name, def, structure, member, instance);

					    		}else if(protected){

					    			OODKClass.member.define(protectedContext, name, def, structure, member, instance);

						    		//restrict visibility if needed
						    		if(typeof instance[name] !== 'undefined'){
						    			delete instance[name];
						    		}
					    		}else{

					    			constructor.local[name] = def;

					    			OODKClass.member.define(instance, name, def, structure, member, instance);

					    			//grant visibility if needed
						    		if(typeof protectedContext[name] !== 'undefined'){
						    			delete protectedContext[name];
						    		}
					    		}
					    	}

				    		return def;
		    			}

		    			var staticSyntaxer = OODKSyntaxer.factory({

		    				'__final': false,
		    				'__abstract': false,
		    				'__transient': false,
		    				'__proxy': false,
		    				'__returnType': false,
		    				'__args': false,

		    				'private': function private(name, def){
		    					var final = this.__final;
		    					var abstract = this.__abstract;
		    					var transient = this.__transient;
		    					var r = declareStaticMember(name, def, false, true, final, abstract, transient, this.__proxy, this.__returnType, this.__args);
		    					this.__final = false;
		    					this.__abstract = false;
		    					this.__proxy = false;
		    					this.__returnType = false;
		    					this.__args = false;
		    				},
		    				'protected': function protected(name, def){
		    					var final = this.__final;
		    					var abstract = this.__abstract;
		    					var transient = this.__transient;
		    					var r = declareStaticMember(name, def, true, false, final, abstract, transient, this.__proxy, this.__returnType, this.__args);
		    					this.__final = false;
		    					this.__abstract = false;
		    					this.__transient = false;
		    					this.__proxy = false;
		    					this.__returnType = false;
		    					this.__args = false;
		    				},
		    				'public': function public(name, def){
		    					var final = this.__final;
		    					var abstract = this.__abstract;
		    					var transient = this.__transient;
		    					var r = declareStaticMember(name, def, false, false, final, abstract, transient, this.__proxy, this.__returnType, this.__args);
		    					this.__final = false;
		    					this.__abstract = false;
		    					this.__transient = false;
		    					this.__proxy = false;
		    					this.__returnType = false;
		    					this.__args = false;
		    				},
		    				'final': function final(){
				    			this.__final = true;
				    			return this;
				    		},
				    		'transient': function transient(){
				    			this.__transient = true;
				    			return this;
				    		},
				    		'proxy': function proxy(){
				    			this.__proxy = OODKObject.toArray(arguments);
				    			return this;
				    		},
				    		'abstract': function abstract(){
				    			this.__abstract = true;
				    			return this;
				    		},
				    		'super': {},
				    		'local': {}
		    			}, constructor.prototype, true, 'declare.static');

		    			//namespace gateways keywords
						var packageProtectedContext =  OODKResource.get(namespace, 'protectedContext');

		    			Object.defineProperty(privateContext, 'ns', {
							enumerable: false,
							value: packageProtectedContext
						});

						staticSyntaxer.ns = namespace;

						//we enter in the static scope
		    			fn.apply(constructor.prototype, [staticSyntaxer, protectedContext, privateContext]);

		    			//store the local static context
		    			OODKResource.set(constructor, 'staticLocalContext', staticSyntaxer.local);
		    		}
		    	}, undefined, false, 'declare.member');

		    	return classSyntaxer;
			},
		},

		'member': {

			'define': function define(context, name, def, structure, member, instance){

				if(member.proxy !== false){

		    		if(structure.proxy !== false){
		    			def = structure.proxy;
		    		}else{
		    			def = member.proxy;
		    		}

		    		if(OODKClass.isValid(def[0]) && !OODKInstance.isValid(def[1])){

		    			var pklass = def[0];

		    			if(structure.proxy === false){
			    			
			    			eval('def = function '+ name +'(){return OODKInstance.invoke(pklass, arguments);}');
			    			
			    		}else{

			    			var pklassstruct = OODKResource.get(pklass, 'structure');

			    			var pmember = pklassstruct.declaredMembers[name];

			    			if(typeof pmember === 'object' && pmember.isPublic()){

			    				if(pmember.isMethod()){

			    					eval('def = function '+ name +'(){if(pmember.isStatic()){return OODKInstance.invoke(pklass, name, arguments);}else{return  OODKInstance.invoke(structure.proxy[1], name, arguments);}}');
			    				}
			    			}
			    		}
		    		}else if(OODKInstance.isValid(def[0]) && def.length === 2){

		    			var pklass = OODKResource.get(def[0], 'constructor');

		    			var pklassstruct = OODKResource.get(pklass, 'structure');

		    			var pinstance = def[0];

		    			var pname = def[1];

		    			var pmember = pklassstruct.declaredMembers[pname];

		    			if(typeof pmember === 'object' && pmember.isPublic()){

		    				if(pmember.isMethod()){
		    					eval('def = function '+ name +'(){return OODKInstance.invoke(pinstance, pname, arguments);}');
		    				}
		    			}
		    		}else if(OODKInstance.isValid(def[1])){ 

		    			if(OODKObject.isFunc(OODK.foundation.util.RMI) && OODKObject.instanceOf(def[1], OODK.foundation.util.RMI)){
		    				
		    				def = (function(name, context, rmi){

		    					return function(){

		    						var rmir = rmi.invoke(context, name, OODKObject.toArray(arguments));

		    						if(rmir.hasError()){
		    							OODKSystem.throw(rmir.getError());
		    						}

		    						return rmir.getResult();
		    					}

		    				})(name, instance, def[1]);
		    			}
		    		}

					// proxy

					if(!OODKObject.isFunc(def)){

	    				if(structure.proxy === false){

	    					Object.defineProperty(context, name, {
		    					set: function(value){
		    						def[0][def[1]] = value;
		    					},
		    					get: function(){
		    						return def[0][def[1]];
		    					}
		    				});
		    			}else{

		    				Object.defineProperty(context, name, {
		    					set: function(value){

		    						if(member.isStatic()){
		    							structure.proxy[0].self[name] = value;
		    						} else {
		    							structure.proxy[1][name] = value;
		    						}
		    					},
		    					get: function(){

		    						if(member.isStatic()){
		    							return structure.proxy[0].self[name];
		    						}else{
		    							return structure.proxy[1][name];
		    						}
		    					}
		    				});
		    			}
		    		}else{
		    			context[name] = def;
		    		}
    			}else if(member.isTyped() && member.isProperty()){

    				//typing

    				context[name] = def;
    				context[name+'_'] = def;

    				Object.defineProperty(context, name+'_', {
    					enumerable: false
    				});

    				Object.defineProperty(context, name, {
    					set: (function(name, member){
    						return function(value){

    							var type = member.getReturnType();

    							if(!OODKObject.is(value, type)){
									OODKSystem.throw(OODK.foundation.TypeError, 'Return type of '+member.getClass()+ '.' + member.getName() + ' is invalid: '+ OODKLang.valToString(value) + ' is not of type '+OODKLang.typeToString(type));
								}

    							this[name+'_'] = value;
	    					}
	    				})(name, member),
	    				get: (function(name){
    						return function(){
	    						return this[name+'_'];
	    					}
	    				})(name)
    				});
    			}else{

    				context[name] = def;
    			}

				if(member.isProperty() && member.isFinal()){

    				Object.defineProperty(context, name, {
    					writable: false
    				});
    			}
			}
		},

		/**
		 * All method related to the creation of a new class instance
		 */
		'define': {

			/**
			 * Start defining a new class instance: generate private context, inheritance
			*/
			'start': function start(instance, protectedContext, staticProtectedContext, staticPrivateContextes, args, constructor, structure, master, serial, outer, define, namespace){

				if(structure.abstract === true && typeof args === 'object'){
					OODKSystem.throw(OODK.foundation.InstantiationException, "Cannot instantiate abstract class "+constructor.toString());
				}

				// model to store all private members of the local scope
				var privateContext = OODKContext.factory();

				var privateContextes = OODKResource.get(instance, 'privateContextes' );

				privateContextes[constructor.__resource] = privateContext;

				OODKResource.set(instance, 'privateContextes', privateContextes );

				var staticLocalContext = OODKResource.get(constructor, 'staticLocalContext' );

				var staticPrivateContext = staticPrivateContextes[constructor.__resource];

				var $ = OODKClass.define.syntaxerFactory(instance, protectedContext, privateContext, staticProtectedContext, staticPrivateContext, staticLocalContext, constructor, structure, master, namespace);
				
				OODKClass.define.inherit(instance, protectedContext, privateContext, staticProtectedContext, staticPrivateContextes, constructor, structure, master, outer, $, namespace, args);

				OODKClass.define.construct(instance, protectedContext, privateContext, staticProtectedContext, staticPrivateContext, args, constructor, master, outer, define, $, namespace ,structure);

				if(typeof args === 'object'){

					OODKResource.set(instance, 'instance', instance);
					OODKResource.set(instance, 'protectedContext', protectedContext); 
					OODKResource.set(instance, 'privateContext', privateContext);
					OODKResource.set(instance, 'staticProtectedContext', staticProtectedContext);
					OODKResource.set(instance, 'staticPrivateContextes', staticPrivateContextes); 
					OODKResource.set(instance, 'staticPrivateContext', staticPrivateContext);
					//OODKResource.set(instance, 'privateContextes', OODKResource.getPrivateContextes(instance));
				}

				if(!OODKClass.define.applyCloneRequest(instance, protectedContext, privateContext, args, constructor, master, serial) &&
					!OODKClass.define.applyUnserializeRequest(instance, protectedContext, privateContext, args, constructor, master, serial)){

					if(typeof args === 'object'){

						var isIterable = OODKInterface.isValid(OODK.foundation.Iterable) && OODKClass.instanceOf(instance, OODK.foundation.Iterable);

						OODKObject.forEach(structure.declaredMembers, function(member, name){

							if(!member.isStatic() && member.isProperty()){

								if(member.isPrivate()){
									
									Object.defineProperty(privateContext, name, {
										enumerable: isIterable
									});
								}else if(member.isProtected()){
									
									Object.defineProperty(protectedContext, name, {
										enumerable: isIterable
									});
								}else if(member.isPublic()){
									
									Object.defineProperty(instance, name, {
										enumerable: isIterable
									});
								}
							}
						});

						if(structure.mutable === false){

							// block writable modifier on methods

							for(var name in privateContext){

								if(typeof privateContext[name] === 'function'){

									Object.defineProperty(privateContext, name, {
				    					writable: false,
				    					configurable: false,
				    					enumerable: false
				    				});
			    				}
			    			}

			    			for(var name in protectedContext){

			    				if(typeof protectedContext[name] === 'function'){

				    				Object.defineProperty(protectedContext, name, {
				    					writable: false,
				    					configurable: false,
				    					enumerable: false
				    				});
				    			}
			    			}

			    			for(var name in instance){

			    				if(instance.hasOwnProperty(name) && typeof instance[name] === 'function'){

				    				Object.defineProperty(instance, name, {
				    					writable: false,
				    					configurable: false,
				    					enumerable: false
				    				});
				    			}
			    			}
						}

						if(structure.dynamic === false && structure.mutable === false){
							Object.seal(instance);
							Object.seal(protectedContext);
							Object.seal(privateContext);
						}

						
					}
					
					OODKClass.define.initialize(instance, protectedContext, privateContext, args, constructor, master, serial);
				}
			},

			/**
			 * Apply the inheritance on the instance
			 */
			'inherit': function inherit(instance, protectedContext, privateContext, staticProtectedContext, staticPrivateContextes, constructor, structure, master, outer, syntaxer, namespace ,args){

				if(Array.isArray(structure.extends) && structure.extends.length>0){

					for(var i in structure.extends){

						var parentClass = structure.extends[i];

						var parentClassStructure = OODKResource.inspect(parentClass);

						if(typeof parentClassStructure === 'object'){

							parentNamespace = parentClassStructure.namespace;

							parentClass.self.__inherit(parentClass, parentClassStructure, instance, protectedContext, staticProtectedContext, staticPrivateContextes, master, undefined, outer, parentNamespace);
						}
					}
				}
			},

			/**
			 * Execute the local constructor
			 */
			'construct': function construct(instance, protectedContext, privateContext, staticProtectedContext, staticPrivateContext, args, constructor, master, outer, define, $ ,namespace, structure){

				if(typeof define === 'function'){

		    		Object.defineProperty(instance, 'self', {
						enumerable: false,
						writable: true,
						configurabel :false,
						value: constructor.self
					});

					Object.defineProperty(protectedContext, 'self', {
						enumerable: false,
						writable: true,
						configurabel :false,
						value: staticProtectedContext
					});
					
					Object.defineProperty(privateContext, 'self', {
						enumerable: false,
						writable: true,
						configurabel :false,
						value: staticPrivateContext
					});

					//namespace gateway keywords
					var packageProtectedContext =  OODKResource.get(namespace, 'protectedContext');

					Object.defineProperty(privateContext, 'ns', {
						enumerable: false,
						value: packageProtectedContext
					});

					$.ns = namespace;

					if(structure.native === true && !OODKClass.isValid(structure.extends[0])){

						if(structure.extends[0] == Array){

							$.super.__initialize = function __initialize(){

								for(var i=0; i<arguments.length; i++){
						          instance[i] = arguments[i];
						        }

						        instance.length= arguments.length;

						        Array.apply(instance, arguments);
							}
						}else{

							$.super.__initialize = function __initialize(){

								structure.extends[0].apply(instance, arguments);
							}
						}
					}

					define.apply(instance, [$, protectedContext, privateContext]);

					if(structure.native === true && !OODKClass.isValid(structure.extends[0])){

						if(structure.extends[0] == Array){

							instance.toString = function toString(){

								var str = [];

								for(var i=0; i<this.length; i++){
									str.push(this[i]);
								}

								return str.join(',');
							}
						}else if(structure.extends[0] == String || structure.extends[0] == Number){

							instance.toString = function toString(){

								return ""+OODKResource.inspect(this).args[0];
							}

							instance.valueOf = function valueOf(){

								return OODKResource.inspect(this).args[0];
							}
						}
					}

		    	}else if(typeof constructor === 'function'){

					//instance.self = constructor.self;
					
					Object.defineProperty(instance, 'self', {
						enumerable: false,
						value: constructor.self
					});

					Object.defineProperty(protectedContext, 'self', {
						enumerable: false,
						value: staticProtectedContext
					});
					
					Object.defineProperty(privateContext, 'self', {
						enumerable: false,
						value: staticPrivateContext
					});

					//namespace gateway keywords
					var packageProtectedContext =  OODKResource.get(namespace, 'protectedContext');

					Object.defineProperty(privateContext, 'ns', {
						enumerable: false,
						value: packageProtectedContext
					});

					$.ns = namespace;

					//we enter in the instance scope
					constructor.apply(instance, [$, protectedContext, privateContext]);
				}

				if(structure.proxy !== false){

					$.public(function __initialize(){

						if(!OODKInstance.isValid(structure.proxy[1])){
							structure.proxy[1] = OODKInstance.invoke(structure.proxy[0], arguments);
						}

						if(typeof $.super.__initialize === 'function'){
							$.super.__initialize.apply(null, arguments);
						}
					});
						
				}

				//freeze super and local context
				Object.freeze($.local);
				Object.freeze($.super);
			},

			/**
			 * Generate a syntaxer for instance
			 */
			'syntaxerFactory': function syntaxerFactory(instance, protectedContext, privateContext, staticProtectedContext, staticPrivateContext, staticLocalContext, constructor, structure, master, namespace){

				//here we implements the define, public, protected methods to benefit the context var scope
				function declareMember(name, def, protected, private, proxy){

					if(typeof name === 'function'){
		    			def = name;
		    			name = OODKString.getFuncName(name);
		    		}

					if(typeof name !== 'string'){
		    			OODKSystem.throw(OODK.foundation.SyntaxError, 'invalid argument passed when declaring a class member');
		    		}

		    		/*if(reservedKeywords.member.indexOf(name)>-1){
		    			throw new OODK.Error(name+ " is a reserved keyword and can't be use to define a class member", OODK, 'system');
		    		}*/

		    		classSyntaxer.local[name] = def;

		    		if(private !== true){

		    			//inheritance: we wrapp parent public/protected methods if any

		    			if(structure.native === true && !OODKClass.isValid(structure.extends[0])){

		    				if(typeof instance[name] === 'function'){

		    					//wrap native object function to be executed in the context of the instance when calling super

				    			classSyntaxer.super[name] = (function(method, name){

									return function(){

										return method.apply(instance, arguments);
										
									}
								})(instance[name], name);
				    		}

		    			}else{

			    			if(typeof instance[name] === 'function'){
				    			classSyntaxer.super[name] = instance[name];
				    		}else if(typeof protectedContext[name] === 'function'){
				    			classSyntaxer.super[name] = protectedContext[name];
				    		}
				    	}
			    	}

			    	var member = structure.declaredMembers[name];

			    	if(typeof def === 'function'){

			    		def = OODKAOP.define('method', def, instance, name, {'constructor': constructor, 'member': member});	
					}

		    		if(private){

		    			OODKClass.member.define(privateContext, name, def, structure, member, instance);

		    		}else if(protected){

		    			OODKClass.member.define(protectedContext, name, def, structure, member, instance);

			    		//restrict visibility if needed
			    		if(typeof instance[name] !== 'undefined'){
			    			delete instance[name];
			    		}
		    		}else{

		    			OODKClass.member.define(instance, name, def, structure, member, instance);

		    			//grant visibility if needed
			    		if(typeof protectedContext[name] !== 'undefined'){
			    			delete protectedContext[name];
			    		}
		    		}

		    		return def;
		    	}

		    	function private(name, def){

		    		if(arguments.length === 0){
		    			OODKKeywords.access = 'private';
		    			return this;
		    		}else{
		    			declareMember(name, def, false, true, this.__proxy);
		    			this.__proxy = false;
		    		}
		    	}

		    	function public(name, def){
		    		declareMember(name, def, false, false, this.__proxy);
		    		this.__proxy = false;
		    	}

		    	function protected(name, def){

		    		if(arguments.length === 0){
		    			OODKKeywords.access = 'protected';
		    			return this;
		    		}else{
		    			declareMember(name, def, true, false, this.__proxy);
		    			this.__proxy = false;
		    		}
		    	}

				/**
		    	 * Define the class syntaxer.
		    	 */
		    	var classSyntaxer = OODKSyntaxer.factory({
		    		'__proxy': false,
		    		'__class': constructor,

		    		'private': private,
		    		'protected': protected,
		    		'public': public,
		    		'abstract': function abstract(){
		    			return this;
		    		},
		    		'super': {},
		    		'local': {},
		    		'final': function final(){
		    			return this;
		    		},
		    		'transient': function transient(){
		    			return this;
		    		},
		    		'proxy': function proxy(){
		    			this.__proxy = true;
		    			return this;
		    		},
		    		'static': function static(fn){

		    			function declareStaticMember(name, def, protected, private){

		    				if(typeof name === 'function'){
				    			def = name;
				    			name = OODKString.getFuncName(name);
				    		}

				    		if(private === true){
				    			return staticPrivateContext[name];
				    		}else if(protected === true){
				    			return staticProtectedContext[name];
				    		}else{
				    			return constructor.prototype[name];
				    		}
		    			}

		    			var staticSyntaxer = OODKSyntaxer.factory({

		    				'private': function private(name, def){
		    					declareStaticMember(name, def, false, true);
		    				},
		    				'protected': function protected(name, def){
		    					declareStaticMember(name, def, true, false);
		    				},
		    				'public': function public(name, def){
		    					declareStaticMember(name, def, false, false);
		    				},
		    				'final': function final(){
				    			return this;
				    		},
				    		'transient': function transient(){
				    			return this;
				    		},
				    		'proxy': function proxy(){
				    			return this;
				    		},
				    		'abstract': function abstract(){
				    			return this;
				    		}
		    			}, constructor.prototype, true, 'define.static');

		    			fn.apply(constructor.prototype, [staticSyntaxer, staticProtectedContext, staticPrivateContext]);
		    		}
		    	}, instance, true, 'define.member');

				//inject the local context
		    	for(var i in staticLocalContext){
		    		classSyntaxer.local[i] = staticLocalContext[i];
		    	}

		    	return classSyntaxer;
			},

			/**
			 * In case of unserialisation request, try call the unserial handler.
			 */
			'applyUnserializeRequest': function applyUnserializeRequest(instance, protectedContext, privateContext, args, constructor, master, serial){

				if(!master && serial){
					
					serial.ccc[serial.serial.__ref__] = {'src': serial.serial, 'instance': instance, 'ref': serial.serial.__ref__};

					var resource = OODKResource.get(instance);

		    		var serializer = OODKClass.instantiate(OODK.foundation.util.Deserializer, instance, resource, constructor, serial.serial, serial.ccc);

		    		if(typeof instance.__unserialize === 'function'){
		    			instance.__unserialize(serializer);
		    		}else if(typeof protectedContext.__unserialize === 'function'){
		    			protectedContext.__unserialize(serializer);
		    		}else if(typeof privateContext.__unserialize === 'function'){
		    			privateContext.__unserialize(serializer);
		    		}else{
		    			var __unserialize = OODKClass.getDeclaredMember(constructor, '__unserialize');

						if(__unserialize && __unserialize.access != 'public' && __unserialize.class !== constructor){
							OODKSystem.throw(OODK.foundation.IllegalAccessException, "Call to "+__unserialize.access+" "+__unserialize.class.toString()+"::__unserialize() from invalid context");
						}
		    		}

		    		return true;
				}

				return false;
			},

			/**
			 * In case of a clone request, apply a shallow copy of properties
			 */
			'applyCloneRequest': function applyCloneRequest(instance, protectedContext, privateContext, args, constructor, master, serial){

				if(master && !serial){
					//cloning: duplicate all properties

					if(typeof args === 'object'){

						//leaf: clone public and protected properties
						for(var i in instance){
							if(typeof instance[i] !== 'function' && reservedKeywords.member.indexOf(i) === -1 && !OODKString.startsWith(i, '__')){
								instance[i] = master.instance[i];
							}
						}

						for(var i in protectedContext){
							if(i.indexOf('__') !== 0 && typeof protectedContext[i] !== 'function' && reservedKeywords.member.indexOf(i) === -1){
								protectedContext[i] = master.context[i];
							}
						}
					}

					//clone all private properties at each level
					for(var i in privateContext){
						if(i.indexOf('__') !== 0 && typeof privateContext[i] !== 'function' && reservedKeywords.member.indexOf(i) === -1){
							privateContext[i] = master.localContext[constructor.__resource][i];
						}
					}

					master.ccc.push({'src': master.instance, 'clone': instance});

		    		if(typeof instance.__clone === 'function'){
		    			instance.__clone(master.cloner);
		    		}else if(typeof protectedContext.__clone === 'function'){
		    			protectedContext.__clone(master.cloner);
		    		}else if(typeof privateContext.__clone === 'function'){
		    			privateContext.__clone(master.cloner);
		    		}else{
		    			var __clone = OODKClass.getDeclaredMember(constructor, '__clone');

						if(__clone && __clone.access != 'public' && __clone.class !== constructor){
							OODKSystem.throw(OODK.foundation.IllegalAccessException, "Call to "+__clone.access+" "+__clone.class.toString()+"::__clone() from invalid context");
						}
		    		}

		    		//OODKResource.invoke(instance, '__clone', [master.cloner, master.ccc]);

		    		return true;
				}

				return false;
			},

			/**
			 * Call the initializer i.e the constructor of the class
			 */
			'initialize': function initialize(instance, protectedContext, privateContext, args, constructor, master, serial){

				if(!master && !serial && typeof args === 'object'){
					//leaf apply the __initialize method if any

					var __initialize = OODKClass.getDeclaredMember(constructor, '__initialize');

					if(__initialize && __initialize.access != 'public' && OODKResource.get(constructor ,'magicMarker') === false){
						OODKSystem.throw(OODK.foundation.IllegalAccessException, "Call to "+__initialize.access+" "+__initialize.class.toString()+"::__initialize() from invalid context");
					}else if(__initialize && __initialize.access === 'private' && __initialize.class !== constructor){
						OODKSystem.throw(OODK.foundation.IllegalAccessException, "Call to "+__initialize.access+" "+__initialize.class.toString()+"::__initialize() from context class '"+constructor.toString()+"'");
					}

					if(typeof instance.__initialize === 'function'){
						instance.__initialize.apply(instance, args);
					}else if(typeof protectedContext.__initialize === 'function'){
						protectedContext.__initialize.apply(instance, args);
					}else if(typeof privateContext.__initialize === 'function'){
						privateContext.__initialize.apply(instance, args);
					}
				}
			}
		},

		/**
		 * Get all declared members of a class.
		 */
		'getDeclaredMembers': function getDeclaredMembers(obj){

			var constructor = OODKInstance.getClass(obj);

			if(OODKClass.isValid(constructor)){
				var structure = OODKResource.inspect(constructor);
				return structure.declaredMembers;
			}
		},

		/**
		 * Get all declared members of a class.
		 */
		'getDeclaredProperties': function getDeclaredProperties(obj, _static){

			_static = (typeof _static === 'boolean')? _static: true;

			var constructor = OODKInstance.getClass(obj);

			if(OODKClass.isValid(constructor)){
				var list = [];

				var structure = OODKResource.inspect(constructor);

				OODKObject.forEach(structure.declaredMembers, function(member, name){

					if(member.type === "property" && ((_static === false && member.static === false) || _static === true)){

						list.push(member);
					}
				});

				return list;
			}
		},

		/**
		 * Get a specific declared member of a class by its name.
		 */
		'getDeclaredMember': function getDeclaredMember(constructor, name){
			var structure = OODKResource.inspect(constructor);
			return structure.declaredMembers[name];
		},
	}