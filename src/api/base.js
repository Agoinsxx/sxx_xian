const base={
    baseUrl:'/api',
    login:'/login',
    selectTbItemAllByPage:"/backend/item/selectTbItemAllByPage",  // 查询商品地址
    selectItemCategoryByParentId:"/backend/itemCategory/selectItemCategoryByParentId", // 商品类目地址
    insertTbItem:"/backend/item/insertTbItem",    // 商品添加地址
    deleteItemById:"/backend/item/deleteItemById", // 商品删除地址
    preUpdateItem: "/backend/item/preUpdateItem",  // 预更新商品地址
    updateTbItem: '/backend/item/updateTbItem',   // 修改商品信息地址
    selectItemParamAll:"/backend/itemParam/selectItemParamAll",   // 规格参数查询地址
    insertItemParam: '/backend/itemParam/insertItemParam',   // 规格参数添加地址
    deleteItemParamById:"/backend/itemParam/deleteItemParamById", // 规格参数删除地址
    selectItemParamByItemCatId:"/backend/itemParam/selectItemParamByItemCatId",  // 规格参数的获取(id)
    selectContentCategoryByParentId:"/content/selectContentCategoryByParentId",//内容分类管理查询
    insertContentCategory:"/content/insertContentCategory",//内容分类管理添加
    deleteContentCategoryById:"/content/deleteContentCategoryById",//内容分类管理删除
    updateContentCategory:"/content/updateContentCategory",//内容分类管理修改
    selectTbContentAllByCategoryId:"/content/selectTbContentAllByCategoryId",//内容分类管理内容部分查询
    insertTbContent:"/content/insertTbContent",//添加
    deleteContentByIds:"/content/deleteContentByIds"//删除
}

export default base