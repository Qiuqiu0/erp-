import Vue from "vue";
import Router from "vue-router";

// import auth from "./router/auth";

Vue.use(Router);
const router = new Router({
    routes: [
        {
            path: "/",
            name: "index",
            redirect: "/index/home/systemIndex",
            component: resolve => require(["./views/index/page"], resolve),
            children: [
                //生命树页面
                {
                    path: "/index/home/tree",
                    name: "treeModel",
                    component: resolve => require(["./views/index/home/tree"], resolve),
                    meta: {
                    title:"生命树"
                    }
                },
                {
                    path: "/index/home",
                    name: "indexHome",
                    component: resolve => require(["./views/index/home/page"], resolve)
                },
                //系统 模板文件
                {
                    path: "/index/home/systemIndex",
                    name: "systemIndex",
                    component: resolve =>
                        require(["./views/index/home/systemIndex"], resolve)
                },
                //汇率主数据
                {
                    path: "/index/exchangeRate/exchange",
                    name: "exchange",
                    component: resolve => require(["./views/exchangeRate/index"], resolve),
                    meta:{
                        keepAlive:true
                    }
                },
                //银行主数据
                {
                    path: "/index/bankData/index",
                    name: "bankData",
                    component: resolve => require(["./views/bankData/index"], resolve),
                    meta:{
                        keepAlive:true
                    }
                },
                //货币主数据
                {
                    path: "/index/currencyData/index",
                    name: "currencyData",
                    component: resolve => require(["./views/currencyData/index"], resolve),
                    meta:{
                        keepAlive:true
                    }
                },
                //仓库主数据
                {
                    path: "/index/warehouseData/index",
                    name: "warehouseData",
                    component: resolve =>
                        require(["./views/warehouseData/index"], resolve),
                        meta:{
                            keepAlive:true
                        }
                },
                //创建仓库
                {
                    path: "/index/warehouseData/establish",
                    name: "establish",
                    component: resolve =>
                        require(["./views/warehouseData/establish"], resolve),
                    meta: {
                        parentName: "warehouseData"
                    }
                },
                //汇率管理
                {
                    path: "/index/home/exchange",
                    name: "basicData",
                    component: resolve => require(["./views/exchangeRate/index"], resolve),
                    meta:{
                        keepAlive:true
                    }
                },
                //单位管理
                {
                    path: "/index/home/unitManage",
                    name: "unitManage",
                    component: resolve => require(["./views/unitManage/index"], resolve),
                    meta:{
                        keepAlive:true
                    }
                },
                //员工管理
                {
                    path: "/index/staffData/index",
                    name: "staffData",
                    component: resolve => require(["./views/staffData/index"], resolve),
                    meta:{
                        keepAlive:true
                    }
                },
                //港口管理
                {
                    path: "/index/portData/index",
                    name: "portData",
                    component: resolve => require(["./views/portData/index"], resolve),
                    meta:{
                        keepAlive:true
                    }
                },
                //信用管理 信用账户组管理
                {
                    path: "/index/creditData/creditGroup",
                    name: "creditGroup",
                    component: resolve =>
                        require(["./views/creditData/creditGroup"], resolve),
                        meta:{
                            keepAlive:true
                        }
                },
                //信用管理 信用账户组信用额度
                {
                    path: "/index/creditData/creditGroupCredit",
                    name: "creditGroupCredit",
                    component: resolve =>
                        require(["./views/creditData/creditGroupCredit"], resolve),
                        meta:{
                            keepAlive:true
                        }
                },
                //信用管理 信用账户组信用额度编辑
                {
                    path: "/index/creditData/creditGroupCreditEdit",
                    name: "creditGroupCreditEdit",
                    component: resolve =>
                        require(["./views/creditData/creditGroupCreditEdit"], resolve),
                    meta: {
                        parentName: "creditGroupCredit"
                    }
                },
                //信用管理 信用账户组信用额度详情
                {
                    path: "/index/creditData/creditGroupCreditDetail",
                    name: "creditGroupCreditDetail",
                    component: resolve =>
                        require(["./views/creditData/creditGroupCreditDetail"], resolve),
                    meta: {
                        parentName: "creditGroupCredit"
                    }
                },
                //信用管理 信用账户组额度查询按钮
                {
                    path: "/index/creditData/creditGroupCreditQueryButton",
                    name: "creditGroupCreditQueryButton",
                    component: resolve =>
                        require([
                            "./views/creditData/creditQuery/creditGroupCreditQueryButton"
                        ], resolve),
                    meta: {
                        parentName: "creditGroupCredit"
                    }
                },
                //信用管理 信用账户组额度查询
                {
                    path: "/index/creditData/creditGroupCreditQuery",
                    name: "creditGroupCreditQuery",
                    component: resolve =>
                        require(["./views/creditData/creditGroupCreditQuery"], resolve),
                        meta:{
                            keepAlive:true
                        }
                },
                //信用管理 客户信用额度
                {
                    path: "/index/creditData/customerCredit",
                    name: "customerCredit",
                    component: resolve =>
                        require(["./views/creditData/customerCredit"], resolve),
                        meta:{
                            keepAlive:true
                        }
                },
                //信用管理 客户信用额度编辑
                {
                    path: "/index/creditData/customerCreditEdit",
                    name: "customerCreditEdit",
                    component: resolve =>
                        require(["./views/creditData/customerCreditEdit"], resolve),
                    meta: {
                        parentName: "customerCredit"
                    }
                },
                //信用管理 客户信用额度详情
                {
                    path: "/index/creditData/customerCreditDetail",
                    name: "customerCreditDetail",
                    component: resolve =>
                        require(["./views/creditData/customerCreditDetail"], resolve),
                    meta: {
                        parentName: "customerCredit"
                    }
                },
                //信用管理 客户信用额度查询按钮
                {
                    path: "/index/creditData/customerCreditQueryButton",
                    name: "customerCreditQueryButton",
                    component: resolve =>
                        require([
                            "./views/creditData/creditQuery/customerCreditQueryButton"
                        ], resolve),
                    meta: {
                        parentName: "customerCredit"
                    }
                },
                //信用管理 客户信用额度查询
                {
                    path: "/index/creditData/customerCreditQuery",
                    name: "customerCreditQuery",
                    component: resolve =>
                        require(["./views/creditData/customerCreditQuery"], resolve),
                        meta:{
                            keepAlive:true
                        }
                },
                //信用管理 供应商信用额度
                {
                    path: "/index/creditData/supplierCredit",
                    name: "supplierCredit",
                    component: resolve =>
                        require(["./views/creditData/supplierCredit"], resolve),
                        meta:{
                            keepAlive:true
                        }
                },
                //信用管理 供应商信用额度编辑
                {
                    path: "/index/creditData/supplierCreditEdit",
                    name: "supplierCreditEdit",
                    component: resolve =>
                        require(["./views/creditData/supplierCreditEdit"], resolve),
                    meta: {
                        parentName: "supplierCredit"
                    }
                },
                //信用管理 供应商信用额度详情
                {
                    path: "/index/creditData/supplierCreditDetail",
                    name: "supplierCreditDetail",
                    component: resolve =>
                        require(["./views/creditData/supplierCreditDetail"], resolve),
                    meta: {
                        parentName: "supplierCredit"
                    }
                },
                //信用管理 供应商信用额度查询按钮
                {
                    path: "/index/creditData/supplierCreditQueryButton",
                    name: "supplierCreditQueryButton",
                    component: resolve =>
                        require([
                            "./views/creditData/creditQuery/supplierCreditQueryButton"
                        ], resolve),
                    meta: {
                        parentName: "supplierCredit"
                    }
                },
                //信用管理 供应商信用额度查询
                {
                    path: "/index/creditData/supplierCreditQuery",
                    name: "supplierCreditQuery",
                    component: resolve =>
                        require(["./views/creditData/supplierCreditQuery"], resolve),
                        meta:{
                            keepAlive:true
                        }
                },
                //信用管理 公司额度管理
                {
                    path: "/index/creditData/companyQuotaManagement",
                    name: "companyQuotaManagement",
                    component: resolve =>
                        require(["./views/creditData/companyQuotaManagement"], resolve),
                        meta:{
                            keepAlive:true
                        }
                },
                //公司额度详情
                {
                    path: "/index/creditData/companyQuotaManagementEdit",
                    name: "companyQuotaManagementEdit",
                    component: resolve =>
                        require(["./views/creditData/companyQuotaManagementEdit"], resolve),
                    meta:{
                        parentName:"companyQuotaManagement"
                    }
                },
                //客商额度调整页面
                {
                    path: "/index/creditData/customerOrSupplierQuotaChange",
                    name: "customerOrSupplierQuotaChange",
                    component: resolve =>
                        require(["./views/creditData/customerOrSupplierQuotaChange"], resolve),
                        meta:{
                            keepAlive:true
                        }
                },
                //客商额度调整编辑页面
                {
                    path: "/index/creditData/customerOrSupplierQuotaChangeEdit",
                    name: "customerOrSupplierQuotaChangeEdit",
                    component: resolve =>
                        require(["./views/creditData/customerOrSupplierQuotaChangeEdit"], resolve),
                        meta:{
                            parentName:"customerOrSupplierQuotaChange"
                        }
                },
                //合同管理、双边合同
                {
                    path: "/index/contractMange/bilateral/bilateralContracts",
                    name: "bilateralContracts",
                    component: resolve =>
                        require([
                            "./views/contractMange/bilateral/bilateralContracts"
                        ], resolve),
                    meta:{
                        keepAlive:true
                    }

                },
                //合同管理、双边合同、创建双边合同
                {
                    path: "/index/contractMange/bilateral/createBilateral",
                    name: "createBilateral",
                    component: resolve =>
                        require([
                            "./views/contractMange/bilateral/createBilateral"
                        ], resolve),
                    meta: {
                        parentName: "bilateralContracts"
                    }
                },
                //合同管理、双边合同、双边合同详情
                {
                    path: "/index/contractMange/bilateral/bilateralDetail",
                    name: "bilateralDetail",
                    component: resolve =>
                        require([
                            "./views/contractMange/bilateral/bilateralDetail/bilateralDetail"
                        ], resolve),
                    meta: {
                        parentName: "bilateralContracts"
                    }
                },
                //合同管理、内贸合同
                {
                    path: "/index/contractMange/domestic/domesticContracts",
                    name: "domesticContract",
                    component: resolve =>
                        require([
                            "./views/contractMange/domestic/domesticContracts"
                        ], resolve),
                    meta:{
                        keepAlive:true
                    }
                },
                //合同管理、创建内贸合同
                {
                    path: "/index/contractMange/domestic/createDomestic",
                    name: "createDomestic",
                    component: resolve =>
                        require(["./views/contractMange/domestic/createDomestic"], resolve),
                    meta: {
                        parentName: "domesticContract"
                    }
                },
                //合同管理、内贸合同、内贸合同详情
                {
                    path: "/index/contractMange/domestic/domesticDetail",
                    name: "domesticDetail",
                    component: resolve =>
                        require([
                            "./views/contractMange/domestic/domesticDetail/domesticDetail"
                        ], resolve),
                    meta: {
                        parentName: "domesticContract"
                    }
                },
                //合同管理、出口合同
                {
                    path: "/index/contractMange/export/exportcontract",
                    name: "exportContract",
                    component: resolve =>
                        require(["./views/contractMange/export/exportContracts"], resolve),
                        meta:{
                            keepAlive:true
                        }
                },
                //合同管理、创建出口合同
                {
                    path: "/index/contractMange/export/createExport",
                    name: "createExport",
                    component: resolve =>
                        require(["./views/contractMange/export/createExport"], resolve),
                    meta: {
                        parentName: "exportContract"
                    }
                },
                //合同管理、出口合同、出口合同详情
                {
                    path: "/index/contractMange/export/exportDetail",
                    name: "exportDetail",
                    component: resolve =>
                        require([
                            "./views/contractMange/export/exportDetail/exportDetail"
                        ], resolve),
                    meta: {
                        parentName: "exportContract"
                    }
                },
                //合同管理、框架协议
                {
                    path: "/index/contractMange/frame/framecontract",
                    name: "frameContract",
                    meta:{
                        keepAlive:true
                    },
                    component: resolve =>
                        require(["./views/contractMange/frame/frameContracts"], resolve),

                },
                //合同管理、创建框架协议
                {
                    path: "/index/contractMange/frame/createFrame",
                    name: "createFrame",
                    component: resolve =>
                        require(["./views/contractMange/frame/createFrame"], resolve),
                    meta: {
                        parentName: "frameContract"
                    }
                },
                //合同管理、查看框架协议
                {
                    path: "/index/contractMange/frame/checkFrame",
                    name: "checkFrame",
                    component: resolve =>
                        require(["./views/contractMange/frame/checkFrame"], resolve),
                    meta: {
                        parentName: "frameContract"
                    }
                },
                //合同管理、内贸采购合同
                {
                    path: "/index/contractMange/netrade/netradecontract",
                    name: "netradeContract",
                    component: resolve =>
                        require(["./views/contractMange/netrade/netradeContracts"], resolve),
                    meta:{
                        keepAlive:true
                    }
                },
                //合同管理、创建内贸采购合同
                {
                    path: "/index/contractMange/netrade/createNetrade",
                    name: "createNetrade",
                    component: resolve =>
                        require(["./views/contractMange/netrade/createNetrade"], resolve),
                    meta: {
                        parentName: "netradeContract"
                    }
                },
                //合同管理、采购合同、采购合同详情
                {
                    path: "/index/contractMange/netrade/neDetail",
                    name: "neDetail",
                    component: resolve =>
                        require(["./views/contractMange/netrade/nei/neiDetail"], resolve),
                    meta: {
                        parentName: "netradeContract"
                    }
                },
                //合同管理、进口采购合同
                {
                    path: "/index/contractMange/jktrade/jktradecontract",
                    name: "jktradeContract",
                    component: resolve =>
                        require(["./views/contractMange/jktrade/jktradeContracts"], resolve),
                        meta:{
                            keepAlive:true
                        }
                },
                //合同管理、创建进口采购合同
                {
                    path: "/index/contractMange/jktrade/createJktrade",
                    name: "createJktrade",
                    component: resolve =>
                        require(["./views/contractMange/jktrade/createJktrade"], resolve),
                    meta: {
                        parentName: "jktradeContract"
                    }
                },
                //合同管理、进口采购合同、进口采购合同详情
                {
                    path: "/index/contractMange/jktrade/jkDetail",
                    name: "jkDetail",
                    component: resolve =>
                        require(["./views/contractMange/jktrade/jin/jinDetail"], resolve),
                    meta: {
                        parentName: "jktradeContract"
                    }
                },
                //公司管理
                {
                    path: "/index/company/companyMan",
                    name: "companyMan",
                    component: resolve => require(["./views/company/companyMan"], resolve),
                    meta:{
                        keepAlive:true
                    }
                },
                //公司管理创建
                // {
                //   path: "/index/company/companyCreat/:data",
                //   name: "companyCreat",
                //   component: resolve =>
                //     require(["./views/company/companyCreat"], resolve),
                //   meta: {
                //     parentName: "companyMan"
                //   }
                // },
                //公司管理修改查看
                {
                    path: "/index/company/companyCreat",
                    name: "companyCreat",
                    component: resolve =>
                        require(["./views/company/companyCreat"], resolve),
                    meta: {
                        parentName: "companyMan"
                    }
                },
                //部门
                {
                    path: "/index/comDepartment/comDepartment",
                    name: "comDepartment",
                    component: resolve =>
                        require(["./views/comDepartment/comDepartment"], resolve),
                        meta:{
                            keepAlive:true
                        }
                },
                //仓库详情
                {
                    path: "/index/warehouseData/warehouseDetail",
                    name: "warehouseDetail",
                    component: resolve =>
                        require(["./views/warehouseData/warehouseDetail"], resolve)
                },
                //产品数据/物料档案
                {
                    path: "/index/productData/MaterialFiles",
                    name: "MaterialFiles",
                    // redirect: "/index/productData/MaterialFiles",
                    component: resolve =>
                        require(["./views/productData/MaterialFiles"], resolve),
                        meta:{
                            keepAlive:true
                        }
                },
                //产品数据/物料档案新增
                {
                    path: "/index/productData/MaterialFilesAdd",
                    name: "MaterialFilesAdd",
                    // redirect: "/index/productData/MaterialFiles",
                    component: resolve =>
                        require(["./views/productData/MaterialFilesAdd"], resolve),
                    meta: {
                        parentName: "MaterialFiles"
                    }
                },
                //产品数据/物料档案修改
                {
                    path: "/index/productData/MaterialFilesChange",
                    name: "MaterialFilesChange",
                    // redirect: "/index/productData/MaterialFiles",
                    component: resolve =>
                        require(["./views/productData/MaterialFilesChange"], resolve),
                    meta: {
                        parentName: "MaterialFiles"
                    }
                },
                //产品数据/物料档案查看
                {
                    path: "/index/productData/MaterialFilesSee",
                    name: "MaterialFilesSee",
                    component: resolve =>
                        require(["./views/productData/MaterialFilesSee"], resolve),
                    meta: {
                        parentName: "MaterialFiles"
                    }
                },
                //产品数据/物料属性
                {
                    path: "/index/productData/MaterialProperties",
                    name: "MaterialProperties",
                    component: resolve =>
                        require(["./views/productData/MaterialProperties"], resolve),
                        meta:{
                            keepAlive:true
                        }
                },
                //产品数据/物料属性组
                {
                    path: "/index/productData/MaterialPropertiesList",
                    name: "MaterialPropertiesList",
                    component: resolve =>
                        require(["./views/productData/MaterialPropertiesList"], resolve),
                        meta:{
                            keepAlive:true
                        }
                },
                //产品数据/物料大类
                {
                    path: "/index/productData/MaterialClassification",
                    name: "MaterialClassification",
                    component: resolve =>
                        require(["./views/productData/MaterialClassification"], resolve),
                        meta:{
                            keepAlive:true
                        }
                },
                //基础数据 客户管理
                {
                    path: "/index/basicData/customer",
                    name: "customer",
                    component: resolve => require(["./views/basicData/customer"], resolve),
                    meta:{
                        keepAlive:true
                    }
                },
                //基础数据 客户管理编辑
                {
                    path: "/index/basicData/customerEdit",
                    name: "customerEdit",
                    component: resolve =>
                        require(["./views/basicData/customerEdit"], resolve),
                    meta: {
                        parentName: "customer"
                    }
                },
                //基础数据 客户管理详情
                {
                    path: "/index/basicData/customerDetail",
                    name: "customerDetail",
                    component: resolve =>
                        require(["./views/basicData/customerDetail"], resolve),
                    meta: {
                        parentName: "customer"
                    }
                },
                //基础数据 供应商管理
                {
                    path: "/index/basicData/supplier",
                    name: "supplier",
                    component: resolve => require(["./views/basicData/supplier"], resolve),
                    meta:{
                        keepAlive:true
                    }
                },
                //基础数据 供应商管理编辑
                {
                    path: "/index/basicData/supplierEdit",
                    name: "supplierEdit",
                    component: resolve =>
                        require(["./views/basicData/supplierEdit"], resolve),
                    meta: {
                        parentName: "supplier"
                    }
                },
                //基础数据 供应商管理详情
                {
                    path: "/index/basicData/supplierDetail",
                    name: "supplierDetail",
                    component: resolve =>
                        require(["./views/basicData/supplierDetail"], resolve),
                    meta: {
                        parentName: "supplier"
                    }
                },
                //产品数据/物料属性 创建属性
                {
                    path: "/index/productData/MaterialPropertiesAdd",
                    name: "MaterialPropertiesAdd",
                    component: resolve =>
                        require(["./views/productData/MaterialPropertiesAdd"], resolve),
                    meta: {
                        parentName: "MaterialProperties"
                    }
                },
                //产品数据/物料属性组 新增属性组
                {
                    path: "/index/productData/MaterialPropertiesListAdd",
                    name: "MaterialPropertiesListAdd",
                    component: resolve =>
                        require(["./views/productData/MaterialPropertiesListAdd"], resolve),
                    meta: {
                        parentName: "MaterialPropertiesList"
                    }
                },
                //库存管理 其他入库
                {
                    path: "/index/stockBranch/otherWarehousing",
                    name: "otherWarehousing",
                    component: resolve =>
                        require(["./views/stockBranch/otherWarehousing"], resolve),
                        meta:{
                            keepAlive:true
                        }
                },
                // {
                //   //库存管理 其他入库创建
                //   path: "index/stockBranch/oterWarehousingcreat/:data",
                //   name: "oterWarehousingcreat",
                //   component: resolve =>
                //     require(["./views/stockBranch/oterWarehousingcreat"], resolve),
                //   meta: {
                //     parentName: "otherWarehousing"
                //   }
                // },
                {
                    //库存管理 其他入库修改查看
                    path: "/index/stockBranch/oterWarehousingcreat",
                    name: "oterWarehousingcreat",
                    component: resolve =>
                        require(["./views/stockBranch/oterWarehousingcreat"], resolve),
                    meta: {
                        parentName: "otherWarehousing"
                    }
                },
                //库存管理 其他出库
                {
                    path: "/index/stockBranch/otherOutlets",
                    name: "otherOutlets",
                    component: resolve =>
                        require(["./views/stockBranch/otherOutlets"], resolve),
                        meta:{
                            keepAlive:true
                        }
                },
                //库存管理 其他出库创建
                // {
                //   path: "/index/stockBranch/otherOutcreat/:data",
                //   name: "otherOutcreat",
                //   component: resolve =>
                //     require(["./views/stockBranch/otherOutcreat"], resolve),
                //   meta: {
                //     parentName: "otherOutlets"
                //   }
                // },
                //库存管理 其他出库查看修改
                {
                    path: "/index/stockBranch/otherOutcreat",
                    name: "otherOutcreat",
                    component: resolve =>
                        require(["./views/stockBranch/otherOutcreat"], resolve),
                    meta: {
                        parentName: "otherOutlets"
                    }
                },
                //库存管理 库存调拨
                {
                    path: "/index/stockBranch/stockControl",
                    name: "stockControl",
                    component: resolve =>
                        require(["./views/stockBranch/stockControl"], resolve),
                        meta:{
                            keepAlive:true
                        }
                },
                //库存管理 库存调拨移库增加
                // {
                //   path: "/index/stockBranch/stockControlcreat/:data",
                //   name: "stockControlcreats",
                //   component: resolve =>
                //     require(["./views/stockBranch/stockControlcreat"], resolve),
                //   meta: {
                //     parentName: "stockControl"
                //   }
                // },
                //库存管理 库存调拨移库查看修改
                {
                    path: "/index/stockBranch/stockControlcreat",
                    name: "stockControlcreat",
                    component: resolve =>
                        require(["./views/stockBranch/stockControlcreat"], resolve),
                    meta: {
                        parentName: "stockControl"
                    }
                },
                //库存管理 库存调拨增加
                // {
                //   path: "/index/stockBranch/stockControlout/:data",
                //   name: "stockControlouts",
                //   component: resolve =>
                //     require(["./views/stockBranch/stockControlout"], resolve),
                //   meta: {
                //     parentName: "stockControl"
                //   }
                // },
                //库存管理 库存调拨增加
                {
                    path: "/index/stockBranch/stockControlout",
                    name: "stockControlout",
                    component: resolve =>
                        require(["./views/stockBranch/stockControlout"], resolve),
                    meta: {
                        parentName: "stockControl"
                    }
                },
                //库存管理 码单管理
                {
                    path: "/index/stockBranch/codeSheet",
                    name: "codeSheet",
                    component: resolve =>
                        require(["./views/stockBranch/codeSheet"], resolve),
                        meta:{
                            keepAlive:true
                        }
                },
                //库存管理 码单管理创建
                // {
                //   path: "/index/stockBranch/codeSheetcreat/:data",
                //   name: "codeSheetcreats",
                //   component: resolve =>
                //     require(["./views/stockBranch/codeSheetcreat"], resolve),
                //   meta: {
                //     parentName: "codeSheet"
                //   }
                // },
                //库存管理 码单管理查看修改
                {
                    path: "/index/stockBranch/codeSheetcreat",
                    name: "codeSheetcreat",
                    component: resolve =>
                        require(["./views/stockBranch/codeSheetcreat"], resolve),
                    meta: {
                        parentName: "codeSheet"
                    }
                },

                //基础数据，项目维护
                {
                    path: "/index/basicData/projectMaintenance",
                    name: "projectMaintenance",
                    component: resolve =>
                        require(["./views/basicData/projectMaintenance"], resolve),
                        meta:{
                            keepAlive:true
                        }
                },
                //基础数据，项目维护编辑
                {
                    path: "/index/basicData/projectMaintenanceEdit",
                    name: "projectMaintenanceEdit",
                    component: resolve =>
                        require(["./views/basicData/projectMaintenanceEdit"], resolve),
                    meta: {
                        parentName: "projectMaintenance"
                    }
                },
                //采购管理/采购提单
                {
                    path: "/index/Purchase/ladingBill",
                    name: "ladingBill",
                    component: resolve =>
                        require(["./views/Purchase/ladingBill"], resolve),
                        meta:{
                            keepAlive:true
                        }

                },
                //采购管理/采购提单创建
                {
                    path: "/index/Purchase/ladingBillEstablish",
                    name: "ladingBillEstablish",
                    component: resolve =>
                        require(["./views/Purchase/ladingBillEstablish"], resolve),
                    meta: {
                        parentName: "ladingBill"
                    }
                },
                //采购管理/采购提单查看
                {
                    path: "/index/Purchase/laddingBillEstablishSee",
                    name: "laddingBillEstablishSee",
                    component: resolve =>
                        require(["./views/Purchase/laddingBillEstablishSee"], resolve),
                    meta: {
                        parentName: "ladingBill"
                    }
                },
                //采购管理/采购入库
                {
                    path: "/index/Purchase/warehousing",
                    name: "warehousing",
                    component: resolve =>
                        require(["./views/Purchase/warehousing"], resolve),
                        meta:{
                            keepAlive:true
                        }
                },
                //采购管理/采购入库
                {
                    path: "/index/Purchase/warehousingDetails",
                    name: "warehousingDetails",
                    component: resolve =>
                        require(["./views/Purchase/warehousingDetails"], resolve),
                    meta: {
                        parentName: "warehousing"
                    }
                },
                //采购管理/采购冲销
                {
                    path: "/index/Purchase/reverse",
                    name: "reverse",
                    component: resolve => require(["./views/Purchase/reverse"], resolve),
                    meta:{
                        keepAlive:true
                    }
                },
                //采购管理/采购冲销编辑
                {
                    path: "/index/Purchase/reversehousingDetails",
                    name: "reversehousingDetails",
                    component: resolve =>
                        require(["./views/Purchase/reversehousingDetails"], resolve),
                    meta: {
                        parentName: "reverse"
                    }
                },
                //采购管理/采购入库查看
                {
                    path: "/index/Purchase/warehousingDetailsSee",
                    name: "warehousingDetailsSee",
                    component: resolve =>
                        require(["./views/Purchase/warehousingDetailsSee"], resolve),
                    meta: {
                        parentName: "warehousing"
                    }
                },
                //采购管理/采购发票
                {
                    path: "/index/Purchase/invoiceCheck",
                    name: "invoiceCheck",
                    component: resolve =>
                        require(["./views/Purchase/invoiceCheck"], resolve),
                    meta: {
                        parentName: "invoice"
                    }
                },
                {
                    path: "/index/Purchase/invoice",
                    name: "invoice",
                    component: resolve => require(["./views/Purchase/invoice"], resolve),
                    meta:{
                        keepAlive:true
                    }

                },
                //采购管理/采购发票编辑
                {
                    path: "/index/Purchase/invoiceDetails",
                    name: "invoiceDetails",
                    component: resolve =>
                        require(["./views/Purchase/invoiceDetails"], resolve),
                    meta: {
                        parentName: "invoice"
                    }
                },
                //销售管理/销售出库单
                {
                    path: "/index/salesManage/salesIssueDoc",
                    name: "salesIssueDoc",
                    component: resolve =>
                        require(["./views/salesManage/salesIssueDoc"], resolve),
                        meta:{
                            keepAlive:true
                        }
                },
                //销售管理/销售出库单/创建（合同发货）
                {
                    path: "/index/salesManage/contractDelivery",
                    name: "contractDelivery",
                    component: resolve =>
                        require(["./views/salesManage/contractDelivery"], resolve),
                    meta: {
                        parentName: "salesIssueDoc"
                    }
                },
                //销售管理/销售出库单/创建（零售发货）
                {
                    path: "/index/salesManage/retailShipment",
                    name: "retailShipment",
                    component: resolve =>
                        require(["./views/salesManage/retailShipment"], resolve),
                    meta: {
                        parentName: "salesIssueDoc"
                    }
                },
                //销售管理/销售出库单/创建（码单发货）
                {
                    path: "/index/salesManage/codeSheetDelivery",
                    name: "codeSheetDelivery",
                    component: resolve =>
                        require(["./views/salesManage/codeSheetDelivery"], resolve),
                    meta: {
                        parentName: "salesIssueDoc"
                    }
                },
                // //销售出库单查看
                {
                    path: "/index/salesManage/salesIssueDocDetail",
                    name: "salesIssueDocDetail",
                    component: resolve =>
                        require(["./views/salesManage/salesIssueDocDetail"], resolve),
                    meta: {
                        parentName: "salesIssueDoc"
                    }
                },
                // //销售出库单修改
                {
                    path: "/index/salesManage/salesIssueDocEdit",
                    name: "salesIssueDocEdit",
                    component: resolve =>
                        require(["./views/salesManage/salesIssueDocEdit"], resolve),
                    meta: {
                        parentName: "salesIssueDoc"
                    }
                },
                //销售退货单
                {
                    path: "/index/salesManage/salesReturnOrder",
                    name: "salesReturnOrder",
                    component: resolve =>
                        require(["./views/salesManage/salesReturnOrder"], resolve),
                        meta:{
                            keepAlive:true
                        }
                },
                //销售退货单-查看
                {
                    path: "/index/salesManage/salesReturnOrderDetail",
                    name: "salesReturnOrderDetail",
                    component: resolve =>
                        require(["./views/salesManage/salesReturnOrderDetail"], resolve),
                    meta: {
                        parentName: "salesReturnOrder"
                    }
                },
                //销售退货单-编辑
                {
                    path: "/index/salesManage/salesReturnOrderEdit",
                    name: "salesReturnOrderEdit",
                    component: resolve =>
                        require(["./views/salesManage/salesReturnOrderEdit"], resolve),
                    meta: {
                        parentName: "salesReturnOrder"
                    }
                },
                //销售发票
                {
                    path: "/index/salesManage/salesInvoice",
                    name: "salesInvoice",
                    component: resolve =>
                        require(["./views/salesManage/salesInvoice"], resolve),
                        meta:{
                            keepAlive:true
                        }
                },
                //销售发票-编辑
                {
                    path: "/index/salesManage/salesInvoiceEdit",
                    name: "salesInvoiceEdit",
                    component: resolve =>
                        require(["./views/salesManage/salesInvoiceEdit"], resolve),
                    meta: {
                        parentName: "salesInvoice"
                    }
                },
                //销售发票-查看
                {
                    path: "/index/salesManage/salesInvoiceDetail",
                    name: "salesInvoiceDetail",
                    component: resolve =>
                        require(["./views/salesManage/salesInvoiceDetail"], resolve),
                    meta: {
                        parentName: "salesInvoice"
                    }
                },
                //结算单
                {
                    path: "/index/salesManage/settlementSheet",
                    name: "settlementSheet",
                    component: resolve =>
                        require(["./views/salesManage/settlementSheet"], resolve),
                        meta:{
                            keepAlive:true
                        }
                },
                //结算单创建
                // {
                //   path: "/index/salesManage/settlementSheet/:data",
                //   name: "settlementCreats",
                //   component: resolve =>
                //     require(["./views/salesManage/settlementCreat"], resolve),
                //   meta: {
                //     parentName: "settlementSheet"
                //   }
                // },
                //结算单修改查看
                {
                    path: "/index/salesManage/settlementCreat",
                    name: "settlementCreat",
                    component: resolve =>
                        require(["./views/salesManage/settlementCreat"], resolve),
                    meta: {
                        parentName: "settlementSheet"
                    }
                },
                //资金管理/凭证模块/凭证
                {
                    path: "/index/fundsManage/credentials/credentials",
                    name: "credentials",
                    meta: {
                        keepAlive: true
                    },
                    component: resolve =>
                        require([
                            "./views/fundsManage/credentials/credentials"
                        ], resolve)
                },
                //资金管理/凭证模块/凭证模板
                {
                    path: "/index/fundsManage/credentials/credentialsTemplate",
                    name: "credentialsTemplate",
                    meta: {
                        keepAlive: true
                    },
                    component: resolve =>
                        require([
                            "./views/fundsManage/credentials/credentialsTemplate"
                        ], resolve)
                },
                //资金管理/凭证模块/凭证模板创建
                {
                    path: "/index/fundsManage/credentials/credentialsTemplateAdd",
                    name: "credentialsTemplateAdd",
                    meta: {
                        keepAlive: true
                    },
                    component: resolve =>
                        require([
                            "./views/fundsManage/credentials/credentialsTemplateAdd"
                        ], resolve),
                    meta: {
                        parentName: "credentialsTemplate"
                    }
                },
                //资金管理/收款管理/收款单
                {
                    path: "/index/fundsManage/creditManage/creditNotes",
                    name: "creditNotes",
                    meta: {
                        keepAlive: true
                    },
                    component: resolve =>
                        require([
                            "./views/fundsManage/creditManage/creditNotes/index"
                        ], resolve)
                },
                //资金管理/收款管理/收款单详情
                {
                    path: "/index/fundsManage/creditManage/creditDetail:id",
                    name: "creditDetail",
                    component: resolve =>
                        require([
                            "./views/fundsManage/creditManage/creditDetail/index"
                        ], resolve),
                    meta: {
                        parentName: "creditNotes"
                    }
                },
                //资金管理/收款管理/收款单认领
                {
                    path: "/index/fundsManage/creditManage/creditNoteReclaims",
                    name: "creditNoteReclaims",
                    meta: {
                        keepAlive: true
                    },
                    component: resolve =>
                        require([
                            "./views/fundsManage/creditManage/creditNoteReclaims/index"
                        ], resolve)
                },
                //资金管理/收款管理/收款单认领详情
                {
                    path: "/index/fundsManage/creditManage/reclaimDetail:id",
                    name: "reclaimDetail",
                    component: resolve =>
                        require([
                            "./views/fundsManage/creditManage/reclaimDetail/index"
                        ], resolve),
                    meta: {
                        parentName: "creditNoteReclaims"
                    }
                },
                //资金管理/付款管理/付款单
                {
                    path: "/index/fundsManage/paymentManage/paymentOrder",
                    name: "paymentOrder",
                    meta: {
                        keepAlive: true
                    },
                    component: resolve =>
                        require([
                            "./views/fundsManage/paymentManage/paymentOrder/index"
                        ], resolve)
                },
                //资金管理/付款管理/付款单详情
                {
                    path: "/index/fundsManage/paymentManage/paymentDetail:id",
                    name: "paymentDetail",
                    component: resolve =>
                        require([
                            "./views/fundsManage/paymentManage/paymentDetail/index"
                        ], resolve),
                    meta: {
                        parentName: "paymentOrder"
                    }
                },
                //资金管理/付款管理/付款申请单
                {
                    path: "/index/fundsManage/paymentManage/demandForPayment",
                    name: "demandForPayment",
                    meta: {
                        keepAlive: true
                    },
                    component: resolve =>
                        require([
                            "./views/fundsManage/paymentManage/demandForPayment/index"
                        ], resolve)
                },
                //资金管理/付款管理/付款申请单详情
                {
                    path: "/index/fundsManage/paymentManage/demandPaymentDetail:id",
                    name: "demandPaymentDetail",
                    component: resolve =>
                        require([
                            "./views/fundsManage/paymentManage/demandPaymentDetail/index"
                        ], resolve),
                    meta: {
                        parentName: "demandForPayment"
                    }
                },
                //资金管理/付款管理/付款申请单 ----》预付物流费用/无合同客户退款创建，认领页面
                {
                    path: "/index/fundsManage/paymentManage/demandPaymentClaim/demandPaymentClaim",
                    name: "demandPaymentClaim",
                    component: resolve =>
                        require([
                            "./views/fundsManage/paymentManage/demandPaymentClaim/demandPaymentClaim"
                        ], resolve),
                    meta: {
                        parentName: "demandForPayment"
                    }
                },
                //资金管理/票据管理/应付票据列表
                {
                    path: "/index/fundsManage/billmanage/paymentBills",
                    name: "paymentBills",
                    meta: {
                        keepAlive: true
                    },
                    component: resolve =>
                        require([
                            "./views/fundsManage/billmanage/paymentBills/index"
                        ], resolve)
                },
                //资金管理/票据管理/应付票据详情
                {
                    path: "/index/fundsManage/billmanage/paymentBIllDetail:id",
                    name: "paymentBIllDetail",
                    component: resolve =>
                        require([
                            "./views/fundsManage/billmanage/paymentBIllDetail/index"
                        ], resolve),
                    meta: {
                        parentName: "paymentBills"
                    }
                },
                //资金管理/票据管理/应收票据列表
                {
                    path: "/index/fundsManage/billmanage/receivableBills",
                    name: "receivableBills",
                    meta: {
                        keepAlive: true
                    },
                    component: resolve =>
                        require([
                            "./views/fundsManage/billmanage/receivableBills/index"
                        ], resolve)
                },
                //资金管理/票据管理/应收票据详情
                {
                    path: "/index/fundsManage/billmanage/receivableBillDetail:id",
                    name: "receivableBillDetail",
                    component: resolve =>
                        require([
                            "./views/fundsManage/billmanage/receivableBillDetail/index"
                        ], resolve),
                    meta: {
                        parentName: "receivableBills"
                    }
                },
                //资金管理/信用证管理/收到信用证
                {
                    path: "/index/fundsManage/letterManage/firstIndex",
                    name: "firstIndex",
                    component: resolve =>
                        require(["./views/fundsManage/letterManage/firstIndex"], resolve),
                        meta:{
                            keepAlive:true
                        }
                    // meta: {
                    //   parentName: "firstIndex"
                    // }
                },
                {
                    path: "/index/fundsManage/letterManage/creatNew",
                    name: "creatNew",
                    component: resolve =>
                        require(["./views/fundsManage/letterManage/creatNew"], resolve),
                    meta: {
                        parentName: "firstIndex"
                    }
                },
                //资金管理/信用证管理/开出信用证
                {
                    path: "/index/fundsManage/letterManage/establishmentIndex",
                    name: "establishmentIndex",
                    component: resolve =>
                        require([
                            "./views/fundsManage/letterManage/establishmentIndex"
                        ], resolve),
                        meta:{
                            keepAlive:true
                        }
                    // meta: {
                    //   parentName: "establishmentIndex"
                    // }
                },
                //资金管理/月结模块/月结
                {
                    path: "/index/fundsManage/monthlyStatement/monthlyStatementPage",
                    name: "monthlyStatementPage",
                    component: resolve =>
                        require([
                            "./views/fundsManage/monthlyStatement/monthlyStatementPage"
                        ], resolve),
                        meta:{
                            keepAlive:true
                        }
                    // meta: {
                    //     parentName: "monthlyStatementPage"
                    // }
                },
                //月结库存明细表
                {
                    path: "/index/fundsManage/monthlyStatement/monthStock",
                    name: "monthStock",
                    component: resolve =>
                        require([
                            "./views/fundsManage/monthlyStatement/monthStock"
                        ], resolve),
                        meta:{
                            keepAlive:true
                        }
                },
                //月结库存明细表2——改版
                {
                    path: "/index/fundsManage/monthlyStatement/monthStockVersion2",
                    name: "monthStockVersion2",
                    component: resolve =>
                        require([
                            "./views/fundsManage/monthlyStatement/monthStockVersion2"
                        ], resolve),
                        meta:{
                            keepAlive:true
                        }
                },
                {
                    path: "/index/fundsManage/letterManage/establishment",
                    name: "establishment",
                    component: resolve =>
                        require(["./views/fundsManage/letterManage/establishment"], resolve),
                    meta: {
                        parentName: "establishmentIndex"
                    }
                },
                //资金结售汇管理/结售汇申请/结售汇申请列表
                {
                    path: "/index/fundsManage/fiSettleManage/fiSettleApplyList",
                    name: "fiSettleApplyList",
                    meta: {
                        keepAlive: true
                    },
                    component: resolve =>
                        require([
                            "./views/fundsManage/fiSettleManage/fiSettleApplyList/index"
                        ], resolve)
                },
                //资金结售汇管理/结售汇申请/结售汇申请详情
                {
                    path: "/index/fundsManage/fiSettleManage/fiSettleApplyDetail:id",
                    name: "fiSettleApplyDetail",
                    meta: {
                        parentName: "fiSettleApplyList"
                    },
                    component: resolve =>
                        require([
                            "./views/fundsManage/fiSettleManage/fiSettleApplyDetail/index"
                        ], resolve)
                },
                //资金结售汇管理/结售汇申请/结售汇执行列表
                {
                    path: "/index/fundsManage/fiSettleManage/fiSettleExecuteList",
                    name: "fiSettleExecuteList",
                    meta: {
                        keepAlive: true
                    },
                    component: resolve =>
                        require([
                            "./views/fundsManage/fiSettleManage/fiSettleExecuteList/index"
                        ], resolve)
                },
                //资金结售汇管理/结售汇申请/结售汇申请详情
                {
                    path: "/index/fundsManage/fiSettleManage/fiSettleExecuteDetail:id",
                    name: "fiSettleExecuteDetail",
                    meta: {
                        parentName: "fiSettleExecuteList"
                    },
                    component: resolve =>
                        require([
                            "./views/fundsManage/fiSettleManage/fiSettleExecuteDetail/index"
                        ], resolve)
                },
                //资金模块/资金计划/资金计划定义
                {
                    path: "/index/fundsManage/fundPlansManage/definitionOfFundPlan",
                    name: "definitionOfFundPlan",
                    meta: {
                        keepAlive: true
                    },
                    component: resolve =>
                        require([
                            "./views/fundsManage/fundPlansManage/definitionOfFundPlan/index"
                        ], resolve)
                },
                //资金模块/资金计划/资金计划管理
                {
                    path: "/index/fundsManage/fundPlansManage/fundPlanList",
                    name: "fundPlanList",
                    meta: {
                        keepAlive: true
                    },
                    component: resolve =>
                        require([
                            "./views/fundsManage/fundPlansManage/fundPlanList/index"
                        ], resolve)
                },
                //资金模块/资金计划/资金计划管理/资金计划详情
                {
                    path: "/index/fundsManage/fundPlansManage/fundPlanDetail",
                    name: "fundPlanDetail",
                    meta: {
                        parentName: "fundPlanList"
                    },
                    component: resolve =>
                        require([
                            "./views/fundsManage/fundPlansManage/fundPlanDetail/index"
                        ], resolve)
                },
                //资金模块/资金计划/资金计划汇总报表
                {
                path: "/index/fundsManage/fundPlansManage/fundPlanReport",
                name: "fundPlanReport",
                component: resolve =>
                    require([
                        "./views/fundsManage/fundPlansManage/fundPlanReport/index"
                    ], resolve),
                    meta:{
                        keepAlive:true
                    }
                },
                //资金模块/资金计划/资金计划汇总明细报表
                {
                path: "/index/fundsManage/fundPlansManage/fundPlanDetailReport",
                name: "fundPlanDetailReport",
                component: resolve =>
                    require([
                        "./views/fundsManage/fundPlansManage/fundPlanDetailReport/index"
                    ], resolve),
                    meta:{
                        keepAlive:true
                    }
                },
                //资金模块/资金计划/资金计划执行偏离报表
                {
                path: "/index/fundsManage/fundPlansManage/theVarianceFundPlanReport",
                name: "theVarianceFundPlanReport",
                component: resolve =>
                    require([
                        "./views/fundsManage/fundPlansManage/theVarianceFundPlanReport/index"
                    ], resolve),
                    meta:{
                        keepAlive:true
                    }
                },
                //费用管理 费用预提
                {
                    path: "/index/costData/costPrefetch",
                    name: "costPrefetch",
                    component: resolve =>
                        require(["./views/costData/costPrefetch"], resolve),
                        meta:{
                            keepAlive:true
                        }
                },
                //费用管理 费用预提编辑
                {
                    path: "/index/costData/costPrefetchEdit",
                    name: "costPrefetchEdit",
                    component: resolve =>
                        require(["./views/costData/costPrefetchEdit"], resolve),
                    meta: {
                        parentName: "costPrefetch"
                    }
                },
                //费用管理 费用预提详情
                {
                    path: "/index/costData/costPrefetchDetail",
                    name: "costPrefetchDetail",
                    component: resolve =>
                        require(["./views/costData/costPrefetchDetail"], resolve),
                    meta: {
                        parentName: "costPrefetch"
                    }
                },
                //费用管理 费用类别管理
                {
                    path: "/index/costData/costCategory",
                    name: "costCategory",
                    component: resolve =>
                        require(["./views/costData/costCategory"], resolve),
                        meta:{
                            keepAlive:true
                        }
                },
                //费用管理 费用类别管理编辑
                {
                    path: "/index/costData/costCategoryEdit",
                    name: "costCategoryEdit",
                    component: resolve =>
                        require(["./views/costData/costCategoryEdit"], resolve),
                    meta: {
                        parentName: "costCategory"
                    }
                },
                //费用管理 费用类别管理详情
                {
                    path: "/index/costData/costCategoryDetail",
                    name: "costCategoryDetail",
                    component: resolve =>
                        require(["./views/costData/costCategoryDetail"], resolve),
                    meta: {
                        parentName: "costCategory"
                    }
                },
                //费用管理 费用结算
                {
                    path: "/index/costData/costSettle",
                    name: "costSettle",
                    component: resolve =>
                        require(["./views/costData/costSettle"], resolve),
                        meta:{
                            keepAlive:true
                        }
                },
                //费用管理 费用结算编辑
                {
                    path: "/index/costData/costSettleEdit",
                    name: "costSettleEdit",
                    component: resolve =>
                        require(["./views/costData/costSettleEdit"], resolve),
                    meta: {
                        parentName: "costSettle"
                    }
                },
                //费用管理 费用结算详情
                {
                    path: "/index/costData/costSettleDetail",
                    name: "costSettleDetail",
                    component: resolve =>
                        require(["./views/costData/costSettleDetail"], resolve),
                    meta: {
                        parentName: "costSettle"
                    }
                },
                //报表查询 库存报表
                {
                    path: "/index/integratedQuery/reportQuery/stockReport",
                    name: "stockReport",
                    component: resolve =>
                        require([
                            "./views/integratedQuery/reportQuery/stockReport"
                        ], resolve),
                        meta:{
                            keepAlive:true
                        }
                },
                 //报表查询 库存报表_2
                {
                    path: "/index/integratedQuery/reportQuery/inventoryReport",
                    name: "inventoryReport",
                    component: resolve =>
                        require([
                            "./views/integratedQuery/reportQuery/inventoryReport"
                        ], resolve),
                        meta:{
                            keepAlive:true
                        }
                },
                //报表查询  销售合同执行情况
                {
                    path: "/index/integratedQuery/reportQuery/odSoContractReport",
                    name: "odSoContractReport",
                    component: resolve =>
                        require([
                            "./views/integratedQuery/reportQuery/odSoContractReport/index"
                        ], resolve),
                        meta:{
                            keepAlive:true
                        }
                },
                //报表查询  采购（进口）合同跟踪表
                {
                    path: "/index/integratedQuery/reportQuery/odPoForeignContractReport",
                    name: "odPoForeignContractReport",
                    component: resolve =>
                        require([
                            "./views/integratedQuery/reportQuery/odPoForeignContractReport/index"
                        ], resolve),
                        meta:{
                            keepAlive:true
                        }
                },
                //报表查询  采购（内贸）合同跟踪表
                {
                    path: "/index/integratedQuery/reportQuery/odPoInlandContractReport",
                    name: "odPoInlandContractReport",
                    component: resolve =>
                        require([
                            "./views/integratedQuery/reportQuery/odPoInlandContractReport/index"
                        ], resolve),
                        meta:{
                            keepAlive:true
                        }
                },
                //报表查询  应收票据台账
                {
                    path: "/index/integratedQuery/reportQuery/collBill",
                    name: "collBill",
                    component: resolve =>
                        require([
                            "./views/integratedQuery/reportQuery/billLedger/collBill"
                        ], resolve),
                        meta:{
                            keepAlive:true
                        }
                },
                //报表查询  应付票据台账
                {
                    path: "/index/integratedQuery/reportQuery/payBill",
                    name: "payBill",
                    component: resolve =>
                        require([
                            "./views/integratedQuery/reportQuery/billLedger/payBill"
                        ], resolve),
                        meta:{
                            keepAlive:true
                        }
                },
                //报表查询  应收报表
                {
                    path: "/index/integratedQuery/reportQuery/receivableReport",
                    name: "receivableReport",
                    component: resolve =>
                        require([
                            "./views/integratedQuery/reportQuery/receivableReport/index"
                        ], resolve),
                        meta:{
                            keepAlive:true
                        }
                },
                //报表查询  应付报表
                {
                    path: "/index/integratedQuery/reportQuery/paymentReport",
                    name: "paymentReport",
                    component: resolve =>
                        require([
                            "./views/integratedQuery/reportQuery/paymentReport/index"
                        ], resolve),
                        meta:{
                            keepAlive:true
                        }
                },
                //报表查询 到港信息
                {
                    path: "/index/integratedQuery/reportQuery/arrivalPortInfo",
                    name: "arrivalPortInfo",
                    component: resolve => require(["./views/integratedQuery/reportQuery/arrivalPortInfo"], resolve),
                    meta:{
                        keepAlive:true
                    }
                },
                //分合同执行报表
                {
                    path: "/index/integratedQuery/reportQuery/subContractInventoryReport",
                    name: "subContractInventoryReport",
                    component: resolve => require(["./views/integratedQuery/reportQuery/subContractInventoryReport/index"], resolve),
                    meta:{
                        keepAlive:true
                    }
                },
                //出入库明细表
                {
                    path: "/index/integratedQuery/reportQuery/warehouseInOutReport",
                    name: "warehouseInOutReport",
                    component: resolve => require(["./views/integratedQuery/reportQuery/warehouseInOutReport/index"], resolve),
                    meta:{
                        keepAlive:true
                    }
                },
                //采购清单
                {
                    path: "/index/integratedQuery/reportQuery/purchaseListStatistics",
                    name: "purchaseListStatistics",
                    component: resolve => require(["./views/integratedQuery/reportQuery/purchaseListStatistics/index"], resolve),
                    meta:{
                        keepAlive:true
                    }
                },
                //销售清单版本2
                {
                    path: "/index/integratedQuery/reportQuery/saleBillStatistics",
                    name: "saleBillStatistics",
                    component: resolve => require(["./views/integratedQuery/reportQuery/saleBillStatistics/index"], resolve),
                    meta:{
                        keepAlive:true
                    }
                },
                 //销售清单===旧版
                 {
                    path: "/index/integratedQuery/reportQuery/saleBillStatisticsOld",
                    name: "saleBillStatisticsOld",
                    component: resolve => require(["./views/integratedQuery/reportQuery/saleBillStatisticsOld/index"], resolve),
                    meta:{
                        keepAlive:true
                    }
                },
                  //报表查询 收发存报表
                {
                    path: "/index/integratedQuery/reportQuery/receiveReport",
                    name: "receiveReport",
                    component: resolve => require(["./views/integratedQuery/reportQuery/receiveReport"], resolve),
                    meta:{
                        keepAlive:true
                    }
                },
                // 发出商品报表
                {
                    path: "/index/integratedQuery/reportQuery/deliveryOfGoodsReport",
                    name: "deliveryOfGoodsReport",
                    component: resolve => require(["./views/integratedQuery/reportQuery/deliveryOfGoodsReport"], resolve),
                    meta:{
                        keepAlive:true
                    }
                },
                //收付款单报表===》收款单
                {
                    path: "/index/integratedQuery/reportQuery/paymentReceiptReport/receiptReport",
                    name: "receiptReport",
                    component: resolve => require(["./views/integratedQuery/reportQuery/paymentReceiptReport/receiptReport"], resolve),
                    meta:{
                        keepAlive:true
                    }
                },
                 //收付款单报表===》付款单
                 {
                    path: "/index/integratedQuery/reportQuery/paymentReceiptReport/paymentNoteReport",
                    name: "paymentNoteReport",
                    component: resolve => require(["./views/integratedQuery/reportQuery/paymentReceiptReport/paymentNoteReport"], resolve),
                    meta:{
                        keepAlive:true
                    }
                },
                //费用预提报表
                {
                    path: "/index/integratedQuery/reportQuery/costPrefetchReport",
                    name: "costPrefetchReport",
                    component: resolve => require(["./views/integratedQuery/reportQuery/costPrefetchReport"], resolve),
                    meta:{
                        keepAlive:true
                    }
                },

                //费用结算报表
                {
                    path: "/index/integratedQuery/reportQuery/costSettleReport",
                    name: "costSettleReport",
                    component: resolve => require(["./views/integratedQuery/reportQuery/costSettleReport"], resolve),
                    meta:{
                        keepAlive:true
                    }
                },
                //库存账龄表
                {
                    path: "/index/integratedQuery/reportQuery/inventoryAgingReport",
                    name: "inventoryAgingReport",
                    component: resolve => require(["./views/integratedQuery/reportQuery/inventoryAgingReport"], resolve),
                    meta:{
                        keepAlive:true
                    }
                },
                //开票清单
                {
                    path: "/index/integratedQuery/reportQuery/billingListReport",
                    name: "billingListReport",
                    component: resolve => require(["./views/integratedQuery/reportQuery/billingListReport"], resolve),
                    meta:{
                        keepAlive:true
                    }
                },
                //提单清单
                {
                    path: "/index/integratedQuery/reportQuery/ladingBillListReport",
                    name: "ladingBillListReport",
                    component: resolve => require(["./views/integratedQuery/reportQuery/ladingBillListReport"], resolve),
                    meta:{
                        keepAlive:true
                    }
                },
                //信用证开证付汇清单
                {
                    path: "/index/integratedQuery/reportQuery/issuingAndPaymentList",
                    name: "issuingAndPaymentList",
                    component: resolve => require(["./views/integratedQuery/reportQuery/issuingAndPaymentList"], resolve),
                    meta:{
                        keepAlive:true
                    }
                },
                //内贸采购合同交货情况表
                {
                    path: "/index/integratedQuery/reportQuery/netradeContractDeliveryReport",
                    name: "netradeContractDeliveryReport",
                    component: resolve => require(["./views/integratedQuery/reportQuery/netradeContractDeliveryReport"], resolve),
                    meta:{
                        keepAlive:true
                    }
                },
                 //进口采购合同到港情况表
                 {
                    path: "/index/integratedQuery/reportQuery/jktradeContractsArrivalReport",
                    name: "jktradeContractsArrivalReport",
                    component: resolve => require(["./views/integratedQuery/reportQuery/jktradeContractsArrivalReport"], resolve),
                    meta:{
                        keepAlive:true
                    }
                },
                 //销售合同提货情况表
                 {
                    path: "/index/integratedQuery/reportQuery/salesContractArrivalReport",
                    name: "salesContractArrivalReport",
                    component: resolve => require(["./views/integratedQuery/reportQuery/salesContractArrivalReport"], resolve),
                    meta:{
                        keepAlive:true
                    }
                },
                //资金--月初现款占用管理
                {
                    path: "/index/fundsManage/occupyManage/cashOccupyManageIndex",
                    name: "cashOccupyManageIndex",
                    component: resolve => require(["./views/fundsManage/occupyManage/cashOccupyManageIndex"], resolve),
                    meta:{
                        keepAlive:true
                    }
                },
                //资金--月初现款占用管理编辑
                {
                    path: "/index/fundsManage/occupyManage/cashOccupyManageEdit",
                    name: "cashOccupyManageEdit",
                    component: resolve => require(["./views/fundsManage/occupyManage/cashOccupyManageEdit"], resolve),
                    meta: {
                        parentName: "cashOccupyManageIndex"
                    }
                },
                //现款资金占用利息报表
                {
                    path: "/index/integratedQuery/reportQuery/cashOccupationInterestReport",
                    name: "cashOccupationInterestReport",
                    component: resolve => require(["./views/integratedQuery/reportQuery/cashOccupationInterestReport"], resolve),
                    meta:{
                        keepAlive:true
                    }
                },
                //客商额度巅峰值报表
                {
                    path: "/index/integratedQuery/reportQuery/customerOrSupplierPeakValue",
                    name: "customerOrSupplierPeakValue",
                    component: resolve => require(["./views/integratedQuery/reportQuery/customerOrSupplierPeakValue"], resolve),
                    meta: {
                        keepAlive: true
                    },
                },
                //供应商预付款查询报表
                {
                    path: "/index/integratedQuery/reportQuery/supplierAdvanceChargeReport",
                    name: "supplierAdvanceChargeReport",
                    component: resolve => require(["./views/integratedQuery/reportQuery/supplierAdvanceChargeReport"], resolve),
                    meta: {
                        keepAlive: true
                    },
                },
                //客户应收款查询报表
                {
                    path: "/index/integratedQuery/reportQuery/customerReceivablesReport",
                    name: "customerReceivablesReport",
                    component: resolve => require(["./views/integratedQuery/reportQuery/customerReceivablesReport"], resolve),
                    meta: {
                        keepAlive: true
                    },
                },

            ]
        },

         //oa重定向页面
        {
            path: "/redictToOa",
            name: "redictToOa",
            component: resolve => require(["./views/index/redictToOa"], resolve),
            meta:{
                title:"跳转登录中"
            }
        },

        //销售出库提货单打印页面
        {
            path: "/billOfLading",
            name: "billOfLading",
            component: resolve => require(["./views/salesManage/billOfLading"], resolve),
            meta:{
                title:"提货单打印预览"
            }
        },
        //发票开票申请单
        {
            path: "/invoiceApplicationForm",
            name: "invoiceApplicationForm",
            component: resolve => require(["./views/salesManage/invoiceApplicationForm"], resolve),
            meta:{
                title:"发票开票申请单"
            }
        },
         //框架合同对比页面
         {
            path: "/frameworkContract",
            name: "frameworkContract",
            component: resolve => require(["./views/contractMange/contractComparison/frameworkContract"], resolve),
            meta:{
                title:"框架合同"
            }
        },
        //采购合同对比页面
        {
            path: "/procurementContract",
            name: "procurementContract",
            component: resolve => require(["./views/contractMange/contractComparison/procurementContract"], resolve),
            meta:{
                title:"采购合同"
            }
        },
         //销售合同对比页面
         {
            path: "/salesContract",
            name: "salesContract",
            component: resolve => require(["./views/contractMange/contractComparison/salesContract"], resolve),
            meta:{
                title:"销售合同"
            }
        },
        //费用预提打印单
        {
            path: "/costPrefetchPrinting",
            name: "costPrefetchPrinting",
            component: resolve => require(["./views/costData/costPrefetchPrinting"], resolve),
            meta:{
                title:"费用预提打印单"
            }
        },
        //费用预提打印单
        {
            path: "/costSettlePrinting",
            name: "costSettlePrinting",
            component: resolve => require(["./views/costData/costSettlePrinting"], resolve),
            meta:{
                title:"费用结算打印单"
            }
        },
        // 登录页面
        {
            path: "/login",
            name: "login",
            component: {
                beforeRouteEnter(to, from, next) {
                    next(vm => {
                        if (window.loginUrl) {
                            window.location.href = window.loginUrl;
                        } else {
                            window.location.href = 'http://authtest.zjmiec.cn/pages/login.html';
                        }

                    });
                },
                render: h => h()
            }
        },
        // 刷新页面
        {
            path: "/refresh",
            name: "refresh",
            hidden: true,
            component: {
                beforeRouteEnter(to, from, next) {
                    next(vm => vm.$router.replace(from.fullPath));
                },
                render: h => h()
            }
        },
        // 错误页面
        {
            path: "/errorinfo",
            name: "errorinfo",
            component: resolve => require(["./errorinfo"], resolve)
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.length === 0) {
        from.name ?
            next({
                name: from.name
            }) :
            next("/errorinfo");
    } else {
        next(); //如果匹配到正确跳转
    }
});



export default router;
