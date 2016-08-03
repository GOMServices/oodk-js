<!DOCTYPE html>
<html>
<head>

    <script src="lib/jquery-1.12.0.min.js"></script>
    <script src="lib/jquery-ui/jquery-ui.min.js"></script>

    <link href="lib/code-prettify/src/prettify.css" type="text/css" rel="stylesheet" />
    <link href="lib/code-prettify/styles/desert.css" type="text/css" rel="stylesheet" />
    <script type="text/javascript" src="lib/code-prettify/src/prettify.js"></script>

    <link href="lib/highlight/src/styles/default.css" type="text/css" rel="stylesheet" />
    <link href="lib/highlight/src/styles/agate.css" type="text/css" rel="stylesheet" />
    <script type="text/javascript" src="lib/highlight/highlight.pack.js"></script>
    
    <!-- Latest compiled and minified JavaScript -->
    <script src="lib/bootstrap/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>

    <link rel="stylesheet" href="lib/bootstrap/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">

    <!-- Optional theme -->
    <link rel="stylesheet" href="lib/bootstrap/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">
  
    <link rel="stylesheet" href="lib/jquery-ui/jquery-ui.min.css" type="text/css"/>

    <link href="lib/oodk.doc.css" rel="stylesheet">

    <script>

    $(document).ready(function(){

      $('pre').wrapInner('<code></code>');

      $('pre>code').each(function(i, el){

        var pre = $(el).parent().get(0);

        if(pre.className.indexOf('hljs') === -1){
          el.className += ' javascript hljs';
          pre.className = ' javascript hljs';
        }else{
          el.className = pre.className;
        }
      });

      hljs.initHighlightingOnLoad();

      $('[data-toggle]').bind('click', function(evt){

        var selector = $(this).data('toggle');

        if($(selector).hasClass('hidden')){

          $(selector).toggleClass('hidden');

          $(selector).siblings().addClass('hidden');

          $(selector).find('li:first').addClass('active');
        }
      });

      $('#top-menu li').bind('click', function(evt){

        $(this).addClass('active');

        $(this).siblings().removeClass('active');
      });

      $('.nav-sidebar li').bind('click', function(evt){

        $(this).addClass('active');

        $(this).siblings().removeClass('active');
      });
    });


    </script>
