
  OODK('jasmine', function($, _){
    
    function ClassCZ($, µ, _){

      $.private('x', "test");

      $.transient().protected('b', 10);

      $.public('c', [1,2,3]);

      $.static(function($, µ, _){

        $.private('staticA', 10);
      });
    }

    $.implements(OODK.foundation.Serializable).class(ClassCZ);

    function ClassDZ($, µ, _){
      $.private('x', 10);
    }

    $.extends(ClassCZ).implements(OODK.foundation.Serializable).class(ClassDZ);

    var dz = $.new(ClassDZ);

    function ClassAZ($, µ, _){

      $.private('x');

      $.transient().protected('b');

      $.public('c');

      $.private('cz');

      $.public(function getX(){
        return _.x;
      });

      $.public(function updateStaticA(a){
        _.self.staticA = a;
      });

      $.public(function __initialize(cz){
        _.cz = cz;
        _.x = 10;
        µ.b = 20;
        this.c = [1,2,3];
      });

      $.protected(function __serialize(serializer){

        serializer.serialize('staticA', $);
      });

      $.protected(function __unserialize(unserializer){

        _unserializer.get('staticA', $);
      });

      $.static(function($, µ, _){

        $.private('staticA', 10);

        $.protected(function getStaticA(){
            ;
        });
      });
    }

    $.implements(OODK.foundation.Serializable).class(ClassAZ);

    var cz = $.new(_.ClassCZ);

    var az = $.new(_.ClassAZ, cz);

    function ClassBZ($, µ, _){

      $.private('x', 5);

      $.protected(function __serialize(serializer){
        $.super.__serialize(serializer);
      });

      $.protected(function __unserialize(unserializer){
        $.super.__unserialize(unserializer);
      });

      $.static(function($, µ, _){

        $.private('staticA', true);
      });
    }

    $.extends(ClassAZ).implements(OODK.foundation.Serializable).class(ClassBZ);

    var bz = $.new(_.ClassBZ, cz);

    describe("OODK-JS:: serialization", function() {

      it("serializing a native Object should produce a JSON string which once unserialize should return the equivalent object", function() {
        
        var a = {
          'a': 1, 
          'b': "toto",
          'c': false,
          'd': [4,5,6]
        }

        var serial = $.serialize(a);

        expect(typeof serial).toEqual('string');
        expect($.unserialize(serial)).toEqual(a);
      });

      it("serializing a native Array should produce a JSON string which onece unserialize should return the equivalent object", function() {
        
        var a = [
          1, 
          "toto",
          false,
          [4,5,6]
        ];

        var serial = $.serialize(a);

        expect(typeof serial).toEqual('string');
        expect($.unserialize(serial)).toEqual(a);
      });

      it("serializing a native type that encpasulate circular references should not throw an error", function() {
        
        var a = [
          1, 
          "toto",
          false,
          [4,5,6]
        ];

        a.push(a);

        expect(function(){$.serialize(a)}).not.toThrow();
      });

      it("unserializing a string which store multiple references to the same object should inject the same new instance in place of all references", function() {

        var a = {
          'a': 1,
          'c': false,
          'd': [4,5,6]
        }

        a.b = {
          x: a.d,
          y: {
            z: a.d
          }
        }

        var serial = $.serialize(a);

        var na = $.unserialize(serial);

        expect(na.d).toEqual(na.b.x);
        expect(na.b.x).toEqual(na.b.y.z);

        na.d[0] = 40;
        expect(na.d[0]).toEqual(na.b.x[0]);
        expect(na.b.x[0]).toEqual(na.b.y.z[0]);
      });

      it("unserializing a literal object which store circular references should not thow an error and produce the equivalent object", function() {
        
        var a = {
          'a': 1, 
          'b': "toto",
          'c': false,
          'd': [4,5,6]
        }

        a.e = a;
        a.d.push(a);

        var serial;

        expect(function(){serial = $.serialize(a);}).not.toThrow();

        var unserial = $.unserialize(serial);

        expect(unserial.a).toEqual(a.a);
        expect(unserial.b).toEqual(a.b);
        expect(unserial.c).toEqual(a.c);
        expect(unserial.d).toEqual(a.d);
        expect(unserial.e).toEqual(unserial);
      });

      it("serializing a class instance that does not implement the Serializable interface should throw an error.", function() {
        
        var ClassA = function($, µ, _){}

        $.class(ClassA);

        var a = $.new(ClassA);

        expect(function(){ $.serialize(a); }).toThrowException($, OODK.foundation.SerializeNotSupportedException, 'Class anonymous does not implements the interface OODK.foundation.Serializable');
      });

      it("unserializing a string that store Class not none of the namespace should produce a standard literal object", function() {
        
        var serial = '{"__ref__":"/@0/","__type__":"ClassUnknown","x":false}';
        var unserial = $.unserialize(serial);

        expect(typeof unserial).toEqual('object');
        expect(Object.keys(unserial).length).toEqual(1);
        expect(unserial.x).toEqual(false);
      });

      it("serializing an class instance should serialize the class name, all declared non static and non transient members", function() {
        var serial = $.serialize(cz);
        
        expect(serial).toEqual('{"__ref__":"/@0/","__type__":"OODK.jasmine.ClassCZ","x":"test","c":{"0":1,"1":2,"2":3,"__ref__":"/@1/","__type__":"Array"}}');
      });

      it("serializing static members can be perfomed using the __serialize system method", function() {
        var serial = $.serialize(az);
        
        expect(serial).toEqual('{"__ref__":"/@0/","__type__":"OODK.jasmine.ClassAZ","x":10,"c":{"0":1,"1":2,"2":3,"__ref__":"/@1/","__type__":"Array"},"cz":{"__ref__":"/@2/","__type__":"OODK.jasmine.ClassCZ","x":"test","c":{"0":1,"1":2,"2":3,"__ref__":"/@3/","__type__":"Array"}},"staticA":10}');
      });

      it("serializing/unserializing a class instance should be able to call the parent __serialize to serialize parent private properties and __unserialize to unserialize private parent properties", function(){

          $.class(function ClassB12($, µ, _){

            $.private("privateA");

            $.public(function __initialize(a){
              _.privateA = a;
            });

            $.protected(function __serialize(serializer){

              serializer.serialize('privateA', $);
            });

            $.protected(function __unserialize(deserializer){

              deserializer.unserialize('privateA', $);
            });

            $.public(function getPrivateA(){
              return _.privateA;
            });
          });

          $.extends(_.ClassB12).implements(OODK.foundation.Serializable).class(function ClassA12($, µ, _){

            $.private('x');

            $.public(function __initialize(aa){
              _.x = 10;
              µ.y = 20;

              $.super.__initialize(aa);
            });
          });

          var a = $.new(_.ClassA12, 100);

          var serial = $.serialize(a);

          expect(serial).toEqual('{"__ref__":"/@0/","__type__":"OODK.jasmine.ClassA12","x":10,"privateA:OODK.jasmine.ClassB12":100}');

          var u = $.unserialize(serial);

          expect(u.getPrivateA()).toEqual(100);
      });

      it("serializing an class instance that contains circular reference should not throw an error", function() {
        
        var ClassA = function($, µ, _){

          $.private('a');

          $.public(function __initialize(){
            _.a = $.new(ClassB, this);
          });

          $.private(function __serialize(serializer){
            serializer.serialize('a', $);
          });
        }

        $.implements(OODK.foundation.Serializable).class(ClassA);

        var ClassB = function($, µ, _){

          $.protected('parent');

          $.public(function __initialize(parent){
            µ.parent = parent;
          });

          $.protected(function __serialize(serializer){
            serializer.serialize('parent', $);
          });
        }

        $.implements(OODK.foundation.Serializable).class(ClassB);

        var a = $.new(ClassA);

        expect(function(){$.serialize(a);}).not.toThrow();
      });

      it("unserialize to a class should not call the __initialize method", function() {
        
        function ClassAB($, µ, _){

          $.public('x');
          $.public('y');

          $.public(function __initialize(){
            this.y = 10;
          });
        }

        $.implements(OODK.foundation.Serializable).class(ClassAB);

        var serial = '{"__ref__":"/@0/","__type__":"OODK.jasmine.ClassAB","x":false}';

        var unserial = $.unserialize(serial);

        expect(unserial.x).toEqual(false);
        expect(unserial.y).toEqual(undefined);
      });

      it("unserializing an object graph with circular references should produce the equivalent object", function() {
        
        function ClassAX($, µ, _){

          $.private('b');

          $.public(function __initialize(){
            _.b = $.new(ClassBX, this);
          });

          $.public(function getB(){
            return _.b;
          });
        }

        $.public().implements(OODK.foundation.Serializable).class(ClassAX);

        function ClassBX($, µ, _){

          $.protected('a');

          $.public(function __initialize(a){
            µ.a = a;
          });

          $.public(function getA(){
            return µ.a;
          });
        }

        $.public().implements(OODK.foundation.Serializable).class(ClassBX);

        var a = $.new(ClassAX);

        var serial = $.serialize(a);
        var unserial = $.unserialize(serial);

        expect(unserial.getB().getA()).toEqual(unserial);
      });

      it("unserializing a string that store declared class which does not implements the Serializable interface should throw an error.", function() {
        
        var ClassAS = function ClassAS($, µ, _){}

        $.public().class(ClassAS);

        var serial = '{"__ref__":"/@0/","__type__":"OODK.jasmine.ClassAS","x":false}';

        expect(function(){ $.unserialize(serial); }).toThrowException($, OODK.foundation.SerializeNotSupportedException, 'Class OODK.jasmine.ClassAS does not implements the interface OODK.foundation.Serializable');
      });

      it("overriding: unserialize to a class that implements a protected __unserialize on the parent class should not throw an error", function() {
        
        function ClassAW($, µ, _){

          $.private('x');

          $.public(function getX(){
            return _.x;
          });

         $.protected(function __unserialize(deserializer){
            deserializer.unserialize('x', $);
          });
        }

        $.public().implements(OODK.foundation.Serializable).class(ClassAW);

        function ClassBW($, µ, _){}

        $.public().extends(ClassAW).class(ClassBW);

        var serial = '{"__ref__":"/@0/","__type__":"OODK.jasmine.ClassBW","x:OODK.jasmine.ClassAW":false}';

        var unserial;

        expect(function(){ unserial = $.unserialize(serial)}).not.toThrow();
        expect(unserial.getX()).toEqual(false);
      });

      it("serializing a mutable or dynamic class should serialize all non-static members", function() {
          
          $.implements(OODK.foundation.Serializable).dynamic().class(function ClassSM($, µ, _){

            $.public(function __initialize(){
              this.a = 10;

              this.self.staticA = 100;
            });
          });

          var m = $.new(_.ClassSM);

          expect($.serialize(m)).toEqual('{"__ref__":"/@0/","__type__":"OODK.jasmine.ClassSM","a":10}');
      });

      it("unserializing a mutable or dynamic class should not unserialize without calling __serialize", function() {
          
          $.implements(OODK.foundation.Serializable).dynamic().class(function ClassSM3($, µ, _){

            $.public(function __initialize(){
              this.a = 10;

              this.self.staticA = 100;
            });

            $.public(function __serialize(serializer){
              serializer.serialize('staticA', $);
            });
          });

          var m = $.new(_.ClassSM3);

          var m2 = $.unserialize($.serialize(m));

          expect(m2.a).toEqual(undefined);

          expect(m2.staticA).toEqual(undefined);
      });

      it("serializing a mutable or dynamic class should call the __serialize method", function() {
          
          $.implements(OODK.foundation.Serializable).dynamic().class(function ClassSM2($, µ, _){

            $.public(function __initialize(){
              this.a = 10;

              this.self.staticA = 100;
            });

            $.public(function __serialize(serializer){
              serializer.serialize('staticA', $);
            });
          });

          var m = $.new(_.ClassSM2);

          expect($.serialize(m)).toEqual('{"__ref__":"/@0/","__type__":"OODK.jasmine.ClassSM2","a":10,"staticA":100}');
      });

      it("unserializing a mutable or dynamic class should call the __unserialize method", function() {
          
          $.implements(OODK.foundation.Serializable).dynamic().class(function ClassSM4($, µ, _){

            $.public(function __initialize(){
              this.a = 10;

              this.self.staticA = 100;
            });

            $.public(function __serialize(serializer){
              serializer.serialize('staticA', $);
            });

            $.public(function __unserialize(deserializer){
              this.self.staticA = deserializer.unserialize('staticA', $);
              this.a = deserializer.unserialize('a', $);
            });
          });

          var m = $.new(_.ClassSM4);

          var serial = $.serialize(m);

          var m2 = $.unserialize(serial);

          expect(m2.a).toEqual(10);

          expect(_.ClassSM4.self.staticA).toEqual(100);
      });

    });

  });