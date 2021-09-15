import { service, serviceJson } from "../../axios/index";
let suffix = window.ROOT_PATH.suffix1;
//物料属性创建
const materialPropertiesAdd = data => {
    return serviceJson({
      url:suffix + "/gd/specificationInfo/addSpecificationInfo.do",
      method: "post",
      data: data
    });
  };
  //物料属性列表
const querySpecificationInfoList = data => {
  return serviceJson({
    url: suffix + "/gd/specificationInfo/querySpecificationInfoList.do",
    method: "post",
    data: data
  });
};
//物料属性删除 ///
const cancelSpecificationInfo = data => {
  return serviceJson({
    url: suffix + "/gd/specificationInfo/cancelSpecificationInfo.do",
    method: "post",
    data: data
  });
};
//物料属性启用
const enableSpecificationInfo = data => {
  return serviceJson({
    url: suffix + "/gd/specificationInfo/enableSpecificationInfo.do",
    method: "post",
    data: data
  });
};
//物料属性禁用

const stopSpecificationInfo = data => {
  return serviceJson({
    url: suffix + "/gd/specificationInfo/stopSpecificationInfo.do",
    method: "post",
    data: data
  });
};
//物料属性根据id获取详情
const querySpecificationInfoAndValue = data => {
  return serviceJson({
    url: suffix + "/gd/specificationInfo/querySpecificationInfoAndValue.do",
    method: "post",
    params: data
  });
};
//物料属性修改
const editSpecificationInfo = data => {
  return serviceJson({
    url:suffix + "/gd/specificationInfo/editSpecificationInfo.do",
    method: "post",
    data: data
  });
};
//获取物料树形结构
const getGoodsCategoryTree = data => {
  return serviceJson({
    url: suffix + "/goodsCategory/getGoodsCategoryTree.do",
    method: "get",
    params:data

  });
};
//新增物料分类  //保存
const saveGoodsCategorys = data => {
  return serviceJson({
    url: suffix + "/goodsCategory/saveGoodsCategorys.do",
    method: "post",
    data:data
  });
};
//物料分类查询列表
const goodsCategorySelect = data => {
  return serviceJson({
    url: suffix + "/goodsCategory/select.do",
    method: "post",
    data:data
  });
};
//物料属性组列表
const selectList = data => {
  return serviceJson({
    url: suffix + "/specificationGroup/selectList.do",
    method: "post",
    data:data
  });
};
//物料属性组的新增
const insertGroup = data => {
  return serviceJson({
    url: suffix + "/specificationGroup/insert.do",
    method: "post",
    data:data
  });
};
//属性组删除

