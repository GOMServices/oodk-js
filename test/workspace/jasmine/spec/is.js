

  OODK('jasmine', function($){

    var ClassB = $.class(function($, µ, _){
      
      $.private('debug', true);
    });

    var b = $.new(ClassB);

    $.destroy(b);

    var a;

    var c = {'a': 1, 'b': 2, 'c': 3};

    $.destroy(c);

    var d = "test";

    var e = function(){};

    var i = 10;

    $.public().interface(function Itf11($){
      $.abstract('getOne');
    });

    $.public().interface(function Itf22($){
      $.abstract('getTwo');
    });

    $.public().extends(this.Itf22).interface(function Itf33($){
      $.abstract('getThree');
    });

    $.public().class(function ClassBBB($, µ, _){

      $.public(function getThree(){
        return 3;
      });
    });

    $.public().extends(this.ClassBBB).implements(this.Itf11, this.Itf33).class(function ClassAAA($, µ, _){
      
      $.public(function getOne(){
        return 1;
      });

      $.public(function getTwo(){
        return 2;
      });
    });

    var aaa = $.new(this.ClassAAA);

    var publicContext = this;

    describe("OODK-JS:: is", function() {

      it("isEmpty: testing '   ' should be true", function() {
        expect($.isEmpty("   ")).toEqual(true);
      });

      it("isEmpty: testing null should be true", function() {
        expect($.isEmpty(null)).toEqual(true);
      });

      it("isEmpty: testing NaN should be true", function() {
        expect($.isEmpty(NaN)).toEqual(true);
      });

      it("isEmpty: testing undefined should be true", function() {
        expect($.isEmpty(undefined)).toEqual(true);
      });

      it("isEmpty: testing {} should be true", function() {
        expect($.isEmpty({})).toEqual(true);
      });

      it("isEmpty: testing [] should be true", function() {
        expect($.isEmpty([])).toEqual(true);
      });

      it("isEmpty: testing a class instance with no properties declared should be true", function() {
        var ClassXX = $.class(function($, µ, _){

          $.public(function test(){});

          $.static(function($, µ, _){

            $.public(function staticTest(){});
          })
        });
        expect($.isEmpty($.new(ClassXX))).toEqual(true);
      });

      it("isEmpty: testing 10 should not be true", function() {
        expect($.isEmpty(10)).toEqual(false);
      });

      it("isFunc: testing [1,2,3] should not be true", function() {
        expect($.isFunc([1,2,3])).toEqual(false);
      });

      it("isFunc: testing undefined should not be true", function() {
        expect($.isFunc(undefined)).toEqual(false);
      });

      it("isFunc: testing function(){} should be true", function() {
        expect($.isFunc(function(){})).toEqual(true);
      });

      it("is: OODK.literal testing a class instance should not be true", function() {

        var ClassA = $.class(function($, µ, _){});

        expect($.is($.new(ClassA), OODK.literal)).toEqual(false);
      });

      it("is: OODK.literal testing [1,2,3] should not be true", function() {

        expect($.is([1,2,3], OODK.literal)).toEqual(false);
      });

      it("is: OODK.literal testing {'a': 1} should be true", function() {
        expect($.is({'a': 1}, OODK.literal)).toEqual(true);
      });

      it("isObject: testing null should not be true", function() {
        expect($.isObject(null)).toEqual(false);
      });

      it("isObject: testing 'test' should not be true", function() {
        expect($.isObject('test')).toEqual(false);
      });

      it("isObject: testing a class instance should be true", function() {

        var ClassB = $.class(function($, µ, _){});

        expect($.isObject($.new(ClassB))).toEqual(true);
      });

      it("isIterable: testing a string should be true", function() {

        expect($.isIterable("test")).toEqual(true);
      });

      it("isIterable: testing an array should be true", function() {

        expect($.isIterable([1,2,3])).toEqual(true);
      });

      it("isIterable: testing null should be false", function() {

        expect($.isIterable(null)).toEqual(false);
      });

      it("isIterable: testing undefined should be false", function() {

        expect($.isIterable(undefined)).toEqual(false);
      });

      it("isIterable: testing a class instance implementing Iterable interface should be true", function() {

        var ClassXYZ = $.implements(OODK.foundation.Iterable).class(function($, µ, _){
          $.private(function __iterator(){});
        });

        expect($.isIterable($.new(ClassXYZ))).toEqual(true);
      });

      it("isIterable: testing a class instance not implementing Iterable interface should be false", function() {

        var ClassXYZ = $.class(function($, µ, _){});

        expect($.isIterable($.new(ClassXYZ))).toEqual(false);
      });

      it("testing if a variable is defined on a undefined value should be false", function() {
        expect($.isset(a)).toEqual(false);
      });

      it("testing if a variable is defined on a NaN value should be false", function() {
        expect($.isset((10/"test"))).toEqual(false);
      });

      it("testing if a variable is defined on a destroyed leitral object value should be false", function() {
        expect($.isset(c)).toEqual(false);
      });

      it("testing if a variable is defined in other case should be true", function() {
        expect($.isset(d)).toEqual(true);
        expect($.isset(e)).toEqual(true);
        expect($.isset(i)).toEqual(true);
      });

      it("testing if a class instance is of type of its direct class", function() {
        expect($.is(aaa, publicContext.ClassAAA)).toEqual(true);
      });

      it("testing if a class instance is of type of its direct class", function() {
        expect($.is(aaa, publicContext.ClassBBB)).toEqual(false);
      });

      it("testing if a class instance is an instance of its parent class", function() {
        expect($.is(aaa, OODK.instanceOf(publicContext.ClassAAA))).toEqual(true);
      });

      it("testing if a class instance is an instance of its ancestors class", function() {
        expect($.is(aaa, OODK.instanceOf(publicContext.ClassBBB))).toEqual(true);
      });

      it("testing if a class instance is an instance of it's direct interface", function() {
        expect($.is(aaa, OODK.instanceOf(publicContext.Itf11))).toEqual(true);
      });

      it("testing if a class instance is an instance of its parent interfaces", function() {
        expect($.is(aaa, OODK.instanceOf(publicContext.Itf33))).toEqual(true);
      });

    
    });

  });