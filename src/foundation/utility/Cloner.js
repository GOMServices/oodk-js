
OODK('foundation.util', function($, _){
	
	$.public().final().class(function Cloner($, µ, _){

		$.private('source');

		$.private('clone');

		$.private('ccc');

		$.public(function __initialize(source, ccc){

			_.source = source;

			_.ccc = ccc;

			_.generic();
		});

		$.private(function generic(){

			if(!Array.isArray(_.ccc)){
				_.ccc = [];
			}

			//test for circular cycling reference
			var ref;

    		Object.keys(_.ccc).some(function(v, i){

				if(_.ccc[v].src === _.source){
					ref = _.ccc[v].clone;
					return true;
				}
			});

			if(ref){
				_.clone = ref;
			}else{

				if(OODKInstance.isValid(_.source)){

					var klass = OODKInstance.getClass(_.source);

					if(!OODKClass.instanceOf(_.source, OODK.foundation.Cloneable)){
						OODKSystem.throw(OODK.foundation.CloneNotSupportedException, 'Class '+klass.toString()+' does not implements the interface ' + OODK.foundation.Cloneable.toString(), this, arguments);
					}

					var resource = OODKResource.get(_.source);

					var clone = {
						'instance': _.source,
						'context': resource.protectedContext,
						'localContext': resource.privateContextes,
						'ccc': _.ccc,
						'cloner': this,
						'__clone': true
					}

					_.clone = OODKClass.instantiate(klass, clone);
		    	}else{

		    		_.clone = new _.source.constructor();

					_.ccc.push({'src': _.source, 'clone': _.clone});

					OODKObject.forEach(_.source, function(v,k){
						_.clone[k] = _.source[k];
					});

					if(typeof _.clone.__clone === 'function'){
						_.clone.__clone.apply(_.clone, [this]);
					}
		    	}
		    }
		});

		$.public(function clone(value){

			return OODKAPI.get('Cloning').clone(value, _.ccc);
		});

		$.public(function get(){

			return _.clone;
		});
	});
});