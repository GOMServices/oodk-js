	
	/**
	 * OODK Stack handles the memory stack
	 */
	OODKStack = {

		/**
		 * Parse the stack error and return a js object.
		 * Tested only with Chrome.
		 * @acess private
		 */
		'parse': function parse(stack, index){

			if(typeof stack !== "string"){
				return [];
			}

			index = (typeof index === 'number') ? index: -1;

			var _stack = [];

			var lines = stack.split("\n");

			lines.shift();

			var j = 0;

			for(var i in lines){

				var line = lines[i];
				var matches = line.match(/\([\s\S]*\)/g);

				if(!matches){
					matches = [line];
				}

				if(matches.length>0){

					if((index !== -1 && j === index) || index === -1){

						var tmp = matches[0].replace('(', '').replace(')', '');

						var l = tmp.split(':');

						var chr = l.pop();
						var ln = l.pop();
						var url = l.join(':').replace('at', "").trim();
						var file = url.substr(url.lastIndexOf('/')+1);
						var at = (OODKString.left(OODKString.right(line, 'at'), '(')).trim();

						var trace = {'line': ln, 'char': chr, 'url': url, 'file': file, 'at': at, 'raw': line};

						if(index !== -1 && j === index){
							return trace;
						}else{
							_stack.push(trace);
						}
					}

					j++;
				}
			}

			return _stack;
		},

		/**
		 * Generate a stack trace by faking an error 
		 */
		'factory': function factory(index){

			var stack;

			try{
				throw new Error();
			}catch(e){

				index = (typeof index === 'number') ? index: -1;

				stack = OODKStack.parse(e.stack, index);

				if(index === -1){
					stack.shift();
				}else{
					return stack;
				}
			}

			return stack;
		},

		'getTrace': function getTrace(msg, scope ,stackIndex, stack){

			var struct, klass, file, line;

			if(Array.isArray(msg)){

				var _msg = [];

				OODKObject.forEach(msg, function(v, k){

					if(OODKInstance.isValid(v)){

						klass = OODKResource.get(v, 'constructor');

						var klassName = klass.toString();

						_msg.push((klassName === 'anonymous'? 'Class <'+klassName+'>': klassName));

					}else if(OODKClass.isValid(v)){

						klass = v;

						var klassName = klass.toString();

						_msg.push((klassName === 'anonymous'? 'Class <'+klassName+'>': klassName));

					}else{
						_msg.push(v.toString());
					}
				});

				msg = _msg.join("");
			}

			var fl = OODKStack.getFileLine(scope, stackIndex, stack);

			return {'msg': msg, 'file': fl[0], 'line': fl[1]};
		},

		'getFileLine': function getFileLine(scope, stackIndex, stack){

			stackIndex = (typeof stackIndex === 'number') ? stackIndex: 0;

			var struct, file, line;

			if(typeof scope === 'object'){

				if(OODKInstance.isValid(scope)){
					struct = OODKResource.inspect(OODKResource.get(scope, 'constructor'));
				}else if(OODKClass.isValid(scope)){
					struct = OODKResource.inspect(scope);
				}
			}else if(typeof scope === 'string'){

				struct = {'file': scope};
			}

			var trace;

			if(typeof stack === 'undefined'){
				trace = OODKStack.factory(stackIndex);
			}else{
				trace = stack[stackIndex];
			}

			line = trace.line;

			file = (typeof struct === 'object' && typeof struct.file === 'string')? struct.file: (typeof trace === 'object')? '[current]' : "";  

			return [file, line];
		}
	}