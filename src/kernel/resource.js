	
	/**
	 * OODKResource handle all resources: class, interface, namespace, instances
	 */
	OODKResource = {

		'list': {},

		'resource': 0,

		/**
		 * Generate a resource id.
		 */
		'id': function id(){
			return ++this.resource;
		},

		'identify': function identify(obj){

			if(!OODKObject.isLiteral(obj) || OODKInstance.isValid(obj)){
				return false;
			}

			Object.defineProperty(obj, '__resource', {
				writable: false,
				enumerable: false,
				configurable: false,
				value: OODKResource.id() 
			});

			return true;
		},

		'isContextOf': function isContextOf(instance, context){
			
			var res = OODKResource.get(instance);

			var r = false;

			if(typeof res !== 'undefined'){
				
				if(res.privateContext === context){
					return true;
				} else if(res.protectedContext === context){
					return true;
				} else if(instance === context){
					return true;
				}
			}

			return r;
		},

		/**
		 * Set the resource context of the given object.
		 */
		'set': function set(obj, key, value){

			var id;

			if(typeof obj === 'object' && typeof obj.__resource !== 'undefined'){
				id = obj.__resource;
			}else if (typeof obj === 'function' && typeof obj.prototype.__resource !== 'undefined'){
				id = obj.prototype.__resource;
			}else if (typeof obj === 'function' && typeof obj.__resource !== 'undefined'){
				id = obj.__resource;
			}else{
				OODKSystem.throw('Internal error: invalid argument supply for OODKResource.set()');
			}

			if(!this.list.hasOwnProperty(id)){

				if(typeof key === 'object'){
					key.src = obj;
					this.list[id] = key;
				}else{
					this.list[id] = {
						'src': obj
					};
				}
			}

			if(typeof key === 'string'){
				this.list[id][key] = value;
			}
		},

		/**
		 * Get the resource context of the given object.
		 */
		'get': function get(obj, key){

			if(typeof obj ==='undefined' || obj === null){
				return;
			}

			var id;

			if(typeof obj === 'object' && typeof obj.__resource !== 'undefined'){
				id = obj.__resource;
			}else if (typeof obj === 'function' && typeof obj.prototype.__resource !== 'undefined'){
				id = obj.prototype.__resource;
			}else if (typeof obj === 'function' && typeof obj.__resource !== 'undefined'){
				id = obj.__resource;
			}else{
				return;
			}

			if(this.list.hasOwnProperty(id) && typeof this.list[id] === 'object'){

				var error = true;

				if(typeof this.list[id].src === 'function'){

					if(this.list[id].src.prototype === obj || this.list[id].src === obj){
						error = false;
					}
				}else if(typeof this.list[id].src === 'object' && this.list[id].src !== obj){
					error = true;
				}else{
					error = false;
				}

				if(error === true){
					return;
				}

				if(typeof key === 'string'){
					return this.list[id][key];
				}else{
					return this.list[id];
				}
			}
		},

		/**
		 * Delete the resource context of the given object.
		 */
		'unset': function unset(obj){

			var id;

			if(typeof obj === 'object' && obj !== null && typeof obj.__resource !== 'undefined'){
				id = obj.__resource;
			}else if (typeof obj === 'function' && typeof obj.prototype.__resource !== 'undefined'){
				id = obj.prototype.__resource;
			}else if (typeof obj === 'function' && typeof obj.__resource !== 'undefined'){
				id = obj.__resource;
			}else{
				return;
			}

			if(this.list.hasOwnProperty(id)){
				this.list[id] = undefined;
			}
		},

		/**
		 * Get the structure of a resource.
		 */
		'inspect': function inspect(obj){

			return OODKResource.get(obj, 'structure');
		},

		/**
		 * Reset the magic marker of all constructors.
		 */
		'resetMagicMarker': function resetMagicMarker(){

			for(var i in this.list){
				
				if(typeof this.list[i] !== 'undefined'){
					
					if(this.list[i].hasOwnProperty('magicMarker')){
						this.list[i].magicMarker = false;
					}
				}
			}
		},

		'getPrivateContextes': function getPrivateContextes(obj){

			if(OODKClass.isValid(obj)){

				var resource = this.get(obj);
			
				if(typeof resource === 'undefined'){
					OODKSystem.throw('Internal OODK Error');
				}

				var list = {};

				list[obj.__resource] = resource.privateContext;

				var parents = resource.structure.extends;

				while(parents.length>0){

					if(OODKClass.isValid(parents[0])){

						var prtRes = OODKResource.get(parents[0]);

						list[parents[0].__resource] = prtRes.privateContext;

						parents = prtRes.structure.extends;
					}else{
						parents = [];
					}
				}

				//console.log(list);
						

				return list;
			}
		},

		/**
		 * Call a method of an instance whatever is access level.
		 */
		'invoke': function invoke(instance, method, args){

			if(OODKInstance.isValid(instance)){

				var resource = this.get(instance);
			
				if(typeof resource === 'undefined' || typeof resource.src === 'undefined'){
					OODKSystem.throw('Internal OODK Error');
				}

				var klass = resource.constructor;

				if(typeof resource.instance[method] === 'function'){
					//public context
					return resource.instance[method].apply(resource.instance, args);
				}else if(typeof resource.protectedContext[method] === 'function'){
					// protected context
					return resource.protectedContext[method].apply(resource.protectedContext, args);
				}else if(typeof resource.privateContext[method] === 'function'){
					//private context
					return resource.privateContext[method].apply(resource.privateContext, args);
				}else if(typeof klass.self[method] === 'function'){
					//public static context
					return klass.self[method].apply(klass.self, args);
				}else if(typeof resource.staticProtectedContext[method] === 'function'){
					//protected static context
					return resource.staticProtectedContext[method].apply(resource.staticProtectedContext, args);
				}else if(typeof resource.staticPrivateContext[method] === 'function'){
					//private static context
					return resource.staticPrivateContext[method].apply(resource.staticPrivateContext, args);
				}else{
					var member = OODKClass.getDeclaredMember(klass, method);

					if(member && member.access != 'public'){
						OODKSystem.throw(OODK.foundation.IllegalAccessException, "Call to "+member.access+" "+member.class.toString()+"::"+method+"() from invalid context");
					}
				}
			}else if(OODKClass.isValid(instance)){

				var resource = this.get(instance);

				if(typeof resource === 'undefined'){
					OODKSystem.throw('Internal OODK Error');
				}

				var klass = instance;

				if(typeof klass.self[method] === 'function'){
					//public static context
					return klass.self[method].apply(klass.self, args);
				}else if(typeof resource.protectedContext[method] === 'function'){
					//protected static context
					return resource.protectedContext[method].apply(resource.protectedContext, args);
				}else if(typeof resource.privateContext[method] === 'function'){
					//private static context
					return resource.privateContext[method].apply(resource.privateContext, args);
				}else{
					var member = OODKClass.getDeclaredMember(klass, method);

					if(member && member.access != 'public'){
						OODKSystem.throw(OODK.foundation.IllegalAccessException, "Call to "+member.access+" "+member.class.toString()+"::"+method+"() from invalid context");
					}
				}
			}else{
				OODKSystem.throw('Internal OODK Error');
			}
		},

		/**
		 * Get property of an instance whatever its access level.
		 */
		'getProperty': function invoke(instance, property){

			if(OODKInstance.isValid(instance)){

				var resource = this.get(instance);

				if(typeof resource === 'undefined' || typeof resource.instance === 'undefined'){
					OODKSystem.throw('Internal OODK Error');
				}

				var klass = resource.constructor;

				var struct = OODKResource.get(klass, 'structure');

				if(struct.mutable === false && struct.dynamic === false){

					var member = OODKClass.getDeclaredMember(klass, property);

					if(typeof member === 'object'){

						if(member.type === 'function'){
							OODKSystem.throw('Internal OODK Error');
						}

						if(member.access === 'public' && member.static === false){
							return resource.instance[property];
						}else if(member.access === 'protected' && member.static === false){
							// protected context
							return resource.protectedContext[property];
						}else if(member.access === 'private' && member.static === false){
							//private context
							return resource.privateContext[property];
						}else if(member.access === 'public' && member.static === true){
							//public static context
							return klass.self[property];
						}else if(member.access === 'protected' && member.static === true){
							//protected static context
							return resource.staticProtectedContext[property];
						}else if(member.access === 'private' && member.static === true){
							//private static context
							return resource.staticPrivateContext[property];
						}
					}
				}else{

					if(resource.instance.hasOwnProperty(property) && typeof resource.instance[property] !== 'function'){
						return resource.instance[property];
					}else if(resource.protectedContext.hasOwnProperty(property) && typeof resource.protectedContext[property] !== 'function'){
						// protected context
						return resource.protectedContext[property];
					}else if(resource.privateContext.hasOwnProperty(property) && typeof resource.privateContext[property] !== 'function'){
						//private context
						return resource.privateContext[property];
					}else if(klass.self.hasOwnProperty(property) && typeof klass.self[property] !== 'function'){
						//public static context
						return klass.self[property];
					}else if(resource.staticProtectedContext.hasOwnProperty(property) && typeof resource.staticProtectedContext.privateContext[property] !== 'function'){
						//protected static context
						return resource.staticProtectedContext[property];
					}else if(resource.staticPrivateContext.hasOwnProperty(property) && typeof resource.staticPrivateContext.privateContext[property] !== 'function'){
						//private static context
						return resource.staticPrivateContext[property];
					}
				}
			}else if(OODKClass.isValid(instance)){

				var resource = this.get(instance);

				if(typeof resource === 'undefined'){
					OODKSystem.throw('Internal OODK Error');
				}

				var klass = instance;

				var member = OODKClass.getDeclaredMember(klass, property);

				if(typeof member === 'object'){

					if(member.access === 'public' && member.static === true){
						//public static context
						return klass.self[property];
					}else if(member.access === 'protected' && member.static === true){
						//protected static context
						return resource.protectedContext[property];
					}else if(member.access === 'private' && member.static === true){
						//private static context
						return resource.privateContext[property];
					}
				}
			}else{
				OODKSystem.throw('Internal OODK Error');
			}
		},

		/**
		 * Get property of an instance whatever its access level.
		 */
		'getPropertyDescriptors': function getPropertyDescriptors(instance, property){

			if(OODKInstance.isValid(instance)){

				var resource = this.get(instance);

				if(typeof resource === 'undefined' || typeof resource.instance === 'undefined'){
					OODKSystem.throw('Internal OODK Error');
				}

				var klass = resource.constructor;

				var struct = OODKResource.get(klass, 'structure');

				if(struct.mutable === false && struct.dynamic === false){

					var member = OODKClass.getDeclaredMember(klass, property);

					if(typeof member === 'object'){

						if(member.type === 'function'){
							OODKSystem.throw('Internal OODK Error');
						}

						if(member.access === 'public' && member.static === false){
							return Object.getOwnPropertyDescriptors(resource.instance, property);
						}else if(member.access === 'protected' && member.static === false){
							// protected context
							return Object.getOwnPropertyDescriptors(resource.protectedContext, property);
						}else if(member.access === 'private' && member.static === false){
							//private context
							return Object.getOwnPropertyDescriptors(resource.privateContext, property);
						}else if(member.access === 'public' && member.static === true){
							//public static context
							return Object.getOwnPropertyDescriptors(klass.self, property);
						}else if(member.access === 'protected' && member.static === true){
							//protected static context
							return Object.getOwnPropertyDescriptors(resource.staticProtectedContext, property);
						}else if(member.access === 'private' && member.static === true){
							//private static context
							return Object.getOwnPropertyDescriptors(resource.staticPrivateContext, property);
						}
					}
				}else{

					if(resource.instance.hasOwnProperty(property) && typeof resource.instance[property] !== 'function'){
						return Object.getOwnPropertyDescriptors(resource.instance, property);
					}else if(resource.protectedContext.hasOwnProperty(property) && typeof resource.protectedContext[property] !== 'function'){
						// protected context
						returnObject.getOwnPropertyDescriptors(resource.protectedContext,property);
					}else if(resource.privateContext.hasOwnProperty(property) && typeof resource.privateContext[property] !== 'function'){
						//private context
						return Object.getOwnPropertyDescriptors(resource.privateContext, property);
					}else if(klass.self.hasOwnProperty(property) && typeof klass.self[property] !== 'function'){
						//public static context
						return Object.getOwnPropertyDescriptors(klass.self, property);
					}else if(resource.staticProtectedContext.hasOwnProperty(property) && typeof resource.staticProtectedContext.privateContext[property] !== 'function'){
						//protected static context
						return Object.getOwnPropertyDescriptors(resource.staticProtectedContext, property);
					}else if(resource.staticPrivateContext.hasOwnProperty(property) && typeof resource.staticPrivateContext.privateContext[property] !== 'function'){
						//private static context
						return Object.getOwnPropertyDescriptors(resource.staticPrivateContext, property);
					}
				}
			}else if(OODKClass.isValid(instance)){

				var resource = this.get(instance);

				if(typeof resource === 'undefined'){
					OODKSystem.throw('Internal OODK Error');
				}

				var klass = instance;

				var member = OODKClass.getDeclaredMember(klass, property);

				if(typeof member === 'object'){

					if(member.access === 'public' && member.static === true){
						//public static context
						return Object.getOwnPropertyDescriptors(klass.self, property);
					}else if(member.access === 'protected' && member.static === true){
						//protected static context
						return Object.getOwnPropertyDescriptors(resource.protectedContext, property);
					}else if(member.access === 'private' && member.static === true){
						//private static context
						return Object.getOwnPropertyDescriptors(resource.privateContext, property);
					}
				}
			}else{
				OODKSystem.throw('Internal OODK Error');
			}
		},

		/**
		 * Set property of an instance whatever its access level.
		 */
		'setProperty': function invoke(instance, property, value){

			if(OODKInstance.isValid(instance)){

				var resource = this.get(instance);

				if(typeof resource === 'undefined' || typeof resource.instance === 'undefined'){
					OODKSystem.throw('Internal OODK Error');
				}

				var klass = resource.constructor;

				var member = OODKClass.getDeclaredMember(klass, property);

				if(typeof member === 'object'){

					if(member.type === 'function'){
						OODKSystem.throw('Internal OODK Error');
					}

					if(member.access === 'public' && member.static === false){
						resource.instance[property] = value;
					}else if(member.access === 'protected' && member.static === false){
						// protected context
						resource.protectedContext[property] = value;
					}else if(member.access === 'private' && member.static === false){
						//private context
						resource.privateContext[property] = value;
					}else if(member.access === 'public' && member.static === true){
						//public static context
						klass.self[property] = value;
					}else if(member.access === 'protected' && member.static === true){
						//protected static context
						resource.staticProtectedContext[property]  = value;
					}else if(member.access === 'private' && member.static === true){
						//private static context
						resource.staticPrivateContext[property] = value;
					}
				}
			}else if(OODKClass.isValid(instance)){

				var resource = this.get(instance);

				if(typeof resource === 'undefined'){
					OODKSystem.throw('Internal OODK Error');
				}

				var klass = instance;

				var member = OODKClass.getDeclaredMember(klass, property);

				if(typeof member === 'object'){

					if(member.access === 'public' && member.static === true){
						//public static context
						klass.self[property] = value;
					}else if(member.access === 'protected' && member.static === true){
						//protected static context
						resource.protectedContext[property] = value;
					}else if(member.access === 'private' && member.static === true){
						//private static context
						resource.privateContext[property] = value;
					}
				}
			}else{
				OODKSystem.throw('Internal OODK Error');
			}
		}
	};