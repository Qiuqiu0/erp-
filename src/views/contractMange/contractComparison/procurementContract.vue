<template>
    <!--采购合同更改前后对比页面-->
    <div id="procurementContract" class="content-view">
        <el-collapse v-model="activeNames" @change="handleChange" style="margin-top:30px">
            <el-collapse-item title="合同信息" v-if="!odPoContractIsNull || odPoContractItemsList.length" name="1">
                <div class="index">
                    <div class="input-div input-div3">
                        <el-col v-if="odPoContract.empName" :span="10" class="el-col">
                            <label>业务员</label>
                            <el-input
                                v-model="odPoContract.empName.oldValue"
                                class="el-inputs"
                                placeholder=""
                                disabled
                            ></el-input>
                             <label>更改后</label>
                            <el-input
                                v-model="odPoContract.empName.newValue"
                                class="el-inputs"
                                placeholder=""
                                disabled
                            ></el-input>
                        </el-col>
                        <el-col v-if="odPoContract.projectCode" :span="10" class="el-col">
                            <label>项目号</label>
                            <el-input
                                v-model="odPoContract.projectCode.oldValue"
                                class="el-inputs"
                                placeholder=""
                                disabled
                            ></el-input>
                             <label>更改后</label>
                            <el-input
                                v-model="odPoContract.projectCode.newValue"
                                class="el-inputs"
                                placeholder=""
                                disabled
                            ></el-input>
                        </el-col>
                        <el-col v-if="odPoContract.projectName" :span="10" class="el-col">
                            <label>项目名称</label>
                            <el-input
                                v-model="odPoContract.projectName.oldValue"
                                class="el-inputs"
                                disabled
                            ></el-input>
                             <label>更改后</label>
                            <el-input
                                v-model="odPoContract.projectName.newValue"
                                class="el-inputs"
                                placeholder=""
                                disabled
                            ></el-input>
                        </el-col>
                        <el-col v-if="odPoContract.fwContractNo" :span="10" class="el-col">
                            <label>协议编号</label>
                            <el-input
                                v-model="odPoContract.fwContractNo.oldValue"
                                class="el-inputs"
                                placeholder=""
                                disabled
                            ></el-input>
                             <label>更改后</label>
                            <el-input
                                v-model="odPoContract.fwContractNo.newValue"
                                class="el-inputs"
                                placeholder=""
                                disabled
                            ></el-input>
                        </el-col>
            
                        <el-col v-if="odPoContract.pickupType" :span="10" class="el-colc">
                            <label>提货方式</label>
                            <el-input
                                v-model="odPoContract.pickupType.oldValue"
                                class="el-inputs"
                                placeholder=""
                                disabled
                            ></el-input>
                             <label>更改后</label>
                            <el-input
                                v-model="odPoContract.pickupType.newValue"
                                class="el-inputs"
                                placeholder=""
                                disabled
                            ></el-input>
                        </el-col>
        
                        <el-col v-if="odPoContract.tradeCountryName" :span="10" class="el-col">
                            <label>贸易国别</label>
                            <el-input
                            v-model="odPoContract.tradeCountryName.oldValue"
                            class="el-inputs"
                            disabled
                            ></el-input>
                             <label>更改后</label>
                            <el-input
                                v-model="odPoContract.tradeCountryName.newValue"
                                class="el-inputs"
                                placeholder=""
                                disabled
                            ></el-input>
                        </el-col>
                        <el-col v-if="odPoContract.signPlace" :span="10" class="el-col">
                            <label>签约地点</label>
                            <el-input v-model="odPoContract.signPlace.oldValue" class="el-inputs" disabled></el-input>
                             <label>更改后</label>
                            <el-input
                                v-model="odPoContract.signPlace.newValue"
                                class="el-inputs"
                                placeholder=""
                                disabled
                            ></el-input>
                        </el-col>
                        <el-col v-if="odPoContract.extCode" :span="10" class="el-col">
                            <label>外部合同号</label>
                            <el-input
                            v-model="odPoContract.extCode.oldValue"
                            class="el-inputs"
                            disabled
                            ></el-input>
                             <label>更改后</label>
                            <el-input
                                v-model="odPoContract.extCode.newValue"
                                class="el-inputs"
                                placeholder=""
                                disabled
                            ></el-input>
                        </el-col>
                        <el-col v-if="odPoContract.supplierName" :span="10" class="el-col">
                            <label>供应商</label>
                            <el-input
                            v-model="odPoContract.supplierName"
                            class="el-inputs"
                            disabled
                            ></el-input>
                             <label>更改后</label>
                            <el-input
                                v-model="odPoContract.supplierName"
                                class="el-inputs"
                                placeholder=""
                                disabled
                            ></el-input>
                        </el-col>
                        <el-col v-if="odPoContract.currencyName" :span="10" class="el-col">
                            <label>业务币币别</label>
                            <el-input
                            v-model="odPoContract.currencyName.oldValue"
                            class="el-inputs"
                            disabled
                            ></el-input>
                             <label>更改后</label>
                            <el-input
                                v-model="odPoContract.currencyName.newValue"
                                class="el-inputs"
                                placeholder=""
                                disabled
                            ></el-input>
                        </el-col>
                        <el-col v-if="odPoContract.currencyRate" :span="10" class="el-col">
                            <label>本位币汇率</label>
                            <el-input
                            v-model="odPoContract.currencyRate.oldValue"
                            class="el-inputs"
                            disabled
                            ></el-input>
                             <label>更改后</label>
                            <el-input
                                v-model="odPoContract.currencyRate.newValue"
                                class="el-inputs"
                                disabled
                            ></el-input>
                        </el-col>
                        <el-col v-if="odPoContract.signTime" :span="10" class="el-col">
                            <label>签订日期</label>
                            <el-input class="el-inputs" v-model="odPoContract.signTime.oldValue"  disabled>
                            </el-input>
                             <label>更改后</label>
                            <el-input class="el-inputs" v-model="odPoContract.signTime.newValue"  disabled>
                            </el-input>
                        </el-col>
                        <el-col v-if="odPoContract.contractEndDate" :span="10" class="el-col">
                            <label>有效期限</label>
                            <el-input class="el-inputs" v-model="odPoContract.contractEndDate.oldValue"  disabled>
                            </el-input>
                             <label>更改后</label>
                            <el-input class="el-inputs" v-model="odPoContract.contractEndDate.newValue"  disabled>
                            </el-input>
                        </el-col>
                        <el-col v-if="odPoContract.sumQty" :span="10" class="el-col">
                            <label>统计数量</label>
                            <el-input
                            v-model="odPoContract.sumQty.oldValue"
                            class="el-inputs"
                            disabled
                        
                            ></el-input>
                             <label>更改后</label>
                            <el-input
                            v-model="odPoContract.sumQty.newValue"
                            class="el-inputs"
                            disabled
                        
                            ></el-input>
                        </el-col>
                        <el-col v-if="odPoContract.contractAmtVat" :span="10" class="el-col">
                            <label>含税金额</label>
                            <el-input
                            v-model="odPoContract.contractAmtVat.oldValue"
                            class="el-inputs"
                            disabled
                    
                            ></el-input>
                             <label>更改后</label>
                            <el-input
                            v-model="odPoContract.contractAmtVat.newValue"
                            class="el-inputs"
                            disabled
                        
                            ></el-input>
                        </el-col>
                        <el-col v-if="odPoContract.overShortageRate" :span="10" class="el-colc">
                            <label>溢短比%</label>
                            <el-input
                            v-model="odPoContract.overShortageRate.oldValue"
                            class="el-inputs"
                        disabled
                            ></el-input>
                             <label>更改后</label>
                            <el-input
                            v-model="odPoContract.overShortageRate.newValue"
                            class="el-inputs"
                            disabled
                        
                            ></el-input>
                        </el-col>
                        <el-col v-if="sxlr && poType!=10140015" :span="10" class="el-colc">
                            <label>实现利润</label>
                            <el-input
                            v-model="sxlr.oldValue"
                            class="el-inputs"
                            disabled
                            ></el-input>
                             <label>更改后</label>
                            <el-input
                            v-model="sxlr.newValue"
                            class="el-inputs"
                            disabled
                        
                            ></el-input>
                        </el-col>
                        <el-col v-if="lrl && poType==10140015" :span="10" class="el-colc">
                            <label>利润率</label>
                            <el-input
                            v-model="lrl.oldValue"
                            class="el-inputs"
                            disabled
                            ></el-input>
                             <label>更改后</label>
                            <el-input
                            v-model="lrl.newValue"
                            class="el-inputs"
                            disabled
                        
                            ></el-input>
                        </el-col>
                        <el-col v-if="!tracttransferInfoIsNull && odPotransferInfo.deliveryCutoffDate" :span="10" class="el-col">
                            <label>最迟交期</label>
                            <el-input
                                v-model="odPotransferInfo.deliveryCutoffDate.oldValue"
                                class="el-inputs"
                                disabled
                            ></el-input>
                            <label>更改后</label>
                            <el-input
                                v-model="odPotransferInfo.deliveryCutoffDate.newValue"
                                class="el-inputs"
                                disabled
                            ></el-input>
                        </el-col>
                        <el-col v-if="odPoContract.remark"  :span="24" class="el-col-textarea" style="text-align:left; margin-left: 0;padding-left: 8px;">
                            <label style="width:6.2%">备注</label>
                            <el-input
                            type="textarea"
                            autosize
                            v-model="odPoContract.remark.oldValue"
                            size="small"
                            class="el-textarea"
                            placeholder=""
                            style="width:40%"
                            resize="none"
                            disabled
                            >
                            </el-input>
                             <label style="width:6.2%">更改后</label>
                            <el-input
                            type="textarea"
                            autosize
                            v-model="odPoContract.remark.newValue"
                            size="small"
                            class="el-textarea el-textarea2"
                            placeholder=""
                            style="width:40%"
                            resize="none"
                            disabled
                            >
                            </el-input>
                        </el-col>
                    </div>
                    <div class="table-div" v-if="odPoContractItemsList.length">
                        <p  class="table-div-p">合同明细</p>
                        <div v-for="(item,index) in odPoContractItemsList" :key="index">
                            <table class="table" align="center" valign="center">
                                <tr>
                                    <th></th>
                                    <th>物料号</th>
                                    <th>物料名称</th>
                                    <th>物料大类</th>
                                    <th>物料规格</th>
                                    <th>基础单位</th>
                                    <th>数量</th>
                                    <th>第二单位</th>
                                    <th>第二数量</th>
                                    <th>业务币含税单价</th>
                                    <th>业务币不含税单价</th>
                                    <th>业务币含税金额</th>
                                    <th>业务币不含税金额</th>
                                    <th>增值税率%</th>
                                    <th>业务币增值税额</th>  
                                    <th>本币增值税额</th>
                                    <th>本币含税单价</th>
                                    <th>本币不含税单价</th>
                                    <th>本币含税金额</th>
                                    <th>本币不含税金额</th>
                                    <th>备注</th>
                                </tr>
                                <tr v-if="item.oldValue">
                                    <td><p>原始值</p></td>
                                    <td :title="item.oldValue.goodsCode"><p>{{item.oldValue.goodsCode}}</p></td>
                                    <td :title="item.oldValue.goodsName"><p>{{item.oldValue.goodsName}}</p></td>
                                    <td :title="item.oldValue.goodsCategoryName"><p>{{item.oldValue.goodsCategoryName}}</p></td>
                                    <td :title="item.oldValue.goodsSpec"><p>{{item.oldValue.goodsSpec}}</p></td>
                                    <td><p>{{item.oldValue.itemUnit}}</p></td>
                                    <td><p>{{item.oldValue.itemQty}}</p></td>
                                     <td><p>{{item.oldValue.secUnit}}</p></td>
                                    <td><p>{{item.oldValue.secQty}}</p></td>
                                    <td><p>{{item.oldValue.originPrice}}</p></td>
                                    <td><p>{{item.oldValue.unorginPrice}}</p></td>
                                    <td><p>{{item.oldValue.originAmt}}</p></td>
                                    <td><p>{{item.oldValue.unorginAmt}}</p></td>
                                    <td><p>{{item.oldValue.taxRate}}</p></td>
                                    <td><p>{{item.oldValue.taxAmt}}</p></td>
                                    <td><p>{{item.oldValue.baseTax}}</p></td>
                                    <td><p>{{item.oldValue.basePrice}}</p></td>
                                    <td><p>{{item.oldValue.unBasePrice}}</p></td>
                                    <td><p>{{item.oldValue.baseAmt}}</p></td>
                                    <td><p>{{item.oldValue.unBaseAmt}}</p></td>
                                    <td :title="item.oldValue.remark"><p>{{item.oldValue.remark}}</p></td>
                                </tr>
                                 <tr v-if="item.newValue">
                                    <td><p>更改后</p></td>
                                    <td :title="item.newValue.goodsCode"><p>{{item.newValue.goodsCode}}</p></td>
                                    <td :title="item.newValue.goodsName"><p>{{item.newValue.goodsName}}</p></td>
                                    <td :title="item.newValue.goodsCategoryName"><p>{{item.newValue.goodsCategoryName}}</p></td>
                                    <td :title="item.newValue.goodsSpec"><p>{{item.newValue.goodsSpec}}</p></td>
                                    <td><p>{{item.newValue.itemUnit}}</p></td>
                                    <td><p>{{item.newValue.itemQty}}</p></td>
                                    <td><p>{{item.newValue.secUnit}}</p></td>
                                    <td><p>{{item.newValue.secQty}}</p></td>
                                    <td><p>{{item.newValue.originPrice}}</p></td>
                                    <td><p>{{item.newValue.unorginPrice}}</p></td>
                                    <td><p>{{item.newValue.originAmt}}</p></td>
                                    <td><p>{{item.newValue.unorginAmt}}</p></td>
                                    <td><p>{{item.newValue.taxRate}}</p></td>
                                    <td><p>{{item.newValue.taxAmt}}</p></td>
                                    <td><p>{{item.newValue.baseTax}}</p></td>
                                    <td><p>{{item.newValue.basePrice}}</p></td>
                                    <td><p>{{item.newValue.unBasePrice}}</p></td>
                                    <td><p>{{item.newValue.baseAmt}}</p></td>
                                    <td><p>{{item.newValue.unBaseAmt}}</p></td>
                                    <td :title="item.newValue.remark"><p>{{item.newValue.remark}}</p></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    
                </div>
            </el-collapse-item>
            <el-collapse-item title="付款方式" v-if="odPoPaymentMapList.length" name="2">
                <div class="table-div" >
                    <div v-for="(item,index) in odPoPaymentMapList" :key="index">
                        <table class="table" align="center" valign="center">
                            <tr>
                                <th></th>
                                <th>付款类型</th>
                                <th>付款方式</th>
                                <th>信用证类型</th>
                                <th>天数</th>
                                <th>*比例%</th>
                                <th>业务币金额</th> 
                                <th>预计付款日期</th>
                                <th>备注</th>
                            </tr>
                            <tr v-if="item.oldValue">
                                <td><p>原始值</p></td>
                                <td><p>{{item.oldValue.paymentType}}</p>
                                </td>
                                <td><p>{{item.oldValue.paymentWay}}</p>
                                </td>
                                <td><p>{{item.oldValue.creditType}}</p>
                                </td>
                                <td><p>{{item.oldValue.day}}</p></td>
                                <td><p>{{item.oldValue.rate}}</p></td>   
                                <td><p>{{item.oldValue.vatAmt}}</p></td>
                                <td><p>{{ $timeFun(item.oldValue.prePaymentDate, true) }}</p></td>
                                <td><p>{{item.oldValue.remark}}</p></td>
                                
                            </tr>
                            <tr v-if="item.newValue">
                                <td><p>更改后</p></td>
                                <td><p>{{item.newValue.paymentType}}</p></td>
                                <td><p>{{item.newValue.paymentWay}}</p></td>
                                <td><p>{{item.newValue.creditType}}</p>
                                </td>
                                <td><p>{{item.newValue.day}}</p></td>
                                <td><p>{{item.newValue.rate}}</p></td>
                                <td><p>{{item.newValue.vatAmt}}</p></td>  
                                <td><p>{{ $timeFun(item.newValue.prePaymentDate, true) }}</p></td>
                                <td><p>{{item.newValue.remark}}</p></td>  
                            </tr>
                        </table>
                    </div>
                </div>
            </el-collapse-item>
            <!-- <el-collapse-item title="运输信息" v-if="!tracttransferInfoIsNull || odPoCtiPathsMapList.length" name="3">
                <div class="index">
                    内贸采购
                    <div  class="input-div input-div3">
                        <el-col v-if="odPotransferInfo.deliveryCutoffDate" :span="10" class="el-col">
                            <label>最迟交期</label>
                            <el-input
                                v-model="odPotransferInfo.deliveryCutoffDate.oldValue"
                                class="el-inputs"
                                disabled
                            ></el-input>
                            <label>更改后</label>
                            <el-input
                                v-model="odPotransferInfo.deliveryCutoffDate.newValue"
                                class="el-inputs"
                                disabled
                            ></el-input>
                        </el-col>
                        <el-col v-if="odPotransferInfo.priceTem" :span="10" class="el-col">
                            <label>价格条款</label>
                            <el-input
                            v-model="odPotransferInfo.priceTem.oldValue"
                                class="el-inputs"
                                disabled
                            ></el-input>
                            <label>更改后</label>
                            <el-input
                            v-model="odPotransferInfo.priceTem.newValue"
                                class="el-inputs"
                                disabled
                            ></el-input>
                        </el-col>
                        <el-col v-if="odPotransferInfo.transMode" :span="10" class="el-col">
                            <label>运输方式</label>
                            <el-input
                                v-model="odPotransferInfo.transMode.oldValue"
                                    class="el-inputs"
                                    disabled
                            ></el-input>
                            <label>更改后</label>
                            <el-input
                                v-model="odPotransferInfo.transMode.newValue"
                                    class="el-inputs"
                                    disabled
                            ></el-input>
                        </el-col>
                        <el-col v-if="odPotransferInfo.loadTimeType" :span="10" class="el-col">
                            <label>装卸时间</label>
                            <el-input
                                v-model="odPotransferInfo.loadTimeType.oldValue"
                                class="el-inputs"
                                disabled
                            ></el-input>
                            <label>更改后</label>
                            <el-input
                                v-model="odPotransferInfo.loadTimeType.newValue"
                                class="el-inputs"
                                disabled
                            ></el-input>
                        </el-col>
                        <el-col v-if="odPotransferInfo.shipMode" :span="10" class="el-col">
                            <label>船运方式</label>
                            <el-input
                                v-model="odPotransferInfo.shipMode.oldValue"
                                class="el-inputs"
                                disabled
                            ></el-input>
                            <label>更改后</label>
                            <el-input
                                v-model="odPotransferInfo.shipMode.newValue"
                                class="el-inputs"
                                disabled
                            ></el-input>
                        </el-col>
                        <el-col v-if="odPotransferInfo.isTransfered" :span="10" class="el-col">
                            <label>是否转船</label>
                            <el-input
                            v-model="odPotransferInfo.isTransfered.oldValue"
                            class="el-inputs"
                            disabled
                            ></el-input>
                            <label>更改后</label>
                            <el-input
                            v-model="odPotransferInfo.isTransfered.newValue"
                            class="el-inputs"
                            disabled
                            ></el-input>
                        </el-col>
                        <el-col v-if="odPotransferInfo.isBatched" :span="10"  class="el-col">
                            <label>是否分批</label>
                            <el-input
                            v-model="odPotransferInfo.isBatched.oldValue"
                            class="el-inputs"
                            disabled
                            ></el-input>
                            <label>更改后</label>
                            <el-input
                            v-model="odPotransferInfo.isBatched.newValue"
                            class="el-inputs"
                            disabled
                            ></el-input>
                        </el-col>
                        <el-col v-if="odPotransferInfo.loadingPort" :span="10" class="el-col">
                            <label>装货港</label>
                            <el-input
                            v-model="odPotransferInfo.loadingPort.oldValue"
                            class="el-inputs"
                            disabled
                            ></el-input>
                            <label>更改后</label>
                            <el-input
                            v-model="odPotransferInfo.loadingPort.newValue"
                            class="el-inputs"
                            disabled
                            ></el-input>
                        </el-col>
                        <el-col v-if="odPotransferInfo.unloadingPort" :span="10" class="el-col">
                            <label>卸货港</label>
                            <el-input
                                v-model="odPotransferInfo.unloadingPort.oldValue"
                                class="el-inputs"
                                disabled
                            ></el-input>
                            <label>更改后</label>
                            <el-input
                                v-model="odPotransferInfo.unloadingPort.newValue"
                                class="el-inputs"
                                disabled
                            ></el-input>    
                        </el-col>
                        <el-col v-if="odPotransferInfo.destination" :span="10" class="el-col">
                            <label>目的地</label>
                            <el-input
                            v-model="odPotransferInfo.destination.oldValue"
                            class="el-inputs"
                            disabled
                            ></el-input>
                            <label>更改后</label>
                            <el-input
                            v-model="odPotransferInfo.destination.newValue"
                            class="el-inputs"
                            disabled
                            ></el-input>
                        </el-col>
                        <el-col v-if="odPotransferInfo.shipName"  :span="10" class="el-col">
                            <label>船名</label>
                            <el-input
                            v-model="odPotransferInfo.shipName.oldValue"
                            class="el-inputs"
                            disabled
                            ></el-input>
                            <label>更改后</label>
                            <el-input
                            v-model="odPotransferInfo.shipName.newValue"
                            class="el-inputs"
                            disabled
                            ></el-input>
                        </el-col>
                        <el-col v-if="odPotransferInfo.shipCode"  :span="10" class="el-colc">
                            <label>船舶识别号</label>
                            <el-input
                            v-model="odPotransferInfo.shipCode.oldValue"
                            class="el-inputs"
                            disabled
                            ></el-input>
                            <label>更改后</label>
                            <el-input
                            v-model="odPotransferInfo.shipCode.newValue"
                            class="el-inputs"
                            disabled
                            ></el-input>
                        </el-col>
                        <el-col v-if="odPotransferInfo.receiverAddress" :span="24" class="el-col-textarea" style="text-align:left;margin-left: 0;padding-left: 8px;">
                            <label  style="width:6.2%">收货地址</label>
                            <el-input
                            type="textarea"
                            autosize
                            v-model="odPotransferInfo.receiverAddress.oldValue"
                            size="small"
                            class="el-textarea"
                            placeholder=""
                            style="width:40%"
                            resize="none"
                            disabled
                            >
                            </el-input>
                             <label style="width:6.2%">更改后</label>
                            <el-input
                            type="textarea"
                            autosize
                            v-model="odPotransferInfo.receiverAddress.newValue"
                            size="small"
                            class="el-textarea el-textarea2"
                            placeholder=""
                            style="width:40%"
                            resize="none"
                            disabled
                            >
                            </el-input>
                        </el-col>
                    </div>
                    <div class="table-div" v-if="odPoCtiPathsMapList.length">
                        <p  class="table-div-p">运输路径</p>
                        <div v-for="(item,index) in odPoCtiPathsMapList" :key="index">
                            <table class="table table2" align="center" valign="center">
                                <tr>
                                    <th></th>
                                    <th>出厂运输方式</th>
                                    <th>目的地</th>
                                    <th>运输安排人（供应商安排/仓储物流中心安排）</th>
                                    <th>承运人（车队/船队）</th>
                                    <th>承运人联系方式</th>
                                    <th>备注</th> 
                                </tr>
                                <tr v-if="item.oldValue">
                                    <td><p>原始值</p></td>
                                    <td><p>{{item.oldValue.leaveTransferMode}}</p></td>
                                    <td :title="item.oldValue.transferTarget"><p>{{item.oldValue.transferTarget}}</p></td>
                                    <td :title="item.oldValue.transferPlanMan"><p>{{item.oldValue.transferPlanMan}}</p></td>
                                    <td :title="item.oldValue.transferExcutor"><p>{{item.oldValue.transferExcutor}}</p></td>
                                    <td><p>{{item.oldValue.transferExcutorTel}}</p></td>   
                                    <td><p>{{item.oldValue.transferNote}}</p></td>
                                    
                                </tr>
                                 <tr v-if="item.newValue">
                                    <td><p>更改后</p></td>
                                    <td><p>{{item.newValue.leaveTransferMode}}</p></td>
                                    <td :title="item.newValue.transferTarget"><p>{{item.newValue.transferTarget}}</p></td>
                                    <td :title="item.newValue.transferPlanMan"><p>{{item.newValue.transferPlanMan}}</p></td>
                                    <td :title="item.newValue.transferExcutor"><p>{{item.newValue.transferExcutor}}</p></td>
                                    <td><p>{{item.newValue.transferExcutorTel}}</p></td>
                                    <td><p>{{item.newValue.transferNote}}</p></td>   
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </el-collapse-item> -->
            <!-- <el-collapse-item title="关联合同" v-if="odPoSoFormList.length" name="4">
                <div v-for="(item,index) in odPoSoFormList" :key="index">
                    <table class="table table2" align="center" valign="center">
                        <tr>
                            <th></th>
                            <th>销售合同号</th>
                            <th>外部合同号</th>
                            <th>客户</th>
                            <th>签约日期</th>
                            <th>备注</th> 
                            <th>人员</th>
                            <th>公司</th>
                            <th>部门</th>
                            <th>合同类型</th>
                        </tr>
                        <tr v-if="item.oldValue">
                            <td><p>原始值</p></td>
                            <td :title="item.oldValue.soContractNo"><p>{{item.oldValue.soContractNo}}</p></td>
                            <td :title="item.oldValue.extCode"><p>{{item.oldValue.extCode}}</p></td>
                            <td :title="item.oldValue.custName"><p>{{item.oldValue.custName}}</p></td>
                            <td><p>{{$timeFun(item.oldValue.signTime, 1)}}</p></td>  
                            <td><p>{{item.oldValue.remark}}</p></td>
                            <td><p>{{item.oldValue.bizPersonName}}</p></td> 
                            <td><p>{{item.oldValue.orgName}}</p></td> 
                            <td><p>{{item.oldValue.companyName}}</p></td>
                            <td><p>{{item.oldValue.contractCat}}</p></td>
                        </tr>
                            <tr v-if="item.newValue">
                            <td><p>更改后</p></td>
                            <td :title="item.newValue.soContractNo"><p>{{item.newValue.soContractNo}}</p></td>
                            <td :title="item.newValue.extCode"><p>{{item.newValue.extCode}}</p></td>
                            <td :title="item.newValue.custName"><p>{{item.newValue.custName}}</p></td>
                            <td><p>{{$timeFun(item.newValue.signTime, 1)}}</p></td>
                            <td><p>{{item.newValue.remark}}</p></td>  
                            <td><p>{{item.newValue.bizPersonName}}</p></td> 
                            <td><p>{{item.newValue.orgName}}</p></td> 
                            <td><p>{{item.newValue.companyName}}</p></td>
                            <td><p>{{item.newValue.contractCat}}</p></td>
                        </tr>
                    </table>
                </div>
                
            </el-collapse-item> -->
            <!-- <el-collapse-item title="盈亏测算" name="5">
            </el-collapse-item> -->
            <!-- <el-collapse-item title="合同条款" v-if="odPoTermList.length" name="6">
                 <div v-for="(item,index) in odPoTermList" :key="index">
                    <table class="table table2" align="center" valign="center">
                        <tr>
                            <th></th>
                            <th>条款内容</th>
                        </tr>
                        <tr v-if="item.oldValue">
                            <td><p>原始值</p></td>
                            <td :title="item.oldValue.termContent"><p>{{item.oldValue.termContent}}</p></td>
                        
                        </tr>
                            <tr v-if="item.newValue">
                            <td><p>更改后</p></td>
                            <td :title="item.newValue.termContent"><p>{{item.newValue.termContent}}</p></td>
                        </tr>
                    </table>
               
                </div>
            </el-collapse-item> -->
            <!-- <el-collapse-item title="打印及附件" v-if="sysSystemAccessoryList.length" name="7">
                 <div v-for="(item,index) in sysSystemAccessoryList" :key="index">
                    <table class="table table2" align="center" valign="center">
                        <tr>
                            <th></th>
                            <th>文件名称</th>
                            <th>类型</th>
                            <th>上传时间</th>
                            <th>上传人</th>         
                        </tr>
                        <tr v-if="item.oldValue">
                            <td><p>原始值</p></td>
                            <td :title="item.oldValue.fileOldName"><p>{{item.oldValue.fileOldName}}</p></td>
                            <td><p>{{item.oldValue.fileType==2?"双签":"普通"}}</p></td>
                            <td><p>{{item.oldValue.createdTime | time }}</p></td>
                            <td><p>{{item.oldValue.createdName}}</p></td>                           
                        </tr>
                            <tr v-if="item.newValue">
                            <td><p>更改后</p></td>
                            <td :title="item.newValue.fileOldName"><p>{{item.newValue.fileOldName}}</p></td>
                            <td><p>{{item.newValue.fileType==2?"双签":"普通"}}</p></td>
                            <td><p>{{item.newValue.createdTime | time }}</p></td>
                            <td><p>{{item.newValue.createdName}}</p></td>
                        </tr>
                    </table>
                </div>
            </el-collapse-item> -->
        </el-collapse>
    </div>

