
OODK('foundation.util', function($, _){
	
	$.public().class(function RemoteProxy($, µ, _){

		$.protected('context');

		$.protected('args');

		$.protected('result');

		$.protected('methodName');

		$.protected('url');

		$.protected('callbacks', {});

		$.protected('e');

		$.public(function __initialize(url){
			this.setUrl(url);
		});

		$.public(function setContext(context){
			µ.context = context;
		});

		$.public(function getContext(){
			return µ.context;
		});

		$.public(function setMethodName(methodName){
			µ.methodName = methodName;
		});

		$.public(function getMethodName(){
			return µ.methodName;
		});

		$.public(function setArguments(args){
			µ.args = args;
		});

		$.public(function getArguments(){
			return µ.args;
		});

		$.public(function setResult(result){
			µ.result = result;
		});

		$.public(function getResult(){
			return µ.result;
		});

		$.public(function setUrl(url){
			µ.url = url;
		});

		$.public(function getUrl(){
			return µ.url;
		});

		$.public(function setError(e){
			µ.e = e;
		});

		$.public(function hasError(){
			return $.isset(µ.e);
		});

		$.public(function getError(){
			return µ.e;
		});

		$.public(function beforeSend(callback){

			var self = this;

			var _callback = function(){
				callback.apply(self, [this]);

				if(this.isAsync()){
					$.throw(OODK.foundation.UnsupportedOperationException, 'Asynchronous RemoteProxy request are not supprorted')
				}
			}

			µ.callbacks['beforeSend'] = _callback;
		});

		$.public(function onComplete(callback){

			var self = this;

			var _callback = function(xhresponse){
				callback.apply(self, [xhresponse]);
			}

			µ.callbacks['onComplete'] = _callback;
		});

		$.public(function send(){
			
			var xhrequest = $.new(OODK.foundation.util.XHRequest, µ.url);

			xhrequest.sync();

			xhrequest.beforeSend(µ.callbacks['beforeSend']);

			xhrequest.onComplete(µ.callbacks['onComplete']);

			xhrequest.send();
		});
	});
});