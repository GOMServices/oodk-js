
  OODK('jasmine', function($, _){


    describe("OODK-JS:: API Iteration", function() {

      it("using forEach on an object should call the callback at each element", function() {

        var obj = {'a': 1, 'b': 2, 'c': 3};

        var tmp = [];

        $.forEach(obj, function(v, k){
          tmp.push(k + '=>' + v);
        });

        expect(tmp.join(', ')).toEqual('a=>1, b=>2, c=>3');
      });

      it("using forEach on an array should call the callback at each element", function() {

        var obj = [1, 2, 3];

        var tmp = [];

        $.forEach(obj, function(v, k){
          tmp.push(k + '=>' + v);
        });

        expect(tmp.join(', ')).toEqual('0=>1, 1=>2, 2=>3');
      });

      it("using forEach on a string should call the callback at each element", function() {

        var obj = "test";

        var tmp = [];

        $.forEach(obj, function(v, k){
          tmp.push(k + '=>' + v);
        });

        expect(tmp.join(', ')).toEqual('0=>t, 1=>e, 2=>s, 3=>t');
      });

      it("using forEach on a class instance should throw an error if class instance does not implement Iterable", function() {

        var ClassA = $.class(function($, µ, _){});

        var obj = $.new(ClassA);

        expect(function(){
          $.forEach(obj, function(v, k){});
        }).toThrowException($, OODK.foundation.IterateNotSupportedException, 'class anonymous does not implements interface OODK.foundation.Iterable'); 
      });

      it("return an iterator which does not implement the Iterator interface should throw an error", function() {

        var ClassA = $.implements(OODK.foundation.Iterable).class(function($, µ, _){

          $.public(function __iterator(){
            return "test";
          });
        });

        var obj = $.new(ClassA);

        expect(function(){
          $.forEach(obj, function(v, k){});
        }).toThrowException($, OODK.foundation.IterateNotSupportedException, 'iterator does not implements interface OODK.foundation.Iterator'); 
      });

      it("using forEach on a class instance should call the callback at each public member (property or method, static or not) of the instance", function() {

        var ClassA = $.implements(OODK.foundation.Iterable).class(function($, µ, _){

          $.private('list', [1,2,3]);

          $.private('iterator');

          $.private(function __iterator(){

            if(typeof _.iterator === 'undefined'){
              return $.new(OODK.foundation.util.Iterator, _.list);
            }else{
              return _.iterator;
            }
          });
        });

        var a = $.new(ClassA);

        var tmp = [];

        $.forEach(a, function(v, k){
         tmp.push(k+'=>'+v);
        });

        expect(tmp.join(', ')).toEqual('0=>1, 1=>2, 2=>3');
      });

      it("returning false during a forEach loop should stop the loop", function() {

        var obj = {'a': 1, 'b': 2, 'c': 3};

        var tmp = [];

        $.forEach(obj, function(v, k){

          if(k === 'c') return false;
          tmp.push(k + '=>' + v);
        });

        expect(tmp.join(', ')).toEqual('a=>1, b=>2');
      });
      
    });

  });