
/**
 * 2010-02-11
 * @class Template
 * @extends Ext.app.BaseFuncPanel
 */
 
UploadPanel = Ext.extend(Ext.Panel, {
	border: false,
	initComponent: function() {
		this.items = [
			{xtype: 'fieldset', title: '选择文件', width: 480, style: 'margin: 15px 20px;', items: [
				{xtype: 'form', id: 'fileForm', fileUpload : true,  border: false, labelAlign: 'right', 
					items: [
						{xtype: 'f-upload', fieldLabel: '文件名',  id: 'uploadFile', name: 'uploadFile', allowBlank: false},
						{xtype: 'f-text', id:'recordId', hidden: true}
					]
				}
			]}
		];
		
		UploadPanel.superclass.initComponent.call(this);
	}
});
UploadWin = Ext.extend(Ext.Window, {
	title: '上传文件',
	iconCls: 'wizard',
	width: 520,
	height: 250,
	border: false,
	buttonAlign: 'center',
	bodyStyle: 'background-color: white',
	modal: true,
	
	initComponent: function() {
		this.items = [
			new UploadPanel()
		];
		this.buttons = [
			{text: '保存', scope: this, handler: this.confirm},
			{text: '关闭', scope: this, handler: function(){this.close()}}
		];
		
		UploadWin.superclass.initComponent.call(this);
	},
	confirm: function() {
		Ext.getCmp('fileForm').getForm().submit({
			url: ctx+'/template/upload',
			params: {id : Ext.getCmp('recordId').getValue(), fileName: Ext.getCmp('uploadFile').getValue()},
			scope: this,
			success: function(form, action) {
				this.close();
				Ext.getCmp('templateList').loadData();
			},
			failure: function(form, action) {
				if (action.failureType == Ext.form.Action.CLIENT_INVALID){
					App.msg("网络错误，稍后再试");
				} else {
					App.msg("上传文件失败");
				}
			}
		});
	}
});

