
/**
 * 2010-02-11
 * @class Guide
 * @extends Ext.app.BaseFuncPanel
 */
GuideList = Ext.extend(Ext.app.BaseFuncPanel, {
	initComponent: function() {
		Ext.apply(this, {
			gridConfig: {
				cm: new Ext.grid.ColumnModel({
				defaults: {width: 200, align: 'center'},
					columns: [
						new Ext.grid.RowNumberer(),
						{header: '标题', dataIndex: 'title'},
						{header: '申请人', dataIndex: 'applyMan'},
						{header: '创建日期', dataIndex: 'created'},
						{header: '发布日期', dataIndex: 'published'},
						{header: '回退原因', dataIndex: 'refuseReason'},
						{header: '状态', dataIndex: 'statusText'}
					]
				}),	
				storeMapping: [
					'id', 'title', 'content', 'applyMan', 'created', 'published', 'status', 'statusText', 'refuseReason'
				]
			},
			buttonConfig: ['all', '-', 
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
			winConfig: {
				height: 470,
				width: 700,
				bigIconClass: 'guideBigIcon',
				desc: '新增，修改工作指南信息'
			},
			formConfig: {
				layout: 'column',
				items: [
					{xtype: 'fieldset', title: '工作指南信息', items: [
						{xtype: 'panel', layout: 'form', border: false, items: [
							{xtype: 'f-text', fieldLabel: '标题', name: 'title', allowBlank: false},
							{xtype: 'f-text', fieldLabel: '申请人', name: 'applyMan'},
							{xtype: 'htmleditor', fieldLabel: '正文内容', name: 'content', height: 220, allowBlank: false}
							
						]}
					]}
				]
			},
			url: ctx + '/guide'	
		});
		
		GuideList.superclass.initComponent.call(this);
		
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
			Ext.getCmp('submitBt').setDisabled(false);
			Ext.getCmp('cancelBt').setDisabled(true);
		} else if (status == '4'){
			this.editBt.setDisabled(true);
			this.delBt.setDisabled(true);
			Ext.getCmp('submitBt').setDisabled(true);
			Ext.getCmp('cancelBt').setDisabled(false);
		} else {
			this.editBt.setDisabled(true);
			this.delBt.setDisabled(true);
			Ext.getCmp('submitBt').setDisabled(true);
			Ext.getCmp('cancelBt').setDisabled(true);
		}
	},
	
	submit: function() {
		var id = this.getSelectionModel().getSelected().id;
		
		Ext.Ajax.request({
			url: ctx + '/guide/submit',
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
				title: '撤销工作指南发布',
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
								url: ctx + '/guide/cancelConfirm',
								params: {id: id,refuseReason: Ext.getCmp('refuseReason').getValue()},
								scope: this,
								success: function(response, opts) {
									var jo = Ext.decode(response.responseText);
									if(jo.success) {
										win.close();
										Ext.getCmp('guideList').loadData();
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
		Ext.getCmp('guideList').loadData({status: record.data.text});
	}
});

Guide = Ext.extend(Ext.Panel, {
	layout: 'border',
	closable: true,
	initComponent: function() {
		this.center = new GuideList({
			id: 'guideList',
			funcCode: this.funcCode,
			region: 'center',
			title: '工作指南信息'
		});
		this.items = [this.center];
		Guide.superclass.initComponent.call(this);
	},
	loadData: function() {
		this.center.loadData();
	}
});