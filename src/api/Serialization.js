	
	
	OODKAPI.factory('Serialization', {

		'initialize': function initialize(){

			OODKImporter.addDependency('{oodk}/foundation/exception/SerializeNotSupportedException', '{oodk}/foundation/exception/Exception');

			OODKImporter.addDependency('{oodk}/foundation/utility/Serializer', '{oodk}/foundation/exception/SerializeNotSupportedException');

			OODKImporter.import([
				'{oodk}/foundation/utility/Serializer',
				'{oodk}/foundation/utility/Deserializer',
				'{oodk}/foundation/interface/Serializable'
			]);

			var syntaxer = xmlHttp.data.syntaxer;

			OODKObject.forEach(this.keywords, function(def, name){

				if(!OODKSyntaxer.use.hasOwnProperty(name)){
					OODKSyntaxer.use[name] = def;
				}

				if(syntaxer && !syntaxer.hasOwnProperty(name)){
					syntaxer[name] = def;
				}
			});
		},

		/**
		 * Serialize an object
		 */
		'serialize': function serialize(obj, ccc){

			if(typeof obj !== 'object'){
				return JSON.stringify(obj);
			}

			var klass = OODKInstance.getClass(obj);

			if(OODKClass.isValid(klass) && !OODKClass.instanceOf(obj, OODK.foundation.Serializable)){
				OODKSystem.throw(OODK.foundation.SerializeNotSupportedException, 'Class '+klass.toString()+' does not implements the interface ' + OODK.foundation.Serializable.toString());
			}

			if(typeof ccc === 'undefined'){
	        	ccc = [];
	        	var root = true;
	      	}else{
	        	var root = false;
	      	}

	      	for(var i in ccc){
	        	if(ccc[i].src === obj){
	          		return ccc[i].ref;
	        	}
	      	}

	      	var tmp = {};

	      	var ref = '/@'+ccc.length+'/';

	      	tmp.__ref__ = ref;

	      	var native;

	      	var constructor = OODKInstance.getClass(obj);

	      	if(OODKClass.isValid(constructor)){
	      		tmp.__type__ = constructor.toString();

	      		if(tmp.__type__ === 'anonymous'){
	      			tmp.__type__ = 'Object';
	      		}

	      		native = false;
	      	}else{
	      		tmp.__type__ = obj.constructor.name;
	      		native = true;
	      	}

	      	ccc.push({'src': obj, 'ref': ref, 'serial': ''});

	      	var cccIndex = ccc.length-1;

	      	if(native){

		      	for(var i in obj){

		        	if(typeof obj[i] !== 'object'){
		          		tmp[i] = obj[i];
		        	}else{
		          		tmp[i] = this.serialize(obj[i], ccc);
		        	}
		      	}
		    }else{

		    	var resource = OODKResource.get(obj);

		    	var serializer = OODKClass.instantiate(OODK.foundation.util.Serializer, obj, resource, constructor, tmp, ccc);

		    	OODKResource.invoke(obj, '__serialize', [serializer]);
		    }

		    if(OODKInstance.isValid(serializer)){
	      		var serial = OODKResource.invoke(serializer, 'apply');
	      	}else{
	      		var serial = JSON.stringify(tmp);
	      	}
	      
	      	if(root){
	        	for(var i in ccc){
	          		if(ccc[i].serial){
	          			serial = serial.replace(new RegExp('"'+ccc[i].ref+'"', 'gi'), ccc[i].serial);
	          		}
	        	}

	        	return serial;
	      	}else{
	        	ccc[cccIndex].serial = serial;
	        	return ref;
	      	}     
	    },

	    /**
	     * unserialize a string
	     * @access private
	     */
	    'unserialize': function unserialize(serial, ccc){

	    	if(typeof ccc ==='undefined'){
	        	ccc = {
	        		'update': function update(ref, instance, obj){
	        			this[ref] = {'src': obj, 'instance': instance, 'ref': ref};
	        		}
	        	};
	      	}

	      	var obj;

	      	if(typeof serial === 'string'){

	      		if(OODKString.startsWith(serial,'/@') && OODKString.endsWith(serial, '/')){
	      			//ref
	      			return ccc[serial].instance;
	    		}else{
	    			obj = JSON.parse(serial);
	        	}
	      	}else{
	        	obj = serial;

	        	for(var i in ccc){
		        	if(ccc[i].src === obj){
		          		return ccc[i].instance;
		        	}
		      	}
	      	
	      	}

	      	if(obj.hasOwnProperty('__type__') && obj.hasOwnProperty('__ref__')){

	        	var tmp;

	        	var constructor = obj.__type__;
	        	var ref = obj.__ref__;

	        	var native = true;

	        	//use primitive type as much a possible
	        	if(constructor === 'Array'){
	          		tmp = [];
	        	}else if(constructor === 'Object'){
	          		tmp = {};
	        	}else if(constructor !== ""){

	        		var klass = OODKNamespace.getDeclaredClasses(OODK, constructor, true);

	        		if(OODKClass.isValid(klass)){

	        			if(!OODKClass.instanceOf(klass, OODK.foundation.Serializable)){
							OODKSystem.throw(OODK.foundation.SerializeNotSupportedException, 'Class '+klass.toString()+' does not implements the interface ' + OODK.foundation.Serializable.toString());
						}
							
						var serial = {
							'serial': obj,
							'ccc': ccc,
							'__serial': true
						}

						tmp = OODKClass.instantiate(klass, serial);

	        			native = false;
	        		}else{

	        			try{
		          			constructor = eval(constructor);
		          			eval('tmp = new constructor();');
		          		}catch(e){
		          			tmp = {};
		          		}
		          	}
	        	}

	        	if(native){
	        		ccc[ref] = {'src': obj, 'instance': tmp, 'ref': ref};

		        	for(var i in obj){
		          		if(i !== '__type__' && i!== '__ref__'){

		            		if(typeof obj[i] === 'object'){
		              			tmp[i] = this.unserialize(obj[i], ccc);
		            		}else if(typeof obj[i] === 'string' && OODKString.startsWith(obj[i], '/@') && OODKString.endsWith(obj[i], '/')){
		              			//ref
		              			tmp[i] = ccc[obj[i]].instance;
		            		}else{
		              			tmp[i] = obj[i];
		            		}
		          		}
		        	}
		        }

	        	return tmp;
	      	}else{
	        	return obj;
	      	}
	    },

		'keywords': {

			'serialize': function serialize(){

				return  OODKAPI.get('Serialization').serialize.apply(OODKAPI.get('Serialization'), arguments);
				
			},

			'unserialize': function unserialize(){

				return OODKAPI.get('Serialization').unserialize.apply(OODKAPI.get('Serialization'), arguments);
				
			}
		}
	});