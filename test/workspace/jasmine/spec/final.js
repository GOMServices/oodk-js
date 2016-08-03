
OODK('jasmine', function($, _){

    function ClassI($, µ, _){

      $.final().public('SUCCESS', 1);

      $.public(function updateConstantSuccess(){
        this.SUCCESS = 2;

        return this.SUCCESS;
      });

      $.static(function($, µ, _){

        $.final().public('ERROR', -1);
      });
    }

    $.class(ClassI);

    var i = $.new(ClassI);

    var publicContext = this;

    describe("OODK-JS:: final", function() {

      it("overriding a class declared as final should throw an error", function() {

        var ClassNotExtendable = function($, µ, _){}

        $.final().class(ClassNotExtendable);

        var ClassOnError = function($, µ, _){}

        expect(function(){ $.extends(ClassNotExtendable).class(ClassOnError);}).toThrowException($, OODK.foundation.SyntaxError, 'Class anonymous may not inherit from final class (anonymous)');
      });

      it("overriding a member declared as final should throw an error", function() {

        var ClassExtendable = function ($, µ, _){

          $.final().public(function notExtendable(){});
        }

        $.class(ClassExtendable);

        var ClassOnError = function($, µ, _){
          $.public(function notExtendable(){});
        }

        expect(function(){ $.extends(ClassExtendable).class(ClassOnError);}).toThrowException($, OODK.foundation.SyntaxError, 'Cannot override final method anonymous::notExtendable()');
      
      });

      it("overriding a static member declared as final should throw an error", function() {

        var ClassExtendable = function ($, µ, _){

          $.static(function($, µ, _){

            $.final().public('SUCCESS', 1);
          });
          
        }

        $.class(ClassExtendable);

        var ClassOnError = function($, µ, _){

          $.static(function($, µ, _){

            $.public('SUCCESS', 1);
          });
        }

        expect(function(){ $.extends(ClassExtendable).class(ClassOnError);}).toThrowException($, OODK.foundation.SyntaxError, 'Cannot override final static property anonymous::SUCCESS');
      
      });

      it("updating a final property shoud not change the value of the property", function() {
        ClassI.self.ERROR = 2;
        expect(ClassI.self.ERROR).toEqual(-1);
      });

      it("updating a final static property shoud not change the value of the property", function() {
        expect(i.updateConstantSuccess()).toEqual(1);
      });
    });
  });