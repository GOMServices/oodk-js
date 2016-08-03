
OODK('foundation.util', function($, _){
	
	$.public().final().class(function Deserializer($, µ, _){

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

	    			var value = _.serial[name];

	    			if((typeof value === 'string' && OODKString.startsWith(value, '/@') && OODKString.endsWith(value, '/')) || typeof value === 'object'){
	    				value = $.unserialize(value, _.ccc);
	    			}

	    			if(member.access === 'public' && member.static === false){
	    				_.instance[name] = value;
	    			}else if(member.access === 'private' && member.static === false){
	    				_.resource.privateContext[name] = value;
	    			}else if(member.access === 'protected' && member.static === false){
	    				_.resource.protectedContext[name] = value;
	    			}
	    		}
	    	});
		});

		$.public(function unserializeOwnProperties(syntaxer, callback){

			var keys = Object.keys(_.serial);

			for(var i in keys){

				var key = keys[i];

				try {
					var val = this.unserialize(key, syntaxer);

					callback.apply(null, [val, key]);
				}catch(e){}
			}
		});

		$.public(function unserialize(name, syntaxer){

			if(typeof name !== 'string'){
				$.throw(OODK.foundation.IllegalArgumentException, ['argument propertyName is invalid: '+name+' is not a string']);
			}

			var constructor;

			if(typeof syntaxer === 'undefined'){
				constructor = _.constructor;
			}else{
				constructor = syntaxer.__class;
			}

			var struct = OODKResource.get(constructor, 'structure');

			if(typeof struct !== 'object'){
				OODK.throwError(OODK.foundation.IllegalStateException, 'Cannot define the context of the property "'+ name + '"');
			}

			var member = struct.declaredMembers[name];

			if(struct.mutable === false && struct.dynamic === false){

				if(name.indexOf('__') === 0){
					$.throw(OODK.foundation.IllegalArgumentException, ['Cannot unserialize "'+name+'" - it is not a declared property']);
				}

				if(typeof member !== 'object'){
					$.throw(OODK.foundation.IllegalArgumentException, ['Cannot unserialize "'+name+'" - it is not a declared property']);
				}
			}

			if(typeof member === 'object'){

				if(member.type !== 'property'){
					$.throw(OODK.foundation.IllegalArgumentException, ['Cannot unserialize "'+name+'" - it is not a declared property']);
				}

				if(member.transient === true){ 
					$.throw(OODK.foundation.IllegalArgumentException, ['Cannot unserialize transient property "'+name+'"']);
				}
			}

			var serial;

			if(constructor === _.constructor){
				serial = _.serial[name];
			}else{
				serial = _.serial[name+':'+constructor.toString()];
			}

			if(typeof serial === 'undefined'){
				$.throw(OODK.foundation.IllegalArgumentException, ['Cannot unserialize "'+name+'" - it is not a valid property']);
			}

			var value = serial;

			if((typeof value === 'string' && OODKString.startsWith(value, '/@') && OODKString.endsWith(value, '/')) || typeof value === 'object'){
	    				
				value = $.unserialize(serial, _.ccc);
			}

			if(typeof member === 'object'){

				if(constructor === _.constructor){
					OODKResource.setProperty(_.instance, name, value);
				}else{
					_.resource.privateContextes[constructor.__resource][name] = value;
				}
			}

			return value;
		});
	});
});