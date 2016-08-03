define([
  'jasmine',
  'jasmine-jquery',
  'jasmine-sinon'
],
function (jasmine) {
  jasmine.getFixtures().fixturesPath = 'spec/fixtures';

  beforeEach(function() {
    this.addMatchers({
      
      toThrowException: function($, type, message){

        var r = false;
        var exception;

        if (typeof this.actual != 'function') {
          throw new Error('Actual is not a function');
        }

        try{
          this.actual();
        }catch(e){
          exception = e;
        }

        if(exception){
          r = ($.is(exception, type) && exception.getMessage() == message); 
        }

        var not = this.isNot ? "not " : "";

        this.message = function() {
          if (exception) {
            return ["Expected function " + not + "to throw", ((typeof message !== 'undefined') ? type.toString()+', '+message : type.toString()), ", but it threw", ((typeof message !== 'undefined') ? $.inspect(exception).getClass().toString()+', '+exception.getMessage() : $.inspect(exception).getClass().toString())].join(' ');
          } else {
            return "Expected function to throw an exception.";
          }
        };

        return r;
      }
    });
  });

  return jasmine;
});