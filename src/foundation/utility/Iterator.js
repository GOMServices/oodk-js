
OODK('foundation.util', function($, _){
	
	$.public().implements(OODK.foundation.Iterator).class(function Iterator($, µ, _){

		/**
		 * the source list to iterates over
		 */
		$.protected('source');

		/**
		 * the current list index
		 */
		$.protected('index');

		/**
		 * structure of the source if class instance
		 */
		$.protected('struct');

		$.public(function __initialize(source){

			if(!OODKObject.isIterable(source)){
				$.throw(OODK.foundation.IllegalArgumentException, 'source argument '+source + ' is not iterable');
			}

			if(OODKInstance.isValid(source)){
				
				if(OODKClass.isImmutable(source)){
					// all non static properties
					µ.struct = OODKClass.getDeclaredProperties(source, false);
				}else{
					var res = OODKResource.get(source);

					µ.struct = [];

					OODKObject.forEach(res.privateContext, function(v, k){
						
						if(typeof v !== 'function'){
							µ.struct.push({'name': k, 'value': v});
						}
					});

					OODKObject.forEach(res.protectedContext, function(v, k){
						
						if(typeof v !== 'function'){
							µ.struct.push({'name': k, 'value': v});
						}
					});

					OODKObject.forEach(source, function(v, k){
						
						if(typeof v !== 'function'){
							µ.struct.push({'name': k, 'value': v});
						}
					});
				}
			}

			µ.source = source;

			µ.index = -1;
		});

		/**
		 * Get the size of the list
		 */
		$.protected(function getSize(){
			
			if(typeof µ.source.length !== 'undefined'){
				return µ.source.length;
			}else{
				return Object.keys(µ.source).length;
			}
		});

		/** 
		 * test if the list has a next element
		 */
		$.public(function hasNext(){

			if(typeof µ.struct !== 'undefined'){
				return (µ.struct.length>(µ.index+1));
			}else if(typeof µ.source.length !== 'undefined'){
				return (µ.source.length>(µ.index+1));
			}else{
				return (Object.keys(µ.source).length>(µ.index+1));
			}
		});

		/** 
		 * Get the next value in the list
		 */
		$.public(function next(){

			if(this.hasNext()){

				if(typeof µ.struct !== 'undefined'){
					var member = µ.struct[++µ.index];

					return OODKResource.getProperty(µ.source, member.name);
				}else if(typeof µ.source.length !== 'undefined'){
					return µ.source[++µ.index];
				}else{
					return µ.source[Object.keys(µ.source)[++µ.index]];
				}
			}else{
				
				var index;

				if(typeof µ.struct !== 'undefined'){
					var member = µ.struct[(µ.index+1)];

					return member.name;
				}else if(typeof µ.source.length !== 'undefined'){
					index = (µ.index+1);
				}else{
					index = Object.keys(µ.source)[(µ.index+1)];
				}

				$.throw(OODK.foundation.NoSuchElementException, ['index ' + index + ' is not defined']);
			}
		});

		/**
		 * Return the next index of in the list or -1 if list has no more items
		 */
		$.public(function nextIndex(){

			if(this.hasNext()){

				if(typeof µ.struct !== 'undefined'){
					var member = µ.struct[(µ.index+1)];

					return member.name;
				}else if(typeof µ.source.length !== 'undefined'){
					return (µ.index+1);
				}else{
					return Object.keys(µ.source)[(µ.index+1)];
				}
			}else{
				return -1;
			}
		});

		/**
		 * Reset the list index to its initital state
		 */
		$.public(function reset(){
			µ.index = -1;
		});
	});
});