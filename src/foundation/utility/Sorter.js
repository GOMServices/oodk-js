
OODK('foundation.util', function($, _){
	
	$.public().implements(OODK.foundation.Sorter).class(function Sorter($, µ, _){

		$.protected('source');

		$.protected('comparator');

		$.public(function __initialize(source, comparator){

			if(!OODKObject.isIterable(source) || typeof source === 'string'){
				$.throw(OODK.foundation.IllegalArgumentException, 'Cannot sort '+OODKLang.valToString(source) + ' - it is not an iterable object');
			}

			if(OODKInstance.isValid(source) && OODKClass.isImmutable(source)){
				$.throw(OODK.foundation.IllegalArgumentException, 'Cannot sort '+OODKLang.valToString(source) + ' - class is immutable');
			}

			if(!OODKAPI.isLoaded('Comparison')){
				OODKSystem.throw(OODK.foundation.IllegalStateException, "Cannot sort " + OODKObject.valToString(µ.source) + " - api Comparison is not loaded");
			}

			if(OODKInstance.isValid(comparator) || OODKClass.isValid(comparator)){

				if(!OODKObject.instanceOf(comparator, OODK.foundation.Comparator)){
					OODKSystem.throw(OODK.foundation.IllegalArgumentException, (typeof comparator === 'function' ? OODKLang.typeToString(comparator) : OODKLang.valToString(comparator) )+ ' must implement the interface '+OODKLang.typeToString(OODK.foundation.Comparator));
				}
			}

			µ.source = source;

			µ.comparator = comparator;
		});
		
		$.public(function sort(){

			var arr = [];

			if(OODKInstance.isValid(µ.source)){

				var res = OODKResource.get(µ.source);

				for(var i in µ.source){
					arr.push([i, µ.source[i], µ.source]);
				}

				for(var i in res.privateContext){
					arr.push([i, res.privateContext[i], res.privateContext]);
				}

				for(var i in res.protectedContext){
					arr.push([i, res.protectedContext[i], res.protectedContext]);
				}

			} else {

				for(var i in µ.source){
					arr.push([i, µ.source[i]]);
				}
			}

			arr.sort(function(a, b){

				if(OODKInstance.isValid(µ.comparator) || OODKClass.isValid(µ.comparator)){

					return OODKResource.invoke(µ.comparator, 'compare', [a, b]);
				}else{

					return OODKAPI.get('Comparison').compare(a[1], b[1]);
				}
			});

			if(OODKInstance.isValid(µ.source)){

				for(var i in µ.source){
					delete µ.source[i];
				}

				for(var i in res.privateContext){
					delete res.privateContext[i];
				}

				for(var i in res.protectedContext){
					delete res.protectedContext[i];
				}

				for(var i in arr){

					arr[i][2][arr[i][0]] = arr[i][1];
				}

			} else {

				for(var i in µ.source){
					delete µ.source[i];
				}

				if(Array.isArray( µ.source)){
					
					for(var i in arr){
						µ.source[i] = arr[i][1];
					}
				}else{
					for(var i in arr){
						µ.source[arr[i][0]] = arr[i][1];
					}
				}
			}
		});
	});
});