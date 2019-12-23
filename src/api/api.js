var head = process.env.NODE_ENV === 'development' ? '/list' : 'http://120.26.211.143:5001';
export default {
    getPhoneData: `${head}/MallHomePageConfig/GetMallHomePageConfig get`,//得到所有内容
    addPhoneData: `${head}/MallHomePageConfig/SaveMallConfig post`,//添加组件
    sortPhoneData: `${head}/MallHomePageConfig/SaveChangeMallConfig post`,//组件排序

    startGetData:`${head}/MallHomePageConfig/QueryMallHomePageConfigs get`,//表格发布页面
    saveData:`${head}/MallHomePageConfig/SaveMallHomePageConfig get`,//表格发布页面
    updateData:`${head}/MallHomePageConfig/UpdMallHomePageConfigName get`,//表格发布页面
    publishData:`${head}/MallHomePageConfig/PublishMallHomePageConfig get`,//表格发布页面
    removeData:`${head}/MallHomePageConfig/RemoveMallHomePageConfig get`,//表格发布页面

    savePhoneData: `${head}/MallHomePageConfig/SaveMallRollingScreenImageConfig post`,//保存轮播图组件
    removePhoneData: `${head}/MallHomePageConfig/RemoveMallRollingScreenImageConfig post`,//移除轮播图组件

    
    downBase64Img: `${head}/MallHomePageConfig/DownLoadBase64Image post`,//上传图片

    saveBrandNaviGation: `${head}/MallHomePageConfig/SaveBrandNaviGation post`,//保存品牌导航
    removeBrandNaviGation: `${head}/MallHomePageConfig/RemoveBrandNaviGationModel post`,//保存品牌导航
    getShopPromotion: `${head}/MallHomePageConfig/GetShopPromotion post`,//得到品牌
    

    removeFunctionalModule: `${head}/MallHomePageConfig/RemoveMallHomeFunctionModel post`,//移除功能模块组件
    saveFunctionalModule: `${head}/MallHomePageConfig/SaveMallHomeFunctionModel post`,//保存功能模块组件

    removeTitleBar: `${head}/MallHomePageConfig/RemoveMalltitlebar post`,//移除头部标题组件
    saveTitleBar: `${head}/MallHomePageConfig/SaveMalltitlebar post`,//保存头部标题组件

    saveBottomMenu: `${head}/MallHomePageConfig/SaveMallbottommenu post`,//保存底部菜单
    removeBottomMenu: `${head}/MallHomePageConfig/RemoveMallbottommenu post`,//移除底部菜单

    saveMallintegral: `${head}/MallHomePageConfig/SaveMallintegral post`,//保存积分商城
    removeMallintegral : `${head}/MallHomePageConfig/RemoveMallintegral post`,//移除积分商城

    getActivity: `${head}/MallHomePageConfig/GetActivity post`,//有哪些活动
    saveMallactivity: `${head}/MallHomePageConfig/SaveMallactivity post`,//保存推荐活动
    removeMallactivity: `${head}/MallHomePageConfig/RemoveMallactivity post`,//保存推荐活动
    llxData:`/llxData post`
}