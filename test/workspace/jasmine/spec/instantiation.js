
OODK('jasmine', function($, _){

    var Foo = $.class(function($, µ, _){

      $.public('a');

      $.public(function __initialize(a){
        this.a = a;
      });
    });

    $.public().class(function Bar($, µ, _){});

    var ClassProtected = function($, µ, _){

      $.private(function __initialize(){});

      $.static(function($, µ, _){

        $.public(function instantiateOnError(){
          return $.new(ClassProtected2);
        });

         $.public(function instantiate(){
          return $.new(ClassProtected);
        });
        
      });
    }

    $.class(ClassProtected);

    var ClassProtected2 = function($, µ, _){

      $.protected(function __initialize(){});
    }

    $.class(ClassProtected2);

    var ClassC = $.class(function($, µ, _){

      $.public(function test(){

        return "test";
      });

      $.static(function($, µ, _){

        $.public(function mutation(){

          _.mutate = function(){
            return "mutation";
          };

          return _.mutate();
        });
      });
    });
    var c = $.new(ClassC);

    var publicContext = this;

    describe("OODK-JS:: instantitation", function() {

      it("instantiate a native js type should be possible", function() {

        var f = $.new(String, 'test');

        expect(f).toEqual('test');
      });

      it("instantiate a native js function should be possible", function() {

        var ExternalClass = function(a){
          this.a = a;
        }

        var f = $.new(ExternalClass, false);

        expect(f.a).toEqual(false);
      });

      it("instantiate a class should call the __initialize method", function() {

        var f = $.new(Foo, 10);

        expect(f.a).toEqual(10);
      });

      it("instantiate a class without __initialize method should not throw an error", function() {

        expect(function(){$.new(OODK.jasmine.Bar)}).not.toThrow();
      });

      it("instantiate a class using a string representation of its full qualified name should be possible", function() {

        expect(function(){$.new('OODK.jasmine.Bar')}).not.toThrow();
        expect($.inspect($.new('OODK.jasmine.Bar')).getClass()).toEqual(OODK.jasmine.Bar);
      });

      it("instantiate a class with a dynamic number of arguments should be done through invoke", function() {

        var f = $.invoke(Foo, [10]);

        expect(f.a).toEqual(10);
      });

      it("trying to instantiate a class with a private __initialize method should throw an error", function() {

        var ClassOnError = function($, µ, _){

          $.private(function __initialize(){});
        }

        $.class(ClassOnError);

        expect(function(){ $.new(ClassOnError);}).toThrowException($, OODK.foundation.IllegalAccessException, 'Call to private anonymous::__initialize() from invalid context');
      });

      it("trying to instantiate a class with a protected __initialize method should throw an error", function() {

        var ClassOnError = function($, µ, _){

          $.protected(function __initialize(){});
        }

        $.class(ClassOnError);

        expect(function(){ $.new(ClassOnError);}).toThrowException($, OODK.foundation.IllegalAccessException, 'Call to protected anonymous::__initialize() from invalid context');
      });

      it("trying to instantiate a class with a protected __initialize method should throw an error if called from different static class context", function() {

        expect(function(){ ClassProtected.self.instantiateOnError();}).toThrowException($, OODK.foundation.IllegalAccessException, 'Call to protected anonymous::__initialize() from invalid context');
      });

      it("trying to instantiate a class with a private __initialize method from the static context should not throw an error", function() {

        expect(function(){ ClassProtected.self.instantiate();}).not.toThrow();
      });

      it("call new with undefined value should throw an Exception", function() {

        expect(function(){ $.new(undefined)}).toThrowException($, OODK.foundation.InstantiationException, 'undefined is not a constructor');
      });

      it("it should not be possible to add properties in runtime", function() {

        c.b = "test";

        expect(c.b).toEqual(undefined);
      });

      it("it should not be possible to add, update or delete method in runtime", function() {

        c.test = function(){
          return "polymorph test";
        };

        expect(c.test()).toEqual("test");

        delete c.test;

        expect(function(){ c.test(); }).not.toThrow();
      });

      it("it should not be possible to add, update or delete a private static member in runtime", function() {

        expect(function(){ClassC.self.mutation()}).toThrow("_.mutate is not a function");
      });
    });
  });