</template>
<script>
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Cmange from "@/api/contractMange/cmange";
import {getDictionary} from "@/api/contractMange/frameProtocol";
import api from "@/api/contractChange/contractChange";
export default {
    name:'procurementContract',
    data() {
      return {
        activeNames: ['1'],
        contractObj:{},
        tableData:[],
        payTypeTable:[],
        ysfsList:[],//运输方式
        xyzlxList:[],//信用证类型
        payTypeList: [],//付款类型
        paymentList:[],//付款方式
        contractTypeList: [],//合同类型
        isInaTypeList: [],//协议状态
        cyfsList:[],//船运方式
        zxsjList:[],//获取装卸时间
        jgtkList:[],//获取价格条款
        thList: [], //提货方式
        sysSystemAccessoryList:[],//打印及复印件
        odPoContract:{},//合同基本信息
        odPoContractItemsList:[],//合同明细
        odPoPaymentMapList:[],//付款方式
        odPoCtiPathsMapList:[],//运输路径
        odPotransferInfo:{},//运输路径基本信息
        odPoTermList:[],//合同条款
        odPoSoFormList:[],//关联合同
        poContractProfileSimulateDetailMapList:[],//盈亏物料明细
        odPoSimulateMapList:[],//盈亏预测
        odPoContractIsNull:true,//判断对象是否为空
        tracttransferInfoIsNull:true,
        poType:"",//peigong 显示利润率
        lrl:``,//利润率
        sxlr:``,//实现利润
      };
    },
    created(){
        this.initDictionary();
    },
    methods:{
        initData(){
            let data={
                id:this.$getUrl("id")//"152cb350896544b7833afb812ea10388"
            }
            api.getOdContractChangeLog(data).then(res=>{
                if(res.code=="success"){
                    if(res.data==null){
                        this.$openWarning(res.message);
                        return;
                    }    
                    if(res.data.odPoContract && JSON.stringify(res.data.odPoContract)!= "{}"){
                        this.odPoContractIsNull=false;
                        this.odPoContract=res.data.odPoContract;//合同基本信息
                        if(this.odPoContract.signTime){
                            if(this.odPoContract.signTime.oldValue){
                                this.odPoContract.signTime.oldValue=this.$timeFun(this.odPoContract.signTime.oldValue,1);
                            }
                            if(this.odPoContract.signTime.newValue){
                                this.odPoContract.signTime.newValue=this.$timeFun(this.odPoContract.signTime.newValue,1);
                            }
                            
                        }
                        if(this.odPoContract.contractEndDate){
                            if(this.odPoContract.contractEndDate.oldValue){
                                this.odPoContract.contractEndDate.oldValue=this.$timeFun(this.odPoContract.contractEndDate.oldValue,1);
                            }
                            if(this.odPoContract.contractEndDate.newValue){
                                this.odPoContract.contractEndDate.newValue=this.$timeFun(this.odPoContract.contractEndDate.newValue,1);
                            }
                        }
                        //提货方式
                        if(this.odPoContract.pickupType){
                            this.thList.forEach(it=>{
                                if(this.odPoContract.pickupType.oldValue==it.dict_key){
                                    this.odPoContract.pickupType.oldValue=it.dict_value;
                                }
                                 if(this.odPoContract.pickupType.newValue==it.dict_key){
                                    this.odPoContract.pickupType.newValue=it.dict_value;
                                }
                            })
                        }
                        
                    }else{
                        this.odPoContractIsNull=true;
                    }
                    //利润率
                    if(res.data.lrl && JSON.stringify(res.data.lrl)!= "{}"){
                        this.lrl=res.data.lrl;
                    }else{
                        this.lrl=null;
                    }
                    this.poType=res.data.poType;
                    //实现利润
                    if(res.data.sxlr && JSON.stringify(res.data.sxlr)!= "{}"){
                        this.sxlr=res.data.sxlr;
                    }else{
                        this.sxlr=null;
                    }
                    if(res.data.odPoContractItemsList){
                        let odPoList=res.data.odPoContractItemsList;//采购明细
                        odPoList.forEach((item,index)=>{
                            if(item.oldValue){
                                this.originAmtCh(item.oldValue,index);
                            }
                            if(item.newValue){
                                this.originAmtCh(item.newValue,index);
                            }
                            
                        });
                        this.odPoContractItemsList=odPoList;
                    }
                    if(res.data.odPotransferInfo && JSON.stringify(res.data.odPotransferInfo)!= "{}"){  
                        this.tracttransferInfoIsNull=false;
                        this.odPotransferInfo=res.data.odPotransferInfo;
                         if(this.odPotransferInfo.deliveryCutoffDate && this.odPotransferInfo.deliveryCutoffDate.oldValue){
                            this.odPotransferInfo.deliveryCutoffDate.oldValue=this.$timeFun(this.odPotransferInfo.deliveryCutoffDate.oldValue, true);
                        }
                        if(this.odPotransferInfo.deliveryCutoffDate && this.odPotransferInfo.deliveryCutoffDate.newValue){
                            this.odPotransferInfo.deliveryCutoffDate.newValue=this.$timeFun(this.odPotransferInfo.deliveryCutoffDate.newValue, true);
                        }
                        
                        if(this.odPotransferInfo.isBatched){
                            if(this.odPotransferInfo.isBatched.oldValue==1){
                                this.odPotransferInfo.isBatched.oldValue="是";
                            }else{
                                this.odPotransferInfo.isBatched.oldValue="否";
                            }
                            if(this.odPotransferInfo.isBatched.newValue==1){
                                this.odPotransferInfo.isBatched.newValue="是";
                            }else{
                                this.odPotransferInfo.isBatched.newValue="否";
                            }
                            
                        }
                        if(this.odPotransferInfo.isTransfered){
                            if(this.odPotransferInfo.isTransfered.oldValue==1){
                                this.odPotransferInfo.isTransfered.oldValue="是";
                            }else{
                                this.odPotransferInfo.isTransfered.oldValue="否";
                            }
                            if(this.odPotransferInfo.isTransfered.newValue==1){
                                this.odPotransferInfo.isTransfered.newValue="是";
                            }else{
                                this.odPotransferInfo.isTransfered.newValue="否";
                            }
                            
                        }
                        //价格条款
                        if(this.odPotransferInfo.priceTem){
                            this.jgtkList.forEach(ite=>{
                                if(this.odPotransferInfo.priceTem.oldValue==ite.dict_key){
                                    this.odPotransferInfo.priceTem.oldValue=ite.dict_value;
                                }
                                 if(this.odPotransferInfo.priceTem.newValue==ite.dict_key){
                                    this.odPotransferInfo.priceTem.newValue=ite.dict_value;
                                }
                            })
                        }
                        //卸装时间
                        if(this.odPotransferInfo.loadTimeType){
                            this.zxsjList.forEach(ite=>{
                                if(this.odPotransferInfo.loadTimeType.oldValue==ite.dict_key){
                                    this.odPotransferInfo.loadTimeType.oldValue=ite.dict_value;
                                }
                                 if(this.odPotransferInfo.loadTimeType.newValue==ite.dict_key){
                                    this.odPotransferInfo.loadTimeType.newValue=ite.dict_value;
                                }
                            })
                        }
                        //运输方式
                        if(this.odPotransferInfo.transMode){
                            this.ysfsList.forEach(ite=>{
                                if(this.odPotransferInfo.transMode.oldValue==ite.dict_key){
                                    this.odPotransferInfo.transMode.oldValue=ite.dict_value;
                                }
                                 if(this.odPotransferInfo.transMode.newValue==ite.dict_key){
                                    this.odPotransferInfo.transMode.newValue=ite.dict_value;
                                }
                            })
                        }
                        //船运方式
                        if(this.odPotransferInfo.shipMode){
                            this.cyfsList.forEach(ite=>{
                                if(this.odPotransferInfo.shipMode.oldValue==ite.dict_key){
                                    this.odPotransferInfo.shipMode.oldValue=ite.dict_value;
                                }
                                 if(this.odPotransferInfo.shipMode.newValue==ite.dict_key){
                                    this.odPotransferInfo.shipMode.newValue=ite.dict_value;
                                }
                            })
                        }
                        
                    }else{this.tracttransferInfoIsNull=true;}
                    if(res.data.odPoCtiPathsList){
                       this.odPoCtiPathsMapList=res.data.odPoCtiPathsList;//运输路径
                       this.odPoCtiPathsMapList.forEach(it=>{
                           this.ysfsList.forEach(it2=>{
                               if(it.newValue.leaveTransferMode==it2.dict_key){
                                   it.newValue.leaveTransferMode=it2.dict_value;
                               }
                               if(it.oldValue.leaveTransferMode==it2.dict_key){
                                   it.oldValue.leaveTransferMode=it2.dict_value;
                               }
                           })
                       })
                    }
                    if(res.data.odPoPaymentList){
                       this.odPoPaymentMapList=res.data.odPoPaymentList;//付款方式
                       this.odPoPaymentMapList.forEach(item=>{
                           this.payTypeList.forEach(item2=>{
                               if(item.newValue.paymentType==item2.dict_key){
                                   item.newValue.paymentType=item2.dict_value;
                               }
                               if(item.oldValue.paymentType==item2.dict_key){
                                   item.oldValue.paymentType=item2.dict_value;
                               }
                           });
                           this.paymentList.forEach(item3=>{
                               if(item.newValue.paymentWay==item3.dict_key){
                                   item.newValue.paymentWay=item3.dict_value;
                               }
                               if(item.oldValue.paymentWay==item3.dict_key){
                                   item.oldValue.paymentWay=item3.dict_value;
                               }
                           });
                           this.xyzlxList.forEach(item4=>{
                               if(item.newValue.creditType==item4.dict_key){
                                   item.newValue.creditType=item4.dict_value;
                               }
                               if(item.oldValue.creditType==item4.dict_key){
                                   item.oldValue.creditType=item4.dict_value;
                               }
                           });
                       })
                       
                    }
                    if(res.data.sysSystemAccessoryList){
                        this.sysSystemAccessoryList=res.data.sysSystemAccessoryList;//附件
                    }
                    if(res.data.odPoSoList){
                        let list=res.data.odPoSoList;
                        list.forEach(t=>{
                            if(t.oldValue.poId){
                               this.getDetail(t.oldValue.poId).then(res=>{
                                   t.oldValue=res.data[0].odSoContract;
                                   this.contractTypeList.forEach(it=>{
                                       if(t.oldValue.contractCat==it.dict_key){
                                           t.oldValue.contractCat=it.dict_value;
                                       }
                                   })
                               })
                            }
                            if(t.newValue.poId){
                               this.getDetail(t.newValue.poId).then(res=>{
                                   t.newValue=res.data[0].odSoContract;
                                   this.contractTypeList.forEach(it=>{
                                       if(t.newValue.contractCat==it.dict_key){
                                           t.newValue.contractCat=it.dict_value;
                                       }
                                   })
                               })
                            }
                        });

                        this.odPoSoFormList=list;
                    }
                     if(res.data.odPoTermList){
                        this.odPoTermList=res.data.odPoTermList;//合同条款
                    }  
                }
             
            }).catch();
        },
        async getDetail(poid){
            let params = {
                poId:poid,
                pageSize: 999
            };
            const res=await Cmange.getGl(params);
            return res;
        },
        //采购含税金额变动
        originAmtCh(e, index) {
            //采购不含税金额
            e.unorginAmt = this.$unorginAmt(e.originAmt, e.taxRate);
             //采购不含税单价
            e.unorginPrice = this.$unPrice(e.unorginAmt, e.itemQty);
            //本币不含税金额 unBaseAmt
            e.unBaseAmt = this.$tybbnhsje(e.baseAmt, e.baseTax);
             //本币不含税单价 unBasePrice
            e.unBasePrice = this.$unPrice(e.unBaseAmt, e.itemQty);
            this.$set(this.odPoContractItemsList, index, e);
        },
        initDictionary() {
            const payType = new FormData();
            payType.append("dictNo", 1020);
            getDictionary(payType).then(res => {
                this.payTypeList = res.data;
            });
            const payment = new FormData();
            payment.append("dictNo", 1021);
            getDictionary(payment).then(res => {
                this.paymentList = res.data;
            });
            const isInaType = new FormData();
            isInaType.append("dictNo", 1013);
            getDictionary(isInaType).then(res => {
                this.isInaTypeList = res.data;
            });
            // //采购销售
            // const contractType = new FormData();
            // contractType.append("dictNo", 1089);
            // getDictionary(contractType).then(res => {
            //     this.contractTypeList = res.data;
            // });
            //合同类型
            const contractType = new FormData();
            contractType.append("dictNo", 1015);
            getDictionary(contractType).then(res => {
                this.contractTypeList = res.data;
            });
            //信用证类型方式
            Cmange.xyzlx()
                .then(res => {
                this.xyzlxList = res.data;
                })
                .catch();
            //获取运输方式
            Cmange.ysfs()
                .then(res => {
                this.ysfsList = res.data;
                })
                .catch();
            //获取船运方式
            Cmange.cyfs()
            .then(res => {
            this.cyfsList = res.data;
            })
            .catch();
            Cmange.jgtk()
            .then(res => {
            this.jgtkList = res.data;
            })
            .catch();
            //获取提货方式
            Cmange.thfs()
            .then(res => {
            this.thList = res.data;
            })
            .catch();

            //获取装卸时间
            Cmange.zxsj()
                .then(res => {
                this.zxsjList = res.data;
                })
                .catch();
  
            setTimeout(()=>{
                this.initData();
            },1000);
            
        },
        handleChange(val) {
            //console.log(val);
        }
    }
}
</script>
<style>
#app{
    overflow-y: auto;
}
.input-div3{
    border: 0;
}
.input-div3 .el-col .el-inputs{
 width: 34% !important;
}
.input-div4 .el-col .el-inputs {
    width: 36% !important;
}
.input-div4 label{
    width: 16%;
}
.input-div3 label{
    width: 16%;
}
.input-div3 .el-col:nth-child(2n){
    margin-left: 10%;
}
.input-div3 .el-col label:after {
    content: "\FF1A";
}
/* .input-div3 .el-col{
    margin-bottom: 10px;
} */
.input-div3 .el-col-24{
    width: 100%;
}
.content-view{
    width: 96.2%;
    margin: 0 auto;
}
.el-collapse-item__header{
    padding-left: 10px !important;
    font-size: 14px !important;
    font-weight:bold;
}
.el-textarea.is-disabled .el-textarea__inner{
    border-color: #97999e !important;
}
.el-table .cell{
    text-align: center;
}
.input-div3 .el-col-checkbox label:after{
    content: "" !important;
}
.table-div{
      overflow-x: scroll;
       
}
.table-div-p{
    font-size:13px;
    color:#333;
    line-height: 30px;
    padding-left: 20px;
}

