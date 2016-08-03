	
	
	OODKAPI.factory('Cloning', {

		'initialize': function initialize(){

			OODKImporter.addDependency('{oodk}/foundation/exception/CloneNotSupportedException', '{oodk}/foundation/exception/Exception');
			
			OODKImporter.import([
				'{oodk}/foundation/utility/Cloner',
				'{oodk}/foundation/interface/Cloneable',
				'{oodk}/foundation/exception/CloneNotSupportedException'
			]);

			var syntaxer = xmlHttp.data.syntaxer;

			OODKObject.forEach(this.keywords, function(def, name){

				if(!OODKSyntaxer.use.hasOwnProperty(name)){
					OODKSyntaxer.use[name] = def;
				}

				if(syntaxer & !syntaxer.hasOwnProperty(name)){
					syntaxer[name] = def;
				}
			});
		},

		'clone': function clone(obj, ccc){

			if(typeof obj !== 'object'){
				return obj;
			}else if(obj !== null ){
				return OODKClass.instantiate(OODK.foundation.util.Cloner, obj, ccc).get();
			}
			
		},

		'keywords': {

			'clone': function clone(obj, ccc){

				return OODKAPI.get('Cloning').clone.apply(OODKAPI.get('Cloning'), arguments);
				
			}
		}
	});