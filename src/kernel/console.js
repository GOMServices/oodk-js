	
	/**
	 * The Console object handles console features.
	 */
	OODKConsole = {

		'initialize': function initialize(config){

			var callback, mode;

			if(typeof config === 'object'){

				callback = config.callback;

				mode = config.mode;
			}

			if(mode !== "ALWAYS" && typeof console === 'object'){

				if(typeof console.log === 'function'){
					this.log = this.native.log;
				}

				if(typeof console.info === 'function'){
					this.info = this.native.info;
				}else if(typeof callback === 'function'){

					this.info = this.custom(callback, 'info');
				}else{
					this.info = this.log;
				}

				if(typeof console.debug === 'function'){
					this.debug = this.native.debug;
				}else if(typeof callback === 'function'){

					this.debug = this.custom(callback, 'debug');
				}else{
					this.debug = this.log;
				}

				if(typeof console.error === 'function'){
					this.error = this.native.error;
				}else if(typeof callback === 'function'){

					this.error = this.custom(callback, 'error');
				}else{
					this.error = this.log;
				}
			}else if(typeof callback === 'function'){

				this.log = this.custom(callback, 'debug');

				this.info = this.custom(callback, 'info');

				this.debug = this.custom(callback, 'debug');

				this.error = this.custom(callback, 'error');
			}
		},

		'custom': function custom(callback, type){

			return function(){

				var args = OODKObject.toArray(arguments);

				args.unshift(type);

				args.unshift(OODKSyntaxer.factory(undefined, undefined, false));

				return callback.apply(null, args);
			}
		},

		'native': {

			'log': function log(){
				return console.log.apply(console, arguments);
			},

			'info': function info(){
				return console.info.apply(console, arguments);
			},

			'debug': function debug(){
				return console.debug.apply(console, arguments);
			},

			'error': function error(){
				return console.error.apply(console, arguments);
			}

		}
		
	}