
	/**
	 * OODK instance gather utilities methods acting on instance.
	 */
	OODKInstance = {

		/**
		 * Test if the given argument is a valid OODK instance.
		 * @method 
		 */
		'isValid': function isValid(obj){
			var struct = OODKResource.inspect(obj);
			return (typeof struct === 'object' && struct.type === 'instance');
		},

		/**
		 * Get the class related to the given object.
		 */
		'getClass': function getClass(obj){

			if(OODKInstance.isValid(obj)){
				return OODKResource.get(obj, 'constructor');
			}else if(typeof obj !== 'undefined' && obj !== null  && typeof obj.constructor === 'function'){
				return obj.constructor;
			}
		},

		/**
		 * Get the parent class of the given object.
		 */
		'getSuperClass': function getSuperClass(obj){

			if(OODKInstance.isValid(obj)){
				klass = OODKInstance.getClass(obj);
			}else{
				klass = obj;
			}

			if(OODKClass.isValid(klass)){

				var structure = OODKResource.inspect(klass);

				if(typeof structure.extends === 'object'){
					return structure.extends[0];
				}
			}else if(OODKInterface.isValid(klass)){

				var structure = OODKResource.inspect(klass);

				return structure.extends;
			}
		},

		/**
		 * Get the interfaces the class the given object implements.
		 */
		'getInterfaces': function getInterfaces(obj){

			if(OODKInstance.isValid(obj)){
				klass = OODKInstance.getClass(obj);
			}else{
				klass = obj;
			}

			if(OODKClass.isValid(klass)){

				var structure = OODKResource.inspect(klass);

				return structure.implements;
			}
		},

		/**
		 * Cast the object given to the specified class.
		 * If obj is an OODK instance, try to call the magic __cast method.
		 */
		'cast': function cast(obj, klass){

			var subtype;

			if(typeof klass === 'string'){

				subtype = klass;

				switch(klass){
					case 'array': klass = Array;break;
					case 'string': klass = String;break;
					case 'int':
					case 'integer': klass = Number; subtype = 'int'; break; 
					case 'float': klass = Number;  subtype = 'float'; break;
					case 'bool':
					case 'boolean': klass = Boolean;break;
					default:
						OODKSystem.throw(OODK.foundation.ClassCastException, 'Cannot cast '+obj+' to '+klass);
					break;
				}
			}

			if((typeof klass !== 'function')){
				OODKSystem.throw(OODK.foundation.ClassCastException, (typeof obj === 'string' ? '"'+obj+'"' : obj) + ' is not a constructor');
			}else if(OODKInterface.isValid(klass)){
				OODKSystem.throw(OODK.foundation.ClassCastException, 'Cannot cast ' + (typeof obj === 'string' ? '"'+obj+'"' : obj) + ' to an interface');
			}else if(OODKNamespace.isValid(klass)){
				OODKSystem.throw(OODK.foundation.ClassCastException, 'Cannot cast ' + (typeof obj === 'string' ? '"'+obj+'"' : obj) + ' to a namespace');
			}

			if(OODKInstance.isValid(obj) && !OODKClass.isValid(klass)){
				var r = OODKResource.invoke(obj, '__cast', [klass, subtype]);

				if(typeof r === 'undefined'){
					OODKSystem.throw(OODK.foundation.ClassCastException, 'Cannot cast '+obj+' to '+(OODKClass.isValid(klass)? klass.toString(): klass.name));
				}else{
					return r;
				}
			}else{

				if(klass === Array){
					//cast object to array
					return OODKObject.toArray(obj);
				}else if(klass === String && typeof obj['toString'] === 'function'){
					//cast object to array
					return obj.toString();
				}else if(klass === Number && typeof obj === 'string'){

					subtype = ((typeof subtype === 'undefined') ? 'int': subtype);

					if(subtype === 'int'){
						//cast string to an integer
						return Number.parseInt(obj);
					}else if(subtype === 'float'){
						//cast string to a flaot
						return Number.parseFloat(obj);
					}
				}else if(klass === Boolean){

					if(typeof obj === 'string'){
						obj = obj.toLowerCase().trim();
					}
					//cast string to a boolean
					if(['true', 1, '1'].indexOf(obj) > -1){
						return true;
					}else if(["", 'false', 0, '0'].indexOf(obj) > -1 || typeof obj === 'undefined' || obj === null){
						return false;
					}
				}else if(klass === Date && (typeof obj === 'string' || typeof obj === 'number')){

					return OODKClass.instantiate(klass, obj);
				}else if(OODKClass.isValid(klass)){

					var r = OODKResource.invoke(klass, '__parse', [obj]);

					if(typeof r === 'undefined'){
						OODKSystem.throw(OODK.foundation.ClassCastException, ['Cannot cast '+obj+' to '+(OODKClass.isValid(klass)? klass.toString(): klass.name)]);
					}else{
						return r;
					}
				}
			}

			OODKSystem.throw(OODK.foundation.ClassCastException, ['Cannot cast '+obj+' to '+(OODKClass.isValid(klass)? klass.toString(): klass.name)]);
		},

		/**
		 * Invoke the method withe obj context and passing args arguments.
		 */
		'invoke': function invoke(obj, method, args){

			if(arguments.length === 2 && typeof obj === 'function'){

				//invoke a constructor
				var klass = obj;
				args= method;

				return OODKClass.apply(klass, args);
			}else{

				if(typeof method === 'string'){

					if(typeof obj !== 'undefined' && obj !== null && typeof obj[method] === 'function'){
						return obj[method].apply(obj, args);
					}else if(OODKClass.isValid(obj) && typeof obj.self[method] === 'function'){
						return obj.self[method].apply(obj, args);
					}else{
						OODKSystem.throw(OODK.foundation.IllegalArgumentException, '"' + method + '" is not a method of class ' + ((typeof obj === 'function') ? OODKLang.typeToString(obj): OODKLang.valToString(obj)));
					}
				}else if(typeof method === 'function'){

					return method.apply(obj, args);
				}else{
					OODKSystem.throw(OODK.foundation.IllegalArgumentException, method+' is not a function');
				}
			}
		},

		/**
		 * "Destroy" an object: delete all members of the object, freeze (see ECMA6 Object.freeze()) the object and call the __destruct method if exists. 
		 */
		'destroy': function destroy(obj){

			if(OODKInstance.isValid(obj)){

				OODKResource.invoke(obj, '__finalize', []);

				var res = OODKResource.get(obj);

				Object.freeze(obj);

				Object.freeze(res.privateContext);

				Object.freeze(res.protectedContext);

				OODKResource.unset(obj);
			}else if(typeof obj === 'object' || typeof obj === 'string'){

				OODKObject.invoke(obj, '__finalize', []);
				
				Object.freeze(obj);
			}
		}
	}