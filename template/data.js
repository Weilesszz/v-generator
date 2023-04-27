// 生成器状态
module.exports = {
  // 组件名（废弃）
  // pageName: '错题',
  // 文件名
  fileName: '',
  // 表格的设置
  tableSettings: [
    {
      // 字段名
      key: 'userId',
      //   标题
      title: '所属用户id',
      //   搜索方式
      searchType: '',
      belongSearchGroup: null,
      isEdit: false,
      editType: '',
      options: []
    },
    {
      key: 'repeatNum',
      title: '重复次数',
      searchType: '',
      belongSearchGroup: null,
      isEdit: true,
      editType: 'select',
      options: [
        { label: '男', value: 0 },
        { label: '女', value: 1 }
      ]
    }
  ],
  actionSettings: [
    {
      key: 'edit',
      type: 'primary',
      label: '编辑'
    },
    {
      key: 'delete',
      type: 'error',
      label: '删除'
    }
  ],
  // 是否开启下拉搜索
  searchGroup: {
    isOpen: false,
    group: []
  },
  // path为空时不创建文件夹
  path: '',
  // api文件的生成地址,为空时不生成api文件
  api: '',
  // views页面的生成地址
  views: ''
}