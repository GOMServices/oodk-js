
  OODK('jasmine', function($, _){

    $.throw(OODK.foundation.Exception, "");
  });

  OODK('jasmine', function($, _){

    describe("OODK-JS:: config.errorHandler", function() {

      it("throwing an error should call the global error handler callback", function() {

        var e = OODK.default.ErrorHandler.self.getInstance().getError();

        expect(function(){ throw e}).toThrowException($, OODK.foundation.Exception, "callback called");
      });

      it("first argument of the error handler callback should be the syntaxer", function() {

        var syntaxer = OODK.default.ErrorHandler.self.getInstance().getSyntaxer();
        
        expect(typeof syntaxer.is).toEqual('function');
        expect(typeof syntaxer.import).toEqual('function');
        expect(typeof syntaxer.dependency).toEqual('function');
      });
    });

  });