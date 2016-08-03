
OODK('jasmine', function($, _){

    $.class(function ClassHKO($, µ, _){

      $.public('a', 1);

      $.private('b');

      $.public(function __initialize(b){
        _.b = b;
      });

      $.public(function getB(){
        return _.b;
      });

      $.public(function setB(b){
        _.b = b;
      });

      $.static(function($, µ, _){

        $.public('staticA', false);
        
        $.public(function getStaticA(){
          return this.staticA;
        });

        $.public(function setStaticA(a){
          this.staticA = a;
        });
      });
    });

    $.public().proxy(_.ClassHKO).class(function ProxyClassHKO($, µ, _){

      $.proxy().public('getB');

      $.proxy().public('a');

      $.static(function($, µ, _){

        $.proxy().public('staticA');

        $.proxy().public('getStaticA');
      });
      
    });

    var pa = $.new(this.ProxyClassHKO, 10);

    var publicContext = this;

    describe("OODK-JS:: proxy", function() {

      it("retrieve a proxy property should retrieve the value of the target property", function() {

        expect(pa.a).toEqual(1);
      });

      it("call a proxy method should call the method of target class", function() {

        expect(pa.getB()).toEqual(10);
      });

      it("assigning a value to a proxy property should reflect the change in the target property", function() {

        pa.a = 20;

        expect(pa.a).toEqual(20);
      });

      it("call a proxy static method should call the method of target class", function() {

        expect(publicContext.ProxyClassHKO.self.getStaticA()).toEqual(false);
      });

      it("retrieve a proxy static property should retrieve the value of the target property", function() {

        publicContext.ProxyClassHKO.self.staticA = true;

        expect(publicContext.ProxyClassHKO.self.getStaticA()).toEqual(true);
      });
    });
  });