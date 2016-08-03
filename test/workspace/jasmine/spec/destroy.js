

  OODK('jasmine', function($){

    var b;

    var ClassA = $.class(function($, µ, _){
            
      $.private('b');

      $.public(function __initialize(){
        b = _.b = $.new(ClassB);
      });

      $.private(function __finalize(){

        $.destroy(_.b);
      });
    });

    var ClassB = $.class(function($, µ, _){
      
      $.private('debug', true);
    });

    var a = $.new(ClassA);

    $.destroy(a);

    describe("OODK-JS:: destroy", function() {

      it("destroyed object should be in the frozen state", function() {
        expect(Object.isFrozen(a)).toEqual(true);
      });

      it("destructing an object should call the __finalize method", function() {
        expect(Object.isFrozen(b)).toEqual(true);
      });

      it("destructing a native js type should put the object in frozen state", function() {
       
        var a = {
          'a': 1,
          'b': 2,
          'c': 3
        };

        $.destroy(a);

        expect(Object.isFrozen(a)).toEqual(true);
      });

      it("destructing a native js type should call the __finalize method", function() {
       
        var a = {
          'a': 1,
          'b': 2,
          'c': {
            'd': 10,
            'e': false
          },
          '__finalize': function __finalize(){
            $.destroy(this.c);
          }
        };

        $.destroy(a);

        expect(Object.isFrozen(a.c)).toEqual(true);
      });
    });

  });