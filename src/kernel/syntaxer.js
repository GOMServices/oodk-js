	
	/**
	 * The Syntaxer Class handles all syntax element language specific to OODK.
	 * It gives partially access to developers of inner OODK tools
	 */
	OODKSyntaxer = {

		'use': {

			'env': function env(){

				return OODKSystem.environment;
			},

			'envtype': function envtype(){

				return OODKSystem.getEnvType();
			},

			/*'unicast': function unicast(){
				OODKEventHandler.trigger.apply(OODKEventHandler, arguments);
			},

			'outercast': function outercast(type){
				
				if(OODKSystem.getEnvType() == 'webworker'){
					OODKSystem.environment.trigger(type, arguments[1]);
				}else if(OODKSystem.getEnvType() == 'browser'){

					if(OODKClass.isValid(OODK.foundation.util.Thread)){
						OODK.foundation.util.Thread.self.triggerAll(type, arguments[1]);
					}
				}
			},

			'broadcast': function broadcast(type){
				
				this.unicast.apply(this, arguments);

				this.outercast.apply(this, arguments);
			},

			'on': OODKEventHandler.on,*/

			'alias': function alias(target, name){

				var def;

				if(Array.isArray(target)){
					def = function(){
						return OODKInstance.invoke(target[0], target[1], arguments);
					}
				}else if(typeof target === 'function' || OODKClass.isValid(target) || OODKInterface.isValid(target)){
					def = target;
				}else if(OODKNamespace.isValid(target)){

					var resources = OODKNamespace.getDeclaredClasses(target, undefined, false, false);

					OODKObject.forEach(resources, function(resource, i){

						var name = OODKString.rightBack(resource.toString(), '.');

						OODKSyntaxer.use[name] = resource;

						this[name] = resource;

					}, this);

					return;
				}else{
					OODKSystem.throw(OODK.foundation.IllegalArgumentException, 'Cannot define alias: target argument is not valid');
				}

				if(typeof name !== 'string'){
					if(Array.isArray(target)){

						if(typeof target[1] === 'function'){
							name = OODKString.getFuncName(target[1]);

							if(name != 'anonymous'){
								name = "";
							}
						}else{
							name = target[1];
						}
					}else if(OODKClass.isValid(target) || OODKInterface.isValid(target) || OODKNamespace.isValid(target)){
						fqn = target.toString();

						if(fqn != 'anonymous'){
							name = OODKString.rightBack(fqn, '.');
						}
					}else if(typeof target === 'function'){
						name = OODKString.getFuncName(target);
					}
				}

				if(typeof name !== 'string' || name === ""){
					OODKSystem.throw(OODK.foundation.IllegalArgumentException, 'argument name is not defined');
				}

				if(OODKSyntaxer.use.hasOwnProperty(name)){
					OODKSystem.throw(OODK.foundation.IllegalArgumentException, 'Cannot define alias '+ name + ': this alias is already defined');
				}

				

				OODKSyntaxer.use[name] = def;

				this[name] = def;

				
			},

			'new': function instantiate(){

				return OODKClass.instantiate.apply(OODKClass, arguments);
			},

			'destroy': OODKInstance.destroy,

			'dependency': function dependency(){

				if(arguments.length === 2){
					return OODKImporter.addDependency.apply(OODKImporter, arguments);
				}else if(arguments.length === 1){
					return OODKImporter.getDependency.apply(OODKImporter, arguments);
				}
			},

			'package': function _package(){
				return OODKPackager.add.apply(OODKPackager, arguments);
			},

			'import': function _import(){

				OODKImporter.__syntaxer = this;
				return OODKImporter.import.apply(OODKImporter, arguments);
			},

			'invoke': OODKInstance.invoke,

			'log': OODKSystem.log,

			'info': OODKSystem.info,

			'debug': OODKSystem.debug,

			'error': OODKSystem.error,

			'is': OODKObject.is,

			'instanceOf': OODKObject.instanceOf,

			'isObject': OODKObject.isObject,

			'isFunc': OODKObject.isFunc,

			'isEmpty': OODKObject.isEmpty,

			'throw': OODKSystem.throw,

			'release': function release(){

				return RELEASE_NUMBER;
			},

			'isset': OODKObject.isset,

			'default': OODKObject.default
		},

		'declare': {

			'scope': function scope(){
				return this.__scope;
			},

			'extends': function extend(klass){

				if(arguments.length === 1 && typeof arguments[0] === 'function'){
					OODKKeywords.extend = [klass];
				}else{
					OODKKeywords.extend = arguments;
				}

				return this;
			},

			'implements': function implement(){

				OODKKeywords.implement = arguments;

				return this;
			},

			'abstract': OODKClass.abstract,

			'dynamic': OODKClass.dynamic,

			'mutable': OODKClass.mutable,

			'final': OODKClass.final,

			'proxy': OODKClass.proxy,

			'class': OODKClass.wrap,

			'__define': function define(instance, args, fn){

				var klass = OODKInstance.getClass(instance);

				var resource = OODKResource.get(klass);

				var struct = resource['structure'];

				if(typeof klass.self.__instantiate !== 'function'){
					var classStructure = OODKResource.inspect(klass);

					OODKClass.declare.start(klass.self, OODKContext.factory(), klass, classStructure, fn, this.scope());
				}else{
					
					var _args = OODKObject.toArray(args);
					
					var master, masterIndex, serial, serialIndex;
					
					for(var i in _args){
						if(typeof _args[i]==='object' && _args[i].__clone === true){
							master = _args[i];
							masterIndex = i;
							break;
						}else if(typeof _args[i]==='object' && _args[i].__serial === true){
							serial = _args[i];
							serialIndex = i;
							break;
						}
					}

					if(masterIndex){
						_args.splice(masterIndex, 1);
					}else if(serialIndex){
						_args.splice(serialIndex, 1);
					}

					var structure = OODKResource.inspect(klass);

					var namespace = structure.namespace;

					klass.self.__instantiate(klass, structure, _args, master, serial, undefined, instance, fn, namespace);
				}
			},

			'interface': OODKInterface.wrap,

			'public': function _public(){
				OODKKeywords.access = 'public';
				return this;
			},

			'member': {},

			'static': {},
		},

		'define': {
			'member': {},

			'static': {},
		},
		
		/**
		 * Generate a new syntaxer
		 */
		'factory': function factory(def, namespace, declare, type){

			namespace = (namespace? namespace: OODK.default);

			declare = ((typeof declare === 'boolean') ? declare: true);

			var syntaxer = {};

			//var aopKeywords = ['forEach', 'new', 'serialize', 'unserialize', 'clone', 'cast', 'destroy', 'inspect', 'invoke', 'isset', 'instanceOf', 'alias'];
			var aopKeywords = [];

			if(declare === true){

				syntaxer.__scope = namespace;

				for(var i in this.declare){

					if(i!== 'member' && i !== 'static'){
						syntaxer[i] = this.declare[i];
					}
				}
				
			}

			if(type === 'declare.member'){

				for(var i in this.declare.member){
					syntaxer[i] = this.declare.member[i];
				}
			}else if(type === 'declare.static'){

				for(var i in this.declare.static){
					syntaxer[i] = this.declare.static[i];
				}
			}else if(type === 'define.member'){

				for(var i in this.define.member){
					syntaxer[i] = this.define.member[i];
				}
			}else if(type === 'declare.member'){

				for(var i in this.declare.member){
					syntaxer[i] = this.declare.member[i];
				}
			}

			for(var i in this.use){

				if(aopKeywords.indexOf(i) !== -1){
					syntaxer[i] = OODKAOP.define('keyword', this.use[i], syntaxer, i);
				}else{
					syntaxer[i] = this.use[i];
				}
			}

			if(typeof def === 'object'){

				for(var i in def){
					syntaxer[i] = def[i];
				}
			}

			return syntaxer;
		}
	}