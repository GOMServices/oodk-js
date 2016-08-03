
OODK('jasmine', function($, _){

    var Itf1 = $.interface(function($){});

    var Castable = $.class(function($, µ, _){

      $.public('a');

      $.public('b');

      $.public(function __initialize(a, b){
        
        this.a = a;
        this.b = b;
      });
      
      $.private(function __to(type){
        
        if(type === String){
          return this.a + " " + this.b;
        }
      });

      $.public(function toBoolean(){
        
        return true;
      });

      $.static(function($, µ, _){

        $.private(function __from(value){

          if(typeof value == 'string'){
            var tmp = value.split(" ");
            return $.new(Castable, tmp[0], tmp[1]);
          }else if($.is(value, Castable2)){
            var tmp = value.getList();
            return $.new(Castable, tmp[0], tmp[1]);
          }
        });
      });
    });

    var Castable2 = $.class(function($, µ, _){

      $.private('list');
      
      $.public(function __initialize(list){
        
        _.list = list;
      });

      $.public(function getList(){
        return _.list;
      });
    });

    var a = $.new(Castable, 'Hello', 'world');

    var b = $.new(Castable2, ['Hello', 'world']);

    describe("OODK-JS:: conversion", function() {

      it("toString: convert 10 should produce '10'", function() {

        expect($.toString(10)).toEqual("10");
      });

      it("toString: convert null should produce ", function() {

        expect($.toString(null)).toEqual("null");
      });

      it("toString: convert udnefined should produce '10'", function() {

        expect($.toString(undefined)).toEqual("undefined");
      });

      it("toString: implementing a __from method to the String object to convert 10 should produce 'value of number is 10'", function() {

        String.prototype.__from = function(val){

          return 'value of number is '+val;
        }

        expect($.toString(10)).toEqual('value of number is 10');

        delete String.prototype.__from;
      });

      it("toBool: convert 0 should produce false", function() {

        expect($.toBool(0)).toEqual(false);
      });

      it("toBool: convert 'false' should produce false", function() {

        expect($.toBool('false')).toEqual(false);
      });

      it("toBool: convert ' TRUE  ' should produce true", function() {

        expect($.toBool(' TRUE  ')).toEqual(true);
      });

      it("toBool: should call the __from method of Boolean object if implemented", function() {

        Boolean.prototype.__from = function(val){

          return (val === 'falsy')? false: Boolean(val);
        }

        expect($.toBool('falsy')).toEqual(false);

        delete Boolean.prototype.__from;
      });

      it("toNumber: convert '-10' should produce 10", function() {

        expect($.toNumber('-10')).toEqual(-10);
      });

      it("toNumber: convert false should produce 0", function() {

        expect($.toNumber(false)).toEqual(0);
      });

      it("toNumber: convert 'toto' should throw an Exception", function() {

        expect(function(){$.toNumber('toto')}).toThrowException($, OODK.foundation.ClassCastException, 'Cannot convert "toto" to Number.');
      });

      it("toNumber: convert null should produce 0", function() {

        expect($.toNumber(null)).toEqual(0);
      });

      it("toNumber: implementing a __from method to the Number object to convert 'toto' should produce 0", function() {

        Number.prototype.__from = function(val){

          return 0;
        }

        expect($.toNumber('toto')).toEqual(0);

        delete Number.prototype.__from;
      });

      it("toInt: convert null should throw an Exception", function() {

        expect(function(){$.toInt(null)}).toThrowException($, OODK.foundation.ClassCastException, 'Cannot convert null to int.');
      });

      it("toInt: convert 'toto' should throw an Exception", function() {

        expect(function(){$.toInt('toto')}).toThrowException($, OODK.foundation.ClassCastException, 'Cannot convert "toto" to int.');
      });

      it("toInt: convert 10.4 should produce 10", function() {

        expect($.toInt(10.4)).toEqual(10);
      });

      it("toInt: convert '-10.4' should produce -10", function() {

        expect($.toInt('-10.4')).toEqual(-10);
      });

      it("toInt: implementing a __from method to the Number object to convert 'toto' should produce 0", function() {

        Number.prototype.__from = function(val){

          return 0;
        }

        expect($.toInt('toto')).toEqual(0);

        delete Number.prototype.__from;
      });

      it("toFloat: convert false should throw an Exception", function() {

        expect(function(){$.toFloat(false)}).toThrowException($, OODK.foundation.ClassCastException, 'Cannot convert false to float.');
      });

      it("toFloat: convert null should throw an Exception", function() {

        expect(function(){$.toFloat(null)}).toThrowException($, OODK.foundation.ClassCastException, 'Cannot convert null to float.');
      });

      it("toFloat: convert 'toto' should throw an Exception", function() {

        expect(function(){$.toFloat('toto')}).toThrowException($, OODK.foundation.ClassCastException, 'Cannot convert "toto" to float.');
      });

      it("toFloat: convert 10 should produce 10.0", function() {

        expect($.toFloat(10)).toEqual(10.0);
      });

      it("toFloat: convert '-10' should produce -10.0", function() {

        expect($.toFloat('-10')).toEqual(-10.0);
      });

      it("toFloat: implementing a __from method to the Number object to convert 'toto' should produce 0.0", function() {

        Number.prototype.__from = function(val){

          return 0.1;
        }

        expect($.toFloat('toto')).toEqual(0.1);

        delete Number.prototype.__from;
      });

      it("toDate: convert '2010-10-10' should produce a new Date('2010-10-10')", function() {

        expect($.toDate('2010-10-10')).toEqual(new Date('2010-10-10'));
      });

      it("toDate: implementing a __from method to the Date object to convert '02/10/2013' should produce a new Date('2013-10-02')", function() {

        Date.prototype.__from = function(val){

          val = val.split('/');

          return new Date(val[2] + '-' + val[1] + '-' + val[0]);
        }

        expect($.toDate('02/10/2013')).toEqual(new Date('2013-10-02'));

        delete Date.prototype.__from;
      });

      it("toDate: convert 'toto' should throw an Exception", function() {

        expect(function(){$.toDate('toto')}).toThrowException($, OODK.foundation.ClassCastException, 'Cannot convert "toto" to Date.');
      });

      it("toDate: convert null should throw an Exception", function() {

        expect(function(){$.toDate(null)}).toThrowException($, OODK.foundation.ClassCastException, 'Cannot convert null to Date.');
      });

      it("toArray: convert {'a': 1, 'b': 2} should produce [1,2]", function() {

        expect($.toArray({'a': 1, 'b': 2})).toEqual([1,2]);
      });

      it("toArray: convert 'toto' should produce ['t','o','t', 'o']", function() {

        expect($.toArray({'a': 1, 'b': 2})).toEqual([1,2]);
      });

      it("toArray: implementing a __from method to the Array object to convert 'a-very-long-journey' should produce ['a', 'very', 'long', 'journey']", function() {

        Array.prototype.__from = function(val){

          return val.split('-');
        }

        expect($.toArray('a-very-long-journey')).toEqual(['a', 'very', 'long', 'journey']);

        delete Array.prototype.__from;
      });

      it("toArray: convert null should throw an Exception", function() {

        expect(function(){$.toArray(null)}).toThrowException($, OODK.foundation.ClassCastException, 'Cannot convert null to Array.');
      });

      it("toLiteral: implementing a __from method to the Object object to convert false should produce {'0': false}", function() {

        Object.prototype.__from = function(val){

          return {'0': false};
        }

        expect($.toLiteral(false)).toEqual({'0': false});

        delete Object.prototype.__from;
      });

      it("toLiteral: convert [1,2,3] should produce {'0': 1, '1': 2, '2': 3}", function() {

        expect($.toLiteral([1,2,3])).toEqual({'0': 1, '1': 2, '2': 3});
      });

      it("toLiteral: convert 'toto' should produce {'0': 't', '1': 'o', '2': 't', '3': 'o'}", function() {

        expect($.toLiteral("toto")).toEqual({'0': 't', '1': 'o', '2': 't', '3': 'o'});
      });

      it("toLiteral: convert null should throw an Exception", function() {

        expect(function(){$.toLiteral(null)}).toThrowException($, OODK.foundation.ClassCastException, 'Cannot convert null to literal.');
      });

      it("to: convert a primitive type to a Boolean", function() {

        expect($.to(0, Boolean)).toEqual(false);
      });

       it("to: convert 'toto' to a literal", function() {

        expect($.to('toto', Object)).toEqual({'0': 't', '1': 'o', '2': 't', '3': 'o'});
      });

      it("to: convert a class instance to a native type should call the __to method", function() {

        expect($.to(a, String)).toEqual('Hello world');
      });

      it("to: convert a class instance to a native type should call the to<Type> method", function() {

        expect($.to(a, Boolean)).toEqual(true);
      });

      it("to: convert a native type to a class instance should call the __from static method", function() {

        var c = $.to('Hello world', Castable);

        expect(c.a).toEqual('Hello');
        expect(c.b).toEqual('world');
      });

      it("to: convert a class instance to an another class instance should call the __from static method", function() {

        var c = $.to(b, Castable);

        expect(c.a).toEqual('Hello');
        expect(c.b).toEqual('world');
      });

      it("to: convert to a OODK class which does not support the conversion should throw an Exception", function() {

        expect(function(){$.to(a, Castable2)}).toThrowException($, OODK.foundation.ClassCastException, 'Cannot convert instance of class anonymous to anonymous.');
      });
    });
  });