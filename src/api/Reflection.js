	
	
	OODKAPI.factory('Reflection', {

		'initialize': function initialize(){

			var syntaxer = xmlHttp.data.syntaxer;

			OODKObject.forEach(this.keywords, function(def, name){

				if(!OODKSyntaxer.use.hasOwnProperty(name)){
					OODKSyntaxer.use[name] = def;
				}

				if(!syntaxer.hasOwnProperty(name)){
					syntaxer[name] = def;
				}
			});
		},

		'keywords': {

			'inspect': function inspect(obj){

				var struct = OODKResource.inspect(obj, true);

				if(typeof struct === 'object'){

					var cln = {};

					cln.getName = function getName(){
						return struct.name;
					}

					cln.getLocalName = function getName(){
						return OODKString.rightBack(struct.name, '.');
					}

					cln.isAnonymous = function isFinal(){
						return (struct.name === 'anonymous');
					}

					cln.isFinal = function isFinal(){
						return struct.final;
					}

					cln.isNative = function isNative(){
						return struct.native;
					}

					cln.isAbstract = function isAbstract(){
						return struct.abstract;
					}

					cln.isProxy= function isProxy(){
						return (struct.proxy !== false);
					}

					cln.isDynamic = function isDynamic(){
						return struct.dynamic;
					}

					cln.isMutable = function isMutable(){
						return struct.mutable;
					}

					cln.isPublic = function isPublic(){
						return (struct.access === 'public');
					}

					cln.isPrivate = function isPrivate(){
						return (struct.access === 'private');
					}

					cln.isLocal = function isLocal(){
						return (struct.access === 'local');
					}

					cln.getScope = function getScope(){
						return struct.namespace;
					}

					cln.getFile = function getFile(){
						return struct.file;
					}

					cln.getImport = function getImport(){
						return struct.import;
					}

					cln.getDeclaredMembers = function getDeclaredMembers(name){

						if(typeof struct.declaredMembers === 'object'){
							if(typeof name === 'string'){
								return struct.declaredMembers[name];
							}else{
								return struct.declaredMembers;
							}
						}
					}

					cln.getClass = function getClass(){
						return OODKInstance.getClass.apply(OODKInstance, [obj]);
					}

					cln.getSuperClass = function getSuperClass(){
						return OODKInstance.getSuperClass.apply(OODKInstance, [obj]);
					}

					/*cln.getAncestorClasses = function getAncestorClasses(){

						var list = [];

						var superClass = this.getSuperClass();

						while(superClass){
							list.push(superClass);
							superClass = this.getSuperClass(superClass);
						}

						return list;
					}*/

					cln.getInterfaces = function getInterfaces(){
						return OODKInstance.getInterfaces.apply(OODKInstance, [obj]);
					}

					cln.isClass = function isNamespace(){
						return OODKClass.isValid.apply(OODKClass, [obj]);
					}

					cln.isInstance = function isNamespace(){
						return OODKInstance.isValid.apply(OODKInstance, [obj]);
					}

					cln.isInterface = function isNamespace(){
						return OODKInterface.isValid.apply(OODKInterface, [obj]);
					}

					cln.isNamespace = function isNamespace(){
						return OODKNamespace.isValid.apply(OODKNamespace, [obj]);
					}

					return cln;
				}
			}
		}
	});