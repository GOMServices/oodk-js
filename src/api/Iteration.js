	
	
	OODKAPI.factory('Iteration', {

		'initialize': function initialize(){

			OODKImporter.addDependency('{oodk}/foundation/exception/IterateNotSupportedException', '{oodk}/foundation/exception/Exception');
			OODKImporter.addDependency('{oodk}/foundation/exception/NoSuchElementException', '{oodk}/foundation/exception/Exception');
			
			OODKImporter.addDependency('{oodk}/foundation/utility/Iterator', [
				'{oodk}/foundation/interface/Iterator',
				'{oodk}/foundation/exception/NoSuchElementException'
			]);

			var syntaxer = xmlHttp.data.syntaxer;
			
			OODKImporter.import([
				'{oodk}/foundation/interface/Iterable',
				'{oodk}/foundation/utility/Iterator',
				'{oodk}/foundation/exception/IterateNotSupportedException'
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

		'forEach': function forEach(obj, callback, context){

			if(OODKInstance.isValid(obj)){

				//var ref = OODKInstance.isValid(obj) ? obj: OODKResource.isContextOf(context, obj);

				var ref = obj;

				var klass = OODKResource.get(ref, 'constructor');

				if(!OODKClass.instanceOf(ref, OODK.foundation.Iterable)){
					OODKSystem.throw(OODK.foundation.IterateNotSupportedException, 'class '+ klass.toString() +' does not implements interface '+OODK.foundation.Iterable.toString());
				}

				var iterator = OODKResource.invoke(ref, '__iterator');

				if(!OODKClass.instanceOf(iterator, OODK.foundation.Iterator)){
					OODKSystem.throw(OODK.foundation.IterateNotSupportedException, 'iterator does not implements interface '+OODK.foundation.Iterator.toString());
				}

				var r = true;

				while(iterator.hasNext()){

					var index = iterator.nextIndex();

					var element = iterator.next();

					if(callback.apply(context,  [element, index]) === false){
						r = false;
						break;
					}
				}

				return r;

			}else {

				return OODKObject.forEach.apply(OODKObject, arguments);
			}
			
		},

		'keywords': {

			'forEach': function forEach(obj, callback, context){

				context = (typeof context !== 'undefined') ? context: (typeof this.scope === 'function') ? this.scope(): null;

				var args = [obj, callback, context];

				return OODKAPI.get('Iteration').forEach.apply(OODKAPI.get('Iteration'), args);
			},

			'isIterable': function isIterable(obj){

				if(OODKInstance.isValid(obj)){

					return OODKClass.instanceOf(obj, OODK.foundation.Iterable);
				}else{

					return OODKObject.isIterable.apply(OODKObject, arguments);
				}
			}
		}
	});