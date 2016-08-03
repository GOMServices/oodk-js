
OODK('jasmine', function($, _){

    var ClassX = $.public().class(function($, µ, _){

      $.public(function getStaticPropertyA(){
        return _.self.staticA;
      });

      $.public(function updateStaticPropertyA(){
        _.self.staticA++;
      });

      $.public(function getStaticPropertyB(){
        return µ.self.staticB;
      });

      $.public(function updateStaticPropertyB(){
        µ.self.staticB++;
      });

      $.public(function getStaticPropertyC(){
        return this.self.staticC;
      });

      $.public(function updateStaticPropertyC(){
        this.self.staticC++;
      });

      $.public(function callStaticA(){
        return _.self.getStaticA();
      });

      $.public(function callStaticB(){
        return µ.self.getStaticB();
      });

      $.public(function callStaticC(){
        return this.self.getStaticC();
      });

      $.static(function($){

        $.private('staticA', 0);
        $.protected('staticB', 4);
        $.public('staticC', -30);

        $.private(function getStaticA(){
          return _.staticA;
        });

        $.protected(function getStaticB(){
          return µ.staticB;
        });

        $.public(function getStaticC(){
          return this.staticC;
        });

        $.public(function getPrivateStaticMethodA(){
          return _.getStaticA();
        });

        $.public(function getProtectedStaticMethodB(){
          return µ.getStaticB();
        });

        $.public(function callMemberMethodFromStaticContext(){
          this.getProtectedB();
        });
      });
    });

    var x = $.new(ClassX, 1, 5, [4,5,6]);

    var x2;

    var publicContext = this;

    describe("OODK-JS:: class static scope", function() {

      it("delare a class (local class) in an static scope should not throw an error", function() {

        expect(function(){

          $.public().class(function($, µ, _){

            $.static(function(){

                $.public(function sum(){
              
                  var ClassLocal = $.class(function ClassLocal(){});
                });
            });
           
          });
        }).not.toThrow();
      });

      it("a local class declared in a static context should not be accessible in the public or private context of the related namespace", function() {

        var ClassOuter = $.class(function($, µ, _){

          $.static(function($, µ, _){

            $.public(function sum(){
            
              var ClassLocal = $.class(function ClassLocal(){});

              var l = $.new(ClassLocal);
            });
          });
          
        });

        ClassOuter.self.sum();

        expect(typeof publicContext['ClassLocal'] === 'function').toEqual(false);
        expect(typeof OODK.jasmine['ClassLocal'] === 'function').toEqual(false);
        expect(typeof _['ClassLocal'] === 'function').toEqual(false);
      });

      it("accessing to a public static property from the class should be possible", function() {
        expect(ClassX.self.staticC).toEqual(-30);
      });

      it("accessing to a public static method from the class should be possible", function() {
        expect(ClassX.self.getStaticC()).toEqual(-30);
      });

      it("accessings to a public static method within the instance should be possible", function() {
        expect(x.callStaticC()).toEqual(-30);
      });

      it("accessings to a protected static property within the instance should be possible", function() {
        expect(x.getStaticPropertyB()).toEqual(4);
      });

      it("accessings to a protected static method within the instance should be possible", function() {
        expect(x.callStaticB()).toEqual(4);
      });

      it("accessings to a protected static method within the class instance should be possible", function() {
        expect(ClassX.self.getProtectedStaticMethodB()).toEqual(4);
      });

      it("accessings to a protected static property should be undefined when called from the outside context", function() {
        expect(ClassX.self.staticB).toEqual(undefined);
      });

      it("accessings to a protected static method should throw an error when called from the outside context", function() {
        expect(function(){ ClassX.self.getStaticB(); }).toThrow('ClassX.self.getStaticB is not a function');
      });

      it("access: access to a private static property within an instance should be possible", function() {
        expect(x.getStaticPropertyA()).toEqual(0);
      });

      it("accessings to a private static method within the static context should be possible", function() {
        expect(ClassX.self.getPrivateStaticMethodA()).toEqual(0);
      });

      it("accessings to a private static property should throw be undefined when called from the outside context", function() {
        expect(ClassX.self.staticA).toEqual(undefined);
      });

      it("accessings to a private static method should throw an error when called from the outside context", function() {
        expect(function(){ ClassX.self.getStaticA(); }).toThrow();
      });

      it("accessings to an instance method from a static context should throw an error", function() {
        expect(function(){ClassX.self.callMemberMethodFromStaticContext();}).toThrow('this.getProtectedB is not a function');
      });

      it("two instances of the same class should share the same private static context", function() {

        x2 = $.new(ClassX, 2, 0, 9);
        x2.updateStaticPropertyA();

        expect(x.getStaticPropertyA()).toEqual(x2.getStaticPropertyA());
      });

      it("two instances of the same class should share the same protected static context", function() {

        x2.updateStaticPropertyB();

        expect(x.getStaticPropertyB()).toEqual(x2.getStaticPropertyB());
      });

      it("two instances of the same class should share the same public static context", function() {

        x2.updateStaticPropertyC();

        expect(x.getStaticPropertyC()).toEqual(x2.getStaticPropertyC());
      });

      it("trying to declare a static member which is already declared as a member should throw an error", function() {

        expect(function(){

          $.class(function($, µ, _){

            $.protected('b', 10);

            $.static(function($, µ, _){

              $.public('b', 10);
            });
          });
        }).toThrowException($, OODK.foundation.SyntaxError, 'Cannot make non static method anonymous::b() static in class anonymous');
      });
    });
  });