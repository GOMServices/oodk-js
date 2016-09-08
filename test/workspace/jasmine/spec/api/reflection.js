
  OODK('jasmine', function($, _){

    var ClassQ;

    var Itf1 = $.interface(function($, µ, _){

      $.abstract('getOne');
    });

    var Itf2 = $.interface(function($, µ, _){

      $.abstract('getTwo');
    });

    var Itf3 = $.extends(Itf2).interface(function($, µ, _){

      $.abstract('getThree');
    });

    var ClassB = $.abstract().class(function($, µ, _){

      $.private('a');

      $.public(function getOne(){
        return 1;
      });

      $.public(function getThree(){

        ClassQ = $.class(function ClassQ($, µ, _){});

        return $.new(ClassQ);
      });

      $.abstract('getStatus');
    });

    var ClassA = $.final().implements(Itf1, Itf3).extends(ClassB).class(function($, µ, _){

      $.private('a');

      $.protected('b');
      
      $.public('c');

      $.final().protected(function getStatus(){
        return _.a;
      });

      $.static(function($, µ, _){

        $.public(function getTwo(){
          return 2;
        });
      });
    });

    var a = $.new(ClassA);

    a.getThree();

    $.public().class(function ClassO($, µ, _){});

    $.class(function ClassP($, µ, _){});

    var ClassMyString = $.extends(String).class(function($, µ, _){});

    var ClassT = $.dynamic().class(function($, µ, _){});

    var ClassS = $.mutable().class(function($, µ, _){});

    var ClassProxyA = $.proxy(ClassA).class(function($, µ, _){});

    var ClassProxy = $.class(function($, µ, _){

      $.proxy().public('factoryClassA', ClassA);
    });

    var publicContext = this;

    describe("OODK-JS:: API reflection", function() {

      it("getClass function", function() {

        expect($.getClass(function(){})).toEqual(Function);
      });

      it("getClass undefined", function() {

        expect($.getClass(undefined)).toEqual(undefined);
      });

      it("getClass null", function() {

        expect($.getClass(null)).toEqual(undefined);
      });

      it("getClass 'test'", function() {

        expect($.getClass("test")).toEqual(String);
      });

      it("getClass valid instance", function() {

        expect($.getClass(a)).toEqual(ClassA);
      });

      it("inspect a non OODK element should return undefined", function() {

        expect($.inspect(function(){})).toEqual(undefined);
      });

      it("getName on a class should return the name of the class", function() {

       expect($.inspect(ClassA).getName()).toEqual('anonymous');
       expect($.inspect(publicContext.ClassO).getName()).toEqual('OODK.jasmine.ClassO');       
      });

      it("getLocalName on a class should return the name of the class", function() {

       expect($.inspect(publicContext.ClassO).getLocalName()).toEqual('ClassO');       
      });

      it("getClass on an instance should return the class of the instance", function() {

       expect($.inspect(a).getClass()).toEqual(ClassA);       
      });

      it("getSuperClass on a class should return the parent class of the instance", function() {

        expect($.inspect(ClassA).getSuperClass()).toEqual(ClassB);       
      });

      it("getSuperClass on an interface should return the parent interfaces", function() {

        expect($.inspect(Itf3).getSuperClass()).toEqual([Itf2]);       
      });

      it("getInterfaces on a class should return the interfaces the class", function() {

        expect($.inspect(ClassA).getInterfaces()).toEqual([Itf1, Itf3]);       
      });

      it("isAbstract on an abstract class should return true", function() {

        expect($.inspect(ClassB).isAbstract()).toEqual(true);       
      });

      it("isFinal on a final class should return true", function() {

        expect($.inspect(ClassA).isFinal()).toEqual(true);       
      });

      it("isAnonymous on an anonymous class should return true", function() {

        expect($.inspect(ClassA).isAnonymous()).toEqual(true);       
      });

      it("isLocal on a local class should return true", function() {

        expect($.inspect(ClassQ).isLocal()).toEqual(true);
      });

      it("isDynamic on a dynamic class should return true", function() {

        expect($.inspect(ClassT).isDynamic()).toEqual(true);
      });

      it("isMutable on a mutable class should return true", function() {

        expect($.inspect(ClassS).isMutable()).toEqual(true);
      });

      it("getScope on a local class should return the public context of the instance where the class has been declared", function() {

        expect($.inspect(ClassQ).getScope()).toEqual(a);
      });

      it("getScope on a private class should return the public context of the namespace where the class has been declared", function() {
        expect($.inspect(publicContext.ClassO).getScope()).toEqual(OODK.jasmine);
      });

      it("getScope on a public class should return the public context of the namespace where the class has been declared", function() {

        expect($.inspect(_.ClassP).getScope()).toEqual(OODK.jasmine);
      });

      it("getFile on a class should return the the resolved path of the file where the class has been declared", function() {

        expect($.inspect(_.ClassP).getFile()).toEqual('workspace/jasmine/spec/api/reflection.js');
      });

      it("getImport on a class should return the the import path of the file where the class has been declared", function() {

        expect($.inspect(_.ClassP).getImport()).toEqual('{jasmine}/api/reflection');
      });

      it("isNative on a class which inherit from a native js type should return true", function() {

        expect($.inspect(ClassMyString).isNative()).toEqual(true);
      });

      it("isNative on a class which does not inherit from a native js type should return false", function() {

        expect($.inspect(ClassA).isNative()).toEqual(false);
      });

      it("isClass on a class should return true", function() {

        expect($.inspect(ClassA).isClass()).toEqual(true);       
      });

      it("isPublic on a public class should return true", function() {

        expect($.inspect(publicContext.ClassO).isPublic()).toEqual(true);       
      });

      it("isPrivate on a private class should return true", function() {

        expect($.inspect(_.ClassP).isPrivate()).toEqual(true);       
      });

      it("isInterface on an interface should return true", function() {

        expect($.inspect(Itf1).isInterface()).toEqual(true);       
      });

      it("isNamespace on a namespace should return true", function() {

        expect($.inspect(OODK.jasmine).isNamespace()).toEqual(true);       
      });

      it("isProxy on a proxy class should return true", function() {

        expect($.inspect(ClassProxyA).isProxy()).toEqual(true);       
      });

      it("isProxy on a standard class should return false", function() {

        expect($.inspect(ClassA).isProxy()).toEqual(false);       
      });

      it("getDeclaredMembers on a class should return all the declared members of a class", function() {

        var declaredMembers = $.inspect(ClassA).getDeclaredMembers();

        expect(Object.keys(declaredMembers).length).toEqual(7);       
      });

      it("getDeclaredMembers on a member should return true on isPrivate and isProperty", function() {

        expect($.inspect(ClassA).getDeclaredMembers('a').isPrivate()).toEqual(true);
        expect($.inspect(ClassA).getDeclaredMembers('a').isProperty()).toEqual(true);       
      });

      it("getDeclaredMembers on b member should return true on isProperty and isPublic", function() {

        expect($.inspect(ClassA).getDeclaredMembers('b').isProperty()).toEqual(true);  
        expect($.inspect(ClassA).getDeclaredMembers('b').isProtected()).toEqual(true);       
      });

      it("getDeclaredMembers on c member should return true on isProperty and isPublic", function() {

        expect($.inspect(ClassA).getDeclaredMembers('c').isProperty()).toEqual(true);  
        expect($.inspect(ClassA).getDeclaredMembers('c').isPublic()).toEqual(true);       
      });

      it("getDeclaredMembers on getTwo member should return true on isStatic, isMethod and isPublic", function() {

        expect($.inspect(ClassA).getDeclaredMembers('getTwo').isStatic()).toEqual(true);
        expect($.inspect(ClassA).getDeclaredMembers('getTwo').isMethod()).toEqual(true);
        expect($.inspect(ClassA).getDeclaredMembers('getTwo').isPublic()).toEqual(true);       
      });

      it("getDeclaredMembers on ClassB::getStatus member should return true on isAbstract, isMethod", function() {

        expect($.inspect(ClassB).getDeclaredMembers('getStatus').isAbstract()).toEqual(true); 
        expect($.inspect(ClassB).getDeclaredMembers('getStatus').isMethod()).toEqual(true);      
      });

      it("getDeclaredMembers on ClassA::getStatus member should return true on isMethod, isProtected", function() {

        expect($.inspect(ClassA).getDeclaredMembers('getStatus').isProtected()).toEqual(true); 
        expect($.inspect(ClassA).getDeclaredMembers('getStatus').isMethod()).toEqual(true);      
      });
    });

  });