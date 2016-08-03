
OODK('jasmine', function($, _){

    $.class(function ClassLambda($, µ, _){});

      $.class(function ClassOmega($, µ, _){});

      $.implements(OODK.foundation.Comparable).class(function ClassEmployee($, µ, _){

        $.private('name');

        $.public(function __initialize(name){
           _.name = name;
        });

        $.public(function toString(){
           return "employee " + _.name;
        });

        $.public(function getName(){
           return _.name;
        });

        $.private(function __compareTo(b){

          if($.is(b, _.ns.ClassUser)){
            return $.compare(_.name, b.getLogin());
          }else if($.is(b, _.ns.ClassEmployee)){
            return $.compare(_.name, b.getName());
          }
        });
    });

    $.implements(OODK.foundation.Comparable).class(function ClassUser($, µ, _){

        $.private('login');

        $.public(function __initialize(login){
           _.login = login;
        });

        $.public(function getLogin(){
           return _.login;
        });

        $.public(function toString(){
           return "user " + _.login;
        });

        $.private(function __compareTo(b){
          if($.is(b, _.ns.ClassUser)){
            return $.compare(_.login, b.getLogin());
          }else if($.is(b, _.ns.ClassEmployee)){
            return $.compare(_.login, b.getName());
          }
        });
    });

    $.implements(OODK.foundation.Comparator).class(function ClassComparatorInverse($, µ, _){

       $.private(function compare(a, b){

        if($.is(a, _.ns.ClassEmployee)){
          a = a.getName();
        }else if($.is(a, _.ns.ClassUser)){
          a = a.getLogin();
        }

        if($.is(b, _.ns.ClassEmployee)){
          b = b.getName();
        }else if($.is(b, _.ns.ClassUser)){
          b = b.getLogin();
        }

        return b.localeCompare(a);
      });
    });

    $.implements(OODK.foundation.Comparator).class(function ClassComparator($, µ, _){

       $.static(function($, µ, _){

        $.private(function compare(a, b){

          if($.is(a, _.ns.ClassEmployee)){
            a = a.getName();
          }else if($.is(a, _.ns.ClassUser)){
            a = a.getLogin();
          }

          if($.is(b, _.ns.ClassEmployee)){
            b = b.getName();
          }else if($.is(b, _.ns.ClassUser)){
            b = b.getLogin();
          }

          return a.localeCompare(b);
        });
      });
    });

    $.implements(OODK.foundation.Comparator).class(function ClassComparatorLiteral($, µ, _){

       $.static(function($, µ, _){

        $.private(function compare(a, b){

          return b[0].localeCompare(a[0]);
        });
      });
    });

    describe("OODK-JS:: API Comparison", function() {

      it("compare to same number should be equal to 0", function() {

        expect($.compare(10, 10)).toEqual(0);
      });

      it("compare to different number with first number greater than second number should be equal to 1", function() {

        expect($.compare(10, 3)).toEqual(1);
      });

      it("compare to different number with first number lower than second number should be equal to -1", function() {

        expect($.compare(3, 10)).toEqual(-1);
      });

      it("compare to same date should be equal to 0", function() {

        expect($.compare(new Date("2010-10-10"), new Date("2010-10-10"))).toEqual(0);
      });

      it("compare to different date with first date posterior to second date should be equal to 1", function() {

        expect($.compare(new Date("2010-10-10"), new Date("2010-10-09"))).toEqual(1);
      });

      it("compare to different date with first date anterior to second date should be equal to -1", function() {

        expect($.compare(new Date("2010-10-09"), new Date("2010-10-10"))).toEqual(-1);
      });

      it("compare to same string should be equal to 0", function() {

        expect($.compare("anna", "anna")).toEqual(0);
      });

      it("compare to same string with accent should be equal to 0", function() {

        expect($.compare("gérard", "gérard")).toEqual(0);
      });

      it("compare 'anna' to 'gerard' should be equal to -1", function() {

        expect($.compare("anna", "gerard")).toEqual(-1);
      });

      it("compare two array with same number of keys and values should be equal to 0", function() {

        expect($.compare([1,2,3], [1,2,3])).toEqual(0);
      });

      it("compare two array with different number of keys should be equal to -1", function() {

        expect($.compare([1,2,3], [1,2,3,4])).toEqual(-1);
      });

      it("compare two array with circular reference and same numberof keys and values should not throw an exception and equal to 0", function() {

        var a = [1,2];

        a.push(a);

        var b = [1,2];

        b.push(b);

        var r;

        expect(function(){r = $.compare(a, b)}).not.toThrow();

        expect(r).toEqual(0);
      });

      it("compare two array with circular reference and different values should not throw an exception and equal to -1", function() {

        var a = [1,2];

        a.push(a);

        var b = [1,2, "b"];

        var r;

        expect(function(){r = $.compare(a, b)}).not.toThrow();

        expect(r).toEqual(-1);
      });

      it("compare two literal objects with same keys and values should be equal to 0", function() {

        expect($.compare({'a': 1, 'b': 2, 'c': 3}, {'a': 1, 'b': 2, 'c': 3})).toEqual(0);
      });

      it("compare two literal objects with same keys and values included embedded objects should be equal to 0", function() {

        expect($.compare({'a': 1, 'b': 2, 'c': {'d': 3, 'e': 4}}, {'a': 1, 'b': 2, 'c': {'d': 3, 'e': 4}})).toEqual(0);
      });

      it("compare two literal objects with different keys should be equal to -1", function() {

        expect($.compare({'a': 1, 'b': 2, 'c': 3}, {'a': 1, 'c': 2, 'b': 3})).toEqual(-1);
      });

      it("compare txo literal objects with circular reference with same keys and values should not throw an exception and equal to 0", function() {

        var a = {'a': 1, 'b': 2};

        a['c'] = a;

        var b = {'a': 1, 'b': 2};

        b['c'] = b;

        var r;

        expect(function(){r = $.compare(a, b)}).not.toThrow();

        expect(r).toEqual(0);
      });

      it("compare to literal object with circular reference and different values should not throw an exception and equal to -1", function() {

         var a = {'a': 1, 'b': 2};

        a['c'] = a;

        var b = {'a': 1, 'b': 2};

        b['c'] = false;

        var r;

        expect(function(){r = $.compare(a, b)}).not.toThrow();

        expect(r).toEqual(-1);
      });

      it("compare two class instances not implementing the comparable should throw a ClassCastException", function() {

        var a = $.new(_.ClassLambda);

        var b = $.new(_.ClassOmega);

        expect(function(){$.compare(a, b);}).toThrowException($, OODK.foundation.ClassCastException, "object(OODK.jasmine.ClassLambda) does not implements OODK.foundation.Comparable");
      });

      it("compare a class instance implementing the comparable interface should be call the bahvior method __compareTo", function() {

        var a = $.new(_.ClassEmployee, 'anna');

        var b = $.new(_.ClassUser, 'anna');

        var c = $.new(_.ClassUser, 'paul');

        expect($.compare(a, b)).toEqual(0);

        expect($.compare(a, c)).toEqual(-1);
      });

      it("compare a native type implementing the bahvior method __compareTo should call this method", function() {

        Array.prototype.__compareTo = function __compareTo(b){

          return $.compare(this.join(" "), b);
        }

        expect($.compare(["anna", "apouzo"], "anna apouzo")).toEqual(0);

        delete Array.prototype.__compareTo;
      });
    });
  });