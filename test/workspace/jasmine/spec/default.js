

  OODK('jasmine', function($){

    function doSomething(a){
      a = $.default(a, "test"); // a is undefined, assign "test" to a

      return a.toUpperCase();
    }

    var a;

    a = doSomething(a);

    var b = false;

    b = $.default(b, "test", $.is(b, String));

    var c = "test";

    c = $.default(c, false, function(c){
      return $.is(c, Boolean);
    });

    var publicContext = this;

    describe("OODK-JS:: default", function() {

      it("should assign a default value to an undefined variable", function() {
        expect(a).toEqual("TEST");
      });

      it("should assign a default value to a variable not matching the test as boolean", function() {
        expect(b).toEqual("test");
      });

      it("should assign a default value to a variable not matching the test as function", function() {
        expect(c).toEqual(false);
      });
    
    });

  });