
OODK('jasmine', function($, _){

    
    var ClassEmployee = $.implements(OODK.foundation.Comparable).class(function($, µ, _){

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

          if($.is(b, ClassUser)){
            return $.compare(_.name, b.getLogin());
          }else if($.is(b, ClassEmployee)){
            return $.compare(_.name, b.getName());
          }
        });
    });

    var ClassUser = $.implements(OODK.foundation.Comparable).class(function($, µ, _){

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
          if($.is(b, ClassUser)){
            return $.compare(_.login, b.getLogin());
          }else if($.is(b, ClassEmployee)){
            return $.compare(_.login, b.getName());
          }
        });
    });

    var ClassComparatorInverse = $.implements(OODK.foundation.Comparator).class(function($, µ, _){

       $.private(function compare(pair1, pair2){

        var a = pair1[1];

        var b = pair2[1];

        if($.is(a, ClassEmployee)){
          a = a.getName();
        }else if($.is(a, ClassUser)){
          a = a.getLogin();
        }

        if($.is(b, ClassEmployee)){
          b = b.getName();
        }else if($.is(b, ClassUser)){
          b = b.getLogin();
        }

        return b.localeCompare(a);
      });
    });

    var ClassComparator = $.implements(OODK.foundation.Comparator).class(function($, µ, _){

      $.static(function($, µ, _){

        $.private(function compare(pair1, pair2){

          var a = pair1[1];

          var b = pair2[1];

          if($.is(a, ClassEmployee)){
            a = a.getName();
          }else if($.is(a, ClassUser)){
            a = a.getLogin();
          }

          if($.is(b, ClassEmployee)){
            b = b.getName();
          }else if($.is(b, ClassUser)){
            b = b.getLogin();
          }

          return a.localeCompare(b);
        });
      });
    });

    var ClassComparatorLiteral = $.implements(OODK.foundation.Comparator).class(function($, µ, _){

       $.static(function($, µ, _){

        $.private(function compare(a, b){

          return b[0].localeCompare(a[0]);
        });
      });
    });

    var ClassNotSortable = $.class(function($, µ, _){});

    var ClassImmutable = $.implements(OODK.foundation.Sortable).class(function($, µ, _){

      $.private(function __sort(){
        return $.new(OODK.foundation.util.Sorter, this);
      });
    });

    var ClassSorterNotValid = $.implements(OODK.foundation.Sortable).class(function($, µ, _){

      $.private(function __sort(){
        return $.new(OODK.foundation.util.Iterator, this);
      });
    });

    var MyCollection = $.dynamic().implements(OODK.foundation.Sortable, OODK.foundation.Iterable).class(function($, µ, _){

      $.public(function set(key, obj){
        _[key] = obj;
      });

      $.private(function __iterator(){
        return $.new(OODK.foundation.util.Iterator, _);
      });

      $.private(function __sort(){
        return $.new(OODK.foundation.util.Sorter, _);
      });
    });

    describe("OODK-JS:: API Sort", function() {

      it("sort an array of string should sort the array in the ascendant order", function() {

        var a  = ["ygor", "anna", "gérard"];

        $.sort(a);

        expect(a[0]).toEqual("anna");
        expect(a[1]).toEqual("gérard");
        expect(a[2]).toEqual("ygor");
      });

      it("sort an array of instances of the same class implementing the comparable interface should call the behavior method __compareTo and sort the array in ascendant order", function() {

        var a = $.new(ClassEmployee, 'paul');

        var b = $.new(ClassEmployee, 'alice');

        var c = $.new(ClassEmployee, 'alberta');

        var arr  = [a, b, c];

        $.sort(arr);

        expect(arr[0].toString()).toEqual("employee alberta");
        expect(arr[1].toString()).toEqual("employee alice");
        expect(arr[2].toString()).toEqual("employee paul");
      });

      it("sort an array of instances of different class implementing the comparable interface should call the behavior method __compareTo and sort the array in ascendant order", function() {

        var a = $.new(ClassEmployee, 'paul');
        var b = $.new(ClassEmployee, 'alice');
        var c = $.new(ClassEmployee, 'gérard');

        var d = $.new(ClassUser, 'calypso');
        var e = $.new(ClassUser, 'alberta');
        var f = $.new(ClassUser, 'ygor');

        var arr  = [a, b, c, d, e, f];

        $.sort(arr);

        expect(arr[0].toString()).toEqual("user alberta");
        expect(arr[1].toString()).toEqual("employee alice");
        expect(arr[2].toString()).toEqual("user calypso");
        expect(arr[3].toString()).toEqual("employee gérard");
        expect(arr[4].toString()).toEqual("employee paul");
        expect(arr[5].toString()).toEqual("user ygor");
      });

      it("sort an array passing a comparator implementing the comparator interface should call the compare method", function() {

        var a = $.new(ClassEmployee, 'paul');
        var b = $.new(ClassEmployee, 'alice');
        var c = $.new(ClassEmployee, 'gérard');

        var d = $.new(ClassUser, 'calypso');
        var e = $.new(ClassUser, 'alberta');
        var f = $.new(ClassUser, 'ygor');

        var arr  = [a, b, c, d, e, f];

        $.sort(arr, $.new(ClassComparatorInverse));

        expect(arr[0].toString()).toEqual("user ygor");
        expect(arr[1].toString()).toEqual("employee paul");
        expect(arr[2].toString()).toEqual("employee gérard");
        expect(arr[3].toString()).toEqual("user calypso");
        expect(arr[4].toString()).toEqual("employee alice");
        expect(arr[5].toString()).toEqual("user alberta");
        
      });

      it("sort an array passing a comparator as class implementing the comparator interface should call the static behavior method __compare", function() {

        var a = $.new(ClassEmployee, 'paul');
        var b = $.new(ClassEmployee, 'alice');
        var c = $.new(ClassEmployee, 'gérard');

        var d = $.new(ClassUser, 'calypso');
        var e = $.new(ClassUser, 'alberta');
        var f = $.new(ClassUser, 'ygor');

        var arr  = [a, b, c, d, e, f];

        $.sort(arr, ClassComparator);

        expect(arr[0].toString()).toEqual("user alberta");
        expect(arr[1].toString()).toEqual("employee alice");
        expect(arr[2].toString()).toEqual("user calypso");
        expect(arr[3].toString()).toEqual("employee gérard");
        expect(arr[4].toString()).toEqual("employee paul");
        expect(arr[5].toString()).toEqual("user ygor");
        
      });

      it("sort an array passing a comparator as class not implementing the comparator interface should throw an exception", function() {

        expect(function(){$.sort([1,2,3], ClassEmployee);}).toThrowException($, OODK.foundation.IllegalArgumentException, "anonymous must implement the interface OODK.foundation.Comparator");
        
      });

      it("sort a literal object should sort the values in the ascendant order", function() {

        var a  = {'a': "ygor", 'b': "anna", 'c': "gérard"};

        $.sort(a);

        expect(Object.keys(a)).toEqual(['b', 'c', 'a']);
      });

      it("sort a literal object using  a comparator should sort the keys in the descendant order", function() {

        var a  = {'a': "ygor", 'b': "anna", 'c': "gérard"};

        $.sort(a, ClassComparatorLiteral);

        expect(Object.keys(a)).toEqual(['c', 'b', 'a']);
      });

      it("sort a literal object of instances of the same class implementing the comparable interface should call the behavior method __compareTo and sort the array in ascendant order", function() {

        var a = $.new(ClassEmployee, 'paul');
        var b = $.new(ClassEmployee, 'alice');

        var c = $.new(ClassEmployee, 'alberta');

        var o  = {'a': a, 'b': b, 'c': c};

        $.sort(o);

        expect(Object.keys(o)).toEqual(['c', 'b', 'a']);
      });

      it("sort a class instance fullfilling the requirements should sort properties member in ascendant order", function() {

        var a = $.new(ClassEmployee, 'paul');
        var b = $.new(ClassEmployee, 'alice');

        var c = $.new(ClassEmployee, 'alberta');

        var list  = $.new(MyCollection);

        list.set('a', a); 
        list.set('b', b); 
        list.set('c', c);

        $.sort(list);

        var keys = [];

        $.forEach(list, function(v, k, i){
          keys.push(k);
        });

        expect(keys).toEqual(['c', 'b', 'a']);
      });

      it("sort a not iterable value should throw an exception", function() {

        expect(function(){$.sort("test")}).toThrowException($, OODK.foundation.IllegalArgumentException, 'Cannot sort "test" - it is not an iterable object');

        expect(function(){$.sort(undefined)}).toThrowException($, OODK.foundation.IllegalArgumentException, 'Cannot sort undefined - it is not an iterable object');
      
        expect(function(){$.sort(null)}).toThrowException($, OODK.foundation.IllegalArgumentException, 'Cannot sort null - it is not an iterable object');
      });

      it("sort a class instance not implementing the Sortable interface should throw an exception", function() {

        expect(function(){$.sort($.new(ClassNotSortable))}).toThrowException($, OODK.foundation.SortNotSupportedException, "object(anonymous) does not implements OODK.foundation.Sortable");
      });

      it("sort a class instance return an sorter not implementing the Sorter interface should throw an exception", function() {

        expect(function(){$.sort($.new(ClassSorterNotValid))}).toThrowException($, OODK.foundation.IllegalArgumentException, "object(OODK.foundation.util.Iterator) does not implements OODK.foundation.Sorter");
      });

      it("sort a class instance immutable should throw an exception", function() {

        expect(function(){$.sort($.new(ClassImmutable))}).toThrowException($, OODK.foundation.IllegalArgumentException,"Cannot sort object(anonymous) - class is immutable");
      });
    });
  });