
/**
 * 2010-02-11
 * @class Law
 * @extends Ext.app.BaseFuncPanel
 */
VoteList = Ext.extend(Ext.app.BaseFuncPanel, {
	initComponent: function() {
		Ext.apply(this, {
			gridConfig: {
				cm: new Ext.grid.ColumnModel({
				defaults: {width: 200, align: 'center'},
					columns: [
						new Ext.grid.RowNumberer(),
						{header: '标题', dataIndex: 'title'},
						{header: '内容', dataIndex: 'content'},
						{header: '镇街', dataIndex: 'areaName'},
						{header: '楼盘', dataIndex: 'projectName'},
						{header: '幢', dataIndex: 'buildingName'},
						{header: '房号', dataIndex: 'houseName'},
						{header: '操作日期', dataIndex: 'created'}
					]
				}),	
				storeMapping: [
					'id', 'title', 'content', 'areaName', 'projectName', 'buildingName', 'houseName', 'created'
				]
			},
			buttonConfig: [{xtype: 'f-search', emptyText: '请输入标题'}],
			url: ctx + '/vote'	
		});
		
		VoteList.superclass.initComponent.call(this);
	}
});

Vote = Ext.extend(Ext.Panel, {
	layout: 'border',
	closable: true,
	initComponent: function() {
		this.center = new VoteList({
			id: 'voteList',
			funcCode: this.funcCode,
			region: 'center',
			title: '投票信息'
		});
		this.items = [this.center];
		Vote.superclass.initComponent.call(this);
	},
	loadData: function() {
		this.center.loadData();
	}
});