
OODK('foundation.util', function($, _){
	
	$.public().implements(OODK.foundation.Cloneable).class(function Url($, µ, _){

		$.protected('protocol', "");

		$.protected('hostname', "");

		$.protected('port', "");

		$.protected('search', "");

		$.protected('pathname', "");

		$.protected('hash', "");

		$.public(function __initialize(url){

			url = (OODKObject.isString(url) ? url: window.location.toString());

			µ.parse(url);
		});

		$.protected(function parse(url){

			if(OODKObject.isString(url)){

				var parser = document.createElement('a');

				parser.href = url;
				
				this.setProtocol(parser.protocol);

				this.setHostname(parser.hostname);

				this.setPort(parser.port);

				this.setPathname(parser.pathname);

				this.setHash(parser.hash);

				this.setSearch(parser.search);
			}	
		});

		$.public(function setProtocol(protocol){
			µ.protocol = protocol;
		});

		$.public(function getProtocol(){
			return µ.protocol;
		});

		$.public(function setHostname(hostname){
			µ.hostname = hostname;
		});

		$.public(function getHostname(){
			return µ.hostname;
		});

		$.public(function getHost(){

			var port = (!OODKObject.isEmpty(µ.port)? ':' + µ.port: '');

			return  µ.hostname + port;
		});

		$.public(function setPathname(pathname){

			if(OODKString.startsWith(pathname, '/')){
				pathname = pathname.substring(1, pathname.length);
			}

			µ.pathname = pathname;
		});

		$.protected(function updatePathSegment(index, value, insert){

			if(OODKObject.isInteger(index)){
				
				var segments = µ.pathname.split('/');

				if(index >= 0){

					if(insert === true){
						segments.splice(index, 0, value);
					}else{
						segments[index] = value;
					}
				}else{
					index = (Math.abs(index)-1);

					segments.reverse();

					if(insert === true){
						segments.splice(index, 0, value);
					}else{

						segments[index] = value;
					}

					segments.reverse();
				}

				µ.pathname = segments.join('/');
			}
		});

		$.public(function setPathSegment(index, value){
			return µ.updatePathSegment(index, value, false);
		});

		$.public(function insertPathSegment(index, value){
			return µ.updatePathSegment(index, value, true);
		});

		$.public(function removePathname(){
			µ.pathname = "";
		});

		$.public(function removePathSegment(index){

			if(OODKObject.isInteger(index)){
				
				var segments = µ.pathname.split('/');

				if(index >= 0){

					segments.splice(index, 1);
				}else{
					index = (Math.abs(index)-1);

					segments.reverse();

					segments.splice(index, 1);

					segments.reverse();
				}

				µ.pathname = segments.join('/');
			}
		});

		$.public(function getPathSegment(index){

			var segment;

			if(OODKObject.isInteger(index)){
				
				var segments = µ.pathname.split('/');

				if(index >= 0){
					return segments[index];
				}else{
					index = (Math.abs(index)-1);

					segments.reverse();

					return segments[index];
				}
			}

			return segment;
		});

		$.public(function getPathname(){
			return µ.pathname;
		});

		$.public(function setPort(port){
			µ.port = port;
		});

		$.public(function getPort(){
			return µ.port;
		});

		$.public(function removePort(){
			µ.port = "";
		});

		$.public(function setSearch(search){

			if(OODKString.startsWith(search, '?')){
				search = search.substring(1, search.length);
			}

			µ.search = search;
		});

		$.public(function setSearchFragment(name, value){

			var params = µ.search.split('&');

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

					µ.search = params.join('&');
				}else{
					µ.search += '&' + encodeURIComponent(name) + '=' + encodeURIComponent(value);
				}
			}else{
				µ.search = encodeURIComponent(name) + '=' + encodeURIComponent(value);
			}
		});

		$.public(function removeSearch(){
			µ.search = "";
		});

		$.public(function removeSearchFragment(name){

			var params = µ.search.split('&');

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

					µ.search = params.join('&');
				}
			}
		});

		$.public(function getSearchFragment(key){

			var value;

			if(OODKObject.isString(key)){
				
				var params = µ.search.split('&');

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

		$.public(function getSearch(){
			return µ.search;
		});

		$.public(function setHash(hash){

			if(OODKString.startsWith(hash, '#')){
				hash = hash.substring(1, hash.length);
			}

			µ.hash = hash;
		});

		$.public(function getHash(){
			return µ.hash;
		});

		$.public(function removeHash(){
			µ.hash = "";
		});

		$.public(function getHostname(){
			return µ.hostname;
		});

		$.public(function getOrigin(){
			return µ.protocol + '//' + this.getHost();
		});

		$.protected(function __to(type){

			if(type === String){

				val = µ.pathname;

				var pathname = (!OODKObject.isEmpty(µ.pathname)? '/' + µ.pathname: '');

				var search = (!OODKObject.isEmpty(µ.search)? '?' + µ.search: '');

				var hash = (!OODKObject.isEmpty(µ.hash)? '#' + µ.hash: '');

				return this.getOrigin() + pathname + search + hash;

			}else if(type === OODK.literal){

				var obj = {
					'protocol': µ.protocol,
					'hostname': µ.hostname,
					'port': µ.port,
					'path': [],
					'search': {},
					'hash': µ.hash
				};

				var params = µ.search.split('&');

				if(!OODKObject.isEmpty(params[0])){

					OODKObject.forEach(params, function(param, k,i){
						
						var tmp = param.split('=');

						var value = decodeURIComponent(tmp[1]);

						var key = tmp[0];

						obj.search[key] = value;
					});
				}

				var segments = µ.pathname.split('/');

				if(!OODKObject.isEmpty(segments[0])){

					OODKObject.forEach(segments, function(segment, k,i){
						
						segment = decodeURIComponent(segment);

						obj.path.push(segment);
					});
				}

				return obj;
			}
		});

		$.public(function toString(){
			return µ.__to(String);
		});

		$.static(function($, µ, _){
			
			$.public(function __from(val){

				if(OODKObject.isString(val)){

					var instance = $.new($.ns.Url, val);

					return instance;
				}
			});
		});
	});
});