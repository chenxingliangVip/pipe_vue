//左侧菜单数据
export default [
  {
    name: 'User',//路由name
    path: 'User',//路由name
    title: '用户管理',
    meta:{type:1},
    icon: 'el-icon-s-custom'
  }, {
    name: 'Project',//路由name
    path: 'Project',//路由name
    title: '项目借用授权',
    meta:{type:1},
    icon: 'el-icon-folder-checked'
  },  {
    name: 'ProjectList',//路由name
    path: 'ProjectList',//路由name
    title: '项目列表',
    icon: 'el-icon-notebook-2'
  },
  {
    name: 'Materials',//路由name
    path: 'Materials',//路由name
    title: '材料管理',
    meta:{type:3},
    icon: 'el-icon-document-copy'
  },{
    name: 'DesignPage',//路由name
    path: 'DesignPage',//路由name
    title: '设计',
    meta:{type:3},
    icon: 'el-icon-edit-outline'
  },
]

