
OODK('jasmine', function($, _){

    var ClassK = $.extends(String).class(function($, µ, _){

        $.final().public('SUCCESS', 1);

        $.public(function __initialize(){
          
          $.invoke(this, $.super.__initialize, arguments);

          _.self.count();
        });

        $.public(function toLowerCase(){
          return $.new(ClassK, $.super.toLowerCase());
        });

        $.static(function($, µ, _){

          $.private('counter', 0);

          $.private(function count(){
            _.counter++;
          });

          $.public(function getCounter(){
            return _.counter;      
          });
        });
    });

    var x = $.new(ClassK, 'T.E.S.T');

    var ClassL = $.extends(ClassK).class(function($, µ, _){

        $.public(function toLowerCase(){

          return 'value in lower case is ' + $.super.toLowerCase();
        });
    });

    var y = $.new(ClassL, 'H.E.L.L.O');

    var MyArray = $.dynamic().extends(Array).class(function($, µ, _){

        $.public(function __initialize(){
          $.invoke(this, $.super.__initialize, arguments);
        });

        $.public(function join(substr){
          return 'value of join is ' + $.super.join(substr);      
        });
    });

    var w = $.new(MyArray, 1,2,3);

    var MyError = $.extends(Error).class(function($, µ, _){

        $.protected('message'); 

        $.protected('context'); 

        $.public(function __initialize(message, context){

          µ.message = message;

          µ.context = context;

          $.super.__initialize(message);
        });

        $.public(function toString(){
          return µ.context.constructor.name + ': ' + µ.message;      
        });
    });

    var MyNumber = $.extends(Number).class(function($, µ, _){

        $.public(function __initialize(){

          $.invoke(this, $.super.__initialize, arguments);
        });
    });

    var n = $.new(MyNumber, 10.10);

    var publicContext = this;

    describe("OODK-JS:: native class", function() {

      it("trying to inherit from the native string object, should get access to all prototype methods through the public context of the instance", function() {

        expect(x.split('.')).toEqual(['T', 'E', 'S', 'T']);
      });

      it("static members should be accessible through the child class", function() {

        expect(ClassK.self.getCounter()).toEqual(2);
        expect(ClassL.self.getCounter()).toEqual(2);
      });

      it("overriding a native string object method should give access to that method through the super keyword", function() {

        expect(x.toLowerCase().split('.')).toEqual(['t', 'e', 's', 't']);
      });

      it("trying to inherit from an OODK class which inherits from the native string object, should get access to all prototype methods through the public context of the instance", function() {

        expect(y.split('.')).toEqual(['H', 'E', 'L', 'L', 'O']);
      });

      it("overriding a sub child native method should give access to that method through the super keyword", function() {

        expect(y.toLowerCase()).toEqual('value in lower case is h.e.l.l.o');
      });

      it("trying to inherit from the native array object, should get access to all prototype methods through the public context of the instance", function() {

        expect(w.indexOf(1)).toEqual(0);
      });

      it("overriding a native array object method should give access to that method through the super keyword", function() {

        expect(w.join('/')).toEqual('value of join is 1/2/3');
      });

      it("conversion a child of a native Array class should called the toString method", function() {

        expect(w+ ' => Array').toEqual('1,2,3 => Array');
      });

      it("trying to inherit from the native Error object, should get access to all prototype methods through the public context of the instance", function() {

        var err;

        try{
          throw new MyError('error while executing the join method', x);
        }catch(e){
          err = e.toString();
        }

        expect(err).toContain('klass: error while executing the join method');
      });

      it("conversion a child of the native Number object, should called the toString and valueOf method", function() {

        expect(Number.parseInt(n)).toEqual(10);
        expect(n-1).toEqual(9.1);
      });
    });
  });