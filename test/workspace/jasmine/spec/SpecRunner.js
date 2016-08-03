require([
  'jquery',
  'jasmine',
  'jasmine-html',
  'spec/SpecHelper',
  'oodk'
],
function($, jasmine) {

  OODK.config({
    'path': {
      'oodk': '../../src',
      'workspace': 'workspace',
      'jasmine': '{workspace}/jasmine/spec',
      'myProject': '{workspace}/myProject'
    }
  });

  OODK(function($){

    $.import('[kernel.api]');

    
    $.import('{jasmine}/interface_and_abstract');
    $.import('{jasmine}/api/conversion');
    $.import('{jasmine}/namespace');
    $.import('{jasmine}/class');
    $.import('{jasmine}/instantiation');
    $.import('{jasmine}/static_scope');
    $.import('{jasmine}/inheritance_and_overriding');
    $.import('{jasmine}/final');
    $.import('{jasmine}/static_and_local');
    $.import('{jasmine}/api/clone');
    $.import('{jasmine}/native');
    $.import('{jasmine}/dependency_import_package');
    $.import('{jasmine}/api/iteration');
    $.import('{jasmine}/api/reflection');
    $.import('{jasmine}/api/serialization');
    $.import('{jasmine}/destroy');
    $.import('{jasmine}/is');
    $.import('{jasmine}/api/typing');
    $.import('{jasmine}/dynamic_and_mutable');
    $.import('{jasmine}/alias');
    $.import('{jasmine}/proxy');
    $.import('{jasmine}/api/comparison');
    $.import('{jasmine}/api/sort');
    $.import('{jasmine}/foundation/util/url');
    $.import('{jasmine}/default');
  });

  var jasmineEnv = jasmine.getEnv();
  jasmineEnv.updateInterval = 1000;

  var htmlReporter = new jasmine.HtmlReporter();
  jasmineEnv.addReporter(htmlReporter);
  jasmineEnv.specFilter = function(spec) {
    return htmlReporter.specFilter(spec);
  };

  $(function () { jasmine.getEnv().execute(); });
});