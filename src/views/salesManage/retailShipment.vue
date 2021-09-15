<template>
    <div id="retailShipment" class="content-div2">
        <!--按钮样式-->
        <div class="button-div">
            <el-button  class="query-button"  @click="saveSaleOutboundOrder()" icon="el-icon-suitcase">保存</el-button>
            <el-button  @click="cancel()" icon="el-icon-close">取消</el-button>
        </div>
        <el-tabs class="el-tabs" v-model="activeName" type="card" @tab-click="handleClick" >
            <el-tab-pane  label="基本信息" name="one">
                <div class="index-div3">
                     <!-- <h3 class="sub-title">基本信息</h3> -->
                    <el-col :span="5" class="el-col el-col-required">
                        <label><span class="must-full">*</span>公司</label>
                        <el-input v-model="basicData.companyName.companyName" 
                        :class="errorKey.includes('companyName') ? 'inputRed' : ''" class="el-inputs" size="small" placeholder="请选择" disabled></el-input>
                        <span v-if="type==2 || type==4" class='comicon' @click="componyTip"><i class="el-icon-search" ></i></span>
                    </el-col>
                    <el-col :span="5" class="el-col el-col-required">
                        <label><span class="must-full">*</span>部门</label>
                        <el-input v-model="basicData.branchName.branchName" size="small"
                      :class="errorKey.includes('branchName') ? 'inputRed' : ''" class="el-inputs"  placeholder="请选择" disabled></el-input>
                        <span v-if="type==2 || type==4" class='comicon' @click="departmentTip"><i class="el-icon-search" ></i></span>
                    </el-col>
                    <el-col :span="5" class="el-col el-col-required">
                        <label><span class="must-full">*</span>业务员</label>
                        <el-input v-model="basicData.staffName.empName" size="small"
                      :class="errorKey.includes('staffName') ? 'inputRed' : ''" class="el-inputs"  placeholder="请选择" disabled></el-input>
                        <span class='comicon' @click="staffTip"><i class="el-icon-search" ></i></span>
                    </el-col>
                    <el-col :span="5" class="el-col el-col-required">
                        <label><span class="must-full">*</span>出库单号</label>
                        <el-input  size="small" v-model="basicData.doNo"
                      :class="errorKey.includes('doNo') ? 'inputRed' : ''" disabled class="el-inputs" ></el-input>
                    </el-col>
                    <el-col :span="5" class="el-col">
                        <label>外部提单号</label>
                        <el-input  size="small" v-model="basicData.externalBlNo"  class="el-inputs" ></el-input>
                    </el-col>
                    <el-col :span="5" class="el-col el-col-required">
                        <label><span class="must-full">*</span>仓库</label>
                        <el-input v-model="basicData.warehouseName.warehouseName"
                      :class="errorKey.includes('warehouseName') ? 'inputRed' : ''" size="small" class="el-inputs" placeholder="请选择" disabled></el-input>
                        <span v-if="type!=3 || type==4" class='comicon' @click="warehouseTips"><i class="el-icon-search" ></i></span>
                    </el-col>
                    <el-col :span="5" class="el-col el-col-required">
                        <label><span class="must-full">*</span>出库日期</label>
                        <el-date-picker
                            class="el-input2"
                            v-model="basicData.doDate"
                            :class="errorKey.includes('doDate') ? 'inputRed' : ''"
                            type="date"
                            size="small"
                            placeholder="选择日期"
                            :picker-options="basicData.pickerOptions"
                        >
                        </el-date-picker>
                    </el-col>
                    <el-col :span="5" class="el-col el-col-required">
                        <label><span class="must-full">*</span>销售客户</label>
                        <el-input  class="el-inputs" v-model="basicData.customerName.customerName"
                      :class="errorKey.includes('customerName') ? 'inputRed' : ''" size="small" placeholder="请选择" disabled></el-input>
                        <span v-if="type!=1" class='comicon' @click="customerTips"><i class="el-icon-search" ></i></span>
                    </el-col>
                    <el-col :span="5" class="el-col">
                        <label>签收日期</label>
                        <el-date-picker
                            class="el-input2"
                            v-model="basicData.signReceivedDate"
                            type="date"
                            size="small"
                            placeholder="选择日期"
                            >
                        </el-date-picker>
                    </el-col>
                    <el-col :span="5" class="el-col el-col-required">
                        <label><span class="must-full">*</span>业务币别</label>
                        <el-input  class="el-inputs" v-model="basicData.coinName.currencyName"
                      :class="errorKey.includes('coinName') ? 'inputRed' : ''" size="small" placeholder="请选择" disabled></el-input>
                        <span v-if="type!=1" class='comicon' @click="coinTips(1)"><i class="el-icon-search" ></i></span>
                    </el-col>
                    <el-col :span="5" class="el-col el-col-required">
                        <label><span class="must-full">*</span>本位币汇率</label>
                        <el-input  class="el-inputs"  v-model="basicData.currencyRate" 
                      :class="errorKey.includes('currencyRate') ? 'inputRed' : ''" @input="handleCurrencyRate(basicData.currencyRate)" size="small" placeholder="请输入"></el-input>
                    </el-col>
                    <el-col :span="5" class="el-col el-col-required">
                        <label><span class="must-full">*</span>人民币汇率</label>
                        <el-input  class="el-inputs"  v-model="basicData.rmbCurrencyRate"
                      :class="errorKey.includes('rmbCurrencyRate') ? 'inputRed' : ''" @input="handleRmbCurrencyRate(basicData.rmbCurrencyRate)"  size="small" placeholder="请输入"></el-input>
                    </el-col>
                    <el-col :span="5" class="el-col el-col-required">
                        <label><span class="must-full">*</span>统计数量</label>
                        <el-input  class="el-inputs" v-model="basicData.sumQty"
                      :class="errorKey.includes('sumQty') ? 'inputRed' : ''"  size="small" disabled></el-input>
                    </el-col>
                    <el-col :span="5" class="el-col el-col-required">
                        <label><span class="must-full">*</span>业务币金额</label>
                        <el-input  class="el-inputs" v-model="basicData.sumAmtVat" 
                      :class="errorKey.includes('sumAmtVat') ? 'inputRed' : ''"  size="small" disabled></el-input>
                    </el-col>
                    <el-col :span="5" class="el-col el-col-required">
                        <label><span class="must-full">*</span>人民币金额</label>
                        <el-input  class="el-inputs" v-model="basicData.payAmtTotalRmb" 
                      :class="errorKey.includes('payAmtTotalRmb') ? 'inputRed' : ''"  size="small" disabled></el-input>
                    </el-col>
                    <el-col :span="5" class="el-colc el-col-required">
                        <label><span class="must-full">*</span>单据状态</label>
                        <el-select clearable  size="small" class="el-select" 
                      :class="errorKey.includes('doStatus') ? 'inputRed' : ''" v-model="basicData.doStatus" disabled >
                        <el-option v-for="item in basicData.doStatusList"
                                    :key="item.dict_code"  
                                    :label="item.dict_value"
                                    :value="item.dict_code"
                            ></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="5" class="el-colc el-col-required">
                        <label><span class="must-full">*</span>销售类型</label>
                        <el-select clearable  size="small" class="el-select"  
                      :class="errorKey.includes('contractType') ? 'inputRed' : ''" v-model="basicData.contractType" disabled>
                        <el-option v-for="item in basicData.contractTypeList"
                                    :key="item.dict_code"
                                    :label="item.dict_value"
                                    :value="item.dict_code"
                            ></el-option>
                        </el-select>
                    </el-col>
                     <el-col :span="5" class="el-colc el-col-required">
                        <label><span class="must-full">*</span>放货类型</label>
                        <el-select clearable  size="small" class="el-select" 
                      :class="errorKey.includes('doType') ? 'inputRed' : ''" v-model="basicData.doType"  placeholder="请选择" >
                        <el-option v-for="item in basicData.doTypeList"
                                    :key="item.dict_code"
                                    :label="item.dict_value"
                                    :value="item.dict_code"
                            ></el-option>
                        </el-select>
                    </el-col>
                     <el-col :span="5" class="el-col">
                        <label>收件人</label>
                        <el-input  class="el-inputs" v-model="basicData.reciver" size="small"  placeholder="请输入"></el-input>
                    </el-col>
                    <el-col :span="5" class="el-col">
                        <label>联系方式</label>
                        <el-input  class="el-inputs" v-input-filter:phoneFilter v-model="basicData.telephone" size="small"  placeholder="请输入"></el-input>
                    </el-col>
                    <el-col :span="5" class="el-col">
                        <label>送货地址</label>
                        <el-input  class="el-inputs" v-model="basicData.reciverAddress" size="small"  placeholder="请输入"></el-input>
                    </el-col> 
                    <el-col :span="5" class="el-col">
                        <label>提单有效期</label>
                        <el-date-picker
                            v-model="basicData.blTimeline"
                            type="date"
                            class="el-input2"
                            size="small"
                            placeholder="选择日期"
                            >
                        </el-date-picker>
                    </el-col>
                    <el-col :span="24" class="el-col-textarea">
                        <label style="width:6.4%;vertical-align:8px">备注</label>
                        <el-input
                            type="textarea"
                            autosize
                            rows="2"
                            v-model="basicData.remark"
                            size="small"
                            class="el-textarea"
                            placeholder="请输入内容"
                            >
                        </el-input>
                    </el-col>
                    <el-col :span="24" class="el-col-textarea" style="margin-top:0">
                      <label>提货人信息</label>
                      <el-input
                        type="textarea"
                        autosize
                        rows="2"
                        v-model="basicData.blRemark"
                        size="small"
                        class="el-textarea"
                      >
                      </el-input>
                  </el-col>
                
                </div>
                 <!-- 表格 -->
                <div class="button-div">
                    <el-button class="addBut" @click="addRow()" icon="el-icon-plus">添加行</el-button>
                    <el-button class="addBut" @click="deleteRow(1)" icon="el-icon-minus">删除行</el-button>
                    <el-button class="addBut" @click="batchSplit(1)" icon="el-icon-copy-document">批次拆分</el-button>
                    <el-button class="addBut" @click="batchSplit(2)" icon="el-icon-aim">自动匹配</el-button>
                </div>
                <div class="el-table-div">
                    <!-- <h3 class="sub-title">商品信息</h3>   -->
                      <!-- 表格 -->
                    <el-table border center  
                        ref="table"
                        :data="basicData.tableData" 
                        tooltip-effect="dark"
                        @select="dialogCheck"
                        @selection-change="handleChangeTable" 
                        @row-click="rowClick"
                        :row-key="getRowKeys"  
                        :expand-row-keys="expands" 
                        @expand-change="expandChange"
                        :summary-method="getSummaries"
                        show-summary
                        max-height="320"
                        class="el-table" v-loading="loading">
                        <el-table-column type="expand">
                            <template slot-scope="scope" style=" background-color:#e4e7ed">
                                <el-table border center :data="scope.row.batchList"  style="width: calc(40% - 47px)" class="two-list">
                                    <el-table-column prop="stockinTime" label="入库日期"></el-table-column>
                                    <el-table-column prop="batchCode" label="批次号" width="100px" :show-overflow-tooltip="true"></el-table-column>
                                    <el-table-column prop="packageCode" label="捆包号" :show-overflow-tooltip="true"></el-table-column>
                                    <el-table-column prop="wvNo" label="入库单号"></el-table-column>   
                                    <el-table-column prop="itemQty" label="本次出库数量"></el-table-column>
                                    <el-table-column prop="itemUnitName" label="基础单位"></el-table-column>
                                    <el-table-column prop="secQty" label="第二数量"></el-table-column>
                                    <el-table-column prop="secUnitName" label="第二单位"></el-table-column>
                                </el-table>
                            </template>
                        </el-table-column>
                        <el-table-column type="selection" width="45" align="center"></el-table-column> 
                        <el-table-column  width="50" prop="rowno"  label="行号" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="contractCode" label="销售合同号" width="120px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="contractRowno" label="销售合同行号" width="120px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="extContractCode" label="外部合同号" width="120px" :show-overflow-tooltip="true" >
                        </el-table-column>
                        <el-table-column prop="dockSoNo" label="码单号" width="120px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="dockRowno" label="码单行号" width="120px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column label="物料号" width="178px" :show-overflow-tooltip="true"> 
                            <template slot-scope="scope">
                                <div v-if='scope.row.edit && type!=3'>
                                    <el-input v-model="scope.row.goodsCode" size="mini" class="el-inputs" placeholder="请选择" disabled></el-input>
                                    <span class='comicon2' @click="matterTips"><i class="el-icon-search" ></i></span>
                                </div>
                                <div v-else>
                                    {{scope.row.goodsCode}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="goodsName" label="物料名称" width="120px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="goodsCategoryName" label="物料大类" width="100px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="goodsSpec" label="物料规格" width="100px"  :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column label="是否赠品">
                            <template slot-scope="scope">
                                <div v-if='scope.row.edit'>
                                    <el-checkbox v-model="scope.row.isFreebie"></el-checkbox>
                                </div>
                                <div v-else>
                                    <el-checkbox v-model="scope.row.isFreebie" disabled></el-checkbox>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="itemUnitName" label="基础单位" width="120px" :show-overflow-tooltip="true">
                        </el-table-column>  
                        <el-table-column prop="contractQty" label="订单数量" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="sentQty" label="已发货数量" width="100px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="haventSentQty" label="订单可发数量" width="100px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="itemQty" label="实发数量" width="100px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="sheetQty"  label="开单数量" width="178px" :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                                <div v-if='scope.row.edit'>
                                    <el-input type="number"  v-model="scope.row.sheetQty"  @input="qtyChange(scope.row,scope.$index)" size="mini" class="el-inputs" placeholder="请输入"></el-input>
                                </div>
                                <div v-else>
                                    {{scope.row.sheetQty}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="secUnitName" label="第二单位" width="120px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="haventSentSecQty" label="第二数量可发数量" width="120px" :show-overflow-tooltip="true"> </el-table-column>
                        <el-table-column prop="secQty" label="第二数量" width="178px" :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                                <div v-if='scope.row.edit'>
                                    <el-input type="number"  @input="scope.row.secQty= $filterPriceNum(scope.row.secQty,4)" v-model="scope.row.secQty"  size="mini" class="el-inputs" placeholder="请输入"></el-input>
                                </div>
                                <div v-else>
                                    {{scope.row.secQty}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="originPrice" label="业务币含税单价" width="178px" :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                                <div v-if='scope.row.edit'>
                                    <el-input type="number"  v-model="scope.row.originPrice"  @input="handleOrginPrice(scope.row,scope.$index)" size="mini" class="el-inputs" placeholder="请输入"></el-input>
                                </div>
                                <div v-else>
                                    {{scope.row.originPrice}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="originNoPrice" label="业务币不含税单价"  width="120px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="originAmt" label="业务币含税金额"  width="178px" :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                                <div v-if='scope.row.edit'>
                                    <el-input type="number"  v-model="scope.row.originAmt"  @input="originAmtCh(scope.row,scope.$index)" size="mini" class="el-inputs" placeholder="请输入"></el-input>
                                </div>
                                <div v-else>
                                    {{scope.row.originAmt}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="originNoAmt" label="业务币不含税金额"  width="120px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column  label="增值税率%" width="178px" :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                                <div v-if='scope.row.edit'>
                                    <el-input type="number" v-model="scope.row.taxRate"  @input="taxRateCh(scope.row, scope.$index)" size="mini" class="el-inputs" placeholder="请输入"></el-input>
                                </div>
                                <div v-else>
                                    {{scope.row.taxRate}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="taxAmt" label="业务币增值税额" width="178px" :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                                <div v-if='scope.row.edit'>
                                    <el-input type="number"  v-model="scope.row.taxAmt"   @input="taxAmtCh(scope.row, scope.$index)" size="mini" class="el-inputs" placeholder="请输入"></el-input>
                                </div>
                                <div v-else>
                                    {{scope.row.taxAmt}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="basePrice" label="本币含税单价" width="100px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="baseNoPrice" label="本币不含税单价" width="110px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="baseAmt" label="本币含税金额" width="100px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="baseNoAmt" label="本币不含税金额" width="110px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="baseTax" label="本币增值税额" width="100px" :show-overflow-tooltip="true">
                        </el-table-column>
                         <el-table-column  label="备注" width="178px"  :show-overflow-tooltip="true">
                             <template slot-scope="scope">
                                <div v-if='scope.row.edit'>
                                    <el-input v-model="scope.row.remark" size="mini" class="el-inputs" placeholder="请输入"></el-input>
                                </div>
                                <div v-else>
                                    {{scope.row.remark}}
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                
                </div>
                 <!-- 选择公司弹窗 -->
                <compony-select v-if="basicData.componyShow" :tipShow='basicData.componyShow' @tipsCancle="tipsCancle" @tipsSure="tipsSure">
                </compony-select>
                <!-- 选择部门弹窗 -->
                <department-select v-if="basicData.departmentShow" :tipShow='basicData.departmentShow' :data='basicData.companyName' @departmentCancle="departmentCancle" @departmentSure="departmentSure">
                </department-select>
                <!-- 选择员工弹窗 -->
                <staff-select v-if="basicData.staffShow" :tipShow='basicData.staffShow' :data='{}' @staffCancle="staffCancle" @staffSure="staffSure">
                </staff-select>
                <!--选择业务币别 -->
                <coin-select v-if="basicData.coinShow" :tipShow='basicData.coinShow'  @coinCancle="coinCancle(1)" @coinSure="coinSure">
                </coin-select>
                 <!--选择销售客户 -->
                <customer-select v-if="basicData.customerShow" :tipShow='basicData.customerShow' :filterQuery="parentFilter" @customerCancle="customerCancle" @customerSure="customerSure">
                </customer-select>
                 <!--选择仓库-->
                <warehouse-select v-if="basicData.warehouseShow" :tipShow='basicData.warehouseShow' :isInactive="0"  @warehouseCancle="warehouseCancle" @warehouseSure="warehouseSure">
                </warehouse-select>
                 <!--选择物料号-->
                <matter-select v-if="basicData.matterShow" :tipShow='basicData.matterShow'  @matterCancle="matterCancle" @matterSure="matterSure">
                </matter-select>
                <!--批次拆分弹窗-->
                <el-dialog :visible.sync="batchSplitData.batchSplitShow" :close-on-click-modal="false" title="批次拆分" :show-close=false :before-close="batchSplitCancle" width="1100px" class="popup_box">
                    <div class="">
                        <div class="input-div" style="margin-top:10px;padding:0">
                            
                            <el-col :span="5" class="el-col">
                                <label>物料编码</label><el-input v-model="batchSplitData.categoryCode" disabled class="el-inputs" ></el-input>
                            </el-col>
                            <el-col :span="5" class="el-col">
                                <label>物料名称</label><el-input v-model="batchSplitData.categoryName" disabled class="el-inputs" ></el-input>
                            </el-col>
                            <el-col :span="5" class="el-col">
                                <label>物料大类</label><el-input v-model="batchSplitData.category" disabled class="el-inputs" ></el-input>
                            </el-col>
                            <el-col :span="5" class="el-col">
                                <label>物料规格</label><el-input v-model="batchSplitData.goodsSpec" disabled class="el-inputs" ></el-input>
                            </el-col>
                            <el-col :span="5" class="el-col">
                                <label>仓库</label><el-input v-model="batchSplitData.warehouseName" disabled class="el-inputs" ></el-input>
                            </el-col>
                            <el-col :span="5" class="el-col">
                                <label>应发数量</label><el-input v-model="batchSplitData.itemQty" disabled class="el-inputs" ></el-input>
                            </el-col>
                            <el-col :span="5" class="el-col">
                                <label>累计数量</label><el-input v-model="batchSplitData.allNum" disabled class="el-inputs"></el-input>
                            </el-col>
                        </div>
                        <!-- 表格 -->
                        <div class="el-table-div">
                            <el-table border center 
                            :data="batchSplitData.batchSplitTableData" class="el-table" 
                            ref="multipleTable"
                            tooltip-effect="dark"
                            @selection-change="handleSelectionChange"
                            @row-dblclick="dbClickBatchSplitTable"
                             v-loading="batchSplitData.loading">
                                <el-table-column  type="selection" width="45" align="center"></el-table-column>
                                <el-table-column prop="batchInvTime" label="入库日期" width="120px" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="batchCode" label="批次" width="110px" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="packageCode" label="捆包号" width="100px" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="costPrice" label="成本单价" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="itemUnitName" label="基础单位" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="unlimitedQtyS" label="基础库存数量" width="100px" show-overflow-tooltip>
                                </el-table-column>
                                <!-- <el-table-column prop="projectType" label="第二数量" show-overflow-tooltip>
                                </el-table-column> -->
                                <el-table-column label="实发数" width="178px" :show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                        <div v-if='scope.row.edit'>
                                            <el-input type="number" v-model="scope.row.itemQty"  @input="handleChangeItemQty(scope.row,scope.$index)" size="mini" class="el-inputs" placeholder="请输入"></el-input>
                                        </div>
                                        <div v-else>
                                            {{scope.row.itemQty}}
                                        </div>
                                    </template>
                                </el-table-column>
                                 <el-table-column prop="secUnitName" label="第二单位" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="unSecQty" label="第二库存数量" width="100px" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column  label="第二实发数" width="178px"  :show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                        <div v-if='scope.row.edit'>
                                            <el-input type="number" v-model="scope.row.secQty" @input="handleChangeSecQty(scope.row,scope.$index)"   size="mini" class="el-inputs" placeholder="请输入"></el-input>
                                        </div>
                                        <div v-else>
                                            {{scope.row.secQty}}
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="erpPoNo" label="采购合同号" width="100px" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="externalPoNo" label="外部合同号" width="100px" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="docNo" label="入库单号" width="100px" show-overflow-tooltip>
                                </el-table-column>
                            </el-table>
                        </div>
                         <div class="button-div2">
                            <el-button icon="el-icon-suitcase" @click="batchSplitSure()">保存</el-button>
                            <el-button  icon="el-icon-close" @click="batchSplitCancle()">取消</el-button>
                        </div>
                    </div>
                </el-dialog>
                <!--码单弹窗  开始-->
                <el-dialog :visible.sync="codeTipShow" :close-on-click-modal="false" title="码单发货" :show-close="false"  width="1100px" class="popup_box">
                    <div class="index" id="codeSheetDelivery">
                        <div class="el-table-div">
                            <el-table border center  
                                ref="multipleTableCode"
                                :data="codeSheetData.tableData" 
                                tooltip-effect="dark"
                                @select-all="codeDialogCheck" 
                                @selection-change="handleCodeChange" 
                                 @row-click="handleCodeRowClick"
                                class="el-table" v-loading="codeSheetData.loading">
                                <el-table-column type="selection" width="45" align="center"></el-table-column> 
                                <el-table-column type="index" width="50" label="序号">
                                </el-table-column>
                                <el-table-column prop="warehouseName" label="仓库" width="120px"  :show-overflow-tooltip="true">
                                </el-table-column>
                                <el-table-column prop="custName" label="客户" width="120px" :show-overflow-tooltip="true">
                                </el-table-column>
                                <el-table-column prop="dockSoNo" label="码单号" width="150px" :show-overflow-tooltip="true">
                                </el-table-column>
                                <el-table-column prop="rowno" label="码单行号" width="80px" :show-overflow-tooltip="true">
                                </el-table-column>
                                <el-table-column prop="sendDate" label="发货日期" width="120px"  :show-overflow-tooltip="true">
                                </el-table-column>
                                <el-table-column prop="goodsCode" label="物料编号" width="120px" :show-overflow-tooltip="true">
                                </el-table-column>
                                <el-table-column prop="goodsName" label="物料名称" width="120px" :show-overflow-tooltip="true">
                                </el-table-column>
                                <el-table-column prop="goodsCategoryName" label="物料大类" width="120px" :show-overflow-tooltip="true">
                                </el-table-column>
                                <el-table-column prop="goodsSpec" label="物料规格" width="120px" :show-overflow-tooltip="true">
                                </el-table-column>
                                <el-table-column prop="itemUnitName" label="基础单位" :show-overflow-tooltip="true">
                                </el-table-column>
                                <el-table-column prop="itemQty" label="数量" :show-overflow-tooltip="true">
                                </el-table-column>
                                <el-table-column prop="secUnitName" label="第二单位" :show-overflow-tooltip="true">
                                </el-table-column>
                                <el-table-column prop="secQty" label="第二数量" :show-overflow-tooltip="true">
                                </el-table-column>
                                <el-table-column prop="currencyName" label="币种" :show-overflow-tooltip="true">
                                </el-table-column>
                                <el-table-column prop="originPrice" label="单价" width="120px" :show-overflow-tooltip="true">
                                </el-table-column>
                                <el-table-column prop="originAmt" label="含税金额" width="120px" :show-overflow-tooltip="true" >
                                </el-table-column>
                                <el-table-column prop="remark" label="备注" width="120px" :show-overflow-tooltip="true">
                                </el-table-column>
                            </el-table>
                        </div>
                        <div class="button-div2">
                            <el-button @click="toEidtPage()" class="query-button" icon="el-icon-check">确定</el-button>
                            <el-button  @click="closed(2)" icon="el-icon-close">取消</el-button>  
                        </div>
                    </div>
                </el-dialog>
                <!--码单弹窗  结束-->
                <!--合同发货弹窗 开始-->
                <el-dialog :visible.sync="contractTipShow" :close-on-click-modal="false" title="选择销售合同" :show-close="false" width="1100px" class="popup_box">
                    <div class="index" id="contractDelivery">
                        <div class="el-table-div">
                            <el-table border center  
                                ref="multipleTableCont"
                                :data="contractData.tableData" 
                                tooltip-effect="dark"
                                @select-all="contDialogCheck" 
                                @select="contDialogCheck"
                                @selection-change="handleContChange" 
                                  @row-click="contDialogRowClick"  
                                class="el-table" v-loading="contractData.loading">
                                <el-table-column type="selection" width="45" align="center"></el-table-column> 
                                <el-table-column type="index" width="50" label="序号">
                                </el-table-column>
                                <el-table-column prop="soContractNo" label="销售合同号" width="120px" :show-overflow-tooltip="true">
                                </el-table-column>
                                <el-table-column prop="soRowno" label="销售合同行号" width="120px" :show-overflow-tooltip="true">
                                </el-table-column>
                                <el-table-column prop="goodsCode" label="物料编号" :show-overflow-tooltip="true">
                                </el-table-column>
                                <el-table-column prop="goodsName" label="物料名称" :show-overflow-tooltip="true">
                                </el-table-column>
                                <el-table-column prop="goodsCategoryName" label="物料大类" :show-overflow-tooltip="true">
                                </el-table-column>
                                <el-table-column prop="goodsSpec" label="物料规格" :show-overflow-tooltip="true">
                                </el-table-column>
                                <el-table-column prop="itemUnitName" label="基础单位" :show-overflow-tooltip="true">
                                </el-table-column>
                                <el-table-column prop="itemQty" label="数量" :show-overflow-tooltip="true">
                                </el-table-column>
                                <el-table-column prop="secUnitName" label="第二单位" :show-overflow-tooltip="true">
                                </el-table-column>
                                <el-table-column prop="secQty" label="第二数量" :show-overflow-tooltip="true">
                                </el-table-column>
                                <el-table-column prop="originPrice" label="单价" :show-overflow-tooltip="true">
                                </el-table-column>
                                <el-table-column prop="originAmt" label="含税金额" :show-overflow-tooltip="true">
                                </el-table-column>
                            </el-table>
                        </div>
                        <div class="button-div2">
                            <el-button  @click="contEidtPage()" class="query-button"  icon="el-icon-check">确定</el-button>
                            <el-button  @click="closed(1)" icon="el-icon-close">取消</el-button>    
                        </div>
                    </div>
                </el-dialog>
                
            </el-tab-pane>
             <!--费用预提-->
            <el-tab-pane  label="费用预提" name="second">
                <div class="button-div">
                    <el-button class="addBut" icon="el-icon-plus" @click="costAccruedAddRow()">添加行</el-button>
                    <el-button class="addBut" icon="el-icon-minus" @click="deleteRow(2)">删除行</el-button>
                </div>
                <div class="el-table-div"> 
                    <!-- <h3 class="sub-title">费用预提</h3>  -->
                    <el-table
                        :data="costAccruedData.tableData"
                        ref="costTable"
                        tooltip-effect="dark"
                        border
                        stripe
                        max-height="320"
                        style="width: 100%"
                        @select-all="costDialogCheck" 
                        @select="costDialogCheck"
                        @selection-change="costHandleChangeTable" 
                        @row-click="costClick">
                        <el-table-column type="selection" width="45" align="center"></el-table-column>
                        <el-table-column label="行号"  prop="rowno" width="60" align="center"></el-table-column>
                        <el-table-column  label="供应商" align="center" width="178px">
                            <template slot-scope="scope">
                                <div v-if='scope.row.edit'>
                                   <el-input size="mini" placeholder="请选择" v-model="scope.row.supplierName" disabled></el-input>
                                   <span class='comicon2' @click="supplierTips" ><i class="el-icon-search" ></i></span>
                                </div>
                                <div v-else>
                                    {{scope.row.supplierName}}
                                </div>
                            </template>
                        </el-table-column> 
                        <el-table-column label="费用名称" width="178px">
                            <template slot-scope="scope">
                                 <div v-if='scope.row.edit'>
                                   <el-input size="mini" placeholder="请选择" v-model="scope.row.costName" disabled></el-input>
                                   <span class='comicon2' @click="costTips" ><i class="el-icon-search" ></i></span>
                                </div>
                                <div v-else>
                                    {{scope.row.costName}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="shareDimName" label="摊销维度" width="178px">
                            <!-- <template slot-scope="scope">
                                <div v-if='scope.row.edit'>
                                   <el-input size="mini" placeholder="请输入内容" v-model="scope.row.shareDim"></el-input>
                                </div>
                                <div v-else>
                                    {{scope.row.shareDim}}
                                </div>
                            </template> -->
                        </el-table-column>
                         <el-table-column  label="业务币费用金额"  width="178px">
                            <template slot-scope="scope">
                                <div v-if='scope.row.edit'>
                                   <el-input size="mini"  type="number"  @input="handleCalculation('prefetchAmt',scope.row,scope.$index)" placeholder="请输入" v-model="scope.row.prefetchAmt"></el-input>
                                </div>
                                <div v-else>
                                    {{scope.row.prefetchAmt}}
                                </div>
                            </template>
                        </el-table-column> 
                        <el-table-column  label="业务币币别"  width="178px">
                            <template slot-scope="scope">
                                <div v-if='scope.row.edit'>
                                    <el-input size="mini" v-model="scope.row.currencyName"  placeholder="请选择" disabled></el-input>
                                    <span class='comicon2' @click="coinTips(2)"><i class="el-icon-search" ></i></span>
                                </div>
                                <div v-else>
                                    {{scope.row.currencyName}}
                                </div>
                            </template>
                        </el-table-column> 
                         <el-table-column  label="本位币汇率" align="center" width="178px">
                            <template slot-scope="scope">
                                <div v-if='scope.row.edit'>
                                   <el-input size="mini" @input="scope.row.baseCurrencyRate= $filterPriceNum(scope.row.baseCurrencyRate,8)"  placeholder="请输入"  v-model="scope.row.baseCurrencyRate"></el-input>
                                </div>
                                <div v-else>
                                    {{scope.row.baseCurrencyRate}}
                                </div>
                            </template>
                        </el-table-column> 
                        <el-table-column  label="税率%" align="center" width="178px">
                            <template slot-scope="scope">
                                <div v-if='scope.row.edit'>
                                   <el-input type="number"  size="mini" placeholder="请输入"  @input="handleCalculation('taxRate',scope.row,scope.$index)" v-model="scope.row.taxRate"></el-input>
                                </div>
                                <div v-else>
                                    {{scope.row.taxRate}}
                                </div>
                            </template>
                        </el-table-column> 
                        <el-table-column  label="无税金额" prop="costAmt" align="center" width="120px">
                        </el-table-column> 
                        <el-table-column  label="税额" prop="taxAmt" align="center" width="178px">
                            <!-- <template slot-scope="scope">
                                <div v-if='scope.row.edit'>
                                   <el-input type="number"  size="mini" placeholder="请输入内容"  @input="handleCalculation('taxAmt',scope.row,scope.$index)" v-model="scope.row.taxAmt"></el-input>
                                </div>
                                <div v-else>
                                    {{scope.row.taxAmt}}
                                </div>
                            </template> -->
                        </el-table-column> 
                        <el-table-column  label="本位币费用金额" prop="costAmtVatBase" align="center" width="120px">
                        </el-table-column> 
                        <el-table-column  label="无税金额(本位币)" prop="costAmtBase" align="center" width="120px">
                        </el-table-column> 
                        <el-table-column  label="税额(本位币)" prop="taxAmtBase" align="center" width="120px">
                        </el-table-column> 
                    </el-table>
                     <!--供应商弹窗-->
                    <supplier-select v-if="costAccruedData.supplierShow" :tipShow='costAccruedData.supplierShow'  @supplierCancle="supplierCancle" @supplierSure="supplierSure">
                    </supplier-select>  
                      <!--费用弹窗-->
                    <cost-select v-if="costAccruedData.costShow" :isShow='costAccruedData.costShow' :costLink="2"  @callback="costCallback">
                    </cost-select> 
                    <!--选择业务币别 -->
                    <coin-select v-if="costAccruedData.coinShow" :tipShow='costAccruedData.coinShow'  @coinCancle="coinCancle(2)" @coinSure="coinSure">
                    </coin-select>  
                </div>
            </el-tab-pane>
             <!--打印及附件-->
            <el-tab-pane  label="打印及附件" name="third">
                <div class="el-table-div">
                    <!-- <h3 class="sub-title">打印及附件</h3> -->
                    <div class="button-div">
                      <el-upload
                      class="upload-demo"
                      ref="newupload"
                      action="#"
                      :before-upload="beforeUpload"
                      :headers="uploadList.uploadHeaders"
                      :multiple="false"
                      :auto-upload="false"
                      :on-remove="handleRemove"
                      :limit="1"
                      :file-list="uploadList.fileList"
                      >
                        <el-button slot="trigger" style="color:#3E3F42;" size="small" icon="el-icon-paperclip" >选取文件</el-button>
                        <el-button style="margin-left: 10px;" size="small" class="addBut" icon="el-icon-upload"  @click="submitUpload">上传</el-button>
                      </el-upload>
                    </div>
                    <el-table
                        :data="uploadList.tableList"
                        ref="table2"
                        tooltip-effect="dark"
                        border
                        stripe
                        style="width: 100%"
                        @select-all="dialogCheckTable" 
                        @select="dialogCheckTable"
                        @selection-change="handleChangeTableTable" >
                        <el-table-column label="序号"  type="index" width="60" align="center"></el-table-column>
                        <el-table-column prop="fileOldName" label="文件名称" >
                        </el-table-column>
                        <!-- <el-table-column prop="fileType" label="类型" >
                        </el-table-column> -->
                        <!-- <el-table-column prop="fileType" label="文档类型名称">
                        </el-table-column> -->
                        <!-- <el-table-column prop="fileSuffix" label="签章情况" >
                        </el-table-column> -->
                        <el-table-column prop="createdTime" label="上传时间" >
                        </el-table-column>
                        <el-table-column prop="createdName" label="上传人" >
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button
                                size="mini"
                                type="text"
                                style="height: 26px;padding: 0;width:40px;"
                                @click="download(scope.row)">下载</el-button>
                                <el-button
                                size="mini"
                                type="text"
                                style="height: 26px;padding: 0;width:40px;"
                                @click="delFile(scope.$index,scope.row)">删除</el-button>
                                <!-- <el-button
                                size="mini"
                                type="text"
                                style="height: 26px;padding: 0;width:40px;"
                                @click="download(scope.row)">预览</el-button>
                                <el-button
                                size="mini"
                                type="text"
                                style="height: 26px;padding: 0;width:40px;"
                                @click="download(scope.row)">打印</el-button> -->
                            </template>
                        </el-table-column>
                    </el-table> 
                </div>
          
            </el-tab-pane>
            <!--系统信息-->
            <el-tab-pane  label="系统信息" name="fourth" style="height:100vh; background:#fff;">
                <!-- <h3 class="sub-title">系统信息</h3> -->
                <div class="index-div3">
                    <el-col :span="5" class="el-col" style="margin-left:-0.5%">
                        <label>创建人</label>
                        <el-input v-model="systemData.createdName" class="el-inputs" size="small"  disabled></el-input>
                    </el-col>
                    <el-col :span="5" class="el-col">
                        <label>创建时间</label>
                        <el-input v-model="systemData.createdTime" size="small" class="el-inputs"   disabled></el-input>
        
                    </el-col>
                    <el-col :span="5" class="el-col">
                        <label>修改人</label>
                        <el-input v-model="systemData.updatedName" size="small" class="el-inputs"  disabled></el-input>
                        
                    </el-col>
                    <el-col :span="5" class="el-col">
                        <label>修改时间</label>
                        <el-input v-model="systemData.updatedTime" size="small" class="el-inputs"  disabled></el-input>
                        
                    </el-col>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
    
</template>
<script>
import { mapState } from "vuex";
import sApi from "@/api/salesManage/salesManage";
import uploadApi from "@/api/component";
import calculation from "@/assets/js/calculation";
import componySelect from "@/components/componySelect.vue";
import departmentSelect from "@/components/departmentSelect.vue";
import staffSelect from "@/components/staffSelect.vue";
import coinSelect from "@/components/coinSelect.vue";
import customerSelect from "@/components/customerSelect.vue";
import warehouseSelect from "@/components/warehouseSelect.vue";
import matterSelect from "@/components/matterSelect.vue";
import supplierSelect from "@/components/supplierSelect.vue";
import costSelect from "@/components/costSelect.vue";
import { rename, realpath } from "fs";

export default {
  name: "retailShipment",
  data() {
    return {
      errorKey: [],
      //基本信息
      basicData: {
        componyShow: false, //银行弹窗
        departmentShow: false, //部门弹窗
        staffShow: false, //员工弹窗
        coinShow: false, //业务币弹窗
        customerShow: false, //客户弹窗
        warehouseShow: false, //仓库弹窗
        matterShow: false, //物料弹窗
        companyName: {}, //公司名
        companyCode: "", //公司代码
        branchName: {}, //部门
        branchCode: "", //部门代码
        staffName: {}, //业务员
        empId: "", //业务员id
        bizPersonCode: "", //业务员代码
        coinName: {}, //业务币别
        currencyId: "", //业务币种id
        toCurrencyCode: "", //本位币
        currencyCode: "", //业务币别代码
        customerName: {}, //客户
        custId: "", //客户id
        warehouseName: {}, //仓库
        warehouseCode: "", //仓库代码
        matterName: {}, //物料名称
        skuCode: "", //物料号
        contractType: "", //销售类型
        contractTypeList: [], //销售类型下拉数据
        doType: "", //放货类型
        doTypeList: [], //放货下拉数据
        doStatus: "10450005", //单据状态 //创建的时候默认为已保存
        doStatusList: [],
        signReceivedDate: "", //签收日期
        reciverAddress: "", //送货地址
        telephone: "", //联系方式
        reciver: "", //收件人
        blTimeline: "", //提单有效期
        remark: "", //备注
        doDate: "", //出库日期
        currencyRate: "", //汇率
        rmbCurrencyRate: 1, //人民币汇率
        doNo: "", //出库单号
        tableData: [], //商品明细列表数据
        selectioned: "", //选中  列表选中
        tableDataIndex: "", //表格当前选中的下标
        contractCode: "", //合同号
        contractRowno: "", //合同行号
        extContractCode: "", //外部合同号
        pickerOptions: {}, //出库日期时间范围
        payAmtTotalRmb: 0, //人民币总金额
        sumAmtVat: "", //业务币总金额
        sumQty: "",//统计数量
        batchChangeStatus:false,//复制的时候判断是否批次拆分
        externalBlNo:'',//外部提单号
        blRemark:'由提货人承担与所涉货物相关的所有费用，否则不予提货！',
      },
      //批次拆分数据
      batchSplitData: {
        batchSplitShow: false, //拆分批次弹窗
        categoryCode: "", //物料编号
        categoryName: "", //物料名称
        category: "", //物料大类
        goodsSpec: "", //物料规格
        warehouseName: "", //仓库
        itemQty: 0, //应发数量
        allNum: 0, //累计数量
        multipleSelection: [], //批次拆分选中数据
        batchSplitTableData: [], //批次拆分列表数据
        batchSplitTableDataIndex: "", //弹窗列表下标index
        batchStatus: false, //批次拆分的状态，用来判断基础库存数量和实发数
        loading: false
      },
      //码单弹窗
      codeSheetData: {
        companyId: "", //公司名
        companyList: [],
        branchId: "", //部门
        orgList: [],
        warehouseCode: "", //仓库名称
        warehouseList: [],
        customerCode: "", //客户名称
        custList: [],
        dockSoNo: "", //码单号
        dockExtNo: "", //外部码单号
        sendDate: "", //发货日期
        shipNo: "", //船号
        carNo: "", //车号
        sendDateTime: [], //发货日期
        show: true, //查询条件显示隐藏
        selectioned: [], //选中
        loading: false,
        tableData: []
      },
      //合同弹窗
      contractData: {
        selectioned: "", //选中
        loading: false,
        tableData: []
      },
      //费用预提数据
      costAccruedData: {
        tableData: [], //费用预提表格数据
        selectioned: "", //费用预提选中
        supplierShow: false, //供应商
        supplierName: {}, //供应商名称
        supplierCode: "", //供应商code
        supplierId: "", //供应商id
        costShow: "", //费用名称弹窗
        costName: {}, //费用名称
        coinShow: false, //业务币币别
        currencyName: {}, //业务币币别
        currencyCode: "",
        index: "",
        shareDimList: [] //摊销维度
      },
      //系统信息
      systemData: {
        createdTime: "", //创建时间
        createdName: "", //创建人
        updatedName: "", //修改人
        updatedTime: "" //修改时间
      },
      //附件上传
      uploadList: {
        tableList: [],
        fileList: [], //文件
        // sysid: "ac3284d42dcdbc883c3b6598c4fa5e2", //文件上传的参数
        uploadHeaders: { "content-Type": "multipart/form-data" } //文件上传的格式
      },
      parentFilter: {
        creditGroupCode: "" //信用客户组code
      },
      creditGroupName: "",
      codeTipShow: false, //码单弹窗
      contractTipShow: false, //合同明细弹窗
      contractId: "", //合同发货里选中的合同id
      loading: false,
      activeName: "one", //切换tabs
      type: "", //页面类型，合同，2零售，3码单，4复制
      flag: false, //销售类型是否可以编辑，复制的时候可以编辑
      coinType: "", //1基础数据里面的币种选择 2费用预提中
      expands: [], //只展开一行放入当前行id
      currencyList:[],
      getRowKeys: row => {
        //获取当前行id
        // if(this.type==3){
        //     return row.dockItemsId;
        // }else{
        //     return row.doItemsId;   //这里看这一行中需要根据哪个属性值是id
        // }
        return row.rowno;
      }
    };
  },
  created() {
    this.getDoStatusList(); //获取单据状态
    this.getDoTypeList(); //获取放货类型
    this.getContractTypeList(); //获取销售类型
    this.getShareDim(); //摊销维度
    this.selectCurrency();//获取业务币信息
    this.type = this.$route.query.type;
    if (this.type == 1) {
      //合同
      this.contractId = localStorage.getItem("soId"); //合同id
      this.getContractById();

      this.flag = true; //合同时带入销售类型
    } else if (this.type == 2) {
      //创建
      this.basicData.contractType = "10150020"; //零售销售
      this.flag = true; //合同时带入销售类型
    } else if (this.type == 3) {
      //码单
      this.getCodeSheetDataInfo(1); //码单信息
      this.basicData.contractType = "10150015"; //码单销售
      this.flag = true; //码单时带入销售类型
    } else {
      this.initData(); //复制初始化数据
      this.flag = false; //合同时带入销售类型
    }
  },
  methods: {
    //根据id获取合同，得公司，部门等信息
    getContractById() {
      let data = {
        soContractId: this.contractId,
        page: 1,
        pageSize: 100
      };
      sApi
        .selectOdSoContractInfo(data)
        .then(res => {
          let data = res.data.list[0];
          let baData = this.basicData;
          baData.companyName.companyName = data.companyName;
          baData.companyName.companyCode = data.companyCode; //公司
          baData.companyName.companyId = data.companyId;
          this.accountPeriod(data.companyId);
          baData.staffName.empId = data.bizPersonId;
          baData.staffName.empCode = data.bizPersonCode; //业务员代码
          baData.staffName.empName = data.bizPersonName; //业务员
          baData.branchName.branchCode = data.orgCode; //部门代码
          baData.branchName.branchName = data.orgName; //部门名称
          baData.branchName.branchId = data.orgId;
          baData.custId = data.custId;
          baData.customerName.custCode = data.custCode;
          baData.customerName.customerName = data.custName; //客户
          //baData.currencyRate = data.currencyRate; //汇率
          baData.currencyCode = data.originCurrencyCode; //业务币
          this.getParitiesForIssuePay();
          this.selectCurrencyName();//根据币别code查名称
          baData.toCurrencyCode = data.baseCurrencyCode; //本位币
          this.getRmbParities();
          this.costAccruedData.supplierId = data.supplierId; //供应商id
          this.costAccruedData.supplierName.supplierName = data.supplierName; //供应商name
          this.costAccruedData.supplierCode = data.supplierCode; //供应商name
          baData.contractType = `${data.contractCat}`; //销售类型
          baData.extContractCode = data.extCode; //外部合同号
          baData.contractCode = data.soContractNo; //合同号
          this.getContractInfo(1); //合同明细====》商品明细
        })
        .catch();
    },
    //获取合同的详细
    getContractInfo(num) {
      let data = {
        contractNo: this.basicData.contractCode
      };
      sApi
        .selectOdSoContractDetail(data)
        .then(res => {
          if (res.data.length) {
            if (num == 1) {
              this.basicData.tableData = res.data;
              this.basicData.sumAmtVat = 0;
              this.basicData.payAmtTotalRmb = 0;
              this.basicData.sumQty = 0;
              let currencyRate = this.basicData.currencyRate;
              let rmbCurrencyRate = this.basicData.rmbCurrencyRate;
              let that = this;
              this.basicData.tableData.forEach((value, index) => {
                value.rowno = (index + 1) * 10;
                value.extContractCode = that.basicData.extContractCode; //外部合同号
                value.itemUnitName=value.itemUnit;//基础单位
                value.secUnitName=value.secUnit;//第二单位
                //开单数量=订单可发数量
                //实发数量=订单可发数量
                value.sheetQty = value.haventSentQty;
                value.itemQty = value.haventSentQty;
                //业务币含税金额= 业务币含税金额=实发数量*业务币含税单价
                value.originAmt=this.$orginAmt(value.originPrice, value.itemQty);
                // 业务币不含税单价=业务币含税单价÷(1+增值税率）
                value.originNoPrice = this.$unorginPrice(
                  value.originPrice,
                  value.taxRate
                );
                //销售不含税金额
                value.originNoAmt = this.$unorginAmt(
                  value.originAmt,
                  value.taxRate
                );
                //增值税额
                value.taxAmt = this.$taxAmt(value.originAmt, value.originNoAmt);
                //本币计算 对应业务币*汇率

                //本币不含税单价 baseNoPrice
                value.baseNoPrice = this.$bbnhsdj(
                  value.originNoPrice,
                  currencyRate
                );

                //本币不含税金额 baseNoAmt
                value.baseNoAmt = this.$tybbnhsje(value.baseAmt,value.baseTax);
                value.contractRowno = value.soRowno; //合同行号
                that.basicData.sumAmtVat = that.$calculationAmount(
                  that.basicData.sumAmtVat,
                  value.originAmt,
                  "add"
                );
                that.basicData.sumQty = calculation.accAdd(
                  that.basicData.sumQty,
                  value.itemQty
                );
              });
              that.basicData.payAmtTotalRmb =this.$calculationAmount(
                that.basicData.sumAmtVat,
                rmbCurrencyRate,
                "mul"
              );
              //this.basicData.contractCode=res.data[0].contractCode;//合同号
              this.basicData.contractRowno = res.data[0].soRowno; //合同行号
            } else {
              this.contractData.tableData = res.data;
            }
          }
        })
        .catch();
    },
    //复制，初始化数据
    initData() {
      //获取数据
      this.loading = true;
      let data = {
        doNo: localStorage.getItem("doNo")
      };
      sApi.checkSaleOutOrder4Copy(data).then(res => {
          if (res.code = "success"){
            let data = res.data;
            var list = "";
            var currencyRate = "";
            //复制
            this.basicData.companyName.companyCode = data.companyCode; //公司代码
            this.basicData.companyName.companyName = data.companyName; //公司名称
            this.basicData.companyName.companyId = data.companyId;
            this.accountPeriod(data.companyId);
            this.basicData.staffName.empCode = data.bizPersonCode; //业务员代码
            this.basicData.staffName.empName = data.bizPersonName; //业务员
            this.basicData.staffName.empId = data.bizPersonId; //业务员
            this.basicData.branchName.branchCode = data.orgCode; //部门代码
            this.basicData.branchName.branchName = data.orgName; //部门名称
            this.basicData.branchName.branchId = data.orgId;
            this.basicData.warehouseName.warehouseCode = data.warehouseCode; //仓库代码
            this.basicData.warehouseName.warehouseName = data.warehouseName; //仓库代码
            this.basicData.custId = data.custId; //客户id
            this.basicData.customerName.customerName = data.custName; //客户名称
            this.basicData.customerName.custCode = data.custCode;
            //this.basicData.doNo=data.doNo;//出库单号
            this.basicData.externalBlNo=data.externalBlNo;//外部提单号
            this.basicData.doDate = this.$timeFun(data.doDate, true); //出库日期
            this.basicData.signReceivedDate = this.$timeFun(
              data.signReceivedDate,
              true
            ); //签收日期
            this.basicData.currencyCode = data.currencyCode; //业务币别
            this.selectCurrencyName();//根据币别code查名称
            this.basicData.contractType = `${data.contractType}`; //销售类型
            if (this.basicData.contractType == "10150015") {
              //如果是码单，限制客户组
              this.creditGroupName = data.creditGroupName; //客户组
              this.parentFilter.creditGroupCode = data.creditGroupCode;
            }
            this.basicData.doType = data.doType + ""; //放货类型
            //this.basicData.doStatus=data.doStatus+'';//单据状态
            this.basicData.reciverAddress = data.reciverAddress; //送货地址
            this.basicData.telephone = data.telephone; //联系方式
            this.basicData.reciver = data.reciver; //收件人
            this.basicData.blTimeline = this.$timeFun(data.blTimeline, true); //提单有效期
            this.basicData.rmbCurrencyRate = data.rmbCurrencyRate; //人民币汇率
            this.basicData.sumAmtVat = data.sumAmtVat; //总金额
            this.basicData.sumQty = data.sumQty; //总数量
            this.basicData.payAmtTotalRmb = data.payAmtTotalRmb; //人民币总金额
            this.basicData.remark = data.remark; //备注
            this.basicData.blRemark=data.blRemark;
            this.version = data.version; //版本号
            currencyRate = data.currencyRate; //汇率
            this.basicData.currencyRate = currencyRate;
            let prefetchList = data.prefetchList;
            prefetchList.forEach(e=>{
              this.currencyList.forEach(c=>{
                if(e.currencyCode==c.currencyCode){
                  e.currencyName=c.currencyName;
                }
              });
              this.costAccruedData.shareDimList.forEach(ele => {
                if (ele.dict_code == e.shareDim) {
                  e.shareDimName =
                    ele.dict_value;
                }
              });
            })
            this.costAccruedData.tableData = prefetchList; //费用预提
            this.selectFileList(data.doId);
            this.systemData.createdTime = this.$timeFun(data.createdTime, true);
            this.systemData.createdName = data.createdName;
            this.systemData.updatedName = data.updatedName;
            this.systemData.updatedTime = this.$timeFun(data.updatedTime, true);

            //汇率
            /******
                        1,本币含税单价=业务币含税单价*汇率
                        2,本币不含税单价=业务币不含税单价*汇率
                        3,本币含税金额=业务币含税金额*汇率
                        4,本币不含税金额=业务币不含税金额*汇率
                        5,本币增值税额=业务币增值税额*汇率
                    ******/
            list = data.itemsList; //商品明细
            if (list.length) {
              let that = this;
              for (let i = 0; i < list.length; i++) {
                let value = list[i];
                if (value.isFreebie) {
                  value.isFreebie = true;
                } else {
                  value.isFreebie = false;
                }
                // 业务币不含税单价=业务币含税单价÷(1+增值税率）
                value.originNoPrice = this.$unorginPrice(
                  value.originPrice,
                  value.taxRate
                );
                //销售不含税金额  销售不含税金额=销售含税金额-税额
                value.originNoAmt = this.$unorginAmtCh(value.originAmt, value.taxAmt);
                //本币计算 对应业务币*汇率
                //本币不含税单价 baseNoPrice
                value.baseNoPrice = this.$bbnhsdj(
                  value.originNoPrice,
                  currencyRate
                );
                //本币不含税金额 baseNoAmt
                value.baseNoAmt = this.$bbnhsje(
                  value.baseAmt,
                  value.baseTax
                );
              }
              if (list[0].contractCode != "" && list[0].contractCode != null) {
                this.basicData.contractCode = data.contractCode;
                this.basicData.contractRowno = list[0].contractRowno;
                this.basicData.extContractCode = data.extContractCode; //外部合同号
              }
            }
            this.basicData.tableData = list; //商品明细
            this.basicData.tableData.forEach((ele, index) => {
              this.handleOrginPrice(ele, index);
              this.taxRateCh(ele, index);
              this.taxAmtCh(ele, index);
            });
           
            this.loading = false;
          } else {
            this.$openWarning(res.message);
            this.loading = false;
          }
        })
        .catch();
    },
    //获取业务币列表
    selectCurrency(){
      sApi.listSimple().then(res => {
          if(res.code=="success"){
             this.currencyList=res.data;
          }
        }).catch();
    },
     //根据业务币别code查询名称
    selectCurrencyName(){
        let data={
          currencyCode:this.basicData.currencyCode
        }
        sApi.selectCurrencyName(data).then(res => {
          if(res.code=="success"){
              if(res.data!=null){
                  this.basicData.coinName.currencyName =res.data.currencyName;
              }
          }
        }).catch();
        
    },
     //根据公司id和业务币别获取本位币汇率
    getParitiesForIssuePay(){
        sApi.getParitiesForIssuePay({
          companyId:this.basicData.companyName.companyId,
          fromCurrencyCode: this.basicData.currencyCode,
      }).then((res) => {
        this.basicData.currencyRate = res.data.parities;
      }).catch((err) => { })
    },
     //查询附件
    selectFileList(id){
       let data = {
        businessId:id
      };
      uploadApi.selectFileList(data)
        .then(res => {
          if (res.code == "success") {
            this.uploadList.tableList=res.data;
            this.uploadList.tableList.forEach(element => {
               element.createdTime=this.$timeFun(element.createdTime, true);
            });
          } else {
            this.$openWarning(res.message);
          }
        }).catch();
    },
      //附件删除
    delFile(index,row){
      this.$confirm("是否确定删除？",{
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
      }).then(() => {
        this.uploadList.tableList.splice(index,1);
      }).catch();  
    },
    //预览
    download(row){
      window.open(row.fileServerAddress);
    },
    //查询码单明细
    getCodeSheetDataInfo(type) {
      let data = {
        ids: JSON.parse(localStorage.getItem("ids"))
      };
      sApi
        .socketDockSoList(data)
        .then(res => {
          if ((res.code = "success")) {
            var currencyRate = "";
            let flag = false;
            this.basicData.tableData = res.data.list;
            this.basicData.companyName.companyCode = this.basicData.tableData[0].companyCode; //公司代码
            this.basicData.companyName.companyName = this.basicData.tableData[0].companyName; //公司名称
            this.basicData.companyName.companyId = this.basicData.tableData[0].companyId;
            this.getCurrencyCodeByCompanyCode(this.basicData.tableData[0].companyCode,1);  
            this.accountPeriod(this.basicData.tableData[0].companyId);
            this.basicData.staffName.empId = this.basicData.tableData[0].bizPersonId; //业务员代码
            this.basicData.staffName.empCode = this.basicData.tableData[0].bizPersonCode; //业务员代码
            this.basicData.staffName.empName = this.basicData.tableData[0].bizPersonName; //业务员
            this.basicData.branchName.branchCode = this.basicData.tableData[0].orgCode; //部门代码
            this.basicData.branchName.branchName = this.basicData.tableData[0].orgName; //部门名称
            this.basicData.branchName.branchId = this.basicData.tableData[0].orgId;
            this.basicData.warehouseName.warehouseCode = this.basicData.tableData[0].warehouseCode; //仓库代码
            this.basicData.warehouseName.warehouseName = this.basicData.tableData[0].warehouseName; //仓库名称
            this.creditGroupName = this.basicData.tableData[0].custName; //信用客户组
            this.parentFilter.creditGroupCode = this.basicData.tableData[0].custCode; //信用客户组
            this.basicData.sumQty = 0;
            this.basicData.payAmtTotalRmb = 0;
            this.basicData.sumAmtVat = 0;
            if (this.basicData.tableData.length) {
              let that = this;
              for (let i = 0; i < this.basicData.tableData.length; i++) {
                let value = this.basicData.tableData[i];
                if (value.isFreebie) {
                  value.isFreebie = true;
                } else {
                  value.isFreebie = false;
                }
                //订单可发数量=订单数量-已发货数量
                value.haventSentQty = that.$calculationFun(
                  value.contractQty,
                  value.sentQty,
                  "sub",
                  0
                );
                //实发数量=订单可发数量
                value.itemQty = value.haventSentQty;
                //开单数量=实发数=订单可发数量
                value.sheetQty = value.haventSentQty;
                if (value.taxRate == null) {
                  value.taxRate = 0;
                }
                value.rowno = (i + 1) * 10;
                that.basicData.sumAmtVat = that.$calculationAmount(
                  that.basicData.sumAmtVat,
                  value.originAmt,
                  "add"
                );
                that.basicData.sumQty = calculation.accAdd(
                  that.basicData.sumQty,
                  value.itemQty
                );
                value.dockRowno = value.rowno; //码单行号
                this.handleOrginPrice(value, i);
                this.taxRateCh(value, i);
                this.taxAmtCh(value, i);
              }
            }
            this.basicData.payAmtTotalRmb = this.$calculationAmount(
              this.basicData.sumAmtVat,
              this.basicData.rmbCurrencyRate,
              "mul"
            ); //人民币总金额
            this.loading = false;
          } else {
            this.$openWarning(res.message);
            this.loading = false;
          }
        })
        .catch();
    },
    //码单信息查询
    initcodeSheetData() {
      this.codeSheetData.tableData = [];
      var that = this.codeSheetData;
      that.loading = true;
      let data = {
        warehouseCode: this.basicData.warehouseName.warehouseCode, //仓库
        custCode: this.parentFilter.creditGroupCode
      };
      sApi
        .socketDockSoList(data)
        .then(res => {
          if ((res.code = "success")) {
            this.codeSheetData.total = res.data.total;
            let list = res.data.list;
            for (let i = 0; i < list.length; i++) {
              list[i].sendDate = this.$timeFun(list[i].sendDate, true);
            }
            this.codeSheetData.tableData = list;
            this.codeSheetData.tableData.forEach((ele, index) => {
              this.basicData.tableData.forEach(ele2 => {
                if (
                  ele.dockSoNo == ele2.dockSoNo &&
                  ele.rowno == ele2.dockRowno
                ) {
                  this.codeSheetData.tableData.splice(index, 1);
                }
              });
              ele.itemUnitName=ele.itemUnit;//基础单位
              ele.secUnitName=ele.secUnit;//第二单位
            });
            this.codeSheetData.total = this.codeSheetData.tableData.length;
            that.loading = false;
          } else {
            this.$openWarning(res.message);
            that.loading = false;
          }
        }).catch();
    },
    //展开
    expandChange(row, rowList) {
      if (this.type != 3) {
        var that = this;
        if (rowList.length) {
          // 只展开一行//说明展开了
          that.expands = [];
          if (row) {
            that.expands.push(row.rowno); // 只展开当前行id
          }
          this.getBatchSplitData(row); //这里可以调用接口数据渲染
        } else {
          // 说明收起了
          that.expands = [];
        }
        this.basicData.tableDataIndex = this.basicData.tableData.indexOf(row);
      }
    },
    //根据id查询批次列表
    getBatchSplitData(row) {
      if(this.type!=4 && !row.doItemsId){
          return;
      }else if(this.type==4 && this.basicData.batchChangeStatus){//复制的时候不需要查询批次
        return;
      }
      let id = row.doItemsId;
      let data = {
        odItemsId: id
      };
      sApi
        .selectListBatchByItemId(data)
        .then(res => {
          if ((res.code = "success")) {
            //重新打开该行(加载数据不刷新)
            this.expands = [];
            this.expands.push(row.rowno);
            let list=res.data;
            list.forEach(it=>{
              it.stockinTime=this.$timeFun(it.stockinTime,true);
            });
            this.basicData.tableData[this.basicData.tableDataIndex].batchList =
              res.data; //商品明细
          } else {
            this.$openWarning(res.message);
          }
        })
        .catch();
    },
    //码单，根据公司code查询公司的信息，币别
    getCurrencyCodeByCompanyCode(companyCode, type) {
      let data = {
        companyCode: companyCode
      };
      sApi.selectBbCompanyBaseVoByCode(data).then(res => {
          if (res.code == "success") {
            if (type == 1) {
              //基础数据
              this.basicData.currencyCode = res.data.currencyCode;
              // this.selectCurrencyName();
              this.basicData.companyName.currencyCode = res.data.currencyCode;
              this.getParities(1);
            } else {
              //费用预提
              this.basicData.companyName.currencyCode = res.data.currencyCode; //得到公司业务币别
              this.getParities(2);
            }
          } else {
            this.$openWarning(res.message);
          }
        })
        .catch();
    },
    //月结
    accountPeriod(companyId) {
      let data = {
        companyId: companyId
      };
      sApi
        .getAccountPeriodByCompany(data)
        .then(res => {
          if (res.code == "success") {
            this.$nextTick(() => {
              this.basicData.pickerOptions = {
                disabledDate(time) {
                  return (
                    res.data.enddate < time.getTime() ||
                    time.getTime() < res.data.begindate
                  );
                }
              };
            });
          } else {
            this.$openWarning(res.message);
          }
        })
        .catch();
    },
    //合计,表格合计
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        } else if (
          column.property == "contractQty" ||
          column.property == "sentQty" ||
          column.property == "haventSentQty" ||
          column.property == "sheetQty" ||
          column.property == "itemQty" ||
          column.property == "secQty" ||
          column.property =="haventSentSecQty" ||
          column.property == "originAmt" ||
          column.property == "originNoAmt" ||
          column.property == "taxAmt" ||
          column.property == "baseAmt" ||
          column.property == "baseNoAmt" ||
          column.property == "baseTax"
        ) {
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return calculation.accAdd(prev, curr);
              } else {
                return prev;
              }
            }, 0);
          } else {
            sums[index] = "";
          }
        } else {
          sums[index] = "-";
        }
      });
      return sums;
    },
    //获取单据状态
    getDoStatusList() {
      let data = {
        dictNo: 1045
      };
      sApi
        .selectDoStatusList(data)
        .then(res => {
          this.basicData.doStatusList = res.data;
        })
        .catch();
    },
    //获取放货类型
    getDoTypeList() {
      let data = {
        dictNo: 1028
      };
      sApi
        .selectDoStatusList(data)
        .then(res => {
          this.basicData.doTypeList = res.data;
        })
        .catch();
    },
    //获取销售类型
    getContractTypeList() {
      let data = {
        dictNo: 1015
      };
      sApi
        .selectDoStatusList(data)
        .then(res => {
          this.basicData.contractTypeList = res.data;
        })
        .catch();
    },
    //获取摊销维度
    getShareDim() {
      let data = {
        dictNo: 1064
      };
      sApi
        .selectDoStatusList(data)
        .then(res => {
          this.costAccruedData.shareDimList = res.data;
        })
        .catch();
    },
    ///查询汇率
    getParities(type) {
      //1 基础数据   2，费用预提
      let data = {};
      if (type == 1) {
        if (
          !this.basicData.companyName.currencyCode ||
          !this.basicData.currencyCode
        ) {
          return;
        }
        data = {
          formCurrencyCode: this.basicData.currencyCode, //原货币  业务币
          toCurrencyCode: this.basicData.companyName.currencyCode ///目标币  本位币 || 人民币
        };
      } else {
        let index = this.costAccruedData.index;
        let currencyCode = this.costAccruedData.tableData[index].currencyCode; //
        if (!this.basicData.companyName.currencyCode || !currencyCode) {
          return;
        }
        data = {
          formCurrencyCode: currencyCode, //原货币  业务币
          toCurrencyCode: this.basicData.companyName.currencyCode ///目标币  本位币 || 人民币
        };
      }
      sApi
        .getParities(data)
        .then(res => {
          if (res.code == "success") {
            if (type == 1) {
              this.basicData.currencyRate = res.data.parities;
              this.handleCurrencyRate(this.basicData.currencyRate);
            } else {
              this.costAccruedData.tableData[
                this.costAccruedData.index
              ].baseCurrencyRate =
                res.data.parities;
            }
          } else {
            this.$openWarning(res.message);
          }
        })
        .catch();
    },
    //人民币汇率
    getRmbParities() {
      let data = {
        formCurrencyCode: this.basicData.currencyCode, //原货币  业务币
        toCurrencyCode: "CNY" ///目标币  本位币 || 人民币
      };
      sApi
        .getParities(data)
        .then(res => {
          if (res.data == null) {
            this.basicData.rmbCurrencyRate = 1;
          } else {
            this.basicData.rmbCurrencyRate = res.data.parities;
          }
        })
        .catch();
    },
    //商品明细添加行
    addRow() {
      this.basicData.tableData.forEach(item => {
        item.edit = false;
      });
      if (
        this.basicData.contractType != "10150015" &&
        this.basicData.contractType != "10150020"
      ) {
        this.contractTipShow = true;
        this.getContractInfo(2);
      } else if (this.basicData.contractType == "10150015") {
        //type==3 码单
        this.initcodeSheetData();
        this.codeTipShow = true;
      } else {
        let noe = new Date().valueOf();
        let that = this.basicData;
        let index = 10;
        var list = {
          noe: noe,
          edit: true,
          batchList: [],
          contractCode: "",
          extContractCode: "",
          contractRowno: "",
          goodsCode: "",
          goodsName: "",
          goodsCat: "",
          goodsCategoryName:"",
          goodsSpec: "",
          isFreebie: 0,
          itemUnitName: "",
          contractQty: "",
          sentQty: "",
          haventSentQty: "",
          itemQty: "",
          secUnitName: "",
          secQty: "",
          originPrice: "",
          originNoPrice: "",
          originAmt: "",
          originNoAmt: "",
          taxRate: 0, //增值税率默认为0
          taxAmt: "",
          basePrice: "",
          baseNoPrice: "",
          baseAmt: "",
          baseNoAmt: "",
          baseTax: "",
          remark: ""
        };
        this.basicData.tableData.unshift(list);
        this.basicData.tableData.forEach((item, index) => {
          item.rowno = (index + 1) * 10;
          this.qtyChange(item, index);
          this.handleOrginPrice(item, index);
          this.$set(this.basicData.tableData, index, item);
        });
      }
    },
    //删除行
    deleteRow(type) {
      if (type == 1) {
        //基础数据
        if (!this.basicData.selectioned) {
          //判断商品明细是否选中
          this.$openWarning("未选择数据");
          return;
        }
        this.basicData.tableData.splice(this.basicData.tableDataIndex, 1);
        // 删除完数据之后清除勾选框
        this.$refs.table.clearSelection();
        this.basicData.tableData.forEach((item, index) => {
          item.rowno = (index + 1) * 10;
          this.qtyChange(item, index);
          this.handleOrginPrice(item, index);
          this.$set(this.basicData.tableData, index, item);
        });
      } else {
        //费用预提
        if (!this.costAccruedData.selectioned) {
          //判断商品明细是否选中
          this.$openWarning("未选择数据");
          return;
        }
        this.costAccruedData.tableData.splice(this.costAccruedData.index, 1);
        // 删除完数据之后清除勾选框
        this.$refs.costTable.clearSelection();
      }
    },
    //费用预提添加行
    costAccruedAddRow() {
      this.costAccruedData.tableData.forEach(item => {
        item.edit = false;
      });
      let costObj = {
        edit: true,
        rowno: (this.costAccruedData.tableData.length + 1) * 10,
        supplierName: "", //供应商名称
        costName: "", //费用名称
        shareDim: "", //摊销维度
        shareDimName:"",
        prefetchAmt: "", //业务币费用金额
        currencyName: "", //业务币币别
        currencyCode: "", //业务币别
        baseCurrencyRate: 1, //本位币汇率
        taxRate: 0, //税率
        costAmt: "", //无税金额
        taxAmt: "" //税额
      };
      this.costAccruedData.tableData.unshift(costObj);
      this.costAccruedData.tableData.forEach((item, index) => {
        item.rowno = (index + 1) * 10;
        this.$set(this.costAccruedData.tableData, index, item);
      });
    },
    //批次拆分弹窗显示
    batchSplit(type) {
      if (!this.basicData.selectioned) {
        //判断商品明细是否选中
        this.$openWarning("未选择数据");
        return;
      }
      if (!this.basicData.companyName.companyCode) {
        this.$openWarning("请选择公司");
        return;
      }
      if (!this.basicData.branchName.branchCode) {
        this.$openWarning("请选择部门");
        return;
      }
      if (!this.basicData.warehouseName.warehouseCode) {
        this.$openWarning("请选择仓库");
        return;
      }
      if(Object.keys(this.basicData.customerName).length==0) {
        this.$openWarning("请选择销售客户");
        return;
      }
      this.basicData.skuCode = this.basicData.selectioned.goodsCode;
      if (!this.basicData.skuCode) {
        this.$openWarning("请选择物料号");
        return;
      }
      if (!this.basicData.selectioned.itemQty) {
        this.$openWarning("请填写开单数量");
        return;
      }
      if (this.basicData.selectioned.secQty==="" || this.basicData.selectioned.secQty===null) {
        this.$openWarning("请填写第二数量");
        return;
      }
      this.batchSplitData.loading = true;
      this.batchSplitData.allNum = 0; //累计数量
      let selected = this.basicData.selectioned;
      this.batchSplitData.categoryCode = selected.goodsCode; //物料编号
      this.batchSplitData.categoryName = selected.goodsName; //物料名称
      this.batchSplitData.category = selected.goodsCategoryName; //物料大类
      this.batchSplitData.goodsSpec = selected.goodsSpec; //物料规格
      this.batchSplitData.warehouseName = this.basicData.warehouseName.warehouseName; //仓库
      this.batchSplitData.warehouseCode = this.basicData.warehouseName.warehouseCode;
      this.batchSplitData.itemQty = selected.itemQty; //应发数量
      let itemSecQty=selected.secQty;//明细第二数量
      if (type == 2) {
        //自动匹配
        this.batchSplitData.allNum = selected.itemQty; //累计数量
        
      }
      //var haventSentQty=selected.haventSentQty;//订单可发数量
      //拆分批次弹窗显示
      this.batchSplitData.batchSplitShow = true;
      let data = {
        warehouseCode: this.batchSplitData.warehouseCode,
        skuCode: this.basicData.skuCode,
        companyCode: this.basicData.companyName.companyCode,
        orgCode: this.basicData.branchName.branchCode,
        custCode:this.basicData.customerName.custCode,
      };
      sApi
        .selectList2SaleBatchSplitV2(data)
        .then(res => {
          if (res.code == "success") {
            let _this = this;
            let batchData = res.data;
            let surplusNum = this.batchSplitData.itemQty; //剩余实发数
            batchData.forEach(item => {
              item.secUnitName = _this.basicData.selectioned.secUnitName; //第二单位
              item.itemUnitName = _this.basicData.selectioned.itemUnitName; //基础单位
              item.batchInvTime = _this.$timeFun(item.batchInvTime, true); //入库时间
              item.unSecQty=item.secUnitQty;//第二库存数量，默认第二库存数
              if (type == 2 && surplusNum > 0) {
                if (surplusNum > item.unlimitedQtyS) {
                  item.itemQty = item.unlimitedQtyS;
                } else {
                  item.itemQty = surplusNum;
                }
                surplusNum = calculation.accSub(surplusNum, item.unlimitedQtyS);
               
              }
              if(type==2 && itemSecQty>0){//第二数量
                 if (itemSecQty > item.unSecQty) {
                  item.secQty = item.unSecQty;
                } else {
                  item.secQty = itemSecQty;
                }
                itemSecQty = calculation.accSub(
                  itemSecQty,
                  item.unSecQty
                );
              }else if(type==1){
                item.secQty=0;
              }
            });
            _this.batchSplitData.batchSplitTableData = batchData;
            if (type == 2) {
              //自动匹配勾选上有实发数的
              _this.batchSplitData.batchSplitTableData.forEach(ele => {
                if (ele.itemQty > 0) {
                  _this.batchSplitData.multipleSelection.push(ele);
                  _this.$nextTick(() => {
                    _this.$refs.multipleTable.toggleRowSelection(ele, true);
                  });
                }
              });
             
            }
            this.batchSplitData.loading = false;
          } else {
            this.$message({
              duration: 1000,
              showClose: true,
              message: res.message,
              type: "warning"
            });
          }
        })
        .catch();
    },
    //新增销售出库单/提交
    saveSaleOutboundOrder() {
      let basicData = this.basicData;
      this.errorKey = [];
      let basicKey = ['companyName', 'branchName', 'staffName', 'warehouseName', 'doDate', 'customerName', 'coinName', 'rmbCurrencyRate', 'contractType', 'currencyRate', 'doType'];
      basicKey.forEach(item => {
        if(typeof basicData[item] == 'object' && Object.keys(basicData[item]).length == 0 && item != 'doDate') {
          this.errorKey.push(item);
        } else if (!basicData[item]) {
          this.errorKey.push(item);
        }
      })
      if(this.errorKey.length > 0) {
        this.$openWarning("请将必填项补充完整！");
        return false;
      }
      let itemsList = basicData.tableData;
      if (itemsList.length == 0) {
        this.$openWarning("商品明细不能为空");
        return;
      }
      //判断明细实发数大于订单可发数
      let flag = false;
      let checkSecQty="";//1 未填，2，数量为0，第二数量不为0
      itemsList.forEach(it => {
        if (it.haventSentQty && it.itemQty > it.haventSentQty) {
          flag = true;
          return;
        }
        if(it.secQty==="" || it.secQty===null){
          checkSecQty=1;
          return;
        }else if(it.itemQty===0 && it.secQty){
           checkSecQty=2;
          return;
        }
        // if(it.originPrice==""){
        //    checkSecQty=3;
        //   return;
        // }
      });
      //校验第二数量
      if(checkSecQty==1){
        this.$openWarning("请填写第二数量");
        return;
      }else if(checkSecQty==2){
        this.$openWarning("第一单位数量为0且第二单位数量不为0，请核对信息");
        return;
      }
         // else if(checkSecQty==3){
      //   this.$openWarning("请填写单价");
      //   return;
      // }
      //码单时需要校验
      if (this.type == 3 && flag) {
        this.$openWarning("实发数量不能大于订单可发数");
        return;
      }
      let boo = false;
      if (this.type == 1) {
        //type=1合同发货，合同发货明细id或者行号相同，物料号不能相同
        for (let i = 0; i < itemsList.length - 1; i++) {
          for (let j = i + 1; j < itemsList.length; j++) {
            if (
              itemsList[j].contractRowno === itemsList[i].contractRowno &&
              itemsList[j].goodsCode === itemsList[i].goodsCode
            ) {
              boo = true;
            }
            break;
          }
        }
      }
      if (boo) {
        this.$openWarning("合同明细一致时，物料号不能相同");
        return;
      }
      itemsList.forEach(item => {
        if (item.isFreebie) {
          item.isFreebie = 1;
        } else {
          item.isFreebie = 0;
        }
      });
      let data = {
        companyCode: basicData.companyName.companyCode, //公司代码
        companyName: basicData.companyName.companyName, //部门名称
        companyId: basicData.companyName.companyId,
        orgCode: basicData.branchName.branchCode, //部门
        orgId: basicData.branchName.branchId,
        orgName: basicData.branchName.branchName, //部门名称
        bizPersonCode: basicData.staffName.empCode, //业务员
        bizPersonName: basicData.staffName.empName, //业务员
        bizPersonId: basicData.staffName.empId,
        doNo: basicData.doNo, //出库单号
        warehouseCode: basicData.warehouseName.warehouseCode, //仓库代码
        warehouseName: basicData.warehouseName.warehouseName,
        doDate: basicData.doDate, //出库日期
        custId: basicData.custId, //销售客户
        custCode: basicData.customerName.custCode, //代码
        custName: basicData.customerName.customerName, //客户名称
        signReceivedDate: basicData.signReceivedDate, //签收日期
        currencyCode: basicData.currencyCode, //业务币别
        currencyRate: basicData.currencyRate, //汇率
        doStatus: basicData.doStatus, //单据状态
        contractType: basicData.contractType, //销售类型
        doType: basicData.doType, //放货类型
        reciverAddress: basicData.reciverAddress, //送货地址
        telephone: basicData.telephone, //联系方式
        reciver: basicData.reciver, //收件人
        blTimeline: basicData.blTimeline, //提单有效期
        remark: basicData.remark, //备注
        blRemark:basicData.blRemark,
        externalBlNo:basicData.externalBlNo,//外部提单号
        extContractCode: basicData.extContractCode, //外部合同号
        contractCode: basicData.contractCode, //合同号
        contractRowno: basicData.contractRowno, //合同行号
        rmbCurrencyRate: basicData.rmbCurrencyRate, //人民币汇率
        payAmtTotalRmb: basicData.payAmtTotalRmb, //人民币总金额
        sumAmtVat: basicData.sumAmtVat, //业务币总金额
        sumQty: basicData.sumQty, //统计数量
        creditGroupCode: this.parentFilter.creditGroupCode, //信用客户组
        creditGroupName: this.creditGroupName,
        itemsList: itemsList, //商品明细list
        prefetchList: this.costAccruedData.tableData, //费用预提list
        sysSystemAccessoryList:this.uploadList.tableList,//附件上传
      };
      sApi
        .insertSaleOutboundOrder(data)
        .then(res => {
          if (res.code == "success") {
            this.$openSuccess(res.message);
            this.$router.push({
              path: "/index/salesManage/salesIssueDoc" //跳转的路径
            });
          } else {
            this.$openWarning(res.message);
          }
        })
        .catch();
    },
    //计算批次拆分弹窗里的 累计数量=列表里的实发数总和
    handleChangeItemQty(row, index) {
      if (this.batchSplitData.batchSplitTableData.length) {
        this.batchSplitData.batchSplitTableData[
          index
        ].itemQty = this.$filterPriceNum(row.itemQty, 4);
      }
      let tol = 0;
      for (const item of this.batchSplitData.multipleSelection) {
        tol = calculation.accAdd(tol, item.itemQty);
      }
      this.batchSplitData.allNum = tol;
      if (row.itemQty > row.unlimitedQtyS) {
        //如果实际数量大于库存数量，提示
        //如果实际数量大于库存数量，提示
        this.batchSplitData.batchStatus = true;
        this.$openWarning("实发数不能大于基础库存数量");
        return;
      } else {
        this.batchSplitData.batchStatus = false;
      }
    },
    //批次拆分弹窗第二实发数
    handleChangeSecQty(row, index){
      if (this.batchSplitData.batchSplitTableData.length) {
        this.batchSplitData.batchSplitTableData[
          index
        ].secQty = this.$filterPriceNum(row.secQty, 4);
      }
      if (row.secQty > row.unSecQty) {
        //如果实际数量大于库存数量，提示
        this.$openWarning("第二实发数不能大于第二库存数量");
        return;
      }
    },
    qtyChange(row, index) {
      if (this.basicData.tableData.length) {
        this.basicData.tableData[index].sheetQty = this.$filterPriceNum(row.sheetQty,4);
      }
      this.basicData.sumQty = 0;
      let that = this;
      row.itemQty=row.sheetQty;//实发数量===开单数量
      this.basicData.tableData.forEach(e => {
        that.basicData.sumQty = calculation.accAdd(
          that.basicData.sumQty,
          e.itemQty
        );
      });
      this.handleOrginPrice(row, index);
      this.taxRateCh(row, index);
      this.taxAmtCh(row, index);
    },
    //增值税率
    // 业务币含税单价
    // 业务币含税单价*数量=业务币含税金额
    //业务币不含税单价=业务币含税单价÷（+增值税率）
    // ,本币含税单价=业务币含税单价*汇率 //
    handleOrginPrice(e, index) {
      let row = e;
      if (this.basicData.tableData.length) {
        this.basicData.tableData[index].originPrice = this.$filterPriceNum(
          row.originPrice,
          6
        );
      }
      let currencyRate = this.basicData.currencyRate;
      let rmbCurrencyRate = this.basicData.rmbCurrencyRate;
      // 业务币不含税单价=业务币含税单价÷(1+增值税率）
      row.originNoPrice = this.$unorginPrice(row.originPrice, row.taxRate);
      //销售含税金额
      row.originAmt = this.$orginAmt(row.originPrice, row.itemQty);
      //销售不含税金额
      row.originNoAmt = this.$unorginAmt(row.originAmt, row.taxRate);
      //增值税额
      row.taxAmt = this.$taxAmt(row.originAmt, row.originNoAmt);
      //本币计算 对应业务币*汇率
      //本币含税单价  basePrice
      row.basePrice = this.$bbhsdj(row.originPrice, currencyRate);
      //本币不含税单价 baseNoPrice
      row.baseNoPrice = this.$bbnhsdj(row.originNoPrice, currencyRate);
      //本币含税金额 baseAmt
      row.baseAmt = this.$bbhsje(row.originAmt, currencyRate);
      //本币增值税额 baseTax
      row.baseTax = this.$bbzzse(row.taxAmt, currencyRate);
       //本币不含税金额 baseNoAmt
      row.baseNoAmt = this.$tybbnhsje(row.baseAmt,row.baseTax);
      this.basicData.payAmtTotalRmb = 0; //人民币总金额
      this.basicData.sumAmtVat = 0; //业务币总金额
      let that = this;
      this.basicData.tableData.forEach(e => {
        that.basicData.sumAmtVat = that.$calculationAmount(
          that.basicData.sumAmtVat,
          e.originAmt,
          "add"
        );
      });
      that.basicData.payAmtTotalRmb = that.$calculationAmount(
        that.basicData.sumAmtVat,
        rmbCurrencyRate,
        "mul"
      );
      this.$set(this.basicData.tableData, index, row);
    },
    //销售含税金额变动
    originAmtCh(e, index) {
      let currencyRate = this.basicData.currencyRate;
      let rmbCurrencyRate = this.basicData.rmbCurrencyRate;
      let row = e;
      if (this.basicData.tableData.length) {
        this.basicData.tableData[index].originAmt = this.$filterPriceNum(
          row.originAmt,
          2
        );
      }
      //销售含税单价
      row.originPrice = this.$orginPrice(row.originAmt, row.itemQty);
      //销售不含税单价
      row.originNoPrice = this.$unorginPrice(row.originPrice, row.taxRate);
      //销售不含税金额
      row.originNoAmt = this.$unorginAmt(row.originAmt, row.taxRate);
      //增值税额
      row.taxAmt = this.$taxAmt(row.originAmt, row.originNoAmt);

      //本币计算 对应业务币*汇率
      //本币含税单价  basePrice
      row.basePrice = this.$bbhsdj(row.originPrice, currencyRate);
      //本币不含税单价 baseNoPrice
      row.baseNoPrice = this.$bbnhsdj(row.originNoPrice, currencyRate);
      //本币增值税额 baseTax
      row.baseTax = this.$bbzzse(row.taxAmt, currencyRate);
       //本币含税金额 baseAmt
      row.baseAmt = this.$bbhsje(row.originAmt, currencyRate);
      //本币不含税金额 baseNoAmt
      row.baseNoAmt = this.$tybbnhsje(row.baseAmt,row.baseTax);
      this.basicData.payAmtTotalRmb = 0; //人民币总金额
      this.basicData.sumAmtVat = 0; //业务币总金额
      let that = this;
      this.basicData.tableData.forEach(e => {
        that.basicData.sumAmtVat = that.$calculationAmount(
          that.basicData.sumAmtVat,
          e.originAmt,
          "add"
        );
      });
      that.basicData.payAmtTotalRmb =this.$calculationAmount(
        that.basicData.sumAmtVat,
        rmbCurrencyRate,
        "mul"
      );
      this.$set(this.basicData.tableData, index, row);
    },
    //税率变动
    taxRateCh(e, index) {
      let currencyRate = this.basicData.currencyRate;
      let row = e;

      if (this.basicData.tableData.length) {
        this.basicData.tableData[index].taxRate =
          (row.taxRate + "").replace(/[^\d]/g, "") * 1;
      }
      //销售不含税金额
      row.originNoAmt = this.$unorginAmt(row.originAmt, row.taxRate);
      //销售不含税单价
      row.originNoPrice = this.$unorginPrice(row.originPrice, row.taxRate);
      // //增值税额
      row.taxAmt = this.$taxAmt(row.originAmt, row.originNoAmt);
      //本币计算 对应业务币*汇率
       //本币增值税额 baseTax
      row.baseTax = this.$bbzzse(row.taxAmt, currencyRate);
      //本币不含税金额 baseNoAmt
      // row.baseNoAmt = this.$bbnhsje(row.originNoAmt, currencyRate);
      row.baseNoAmt = this.$tybbnhsje(row.baseAmt,row.baseTax);
      //本币不含税单价 baseNoPrice
      row.baseNoPrice = this.$bbnhsdj(row.originNoPrice, currencyRate);
     
      this.$set(this.basicData.tableData, index, row);
    },
    //业务币税额变动
    taxAmtCh(e, index) {
      let currencyRate = this.basicData.currencyRate;
      let row = e;
      if (this.basicData.tableData.length) {
        this.basicData.tableData[index].taxAmt = this.$filterPriceNum(
          row.taxAmt,
          2
        );
      }
      //销售不含税金额  销售不含税金额=销售含税金额-税额
      row.originNoAmt = this.$unorginAmtCh(row.originAmt, row.taxAmt);
      //销售不含税单价 销售不含税金额=销售不含税金额 / 数量
      row.originNoPrice = this.$unPrice(row.originNoAmt, row.itemQty);
      //本币计算 对应业务币*汇率
       //本币增值税额 baseTax
      row.baseTax = this.$bbzzse(row.taxAmt, currencyRate);
      //本币不含税金额 baseNoAmt
      row.baseNoAmt = this.$tybbnhsje(row.baseAmt,row.baseTax);
      //本币不含税单价 baseNoPrice
      row.baseNoPrice = this.$bbnhsdj(row.originNoPrice, currencyRate);
     
      this.$set(this.basicData.tableData, index, row);
    },

    //汇率
    /******
            ,本币含税单价=业务币含税单价*汇率
            2,本币不含税单价=业务币不含税单价*汇率
            3,本币含税金额=业务币含税金额*汇率
            4,本币不含税金额=业务币不含税金额*汇率
            5,本币增值税额=业务币增值税额*汇率
        ******/
    handleCurrencyRate(currencyRate) {
      this.basicData.currencyRate = this.$filterPriceNum(currencyRate, 8);
      let list = JSON.parse(JSON.stringify(this.basicData.tableData)); //拷贝数组,注意这行的拷贝方法
      for (let i = 0; i < list.length; i++) {
        let row = list[i];
        //本币含税单价  basePrice
        row.basePrice = this.$bbhsdj(row.originPrice, currencyRate);
        //本币不含税单价 baseNoPrice
        row.baseNoPrice = this.$bbnhsdj(row.originNoPrice, currencyRate);
        //本币含税金额 baseAmt
        row.baseAmt = this.$bbhsje(row.originAmt, currencyRate);
         //本币增值税额 baseTax
        row.baseTax = this.$bbzzse(row.taxAmt, currencyRate);
        //本币不含税金额 baseNoAmt
        row.baseNoAmt = this.$tybbnhsje(row.baseAmt,row.baseTax);
       
      }
      this.basicData.tableData = list;
    },
    //修改人民币汇率
    handleRmbCurrencyRate(rmbCurrencyRate) {
      this.basicData.rmbCurrencyRate = this.$filterPriceNum(rmbCurrencyRate, 8);
      this.basicData.payAmtTotalRmb =this.$calculationAmount(
        this.basicData.sumAmtVat,
        rmbCurrencyRate,
        "mul"
      );
    },
    //费用预提金额计算
    handleCalculation(type, row, index) {
      if (type == "prefetchAmt") {
        this.costAccruedData.tableData[
          index
        ].prefetchAmt = this.$filterPriceNum(row.prefetchAmt, 2);
        row.costAmtVatBase=row.prefetchAmt; //费用金额含税(本位币)
      } else if (type == "taxRate") {
        //税率
        this.costAccruedData.tableData[index].taxRate =
          (row.taxRate + "").replace(/[^\d]/g, "") * 1;
      } else {
        this.costAccruedData.tableData[index].taxAmt = this.$filterPriceNum(
          row.taxAmt,
          2
        );
      }
      //无税金额=业务币费用金额/（1+税率）
      row.costAmt = this.$noOrginAmt(row.prefetchAmt, row.taxRate);
      //税额=业务币费用金额-无税金额
      row.taxAmt = this.$fyytjs(row.prefetchAmt, row.costAmt);
      row.costAmtBase=row.costAmt;  //无税金额(本位币)
      row.taxAmtBase=row.taxAmt;  //税额(本位币)
    },
    //批次拆分弹窗关闭
    batchSplitCancle() {
      this.batchSplitData.batchSplitShow = false;
      this.batchSplitData.categoryCode = ""; //物料编号
      this.batchSplitData.categoryName = ""; //物料名称
      this.batchSplitData.category = ""; //物料大类
      this.batchSplitData.goodsSpec = ""; //物料规格
      this.batchSplitData.warehouseName = ""; //仓库
      this.batchSplitData.itemQty = ""; //应发数量
      this.batchSplitData.allNum = 0; //累计数量
      this.batchSplitData.batchSplitTableData = [];
    },
    //批次确定
    batchSplitSure() {
      if (this.batchSplitData.multipleSelection.length == 0) {
        this.$openWarning("未选择数据");
        return;
      }
      if (this.batchSplitData.allNum > this.batchSplitData.itemQty) {
        this.$openWarning("累计数量不能大于应发数量");
        return;
      }
      let _this = this;
      let index = _this.basicData.tableDataIndex;
      _this.basicData.tableData[index].batchList = [];
      _this.basicData.tableData[index].batchList =_this.batchSplitData.multipleSelection;
      let secQtySum=0;//第二实发数总和
      let checkSec="";//判断第二实发数
      _this.basicData.tableData[index].batchList.forEach((item, i) => {
        item.stockinTime = item.batchInvTime;
        item.wvNo = item.docNo; //采购入库单号
        item.rowno = _this.basicData.tableData[index].rowno;
        item.poContractCode=item.erpPoNo;//采购合同号
        if (!item.itemQty) {
          _this.basicData.tableData[index].batchList.splice(i, 1);
        }else{
            if(item.secQty==="" || item.secQty===null){
              checkSec=1;
              return;
            }else if(item.secQty>item.unSecQty){
              checkSec=2;
              return;
            }
        }
        secQtySum=calculation.accAdd(secQtySum,item.secQty);
      });
      //判断第二实发数
      if(checkSec==1){
        this.$openWarning("请填写第二实发数");
        return;
      }else if(checkSec==2){
         this.$openWarning("第二实发数不能大于第二库存数量");
        return;
      }
      this.basicData.tableData[index].sheetQty = this.batchSplitData.allNum; //开单数==累计数
      this.basicData.tableData[index].itemQty = this.batchSplitData.allNum; //批次拆分点击确定，实发数==累计数
      this.basicData.tableData[index].secQty=secQtySum;//明细第二数量==选中的批次第二实发数总和
      this.qtyChange(this.basicData.tableData[index], index);
      this.$set(
        this.basicData.tableData,
        index,
        this.basicData.tableData[index]
      );
      this.basicData.batchChangeStatus=true;//复制的时候，重新拆分批次
      this.batchSplitData.batchSplitShow = false;
      this.batchSplitData.categoryCode = ""; //物料编号
      this.batchSplitData.categoryName = ""; //物料名称
      this.batchSplitData.category = ""; //物料大类
      this.batchSplitData.goodsSpec = ""; //物料规格
      this.batchSplitData.warehouseName = ""; //仓库
      this.batchSplitData.itemQty = ""; //应发数量
      this.batchSplitData.allNum = 0; //累计数量
      this.batchSplitData.batchSplitTableData = [];
    },
    //批次拆分选中
    handleSelectionChange(val) {
      this.batchSplitData.multipleSelection = val;
    },
    //公司弹窗打开
    componyTip() {
      this.basicData.componyShow = true;
    },
    //公司弹窗关闭
    tipsCancle() {
      this.basicData.componyShow = false;
    },
    //公司弹窗确定获取数据
    tipsSure(e) {
      this.basicData.componyShow = false;
      console.log(e);
      this.basicData.companyName = e;
      this.basicData.companyCode = e.companyCode;
      this.basicData.doDate = "";
      this.basicData.branchName = {};
      // this.basicData.staffName={};
      this.accountPeriod(e.companyId);
      this.getParities(1);
    },
    //部门弹窗打开
    departmentTip() {
      // if (this.basicData.companyName == ``) {
      //   this.$openWarning("请先选择公司");
      //   return false;
      // }
      this.basicData.departmentShow = true;
    },
    //部门弹窗关闭
    departmentCancle() {
      this.basicData.departmentShow = false;
    },
    //部门弹窗确定获取数据
    departmentSure(e) {
      this.basicData.departmentShow = false;
      this.basicData.branchName = e;
      this.basicData.branchName.branchCode = e.branchCode; //部门代码
      //this.basicData.staffName={};
    },

    //员工弹窗打开
    staffTip() {
      // if (this.basicData.companyName == `` || this.basicData.branchName == ``) {
      //     this.$openWarning('请先选择公司和部门');
      //     return false;
      // }
      this.basicData.staffShow = true;
    },
    //员工弹窗关闭
    staffCancle() {
      this.basicData.staffShow = false;
    },
    //员工弹窗确定获取数据
    staffSure(e) {
      this.basicData.staffShow = false;
      this.basicData.staffName = e;
      this.basicData.empId = e.empId; //员工id
    },
    //业务币别弹窗
    coinTips(type) {
      //type 1 基础数据  2费用预提
      if (type == 1) {
        this.coinType = 1;
        this.basicData.coinShow = true;
      } else {
        this.coinType = 2;
        this.costAccruedData.coinShow = true;
      }
    },
    //业务币别弹窗关闭
    coinCancle(type) {
      if (type == 1) {
        this.basicData.coinShow = false;
      } else {
        this.costAccruedData.coinShow = false;
      }
    },
    //业务币别弹窗确定获取数据
    coinSure(e) {
      if (this.coinType == 1) {
        //1基础数据 2，费用预提    判断当前是哪个页面选择币别
        this.basicData.coinShow = false;
        this.basicData.coinName = e;
        this.basicData.currencyId = e.currencyId;
        this.basicData.currencyCode = e.currencyCode;
        this.getParities(1);
        this.getRmbParities();
      } else {
        this.costAccruedData.coinShow = false;
        this.costAccruedData.currencyName = e;
        let index = this.costAccruedData.index;
        this.costAccruedData.tableData[index].currencyName = e.currencyName; //业务币别
        this.costAccruedData.tableData[index].currencyCode = e.currencyCode; //
        this.getCurrencyCodeByCompanyCode(
          this.basicData.companyName.companyCode,
          2
        );
      }
    },
    //销售客户弹窗
    customerTips() {
      this.basicData.customerShow = true;
    },
    //销售客户弹窗关闭
    customerCancle() {
      this.basicData.customerShow = false;
    },
    //销售客户弹窗确定获取数据
    customerSure(e) {
      this.basicData.customerShow = false;
      this.basicData.customerName = e;
      this.basicData.custId = e.customerId;
      this.basicData.customerName.custCode = e.customerCode;
    },
    //仓库弹窗
    warehouseTips() {
      this.basicData.warehouseShow = true;
    },
    //仓库弹窗关闭
    warehouseCancle() {
      this.basicData.warehouseShow = false;
    },
    //仓库弹窗确定获取数据
    warehouseSure(e) {
      this.basicData.warehouseShow = false;
      this.basicData.warehouseName = e;
      this.basicData.warehouseCode = e.warehouseCode;
    },
    //物料号弹窗
    matterTips() {
      this.basicData.matterShow = true;
    },
    //物料号弹窗关闭
    matterCancle() {
      this.basicData.matterShow = false;
    },
    //物料号确定获取数据
    matterSure(e) {
      console.log(e);
      this.basicData.matterShow = false;
      this.basicData.matterName = e;
      let _index = this.basicData.tableDataIndex;
      this.basicData.tableData[_index].goodsCode = e.skuCode; //物料号
      this.basicData.tableData[_index].goodsCat = e.categoryCode; //物料大类
      this.basicData.tableData[_index].goodsCategoryName = e.categoryShowName; //物料大类
      this.basicData.tableData[_index].goodsName = e.skuName; //物料名称
      this.basicData.tableData[_index].secUnitName = e.secUnitName; //第二单位
      this.basicData.tableData[_index].itemUnitName = e.firstUnitName; //基础单位
      this.basicData.tableData[_index].goodsSpec = e.propertyInfo; //物料规格
      if (e.vatRate) {
        this.basicData.tableData[_index].taxRate = e.vatRate; //增值税率
      }
      this.basicData.skuCode = e.skuCode;
      this.basicData.tableData[this.basicData.tableDataIndex].batchList = [];
    },
    //供应商弹窗
    supplierTips() {
      this.costAccruedData.supplierShow = true;
    },
    //供应商弹窗关闭
    supplierCancle() {
      this.costAccruedData.supplierShow = false;
    },
    //供应商确定获取数据
    supplierSure(e) {
      this.costAccruedData.supplierShow = false;
      this.costAccruedData.supplierName = e;
      this.costAccruedData.tableData[this.costAccruedData.index].supplierName =
        e.supplierName;
      this.costAccruedData.tableData[this.costAccruedData.index].supplierId =
        e.supplierId;
      this.costAccruedData.tableData[this.costAccruedData.index].supplierCode =
        e.supplierCode;
    },
    //费用名称
    costTips() {
      this.costAccruedData.costShow = true;
    },
    //费用名称
    costCallback(e) {
      if (e) {
        this.costAccruedData.costName = e;
        this.costAccruedData.tableData[this.costAccruedData.index].costName =
          e.costsName;
        this.costAccruedData.tableData[this.costAccruedData.index].costCategoryCode =
          e.costCategoryCode;
        this.costAccruedData.tableData[this.costAccruedData.index].shareDim =
          e.shareDim;
        let shareDim = `${e.shareDim}`;
        this.costAccruedData.shareDimList.forEach(ele => {
          if (ele.dict_code == e.shareDim) {
            this.costAccruedData.tableData[
              this.costAccruedData.index
            ].shareDimName =
              ele.dict_value;
          }
        });
      }
      this.costAccruedData.costShow = false;
    },

    //文件上传
    beforeUpload(file) {
      var that = this;
      let _this = this.uploadList;
      let formdata = new FormData();
      formdata.append("file", file); //传文件
      //formdata.append('_sysid_',_this.sysid);//传其他参数
      uploadApi.uploadFile(formdata).then(function(res) {
        if (res.code == "success") {
          _this.fileList = [];
          let fileData=res.data;
          var list = {
            fileOldName: fileData.oldFilename,
            fileNewName: fileData.newFilename,
            fileType:"", //文件类型
            fileSuffix:fileData.fileExt,//文件扩展名
            // fileAbsolutePath:"",//文件绝对路径
            // fileRelativePaths:"",//文件相对路径
            fileServerAddress: fileData.filePath,//文件服务器地址
            createdTime: that.$nowDate(),
            isInactive:0,//启用，禁用
            createdName:sessionStorage.getItem("userName") || "admin",
          };
          _this.tableList.unshift(list);
        }
      });
      return false;
    },
    //确定上传
    submitUpload() {
      //确定上传
      this.$refs.newupload.submit();
    },
    //移除
    handleRemove(file, fileList) {},
    delData(index, row) {},
    //基本信息 表格选择
    handleChangeTable(e) {
      if (e.length === 0) {
        this.basicData.selectioned = null;
      }
    },
    //单击物料号，得到当前行
    rowClick(row) {
      this.$refs.table.clearSelection();
      this.basicData.tableData.forEach(item => {
        item.edit = false;
      });
      this.coinType = 1; //判断当前是哪个页面选择币别
      if (row) {
        this.basicData.selectioned = row;
        this.basicData.tableDataIndex = this.basicData.tableData.indexOf(row);
        this.basicData.tableData[this.basicData.tableDataIndex].edit = true;
        this.$refs.table.toggleRowSelection(row, true);
      }
      this.$set(this.basicData.tableData, this.basicData.tableDataIndex, row);
    },

    //打印及附件表格
    dialogCheckTable() {},
    //打印及附件表格
    handleChangeTableTable() {},
    //基本信息 表格单选
    dialogCheck(selection, row) {
      this.$refs.table.clearSelection();
      if (selection.length === 0) {
        // 判断selection是否有值存在
        return;
      }
      this.coinType = 1; //判断当前是哪个页面选择币别
      if (row) {
        this.basicData.selectioned = row;
        this.basicData.tableDataIndex = this.basicData.tableData.indexOf(row);
        this.$refs.table.toggleRowSelection(row, true);
      }
    },
    //双击批次拆分弹窗列表
    dbClickBatchSplitTable(row) {
      this.batchSplitData.batchSplitTableData.forEach(item => {
        item.edit = false;
      });
      if (row) {
        let flag = false;
        this.batchSplitData.multipleSelection.forEach(it => {
          if (it.detailId == row.detailId) {
            flag = true;
          }
        });
        if (!flag) {
          this.batchSplitData.multipleSelection.push(row);
        }
        this.batchSplitData.batchSplitTableDataIndex = this.batchSplitData.batchSplitTableData.indexOf(
          row
        );
        this.batchSplitData.batchSplitTableData[
          this.batchSplitData.batchSplitTableDataIndex
        ].edit = true;
        this.$refs.multipleTable.toggleRowSelection(row, true);
      }
      this.$set(
        this.batchSplitData.batchSplitTableData,
        this.batchSplitData.batchSplitTableDataIndex,
        row
      );
    },

    //费用预提 表格选中
    costHandleChangeTable(e) {
      if (e.length === 0) {
        this.basicData.selectioned = null;
      }
    },

    //费用预提 单击选中
    costClick(row) {
      this.$refs.costTable.clearSelection();
      this.costAccruedData.tableData.forEach(item => {
        item.edit = false;
      });
      this.coinType = 2; //判断当前是哪个页面选择币别
      if (row) {
        this.costAccruedData.selectioned = row;
        this.costAccruedData.index = this.costAccruedData.tableData.indexOf(
          row
        );
        this.costAccruedData.tableData[this.costAccruedData.index].edit = true;
        this.$refs.costTable.toggleRowSelection(row, true);
      }
      this.$set(
        this.costAccruedData.tableData,
        this.costAccruedData.index,
        row
      );
    },
    //费用预提 表格单选
    costDialogCheck(selection, row) {
      this.$refs.costTable.clearSelection();
      if (selection.length === 0) {
        // 判断selection是否有值存在
        return;
      }
      this.coinType = 2; //判断当前是哪个页面选择币别
      if (row) {
        this.costAccruedData.selectioned = row;
        this.costAccruedData.index = this.costAccruedData.tableData.indexOf(
          row
        );
        this.$refs.costTable.toggleRowSelection(row, true);
      }
    },
    //取消
    cancel() {
      this.$router.push({
        //核心语句
        path: "/index/salesManage/salesIssueDoc" //跳转的路径
      });
    },
    //tab切换
    handleClick(tab, event) {
      console.log(tab, event);
    },
    //点击确定跳转至编辑页===码单发货
    toEidtPage() {
      if (this.codeSheetData.selectioned.length == 0) {
        //判断是否选中
        this.$openWarning("未选择数据");
        return;
      }
      let that = this;
      let flag = false;
      this.basicData.tableData.forEach(e => {
        //判断码单是否有重复数据
        that.codeSheetData.selectioned.forEach(s => {
          if (e.dockSoNo == s.dockSoNo && e.dockRowno == s.rowno) {
            flag = true;
          }
        });
      });
      if (flag) {
        this.$openWarning("不能选择重复的码单");
        return;
      } else {
        //没有重复的，就追加数据
        this.codeSheetData.selectioned.forEach((el, index) => {
          this.basicData.tableData.push(el); //
        });
        let noe = new Date().valueOf();
        this.basicData.tableData.forEach((ele, index) => {
          if (ele.isFreebie) {
            ele.isFreebie = true;
          } else {
            ele.isFreebie = false;
          }
          ele.itemUnitName=ele.itemUnit;//基础单位
          ele.secUnitName=ele.secUnit;//第二单位
          ele.noe = noe;
          //订单可发数量=订单数量-已发货数量
          ele.haventSentQty = that.$calculationFun(
            ele.contractQty,
            ele.sentQty,
            "sub",
            0
          );
          //实发数量=订单可发数量
           //开单数量=订单可发数量
          ele.sheetQty = ele.haventSentQty;
          ele.itemQty = ele.haventSentQty;
          if (ele.taxRate == null) {
            ele.taxRate = 0;
          }
          that.basicData.sumAmtVat = that.$calculationAmount(
            that.basicData.sumAmtVat,
            ele.originAmt,
            "add"
          );
          that.basicData.sumQty = calculation.accAdd(
            that.basicData.sumQty,
            ele.itemQty
          );
          ele.dockRowno = ele.rowno;//码单行号
          ele.rowno = (index + 1) * 10;
          this.qtyChange(ele, index);
          this.handleOrginPrice(ele, index);
          this.taxRateCh(ele, index);
        });
        this.codeTipShow = false;
      }
    },
    //码单重置
    resetcodeSheetData() {
      //type 1合同发货 2码单发货
      this.codeSheetData.pageSize = 10;
      this.codeSheetData.pageNum = 1;
      this.codeSheetData.companyId = ""; //公司
      this.codeSheetData.branchId = ""; //部门
      this.codeSheetData.customerCode = ""; //客户
      this.codeSheetData.warehouseCode = ""; //仓库
      this.codeSheetData.sendDateTime = []; //发货日期
      this.codeSheetData.dockSoNo = ""; //码单号
      this.codeSheetData.dockExtNo = ""; //外部单号
      this.codeSheetData.carNo = ""; //车号
      this.codeSheetData.shipNo = ""; //船号s
    },
    //取消
    closed(type) {
      if (type == 1) {
        this.contractData.selectioned={};
        this.contractTipShow = false;
      } else {
        this.codeSheetData.selectioned=[];
        this.codeTipShow = false;
      }
    },
     handleCodeRowClick(row) {
      this.codeSheetData.selectioned.push(row);
      this.codeSheetData.index = this.codeSheetData.tableData.indexOf(row);
      this.$refs.multipleTableCode.toggleRowSelection(row, true);
    },
    /*********码单发货************* */
    //表格选择
    handleCodeChange(e) {
      this.codeSheetData.selectioned = e;
    },
    inputShowCode() {
      this.codeSheetData.show = this.$dialogShowOne(this.codeSheetData.show);
    },
    //表格单选
    codeDialogCheck(selection, row) {
      if (selection.length === 0) {
        // 判断selection是否有值存在
        return;
      }
      if (row) {
        this.codeSheetData.selectioned.push(row);
        this.codeSheetData.index = this.codeSheetData.tableData.indexOf(row);
        this.$refs.multipleTableCode.toggleRowSelection(row, true);
      }
    },
    /*************合同发货*****************/
    //点击确定跳转至编辑页 ===合同发货
    contEidtPage() {
      if (!this.contractData.selectioned) {
        //判断是否选中
        this.$message({
          duration: 1000,
          showClose: true,
          message: "未选择数据",
          type: "warning"
        });
        return;
      }
      this.basicData.tableData.push(this.contractData.selectioned);
      let noe = new Date().valueOf();
      this.basicData.tableData.forEach((ele, index) => {
        if (ele.isFreebie) {
          ele.isFreebie = true;
        } else {
          ele.isFreebie = false;
        }
        ele.rowno = (index + 1) * 10;
        ele.noe = noe;
        ele.extContractCode = this.basicData.extContractCode; //外部合同号
        ele.itemUnitName=ele.itemUnit;//基础单位
        ele.secUnitName=ele.secUnit;//第二单位
        //开单数量=订单可发数量
        //实发数量=订单可发数量
        ele.sheetQty = ele.haventSentQty;
        ele.itemQty = ele.haventSentQty;
        ele.contractRowno = ele.soRowno; //合同行号
        this.qtyChange(ele, index);
        this.handleOrginPrice(ele, index);
      });
      this.contractTipShow = false;
    },
    //分页
    handleContSizeChange(val) {
      this.contractData.pageSize = val;
      this.selectContractInfo();
    },
    handleContCurrentChange(val) {
      this.contractData.pageNum = val;
      this.selectContractInfo();
    },
    //表格选择
    handleContChange(e) {
      if (e.length === 0) {
        this.contractData.selectioned = null;
      }
    },
    //表格单选
    contDialogCheck(selection, row) {
      this.$refs.multipleTableCont.clearSelection();
      if (selection.length === 0) {
        // 判断selection是否有值存在
        return;
      }
      if (row) {
        this.contractData.selectioned = row;
        this.contractData.index = this.contractData.tableData.indexOf(row);
        this.$refs.multipleTableCont.toggleRowSelection(row, true);
      }
    },
    contDialogRowClick(row){
       this.$refs.multipleTableCont.clearSelection();
      this.contractData.selectioned = row;
      this.contractData.index = this.contractData.tableData.indexOf(row);
      this.$refs.multipleTableCont.toggleRowSelection(row, true);
    },
  },
  components: {
    componySelect,
    departmentSelect,
    staffSelect,
    coinSelect,
    customerSelect,
    warehouseSelect,
    matterSelect,
    supplierSelect,
    costSelect
  }
};
</script>
<style>
.el-select .el-input__inner,
.el-input .el-input__inner {
  font-size: 12px !important;
}
.el-select:hover .el-input__inner {
  border-color: #97999e !important;
}
.el-input--small .el-input__inner {
  border-color: #97999e !important;
}
textarea {
  border-color: #909399 !important;
}

.el-icon-search:before {
  font-size: 16px !important;
}
.el-upload-list .el-upload-list__item:first-child{
  margin-top: 0;
}
</style>
