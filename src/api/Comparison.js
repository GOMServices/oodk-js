	
	
	OODKAPI.factory('Comparison', {

		'initialize': function initialize(){

			var syntaxer = xmlHttp.data.syntaxer;
			
			OODKImporter.import([
				'{oodk}/foundation/interface/Comparable',
				'{oodk}/foundation/interface/Comparator'
			]);

			OODKObject.forEach(this.keywords, function(def, name){

				if(!OODKSyntaxer.use.hasOwnProperty(name)){
					OODKSyntaxer.use[name] = def;
				}

				if(!syntaxer.hasOwnProperty(name)){
					syntaxer[name] = def;
				}
			});
		},

		'compare': function compare(obj1, obj2, ccc){

			if(typeof ccc === 'undefined'){
	        	ccc = [];
	      	}

	      	if(OODKInstance.isValid(obj1)){

	      		if(OODKObject.is(obj1, OODK.instanceOf(OODK.foundation.Comparable))){
					return OODKResource.invoke(obj1, '__compareTo', [obj2]);
				}else{
					OODKSystem.throw(OODK.foundation.ClassCastException, OODKLang.valToString(obj1) + " does not implements " + OODKLang.typeToString(OODK.foundation.Comparable));
				}
			}else if(typeof obj1 !== 'undefined' && obj1 !== null && OODKObject.isFunc(obj1.__compareTo)){
				return OODKInstance.invoke(obj1, '__compareTo', [obj2]);
			}

			if(OODKObject.isString(obj1)){

				return obj1.localeCompare(obj2);

			} else if((OODKObject.isArray(obj1) && OODKObject.isArray(obj2)) || 
				(OODKObject.isLiteral(obj1) && OODKObject.isLiteral(obj2))){

				var k1 = Object.keys(obj1);
				
				var k2 = Object.keys(obj2);

				if(k1.length > k2.length){
					return 1;
				}else if(k1.length < k2.length){
					return -1;
				}

				for(var i in k1){

					if(k1[i] != k2[i]){
						return -1;
					}

					if(typeof obj1[k1[i]] === 'object'){

						var test = true;

						for(var i in ccc){
				        	if(ccc[i].src === obj1[k1[i]]){
				          		test = false;
				          		break;
				        	}
				      	}

				      	if(test === true){

							ccc.push({'src': obj1[k1[i]]});

							if(OODKAPI.get('Comparison').compare(obj1[k1[i]], obj2[k2[i]], ccc) !== 0){
								return -1;
							}

						}
					}else if(obj1[k1[i]] != obj2[k2[i]]){
						return -1;
					}
				}

				return 0;
			} else{
				
				var c = obj1 - obj2;

				if(Number.isNaN(c)){
					return -1;
					//OODKSystem.throw(OODK.foundation.ClassCastException, 'Cannot compare ' + OODKLang.valToString(obj1) + ' with ' + OODKLang.valToString(obj2));
				}else{
					if(c>0){
						return 1;
					}else if(c<0){
						return -1;
					}else{
						return 0;
					}
				}
			}
		},

		'keywords': {

			'compare': function compare(obj1, obj2){

				return OODKAPI.get('Comparison').compare.apply(OODKAPI.get('Comparison'), arguments);
			}
		}
	});