</head>
<body onload="prettyPrint()">

  <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#"><b>OODK-JS</b> <font class="font-small hidden"><b>O</b>riented-<b>O</b>bject <b>D</b>evelopment <b>K</b>it for <b>J</b>ava<b>S</b>cript</font></a>
        </div>

        <div class="collapse navbar-collapse" id="navbar">

          <ul id="top-menu" class="nav navbar-nav">

            <li class="active"><a href="#" data-toggle="#menu-getting-start">Getting Start</a></li>
            <li><a href="#concepts" data-toggle="#menu-concept">Concepts</a></li>
            <li><a href="#keywords" data-toggle="#menu-keywords">Keywords</a></li>
            <li><a href="#api" data-toggle="#menu-api">APIs</a></li>
            <li><a href="#behavior-method" data-toggle="#menu-behavior-methods">Behavior methods</a></li>
            <li><a href="#foundation" data-toggle="#menu-foundation">Foundation</a></li>
            <li><a href="#design-pattern" data-toggle="#menu-design-pattern">Design patterns</a></li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-3 col-md-2 sidebar">
          
          <ul id="menu-getting-start" class="nav nav-sidebar">
            <li class="active"><a href="#getting-start">Getting start <span class="sr-only">(current)</span></a></li>
            <li><a href="#getting-start-download">Download</a></li>
            <li><a href="#getting-start-installation">Installation</a></li>
            <li><a href="#getting-start-glance">OODK in a glance</a></li>
            <li><a href="#getting-start-config">Configuration</a></li>
            <li><a href="#getting-start-pseudo-type">Pseudo types</a></li>
          </ul>

          <ul id="menu-concept" class="nav nav-sidebar hidden">
            <li><a href="#concept-resource">Resource</a></li>
            <li><a href="#concept-namespace">Namespace</a></li>
            <li><a href="#concept-class">Class</a></li>
            <li><a href="#concept-interface">Interface</a></li>
            <li><a href="#concept-scope">Scope</a></li>
            <li><a href="#concept-context">Context</a></li>
            <li><a href="#concept-keyword">Keyword</a></li>
            <li><a href="#concept-syntaxer">Syntaxer</a></li>
            <li><a href="#concept-stack">Stack</a></li>
            <li><a href="#concept-behavior-methods">Behavior methods</a></li>
            <li><a href="#concept-api">APIs</a></li>
            <li><a href="#concept-foundation">Foundation</a></li>
          </ul>

          <ul id="menu-keywords" class="nav nav-sidebar hidden">

            <li class="nav-sidebar-title">Declaration</li>

            <li><a href="#doc-keyword-abstract">abstract</a></li>
            <li><a href="#doc-keyword-args">args</a></li>
            <li><a href="#doc-keyword-array">array</a></li>
            <li><a href="#doc-keyword-async">async</a></li>
            <li><a href="#doc-keyword-class">class</a></li>
            <li><a href="#doc-keyword-dynamic">dynamic</a></li>
            <li><a href="#doc-keyword-extends">extends</a></li>
            <li><a href="#doc-keyword-final">final</a></li>
            <li><a href="#doc-keyword-float">float</a></li>
            <li><a href="#doc-keyword-implements">implements</a></li>
            <li><a href="#doc-keyword-int">int</a></li>
            <li><a href="#doc-keyword-interface">interface</a></li>
            <li><a href="#doc-keyword-OODK">OODK</a></li>
            <li><a href="#doc-keyword-mutable">mutable</a></li>
            <li><a href="#doc-keyword-number">number</a></li>
            <li><a href="#doc-keyword-literal">literal</a></li>
            <li><a href="#doc-keyword-observable">observable</a></li>
            <li><a href="#doc-keyword-private">private</a></li>
            <li><a href="#doc-keyword-protected">protected</a></li>
            <li><a href="#doc-keyword-proxy">proxy</a></li>
            <li><a href="#doc-keyword-public">public</a></li>
            <li><a href="#doc-keyword-string">string</a></li>
            <li><a href="#doc-keyword-static">static</a></li>
            <li><a href="#doc-keyword-type">type</a></li>
            <li><a href="#doc-keyword-void">void</a></li>
            
            <li class="nav-sidebar-title">Use</li>

            <li><a href="#doc-keyword-alias">alias</a></li>
            <li><a href="#doc-keyword-clone">clone</a></li>
            <li><a href="#doc-keyword-compare">compare</a></li>
            <li><a href="#doc-keyword-debug">debug</a></li>
            <li><a href="#doc-keyword-default">default</a></li>
            <li><a href="#doc-keyword-dependency">dependency</a></li>
            <li><a href="#doc-keyword-destroy">destroy</a></li>
            <li><a href="#doc-keyword-dump">dump</a></li>
            <li><a href="#doc-keyword-error">error</a></li>
            <li><a href="#doc-keyword-forEach">forEach</a></li>
            <li><a href="#doc-keyword-import">import</a></li>
            <li><a href="#doc-keyword-info">info</a></li>
            <li><a href="#doc-keyword-inspect">inspect</a></li>
            <li><a href="#doc-keyword-invoke">invoke</a></li>
            <li><a href="#doc-keyword-instanceOf">instanceOf</a></li>
            <li><a href="#doc-keyword-is">is</a></li>
            <li><a href="#doc-keyword-isIterable">isIterable</a></li>
            <li><a href="#doc-keyword-isObject">isObject</a></li>
            <li><a href="#doc-keyword-isset">isset</a></li>
            <li><a href="#doc-keyword-log">log</a></li>
            <li><a href="#doc-keyword-new">new</a></li>
            <li><a href="#doc-keyword-notify">notify</a></li>
            <li><a href="#doc-keyword-observe">observe</a></li>
            <li><a href="#doc-keyword-package">package</a></li>
            <li><a href="#doc-keyword-release">release</a></li>
            <li><a href="#doc-keyword-serialize">serialize</a></li>
            <li><a href="#doc-keyword-sort">sort</a></li>
            <li><a href="#doc-keyword-snooze">snooze</a></li>
            <li><a href="#doc-keyword-throw">throw</a></li>
            <li><a href="#doc-keyword-to">to</a></li>
            <li><a href="#doc-keyword-toArray">toArray</a></li>
            <li><a href="#doc-keyword-toBool">toBool</a></li>
            <li><a href="#doc-keyword-toDate">toDate</a></li>
            <li><a href="#doc-keyword-toFalse">toFalse</a></li>
            <li><a href="#doc-keyword-toFloat">toFloat</a></li>
            <li><a href="#doc-keyword-toInt">toInt</a></li>
            <li><a href="#doc-keyword-toNumber">toNumber</a></li>
            <li><a href="#doc-keyword-toLiteral">toLiteral</a></li>
            <li><a href="#doc-keyword-toString">toString</a></li>
            <li><a href="#doc-keyword-toTrue">toTrue</a></li>
            <li><a href="#doc-keyword-trace">trace</a></li>
            <li><a href="#doc-keyword-unserialize">unserialize</a></li>
            <li><a href="#doc-keyword-unobserve">unobserve</a></li>
            <li><a href="#doc-keyword-watch">watch</a></li>

          </ul>

          <ul id="menu-api" class="nav nav-sidebar hidden">
            <li><a href="#api-cloning">Cloning</a></li>
            <li><a href="#api-comparison">Comparison</a></li>
            <li><a href="#api-conversion">Conversion</a></li>
            <li><a href="#api-debugger">Debugger</a></li>
            <li><a href="#api-iteration">Iteration</a></li>
            <li><a href="#api-observer">Observer</a></li>
            <li><a href="#api-reflection">Reflection</a></li>
            <li><a href="#api-serialization">Serialization</a></li>
            <li><a href="#api-sort">Sort</a></li>
            <li><a href="#api-typing">Typing</a></li>
          </ul>

          <ul id="menu-behavior-methods" class="nav nav-sidebar hidden">
            <li><a href="#behavior-method-__clone">__clone</a></li>
            <li><a href="#behavior-method-__dump">__dump</a></li>
            <li><a href="#behavior-method-__finalize">__finalize</a></li>
            <li><a href="#behavior-method-__from">__from</a></li>
            <li><a href="#behavior-method-__initialize">__initialize</a></li>
            <li><a href="#behavior-method-__iterator">__iterator</a></li>
            <li><a href="#behavior-method-__parse">__parse</a></li>
            <li><a href="#behavior-method-__serialize">__serialize</a></li>
            <li><a href="#behavior-method-__to">__to</a></li>
            <li><a href="#behavior-method-__unserialize">__unserialize</a></li>
          </ul>

          <ul id="menu-foundation" class="nav nav-sidebar hidden">
            <li class="nav-sidebar-title">foundation</li>
            
            <li><a href="#foundation-exception-ClassCastException">ClassCastException</a></li>
            <li><a href="#foundation-interface-Cloneable">Cloneable</a></li>
            <li><a href="#foundation-exception-CloneNotSupportedException">CloneNotSupportedException</a></li>
            <li><a href="#foundation-interface-Comparable">Comparable</a></li>
            <li><a href="#foundation-interface-Comparator">Comparator</a></li>
            <li><a href="#foundation-exception-Error">Error</a></li>
            <li><a href="#foundation-exception-Exception">Exception</a></li>
            <li><a href="#foundation-exception-FileNotFoundException">FileNotFoundException</a></li>
            <li><a href="#foundation-exception-IllegalAccessException">IllegalAccessException</a></li>
            <li><a href="#foundation-exception-IllegalArgumentException">IllegalArgumentException</a></li>
            <li><a href="#foundation-exception-IllegalStateException">IllegalStateException</a></li>
            <li><a href="#foundation-exception-InstantiationException">InstantiationException</a></li>
            <li><a href="#foundation-interface-Iterable">Iterable</a></li>
            <li><a href="#foundation-exception-IterateNotSupportedException">IterateNotSupportedException</a></li>
            <li><a href="#foundation-interface-Iterator">Iterator</a></li>
            <li><a href="#foundation-exception-NetworkError">NetworkError</a></li>
            <li><a href="#foundation-exception-NotSuchElementException">NotSuchElementException</a></li>
            <li><a href="#foundation-interface-Observable">Observable</a></li>
            <li><a href="#foundation-interface-Observer">Observer</a></li>
            <li><a href="#foundation-exception-PackageDefinitionException">PackageDefinitionException</a></li>
            <li><a href="#foundation-exception-ReferenceError">ReferenceError</a></li>
            <li><a href="#foundation-exception-SecurityException">SecurityException</a></li>
            <li><a href="#foundation-interface-Serializable">Serializable</a></li>
            <li><a href="#foundation-exception-SerializeNotSupportedException">SerializeNotSupportedException</a></li>
            <li><a href="#foundation-interface-Sortable">Sortable</a></li>
            <li><a href="#foundation-exception-SortNotSupportedException">SortNotSupportedException</a></li>
            <li><a href="#foundation-exception-SyntaxError">SyntaxError</a></li>
            <li><a href="#foundation-exception-Throwable">Throwable</a></li>
            <li><a href="#foundation-exception-TypeError">TypeError</a></li>
            <li><a href="#foundation-exception-UnsupportedOperationException">UnsupportedOperationException</a></li>
          
            <li class="nav-sidebar-title">foundation.util</li>
          
            <li><a href="#foundation-util-Deserializer">Deserializer</a></li>
            <li><a href="#foundation-util-Dumper">Dumper</a></li>
            <li><a href="#foundation-util-Iterator">Iterator</a></li>
            <li><a href="#foundation-util-Serializer">Serializer</a></li>
            <li><a href="#foundation-util-Sorter">Sorter</a></li>
            <li><a href="#foundation-util-Url">Url</a></li>
            <li><a href="#foundation-util-XHRequest">XHRequest</a></li>
            <li><a href="#foundation-util-XHResponse">XHResponse</a></li>
            
          </ul>

          <ul id="menu-design-pattern" class="nav nav-sidebar hidden">
            <li><a href="#design-pattern-factory">Factory</a></li>
            <li><a href="#design-pattern-observer">Observer</a></li>
            <li><a href="#design-pattern-proxy">Proxy</a></li>
            <li><a href="#design-pattern-singleton">Singleton</a></li>
          </ul>

        </div>
        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">

          <div styles="background: #F9F9F9">

          <h1 class="page-header">Getting start</h1>

          <p>OODK-JS, <b>O</b>riented-<b>O</b>bject <b>D</b>evelopment <b>K</b>it for <b>J</b>ava<b>S</b>cript is a all-in-one JavaScript library, that enriched JavaScript with all of the OOP concepts: <b>encapsulation</b>, <b>inheritance</b>, <b>overriding</b>, <b>polymorphism</b>, <b>interface</b>, <b>abstraction</b>, <b>namespace</b>.</p>

          <p>Additional API are also available working around OOP: <a href="#api-conversion">conversion</a>, <a href="#api-cloning">cloning</a>, <a href="#api-serialization">serialization</a>, <a href="#api-iteration">iteration</a>, <a href="#api-debugger">debugger</a>, <a href="#api-reflection">reflection</a>, <a href="#api-comparison">comparison</a>, <a href="#api-sort">sort</a>, <a href="#api-observer">observer</a></p>

          <p>The purpose of OODK-JS is to bring to JavaScript additional pseudo-keywords to create classes, interfaces and namespaces without to install a separate compiler and learn a new language.</p>

          <a name="getting-start-download"></a>
          <h3 class="sub-header">Download</h3>

          <div class="paragraph">

          <p>The project is hosted on <a href="http://github.com/GOMServices/oodk-js">GitHub</a></p>

          <p>A complete test suite is at disposal, based on <a href="http://jasmine.github.io/" target="_blank">jasmine</a>, located under the test directory.</p>

          </div>

          <a name="getting-start-installation"></a>
          <h3 class="sub-header">Installation</h3>

          <div class="paragraph">

          <p>As OODK-JS is a all-in-one library, integration is fairly straitforward:</p>

          <pre>&lt;script src="<i>path/to/the/oodk/source/folder</i>/oodk.js"&gt;&lt;/script&gt;</pre>

          <p>OODK does not support yet Node JS, but it is on the roadmap of futur realeases.</p>

          </div>

          <a name="getting-start-glance"></a>
          <h3 class="sub-header">OODK in a glance</h3>

          <div class="paragraph">

          <p>OODK has been designed to allow writing code following the OOP concepts the most naturally manner as possible as standard OOP languages like PHP, Java or C++ does.</p>

          <p>Here is a quick comparison how the same code is implemented using OODK-JS against exactly the same result in PHP.</p>

          <pre>
          &lt;!DOCTYPE html&gt;
          &lt;html&gt;
          &lt;head&gt;

              &lt;script src="../src/oodk.js"&gt;&lt;/script&gt;
            
              &lt;script&gt;
              OODK.config({
                'path': {
                  'oodk': '../src',
                  'workspace': 'workspace'
                }
              });

              OODK(function($, _){

                $.interface(function Itf1(){
                  $.abstract('getAll');
                });

                $.abstract().implements(_.Itf1).class(function ClassB($, µ, _){

                  $.private('a');

                  $.public(function __initialize(a){

                    _.a = a;

                    _.self.count();
                  });

                  $.final().protected(function getA(){
                    return _.a;
                  });

                  $.static(function($, µ, _){
                    
                    $.private('counter', 0);

                    $.private(function count(){
                      _.counter++;
                    });

                    $.public(function getCounter(){
                      return _.counter;
                    });
                  });
                });

                $.public().extends(_.ClassB).class(function ClassA($, µ, _){

                  $.private('a');

                  $.protected('b');

                  $.public('c');
                  
                  $.public(function __initialize(a, aa, b, c){

                    _.a = a;
                    
                    µ.b = b;
                    
                    this.c = c;

                    $.super.__initialize(aa);
                  });

                  $.public(function getAll(){

                    var msg = [];

                    msg.push('value of private a is ' + _.a + ', ');

                    msg.push('value of private a (ClassB) is ' + µ.getA() + ', ');

                    msg.push('value of protected b is ' + µ.b + ', ');

                    msg.push('value of public c is ' + this.c );
                  
                    return msg.join("");
                  });

                  $.static(function($, µ, _){
                    
                    $.final().public('SUCCESS', 1);
                  });
                });

                $.import("{oodk}/api/Debugger");

                var a = $.new(this.ClassA, 1, 10, "test", false);

                $.dump(a);

                $.log(a.getAll());

                $.log("value of static private counter is " + OODK.default.ClassA.self.getCounter());

                $.log("value of constant SUCCESS is " + OODK.default.ClassA.self.SUCCESS);
              });

               &lt;/script&gt;
          &lt;/head&gt;
          &lt;body&gt;&lt;/body&gt;
          &lt;/html&gt;
          </pre>

          <p>the same implementation in PHP</p>

          <pre class="php hljs">
          &lt;?php
          namespace myProject; 

          interface Itf1{
            function getAll();
          }

          abstract class ClassB implements Itf1{

            private $a;

            private static $counter = 0;

            function __construct($a){
              $this->a = $a;

              self::count();
            }

            protected final function getA(){
              return $this->a;
            }

            private static function count(){
              self::$counter++;
            }

            public static function getCounter(){
              return self::$counter;
            }
          }

          class ClassA extends ClassB{

            CONST SUCCESS = 1;

            private $a;

            protected $b;

            public $c;

            function __construct($a, $aa, $b, $c){
              $this->a = $a;
              $this->b = $b;
              $this->c = $c;

              parent::__construct($aa);
            }

            public function getAll(){
              return 'value of private a is ' . $this->a . ', value of private a (ClassB) is ' . $this->getA() . ', value of protected b is ' . $this->b . ', value of public c is ' . $this->c;
            }

          }

          $a = new ClassA(1, 10, "test", false);

          var_dump($a);

          echo "&lt;br/&gt;" . $a->getAll();

          echo "&lt;br/&gt;value of static private counter is " . ClassA::getCounter();

          echo "&lt;br/&gt;value of constant SUCCESS is " . ClassA::SUCCESS;
          ?&gt;
          </pre>

          </div>

          <a name="getting-start-config"></a>
          <h3 class="sub-header">Configuration</h3>

          <p>The global OODK object provides one method to configure the global behavior of OODK.</p>

          <p>Configuration can be defined only once, before calling any namespace scope else OODK will raise an error.</p>

          <a name="getting-start-config-path"></a>
          <h4 class="sub-header">config <i class="font-small">(<font class="oodk-type">Object</font> <b>config</b>)</i></h4>

          <p>the <b>config</b> argument must be a literal object containing at least one key, <a href="#getting-start-config-path">path</a> and two optional keys, <a href="#getting-start-config-console">console</a> and <a href="#getting-start-config-errorHandlder">errorHandler</a></p>

          <a name="getting-start-config-path"></a>
          <h4 class="sub-header">path</h4>

          <div class="paragraph">

          <p>The "path" contains all pathes your project will need to works properly.</p>

          <p>Two base base paths are required (OODK raise an error if these paths are missing):</p>

          <ul>
            <li><b>oodk</b>: is the path to the source folder of oodk.</li>
            <li><b>workspace</b>: is the path to the workspace folder. The workspace folder store all project or external OODK component source files.</li>
          </ul>

          <p>Custom paths can be added to match your project requirements.</p>

          <p>Path can be as well embedded in other path, using the accolades as identifier.</p>

          <pre>
          &lt;!DOCTYPE html&gt;
          &lt;html&gt;
          &lt;head&gt;

              &lt;script src="../src/oodk.js"&gt;&lt;/script&gt;
            
              &lt;script&gt;
              OODK.config({
                'path': {
                  'oodk': '../src',
                  'workspace': 'workspace',
                  'project': '{workspace}/project' // custom path to my project
                }
              });

              OODK(function($, _){
                
                $.import('{project}/Myclass');

                var mc = $.new(OODK.project.MyClass);

                // keep using imported classes ...
              });
              &lt;/script&gt;
          &lt;/head&gt;
          &lt;body&gt;&lt;/body&gt;
          &lt;/html&gt;
          </pre>

          </div>

          <a name="getting-start-config-console"></a>
          <h4 class="sub-header">console</h4>

          <div class="paragraph">

          <p>The console parameter allows to configure how console messages have to be treated.</p>

          <p>By default, OODK use the standard console object to display log, info, debug and error messages using their respective keywords <a href="#doc-keyword-log">log</a>, <a href="#doc-keyword-info">info</a>, <a href="#doc-keyword-debug">debug</a>, <a href="#doc-keyword-error">error</a>.</p>

          <p>This behavior can be customized using a callback function to redirect the standard output to match custom needs.</p>

          <p>Two parameters are available:</p>

          <ul>
            <li><b>callback</b> <i class="font-small">( <font class="oodk-type">String</font> <b>type</b>, [ <font class="oodk-type">Object | Primitives</font> <b>obj</b> ] )</i><br/>the callback function to apply. The callback provides as first argument the type of message: "log", "info", "debug", "error". Following arguments are the orignal arguments </li>
            <li><b>mode</b> <i class="font-small">[ <b>ALWAYS</b> | <b>POLYFILL</b> ]</i><br/>specify when to apply the callback:<br/>If set to <i>ALWAYS</i>, the callback function will always be applied whether or not the object console is present.<br/>If set to <i>POLYFILL</i>, the callback function is called only if console object or one its features are not supported by the browser.</li>
          </ul>

          <pre>
          OODK.config({

            'path': {
                'oodk': '../src',
                'workspace': 'workspace'
             },

            'console': {

              callback: function($, type){

                // convert and display to HTML all console message 

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

                for(var i=1; i&lt;arguments.length; i++){
                  msg.push(arguments[i]);
                }

                msg.push('&lt;/span&gt;');

                document.writeln(msg.join("\t") + "&lt;br/&gt;");
              },
              mode: "POLYFILL" // use the callback method only if one of the feature is not supported natively by the interpreter
            }
          });

          OODK(function($, µ, _){
            
            $.log("something");

            $.info("something to notice");

            $.debug("something to debug");

            $.error("something serious");

            // ouptuts on supported browser:
            // log ([current]:34)
            // something
            // info ([current]:36)
            // something to notice
            // debug ([current]:38)
            // something to debug
            // error ([current]:40)
            // something serious

            // else outputs:
            // &lt;span style="color: green"&gt; log ([current]:48)  &lt;/span&gt;&lt;br&gt;
            // &lt;span style="color: green"&gt; something &lt;/span&gt;&lt;br&gt;
            // &lt;span style="color: blue"&gt;  info ([current]:50) &lt;/span&gt;&lt;br&gt;
            // &lt;span style="color: blue"&gt;  something to notice &lt;/span&gt;&lt;br&gt;
            // &lt;span style="color: green"&gt; debug ([current]:52)  &lt;/span&gt;&lt;br&gt;
            // &lt;span style="color: green"&gt; something to debug  &lt;/span&gt;&lt;br&gt;
            // &lt;span style="color: red"&gt; error ([current]:54)  &lt;/span&gt;&lt;br&gt;
            // &lt;span style="color: red"&gt; something serious &lt;/span&gt;&lt;br&gt;
          });
          </pre>

          </div>

          <a name="getting-start-config-errorHandler"></a>
          <h4 class="sub-header">errorHandler</h4>

          <div class="paragraph">

          <p>The parameter errorHandler allows to define a global handler to treats all errors or exceptions thrown in a scope.</p>

          <pre>
          OODK.config({

            'path': {
                'oodk': '../src',
                'workspace': 'workspace'
             },

            'errorHandler': {

              callback: function($, e){

                // send a ticket to the support if error is type of OODK.foundation.Error (TypeError, SyntaxError ...)
                // else throws the error  

                if($.instanceOf(e, OODK.foundation.Error)){

                  var xhr = new XMLHttpRequest();
                  xhr.open('POST', 'http://mycompany.com/support/ticketing', true);
                  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                  xhr.send('error=' + e.toString());
                }else{

                  $.throw(e);
                }
              }
            }
          });

          OODK(function($, µ, _){

            $.log(notExistsVar);

            // throw a OODK.foundation.ReferenceError as notExsitsVar is not defined
            // and send a ticket to the support
          });
          </pre>

          </div>

          <a name="getting-start-pseudo-type"></a>
          <h3 class="sub-header">Pseudo types</h3>

          <p>The pseudo types are used to represent types which does not explicitly exists natively in JavaScript.</p>

          <h4 class="sub-header">OODK.arrayOf</h4>

          <div class="paragraph">

          <p>Represents a typed array.</p>

          <pre>
          var a  = [1,2,3.2];

          $.log($.is(a, OODK.arrayOf(Number))); // outputs true

          $.log($.is(a, OODK.arrayOf(OODK.int))); // outputs false, a contains a float value 3.2
          </pre>

          </div>

          <h4 class="sub-header">OODK.instanceOf</h4>

          <div class="paragraph">

          <p>Represents an instanceOf of a class or interface.</p>

          <pre>
          var ClassB = $.class(function($, µ, _){});

          var ClassA = $.extends(ClassB).class(function($, µ, _){

            $.public(function sum(a, b){
                return (a + b);
            });
          });

          var a = $.new(ClassA);

          $.log($.is(a, OODK.instanceOf(ClassA))); // outputs true

          $.log($.instanceOf(a, ClassB)); // outputs true, the instanceOf keyword is a shortcut for the previous statement

          $.log($.is(a, ClassB)); // outputs false, a is type of ClassA

          // using the typing API

          var ClassC = $.class(function($, µ, _){
            
            $.args(OODK.instanceOf(ClassB)).public(function do(obj){
                return obj.sum(1, 2);
            });
          });

          var c = $.new(ClassC);

          c.do(a); // outputs 3
          </pre>

          </div>

          <h4 class="sub-header">OODK.int</h4>

          <div class="paragraph">

          <p>Represents an integer value.</p>

          <pre>
          var a = 10;

          $.log($.is(a, OODK.int); // outputs true

          a = 10.2;

          $.log($.is(a, OODK.int)); // outputs false
          </pre>

          </div>

          <h4 class="sub-header">OODK.float</h4>

          <div class="paragraph">

          <p>Represents a float value.</p>

          <pre>
          var a = 10.5;

          $.log($.is(a, OODK.float)); // outputs true

          a = 10;

          $.log($.is(a, OODK.float)); // outputs false
          </pre>

          </div>

          <h4 class="sub-header">OODK.void</h4>

          <div class="paragraph">

          <p>Represents the undefined value.</p>

          <pre>
          var a ;

          $.log($.is(a, OODK.void)); // outputs true

          a = 10;

          $.log($.is(a, OODK.void)); // outputs false
          </pre>

          </div>

          <a name="concepts"></a>
          <h1 class="page-header">Concepts</h1>

          <p>This chapter describes all terms used in this documentation with a detailed explanation for each one to help get involved with OODK quickly and easily.</p>

          <a name="concept-resource"></a>
          <h4 class="sub-header">Resources</h4>

          <div class="paragraph">

          <p>Resources are elements generated by OODK: classes, class instances, interfaces, and namespaces are all OODK resources.</p>

          <p>They are identified be a unique number, attributed at the runtime, and dispose of one or several <a href="#concept-context">contextes</a>.</p>

          </div>

          <a name="concept-namespace"></a>
          <h4 class="sub-header">Namespace</h4>

          <div class="paragraph">

          <p>OODK supports namespace.</p>

          <p>Namespace has some similarities with the Java package concept, as a namespace dispose of a private and a public context.</p>

          <p>Only public declarations are accessibles outside of their scope.</p>

          <p>Moreover namespace must be declared in a file located in the workspace folder in a sub folder named with the same name as the namespace.</p>
          
          <p>This security restriction does not apply on the default namespace which can be use in any files.</p>

          <pre>
          // code located in file {workspace}/myProject/myClass

          // this declaration is correct, namespace "myProject" match the name of the base folder "myProject" 
          OODK('myProject', function($, µ, _){
            
            $.public().class(function MyClass($, µ, _){
              ;
            });
          });
          </pre>

          <pre>
          // code located in file {workspace}/myProject/subFolder/mySecondClass

          // this declaration is also correct, namespace "myProject" match the name of the base folder "myProject"
          OODK('myProject', function($, µ, _){
            
            $.public().class(function MySecondClass($, µ, _){
              ;
            });
          });
          </pre>

          <pre>
          // code located in file {workspace}/externalProject/aClass

          // this declaration is incorrect and raise an SecurityException, namespace "myProject" does not match the name of the base folder "externalProject"
          OODK('myProject', function($, µ, _){
            
            $.public().class(function AClass($, µ, _){
              ;
            });
          });
          </pre>

          </div>

          <a name="concept-class"></a>
          <h4 class="sub-header">Classes</h4>

          <p>Class is the base concept of the object oriented programming.</p>

          <p>As any other language, class is an encapsulation of properties and methods usable through instances.</p>

          <p><b>Instantiation</b></p>

          <div class="paragraph">

          <p>Generating an instance of a class is performed using the <a href="#doc-keyword-new">new keyword</a>.</p>

          <p>Using the native new keyword will generate an exception as OODK implements a specific declaration mechanic.</p>

          <p>By default, instances are <b>immutables</b>:</p>

          <ul>
            <li>Properties are writables (except those declared <a href="#doc-keyword-final">final</a>) but cannot added or deleted after the instantation. They are also not enumerables nor configurables.</li>
            <li>Methods can be overrided (except those declared <a href="#doc-keyword-final">final</a>), but are not writables, enumerables and configurables once instantiated.</li>
          </ul>

          <p>This behavior can be modifiy using the <a href="#doc-keyword-dynamic">dynamic keyword</a>.<p>

          <p>Dynamic classes generates <b>weakly immutable</b> instances.</p>

          <ul>
            <li>Properties can be added or removed after the instantiation</li>
            <li>Methods, as standard instance, stays immutables after the instanciation.</li>
          </ul>

          <p>An array is a good example of a dynamic class: attributes can be added or removed as the life cycle of the instance evolved.</p>

          <p>Using the <a href="#doc-keyword-mutable">mutable keyword</a>, the class becomes mutable and therefore generates <b>mutable</b> instances which reflect the default behavior of js objects.</p>

          <ul>
            <li>Properties can be added, updated or removed after the instantiation.</li>
            <li>Methods can be added, updated or removed after the instantiation</li>
          </ul>

          </div>

          <p><b>Visibility</b></p>

          <div class="paragraph">

          <p>If named, classes has a namespace visibility, private or <a href="#doc-keyword-public">public</a> (see namespace).</p>

          <p>Classes can also be anonymous if declared with a literal function. Anonymous class are visibles only in the local scope where they have been declared.</p>

          <p>Local classes are local to the instance where they have been declared. They are used to works on properties of the related instance.</p>

          <p>Instance members has as well a class visibility:</p> 

          <ul>
            <li> <a href="#doc-keyword-public">public</a> member can be accessed from everywhere, </li>
            <li> <a href="#doc-keyword-private">private</a> members can be accessed only through the class where they have been declared,</li> 
            <li> <a href="#doc-keyword-protected">protected</a> members can be accessed through the class as well as all the subclasses.</li>
          </ul>

          </div>

          <p><b>Heritage</b></p>

          <div class="paragraph">

          <p>A class can inherit from one, and only one, parent class using the <a href="#doc-keyword-extend">extend keyword</a> except if the parent class is declared with the <a href="#doc-keyword-final">final</a> modifier.</p>

          <p>Public and protected, static and non-static members are herited in the child class.</p>

          <p>Overrided methods are accessibles through $.super context within an instance scope.</p>

          <p>A side context is also available, the local context, which give access to properties and methods implementations defined at the time of the declaration.</p>

          <p>Heritage works on native classes as well, allowing to customized default types as array, error, string and so on ...</p>

          </div>

          <p><b>Abstraction</b></p>

          <div class="paragraph">

          <p>Classes can be abstracts using the <a href="#doc-keyword-abstract">abstract keyword</a> or by implementing one or several interfaces using the <a href="#doc-keyword-implements">implements keyword</a>.</p>

          <p>Abstract classes are partially implemented (or supposed to be, as an abstract class can contains no abstract methods), therefore they cannot be instantiated.</p> 

          <p>They are used as skeleton for the sub classes by implementing common methods and let sub classes to implement their specific behaviors.</p>

          </div>

          <p><b>Polymorphism</b></p>

          <div class="paragraph">

          <p>Instance generated by OODK are instances of their direct class, all of their ancestors classes as well as all the interfaces the class implements.</p>

          </div>

          <p><b>Typing</b></p>

          <div class="paragraph">

          <p>By default, member of classes are dynamically typed.</p>

          <p>This behavior can be customized using the <a href="#api-Typing">Typing api</a>.</p>

          <p>Return type and/or arguments can be typed to enhanced the software architecture.</p>

          </div>

          <a name="concept-interface"></a>
          <h4 class="sub-header">Interfaces</h4>

          <p>Interfaces are abstract, they defined only the signature of methods, their name, but does not implements their body.</p>

          <p>Methods are declared using the <a href="#doc-keyword-abstract">abstract keyword</a>.</p>

          <p><b>Instantation</b></p>

          <div class="paragraph">

          <p>Interfaces cannot be instantiated.</p>

          </div>

          <p><b>Heritage</b></p>

          <div class="paragraph">

          <p>Interface can inherits from one or multiple interfaces using the <a href="#doc-keyword-extend">extend</a> keyword.</p>

          </div>

          <a name="concept-scope"></a>
          <h4 class="sub-header">Scopes</h4>

          <div class="paragraph">

          <p>Scope is the base concept of OODK, in fact each line of code written with OODK is part of a scope.</p>

          <p>Scope are js function called dynamically and provides specific variables which are not accessible otherwise.</p>

          <p>All variables declared in a scope are local to it which means once the scope is executed local variables are not anymore accessibles and deleted by the garbage collector.</p>

          <p>This is not entirely true as closure can also render local variables accessible even after the scope has been executed (which is the base concept used by the implementation of OODK itself).</p>

          <p>The first accessible scope is the namespace scope invoked by the global <a href="#doc-keyword-OODK">OODK</a> keyword.</p>

          <p>Each scope always provides as first argument an instance of the syntaxer (symbolized in all exmples by the character dollar). </p>

          <p>The syntaxer is the foundment of OODK as it provides keywords needed to declare or use features of OODK.</p>

          <p>The syntaxer is unique to the scope where is declared, defined with specific keywords related to scope where is acting for.</p>

          <p>Following arguments, are usually specific contextes to scope.</p>

          <pre>
          OODK(function($, _){
            // the dollar sign represents the syntaxer specific to the default namespace object
            // the underscore sign represents the private context of the default namespace object 

            // all classes and interfaces declared here will belongs (except for anonymous class see section class) to the related scope, the deualt nemspace in this case
          });
          </pre>

          <p>Once within a namespace scope, classes and interfaces can be declared which themselves generates a specific scope to their declaration.</p>

          <pre>
          OODK(function($, _){
            //entering in the default namespace scope
            
            $.class(function ClassA($, µ, _){
              // here we are in the OODK.default.ClassA instance scope
              // the dollar sign represents the syntaxer, unique to this scope 
              // the micron sign (µ), represents the protected context of the instance
              // the underscore sign, the private context of the instnance  

              $.static(function($, µ, _){
                // here we enter in the static scope OODK.default.ClassA
                // once again the syntnaxer, protected and private static used the same symbols ($, µ, _) as their parent scope
              });
            });

            // back to the default namespace scope, the dollar and underscore signs are not affected 
            // by the scope exeuted above and we can keep declaring our classes and interfaces
          });
          </pre>

          <p>All together, OODK count five main scopes: namespace, class, interface, instance, and static accessible through their related keywords: <br/><a href="#doc-keyword-OODK">OODK</a>, <a href="#doc-keyword-class">class</a>, <a href="#doc-keyword-new">new</a>, <a href="#doc-keyword-static">static</a> and <a href="#doc-keyword-interface">interface</a>.</p>

          </div>

          <a name="concept-keywords"></a>
          <h4 class="sub-header">Keywords</h4>
          
          <div class="paragraph">

          <p>OODK Keywords has the same purpose has any other sandard keywords: declaring or using a specific features of the "programming language". <br/>Event if OODK is not a programming language in itself, main idea is to extend JavaScript without compiling a new language.</p>

          <p>They are accessible only through a <a href="#concept-syntaxer">Syntaxer</a> instance, as method of this object.</p> 

          <p>Some of them are part of the <a href="#concept-kernel">kernel</a> and others provided by additional <a href="#concept-api">APIs</a>.</p>

          </div>

          <a name="concept-contextes"></a>
          <h4 class="sub-header">Contextes</h4>

          <div class="paragraph">

          <p>A OODK context, is an object, always related to an <a href="#concept-resource">OODK resource</a>, which holds some specific data to this resource.</p>

          <p>Each resource dispose of one or several contextes.</p>
          
          <p>For example, a namespace resource has two contextes: the public and private contextes, an interface resource type one context: public</p>

          <p>The instance resource type is the most furnished with contextes: public, private and protected are the base ones. <br/>
            If static members are declared, an instance is also linked to the public, private and protected static context of its class. <br/>
            The CONST, local, super and ns contextes are also linked to an instance. <br/>
            When inheriting from a parent class, an instance is also linked to all private static and on static parent contextes.</p>

          </div>

          <a name="concept-behavior-methods"></a>
          <h4 class="sub-header">Behavior methods</h4>

          <div class="paragraph">

          <p>Behavior methods are special methods which can be implemented in each class declaration to customize the generic behavior of OODK features.</p>

          <p>All behavior methods start by a double underscore (__). Generally speaking all properties or methods starting by a double underscore are related to the OODK internal system and should not be used to declare class members.</p>

          <p>Behavior methods follow the same scheme of inheritance as standard instance methods and benefits of all its concepts: overriding, access level, abstraction.</p>

          <p>Chapter <a href="#behavior-method">Behavior methods</a> describe in details each referenced behavior methods.</p>

          </div>

          <a name="concept-foundation"></a>
          <h4 class="sub-header">Foundation</h4>

          <div class="paragraph">

          <p>Foundation is the legacy OODK namespace.</p>

          <p>All classes and interfaces used by the kernel or an API are located in this namespace.</p>

          <p>It provides a set of base classes and interfaces to use OODK.</p>

          <p>For an exhaustive list of all resources at disposal see chapter <a href="#foundation">Foundation</a></p>

          </div>

           <a name="concept-api"></a>
          <h4 class="sub-header">APIs</h4>

          <div class="paragraph">
          <p>API are extensions of the OODK kernel.</p>

          <p>They are deeply link to its implementation but not necessary to make it works that's why they get the special status of API.</p>

          <p>API can be loaded on demand using the <a href="#doc-keyword-import">import</a> keyword.</p>

          <pre>
          // import a single API
          $.import('{oodk}/api/Serialization');

          // import all APIs
          $.import('[kernel.api]');
          </pre>

          <p>For an exhaustive list of all available APIs see chapter <a href="#api">API</a></p>
          
          </div>

          <a name="concept-stack"></a>
          <h4 class="sub-header">Stack</h4>

          <div class="paragraph">

          <p>The OODK stack is a representation of the memory at a T Time.</p>

          <p>It is a filtered view of the native JS stack and keeps only track of user class method calls, explicitly named using the class and method name.</p>

          <p>The stack can be displayed using the <a href="#api-debugger">Debugger</a> api and its related keywords <a href="#doc-keyword-dump">dump</a>, <a href="#doc-keyword-trace">trace</a>, or while throwing an exception.</p>

          <pre>
          var ClassB = $.class(function($, µ, _){

            $.private('increment', [1,2,3]);

            $.public(function sum(amount){
              
              var b = $.new(ClassA, amount);

              var sum = [];

              $.forEach(_.increment, function(value, key){

                sum.push(value + b.getAmount());
              });

              return sum;
            });
          });

          var ClassA = $.class(function($, µ, _){

            $.private('amount');
            
            $.public(function __initialize(amount){ 
              
              $.dump('arguments', arguments);

              _.setAmount(amount);
            });

            $.private(function setAmount(amount){  
              _.amount = amount;
            });

            $.public(function getAmount(){ 
              return _.amount;
            });
          });

          $.trace();

          var a = $.new(ClassB);

          $.dump('sum of 10', a.sum(10));

          // outputs:
          // trace ([current]:60)
          // new ([current]:62)
          // Class &lt;anonymous&gt;.sum ([current]:72)
          // new ([current]:27)
          // dump: arguments ([current]:46)
          // Object {0: 10}
          // Class &lt;anonymous&gt;.setAmount ([current]:72)
          // forEach ([current]:31)
          // Class &lt;anonymous&gt;.getAmount ([current]:72)
          // dump: sum of 10 ([current]:64)
          // [11, 12, 13]
          </pre>

          </div>

          <a name="keywords"></a>
          <h1 class="page-header">Keywords</h1>

          <a name="doc-keyword-abstract"></a>
          <h4 class="sub-header">abstract <i class="font-small">( [ <font class="oodk-type">String</font> <b>name</b> ] )</i></h4>

          <p><b>scope(s)</b>: <i>namespace</i>, <i>class</i>, <i>interface</i></p>

          <p>Declare a class, a member method of a class or a method of an interface as abstract.</p>

          <p>Abstract class cannot be instantiated as they are (or supposed to be ) partially implemented. They are designed to serve as skeleton for child classes.</p>

          <p>Main difference with an interface is abstract class can contains some method implementation as interface only define signature of method.</p>

          <pre>$.abstract().class(function($, µ, _){</pre>

          <p>A class declaring one or more abstract method(s) have to be declared as abstract as well.</p>

          <pre>
          $.abstract().class(function($, µ, _){

            $.public(function nonAbstractMethod(){
              return 10;
            });

            $.abstract('abstractMethod');
          }
          </pre>

          <p>In an interface scope declare a method of the interface.</p>

          <pre>
          $.interface(function($){
            $.abstract('test');
          }
          </pre>

          <a name="doc-keyword-alias"></a>
          <h4 class="sub-header">alias <i class="font-small">( <font class="oodk-type">Class | Interface | Namespace | Function | Array</font> <b>target</b>, [ <font class="oodk-type">String</font> <b>name</b> ] )</i></h4>

          <p><b>scope(s)</b>: <i>namespace</i>, <i>class</i>, <i>interface</i></p>

          <p>Create an alias of a class, interface, function or instance's method.</p>

          <p>Aliases are stored in the Syntaxer and can be access quickly in each scope.</p>

          <p>If argument <b>name</b> is not provided, OODK will try to automatically define a name based on the type of target argument.</p>

          <p>Alias can also works on namespace: in this case all public declaration of the related namespace are stored in the Syntaxer using their local name.</p>

          <pre>
          function aVeryLongFunctionName(){
            return 10;
          }

          $.alias(aVeryLongFunctionName, 'avfn');

          $.log($.avfn()); // outputs: 10

          $.class(function ClassA($, µ, _){
            
            $.public(function sum(a, b){
              return (a+b);
            });
          });

          var a = $.new(_.ClassA);

          $.alias([a, 'sum']);

          $.log($.sum(10, 2)); // outputs: 12

          $.alias(OODK.foundation.Serializable);

          $.log($.is(a, $.Serializable)); // outputs: false

          $.alias(OODK.foundation.util);

          $.log($.Iterator); // outputs: false
          $.log($.Serializer); // outputs: false
          $.log($.Deserializer); // outputs: false
          $.log($.Dumper); // outputs: false
          $.log($.Cloner); // outputs: false
          </pre>

          <a name="doc-keyword-array"></a>
          <h4 class="sub-header">array <i class="font-small">()</i></h4>

          <p><b>scope(s)</b>: <i>namespace</i>, <i>class</i>, <i>interface</i></p>

          <p>Declare a class member of type array.</p>

          <p>To declare a typed array use instead the <a href="#doc-keyword-type">type</a> keyword combinated with the pseudo type OODK.arrayOf</p>

          <pre>
          var ClassA = $.class(function($, µ, _){
            
            // declare property "a" as type of array
            $.array().public('a', [1,2,3]);

            // declare method "getA" as type of array 
            $.array().public(function getA(){
              return 10;
            });

            // declare method "getTypedA" as type of array of Number
            $.type(OODK.arrayOf(Number)).public(function getTypedA(){
              return [1,2,3.2];
            });
          });

          var a = $.new(ClassA);

          a.a = 10; // raise a OODK.foundation.TypeError as property "a" is of type array

          $.log(a.getA()); // raise a OODK.foundation.TypeError as property "a" is of type boolean and return 10
          </pre>

          <a name="doc-keyword-async"></a>
          <h4 class="sub-header">async <i class="font-small">()</i></h4>

          <p><b>scope(s)</b>: <i>namespace</i>, <i>class</i>, <i>interface</i></p>

          <p>Declare a class's method as asynchrone. Asynchrone methods are executed within a Promise.</p>

          <p>Return of the method is send to the behavior method __callback.</p>

          <pre>
          $.import('{oodk}/api/Asynchrone');

          $.implements(OODK.foundation.Asynchronable).class(function ClassA($, µ, _){
      
              $.async().public(function sum(a, b){
                return (a+b);
              });

              $.private(function __callback(name, args, result, error){
                $.log('sum of ' + args[0] + '+' + args[1] + '=' + result);
              });

          });

          var a = $.new(_.ClassA);

          $.log('t1');

          a.sum(1,2);

          $.log('t2');

          // outputs
          // t1
          // t2
          // sum of 1+2=3
          </pre>

          <a name="doc-keyword-bool"></a>
          <h4 class="sub-header">bool <i class="font-small">()</i></h4>

          <p><b>scope(s)</b>: <i>namespace</i>, <i>class</i>, <i>interface</i></p>

          <p>Declare a class member of type boolean.</p>

          <pre>
          var ClassA = $.class(function($, µ, _){
            
            $.bool().public('a', false);

            $.bool().public(function getA(){
              return 10;
            });
          });

          var a = $.new(ClassA);

          a.a = 10; // raise a OODK.foundation.TypeError as property "a" is of type boolean

          $.log(a.getA()); // raise a OODK.foundation.TypeError as property "a" is of type boolean and return 10
          </pre>

          <a name="doc-keyword-class"></a>
          <h4 class="sub-header">class <i class="font-small">(<font class="oodk-type">Function</font> <b>fn</b>)</i></h4>

          <p><b>scope(s)</b>: <i>namespace</i>, <i>instance</i></p>

          <p>Declare a JS function as an OODK class (see section <a href="#concept-class">concept - class</a>).</p>

          <pre>
          OODK('myProject', function(){

            // delcare a namespace class: function has a name, ClassA, and is stored in the OODK.myProject namespace
            $.public().class(function ClassA($, µ, _){

              $.public(function test(){
                return 10;
              });
            });

            // ClassA is declared as public and stored in the public context of the myProject namespace
            var a1 = $.new(this.ClassA);
            var a2 = $.new(OODK.myProject.ClassA);
          });
          </pre>

          <pre>
          OODK('myProject', function(){

            // declare an anonymous class: function is anonymous, return of the declaration must be assigned in a local variable. 
            var ClassA = $.class(function($, µ, _){

              $.public(function test(){
                return 10;
              });
            });
          });
          </pre>

          <pre>
          $.public().class(function ClassA($, µ, _){

            $.private('a', 10);

            $.private(function calculateSum(){
              
              // declare a local class, ClassB is local to instance "b"
              var ClassB = $.class(function ClassB($, µ, _){
                
                $.public(function sum(amount){
                  return (amount + 10);
                });
              });

              var b = $.new(ClassB);

              b.sum(_.a);
            });
          });
          </pre>

          <a name="doc-keyword-clone"></a>
          <h4 class="sub-header">clone <i class="font-small">( <font class="oodk-type">Object</font> <b>obj</b> )</i></h4>

          <p><b>scope(s)</b>: <i>any</i></p>

          <p>Clone an object.</p>

          <p>Perform a shallow copy of an object.</p>

          <p>This behavior can be customized using the <a href="#behavior-method-__clone">__clone</a> behavior method.</p>

          <p>While cloning a instance class, the class must implements the <a href="#foundation-interface-Cloneable">Cloneable</a> interface or OODK will raise a <a href="#foundation-exception-CloneNotSupportedException">CloneNotsupportedException</a>.</p>

          <pre>
          var c = {
            x: 10,
            y: "test",
            z: [1,2,3]
          }

          var d = $.clone(c);

          d.z[0] = 2; 

          $.log(d.z[0] == c.z[0]);
          // outputs: true
          // reference of property "z" is copied in object "d" , therefore c.z and d.z share the same reference to array [1,2,3]
          </pre>
          <pre>
          var c = {
            x: 10,
            y: "test",
            z: [1,2,3]
          }

          c.__clone = function(cloner){
            this.z = cloner.clone(this.z); // it is important to use the cloner instance provided as argument to clone embedded properties to avoid circular reference issues.
          }

          var d = $.clone(c);

          d.z[0] = 2; 

          $.log(d.z[0] == c.z[0]);
          // outputs: false
          // the behavior method __clone is called and give the directive to deep clone property 'z'
          // c.z and c.z are now two distinct objects.
          </pre>
          <pre>
          var ClassA = $.implements(OODK.foundation.Cloneable).class(function($, µ, _){

            $.public('c');

            $.public(function __initialize(){
              this.c = $.new(ClassB, 5);
            });

             $.private(function __clone(cloner){
              this.c = cloner.clone(this.c);
            });
          });

          var ClassB = $.implements(OODK.foundation.Cloneable).class(function($, µ, _){

            $.protected('x');

            $.public(function __initialize(x){
              µ.x = x;
            });
          });

          var a = $.new(ClassA);

          var ca = $.clone(a); // => c and ca have now two different copy of the ClassB instance
          </pre>

          <a name="doc-keyword-debug"></a>
          <h4 class="sub-header">log <i class="font-small">(&nbsp;<font class="oodk-type">Object</font>&nbsp;<b>obj</b>&nbsp;)</i></h4>

          <p><b>scope(s)</b>: <i>any</i></p>

          <p>Send a debug message to the console.</p>

          <p>See section <a href="#getting-start-config-console">Configuration - console</a> to check how console message can be treated.</p>

          <pre>
          var a = 10;

          $.debug(a); // outputs: 10

          $.debug(a, "value of a is "); 
          // outputs:  
          // debug: value of a is ([current]72)
          // 10
          </pre>

          <a name="doc-keyword-default"></a>
          <h4 class="sub-header">default <i class="font-small">(&nbsp;<font class="oodk-type">Object | Primitive</font>&nbsp;<b>obj</b>&nbsp;, <font class="oodk-type">Object | Primitive</font>&nbsp;<b>value</b>, [ <font class="oodk-type">Function | Boolean</font>&nbsp;<b>test</b> ] )</i></h4>

          <p><b>scope(s)</b>: <i>any</i></p>

          <p>Assign a default value to a variable if this one is not defined (use internally the <a href="#doc-keyword-isset">isset</a> keyword to test if the value is defined).</p>

          <pre>
          function doSomething(a){
            a = $.default(a, "test"); // a is undefined, assign "test" to a

            return a.toUpperCase();
          }

          var a;

          $.log(doSomething(a)); // outputs "TEST"

          var b = false;

          b = $.default(b, "test", $.is(b, String));

          $.log(b); // outputs "test"

          var c;

          c = $.default(c, 0, function(c){ return $.is(c, Number); });

          $.log(c); // outputs 0
          </pre>

          <a name="doc-keyword-compare"></a>
          <h4 class="sub-header">compare <i class="font-small">(&nbsp;<font class="oodk-type">Object | Primitive</font>&nbsp;<b>obj1</b>, <font class="oodk-type">Object | Primitive</font>&nbsp;<b>obj2</b>&nbsp;)</i></h4>

          <p><b>scope(s)</b>: <i>any</i></p>

          <p>Compare two objects and return an integer between -1 and 1.</p>

          <ul>
            <li><b>-1</b>: obj1 is lower than obj2.</li>
            <li><b>0</b>: obj1 and obj2 are equals.</li>
            <li><b>1</b>: obj1 is greater than obj2.</li>
          </ul>

          <p>Difference with the operator equal is compare works on values (and/or keys) as operator equal works on reference.</p>

          <p>On string use the native localeCompare to compare objects.</p>

          <p>Can compare array and literal objects as well with deep level of .</p>

          <p>On arrays, both objects have to have the same numbers of keys and values to be considered equal.</p>

          <p>On literal objects, both objects have to have the same numbers of keys in the same order and same values to be considered equal.</p>

          <p>On class instance, class must implements the <a href="#foundation-interface-Comparable">Comparable</a> else OODK raise a ClassCastException.</p> 

          <p>The behavior method <a href="#behavior-method-__compareTo">__compareTo</a> allows to customize the behavior of comparison.</p>

          <p>Compare is used internally by the <a href="#doc-keyword-sort">sort keyword</a> to order an array or literal object.</p>

          <pre>
          $.import('{oodk}/api/Comparison');

          $.log($.compare("anna", "gérard")); // outputs 1

          $.log($.compare(10, 3)); // outputs 1, 10 is greater than 3

          $.log($.compare(new Date("2010-10-09"), new Date("2010-10-10"))); // outputs -1, first date is interior to the second one

          $.log($.compare([1,2,[4, 5, 6]], [1,2,[4, 5, 6]])); // outputs 0, both arrays are deep equals

          $.log($.compare({'a': 1, 'b': 2, 'c': 3}, {'a': 1, 'c': 2, 'b': 3})); // outputs -1, keys are not in the same order

          $.implements(OODK.foundation.Comparable).class(function ClassEmployee($, µ, _){

            $.private('name');

            $.public(function __initialize(name){
               _.name = name;
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

          $.class(function ClassUser($, µ, _){

            $.private('login');

            $.public(function __initialize(login){
               _.login = login;
            });

            $.public(function getLogin(){
               return _.login;
            });
          });

          var employeeAnna = $.new(_.ClassEmployee, "anna");

          var employeePaul = $.new(_.ClassEmployee, "paul");

          var userAnna = $.new(_.ClassUser, "anna");

          $.log($.compare(employeeAnna, employeePaul)); // outputs -1

          $.log($.compare(employeeAnna, userAnna)); // outputs 0

          $.log($.compare(userAnna, employeePaul)); // throw a ClassCastException as ClassUser does not implement the Comparable interface
          
          Array.prototype.__compareTo = function __compareTo(obj){
            return $.compare(this.join(" "), obj);
          }

          $.log($.compare(["john", "doe"], "john doe")); // outputs 0
          </pre>

          <a name="doc-keyword-dependency"></a>
          <h4 class="sub-header">dependency <i class="font-small">(&nbsp;<font class="oodk-type">String</font> <b>importPath</b>,&nbsp;[<font class="oodk-type">String&nbsp;|&nbsp;Array</font>&nbsp;<b>dependencyPath</b>&nbsp;]&nbsp;)</i></h4>

          <p><b>scope(s)</b>: <i>any</i></p>

          <p>Get or set one or several dependency(ies) for an import (see the <a href="#doc-keyword-import">import</a> keyword).</p>

          <p>The <b>importPath</b> argument is the <u>unresolved path</u> of the source file as the second argument, <b>dependencyPath</b> the dependant, or set of dependent source code file(s).</p>

          <pre>
          // define import '{workspace}/myProject/ClassA' to be dependent of import '{workspace}/myProject/ClassB'
          $.dependency('{workspace}/myProject/ClassA', '{workspace}/myProject/ClassB');

          // define import '{workspace}/myProject/ClassA' to be dependent of import '{workspace}/myProject/ClassC' and '{workspace}/myProject/ClassD' 
          $.dependency('{workspace}/myProject/ClassA', ['{workspace}/myProject/ClassC', '{workspace}/myProject/ClassD']);
          
          // get all dependencies for import '{workspace}/myProject/ClassA'
          var dependencies = $.dependency('{workspace}/myProject/ClassA');

          $.log(dependencies);
          // outputs:
          // ['workspace}/myProject/ClassC', '{workspace}/myProject/ClassD']
          </pre>

          <a name="doc-keyword-destroy"></a>
          <h4 class="sub-header">destroy <i class="font-small">(&nbsp;<font class="oodk-type">Object</font>&nbsp;<b>obj</b>&nbsp;)</i></h4>

          <p><b>scope(s)</b>: <a href="#doc-scope-use">use</a>, <a href="#doc-scope-namespace">namespace</a>, <a href="#doc-scope-class">instance</a>, <a href="#doc-scope-static">static</a></p>

          <p>Provide a mechanism to virtually destroy an object. All properties and methods are removed and the object is put in a <a href="https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object/freeze" target="_blank">freeze</a> state.</p>

          <p>The <a href="#behavior-method-__finalize">__finalize</a> behavior method can be used to customize the behavior of the removal.</p>

          <p>To test if an instance is destroyed the <a href="#doc-keyword-isset">isset</a> keyword can be used.</p>

          <pre>
          var classA = $.class(function($, µ, _){
            
            $.private('b');

            $.public(function __initialize(){
              _.b = $.new(ClassB);
            });

            $.private(function __finalize(){

              // we destroy as well the instance of ClassB
              $.destroy(_.b);
            });
          });

          var classB = $.class(function($, µ, _){
            
            $.private('debug', true);
          });

          var a = $.new(ClassA);

          $.destroy(a);

          $.log(a); 
          // outputs: 
          // {} all properties and methods are removed

          a.b = "test";

          $.log(a); 
          // outputs: 
          // {} as a destroyed instance is put in the frozen state and cannot be modified
          </pre>

          <a name="doc-keyword-float"></a>
          <h4 class="sub-header">float <i class="font-small">(&nbsp;)</i></h4>

          <p><b>scope(s)</b>: <a href="#doc-scope-class">class</a></p>

          <p>Declare a class member of type float.</p>

          <pre>
          var ClassA = $.class(function($, µ,_){
            
            $.float().public('a', 10.5);

            $.float().public(function getA(){
              return "test";
            });
          });

          var a = $.new(_.ClassA);

          a.a = false; // raise a OODK.foundation.TypeError as property "a" is of type float

          $.log(a.getA()); // raise a OODK.foundation.TypeError as method getA is of type float and return "test"
          </pre>

          <a name="doc-keyword-int"></a>
          <h4 class="sub-header">int <i class="font-small">(&nbsp;)</i></h4>

          <p><b>scope(s)</b>: <a href="#doc-scope-class">class</a></p>

          <p>Declare a class member of type integer.</p>

          <pre>
          var ClassA = $.class(function($, µ,_){
            
            $.int().public('a', 10);

            $.int().public(function getA(){
              return "test";
            });
          });

          var a = $.new(_.ClassA);

          a.a = "test"; // raise a OODK.foundation.TypeError as property "a" is of type int

          $.log(a.getA()); // raise a OODK.foundation.TypeError as method getA is of type int and return "test"
          </pre>

          <a name="doc-keyword-literal"></a>
          <h4 class="sub-header">literal <i class="font-small">(&nbsp;)</i></h4>

          <p><b>scope(s)</b>: <a href="#doc-scope-class">class</a></p>

          <p>Declare a class member of type literal object.</p>

          <pre>
          var ClassA = $.class(function($, µ,_){
            
            $.literal().public('a', {'a': 10});

            $.literal().public(function getA(){
              return "test";
            });
          });

          var a = $.new(_.ClassA);

          a.a = 10; // raise a OODK.foundation.TypeError as property "a" is of type literal

          $.log(a.getA()); // raise a OODK.foundation.TypeError as method getA is of type literal and return "test"
          </pre>

          <a name="doc-keyword-trace"></a>
          <h4 class="sub-header">trace <i class="font-small">(&nbsp;<font class="oodk-type">String</font>&nbsp;<b>msg</b>&nbsp;)</i></h4>

          <p><b>scope(s)</b>: <i>any</i></p>

          <p><b>API</b>: <a href="#api-debugger">Debugger</a></p>

          <p>Displays the <a href="#concept-stack">OODK stack</a> traces in the console.</p>

          <p>Traces are displays until the <a href="#doc-keyword-snooze">snooze</a> keyword is called.</p>

          <pre>
          $.class(function ClassCalculate($, µ, _){
            
            $.private('operator');

            $.public(function __initialize(){

              _.operator = $.new(_.ns.ClassSum);
            });

            $.public(function sum(value1, value2){

              $.dump(arguments);

              return _.operator.calculate(value1, value2);
            });
          });

          $.class(function ClassSum($, µ, _){
            
            $.public(function calculate(value1, value2){

              return (value1 + value2);
            });
          });

          $.trace('sum of 10+2');

          var calculate = $.new(_.ClassCalculate);

          calculate.sum(10, 2);

          $.snooze(); // after this point, traces are not anymore displayed, only dump and log message appear

          calculate.sum(8, 1);

          // outputs:
          // trace: sum of 10+2 ([current]:46)
          // OODK.default.ClassCalculate.__initialize ([current]:1507)
          // OODK.default.ClassCalculate.sum ([current]:50)
          // dump ([current]:32)
          // Object {0: 10, 1: 2}
          // OODK.default.ClassSum.calculate ([current]:34)
          // snooze ([current]:52)
          // dump ([current]:32)
          // Object {0: 8, 1: 1}
          </pre>

          <a name="doc-keyword-sort"></a>
          <h4 class="sub-header">sort <i class="font-small">(&nbsp;<font class="oodk-type">Array | Object</font>&nbsp;<b>obj</b>, [ <font class="oodk-type">&lt; OODK.foundation.Comparator &gt;</font>&nbsp;<b>comparator</b> ]&nbsp;)</i></h4>

          <p><b>scope(s)</b>: <i>any</i></p>

          <p>Sort an array, a literal object or a class instance by the property's values in the ascendant order.</p>

          <p>Use internally the <a href="#doc-keyword-compare">compare</a> keyword to test the arity of values.</p>

          <p>A comparator can be specified to customize the generic comparison behavior, for example sort on keys or in the descendant order.</p>

          <p>The comparator must implements the <a href="#foundation-interface-Comparator">Comparator</a> interface or OODK raise an <a href="#foundation-exception-IllegalArgumentException">IllegalArgumentException</a>.</p>

          <p>Comparator can be a class instance, in this case call member behavior method <a href="#behavior-method-__compare">__compare</a> or the class itself, which call the static behavior method __compare.</p>

          <p>On class instance, the class must implements the <a href="#foundation-interface-Sortable">Sortable</a> interface or OODK raise a <a href="#foundation-interface-Sortable">SortNotSupportedException</a>.</p>

          <p>Also, the class must be declared as <a href="#doc-keyword-dynamic">dynamic</a> or <a href="#doc-keyword-mutable">mutable</a> as member properties are moved in the right order during the sort.</p>

          <pre>
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

            // behavior method for the Comparable interface
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

            // behavior method for the Comparable interface
            $.private(function __compareTo(b){
              if($.is(b, _.ns.ClassUser)){
                return $.compare(_.login, b.getLogin());
              }else if($.is(b, _.ns.ClassEmployee)){
                return $.compare(_.login, b.getName());
              }
            });
          });

          var employeePaul = $.new(_.ClassEmployee, 'paul');
          
          var employeeAlice = $.new(_.ClassEmployee, 'alice');

          var employeeGerard = $.new(_.ClassEmployee, 'gérard');

          var userCalypso = $.new(_.ClassUser, 'calypso');

          var userAlberta = $.new(_.ClassUser, 'alberta');

          var userYgor = $.new(_.ClassUser, 'ygor');

          var list  = [employeePaul, employeeAlice, employeeGerard, userCalypso, userAlberta, userYgor];

          $.sort(list);

          for( var i in list){
            $.log(list[i].toString()); // outputs "user alberta", "employee alice", "user calypso", "employee gérard", "emplyee paul", "user ygor"
          }

          // implement a comparator to sort the iterable object in descendant order
          $.implements(OODK.foundation.Comparator).class(function ClassComparator($, µ, _){

            $.private(function __compare(pair1, pair2){

              // arguments passed to __compare is an array of pair key/value
              // in this example we want to sort on value as we get index 1 which contains the value

              var a = pair1[1];

              var b = pair2[1];

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

              // in this example we only need to compare string, calling localeCompare is enough
              return b.localeCompare(a);
            });
          });

          $.sort(list, $.new(_.ClassComparator));

          for(var i in list){
            $.log(list[i].toString()); // outputs "user ygor", "emplyee paul",  "employee gérard", "user calypso", "employee alice", "user alberta"
          }

          // implement a custom collection
          $.dynamic().implements(OODK.foundation.Sortable).class(function MyCollection($, µ, _){

              $.public(function set(key, obj){
                _[key] = obj;
              });

              // behavior method for the Sortable interface 
              $.private(function __sort(comparator){
                return $.new(OODK.foundation.util.Sorter, this, comparator);
              });
          });

          var employeesCollection = $.new(_.MyCollection);

          employeesCollection.set('paul', employeePaul);

          employeesCollection.set('alice', employeeAlice);

          employeesCollection.set('gerard', employeeGerard);

          $.sort(employeesCollection);

          $.dump(employeesCollection); // ouptuts: Object {__type: "OODK.default.MyCollection", __resource: 55, alice: Object, gerard: Object, paul: Object}
          </pre>

          <a name="doc-keyword-snooze"></a>
          <h4 class="sub-header">snooze <i class="font-small">(&nbsp;)</i></h4>

          <p><b>scope(s)</b>: <i>any</i></p>

          <p><b>API</b>: <a href="#api-debugger">Debugger</a></p>

          <p>Stop the display of the stack traces.</p>

          <p>See <a href="#doc-keyword-trace">trace</a> keyword for a complete example how to use it.<p/>

          <a name="doc-keyword-dump"></a>
          <h4 class="sub-header">dump <i class="font-small">(&nbsp;<font class="oodk-type">Object</font>&nbsp;<b>obj</b>&nbsp;)</i></h4>

          <p><b>scope(s)</b>: <i>any</i></p>

          <p><b>API</b>: <a href="#api-debugger">Debugger</a></p>

          <p>Dump an object in the console.</p>

          <p>It is a basic tool to see the state of an object at a T time. A more powerfull tool <a href="#doc-keyword-watch">watch</a> can be used to identify exact location of a bug.</p>

          <p>By default, performed a shallow dump on object properties, means embedded object are not dumped. </p>

          <p>To change this behavior, the behavior method <a href="#behavior-method-__dump">__dump</a> can be implemented in related class.</p>

          <pre>
          $.class(function ClassY($, µ, _){
            
            $.private('a', 10);

            $.private('z');

            $.public(function __initialize(){

              _.z = $.new(_.ns.ClassZ);
            });

            $.private(function __dump(dumper){

              dumper.set('z', _.z, _.ns.ClassY); // we use the dumper to deep dump the z property which is an instance of ClassZ
            });
          });

          $.class(function ClassZ($, µ, _){
            
            $.private('c', false);

            $.public('d', true);
          });

          var y = $.new(_.ClassY);

          $.dump(y);

          // outputs:
          // Object {__type: "OODK.default.ClassY", __resource: 31, a: 10, z: {__type: "OODK.default.ClassZ", __resource: 32, c: false, d: true}} 
          </pre>

          <a name="doc-keyword-watch"></a>
          <h4 class="sub-header">watch <i class="font-small">(&nbsp;<font class="oodk-type">Object</font>&nbsp;<b>obj</b>,&nbsp;<font class="oodk-type">Function</font>&nbsp;<b>callback</b>&nbsp;)</i></h4>

          <p><b>scope(s)</b>: <i>any</i></p>

          <p><b>API</b>: <a href="#api-debugger">Debugger</a></p>

          <p>Watch the changing states of an object across the heap stack.<p/>

          <p>A common use of this keyword is to locate the exact position in the code where the type or value of an object or one of its properties, has changed to identify easily a bug.</p>

          <ul>
            <li><b>obj</b>: the object to watch.</li> 

            <li><b>callback</b> <i class="font-small">(&nbsp;<font class="oodk-type">Object</font>&nbsp;<b>obj</b>,&nbsp;<font class="oodk-type">Object</font>&nbsp;<b>trace</b>)</i><br/>executed after each method member call.

            <ul>
              <li><b>obj</b>: the object to watch for.</li> 

              <li><b>trace</b>: the current stack entry. This object has three porperties: 
                <ul>
                  <li><b>msg</b>: label of the entry, name of the keyword or &lt;full_qualified_name_of_the_class&gt;.&lt;method_name&gt;</li>
                  <li><b>file</b>: the current file</li>
                  <li><b>line</b>: line from where the call is made.</li>
                </ul>
              </li>

            </ul>

            </li>

          </ul>

          <pre>
          var ClassB = $.class(function($, µ, _){

            $.private('list');

            $.public(function __initialize(list){
              
              _.list = list;
            });

            $.public(function sum(){

              var sum= 0;
              
              $.forEach(_.list, function(value, key){

                _.list[key] = this.calculate(value);
              });

              return sum;
            });

            $.public(function calculate(value){

              if(value == 2){
                return false; // we introduce a fake bug: return false instead of returning the sum 
              }else{
                return (value+1);
              }
            });
          });

          var arr = [1,2,3];

          // we define a watcher on "arr" to locate where in the code an unauthorized value has been set
          $.watch(arr, function(arr, trace){
            
            $.forEach(arr, function(v, k){
              if(typeof v !== 'number'){
               
                $.throw(OODK.foundation.IllegalArgumentException, [trace.msg + ' ('+trace.file+':'+trace.line+")\n arr["+k+'] = '+v + ' is an incorrect value'])

              }
            });
          });

          var a = $.new(ClassB, arr);

          a.sum();

          // throw:
          // Uncaught OODK.foundation.IllegalArgumentException
          //
          // Class &lt;anonymous&gt;.calculate ([current]:36)
          //  arr[1] = false is an incorrect value
          // 
          // at forEach ([current]:56)
          // at forEach ([current]:34)
          // at Class &lt;anonymous&gt;.sum ([current]:67)
          // at namespace ([current]:19)
          </pre>

          <a name="doc-keyword-dynamic"></a>
          <h4 class="sub-header">dynamic <i class="font-small">()</i></h4>

          <p><b>scope(s)</b>: <i>namespace</i>, <i>class</i>, <i>interface</i></p>

          <p>Declare a class to be dynamic.</p>

          <p>Dynamic class instance can have their properties, and only their properties, added or removed after the instantiation.</p>

          <p>To declare a full mutable class, properties as well as methods, use instead the <a href="#doc-keyword-mutable">mutable</a> keyword.</p>

          <p>Extending the native Array object is a good example of a dynamic class.</p>

          <p>Key of an array are added or removed all along the lifecycle of the object. Without declaring the inherited class as dynamic, adding or removing keys would not be possible.</p>

          <pre>
          // we declare MyArray to be immutable
          var MyArray = $.extends(Array).class(function($, µ, _){

              $.public(function __initialize(){
                $.invoke(this, $.super.__initialize, arguments);
              });
          });

          var w = $.new(MyArray);

          w.push(10); // raise a TypeError as properties cannot be added after the instantiation

          // declare MyArray to be dynamic
          var MyArray = $.dynamic().extends(Array).class(function($, µ, _){

              $.public(function __initialize(){
                $.invoke(this, $.super.__initialize, arguments);
              });
          });

          var w = $.new(MyArray);

          w.push(10); // no exception is raised, properteis can be added after the instantiation

          $.log(w); // outputs: {10, self: Object}
          </pre>

          <a name="doc-keyword-extends"></a>
          <h4 class="sub-header">extends <i class="font-small">(&nbsp;<font class="oodk-type">Class | Interface</font>&nbsp;<b>fn</b> [ * ] )</i></h4>

          <p><b>scope(s)</b>: <i>namespace</i>, <i>instance</i></p>

          <p>Declare the successing class or interface to extends from the given class or interface(s) passed as argument.</p>

          <p>Class can inherit from only one parent class, as interface can inherits from multiple parent interfaces.</p>

          <p>Argument must be a valid class or interface else OODK will raise an exception.</p>

          <pre>
            $.class(function ClassA($, µ, _){
              $.private('a', 5);
            });

            $.extends(_.ClassA).class(function ClassB($, µ, _){
              $.private('a', 10);
            });

            $.interface(function Itf1($){
              $.abstract('getOne');
            });

            $.interface(function Itf2($){
              $.abstract('getTwo');
            });

            $.extends(_.Itf1, _.Itf2).interface(function Itf3($){
              $.abstract('getThree');
            });
          </pre>

          <a name="doc-keyword-final"></a>
          <h4 class="sub-header">final <i class="font-small">(&nbsp;)</i></h4>

          <p><b>scope(s)</b>: <i>namespace</i>, <i>instance</i></p>

          <p>Declare a class or or a member, static and non-static, of a class to be uninheritable/unoveridable from child classes.</p>

          <pre>
          $.final().class(function ClassA($, µ, _){
            $.private('a', 5);
          });

          //throw an exception as ClassA is declared as final
          $.extends(_.ClassA).class(function ClassB($, µ, _){
            $.private('a', 10);
          });
          
          $.class(function ClassC($, µ, _){
            $.final().private(getA(){
              return _.a;
            });

            $.static(function($, µ, _){
              
              // declare the class constant SUCCESS 
              $.final().public('SUCCESS', 1);
            });
          });

          $.extends(_.ClassC).class(function ClassD($, µ, _){
            
            //throw an exception as ClassC::getA is declared as final and ClassD::getA try to override it
            $.final().private(getA(){
              return _.a;
            });
          });

          </pre>

          <a name="doc-keyword-error"></a>
          <h4 class="sub-header">info <i class="font-small">(&nbsp;<font class="oodk-type">Object</font>&nbsp;<b>obj</b>&nbsp;)</i></h4>

          <p><b>scope(s)</b>: <i>any</i></p>

          <p>Send an error message to the console.</p>

          <p>The error should not be confused with <a href="#doc-keyword-throw">throw</a>.</p>

          <p>See section <a href="#getting-start-config-console">Configuration - console</a> to check how console messages can be treated.</p>

          <pre>
          var a = 10;

          $.error(a); // outputs: 10

          $.error(a, "value of a is "); 
          // outputs:  
          // error: value of a is ([current]72)
          // 10
          </pre>

          <a name="doc-keyword-forEach"></a>
          <h4 class="sub-header">forEach <i class="font-small">(&nbsp;<font class="oodk-type">Array&nbsp;|&nbsp;Object&nbsp;|&nbsp;String&nbsp;</font><b>obj</b>,&nbsp;<font class="oodk-type">Function</font>&nbsp;<b>callback</b>&nbsp;)</i></h4>

          <p><b>scope(s)</b>:&nbsp;<i>any</i></p>

          <p><b>API</b>:&nbsp;<a href="#api-iteration">Iteration</a></p>

          <p>Iterates over properties of an object applying the callback argument at each property encountered.</p>

          <p>Two arguments are passed to the callback function: (&nbsp;<font class="oodk-type">Object</font>&nbsp;<b>value</b>,&nbsp;<font class="oodk-type">String</font>&nbsp;<b>index</b>&nbsp;)</p>

          <p>Returning false within the callback function will stop the iteration, as natively break will behaved.</p>

          <p>While iterating on a class instance, the related class must implement the <a href="#foundation-interface-Iterable">Iterable</a> interface and declare the <a href="behavior-method-__iterator">__iterator</a> behavior method.</p>

          <p>The __iterator method must return an instance of a class implementing the <a href="#foundation-interface-Iterator">Iterator</a> interface.</p>

          <p>The <a href="#foundation-util-Iterator">Iterator</a> class implements a generic version of an iterator.</p>

          <pre>
          var a = {'a': 10, 'b': 5, 'c': 1};

          $.forEach(a, function(value, index){
            $.log(index+' => '+value);
          });

          // output:
          // a => 10
          // b => 5
          // c => 1

          var a = [10, 5, 1];

          $.forEach(a, function(value, index){
            $.log(key+' => '+value);
            if(index == 1) return false;
          });

          // output:
          // 0 => 10
          // 1 => 5 
          // stop iteration at index 1 as callback return false when index 1 is reached
          </pre>

          <pre>
          // to be iterable ClassA must implements OODK.foundation.Iterable interface
          $.implements(OODK.foundation.Iterable).class(function ClassA($, µ, _){

            $.private('list');

            $.public(function __initialize(list){

              _.list = list;
            });

            $.private(function __iterator(){

              return $.new(OODK.foundation.util.Iterator, _.list);
            });
          });

          var a = $.new(_.ClassA, [1,2,3]);

          $.forEach(a, function(value, index){
            $.log('value of index ' + index + ' is ' + value);
          });

          // outputs:
          // log ([current]:72)
          // value of index 0 is 1
          // log ([current]:72)
          // value of index 1 is 2
          // log ([current]:72)
          // value of index 2 is 3
          </pre>

          <a name="doc-keyword-implements"></a>
          <h4 class="sub-header">implements <i class="font-small">(&nbsp;<font class="oodk-type">Function</font>&nbsp;<b>interface</b>&nbsp;*&nbsp;)</i></h4>

          <p><b>scope(s)</b>: <i>namespace</i>, <i>instance</i></p>

          <p>Declare a class as implementing the given interface(s) passed as argument.</p>

          <pre>
          $.public().interface(function Ift1($){
            $.abstract('getOne');
          });

          $.public().interface(function Ift2($){
            $.abstract('getTwo');
          });

          $.public().implements(this.Itf1, this.Itf2).class(function ClassA($, µ, _){
            
            $.public(function getOne(){
              return 1;
            });

            $.public(function getTwo(){
              return 2;
            });
          });
          </pre>

          <a name="doc-keyword-import"></a>
          <h4 class="sub-header">import <i class="font-small">(&nbsp;<font class="oodk-type">String&nbsp;|&nbsp;Array&nbsp;</font>&nbsp;<b>file</b>&nbsp;*,&nbsp;<font class="oodk-type">Function</font>&nbsp;<b>callback</b>&nbsp;)</i></h4>

          <p><b>scope(s)</b>: <i>any</i></p>

          <p>Import a file, a set of files, or a package (see <a href="#doc-keyword-package">package</a> keyword).</p>

          <p>By default files are loaded synchronously.</p>

          <p>If second argument is a function, files will be loaded asynchronously (except for dependencies files which will be always loaded synchronously).</p>

          <pre>
          // import a single file
          $.import('{myProject}/ClassA');

          // import a set of files
          $.import('{myProject}/ClassA' ,'{myProject}/ClassB', '{myProject}/ClassC');

          // load asynchronously a set of files, note as first argument is array
          $.import(['{myProject}/ClassA' ,'{myProject}/ClassB', '{myProject}/ClassC'], function(){
            
            var a $.new(OODK.myProject.ClassA);
          });

          // import a package
          $.import('[myProject.package]');
          </pre>

          <a name="doc-keyword-interface"></a>
          <h4 class="sub-header">interface <i class="font-small">(&nbsp;<font class="oodk-type">Function</font>&nbsp;<b>itf</b>&nbsp;)</i></h4>

          <p><b>scope(s)</b>: <i>namespace</i>, <i>instance</i></p>

          <p>Declare an interface.</p>

          <p>Interface cannot be instantiated and can inherit from multiple parent interfaces.</p>

          <p>As classes, an interface can be anonymous, local or with a public/private access related to the namespace where they have been declared.</p>

          <p>The <a href="#doc-keyword-abstract">abstract</a> keyword is used to define method's signature.</p>

          <pre>
          OODK('myProject', function($, _){

            // declare Itf1 as anonymous
            var Itf1 = $.public().interface(function($){
              $.abstract('getOne'); // only the name of the method have to be specified
            });

            // declare Itf2 as public of myProject namespace
            $.public().interface(function Ift2($){
              $.abstract('getTwo');
            });

            // declare Itf3 as private of myProject namespace
            $.interface(function Ift3($){
              $.abstract('getThree');
            });

            $.log(OODK.myProject.Itf2); // Itf2 accessebile through the OODK global object

            $.log(this.Itf2); // ... or within the myProject namespace

            $.log(_.Itf3); // Itf3 is accessible only within the myProject namespace

            $.log(Itf1); // Itf1 is accessible only in this scope
          });
          </pre>

          <a name="doc-keyword-info"></a>
          <h4 class="sub-header">info <i class="font-small">(&nbsp;<font class="oodk-type">Object</font>&nbsp;<b>obj</b>&nbsp;)</i></h4>

          <p><b>scope(s)</b>: <i>any</i></p>

          <p>Send an info message to the console.</p>

          <p>See section <a href="#getting-start-config-console">Configuration - console</a> to check how console messages can be treated.</p>

          <pre>
          var a = 10;

          $.info(a); // outputs: 10

          $.info(a, "value of a is "); 
          // outputs:  
          // info: value of a is ([current]72)
          // 10
          </pre>

          <a name="doc-keyword-inspect"></a>
          <h4 class="sub-header">inspect <i class="font-small">(&nbsp;<font class="oodk-type">Object</font>&nbsp;<b>obj</b>&nbsp;)</i></h4>

          <p><b>scope(s)</b>: <i>any</i></p>

          <p><b>API</b>: <a href="#api-reflection">Reflection</a></p>

          <p>Get the internal structure of an OODK resource.</p>

          <p>Structure is provided with predefined issers/getters:</p>

          <table class="table">
            <tr><th>Method</th><th>Description</th></tr>
            <tr><td>getClass</td><td>get the class of an instance.</td></tr>
            <tr><td>getDeclaredMembers([<b>name</b>])</td><td>get all declared members of class or the specific member if name argument is provided (see below for the specific isser/getter applying to members).</td></tr>
            <tr><td>getImport</td><td>get the import path of the file where the class/interface has been declared.</td></tr>
            <tr><td>getFile</td><td>get the resolved path of the file where the class/interface has been declared.</td></tr>
            <tr><td>getInterfaces</td><td>get all direct interfaces that the given class is implementing.</td></tr>
            <tr><td>getName</td><td>return a boolean specifying if the method is declared as abstract.</td></tr>
            <tr><td>getLocalName</td><td>get the right part of full qualified name of the class/interface, i.e OODK.myProject.ClassA => return ClassA.</td></tr>
            <tr><td>getSuperClass</td><td>get the parent class/interface of a class or interface.</td></tr>
            <tr><td>isAbstract</td><td>return a boolean specifying if the class is declared as abstract.</td></tr>
            <tr><td>isAnonymous</td><td>return a boolean specifying if the class is anonymous.</td></tr>
            <tr><td>isClass</td><td>return a boolean specifying if the given object is a class.</td></tr>
            <tr><td>isDynamic</td><td>return a boolean specifying if the class is declared as dynamic.</td></tr>
            <tr><td>isFinal</td><td>return a boolean specifying if the class is declared as final.</td></tr>
            <tr><td>isInterface</td><td>return a boolean specifying if given object is an interface.</td></tr>
            <tr><td>isLocal</td><td>return a boolean specifying if the class is declared within an instance scope.</td></tr>
            <tr><td>isMutable</td><td>return a boolean specifying if the class is declared as mutable.</td></tr>
            <tr><td>isProxy</td><td>return a boolean specifying if the class is declared as a proxy of a target class.</td></tr>
            <tr><td>isNamespace</td><td>return a boolean specifying if the given object is a valid namespace.</td></tr>
            <tr><td>isPrivate</td><td>return a boolean specifying if the class is private to the contxtual namespace.</td></tr>
            <tr><td>isPublic</td><td>return a boolean specifying if the class is public to the contextual namespace.</td></tr>
          </table>

          <p>Class members structure object is also provided with specific issers/getters:</p>

          <table class="table">
            <tr><th>Method</th><th>Description</th></tr>
            <tr><td>getName</td><td>get the name of the member.</td></tr>
            <tr><td>isAbstract</td><td>return a boolean specifying if the method is declared as abstract.</td></tr>
            <tr><td>isFinal</td><td>return a boolean specifying if the method is declared as final.</td></tr>
            <tr><td>isMethod</td><td>return a boolean specifying if the member is a method.</td></tr>
            <tr><td>isPrivate</td><td>return a boolean specifying if the member is declared as private.</td></tr>
            <tr><td>isProperty</td><td>return a boolean specifying if the member is a property.</td></tr>
            <tr><td>isProtected</td><td>return a boolean specifying if the member is declared as protected.</td></tr>
            <tr><td>isProxy</td><td>return a boolean specifying if the member is declared as a proxy of a target instance member.</td></tr>
            <tr><td>isPublic</td><td>return a boolean specifying if the member is declared as public.</td></tr>
            <tr><td>isStatic</td><td>return a boolean specifying if the method is declared as static.</td></tr>
          </table>

          <p>here is few examples on how to use inspect:<p>

          <pre>
          var Itf1 = $.interface(function($, µ, _){
            $.abstract('getOne');
          });

          var Itf2 = $.interface(function($, µ, _){
            $.abstract('getTwo');
          });

          var Itf3 = $.extends(Itf2).interface(function($, µ, _){
            $.abstract('getThree');
          });

          var ClassB = $.abstract().implements(Itf1, Itf3).class(function($, µ, _){
            $.protected(function getTwo(){
              return 2;
            });

             $.public(function getThree(){
              return 3;
            });
          });

          $.public().final().extends(ClassB).class(function ClassA($, µ, _){
            
            $.protected('list');

            $.private(function getOne(){
              return 1;
            });
          });

          var a = $.new(this.ClassA);

          $.log($.inspect(a).getClass()); // output => ClassA
          $.log($.inspect(this.ClassA).getName()); // output => OODK.default.ClassA
          $.log($.inspect(this.ClassA).getLocalName()); // output => ClassA
          $.log($.inspect(this.ClassA).isFinal()); // output => true
          $.log($.inspect(this.ClassA).isPublic()); // output => true
          $.log($.inspect(this.ClassA).getSuperClass()); // output => ClassB
          $.log($.inspect(ClassB).isAbstract()); // output => true
          $.log($.inspect(ClassB).isAnonymous()); // output => true
          $.log($.inspect(this.ClassA).getInterfaces()); // output => [Itf1, Itf3]
          $.log($.inspect(this.ClassA).getDeclaredMembers('getOne').isPrivate()); // output => true
          $.log($.inspect(this.ClassA).getDeclaredMembers('getOne').isMethod()); // output => tru
          $.log($.inspect(this.ClassA).getDeclaredMembers('list').isProtected()); // output => true
          $.log($.inspect(this.ClassA).getDeclaredMembers('list').isProperty()); // output => truee
          $.log($.inspect(ClassB).getDeclaredMembers('getThree').isPublic()); // output => true
          $.log($.inspect(Itf3).getSuperClass()); // output => [Itf2]
          </pre>

          <a name="doc-keyword-instanceOf"></a>
          <h4 class="sub-header">instanceOf <i class="font-small">(&nbsp;<font class="oodk-type">Object | Primitive</font>&nbsp;<b>obj</b>,&nbsp;<font class="oodk-type">Class | Interface</font> <b>type</b> )</i></h4>

          <p><b>scope(s)</b>: <i>any</i></p>

          <p>Test if the instance passed as argument is an isntance of the <b>type</b> argument.</p>

          <p>A class instance is an instance of it parent class, all of its ancestor classes as well as its direct and ancestors interfaces that its parent class implements.</p>

          <pre>
          $.public().interface(function Itf1($){
            $.abstract('getOne');
          });

          $.public().interface(function Itf2($){
            $.abstract('getTwo');
          });

          $.public().extends(this.Itf2).interface(function Itf3($){
            $.abstract('getThree');
          });

          $.public().class(function ClassB($, µ, _){

            $.public(function getThree(){
              return 3;
            });
          });

          $.public().extends(this.ClassB).implements(this.Itf1, this.Itf3).class(function ClassA($, µ, _){
            
            $.public(function getOne(){
              return 1;
            });

            $.public(function getTwo(){
              return 2;
            });
          });

          var a = $.new(this.ClassA);

          $.log($.is(a, this.ClassA)); // outputs: true
          $.log($.is(a, this.ClassB)); // outputs: true
          $.log($.is(a, this.Itf1)); // outputs: true
          $.log($.is(a, this.Itf2)); // outputs: true
          $.log($.is(a, this.Itf3)); // outputs: true
          </pre>

          <a name="doc-keyword-invoke"></a>
          <h4 class="sub-header">invoke <i class="font-small">(&nbsp;<font class="oodk-type">Object</font>&nbsp;<b>obj</b>,&nbsp;<font class="oodk-type">Function | String</font> <b>method</b> )</i></h4>

          <p><b>scope(s)</b>: <i>any</i></p>

          <p>Dynamicaly invoke a method on an instance.</p>

          <p>Invoke can be called as well on a class, which is this case, will generate an new instance of that class.</p>

          <pre>
          var ClassA = $.class(function($, µ, _){

            $.private('increment');

            $.public(function __initialize(increment){
              _.increment = increment;
            });
            
            $.public(function sum(amount){
              return amount + _.increment;
            });
          });

          var a = $.new(ClassA, 10);

          $.log($.invoke(a, 'sum', [10])); // output 20

          $.log($.invoke(a, a.sum, [10])); // output 20
          </pre>

          <pre>
          var b = $.invoke(ClassA, [5]);

          $.log($.invoke(b, 'sum', [10])); // output 15
          </pre>

          <a name="doc-keyword-is"></a>
          <h4 class="sub-header">is <i class="font-small">(&nbsp;<font class="oodk-type">Object | Primitive</font>&nbsp;<b>obj</b>,&nbsp;<font class="oodk-type">Class | Interface</font> <b>type</b> )</i></h4>

          <p><b>scope(s)</b>: <i>any</i></p>

          <p>Test if the type of the value has the type as the <b>type</b> argument.</p>

          <p>Type can be one the OODK pseudo types: OODK.int, OODK.float, OODK.void, OODK.arrayOf, OODK.literal.</p>

          <pre>
          $.log($.is("test", String)); // outputs: true
          $.log($.is(false, Boolean)); // outputs: true
          $.log($.is([1,2,3], Array)); // outputs: true
          $.log($.is(10, Number)); // outputs: true

          $.log($.is(null, Object)); // outputs: true, as isObject(null) outputs false

          $.log($.is([1,2,'test'], OODK.arrayOf(Number))); // outputs: false, "test" is not a number

          $.log($.is(5, OODK.int)); // outputs: true

          $.log($.is(10.2, OODK.float)); // outputs: true

          $.log($.is({a: 10, b: "test"}, OODK.literal)); // outputs: true

          $.class(function ClassB($, µ, _){});

          $extends(_.classB).class(function ClassA($, µ, _){});

          var a = $.new(OODK.default.ClassA)

          $.log($.is(a, _.ClassA)); // outputs true

          $.log($.is(a, _.ClassB)); // outputs false, to test the polymorphism use the instanceOf keyword
          </pre>

          <a name="doc-keyword-isEmpty"></a>
          <h4 class="sub-header">isEmpty <i class="font-small">(&nbsp;<font class="oodk-type">Object | Primitive</font>&nbsp;<b>val</b>)</i></h4>

          <p><b>scope(s)</b>: <i>any</i></p>

          <p>Test if the value pased as argument is empty.</p>

          <pre>
          $.log($.isEmpty(" "); // outputs: true
          $.log($.isEmpty(null); // outputs: true
          $.log($.isEmpty(NaN)); // outputs: true
          $.log($.isEmpty(undefined)); // outputs: true
          $.log($.isEmpty({})); // outputs: true
          $.log($.isEmpty([])); // outputs: true

          var ClassTest = $.class(function($, µ, _){

            $.public(function test(){});

            $.static(function($, µ, _){

              $.public(function staticTest(){});
            })
          });

          var a = $.new(ClassTest);

          $.log($.isEmpty(a)); // outputs: true
          </pre>

          <a name="doc-keyword-isIterable"></a>
          <h4 class="sub-header">isIterable <i class="font-small">(&nbsp;<font class="oodk-type">Object | Primitive</font>&nbsp;<b>val</b>)</i></h4>

          <p><b>scope(s)</b>: <i>any</i></p>

          <p>Test if the value passed as argument is iterable over a loop.</p>

          <p>Use internally Object.keys() to test if the value is iterable: null and undefined are the both two native types to be not iterable.</p>

          <p>OODK class instances which does implements the interface <a href="#foundation-interface-Iterable">Iterable</a> are also considered to be not iterable.</p>

          <pre>
          $.log($.isIterable("test"); // outputs: true
          $.log($.isIterable([1,2,3]); // outputs: true
          $.log($.isIterable(false); // outputs: true, Object.keys(false) => [] 
          $.log($.isIterable(null)); // outputs: false
          $.log($.isIterable(undefined)); // outputs: false

          var ClassA = $.implements(OODK.foundation.Iterable).class(function($, µ, _){
            $.private('a', 1);

            $.private('b', 2);

            $.private(function __iterator(){
              return $.new(OODK.foundation.util.Iterator, _);
            });
          });

          var a = $.new(ClassA);

          $.log($.isIterable(a)); // outputs: true

          var ClassB = $.class(function($, µ, _){
            $.public('a', 1);
          });

          var b = $.new(ClassB);

          $.log($.isIterable(b)); // outputs: false
          </pre>

          <a name="doc-keyword-isset"></a>
          <h4 class="sub-header">isset <i class="font-small">(&nbsp;<font class="oodk-type">Object</font>&nbsp;<b>value</b>&nbsp;)</i></h4>

          <p><b>scope(s)</b>: <i>any</i></p>

          <p>Test if the value passed as argument is defined. Undefined, NaN and destroyed objects (see <a href="#doc-keyword-destroy">destroy keyword</a>) are considered to be undefined.</p>

          <pre>
          var a;

          $.isset(a); // output: false

          var b = (10/"test");

          $.isset(b); // output: false

          var ClassC = $.class(function($, µ, _){
            $.private('a', 10);
          });

          var c = $.new(ClassC);

          $.destroy(c);

          $.isset(c); // output: false
          </pre>

          <a name="doc-keyword-log"></a>
          <h4 class="sub-header">log <i class="font-small">(&nbsp;<font class="oodk-type">Object</font>&nbsp;<b>obj</b>&nbsp;)</i></h4>

          <p><b>scope(s)</b>: <i>any</i></p>

          <p>Send a log message to the console.</p>

          <p>See section <a href="#getting-start-config-console">Configuration - console</a> to check how console messages can be treated.</p>

          <pre>
          var a = 10;

          $.log(a); // outputs: 10

          $.log(a, "value of a is "); 
          // outputs:  
          // log: value of a is ([current]72)
          // 10
          </pre>

          <a name="doc-keyword-new"></a>
          <h4 class="sub-header">new <i class="font-small">(&nbsp;<font class="oodk-type">Class</font> <b>fn</b>,&nbsp;&nbsp;<font class="oodk-type">Any</font> <b>argument</b> [*] )</i></h4>

          <p><b>scope(s)</b>: <i>namespace</i>, <i>use</i>, <i>instance</i>, <i>static</i></p>

          <p>Generate a new instance of the given class passed as argument.</p>

          <p>New supports native types and OODK class.</p>

          <p>To instantiate a class with a dynamic number of arguments use the <a href="#doc-keyword-invoke">invoke</a> keyword.</p>
          
          <pre>
          $.new(ClassA); // instantiation without argument

          $.new(ClassA, "test", false); // instantiation with arguments passed to the __initialize method

          $.new(String, "test"); // works also on native type
          </pre>

          <a name="doc-keyword-OODK"></a>
          <h4 class="sub-header">OODK <i class="font-small">(&nbsp;<font class="oodk-type">String</font>&nbsp;<b>namespace</b>,&nbsp;<font class="oodk-type">Function</font>&nbsp;<b>scope</b>&nbsp;)</i></h4>

          <p><b>scope(s)</b>: <i>OODK</i></p>

          <p>Declare a namespace.</p>

          <p>First argument is the name of the namespace.</p>

          <p>Second argument is the scope function.</p>

          <p>If first argument is the scope function, OODK will define the default namespace as the current namespace.</p>

          <p>As all scope function, first argument is an instance of the syntaxer, second argument is the private context of the specificed namespace.</p>

          <p><b>Becarefull!</b> as requesting the default namespace can be done in any files, requesting a specific namespace must be done in a file located in a sub folder of the workspace having the same name else OODK raise a <a href="#foundation-exception-SecurityException">SecurityException</a></p>

          <pre>
          //start declaring in the default namespace 
          OODK(function($, _){
            
            $.public().class(function ClassA($, µ, _){});

            $.log(this.ClassA);

            $.log(OODK.default.ClassA);
          });
          </pre>

          <pre>
          // file: {workspace}/myProject/ClassA.js

          // ClassA.js is located in the "myProject" sub folder of the workspace, 
          // the namespace "myProject" as the same root as the subfolder where the file is located
          // no exception are raised
          OODK('myProject', function($, _){

            $.public().class(function ClassA($, µ, _){});

            $.log(this.ClassA);

            $.log(OODK.myProject.ClassA);
          });
          </pre>

          <a name="doc-keyword-mutable"></a>
          <h4 class="sub-header">mutable <i class="font-small">()</i></h4>

          <p><b>scope(s)</b>: <i>namespace</i>, <i>class</i>, <i>interface</i></p>

          <p>Declare a class to be mutable.</p>

          <p>Mutable class instance can have their properties and methods updated, added and removed after the instantiation.</p>

          <p>To declare a partial mutable class on properties only, use instead the <a href="#doc-keyword-dynamic">dynamic</a> keyword.</p>

          <pre>
          // class Virus: throw a "you are dead message" when executed
          // but is clever enough to adapt himself an fools the Guardian 
          $.mutable().class(function Virus($, µ, _){

              $.public(function execute(){
                this.kill();    
              });

              // the malware method, throw a nasty "you are dead message"
              $.public(function kill(){
                $.throw("you are dead");      
              });

              // mutate it's own state and hide the malware method behind a harmless name
              $.public(function mutate(){
                
                this.clean = this.kill;

                delete this.kill;

                this.execute = function execute(){
                  this.clean();
                }      
              });
          });

          // class Guardian: check that input objects are not harmfull 
          // but is not clever as Virus as is only check that object has or not a kill method defined
          $.class(function Guardian($, µ, _){

              $.public(function add(obj){
                
                if(typeof obj['kill'] === 'function') {
                  return false;
                }else{
                  obj.execute();
                }
              });
          });

          var v = $.new(_.Virus);

          var g = $.new(_.Guardian);

          $.log(g.add(v)); // outputs: false, v has a kill method and identify as a virus, it is rejected

          v.mutate(); // virus mutate and change singature of its method to looks clean

          $.log(g.add(v)); // guardian does not identify the kill signature and execute the virus: execute the malware and raise the exception "you are dead"
          </pre>

          <a name="doc-keyword-notify"></a>
          <h4 class="sub-header">notify <i class="font-small">(&nbsp;&nbsp;<font class="oodk-type">Object</font>&nbsp;<b>observable</b>,&nbsp;&nbsp;<font class="oodk-type">Object | Primitive</font>&nbsp;<b>message</b>,&nbsp;[ <font class="oodk-type">Object</font>&nbsp;<b>observer</b> ] )</i></h4>

          <p><b>scope(s)</b>: <i>namespace</i>, <i>use</i>, <i>instance</i>, <i>static</i></p>

          <p>Notify all observer (or only the one specified as third argument) of the given observable object that states changed has occured.</p>

          <p>Works only on OODK instances.</p>

          <p>The observable object must implements the <a href="#foundation-interface-Observer">Observable</a> interface.</p>

          <p>Argument message can be of any type allowing to customize your own update handler.</p>

          <p>See the section <a href="#design-pattern-observer">design pattern - Observer</a> for a complete example .</p>

          <a name="doc-keyword-observe"></a>
          <h4 class="sub-header">observe <i class="font-small">(&nbsp;&nbsp;<font class="oodk-type">Object</font>&nbsp;<b>observer</b>,&nbsp;&nbsp;<font class="oodk-type">Object</font>&nbsp;<b>observable</b>&nbsp;)</i></h4>

          <p><b>scope(s)</b>: <i>namespace</i>, <i>use</i>, <i>instance</i>, <i>static</i></p>

          <p>Define an observer for the specified observable object.</p>

          <p>Works only on OODK instances.</p>

          <p>The observer object must implements the <a href="#foundation-interface-Observer">Observer</a> interface and observable object the <a href="#foundation-interface-Observer">Observable</a> interface</p>

          <p>Test as well the unicity, only one observer object is stored for a given observable object.</p>

          <p>See the section <a href="#design-pattern-observer">design pattern - Observer</a> for a complete example .</p>
          
          <a name="doc-keyword-package"></a>
          <h4 class="sub-header">package <i class="font-small">(&nbsp;&nbsp;<font class="oodk-type">String</font>&nbsp;<b>name</b>,&nbsp;&nbsp;<font class="oodk-type">Array</font>&nbsp;<b>file</b>&nbsp;)</i></h4>

          <p><b>scope(s)</b>: <i>namespace</i>, <i>use</i>, <i>instance</i>, <i>static</i></p>

          <p>Define a package.</p>

          <p>The term package can be confusing compare to the java language, as an OODK package is simply a set of files, each file of the package can belong to the same or to different namespace(s).</p>

          <p>Packages are modulars and can be used to import the whole hierarchy of an external component, or only some specific parts.</p>

          <p>Packages can be embedded in other packages allowing to build a complete import hierarchy easily. Embdedded packages have to wrapped with brackets to be considered as packages.</p>

          <pre>
          $.package('myProject.partial', ['{myProject}/ClassA', '{myProject}/ClassB']);

          $.package('myProject.partial2', ['{myProject}/ClassC', '{myProject}/ClassD']);

          // define package "myProject.full" with sub packages "myProject.partial" and "myProject.partial2"
          $.package('myProject.full', ['[myProject.partial]', '[myProject.partial2]']);

          $.import('[myProject.full]');
          </pre>

          <a name="doc-keyword-observable"></a>
          <h4 class="sub-header">private <i class="font-small">(&nbsp;<font class="oodk-type">Function&nbsp;|&nbsp;String</font>&nbsp;<b>name</b>,&nbsp;[&nbsp;<font class="oodk-type">Object | Primitives</font>&nbsp;<b>def</b>&nbsp;]&nbsp;)</i></h4>

          <p><b>scope(s)</b>: <i>instance</i>, <i>static</i></p>

          <p>Declare a property of a class to be observable.</p>

          <p>An observable property notify its observers when its value has changed.</p>

          <p>Use a deep equal to test if value has changed (for example setting 50 to "50" is considered as a state changement and will notify the observers).</p>

          <p>If a change has occured, call the behavior method __notify passing as argument the name of the property, the new value as well as the predecessing value before the change.</p>

          <p>See the section <a href="#design-pattern-observer">design pattern - Observer</a> for a complete example on the keyword usage.</p>

          <a name="doc-keyword-private"></a>
          <h4 class="sub-header">private <i class="font-small">(&nbsp;<font class="oodk-type">Function&nbsp;|&nbsp;String</font>&nbsp;<b>name</b>,&nbsp;[&nbsp;<font class="oodk-type">Object | Primitives</font>&nbsp;<b>def</b>&nbsp;]&nbsp;)</i></h4>

          <p><b>scope(s)</b>: <i>instance</i>, <i>static</i></p>

          <p>Declare a class member as private.</p>

          <p>A member declared as private is accessible only within the local class where it has been declared.</p>

          <pre>
          $.class(function($, µ, _){

            // declare a property as private
            $.private('b');

            // declare a method as private
            $.private(function sum(amount){
              return _.b + amount; // private members are accessible through the private context of the instance (sign underscore)
            });

            $.static(function($, µ, _){
              
              // declare a static property as private
              $.private('staticB');

              // declare a static method as public
              $.private(function staticSum(amount){
                return _.staticB + amount; // private static members are accessible through the static private context of the class
              });

            });
          });
          </pre>

          <a name="doc-keyword-protected"></a>
          <h4 class="sub-header">protected <i class="font-small">(&nbsp;<font class="oodk-type">Function&nbsp;|&nbsp;String</font>&nbsp;<b>name</b>,&nbsp;[&nbsp;<font class="oodk-type">Object | Primitives</font>&nbsp;<b>def</b>&nbsp;]&nbsp;)</i></h4>

          <p><b>scope(s)</b>: <i>instance</i>, <i>static</i></p>

          <p>Declare a class member as protected.</p>

          <p>A protected member is accessible within the class where it has been declared as well as all its sub childs classes.</p>

          <pre>
          var ClassA = $.class(function($, µ, _){

            // declare a property as protected
            $.protected('c');

            // declare a method as protected
            $.protected(function sum(amount){
              return µ.c + amount; // protected members are accessible through the protected context of the instance (sign micron)
            });

            $.static(function($, µ, _){
              
              // declare a static property as protected
              $.protected('staticC');

              // declare a static method as protected
              $.protected(function staticSum(amount){
                return µ.staticC + amount; // private static members are accessible through the static private context of the class
              });

            });
          });

          var ClassB = $.extends(ClassA).class(function($, µ, _){

           $.protected(function sum(amount){
              return 'value of the sum is ' + $.super.sum(); // protected members which are overrided are accessible through the $.super keyword
            });

            $.static(function($, µ, _){

              // declare a static method as protected
              $.protected(function staticSum(amount){
                return 'value of the static sum is ' + $.super.sum(); // protected static members which are overrided are accessible through the $.super keyword
              });

            });
          });
          </pre>

          <a name="doc-keyword-proxy"></a>
          <h4 class="sub-header">proxy <i class="font-small">( [ <font class="oodk-type">Class</font> <b>target</b>] )</i></h4>

          <p><b>scope(s)</b>: <i>instance</i>, <i>static</i></p>

          <p>Declare a class, or class member as a proxy of a target class or class member.</p>

          <p>A proxy class allows to expose members (some or all of them) of the target class without implementing the equivalent counterpart and so avoid redondant code duplication.</p>

          <pre>
          // ClassA is anonymous and therefore is only accessible in the local scope
          var ClassA = $.class(function($, µ, _){

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
          });

          // we implements ProxyClassA as public, accessible from everywhere,
          // as proxy of ClassA and expose method "getB" and property "a"
          // ClassA::setB() stay invisible from the outer world
          $.public().proxy(ClassA).class(function ProxyClassA($, µ, _){

            // declare method getB as proxy of method ClassA::getB()
            $.proxy().public('getB');

            // declare property a as proxy of property ClassA::a
            $.proxy().public('a');
            
          });

          // new call the initializer of the target Class
          var pa = $.new(this.ProxyClassA, 10);

          $.log(pa.a); // outputs: 1, retrieve value of the target property

          $.log(pa.getB()); // outputs: 10, retrieve value of target property b, assigned to 10 within the initializer 

          pa.a = 20;

          $.log(pa.a); // outputs: 20, all change made on a proxy property is automatically reflected to the target property
          </pre>

          <p>Proxy can be used also to declare individual member without declaring the whole class a proxy class.</p>

          <p>In this case the behavior is different, a proxy member apply on a specific instance or act as a factory method if target is a class.</p>

          <p>Proxy members apply only on target member instances which are declared public. But they can declared their own modifiers independently of the target member.</p>

          <pre>
          // ClassA is local to the current scope ...
          var ClassA = $.class(function($, µ, _){

              $.public('a', 1);

              $.private('b');

              $.public(function __initialize(b){
                _.b = b;
              });

              $.public(function getB(){
                return _.b;
              });
            });

            // .. as well as its class instances
            var a1 = $.new(ClassA, 10);

            var a2 = $.new(ClassA, 20);

            // ClassB is local to the current scope ...
            var ClassB = $.class(function($, µ, _){

              $.public('a', 10);

              $.public(function getA(){
                return this.a;
              });
            });

            // .. as well as its class instances
            var b = $.new(ClassB);

            // we implement the ProxyClass to render accessible from the outer world
            // some members of instance a1, a2 and b2
            // and implements as well as local member broker
            $.public().class(function ProxyClass($, µ, _){

              // method factoryClassA is a proxy for $.new(ClassA)
              $.proxy().public('factoryClassA', ClassA);

              // property a1 is a proxy of property a1.b
              $.proxy().public('a1', [a1, 'a']);

              // property b is a proxy of property b.a
              $.proxy().public('b', [b, 'a']);

              // method getB1 is a proxy of method a1.getB
              // getB1 is declared as protected even if the target method a1.getB is public
              $.proxy().protected('getB1', [a1, 'getB']);

              // method getB2 is a proxy of property a2.getB
              // getB2 is declared as protected even if the target method a2.getB is public
              $.proxy().protected('getB2', [a2, 'getB']);

              // select the proxy member depending on the given argument
              $.public(function broker(w){

                if(w&lt;10){
                  return µ.getB1();
                }else{
                  return µ.getB2();
                }
              });
              
            });

            var p = $.new(this.ProxyClass);

            p.a1 = 10;

            $.log((a1.a == p.a1)); // outputs: true, property p.a1 is a proxy of property a1.a, all changes made on p.a1 is automatically reflected to a.a1 and inverse is also true

            b.a = 100;

            $.log((b.a == p.b)); // outputs: true, all changed made on b.a is automatically reflected to p.b 

            $.log(p.broker(5)); // outputs: 10, as 5 is &lt; 10 borker call the a1.getB() method which return a1.b property

            $.log(p.broker(10)); // outputs: 10, as 10 is &gt;= 10 borker call the a2.getB() method which return a2.b property

            var c = p.factoryClassA(50);

            $.dump(c); // outputs: Object {__type: "anonymous", __resource: 44, a: 1, b: 50}
          </pre>

          <a name="doc-keyword-public"></a>
          <h4 class="sub-header">public <i class="font-small">(&nbsp;<font class="oodk-type">Function&nbsp;|&nbsp;String</font>&nbsp;<b>name</b>,&nbsp;[&nbsp;<font class="oodk-type">Object | Primitives</font>&nbsp;<b>def</b>&nbsp;]&nbsp;)</i></h4>

          <p><b>scope(s)</b>: <i>namespace</i>, <i>use</i>, <i>instance</i>, <i>static</i></p>

          <p>Declare an access level to a class, a class member, or an interface as public.</p>

          <p>The public access level means the related declaration is accessible from the whole world without restriction.</p>

          <pre>
          OODK('myProject', function(){

            // Itf1 is public and accessible through this.Itf1, OODK.myProject.Itf1
            $.public().function(function Itf1($){});
            

            // ClassA is public and accessible through this.ClassA, OODK.myProject.ClassA
            // this refer to the public context of the related 'myProject' namespace and therefore Itf1 declared as public, can be accessed through it.
            $.public().implements(this.Itf1).class(function ClassA($, µ, _){

              // declare a property as public
              $.public('a');

              // declare a method as public
              $.public(function instantiateClassB(){
                return $.new($.ns.ClassB, this.a); // within the instance scope, $.ns allows to access public declaration of the contextual namespace
              });

              $.static(function($, µ, _){
                
                // declare a static property as public
                $.public('staticA');

                // declare a static method as public
                $.public(function getStaticA(){
                  return this.staticA; // this refer here to the static public context of the instance
                });

              });
            }); 

            $.public().class(function ClassB($, µ, _){});
          });
          </pre>

          <a name="doc-keyword-serialize"></a>
          <h4 class="sub-header">serialize <i class="font-small">(&nbsp;<font class="oodk-type">Object</font>&nbsp;<b>obj</b>&nbsp;)</i></h4>

          <p><b>scope(s)</b> <a href="#doc-scope-use">use</a>,  <a href="#doc-scope-namespace">namespace</a>,  <a href="#doc-scope-instance">instance</a>,  <a href="#doc-scope-static">static</a>&nbsp;&nbsp;&nbsp;<b>API</b> <a href="#api-serialization">Serialization</a></p>

          <p>Serialize an object by producing a JSON string representation of its states.</p>

          <p>Works recursively on the full object graph and implements a cycling detection algorithm to avoid circular reference issues.</p>

          <p>On OODK instances, class must implement the <a href="#foundation-interface-Serializable">Serializable</a> interface else OODK will raise an <a href="#foundation-exception-SerializeNotSupportedException">SerializeNotSupportedException</a></p>

          <p>Are serialized all non-static and non-transient members. In case of a inherited class, private members of the parent class(es) are not serialized by default.</p>

          <p>This behavior can be customized using the behavior method <a href="#behavior-method-__serialize">__serialize</a>.</p>
          
          <pre>
          //serialize a native array
          var a = [1,2,3];

          $.log($.serialize(a));
          // output
          // '{"0":1,"1":2,"2":3,"__ref__":"/@0/","__type__":"Array"}'
          </pre>

          <pre>
          // use the __serialize behavior method to treat static parent privates properties
          $.import("{oodk}/api/Serialization");

          $.implements(OODK.foundation.Serializable).class(function ClassB($, µ, _){

            $.private("privateA", 100);

            // by default, private members of the parent class(es) are not serialized
            // we have to implement the behavior method __serialize to serialize "privateA"
            $.protected(function __serialize(serializer){

              // always passed a ssecond argument the syntaxer
              // it allows to identify "privateA" as member of ClassB
              serializer.serialize('privateA', $);
            });
          });

          $.extends(_.ClassB).class(function ClassA($, µ, _){

            $.private('x');

            // transient properties are not serialized
            $.transient().protected('y');

            $.public('z');

            $.public(function __initialize(){
              _.x = 10;
              µ.y = 20;
              this.z = [1,2,3];
            });

            // by default, static members are not serialized
            // we have to implement the behavior method __serialize to serialize "staticA"
            $.protected(function __serialize(serializer){

              serializer.serialize('staticA', $);

              // call the ClassB::__serialize method to serialize the private property "privateA" of ClassB
              $.super.__serialize(serializer);
            });

            $.static(function($, µ, _){

              $.private('staticA', 10);
            });
          });

          var a = $.new(_.ClassA);

          $.log($.serialize(a)); 
          // outputs:
          // '{"__ref__":"/@0/","__type__":"OODK.default.ClassA","x":10,"z":{"0":1,"1":2,"2":3,"__ref__":"/@1/","__type__":"Array"},"staticA":10,"privateA:OODK.default.ClassB":100}'
          // the static property staticA and the private ClassB::privateA are now serialized
          </pre>

          <a name="doc-keyword-static"></a>
          <h4 class="sub-header">static <i class="font-small">(&nbsp;)</i></h4>

          <p><b>scope(s)</b>: <a href="#doc-scope-class">class</a></p>

          <p>Declare a static scope in a class declaration.</p>

          <p>Static members can be accessed within an instance scope or a class scope through the self context from the class or within the instance.</p>

          <pre>
          $.public().class(function ClassA($, µ, _){

            $.private('a', 5);

            $.public(function getStaticA(){
                
              return _.self.staticA; // as "staticA" is declared private, it is accssible through the private.self context 
            });

            // within the ClassA scope declare a static scope
            $.static(function($, µ, _){
              
              $.private('staticA', 10);

              $.public(function getA(){
                
                // _ refer to the private static context, staticA return 10
                var str = _.staticA;

                // instance property "a" is not accessible and return undefined
                str += " " + _.a;

                return str;
              });
            });
          });

          var a = $.new(this.ClassA);

          $.log(a.getStaticA()); // outputs: 10

          $.log(this.ClassA.self.getA()); // outputs: 10 undefined
          </pre>

          <a name="doc-keyword-string"></a>
          <h4 class="sub-header">string <i class="font-small">(&nbsp;)</i></h4>

          <p><b>scope(s)</b>: <a href="#doc-scope-class">class</a></p>

          <p>Declare a class member of type string.</p>

          <pre>
          var ClassA = $.class(function($, µ,_){
            
            $.string().public('a', "test");

            $.string().public(function getA(){
              return 10;
            });
          });

          var a = $.new(_.ClassA);

          a.a = 10; // raise a OODK.foundation.TypeError as property "a" is of type string

          $.log(a.getA()); // raise a OODK.foundation.TypeError as method getA is of type string and return 10
          </pre>

          <a name="doc-keyword-throw"></a>
          <h4 class="sub-header">throw <i class="font-small">(&nbsp;&nbsp;<font class="oodk-type">String | &lt;OODK.foundation.Throwable&gt;</font> <b>err</b> )</i></h4>

          <p><b>scope(s)</b>: <a href="#doc-scope-use">use</a>, <a href="#doc-scope-namespace">namespace</a>, <a href="#doc-scope-class">instance</a>, <a href="#doc-scope-static">static</a></p>

          <p>Throw an exception.</p>

          <p>Exception can be an instance of the <a  href="#foundation-exception-Throwable">Throwable</a> class or a string (in this case throw an OODK.foundation.Exception passing the string as argument)</p>

          <p>Specific exceptions can be passed as first argument of the keyword allowing to customize the error handling.</p>

          <p>See chapter <a href="#foundation">Foundation</a> for a complete list of Exceptions and Errors.</p>

          <p>It is also possible to define a global error handler for all thrown exception using the config function <a href="#getting-start-config-errorHandler">OODK.errorHandler</a>.</p>

          <pre>
          $.throw("invalid argument passed: n is not a number"); // throw a generic OODK.foundation.Exception

          // outputs:
          // Uncaught OODK.foundation.TypeError
          //
          // µ.getAmount is not a function
          //
          // at OODK.default.ClassA.division ([current]:40)
          // at namespace ([current]:19)
          </pre>

          <pre>
          $.class(function ClassA($, µ, _){

            $.private('amount', 5);
            
            $.public(function division(n){

              if(typeof n !== 'number'){
                $.throw(OODK.foundation.IllegalArgumentException, ["invalid argument passed: n is not a number"]); // throw the specific OODK.foundation.IllegalArgumentException
              }

              return (n / µ.getAmount());
            });
          });

          try{
            var input = 10;

            var a = $.new(_.ClassA);

            $.log(a.division(input));

          }catch(e){

            if($.is(e, OODK.foundation.IllegalArgumentException)){

              // input is not a  number ask the user to retype a value
              document.write(input + ' is not a number please type a new value');
            }else{

              // getAmount is not implemented, OODK raise a foundation.TypeError
              // in this case send a ticket to the support
              var xhr = new XMLHttpRequest();
              xhr.open('POST', 'http://mycompany.com/support/ticketing', true);
              xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
              xhr.send('error=' + e.toString());

              document.write('500 Error - internal project error');
            }
          }
          </pre>

          <a name="doc-keyword-to"></a>
          <h4 class="sub-header">to <i class="font-small">( <font class="oodk-type">Object | Primitive</font> <b>val</b>, <font class="oodk-type">Constructor | Class</font> <b>type</b> )</i></h4>

          <p><b>scope(s)</b>: <a href="#doc-scope-use">use</a>, <a href="#doc-scope-namespace">namespace</a>, <a href="#doc-scope-class">instance</a>, <a href="#doc-scope-static">static</a></p>

          <p>Convert a value to the specified type passed as argument.</p>

          <p><b>type</b> argument can be a native constructor or an OODK class.</p>

          <p>Two behavior methods can be implemented to customize the conversion: <a href="#behavior-method-__to">__to</a> and <a href="#behavior-method-__from">__from</a>.</p>

          <p>If <b>val</b> argument implements a method __to this one is called first.</p>

          <p>Then if <b>type</b> argument implements a static method or a prototype (in case of native type) method __from, this one is called in second order.</p>

          <p>Finally if no behavior methods are implemented or they does not support this type of conversion, the native methods are called to convert the value.</p>

          <p>Specific keywords can be used instead to convert values: <a href="#doc-keyword-toBool">toBool</a>, <a href="#doc-keyword-toTure">toTrue</a>, <a href="#doc-keyword-toFalse">toFalse</a>, <a href="#doc-keyword-toString">toString</a>, <a href="#doc-keyword-toDate">toDate</a>, <a href="#doc-keyword-toNumber">toNumber</a>, <a href="#doc-keyword-toInt">toInt</a>, <a href="#doc-keyword-toFloat">toFloat</a>, <a href="#doc-keyword-toArray">toArray</a>, <a href="#doc-keyword-toLiteral">toLiteral</a></p>

          <p>If result of the conversion leads to return undefined, a <a href="#foundation-exception-ClassCastException">ClassCastException</a> is raised.</p>

          <pre>
          $.to(0, Boolean); // outputs: false
          $.to('false', Boolean); // outputs: true ( use the toFalse keyword to convert 'false' to false)

          Array.prototype.__from = function(val){
            
            if(typeof val === 'string'){
              return val.split(' ');
            }
          }
          $.to('Hello world', Array); // outputs: ['Hello', 'world']

          var Castable = $.class(function($, µ, _){

            $.public('a');

            $.public('b');

            $.public(function __initialize(a, b){
              
              this.a = a;
              this.b = b;
            });
            
            $.private(function __to(type){
              
              if(type === String){
                return this.a + " " + this.b;
              }
            });

            $.public(function toString(){    
              return _.__to(String);
            });

            $.public(function toBoolean(){    
              return true;
            });

            $.static(function($, µ, _){

              // __from behavior method have to declared as static to perform the conversion
              $.private(function __from(value){

                if(typeof value == 'string'){
                  // convert from a string

                  var tmp = value.split(" ");
                  return $.new(Castable, tmp[0], tmp[1]);
                }
              });
            });
          });

          var a = $.new(Castable, 'Hello', 'world');

          $.log($.to(a, String)); // outputs: "Hello world", call the __to method
          $.log(""+a); // outputs: "Hello world", call the toString method
          $.log($.to(a, Boolean)); // outputs: true, call the toBoolean method
          $.log($.to(a, Array)); // raise a OODK.foundation.ClassCastException
          
          var cast = $.to("Hello world", Castable); // call the __from static method

          $.log(cast.a); // outputs: 'Hello'
          $.log(cast.b); // outputs: 'world' 
          </pre>

          <a name="doc-keyword-toArray"></a>
          <h4 class="sub-header">toArray <i class="font-small">( <font class="oodk-type">Object | Primitive</font> <b>val</b> )</i></h4>

          <p><b>scope(s)</b>: <a href="#doc-scope-use">use</a>, <a href="#doc-scope-namespace">namespace</a>, <a href="#doc-scope-class">instance</a>, <a href="#doc-scope-static">static</a></p>

          <p>Convert a value to an array.</p>

          <p>If <b>val</b> argument is an iterable object (see <a href="#doc-keyword-isIterable">isIterable</a> keyword), iterates over properties's value to produce an array.</p>

          <p>See the <a href="#doc-keyword-to">to</a> keyword how conversion can be customized.</p>

          <pre>
          $.log($.toArray("test")); // outputs: ['t', 'e', 's', 't']
          $.log($.toArray({'a': 1, 'b': 2})); // outputs: [1, 2]
          $.log($.toArray(null)); // raise a OODK.foundation.ClassCastException

          Array.prototype.__from = function(val){
            
            if(typeof val === 'string'){
              return val.split(' ');
            }
          }
          $.log($.toArray('Hello world')); // outputs: ['Hello', 'world']
          </pre>

          <a name="doc-keyword-toBool"></a>
          <h4 class="sub-header">toBool <i class="font-small">( <font class="oodk-type">Object | Primitive</font> <b>val</b> )</i></h4>

          <p><b>scope(s)</b>: <a href="#doc-scope-use">use</a>, <a href="#doc-scope-namespace">namespace</a>, <a href="#doc-scope-class">instance</a>, <a href="#doc-scope-static">static</a></p>

          <p>Convert a value to a boolean.</p>

          <p>Use as generic behavior the native Boolean() function or if val argument is a string try to parse it.</p>

          <p>See the <a href="#doc-keyword-to">to</a> keyword how conversion can be customized.</p>

          <pre>
          $.log($.toBool(0)); // outputs: false
          $.log($.toBool('test')); // outputs: true
          $.log($.toBool(' FALSE  ')); // outputs: false
          $.log($.toBool('true')); // outputs: true
          
          Boolean.prototype.__from = function(val){
            
            if(typeof val === 'string'){
              
              val = val.toLowerCase().trim();

              val = val.replace(new RegExp('false', 'g'), '');

              return (val === "")? false: undefined;
            }
          }
          $.log($.toBool('FALSEFALSEFALSE')); // outputs: false
          </pre>

          <a name="doc-keyword-toDate"></a>
          <h4 class="sub-header">toDate <i class="font-small">( <font class="oodk-type">Object | Primitive</font> <b>val</b> )</i></h4>

          <p><b>scope(s)</b>: <a href="#doc-scope-use">use</a>, <a href="#doc-scope-namespace">namespace</a>, <a href="#doc-scope-class">instance</a>, <a href="#doc-scope-static">static</a></p>

          <p>Convert a value to a date.</p>

          <p>Use as generic behavior the native Date.parse() function.</p>

          <p>See the <a href="#doc-keyword-to">to</a> keyword how conversion can be customized.</p>

          <pre>
          $.log($.toDate('2010-10-10')); // outputs: new Date('2010-10-10')
          $.log($.toDate('test')); // raise a ClassCastException
          
          // implementation of a french date/time string conversion
          Date.prototype.__from = function(val){
            
            if(typeof val === 'string'){
              val = val.split('/');

              return new Date(val[2] + '-' + val[1] + '-' + val[0]);
            }
          }
          $.log($.toDate('10/10/2010')); // outputs: new Date('2010-10-10')
          </pre>

          <a name="doc-keyword-toFloat"></a>
          <h4 class="sub-header">toFloat <i class="font-small">( <font class="oodk-type">Object | Primitive</font> <b>val</b> )</i></h4>

          <p><b>scope(s)</b>: <a href="#doc-scope-use">use</a>, <a href="#doc-scope-namespace">namespace</a>, <a href="#doc-scope-class">instance</a>, <a href="#doc-scope-static">static</a></p>

          <p>Convert a value to a float.</p>

          <p>Use as generic behavior the native parseFloat() function.</p>

          <p>See the <a href="#doc-keyword-to">to</a> keyword how conversion can be customized.</p>

          <pre>
          $.log($.toFloat(10)); // outputs: 10.0
          $.log($.toFloat('-10.5')); // outputs: 10.5
          $.log($.toFloat(null)); // raise a ClassCastException

          Number.prototype.__from = function(val){
            
            if(val === null){
              return 0.5;
            }
          }
          $.log($.toFloat(null)); // outputs: 0.5
          </pre>

          <a name="doc-keyword-toInt"></a>
          <h4 class="sub-header">toInt <i class="font-small">( <font class="oodk-type">Object | Primitive</font> <b>val</b> )</i></h4>

          <p><b>scope(s)</b>: <a href="#doc-scope-use">use</a>, <a href="#doc-scope-namespace">namespace</a>, <a href="#doc-scope-class">instance</a>, <a href="#doc-scope-static">static</a></p>

          <p>Convert a value to an integer.</p>

          <p>Use as generic behavior the native parseInt() function.</p>

          <p>See the <a href="#doc-keyword-to">to</a> keyword how conversion can be customized.</p>

          <pre>
          $.log($.toInt(10.5)); // outputs: 10
          $.log($.toInt('-10.5')); // outputs: -10
          $.log($.toInt(null)); // raise a ClassCastException

          Number.prototype.__from = function(val){
            
            if(val === null){
              return 0;
            }
          }
          $.log($.toInt(null)); // outputs: 0
          </pre>

          <a name="doc-keyword-toNumber"></a>
          <h4 class="sub-header">toNumber <i class="font-small">( <font class="oodk-type">Object | Primitive</font> <b>val</b> )</i></h4>

          <p><b>scope(s)</b>: <a href="#doc-scope-use">use</a>, <a href="#doc-scope-namespace">namespace</a>, <a href="#doc-scope-class">instance</a>, <a href="#doc-scope-static">static</a></p>

          <p>Convert a value to a number.</p>

          <p>Use as generic behavior the native Number() function.</p>

          <p>See the <a href="#doc-keyword-to">to</a> keyword how conversion can be customized.</p>

          <pre>
          $.log($.toNumber('10.5')); // outputs: 10.5
          $.log($.toNumber('-10')); // outputs: -10
          $.log($.toNumber(null)); // outputs: 0
          $.log($.toNumber('test')); // raise a ClassCastException

          // convert a string based on the unicode of characters
          Number.prototype.__from = function(val){
            
            if(typeof val === 'string'){

              var sum = 0;
              
              for(var i=0; i&lt;val.length; i++){
                sum += val.charCodeAt(i);
              }

              return sum;
            }
          }
          $.log($.toNumber('test')); // outputs: 448
          </pre>

          <a name="doc-keyword-toLiteral"></a>
          <h4 class="sub-header">toLiteral <i class="font-small">( <font class="oodk-type">Object | Primitive</font> <b>val</b> )</i></h4>

          <p><b>scope(s)</b>: <a href="#doc-scope-use">use</a>, <a href="#doc-scope-namespace">namespace</a>, <a href="#doc-scope-class">instance</a>, <a href="#doc-scope-static">static</a></p>

          <p>Convert a value to a literal object.</p>

          <p>If <b>val</b> argument is an iterable object (see <a href="#doc-keyword-isIterable">isIterable</a> keyword), iterates over properties to produce a literal object.</p>

          <p>See the <a href="#doc-keyword-to">to</a> keyword how conversion can be customized.</p>

          <pre>
          $.log($.toLiteral('test')); // outputs: {'0': 't', '1': 'e', '2': 's', '3': 't'}
          $.log($.toLiteral([1,2,3])); // outputs: {'0': 1, '1': 2, '2': 3}
          $.log($.toLiteral(null)); // raise a ClassCastException

          // convert a string based on the unicode of characters
          Object.prototype.__from = function(val){
            
            return {
              '__type': val.constructor.name,
              'value': val
            }
          }
          $.log($.toLiteral(false)); // outputs: {'__type': 'Boolean', 'value': false}
          </pre>

          <a name="doc-keyword-toString"></a>
          <h4 class="sub-header">toString <i class="font-small">( <font class="oodk-type">Object | Primitive</font> <b>val</b> )</i></h4>

          <p><b>scope(s)</b>: <a href="#doc-scope-use">use</a>, <a href="#doc-scope-namespace">namespace</a>, <a href="#doc-scope-class">instance</a>, <a href="#doc-scope-static">static</a></p>

          <p>Convert a value to a string.</p>

          <p>Use as generic behavior the native String() function.</p>

          <p>See the <a href="#doc-keyword-to">to</a> keyword how conversion can be customized.</p>

          <p>Note: toString does not raise any exception as all js values are convertible to string.</p>

          <p>To ensure the compatibility with the native string conversion, toString should be implemented as well in adition to __to method.</p>

          <pre>
          $.log($.toString({})); // outputs: [object Object]
          $.log($.toString([1,2,3])); // outputs: '1,2,3'
          $.log($.toString(null)); // outputs: 'null'

          // convert to a falsy value
          String.prototype.__from = function(val){
            
            if(val === "" || isNaN(val) || typeof val === 'undefined' || val === 0 || val === false){
              return 'a falsy value';
            }
          }
          $.log($.toString(false)); // outputs: 'a falsy value'

          $.public().class(function ClassSum($, µ, _){

            $.private('a');

            $.private('b');

            $.public(function __initialize(a, b){
              _.a = a;
              _.b = b;
            });
            
            $.private(function __to(type){
              
              if(type === String){
                return _.a + ' + ' + _.b + ' = ' + (_.a+_.b);
              }
            });

            $.public(function toString(){
              return _.__to(String);
            });
          });

          var a = $.new(this.ClassSum, 3, 4);

          $.log(""+a); // outputs: '3 + 4 = 7', call toString first as auto-converted by the interpreter
          $.log($.toString(a)); // outputs: '3 + 4 = 7', call __to first 
          </pre>

          <a name="doc-keyword-unobserve"></a>
          <h4 class="sub-header">unobserve <i class="font-small">(&nbsp;&nbsp;<font class="oodk-type">Object</font>&nbsp;<b>observer</b>,&nbsp;&nbsp;<font class="oodk-type">Object</font>&nbsp;<b>observable</b>&nbsp;)</i></h4>

          <p><b>scope(s)</b>: <i>namespace</i>, <i>use</i>, <i>instance</i>, <i>static</i></p>

          <p>Remove an observer for the specified observable object.</p>

          <p>Works only on OODK instances.</p>

          <p>The observer object must implements the <a href="#foundation-interface-Observer">Observer</a> interface and observable object the <a href="#foundation-interface-Observer">Observable</a> interface</p>

          <p>See the section <a href="#design-pattern-observer">design pattern - Observer</a> for a complete example .</p>

          <a name="doc-keyword-unserialize"></a>
          <h4 class="sub-header">unserialize <i class="font-small">(&nbsp;<font class="oodk-type">String</font>&nbsp;<b>serial</b>&nbsp;)</i></h4>

          <p><b>scope(s)</b>: <a href="#doc-scope-use">use</a>, <a href="#doc-scope-namespace">namespace</a>, <a href="#doc-scope-class">instance</a>, <a href="#doc-scope-static">static</a></p>

          <p><b>API</b>: <a href="#api-serialization">Serialization</a></p>

          <p>Unserialize a string produce by the <a href="#doc-keyword-serialize">serialize</a> keyword.</p>

          <p>As serialize does, unserialize treats by default all non-static and non-transient properties.</p>

          <p>This behavior can be customized using the <a href="#behavior-method-__unserialize">__unserialize</a> behavior method.</p>
          
          <p>If the class specified in the serial does not exists, OODK deserialize the string into a native literal object.</p>

          <pre>
          $.import("{oodk}/api/Serialization");

          $.class.implements(OODK.foundation.Serializable).(function ClassB($, µ, _){

            $.private("privateA");

            $.public(function __initialize(a){
              _.privateA = a;
            });

            $.protected(function __serialize(serializer){

              // always pass the syntaxer as second parameter
              // it allows to identify "privateA" property as member of ClassB and not member of ClassA
              serializer.serialize('privateA', $);
            });

            $.protected(function __unserialize(deserializer){

              // always pass the syntaxer as second parameter
              // in this case inject 'privateA' in the ClassB private context and not in the one of ClassA
              deserializer.unserialize('privateA', $);
            });

            $.public(function getPrivateA(){
              return _.privateA;
            });
          });

          $.extends(_.ClassB).class(function ClassA($, µ, _){

            $.private('x');

            $.public(function __initialize(aa){
              _.x = 10;

              $.super.__initialize(aa);
            });

            $.protected(function __serialize(serializer){

              serializer.serialize('staticA', $);

              $.super.__serialize(serializer);
            });

            $.protected(function __unserialize(deserializer){

              // unserialize staticA, not treated during the generic process
              deserializer.unserialize('staticA', $);

              // call ClassB::__unserialize to deserialize property "privateA"
              $.super.__unserialize(deserializer);
            });

            $.static(function($, µ, _){
              
              $.public('staticA', 50);
            });
          });

          var a = $.new(_.ClassA, 100);

          var serial = $.serialize(a);

          // we update staticA to 20
          _.ClassA.self.staticA = 20;

          var a2 = $.unserialize(serial);

          $.dump(a2);
           
          // outputs: 
          // Object {__type: "OODK.default.ClassA", __resource: 41, x: 10, privateA (OODK.default.ClassB): 100, staticA: 50}
          // value of staticA is 50 , staticA has been well deserialized
          // ClassB::privateA is also well treated correctly
          </pre>

          <pre>
          var serial = {"__ref__":"/@0/","__type__":"OODK.jasmine.UnknownClass","x":10,"privateA:OODK.default.ClassB":100};

          $.dump($.unserialize(serial));
          // outputs: 
          // Object {x: 10, privateA:OODK.default.ClassB: 100}
          </pre>

          <pre>
          // on dynamic or mutable class, as properties are not declared, the unserializing have to be handled manually 
          $.dynamic().implements(OODK.foundation.Serializable).class(function Collection($, µ, _){
            
            $.public(function set(name, value){
                _[name] = value;
            });

            $.private(function __unserialize(deserializer){

                // use the convenient unserializeOwnProperties which unserialize only properties of the local class
                // and passed prorperty'name /value in a callback method
                deserializer.unserializeOwnProperties($, function(value, name){
                    _[name] = value;
                });
            })
          });

          var myCollection = $.new(_.Collection);

          myCollection.set('a', 10);
          myCollection.set('b', 100);
          myCollection.set('c', 1000);

          var anotherCollection = $.unserialize($.serialize(myCollection));

          $.dump(anotherCollection); // outputs: Object {__type: "OODK.default.Collection", __resource: 46, a: 10, b: 100, c: 1000}
          </pre>

          <a name="doc-keyword-type"></a>
          <h4 class="sub-header">type <i class="font-small">( <font class="oodk-type">Constructor | PseudoType</font> <b>type</b> )</i></h4>

          <p><b>scope(s)</b>: <a href="#doc-scope-class">class</a></p>

          <p>Type a class member with the sepcified type passed as argument.</p>

          <pre>
          var ClassB = $.class(function($, µ, _){});

          var ClassA = $.class(function($, µ, _){
            
            $.type(Number).public('a', 10);

            $.type().public(function getA(){
              return 10;
            });

            $.type(ClassB).public(function getB(){
              return $.new(ClassB);
            });
          });

          var a = $.new(ClassA);

          a.a = 10; // raise a OODK.foundation.TypeError as property "a" is of type array

          $.log(a.getA()); // raise a OODK.foundation.TypeError as property "a" is of type boolean and return 10
          </pre>

          <a name="doc-keyword-void"></a>
          <h4 class="sub-header">void <i class="font-small">(&nbsp;)</i></h4>

          <p><b>scope(s)</b>: <a href="#doc-scope-class">class</a></p>

          <p>Declare a class member of type void (returning nothing, i.e undefined).</p>

          <pre>
          var ClassA = $.class(function($, µ,_){
            
            $.void().public(function getA(){
              return 10;
            });
          });

          var a = $.new(_.ClassA);

          $.log(a.getA()); // raise a OODK.foundation.TypeError as method getA is of type void and return 10
          </pre>

          <a name="api"></a>
          <h1 class="page-header">APIs</h1>

          <a name="api-cloning"></a>
          <h4 class="page-header">Cloning</h4>

          <div class="paragraph">
          
          <p>The Cloning API provides tools to clone any type of object(native and OODK instance).</p>

          <p><b>Keyword(s)</b>: <a href="doc-keyword-clone">clone</a></p>

          <p><b>Behavior method(s)</b>: <a href="#behavior-method-__clone">__clone</a></p>

          <p><b>Foundation</b></p>

          <ul>
            <li>interface <a href="#foundation-interface-Cloneable">Cloneable</a></li>
            <li>class <a href="#foundation-util-Cloner">Cloner</a></li>
            <li>class <a href="#foundation-exception-CloneNotSupportedException">CloneNotSupportedException</a></li>
          <ul>

          </div>

          <a name="api-debugger"></a>
          <h4 class="page-header">Debugger</h4>

          <div class="paragraph">
          
          <p>The Debugger API provides tools to debug code and display the stack in a convenient and easy-readable way.</p>

          <p>It supports native and OODK objects.</p>

          <p><b>Keyword(s)</b>: <a href="#doc-keyword-dump">dump</a>, <a href="#doc-keyword-trace">trace</a>, <a href="#doc-keyword-snooze">snooze</a>, <a href="#doc-keyword-watch">watch</a></p>

          <p><b>Behavior method(s)</b>: <a href="behvior-method-__dump">__dump</a></p>

          <p><b>Foundation</b></p>

          <ul>
            <li>class <a href="#foundation-util-Dumper">Dumper</a></li>
          <ul>

          </div>

          <a name="api-iteration"></a>
          <h4 class="page-header">Iteration</h4>

          <div class="paragraph">
          
          <p>The iteration API provide tools to iterate over any type of enumerable objects (native and OODK insances).</p>

          <p>Enumerable objects are: Array, Literal object, String and OODK instances.</p>

          <p><b>Keyword(s)</b>: <a href="doc-keyword-forEach">forEach</a></p>

          <p><b>Behavior method(s)</b>: <a href="#behavior-method-__clone">__iterator</a></p>

          <p><b>Foundation</b></p>

          <ul>
            <li>interface <a href="#foundation-interface-Iterable">Iterable</a></li>
            <li>interface <a href="#foundation-interface-Iterator">Iterator</a></li>
            <li>class <a href="#foundation-util-Iterator">Iterator</a></li>
            <li>class <a href="#foundation-exception-IterateNotSupportedException">IterateNotSupportedException</a></li>
            <li>class <a href="#foundation-exception-NoSuchElementException">NoSuchElementException</a></li>
          <ul>

          </div>

          <a name="api-observer"></a>
          <h4 class="page-header">Observer</h4>

          <div class="paragraph">
          
          <p>The observer API provides tools to implements the design pattern Observer.</p>

          <p><b>Keyword(s)</b>: <a href="doc-keyword-observe">observe</a>, <a href="doc-keyword-unobserve">unobserve</a>, <a href="doc-keyword-notify">notify</a></p>

          <p><b>Behavior method(s)</b>: <a href="#behavior-method-__notify">__notify</a></p>

          <p><b>Foundation</b></p>

          <ul>
            <li>interface <a href="#foundation-interface-Observer">Observer</a></li>
            <li>interface <a href="#foundation-interface-Observable">Observable</a></li>
          <ul>

          </div>

          <a name="api-serialization"></a>
          <h4 class="page-header">Serialization</h4>

          <div class="paragraph">
          
          <p>The Serialization API provides tools to serialize any type of objects (native and OODK insances).</p>
          
          <p>Serialized objects takes the form of a JSON stringand allows to define a persistence strategy or inter-application communication.</p>

          <p><b>Keyword(s)</b>: <a href="#doc-keyword-serialize">serialize</a>, <a href="#doc-keyword-unserialize">unserialize</a></p>

          <p><b>Behavior method(s)</b>: <a href="#behavior-method-__serialize">__serialize</a>, <a href="#behavior-method-__unserialize">__unserialize</a></p>

          <p><b>Foundation</b></p>

          <ul>
            <li>interface <a href="#foundation-interface-Serializable">Serializable</a></li>
            <li>class <a href="#foundation-util-Serializer">Serializer</a></li>
            <li>class <a href="#foundation-util-Deserializer">Deserializer</a></li>
            <li>class <a href="#foundation-exception-SerializeNotSupportedException">SerializeNotSupportedException</a></li>
          <ul>

          </div>

          <a name="api-typing"></a>
          <h4 class="page-header">Typing</h4>

          <div class="paragraph">
          
          <p>The Typing API provides usefull tools to type class members.</p>
          
          <p><b>Keyword(s)</b>: <a href="#doc-keyword-args">args</a>, <a href="#doc-keyword-array">array</a>, <a href="#doc-keyword-bool">bool</a>, <a href="#doc-keyword-float">float</a>, <a href="#doc-keyword-int">int</a>, <a href="#doc-keyword-literal">literal</a>, <a href="#doc-keyword-string">string</a>, <a href="#doc-keyword-type">type</a>, <a href="#doc-keyword-void">void</a></p>

          </div>

          <a name="api-reflection"></a>
          <h4 class="page-header">Reflection</h4>

          <div class="paragraph">
          
          <p>The Reflection API provides tools to get information of the internal structure of an <a href="#concept-resource">OODK resource</a>: instance, class, interface or namespace.</p>

          <p><b>Keyword(s)</b>: <a href="#doc-keyword-inspect">inspect</a></p>

          </div>

          <a name="api-conversion"></a>
          <h4 class="page-header">Conversion</h4>

          <div class="paragraph">
          
          <p>The Conversion API provides tools to convert any type of objects or primitive values to or from a different type (native and OODK instances).</p>

          <p><b>Keyword(s)</b>: <a href="#doc-keyword-to">to</a>, <a href="#doc-keyword-toBool">toBool</a>, <a href="#doc-keyword-toTure">toTrue</a>, <a href="#doc-keyword-toFalse">toFalse</a>, <a href="#doc-keyword-toString">toString</a>, <a href="#doc-keyword-toDate">toDate</a>, <a href="#doc-keyword-toNumber">toNumber</a>, <a href="#doc-keyword-toInt">toInt</a>, <a href="#doc-keyword-toFloat">toFloat</a>, <a href="#doc-keyword-toArray">toArray</a>, <a href="#doc-keyword-toLiteral">toLiteral</a></p>

          <p><b>Behavior method(s)</b>: <a href="#behavior-method-__to">__to</a> and <a href="#behavior-method-__from">__from</a></p>

          <ul>
            <li>class <a href="#foundation-exception-ClassCastException">ClassCastException</a></li>
          <ul>

          </div>

          <a name="api-comparison"></a>
          <h4 class="page-header">Comparison</h4>

          <div class="paragraph">
          
          <p>The Comparion API provides tools to compare two values (objects or primitives).</p>

          <p><b>Keyword(s)</b>: <a href="#doc-keyword-compare">compare</a></p>

          <p><b>Behavior method(s)</b>: <a href="#behavior-method-__compareTo">__compareTo</a> and <a href="#behavior-method-__compare">__compare</a></p>

          <p><b>Foundation</b></p>

          <ul>
            <li>interface <a href="#foundation-interface-Comparable">Comparable</a></li>
            <li>interface <a href="#foundation-interface-Comparator">Comparator</a></li>
          <ul>

          </div>

          <a name="api-sort"></a>
          <h4 class="page-header">Sort</h4>

          <div class="paragraph">
          
          <p>The Sort API provides tools to sort an iterable object.</p>

          <p><b>Keyword(s)</b>: <a href="#doc-keyword-sort">sort</a></p>

          <p><b>Behavior method(s)</b>: <a href="#behavior-method-__sort">__sort</a></p>

          <p><b>Foundation</b></p>

          <ul>
            <li>interface <a href="#foundation-interface-Sortable">Sortable</a></li>
            <li>interface <a href="#foundation-interface-Sorter">Sorter</a></li>
            <li>class <a href="#foundation-util-Sorter">Sorter</a></li>
            <li>class <a href="#foundation-exception-SortNotSupportedException">SortNotSupportedException</a></li>
          <ul>

          </div>

          <a name="api-typing"></a>
          <h4 class="page-header">Typing</h4>

          <div class="paragraph">
          
          <p>The Typing API provides tools to type properties and methods of classes.</p>

          <p><b>Keyword(s)</b>: <a href="#doc-keyword-string">string</a>, <a href="#doc-keyword-int">int</a>, <a href="#doc-keyword-return">return</a>, <a href="#doc-keyword-bool">bool</a>, <a href="#doc-keyword-float">float</a>, <a href="#doc-keyword-number">number</a>, <a href="#doc-keyword-array">array</a>, <a href="#doc-keyword-literal">literal</a>, <a href="#doc-keyword-args">args</a></p>


          </div>

          <a name="behavior-method"></a>
          <h1 class="page-header">Behavior methods</h1>

          <a name="behavior-method-__to"></a>
          <h4 class="page-header"><font class="font-small">method</font> __to <i class="font-small">(&lt;Object&gt; constructor)</i></h4>

          <div class="paragraph">
          
          <p><b>API</b> <a href="#api-debugger">Conversion</a></p>

          <p>Behavior method called when the conversion <a href="#doc-keyword-to">to</a> keyword try to convert an OODK class instance to a native type.</p>

          <p>This method applies only on OODK classes.</p>

          </div>

          <a name="behavior-method-__clone"></a>
          <h4 class="page-header"><font class="font-small">method</font> __clone <i class="font-small">(&nbsp;<a href="#foundation-util-Cloner" class="oodk-type">Cloner</a>&nbsp;<b>cloner</b>&nbsp;)</i></h4>

          <div class="paragraph">
          
          <p><b>API</b> <a href="#api-debugger">Clone</a></p>

          <p>Behavior method for the <a href="#doc-keyword-clone">clone</a> keyword.</p>

          </div>

          <a name="behavior-method-__dump"></a>
          <h4 class="page-header"><font class="font-small">method</font> __dump <i class="font-small">(&nbsp;<a href="#foundation-util-Dumper" class="oodk-type">Dumper</a>&nbsp;<b>dumper</b>&nbsp;)</i></h4>

          <div class="paragraph">

          <p><b>API</b> <a href="#api-debugger">Debugger</a></p>

          <p>Behavior method for the <a href="#doc-keyword-dump">dump</a> keyword.</p>

          <p>Allows to implement directives for the Debugger API while dumping the current instance.</p>

          <p>Provide as first argument an instance of the <a href="foundation-util-Dumper">Dumper</a> class.</p>
          
          <pre>
          $.class(function ClassB($, µ, _){

            $.public('c', false);
          });

          $.class(function ClassA($, µ, _){

              $.private('amount', 5);

              $.private('b');

              $.public(function __initialize(){

                _.b = $.new(_.ns.ClassB, this);
              });

              $.protected(function __dump(dumper){

                dumper.unset('b'); // we don't need to display property 'b' in the dump and delete it fom the dumper
              });
            });
          });

          var a = $.new(_.ClassA);

          $.dump(a);
          // output:
          // {'__type': OODK.default.ClassA, '__resource': 3, 'amount': { '__type': 'number', 'value': 5}}
          </pre>

          </div>

          <a name="behavior-method-__finalize"></a>
          <h4 class="page-header"><font class="font-small">method</font> __finalize <i class="font-small">()</i></h4>

          <div class="paragraph">
          
          <p>Behavior method for the <a href="#doc-keyword-destroy">destroy</a> keyword.</p>

          <p>__finalize is called before the deletion of the instance members to allow customizing which behavior applied on sepcific properties.</p>

          </div>

          <a name="behavior-method-__initialize"></a>
          <h4 class="page-header"><font class="font-small">method</font> __initialize <i class="font-small">(&nbsp;<font class="oodk-type">Object</font>&nbsp; <b>obj</b> *)</i></h4>

          <div class="paragraph">
          
          <p>The __initialize method, also called initializer, allows to customize the instance generation behavior operates by the <a href="#doc-keyword-new">new keyword</a>.</p>

          <pre>
          var ClassA = $.class(function(){

            $.private('a');
            $.protected('b');

            $.public(function __initialize(a, b){
              _.a = a;
              µ.b = b;
            });
          });

          $.new(ClassA, 10, false);
          </pre>

          <p>It is not required to implement an initializer in a class declaration but if the access level of the initialize is private or protected OODK will raise an OODK.foundation.IllegalAccessException.</p>

          <pre>
          var ClassA = $.class(function(){

            $.private('a');
            $.protected('b');

            $.private(function __initialize(a, b){
              _.a = a;
              µ.b = b;
            });
          });

          $.new(ClassA, 10, false); // OODK raise an exception as initializer is declared private 
          </pre>

          <p>Private or protected initializer, and only thess methods as instance members are not accessible by static members, can be accessed through the static context of the class.</p>

          <pre>
          var ClassA = $.class(function(){

            $.private('a');
            $.protected('b');

            $.private(function __initialize(a, b){
              _.a = a;
              µ.b = b;
            });

            $.static(function($, µ, _){
              
              $.public(function instantaite(a, b){
                return $.new(ClassA, a, b); // all static members have access to the initializer
              });
            });
          });

          $.new(ClassA.self.instantiate, 10, false);
          </pre>

          </div>

          <a name="behavior-method-__iterator"></a>
          <h4 class="page-header">__iterator <i class="font-small">(&nbsp;)</i></h4>

          <div class="paragraph">

          <p><b>API</b>: <a href="#api-iteration">Iteration</a></p>

          <p>The __iterator behavior method must return an instance of a class implementing the OODK.foundation.Iterator interface or OODK will raise an OODK.foundation.IterateNotSupportedException.</p>
          
          <pre>
          //we implements a custom iterator class inheriting from the base OOD.foundation.util.Iterator class
          // to handle only odd values while iterating over the list.
          $.extends(OODK.foundation.util.Iterator).class(function ClassIterator($, µ, _){
            
            $.public(function next(){

              if(this.hasNext()){

                var nextValue = $.super.next();

                if(typeof nextValue != 'number'){
                  $.throw(OODK.foundation.IllegalArgumentException, [nextValue + ' is not a number']);
                }

                if(µ.isOdd(nextValue)){
                  return nextValue;
                }else{
                  return this.next();
                }
              }

              return undefined;
            });

            $.protected(function isOdd(num) {
              return (num % 2);
            });
          });

          $.implements(OODK.foundation.Iterable).class(function ClassA($, µ, _){

            $.private('iterator');

            $.private('list');

            $.public(function __initialize(list){

              _.list = list;
            });
            
            $.public(function __iterator(){

              if(!$.isset(_.iterator)){
                _.iterator = $.new(_.ns.ClassIterator, _.list);
              }

              return _.iterator;
            });
          });

          var a = $.new(_.ClassA, [1,2,3]);

          $.forEach(a, function(value, key){
            $.log(key + "=>" + value);
          });

          // log ([current]:75)
          // 0=>1
          // log ([current]:75)
          // 1=>3
          </pre>

          </div>

          <a name="behavior-method-__from"></a>
          <h4 class="page-header">__from <i class="font-small">()</i></h4>

          <div class="paragraph">
          
          <p><b>API</b> <a href="#api-debugger">Conversion</a></p>

          <p>Behavior method called when one of the conversion <a href="#doc-keyword-to">to</a> keyword try to convert a value to the given type.</p>

          <p>This method applies on native types and OODK classes.</p>

          </div>

          <a name="behavior-method-__serialize"></a>
          <h4 class="page-header">__serialize <i class="font-small">(&lt;Object&gt; serializer)</i></h4>

          <div class="paragraph">

          <p><b>API</b> <a href="#api-serialization">Serialization</a></p>
          
          <p>The __serialize method, allows to customize the serialization behavior operates by the <a href="#doc-keyword-serialize">serialize</a> keyword.</p>

          <p>It is not required to implement the __serialize method.</p>

          <pre></pre>

          </div>

          <a name="behavior-method-__unserialize"></a>
          <h4 class="page-header">__unserialize <i class="font-small">( <font class="oodk-type">Deserializer</font> <b>deserializer</b>)</i></h4>

          <div class="paragraph">
          
          <p><b>API</b> <a href="#api-serialization">Serialization</a></p>
          
          <p>The __unserialize method, allows to customize the unserialization behavior operates by the <a href="#doc-keyword-unserialize">unserialize</a> keyword.</p>

          <p>It is not required to implement the __unserialize method.</p>

          <p>__unserialize provide one argument, <b>deserializer</b> which is an instance of the <a href="#foundation-util-Deserializer">Deserializer</a> class </p>

          </div>

          <a name="foundation"></a>
          <h1 class="page-header">Foundation</h1>

          <h4 class="namespace-header">foundation</h4>

          <a name="foundation-exception-Error"></a>
          <h3 class="page-header"><font class="font-small">public class</font> Error</h3>

          <ul class="modifiers">
            <li class="modifier extends">extends <a class="oodk-type" href="#foundation-exception-Throwable">Throwable</a></li>
          </ul>

          <p>The Error class is the based class representing errors thrown by the language or by native js object.</p>

          <p>Native Js exception are wrapped to one of the subclass of the Error class.</p>

          <a name="foundation-exception-ClassCastException"></a>
          <h3 class="page-header"><font class="font-small">public class</font> ClassCastException</h3>

          <ul class="modifiers">
            <li class="modifier api">api <a href="#api-conversion">Conversion</a></li>
            <li class="modifier extends">extends <a class="oodk-type" href="#foundation-exception-Exception">Exception</a></li>
          </ul>

          <p>Error thrown when the cast keyword try to cast an object to an unsupported type.</p>

          <a name="foundation-interface-Cloneable"></a>
          <h3 class="page-header"><font class="font-small">public interface</font> Cloneable</h3>

          <ul class="modifiers">
            <li class="modifier api">api <a href="#api-cloning">Cloning</a></li>
            <li class="modifier extends">extends <a class="oodk-type" href="#foundation-exception-Exception">Exception</a></li>
          </ul>

          <p>The Cloneable interface defines a contract that any classes have to implement while being processed by the <a href="#doc-keyword-clone">clone</a> keyword.</p>

          <p>This interface does not contain any abstract method definition.</p>

          <p>An instance being cloned which does not implements the Cloneable interface will raise a <a href="#foundation-exception-CloneNotSupportedException">CloneNotSupportedException</a>.</p>

          <a name="foundation-exception-CloneNotSupportedException"></a>
          <h3 class="page-header"><font class="font-small">public class</font> CloneNotSupportedException</h3>

          <ul class="modifiers">
            <li class="modifier api">api <a href="#api-cloning">Cloning</a></li>
            <li class="modifier extends">extends <a class="oodk-type" href="#foundation-exception-Exception">Exception</a></li>
          </ul>

          <p>Error thrown trying to clone a class instance which does not implements the <a href="#foundation-interface-Cloneable">Cloneable</a> interface.</p>

          <a name="foundation-exception-EvalError"></a>
          <h3 class="page-header"><font class="font-small">public class</font> EvalError</h3>

          <ul class="modifiers">
            <li class="modifier extends">extends <a class="oodk-type" href="#foundation-exception-Error">Error</a></li>
          </ul>

          <p>OODK support for the native EvalError.</p>

          <a name="foundation-exception-Exception"></a>
          <h3 class="page-header"><font class="font-small">public class</font> Exception</h3>

          <ul class="modifiers">
            <li class="modifier extends">extends <a class="oodk-type" href="#foundation-exception-Throwable">Throwable</a></li>
          </ul>

          <p>The Exception class represents errors generated by user.</p>

          <p>All errors generated by OODK inherits from this class, except for error occured in class declaration, which in this case raise a <a href="#foundation-exception-SyntaxError">SyntaxError</a>.</p>

          <p>Any user exception should inherits from this class.</p>

          <a name="foundation-exception-FileNotFoundException"></a>
          <h3 class="page-header"><font class="font-small">public class</font> FileNotFoundException</h3>

          <ul class="modifiers">
            <li class="modifier extends">extends <a class="oodk-type" href="#foundation-exception-Exception">Exception</a></li>
          </ul>

          <p>Exception thrown when the path to a file has not been found.</p>

          <a name="foundation-exception-IllegalAccessException"></a>
          <h3 class="page-header"><font class="font-small">public class</font> IllegalAccessException</h3>

          <ul class="modifiers">
            <li class="modifier extends">extends <a class="oodk-type" href="#foundation-exception-Exception">Exception</a></li>
          </ul>

          <p>Error thrown when the kernel try to call a property with an invalid access level comare to context where it is executed.</p>

          <a name="foundation-exception-IllegalArgumentException"></a>
          <h3 class="page-header"><font class="font-small">public class</font> IllegalArgumentException</h3>

          <ul class="modifiers">
            <li class="modifier extends">extends <a class="oodk-type" href="#foundation-exception-Exception">Exception</a></li>
          </ul>

          <p>The IllegalArgumentException is thrown when a type or a value does not match the requirement of a method argument.</p>

          <a name="foundation-exception-IllegalStateException"></a>
          <h3 class="page-header"><font class="font-small">public class</font> IllegalStateException</h3>

          <ul class="modifiers">
            <li class="modifier extends">extends <a class="oodk-type" href="#foundation-exception-Exception">Exception</a></li>
          </ul>

          <p>The IllegalStateException is thrown when OODK is not in an apporopriate state for the request operation.</p>

          <a name="foundation-exception-InstantiationException"></a>
          <h3 class="page-header"><font class="font-small">public class</font> InstantiationException</h3>

          <ul class="modifiers">
            <li class="modifier extends">extends <a class="oodk-type" href="#foundation-exception-Exception">Exception</a></li>
          </ul>

          <p>Exception thrown when OODK tries to create an instance of a class but the specified class cannot be instantiated.</p>

          <a name="foundation-exception-IterateNotSupportedException"></a>
          <h3 class="page-header"><font class="font-small">public class</font> IterateNotSupportedException</h3>

          <ul class="modifiers">
            <li class="modifier extends">extends <a class="oodk-type" href="#foundation-exception-Exception">Exception</a></li>
          </ul>

          <p>Thrown when try to iterate on a class'instance that does not implements the Iterable interface or the iterator return by the __iterator does not implements the Iterator interface.</p>

          <a name="foundation-exception-NetworkError"></a>
          <h3 class="page-header"><font class="font-small">public class</font> NetworkError</h3>

          <ul class="modifiers">
            <li class="modifier extends">extends <a class="oodk-type" href="#foundation-exception-Exception">Exception</a></li>
          </ul>

          <p>OODK support for the native NetworkError.</p>

          <a name="foundation-exception-NoSuchElementException"></a>
          <h3 class="page-header"><font class="font-small">public class</font> NoSuchElementException</h3>

          <ul class="modifiers">
            <li class="modifier api">api <a href="#api-iteration">Iteration</a></li>
            <li class="modifier extends">extends <a class="oodk-type" href="#foundation-exception-Exception">Exception</a></li>
          </ul>

          <p>Thrown when there is not more element in an iterable.</p>

          <a name="foundation-interface-Observable"></a>
          <h3 class="page-header"><font class="font-small">public interface</font> Observable</h3>

          <ul class="modifiers">
            <li class="modifier api">api <a href="#api-sort">Observer</a></li>
          </ul>

          <p>The Observable interface indicates that the class implementing this interface is observable and notify observers of its states changements.</p>

          <a name="foundation-interface-Comparable-__notify"></a>
          <h4 class="page-header"><font class="font-small">public function</font> __notify <i class="font-small">(<font class="oodk-type">String</font> <b>propertyName</b>, <font class="oodk-type">Object | Primitive</font> <b>newValue</b>, <font class="oodk-type">Object | Primitive</font> <b>oldValue</b>)</i></h4>

          <div class="paragraph">

          <p>This method indicates how the observable object is going to notify the observers of its states changements.</p>

          <p>Provide as arguments the name of the property which has changed, the new value of the property as well as the value before the changement.</p>

          </div>

          <a name="foundation-interface-Observer"></a>
          <h3 class="page-header"><font class="font-small">public interface</font> Observer</h3>

          <ul class="modifiers">
            <li class="modifier api">api <a href="#api-sort">Observer</a></li>
          </ul>

          <p>The Observer interface indicates that the class implementing this interface can observe an observable object on its states changements.</p>

          <a name="foundation-interface-Comparable-_update"></a>
          <h4 class="page-header"><font class="font-small">public function</font> update <i class="font-small">(<font class="oodk-type">Object</font> <b>observable</b>, [ <font class="oodk-type">Object | Primitive</font> <b>message</b> ] )</i></h4>

          <div class="paragraph">

          <p>This method provides as argument the observable object which has changed and optionally a specific message on the type of changement that has occured.</p>

          </div>

          <a name="foundation-exception-PackageDefinitionException"></a>
          <h3 class="page-header"><font class="font-small">public class</font> PackageDefinitionException</h3>

          <ul class="modifiers">
            <li class="modifier extends">extends <a class="oodk-type" href="#foundation-exception-Exception">Exception</a></li>
          </ul>

          <p>Thrown when a package is already defined.</p>

          <a name="foundation-exception-RangeError"></a>
          <h3 class="page-header"><font class="font-small">public class</font> RangeError</h3>

          <ul class="modifiers">
            <li class="modifier extends">extends <a class="oodk-type" href="#foundation-exception-Error">Error</a></li>
          </ul>

          <p>OODK support for the native RangeError.</p>

          <a name="foundation-exception-ReferenceError"></a>
          <h3 class="page-header"><font class="font-small">public class</font> ReferenceError</h3>

          <ul class="modifiers">
            <li class="modifier extends">extends <a class="oodk-type" href="#foundation-exception-Error">Error</a></li>
          </ul>

          <p>OODK support for the native ReferenceError.</p>

          <a name="foundation-exception-SecurityException"></a>
          <h3 class="page-header"><font class="font-small">public class</font> SecurityException</h3>

          <ul class="modifiers">
            <li class="modifier extends">extends <a class="oodk-type" href="#foundation-exception-Exception">Exception</a></li>
          </ul>

          <p>Exception thrown to indicate a security violation.</p>

          <a name="foundation-exception-SerializeNotSupportedException"></a>
          <h3 class="page-header"><font class="font-small">public class</font> SerializeNotSupportedException</h3>

          <ul class="modifiers">
            <li class="modifier extends">extends <a class="oodk-type" href="#foundation-exception-Exception">Exception</a></li>
          </ul>

          <p>Exception thrown when using the <a href="#doc-keyword-serialize">serialize</a> or <a href="#doc-keyword-unserialize">unserialize</a> keyword on a class instance that does not implement the <a href="foundation-interface-Serializable">Serializable</a> interface.</p>

          <a name="foundation-exception-SortNotSupportedException"></a>
          <h3 class="page-header"><font class="font-small">public class </font>SortNotSupportedException</h3>

          <ul class="modifiers">
            <li class="modifier api">api <a href="#api-sort">Sort</a></li>
            <li class="modifier extends">extends <a class="oodk-type" href="#foundation-exception-Exception">Exception</a></li>
          </ul>

          <p>Error thrown when trying to sort a class instance which does not implements the <a href="#foundation-interface-Sortable">Sortable</a> interface.</p>

          <a name="foundation-exception-SyntaxError"></a>
          <h3 class="page-header"><font class="font-small">public class</font> SyntaxError</h3>

          <ul class="modifiers">
            <li class="modifier extends">extends <a class="oodk-type" href="#foundation-exception-Error">Error</a></li>
          </ul>

          <p>OODK support for the native SyntaxError.</p>

          <p>Errors thrown while declaring a class are of this type.</p>

          <a name="foundation-exception-TypeError"></a>
          <h3 class="page-header"><font class="font-small">public class</font> TypeError</h3>

          <ul class="modifiers">
            <li class="modifier extends">extends <a class="oodk-type" href="#foundation-exception-Error">Error</a></li>
          </ul>

          <p>OODK support for the native TypeError.</p>

          <a name="foundation-exception-Throwable"></a>
          <h3 class="page-header"><font class="font-small">public abstract class</font> Throwable</h3>

          <p>The Throwable class is the root class of all type of error generated by the language or by the user.</p>

          <div class="paragraph">

          <a name="foundation-interface-Throwable-tostring"></a>
          <h4 class="page-header"><font class="font-small">public function</font> toString <i class="font-small">()</i></h4>

          <p>return a string representation of the exception. Include the OODK stack.</p>

          </div>

          <a name="foundation-exception-URIError"></a>
          <h3 class="page-header"><font class="font-small">public class</font> URIError</h3>

          <ul class="modifiers">
            <li class="modifier extends">extends <a class="oodk-type" href="#foundation-exception-Error">Error</a></li>
          </ul>

          <p>OODK support for the native URIError.</p>

          <a name="foundation-interface-Comparable"></a>
          <h3 class="page-header"><font class="font-small">public interface</font> Comparable</h3>

          <ul class="modifiers">
            <li class="modifier api">api <a href="#api-comparison">Comparison</a></li>
          </ul>

          <p>The Comparator interface define how the class implementing the interface can be compared to an another value.</p>

          <a name="foundation-interface-Comparable-__compareTo"></a>
          <h4 class="page-header"><font class="font-small">public function</font> __compareTo <i class="font-small">(<font class="oodk-type">Object | Primitive</font> <b>val</b>)</i></h4>

          <div class="paragraph">

          <p><b>return</b>:&nbsp;<font class="oodk-type">Integer</font>&nbsp;</p>
          
          <p>Compare the current instance with the value passed as argument.</p>

          <p>The return value must be an integer between -1 and 1.</p>

          <ul>
            <li><b>-1</b>: current instance is lower than val.</li>
            <li><b>0</b>: current instance and val are equal.</li>
            <li><b>1</b>: current instance is greater than val.</li>
          </ul>

          </div>

          <a name="foundation-interface-Comparator"></a>
          <h3 class="page-header"><font class="font-small">public interface</font> Comparator</h3>

          <ul class="modifiers">
            <li class="modifier api">api <a href="#api-comparison">Comparison</a></li>
          </ul>

          <p>The Comparator interface define how two values can be compared.</p>

          <a name="foundation-interface-Comparator-__compare"></a>
          <h4 class="page-header"><font class="font-small">public function</font> __compare <i class="font-small">(<font class="oodk-type">Array</font> <b>pair1</b>, <font class="oodk-type">Array</font> <b>pair2</b>)</i></h4>

          <div class="paragraph">

          <p><b>return</b>:&nbsp;<font class="oodk-type">Integer</font>&nbsp;</p>
          
          <p>Compare the two pair key/value passed as argument.</p>

          <p>Arguments must be an array of pair key/value. First index of the array must be the key and second index the value.</p>

          <p>The return value must be an integer between -1 and 1.</p>

          <ul>
            <li><b>-1</b>: pair1 is lower than pair2</li>
            <li><b>0</b>: pair1 and pair2 are equal.</li>
            <li><b>1</b>: pair1 is greater than pair2.</li>
          </ul>

          </div>

          <a name="foundation-interface-Iterable"></a>
          <h3 class="page-header"><font class="font-small">public interface</font> Iterable</h3>

          <ul class="modifiers">
            <li class="modifier api">api <a href="#api-iteration">Iteration</a></li>
            <li class="modifier extends">extends <a class="oodk-type" href="#foundation-exception-Exception">Exception</a></li>
          </ul>

          <p>The Iterable interface indicates that the class implementing this interface can be iterate using the forEach kewyord.</p>

          <a name="foundation-interface-Iterator-next"></a>
          <h4 class="page-header"><font class="font-small">public function</font> __iterator <i class="font-small">()</i></h4>

          <div class="paragraph">

          <p><b>return</b>: &lt;&nbsp;<a class="oodk-type" href="#foundation-interface-iterator">OODK.foundation.Iterator</a>&nbsp;&gt;</p>
          
          <p>The __iterator method must return an instance of a class implementing the <a href="#foundation-interface-iterator">Iterator</a> interface.</p>

          </div>

          <a name="foundation-interface-Iterator"></a>
          <h3 class="page-header"><font class="font-small">public interface</font> Iterator</h3>

          <ul class="modifiers">
            <li class="modifier api">api <a href="#api-iteration">Iteration</a></li>
            <li class="modifier extends">extends <a class="oodk-type" href="#foundation-exception-Exception">Exception</a></li>
          </ul>

          <p>The Iterator interface indicates how to iterates over an object.</p>

          <a name="foundation-interface-Iterator-next"></a>
          <h4 class="page-header"><font class="font-small">public function</font> hasNext <i class="font-small">()</i></h4>

          <div class="paragraph">

          <p><b>return</b>: <font class="oodk-type">Boolean</font></p>
          
          <p>Test if the iterable object has a next value.</p>

          </div>

          <a name="foundation-interface-Iterator-next"></a>
          <h4 class="page-header"><font class="font-small">public function</font> next <i class="font-small">()</i></h4>

          <div class="paragraph">

          <p><b>throws</b> <a class="oodk-type" href="#foundation-exception-NoSuchElementException">NoSuchElementException</a> If the list does not have a next value.</p>
          
          <p>return the next value of the iterable object.</p>

          </div>

          <a name="foundation-interface-Iterator-nextIndex"></a>
          <h4 class="page-header"><font class="font-small">public function</font> nextIndex <i class="font-small">()</i></h4>

          <div class="paragraph">

          <p><b>return</b>: <font class="oodk-type">String&nbsp;|&nbsp;Number</font></p>
          
          <p>Return the next index of the iterable object.</p>

          </div>

          <a name="foundation-interface-Iterator-reset"></a>
          <h4 class="page-header"><font class="font-small">public function</font> reset <i class="font-small">()</i></h4>

          <div class="paragraph">
          
          <p>Reset the iterator's index to its initial state.</p>

          </div>

          <a name="foundation-interface-Sortable"></a>
          <h3 class="page-header"><font class="font-small">public interface</font> Sortable</h3>

          <ul class="modifiers">
            <li class="modifier api">api <a href="#api-sort">Sort</a></li>
          </ul>

          <p>The Sotable interface indicates that the class implementing this interface can be sorted using the sort kewyord.</p>

          <a name="foundation-interface-Comparable-__sort"></a>
          <h4 class="page-header"><font class="font-small">public function</font> __sort <i class="font-small">()</i></h4>

          <div class="paragraph">

          <p><b>return</b>:&nbsp;&lt;&nbsp;<a class="oodk-type" href="#foundation-interface-Sorter">Sorter</a>&nbsp;&gt;&nbsp;</p>
          
          <p>This method must return an instance of the <a href="#foundation-interface-Sorter">Sorter</a> interface.</p>

          </div>

          <a name="foundation-interface-Sorter"></a>
          <h3 class="page-header"><font class="font-small">public interface</font> Sorter</h3>

          <ul class="modifiers">
            <li class="modifier api">api <a href="#api-sort">Sort</a></li>
          </ul>

          <p>The Sorter interface indicates how to sort an object.</p>

          <a name="foundation-interface-Sorter-sort"></a>
          <h4 class="page-header"><font class="font-small">public function</font> sort <i class="font-small">(<font class="oodk-type">Object | Primitive</font> <b>val1</b>, <font class="oodk-type">Object | Primitive</font> <b>val2</b>)</i></h4>

          <div class="paragraph">
          
          <p>Implements the algorithm to sort the object.</p>

          </div>

          <a name="foundation-interface-Serializable"></a>
          <h3 class="page-header"><font class="font-small">public interface</font> Serializable</h3>

          <ul class="modifiers">
            <li class="modifier api">api <a href="#api-serialization">Serialization</a></li>
            <li class="modifier extends">extends <a class="oodk-type" href="#foundation-exception-Exception">Exception</a></li>
          </ul>

          <p>The Serializable interface indicates that the class implementing this interface can be serialized and deserialized using the <a href="doc-keyword-serialize">serialize</a> and/or <a href="doc-keyword-unserialize">unserialize</a> keyword.</p>

          <p>This interface does not contain any abstract method definition.</p>

          <h4 class="namespace-header" style="margin-top:40px">foundation.util</h4>

          <a name="foundation-util-Deserializer"></a>
          <h3 class="page-header"><font class="font-small">public class</font> Deserializer</h3>

          <ul class="modifiers">
            <li class="modifier api">api <a href="#api-serialization">Deserializer</a></li>
            <li class="modifier extends">extends <a class="oodk-type" href="#foundation-exception-Exception">Exception</a></li>
          </ul>

          <p>Deserialize a single property of the current instance which is not treated by the generic behavior.</p>

          <a name="foundation-util-Deserializer-get"></a>
          <h4 class="page-header"><font class="font-small">public</font> get <i class="font-small">( <font class="oodk-type">String</font> <b>propertyName</b>, <font class="oodk-type">Object</font> <b>syntaxer</b>)</i></h4>

          <div class="paragraph">

          <p>Deserialize the given property in the current instance.</p>

          <p>If property is a transient property OODK will raise an an IllegalArgumentException.</p>

          <p>On standard class (not declared as dynamic or mutable), property have to declared else OODK will raise an an IllegalArgumentException</p>

          <p>In case of mutable or dynamic class, if property is not declared, value is return to be assigned manually.</p>

          </div>

          <a name="foundation-util-Dumper"></a>
          <h3 class="page-header"><font class="font-small">public class</font> Dumper</h3>

          <ul class="modifiers">
            <li class="modifier api">api <a href="#api-debugger">Debugger</a></li>
          </ul>

          <div class="paragraph">

          <p>Dump a single property of the current instance which is not treated by the generic behavior.</p>

          <a name="foundation-util-Dumper-set"></a>
          <h4 class="page-header"><font class="font-small">public</font> set <i class="font-small">( <font class="oodk-type">String</font> <b>propertyName</b>, <font class="oodk-type">Object</font> <b>syntaxer</b>)</i></h4>

          <p>Dump the given property.</p>

          </div>

          <a name="foundation-util-Iterator"></a>
          <h3 class="page-header"><font class="font-small">public class</font> Iterator</h3>

          <ul class="modifiers">
            <li class="modifier api">api <a href="#api-iteration">Iteration</a></li>
          </ul>
          <p>Implements a generic version of an iterator.</p>

          <p>See interface <a href="#foundation-interface-Iterator">Iterator</a> for the detailed documentation.</p>

          <a name="foundation-util-Sorter"></a>
          <h3 class="page-header"><font class="font-small">public class</font> Sorter</h3>

          <ul class="modifiers">
            <li class="modifier api">api <a href="#api-sort">Sort</a></li>
          </ul>

          <p>Implements a generic version of a sorter.</p>

          <p>The generic behavior use the native Array.sort method to sort the related iterable object.</p>

          <p>Native and class instance are supported.</p>

          <p>See interface <a href="#foundation-interface-Sorter">Sorter</a> for the detailed documentation.</p>

          <a name="foundation-util-Serializer"></a>
          <h3 class="page-header"><font class="font-small">public class</font> Serializer</h3>

          <ul class="modifiers">
            <li class="modifier api">api <a href="#api-serialization">Deserializer</a></li>
            <li class="modifier extends">extends <a class="oodk-type" href="#foundation-exception-Exception">Exception</a></li>
          </ul>

          <p>Serialize a single property of the current instance which is not treated by the generic behavior.</p>

          <a name="foundation-util-Serializer-set"></a>
          <h4 class="page-header"><font class="font-small">public</font> set <i class="font-small">( <font class="oodk-type">String</font> <b>propertyName</b>, <font class="oodk-type">Object</font> <b>syntaxer</b>)</i></h4>

          <div class="paragraph">

          <p>Serialize the given property in the current instance.</p>

          <p>Setting in the serializer a transient property will raise an an IllegalArgumentException</p>

          <p>On standard class(not declared as dynamic or mutable), property have to declared else OODK will raise an an IllegalArgumentException</p>

          </div>

          <a name="foundation-util-Url"></a>
          <h3 class="page-header"><font class="font-small">public class</font> Url</h3>

          <p>Handles an URL.</p>

          <p>http://localhost:8080/my/uri/?a=10&b=test#name</p>

          <table class="table">
            <tr><th>Field</th><th>Description</th></tr>
            <tr><td>protocol</td><td>http://</td></tr>
            <tr><td>hostname</td><td>localhost</td></tr>
            <tr><td>host</td><td>http://localhost</td></tr>
            <tr><td>port</td><td>8080</td></tr>
            <tr><td>origin</td><td>http://localhost:8080</td></tr>
            <tr><td>pathname</td><td>my/uri/</td></tr>
            <tr><td>path segment (0)</td><td>my</td></tr>
            <tr><td>search</td><td>a=10&b=test</td></tr>
            <tr><td>search fragment "a"</td><td>10</td></tr>
            <tr><td>hash</td><td>name</td></tr>
          </table>

          <a name="foundation-util-Url-__initialize"></a>
          <h4 class="page-header"><font class="font-small">public</font> __initialize <i class="font-small">( <font class="oodk-type">String</font> <b>url</b> )</i></h4>

          <div class="paragraph">

          <p>Constructor of the url. If no argument is specified get the current location of the page.</p>

          </div>

          <a name="foundation-util-Url-getProtocol"></a>
          <h4 class="page-header"><font class="font-small">public</font> getProtocol <i class="font-small">( )</i></h4>

          <div class="paragraph">

          <p>Get the protocol.</p>

          </div>

          <a name="foundation-util-Url-getHash"></a>
          <h4 class="page-header"><font class="font-small">public</font> getHash <i class="font-small">( )</i></h4>

          <div class="paragraph">

          <p>Get the hash.</p>

          </div>

          <a name="foundation-util-Url-getHost"></a>
          <h4 class="page-header"><font class="font-small">public</font> getHost <i class="font-small">( )</i></h4>

          <div class="paragraph">

          <p>Get the host name plus the port number.</p>

          </div>

          <a name="foundation-util-Url-getHostname"></a>
          <h4 class="page-header"><font class="font-small">public</font> getHostname <i class="font-small">( )</i></h4>

          <div class="paragraph">

          <p>Get the hostname.</p>

          </div>

          <a name="foundation-util-Url-getOrigin"></a>
          <h4 class="page-header"><font class="font-small">public</font> getOrigin <i class="font-small">( )</i></h4>

          <div class="paragraph">

          <p>Get the origin of the request, protocol plus host</p>

          </div>

          <a name="foundation-util-Url-getPathname"></a>
          <h4 class="page-header"><font class="font-small">public</font> getPathname <i class="font-small">( <font class="oodk-type">String</font> <b>pathName</b> )</i></h4>

          <div class="paragraph">

          <p>Get the pathname.</p>

          </div>

          <a name="foundation-util-Url-getPathSegment"></a>
          <h4 class="page-header"><font class="font-small">public</font> getPathSegment <i class="font-small">( <font class="oodk-type">Number</font> <b>index</b> )</i></h4>

          <div class="paragraph">

          <p>Get the path segment at the specified index.</p>

          </div>

          <a name="foundation-util-Url-getPort"></a>
          <h4 class="page-header"><font class="font-small">public</font> getPort <i class="font-small">( <font class="oodk-type">String</font> <b>port</b> )</i></h4>

          <div class="paragraph">

          <p>Get the port number.</p>

          </div>

          <a name="foundation-util-Url-getSearch"></a>
          <h4 class="page-header"><font class="font-small">public</font> getSearch <i class="font-small">( )</i></h4>

          <div class="paragraph">

          <p>Get the full search string.</p>

          </div>

          <a name="foundation-util-Url-getSearchFragment"></a>
          <h4 class="page-header"><font class="font-small">public</font> getSearchFragment <i class="font-small">( <font class="oodk-type">String</font> <b>fragment</b> )</i></h4>

          <div class="paragraph">

          <p>Get a specific fragment from the search string.</p>

          </div>

          <a name="foundation-util-Url-removeHash"></a>
          <h4 class="page-header"><font class="font-small">public</font> removeHash <i class="font-small">( )</i></h4>

          <div class="paragraph">

          <p>Remove the hash.</p>

          </div>

          <a name="foundation-util-Url-removePathSegment"></a>
          <h4 class="page-header"><font class="font-small">public</font> removePathSegment <i class="font-small">( <font class="oodk-type">String</font> <b>segment</b> )</i></h4>

          <div class="paragraph">

          <p>Remove the path segment.</p>

          </div>

          <a name="foundation-util-Url-removePort"></a>
          <h4 class="page-header"><font class="font-small">public</font> removePort <i class="font-small">( )</i></h4>

          <div class="paragraph">

          <p>Delete the port number.</p>

          </div>

          <a name="foundation-util-Url-removeSearch"></a>
          <h4 class="page-header"><font class="font-small">public</font> removeSearch <i class="font-small">( )</i></h4>

          <div class="paragraph">

          <p>Delete the search string.</p>

          </div>

          <a name="foundation-util-Url-removeSearchFragment"></a>
          <h4 class="page-header"><font class="font-small">public</font> removeSearchFragment <i class="font-small">( <font class="oodk-type">String</font> <b>key</b> )</i></h4>

          <div class="paragraph">

          <p>Remove a specific fragment from the search string.</p>

          </div>

          <a name="foundation-util-Url-setHash"></a>
          <h4 class="page-header"><font class="font-small">public</font> setHash <i class="font-small">( <font class="oodk-type">String</font> <b>hash</b> )</i></h4>

          <div class="paragraph">

          <p>Set the hash.</p>

          </div>

          <a name="foundation-util-Url-setPathSegment"></a>
          <h4 class="page-header"><font class="font-small">public</font> setPathSegment <i class="font-small">( <font class="oodk-type">String</font> <b>segment</b> )</i></h4>

          <div class="paragraph">

          <p>Set a path segment.</p>

          </div>

          <a name="foundation-util-Url-setPort"></a>
          <h4 class="page-header"><font class="font-small">public</font> setPort <i class="font-small">( <font class="oodk-type">String</font> <b>port</b> )</i></h4>

          <div class="paragraph">

          <p>Set the port number.</p>

          </div>

          <a name="foundation-util-Url-setProtocol"></a>
          <h4 class="page-header"><font class="font-small">public</font> setProtocol <i class="font-small">( <font class="oodk-type">String</font> <b>protocol</b> )</i></h4>

          <div class="paragraph">

          <p>Set the protocol.</p>

          </div>

          <a name="foundation-util-Url-setHostname"></a>
          <h4 class="page-header"><font class="font-small">public</font> setHostname <i class="font-small">( <font class="oodk-type">String</font> <b>hostName</b> )</i></h4>

          <div class="paragraph">

          <p>Set the hostname.</p>

          </div>

          <a name="foundation-util-Url-setPathname"></a>
          <h4 class="page-header"><font class="font-small">public</font> setPathname <i class="font-small">( <font class="oodk-type">String</font> <b>pathName</b> )</i></h4>

          <div class="paragraph">

          <p>Set the pathname.</p>

          </div>

          <a name="foundation-util-Url-setSearch"></a>
          <h4 class="page-header"><font class="font-small">public</font> setSearch <i class="font-small">( <font class="oodk-type">String</font> <b>search</b> )</i></h4>

          <div class="paragraph">

          <p>Set the search string.</p>

          </div>

          <a name="foundation-util-Url-setSearchFragment"></a>
          <h4 class="page-header"><font class="font-small">public</font> setSearchFragment <i class="font-small">( <font class="oodk-type">String</font> <b>key</b>, <font class="oodk-type">String</font> <b>value</b> )</i></h4>

          <div class="paragraph">

          <p>Set a specific fragment of the search string.</p>

          </div>

          <a name="foundation-util-XHRequest"></a>
          <h3 class="page-header"><font class="font-small">public class</font> XHRequest</h3>

          <p>Wrapper for the XmlHttpRequest. The same request can be sent several times but once sent states of the request cannot be changed.</p>

          <a name="foundation-util-XHRequest-async"></a>
          <h4 class="page-header"><font class="font-small">public</font> async <i class="font-small">( )</i></h4>

          <div class="paragraph">

          <p>Set the request to be sent in asynchronous mode.</p>

          </div>

          <a name="foundation-util-XHRequest-beforeSend"></a>
          <h4 class="page-header"><font class="font-small">public</font> beforeSend <i class="font-small">( <font class="oodk-type">Function</font> <b>callback</b> )</i></h4>

          <div class="paragraph">

          <p>Apply a callback before sending the request.</p>

          <p>Provides, as first argument of the callback, the contextual XHRequest.</p>

          </div>

          <a name="foundation-util-XHRequest-isAsync"></a>
          <h4 class="page-header"><font class="font-small">public</font> isAsync <i class="font-small">( )</i></h4>

          <div class="paragraph">

          <p>Test if the request is in asynchronous mode.</p>

          </div>

          <a name="foundation-util-XHRequest-isUpdateable"></a>
          <h4 class="page-header"><font class="font-small">public</font> isUpdateable <i class="font-small">( )</i></h4>

          <div class="paragraph">

          <p>Test if the request is updateable. Once a request is sent, states of the request as data, post, headers cannot be modified.</p>

          </div>

          <a name="foundation-util-XHRequest-getContentType"></a>
          <h4 class="page-header"><font class="font-small">public</font> getContentType <i class="font-small">( )</i></h4>

          <div class="paragraph">

          <p>Get the content type of the request.</p>

          </div>

          <a name="foundation-util-XHRequest-getCustomData"></a>
          <h4 class="page-header"><font class="font-small">public</font> getCustomData <i class="font-small">( <font class="oodk-type">String</font> <b>key</b> )</i></h4>

          <div class="paragraph">

          <p>Get custom data of the request.</p>

          </div>

          <a name="foundation-util-XHRequest-getPost"></a>
          <h4 class="page-header"><font class="font-small">public</font> getPost <i class="font-small">( )</i></h4>

          <div class="paragraph">

          <p>Get post data string representation.</p>

          </div>

          <a name="foundation-util-XHRequest-getPostFragment"></a>
          <h4 class="page-header"><font class="font-small">public</font> getPostFragment <i class="font-small">( <font class="oodk-type">String</font> <b>name</b> )</i></h4>

          <div class="paragraph">

          <p>Get post data of the request.</p>

          </div>

          <a name="foundation-util-XHRequest-getUrl"></a>
          <h4 class="page-header"><font class="font-small">public</font> getUrl <i class="font-small">( )</i></h4>

          <div class="paragraph">

          <p>Get the URL of the request.</p>

          </div>

          <a name="foundation-util-XHRequest-onComplete"></a>
          <h4 class="page-header"><font class="font-small">public</font> onComplete <i class="font-small">( <font class="oodk-type">Function</font> <b>callback</b> )</i></h4>

          <div class="paragraph">

          <p>Apply the callback specified on the request is complete.</p>

          <p>Provides, as first argument of the callback, the <a href="#foundation-util-XHResponse">XHResponse</a>.</p>

          </div>

          <a name="foundation-util-XHRequest-removePost"></a>
          <h4 class="page-header"><font class="font-small">public</font> removePost <i class="font-small">( )</i></h4>

          <div class="paragraph">

          <p>Remove post data of the request.</p>

          </div>

          <a name="foundation-util-XHRequest-removePostFragment"></a>
          <h4 class="page-header"><font class="font-small">public</font> removePostFragment <i class="font-small">( <font class="oodk-type">String</font> <b>name</b> )</i></h4>

          <div class="paragraph">

          <p>Remove the specified post data of the request.</p>

          </div>

          <a name="foundation-util-XHRequest-send"></a>
          <h4 class="page-header"><font class="font-small">public</font> send <i class="font-small">( )</i></h4>

          <div class="paragraph">

          <p>Send the request.</p>

          </div>

          <a name="foundation-util-XHRequest-setContentType"></a>
          <h4 class="page-header"><font class="font-small">public</font> setContentType <i class="font-small">( <font class="oodk-type">String</font> <b>contentType</b> )</i></h4>

          <div class="paragraph">

          <p>Set the content type request.</p>

          </div>

          <a name="foundation-util-XHRequest-setCustomData"></a>
          <h4 class="page-header"><font class="font-small">public</font> setCustomData <i class="font-small">( <font class="oodk-type">String</font> <b>key</b>, <font class="oodk-type">Object | Primitive</font> <b>value</b> )</i></h4>

          <div class="paragraph">

          <p>Set custom data to the request.</p>

          </div>

          <a name="foundation-util-XHRequest-setMethod"></a>
          <h4 class="page-header"><font class="font-small">public</font> setMethod <i class="font-small">( <font class="oodk-type">String</font> <b>url</b>)</i></h4>

          <div class="paragraph">

          <p>Set the HTTP method:  "GET" or "POST".</p>

          </div>

          <a name="foundation-util-XHRequest-setPost"></a>
          <h4 class="page-header"><font class="font-small">public</font> setPost <i class="font-small">( <font class="oodk-type">String</font> <b>post</b> )</i></h4>

          <div class="paragraph">

          <p>Set post data of the request.</p>

          </div>

          <a name="foundation-util-XHRequest-setPostFragment"></a>
          <h4 class="page-header"><font class="font-small">public</font> setPostFragment <i class="font-small">( <font class="oodk-type">String</font> <b>name</b>, <font class="oodk-type">Object | Primitive</font> <b>value</b> )</i></h4>

          <div class="paragraph">

          <p>Set post data of the request.</p>

          </div>

          <a name="foundation-util-XHRequest-setRequestHeader"></a>
          <h4 class="page-header"><font class="font-small">public</font> setRequestHeader <i class="font-small">( <font class="oodk-type">String</font> <b>key</b>, <font class="oodk-type">String</font> <b>value</b> )</i></h4>

          <div class="paragraph">

          <p>Set a parameter of the request header.</p>

          </div>

          <a name="foundation-util-XHRequest-setUrl"></a>
          <h4 class="page-header"><font class="font-small">public</font> setUrl <i class="font-small">( <font class="oodk-type">String | OODK.foundation.util.Url</font> <b>url</b> )</i></h4>

          <div class="paragraph">

          <p>Set the URL of the request.</p>

          </div>

          <a name="foundation-util-XHRequest-sync"></a>
          <h4 class="page-header"><font class="font-small">public</font> sync <i class="font-small">( )</i></h4>

          <div class="paragraph">

          <p>Set the request to be sent in synchronous mode.</p>

          </div>

          <a name="foundation-util-XHResponse"></a>
          <h3 class="page-header"><font class="font-small">public class</font> XHResponse</h3>

          <p>Response object following an XHRequest.</p>

          <a name="foundation-util-XHResponse-get"></a>
          <h4 class="page-header"><font class="font-small">public</font> get <i class="font-small">( )</i></h4>

          <div class="paragraph">

          <p>Auto format the response taking the content-type header of the request as reference.</p>

          <table class="table">
            <tr><th>Content-type</th><th>Description</th></tr>
            <tr><td>application/json</td><td>format the response using JSON.parse()</td></tr>
            <tr><td>*</td><td>get response in text format</td></tr>
          </table>

          </div>

          <a name="foundation-util-XHResponse-getRaw"></a>
          <h4 class="page-header"><font class="font-small">public</font> getRaw <i class="font-small">( )</i></h4>

          <div class="paragraph">

          <p>Get the raw response.</p>

          </div>

          <a name="foundation-util-XHResponse-getText"></a>
          <h4 class="page-header"><font class="font-small">public</font> getText <i class="font-small">( )</i></h4>

          <div class="paragraph">

          <p>Get the response in text format.</p>

          </div>

          <a name="foundation-util-XHResponse-getContentType"></a>
          <h4 class="page-header"><font class="font-small">public</font> getContentType <i class="font-small">( )</i></h4>

          <div class="paragraph">

          <p>Get the content-type of the response.</p>

          </div>

          <a name="foundation-util-XHResponse-getCustomData"></a>
          <h4 class="page-header"><font class="font-small">public</font> getCustomData <i class="font-small">( <font class="oodk-type">String</font> <b>name</b> )</i></h4>

          <div class="paragraph">

          <p>Get the custom data of the response specified by its key.</p>

          </div>

          <a name="foundation-util-XHResponse-getPost"></a>
          <h4 class="page-header"><font class="font-small">public</font> getPost <i class="font-small">( )</i></h4>

          <div class="paragraph">

          <p>Get the post data used to performed the response.</p>

          </div>

          <a name="foundation-util-XHResponse-getStatus"></a>
          <h4 class="page-header"><font class="font-small">public</font> getStatus <i class="font-small">( )</i></h4>

          <div class="paragraph">

          <p>Get the status of the response.</p>

          </div>

          <a name="foundation-util-XHResponse-hasFailed"></a>
          <h4 class="page-header"><font class="font-small">public</font> hasFailed <i class="font-small">( )</i></h4>

          <div class="paragraph">

          <p>Test if the request has failed.</p>

          </div>

          <a name="foundation-util-XHResponse-hasSucceeded"></a>
          <h4 class="page-header"><font class="font-small">public</font> hasSucceeded <i class="font-small">( )</i></h4>

          <div class="paragraph">

          <p>Test if the request has succeeded. (response status code equal to 200)</p>

          </div>

          <a name="design-pattern"></a>
          <h1 class="page-header">Design patterns</h1>

          <p>This section details main design patterns that can be implemented using OODK.</p>

          <a name="design-pattern-factory"></a>
          <h3 class="namespace-header">Factory</h3>

          <p>The factory design pattern defines an interface for the generation of new instances.</p>

          <p>The main advantage is to reduce dependencies between classes by centralizing dependencies around the factory implementation.</p>

          <p>With OODK, two approaches are possibles to implement this design pattern.</p>

          <pre>
          // class located in {workspace}/myProject/MyFactory.js
          OODK('myProject', function($, _){

              $.public().class(function MyFactory(){
                
                $.static(function($, µ, _){
                    
                    // factory for ClassA
                    $.public(function createClassA(num){
                        var instance = $.new(OODK.myProject.ClassA);

                        instance.setValue(num);

                        return instance;
                    });

                    // factory for ClassB
                    $.public(function createClassB(){

                        // define a loose dependency 
                        // ClassB is loaded only if it needs to
                        $.import('{workspace}/myProject/ClassB');

                        return $.new(OODK.myProject.ClassB);
                    });
                });
                
              });
          });

          // class located in {workspace}/myProject/ClassA.js
          OODK('myProject', function($, _){

              $.public().class(function ClassA(){

                $.private('val');

                $.public(function setValue(val){
                    _.val = val;
                });
                
                $.public(function calculateSum(val){
                    // without the MyFactory class we generate
                    // therefore ClassA would be dependent of ClassB
                    // var b = $.new($.ns.ClassB);

                    // thanks to the Factory design pattern
                    // ClassA is only dependant of MyFactory 
                    var b = $.ns.MyFactory.self.createClassB();

                    return b.calculateSum(_.val, val);
                });
              });
          });

          // class located in {workspace}/myProject/ClassB.js
          OODK('myProject', function($, _){

              $.public().class(function ClassB(){
                
                $.public(function calculateSum(v1, v2){                    
                    return (v1 + v2);
                });
              });
          });

          // code located in main.js
          // main is only dependant of MyFactory
          // all together, both ClassA and main are dependant of a unique class MyFactory
          // otherwise main would be dependant of ClassA, ClassA would be dependant of ClassB
          // on this basic example it could appear not really valueable but on large project it can saves time
          // and enhanced the evolutitivity of the software
          OODK(function($, _){

              // define dependencies for Class MyFactory
              // ClassB is loosely dependant of MyFactory as we don't need to specify this dependency
              $.dependency('{workspace}/myProject/MyFactory', '{workspace}/myProject/ClassA');
              
              $.import('{workspace}/myProject/MyFactory');

              var a = OODK.myProject.MyFactory.self.createClassA(1);

              $.log(a.calculateSum(2)); // outputs 3
          });
          </pre>

          <p>The second approach is based on <a href="#doc-keyword-proxy">proxy</a></p>

          <p>It suits if you don't need to implements a custom logic for the method that generates the instance.</p>

          <pre>
          $.public().class(function MyFactory(){

            $.static(function($, µ, _){
            
                // factory for class ClassA
                $.proxy(_.ns.ClassA).public('createClassA');

                // factory for class ClassB
                $.proxy(_.ns.ClassB).public('createClassB');
            });
          });
          </pre>

          <a name="design-pattern-observer"></a>
          <h3 class="namespace-header">Observer</h3>

          <p>The observer design pattern define a relation between an object, the observable, and one to many different objects, the observers, in a way that when a change occured on the states of the observable, observers are automatically be notified and can act occordingly to reflect this changes.</p>

          <p>The most known example is, in the context of an MVC application, when a model change (the observable), related views (the observers) update their display to reflect the change occured in the model.</p>

          <p>The Observer API has been designed specifically for this purpose andthe following examples show how to implement this use case.</p>

          <pre>
          &lt;!DOCTYPE html&gt;
          &lt;html&gt;
          &lt;head&gt;
          &lt;script src="../src/oodk.js"&gt;&lt;/script&gt;
          &lt;script src="lib/jquery-1.12.0.min.js"&gt;&lt;/script&gt;
            
              &lt;script&gt;
              $.noConflict();

              OODK.config({
                'path': {
                  'oodk': '../src',
                  'workspace': 'workspace'
                }
              });

              OODK(function($, _){

                  $.import('{oodk}/api/Observer');

                  // The model of our application: an employee has an id which not been changed once defined, a name and an age
                  // must implements the Observable interface and the related __notify method 
                  $.implements(OODK.foundation.Observable).class(function Employee($, µ, _){

                      // declared employee's name to be observable 
                      $.observable().private("name");

                      // declared employee's age to be observable 
                      $.observable().private("age");

                      // the employee's id is not going to change once define, we don't need to observe changes on it
                      $.private("id");

                      $.public(function __initialize(id){
                        _.id = id;
                      });

                      $.public(function setName(name){
                        _.name = name;
                      });

                      $.public(function setAge(age){
                        _.age = age;
                      });

                      $.public(function getId(){
                        return _.id;
                      });

                      // __notify is called after one of the obersvable properties (name or age) as changed
                      // provides as argument the name of the property, the new value as well as the value before the change
                      $.private(function __notify(propertyName, newValue, oldValue){

                        // we define a custom message to send the observers ...
                        var message = {'propertyName': propertyName, 'newValue': newValue, 'oldValue': oldValue};

                        // ... and notify them
                        $.notify(this, message);
                      });
                  });
                    
                  // The summary view displays only the name and age of an employee
                  // must implements the Observer interface and the related update method
                  $.implements(OODK.foundation.Observer).class(function ViewEmployeeSummary($, µ, _){

                      // the update method is called by the notify keyword
                      $.private(function update(observable, message){

                        // if the view does not exists yet render it
                        if(jQuery('#view-summary').size() === 0){

                          var tmpl = '&lt;div id="view-summary"&gt;&lt;h4&gt;View Summary - Employee &lt;/h4&gt;';

                          tmpl += '&lt;p&gt;&lt;span class="employee-name"&gt;&lt;/span&gt;: &lt;span class="employee-age"&gt;&lt;/span&gt;&lt;/p&gt;';

                          tmpl += '&lt;/div&gt;';
                          
                          jQuery("#employee").append(tmpl);
                        }

                        // update tml tag(s) related to the property
                        if(message.propertyName == 'name'){
                          jQuery('#view-summary .employee-name').text(message.newValue);
                        }else if(message.propertyName == 'age'){
                          jQuery('#view-summary .employee-age').text(message.newValue);
                        }
                      });
                  });

                  // The full view displays all informations of an employee
                  $.implements(OODK.foundation.Observer).class(function ViewEmployeeFull($, µ, _){

                      // the update method is called by the notify keyword
                      $.private(function update(observable, message){

                        // if the view does not exists yet render it
                        if(jQuery('#view-full').size() === 0){

                          var tmpl = '&lt;div id="view-full"&gt;';

                          tmpl += '&lt;h4&gt;View Full - Employee &lt;span class="employee-name">&lt;/span&gt;&lt;/h4&gt;';

                          tmpl += '&lt;p&gt;Id: ' + observable.getId() + '&lt;/p&gt;';

                          tmpl += '&lt;p&gt;name: &lt;span class="employee-name"&gt;&lt;/span&gt;&lt;/p&gt;';

                          tmpl += '&lt;p&gt;age: &lt;span class="employee-age"&gt;&lt;/span&gt;&lt;/p&gt;';

                          tmpl += '&lt;/div&gt;';

                          jQuery("#employee").append(tmpl);
                        }

                        // update tml tag(s) related to the property
                        if(message.propertyName == 'name'){
                          jQuery('#view-full .employee-name').text(message.newValue);
                        }else if(message.propertyName == 'age'){
                          jQuery('#view-full .employee-age').text(message.newValue);
                        }
                      });
                  });

                  jQuery(document).ready(function(){

                    // instantiate the observable model, employee jack
                    var employeeJack = $.new(_.Employee, 1);

                    // instantiate the summary view
                    var viewSummary = $.new(_.ViewEmployeeSummary);

                    // instantiate the full view
                    var viewFull = $.new(_.ViewEmployeeFull);

                    // bind the model with the summary view 
                    $.observe(viewSummary, employeeJack);

                    // bind the model with the full view 
                    $.observe(viewFull, employeeJack);

                    // at this point all changes made to employee jack are automatically reflected to the summary and full views

                    // set data of employeee jack
                    employeeJack.setName('jack');
                    employeeJack.setAge(35);

                    jQuery('#changeEmployeeAge').bind('click', function(evt){

                      // update age of jack
                      employeeJack.setAge(40);
                    });

                    jQuery('#changeEmployeeName').bind('click', function(evt){

                      // update name of jack
                      employeeJack.setName("paul");
                    });
                  });

               });

               &lt;/script&gt;
          &lt;/head&gt;
          &lt;body&gt;
          
          &lt;div id="employee"&gt;&lt;/div&gt;

          &lt;p>&lt;button id="changeEmployeeAge"&gt;New age&lt;/button&gt;&lt;/p&gt;

          &lt;/body&gt;
          &lt;/html&gt;
          </pre>

          <p>This second example show hows to implements the Observer design pattern on <a href="#doc-keyord-dynamic">dynamic</a> classes.</p>

          <p><a href="#doc-keyord-dynamic">Dynamic</a> and <a href="#doc-keyord-mutable">mutable</a> classes does not have to declared their properties as the <a href="#doc-keyord-observable">observable</a> keyword cannot be used in this case.</p>

          <p>Requirements of this example are to implement a collection to handle a set of model.</p>

          <p>The collection should notify its obervers when a model is added or removed as well as one of the observable property's model changed.</p>

          <pre>
          &lt;!DOCTYPE html&gt;
          &lt;html&gt;
          &lt;head&gt;

              &lt;script src="../src/oodk.js"&gt;&lt;/script&gt;
              &lt;script src="lib/jquery-1.12.0.min.js"&gt;&lt;/script&gt;
            
              &lt;script&gt;
              $.noConflict();

              OODK.config({
                'path': {
                  'oodk': '../src',
                  'workspace': 'workspace'
                }
              });

              OODK(function($, _){

                $.import('{oodk}/api/Observer', '{oodk}/api/Typing');

                $.implements(OODK.foundation.Observable).class(function Employee($, µ, _){

                    $.observable().private("name");

                    $.observable().private("age");

                    $.private("id");

                    $.public(function __initialize(id){
                        _.id = id;
                    });

                    $.args(String).public(function setName(name){
                        _.name = name;
                    });

                    $.string().public(function getName(){
                        return _.name;
                    });

                    $.args(OODK.int).public(function setAge(age){
                        _.age = age;
                    });

                    $.int().public(function getAge(){
                        return _.age;
                    });

                    $.int().public(function getId(){
                        return _.id;
                    });

                    $.private(function __notify(key, newValue, oldValue){

                        var message = {'propertyName': key, 'newValue': newValue, 'oldValue': oldValue};

                        $.notify(this, message);
                    });
                });
              

                // The CollectionEmployees implements the observable interface a swell as the obersver interface as we want the
                // collection to be able to forward changes made on one of its model to ist observers
                // Thanks to this architecture, observers oberve only one instance, the collection class for all changes made
                // on the collection or on one of its stored model.   
                $.dynamic().implements(OODK.foundation.Observer, OODK.foundation.Observable).class(function CollectionEmployees($, µ, _){

                  // add a model to the collection
                  $.args(_.ns.Employee).public(function add(model){

                    var key = model.getId();

                    // test if the model is not already stored in the collection
                    if(!_.hasOwnProperty(key)){

                        // assign the model to the private context using the key passed as argument
                        _[key] = model;

                        // call manually the behavior method __notify passing an extra eventName, in this case itemAdded
                        // to identify easily the nature of the message
                        _.__notify(key, model, undefined, 'itemAdded');

                        // observe the model to forward notifications to its own observers
                        // when one of the observable properties of the model change.
                        $.observe(this, model);
                    }
                  });

                  // remove a model from the collection
                  $.args(_.ns.Employee).public(function remove(model){

                    var key = model.getId();

                    // test if the model exists in the collection
                    if(_.hasOwnProperty(key)){

                        delete _[key];

                        // call manually the behavior method __notify passing an extra parameter 'itemRemoved'
                        _.__notify(key, undefined, model, 'itemRemoved');
                    }
                  });

                  // notify observers
                  $.private(function __notify(key, newModel, oldModel, eventName){

                    var message = {'property': key, 'newModel': newModel, 'oldModel': oldModel, 'eventName': eventName};

                    $.notify(this, message);
                  });

                  // serve as a proxy method to forward changes occured on one 
                  // of the observable properties of one of the stored model
                  $.public(function update(observable, message){

                    message.model = observable;

                    message.eventName = 'propertyChanged';

                    // broadcast notifications to its own list of observers
                    $.notify(this, message);
                  });
                });

                // The list view displays the employees as a html table
                $.implements(OODK.foundation.Observer).class(function ViewEmployeeList($, µ, _){

                    // called when an imte is added, removed, or one of the property of the stored model changed
                    $.private(function update(observable, message){

                        var tmpl;

                        // if the view does not exists yet render it
                        if(jQuery('#view-list').size() === 0){

                          tmpl = '&lt;div id="view-list"&gt;';

                          tmpl += '&lt;h4&gt;View List - Employees&lt;/h4&gt;';

                          tmpl += '&lt;table&gt;';

                          tmpl += '&lt;thead&gt;';

                          tmpl += '&lt;tr&gt;&lt;th&gt;Name&lt;/th&gt;&lt;th&gt;Age&lt;/th&gt;&lt;/tr&gt;';

                          tmpl += '&lt;/thead&gt;';

                          tmpl += '&lt;tbody&gt;&lt;/tbody&gt;';

                          tmpl += '&lt;/table&gt;';

                          tmpl += '&lt;/div&gt;';

                          jQuery("#employee").append(tmpl);
                        }

                        if(message.eventName === 'propertyChanged'){
                            // one of the observable properties of the model as changed
                            // reflect this change to the table
                            if(message.propertyName === 'name'){
                                jQuery('#employee-'+message.model.getId()+ ' > .employee-name').text(message.newValue);
                            }else if(message.propertyName === 'age'){
                                jQuery('#employee-'+message.model.getId()+ ' > .employee-age').text(message.newValue);
                            }
                        }else if(message.eventName === 'itemAdded'){

                            // a new model employee is added
                            // add a line to the html table

                            tmpl = '&lt;tr id="employee-' + message.newModel.getId() + '"&gt;';

                            tmpl += '&lt;td class="employee-name"&gt;' + message.newModel.getName() + '&lt;/td&gt;';

                            tmpl += '&lt;td class="employee-age"&gt;' + message.newModel.getAge() + '&lt;/td&gt;';

                            tmpl += '&lt;/tr&gt;';

                            jQuery("#view-list > table > tbody").append(tmpl);

                        }if(message.eventName === 'itemRemoved'){
                            
                            // an exsiting model employee is removed from the collection
                            // delete the corresponding line of the html table

                            jQuery('#employee-'+message.oldModel.getId()).remove();
                        }
                    });
                });

                jQuery(document).ready(function(){

                    // instantiate the observable model, employee jack
                    var employeeJack = $.new(_.Employee, 1);

                    // instantiate the observable model, employee jack
                    var employeeAnna = $.new(_.Employee, 2);

                    // instantiate the observable model, employee jack
                    var employeePaul = $.new(_.Employee, 3);

                    // instantiate the collection
                    var employeeList = $.new(_.CollectionEmployees);

                    // instantiate the list view
                    var viewList = $.new(_.ViewEmployeeList);

                    // bind the model with the view 
                    $.observe(viewList, employeeList);

                    employeeList.add(employeeJack);
                    employeeList.add(employeeAnna);
                    employeeList.add(employeePaul);

                    employeeJack.setName('Jack');
                    employeeJack.setAge(30);

                    employeeAnna.setName('Anna');
                    employeeAnna.setAge(25);

                    employeePaul.setName('Paul');
                    employeePaul.setAge(40);

                    jQuery('#changeEmployeeAnnaAge').bind('click', function(evt){
                        employeeAnna.setAge(26);
                    });

                    jQuery('#addEmployeeRobert').bind('click', function(evt){
                        
                        var employeeRobert = $.new(_.Employee, 4);

                        employeeList.add(employeeRobert);

                        employeeRobert.setName('Robert');
                        employeeRobert.setAge(32);
                    });

                    jQuery('#removeEmployeePaul').bind('click', function(evt){
                        employeeList.remove(employeePaul);
                    });
                });
                
               });
               &lt;/script&gt;
          &lt;/head&gt;
          &lt;body&gt;
          
          &lt;div id="employee"&gt;&lt;/div&gt;

          &lt;p&gt;
            &lt;button id="changeEmployeeAnnaAge"&gt;New age for Anna&lt;/button&gt;&gt;br/&gt;
            &lt;button id="addEmployeeRobert"&gt;Add employee Robert&lt;/button&gt;&gt;br/&gt;
            &lt;button id="removeEmployeePaul"&gt;Remove employee Paul&lt;/button&gt;
          &lt;/p&gt;

          &lt;/body&gt;
          &lt;/html&gt;
          </pre>

          <a name="design-pattern-proxy"></a>
          <h3 class="namespace-header">Proxy</h3>

          <p>The proxy design pattern defines a class as a substitute of an another class.</p>

          <p>OODK provides a <a href="#doc-keyword-proxy">proxy</a> keyword to implements easily this design pattern.</p>

          <p>This first example shows how to declare a class as proxy of a target class.</p>

          <pre>
          // code located in {workspace}/myProject/ClassA.js

          OODK('myProject', function($, _){

              // ClassA is declared private and therefore only accessible inside the myProject namespace
              $.class(function ClassA(){

                $.private("a");

                $.public(function __initialize(a){
                    _.a = a;
                });
                
                $.public(function getA(){
                    return _.a;
                });

                $.public(function sum(b){
                    return (this.getA()+b);
                });
              });

              // ClassProxyA is declared public and accessible from any scope
              // As proxy of ClassA, ProxyClassA serves as subsitute of ClassA 
              // Only method sum is exposed, other methods of the class stay unvisible from the outer world
              $.public().proxy(_.ClassA).class(function ClassProxyA(){
                
                $.proxy().public('sum');
              });
          });

          // code implemented in main.js
          OODK(function($, _){

              $.import('{workspace}/myProject/ClassA');

              // instantiation of ClassProxyA automatically generates an instance of ClassA
              var a = $.new(OODK.myProject.ClassProxyA, 10);

              $.log(a.sum(2)); // outputs 12
          });
          </pre>

          <p>This second example shows a different implementation of the proxy design pattern using proxy members.</p>

          <pre>
          // code located in '{workspace}/myProject/ClassA'
          OODK(function($, _){

            // ClassA is declared private to myProject
            $.class(function ClassA($, µ, _){

                $.private("a");

                $.public(function __initialize(a){
                    _.a = a;
                });
                
                $.public(function getA(){
                    return _.a;
                });
            });

            // following instances of ClassA stay local this scope
            // and not accessible anywhere else
            var a1 = $.new(_.ClassA, 10);

            var a2 = $.new(_.ClassA, 100);

            var a3 = $.new(_.ClassA, 1000);
            
            // ProxyClassA, declared public, exposed method getA of a1, a2, and a3
            // through methods getA, getB, and getC
            $.public().class(function ProxyClassA($, µ, _){
                
                $.proxy(a1, 'getA').public('getA');

                $.proxy(a2, 'getA').public('getB');

                $.proxy(a3, 'getA').public('getC');
            });

          });

          // code located in main.js
          OODK(function($, _){

            $.import('{workspace}/myProject/Class');

            var p = $.new(OODK.myProject.ProxyClassA);

            $.log(p.getA()); // outputs 10

            $.log(p.getB()); // outputs 100

            $.log(p.getC()); // outputs 1000
          });
          </pre>

          <p>This following example shows an implementation of the Remote proxy design pattern.</p>

          <p>It uses the <a href="#foundation-util-RemoteProxy">RemoteProxy</a> class as interface between the proxy class and a distant php script.</p>

          <p>The RemoteProxy handles XHRequest to communicate with the distant script and transmit the result to proxy method.</p>

          <pre>
          // On server side the api.php script performed the operation
          // this a really basic script, no security nor validation is made on data
          // it serves only to demonstrate how to implements a remote proxy unsing OODK 
          &lt;?php

            $method = $_GET['m'];

            $v1 = $_POST['v1'];

            $v2 = $_POST['v2'];

            if($method === 'sum'){
                $r = ($v1 + $v2);
            }else if($method === 'sub'){
                $r = ($v1 - $v2);
            }

            header('Content-type: application/json');

            echo json_encode(array('result' => $r));

            die;

          ?&gt;

          // on browser side, implements the remote proxy
          OODK(function($, _){
          
              // import the RemoteProxy class used to define the logic of the remote invocation
              $.import('{oodk}/foundation/utility/RemoteProxy');

              // pass the acces url to the php script to the initializer 
              // it can be done as well using the setUrl method
              var remoteProxy = $.new(OODK.foundation.util.RemoteProxy, 'http://myhost/api.php');

              // implements the logic to prepare the request depending on the source method requesting the remote call.
              // provides as first argument the XHRequest. 
              remoteProxy.beforeSend(function(xhrequest){

                var method, args;

                // get the source method name of the call
                method = this.getMethodName();

                // define the url get parameter to identity the current requested operation
                if(method == 'sum'){
                    xhrequest.getUrl().setSearchFragment('m', 'sum');
                }else if(method == 'sub'){
                    xhrequest.getUrl().setSearchFragment('m', 'sub');
                }

                // get arguments passed to the source method (1 and 2 in this example)...
                args = this.getArguments();

                // ... and inject it as post parameters of the request
                xhrequest.setPostFragment('v1', args[0]);
                xhrequest.setPostFragment('v2', args[1]);
              });

              // implements the logic once the request is done, 
              // to transmit the result to the source method
              // or an error if the request has failed
              remoteProxy.onComplete(function(xhresponse){

                if(xhresponse.hasSucceeded()){

                  // request has succeeded transmit the result

                  // as the php script send a content-type: application/json header
                  // calling the get method of the response automatically parse the json string 
                  // and return a js object
                  var json = xhresponse.get();
                    
                  // transmit the result to the source method
                  this.setResult(json.result);
                }else{

                  // in case of failure, transmit the error the source method which broadcast it 
                  this.setError($.new(OODK.foundation.Exception, "RemoteProxy request on error"));
                }
              });

              // RemoteCalculator is declared as a remote proxy using the remoteProxy instance as definition.
              // Each time the sum or sub method is called, the RemotePoxy send a XHRequest to the php script
              // and transmit back the result to the method
              $.public().proxy(remoteProxy).class(function RemoteCalculator($, µ, _){

                // remote proxy for the sum calculation of two numbers
                $.proxy().public('sum');

                // remote proxy for the substraction of two numbers
                $.proxy().public('sub');
              });

              var a = $.new(this.RemoteCalculator);

              $.log(a.sum(1, 2)); // outputs 3

              $.log(a.sub(1, 2)); // outputs -1
          });
          </pre>

          <a name="design-pattern-singleton"></a>
          <h3 class="namespace-header">Singleton</h3>

          <p>The purpose of the singleton design pattern is to reduce the instantation of a class to a unique instance.</p>

          <p>It is used mainly as optimization to avoid genetaring multiple useless instance.</p>

          <pre>
          $.import('{oodk}/api/Cloneable');

          // for a complete implementation of the singleon design pattern
          // the class does not implement the Cloneable interface
          $.public().class(function Configurator($, µ, _){

            // delcare the initializer as private
            // to avoid outside instanciatation 
            $.private(function __initialize(){});
            
            $.static(function($, µ, _){

                // store the instance in a static private property
                $.private('instance');
                
                // generate the instance if not yet defined
                // As the new instance is called in the static context of the class
                // access to the initializer is authorized 
                $.public(function getInstance(){
                    
                    if(!$.isset(_.instance)){
                        _.instance = $.new($.ns.Configurator);
                    }

                    return _.instance;
                });
            });
          });

          var config = this.Configurator.self.getInstance();

          var config2 = this.Configurator.self.getInstance();

          $.log(config === config2); // outputs true

          $.new(this.Configurator); // throw an exception as the initializer is declared as private
          // and cannot instantiated outside of its context

          $.clone(config); // throws a OODK.foundation.CloneNotSupportedException as class Configurator 
          // does not implements the Cloenable interface 
          </pre>
        </div>
      </div>
    </div>

   
</body>
</html>