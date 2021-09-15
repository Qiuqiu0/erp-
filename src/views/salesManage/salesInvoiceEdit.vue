<template>
    <div id="salesInvoiceEdit">
        <div class="button-div">
            <el-button  class="query-button" icon="el-icon-suitcase" @click="saveSaleOutboundOrder()">保存</el-button>
            <el-button  @click="cancel()" icon="el-icon-close">取消</el-button>
        </div>
        <el-tabs class="el-tabs" v-model="activeName" type="card" @tab-click="handleClick" >
            <el-tab-pane  label="基础信息" name="one">
                <div class="index-div3 index-div index-div4"> 
                    <el-col :span="5" class="el-col el-col-required">
                        <label><span class="must-full">*</span>公司</label>
                        <el-input v-model="basicData.companyName" class="el-inputs" :class="errorKey.includes('companyName') ? 'inputRed' : ''" size="small"  disabled></el-input>
                    </el-col>
                    <el-col :span="5" class="el-col el-col-required">
                        <label><span class="must-full">*</span>部门</label>
                        <el-input v-model="basicData.branchName" :class="errorKey.includes('branchName') ? 'inputRed' : ''" size="small" class="el-inputs"   disabled></el-input>   
                    </el-col>
                    <el-col :span="5" class="el-col el-col-required">
                        <label><span class="must-full">*</span>业务员</label>
                        <el-input v-model="basicData.staffName.empName" :class="errorKey.includes('staffName') ? 'inputRed' : ''" size="small" class="el-inputs"   disabled></el-input> 
                        <span class="comicon"  @click="staffTip">
                            <i class="el-icon-search"></i>
                        </span>  
                    </el-col>
                    <el-col :span="5" class="el-col el-col-required">
                        <label><span class="must-full">*</span>发票单据号</label>
                        <el-input   size="small" v-model="basicData.invoiceCode" :class="errorKey.includes('invoiceCode') ? 'inputRed' : ''" class="el-inputs" disabled></el-input>
                    </el-col>
                     <el-col :span="5" class="el-col el-col-required">
                        <label><span class="must-full">*</span>客户</label>
                        <el-input  class="el-inputs" v-model="basicData.customerName" :class="errorKey.includes('customerName') ? 'inputRed' : ''" size="small"  disabled></el-input>
                    </el-col>
                     <el-col :span="5" class="el-col">
                        <label>开票日期</label>
                        <el-date-picker
                            class="el-input2"
                            v-model="basicData.invoiceDate"
                            type="date"
                            size="small"
                            placeholder="选择日期"
                        >
                        </el-date-picker>
                    </el-col>
                     <el-col :span="5" class="el-col">
                        <label>记账日期</label>
                        <el-date-picker
                            class="el-input2"
                            v-model="basicData.accountDay"
                            type="date"
                            size="small"
                            placeholder="选择日期"
                            :picker-options="basicData.pickerOptions"
                        >
                        </el-date-picker>
                    </el-col>
                    <el-col :span="5" class="el-colc el-col-required">
                        <label><span class="must-full">*</span>销售类型</label>
                        <el-select clearable  size="small" class="el-select" :class="errorKey.includes('soType') ? 'inputRed' : ''" v-model="basicData.soType" disabled>
                        <el-option v-for="item in basicData.soTypeList"
                                    :key="item.dict_code"  
                                    :label="item.dict_value"
                                    :value="item.dict_code"
                            ></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="5" class="el-col el-col-required">
                        <label><span class="must-full">*</span>业务币种</label>
                        <el-input  class="el-inputs" v-model="basicData.currencyName" :class="errorKey.includes('currencyName') ? 'inputRed' : ''" size="small"  disabled></el-input>
                    </el-col>
                    <el-col :span="5" class="el-col el-col-required">
                        <label><span class="must-full">*</span>本位币汇率</label>
                        <el-input   class="el-inputs" v-model="basicData.baseCurrencyRate" :class="errorKey.includes('baseCurrencyRate') ? 'inputRed' : ''" @input="handleCurrencyRate(basicData.baseCurrencyRate)"  size="small" disabled></el-input>
                    </el-col>
                    <el-col :span="5" class="el-col el-col-required">
                        <label><span class="must-full">*</span>人民币汇率</label>
                        <el-input  class="el-inputs" v-model="basicData.rmbCurrencyRate" :class="errorKey.includes('rmbCurrencyRate') ? 'inputRed' : ''" @input="handleRmbCurrencyRate(basicData.rmbCurrencyRate)" size="small" placeholder="请输入"></el-input>
                    </el-col>
                   <el-col :span="5" class="el-colc el-col-required">
                        <label><span class="must-full">*</span>发票类型</label>
                        <el-select clearable  size="small" class="el-select" :class="errorKey.includes('invoiceType') ? 'inputRed' : ''" v-model="basicData.invoiceType"  disabled>
                        <el-option v-for="item in basicData.invoiceTypeList"
                                    :key="item.dict_code"  
                                    :label="item.dict_value"
                                    :value="item.dict_code"
                            ></el-option>
                        </el-select>
                    </el-col>
                     <el-col :span="5" class="el-col">
                        <label>发票外部编号</label>
                        <el-input  class="el-inputs" v-model="basicData.extInvoiceCode" size="small" placeholder="请输入"></el-input>
                       
                    </el-col>
                     <el-col :span="5" class="el-colc el-col-required">
                        <label><span class="must-full">*</span>发票状态</label>
                        <el-select clearable  size="small" class="el-select"  v-model="basicData.invoiceStatus" :class="errorKey.includes('invoiceStatus') ? 'inputRed' : ''" disabled >
                        <el-option v-for="item in basicData.invoiceStatusList"
                                    :key="item.dict_code"  
                                    :label="item.dict_value"
                                    :value="item.dict_code"
                            ></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="5" class="el-col">
                        <label>开票数量</label>
                        <el-input  class="el-inputs" v-model="basicData.invoiceQty" size="small" disabled ></el-input>
                        
                    </el-col>
                    <el-col :span="5" class="el-col">
                        <label>开票金额</label>
                        <el-input  class="el-inputs" v-model="basicData.invoiceAmtVat" size="small" disabled></el-input>     
                    </el-col>
                     <el-col :span="5" class="el-col">
                        <label>开票人民币金额</label>
                        <el-input  class="el-inputs" v-model="basicData.payAmtTotalRmb" size="small" disabled></el-input>     
                    </el-col>
                     <el-col :span="5" class="el-col el-col-required">
                        <label><span class="must-full">*</span>附件数量</label>
                        <el-input  class="el-inputs" v-model="basicData.attachmentCount" :class="errorKey.includes('attachmentCount') ? 'inputRed' : ''"  @input="basicData.attachmentCount= $filterPriceNum(basicData.attachmentCount,0)" size="small"></el-input>     
                    </el-col>
                    <el-col :span="5" class="el-col">
                        <label>税金科目</label>
                        <el-input v-model="basicData.accountName.nameL2" class="el-inputs" size="small" disabled></el-input>
                        <span class='comicon2' @click="accountTips"><i class="el-icon-search" ></i></span>
                    </el-col>  
                    <el-col :span="24" class="el-col checkbox-col">
                        <label style="width:8.4%"><span class="must-full">*</span>发票种类：</label>
                        <el-checkbox style="width:10%"  v-model="basicData.isVatSpecialInvoice">增值税专用发票</el-checkbox>
                        <el-checkbox style="width:22%" v-model="basicData.isVatNormalInvoice">增值税普通发票</el-checkbox>
                        <el-checkbox style="width:21%" v-model="basicData.isProformaInvoice">形式发票</el-checkbox>
                    </el-col>
                    <el-col :span="24" class="el-col-textarea">
                        <label style="width:7.31%">备注</label>
                        <el-input
                            type="textarea"
                            autosize
                            rows="2"
                            v-model="basicData.remark"
                            size="small"
                            class="el-textarea"
                            placeholder="请输入"
                            style="width:88%"
                            >
                        </el-input>
                    </el-col>
                
                </div>
                 <!-- 表格 -->
                <div class="button-div">
                    <el-button class="addBut" icon="el-icon-plus"  @click="addRow()">添加行</el-button>
                    <el-button class="addBut" @click="deleteRow()" icon="el-icon-minus" >删除行</el-button>
                </div>
                <div class="el-table-div">
                      <!-- 表格 -->
                    <el-table border center  
                        ref="table" 
                        :data="basicData.tableData" 
                        tooltip-effect="dark"
                        @select-all="dialogCheck" 
                        @select="dialogCheck"
                        @selection-change="handleChangeTable" 
                        @row-click="rowClick"
                        :summary-method="getSummaries"
                        show-summary
                        max-height="320"
                        class="el-table" v-loading="loading">
                        <el-table-column type="selection" width="80" align="center"></el-table-column> 
                        <el-table-column prop="invoiceRowNo"  width="50" label="行号">   
                        </el-table-column>
                        <el-table-column prop="soContractNo" label="销售合同号" width="120px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="soExtNo" label="外部合同号" width="120px" :show-overflow-tooltip="true"> 
                        </el-table-column>
                        <el-table-column prop="soContractRowno" label="销售合同行号" width="120px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column  v-if="invoiceType=='blue'" prop="doNo" label="销售出库单号" width="130px" :show-overflow-tooltip="true">
                        </el-table-column>
                         <el-table-column v-else prop="undoCode" label="退货单号" width="130px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column  v-if="invoiceType=='blue'" prop="doRowno" label="销售出库单行号" width="130px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column v-else prop="undoRowno" label="退货单行号" width="130px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="goodsCode" label="物料编号" width="120px"  :show-overflow-tooltip="true"> 
                        </el-table-column>
                        <el-table-column prop="goodsName" label="物料名称" width="100px"  :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="goodsCatName" label="物料大类" width="100px"  :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="goodsSpec"  label="物料规格" width="100px"  :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="invoiceGoodsName"  label="物料名称(开票)" width="120px" :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                                <div v-if='scope.row.edit'>
                                    <el-input v-model="scope.row.invoiceGoodsName"   size="mini" class="el-inputs" placeholder="请输入"></el-input>
                                </div>
                                <div v-else>
                                    {{scope.row.invoiceGoodsName}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="invoiceGoodsCat"  label="物料大类(开票)" width="120px" :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                                <div v-if='scope.row.edit'>
                                    <el-input  v-model="scope.row.invoiceGoodsCat"  size="mini" class="el-inputs" placeholder="请输入"></el-input>
                                </div>
                                <div v-else>
                                    {{scope.row.invoiceGoodsCat}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column  prop="invoiceGoodsSpec" label="物料规格(开票)" width="120px" :show-overflow-tooltip="true">、
                            <template slot-scope="scope">
                                <div v-if='scope.row.edit'>
                                    <el-input v-model="scope.row.invoiceGoodsSpec" size="mini" class="el-inputs" placeholder="请输入"></el-input>
                                </div>
                                <div v-else>
                                    {{scope.row.invoiceGoodsSpec}}
                                </div>
                            </template>
                        </el-table-column>
                         <el-table-column prop="itemQty"  label="数量" width="120px">
                              <!-- <template slot-scope="scope">
                                <div v-if='scope.row.edit'>
                                    <el-input type="number" v-model="scope.row.itemQty"  @input="qtyChange(scope.row,scope.$index)"  size="mini" class="el-inputs" placeholder="请选择"></el-input>
                                </div>
                                <div v-else>
                                    {{scope.row.itemQty}}
                                </div>
                            </template> -->
                        </el-table-column>
                        <!-- <el-table-column prop="batchCode" label="批次号" width="178px"  :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="packageCode" label="捆包号" width="100px"  :show-overflow-tooltip="true">
                        </el-table-column> -->
                        <el-table-column prop="unInvoiceQty" label="未开票数量" :show-overflow-tooltip="true" >
                        </el-table-column>
                         <el-table-column prop="invoiceQty" label="开票数量" width="178px">
                              <template slot-scope="scope">
                                <div v-if='scope.row.edit'>
                                    <el-input v-model="scope.row.invoiceQty" @input="handleInvoiceQty(scope.row,scope.$index)"  size="mini" class="el-inputs" placeholder="请选择"></el-input>
                                </div>
                                <div v-else>
                                    {{scope.row.invoiceQty}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column  label="单价" width="178px">
                            <template slot-scope="scope">
                                <div v-if='scope.row.edit'>
                                    <el-input  type="number" v-model="scope.row.originPrice"  @input="handleOrginPrice(scope.row,scope.$index)"  size="mini" class="el-inputs" placeholder="请选择"></el-input>
                                </div>
                                <div v-else>
                                    {{scope.row.originPrice}}
                                </div>
                            </template>
                        </el-table-column>
                      
                        <el-table-column   label="增值税率%" width="178px">
                            <template slot-scope="scope">
                                <div v-if='scope.row.edit'>
                                    <el-input  type="number" v-model="scope.row.taxRate"   @input="taxRateCh(scope.row, scope.$index)"  size="mini" class="el-inputs" placeholder="请选择"></el-input>
                                </div>
                                <div v-else>
                                    {{scope.row.taxRate}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="originAmt" label="业务币含税金额" width="178px">
                            <template slot-scope="scope">
                                <div v-if='scope.row.edit'>
                                    <el-input  type="number" v-model="scope.row.originAmt" @input="originAmtCh(scope.row,scope.$index)"  size="mini" class="el-inputs" placeholder="请输入"></el-input>
                                </div>
                                <div v-else>
                                    {{scope.row.originAmt}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="originNoAmt" label="业务币不含税金额"   width="120px">
                        </el-table-column>
                        <el-table-column  prop="originTaxAmt" label="业务币税额"  width="178px">
                             <template slot-scope="scope">
                                <div v-if='scope.row.edit'>
                                    <el-input  type="number" v-model="scope.row.originTaxAmt"  @input="taxAmtCh(scope.row,scope.$index)"  size="mini" class="el-inputs" placeholder="请输入"></el-input>
                                </div>
                                <div v-else>
                                    {{scope.row.originTaxAmt}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="baseAmt" label="本币含税金额" width="100px">
                        </el-table-column>
                        <el-table-column prop="baseNoAmt" label="本币不含税金额" width="110px">
                        </el-table-column>
                        <el-table-column prop="baseTaxAmt" label="本币税额" width="100px">
                        </el-table-column>
                        <el-table-column prop="costAmt" label="成本总额" width="110px">
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
                <!--税金科目-->
                <subject-frame v-if="subjectShow" :longNumber="22210102" :tipShow='subjectShow' @subjectCancle="subjectCancle" @subjectSure="subjectSure"></subject-frame>
                   <!-- 选择员工弹窗 -->
                <staff-select
                v-if="basicData.staffShow"
                :tipShow="basicData.staffShow"
                :data="{}"
                @staffCancle="staffCancle"
                @staffSure="staffSure"
                >
                </staff-select>
            </el-tab-pane>
            <!--系统信息-->
            <el-tab-pane  label="系统信息" name="third" style="background:#fff;">
               
                <div class="index-div3" style="padding-bottom:10px">
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
                    <el-col :span="5" class="el-col" style="margin-left:-5px">
                        <label>审核人</label>
                        <el-input v-model="systemData.auditBy" size="small" class="el-inputs"  disabled></el-input>
                        
                    </el-col>
                    <el-col :span="5" class="el-col">
                        <label>审核时间</label>
                        <el-input v-model="systemData.auditDate" size="small" class="el-inputs"  disabled></el-input>
                        
                    </el-col>
                </div>
            </el-tab-pane>
        </el-tabs>
        <el-dialog :visible.sync="salesIssueData.salesIssueDataShow"
          :title="title"
          :show-close="false"
          :before-close="salesIssueCancle"
          :close-on-click-modal="false"
          width="1100px"
          class="popup_box">
            <div id="salesReturnOrderCreate" class="index">
                <div class="button-div">
                    <el-button @click="initSalesIssueData()" icon="el-icon-search" class="query-button">查询</el-button>
                    <el-button @click="resetData()" icon="el-icon-refresh">重置</el-button>
                </div>
                <div class="index-div3 index-div4">
                    <p class="hide-input" v-if="show" @click="inputShow()">更多条件 <i class="el-icon-caret-bottom"></i></p>
                    <p class="hide-input" v-else @click="inputShow()">收起<i class="el-icon-caret-top"></i></p>
                    <div class="dialog-search-div">
                        <el-col :span="5" class="el-col">
                            <label style="width:31%">公司</label>
                            <el-select clearable filterable  size="small" class="el-select" @change="getBranchByCompanyId()" v-model="salesIssueData.companyId" :disabled="disabledData" placeholder="请选择">
                            <el-option v-for="item in salesIssueData.companyList"
                                        :key="item.companyId"  
                                        :label="item.companyName"
                                        :value="item.companyId"
                                ></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="5" class="el-col">
                            <label style="width:31%">部门</label>
                            <el-select clearable  filterable size="small" class="el-select"  v-model="salesIssueData.branchId" :disabled="disabledData" placeholder="请选择" >
                            <el-option v-for="item in salesIssueData.branchList"
                                        :key="item.branchId"  
                                        :label="item.branchName"
                                        :value="item.branchId"
                                ></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="5" class="el-col">
                            <label style="width:31%">销售合同号</label>
                            <el-input  class="el-inputs" v-model="salesIssueData.contractCode" size="small"  placeholder="请选择"></el-input>
                        </el-col> 
                        <el-col :span="5" class="el-col">
                            <label style="width:31%">外部合同号</label>
                            <el-input  class="el-inputs" v-model="salesIssueData.extContractCode" size="small"  placeholder="请选择"></el-input>
                        </el-col> 
                        <el-col  :span="5"  v-if="invoiceType=='blue'" class="el-col">
                            <label style="width:31%">出库单号</label>
                            <el-input  class="el-inputs" v-model="salesIssueData.doNo" size="small"  placeholder="请选择"></el-input>
                        </el-col> 
                            <el-col  v-else :span="5" class="el-col">
                            <label style="width:31%">退货单号</label>
                            <el-input  class="el-inputs" v-model="salesIssueData.undoCode" size="small"  placeholder="请选择"></el-input>
                        </el-col> 
                        <el-col :span="5" class="el-col">
                            <label style="width:31%">客户</label>
                            <el-input v-model="salesIssueData.customerName.customerName" size="small" class="el-inputs" placeholder="请选择" disabled></el-input>
                            <span class='comicon' v-if="!disabledData" @click="customerTips"><i class="el-icon-search" ></i></span>
                            <!-- <el-select clearable  size="small" class="el-select"  v-model="salesIssueData.customerId" placeholder="请选择" >
                            <el-option v-for="item in salesIssueData.customerList"
                                        :key="item.customerId"  
                                        :label="item.customerName"
                                        :value="item.customerId"
                                ></el-option>
                            </el-select> -->
                        </el-col>
                        <el-col :span="5" class="el-col">
                            <label style="width:31%">创建时间</label>
                            <el-date-picker
                                v-model="salesIssueData.createdTime"
                                type="daterange"
                                class="el-input2"
                                size="mini"
                    
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </el-col>
                        <el-col :span="5" class="el-col">
                            <label style="width:31%">创建人</label>
                            <el-input   size="small" v-model="salesIssueData.createdName" class="el-inputs" placeholder="请选择"></el-input>
                        </el-col>
                    </div>
                </div>
                <div class="el-table-div">
                    <el-table border center  
                        ref="multipleTable"
                        :data="salesIssueData.tableData" 
                        tooltip-effect="dark"
                        @select-all="saleDialogCheck" 
                        @selection-change="handleChange" 
                        @row-click="saleRowClick"
                        class="el-table" v-loading="salesIssueData.loading">
                        <el-table-column type="selection" width="45" align="center"></el-table-column> 
                         <el-table-column  type="index" label="序号" width="60px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="contractCode" label="销售合同号" width="120px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="extContractCode" label="外部合同号" width="120px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column v-if="invoiceType=='blue'" prop="doNo" label="出库单号" width="120px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column v-else prop="undoCode" label="退货单号" width="120px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="custName" label="客户" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="createdName" label="创建人">
                        </el-table-column>
                        <el-table-column  label="创建时间" :show-overflow-tooltip="true">
                             <template slot-scope="scope">
                                 {{$timeFun(scope.row.createdTime,1)}}
                             </template>
                        </el-table-column>
                        <el-table-column prop="updatedName" label="修改人">
                        </el-table-column>
                        <el-table-column prop="updatedTime" label="修改时间" :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                                 {{$timeFun(scope.row.updatedTime,1)}}
                             </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="salesIssueData.pageNum" :page-sizes="[100, 200, 300,500]" :page-size="salesIssueData.pageSize"
                    layout="total, sizes, prev, pager, next, jumper" :total="salesIssueData.total">
                    </el-pagination>
                </div>
            </div>
             <slot></slot>
            <div class="button-div2">
                <el-button type="primary" @click="salesIssueSure()" icon="el-icon-check">确 定</el-button>
                <el-button @click="salesIssueCancle()" icon="el-icon-close">取 消</el-button>
            </div>
              <!--选择销售客户 -->
            <customer-select v-if="customerShow" :tipShow='customerShow'  @customerCancle="customerCancle" @customerSure="customerSure">
            </customer-select>
        </el-dialog>
    </div>
</template>
<script>
import { mapState } from "vuex";
import sApi from "@/api/salesManage/salesManage";
import calculation from "@/assets/js/calculation";
import customerSelect from "@/components/customerSelect.vue"; //客户组件
import subjectFrame from "@//components/subjectFrame.vue";//科目组件
import staffSelect from "@/components/staffSelect.vue";
export default {
    name:"salesInvoiceEdit",
    data(){
        return{
            errorKey: [],
            //销售出库单
            salesIssueData:{
                salesIssueDataShow: true, //销售出库单弹窗
                doNo:"",//销售出库单
                undoCode:'',//退货单号
                createdName:"",//创建人
                createdTime:[],//创建日期
                show: true, //查询条件显示隐藏
                selectioned:[], //选中
                loading: false,
                tableData: [],
                pageSize:100,
                pageNum:1,
                total:0,
                companyCode:'',//
                companyId:'',
                companyList:[],//公司下拉列表
                branchId:'',
                branchList:[],//部门
                // customerId:'',//客户
                // customerList:[],//客户
                customerName:{},//客户
                custId:'',//客户id 
                custCode:'',
                index:'',//选中
                doId:'',//销售出库单号Id
                undoId:'',//销售退货单号Id
                doNo:'',//销售出库单单号
                undoCode:'',//退货单单号
                contractCode:'',//销售合同号
                extContractCode:'',//外部合同号
                pickerOptions:{},//记账时间范围
                
            },
            customerShow:false,//客户弹窗
            //基本信息
            basicData:{
                companyName:'',//公司名
                companyCode:'',//公司代码
                companyId:'',//公司id
                branchName:'',//部门
                branchCode:'',//部门代码
                branchId:'',
                bizPersonName:'',
                bizPersonCode:'',//业务员
                currencyName:'', //业务币别
                currencyId:'',//业务币种id
                toCurrencyCode:'',//本位币
                currencyCode:'',//业务币别代码
                customerName:'',//客户
                custId:'',//客户id 
                custCode:'',
                soTypeList:[],//销售类型列表
                soType:'',//销售类型
                invoiceType:'',//发票类型
                invoiceTypeList:[],//发票类型列表
                invoiceStatusList:[],//状态列表
                invoiceStatus:`10710005`,//发票状态 默认保存
                extInvoiceCode:'',//发票外部编号
                baseCurrencyRate:'',//本位币汇率
                rmbCurrencyRate:'',//人民币汇率
                invoiceQty:'',//开票数量
                invoiceAmtVat:'',//开票金额
                payAmtTotalRmb:'',//开票人民币金额
                remark:'',//备注  
                invoiceDate:'',//发票时间
                accountDay:'',//记账日期
                undoCode:'',//退货单号
                doNo:'',//出库单号
                invoiceCode:'',//发票单据号
                invoiceQty:'',//成本总金额
                tableData:[],//商品明细列表数据
                selectioned:'',//选中  列表选中
                tableDataIndex:'',//表格当前选中的下标
                flag:false,//判断数量
                invoiceId:'',//发票id
                version:'',//版本号
                attachmentCount:'',//附件数量
                accountName:{},//科目名称
                staffShow: false, //员工弹窗
                staffName: {}, //业务员
                extContractCode:'',//外部合同号
                isVatSpecialInvoice:'',//增值税专用发票、、
                isVatNormalInvoice:'',//增值税普通发票
                isProformaInvoice:'',//形式发票

            },
             //系统信息
            systemData:{
                createdTime:'',//创建时间
                createdName:'',//创建人
                updatedName:'',//修改人
                updatedTime:'',//修改时间
                auditBy:'',//审核人
                auditDate:''//审核时间
            },
            subjectShow:false,//税金科目
            activeName:"one",//切换tabs
            type:'',//页面类型，1创建 修改
            loading:false,
            invoiceType:'',//发票类型
            show:true,//查询条件显示一行
            title:'',//弹窗title
            doIdList:[],//发票选中的出库单id
            undoIdList:[],//发票选中的退货单单id
            disabledData:false,//判断客户，部门，公司不可以修改的字段(选择销售出库，退货单时)
        }
    },
    created(){
        this.getSoTypeList(); //销售类型
        this.getInvoiceTypeList();//发票类型
        this.getInvoiceStatusList();//发票状态
        this.type=this.$route.query.type;
        this.invoiceType=this.$route.query.invoiceType;
        if(this.type==1){
            this.getCompanyList();//获取公司
            // this.getCustomerList();//获取客户
            this.resetData();
            this.initSalesIssueData();//获取销售出库单
            if(this.invoiceType=="blue"){//蓝字发票
                this.title="选择销售出库单";
                this.basicData.invoiceType=`10700005`.toString();//默认标准发票
            }else{//退货发票
                this.title="选择销售退货单";
                this.basicData.invoiceType=`10700010`;//默认退货发票
            }
            this.salesIssueData.salesIssueDataShow=true;
            
        }else{
            this.initData();//获取详情
            this.salesIssueData.salesIssueDataShow=false;
        } 
       
    },
    methods:{
         //销售出库单详情
        initData(){
            this.loading=true;
            let data={
               id:localStorage.getItem("invoiceId")
            }
            sApi.checkSaleInvoicer4Update(data).then(res=>{
                if(res.code="success"){
                    let data=res.data;
                    this.basicData.companyName=data.companyName;//公司名
                    this.basicData.companyId=data.companyId;//公司名
                    this.accountPeriod(data.companyId);
                    this.basicData.companyCode=data.companyCode;
                    this.basicData.branchName=data.orgName;//部门
                    this.basicData.branchId=data.orgId;//部门
                    this.basicData.branchCode=data.orgCode;                  
                    this.basicData.currencyCode=data.currencyCode;//币种
                    this.basicData.staffName.empCode=data.bizPersonCode;//业务员,//业务员
                    this.basicData.staffName.empName=data.bizPersonName;
                    this.selectCurrencyName();
                    this.basicData.baseCurrencyRate=data.baseCurrencyRate;//本位币汇率
                    this.basicData.rmbCurrencyRate=data.rmbCurrencyRate;
                    this.basicData.remark=data.remark;//备注
                    this.basicData.soType=`${data.soType}`;//销售类型类型
                    this.basicData.invoiceType=""+data.invoiceType;//发票类型
                    this.basicData.invoiceStatus=""+data.invoiceStatus;//发票状态
                    this.basicData.invoiceCode=data.invoiceCode;//发票单据号
                    this.basicData.invoiceDate=this.$timeFun(data.invoiceDate,true);//开票时间
                    this.basicData.accountDay=this.$timeFun(data.accountDay,true);//记账日期
                    this.basicData.customerName=data.custName;//客户
                    this.basicData.custCode=data.custCode;//客户
                    this.basicData.custId=data.custId;
                    this.basicData.extInvoiceCode=data.extInvoiceCode;//发票外部编号
                    this.basicData.version=data.version;//版本号
                    this.basicData.invoiceId=data.invoiceId;//发票id
                    this.basicData.sumCostAmt=data.sumCostAmt;//成本总金额
                    this.basicData.invoiceQty=data.invoiceQty;//总数量
                    this.basicData.invoiceAmtVat=data.invoiceAmtVat;//开票金额
                    this.basicData.attachmentCount=data.attachmentCount;//附件数量
                    this.basicData.accountName.nameL2=data.accountCode+" "+data.accountName;//科目名称
                    this.basicData.payAmtTotalRmb=data.payAmtTotalRmb;
                    this.basicData.isVatSpecialInvoice=data.isVatSpecialInvoice==1?true:false;//增值税专用发票、、
                    this.basicData.isVatNormalInvoice=data.isVatNormalInvoice==1?true:false;//增值税普通发票
                    this.basicData.isProformaInvoice=data.isProformaInvoice==1?true:false;//形式发票
                    this.systemData.createdName=data.createdName;//创建人
                    this.systemData.createdTime=this.$timeFun(data.createdTime,true);//创建时间
                    this.systemData.updatedName=data.updatedName;//创建人
                    this.systemData.updatedTime=this.$timeFun(data.updatedTime,true);//创建时间 
                    this.systemData.auditBy=data.auditBy;//审核人
                    this.systemData.auditDate=this.$timeFun(data.auditDate,true);//审核时间
                    //给销售出库单查询赋值
                    this.salesIssueData.currencyCode=data.currencyCode;
                    this.salesIssueData.companyId=data.companyId;
                    this.salesIssueData.branchId=data.orgId;
                    this.getBranchByCompanyId();//获取部门
                    this.salesIssueData.custId=data.custId; 
                    this.salesIssueData.customerName.customerName=data.custName; 
                    let list=data.invoiceItemsList;
                    if(list.length){
                        if(this.basicData.invoiceType=="10700005"){
                            this.invoiceType="blue";
                            this.basicData.doNo=list[0].doNo;//出库单号
                            //this.salesIssueData.doNo=list[0].doNo;//给销售出库单查询条件赋值   
                        }else{
                            this.invoiceType="return";
                            this.basicData.undoCode=list[0].undoCode;//退货单号
                            //this.salesIssueData.undoCode=list[0].undoCode;//给销售出库单查询条件赋值   
                             
                        }
                        this.salesIssueData.contractCode=list[0].soContractNo; 
                        let that=this;
                        this.basicData.tableData=list;
                        this.basicData.tableData.forEach((element,index)=> {
                              //销售不含税金额
                            element.originNoAmt =  this.$unorginAmtCh(element.originAmt, element.originTaxAmt);
                                  //本币不含税金额 baseNoAmt
                            element.baseNoAmt = this.$tybbnhsje(element.baseAmt,element.baseTaxAmt);
                           
                        });
                    }
                    this.loading=false;

                }else{
                    this.$message({
                        duration: 1000,
                        showClose: true,
                        message: res.message,
                        type: 'error'
                    });
                    this.loading=false;
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
                        this.basicData.currencyName =res.data.currencyName;
                    }
                }
            }).catch();
        },
        //销售出库单列表
        initSalesIssueData(){
            this.salesIssueData.tableData=[];
            this.salesIssueData.loading=true;
            let salesIssueData=this.salesIssueData;
            if(salesIssueData.companyId){
                var companyId=salesIssueData.companyId;
            }
            if(salesIssueData.branchId){
                var orgId=salesIssueData.branchId;
            }
            if(salesIssueData.extContractCode){
                var extContractCode=salesIssueData.extContractCode;
            }
            if(salesIssueData.contractCode){
                var contractCode=salesIssueData.contractCode;
            }
            if(salesIssueData.custId){
                var custId=salesIssueData.custId;
            }
            if(salesIssueData.doNo){
                var doNo=this.salesIssueData.doNo;
            }
            if(salesIssueData.createdTime && salesIssueData.createdTime.length){
                var createdTimeBegain=this.salesIssueData.createdTime[0];
                var createdTimeEnd=this.salesIssueData.createdTime[1];
            }
            if(salesIssueData.createdName){
                var createdName=this.salesIssueData.createdName;
            }
          
            if(salesIssueData.undoCode){
                var undoCode=this.salesIssueData.undoCode;
            }
            let data={
                pageSize:this.salesIssueData.pageSize,
                pageNum:this.salesIssueData.pageNum,
                companyId:companyId,//公司
                orgId:orgId,//部门
                custId:custId,//客户
                createdTimeBegain:createdTimeBegain,//创建日期
                createdTimeEnd:createdTimeEnd,//
                doNo:doNo,//销售出库单号
                undoCode:undoCode,//退货单号
                createdName:createdName,//创建人
                contractCode:contractCode,//合同号
                extContractCode:extContractCode,//外部合同号
            }
            let api='';
            if(this.invoiceType=="blue"){//销售出库单
                api=sApi.selectOdDo2Invoice;
            }else{
                api=sApi.selectOdUndo2Invoice;//销售退货单
            }
            api(data).then(res=>{
                if(res.code="success"){
                    this.salesIssueData.total=res.data.total;  
                    let list=res.data.list;
                    // if(this.type==2){
                    //     list.forEach((ele,index)=>{
                    //         ele.createdTime=this.$timeFun(ele.createdTime,true);
                    //         ele.updatedTime=this.$timeFun(ele.updatedTime,true);
                    //         this.basicData.tableData.forEach(ele2=>{
                    //             if(this.invoiceType=="blue"){//正常发票
                    //                 if(ele.doNo==ele2.doNo){
                    //                     this.salesIssueData.selectioned.push(ele);
                    //                     this.$nextTick(() => {
                    //                         this.$refs.multipleTable.toggleRowSelection(ele,true);   
                    //                     })
                    //                 }
                    //             }else{//退货发票
                    //                 if(ele.undoCode==ele2.undoCode){
                    //                     this.salesIssueData.selectioned.push(ele);
                    //                     this.$nextTick(() => {
                    //                         this.$refs.multipleTable.toggleRowSelection(ele,true);
                                            
                    //                     })
                    //                 }
                    //             }
                               
                    //         })
                            
                    //     })
                    //     this.salesIssueData.tableData=list; 
                    // }else{
                    if(this.basicData.tableData.length==0){
                        this.salesIssueData.tableData=list;
                        
                    }else{
                        let arr=[];
                        list.forEach((el,i)=>{
                            el.createdTime=this.$timeFun(el.createdTime,true);
                            el.updatedTime=this.$timeFun(el.updatedTime,true);
                            let flag=false;
                            this.basicData.tableData.forEach(el2=>{
                                if(this.invoiceType=="blue"){//正常发票
                                    if(el.doNo===el2.doNo){
                                        flag=true
                                    }
                                }else{//退货发票
                                    if(el.undoCode===el2.undoCode){
                                    flag=true;
                                    }
                                }
                            
                            })
                            if(!flag){
                                arr.push(el);
                            }
                        })
                        this.salesIssueData.tableData=arr;
                    }
                    //}
                    this.salesIssueData.loading=false;
                }else{
                    this.$message({
                        duration: 1000,
                        showClose: true,
                        message: res.message,
                        type: 'error'
                    });
                    this.salesIssueData.loading=false;
                }
            }).catch();
        },
        //保存、创建发票
        saveSaleOutboundOrder(){
            let basicData = this.basicData;
            if(basicData.flag){
                 this.$openWarning("开票数量不能大于未开票数量");
                 return;
            }
            this.errorKey = [];
            if (basicData.companyName == "") {
                this.errorKey.push('companyName');
            }
            if (JSON.stringify(basicData.staffName) === "{}") {
                this.errorKey.push('staffName');
            }
            if (basicData.branchName == "") {
                this.errorKey.push('branchName');
            }
            if (basicData.customerName == "") {
                this.errorKey.push('customerName');
            }
           
            if (basicData.currencyCode == "") {
                this.errorKey.push('currencyCode');
            }
            if (basicData.baseCurrencyRate == "") {
                this.errorKey.push('baseCurrencyRate');
            }
            if(basicData.rmbCurrencyRate==""){
                this.errorKey.push('rmbCurrencyRate');
            }
            if (basicData.invoiceType == "") {
                this.errorKey.push('invoiceType');
            }
            if (basicData.invoiceStatus == "") {
                this.errorKey.push('invoiceStatus');
            }
            if (basicData.attachmentCount == "" || basicData.attachmentCount ==null) {
                this.errorKey.push('attachmentCount');
            }
            if(this.errorKey.length > 0) {
                this.$openWarning("请将必填项补充完整！");
                return false;
            }
            if(!basicData.isVatSpecialInvoice && !basicData.isVatNormalInvoice && !basicData.isProformaInvoice){
                this.$openWarning("需要选择发票种类");
                return;
            }
            if(basicData.tableData.length==0){
                this.$openWarning("商品明细不能为空");
                return;
            }
            var accountName="";
            var accountCode="";
            if(basicData.accountName.nameL2){
                let nameL2=basicData.accountName.nameL2;
                accountCode=nameL2.substring(0,nameL2.indexOf(' '));
                accountName=nameL2.substring(nameL2.indexOf(' '));    
            } 
            //发票数量不能为0
            let flag=false;
            basicData.tableData.forEach(ele=>{
                if(ele.invoiceQty==0){
                    flag=true;
                    return;
                }
            });
            if(flag){
                this.$openWarning("开票数量不能为0");
                return;
            }
            let data={
                companyCode:basicData.companyCode,//公司
                companyName:basicData.companyName,//公司
                companyId:basicData.companyId,
                orgCode:basicData.branchCode,
                orgName:basicData.branchName,//部门
                orgId:basicData.branchId,
                bizPersonCode:basicData.staffName.empCode,//业务员
                bizPersonName:basicData.staffName.empName,//业务员
                invoiceCode: basicData.invoiceCode, //发票单据号
                invoiceDate: basicData.invoiceDate, //发票日期
                accountDay:basicData.accountDay,//记账日期
                custId: basicData.custId, //销售客户
                custCode:basicData.custCode,
                custName: basicData.customerName,
                currencyCode: basicData.currencyCode, //业务币别
                baseCurrencyRate: basicData.baseCurrencyRate, //本位币汇率
                soType:basicData.soType,//销售类型
                extInvoiceCode:basicData.extInvoiceCode,//外部发票号
                invoiceQty:basicData.invoiceQty,//开票数量
                invoiceAmtVat:basicData.invoiceAmtVat,//开票金额
                payAmtTotalRmb:basicData.payAmtTotalRmb,
                rmbCurrencyRate:basicData.rmbCurrencyRate,//
                invoiceStatus: basicData.invoiceStatus, //状态
                invoiceType: basicData.invoiceType, //发票类型
                attachmentCount:basicData.attachmentCount,//附件数量
                remark:basicData.remark,//备注
                invoiceId:basicData.invoiceId,//发票id
                accountName:accountName,//税金科目名称
                accountCode:accountCode,//税金科目代码
                invoiceItemsList:basicData.tableData, //商品明细
                version:basicData.version,//版本号
                isVatSpecialInvoice:basicData.isVatSpecialInvoice?1:0, 
                isVatNormalInvoice:basicData.isVatNormalInvoice?1:0,
                isProformaInvoice:basicData.isProformaInvoice?1:0
            }
            let api='';
            if(this.type==1){ 
                api=sApi.insertSaleInvoice;
            }else{
                api=sApi.updateSaleInvoice;
            }
            api(data).then(res => {
				if(res.code=="success"){
                    this.$message({
                        duration: 1000,
                        showClose: true,
                        message: res.message,
                        type: 'success'
                    });
                 this.$router.push({  
                    path:'/index/salesManage/salesInvoice', //跳转的路径    
                })
                }else{
                    this.$message({
                        duration: 1000,
                        showClose: true,
                        message: res.message,
                        type: 'warning'
                    });
                }
            }).catch(); 
           
        },
         //月结
        accountPeriod(companyId){
            let data={
                companyId:companyId
            }; 
            sApi.getAccountPeriodByCompany(data).then(res =>{
                if(res.code=="success"){
                    this.$nextTick(() => {
                        this.basicData.pickerOptions={
                            disabledDate(time) {
                                return  res.data.enddate < time.getTime() || time.getTime() < res.data.begindate;

                            }
                        }
                    })
                }else{
                    this.$openWarning(res.message);
                }    
            }).catch();
        },
          //销售客户弹窗
        customerTips(){
            this.customerShow = true;
        },
         //销售客户弹窗关闭
        customerCancle() {
            this.customerShow = false;
        },
        //销售客户弹窗确定获取数据
        customerSure(e) {
            this.customerShow = false;
            this.salesIssueData.customerName = e;
            this.salesIssueData.custId=e.customerId;
            this.salesIssueData.custCode=e.customerCode;
        },
        //重置
        resetData(){
            this.salesIssueData.contractCode='';
            this.salesIssueData.extContractCode='';
            this.salesIssueData.pageSize=100;
            this.salesIssueData.pageNum=1;
             this.salesIssueData.customerName={};
            this.salesIssueData.companyId='';
            this.salesIssueData.branchId='';
            this.salesIssueData.custId='';
            this.salesIssueData.undoCode='';
            this.salesIssueData.doNo='';
            this.salesIssueData.createdName='';
            this.salesIssueData.createdTime=[];     
        },
        //改变发票数量，开票总数重新计算
        handleInvoiceQty(row,index){
            if(this.basicData.tableData.length){
                this.basicData.tableData[index].invoiceQty=this.$filterPriceNum(row.invoiceQty, 4);
            }
            let that=this.basicData;
            let rmbCurrencyRate= that.rmbCurrencyRate;
            that.invoiceQty=0;
            that.payAmtTotalRmb=0;
            that.invoiceAmtVat=0;
            that.tableData.forEach((items,index)=>{
                that.invoiceQty=calculation.accAdd(that.invoiceQty,items.invoiceQty);//总数量 
                that.invoiceAmtVat=this.$calculationAmount(that.invoiceAmtVat,items.originAmt,"add");//发票总额
            });
            that.payAmtTotalRmb=this.$calculationAmount(that.invoiceAmtVat,rmbCurrencyRate,"mul");
            let pro=calculation.accDiv(row.invoiceQty,row.itemQty);
            row.costAmt=calculation.accMul(pro,row.stockoutAmt).toFixed(2);//成本总额，根据比例计算
            this.handleOrginPrice(row,index);
            this.taxAmtCh(row, index);
            if(row.invoiceQty>row.unInvoiceQty){
                that.flag=true;
                this.$openWarning("开票数量不能大于未开票数量");
                return;
            }else{
                that.flag=false;
            }
        },
        //增值税率
        // 业务币含税单价
        // 业务币含税单价*数量=业务币含税金额
        //业务币不含税单价=业务币含税单价÷（+增值税率）
        // ,本币含税单价=业务币含税单价*汇率 //
        handleOrginPrice(e,index){ 
            let row = e;
            if(this.basicData.tableData.length){
                this.basicData.tableData[index].originPrice=this.$filterPriceNum(row.originPrice,6);
            }
            let currencyRate=this.basicData.baseCurrencyRate;
            let rmbCurrencyRate=this.basicData.rmbCurrencyRate;
             // 业务币不含税单价=业务币含税单价÷(1+增值税率）
            row.originNoPrice = this.$unorginPrice(row.originPrice, row.taxRate);
            //销售含税金额
            row.originAmt = this.$orginAmt(row.originPrice, row.invoiceQty);
            //销售不含税金额
            row.originNoAmt = this.$unorginAmt(row.originAmt, row.taxRate);
            //增值税额
            row.originTaxAmt = this.$taxAmt(row.originAmt, row.originNoAmt);
            //本币计算 对应业务币*汇率
            //本币含税单价  basePrice
            row.basePrice = this.$bbhsdj(row.originPrice,currencyRate);
            //本币不含税单价 baseNoPrice
            row.baseNoPrice = this.$bbnhsdj(row.originNoPrice,currencyRate);
            //本币含税金额 baseAmt
            row.baseAmt = this.$bbhsje(row.originAmt,currencyRate);
           
            //本币增值税额 baseTaxAmt
            row.baseTaxAmt = this.$bbzzse(row.originTaxAmt,currencyRate);
             //本币不含税金额 baseNoAmt
            row.baseNoAmt = this.$tybbnhsje(row.baseAmt,row.baseTaxAmt);
            this.basicData.payAmtTotalRmb=0;//人民币总金额
            let that=this;
            let amt=0;
            this.basicData.tableData.forEach(e=>{
               amt=that.$calculationAmount(amt,e.originAmt,"add");     
            })
            this.basicData.invoiceAmtVat=amt;
            this.basicData.payAmtTotalRmb=that.$calculationAmount(that.basicData.invoiceAmtVat,rmbCurrencyRate,"mul");
            this.$set(this.basicData.tableData, index, row);
        },
         //销售含税金额变动
        originAmtCh(e, index) {
            let that=this.basicData;
            let currencyRate=that.baseCurrencyRate;
            let row = e;
            if(this.basicData.tableData.length){
                this.basicData.tableData[index].originAmt=this.$filterPriceNum(row.originAmt,2);
            }
            //销售含税单价
            row.originPrice = this.$orginPrice(row.originAmt, row.invoiceQty);
            //销售不含税单价
            row.originNoPrice = this.$unorginPrice(row.originPrice, row.taxRate);
            //销售不含税金额
            row.originNoAmt = this.$unorginAmt(row.originAmt, row.taxRate);
            //增值税额
            row.originTaxAmt = this.$taxAmt(row.originAmt, row.originNoAmt);

            //本币计算 对应业务币*汇率
            //本币含税单价  basePrice
            row.basePrice = this.$bbhsdj(row.originPrice,currencyRate);
            //本币不含税单价 baseNoPrice
            row.baseNoPrice = this.$bbnhsdj(row.originNoPrice,currencyRate);
            //本币含税金额 baseAmt
            row.baseAmt = this.$bbhsje(row.originAmt, currencyRate);
            //本币增值税额 baseTaxAmt
            row.baseTaxAmt = this.$bbzzse(row.originTaxAmt,currencyRate);
              //本币不含税金额 baseNoAmt
            row.baseNoAmt = this.$tybbnhsje(row.baseAmt,row.baseTaxAmt);
            that.sumCostAmt=0;
            that.invoiceAmtVat=0;
            let rmbCurrencyRate=that.rmbCurrencyRate;
            that.tableData.forEach((items,index)=>{//改变金额
                that.sumCostAmt=this.$calculationAmount(that.sumCostAmt,items.costAmt,"add");//成本总额
                that.invoiceAmtVat=this.$calculationAmount(that.invoiceAmtVat,items.originAmt,"add");//开票金额
            });
            that.payAmtTotalRmb=this.$calculationAmount(that.invoiceAmtVat,rmbCurrencyRate,"mul");
            this.$set(this.basicData.tableData, index, row);
        },
         //税率变动
        taxRateCh(e, index) {
            let taxRate=e.taxRate;
            if(this.basicData.tableData.length){
                this.basicData.tableData[index].taxRate=(taxRate+'').replace(/[^\d]/g, '') * 1;
            }
            let currencyRate=this.basicData.baseCurrencyRate;
            let row = e;
            //销售不含税金额
            row.originNoAmt = this.$unorginAmt(row.originAmt, row.taxRate);
            //销售不含税单价
            row.originNoPrice = this.$unorginPrice(row.originPrice, row.taxRate);
            //增值税额
            row.originTaxAmt = this.$taxAmt(row.originAmt, row.originNoAmt);

            //本币计算 对应业务币*汇率
           
            //本币不含税单价 baseNoPrice
            row.baseNoPrice = this.$bbnhsdj(row.originNoPrice,currencyRate);
            //本币增值税额 baseTaxAmt
            row.baseTaxAmt = this.$bbzzse(row.originTaxAmt, currencyRate);
              //本币不含税金额 baseNoAmt
            row.baseNoAmt = this.$tybbnhsje(row.baseAmt,row.baseTaxAmt);
            this.$set(this.basicData.tableData, index, row);
        },
        //业务币税额变动
        taxAmtCh(e, index) {
            let currencyRate=this.basicData.baseCurrencyRate;
            let row = e;
            if(this.basicData.tableData.length){
                this.basicData.tableData[index].originTaxAmt=this.$filterPriceNum(row.originTaxAmt,2);
            }
            //销售不含税金额  销售不含税金额=销售含税金额-税额
            row.originNoAmt = this.$unorginAmtCh(row.originAmt, row.originTaxAmt);
            //销售不含税单价 销售不含税金额=销售不含税金额 / 发票数量
            row.originNoPrice = this.$unPrice(row.originNoAmt, row.invoiceQty);
            //本币计算 对应业务币*汇率
           
            //本币不含税单价 baseNoPrice
            row.baseNoPrice = this.$bbnhsdj(row.originNoPrice,currencyRate);
              //本币增值税额 baseTaxAmt
            row.baseTaxAmt = this.$bbzzse(row.originTaxAmt, currencyRate);
              //本币不含税金额 baseNoAmt
            row.baseNoAmt = this.$tybbnhsje(row.baseAmt,row.baseTaxAmt);
            this.$set(this.basicData.tableData, index, row);
        },
        handleCurrencyRate(currencyRate){
            this.basicData.baseCurrencyRate=this.$filterPriceNum(currencyRate,8);
            let list = JSON.parse(JSON.stringify(this.basicData.tableData));//拷贝数组,注意这行的拷贝方法
            for(let i=0;i<list.length;i++){
                let row=list[i]
                    //本币含税单价  basePrice
                row.basePrice = this.$bbhsdj(row.originPrice,currencyRate);
                //本币不含税单价 baseNoPrice
                row.baseNoPrice = this.$bbnhsdj(row.originNoPrice,currencyRate);
                //本币含税金额 baseAmt
                row.baseAmt = this.$bbhsje(row.originAmt,currencyRate);
                
                //本币增值税额 baseTaxAmt
                row.baseTaxAmt = this.$bbzzse(row.originTaxAmt,currencyRate);
                  //本币不含税金额 baseNoAmt
                row.baseNoAmt = this.$tybbnhsje(row.baseAmt,row.baseTaxAmt);
            }
            this.basicData.tableData=list;
        },
            //修改人民币汇率
        handleRmbCurrencyRate(rmbCurrencyRate){
            this.basicData.rmbCurrencyRate=this.$filterPriceNum(rmbCurrencyRate,8);
            this.basicData.payAmtTotalRmb=this.$calculationAmount(this.basicData.invoiceAmtVat,rmbCurrencyRate,"mul");
        },
        //获取公司列表
        getCompanyList(){
            let data={};
           sApi.selectBbCompanyBase(data).then(res => {
				this.salesIssueData.companyList = res.data;
            }).catch(); 
        },
         //根据公司的id获取部门
        getBranchByCompanyId(e){
            let data={
                companyId:this.salesIssueData.companyId
            }
            sApi.selectBbBranch(data).then(res => {
				this.salesIssueData.branchList = res.data;
            }).catch(); 
        },
        // //获取客户
        // getCustomerList(){
        //     let data={};
        //    sApi.selectCustomerList(data).then(res => {
		// 		this.salesIssueData.customerList = res.data;
        //     }).catch(); 
        // },
         //获取销售类型
        getSoTypeList(){
            let data={
                dictNo:1015
            }
           sApi.selectDoStatusList(data).then(res => {
				this.basicData.soTypeList = res.data;
            }).catch(); 
        },
        //获取状态
        getInvoiceStatusList(){
            let data={
                dictNo:1071
            }
           sApi.selectDoStatusList(data).then(res => {
				this.basicData.invoiceStatusList = res.data;
            }).catch(); 
        },
        //获取发票类型
        getInvoiceTypeList(){
            let data={
                dictNo:1070
            }
           sApi.selectDoStatusList(data).then(res => {
				this.basicData.invoiceTypeList= res.data;
            }).catch(); 
        },
        //选择销售出库单弹窗关闭
        salesIssueCancle(){
            this.salesIssueData.salesIssueDataShow=false;
        },
        //删除行
        deleteRow(){
             //基础数据
            if (!this.basicData.selectioned) {
                //判断商品明细是否选中
                this.$message({
                    duration: 1000,
                    showClose: true,
                    message: "未选择数据",
                    type: "warning"
                });
                return;
            }
            let list=[];
            list.push(this.basicData.selectioned);
            var data={
                invoiceId:this.basicData.invoiceId,//发票id
                invoiceItemsList:list, //商品明细
                version:this.basicData.version,//版本号
            }
            if(this.type==2 && this.basicData.selectioned.id){
                this.$confirm("是否确定删除?", "删除提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    sApi.deleteSaleInvoiceItems(data).then(res => {
                        if(res.code=="success"){
                            this.$message({
                                duration: 1000,
                                showClose: true,
                                message: res.message,
                                type:"success"
                            });
                         this.basicData.tableData.splice(this.basicData.tableDataIndex, 1);
                         this.basicData.tableData.forEach((item, index) => {
                            item.rowno= (index + 1) * 10;
                            this.handleInvoiceQty(item,index);
                            this.handleOrginPrice(item,index);
                         });
                        // 删除完数据之后清除勾选框
                        this.$refs.table.clearSelection();
                        }else{
                            this.$message({
                                duration: 1000,
                                showClose: true,
                                message: res.message,
                                type:"error"
                            });
                        }    
                    }).catch();
                }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    }); 
            }else{
                this.basicData.tableData.splice(this.basicData.tableDataIndex, 1);
                this.basicData.tableData.forEach((item, index) => {
                    item.rowno= (index + 1) * 10;
                    this.handleInvoiceQty(item,index);
                    this.handleOrginPrice(item,index);
                 });
                // 删除完数据之后清除勾选框
                this.$refs.table.clearSelection();
            }
           
        },
        //添加行
        addRow(){
            //修改
            this.getCompanyList();//获取公司
            // this.getCustomerList();//获取客户
            this.getBranchByCompanyId();//获取部门
            this.initSalesIssueData();//获取销售出库单
            if(this.basicData.invoiceType=="10700005"){
                this.invoiceType="blue";
            }else{
                this.invoiceType="return";
            }
            //选了数据，客户，公司，部门不可以修改
            if(this.basicData.tableData.length==0){
                this.disabledData=false;
            }else{
                this.disabledData=true;
            }
            this.salesIssueData.salesIssueDataShow=true;
           
        },
        //点击确定，关闭弹窗
        salesIssueSure(){
           // localStorage.removeItem("invoiceId");
            if (this.salesIssueData.selectioned.length==0) {//判断是否选中
                this.$message({
                    duration: 1000,
                    showClose: true,
                    message: '未选择数据',
                    type: 'warning'
                });
                return;
            }
            this.undoIdList=[];
            this.doIdList=[];
            let arr=this.salesIssueData.selectioned;
            let flag=false;
            for(let i=0; i<arr.length-1; i++){
                for(let j=i+1; j<arr.length; j++){
                    if(arr[j].custCode!=arr[i].custCode || arr[j].companyId!=arr[i].companyId || 
                    arr[j].orgId!=arr[i].orgId || arr[j].currencyCode!=arr[i].currencyCode){
                        flag=true;   
                    }
                }
            }
            if(flag){
                this.$openWarning("必须选择同一个公司,部门,客户,业务币别的数据");
                return;
            }
            this.salesIssueData.currencyCode=arr[0].currencyCode;
            this.salesIssueData.companyId=arr[0].companyId;
            this.salesIssueData.branchId=arr[0].orgId;
            this.salesIssueData.custId=arr[0].custId; 
            this.salesIssueData.customerName.customerName=arr[0].custName; 
            //this.basicData.extContractCode=arr[0].extContractCode;
            arr.forEach(s=>{
                if(this.invoiceType=='blue'){
                    this.doIdList.push(s.doId);
                    //this.salesIssueData.doNo=s.doNo;
                }else{
                     //this.salesIssueData.undoCode=s.undoCode;
                    this.undoIdList.push(s.undoId);
                }
                this.salesIssueData.contractCode=s.contractCode;
            })
            if(this.basicData.tableData.length){
                this.getInfoById(2);//根据销售单号或者退货单号查询详情  
            }else{
                //选中的值
                let list=this.salesIssueData.selectioned;
                let that=this.basicData;
                that.tableData=[];//清空原有的值
                let th=this;
                //that.extContractCode=list[0].extContractCode;
                that.invoiceAmtVat=0;
                that.sumCostAmt=0;
                that.invoiceQty=0;
                that.tableData=list;
                that.companyName=list[0].companyName;//公司
                that.companyId=list[0].companyId;//公司
                that.companyCode=list[0].companyCode;//公司code
                that.branchName=list[0].orgName;//部门
                that.branchCode=list[0].orgCode;
                that.branchId=list[0].orgId;
                that.customerName=list[0].custName;//客户
                that.custCode=list[0].custCode;//客户
                that.custId=list[0].custId;//客户
                // that.currencyName=list[0].currencyCode;//币别
                that.currencyCode=list[0].currencyCode;
                this.selectCurrencyName();
                that.rmbCurrencyRate=list[0].rmbCurrencyRate;//人民币汇率
                that.soType=""+list[0].contractType;//销售类型
                if(this.invoiceType=='blue'){
                    this.title="选择销售出库单";
                    this.salesIssueData.doId=list[0].doId;
                    that.baseCurrencyRate=list[0].currencyRate;//蓝字发票
                }else{
                    this.title="选择销售退货单";
                    this.salesIssueData.undoId=list[0].undoId;
                    this.undoCode=list[0].undoCode; 
                    that.baseCurrencyRate=list[0].baseCurrencyRate;//退货发票
                }
                this.accountPeriod(that.companyId);//月结，查询记账日期范围
                this.getInfoById(1);//根据销售单号或者退货单号查询详情
                if(!that.baseCurrencyRate){
                    this.getBaseParities();//本位币汇率
                }
            }
            this.salesIssueData.salesIssueDataShow=false;
        },
        //根据id获取详情
        getInfoById(type){
            let data={};
            let api='';
            if(this.invoiceType=='blue'){
               data=this.doIdList;
               api=sApi.selectOdDoItems2Invoice;
            }else{
                data=this.undoIdList;
               api=sApi.selectOdUndoItems2Invoice;
            }
            api(data).then(res => {
				if(res.code=="success"){
                   let list=res.data.list;
                   let that=this.basicData;
                   if(type==2){//添加行
                        list.forEach(li=>{
                            var flag = false;
                            that.tableData.forEach(ta=>{
                                if(that.invoiceType=="10700005"){//蓝字发票
                                    if(li.doNo==ta.doNo && li.rowno==ta.doRowno){
                                       flag = true;
                                    }
                                }else{
                                    if(li.undoCode==ta.undoCode && li.rowno==ta.undoRowno){
                                        flag = true;
                                    }
                                }
                            })
                            if(!flag){
                                that.tableData.push(li);
                            }
                        })
                    }else{
                        that.tableData=list;
                    }  
                    that.invoiceQty=0;
                    that.sumCostAmt=0;
                    that.tableData.forEach((items,index)=>{ 
                        //items.baseTaxAmt=items.baseTaxAmt;
                        //items.costAmt=items.stockoutAmt;
                        items.invoiceQty=items.unInvoiceQty;//未开票的数量
                        that.sumCostAmt=this.$calculationAmount(that.sumCostAmt,items.costAmt,"add");//成本总额
                        that.invoiceQty=calculation.accAdd(that.invoiceQty,items.invoiceQty);//总数量
                        items.originNoAmt = this.$unorginAmt(items.originAmt, items.taxRate); 
                        if(that.invoiceType=="10700005"){//蓝字发票
                            that.doNo=list[0].doNo;//出库单号
                            if(!items.soContractNo){
                                items.doRowno=items.rowno;
                                //this.salesIssueData.doNo=list[0].doNo;//给销售出库单查询条件赋值 
                                items.soContractNo =items.contractCode;
                                items.soContractRowno=items.contractRowno;
                                items.soExtNo=items.extContractCode; 
                            }
                            
                        }else{
                            that.undoCode=list[0].undoCode;//退货单号
                            if(!items.soContractNo){
                                items.undoRowno=items.rowno;      
                                //this.salesIssueData.undoCode=list[0].undoCode;//给销售出库单查询条件赋
                                items.soContractNo=items.soContractCode;
                                items.soContractRowno=items.soContractRowno;
                                items.soExtNo=items.soExtNo;
                            }
                            
                        } 
                        items.invoiceRowNo=(index+1)* 10; 
                        items.invoiceGoodsCat="黑色金属冶炼压延品"; //物料大类
                        if(items.industryCate=="原木" || items.industryCate=="板材"){
                            items.invoiceGoodsCat="林业产品";
                        }
                        
                        items.invoiceGoodsName=items.goodsName;//物料名称
                        items.invoiceGoodsSpec=this.dataProcessing(items.goodsSpec);//物料规格
                        let pro=calculation.accDiv(items.invoiceQty,items.itemQty);
                        items.costAmt=calculation.accMul(pro,items.stockoutAmt).toFixed(2);
                        this.handleOrginPrice(items, index);
                        this.taxRateCh(items, index);
                        this.taxAmtCh(items, index);
                       
                    })
                }else{
                    this.$message({
                        duration: 1000,
                        showClose: true,
                        message: res.message,
                        type: 'warning'
                    });
                }
            }).catch(); 
        },
        
        //物料规格数据处理
        dataProcessing(str){
            let strArry=[];//逗号分割的数据
            let specStr="";
            if(str.indexOf(",")!=-1){
                strArry=str.split(",");
                for (var i = 0; i < strArry.length; i++) {
                    let arr = strArry[i].split(":");
                    strArry[i] = strArry[i].substring(arr[0].length+1);
                    if (strArry[i] != "无") {
                        specStr += strArry[i] + ",";
                    }
                }
                if (specStr.length > 0) {
                    specStr = specStr.substring(0,specStr.length - 1);
                }
            }else if(str!="" && str!=null){
                let arr = str.split(":");
                specStr = str.substring(arr[0].length+1);
            }
            return specStr;
        },
         //tab切换
        handleClick(tab, event) {
            console.log(tab, event);
        },
        //销售出库单弹窗表格选择
        handleChange(e) {
            this.salesIssueData.selectioned = e;
        },
        //基本信息 表格选择
        handleChangeTable(e) {
            if (e.length === 0) {
                this.basicData.selectioned = null;
            }
        },
        //单击物料号，得到当前行
        rowClick(row){
            this.$refs.table.clearSelection();
            this.basicData.tableData.forEach(item => {
                item.edit = false;
            });
            if (row) {
                this.basicData.selectioned = row;
                this.basicData.tableDataIndex = this.basicData.tableData.indexOf(row);
                this.basicData.tableData[this.basicData.tableDataIndex].edit=true;
                this.$refs.table.toggleRowSelection(row, true);
            }
            this.$set(this.basicData.tableData,this.basicData.tableDataIndex,row); 
        },
           //基本信息 表格单选
        dialogCheck(selection, row) {
            this.$refs.table.clearSelection();
            if (selection.length === 0) {  // 判断selection是否有值存在
                return;
            }
            if (row) {
                this.basicData.selectioned = row;
                this.basicData.tableDataIndex = this.basicData.tableData.indexOf(row);
                this.$refs.table.toggleRowSelection(row, true);
            }  
        },
           //销售弹窗 表格单选
        saleDialogCheck(selection, row) {
            if (selection.length === 0) {  // 判断selection是否有值存在
                return;
            }
            if (row) {
                this.salesIssueData.selectioned.push(row);
                this.salesIssueData.index = this.salesIssueData.tableData.indexOf(row);
                this.$refs.multipleTable.toggleRowSelection(row, true);
            }  
        },
        //销售列表
          //单行点击
        saleRowClick(row) {
            this.salesIssueData.selectioned.push(row);
            this.salesIssueData.index = this.salesIssueData.tableData.indexOf(row);
            this.$refs.multipleTable.toggleRowSelection(row, true);
        },
        //税金科目
        accountTips(){
            this.subjectShow=true;
        },
        subjectSure(e){
            if(e){
                this.basicData.accountName=e;
            }
            this.subjectShow=false;
        },
        subjectCancle(){
            this.subjectShow=false;
        },
        //取消
        cancel(){
            this.$router.push({  
                path:'/index/salesManage/salesInvoice', //跳转的路径    
            })
           
        },
         ///查询本位币汇率
        getBaseParities(){
             let data={
                formCurrencyCode:this.basicData.currencyCode, //目标货币
                toCurrencyCode:"CNY"//this.toCurrencyCode 本位币
            }
           sApi.getParities(data).then(res => {
               if(res.data==null){
                   this.basicData.baseCurrencyRate =1;
               }else{
                   this.basicData.baseCurrencyRate = res.data.parities;
               }
               this.handleCurrencyRate(this.basicData.baseCurrencyRate);
            }).catch(); 
        },
       //分页
        handleSizeChange(val) {
            this.salesIssueData.pageSize = val;
            this.initSalesIssueData();
        },
        handleCurrentChange(val) {
            this.salesIssueData.pageNum = val;
            this.initSalesIssueData();
        },
        //查询条件显示一行
        inputShow(){
            this.show=this.$dialogShowOne(this.show);
        },
        //员工弹窗打开
        staffTip() {
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
                column.property == "itemQty" ||
                column.property == "invoiceQty" ||
                column.property == "unInvoiceQty" ||
                column.property == "costAmt" ||
                column.property == "originAmt" ||
                column.property == "originNoAmt" ||
                column.property == "originTaxAmt" ||
                column.property == "baseAmt" ||
                column.property == "baseNoAmt" ||
                column.property == "baseTaxAmt" ||
                column.property=="originTaxAmt"
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
    },
    components: {
        customerSelect,
        subjectFrame,
        staffSelect
    }
}
</script>
<style>
   .el-select .el-input__inner,.el-input .el-input__inner{
        font-size: 12px !important;
    }
     .el-select:hover .el-input__inner{
        border-color: #97999e !important;
    }
    .el-input--small .el-input__inner{
            border-color: #97999e !important;
        }
    textarea{
        border-color: #909399 !important;
    } 
    .el-icon-search:before{
        font-size: 16px;
    }
    .index .index-div4 .el-checkbox__label{
        font-size: 12px;
    }
    .index .index-div4 .checkbox-col  .el-checkbox__inner{
        vertical-align:3px;
    }
    .index .index-div4 .checkbox-col label::after{
        content:"" !important;
    }
</style>
<style lang="scss" scoped>
.index .index-div4 .el-col-5{
    width:24% !important;
} 
.index .el-dialog__header .el-dialog__title{
    font-size: 15px;
}
.index .index-div3{
    padding-left:0;
}
.index .index-div{
    label{
        width: 36%;
    }
}
.index .index-div .el-input,.index .index-div .el-select{
    width: 64%;
}
.index .index-div3 .el-col .comicon{
    right: 13px;
    top: 3px;
}
.index .index-div3 .el-col .comicon2{
    right:4px;
    top:5px;
}
</style>
