	
	
	OODKAPI.factory('Asynchrone', {

		'initialize': function initialize(){

			OODKImporter.import([
				'{oodk}/foundation/interface/Asynchronable'
			]);

			OODKObject.forEach(this.keywords.declare.member, function(def, name){

				if(!OODKSyntaxer.declare.member.hasOwnProperty(name)){
					OODKSyntaxer.declare.member[name] = def;
				}
			});

			OODKObject.forEach(this.keywords.declare.static, function(def, name){

				if(!OODKSyntaxer.declare.static.hasOwnProperty(name)){
					OODKSyntaxer.declare.static[name] = def;
				}
			});

			OODKObject.forEach(this.keywords.define.member, function(def, name){

				if(!OODKSyntaxer.define.member.hasOwnProperty(name)){
					OODKSyntaxer.define.member[name] = def;
				}
			});

			OODKObject.forEach(this.keywords.define.static, function(def, name){

				if(!OODKSyntaxer.define.static.hasOwnProperty(name)){
					OODKSyntaxer.define.static[name] = def;
				}
			});
		},

		'keywords': {

			'declare': {

				'member': {

					'async': function async(){
		    			this.__async = true;
		    			return this;
		    		}
				},

				'static': {

					'async': function returnInt(){
		    			this.__async = true;
		    			return this;
		    		}
				}
			},

			'define': {

				'member': {

					'async': function async(){
		    			return this;
		    		}
				},

				'static': {

					'async': function async(){
		    			return this;
		    		}		
				}
			}
		}
	});