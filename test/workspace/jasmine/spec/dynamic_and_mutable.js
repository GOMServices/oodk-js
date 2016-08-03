

  OODK('jasmine', function($){

    var b;

    var ClassA = $.dynamic().class(function($, µ, _){
            
      $.public(function test(){

        return "test";
      });

      $.static(function($, µ, _){

        
      });
    });

    var ClassB = $.mutable().class(function($, µ, _){
            
      $.public(function test(){

        return "test";
      });
    });

    var a = $.new(ClassA);

    var b = $.new(ClassB);

    describe("OODK-JS:: dynamic and mutable", function() {

      it("a dynamic instance should be able to add properties in runtime", function() {

        a.b = "test";

        expect(a.b).toEqual("test");
      });

      it("a dynamic instance should not be able to update or delete method in runtime", function() {

        a.test = function(){
          return "polymorph test";
        };

        expect(a.test()).toEqual("test");

        delete a.test;

        expect(function(){ a.test(); }).not.toThrow();
      });

      it("a mutable instance should be able to add properties in runtime", function() {

        b.b = "test";

        expect(b.b).toEqual("test");
      });

      it("a mutable instance should be able to update or delete method in runtime", function() {

        b.test = function(){
          return "polymorph test";
        };

        expect(b.test()).toEqual("polymorph test");

        delete b.test;

        expect(function(){ b.test(); }).toThrow("b.test is not a function");
      });
    });

  });