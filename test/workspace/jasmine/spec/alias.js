
  OODK('jasmine', function($, _){


    describe("OODK-JS:: alias", function() {

      it("create an alias of a function should make this function accessible in the current syntaxer as well as in the factory syntaxer", function() {

        function aVeryLongFunctionName(){
          return 10;
        }

        $.alias(aVeryLongFunctionName, 'avfn');

        expect($.avfn).toEqual(aVeryLongFunctionName);

        OODK(function($, _){

          expect($.avfn).toEqual(aVeryLongFunctionName);
        });
      });

      it("trying to create an alias whicj already exits should throw an Exception", function() {

        function aVeryLongFunctionName(){
          return 10;
        }

        expect(function(){$.alias(aVeryLongFunctionName, 'avfn');}).toThrowException($, OODK.foundation.IllegalArgumentException, "Cannot define alias avfn: this alias is already defined");
      });

      it("create an alias of a class should make this class accessible in the current syntaxer as well as in the factory syntaxer", function() {

        var ClassA = $.class(function($, µ, _){
            
          $.public(function sum(a, b){
            return (a+b);
          });
        });

        $.alias(ClassA, 'ClassA');

        expect($.ClassA).toEqual(ClassA);

        OODK(function($, _){

          expect($.ClassA).toEqual(ClassA);
        });
      });

      it("create an alias of an interface should make this interface accessible in the current syntaxer as well as in the factory syntaxer", function() {

        $.interface(function Itf1Alias($, µ, _){
            
          $.abstract('test');
        });

        $.alias(_.Itf1Alias);

        expect($.Itf1Alias).toEqual(_.Itf1Alias);

        var Itf1Alias = _.Itf1Alias;

        OODK(function($, _){

          expect($.Itf1Alias).toEqual(Itf1Alias);
        });
      });

      it("create an alias of an instance method should make this instance method accessible in the current syntaxer as well as in the factory syntaxer", function() {

        var ClassA = $.class(function($, µ, _){
            
          $.public(function sum(a, b){
            return (a+b);
          });
        });

        var a = $.new(ClassA);

        $.alias([a, 'sum']);

        expect($.sum(10,2)).toEqual(12);

        OODK(function($, _){

          expect($.sum(10,2)).toEqual(12);
        });
      });

      it("create an alias of a namespace should make all the public declared ressources accessible in the current syntaxer as well as in the factory syntaxer", function() {

        $.alias(OODK.foundation.util);

        expect($.Iterator).toEqual(OODK.foundation.util.Iterator);
        expect($.Dumper).toEqual(OODK.foundation.util.Dumper);
        expect($.Cloner).toEqual(OODK.foundation.util.Cloner);
        expect($.Serializer).toEqual(OODK.foundation.util.Serializer);
        expect($.Deserializer).toEqual(OODK.foundation.util.Deserializer);

        OODK(function($, _){

          expect($.Iterator).toEqual(OODK.foundation.util.Iterator);
          expect($.Dumper).toEqual(OODK.foundation.util.Dumper);
          expect($.Cloner).toEqual(OODK.foundation.util.Cloner);
          expect($.Serializer).toEqual(OODK.foundation.util.Serializer);
          expect($.Deserializer).toEqual(OODK.foundation.util.Deserializer);
        });
      });
    });

  });