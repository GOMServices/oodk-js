	
	
	OODKAPI.factory('Conversion', {

		'initialize': function initialize(){

			var syntaxer = xmlHttp.data.syntaxer;

			OODKObject.forEach(this.keywords, function(def, name){

				if(!OODKSyntaxer.use.hasOwnProperty(name)){
					OODKSyntaxer.use[name] = def;
				}

				if(!syntaxer.hasOwnProperty(name)){
					syntaxer[name] = def;
				}
			});
		},

		'to': function to(val, type){

			var r;

			if(OODKInstance.isValid(val)){
				r = OODKResource.invoke(val, '__to', [type]);
			}

			if(typeof r === 'undefined' && val !== null && typeof val !== 'undefined' && typeof val.__to === 'function'){
				r = val.__to.apply(val, [type]);
			}

			if(typeof r === 'undefined'){

				if(OODKClass.isValid(type)){
					r = OODKResource.invoke(type, '__from', [val]);
				}else if(val !== null && typeof val !== 'undefined'){

					var constructor = type;

					if(type === true || type === false){
						constructor = Boolean;
					}if(type === 'int' || type === 'float'){
						constructor = Number;
					}if(type === 'literal'){
						constructor = Object;
					}

					if(typeof constructor.prototype === 'object' && typeof constructor.prototype.__from === 'function'){
						r = constructor.prototype.__from(val);
					}
				}
			}

			if(typeof r === 'undefined'){

				if(type === String){
					r = OODKAPI.get('Conversion').toString(val);
				}else if(type === Boolean){
					r = OODKAPI.get('Conversion').toBool(val);
				}else if(type === Number){
					r = OODKAPI.get('Conversion').toNumber(val);
				}else if(type === Array){
					r = OODKAPI.get('Conversion').toArray(val);
				}else if(type === Date){
					r = OODKAPI.get('Conversion').toDate(val);
				}else if(type === Object){
					r = OODKAPI.get('Conversion').toLiteral(val);
				}else if(type === true){
					r = OODKAPI.get('Conversion').toTrue(val);
				}else if(type === false){
					r = OODKAPI.get('Conversion').toFalse(val);
				}else if(type === OODK.int){
					r = OODKAPI.get('Conversion').toInt(val);
				}else if(type === OODK.float){
					r = OODKAPI.get('Conversion').toFloat(val);
				}else if(type === 'literal'){
					r = OODKAPI.get('Conversion').toLiteral(val);
				}else{
					//OODKSystem.throw(OODK.foundation.IllegalArgumentException, ['to: argument type ' + type + ' is not a supported']);
				}
			}

			if(typeof r === 'undefined'){
				OODKSystem.throw(OODK.foundation.ClassCastException, ['Cannot convert '+(typeof val ==='string'? '"'+val+'"': OODKInstance.isValid(val)? ('instance of class ' + OODKResource.get(val, 'constructor').toString()): val)+' to '+(OODKClass.isValid(type)? type.toString() : (typeof type === 'function') ? type.name: type)+'.']);
			}else{
				return r;
			}
		},

		'toString': function toString(val){

			return String(val);
		},

		'toBool': function toBool(val){

			if(typeof val === 'string'){
				val = val.toLowerCase().trim();
			}

			return (val === 'false')? false: (val === 'true') ? true: Boolean(val);
		},

		'toNumber': function toNumber(val){
			val =  Number(val);

			return (OODKObject.isNumber(val)) ? val: undefined;
		},

		'toInt': function toInt(val){
			val = parseInt(val);

			return (OODKObject.isInteger(val)) ? val: undefined;
		},

		'toFloat': function toFloat(val){

			val =  parseFloat(val);

			return (OODKObject.isFloat(val) || OODKObject.isInteger(val)) ? val: undefined;
		},

		'toDate': function toDate(val){
			val =  Date.parse(val);

			return (OODKObject.isNumber(val)) ? new Date(val): undefined;
		},

		'toArray': function toArray(val){

			if(OODKObject.isLiteral(val)){
				val =  OODKObject.toArray(val);
			}else if(val !== null && typeof val !== 'undefined'){
				val = Array.from(val);
			}

			return (OODKObject.isArray(val)) ? val: undefined;
		},

		'toLiteral': function toLiteral(val){

			if(val === null || typeof val === 'undefined'){
				return;
			}

			var v = {};

			var keys = Object.keys(val);

			for(var i=0;i<keys.length;i++){
				v[''+keys[i]] = val[keys[i]];
			}

			return v;
		},

		'keywords': {

			'to': function to(val, type){
				return OODKAPI.get('Conversion').to(val, type);
			},

			'toString': function toString(val){
				return OODKAPI.get('Conversion').to(val, String);
			},

			'toBool': function toBool(val){
				return OODKAPI.get('Conversion').to(val, Boolean);
			},

			'toNumber': function toNumber(val){
				return OODKAPI.get('Conversion').to(val, Number);
			},

			'toInt': function toInt(val){
				return OODKAPI.get('Conversion').to(val, 'int');
			},

			'toFloat': function toFloat(val){
				return OODKAPI.get('Conversion').to(val, 'float');
			},

			'toDate': function toDate(val){
				return OODKAPI.get('Conversion').to(val, Date);
			},

			'toArray': function toArray(val){
				return OODKAPI.get('Conversion').to(val ,Array);
			},

			'toLiteral': function toLiteral(val){
				return OODKAPI.get('Conversion').to(val, 'literal');
			}
		}
	});