[OODK-JS](http://www.oodkjs.org/) — Oriented-Object Development Kit for JavaScript
==================================================

Concept
--------------------------------------

<p>OODK-JS, <b>O</b>riented-<b>O</b>bject <b>D</b>evelopment <b>K</b>it for <b>J</b>ava<b>S</b>cript is a all-in-one JavaScript library, that enriched JavaScript with all of the OOP concepts: <b>encapsulation</b>, <b>inheritance</b>, <b>overriding</b>, <b>polymorphism</b>, <b>interface</b>, <b>abstraction</b>, <b>namespace</b>.</p>

<p>Additional API are also available working around OOP concepts: conversion, cloning, serialization, iteration, comparison, sorting, debugger, reflection, event, typing, threading, RMI...</p>

<p>The purpose of OODK-JS is to bring to JavaScript additional pseudo-keywords to create classes, interfaces and namespaces without to install a separate compiler or learn a new language.</p>

OODK-JS in a glance
--------------------------------------

Here is a simple class declaration written with OODK-JS compare to the exact same implementation in PHP.

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

<pre>
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



Environments in which to use OODK
--------------------------------------

OODK is supported on browser side only (in the context of a web page page or a webworker). 

NodeJS integration is on the roadmap of the next release.


Doc
--------------------------------------

A full documentation is available under the doc directory.


Test
--------------------------------------

A complete test suite is at disposal under the test directory.

However all use cases are surely not been tested, the best things to contribute is to use it on your own project and give your feedback.


Integration
--------------------------------------

Integration is really easy as OODK-JS is a all-in-one library.

<script src="path/to/source/folder/oodk.js"></script>