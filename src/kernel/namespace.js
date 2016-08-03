	
	/**
	 * OODKNamespace handle namespace manipulation.
	 */
	OODKNamespace = {

		/**
		 * Test if the give argument is a valid OODK namespace.
		 */
		'isValid': function isValid(obj){

			var struct = OODKResource.inspect(obj);

			return (typeof struct === 'object' && 
				struct.type === 'namespace'
			);
		},

		/**
		 * Declare a namespace
		 */
		'declare': function declare(namespace, callback){

			if(arguments.length==1){
				callback = namespace;
				namespace = 'default';
			}

			if(typeof namespace !== 'string' || typeof callback !== 'function'){
				OODKSystem.throw(OODK.foundation.SyntaxError, namespace + ' is not valid namespace name');
			}

			if(namespace !== 'default'){

				var root = OODKString.left(namespace, '.');

				if(!root){
					root = namespace;
				}

				if(OODKImporter.list[OODKImporter.__import].security === true && (typeof OODKImporter.__file !== 'string' ||
					(root === 'foundation' && !OODKString.startsWith(OODKImporter.__file, OODKConfiger.get('path.oodk')+'/foundation')) ||
					(root !== 'foundation' && !OODKString.startsWith(OODKImporter.__file, OODKConfiger.get('path.workspace')+'/'+root))
				)){
					OODKSystem.throw(OODK.foundation.SecurityException, 'Try to access namespace ' + namespace + ' from invalid context');
				}
			}

			var namespaceObj;

			if(typeof namespace === 'string'){

				var root = OODK;
				  
				var path = namespace.split('.');
				  
				for(var i=0; i<path.length; i++){

					var _namespace = path[i];
						  
					if(!root.hasOwnProperty(_namespace)){

						OODKNamespace.factory(_namespace, root);
					}
					  
					root =  root[_namespace];
				}

				namespaceObj = root;
			}

			if(typeof callback === 'function'){

				var syntaxer = OODKSyntaxer.factory(undefined, namespaceObj);

				//Object.freeze(syntaxer);

				var protectedContext = OODKResource.get(namespaceObj, 'protectedContext');

				callback.apply(namespaceObj, [syntaxer, protectedContext]);
			}

			return namespaceObj;
		},

		/**
		 * Register an OODK class or interface in the namespace.
		 */
		'register': function register(namespace, name, klass, protected){

			if(name === 'anonymous') return false;

			if(!OODKNamespace.isValid(namespace)){
				OODKSystem.throw(OODK.foundation.SyntaxError, 'Namespace '+namespace + ' is not a valid namespace');
			}

			if(!OODKClass.isValid(klass) && !OODKInterface.isValid(klass)){
				OODKSystem.throw(OODK.foundation.SyntaxError, 'Cannot register '+klass+' in namespace '+namespace.toString());
			}

			if(namespace === OODK){
				OODKSystem.throw(OODK.foundation.SecurityException, 'Register '+klass.toString()+' in namespace ' + OODK.toString() + ' from invalid context');
			}else if(OODKString.startsWith(namespace.toString(),'OODK.foundation')){

				var structure = OODKResource.inspect(klass);

				if(typeof structure.file !== 'string' || !OODKString.startsWith(structure.file, OODKConfiger.get('path.oodk')+'/foundation')){
					OODKSystem.throw(OODK.foundation.SecrutiyException, 'Register '+klass.toString()+' in namespace ' + namespace.toString() + ' from invalid context');
				}
			}

			var protectedContext = OODKResource.get(namespace, 'protectedContext');

		    if(typeof namespace[name] === 'function' || typeof protectedContext[name] === 'function' ){
		    	OODKSystem.throw(OODK.foundation.SyntaxError, 'Cannot redeclare class ' + klass.toString());
		    }

			if(protected === false){

				Object.defineProperty(namespace, name, {
					writable: false,
				    configurable: false,
				    enumerable: true,
				    value: klass
				});
		    }else{

		    	Object.defineProperty(protectedContext, name, {
					writable: false,
				    configurable: false,
				    enumerable: true,
				    value: klass
				});
		    }

		    return true;
		},

		/**
		 * Generate a standard namespace object.
		 */
		'factory': function factory(name, parent, obj){

			var namespce;

			if(typeof obj === 'undefined'){
				namespce = {};
			}else{
				namespce = obj;
			}
			
			namespce['__resource'] = OODKResource.id();
			namespce['toString'] = OODKNamespace.toString;

			var struct = {
				'parent': parent,
				'type': 'namespace',
				'name': name
			}

			OODKResource.set(namespce, 'structure', struct);

			var protectedContext = OODKContext.factory();

			OODKResource.set(namespce, 'protectedContext', protectedContext);

			if(typeof parent !=='undefined'){
				
				Object.defineProperty(parent, name, {
					writable: false,
				    configurable: false,
				    enumerable: true,
				    value: namespce
				});
				//parent[name] = namespce;
			}

			return namespce;
		},

		/**
		 * Convert a namespace object to a string, i.e it's full qualified name.
		 */
		'toString': function toString(){

			var structure = OODKResource.inspect(this);

			if(structure.parent){

				if(typeof structure.parent.toString === 'function'){
					var parentName = structure.parent.toString();

					return parentName + '.' + structure.name;
				}else{
					return structure.name;
				}
			}else{
				return structure.name;
			}
		},

		'getDeclaredClasses': function getDeclaredClasses(namespace, klassName, private, deep){

			if(!OODKNamespace.isValid(namespace)){
				OODKSystem.throw(OODK.foundation.IllegalArgumentException, namespace + ' is not a valid namespace');
			}

			private = (typeof private === 'boolean')? private: false;

			deep = (typeof deep === 'boolean')? deep: true;

			var list = [];

			var klass;

			Object.keys(namespace).forEach(function(v, i){

				var resource = namespace[v];

				if(OODKClass.isValid(resource) || OODKInterface.isValid(resource)){

					if(klassName &&  (resource.toString() === klassName)){
						klass = resource;
						return;
					}

					if(reservedKeywords.class.indexOf(v) === -1){
						list.push(resource);
					}
				}
			});

			if(private){

				var resource = OODKResource.get(namespace);

				OODKObject.forEach(resource.protectedContext, function(resource, name){

					if(OODKClass.isValid(resource) || OODKInterface.isValid(resource)){

						if(klassName &&  (resource.toString() === klassName)){
							klass = resource;
							return;
						}

						if(reservedKeywords.class.indexOf(name) === -1){
							list.push(resource);
						}
					}
				});
			}

			if(!klass && deep === true){

				Object.keys(namespace).forEach(function(v, i){

					var resource = namespace[v];

					if(v !== '__parent' && OODKNamespace.isValid(resource)){

						var _list = OODKNamespace.getDeclaredClasses(resource, klassName, private);

						if(OODKClass.isValid(_list) || OODKInterface.isValid(_list)){
							klass = _list;
							return;
						}else if(typeof _list === 'object'){

							for(var j=0; j<_list.length; j++){
								list.push(_list[j]);
							}
						}
					}
				});
			}

			if(klassName){
					
				return klass;
			}else{
				return list;
			}
		}
	}