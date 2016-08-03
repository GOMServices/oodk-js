var require = {
  baseUrl: '../src',

  paths: {
    'spec': '../test/workspace/jasmine/spec',

    'jquery': '../test/lib/jquery',

    'sinon': '../test/lib/sinon',
    'jasmine': '../test/lib/jasmine-1.3.1/jasmine',
    'jasmine-html': '../test/lib/jasmine-1.3.1/jasmine-html',
    'jasmine-jquery': '../test/lib/jasmine-jquery',
    'jasmine-sinon': '../test/lib/jasmine-sinon',
    'mock-ajax': '../test/lib/mock-ajax'
  },

  shim: {
    'jasmine': {
      exports: 'jasmine'
    },
    'sinon': {
      exports: 'sinon'
    },
    'jasmine-html': ['jasmine'],
    'jasmine-jquery': ['jasmine'],
    'jasmine-sinon': ['jasmine'],
    'mock-ajax': ['jasmine']
  }
};