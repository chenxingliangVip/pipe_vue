//左侧菜单数据
export default [
    {
        name: 'User',//路由name
        path: 'User',//路由name
        title: '用户管理',
        meta: { type: 1 },
        icon: 'el-icon-s-custom'
    }, {
        name: 'Project',//路由name
        title: '项目管理',
        meta: { type: 1 },
        icon: 'el-icon-notebook-2',
        children: [
            {
                name: 'MyProjectList',//路由name
                path: 'MyProjectList',//路由name
                title: '我的项目',
            }, {
                name: 'ImpowerRecord',//路由name
                path: 'ImpowerRecord',//路由name
                title: '授权记录',
            }, {
                name: 'ProjectList',//路由name
                path: 'ProjectList',//路由name
                title: '部门项目',
            },
        ]
    },
    {
        name: 'Materials',//路由name
        path: 'Materials',//路由name
        title: '材料管理',
        meta: { type: 3 },
        icon: 'el-icon-document-copy'
    }, {
        name: 'DesignPage',//路由name
        path: 'DesignPage',//路由name
        title: '设计',
        meta: { type: 3 },
        icon: 'el-icon-edit-outline'
    },
]

