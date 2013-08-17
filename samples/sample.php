<?php

	/**
	 * Copyright tureki.org [tureki11@gmail.com]
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	/**
	 *include library 
	 */
	include_once '../src/phpcc.php';

	/**
	 * java_file 
	 *
	 * Linux		"/usr/lib/jvm/jre-1.6.0/bin/java"
	 * Window7 	"C:\Program Files (x86)\Java\jre6\bin\java"
	 */

	/**
	 * jar_file
	 *
	 * You can download source from http://code.google.com/p/closure-compiler/wiki/BinaryDownloads
	 */
	
	/**
	 * output_path
	 *
	 * Output path of compress file when success
	 */
	
	/**
	 * phpcc config
	 * @var phpcc
	 */
	$phpcc = new phpcc(array(
		'java_file'    => 'YOUR_JAVA_FILE_PATH',
		'jar_file'     => '../src/compiler/compiler.jar', 
		'output_path'  => './output/',
		'optimization' => 'SIMPLE_OPTIMIZATIONS',
		'charset'      => 'utf-8'
	));

	/**
	 * Test your phpcc setting. 
	 */
	// print_r($phpcc->help());

	/**
	 * Add jQuery file and combined compression
	 */
	$ary_result = $phpcc
					->add("js/jquery-1.10.2.js")
					->add("js/1.9/jquery-1.9.1.js")
					->exec("all.js");
	print_r($ary_result);

	/**
	 * Add jQuery file and individual compression 
	 */
	// $ary_result = $phpcc
	// 				->add("js/jquery-1.10.2.js")
	// 				->add("js/1.9/jquery-1.9.1.js")
	// 				->single()
	// 				->exec();
	// print_r($ary_result);

	/**
	 * Set Directory path find .js file and combined compression to one file.
	 */
	// $ary_result = $phpcc
	// 				->setDir("js")
	// 				->exec("all.js");
	// print_r($ary_result);

	/**
	 * Set Directory path . Auto find js file and individual compression 
	 */
	// $ary_result = $phpcc
	// 				->setDir("js")
	// 				->single()
	// 				->exec();
	// print_r($ary_result);
	
	/**
	 * Mixed 
	 */
	// $ary_result = $phpcc
	// 				->setDir("js")
	// 				->add("js/1.9/jquery-1.9.1.js")
	// 				->exec();
	// print_r($ary_result);
	
	/**
	 * You can use param() add Closure Compiler command param. 
	 */
	// $ary_result = $phpcc
	// 				->add("js/jquery-1.10.2.js")
	// 				->param("--angular_pass")
	// 				->param("--formatting","PRETTY_PRINT")
	// 				->exec("all.js");
	// print_r($ary_result);
?>