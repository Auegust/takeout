
/**
 * 2010-02-11
 * @class Info
 * @extends Ext.app.BaseFuncPanel
 */
var areaField =	{
	xtype: 'f-select',fieldLabel: '镇(街)',id: 'areaId',hiddenName: 'area'
};
var projectField = {
	xtype: 'f-select',fieldLabel: '楼盘',id: 'projectId',hiddenName: 'project',relativeField : 'areaId'
};
InfoList = Ext.extend(Ext.app.BaseFuncPanel, {
	initComponent: function() {
		Ext.apply(this, {
			gridConfig: {
				cm: new Ext.grid.ColumnModel({
				defaults: {width: 200, align: 'center'},
					columns: [
						new Ext.grid.RowNumberer(),
						{header: '标题', dataIndex: 'title'},
						{header: '类型', dataIndex: 'publishType', renderer: dictRenderer},
						{header: '镇街',dataIndex: 'area', renderer:dictRenderer},
						{header: '楼盘名',dataIndex: 'project', renderer:dictRenderer},
						{header: '申请人', dataIndex: 'applyMan'},
						{header: '创建日期', dataIndex: 'created'},
						{header: '发布日期', dataIndex: 'published'},
						{header: '回退原因', dataIndex: 'refuseReason'},
						{header: '状态', dataIndex: 'statusText'}
					]
				}),	
				storeMapping: [
					'id', 'title', 'content', 'applyMan', 'created', 'published', 'status', 'statusText', 'publishType', 'area', 'project', 'refuseReason'
				]
			},
			buttonConfig: ['all',
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
				height: 550,
				width: 700,
				bigIconClass: 'infoBigIcon',
				desc: '新增，修改楼盘公示信息'
			},
			formConfig: {
				layout: 'column',
				items: [
					{xtype: 'fieldset', title: '公示信息', items: [
						{xtype: 'f-text', fieldLabel: '标题', name: 'title', allowBlank: false},
						{xtype: 'f-dict', fieldLabel: '类型', hiddenName: 'publishType', kind: 'publishType', allowBlank: false},
						{xtype: 'f-select',fieldLabel: '镇街',id: 'areaId', hiddenName: 'area', dataUrl: '/info/getArea', allowBlank: false},
						{xtype: 'f-select',fieldLabel: '楼盘名', dataUrl: '/info/getProject', storeFields:['id','text'], hiddenName: 'project', allowBlank: false, relativeField : 'areaId'},	
						{xtype: 'f-text', fieldLabel: '申请人', name: 'applyMan'},
						{xtype: 'htmleditor', fieldLabel: '正文内容', name: 'content', height: 220, allowBlank: false}
					]}
				]
			},
			url: ctx + '/info'	
		});
		
		InfoList.superclass.initComponent.call(this);
		
		this.store.on('load', function(store, records, options) {
			var selected = this.getSelectionModel().getSelected();
			if (selected) {
				this.changeToolBarButtons(selected);
			}
		}, this);
		
		this.getSelectionModel().on('rowselect',function(sm,rowIndex,r){
			Ext.getCmp('detailList').parentId = r.id;
			Ext.getCmp('detailList').status = r.data.status;
			Ext.getCmp('detailList').loadData({parentId: r.id});
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
			url: ctx + '/info/submit',
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
				title: '撤销楼盘公示发布',
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
								url: ctx + '/info/cancelConfirm',
								params: {id: id,refuseReason: Ext.getCmp('refuseReason').getValue()},
								scope: this,
								success: function(response, opts) {
									var jo = Ext.decode(response.responseText);
									if(jo.success) {
										win.close();
										Ext.getCmp('infoList').loadData();
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
		Ext.getCmp('infoList').loadData({status: record.data.text});
	}
});

DetailList = Ext.extend(Ext.app.BaseFuncPanel, {
	paging: false,
	initComponent: function() {
		Ext.apply(this, {
			gridConfig: {
				cm: new Ext.grid.ColumnModel({
				defaults: {width: 200, align: 'center'},
					columns: [
						new Ext.grid.RowNumberer(),
						{header: '投票内容', dataIndex: 'content'},
						{header: '票数', dataIndex: 'count', renderer: dictRenderer}
					]
				}),	
				storeMapping: [
					'id', 'content', 'count'
				]
			},
			buttonConfig : ['all'],
			winConfig: {
				height: 300,
				width: 450,
				bigIconClass: 'infoBigIcon',
				desc: '新增，修改投票内容'
			},
			formConfig: {
				items: [
					{xtype: 'f-text', fieldLabel: '投票内容', name: 'content', allowBlank: false}
				]
			},
			url: ctx + '/infoDetail'
		});
		
		DetailList.superclass.initComponent.call(this);
		
		this.store.on('load', function(store, records, options) {
			this.changeToolBarButtons(this.status);
		}, this);
		
		this.on('beforesave',function(){
			this.ajaxParams['parentId'] = this.parentId;
		},this);
	},
	changeToolBarButtons: function(status) {
		if (status == '1') {
			this.addBt.setDisabled(false);
			this.editBt.setDisabled(false);
			this.delBt.setDisabled(false);
		} else if (status != '1') {
			this.addBt.setDisabled(true);
			this.editBt.setDisabled(true);
			this.delBt.setDisabled(true);
		}
	}
});

Info = Ext.extend(Ext.Panel, {
	layout: 'border',
	closable: true,
	initComponent: function() {
		this.top = new InfoList({
			id: 'infoList',
			funcCode: this.funcCode,
			region: 'north',
			title: '楼盘公示信息',
			split: true,
			collapsible: true,
			height: 300,
			minSize: 175,
			maxSize: 500
		});
		this.bottom = new DetailList({
			id: 'detailList',
			funcCode: this.funcCode,
			region: 'center',
			title: '投票内容列表'
		});
		this.items = [this.top,this.bottom];
		Info.superclass.initComponent.call(this);
	},
	loadData: function() {
		this.top.loadData();
	}
});