.table{
       border-collapse:colapse;
       border-spacing:0;
       background-color:transparent;
       display:table;
       width: 100%;
       height:100%;
       margin:0 auto;
       border: 1px solid #eaedf3;
       margin-bottom: 30px;
   }
   .table th{
        text-align: center;
        vertical-align: middle;
        font-size: 12px;
        font-family: 'Arial Normal', 'Arial';
        color: #fff;
        padding: 6px 10px;
        background: #1665d8;
        font-weight: normal;
        border: 1px solid;
        
  }
  .table td p{
    min-width: 160px;
    max-width: 160px;
    text-align: center;
    vertical-align: middle;
    font-size: 12px;
    font-family: 'Arial Normal', 'Arial';
    color: #606266;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0 auto;
  }

  .table td,.table th{
    padding: 0!important;
    border: 1px solid #eaedf3;
    border-top: none!important;
    border-left: none!important;
  }
  .table tr:last-child td{
    background-color: #f2f2f2;
}
  .table-bordered {
    border: 1px solid #ddd;
  }
  *{
    margin: 0px;
    padding: 0px;
  }
.table-div::-webkit-scrollbar {
    width: 0;
    height: 12px;
    background-color: #f5f5f5;
}
.table-div::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 6px #4159a8;
    background-color: rgba(65,89,168,.1);
}
.table-div::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #f5f5f5;
}
#procurementContract .el-checkbox__inner{
    vertical-align: 3px!important;
}
 
</style>



