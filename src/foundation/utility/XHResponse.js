
OODK('foundation.util', function($, _){
	
	$.public().class(function XHResponse($, µ, _){

		$.protected('request');

		$.protected('rawRequest');

		$.protected('status');

		$.protected('responseText');

		$.protected('contentType');

		$.public(function __initialize(request){

			µ.rawRequest = OODKResource.getProperty(request, 'xmlhttp');

			µ.request = request;

			µ.status = µ.rawRequest.status;

			µ.responseText = µ.rawRequest.responseText;

			µ.contentType = µ.rawRequest.getResponseHeader('Content-type');
		});

		$.public(function hasSucceeded(){
			return (this.getStatus() == 200);
		});

		$.public(function hasFailed(){
			return !this.hasSucceeded();
		});

		$.public(function get(){

			if(µ.contentType === 'application/json'){
				return JSON.parse(this.getText());
			}else{
				return µ.responseText;
			}
		});

		$.public(function getRaw(){
			return µ.response;
		});

		$.public(function getText(){
			return µ.responseText;
		});

		$.public(function getRequest(){
			return µ.request;
		});

		$.public(function getStatus(){
			return µ.status;
		});

		$.public(function getCustomData(key){
			return µ.data[key];
		});

		$.public(function getPost(){
			return µ.post;
		});

		$.public(function getPostFragment(key){
			return µ.post[key];
		});

		$.public(function getContentType(){
			return µ.contentType;
		});
	});
});