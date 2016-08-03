
OODK('jasmine', function($, _){

    $.public().class(function ClassMN($, µ, _){

      $.public(function getClassOP(){
        return _.ns.ClassOP;
      });
    });

    $.class(function ClassOP($, µ, _){

      $.public(function getClassMN(){
        return $.ns.ClassMN;
      });
    });

    var publicContext = this;

    describe("OODK-JS:: namespace", function() {

      it("trying to redeclare a class that already exists in the same namespace scope should throw an error", function() {

        expect(function(){

          $.class(function ClassOP($, µ, _){});
        }).toThrowException($, OODK.foundation.SyntaxError, 'Cannot redeclare class OODK.jasmine.ClassOP');
      });

      it("public class should be accessible through the  public context of the namespace scope", function() {

       expect(typeof publicContext['ClassMN'] === 'function').toEqual(true);
       expect(typeof OODK.jasmine['ClassMN'] === 'function').toEqual(true);
      });

      it("public class should be accessible through the $.ns keyword within an instance scope", function() {

       expect($.new(_.ClassOP).getClassMN()).toEqual(publicContext.ClassMN);
      });

      it("private class should be accessible through the private context (_) inside a namespace scope", function() {

       expect(typeof _['ClassOP'] === 'function').toEqual(true);
      });

      it("private class should be accessible through the _.ns keyword within an instance scope", function() {

       expect($.new(publicContext.ClassMN).getClassOP()).toEqual(_.ClassOP);
      });

      it("private class should not be accessible through the public context of the namespace scope", function() {

        expect(typeof publicContext['ClassOP'] === 'undefined').toEqual(true);
        expect(typeof OODK.jasmine['ClassOP'] === 'undefined').toEqual(true);
      });

      it("trying to delete a class registered in a namespace should not be possible", function() {

        delete OODK.foundation.Exception;

        expect(typeof OODK.foundation.Exception).toEqual('function');
      });
    });
  });