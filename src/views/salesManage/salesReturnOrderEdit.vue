<template>
    <div id="salesReturnOrderEdit">
        <div class="button-div">
            <el-button  class="query-button" icon="el-icon-suitcase" @click="saveSaleOutboundOrder()">保存</el-button>
            <el-button  @click="cancel()" icon="el-icon-close">取消</el-button>
        </div>
        <el-tabs class="el-tabs" v-model="activeName" type="card" @tab-click="handleClick" >
            <el-tab-pane  label="抬头数据" name="one">
                <div class="index-div3 index-div">
                    <el-col :span="5" class="el-col el-col-required">
                        <label><span class="must-full">*</span>公司</label>
                        <el-input v-model="basicData.companyName" class="el-inputs" :class="errorKey.includes('companyName') ? 'inputRed' : ''" size="small"  disabled></el-input>
                    </el-col>
                    <el-col :span="5" class="el-col el-col-required">
                        <label><span class="must-full">*</span>部门</label>
                        <el-input v-model="basicData.branchName" size="small" class="el-inputs" :class="errorKey.includes('branchName') ? 'inputRed' : ''"   disabled></el-input>
                    </el-col>
                    <el-col :span="5" class="el-col el-col-required">
                        <label><span class="must-full">*</span>业务员</label>
                        <el-input v-model="basicData.staffName" size="small" class="el-inputs" :class="errorKey.includes('staffName') ? 'inputRed' : ''"  disabled></el-input>
                      
                    </el-col>
                    <el-col :span="5" class="el-col el-col-required">
                        <label><span class="must-full">*</span>退货单号</label>
                        <el-input   size="small" v-model="basicData.undoCode" :class="errorKey.includes('undoCode') ? 'inputRed' : ''" class="el-inputs" disabled></el-input>
                    </el-col>
                    <el-col :span="5" class="el-col el-col-required">
                        <label><span class="must-full">*</span>销售出库单号</label>
                        <el-input  size="small" v-model="basicData.doNo" :class="errorKey.includes('doNo') ? 'inputRed' : ''" class="el-inputs" disabled></el-input>
                    </el-col>
                    <el-col :span="5" class="el-colc el-col-required">
                        <label><span class="must-full">*</span>退货类型</label>
                        <el-select clearable  size="small" class="el-select" :class="errorKey.includes('undoType') ? 'inputRed' : ''" v-model="basicData.undoType" disabled>
                        <el-option v-for="item in basicData.undoTypeList"
                                    :key="item.dict_code"  
                                    :label="item.dict_value"
                                    :value="item.dict_code"
                            ></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="5" class="el-col el-col-required">
                        <label><span class="must-full">*</span>仓库</label>
                        <el-input v-model="basicData.warehouseName" size="small" class="el-inputs" :class="errorKey.includes('warehouseName') ? 'inputRed' : ''" disabled></el-input>
                    </el-col>
                    <el-col :span="5" class="el-col el-col-required">
                        <label><span class="must-full">*</span>销售客户</label>
                        <el-input  class="el-inputs" v-model="basicData.customerName" size="small" :class="errorKey.includes('customerName') ? 'inputRed' : ''" disabled></el-input>
                    </el-col>
                    <el-col :span="5" class="el-col el-col-required">
                        <label><span class="must-full">*</span>业务币种</label>
                        <el-input  class="el-inputs" v-model="basicData.currencyName" size="small" :class="errorKey.includes('currencyName') ? 'inputRed' : ''" disabled></el-input>
                    </el-col>
                    <el-col :span="5" class="el-col el-col-required">
                        <label><span class="must-full">*</span>本位币汇率</label>
                        <el-input  class="el-inputs" type="number"  v-model="basicData.baseCurrencyRate" :class="errorKey.includes('baseCurrencyRate') ? 'inputRed' : ''" @input="handleCurrencyRate(basicData.baseCurrencyRate)"  size="small" disabled></el-input>
                    </el-col>
                    <el-col :span="5" class="el-col el-col-required">
                        <label><span class="must-full">*</span>人民币汇率</label>
                        <el-input  class="el-inputs" type="number"  v-model="basicData.rmbCurrencyRate" :class="errorKey.includes('rmbCurrencyRate') ? 'inputRed' : ''" @input="handleRmbCurrencyRate(basicData.rmbCurrencyRate)" size="small" placeholder="请输入"></el-input>
                    </el-col>
                     <el-col :span="5" class="el-colc el-col-required">
                        <label><span class="must-full">*</span>状态</label>
                        <el-select clearable  size="small" class="el-select"  v-model="basicData.undoStatus" :class="errorKey.includes('undoStatus') ? 'inputRed' : ''" disabled >
                        <el-option v-for="item in basicData.undoStatusList"
                                    :key="item.dict_code"  
                                    :label="item.dict_value"
                                    :value="item.dict_code"
                            ></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="5" class="el-col el-col-required">
                        <label><span class="must-full">*</span>销售合同号</label>
                        <el-input  class="el-inputs" v-model="basicData.contractCode" :class="errorKey.includes('contractCode') ? 'inputRed' : ''" size="small" disabled></el-input>  
                    </el-col>
                    <el-col :span="5" class="el-col el-col-required">
                        <label><span class="must-full">*</span>外部合同号</label>
                        <el-input  class="el-inputs" v-model="basicData.extContractCode" :class="errorKey.includes('extContractCode') ? 'inputRed' : ''" size="small" disabled></el-input>  
                    </el-col>
                    <el-col :span="5" class="el-col">
                        <label>成本总额</label>
                        <el-input  class="el-inputs" v-model="basicData.sumCostAmt" size="small" disabled></el-input>  
                    </el-col>
                    <el-col :span="5" class="el-col">
                        <label>业务币总金额</label>
                        <el-input  class="el-inputs" v-model="basicData.sumAmt" size="small" disabled ></el-input>
                    </el-col>
                    <el-col :span="5" class="el-col">
                        <label>人民币总金额</label>
                        <el-input  class="el-inputs" v-model="basicData.payAmtTotalRmb" size="small" disabled ></el-input>
                    </el-col>
                    <el-col :span="5" class="el-col">
                        <label>总数量</label>
                        <el-input  class="el-inputs" v-model="basicData.sumQty" size="small" disabled ></el-input>
                        
                    </el-col>
                    <el-col :span="5" class="el-col">
                        <label><span class="must-full">*</span>退货日期</label>
                        <el-date-picker
                            class="el-input2"
                            v-model="basicData.undoDate"
                            :class="errorKey.includes('undoDate') ? 'inputRed' : ''" 
                            type="date"
                            size="small"
                            placeholder="选择日期"
                            :picker-options="basicData.pickerOptions"
                        >
                        </el-date-picker>
                    </el-col>
                    <el-col :span="24" class="el-col-textarea">
                        <label>退货原因</label>
                        <el-input
                            type="textarea"
                            rows="2"
                            autosize
                            v-model="basicData.unReason"
                            size="small"
                            class="el-textarea"
                            placeholder="请输入"
                            >
                        </el-input>
                    </el-col>
                
                </div>
                 <!-- 表格 -->
                <div class="button-div">
                     <el-button class="addBut"  icon="el-icon-plus" @click="addRow()">添加行</el-button>
                    <el-button class="addBut" @click="deleteRow()" icon="el-icon-minus">删除行</el-button>
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
                        max-height="320"
                        class="el-table" v-loading="loading">
                        <el-table-column type="selection" width="45" align="center"></el-table-column> 
                        <el-table-column prop="rowno"  width="50" label="行号">
                        </el-table-column>
                        <el-table-column prop="soContractCode" label="销售合同号" width="120px" :show-overflow-tooltip="true" >
                        </el-table-column>
                        <el-table-column prop="soExtNo" label="外部合同号" width="100px" :show-overflow-tooltip="true" >
                        </el-table-column>
                        <el-table-column prop="soContractRowno" label="销售合同行号" width="100px" :show-overflow-tooltip="true" >
                        </el-table-column>
                        <el-table-column prop="doNo" label="销售出库单号" width="120px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="doRowno" label="销售出库单行号" width="120px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="goodsCode" label="物料号" width="178px" :show-overflow-tooltip="true" > 
                        </el-table-column>
                        <el-table-column prop="goodsName" label="物料名称"  width="120px"  :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="goodsCategoryName" label="物料大类"  width="120px"  :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="goodsSpec" label="物料规格" width="100px"  :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="batchCode" label="批次号" width="178px"  :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="packageCode" label="捆包号"  width="100px"  :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="itemUnitName" label="基础单位" width="110px" :show-overflow-tooltip="true">
                        </el-table-column>  
                        <el-table-column  label="退货数量" width="178px">
                             <template slot-scope="scope">
                                <div v-if='scope.row.edit'>
                                    <el-input type="number"  v-model="scope.row.itemQty"  @input="qtyChange(scope.row,scope.$index)"  size="mini" class="el-inputs" placeholder="请输入"></el-input>
                                </div>
                                <div v-else>
                                    {{scope.row.itemQty}}
                                </div>
                            </template>
                        </el-table-column>
                       
                        <el-table-column prop="secUnitName" label="第二单位" width="110px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column label="第二数量" width="178px">
                            <template slot-scope="scope">
                                <div v-if='scope.row.edit'>
                                    <el-input type="number" :oninput="scope.row.secQty = $filterPriceNum(scope.row.secQty,4)"  v-model="scope.row.secQty"  size="mini" class="el-inputs" placeholder="请输入"></el-input>
                                </div>
                                <div v-else>
                                    {{scope.row.secQty}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column  label="单价" width="178px">
                            <template slot-scope="scope">
                                <div v-if='scope.row.edit'>
                                    <el-input type="number"  v-model="scope.row.originPrice"  @input="handleOrginPrice(scope.row,scope.$index)"  size="mini" class="el-inputs" placeholder="请输入"></el-input>
                                </div>
                                <div v-else>
                                    {{scope.row.originPrice}}
                                </div>
                            </template>
                        </el-table-column>
                        
                        <el-table-column  label="增值税率%" width="178px">
                             <template slot-scope="scope">
                                <div v-if="scope.row.edit && type == 1">
                                    <el-input
                                        type="number"
                                        
                                        v-model="scope.row.taxRate"
                                        @input="taxRateCh(scope.row, scope.$index)"
                                        size="mini"
                                        class="el-inputs"
                                        placeholder="请输入"
                                    ></el-input>
                                </div>
                                <div v-else>
                                    {{ scope.row.taxRate }}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column   label="业务币含税金额"  width="178px">
                             <template slot-scope="scope">
                                <div v-if='scope.row.edit'>
                                    <el-input type="number"  v-model="scope.row.originAmt"  @input="originAmtCh(scope.row,scope.$index)"  size="mini" class="el-inputs" placeholder="请输入"></el-input>
                                </div>
                                <div v-else>
                                    {{scope.row.originAmt}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="originNoAmt" label="业务币不含税金额"   width="120px">
                        </el-table-column>
                        <el-table-column prop="taxAmt" label="业务币税额"  width="178px">
                            <template slot-scope="scope">
                                <div v-if='scope.row.edit'>
                                    <el-input type="number"  v-model="scope.row.taxAmt"  @input="taxAmtCh(scope.row,scope.$index)"  size="mini" class="el-inputs" placeholder="请输入"></el-input>
                                </div>
                                <div v-else>
                                    {{scope.row.taxAmt}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="baseAmt" label="本币含税金额" width="100px">
                        </el-table-column>
                        <el-table-column prop="baseNoAmt" label="本币不含税金额" width="110px">
                        </el-table-column>
                        <el-table-column prop="baseTax" label="本币税额" width="100px">
                        </el-table-column>
                        <el-table-column prop="costPrice" label="成本单价" width="100px">
                        </el-table-column>
                        <el-table-column prop="stockoutAmt" label="成本金额" width="110px">
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
            </el-tab-pane>
            <!--打印及附件-->
            <el-tab-pane label="打印及附件" name="third">
                <div class="el-table-div">
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
                        <el-button
                        slot="trigger"
                        style="color:#3E3F42;"
                        size="small"
                        icon="el-icon-paperclip"
                        type="button"
                        >选取文件</el-button
                        >
                        <el-button
                        style="margin-left: 10px;"
                        size="small"
                        class="addBut"
                        icon="el-icon-upload"
                        @click="submitUpload"
                        >上传</el-button
                        >
                    </el-upload>
                    </div>
                    <el-table
                    :data="uploadList.tableList"
                    ref="table2"
                    tooltip-effect="dark"
                    border
                    stripe
                    style="width: 100%"
                    >
                    <el-table-column
                        v-if="type != 3"
                        type="selection"
                        width="45"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        label="序号"
                        type="index"
                        width="60"
                        align="center"
                    ></el-table-column>
                    <el-table-column prop="fileOldName" label="文件名称">
                    </el-table-column>
                    <el-table-column prop="createdTime" label="上传时间">
                    </el-table-column>
                    <el-table-column prop="createdName" label="上传人"> </el-table-column>
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
                        </template>
                    </el-table-column>
                    </el-table>
                </div>
            </el-tab-pane>
            <!--系统信息-->
            <el-tab-pane  label="系统信息" name="fourth" style="background:#fff;">
               
                <div class="index-div3" style="margin-bottom:10px">
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
        <el-dialog :visible.sync="salesIssueData.salesIssueDataShow"
          title="选择销售出库单"
          :show-close="false"
          :close-on-click-modal="false"
          :before-close="salesIssueCancle"
          width="1100px"
          class="popup_box">
            <div id="salesReturnOrderCreate" class="index">
                <div class="button-div">
                    <el-button @click="initSalesIssueData()" icon="el-icon-search" class="query-button">查询</el-button>
                    <el-button @click="resetData()" icon="el-icon-refresh">重置</el-button>
                </div>
                <div class="index-div3 index-div4" style="padding-left:0px">
                    <p class="hide-input" v-if="show" @click="inputShow()">更多条件 <i class="el-icon-caret-bottom"></i></p>
                    <p class="hide-input" v-else @click="inputShow()">收起<i class="el-icon-caret-top"></i></p>
                    <div class="dialog-search-div">
                        <el-col :span="5" class="el-col">
                            <label style="width:31%">仓库</label>
                            <el-input v-model="salesIssueData.warehouseName.warehouseName" size="small" class="el-inputs" placeholder="请选择" disabled></el-input>
                            <span class='comicon' style="right: 8px; top: 2px;" @click="warehouseTips"><i class="el-icon-search" ></i></span>
                        </el-col>
                        <el-col :span="5" class="el-col">
                            <label style="width:31%">公司</label>
                            <el-select clearable filterable  size="small" class="el-select"  @change="getBranchByCompanyId()" v-model="salesIssueData.companyId" placeholder="请选择">
                            <el-option v-for="item in salesIssueData.companyList"
                                        :key="item.companyId"  
                                        :label="item.companyName"
                                        :value="item.companyId"
                                ></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="5" class="el-col">
                            <label style="width:31%">部门</label>
                           <el-select clearable  filterable size="small" class="el-select"  v-model="salesIssueData.branchId" placeholder="请选择" >
                            <el-option v-for="item in salesIssueData.branchList"
                                        :key="item.branchId"  
                                        :label="item.branchName"
                                        :value="item.branchId"
                                ></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="5" class="el-col">
                            <label style="width:31%">客户</label>
                            <el-input v-model="salesIssueData.customerName.customerName" size="small" class="el-inputs" placeholder="请选择" disabled></el-input>
                            <span class='comicon' style="right: 8px; top: 2px;" @click="customerTips"><i class="el-icon-search" ></i></span>
                            <!-- <el-select clearable  size="small" class="el-select"  v-model="salesIssueData.customerId" placeholder="请选择" >
                            <el-option v-for="item in salesIssueData.customerList"
                                        :key="item.customerId"  
                                        :label="item.customerName"
                                        :value="item.customerId"
                                ></el-option>
                            </el-select> -->
                        </el-col>
                        <el-col :span="5" class="el-col">
                            <label style="width:31%">销售出库单</label>
                            <el-input  class="el-inputs" v-model="salesIssueData.doNo" size="small" :disabled="salesIssueData.doNoDisable" placeholder="请输入"></el-input>
                        </el-col> 
                        <el-col :span="5" class="el-col">
                            <label style="width:31%">出库日期</label>
                            <el-date-picker
                                class="el-input2"
                                v-model="salesIssueData.doDate"
                                type="daterange"
                                size="mini" 
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                :default-time="['00:00:00', '23:59:59']">
                            </el-date-picker>
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
                            <el-input   size="small" v-model="salesIssueData.createdName" class="el-inputs" placeholder="请输入"></el-input>
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
                        <el-table-column type="index" width="50" label="序号">       
                        </el-table-column>
                        <el-table-column prop="custName" label="客户" width="120px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="contractCode" label="销售合同号" width="120px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="extContractCode" label="外部合同号" width="120px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="contractRowno" label="合同行号" width="120px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="doNo" label="销售出库单号" width="120px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="rowno" label="销售出库单行号" width="120px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="goodsCode" label="物料编号" width="110px"  :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="goodsName" label="物料名称" width="110px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="goodsCategoryName" label="物料大类" width="120px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="goodsSpec" label="物料规格" width="110px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="itemUnitName" label="基础单位" width="110px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="batchCode" label="批次号" width="110px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="packageCode" label="捆包号" width="110px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="canReturnQty" label="数量" width="110px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="secUnitName" label="第二单位" width="110px" :show-overflow-tooltip="true" >
                        </el-table-column>
                        <el-table-column prop="secQty" label="第二数量" width="80px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="currencyName" label="币种" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="originPrice" label="单价" width="80px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="originAmt" label="含税金额" width="80px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="remark" label="备注" width="120px" :show-overflow-tooltip="true">
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
               <!--选择仓库-->
            <warehouse-select v-if="warehouseShow" :tipShow='warehouseShow'  @warehouseCancle="warehouseCancle" @warehouseSure="warehouseSure">
            </warehouse-select>
        </el-dialog>
    </div>
</template>
<script>
import { mapState } from "vuex";
import sApi from "@/api/salesManage/salesManage";
import calculation from "@/assets/js/calculation";
import customerSelect from "@/components/customerSelect.vue";
import warehouseSelect from "@/components/warehouseSelect.vue";
import uploadApi from "@/api/component";
export default {
    name:"salesReturnOrderEdit",
    data(){
        return{
            errorKey: [],
            //销售出库单
            salesIssueData:{
                salesIssueDataShow: true, //销售出库单弹窗
                doNo:"",//销售出库单
                createdName:"",//创建人
                createdTime:[],//创建日期
                doDate: [], //出库日期
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
                custId:'',//客户
                customerName:{},
                //customerList:[],//客户
                warehouseName:{},
                warehouseCode:'',
                index:'',//选中

                
            },
            //基本信息
            basicData:{
                companyName:'',//公司名
                companyCode:'',//公司代码
                companyId:'',
                branchName:'',//部门
                branchCode:'',//部门代码
                branchId:'',
                staffName:'',//业务员
                empId:'',//业务员id
                bizPersonCode:'',//业务员代码
                currencyName:'', //业务币别
                currencyId:'',//业务币种id
                toCurrencyCode:'',//本位币
                currencyCode:'',//业务币别代码
                customerName:'',//客户
                custId:'',//客户id
                custCode:'',
                warehouseName:'',//仓库
                warehouseCode:'',//仓库代码
                undoStatus:`10580005`,//状态 //创建的时候默认为保存
                undoStatusList:[],
                baseCurrencyRate:'',//本位币汇率
                rmbCurrencyRate:'',//人民币汇率
                undoType:`10590005`,//退货类型  
                undoTypeList:[],//退货类型下拉列表
                unReason:'',//原因  
                undoDate:'',//退货时间
                doNo:'',//出库单号
                undoCode:'',//退货单号
                undoId:'',//退货单id
                sumCostAmt:'',//成本总金额
                sumQty:'',//总数量
                sumAmt:'',//业务币总金额
                payAmtTotalRmb:'',//人民币总金额
                tableData:[],//商品明细列表数据
                selectioned:'',//选中  列表选中
                tableDataIndex:'',//表格当前选中的下标
                flag:false,//判断数量
                version:'',//版本号
                contractCode:'',//销售合同号
                extContractCode:'',//外部合同号
                pickerOptions:{},//退货时间范围
                contractType:'',//销售类型
                companyCurrencyCode:'',//公司本位币 
            },
             //系统信息
            systemData:{
                createdTime:'',//创建时间
                createdName:'',//创建人
                updatedName:'',//修改人
                updatedTime:'',//修改时间
            },
            activeName:"one",//切换tabs
            type:'',//页面类型，1创建 修改
            loading:false,
            show:true,//显示一行
            customerShow:false,//客户
            warehouseShow:false,//仓库
            doNoDisable:false,//销售出库弹窗，销售出库单能否编辑
            currencyList:[],//币种列表
            uploadList: {
                tableList: [],
                fileList: [], //文件
                sysid: "ac3284d42dcdbc883c3b6598c4fa5e2", //文件上传的参数
                uploadHeaders: { "content-Type": "multipart/form-data" } //文件上传的格式
            },
        }
    },
    created(){
        this.selectCurrency();//获取币种列表
        this.type=this.$route.query.type;
        if(this.type==1){
            // this.getWarehouseList();//获取仓库
            this.getCompanyList();//获取公司
            // this.getCustomerList();//获取客户
            this.salesIssueData.doNo='';
            this.basicData.tableData=[];
            this.initSalesIssueData();//获取销售出库单
            this.salesIssueData.salesIssueDataShow=true;
        }else{
            this.initData();//获取详情
            this.salesIssueData.salesIssueDataShow=false;
        } 
        this.getUndoStatus();//状态
        this.getUndoType();//退货类型
    },
    methods:{
         //查询条件显示一行
        inputShow(){
            this.show=this.$dialogShowOne(this.show);
        },
         //查询详情
        initData(){
            this.loading=true;
            let data={
               undoId:localStorage.getItem("undoId")
            }
            sApi.checkSaleUndoOrder4Update(data).then(res=>{
                if(res.code="success"){
                    let data=res.data;
                    this.basicData.companyName=data.companyName;//公司名
                    this.basicData.companyCode=data.companyCode;
                    this.basicData.companyId=data.companyId;
                    this.accountPeriod(data.companyId);
                    this.basicData.branchName=data.orgName;//部门
                    this.basicData.branchCode=data.orgCode;
                    this.basicData.branchId=data.branchId;
                    this.basicData.staffName=data.bizPersonName;//员工
                    this.basicData.empId=data.bizPersonId;//员工
                    this.basicData.bizPersonCode=data.bizPersonCode;
                    this.basicData.currencyCode=data.currencyCode;//币种
                    this.selectCurrencyName();
                    this.basicData.rmbCurrencyRate=data.rmbCurrencyRate;//人民币汇率
                    this.basicData.baseCurrencyRate=data.baseCurrencyRate;//本位币汇率
                    this.getBaseParities();
                    this.basicData.unReason=data.unReason;//原因
                    this.basicData.undoType=""+data.undoType;//类型
                    this.basicData.undoStatus=""+data.undoStatus;//状态
                    this.basicData.undoCode=data.undoCode;//退货单号
                    this.basicData.undoId=data.undoId;//退货单id
                    this.basicData.undoDate=this.$timeFun(data.undoDate,true);//退货时间
                    this.basicData.customerName=data.custName;//客户
                    this.basicData.custId=data.custId;
                    this.basicData.custCode=data.custCode;
                    this.basicData.warehouseName=data.warehouseName;//仓库
                    this.basicData.warehouseCode=data.warehouseCode;
                    this.basicData.version=data.version;//版本号
                    this.basicData.sumCostAmt=data.sumCostAmt;//成本总金额
                    this.basicData.sumQty=data.sumQty;//总数量
                    this.basicData.extContractCode=data.extContractCode;//外部合同号
                    this.basicData.contractCode=data.contractCode;//销售合同号
                    this.basicData.sumAmt=data.sumAmt;//业务币总金额
                    this.basicData.payAmtTotalRmb=data.payAmtTotalRmb;//人民币总金额
                    this.systemData.createdName=data.createdName;//创建人
                    this.systemData.createdTime=this.$timeFun(data.createdTime,true);//创建时间
                    this.systemData.updatedName=data.updatedName;//创建人
                    this.systemData.updatedTime=this.$timeFun(data.updatedTime,true);//创建时间
                    let list=data.itemsList;
                    if(list.length){
                        this.basicData.doNo=list[0].doNo;//出库单号
                        this.salesIssueData.doNo=list[0].doNo;//给销售出库单查询条件赋值 
                        let that=this;  
                        list.forEach(element => {
                          
                             //销售不含税金额
                            element.originNoAmt =  this.$unorginAmtCh(element.originAmt, element.taxAmt);
                               //本币不含税金额 baseNoAmt
                            element.baseNoAmt = this.$tybbnhsje(element.baseAmt,element.baseTax);
                            //element.taxAmt = this.$taxAmt(element.originAmt, element.originNoAmt); 
                            element.costPrice=this.$orginPrice(element.stockoutAmt,element.itemQty);//计算成本单价
                        });
                    }
                    
                    this.basicData.tableData=list;
                    this.loading=false;
                    this.selectFileList(data.undoId);

                }else{
                    this.$openWarning(res.message);
                    this.loading=false;
                }
            }).catch();
        },
        //查询附件
    selectFileList(id) {
      let data = {
        businessId: id
      };
      uploadApi
        .selectFileList(data)
        .then(res => {
          if (res.code == "success") {
            this.uploadList.tableList = res.data;
            this.uploadList.tableList.forEach(element => {
              element.createdTime = this.$timeFun(element.createdTime, true);
            });
          } else {
            this.$openWarning(res.message);
          }
        })
        .catch();
    },
    //附件删除
    delFile(index, row) {
      this.$confirm("是否确定删除？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //没有保存
          if (row.accessoryId) {
            let data = {
              accessoryId: row.accessoryId,
              version: row.version
            };
            uploadApi
              .delFif(data)
              .then(res => {
                if (res.code == "success") {
                  this.$openSuccess(res.message);
                  this.uploadList.tableList.splice(index, 1);
                } else {
                  this.$openWarning(res.message);
                }
              })
              .catch();
          } else {
            this.uploadList.tableList.splice(index, 1);
            this.$openSuccess("删除成功");
          }
        })
        .catch();
    },
    //预览
    download(row) {
      window.open(row.fileServerAddress);
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
          let fileData = res.data;
          let obj = {
            fileOldName: fileData.oldFilename,
            fileNewName: fileData.newFilename,
            fileType: "", //文件类型
            fileSuffix: fileData.fileExt, //文件扩展名
            // fileAbsolutePath:"",//文件绝对路径
            // fileRelativePaths:"",//文件相对路径
            fileServerAddress: fileData.filePath, //文件服务器地址
            createdTime: that.$nowDate(),
            isInactive: 0, //启用，禁用
            createdName: sessionStorage.getItem("userName") || "admin"
          };
          _this.tableList.unshift(obj);
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
    handleRemove(file, fileList) {
      //  console.log(file, fileList);
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
                        this.basicData.currencyName =res.data.currencyName;
                        
                    }
                }
            }).catch();
        },
        //销售出库单列表
        initSalesIssueData(){
            this.salesIssueData.loading=true;
            let salesIssueData=this.salesIssueData;
            if(salesIssueData.companyId){
                var companyId=salesIssueData.companyId;
            }
            if(salesIssueData.branchId){
                var orgId=salesIssueData.branchId;
            }
            if(salesIssueData.warehouseCode){
                var warehouseCode=salesIssueData.warehouseCode;
            }
            if(salesIssueData.custId){
                var custId=salesIssueData.custId;
            }
            if(salesIssueData.doNo){
                var doNo=this.salesIssueData.doNo;
            }
            if(salesIssueData.createdTime && salesIssueData.createdTime.length){
                var createdTimeBegin=this.salesIssueData.createdTime[0];
                var createdTimeEnd=this.salesIssueData.createdTime[1];
            }
            if(salesIssueData.createdName){
                var createdName=this.salesIssueData.createdName;
            }
            if(salesIssueData.doDate && salesIssueData.doDate.length){
                var  doDateBegain=this.salesIssueData.doDate[0];//出库日期
                var  doDateEnd=this.salesIssueData.doDate[1];
            }
            let data={
                pageSize:this.salesIssueData.pageSize,
                pageNum:this.salesIssueData.pageNum,
                companyId:companyId,//公司
                orgId:orgId,//部门
                custId:custId,//客户
                warehouseCode:warehouseCode,//仓库
                createdTimeBegain:createdTimeBegin,//创建日期
                createdTimeEnd:createdTimeEnd,//
                doNo:doNo,//销售出库单号
                createdName:createdName,//创建人
                doDateBegain:doDateBegain,//出库日期
                doDateEnd:doDateEnd,
                doStatus:10450025,//状态，查询已发货状态的数据
                
            }
            sApi.selectListExtDoBatch(data).then(res=>{
                if(res.code="success"){
                    this.salesIssueData.tableData=res.data.list;
                    this.salesIssueData.total=res.data.total;
                    if(this.type!=2){
                        if(this.salesIssueData.tableData){
                            this.salesIssueData.tableData.forEach(el=>{
                                //el.contractRowno=el.odDo.contractRowno;//合同行号
                                el.custName=el.odDo.custName;//客户
                                el.extContractCode=el.odDo.extContractCode;//外部合同号
                                el.contractCode=el.odDo.contractCode;//合同号
                                
                            })
                        }
                    }
                    //默认选中已有的数据
                    if (this.basicData.tableData.length) {
                        let list = [];
                        list = this.salesIssueData.tableData.filter(dataXs => {
                            let get = this.basicData.tableData.some(dataWl => {
                                return dataWl.doBatchId == dataXs.doBatchId;
                            });
                            return !get;
                        });
                        this.salesIssueData.tableData = list; 
                        this.salesIssueData.total=this.salesIssueData.tableData.length;
                    }
                    this.salesIssueData.tableData.forEach(e=>{
                        this.currencyList.forEach(c=>{
                            if(e.currencyCode==c.currencyCode){
                                e.currencyName=c.currencyName;
                            }
                        })
                    });
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
        //保存、创建销售退货单
        saveSaleOutboundOrder(){
            let basicData = this.basicData;
            if(basicData.flag){
                 this.$openWarning("退货单数量不能大于可退数量");
                 return;
            }
            this.errorKey = [];
            let basicKey = ['companyName', 'branchName', 'staffName', 'warehouseCode', 'customerName', 'currencyCode', 'baseCurrencyRate', 'rmbCurrencyRate', 'undoType', 'undoDate'];
            basicKey.forEach(item => {
                if(!basicData[item]) {
                    this.errorKey.push(item);
                }
            })
            if(this.errorKey.length > 0) {
                this.$openWarning("请将必填项补充完整！");
                return false;
            }
            if(basicData.tableData.length==0){
                this.$openWarning("商品明细不能为空");
                return;
            }  
            for (const it of basicData.tableData) {
                if(it.secQty==="" || it.secQty===null){
                    this.$openWarning("第二数量不能为空");
                    return;
                }
            }       
            let data={
                companyCode:basicData.companyCode,//公司
                companyName:basicData.companyName,//公司
                companyId:basicData.companyId,
                orgCode:basicData.branchCode,
                orgName:basicData.branchName,//部门
                orgId:basicData.branchId,
                bizPersonCode:basicData.bizPersonCode,
                bizPersonName:basicData.staffName,//员工
                bizPersonId:basicData.empId,
                undoCode: basicData.undoCode, //退货单号
                undoId:basicData.undoId,//退货单id
                doNo:basicData.doNo,//销售出库单
                warehouseCode: basicData.warehouseCode, //仓库代码
                warehouseName: basicData.warehouseName, //仓库代码
                undoDate: basicData.undoDate, //退货日期
                custId: basicData.custId, //销售客户
                custCode:basicData.custCode,
                custName: basicData.customerName,
                currencyCode: basicData.currencyCode, //业务币别
                baseCurrencyRate: basicData.baseCurrencyRate, //本位币汇率
                rmbCurrencyRate:basicData.rmbCurrencyRate,//人民币回来汇率
                extContractCode:basicData.extContractCode,//外部合同号
                contractCode:basicData.contractCode,//销售合同号
                sumQty:basicData.sumQty,//总数量
                sumCostAmt:basicData.sumCostAmt,//成本总额
                sumAmt:basicData.sumAmt,//业务币总金额
                payAmtTotalRmb:basicData.payAmtTotalRmb,//人民币总金额
                undoStatus: basicData.undoStatus, //状态
                undoType: basicData.undoType, //退货类型
                contractType:basicData.contractType,//销售类型
                unReason:basicData.unReason,//退货原因
                itemsList:basicData.tableData, //商品明细
                version:basicData.version,//版本号
                sysSystemAccessoryList: this.uploadList.tableList, //附件上传
            }
            let api='';
            if(this.type==1){ 
                api=sApi.insertSaleUndoOrder;
            }else{
                api=sApi.updateUndoOrder;
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
                    path:'/index/salesManage/salesReturnOrder', //跳转的路径    
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
        //重置
        resetData(){
            this.salesIssueData.pageSize=10,
            this.salesIssueData.pageNum=1,
            this.salesIssueData.companyId='';
            this.salesIssueData.branchId='';
            this.salesIssueData.custId='';
            this.salesIssueData.customerName={};
            this.salesIssueData.warehouseCode='';
            this.salesIssueData.warehouseName={};
            this.salesIssueData.doDate=[];
            this.salesIssueData.doNo='';
            this.salesIssueData.createdName='';
            this.salesIssueData.createdTime=[];     
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
        },
        qtyChange(row,index) {
            if(this.basicData.tableData.length){
                this.basicData.tableData[index].itemQty=this.$filterPriceNum(row.itemQty, 4);
            }
            this.basicData.sumQty=0;//总数量
            this.basicData.sumCostAmt=0;//成本总金额
            let that=this;
            row.stockoutAmt=this.$orginAmt(row.costPrice,row.itemQty);//成本金额=成本单价*数量
            this.basicData.tableData.forEach(e=>{
                that.basicData.sumQty=calculation.accAdd(that.basicData.sumQty,e.itemQty);
                this.basicData.sumCostAmt=that.$calculationAmount(this.basicData.sumCostAmt,e.stockoutAmt,"add");//成本总额
            });
            this.handleOrginPrice(row, index);
            this.taxAmtCh(row, index);
            if(row.itemQty>row.canReturnQty){
                this.$openWarning("退货单数量不能大于可退数量");
                this.basicData.flag=true;
            }else{
                this.basicData.flag=false;
            }
        },
        //增值税率
        // 业务币含税单价
        // 业务币含税单价*数量=业务币含税金额
        //业务币不含税单价=业务币含税单价÷（+增值税率）
        // ,本币含税单价=业务币含税单价*汇率 //
        handleOrginPrice(e,index){ 
            let currencyRate=this.basicData.baseCurrencyRate;
            let rmbCurrencyRate=this.basicData.rmbCurrencyRate;
            let row = e;
            if(this.basicData.tableData.length){
              this.basicData.tableData[index].originPrice=this.$filterPriceNum(row.originPrice, 6);
            }
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
            row.basePrice = this.$bbhsdj(row.originPrice,currencyRate);
            //本币不含税单价 baseNoPrice
            row.baseNoPrice = this.$bbnhsdj(row.originNoPrice,currencyRate);
            //本币含税金额 baseAmt
            row.baseAmt = this.$bbhsje(row.originAmt,currencyRate);
           
            //本币增值税额 baseTax
            row.baseTax = this.$bbzzse(row.taxAmt,currencyRate);
               //本币不含税金额 baseNoAmt
            row.baseNoAmt = this.$tybbnhsje(row.baseAmt,row.baseTax);
            this.basicData.payAmtTotalRmb=0;//人民币总金额
            this.basicData.sumAmt=0;//业务币总金额
            let that=this;
            for(let i=0;i<this.basicData.tableData.length;i++){
                let e=this.basicData.tableData[i];
                that.basicData.sumAmt=that.$calculationAmount(that.basicData.sumAmt,e.originAmt,"add"); 
            }
            this.basicData.payAmtTotalRmb=that.$calculationAmount(that.basicData.sumAmt,rmbCurrencyRate,"mul");
            this.$set(this.basicData.tableData, index, row);
        },
         //销售含税金额变动
        originAmtCh(e, index) {
            let currencyRate=this.basicData.baseCurrencyRate;
            let rmbCurrencyRate=this.basicData.rmbCurrencyRate;
            let row = e;
            if(this.basicData.tableData.length){
              this.basicData.tableData[index].originAmt=this.$filterPriceNum(row.originAmt,2);
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
            row.basePrice = this.$bbhsdj(row.originPrice,currencyRate);
            //本币不含税单价 baseNoPrice
            row.baseNoPrice = this.$bbnhsdj(row.originNoPrice,currencyRate);
             //本币含税金额 baseAmt
            row.baseAmt = this.$bbhsje(row.originAmt, currencyRate);
            //本币增值税额 baseTax
            row.baseTax = this.$bbzzse(row.taxAmt,currencyRate);
               //本币不含税金额 baseNoAmt
            row.baseNoAmt = this.$tybbnhsje(row.baseAmt,row.baseTax);
            this.basicData.payAmtTotalRmb=0;//人民币总金额
            this.basicData.sumAmt=0;//业务币总金额
            let that=this;
            this.basicData.tableData.forEach(e=>{
                that.basicData.sumAmt=that.$calculationAmount(that.basicData.sumAmt,e.originAmt,"add");     
            })
            that.basicData.payAmtTotalRmb=that.$calculationAmount(that.basicData.sumAmt,rmbCurrencyRate,"mul");
            this.$set(this.basicData.tableData, index, row);
        },
         //税率变动
        taxRateCh(e, index) {
            let currencyRate=this.basicData.baseCurrencyRate;
            let row = e;
            if(this.basicData.tableData.length){
                this.basicData.tableData[index].taxRate=(row.taxRate+'').replace(/[^\d]/g, '') * 1;
            }
            //销售不含税金额
            row.originNoAmt = this.$unorginAmt(row.originAmt, row.taxRate);
            //销售不含税单价
            row.originNoPrice = this.$unorginPrice(row.originPrice, row.taxRate);
            //增值税额
            row.taxAmt = this.$taxAmt(row.originAmt, row.originNoAmt);
            //本币计算 对应业务币*汇率
            
            //本币不含税单价 baseNoPrice
            row.baseNoPrice = this.$bbnhsdj(row.originNoPrice,currencyRate);
            //本币增值税额 baseTax
            row.baseTax = this.$bbzzse(row.taxAmt, currencyRate);
               //本币不含税金额 baseNoAmt
            row.baseNoAmt = this.$tybbnhsje(row.baseAmt,row.baseTax);
            this.$set(this.basicData.tableData, index, row);
        },
        //业务币税额变动
        taxAmtCh(e, index) {
            let currencyRate=this.basicData.baseCurrencyRate;
            let row = e;
            if(this.basicData.tableData.length){
              this.basicData.tableData[index].taxAmt=this.$filterPriceNum(row.taxAmt,2);
            }
            //销售不含税金额  销售不含税金额=销售含税金额-税额
            row.originNoAmt = this.$unorginAmtCh(row.originAmt, row.taxAmt);
            //销售不含税单价 销售不含税金额=销售不含税金额 / 数量
            row.originNoPrice = this.$unPrice(row.originNoAmt, row.itemQty);
            //本币计算 对应业务币*汇率
           
            //本币不含税单价 baseNoPrice
            row.baseNoPrice = this.$bbnhsdj(row.originNoPrice,currencyRate);
              //本币增值税额 baseTax
            row.baseTax = this.$bbzzse(row.taxAmt, currencyRate);
               //本币不含税金额 baseNoAmt
            row.baseNoAmt = this.$tybbnhsje(row.baseAmt,row.baseTax);
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
               
                //本币增值税额 baseTax
                row.baseTax = this.$bbzzse(row.taxAmt,currencyRate);
                   //本币不含税金额 baseNoAmt
                row.baseNoAmt = this.$tybbnhsje(row.baseAmt,row.baseTax);
            }
            this.basicData.tableData=list;
        },
         //修改人民币汇率
        handleRmbCurrencyRate(rmbCurrencyRate){
            this.basicData.rmbCurrencyRate=this.$filterPriceNum(rmbCurrencyRate,8);
            this.basicData.payAmtTotalRmb=this.$calculationAmount(this.basicData.sumAmt,rmbCurrencyRate,"mul");
        },
           //仓库弹窗
        warehouseTips(){
            this.warehouseShow = true;
        },
         //仓库弹窗关闭
        warehouseCancle() {
            this.warehouseShow = false;
        },
        //仓库弹窗确定获取数据
        warehouseSure(e) {
            this.warehouseShow = false;
            this.salesIssueData.warehouseName = e;
            this.salesIssueData.warehouseCode=e.warehouseCode;
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
            console.log(e);
            let data={
                companyId:this.salesIssueData.companyId
            }
            sApi.selectBbBranch(data).then(res => {
				this.salesIssueData.branchList = res.data;
            }).catch(); 
        },
        //获取客户
        // getCustomerList(){
        //     let data={};
        //    sApi.selectCustomerList(data).then(res => {
		// 		this.salesIssueData.customerList = res.data;
        //     }).catch(); 
        // },
        //状态1058
         getUndoStatus(){
            let data={
                dictNo:1058
            }
           sApi.selectDoStatusList(data).then(res => {
				this.basicData.undoStatusList = res.data;
            }).catch(); 
        },
        //获取退货类型
        getUndoType(){
            let data={
                dictNo:1059
            }
           sApi.selectDoStatusList(data).then(res => {
				this.basicData.undoTypeList = res.data;
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
                undoId:this.basicData.undoId,
                version:this.basicData.version,
                itemsList:list
            }
            if(this.type==2 && list[0].undoItemsId){
                   
                this.$confirm("是否确定删除?", "删除提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    sApi.deleteUndoItems(data).then(res => {
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
                            this.qtyChange(item,index);
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
                }).catch(); 
            }else{
                this.salesIssueData.tableData.push( this.basicData.tableData[this.basicData.tableDataIndex]);
                this.basicData.tableData.splice(this.basicData.tableDataIndex, 1);
                this.basicData.tableData.forEach((item,index)=>{
                    this.qtyChange(item,index);
                })
            // 删除完数据之后清除勾选框
            this.$refs.table.clearSelection();
            }
            
        },
        //添加行
        addRow(){
            this.getCompanyList();//获取公司
            // this.getCustomerList();//获取客户
            this.initSalesIssueData();//获取销售出库单  
            if(this.basicData.tableData.length==0){
                this.salesIssueData.doNoDisable=false;
            }else{
                this.salesIssueData.doNoDisable=true;
            }
            this.salesIssueData.salesIssueDataShow=true;
           
        },
        //点击确定，关闭弹窗
        salesIssueSure(){
            this.salesIssueData.salesIssueDataShow=false;
            localStorage.removeItem("undoId");
            if (this.salesIssueData.selectioned.length==0) {//判断是否选中
                this.$message({
                    duration: 1000,
                    showClose: true,
                    message: '未选择数据',
                    type: 'warning'
                });
                return;
            }
            let list=this.salesIssueData.selectioned;
            let flag=false;
             for(let i=0; i<list.length-1; i++){
                for(let j=i+1; j<list.length; j++){
                    if(list[j].doNo!=list[i].doNo){
                        flag=true;   
                    }
                }
            }
            if(flag){
                this.$openWarning("请选择同一个出库单的数据");
                return;
            }
            this.salesIssueData.doNo=list[0].doNo;
            if(this.basicData.tableData.length>0){
                list.forEach((li,index)=>{//没有重复的数据就追加
                    this.basicData.tableData.push(li);
                });
                this.basicData.tableData.forEach((ba,index)=>{
                    ba.soContractCode=ba.odDo.contractCode;
                    ba.soContractRowno=ba.contractRowno;
                    ba.soExtNo=ba.odDo.extContractCode; 
                    ba.doRowno=ba.rowno;//销售出库单行号
                    ba.rowno=(index+1)*10;
                    this.qtyChange(ba,index);
                    this.handleOrginPrice(ba, index);
                    //ba.costPrice=this.$orginPrice(ba.stockoutAmt,ba.itemQty);//计算成本单价
                })
                this.salesIssueData.salesIssueDataShow=false;
                return; 
                
            }
            //选中的值
            let th=this;
            let that=this.basicData;
            that.tableData=[];//清空原有的值
            that.tableData=list;
            that.doNo=list[0].doNo;
            that.companyName=list[0].odDo.companyName;//公司名
            that.companyCode=list[0].odDo.companyCode;
            that.companyId=list[0].odDo.companyId;
            that.branchName=list[0].odDo.orgName;//部门
            that.branchCode=list[0].odDo.orgCode;
            that.branchId=list[0].odDo.orgId;
            that.staffName=list[0].odDo.bizPersonName;//员工
            that.bizPersonCode=list[0].odDo.bizPersonCode;
            that.empId=list[0].odDo.bizPersonId;
            that.currencyCode=list[0].odDo.currencyCode;//币种  
            this.selectCurrencyName();
            that.warehouseCode=list[0].odDo.warehouseCode;//仓库
            that.warehouseName=list[0].odDo.warehouseName;//仓库
            that.customerName=list[0].odDo.custName;//客户
            that.custId=list[0].odDo.custId;
            that.custCode=list[0].odDo.custCode;
            that.extContractCode=list[0].odDo.extContractCode;//外部合同号
            that.contractCode=list[0].odDo.contractCode;//销售合同号
            that.contractType=list[0].odDo.contractType;//销售类型
            that.baseCurrencyRate=list[0].odDo.currencyRate;
            //that.baseCurrencyRate=list[0].odDo.baseCurrencyRate;
            that.rmbCurrencyRate=list[0].odDo.rmbCurrencyRate;
            that.payAmtTotalRmb=list[0].odDo.payAmtTotalRmb;
            that.tableData.forEach((items,index)=>{
                items.itemQty=items.canReturnQty;//退货数量
                //items.actualQty=items.itemQty;//销售单的数量
                that.sumCostAmt=th.$calculationAmount(that.sumCostAmt,items.stockoutAmt,"add");//成本总额
                //that.sumAmt=th.$calculationAmount(that.sumAmt,items.originAmt,"add");//业务币总金额
                that.sumQty=calculation.accAdd(that.sumQty,items.itemQty);//总数量
                // th.taxRateCh(items, index);
                // th.taxAmtCh(items, index);
                items.doRowno=items.rowno;//销售出库单行号
                items.rowno=(index+1)*10;
                items.soContractCode=items.odDo.contractCode;
                items.soContractRowno=items.contractRowno;
                items.soExtNo=items.odDo.extContractCode; 
                th.qtyChange(items,index);
                th.handleOrginPrice(items, index);
               
                
            });
            this.salesIssueData.salesIssueDataShow=false;
            this.accountPeriod(that.companyId);//月结，查询退货日期范围
            this.getCurrencyCodeByCompanyCode(that.companyCode);
           
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
        //取消
        cancel(){
            this.$router.push({  
                path:'/index/salesManage/salesReturnOrder', //跳转的路径    
            }) 
        },
        //根据公司code查询公司的本位币code
        getCurrencyCodeByCompanyCode(companyCode){
            let data={
                companyCode:companyCode
            }
            sApi.selectBbCompanyBaseVoByCode(data).then(res => {
               if(res.code=="success"){
                    this.basicData.companyCurrencyCode = res.data.currencyCode;
                    //this.getBaseParities();//本位币汇率
               }else{
                   this.$openWarning(res.message);
               }
            }).catch(); 
        },
         ///查询本位币汇率
        getBaseParities(){
            if(!this.basicData.companyCurrencyCode || !this.basicData.currencyCode){
                return;
            }
            let data={
                formCurrencyCode:this.basicData.currencyCode, //原货币  业务币
                toCurrencyCode:this.basicData.companyCurrencyCode,///目标币  本位币 || 人民币
            }
           sApi.getParities(data).then(res => {
               if(res.data==null){
                   this.basicData.baseCurrencyRate = 1;
               }else{
                   this.basicData.baseCurrencyRate = res.data.parities;
               }
               this.handleCurrencyRate(this.basicData.baseCurrencyRate);
            }).catch(); 
        },
        //人民币汇率
        getRmbParities(){
             let data={
               formCurrencyCode:this.basicData.currencyCode, //原货币  业务币
               toCurrencyCode:"CNY",///目标币  本位币 || 人民币
            }
           sApi.getParities(data).then(res => {
               if(res.data==null){
                   this.basicData.rmbCurrencyRate = 1;
               }else{
                   this.basicData.rmbCurrencyRate = res.data.parities;
               }
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
         //单行点击 销售出库单弹窗
        saleRowClick(row) {
            this.salesIssueData.selectioned.push(row);
            this.salesIssueData.index = this.salesIssueData.tableData.indexOf(row);
            this.$refs.multipleTable.toggleRowSelection(row, true);
        },
    },
    components: {
        customerSelect,
        warehouseSelect
    }
  
}
</script>

<style lang="scss" scoped>
  .index .index-div{
      label{
          width: 34%;
      }
  }
.index .index-div .el-input,.index .index-div .el-select{
    width: 66%;
}
.index .index-div .el-col-textarea{
      label{
        width:7.31%;
      }
    }
.index .el-dialog__header .el-dialog__title{
    font-size: 15px;
}
</style>
