	
	
	OODKAPI.factory('Sort', {

		'initialize': function initialize(){

			OODKImporter.addDependency('{oodk}/foundation/exception/SortNotSupportedException', '{oodk}/foundation/exception/Exception');
			

			var syntaxer = xmlHttp.data.syntaxer;
			
			OODKImporter.import([
				'{oodk}/foundation/interface/Sortable',
				'{oodk}/foundation/interface/Sorter',
				'{oodk}/foundation/utility/Sorter',
				'{oodk}/foundation/exception/SortNotSupportedException'
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

		'sort': function sort(obj, comparator){

			var sorter;

			if(OODKInstance.isValid(obj)){

	      		if(!OODKObject.instanceOf(obj, OODK.foundation.Sortable)){
					OODKSystem.throw(OODK.foundation.SortNotSupportedException, OODKLang.valToString(obj) + " does not implements " + OODKLang.typeToString(OODK.foundation.Sortable));
				}

				sorter = OODKResource.invoke(obj, '__sort', [comparator]);
			}else{
				sorter = OODKClass.instantiate(OODK.foundation.util.Sorter, obj, comparator);
			}

			if(!OODKObject.instanceOf(sorter, OODK.foundation.Sorter)){
				OODKSystem.throw(OODK.foundation.IllegalArgumentException, OODKLang.valToString(sorter) + " does not implements " + OODKLang.typeToString(OODK.foundation.Sorter));
			}

			sorter.sort();
		},

		'keywords': {

			'sort': function sort(){

				return OODKAPI.get('Sort').sort.apply(OODKAPI.get('Sort'), arguments);
			}
		}
	});