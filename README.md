##PHP Closure Compiler

**phpcc** is a PHP Library to use Google Closure Compiler compress Javascript.
You can view information about Google Closure Compiler on this [link](https://developers.google.com/closure/compiler/).



##Installation

You can install the library with composer or manually.

#### Composer

Step 1. Edit your `composer.json`:

```json
{
    "require": {
        "tureki/phpcc": ">=1.0.5"
    }
}
```

Step 2. Install it:

```bash
$ curl -sS https://getcomposer.org/installer | php
$ php composer.phar install
```

#### Manually From Release

Step 1. [Download the latest release](https://github.com/tureki/php-closure-compiler/releases)

Step 2. Include the library:

```php
require_once '[path to phpcc]/phpcc.php';
```



## How to use

Download **phpcc** Library. and then require <code>phpcc.class.php</code> in your <code>.php</code> file. You can test <code>sample.php</code> in <code>samples</code> folder.

```php
require '../src/phpcc.php';

$phpcc = new tureki\PhpCc(array(
	'java_file'    => 'YOUR JAVA FILE PATH',
	'jar_file'     => '../src/compiler/compiler.jar', 
	'output_path'  => './output/',
	'optimization' => 'SIMPLE_OPTIMIZATIONS'
));
```



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
```php
$ary_result = $phpcc
                ->add("js/jquery-1.10.2.js")
                ->add("js/1.9/jquery-1.9.1.js")
                ->exec("all.js");
print_r($ary_result);
```



----

Set Directory path find <code>.js</code> file and combined compression to one file.
```php
$ary_result = $phpcc
                ->setDir("./js")
                ->exec("all.js");
print_r($ary_result);
```



----

Use <code>single()</code> can individual compression.
```php
$ary_result = $phpcc
                ->add("js/jquery-1.10.2.js")
                ->add("js/1.9/jquery-1.9.1.js")
                ->single()
                ->exec();
print_r($ary_result);
```
```php
$ary_result = $phpcc
                ->setDir("./js")
                ->single()
                ->exec();
print_r($ary_result);
```



----

You can also mixed.
```php
$ary_result = $phpcc
                ->add("js/jquery-1.10.2.js")
                ->add("js/1.9/jquery-1.9.1.js")
                ->setDir("./js")
                ->single()
                ->exec();
print_r($ary_result);
```



----

You can use <code>param()</code> add Closure Compiler command param.
```php
$ary_result = $phpcc
                ->add("js/jquery-1.10.2.js")
                ->param("--angular_pass")
                ->param("--formatting","PRETTY_PRINT")
                ->exec("all.js");
print_r($ary_result);
```



## Todo

a. Add Unit Test
b. Integrate CI

## Authors

**tureki**

+ [http://github.com/tureki](http://github.com/tureki)



## Copyright and License

Copyright 2013 tureki, under [MIT License](http://opensource.org/licenses/MIT).
