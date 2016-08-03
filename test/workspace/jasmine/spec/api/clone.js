
  OODK('jasmine', function($){

    describe("OODK-JS:: API Cloning", function() {

      it("cloning a an on object should return the same value", function() {
        
        var fn = function(){};

        var cln = $.clone(fn);

        expect(fn).toEqual(cln);
      });

      it("cloning a native js type without parameters should perform a superficial copy of members", function() {
        
        var a = [1, 2,3, [4,5,6]];
        var ca = $.clone(a);

        ca[0] = 10;
        ca[3][0] = 5;

        expect(a[0]).not.toEqual(ca[0]);
        expect(a[3][0]).toEqual(ca[3][0]);
      });

      it("cloning a native js type using the callback parameter to true should perform a deep copy of members", function() {
        
        var a = [1, 2,3, [4,5,6]];

        a.__clone = function(cloner){
          this[3] = cloner.clone(this[3]);
        }

        var ca = $.clone(a);

        ca[3][0] = 5;

        expect(a[3][0]).not.toEqual(ca[3][0]);
      });

      it("cloning a native js type using the deep parameter with circular references should not throw an error", function() {
        
        var a = [1, 2,3, [4,5,6]];
        a.push(a);

        var ca;

        expect(function(){ca = $.clone(a, true)}).not.toThrow();
      });

      it("cloning a native js type using the __clone method with circular references should inject the copy version in place of the circular reference", function() {
        
        var a = [1, 2,3, [4,5,6]];
        a.push(a);

        a.__clone = function(cloner){
          this[3] = cloner.clone(this[3]);
          this[4] = cloner.clone(this[4]);
        }

        var ca = $.clone(a);

        ca[0] = 3;

        expect(ca[0]).toEqual(ca[4][0]);
        expect(a[0]).not.toEqual(ca[0]);

        ca[4][3][0] = 0;

        expect(ca[4][3][0]).toEqual(ca[3][0]);
        expect(a[3][0]).not.toEqual(ca[4][3][0]);
      });

      it("cloning an instance class not implementing the Cloneable interface should throw an error", function() {
        
        var ClassA = function($){}

        $.class(ClassA);

        var a = $.new(ClassA);

        expect(function(){$.clone(a);}).toThrow();
      });

      it("cloning an instance class implementing the Cloneable interface should perform a superficial copy of its members", function() {
        
        var ClassA = function($, µ, _){

          $.private('a', 1);
          $.protected('b', 2);
          $.public('c');

          $.public(function __initialize(){
            this.c = $.new(ClassB);
          });

          $.public(function setA(a){
            _.a = a;
          });

          $.public(function getA(){
            return _.a;
          });
        }

        $.implements(OODK.foundation.Cloneable).class(ClassA);

        var ClassB = function($, µ, _){

          $.protected('x', 5);

          $.public(function setX(x){
            µ.x = x;
          });

          $.public(function getX(){
            return µ.x;
          })
        }

        $.class(ClassB);

        var a = $.new(ClassA);
        var ca = $.clone(a);

        expect(ca.getA()).toEqual(1);
        expect(ca.c.getX()).toEqual(a.c.getX());

        ca.setA(4);
        ca.c.setX(10);

        expect(ca.getA()).not.toEqual(a.getA());
        expect(ca.c.getX()).toEqual(a.c.getX());
        
      });

      it("cloning an instance class implementing the __clone method should perform a deep copy of its members", function() {
        
        var ClassA = function($, µ, _){

          $.private('a', 1);
          $.protected('b', 2);
          $.public('c');

          $.public(function __initialize(){

            this.c = $.new(ClassB);
          });

          $.public(function setA(a){
            _.a = a;
          });

          $.public(function getA(){
            return _.a;
          });

           $.public(function __clone(cloner){
            this.c = cloner.clone(this.c);
          });
        }

        $.implements(OODK.foundation.Cloneable).class(ClassA);

        var ClassB = function($, µ, _){

          $.protected('x', 5);

          $.public(function setX(x){
            µ.x = x;
          });

          $.public(function getX(){
            return µ.x;
          })
        }

        $.implements(OODK.foundation.Cloneable).class(ClassB);

        var a = $.new(ClassA);
        var ca = $.clone(a);

        ca.c.setX(10);

        expect(ca.c.getX()).not.toEqual(a.c.getX());
        
      });

      it("cloning an instance class implementing the __clone method with circular reference should not throw an error", function() {
        
        var ClassA = function($, µ, _){

          $.public('w', 10);
          $.public('x');

          $.public(function __initialize(){
            this.x = $.new(ClassB, this);
          });

          $.private(function __clone(cloner){
            this.x = cloner.clone(this.x);
          });
        }

        $.implements(OODK.foundation.Cloneable).class(ClassA);

        var ClassB = function($, µ, _){

          $.public('y');

          $.public(function __initialize(parent){
            this.y = parent;
          });
        }

        $.implements(OODK.foundation.Cloneable).class(ClassB);

        var a = $.new(ClassA);
        var ca;

        expect(function(){ca = $.clone(a)}).not.toThrow();

        ca.x.y.w = 5; 

        expect(a.w).toEqual(5);
        
      });

      it("cloning an instance class implementing the __clone method with circular reference should inject the copy version in place of the reference", function() {
        
        var ClassA = function($, µ, _){

          $.public('w', 10);
          $.public('x');

          $.public(function __initialize(){
            this.x = $.new(ClassB, this);
          });

          $.private(function __clone(cloner){
            this.x = cloner.clone(this.x);
          });
        }

        $.implements(OODK.foundation.Cloneable).class(ClassA);

        var ClassB = function($, µ, _){

          $.public('y');

          $.public(function __initialize(parent){
            this.y = parent;
          });

          $.private(function __clone(cloner){
            this.y = cloner.clone(this.y);
          });
        }

        $.implements(OODK.foundation.Cloneable).class(ClassB);

        var a = $.new(ClassA);
        var ca = ca = $.clone(a);

        ca.x.y.w = 5; 

        expect(ca.w).toEqual(ca.x.y.w);
        expect(a.w).not.toEqual(ca.w);
        
      });

      it("calling the protected method __clone from an inherited instance should not throw an error", function() {
        
        var ClassA = function($, µ, _){

          $.protected(function __clone(ccc){});
        }

        $.implements(OODK.foundation.Cloneable).class(ClassA);

        var ClassB = function($, µ, _){}

        $.extends(ClassA).class(ClassB);

        var b = $.new(ClassB);

        expect(function(){ $.clone(b); }).not.toThrow();
        
      });      
    });

  });