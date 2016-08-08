	
	/**
	 * OODKClassMember handles all data related to members of class
	 */
	OODKClassMember = {

		/**
		 * Is the member is final.
		 */
		'isFinal': function isFinal(){
			return this.final;
		},

		/**
		 * Is the member is abstract.
		 */
		'isAbstract': function isAbstract(){
			return this.abstract;
		},

		/**
		 * Is the member is transient.
		 */
		'isTransient': function isTransient(){
			return this.transient;
		},

		/**
		 * Is the member is static.
		 */
		'isStatic': function isStatic(){
			return this.static;
		},

		/**
		 * Is the member is static.
		 */
		'isAbstract': function isAbstract(){
			return this.abstract;
		},

		/**
		 * Is the member is a proxy.
		 */
		'isProxy': function isProxy(){
			return (this.proxy !== false);
		},

		/**
		 * Is the member is typed.
		 */
		'isTyped': function isTyped(){
			return (this.returnType !== false);
		},

		/**
		 * Get the return type.
		 */
		'getReturnType': function getReturnType(){
			return (this.returnType !== false? this.returnType: undefined);
		},

		/**
		 * Get the arguments type.
		 */
		'getArgumentsType': function getArgumentsType(){
			return (this.args !== false? this.args: undefined);
		},

		/**
		 * Is the member has public access.
		 */
		'isPublic': function isPublic(){
			return (this.access === 'public');
		},

		/**
		 * Is the member has protected access.
		 */
		'isProtected': function isProtected(){
			return (this.access === 'protected');
		},

		/**
		 * Is the member has private access.
		 */
		'isPrivate': function isPrivate(){
			return (this.access === 'private');
		},

		/**
		 * Get the name of the member.
		 */		
		'getName': function getName(){
			return this.name;
		},
		
		/**
		 * Get the class declaration of the member.
		 */
		'getClass': function getClass(){
			return this.class;
		},

		/**
		 * Get the descriptors of the member.
		 */
		'getDescriptors': function getDescriptors(instance){
			return OODKResource.getPropertyDescriptors(instance, this.name);
		},

		/**
		 * Is the member a method
		 */
		'isMethod': function isMethod(){
			return (this.type === 'method');
		},

		/**
		 * Is the member a property
		 */
		'isProperty': function isProperty(){
			return (this.type === 'property');
		},

		/**
		 * Factory to instantaite a OODK Class Member object.
		 */
		'factory': function factory(constructor, structure, name, def, access, static, final, abstract, transient, proxy, returnType, argsType){

			var member = {
				'type': (typeof def === 'function' || abstract === true? 'method': 'property'),
				'name': name, 
				'class': constructor, 
				'access': access, 
				'static': static, 
				'final': final,
				'abstract': abstract,
				'transient': transient,
				'proxy': proxy,
				'returnType': returnType,
				'args': argsType,
				'isTyped': this.isTyped,
				'getReturnType': this.getReturnType,
				'getArgumentsType': this.getArgumentsType,
				'isMethod': this.isMethod,
				'isProperty': this.isProperty,
				'isFinal': this.isFinal,
				'isAbstract': this.isAbstract,
				'isProxy': this.isProxy,
				'isStatic': this.isStatic,
				'isPrivate': this.isPrivate,
				'isProtected': this.isProtected,
				'isPublic': this.isPublic,
				'getName': this.getName,
				'getClass': this.getClass
			};

			structure.declaredMembers[name] = member;

			return member;

		}
	}