
  OODK('jasmine', function($, _){

    describe("OODK-JS:: config", function() {

      it("calling one of the console methods should redirect to the console callback", function() {

        $.log("test");

        var log = OODK.default.Registry.self.getInstance().join("");

        expect(log).toEqual('&lt;span style="color: green"&gt;-log ([current]:8)-&lt;/span&gt;&lt;br/&gt;&lt;span style="color: green"&gt;-test-&lt;/span&gt;&lt;br/&gt;');
      });

      it("first argument of the cosnole callback should be the syntaxer", function() {

        var syntaxer = OODK.default.Registry.self.getInstance().getSyntaxer();
        
        expect(typeof syntaxer.is).toEqual('function');
        expect(typeof syntaxer.import).toEqual('function');
        expect(typeof syntaxer.dependency).toEqual('function');
      });
    });

  });