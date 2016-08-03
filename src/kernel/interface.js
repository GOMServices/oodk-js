	/**
	 * OODKInterface handles interface declaration and definition.
	 */
	OODKInterface = {

		/**
		 * Test if the given argument is a valid OODK class.
		 * @method 
		 */
		'isValid': function isValid(fn){

			var struct = OODKResource.inspect(fn);

			return (typeof struct === 'object' && 
				struct.type === 'interface'
			);
		},

		/**
		 * Test if a method is defined in the given instance context. 
		 * @access private
		 */
		'testContext': function testContext(context, method){

			var members = Object.keys(context);

			return members.some(function(v, i){

				if((typeof context[v] === 'function') && (method === v)){
					return true;
				}
			});
		},

		/**
		 * Wrap a standard JS function as an OODK interface. 
		 * @access private
		 */
		'wrap': function wrap(itf){

			if(typeof itf !== 'function'){
				OODKSystem.throw(OODK.foundation.SyntaxError, 'Cannot declare '+itf+' as an interface');
			}

			var name = OODKString.getFuncName(itf);

			if(reservedKeywords.class.indexOf(name)>-1){
				OODKSystem.throw(OODK.foundation.SyntaxError, name +' is a reserved keyword and should not be used to assign an interface');
			}

			var fqn = OODKString.getFuncName(itf, this.scope());

			//itf.prototype.__resource = OODKResource.id();
			Object.defineProperty(itf, '__resource', {
				writable: false,
				configurable: false,
				value: OODKResource.id()
			});

			var struct = {
				'type': 'interface',
				'file': OODKImporter.__file,
				'import': OODKImporter.__import,
				'name': fqn
			}

			if(OODKKeywords.extend){
				struct.extends = OODKObject.toArray(OODKKeywords.extend);

				OODKObject.forEach(struct.extends, function(itf){

					if(!OODKInterface.isValid(itf)){
						OODKSystem.throw(OODK.foundation.SyntaxError, 'Interface ' + fqn + ' cannot implement '+(OODKClass.isValid(itf)? itf.toString(): itf)+' - it is not an interface');
					}
				});
			}else{
				struct.extends = [];
			}

			itf.prototype.apply = function(constructor){

				var structure = OODKResource.inspect(this.constructor);
				var classStructure = OODKResource.inspect(constructor);

				var itf = structure.master;

				var members = classStructure.declaredMembers;

				var errors = [];

				for(var i in itf.def){

					if(!members.hasOwnProperty(itf.def[i].method)){
						errors.push(itf.def[i]);
					}
				}

				if(errors.length>0){

					var msg = [];

					for(var i=0; i<errors.length; i++){
						msg.push(errors[i].context+'::'+errors[i].method);
					}

					OODKSystem.throw('Class '+constructor.toString()+' contains '+errors.length+' abstract method and must be therefore declared as abstract or implement the remaining method ('+msg.join(', ')+').');
				}
			}

			itf.toString = function toString(){
				var structure = OODKResource.inspect(this);
				return structure.name;
			}

			OODKResource.set(itf, 'structure', struct);

			struct.master = OODKInterface.declare(itf, struct);

			if(OODKKeywords.access === 'public'){
				OODKNamespace.register(this.scope(), name, itf, false);
			}else{
				OODKNamespace.register(this.scope(), name, itf, true);
			}

	    	OODKKeywords.reset();

	    	return itf;
		},

		/**
		 * Declare an interface. 
		 * @access private
		 */
		'declare': function declare(constructor, structure){

			if(typeof structure.master === 'object'){
				return structure.master;
			}

			var instance = {
				'def': []
			};

			// we construct the heritage
			if(typeof structure.extends === 'object' && structure.extends.length){

				var parents = Object.keys(structure.extends);

				for(var i in parents){

					var parentItf = structure.extends[parents[i]];
					var parentItfStructure = OODKResource.inspect(parentItf);

					var parent = parentItfStructure.master;

					for(var j in parent.def){
						instance.def.push(parent.def[j]);
					}
				}
			}

			var iftSyntaxer = {}

			iftSyntaxer.abstract = function (name){

				if(typeof name !== 'string'){
	    			OODKSystem.throw(OODK.foundation.SyntaxError, 'Interfaces may only include member method name.');
	    		}

				if(name === ''){
	    			OODKSystem.throw(OODK.foundation.SyntaxError, 'Interfaces may not include anonymous member methods.');
	    		}

				instance.def.push({'method': name, 'context': constructor.toString()});
			}

			if(typeof constructor === 'function'){
				constructor.apply(null, [iftSyntaxer]);
			}

			Object.freeze(instance);

			return instance;
		}
	}