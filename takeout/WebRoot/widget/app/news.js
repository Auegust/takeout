
/**
 * 2010-02-11
 * @class News
 * @extends Ext.app.BaseFuncPanel
 */


UploadImageWin = Ext.extend(Ext.Window, {
	initComponent: function() {
		this.modal = true;
		this.width = 400;
		this.height = 120;
		this.title = '上传图片';
		this.layout = 'border';
		this.buttonAlign = 'center';
		this.layoutConfig = {deferredRender : true};
		this.defaults = {hideMode:'offsets'},
		this.items = [
			{xtype: 'form', id: 'uploadImage', border: false, region: 'center', fileUpload: true, bodyStyle: 'padding: 10px', items: [
				{xtype: 'f-upload', width: 200, fieldLabel: '图片路径', id: 'uploadImagePath', name: 'image'}
			]}
		];
		this.buttons = [
			{xtype: 'button', text: '提交', scope: this, handler: this.uploadImage},
			{xtype: 'button', text: '关闭', scope: this, handler: function(button, event) {this.close()}}
		]
		
		UploadImageWin.superclass.initComponent.call(this);
	},
	
	uploadImage: function(button, event) {
		var uploadImagePath = Ext.getCmp('uploadImagePath').getValue();
		
		Ext.getCmp('uploadImage').getForm().submit({
			url: ctx + '/image/uploadImage',
			params: {imagePath: uploadImagePath},
			scope: this,
			success: function(form, action) {
				var imageName = action.result.imageName;
				Ext.getCmp('newsImageName').setValue(imageName);
				Ext.getCmp('imageList').displayImage();
				this.close();
			},
			failure: function(form, action) {
				Ext.Msg.alert('提示信息', '图片格式不正确,支持jpg jpeg gif格式图片。');
			}
		});
	}
});

NewsList = Ext.extend(Ext.app.BaseFuncPanel, {
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
					'id', 'title', 'imageName', 'content', 'created', 'published', 'applyMan', 'refuseReason', 'status', 'statusText'
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
				height: 470,
				width: 650,
				bigIconClass: 'newsBigIcon',
				desc: '新增，修改新闻信息'
			},
			formConfig: {
				layout: 'column',
				items: [
					{xtype: 'fieldset', title: '文字信息', items: [
						{xtype: 'panel', layout: 'form', border: false, items: [
							{xtype: 'f-text', fieldLabel: '标题', name: 'title', allowBlank: false},
							{xtype: 'f-text', fieldLabel: '申请人', name: 'applyMan'},
							{xtype: 'htmleditor', fieldLabel: '正文内容', name: 'content', height: 220, allowBlank: false}
						]}
					]}
				]
			},
			url: ctx + '/news'	
		});
		
		NewsList.superclass.initComponent.call(this);
		
		this.store.on('load', function(store, records, options) {
			var selected = this.getSelectionModel().getSelected();
			if (selected) {
				this.changeToolBarButtons(selected);
			}
		}, this);
		
		this.getSelectionModel().on('rowselect',function(sm,rowIndex,r){
			Ext.getCmp('imageList').parentId = r.id;
			Ext.getCmp('imageList').status = r.data.status;
			Ext.getCmp('imageList').loadData({parentId: r.id});
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
			url: ctx + '/news/submit',
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
				title: '撤销图片新闻发布',
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
								url: ctx + '/news/cancelConfirm',
								params: {id: id,refuseReason: Ext.getCmp('refuseReason').getValue()},
								scope: this,
								success: function(response, opts) {
									var jo = Ext.decode(response.responseText);
									if(jo.success) {
										win.close();
										Ext.getCmp('newsList').loadData();
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
		Ext.getCmp('newsList').loadData({status: record.data.text});
	}
});

ImageList = Ext.extend(Ext.app.BaseFuncPanel, {
	paging: false,
	initComponent: function() {
		Ext.apply(this, {
			gridConfig: {
				cm: new Ext.grid.ColumnModel({
				defaults: {width: 200, align: 'center'},
					columns: [
						new Ext.grid.RowNumberer(),
						{header: '文件名', dataIndex: 'imageName'},
						{header: '日期', dataIndex: 'tdate'}
					]
				}),	
				storeMapping: [
					'id', 'imageName', 'tdate'
				]
			},
			buttonConfig: ['all'],
			winConfig: {
				height: 500,
				width: 430,
				bigIconClass: 'newsBigIcon',
				desc: '新增，修改图片信息'
			},
			formConfig: {
				layout: 'column',
				items: [
					{xtype: 'panel', border: false},
					{xtype: 'fieldset', title: '图片信息', items: [
						{xtype: 'panel', layout: 'form', border: false, items: [
							{xtype: 'panel', id: 'newsImagePanel', height: 250, style: 'padding: 10 0 10 0', html: '<div style="color: gray">可以选择是否上传新闻图片</div>'},
							{xtype: 'f-text', id: 'newsImageName', name: 'imageName', hidden: true},
							{xtype: 'f-button', width: 370, text: '上传图片', handler: this.uploadImage}
						]}						
					]}
				]
			},
			url : ctx + '/image'
		});
		
		ImageList.superclass.initComponent.call(this);
		
		this.store.on('load', function(store, records, options) {
			this.changeToolBarButtons(this.status);
		}, this);
		
		this.addListener('afterload', this.displayImage);
		
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
	},
	
	uploadImage: function(button, event) {
		var win = new UploadImageWin();
		win.show();
	},
	
	displayImage: function() {
		var imageName = Ext.getCmp('newsImageName').getValue();
		if(imageName) {
			var updateText = '<img style="height: 250; width: 370" src="' + ctx + '/image/displayImage?imageName=' + imageName + '"></img>';
			Ext.getCmp('newsImagePanel').getEl().update(updateText);
		}		
	}
});

News = Ext.extend(Ext.Panel, {
	layout: 'border',
	closable: true,
	initComponent: function() {
		this.top = new NewsList({
			id: 'newsList',
			funcCode: this.funcCode,
			region: 'north',
			title: '新闻信息',
			split: true,
			collapsible: true,
			height: 300,
			minSize: 175,
			maxSize: 500
		});
		this.bottom = new ImageList({
			id: 'imageList',
			funcCode: this.funcCode,
			region: 'center',
			title: '图片信息'
		});
		this.items = [this.top,this.bottom];
		News.superclass.initComponent.call(this);
	},
	loadData: function() {
		this.top.loadData();
	}
});