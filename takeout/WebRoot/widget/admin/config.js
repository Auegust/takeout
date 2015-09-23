

ConfigForm = Ext.extend(Ext.form.FormPanel,{
	closable : true,
	border : false,
	monitorValid : true,
	initComponent : function(){
		
		Ext.apply(this,{
			layout: 'anchor',
			bodyStyle : 'padding: 10px;',
			defaults : {
				bodyStyle : 'padding: 20px;'
			},
			items: [
				{xtype:'f-grouppanel',title :'系统参数',layout:'form',
					items :[
						{xtype: 'f-text',fieldLabel: '管理员邮箱',name: 'ADMIN_EMAIL',vtype:'email',allowBlank: false},
						{xtype: 'f-text',fieldLabel: '应用根目录',name: 'APP_ROOT_DIR',allowBlank: false},
						{xtype: 'f-text',fieldLabel: '上传文件夹',name: 'TEMP_UPLOAD_DIR',allowBlank: false}
					]
				}
			],
			buttonAlign : 'center',
			buttons : [{
				text : '保存',
				scope : this,
				formBind: true,
				handler : this.updateConfig
			}]
		});
		ConfigForm.superclass.initComponent.call(this);
	},
	loadData : function(){
		this.getForm().load({
			url : ctx + '/config/loadConfig'
		})
	},
	updateConfig : function(){
		Ext.MessageBox.confirm('保存确认', '你确定要保存你的修改吗?错误的参数设置可能导致系统异常行为',function(btn){
			var o = {};
			this.getForm().items.each(function(f){
	           if(f.isDirty()){
	           		o[f.getName()] = f.getValue();
	           }
	        });
			Ext.Ajax.request({
				url : ctx + '/config/updateConfig',
				params :o,
				scope : this,
				success : function(){
					this.loadData();
				}
			})
		},this);
	}
	
});

Config = Ext.extend(Ext.Panel,{
	layout : 'anchor',
	border : true,
	closable : true,
	initComponent : function(){
		this.items = [
			{	xtype: 'panel',
				height : 60,
				border : false,
				baseCls : 'fjdp-win-title',
				html : '<div class="fjdp-win-title-content confIcon"><h3>系统及业务参数设置</h3><p>设置系统的各项参数,某些参数必须在服务器重启后才能生效</p></div>'
			},
			new ConfigForm({id : 'configForm',anchor : '0 -60'})
			
		]
		Config.superclass.initComponent.call(this);
	},
	loadData : function(){
		Ext.getCmp('configForm').loadData();
	}
});
