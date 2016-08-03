
  OODK('jasmine', function($){

    function ClassE($, µ, _){

        $.static(function($, µ, _){
          $.private('staticA', 0);

          $.protected('staticC', 5);

          $.public(function getStaticA(){
            return _.staticA;
          });

          $.protected(function getStaticProtectedC(){
            return µ.staticC;
          });
        });

        $.protected('b', 10);

        $.protected(function getB(){
          return µ.b;
        });

        $.public(function updateB(){
          µ.b++;
        });

        $.public(function getLocalB(){
          return $.local.b;
        });

        $.public(function callLocalB(){
          return $.local.getB();
        });

        $.public(function getLocalStaticC(){
          return $.local.staticC;
        });

        $.public(function callLocalStaticC(){
          return $.local.getStaticProtectedC();
        });

        $.public(function testLocalFreeze(){
          return $.local.b++;
        });
      }

      $.class(ClassE);

      function ClassF($, µ, _){

        $.static(function($, µ, _){
          $.private('staticA', 1);

          $.public(function getStaticA(){
            return _.staticA;
          });

          $.protected(function getStaticProtectedC(){
            return 'value of static b is '+5;
          });
        });

        $.protected(function getB(){
          return 'value of b is ' +  + $.super.getB();
        });

        $.public(function updateB(){
          $.super.updateB();
          return 'new value of b is ' + $.super.getB();
        });
      }

      $.extends(ClassE).class(ClassF);

      var a = $.new(ClassE);

      var b = $.new(ClassF);

      b.updateB();

    describe("OODK-JS:: static and local context", function() {

      it("accessing a member property of the local context should return the value at the time of declaration", function() {

        expect(b.getLocalB()).toEqual(10);
      });

      it("accessing a member method of the local context should call the local definition of the method", function() {

        expect(b.callLocalB()).toEqual(11);
      });

      it("accessing a public static method of the local context through the class should call the static local definition of the method", function() {

        expect(ClassE.local.getStaticA()).toEqual(0);
      });

      it("accessing a protected static method of the local context through the class should throw an error", function() {

        expect(function(){ ClassE.local.getStaticProtectedC();}).toThrow('ClassE.local.getStaticProtectedC is not a function');
      });

      it("accessing a static method of the local context within the instance should call the local method", function() {

        expect(b.callLocalStaticC()).toEqual(5);
      });

      it("accessing a static property of the local context within the instance should return the value at the time of declaration", function() {

        expect(b.getLocalStaticC()).toEqual(5);
      });

      it("modifying the local context should do nothing", function() {

        expect(b.testLocalFreeze()).toEqual(10);
      });
    });

  });