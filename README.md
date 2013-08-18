##PHP Closure Compiler

**phpcc** is a PHP Library to use Google Closure Compiler compress Javascript.
You can view information about Google Closure Compiler on this [link](https://developers.google.com/closure/compiler/).



## How to use

Download **phpcc** Library. and then include <code>phpcc.class.php</code> in your <code>.php</code> file. You can test <code>sample.php</code> in <code>samples</code> folder.

<pre>
require '../src/phpcc.class.php';

$phpcc = new PhpCc(array(
	'java_file'    => 'YOUR JAVA FILE PATH',
	'jar_file'     => '../src/compiler/compiler.jar', 
	'output_path'  => './output/',
	'optimization' => 'SIMPLE_OPTIMIZATIONS'
));
</pre>



----

<code>java_file</code> is system java execute file path. 
<pre>
Example:
-   Linux:"/usr/lib/jvm/jre-1.6.0/bin/java"
-   Window7:"C:\Program Files (x86)\Java\jre6\bin\java"
</pre>




----

<code>jar_file</code> is Google Closure Compiler jar file. Your can download latest version on this [link](http://code.google.com/p/closure-compiler/wiki/BinaryDownloads)




----

After setting. use <code>help()</code> method to test **phpcc**. 
<pre>
print_r($phpcc->help());
</pre>



## How to compress

Add jQuery file and combined compression to one file.
<pre>
$ary_result = $phpcc
                ->add("js/jquery-1.10.2.js")
                ->add("js/1.9/jquery-1.9.1.js")
                ->exec("all.js");
print_r($ary_result);
</pre>



----

Set Directory path find <code>.js</code> file and combined compression to one file.
<pre>
$ary_result = $phpcc
                ->setDir("./js")
                ->exec("all.js");
print_r($ary_result);
</pre>



----

Use <code>single()</code> can individual compression.
<pre>
$ary_result = $phpcc
                ->add("js/jquery-1.10.2.js")
                ->add("js/1.9/jquery-1.9.1.js")
                ->single()
                ->exec();
print_r($ary_result);
</pre>
<pre>
$ary_result = $phpcc
                ->setDir("./js")
                ->single()
                ->exec();
print_r($ary_result);
</pre>



----

You can also mixed.
<pre>
$ary_result = $phpcc
                ->add("js/jquery-1.10.2.js")
                ->add("js/1.9/jquery-1.9.1.js")
                ->setDir("./js")
                ->single()
                ->exec();
print_r($ary_result);
</pre>



----

You can use <code>param()</code> add Closure Compiler command param.
<pre>
$ary_result = $phpcc
                ->add("js/jquery-1.10.2.js")
                ->param("--angular_pass")
                ->param("--formatting","PRETTY_PRINT")
                ->exec("all.js");
print_r($ary_result);
</pre>



## Authors

**tureki**

+ [http://github.com/tureki](http://github.com/tureki)



## Copyright and license

Copyright 2013 tureki, under [the Apache 2.0 license](LICENSE).
