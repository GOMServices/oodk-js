	
	
	OODKAPI.factory('Threading', {

		'initialize': function initialize(){

			OODKImporter.import([
				'{oodk}/foundation/utility/Thread',
				'{oodk}/foundation/utility/ThreadEvent'
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

		'lock': function lock(lockId, callback){

			var env = OODKSystem.environment;

			var DedicatedThread = OODKNamespace.getDeclaredClasses(OODK.foundation.util, 'OODK.foundation.util.DedicatedThread', true, false);

			if(OODKClass.instanceOf(env, DedicatedThread)){

				OODKResource.invoke(env, 'lock', [lockId, callback]);
			}else{
				OODKResource.invoke(OODK.foundation.util.Thread, 'lock', [lockId, callback]);
			}
		},

		'unlock': function unlock(lockId){

			var env = OODKSystem.environment;

			var DedicatedThread = OODKNamespace.getDeclaredClasses(OODK.foundation.util, 'OODK.foundation.util.DedicatedThread', true, false);

			if(OODKClass.instanceOf(env, DedicatedThread)){

				OODKResource.invoke(env, 'unlock', [lockId]);
			}else{
				OODKResource.invoke(OODK.foundation.util.Thread, 'unlock', [lockId]);
			}
		},

		'keywords': {

			'lock': function lock(){
				return OODKAPI.get('Threading').lock.apply(OODKAPI.get('Threading'), arguments);	
			},

			'unlock': function unlock(){
				return OODKAPI.get('Threading').unlock.apply(OODKAPI.get('Threading'), arguments);	
			}
		}
	});