const deleteGroup = data => {
  return serviceJson({
    url: suffix + "/specificationGroup/delete.do",
    method: "post",
    data:data
  });
};
//属性大类的删除
const deleteClass= data => {
  return serviceJson({
    url: suffix + "/goodsCategory/delete.do",
    method: "post",
    data:data
  });
};
//属性组修改
const updateGroup= data => {
  return serviceJson({
    url: suffix + "/specificationGroup/update.do",
    method: "post",
    data:data
  });
};
//物料档案获取id
const getGdSpecificationInfoListByCategoryId= data => {
  return serviceJson({
    url: suffix + "/gd/specificationInfo/getGdSpecificationInfoListByCategoryId.do",
    method: "post",
    params:data
  });
};
//物料档案增加属性
const getGdSpecificationInfoListByGdSpecificationInfoList= data => {
  return serviceJson({
    url: suffix +"/gd/specificationInfo/getGdSpecificationInfoListByGdSpecificationInfoList.do",
    method: "post",
    data:data
  });
};
//物料档案增加属性
const getGdSpecificationValueBySpecificationId= data => {
  return serviceJson({
    url: suffix +"/gd/specificationValue/getGdSpecificationValueBySpecificationId.do",
    method: "post",
    params:data
  });
};
//物料档案第二单位/基本单位
const getGdGoodsUnitListByIsInactive= data => {
  return serviceJson({
    url: suffix + "/gd/goodUnit/getGdGoodsUnitListByIsInactive.do",
    method: "post",
    params:data
  });
};
//物料档案新增列表
const getGdGoodsBaseSkuList= data => {
  return serviceJson({
    url: suffix + "/base/sku/getGdGoodsBaseSkuList.do",
    method: "post",
    data:data
  });
};
//物料档案保存
const saveGdGoodsBase= data => {
  return serviceJson({
    url: suffix + "/base/spu/saveGdGoodsBase.do",
    method: "post",
    data:data
  });
};
//物料档案查询列表
const getGdGoodsBaseSpuList= data => {
  return serviceJson({
    url: suffix + "/base/spu/getGdGoodsBaseSpuList.do",
    method: "post",
    data:data
  });
};
//物料档案启用禁用删除
const isInactiveGdGoodsBaseSpuList= data => {
  return serviceJson({
    url: suffix + "/base/spu/isInactiveGdGoodsBaseSpuList.do",
    method: "post",
    data:data
  });
};
//物料档案修改查询spu
const getGdGoodsBaseSpu= data => {
  return serviceJson({
    url: suffix + "/base/spu/getGdGoodsBaseSpu.do",
    method: "post",
    data:data
  });
};
//物料档案修改删除
const updateGdGoodsBaseSku= data => {
  return serviceJson({
    url:suffix + "/base/sku/updateGdGoodsBaseSku.do",
    method: "post",
    data:data
  });
};
//物料档案修改删除
const getGdSpecificationInfoListBySpuId= data => {
  return serviceJson({
    url: suffix +"/gd/specificationInfo/getGdSpecificationInfoListBySpuId.do",
    method: "post",
    params:data
  });
};
//物料档案属性删除
const deleteGdSpuSpecificationAndGdSkuSpecificationValue= data => {
  return serviceJson({
    url: suffix + "/base/spu/deleteGdSpuSpecificationAndGdSkuSpecificationValue.do",
    method: "post",
    params:data
  });
};
//物料属性组明细删除
const deleteGroupItem= data => {
  return serviceJson({
    url: suffix + "/specificationGroup/deleteGroupItem.do",
    method: "post",
    data:data
  });
};
//物料属性明细删除
const delSpecificationValue= data => {
  return serviceJson({
    url: suffix + "/gd/specificationValue/delSpecificationValue.do",
    method: "post",
    data:data
  });
};
//属性组启用
const activeSpecificationGroup= data => {
  return serviceJson({
    url: suffix + "/specificationGroup/activeSpecificationGroup.do",
    method: "post",
    data:data
  });
};
//属性组批量禁用
const unactiveSpecificationGroup= data => {
  return serviceJson({
    url: suffix + "/specificationGroup/unactiveSpecificationGroup.do",
    method: "post",
    data:data
  });
};
//查询SPU属性
const getGdSpuSpecificationList= data => {
  return serviceJson({
    url: suffix + "/base/spu/getGdSpuSpecificationList.do",
    method: "post",
    data:data
  });
};
//物料档案导出
const exportGdGoodsBaseSku = data => {
  return service({
      url: suffix + "/base/sku/exportGdGoodsBaseSku.do",
      method: "post",
      responseType: 'blob',
      data
  });
};
export default {
  materialPropertiesAdd,
  querySpecificationInfoList,
  cancelSpecificationInfo,
  enableSpecificationInfo,
  stopSpecificationInfo,
  querySpecificationInfoAndValue,
  editSpecificationInfo,
  getGoodsCategoryTree,
  saveGoodsCategorys,
  selectList,
  insertGroup,
  deleteGroup,
  deleteClass,
  updateGroup,
  getGdSpecificationInfoListByCategoryId,
  getGdSpecificationInfoListByGdSpecificationInfoList,
  getGdSpecificationValueBySpecificationId,
  getGdGoodsUnitListByIsInactive,
  getGdGoodsBaseSkuList,
  saveGdGoodsBase,
  goodsCategorySelect,
  getGdGoodsBaseSpuList,
  isInactiveGdGoodsBaseSpuList,
  getGdGoodsBaseSpu,
  updateGdGoodsBaseSku,
  getGdSpecificationInfoListBySpuId,
  deleteGdSpuSpecificationAndGdSkuSpecificationValue,
  deleteGroupItem,
  delSpecificationValue,
  activeSpecificationGroup,
  unactiveSpecificationGroup,
  getGdSpuSpecificationList,
  exportGdGoodsBaseSku

};
