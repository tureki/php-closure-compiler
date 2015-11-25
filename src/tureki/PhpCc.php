<?php

namespace tureki;

/**
 * PHP Closure Compiler
 * A PHP Library to use Google Closure Compiler compress Javascript
 *
 * @copyright tureki.org
 * @author tureki
 *
 **/
class PhpCc
{

    public function __construct($options)
    {
        $this->options = array(
            'java_file'    => 'java',
            'jar_file'     => __DIR__.'/vendor/closure-compiler/compiler.jar',
            'output_path'  => '/',
            'optimization' => 'SIMPLE_OPTIMIZATIONS',
            'charset'      => 'utf-8',
            'sort'         => true,
        );

        $this->options = array_merge($this->options, $options);
        
        $this->reset();
    }
    
    /**
     * Add javascript file to compiler list
     *
     * @param string $file
     * @return self
     */
    public function add($file)
    {
        if (is_array($file)) {
            $this->js_files = array_merge($this->js_files, $file);
        } else {
            $this->js_files[] = $file;
        }

        return $this;
    }

    /**
     * Execute compiler.
     *
     * @param string $filename
     * @return self
     */
    public function exec($filename = 'all.min.js')
    {
        $str_file = '';

        if (substr($this->js_dir, -1)=="/") {
            $this->js_dir = substr($this->js_dir, 0, strlen($this->js_dir)-1);
        }

        if ($this->bol_single) {
            $ary_result = array();
            
            $num_js     = count($this->js_files);

            for ($i=0; $i < $num_js; $i++) {
                $str_file     = ' --js ' . $this->js_files[$i];
                
                $filename     = basename($this->js_files[$i]);
                
                $ary_result[] = $this->_getArgv($str_file, $filename);
            }

            $num_js = count($this->js_files_dir);

            for ($i=0; $i < $num_js; $i++) {
                $str_file     = ' --js ' . $this->js_files_dir[$i];

                $filename     = str_replace($this->js_dir, '', $this->js_files_dir[$i]);

                $ary_result[] = $this->_getArgv($str_file, $filename);
            }


            return $ary_result;
        } else {
            if (count($this->js_files_dir)>0) {
                $this->js_files = array_merge($this->js_files, $this->js_files_dir);
            }

            $this->js_files = array_unique($this->js_files);
            
            $opt        = $this->_getOptions();

            if ($opt['sort']) {
                sort($this->js_files);
            }
            
            $num_js         = count($this->js_files);

            for ($i=0; $i < $num_js; $i++) {
                $str_file .= ' --js ' . $this->js_files[$i];
            }

            return $this->_getArgv($str_file, $filename);
        }
    }

    /**
     * Help method will return "Closure Compiler --help" when setting success
     *
     * @return array
     */
    public function help()
    {
        $str_cmd = $this->_getCmd() . ' --help';

        return $this->_exec($str_cmd);
    }

    /**
     * Compress all js to one file.
     *
     * @return self
     */
    public function merge()
    {
        $this->bol_single = false;

        return $this;
    }

    /**
     * Add command param. exp:--angular_pass
     *
     * @param string $param
     * @param string $value
     * @return self
     */
    public function param($param, $value = null)
    {
        if ($value) {
            $str_param = $param ." ". $value;
        } else {
            $str_param = $param;
        }

        $this->shell_params[] = $str_param;

        return $this;
    }

    /**
     * Reset all setting.
     *
     * @return self
     */
    public function reset()
    {
        $this->bol_single   = false;
        
        $this->js_dir       = '';
        
        $this->js_files     = array();
        
        $this->js_files_dir = array();
        
        $this->shell_params = array();

        return $this;
    }

    /**
     * Set directory you want to compiler
     *
     * @param string $path
     * @param array $ext
     * @return class phpcc
     */
    public function setDir($path, $ext = array('js'))
    {
        $this->js_dir = $path;

        $cls_objects = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($path)
        );

        foreach ($cls_objects as $str_name) {
            $str_filetype = pathinfo($str_name, PATHINFO_EXTENSION);

            if (in_array(strtolower($str_filetype), $ext)) {
                $this->js_files_dir[] = $str_name;
            }
        }

        return $this;
    }

    /**
     * Do not merge javascript files
     *
     * @return class phpcc
     */
    public function single()
    {
        $this->bol_single = true;

        return $this;
    }
    
    private function _create($file_path)
    {
        if (!file_exists($file_path)) {
            $pathinfo = pathinfo($file_path);

            $path = $pathinfo["dirname"];

            try {
                if (!file_exists($path) || !is_writeable($path)) {
                    mkdir($path, 0777, true);
                    touch($file_path);
                }
                return true;
            } catch (Exception $e) {
                return false;
            }
        }
    }

    private function _exec($str_cmd)
    {
        exec($str_cmd. ' 2>&1', $out, $status);

        return array(
            'shell'   => $str_cmd,
            'out'     => $out,
            'status' => $status
        );
    }

    private function _getArgv($str_file, $filename)
    {
        $opt        = $this->_getOptions();
        
        $str_output = $opt["output_path"].$filename;
        
        $str_param  = implode(" ", $this->shell_params);
        
        $str_cmd    = $this->_getCmd();
        
        $str_cmd    .= ' '. $str_param.' '. $str_file;

        $this->_create($str_output);

        if (!empty($str_file)) {
            $str_cmd .=
            ' --compilation_level '.$opt['optimization'].
            ' --charset '.$opt['charset'].
            ' --js_output_file '.$str_output;
        }

        return $this->_exec($str_cmd);
    }

    private function _getCmd()
    {
        $opt = $this->_getOptions();

        $str_cmd = $opt['java_file'] . ' -jar ' . $opt['jar_file'];

        return $str_cmd;
    }

    private function _getOptions()
    {
        return $this->options;
    }
}
