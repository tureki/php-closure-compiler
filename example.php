<?php
	
	//include library
	include 'src/phpcc.php';

	//java_file
	//Linux		"/usr/lib/jvm/jre-1.6.0/bin/java"
	//Window 	"C:\Program Files (x86)\Java\jre6\bin\java"

	//jar file
	//you can download source from http://code.google.com/p/closure-compiler/wiki/BinaryDownloads
	
	$phpcc = new phpcc(array(
		'java_file'    => 'YOUR_SYSTEM_JAVA',
		'jar_file'     => 'src/compiler/compiler.jar', 
		'output_path'  => './output/',
		'optimization' => 'SIMPLE_OPTIMIZATIONS',
		'charset'      => 'utf-8'
	));

	//test phpcc
	// print_r($phpcc->help());

	//test add file
	$data = $phpcc->add("example.js")
	->exec();

	print_r($data);
	
?>