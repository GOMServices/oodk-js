

  OODK('jasmine', function($){

    $.import('{oodk}/foundation/utility/Url');

    var url = $.new(OODK.foundation.util.Url, 'http://localhost.com:8080/path/to/file?a=10&b=test#name')

    describe("OODK-JS:: foundation.util.URL", function() {

      it("convert an url to a literal object should be {}", function() {

        expect($.to(url, OODK.literal)).toEqual({protocol : 'http:', hostname : 'localhost.com', port : '8080', path : [ 'path', 'to', 'file' ], search : { a : '10', b : 'test' }, hash : 'name'});
      });

      it("protocol should be http", function() {
        expect(url.getProtocol()).toEqual('http:');
      });

      it("hostname should be localhost.com", function() {
        expect(url.getHostname()).toEqual('localhost.com');
      });

      it("port should be 8080", function() {
        expect(url.getPort()).toEqual('8080');
      });

      it("pathname should be 'path/to/file'", function() {
        expect(url.getPathname()).toEqual('path/to/file');
      });

      it("getSearch should be 'a=10&b=test'", function() {
        expect(url.getSearch()).toEqual('a=10&b=test');
      });

      it("getSearchFragment should be 'path/to/file'", function() {
        expect(url.getSearchFragment('a')).toEqual('10');
      });

      it("getHash should be 'name'", function() {
        expect(url.getHash()).toEqual('name');
      });

      it("removeHash should be 'http://localhost.com:8080/path/to/file?a=10&b=test'", function() {

      	url.removeHash();

        expect(url.toString()).toEqual('http://localhost.com:8080/path/to/file?a=10&b=test');
      });

      it("removeSearchFragment('a') should be 'http://localhost.com:8080/path/to/file?b=test'", function() {

      	url.removeSearchFragment('a');

        expect(url.toString()).toEqual('http://localhost.com:8080/path/to/file?b=test');
      });

      it("setSearchFragment('c', 'false') should be 'http://localhost.com:8080/path/to/file?b=test'", function() {

      	url.setSearchFragment('c', 'false');

        expect(url.toString()).toEqual('http://localhost.com:8080/path/to/file?b=test&c=false');
      });

      it("removeSearch should be 'http://localhost.com:8080/path/to/file'", function() {

      	url.removeSearch();

        expect(url.toString()).toEqual('http://localhost.com:8080/path/to/file');
      });

      it("removePathname should be 'http://localhost.com:8080'", function() {

      	url.removePathname();

        expect(url.toString()).toEqual('http://localhost.com:8080');
      });

      it("setPathname('new/path') should be 'http://localhost.com:8080/new/path'", function() {

      	url.setPathname('new/path');

        expect(url.toString()).toEqual('http://localhost.com:8080/new/path');
      });

      it("insertPathSegment(0, 'a') should be 'http://localhost.com:8080/a/new/path'", function() {

      	url.insertPathSegment(0, 'a');

        expect(url.toString()).toEqual('http://localhost.com:8080/a/new/path');
      });

      it("insertPathSegment(-1, 'long') should be 'http://localhost.com:8080/a/new/path'", function() {

      	url.insertPathSegment(-1, 'to');

        expect(url.toString()).toEqual('http://localhost.com:8080/a/new/path/to');
      });

      it("removePathSegment(1) should be 'http://localhost.com:8080/a/path/to'", function() {

      	url.removePathSegment(1);

        expect(url.toString()).toEqual('http://localhost.com:8080/a/path/to');
      });

      it("removePathSegment(-2) should be 'http://localhost.com:8080/a/to'", function() {

      	url.removePathSegment(-2);

        expect(url.toString()).toEqual('http://localhost.com:8080/a/to');
      });

      it("getPathSegment(0) should be 'http://localhost.com:8080/a/to'", function() {

        expect(url.getPathSegment(0)).toEqual('a');
      });

      it("getPathSegment(-1) should be 'http://localhost.com:8080/a/to'", function() {

        expect(url.getPathSegment(-1)).toEqual('to');
      });

      it("getHost() should be 'localhost.com:8080'", function() {

        expect(url.getHost()).toEqual('localhost.com:8080');
      });

      it("getOrigin() should be 'http://localhost.com:8080'", function() {

        expect(url.getOrigin()).toEqual('http://localhost.com:8080');
      });
    
    });

  });