
OODK('jasmine', function($, _){

    function ClassT($, µ, _){

      $.private('a');
      $.protected('b');
      $.public('c');

      $.public(function __initialize(a,b,c){
        _.a = a;
        µ.b = b;
        this.c = c;
      });

      $.private(function getA(){
        return _.a;
      });

      $.protected(function getB(){
        return µ.b;
      });

      $.public(function getC(){
        return this.c;
      });

      $.public(function getPrivateA(){
        return _.getA();
      });

      $.public(function updateA(){
        _.a++;
      });

       $.public(function getLocalPropertyA(){
        return _.a;
      });

      $.public(function getProtectedB(){
        return µ.getB();
      });

      $.private(function getCFromPrivateMethod(){
        return this.c;
      });

      $.public(function getCCallingPrivateMethod(){
        return _.getCFromPrivateMethod();
      });
    }

    $.class(ClassT);

    function ClassU($, µ, _){

      $.private('a');

      $.public(function __initialize(a, sa, b, c){
        $.super.__initialize(a,b,c);
        _.a = sa;
      });

      $.public(function getC(){
        return 'value of c is '+$.super.getC();
      });

      $.protected(function getB(){
        return 'value of b is '+$.super.getB();
      });

      $.private(function getA(){
        return 'value of a is '+_.a;
      });

      $.public(function updateA(){
        $.super.updateA();
        _.a++;
      });

      $.public(function getLocalPropertyA(){
        return 'value of ClassY::a is '+_.a+' and value of ClassX::a is '+$.super.getLocalPropertyA();
      });

      $.public(function getLocalMethodA(){
        return _.getA();
      });

      $.private(function getCFromPrivateMethod(){
        return this.c;
      });

      $.public(function getCCallingPrivateMethod(){
        return 'within ClassY value of c is '+_.getCFromPrivateMethod()+', within ClassX value of c is '+$.super.getCCallingPrivateMethod();
      });
    }

    $.extends(ClassT).class(ClassU);

    var t = $.new(ClassT, 1, 5, [4,5,6]);

    var u = $.new(ClassU, 0.1, 0.8, "toto", [1,2,3]);

    var t2;

    var publicContext = this;

    describe("OODK-JS:: inheritance and overriding", function() {

      it("trying to inherit from a non class in a declaration scope should throw an error", function() {

        expect(function(){

          var Itf1 = $.interface(function($, µ, _){});

          var ClassOnError = $.extends(Itf1).class(function($){});
        }).toThrowException($, OODK.foundation.SyntaxError, 'Class anonymous cannot extend from anonymous');
      });

      it("call a parent private constructor from a child context class should throw an error", function() {

        var ClassProtected = function($, µ, _){

          $.private(function __initialize(){});
        }

        $.class(ClassProtected);

        var ClassOnError = function($, µ, _){

          $.public(function __initialize(){
            $.super.__initialize();
          });

          $.static(function($, µ, _){

            $.public(function instantiate(){
              return $.new(ClassOnError);
            });
            
          });
        }

        $.extends(ClassProtected).class(ClassOnError);

        expect(function(){ ClassOnError.self.instantiate();}).toThrowException($, OODK.foundation.TypeError, "$.super.__initialize is not a function");
      });

      it("call a parent protected constructor from a child context class should not throw an error", function() {

        var ClassProtected = function($, µ, _){

          $.protected(function __initialize(){});
        }

        $.class(ClassProtected);

        var ClassOnError = function($, µ, _){

          $.static(function($, µ, _){

            $.public(function instantiate(){
              return $.new(ClassOnError);
            });
            
          });
        }

        $.extends(ClassProtected).class(ClassOnError);

        expect(function(){ ClassOnError.self.instantiate();}).not.toThrow();
      });

      it("overriding a public method should call the parent method using $.super", function() {
        expect(u.getC()).toEqual('value of c is 1,2,3');
      });

      it("overriding a protected method should call the parent method using $.super", function() {
        expect(u.getProtectedB()).toEqual('value of b is toto');
      });

      it("calling a private method of the parent class from the child instance class should call the private method of the parent class", function() {
        expect(u.getPrivateA()).toEqual(0.1);
      });

      it("calling a method of the parent class from the child instance should access to the global instance context.", function() {
        expect(u.getCCallingPrivateMethod()).toEqual('within ClassY value of c is 1,2,3, within ClassX value of c is 1,2,3');
      });

      it("get a private property from a child instance should get the local private property", function() {
        expect(u.getLocalPropertyA()).toEqual('value of ClassY::a is 0.8 and value of ClassX::a is 0.1');
      });

      it("updating a private property (through a public accessor) of the local instance which call the super accessor of the parent class to modify the super private property should preserve all local context", function() {
        
        u.updateA();

        expect(u.getLocalPropertyA()).toEqual('value of ClassY::a is 1.8 and value of ClassX::a is 1.1');
      });

      it("call a private method from a child instance should call the local private method", function() {
        expect(u.getLocalMethodA()).toEqual('value of a is 1.8');
      });

      it("granting access from protected to public access to a method when overriding should not throw an error", function() {
       
        var ClassGranted = function($, µ, _){
          
          $.public(function getB(){
            return 'value of b is '+µ.b;
          });
        }

        expect(function(){ $.extends(ClassU).class(ClassGranted);}).not.toThrow();
      });

      it("declaring a public method when extending a class that declare the same private method should not throw an error and private method of parent context should be untouched", function() {
       
        var ClassGranted = function($, µ, _){

          $.private('a', 0);
          
          $.public(function getA(){
            return 'value of ClassGranted::a is '+_.a+' and '+this.getLocalMethodA();
          });
        }

        expect(function(){ $.extends(ClassU).class(ClassGranted);}).not.toThrow();

        var x3 = $.new(ClassGranted, 4,5,6, 7);

        expect(x3.getA()).toEqual('value of ClassGranted::a is 0 and value of a is 5');
      });

      it("restricting the member access from public to private should throw an error", function() {

        var ClassOnError = function($, µ, _){
          
          $.private(function getC(){
            return this.c;
          });
        }

        expect(function(){ $.extends(ClassU).class(ClassOnError);}).toThrowException($, OODK.foundation.SyntaxError, 'Access level to anonymous::getC() must be public (as in class OODK.jasmine.ClassU)');
      });

      it("restricting the member access from public to protected should throw an error", function() {

        var ClassOnError = function($, µ, _){
          
          $.protected(function getC(){});
        }

        expect(function(){ $.extends(ClassU).class(ClassOnError);}).toThrowException($, OODK.foundation.SyntaxError, 'Access level to anonymous::getC() must be public (as in class OODK.jasmine.ClassU)');
      });
    });
  });