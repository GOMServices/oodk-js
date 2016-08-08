if(typeof window === 'undefined'){

	var OODK;
}

(function(namespace){

	/**
	 * Evaluate the string passed as argument in the sandbox. 
	 * Sandbox does not have access to the kernel.
	 * All external script of the OODK  kernel or the foundation namespace should be loaded in the sandBox 
	 */
	function sandBox(str, xmlHttp){
		eval(str);
	}

	/**
	 * OODK kernel scope
	 */
	(function kernel(){

		/**
		 * The current release number. 
		 */
		var RELEASE_NUMBER = "0.1";

		/**
		 * Global var for OODK system classess. 
		 */
		var OODKStack, OODKConsole, OODKAOP, OODKResource, OODKClass, OODKInstance, OODKContext, OODKClassMember, OODKInterface, OODKSyntaxer, OODKAPI, reservedKeywords, OODKNamespace, OODKKeywords;

		/**
		 * OODKObject: store common features for objects. 
		 */
		var OODKObject = {

			/**
			 * Convert an iterable value to an array
			 */
			'toArray': function toArray(val){

				if(val === null || typeof val === 'undefined'){
					return;
				}

				var v = [];

				var keys = Object.keys(val);

				for(var i=0;i<keys.length;i++){
					v.push(val[keys[i]]);
				}

				return v;
			},

			/**
			 * Merge into the first object passed as argument sucessing object arguments
			 */
			'merge': function merge(obj){
				

				for(var i=1; i<arguments.length; i++ ){

					var src = arguments[i];

					OODKObject.forEach(src, function(v, k){

						obj[k] = v;
					});
				}
			},

			/**
			 * Declare a property to be non enumerable
			 */
			'declarePropertyNonEnumerable': function declarePropertyNonEnumerable(obj, name, value){

				return Object.defineProperty(obj, name, {
					enumerable: false,
					configurable: true,
					writable: true,

					value: value
				});
			},

			/**
			 * Declare a property to be non enumerable
			 */
			'defineConstant': function defineConstant(obj, name, value){

				return Object.defineProperty(obj, name, {
					enumerable: true,
					configurable: false,
					writable: false,

					value: value
				});
			},

			/**
			 * Iterates over any iterable js type
			 */
			'forEach': function forEach(obj, callback, context){

				if(obj !== null && typeof obj !== 'undefined'){

					context = (typeof context !== 'undefined')? context: obj;

					var keys = Object.keys(obj);

					for(var i = 0; i<keys.length; i++){

						if(callback.apply(context, [obj[keys[i]], keys[i], i]) === false){
							return false;
						}
					}

					return true;
				}

				return false;
			},

			/**
			 * Test if the value is defined: undefined, NanN and destroyed objects are considered to be undefined
			 */
			'isset': function isset(obj){

				if(OODKObject.isLiteral(obj) && Object.isFrozen(obj)){

					return false;

				}else if(typeof obj === 'undefined' || Number.isNaN(obj)){
					return false;
				}

				return true;
			},

			/**
			 * Test if a value is of the type passed as argument
			 */
			'is': function is(val, type){
				
				if(OODKClass.isValid(type)){
					return (OODKInstance.isValid(val) && (OODKResource.get(val, 'constructor') === type));
				}else if(type === OODK.int){
					return OODKObject.isInteger(val);
				}else if(type === OODK.float){
					return OODKObject.isFloat(val);
				}else if(type === OODK.void){
					return !OODKObject.isset(val);
				}else if(type === OODK.literal){
					return OODKObject.isLiteral(val);
				}else if(OODKObject.isInstanceOf(type)){
					return OODKClass.instanceOf(val, type[1][0]);
				}else if(OODKObject.isArrayOf(type)){
					return OODKObject.arrayOf(val, type[1]);
				}else if(typeof val !== 'undefined' && val !== null && val.constructor === type){
					return true;
				}else{
					return false;
				}
			},

			'isInstanceOf': function isInstanceOf(val){
				return(Array.isArray(val) && val.length === 2 && val[0] === 'instanceOf');
			},

			'isArrayOf': function isArrayOf(val){
				return(Array.isArray(val) && val.length === 2 && val[0] === 'array');
			},

			'arrayOf': function arrayOf(val, type){

				var isTypeOf = true;

				OODKObject.forEach(val, function(v, k){

					var ito = false;
					
					OODKObject.forEach(type, function(t, i){

						if(OODKObject.is(v, t)){
							ito = true;
							return false;
						}
					});

					if(!ito){
						isTypeOf = false;
						return false;
					}
				});

				return isTypeOf;
			},

			'instanceOf': function instanceOf(val, type){
				return OODKClass.instanceOf(val, type);
			},

			/**
			 * Test if a value is a string
			 */
			'isString': function isString(val){
				return (typeof val === 'string');
			},

			/**
			 * Test if a value is iterable
			 */
			'isIterable': function isIterable(obj){

				try{
					return Array.isArray(Object.keys(obj));
				}catch(e){
					return false;
				}
			},

			/**
			 * Test if a value is empty
			 */
			'isEmpty': function isEmpty(val){

				var emptyInstance = function(){

					if(OODKInstance.isValid(val)){

						var res = OODKResource.get(val);

						for(var i in res.instance){
							if(typeof res.instance[i] !== 'function' && !OODKString.startsWith(i, '__')){
								return false;
							}
						}

						for(var i in res.protectedContext){
							if(typeof res.protectedContext[i] !== 'function' && !OODKString.startsWith(i, '__')){
								return false;
							}
						}

						for(var i in res.privateContext){
							if(typeof res.privateContext[i] !== 'function' && !OODKString.startsWith(i, '__')){
								return false;
							}
						}

						return true;
					}else{
						return false;
					}
				};

				return ((typeof val === 'string' && val.trim() === "") || 
					typeof val === 'undefined' || 
					val === null ||
					( typeof val === 'object' && Object.keys(val).length === 0) ||
					Number.isNaN(val) ||
					emptyInstance()
				);
			},

			/**
			 * Test if a value is an array
			 */
			'isArray': function isArray(val){
				return (Array.isArray(val));
			},

			/**
			 * Test if a value is a function
			 */
			'isFunc': function isFunc(val){
				return (typeof val === 'function');
			},

			/**
			 * Test if a value is a boolean
			 */
			'isBool': function isBool(val){

				if(typeof val === 'string'){
					val = val.toLowerCase().trim();
				}

				return (typeof val === 'boolean' || val === 'true' || val === 'false');
			},

			/**
			 * Test if a value is a false
			 */
			'isFalse': function isFalse(val){

				if(typeof val === 'string'){
					val = val.toLowerCase().trim();
				}

				return (val === false || val === 'false');
			},

			/**
			 * Test if a value is true
			 */
			'isTrue': function isTrue(val){

				if(typeof val === 'string'){
					val = val.toLowerCase().trim();
				}

				return (val === true || val === 'true');
			},

			/**
			 * Test if a value is an object lietral
			 */
			'isLiteral': function isLiteral(val){
				return (typeof val === 'object' && val !== null && val.constructor === Object && !OODKInstance.isValid(val));
			},

			/**
			 * Test if a value is an object
			 */
			'isObject': function isObject(val){
				return (typeof val === 'object' && val !== null);
			},

			/**
			 * Test if a value is a number
			 */
			'isNumber': function isNumber(val){

				/*if(typeof val === 'string' ){
					val = Number(val);
				}*/

				return (typeof val === 'number'  && !isNaN(val));
			},

			/**
			 * Test if a value is an integer
			 */
			'isInteger': function isInteger(val) {

				/*if(typeof val === 'string' ){
					val = Number(val);
				}*/

			    return typeof val === "number" &&
			           isFinite(val) &&
			           Math.floor(val) === val &&
			           !isNaN(val);
			},

			/**
			 * Test if a value is a float
			 */
			'isFloat': function isFloat(val){

				/*if(typeof val === 'string' ){
					val = Number(val);
				}*/

				return (typeof val === 'number' && !isNaN(val) && !OODKObject.isInteger(val));
			},

			/**
			 * Test if value is a date
			 */
			'isDate': function isDate(val){
				return (typeof val === 'object' && val.constructor === Date);
			},

			/**
			 * Test if a value is null
			 */
			'isNull': function isNull(val){
				return (val === null);
			},

			/**
			 * Test if a value is undefined
			 */
			'isUndefined': function isUndefined(val){
				return (typeof val === 'undefined');
			},

			/**
			 * Assign a default value to a variable if 
			 */
			'default': function _default(val, defaultVal, test){
				
				if(typeof test === 'function'){

					var r = test(val);

					if(r === true){
						return r;
					}else{
						return defaultVal;
					}
				}if(typeof test === 'boolean'){

					if(test === true){
						return val;
					}else{
						return defaultVal;
					}
				}else {
					if(OODKObject.isset(val)){
						return val;
					}else{
						return defaultVal;
					}
				}
			},

			'sort': function sort(obj){

				;
			},

			/**
			 * Perform a shallow copy of all properties of an object
			 */
			'clone': function clone(obj){

				if(typeof obj === 'object' && obj !== null){

					var cln;

					if(Array.isArray(obj)){
						cln = [];
					}else if(obj.constructor.name === 'Object'){
						cln = {};
					}else{
						cln = new obj.constructor();
					}

					cln = Object.assign(cln, obj);

					return cln;
				}else{
					return obj;
				}
			},

			'invoke': function invoke(obj, method, args){

				if(typeof obj === 'object'){

					if(typeof method === 'string'){

						if(typeof obj[method] === 'function'){
							return obj[method].apply(obj, args);
						}
					}else if(typeof method === 'function'){

						return method.apply(obj, args);
					}
				}
			}
		}

		/**
		 * OODKString: store common features for string manipulation. 
		 */
		var OODKString = {

			/**
			 * Test if the string starts with the substring.
			 */
			'startsWith': function startsWith(str, substr) {
				 return (str.indexOf(substr)===0);
			},

			/**
			 * Test if the string ends with the substring.
			 */
			'endsWith': function endsWith(str, substr) {
				 return (str.lastIndexOf(substr) === (str.length - substr.length));
			},

			/**
			 * Extract the left part of a substring start at the first index found.
			 */
			'left': function left(str, substr) {
				return str.substr(0, str.indexOf(substr));
			},

			/**
			 * Extract the right part of a substring start at the first index found.
			 */
			'right': function right(str, substr) {
				return str.substr(str.indexOf(substr)+substr.length);
			},

			/**
			 * Extract the left part of a substring start at the last index found.
			 */
			'leftBack': function leftBack(str, substr) {

				if(str.lastIndexOf(substr)>-1){
				  	return str.substr(0, str.lastIndexOf(substr));
				}
			},

			/**
			 * Extract the right part of a substring start at the last index found.
			 */
			'rightBack': function rightBack(str, substr) {

				if(str.lastIndexOf(substr)>-1){
				  	return str.substr(str.lastIndexOf(substr)+substr.length);
				}
			},

			/**
			 * Extract a substring between two substrings
			 */
			'middle': function middle(str, substr1, substr2) {
	  
				var r = OODKString.right(str, substr1);

				if(r){
					return OODKString.leftBack(r, substr2);
				}
			},

			/**
			 * Extract the name of a function
			 */
			'getFuncName': function getFuncName(fn, namespace){

				str = fn.toString();

				var right = str.substr(str.indexOf(" ")+" ".length);
				
				if(right){

					var fnName = right.substr(0, right.indexOf("("));

					if(fnName){

						if(namespace && typeof namespace.toString === 'function'){
							return namespace.toString()+'.'+fnName;
						}else{
							return fnName;
						}
					}else{
						return 'anonymous';
					}
				}else{
					return 'anonymous';
				}
			}
		}

		/**
		 * OODKXhr handles xhr requests features
		 */
		var OODKXhr = {

			/**
			 * Factory for the xhr
			 */
			'factory': function xhr(file, method, data, asynch, oncomplete, extra){

				var xmlhttp;

				if(typeof XMLHttpRequest !== 'undefined'){
					xmlhttp = new XMLHttpRequest();
				}else{
					xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
				}

				var self = this;

				xmlhttp.onreadystatechange = function(){

					if(this.readyState == XMLHttpRequest.DONE){

						if(typeof oncomplete == 'function'){
							oncomplete.apply(null, [this]);
						}
					}
				}

				xmlhttp.data = extra;

				xmlhttp.isSuccess = function(){
					return (this.status == 200);
				}

				return xmlhttp;
			},

			/**
			 * default error handler when a request has failed
			 */
			'defaultErrorHandler': function defaultOnError(xmlHttp){

				if(xmlHttp.status == 404 || xmlHttp.status == 0){

					var args = [OODK.foundation.FileNotFoundException];

					if(typeof xmlHttp.data === 'object'){
						args.push(xmlHttp.data.file);
					}

					OODKSystem.throw.apply(OODKSystem, args);
				}
			},

			/**
			 * execute an xhr
			 */
			'load': function load(file, method, data, asynch, oncomplete, errorHandler, extra){

				method = (typeof method == 'string')? method: 'GET';

				if(method.toLowerCase() === 'get' && typeof data === 'string'){
					file += '?' + data;
				}
				if(typeof oncomplete !== 'function'){

					oncomplete = function(xmlHttp){

						if(!xmlHttp.isSuccess()){

							self.defaultErrorHandler(xmlHttp);
						}
					};				
				}

				var self = this;

				var xmlHttp;

				if(asynch){

					var p = new Promise(function(resolve){

						xmlHttp = OODKXhr.factory(file, method, data, asynch, function(xmlHttp){

							resolve(xmlHttp);

						}, extra);

						xmlHttp.open(method, file, asynch);
						xmlHttp.send(data);
					});

					p.then(oncomplete).catch(function(e){
						if(typeof errorHandler === 'function'){
							
							errorHandler.apply(null, [e, xmlHttp]);
						}else{
							try{
								OODKSystem.throw(e);
							} catch(e){

								OODKConsole.error(e.toString());
							}
						}
					});

					
				}else{

					try{
						xmlhttp = OODKXhr.factory(file, method, data, asynch, function(xmlHttp){

							oncomplete.apply(null, [xmlHttp]);
						}, extra);

						xmlhttp.open(method, file, asynch);
						xmlhttp.send(data);
					}catch(e){
						if(typeof errorHandler === 'function'){
							errorHandler.apply(null, [e, xmlHttp]);
						}else{
							OODKSystem.errorHandler(e);
						}
					}
				}
			},

			/**
			 * Load a javascript file and evaluate the content.
			 */
			'script': function script(file, async, data, oncomplete, errorHandler){

				var self = this;

				return OODKXhr.load(file, 'GET', {}, async, function(xmlHttp){

					if(xmlHttp.isSuccess()){

						var ctx;

						try{

							if(typeof xmlHttp.data === 'object'){

								ctx = xmlHttp.data.context;

								ctx.__file = xmlHttp.data.file;
								ctx.__import = xmlHttp.data.import;

								if(OODKString.startsWith(ctx.__import, '{oodk}')){

									eval(xmlHttp.responseText);
								}else{
									sandBox(xmlHttp.responseText, xmlHttp);
								}

								delete ctx.__file;
							}else{

								sandBox(xmlHttp.responseText);
							}

							

						}catch(e){

							if(e.name === 'SyntaxError' || e.name === 'TypeError'){

								//console.log(ctx.__import, ctx);
								ctx.list[xmlhttp.data.import].security = false;

								//we capture syntax error as we want to display the exact line and file of the error. 

								if(typeof window !== 'undefined'){
									var script = document.createElement('script');
									script.setAttribute('type', 'text/javascript');
									script.setAttribute('src', xmlhttp.data.file);

									document.getElementsByTagName('head')[0].appendChild(script);
									document.getElementsByTagName('head')[0].removeChild(script);
								}
							}

							OODKSystem.errorHandler(e, xmlHttp.data.file);
						}

					}else{

						self.defaultErrorHandler(xmlHttp);
					}

					if(typeof oncomplete == 'function'){
						oncomplete.apply(null, [xmlHttp]);
					}
				}, errorHandler, data);
			},

			/**
			 * Load a css file and load it in the current page header.
			 */
			'css': function css(file, async, data, oncomplete, errorHandler){

				var self = this;

				return OODKXhr.load(file, 'GET', {}, async, function(xmlHttp, success){

					if(xmlHttp.isSuccess()){
						var css = document.createElement('link');
						css.setAttribute('rel', 'stylesheet');
						css.setAttribute('type', 'text/css');
						css.setAttribute('href', file);

						document.getElementsByTagName('head')[0].appendChild(css);
					}else{
						self.defaultErrorHandler(xmlHttp);
					}

					if(typeof oncomplete == 'function'){
						oncomplete.apply(null, [xmlHttp]);
					}
				}, errorHandler, data);
			}
		}

		/**
		 * The OODKPackager class handles package definition.
		 */
		var OODKPackager = {

			list: {},
			
			/**
			 * Define a new package
			 */
			add: function(name, files){

				if(this.list.hasOwnProperty(name)){
					OODKSystem.throw(OODK.foundation.PackageDefinitionException, name + ': a package with name already exists');
				}

				this.list[name] = files;
			},

			/**
			 * Append files to an existing package
			 */
			append: function(name, files){

				if(!this.list.hasOwnProperty(name)){
					OODKSystem.throw(OODK.foundation.PackageDefinitionException, 'package ' + name + 'is not defined');
				}
				
				OODKObject.merge(this.list[name], files);
			},

			/**
			 * Test if this package is defined
			 */
			has: function(name){
				return this.list.hasOwnProperty(name);
			},

			/**
			 * Get a a package by its name
			 */
			get: function(name){
				return this.list[name];
			}
		}

		/**
		 * The OODKImporter class handles files and package importation and their dependencies.
		 */
		var OODKImporter = {

			/**
			 * Model to store all imports and their dependencies.
			 */
			list: {},

			/**
			 * Define a dependency to an import.
			 */
			addDependency: function(file, dependencies){

				if(typeof dependencies === 'string'){
					dependencies = [dependencies];
				}

				if(!this.list.hasOwnProperty(file)){
					this.list[file] = {
						'dependencies': [],
						'loaded': false
					}
				}

				var self  =this;

				Object.keys(dependencies).forEach(function(v,i){

					if(self.list[file].dependencies.indexOf(dependencies[i]) === -1){
						self.list[file].dependencies.push(dependencies[i]);
					}
				});
			},

			/**
			 * Retrieve all dependencies for an import.
			 */
			getDependency: function(file){

				if(this.list.hasOwnProperty(file)){
					return this.list[file].dependencies;
				}
			},

			/**
			 * Load dependencies for an import.
			 */
			loadDependencies: function(file){

				if(this.has(file) && this.list[file].dependencies.length>0){

					var self = this;

					Object.keys(this.list[file].dependencies).forEach(function(v, i){

						self.import(self.list[file].dependencies[i]);
					});
				}		
			},

			/**
			 * Load a script using an xmlhttp request. Dependencies are always loaded sychronously, 
			 * but "top imports" can be loaded asynchronously if a callback is specified.
			 */
			loadFile: function(file, async, callback){

				this.loadDependencies(file);

				if(!async){

					this.__file = this.resolve(file);

					var data = {'context': this, 'import': file, 'file': this.__file, 'syntaxer': this.__syntaxer};

					if(OODKString.endsWith(this.__file, '.css')){
						OODKXhr.css(this.__file, false, data);
					}else{
						OODKXhr.script(this.__file, false, data);
					}

					this.list[file].loaded = true;

					delete this.__file;
				}else{

					var f = this.resolve(file);

					var self = this;

					var data = {'context': this, 'import': file, 'file': f, 'syntaxer': this.__syntaxer};

					if(OODKString.endsWith(f, '.css')){

						OODKXhr.css(f, true, data, function(xmlHttp){

							if(xmlHttp.isSuccess()){

								self.list[xmlHttp.data.import].loaded = true;

								self.asyncFilesDone++;

								if(self.asyncFilesDone>=self.asyncFiles.length){
									callback.apply(null, []);
								}
							}
						});
					}else{
						OODKXhr.script(f, true, data, function(xmlHttp){

							if(xmlHttp.isSuccess()){

								self.list[xmlHttp.data.import].loaded = true;

								self.asyncFilesDone++;

								if(self.asyncFilesDone>=self.asyncFiles.length){
									callback.apply(null, []);
								}
							}
						});
					}
				}
			},

			/**
			 * Is the import is defined.
			 */
			has: function(file){
				return (this.list.hasOwnProperty(file));
			},

			/**
			 * Is the import is already loaded.
			 */
			loaded: function(file){
				return (this.has(file) && this.list[file].loaded === true);
			},

			/**
			 * Resolve an import path using the Config class.
			 */
			resolve: function(file){

				if(!OODKString.endsWith(file, '.js') && !OODKString.endsWith(file, '.css')){
					file+='.js';
				}

				var paths = OODKConfiger.get('path');

				while(file.indexOf('{') > -1){

					var key = OODKString.left( OODKString.right(file, '{'), '}' );

					if(paths.hasOwnProperty(key)){
						file = file.replace('{'+key+'}', paths[key]);
					}else{

						OODKSystem.throw(OODK.foundation.IllegalArgumentException, 'Cannot resolve path "' + file + '", "{' + key+ '}" is not defined');
					}

				}

				return file;
			},

			/**
			 * Load all imports. Import can be a file or a package.
			 */
			loadFiles: function(files, async){

				if(Array.isArray(files[0])){
					files = files[0];
				}

				for(var i=0; i<files.length; i++){

					var file = files[i];

					if(!this.loaded(file)){

						if(!this.has(file)){

							this.list[file] = {
								'dependencies': [],
								'loaded': false,
								'security': true
							}
						}

						this.loadDependencies(file);

						if(OODKString.startsWith(file, '[') && OODKString.endsWith(file, ']')){
							//package

							var pkg = OODKPackager.get(OODKString.middle(file, '[', ']'));

							if(!pkg){
								throw 'package '+file+' is not defined';
							}else{

								for(var j=0; j<pkg.length; j++){

									var pkgFile = pkg[j];

									if(!this.has(pkgFile)){

										this.list[pkgFile] = {
											'dependencies': [],
											'loaded': false,
											'security': true
										}
									}

									if(!this.loaded(pkgFile)){

										if(OODKString.startsWith(pkgFile, '[') && OODKString.endsWith(pkgFile, ']')){
											this.import(pkgFile);
										}else{

											if(!async){
												this.loadFile(pkgFile, async);
											}else{
												this.asyncFiles.push(pkgFile);
											}
										}
									}
								}
							}
						}else{
							if(!async){
								this.loadFile(file, async);
							}else{
								this.asyncFiles.push(file);
							}
						}
					}else{
						if(async){
							this.asyncFiles.push(file);
						}
					}
				}
			},
			
			/**
			 * Import files to OODK.
			 */
			import: function _import(){

				var async = false;

				var files;

				if(arguments.length == 2 && typeof arguments[1] === 'function'){

					files = arguments[0];

					var callback = arguments[1];

					if(typeof files === 'string'){
						files = [files];
					}

					async = true;

					this.asyncFiles = [];

					this.loadFiles(files, true);

					this.asyncFilesDone = 0;

					for(var i=0; i<this.asyncFiles.length; i++){
						this.loadFile(this.asyncFiles[i], true, callback);
					}
				}else{
					files = arguments;

					this.loadFiles(files, false);
				}				
			}
		}

		/**
		 * OODKSystem handles all features related to the system: throwing error, logging
		 */
		var OODKSystem = {

			'environment': null,

			'getEnvType': function getEnvType(){
				
				if(typeof window !== 'undefined' && navigator && document){
					return 'browser';
				}else if(typeof importScripts !== 'undefined'){
					return 'webworker';
				}
			},

			/**
			 * Log message in the console
			 */
			'log': function log(obj, msg){

				if(typeof msg === 'string'){
					msg = 'log: '+ msg;
				}else{
					msg = 'log';
				}

				trace = OODKStack.getTrace(msg, this.scope(), 4);

				OODKConsole.log(trace.msg + ' (' + trace.file + ':' + trace.line + ')');

				OODKConsole.log.apply(console, [obj]);
			},

			/**
			 * Log message in the console
			 */
			'info': function info(obj, msg){

				if(typeof msg === 'string'){
					msg = 'info: '+ msg;
				}else{
					msg = 'info';
				}

				trace = OODKStack.getTrace(msg, this.scope(), 4);

				OODKConsole.info(trace.msg + ' (' + trace.file + ':' + trace.line + ')');

				OODKConsole.info.apply(console, [obj]);
			},

			'debug': function debug(obj, msg){

				if(typeof msg === 'string'){
					msg = 'debug: '+ msg;
				}else{
					msg = 'debug';
				}

				trace = OODKStack.getTrace(msg, this.scope(), 4);

				OODKConsole.debug(trace.msg + ' (' + trace.file + ':' + trace.line + ')');

				OODKConsole.debug.apply(console, [obj]);
			},

			'error': function error(obj, msg){

				if(typeof msg === 'string'){
					msg = 'error: '+ msg;
				}else{
					msg = 'error';
				}

				trace = OODKStack.getTrace(msg, this.scope(), 4);

				OODKConsole.error(trace.msg + ' (' + trace.file + ':' + trace.line + ')');

				OODKConsole.error.apply(console, [obj]);
			},

			/**
			 * The default handler after catching an error
			 */
			'errorHandler': function errorHandler(e, trace, throwError){

				if(OODKAPI.isLoaded('Debugger')){
					OODKAPI.get('Debugger').stop();
				}

				//console.log(e, e.stack);

				if(typeof OODK.foundation === 'object' && typeof  OODK.foundation.Exception === 'function'){

					var err = OODK.foundation.Exception.self.autoFactory(e, trace);

					if(typeof trace === 'object'){
						err.addToStack(trace);
					}

					throwError = OODKObject.default(throwError, true);

					if(throwError){
						OODKSystem.throw(err);
					}else{
						return err;
					}
				}else{
					console.log(e.stack)
					throw e;
				}
			},

			/**
			 * Throw an error
			 */
			'throw': function throwError(klass){

				if(OODKAPI.isLoaded('Debugger')){
					OODKAPI.get('Debugger').stop();
				}

				OODKResource.resetMagicMarker();

				OODKKeywords.reset();

				var e;

				var args = OODKObject.toArray(arguments);

				var context;

				if(typeof this.scope === 'function'){
					context = this.scope();
				}

				if(typeof klass === 'string'){
					var e = OODKClass.apply(OODK.foundation.Exception, args);
					e.setNativeStack(OODKStack.factory());

					if(context){
						e.addToStack(OODKStack.getTrace("throw", context, 4));
					}
				}else if(OODKClass.isValid(klass)){

					args.shift();

					var e = OODKClass.apply(klass, args);

					e.setNativeStack(OODKStack.factory());

					if(context){
						e.addToStack(OODKStack.getTrace("throw", context, 4));
					}

				}else if(typeof klass === 'object'){
					var e = klass;
				}

				if(e){
					throw e;
				}
			},

			/**
			 * Load the default AOP advisor 
			 */
			'aop': function aop(){

				OODKAOP.advisor.factory('before', '*', '*', function(target){

					var traceContext;

					var context = target.getContext();

					var name = target.getMethodName();

					if(target.getType() === 'method'){
						traceContext = [context, '.', name];
					}else{
						traceContext = name;

						if(typeof context.scope === 'function'){
							context = context.scope();
						}
					}

					trace = OODKStack.getTrace(traceContext, context, 9);

					target.setContextValue('trace', trace);
				});

				OODKAOP.advisor.factory('afterCatch', '*', '*', function(target){

					OODKSystem.errorHandler(target.getError(), target.getContextValue('trace'));
				});

				
			}
		}

		var OODKEventHandler = {

			'callbackList': {},

			'trigger': function triggerEvent(type){

				type = 'on' + type;

				if(OODKEventHandler.callbackList.hasOwnProperty(type)){

					var args = OODKObject.toArray(arguments);

					args.shift();

					OODKObject.forEach(OODKEventHandler.callbackList[type], function(callback){
						callback.apply(null, args);
					});
				}
			},

			'on': function onEvent(type, callback){

				type = 'on' + type;

				if(!OODKEventHandler.callbackList.hasOwnProperty(type)){
					OODKEventHandler.callbackList[type] = [];
				}

				OODKEventHandler.callbackList[type].push(callback);
			}
		}

		/**
		 * OODKAPI handles features related to APIs
		 */
		var OODKAPI = {

			/**
			 * Model storage for API
			 */
			list: {},

			/**
			 * Test if an API is loaded
			 */
			isLoaded: function isLoaded(name){
				return (this.list.hasOwnProperty(name) && this.list[name].loaded === true);
			},

			/**
			 * Generates a new API
			 */
			factory: function add(name, instance){

				this.list[name] = {
					'instance': instance, 
					'loaded': true
				}

				if(typeof instance.initialize === 'function'){
					instance.initialize.apply(instance, []);
				}
			},

			/**
			 * Get the api corresponding to the given name
			 */
			get: function getList(name){

				if(this.isLoaded(name)){
					return this.list[name].instance;
				}
			},

			/**
			 * Get all API
			 */
			getAll: function getList(){
				return this.list;
			}
		}

		var OODKLang = {
			'valToString': function toString(val){

				if(typeof val === 'string'){
					return '"' + val + '"';
				}else if(typeof val === 'undefined' || val === null){
					return "" + val;
				}else if(OODKInstance.isValid(val)){
					return 'object('+OODKResource.get(val, 'constructor').toString()+')';
				}else {
					return val.constructor.name + '(' + val + ')';
				} 
			},

			'typeToString': function toString(type){

				if(OODKClass.isValid(type) || OODKInterface.isValid(type)){
					return type.toString();
				}else if(OODKObject.isInstanceOf(type)){
					return 'instance of '+type[1][0].toString();
				}else if(OODKObject.isArrayOf(type)){
					return 'array of '+type[1].join(' or ');
				}else if(type === OODK.void){
					return 'void';
				}else if(type === OODK.int){
					return 'int';
				}else if(type === OODK.float){
					return 'float';
				}else if(type === OODK.literal){
					return 'object literal';
				}else{
					return OODKString.getFuncName(type);
				}
			}
		}

		/**
		 * OODKConfiger handle the OODK base configuration
		 */
		var OODKConfiger = {

			/**
			 * Model to store configuration.
			 */
			_config: {},

			/**
			 * Set a new parameter
			 * key can be a short or a deep path
			 */
			set: function set(key, value){

				if(typeof key === 'string'){

					var _root = this._config;

					var tmp = key.split('.');

					key = tmp.pop();

					for(var i in tmp){

						if(!_root.hasOwnProperty(tmp[i])){
							_root[tmp[i]] = {};
						}

						_root = _root[tmp[i]];
					}

					_root[key] = value;

					delete tmp, _root;
				}else if(typeof key === 'object'){
					OODKConfiger.check(key, true);

					this._config = key;
				}
			},

			/**
			 * Get a parameter. 
			 * Key can be a deep path i.e '<key1>.<key2>'
			 */
			get: function get(key, defaultValue){

				if(arguments.length === 0){
					return this._config;
				}

				var root = this._config;
				  
				var path = key.split('.');
				  
				for(var i=0; i<path.length; i++){

					var _key = path[i];
					
					if(!root.hasOwnProperty(_key)){
						return defaultValue;
					}

					root =  root[_key];
				}

				return root;
			},

			/**
			 * Check the configuration is valid.
			 * Throw an error if throwError argument is set to true.
			 */
			check: function check(config, throwError){

				throwError = ((typeof throwError !== 'undefined')? throwError: true);

				if(typeof config === 'object'){

					if(!config.hasOwnProperty('path') || !config.path.hasOwnProperty('oodk')|| !config.path.hasOwnProperty('workspace')){

						if(throwError){
							throw 'environment is in incorrect state: the oodk source path or the workspace source path is not defined';
						}else{
							return false;
						}
					}

					if(!config.hasOwnProperty('debug')){
						config.debug = false;
					}

					config.release = RELEASE_NUMBER;
				}else{
					if(throwError){
						throw 'environment is in incorrect state: the oodk source path or the workspace source path is not defined';
					}else{
						return false;
					}
				}

				return true;
			}
		}

		if((OODKSystem.getEnvType() == 'browser' && typeof window.OODK !== 'undefined')){
			OODKSystem.throw("Cannot start OODK: the OODK global var is already defined.");
		}

		/**
		 * Public context of OODK
		 */
		var _OODK = function(namespace, fn){

			OODKConfiger.check(OODKConfiger._config, true);

			var r;

			var file = OODKImporter.__file;

			try{
				r = OODKNamespace.declare.apply(OODKNamespace, arguments);
			}catch(e){

				var err = OODKSystem.errorHandler(e,  file, false);

				var config = OODKConfiger.get('errorHandler');

				if(typeof config !== 'undefined'){

					config.callback(OODKSyntaxer.factory(undefined, undefined, false), err);
				}else{
					OODKSystem.throw(e);
				}
			}

			return r;
		}

		OODKObject.defineConstant(_OODK, 'int', 'int');

		OODKObject.defineConstant(_OODK, 'float', 'float');

		OODKObject.defineConstant(_OODK, 'void', 'undefined');

		OODKObject.defineConstant(_OODK, 'literal', 'literal');

		OODKObject.defineConstant(_OODK, 'instanceOf', function(){
			return ['instanceOf', OODKObject.toArray(arguments)];
		});

		OODKObject.defineConstant(_OODK, 'arrayOf', function(){
			return ['array', OODKObject.toArray(arguments)];
		});

		/*_OODK.onReady = function onReady(callback){

			if(typeof OODKSystem.environment !== null){
				OODKSystem.environment.onReady(callback)
			}else{
				window.onload = OODK(callback);
			}
		}*/ 

		_OODK.config = function config(config){

			if(!OODKConfiger.check(OODKConfiger._config, false)){

				OODKConfiger.check(config, true);

				OODKConfiger.set(config);

				OODKImporter.import('[kernel]');

				OODKConsole.initialize(OODKConfiger.get('console'));

				var root = OODKNamespace.factory('OODK', undefined, OODK);

				var structure = OODKResource.inspect(root);

				structure.file = OODKConfiger.get('path.oodk')+'/oodk';

				reservedKeywords = {
					'class': [],
					'member': []
				}

				Object.keys(OODK).forEach(function(v, i){
					
					reservedKeywords.class.push(v);
				});

				//OODKAOP.define('keyword', OODKNamespace.declare, OODKNamespace, 'namespace');

				OODKNamespace.factory('default', root);

				OODKSystem.aop();

				OODKKeywords.reset();

				OODKImporter.import('{oodk}/lib/json2', '[foundation.exceptions]');

				if(OODKSystem.getEnvType() === 'webworker'){
					//web worker

					OODKImporter.import('{oodk}/api/Serialization', '{oodk}/api/Event','{oodk}/api/Threading', '{oodk}/foundation/utility/DedicatedThread');

					var DedicatedThread = OODKNamespace.getDeclaredClasses(OODK.foundation.util, 'OODK.foundation.util.DedicatedThread', true, false);
					
					OODKSystem.environment = OODKClass.instantiate(DedicatedThread);

				}else if(OODKSystem.getEnvType() === 'browser'){
					// browser
					OODKSystem.environment = window;

					/*window.onload = function(){

						OODKEventHandler.trigger('ready');
					};*/
				}else{
					throw 'environment not supported by OODK';
				}

				OODKKeywords.reset();
			}else{
				OODKSystem.throw(OODK.foundation.IllegalStateException, 'the config path is already defined');
			}
		}

		// export OODK
		if(typeof window !== 'undefined'){
			window.OODK = _OODK;
		}else{
			OODK = _OODK;
		}

		/**
		 * global package definition
		 */

		/**
		 * package for the kernel
		 */
		OODKPackager.add('kernel', [
			'{oodk}/kernel/resource',
			'{oodk}/kernel/context',
			'{oodk}/kernel/class',
			'{oodk}/kernel/class.member',
			'{oodk}/kernel/interface',
			'{oodk}/kernel/instance',
			'{oodk}/kernel/stack',
			'{oodk}/kernel/namespace',
			'{oodk}/kernel/keywords',
			'{oodk}/kernel/syntaxer',
			'{oodk}/kernel/aop',
			'{oodk}/kernel/console'
		]);

		OODKPackager.add('kernel.api', [
			'{oodk}/api/Cloning',
			'{oodk}/api/Debugger',
			'{oodk}/api/Iteration',
			'{oodk}/api/Reflection',
			'{oodk}/api/Serialization',
			'{oodk}/api/Conversion',
			'{oodk}/api/Typing',
			'{oodk}/api/Comparison',
			'{oodk}/api/Sort',
			'{oodk}/api/Event',
			'{oodk}/api/Threading'
		]);

		OODKPackager.add('util.ajax', [
			'{oodk}/foundation/utility/Url',
			'{oodk}/foundation/utility/XHRequest',
			'{oodk}/foundation/utility/XHResponse'
		]);

		/**
		 * define dependencies for foundation
		 */
		OODKImporter.addDependency('{oodk}/foundation/exception/Exception', '{oodk}/foundation/exception/Throwable');
		OODKImporter.addDependency('{oodk}/foundation/exception/Error', '{oodk}/foundation/exception/Throwable');

		OODKImporter.addDependency('{oodk}/foundation/exception/RangeError', '{oodk}/foundation/exception/Error');
		OODKImporter.addDependency('{oodk}/foundation/exception/EvalError', '{oodk}/foundation/exception/Error');
		OODKImporter.addDependency('{oodk}/foundation/exception/URIError', '{oodk}/foundation/exception/Error');
		OODKImporter.addDependency('{oodk}/foundation/exception/SyntaxError', '{oodk}/foundation/exception/Error');
		OODKImporter.addDependency('{oodk}/foundation/exception/TypeError', '{oodk}/foundation/exception/Error');
		OODKImporter.addDependency('{oodk}/foundation/exception/ReferenceError', '{oodk}/foundation/exception/Error');
		OODKImporter.addDependency('{oodk}/foundation/exception/NetworkError', '{oodk}/foundation/exception/Error');

		OODKImporter.addDependency('{oodk}/foundation/exception/IllegalAccessException', '{oodk}/foundation/exception/Exception');
		OODKImporter.addDependency('{oodk}/foundation/exception/IllegalOperationException', '{oodk}/foundation/exception/Exception');
		OODKImporter.addDependency('{oodk}/foundation/exception/IllegalStateException', '{oodk}/foundation/exception/Exception');
		OODKImporter.addDependency('{oodk}/foundation/exception/IllegalArgumentException', '{oodk}/foundation/exception/Exception');
		OODKImporter.addDependency('{oodk}/foundation/exception/ClassCastException', '{oodk}/foundation/exception/Exception');
		OODKImporter.addDependency('{oodk}/foundation/exception/InstantiationException', '{oodk}/foundation/exception/Exception');
		OODKImporter.addDependency('{oodk}/foundation/exception/SecurityException', '{oodk}/foundation/exception/Exception');
		OODKImporter.addDependency('{oodk}/foundation/exception/FileNotFoundException', '{oodk}/foundation/exception/Exception');
		OODKImporter.addDependency('{oodk}/foundation/exception/NoSuchElementException', '{oodk}/foundation/exception/Exception');
		OODKImporter.addDependency('{oodk}/foundation/exception/PackageDefinitionException', '{oodk}/foundation/exception/Exception');
		OODKImporter.addDependency('{oodk}/foundation/exception/UnsupportedOperationException', '{oodk}/foundation/exception/Exception');
		
		/**
		 * define the foundation excpetions package 
		 */
		OODKPackager.add('foundation.exceptions', [
			'{oodk}/foundation/exception/URIError',
			'{oodk}/foundation/exception/EvalError',
			'{oodk}/foundation/exception/RangeError',
			'{oodk}/foundation/exception/SyntaxError',
			'{oodk}/foundation/exception/TypeError',
			'{oodk}/foundation/exception/ReferenceError',
			'{oodk}/foundation/exception/NetworkError',
			'{oodk}/foundation/exception/IllegalAccessException',
			'{oodk}/foundation/exception/IllegalOperationException',
			'{oodk}/foundation/exception/IllegalStateException',
			'{oodk}/foundation/exception/IllegalArgumentException',
			'{oodk}/foundation/exception/ClassCastException',
			'{oodk}/foundation/exception/InstantiationException',
			'{oodk}/foundation/exception/SecurityException',
			'{oodk}/foundation/exception/FileNotFoundException',
			'{oodk}/foundation/exception/PackageDefinitionException',
			'{oodk}/foundation/exception/UnsupportedOperationException',
		]);
	})();
})(OODK);