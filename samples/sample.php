<?php

    /**
     *include library.
     */
    require '../src/tureki/phpcc.php';

    /**
     * java_file
     *
     * Linux        "/usr/lib/jvm/jre-1.6.0/bin/java"
     * Window7      "C:\Program Files (x86)\Java\jre6\bin\java"
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
    $phpcc = new tureki\PhpCc(array(
        'java_file' => 'YOUR_JAVA_FILE_PATH',
        'output_path' => './output/',
        'optimization' => 'SIMPLE_OPTIMIZATIONS',
        'charset' => 'utf-8',
    ));

    /**
     * Test your phpcc setting.
     */
    print_r($phpcc->help());

    /**
     * Add jQuery file and combined compression
     */
    // $ary_result = $phpcc
    //              ->add("js/jquery-1.10.2.js")
    //              ->add("js/1.9/jquery-1.9.1.js")
    //              ->exec("all.js");
    // print_r($ary_result);

    /**
     * Add jQuery file and individual compression
     */
    // $phpcc->reset();
    // $ary_result = $phpcc
    //              ->add("js/jquery-1.10.2.js")
    //              ->add("js/1.9/jquery-1.9.1.js")
    //              ->single()
    //              ->exec();
    // print_r($ary_result);

    /**
     * Set Directory path find .js file and combined compression to one file.
     */
    // $phpcc->reset();
    // $ary_result = $phpcc
    //              ->setDir("js")
    //              ->exec("all.js");
    // print_r($ary_result);

    /**
     * Set Directory path . Auto find js file and individual compression
     */
    // $phpcc->reset();
    // $ary_result = $phpcc
    //              ->setDir("js")
    //              ->single()
    //              ->exec();
    // print_r($ary_result);

    /**
     * Mixed
     */
    // $phpcc->reset();
    // $ary_result = $phpcc
    //              ->setDir("js")
    //              ->add("js/1.9/jquery-1.9.1.js")
    //              ->exec();
    // print_r($ary_result);

    /**
     * You can use param() add Closure Compiler command param.
     */
    // $phpcc->reset();
    // $ary_result = $phpcc
    //              ->add("js/jquery-1.10.2.js")
    //              ->param("--angular_pass")
    //              ->param("--formatting","PRETTY_PRINT")
    //              ->exec("all.js");
    // print_r($ary_result);
