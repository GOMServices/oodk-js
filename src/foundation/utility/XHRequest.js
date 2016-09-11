
OODK('foundation.util', function($, _){
	
	$.public().implements(OODK.foundation.EventBroadcaster, OODK.foundation.Cloneable).class(function XHRequest($, µ, _){

		$.protected('xmlhttp');

		$.protected('method', 'GET');

		$.protected('url');

		$.protected('asynchrone', true);

		$.protected('data', {});

		$.protected('post', "");

		$.protected('headers', {});

		$.protected('state', 0);

		$.public(function __initialize(url){

			µ.initializeXmlHttp();

			if($.isset(url)){
				this.setUrl(url);
			}
		});

		$.protected(function __clone(cloner){

			this.setUrl(cloner.clone(µ.url));

			µ.initializeXmlHttp();
		});

		$.protected(function initializeXmlHttp(){

			if(window.XMLHttpRequest){
				µ.xmlhttp = new XMLHttpRequest();
			}else{
				µ.xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
			}

			var self = this;

			µ.xmlhttp.onreadystatechange = function(){

				if(this.readyState > 1){
					µ.state = 1;
				}

				if(this.readyState == 4){

					var response = $.new(OODK.foundation.util.XHResponse, this);

					if(response.hasSucceeded()){
						var evt = self.factoryEvent('xhRequest.succeeded');

						evt.setXHResponse(response);

						$.trigger(evt);
					}else{
						var evt = self.factoryEvent('xhRequest.failed');

						evt.setXHResponse(response);

						$.trigger(evt);
					}

					var evt = self.factoryEvent('xhRequest.done');

					evt.setXHResponse(response);

					$.trigger(evt);
				}
			}
		});

		$.public(function __dispatchEvent(evt){});

		$.public(function __approveListener(request){});

		$.public(function __eventConsumed(evt){

			if(evt.getType() == 'xhRequest.send'){
				µ.doSend(evt);
			}
		});

		$.public(function isProceeded(){
			return (µ.state == 1);
		});

		$.public(function isUpdateable(){
			return (µ.state == 0);
		});

		$.protected(function testUpdateable(){

			/*if(!this.isUpdateable()){
				$.throw(OODK.foundation.IllegalStateException, 'Cannot modify the XHRequest - request has already been sent');
			}*/
		});

		$.public(function setUrl(url){

			µ.testUpdateable();

			if(OODKObject.isString(url)){
				µ.url = $.new(OODK.foundation.util.Url, url);
			}else if(OODKObject.instanceOf(url, OODK.foundation.util.Url)){
				µ.url = url;
			}else{
				$.throw(OODK.foundation.IllegalArgumentException, OODKLang.valToString(url) + ' is not a valid url');
			}
		});

		$.public(function getUrl(){
			return µ.url;
		});

		$.public(function setMethod(method){

			µ.testUpdateable();

			if(OODKObject.isString(method) && method.toLowerCase() === 'get' || method.toLowerCase() === 'post'){
				µ.method = method.toUpperCase();
			}else{
				$.throw(OODK.foundation.IllegalArgumentException, OODKLang.valToString(method) + ' is not a valid method');
			}
		});

		$.public(function async(){

			µ.testUpdateable();

			µ.asynchrone = true;
		});

		$.public(function sync(){

			µ.testUpdateable();

			µ.asynchrone = false;
		});

		$.public(function isAsync(){
			return (µ.asynchrone === true);
		});

		$.public(function setCustomData(key, value){

			µ.testUpdateable();

			µ.data[key] = value;
		});

		$.public(function getCustomData(key){
			return µ.data[key];
		});

		$.public(function setPost(post){

			µ.testUpdateable();

			µ.post = post;
		});

		$.public(function setPostFragment(name, value){

			µ.testUpdateable();

			var params = µ.post.split('&');

			if(!OODKObject.isEmpty(params[0])){

				var key;

				OODKObject.forEach(params, function(param, k,i){
					
					var tmp = param.split('=');

					if(decodeURIComponent(tmp[0]) === name){

						key = i;

						return false;
					}
				});

				if(typeof key !== 'undefined'){

					params[key] = name + '=' + encodeURIComponent(value);

					µ.post = params.join('&');
				}else{
					µ.post += '&' + encodeURIComponent(name) + '=' + encodeURIComponent(value);
				}
			}else{
				µ.post = encodeURIComponent(name) + '=' + encodeURIComponent(value);
			}
		});

		$.public(function getPost(){
			return µ.post;
		});

		$.public(function getPostFragment(key){

			var value;

			if(OODKObject.isString(key)){
				
				var params = µ.post.split('&');

				if(!OODKObject.isEmpty(params[0])){

					OODKObject.forEach(params, function(param, k,i){
						
						var tmp = param.split('=');

						if(decodeURIComponent(tmp[0]) === key){

							value = decodeURIComponent(tmp[1]);

							return false;
						}
					});

					return value;
				}
			}

			return value;
		});

		$.public(function removePost(){

			µ.testUpdateable();

			µ.post = "";
		});

		$.public(function removePostFragment(name){

			µ.testUpdateable();

			var params = µ.post.split('&');

			if(!OODKObject.isEmpty(params[0])){

				var key;

				OODKObject.forEach(params, function(param, k,i){
					
					var tmp = param.split('=');

					if(decodeURIComponent(tmp[0]) === name){

						key = i;

						return false;
					}
				});

				if(typeof key !== 'undefined'){

					params.splice(key, 1);

					µ.post = params.join('&');
				}
			}
		});

		$.public(function setContentType(type){
			this.setHeader("Content-type", type);
		});

		$.public(function getContentType(){
			return µ.headers["Content-type"];
		});

		$.public(function getHeader(type){
			return µ.headers[type];
		});

		$.public(function setHeader(key, value){

			µ.testUpdateable();

			µ.headers[key] = value;
		});

		$.public(function factoryEvent(evtType){
			
			var evt = $.new(OODK.foundation.util.XHRequestEvent, evtType, this);

			evt.sync();

			return evt;
		});

		$.public(function send(){

			var evt = this.factoryEvent('xhRequest.send');

			evt.setCancelable(true);

			$.trigger(evt);
		});

		$.protected(function doSend(evt){

			if(µ.xmlhttp.readyState !== 0 && µ.xmlhttp.readyState !== 4){
				OODKSystem.throw(OODK.foundation.IllegalStateException, 'Cannot send the XmlHttpRequest - request is  being proceeded')
			}

			if(!OODKObject.isEmpty(µ.post)){

				µ.method = 'POST';

				this.setContentType('application/x-www-form-urlencoded');
			}

			µ.xmlhttp.open(µ.method, µ.url, µ.asynchrone);

			OODKObject.forEach(µ.headers, function(v, k, i){

				µ.xmlhttp.setRequestHeader(k, v);
			});

			if(!OODKObject.isEmpty(µ.post)){
				µ.xmlhttp.send(µ.post);
			}else{
				µ.xmlhttp.send(null);
			}
		});
	});
});