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
      'jasmine-config': '{workspace}/jasmine-config/spec',
      'myProject': '{workspace}/myProject'
    },
    'console':{

      callback: function($, type){

        // convert and display to HTML all console messages

        var msg;

        if(type === 'log'){
          msg = ['&lt;span style="color: black"&gt;'];
        }else if(type === 'info'){
          msg = ['&lt;span style="color: blue"&gt;'];
        }else if(type === 'debug'){
          msg = ['&lt;span style="color: green"&gt;'];
        }else if(type === 'error'){
          msg = ['&lt;span style="color: red"&gt;'];
        }

        $.forEach(arguments, function(v, k, i){

          if(i>1){
            msg.push(v);
          }
        });

        msg.push('&lt;/span&gt;');

        OODK.default.Registry.self.getInstance().push(msg.join("-") + "&lt;br/&gt;");
        OODK.default.Registry.self.getInstance().setSyntaxer($);
      },
      mode: "ALWAYS"
    },
    'errorHandler': {

      callback: function($, e){

        e.setMessage("callback called");  

        OODK.default.ErrorHandler.self.getInstance().setError(e);
        OODK.default.ErrorHandler.self.getInstance().setSyntaxer($);
      }
    }
  });

  OODK(function($, _){

    $.import('[kernel.api]');

    $.public().dynamic().extends(Array).class(function Registry($, µ, _){

      $.private(function __initialize(){});

      $.private('instance');

      $.public(function setSyntaxer(syntaxer){
        _.syntaxer = syntaxer;
      });

       $.private('syntaxer');

      $.public(function getSyntaxer(){
        return _.syntaxer;
      });
      
      $.static(function($, µ, _){

        $.public(function getInstance(){
          
          if(!$.isset(_.instance)){
            _.instance = $.new($.ns.Registry);
          }

          return _.instance;
        });
      });
    });

    $.public().class(function ErrorHandler($, µ, _){

      $.private(function __initialize(){});

      $.private('e');

      $.private('syntaxer');

      $.public(function setError(e){
        _.e = e;
      });

      $.public(function getError(){
        return _.e;
      });

      $.public(function setSyntaxer(syntaxer){
        _.syntaxer = syntaxer;
      });

      $.public(function getSyntaxer(){
        return _.syntaxer;
      });
      
      $.static(function($, µ, _){

        $.private('instance');

        $.public(function getInstance(){

          if(!$.isset(_.instance)){
            _.instance = $.new($.ns.ErrorHandler);
          }

          return _.instance;
        });

      });
    });
      
    $.import('{jasmine-config}/config');
    $.import('{jasmine-config}/errorHandler');
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