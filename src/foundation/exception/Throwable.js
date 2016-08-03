
OODK('foundation', function($, _){
	
	$.public().abstract().extends(Error).class(function Throwable($, µ, _){

		$.protected('message');

		$.protected('heapStack');

		$.protected('stack');

		$.public(function __initialize(message){
			
			µ.message = message;

			µ.heapStack = [];

			$.super.__initialize(message);
			
		});

		$.public(function setNativeStack(stack){

			µ.stack = stack;
		});

		$.public(function addToStack(trace){

			if(typeof trace === 'object'){
			
				µ.heapStack.push(trace);
			}
		});

		$.public(function getStack(){
			return µ.heapStack;
		});

		$.public(function setMessage(msg){
			µ.message = msg;
		});

		$.public(function getMessage(){
			return µ.message;
		});

		$.protected(function getFuncName(fn, namespace){

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
		});

		$.public(function toString(){

			var msg = [];

			msg.push(OODKResource.get(this, 'constructor').toString());

			msg.push(" ");

			msg.push(µ.message);

			msg.push(" ");

			if(µ.heapStack.length>0){

				OODKObject.forEach(µ.heapStack, function(trace, i){

					msg.push("at "+ trace.msg + ' (' + trace.file + ':' + trace.line + ')');
				});
			}

			/*if(typeof µ.stack !== 'undefined'){
				msg.push("\n");

				msg.push(µ.stack);
			}*/

			return msg.join("\n");
		});

		$.static(function($, µ, _){

			$.public(function autoFactory(e, trace){

				if(!OODKClass.instanceOf(e, $.ns.Throwable)){

					var err;
					
					if(e.name === 'SyntaxError'){
						err = $.new(OODK.foundation.SyntaxError, [e.message]);
					}else if(e.name === 'TypeError'){
						err = $.new(OODK.foundation.TypeError, [e.message]);
					}else if(e.name === 'ReferenceError'){
						err = $.new(OODK.foundation.ReferenceError, [e.message]);
					}else if(e.name === 'NetworkError'){
						err = $.new(OODK.foundation.NetworkError, [e.message]);
					}else{
						err = $.new(OODK.foundation.Exception, [e.message]);
					}

					var stack = OODKStack.parse(e.stack);

					err.setNativeStack(stack);

					err.addToStack(OODKStack.getTrace("", trace, 0, stack));

					return err;
				}else{
					return e;
				}

			});
		})
	});
});