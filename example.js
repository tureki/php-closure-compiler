/**
 * Copyright jsborn.org [tureki11@gmail.com]
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

(function(window) {

	var _q     = jQuery;

	var _s_e_o = "on";

	var _s_e_f = "off";
	//Compatible jQuery version below then 1.7
	if(_q.fn.jquery.split('.')[1]<7){
		_s_e_o = "bind";
		_s_e_f = "unbind";
	}

	var JSB = {

		version:'0.5a',

		event:{
			on  : _s_e_o,
			off : _s_e_f
		},

		data:{

			cores   : {},
			
			clss    : {},
			
			plugins : {},
			
			imports : []

		},

		config:{

			console:true,
			
			createImport :false,
			
			extendPlugins :[],

			importSetup:{
				library:'',
				source:'',
				jquery:'',
				parserURL:function(url){

					return url;

				}
			}

		},

		addListener:function(str_event,func_cb,ns_scope){

			_q(JSB)[JSB.event.on]('jsb.'+str_event,{scope:ns_scope},func_cb);

		},

		create: function(str_name,obj_options,bol_trigger_off) {

			var me = JSB;

			if(me.config.createImport){
				me._check_class(str_name);
			}

			var _ns_cls = me._get_class(str_name);

			if(!_ns_cls){
				me.echo("error","CLASS:NOT FIND",str_name);
				return false;
			}

			if(_ns_cls.config.abstr){
				me.echo("error","CLASS:ABSTR",str_name);
				return false;
			}

			if(!_ns_cls.config.nodes){
				_ns_cls.config.nodes = [];
			}

			if(_ns_cls.config.single&&_ns_cls.config.nodes.length>0){
				me.echo("error","CLASS:SINGLE",str_name);
				return false;
			}

			var _ns = new _ns_cls["cls"](obj_options);

			_ns_cls.config.nodes.push(_ns);

			if(!bol_trigger_off){
				_q(me).triggerHandler('jsb.create',_ns);	
			}
			

			return _ns

		},

		echo:function(str_type){

			if(console&&JSB.config.console){
				
				if(console[str_type]){

					console[str_type](arguments);

				}else{

					JSB.echo("log","console no "+str_type+" method.");

				}

			}

		},

		extendCore:function(str_ns,ns_class){

			if(!JSB.core){
				JSB.core = {};
			}

			var _ns_class_proto = ns_class["cls"].prototype;
			
			var _str_name       = ns_class.config.name;
			
			if(JSB._get_core(_str_name)){

				JSB.echo("log","Core: "+ _str_name +" already register.");

				return JSB._get_core(_str_name);

			}

			ns_class["config"] = _q.extend(ns_class["config"],{
				single:true,
				abstr:false,
				plugin:false,
				core:true
			});

			JSB.core[str_ns] = JSB.create(_str_name);

			JSB.data.cores[_str_name] = JSB.core[str_ns];

			return JSB.core[str_ns];

		},

		extendPlugin:function(ns_class){

			var _ns_class_proto = ns_class["cls"].prototype;
			
			var _ary_depends    = _ns_class_proto.depends;
			
			var _str_name       = ns_class.config.name;

			var me = JSB;
			//check plugin
			if(me._get_plugin(_str_name)){

				me.echo("log","Plugin: "+ns_class+" already register.");
				
				return me._get_plugin(_str_name);
			
			}
			//check plugin depend
			if(_q.isArray(_ary_depends)){

				for (var i = 0; i < _ary_depends.length; i++) {
					
					if(!me._check_class(_ary_depends[i])){
						me.echo("error","PLUGINS:"+_str_name+" depends CLASS:"+_ary_depends[i]+" not found");
					}

				};
			}

			ns_class["config"] = _q.extend(ns_class["config"],{
				single:true,
				abstr:false,
				plugin:true,
				core:false
			});

			me.data.plugins[_str_name] = me.create(_str_name);

			return me.data.plugins[_str_name];

		},

		getClassData: function() {

			return JSB.data.clss;

		},

		getImportData: function() {

			return JSB.data.imports;

		},

		importClass: function(_str_import) {

			var _str_url  = '';
			
			var _bool_status = true;

			if (JSB._check_import(_str_import)) {
				return true;
			}

			_str_url = JSB._parser_url(_str_import);

			_str_url = JSB.config.importSetup.parserURL(_str_url);

			_q.ajax({

				url      : _str_url,
				
				dataType : "script",

				cache	 : true,

				async    : false,
				
				error    : function(jqXHR, textStatus, errorThrown) {

					_bool_status = false;

					JSB.echo("error","Require:" + _str_url + " Message:" + errorThrown);

				},
				success  : function() {
					
					JSB.data.imports.push({
						name: _str_url,
						status: _bool_status
					});

				}

			});

			return _bool_status;

		},

		removeListener:function(str_event){

			_q(JSB).off('jsb.'+str_event);

		},

		require:function(ary_source,scope){

			var _ary_def = [];

			var _int_id = "req:"+(new Date()).getTime();

			scope = scope?scope:JSB;

			for (var i = 0; i < ary_source.length; i++) {
				
				_ary_def.push(_q.ajax({

					url      : ary_source[i],
					
					dataType : "script",
					
					cache	 : true,

					timeout:3000

				}));

			};

			return _q.when.apply(_q, _ary_def);

		},

		setConfig:function(obj){

			var me = this;

			_q.extend(true,me.config, obj)

			return me.config;

		},

		_check_import: function(_str_import) {

			for (var i = 0; i < JSB.data.imports.length; i++) {

				if (JSB.data.imports[i]["name"] == _str_import) {

					JSB.echo("log","same", JSB.data.imports[i], _str_import);

					return true;

				}

			};

			return false;

		},

		_check_class: function(_str_cls) {

			var me = this;

			if (!me._get_class(_str_cls)) {

				return me.importClass(_str_cls);

			}

			return true;

		},

		_init: function() {

			var me = this;

			me._init_oop();

		},

		_init_oop: function() {

			var me = this;

			me.cls = function(name, obj) {

				if (me._get_class(name)) {

					me.echo("warn","CLASS:'" + name + "' define again");

					return true;

				}

				var _jsb_cls = function(options) {

					var _str_extend = this.extend;

					if (_str_extend) {

						me._check_class(_str_extend);

						_q.extend(
							_jsb_cls.prototype, 
							me.cls.prototype, 
							me._get_class(_str_extend)["cls"].prototype, 
							obj
						);

					}

					var _ns_class = me._get_class(name);

					obj.plugins = obj.plugins?obj.plugins:[];

					if(!_ns_class.config.plugin&&!_ns_class.config.core){

						this.plugins = this.plugins?this.plugins:[];

						this.plugins = _q.merge(this.plugins, obj.plugins);

						this.plugins = _q.merge(this.plugins,me.config.extendPlugins);
						var _ary_result = [];
						_q.each(this.plugins, function(i, e) {
							if (_q.inArray(e, _ary_result) == -1){
								_ary_result.push(e);
							}
						});
						this.plugins = _ary_result;

					}

					this.className = name;

					this._count = 0;

					this._destroy = false;

					this._ary_extend = [];

					this._ary_plugin = [];
					//class plugin init
					this._plugin_init(_jsb_cls);
					//class extend init
					this._extend(this);
					//import class
					this._import();

					this.initialize(options);
					//super
					this.SUPER();

					delete this._count;

					return true;

				};

				_q.extend(_jsb_cls.prototype, me.cls.prototype, obj);

				if(obj.single!==true){
					obj.single = false;
				}

				if(obj.abstr!==true){
					obj.abstr = false;
				}

				me.data.clss[name] = {
					config:{
						name:name,
						single:obj.single,
						abstr:obj.abstr,
						plugin:false,
						core:false
					},
					cls:_jsb_cls
				};

				return me.data.clss[name];

			};

			me.cls.prototype = {

				_plugin_init:function(jsb_cls){

					var _ary_plugin = this.plugins;

					var _ns_plugin;

					if(_ary_plugin){

						var _ary_cls_plug = this._ary_plugin;

						for (var i = 0; i < _ary_plugin.length; i++) {
							
							me._check_class(_ary_plugin[i]);

							_ns_plugin = me._get_class(_ary_plugin[i])["cls"].prototype;

							_ary_cls_plug.push(_ary_plugin[i]);

							this._plugin(_ns_plugin);

						};

						for (var i = 0; i < _ary_cls_plug.length; i++) {
							
							var _obj_plug =  me._get_plugin(_ary_cls_plug[i]);

							_ns_plugin = me._get_class(_ary_cls_plug[i])["cls"].prototype;
							
							if(_obj_plug.getPrototype){
								_q.extend(
									jsb_cls.prototype, 
									_obj_plug.getPrototype()
								);
							}

							_ns_plugin.initialize.call(this);

						};

					}

				},

				_plugin: function(scope) {

					var _ary_depends = scope.depends;

					if (_ary_depends) {

						for (var i = 0; i < _ary_depends.length; i++) {
							
							var _str_cls = _ary_depends[i];

							var _ns_cls = JSB._get_class(_str_cls);
							
							if(!_ns_cls.config.plugin){
								continue;
							}

							this._ary_plugin.push(_str_cls);

							if (_ns_cls.cls.prototype.depends) {

								this._plugin(_ns_cls.cls.prototype);

							}

						};

					}

				},

				_extend: function(scope) {

					var _str_extend = scope.extend;

					if (_str_extend) {

						this._ary_extend.push(scope.extend);

						var _ns_cls = JSB._get_class(_str_extend)["cls"];

						if (_ns_cls.prototype.extend) {

							this._extend(_ns_cls.prototype);

						}

					}

				},

				_import: function() {

					if (this.imports) {

						for (var i = 0; i < this.imports.length; i++) {

							var _str_import = this.imports[i];

							JSB._check_class(_str_import);

						}

					}

				},

				SUPER: function() {

					if (this._ary_extend.length > 0 && this._count < this._ary_extend.length) {

						var _str_extend = this._ary_extend[this._count];

						if (_str_extend) {

							var _proto_class = JSB._get_class(_str_extend)["cls"].prototype;

							this._count++;

							_proto_class._import();

							_proto_class.initialize.apply(this);

							if (_proto_class.extend) {

								this.SUPER();

							}

						}

					}

				},

				destroy: function() {

					if(this._destroy){
						JSB.echo("error",this,"already destroy");
						return true;
					}

					var _ns_cls = JSB._get_class(this.className);

					for (var i = 0; i < _ns_cls.config.nodes.length; i++) {
						if(_ns_cls.config.nodes[i]==this){
							_ns_cls.config.nodes.splice(i,1);
						}
					};

					_q(this).triggerHandler('cls.destroy',this);

					_q(JSB).triggerHandler('jsb.destroy',this);

					this._destroy = true;

					return this;

				},

				addListener:function(str_event,func_cb,ns_scope){

					_q(this)[JSB.event.on]('cls.'+str_event,{scope:ns_scope},func_cb);

				},

				dispatchEvent:function(str_event,obj_data){

					_q(this).triggerHandler('cls.'+str_event,[this,obj_data]);

				},

				removeListener:function(str_event){

					_q(this)[JSB.event.off]('cls.'+str_event);

				},				

				initialize: function() {}

			}

		},

		_parser_url:function(url){

			var _str_url  = '';

			if (url.match(/^(http|https):\/\//g)) {

				var _str_domain = url 

				_str_domain = _str_domain.match(/^(https|http):\/\/(.*?)\//g)[0].replace(/(https|http|:|\/)/g,'');

				if(_str_domain!=window.location.hostname){

					JSB.echo("error","imports need sample domain",url);

				}

				_str_url = url;


			} else {

				var _str_basename = url.replace(/\\/g, '/').replace(/.*\//, '');

				var _str_ext = '.js';

				if (_str_basename.substr(_str_basename.length,-_str_ext.length) != _str_ext) {
					
					_str_url  = url.replace(/\./g, '/');
					
					if(url.match(/^jsborn\./g)){
						_str_url  = JSB.config.importSetup.library + _str_url + _str_ext;
					}else if(url.match(/^jquery\./g)){
						_str_url  = JSB.config.importSetup.jquery + _str_url + _str_ext;
					}else{
						_str_url  = JSB.config.importSetup.source + _str_url + _str_ext;
					}
					
				}else {

					_str_url = url;

				}

			}

			return _str_url;

		},

		_get_core:function(_str_name){

			var me = this;

			if (me.data.cores[_str_name]) {
				return me.data.cores[_str_name];
			} else {
				return false;
			}

		},

		_get_class: function(_str_name) {

			var me = this;

			if (me.data.clss[_str_name]) {
				return me.data.clss[_str_name];
			} else {
				return false;
			}

		},

		_get_plugin: function(_str_name) {

			var me = this;

			if (me.data.plugins[_str_name]) {
				return me.data.plugins[_str_name];
			} else {
				return false;
			}

		}

	}

	JSB._init();

	window.JSB = JSB;

})(window);