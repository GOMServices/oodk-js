

OODK('jasmine', function($, _){

    $.dependency('{myProject}/ClassB', ['{myProject}/ClassC', '{myProject}/ClassD']);

    $.dependency('{myProject}/ClassA', '{myProject}/ClassB');

    $.package('myProject.partial', ['{myProject}/ClassF', '{myProject}/ClassG']);

    $.package('myProject.partial2', ['{myProject}/ClassI', '{myProject}/ClassJ']);

    $.package('myProject.full', ['{myProject}/ClassE', '[myProject.partial2]']);

    describe("OODK-JS:: dependency, import and package keyword", function() {

      it("importing a file which has dependencies should import the dependencies", function() {

        $.import('{myProject}/ClassA');

        expect(typeof OODK.myProject.ClassA).toEqual('function');

        expect(typeof OODK.myProject.ClassB).toEqual('function');

        expect(typeof OODK.myProject.ClassC).toEqual('function');

        expect(typeof OODK.myProject.ClassD).toEqual('function');
      });

      it("trying to import a file with an invalid path should throw an error", function() {

        expect(function(){$.import('{fakePath}/ClassA');}).toThrowException($, OODK.foundation.IllegalArgumentException, 'Cannot resolve path "{fakePath}/ClassA.js", "{fakePath}" is not defined');
      });

      it("importing a package should import all included files as well as their dependencies", function() {

        $.import('[myProject.partial]');

        expect(typeof OODK.myProject.ClassF).toEqual('function');

        expect(typeof OODK.myProject.ClassG).toEqual('function');
      });

       it("trying to import a package which does not exists", function() {

        expect(function(){$.import('[fakePackage]');}).toThrow('package [fakePackage] is not defined');
      });

      it("importing a package should import all included embedded packages", function() {

        $.import('[myProject.full]');

        expect(typeof OODK.myProject.ClassE).toEqual('function');

        expect(typeof OODK.myProject.ClassI).toEqual('function');

        expect(typeof OODK.myProject.ClassJ).toEqual('function');
      });

      it("using dependency keyword with only one argument should retrieve all dependencies for that file", function() {

        var dependencies = $.dependency('{myProject}/ClassB');

        expect(dependencies).toEqual(['{myProject}/ClassC', '{myProject}/ClassD']);
      });
    });
  });