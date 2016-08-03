
OODK('jasmine', function($, _){

    $.public().class(function ClassX($, µ, _){

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

      $.public(function getPropertyA(){
        return _.a;
      });

      $.public(function callPropertyA(){
        return _.getA();
      });

      $.public(function getPropertyAOnError(){
        return µ.a;
      });

      $.public(function getPropertyB(){
        return µ.b;
      });

      $.public(function callPropertyB(){
        return µ.getB();
      });

      $.public(function getPropertyBOnError(){
        return _.b;
      });
    });

    var x = $.new(this.ClassX, 1, "test", [1,2,3]);

    $.class(function ClassY($, µ, _){});

    var y = $.new(_.ClassY);

    var ClassZ = $.class(function($, µ, _){});

    var z = $.new(ClassZ);

    var publicContext = this;

    describe("OODK-JS:: class", function() {

      it("trying to enter in a class scope with a non function should throw an error", function() {

        expect(function(){

          var ClassOnError = $.class(false);
        }).toThrowException($, OODK.foundation.SyntaxError, 'Cannot declare false as a class');
      });

      it("Conversion a class to a string should get the full qualified name of the class", function() {

       expect(publicContext['ClassX'].toString()).toEqual('OODK.jasmine.ClassX');
      });

      it("anonymous class should not be accessible through the public or private context of the namespace scope", function() {

        expect(typeof publicContext['ClassZ'] === 'undefined').toEqual(true);
        expect(typeof _['ClassZ'] === 'undefined').toEqual(true);
      });

      it("delare a class (local class) in an instance scope should not throw an error", function() {

        expect(function(){

          $.public().class(function($, µ, _){

            $.public(function sum(){
              
              var ClassLocal = $.class(function ClassLocal(){});
            });
          });
        }).not.toThrow();
      });

      it("a local class should not be accessible in the public or private context of the related namespace", function() {

        var ClassOuter = $.public().class(function($, µ, _){

          $.public(function sum(){
            
            var ClassLocal = $.class(function ClassLocal(){});

            var l = $.new(ClassLocal);
          });
        });

        var o = $.new(ClassOuter);
        o.sum();

        expect(typeof publicContext['ClassLocal'] === 'function').toEqual(false);
        expect(typeof OODK.jasmine['ClassLocal'] === 'function').toEqual(false);
        expect(typeof _['ClassLocal'] === 'function').toEqual(false);
      });

      it("trying to delare a class in a class scope should throw an error", function() {

        expect(function(){

          $.public().class(function($, µ, _){

            $.class(function(){});
          });
        }).toThrow('$.class is not a function');
      });

      it("accessing a public property through the outer context of an instance should be possible", function() {

        expect(x.c).toEqual([1,2,3]);
      });

      it("accessing a protected property through the outer context of an instance should not be possible", function() {

        expect(x.b).toEqual(undefined);
      });

      it("accessing a private property through the outer context of an instance should not be possible", function() {

        expect(x.a).toEqual(undefined);
      });

      it("accessing a public method through the outer context of an instance should be possible", function() {

        expect(x.getC()).toEqual([1,2,3]);
      });

      it("accessing a protected method through the outer context of an instance should not be possible", function() {

        expect(function(){x.getB();}).toThrow();
      });

      it("accessing a private method through the outer context of an instance should not be possible", function() {

        expect(function(){x.getA();}).toThrow();
      });

      it("accessing a private property through the private context of an instance should be possible", function() {

        expect(x.getPropertyA()).toEqual(1);
      });

      it("accessing a private method through the private context of an instance should be possible", function() {

        expect(x.callPropertyA()).toEqual(1);
      });

      it("accessing a private property through the protected context of an instance should not be possible", function() {

        expect(x.getPropertyAOnError()).toEqual(undefined);
      });

      it("accessing a protected property through the protected context of an instance should be possible", function() {

        expect(x.getPropertyB()).toEqual("test");
      });

      it("accessing a protected method through the protected context of an instance should be possible", function() {

        expect(x.callPropertyB()).toEqual("test");
      });

      it("accessing a protected property through the private context of an instance should not be possible", function() {

        expect(x.getPropertyBOnError()).toEqual(undefined);
      });
    });
  });