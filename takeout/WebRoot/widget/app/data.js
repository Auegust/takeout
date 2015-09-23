
/**
 * 2010-02-11
 * @class Data
 * @extends Ext.app.BaseFuncPanel
 */
DataWin = Ext.extend(Ext.Window, {
	id: 'dataWin',
	title: '新增资料',
	iconCls: 'wizard',
	width: 520,
	height: 300,
	border: false,
	buttonAlign: 'center',
	bodyStyle: 'background-color: white',
	modal: true,
	
	initComponent: function() {
		this.items = [
			new DataPanel()
		];
		this.buttons = [
			{text: '保存', scope: this, handler: this.confirm},
			{text: '关闭', scope: this, handler: function(){this.close()}}
		];
		
		DataWin.superclass.initComponent.call(this);
	},
	confirm: function() {
		Ext.getCmp('fileForm').getForm().submit({
			url: ctx+'/data/create',
			params: {fileName: Ext.getCmp('uploadFile').getValue()},
			scope: this,
			success: function(form, action) {
				this.close();
				Ext.getCmp('dataList').loadData({flag: 'notPublished'});
				App.msg(action.result.msg);
			},
			failure: function(form, action) {
				if (action.failureType == Ext.form.Action.CLIENT_INVALID){
					App.msg("网络错误，稍后再试");
				} else {
					App.msg(action.result.msg);
				}
			}
		});
	}
});
DataPanel = Ext.extend(Ext.Panel, {
	border: false,
	initComponent: function() {
		this.items = [
			{xtype: 'fieldset', title: '上传资料', width: 480, style: 'margin: 15px 20px;', items: [
				{xtype: 'form', id: 'fileForm', fileUpload : true,  border: false, labelAlign: 'right', 
					items: [
						{xtype: 'f-text', fieldLabel: '申请人', name: 'applyMan'},
						{xtype: 'f-upload', fieldLabel: '上传文件', id: 'uploadFile', name: 'uploadFile', allowBlank: false}
						
					]
				}
			]}
		];
		
		DataPanel.superclass.initComponent.call(this);
	}
});

DataList = Ext.extend(Ext.app.BaseFuncPanel, {
	initComponent: function() {
		Ext.apply(this, {
			gridConfig: {
				cm: new Ext.grid.ColumnModel({
				defaults: {width: 200, align: 'center'},
					columns: [
						new Ext.grid.RowNumberer(),
						{header: '标题', dataIndex: 'title'},
						{header: '文件名', dataIndex: 'fileName'},
						{header: '申请人', dataIndex: 'applyMan'},
						{header: '创建日期', dataIndex: 'created'},
						{header: '发布日期', dataIndex: 'published'},
						{header: '回退原因', dataIndex: 'refuseReason'},
						{header: '状态', dataIndex: 'statusText'}
					]
				}),	
				storeMapping: [
					'id', 'title', 'fileName', 'applyMan', 'created', 'published', 'status', 'statusText', 'refuseReason'
				]
			},
			buttonConfig: [
				{text: '新增', id: 'addBt', iconCls: 'add', enableOnEmpty : true, privilegeCode: this.funcCode + '_add', scope: this, handler: this.create},
				'del', '-', 
				{text: '提交', id: 'submitBt', iconCls: 'accept', privilegeCode: this.funcCode + '_submit', scope: this, handler: this.submit},
				'-',
				{text: '撤销', id: 'cancelBt', iconCls: 'rollBack', privilegeCode: this.funcCode + '_cancel', scope: this, handler: this.cancel},
				'->',
				{xtype: 'combo',width: 100, typeAhead: true,triggerAction: 'all',lazyRender: true,mode: 'local',editable: false,
					store: new Ext.data.ArrayStore({
						fields: ['text', 'displayText'],
						data: [['0', '全部'], ['1', '录入中'], ['2', '已录入'], ['3', '已复核'], ['4', '已审核']]
					}),
					valueField: 'text',displayField: 'displayText',
					listeners: {
						select: this.listWithSelected
					}
				}, '-',
				{xtype: 'f-search', emptyText: '请输入标题'}
			],
			url: ctx + '/data'	
		});
		
		DataList.superclass.initComponent.call(this);
		
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
	
	create: function() {
		var win = new DataWin();
		win.show();
	},
	changeToolBarButtons: function(record) {
		var status = record.data.status;
		if (status == '1') {
			Ext.getCmp('addBt').setDisabled(false);
			this.addBt.setDisabled(false);
			this.delBt.setDisabled(false);
			Ext.getCmp('submitBt').setDisabled(false);
			Ext.getCmp('cancelBt').setDisabled(true);
		} else if (status == '4'){
			Ext.getCmp('addBt').setDisabled(false);
			this.delBt.setDisabled(true);
			Ext.getCmp('submitBt').setDisabled(true);
			Ext.getCmp('cancelBt').setDisabled(false);
		} else {
			Ext.getCmp('addBt').setDisabled(false);
			this.delBt.setDisabled(true);
			Ext.getCmp('submitBt').setDisabled(true);
			Ext.getCmp('cancelBt').setDisabled(true);
		}
	},
	submit: function() {
		var id = this.getSelectionModel().getSelected().id;
		
		Ext.Ajax.request({
			url: ctx + '/data/submit',
			params: {id: id},
			scope: this,
			success: function(response, opts) {
				var jo = Ext.decode(response.responseText);
				if(jo.success) {
					this.loadData();
				}
			}
		});
	},
	cancel: function() {
		if (confirm("是否确认撤销该记录?")) {
			var win = new Ext.Window({
				title: '撤销表格资料发布',
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
						id: 'refuseReason',
						xtype: 'textarea',
						border: false,
						width: 240,
						height: 120,
						fieldLabel: '撤销原因'
					}],
					buttons: [{
						text: '确认',
						scope: this,
						handler: function() {
							var id = this.getSelectionModel().getSelected().id;
							Ext.Ajax.request({
								url: ctx + '/data/cancelConfirm',
								params: {id: id,refuseReason: Ext.getCmp('refuseReason').getValue()},
								scope: this,
								success: function(response, opts) {
									var jo = Ext.decode(response.responseText);
									if(jo.success) {
										win.close();
										Ext.getCmp('dataList').loadData();
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
		}
	},
	
	listWithSelected: function(combo, record, index) {
		Ext.getCmp('dataList').loadData({status: record.data.text});
	}
});
Data = Ext.extend(Ext.Panel, {
	layout: 'border',
	closable: true,
	initComponent: function() {
		this.center = new DataList({
			id: 'dataList',
			funcCode: this.funcCode,
			region: 'center',
			title: '表格资料发布',
			split: true,
			collapsible: true,
			height: 270,
			minSize: 175,
			maxSize: 500
		});
		this.items = [this.center];
		Data.superclass.initComponent.call(this);
	},
	loadData: function() {
		this.center.loadData();
	}
});