TemplateList = Ext.extend(Ext.app.BaseFuncPanel, {
	initComponent: function() {
		Ext.apply(this, {
			gridConfig: {
				cm: new Ext.grid.ColumnModel({
				defaults: {width: 200, align: 'center'},
					columns: [
						new Ext.grid.RowNumberer(),
						{header: '受理号', dataIndex: 'id'},
						{header: '标题', dataIndex: 'title'},
						{header: '楼盘名称', dataIndex: 'project'},
						{header: '申请公司', dataIndex: 'company'},
						{header: '公司类型', dataIndex: 'companyType', renderer: dictRenderer},
						{header: '申请人', dataIndex: 'applyMan'},
						{header: '状态', dataIndex: 'status', renderer: function(value) { return (value == '1' ? '录入中' : (value == '2' ? '已发送' : (value == '3' ? '回退' : '接收')))}},
						{header: '创建日期', dataIndex: 'created'},
						{header: '回退原因', dataIndex: 'returnReason'},
						{header: '接收日期', dataIndex: 'operDate'}
					]
				}),	
				storeMapping: [
					'id', 'title', 'project', 'company', 'companyType','fileName', 
					'applyMan', 'status', 'created', 'operDate','returnReason'
				]
			},
			buttonConfig: ['all',
				{text: '上传文档', id: 'uploadBt', iconCls: 'upload', privilegeCode: this.funcCode + '_upload', scope: this, handler: this.upload},
				{text: '发送文档', id: 'sendBt', iconCls: 'accept', privilegeCode: this.funcCode + '_send', scope: this, handler: this.send},'-',
				{text: '下载文档', id: 'downloadBt', iconCls: 'page', privilegeCode: this.funcCode + '_download', scope: this, handler: this.download},
				{text: '回退文档', id: 'returnBt', iconCls: 'rollBack', privilegeCode: this.funcCode + '_return', scope: this, handler: this.returnTemplate},
				{text: '接收文档', id: 'receiveBt', iconCls: 'tick', privilegeCode: this.funcCode + '_receive', scope: this, handler: this.receive},
				'->',
				{xtype: 'combo',width: 100, typeAhead: true,triggerAction: 'all',lazyRender: true,mode: 'local',editable: false,
					store: new Ext.data.ArrayStore({
						fields: ['text', 'displayText'],
						data: [['0', '全部'], ['1', '录入中'], ['2', '已录入'], ['3', '回退'], ['4', '接收']]
					}),
					valueField: 'text',displayField: 'displayText',
					listeners: {
						select: this.listWithSelected
					}
				}, '-',
				{xtype: 'f-search', emptyText: '请输入标题'}
			],
			winConfig: {
				height: 400,
				width: 500,
				bigIconClass: 'guideBigIcon',
				desc: '新增，修改文档模板信息'
			},
			formConfig: {
				items: [
					{xtype: 'f-text', fieldLabel: '标题', name: 'title', allowBlank: false},
					{xtype: 'f-text', fieldLabel: '楼盘名称', name: 'project', allowBlank: false},
					{xtype: 'f-text', fieldLabel: '申请公司', name: 'company', allowBlank: false},
					{xtype: 'f-dict', fieldLabel: '公司类型', hiddenName: 'companyType', kind: 'companyType', allowBlank: false},
					{xtype: 'f-text', fieldLabel: '申请人', name: 'applyMan', allowBlank: false}
				]
			},
			url: ctx + '/template'	
		});
		
		TemplateList.superclass.initComponent.call(this);
		
		this.store.on('load', function(store, records, options) {
			var selected = this.getSelectionModel().getSelected();
			if (selected) {
				this.changeToolBarButtons(selected);
			}
		}, this);
		
		this.getSelectionModel().on('rowselect',function(sm,rowIndex,r){
			this.changeToolBarButtons(r);
		},this);
	},
	
	changeToolBarButtons: function(record) {
		var status = record.data.status;
		if (status == '1') {
			this.editBt.setDisabled(false);
			this.delBt.setDisabled(false);
			Ext.getCmp('uploadBt').setDisabled(false);
			Ext.getCmp('sendBt').setDisabled(false);
			Ext.getCmp('downloadBt').setDisabled(true);
			Ext.getCmp('returnBt').setDisabled(true);
			Ext.getCmp('receiveBt').setDisabled(true);
		} else if (status == '2') {
			this.editBt.setDisabled(true);
			this.delBt.setDisabled(true);
			Ext.getCmp('uploadBt').setDisabled(true);
			Ext.getCmp('sendBt').setDisabled(true);
			Ext.getCmp('downloadBt').setDisabled(false);
			Ext.getCmp('returnBt').setDisabled(false);
			Ext.getCmp('receiveBt').setDisabled(false);
		} else if (status == '3') {
			this.editBt.setDisabled(false);
			this.delBt.setDisabled(false);
			Ext.getCmp('uploadBt').setDisabled(false);
			Ext.getCmp('sendBt').setDisabled(false);
			Ext.getCmp('downloadBt').setDisabled(true);
			Ext.getCmp('returnBt').setDisabled(true);
			Ext.getCmp('receiveBt').setDisabled(true);
		} else {
			this.editBt.setDisabled(true);
			this.delBt.setDisabled(true);
			Ext.getCmp('uploadBt').setDisabled(true);
			Ext.getCmp('sendBt').setDisabled(true);
			Ext.getCmp('downloadBt').setDisabled(false);
			Ext.getCmp('returnBt').setDisabled(true);
			Ext.getCmp('receiveBt').setDisabled(true);
		}
	},
	
	upload: function() {
		var id = this.getSelectionModel().getSelected().id;
		if (id == null || id == '') {
			alert("请选中一行新增");
		} else {
			var win = new UploadWin();
			Ext.getCmp('recordId').setValue(id);
			win.show();
		}
	},
	
	send: function() {
		var fileName = this.getSelectionModel().getSelected().data.fileName;
		if (fileName == '') {
			alert("请上送文档后再发送");
		} else {
			var id = this.getSelectionModel().getSelected().id;
			Ext.Ajax.request({
				url: ctx + '/template/send',
				params: {id: id},
				scope: this,
				success: function(response, opts) {
					var jo = Ext.decode(response.responseText);
					if(jo.success) {
						Ext.getCmp('templateList').loadData();
					}
				}
			});
		}
		
	},
	
	download: function() {
		var id = this.getSelectionModel().getSelected().id;
		document.location = ctx + '/template/download?id=' + id;
	},
	
	returnTemplate: function() {
		var win = new Ext.Window({
			title: '回退文档模块',
			width: 300,
			height: 250,
			border: false,
			bodyStyle: {'background-color': 'white'},
			modal: true,
			items: [{
				xtype: 'form',
				border: false,
				style: {
					marginTop: 20,
					marginLeft: 20,
					marginRight: 20
				},
				labelAlign: 'top',
				items: [{
					id: 'returnReason',
					xtype: 'textarea',
					border: false,
					width: 240,
					height: 120,
					fieldLabel: '回退原因'
				}],
				buttons: [{
					text: '确认',
					scope: this,
					handler: function() {
						var id = this.getSelectionModel().getSelected().id;
						Ext.Ajax.request({
							url: ctx + '/template/returnTemplate',
							params: {id: id,returnReason: Ext.getCmp('returnReason').getValue()},
							scope: this,
							success: function(response, opts) {
								var jo = Ext.decode(response.responseText);
								if(jo.success) {
									win.close();
									Ext.getCmp('templateList').loadData();
								}
							}
						});
					}
				}, {
					text: '取消',
					handler: function() {win.close();}
				}]
			}]
		});
		win.show();
	},
	
	receive: function() {
		var id = this.getSelectionModel().getSelected().id;
		
		Ext.Ajax.request({
			url: ctx + '/template/receive',
			params: {id: id},
			scope: this,
			success: function(response, opts) {
				var jo = Ext.decode(response.responseText);
				if(jo.success) {
					Ext.getCmp('templateList').loadData();
				}
			}
		});
	},
	
	listWithSelected: function(combo, record, index) {
		Ext.getCmp('templateList').loadData({status: record.data.text});
	}
});

Template = Ext.extend(Ext.Panel, {
	layout: 'border',
	closable: true,
	initComponent: function() {
		this.center = new TemplateList({
			id: 'templateList',
			funcCode: this.funcCode,
			region: 'center',
			title: '文档模板信息'
		});
		this.items = [this.center];
		Template.superclass.initComponent.call(this);
	},
	loadData: function() {
		this.center.loadData();
	}
});