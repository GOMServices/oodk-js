

  OODK('jasmine', function($,_){

    $.class(function ClassBCZ($, µ,_){});

    $.extends(_.ClassBCZ).class(function ClassBCY($, µ,_){});

    var ClassA = $.class(function($, µ, _){

      $.string().public(function testStringCorrect(){
        return "test";
      });

      $.string().public(function testStringWrong(){
        return 10;
      });

      $.type(_.ns.ClassBCZ).public(function testClassCorrect(){
        return $.new(_.ns.ClassBCZ);
      });

      $.type(_.ns.ClassBCZ).public(function testClassWrong(){
        return "test";
      });

      $.type(OODK.instanceOf(_.ns.ClassBCZ)).public(function testInstanceOfCorrect(){
        return $.new(_.ns.ClassBCY);
      });

      $.type(OODK.instanceOf(OODK.foundation.Iterator)).public(function testInstanceOfWrong(){
        return $.new(_.ns.ClassBCY);
      });

      $.int().public(function testIntCorrect(){
        return 10;
      });

      $.int().public(function testIntWrong(){
        return "test";
      });

      $.void().public(function testVoidCorrect(){
        ;
      });

      $.void().public(function testVoidWrong(){
        return "test";
      });

      $.bool().public(function testBoolCorrect(){
        return false;
      });

      $.bool().public(function testBoolWrong(){
        return 'test';
      });

      $.float().public(function testFloatCorrect(){
        return 10.5;
      });

      $.float().public(function testFloatWrong(){
        return "test";
      });

      $.type(OODK.arrayOf(OODK.int)).public(function testArrayOfCorrect(){
        return [1,2,3];
      });

      $.type(OODK.arrayOf(OODK.int)).public(function testArrayOfWrong(){
        return "test";
      });

      $.array().public(function testArrayCorrect(){
        return [1,2,3];
      });

      $.array().public(function testArrayWrong(){
        return "test";
      });

      $.number().public(function testNumberCorrect(){
        return 10;
      });

      $.number().public(function testNumberWrong(){
        return "test";
      });

      $.literal().public(function testLiteralCorrect(){
        return {'a': false, 'b': 2};
      });

      $.literal().public(function testLiteralWrong(){
        return "test";
      });
    });

    var a = $.new(ClassA);

    describe("OODK-JS:: typing", function() {

      it("return 'test' as a method typed as string should not throw an exception", function() {
        expect(function(){a.testStringCorrect()}).not.toThrow();
      });

      it("return 10 as a method typed as string should throw an exception", function() {
        expect(function(){a.testStringWrong()}).toThrowException($, OODK.foundation.TypeError, 'Return type of anonymous.testStringWrong is invalid: Number(10) is not of type String');
      });

      it("return a valid class as a method typed with an OODK class should not throw an exception", function() {
        expect(function(){a.testClassCorrect()}).not.toThrow();
      });

      it("return 'test' as a method typed with an OODK class should throw an exception", function() {
        expect(function(){a.testClassWrong()}).toThrowException($, OODK.foundation.TypeError, 'Return type of anonymous.testClassWrong is invalid: "test" is not of type OODK.jasmine.ClassBCZ');
      });

      it("return a int as a method typed as int should not throw an exception", function() {
        expect(function(){a.testIntCorrect()}).not.toThrow();
      });

      it("return 'test' as a method typed as int should throw an exception", function() {
        expect(function(){a.testIntWrong()}).toThrowException($, OODK.foundation.TypeError, 'Return type of anonymous.testIntWrong is invalid: "test" is not of type int');
      });

      it("return undefined as a method typed as void should not throw an exception", function() {
        expect(function(){a.testVoidCorrect()}).not.toThrow();
      });

      it("return 'test' as a method typed as void should throw an exception", function() {
        expect(function(){a.testVoidWrong()}).toThrowException($, OODK.foundation.TypeError, 'Return type of anonymous.testVoidWrong is invalid: "test" is not of type void');
      });

      it("return false as a method typed as boolean should not throw an exception", function() {
        expect(function(){a.testBoolCorrect()}).not.toThrow();
      });

      it("return 'test' as a method typed as bool should throw an exception", function() {
        expect(function(){a.testBoolWrong()}).toThrowException($, OODK.foundation.TypeError, 'Return type of anonymous.testBoolWrong is invalid: "test" is not of type Boolean');
      });

      it("return child instance as a method typed as instanceof a class should not throw an exception", function() {
        expect(function(){a.testInstanceOfCorrect()}).not.toThrow();
      });

      it("return not a child class as a method typed as instanceof should throw an exception", function() {
        expect(function(){a.testInstanceOfWrong()}).toThrowException($, OODK.foundation.TypeError, 'Return type of anonymous.testInstanceOfWrong is invalid: object(OODK.jasmine.ClassBCY) is not of type instance of OODK.foundation.Iterator');
      });

      it("return a float as a method typed as float should not throw an exception", function() {
        expect(function(){a.testFloatCorrect()}).not.toThrow();
      });

      it("return 'test' as a method typed as float should throw an exception", function() {
        expect(function(){a.testFloatWrong()}).toThrowException($, OODK.foundation.TypeError, 'Return type of anonymous.testFloatWrong is invalid: "test" is not of type float');
      });

      it("return a [1,2,3] as a method typed as arrayOf int should not throw an exception", function() {
        expect(function(){a.testArrayOfCorrect()}).not.toThrow();
      });

      it("return 'test' as a method typed as arrayOf int should throw an exception", function() {
        expect(function(){a.testArrayOfWrong()}).toThrowException($, OODK.foundation.TypeError, 'Return type of anonymous.testArrayOfWrong is invalid: "test" is not of type array of int');
      });

      it("return a [1,2,3] as a method typed as array should not throw an exception", function() {
        expect(function(){a.testArrayCorrect()}).not.toThrow();
      });

      it("return 'test' as a method typed as array should throw an exception", function() {
        expect(function(){a.testArrayWrong()}).toThrowException($, OODK.foundation.TypeError, 'Return type of anonymous.testArrayWrong is invalid: "test" is not of type Array');
      });

      it("return 10 as a method typed as number should not throw an exception", function() {
        expect(function(){a.testNumberCorrect()}).not.toThrow();
      });

      it("return 'test' as a method typed as number should throw an exception", function() {
        expect(function(){a.testNumberWrong()}).toThrowException($, OODK.foundation.TypeError, 'Return type of anonymous.testNumberWrong is invalid: "test" is not of type Number');
      });

      it("return {'a': false, 'b': 2} as a method typed as literal should not throw an exception", function() {
        expect(function(){a.testLiteralCorrect()}).not.toThrow();
      });

      it("return 'test' as a method typed as literal should throw an exception", function() {
        expect(function(){a.testLiteralWrong()}).toThrowException($, OODK.foundation.TypeError, 'Return type of anonymous.testLiteralWrong is invalid: "test" is not of type object literal');
      });
    });

  });