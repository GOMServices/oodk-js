
OODK('foundation.util', function($, _){
	
	$.public().class(function XHResponse($, µ, _){

		$.protected('request');

		$.protected('rawRequest');

		$.protected('status');

		$.protected('responseText');

		$.public(function __initialize(xmlhttp){

			µ.rawRequest = xmlhttp;

			µ.status = µ.rawRequest.status;

			µ.responseText = µ.rawRequest.responseText;
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

		$.public(function getContentType(){
			return this.getHeader('Content-type');
		});

		$.public(function getHeader(type){
			return µ.rawRequest.getResponseHeader(type);
		});
	});
});