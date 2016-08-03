
OODK('foundation.util', function($, _){
	
	$.public().final().class(function Dumper($, µ, _){

		$.private('instance');

		$.private('dump');

		$.private('ccc');

		$.public(function __initialize(instance, ccc){

			_.instance = instance;

			_.ccc = ccc;

			_.generic();
		});

		$.private(function generic(){

			var instance = _.instance;

			var constructor = OODKInstance.getClass(instance);

			_.constructor = constructor;

			var structClass = OODKResource.inspect(constructor);

			var resource =  OODKResource.get(instance);

			var self = instance;

			var dump = {
				'__type': constructor.toString(),
				'__resource': instance.__resource
			};

			_.ccc.push({'src': _.instance, 'dump': dump});

			OODKObject.forEach(structClass.declaredMembers, function(member, name){

				if(member.type === 'property' && 
					!OODKString.startsWith(name, '__') && 
					reservedKeywords.member.indexOf(name) === -1 &&
					member.static === false
				){
					var value;

					if(member.access === 'public'){
						value = self[name];
					}else if(member.access === 'protected'){
						value = resource.protectedContext[name];
					}if(member.access === 'private'){
						value = resource.privateContext[name];
					}

					dump[name] = value;
				}
			});

	    	if(structClass.dynamic === true || structClass.mutable === true){

	    		OODKObject.forEach(resource.privateContext, function(value, name){

	    			if(!OODKObject.isFunc(value) && 
						!OODKString.startsWith(name, '__') && 
						reservedKeywords.member.indexOf(name) === -1
					){
						dump[name] = value;
					}
		    	});

		    	OODKObject.forEach(resource.protectedContext, function(value, name){

	    			if(!OODKObject.isFunc(value) && 
						!OODKString.startsWith(name, '__') && 
						reservedKeywords.member.indexOf(name) === -1
					){
						dump[name] = value;
					}
		    	});

		    	OODKObject.forEach(resource.instance, function(value, name){

	    			if(!OODKObject.isFunc(value) && 
						!OODKString.startsWith(name, '__') && 
						reservedKeywords.member.indexOf(name) === -1
					){
						dump[name] = value;
					}
		    	});
	    	}

			if(structClass.extends.length>0){

				var parent = structClass.extends[0];

	    		while(parent){

	    			var structParent = OODKResource.get(parent, 'structure');

	    			OODKObject.forEach(structParent.declaredMembers, function(member, name){

	    				if(member.type === 'property' && 
							!OODKString.startsWith(name, '__') && 
							reservedKeywords.member.indexOf(name) === -1 &&
							member.access === 'private' &&
							member.static === false
						){
							var value = resource.privateContextes[parent.__resource][name];

							name = name + ' ('+structParent.name+')';

							dump[name] = value;
						}
			    	});

	    			if(structParent.extends.length>0){

				    	parent = structParent.extends[0];
		    		}else{
		    			parent = false;
		    		}
	    		}
	    	}

	    	//static members
	    	OODKObject.forEach(structClass.declaredMembers, function(member, name){

				if(member.type === 'property' && 
					!OODKString.startsWith(name, '__') && 
					reservedKeywords.member.indexOf(name) === -1 &&
					member.static === true
				){
					var value;

					if(member.access === 'public'){
						value = constructor.self[name];
					}else if(member.access === 'protected'){
						value = resource.staticProtectedContext[name];
					}if(member.access === 'private'){
						value = resource.staticPrivateContext[name];
					}

					dump[name] = value;
				}
			});

			if(structClass.extends.length>0){

				var parent = structClass.extends[0];

	    		while(parent){

	    			var structParent = OODKResource.get(parent, 'structure');

	    			OODKObject.forEach(structParent.declaredMembers, function(member, name){

	    				if(member.type === 'property' && 
							!OODKString.startsWith(name, '__') && 
							reservedKeywords.member.indexOf(name) === -1 &&
							member.access === 'private' &&
							member.static === true
						){
							var value = resource.staticPrivateContextes[parent.__resource][name];

							name =  name + ' ('+structParent.name+')';

							dump[name] = value;
						}
			    	});

	    			if(structParent.extends.length>0){

				    	parent = structParent.extends[0];
		    		}else{
		    			parent = false;
		    		}
	    		}
	    	}

	    	_.dump = dump;
		});

		$.public(function set(name, value, constructor){

			constructor = constructor? constructor: _.constructor;

			value = OODKAPI.get('Debugger').dump(value, _.ccc);

			var structClass = OODKResource.inspect(constructor);

			var member = structClass.declaredMembers[name];

			if(typeof member === 'object' && member.access === 'private' && constructor !== _.constructor){
				_.dump[name+':'+constructor.toString()] = value;
			}else{
				_.dump[name] = value;
			}
		});

		$.public(function unset(name, constructor){

			constructor = constructor? constructor: _.constructor;

			if(constructor !== _.constructor){
				delete _.dump[name+':'+constructor.toString()];
			}else{
				delete _.dump[name];
			}
		});

		$.public(function get(){

			return _.dump;
		});
	});
});