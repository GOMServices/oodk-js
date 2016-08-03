
OODK('jasmine', function($, _){

      $.interface(function Itf1($){

        $.abstract('getOne');
      });

      var Itf2 = $.interface(function($){

         $.abstract('getTwo');
      });

      $.public().extends(_.Itf1, Itf2).interface(function Itf3($){

         $.abstract('getThree');
      });

      var Itf4 = $.interface(function($){

         $.abstract('getFor');
      });

      $.abstract().implements(this.Itf3, Itf4).class(function ClassA($, µ, _){
        
        $.public(function getOne(){});

        $.public(function getTwo(){});

        $.abstract('getFive');
      });

      $.public().extends(_.ClassA).class(function ClassB($, µ, _){
        
        $.public(function getThree(){});

        $.public(function getFor(){});

        $.public(function getFive(){});
      });

      var b = $.new(this.ClassB);

      var publicContext = this;

    describe("OODK-JS:: interface and abstract keyword", function() {

      it("trying to declare an interface with a non function should throw a OODK.foundation.SyntaxError", function() {

        var err;

        try{
          var Itf4 = $.interface(false);
        }catch(e){
          err = e;
        }

        expect($.is(err, OODK.foundation.SyntaxError)).toEqual(true);
        expect(err.getMessage()).toEqual('Cannot declare false as an interface');
      });

      it("trying to inherit from a non interface in a declaration scope should throw an error", function() {

        expect(function(){

          var Itf4 = $.extends(_.ClassA).interface(function($){});
        }).toThrowException($, OODK.foundation.SyntaxError ,'Interface anonymous cannot implement OODK.jasmine.ClassA - it is not an interface');
      });

      it("Conversion an interface to a string should get the full qualified name of the interface", function() {

       expect(publicContext['Itf3'].toString()).toEqual('OODK.jasmine.Itf3');
      });

      it("Get the parent interfaces of an interface should be possible using getSuperClass()", function() {

        var struct = $.inspect(b);

        expect(struct.getInterfaces()).toEqual([publicContext.Itf3, Itf4]);
      });

      it("public interface should be accessible through the  public context of the namespace scope", function() {

       expect(typeof publicContext['Itf3'] === 'function').toEqual(true);
       expect(typeof OODK.jasmine['Itf3'] === 'function').toEqual(true);
      });

      it("private interface should be accessible through the private context (_) inside a namespace scope", function() {

       expect(typeof _['Itf1'] === 'function').toEqual(true);
      });

      it("private interface should not be be accessible through the public context of the namespace scope", function() {

        expect(typeof publicContext['Itf1'] === 'undefined').toEqual(true);
        expect(typeof OODK.jasmine['Itf1'] === 'undefined').toEqual(true);
      });

      it("anonymous interface should not be be accessible through the public or private context of the namespace scope", function() {

        expect(typeof publicContext['Itf2'] === 'undefined').toEqual(true);
        expect(typeof _['Itf2'] === 'undefined').toEqual(true);
      });

      it("trying to declare a non function in an interface declaration should throw an error", function() {

        expect(function(){

          var Itf4 = $.interface(function($){

             $.abstract(null);
          });
        }).toThrowException($, OODK.foundation.SyntaxError, 'Interfaces may only include member method name.');
      });

      it("trying to declare an anonymous function in an interface declaration should throw an error", function() {

        expect(function(){

          var Itf4 = $.interface(function($){

             $.abstract('');
          });
        }).toThrowException($, OODK.foundation.SyntaxError, 'Interfaces may not include anonymous member methods.');
      });

      it("trying to instantiate an interface should throw an error", function() {

       expect(function(){ $.new(_.Itf1);}).toThrowException($, OODK.foundation.InstantiationException, 'Cannot instantiate interface OODK.jasmine.Itf1');
      });

      it("class should be able to implements multiple interfaces", function() {

        var struct = $.inspect(b);

        expect(struct.getInterfaces()).toEqual([publicContext.Itf3, Itf4]);
      });

      it("trying to declare an abstract method without specifying the related class as abstract should throw an error", function() {

        expect(function(){

          var Itf4 = $.class(function($){

             $.abstract('test');
          });
        }).toThrowException($, OODK.foundation.SyntaxError, 'Class anonymous contains 1 abstract method and must therefore be declared abstract or implement the remaining methods test()');
      });

      it("trying to inherit from an abstract method which contains an abstract method should throw an error", function() {

        expect(function(){

          $.extends(_.ClassA).class(function($, µ, _){
        
            $.public(function getThree(){});

            $.public(function getFor(){});
          });
        }).toThrowException($, OODK.foundation.SyntaxError, 'Class anonymous contains 1 abstract method and must therefore be declared abstract or implement the remaining methods getFive()');
      });

      it("an abstract method should not be present in the super context when overriding", function() {

        expect(function(){

          var ClassC = $.extends(_.ClassA).class(function($, µ, _){
        
            $.public(function getThree(){});

            $.public(function getFor(){});

             $.public(function getFive(){

              return $.super.getFive();
             });
          });

          var c = $.new(ClassC);

          c.getFive();
        }).toThrowException($, OODK.foundation.TypeError, '$.super.getFive is not a function');
      });

      it("trying to instantiate an abstract class should throw an error", function() {

        expect(function(){ $.new(_.ClassA);}).toThrowException($, OODK.foundation.InstantiationException, 'Cannot instantiate abstract class OODK.jasmine.ClassA');
      });
    });
  });