
OODK('foundation.util', function($, _){
	
	$.public().final().class(function Serializer($, µ, _){

		$.private('resource');

		$.private('instance');

		$.private('constructor');

		$.private('serial');

		$.private('ccc');

		$.public(function __initialize(instance, resource, constructor, serial, ccc){

			_.instance = instance;
			
			_.resource = resource;

			_.constructor = constructor;

			_.ccc = ccc;

			_.serial = serial;

			_.generic();
		});

		$.private(function generic(){

			var struct = OODKResource.get(_.constructor, 'structure');

	    	OODKObject.forEach(struct.declaredMembers, function(member, name){

	    		if(member.type === 'property' && member.transient === false && name.indexOf('__')!==0 ){

	    			var value;

	    			if(member.access === 'public' && member.static === false){
	    				value = _.instance[name];
	    			}else if(member.access === 'private' && member.static === false){
	    				value = _.resource.privateContext[name];
	    			}else if(member.access === 'protected' && member.static === false){
	    				value = _.resource.protectedContext[name];
	    			}

	    			if(typeof value !== 'object'){
	    				_.serial[name] = value;
	    			}else{
	    				_.serial[name] = $.serialize(value, _.ccc);
	    			}
	    		}
	    	});

		    if(struct.mutable === true || struct.dynamic === true){

		    	for(var name in _.instance){

		    		if(name.indexOf('__')!==0 && typeof struct.declaredMembers[name] === 'undefined'){

			    		var value = _.instance[name];

			    		if(typeof value !== 'object'){
		    				_.serial[name] = value;
		    			}else{
		    				_.serial[name] = $.serialize(value, _.ccc);
		    			}
		    		}
		    	}

		    	for(var name in _.resource.protectedContext){

		    		if(name.indexOf('__')!==0 && typeof struct.declaredMembers[name] === 'undefined'){

			    		var value = _.resource.protectedContext[name];

			    		if(typeof value !== 'object'){
		    				_.serial[name] = value;
		    			}else{
		    				_.serial[name] = $.serialize(value, _.ccc);
		    			}
		    		}
		    	}

		    	for(var name in _.resource.privateContext){

		    		if(name.indexOf('__')!==0 && typeof struct.declaredMembers[name] === 'undefined'){

			    		var value = _.resource.privateContext[name];

			    		if(typeof value !== 'object'){
		    				_.serial[name] = value;
		    			}else{
		    				_.serial[name] = $.serialize(value, _.ccc);
		    			}
		    		}
		    	}
		    }
		});

		$.public(function serialize(name, syntaxer){

			if(typeof name !== 'string'){
				$.throw(OODK.foundation.IllegalArgumentException, ['argument propertyName is invalid: '+name+' is not a string']);
			}

			if(typeof value === 'object'){
				value = $.serialize(value, _.ccc);
			}

			var constructor;

			if(typeof syntaxer === 'undefined'){
				constructor = _.constructor;
			}else{
				constructor = syntaxer.__class;
			}

			var struct = OODKResource.get(constructor, 'structure');

			if(typeof struct !== 'object'){
				OODK.throwError(OODK.foundation.IllegalStateException, "Cannot define the context of the property "+ name);
			}

			var member = struct.declaredMembers[name];

			if(struct.mutable === false && struct.dynamic === false){

				
				if(name.indexOf('__') === 0){
					$.throw(OODK.foundation.IllegalArgumentException, ['Cannot serialize "'+name+'" - it is not a declared property']);
				}

				if(typeof member !== 'object'){
					$.throw(OODK.foundation.IllegalArgumentException, ['Cannot serialize "'+name+'" - it is not a declared property']);
				}
			}

			if(typeof member === 'object'){

				if(member.type !== 'property'){
					$.throw(OODK.foundation.IllegalArgumentException, ['Cannot serialize "'+name+'" - it is not a declared property']);
				}

				if(member.transient === true){ 
					$.throw(OODK.foundation.IllegalArgumentException, ['Cannot serialize transient property "'+name+ '"']);
				}

			}

			if(constructor !== _.constructor){
				value = _.resource.privateContextes[constructor.__resource][name];
			}else{
				value = OODKResource.getProperty(_.instance, name);
			}

			if(constructor !== _.constructor){
				_.serial[name+':'+constructor.toString()] = value;
			}else{
				_.serial[name] = value;
			}
		});

		$.private(function apply(){

			return JSON.stringify(_.serial);
		});
	});
});