<template>
  <div class="warehousingDetails">
    <el-divider></el-divider>
    <div class="button-div">
      <el-button class="query-button"
                 v-if="poId || (blId && type != 0)"
                 @click="addSub()"
                 icon="el-icon-suitcase">保存</el-button>
      <!-- 新增 -->
      <el-button class="query-button"
                 v-if="(type == 0) | (type == 10)"
                 @click="changeSub()"
                 icon="el-icon-suitcase">保存</el-button>
      <!-- 普通修改 -->
      <el-button v-else-if="type == 2"
                 class="query-button"
                 @click="addData()"
                 icon="el-icon-suitcase">发货确认</el-button>
      <!-- 供应商发货 -->
      <el-button v-else-if="type == 1"
                 class="query-button"
                 @click="wvSave()"
                 icon="el-icon-suitcase">提交</el-button>
      <!-- 提交 -->
      <el-button class="query-button"
                 v-if="type == 6"
                 @click="addhouseSub()"
                 icon="el-icon-suitcase">确认入库</el-button>
      <!-- 入库确认 -->
      <el-button @click="goBack"
                 icon="el-icon-close">取消</el-button>
    </div>
    <el-tabs class="el-tabs"
             v-model="activeName2"
             type="card"
             @tab-click="handleClick">
      <el-tab-pane label="基本信息"
                   name="first"
                   :disabled="tabpane">
        <div class="index-div3">
          <el-col :span="5"
                  class="el-col">
            <label>入库单号</label>
            <el-input v-model="formList.wvNo"
                      class="el-inputs"
                      size="small"
                      disabled></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>公司</label>
            <el-select v-model="formList.companyName"
                       @change="companyChange"
                       clearable
                       size="small"
                       class="el-select"
                       disabled>
              <el-option v-for="item in companyList"
                         :key="item.companyId"
                         :label="item.companyName"
                         :value="item.companyCode">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>部门</label>
            <el-select v-model="formList.orgName"
                       @change="branchChange"
                       clearable
                       size="small"
                       class="el-select"
                       disabled>
              <el-option v-for="item in branchList"
                         :key="item.branchCode"
                         :label="item.branchName"
                         :value="item.branchCode">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>业务员</label>
            <el-input v-model="formList.bizPerson"
                      class="el-inputs"
                      size="small"
                      disabled></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>合同类型</label>
            <el-select v-model="formList.poType"
                       size="small"
                       disabled
                       class="el-select">
              <el-option v-for="item in conTypeList"
                         :key="item.dict_key"
                         :label="item.dict_value"
                         :value="item.dict_key">
              </el-option>
            </el-select>
            <!-- 
            <el-input v-model="formList.poType"
                      class="el-inputs"
                      size="small"
                       
                      disabled></el-input> -->
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>供应商</label>
            <el-select v-model="formList.supplierName"
                       @change="supplierChange"
                       clearable
                       size="small"
                       class="el-select"
                       disabled>
              <el-option v-for="(item,index) in supplierList"
                         :key="index+item.supplierCode"
                         :label="item.supplierName"
                         :value="item.supplierId">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="5"
                  class="el-colc">
            <label>单据状态</label>
            <el-select v-model="formList.blStatus"
                       disabled
                       size="small">
              <el-option v-for="item in blStatusList"
                         :key="item.dict_key"
                         :label="item.dict_value"
                         :value="item.dict_key">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="5"
                  class="el-colc  el-col-required">
            <label><span class="must-full">*</span>入库单类型</label>
            <el-select v-model="formList.wvdoStatus"
                       size="small"
                       placeholder=""
                      :class="errorKey.includes('wvdoStatus') ? 'inputRed' : ''"
                       @change="wvhandleChange"
                       :disabled="disabletab || !isCreate">
              <el-option v-for="item in wvStatus"
                         :key="item.dict_key"
                         :label="item.dict_value"
                         :value="item.dict_key">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="5"
                  class="el-col  el-col-required">
            <label><span class="must-full">*</span>仓库</label>
            <el-input v-model="warehouseName.warehouseName"
                      size="small"
                      class="el-inputs"
                      :class="errorKey.includes('warehouseName') ? 'inputRed' : ''"
                      disabled></el-input>
            <span class="comicon"
                  @click="warehouseTips"><i class="el-icon-search"></i></span>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>入库日期</label>
            <el-date-picker v-model="formList.postDate"
                            type="date"
                            class="el-input2"
                            size="small"
                            placeholder="选择日期"
                            :disabled="inwarehouse">
            </el-date-picker>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>业务币币别</label>
            <el-input v-model="formList.currencyName"
                      class="el-inputs"
                      size="small"
                      disabled></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col  el-col-required">
            <label><span class="must-full">*</span>本位币汇率</label>
            <el-input v-model="formList.currencyRate"
                      class="el-inputs"
                      :class="errorKey.includes('currencyRate') ? 'inputRed' : ''"
                      size="small"
                      @input="handleRateChange($event)"
                      placeholder="请输入"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>入库数量</label>
            <el-input v-model="formList.actReceive"
                      class="el-inputs"
                      disabled
                      size="small"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col  el-col-required">
            <label><span class="must-full">*</span>含税金额</label>
            <el-input v-model="formList.wvAmtS"
                      class="el-inputs"
                      :class="errorKey.includes('wvAmtS') ? 'inputRed' : ''"
                      size="small"
                      @change="originPriceCh"
                      disabled></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col  el-col-required">
            <label><span class="must-full">*</span>人民币汇率</label>
            <el-input v-model="formList.rmbCurrencyRate"
                      class="el-inputs"
                      :class="errorKey.includes('rmbCurrencyRate') ? 'inputRed' : ''"
                      @input="handleRmbRateChange($event)"
                      size="small"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col  el-col-required">
            <label><span class="must-full">*</span>人民币金额</label>
            <el-input v-model="formList.payAmtTotalRmb"
                      class="el-inputs"
                      :class="errorKey.includes('payAmtTotalRmb') ? 'inputRed' : ''"
                      size="small"
                      v-input-filter:num2
                      disabled></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-colc">
            <label>完全开票</label>
            <el-select v-model="formList.isBilled"
                       size="small"
                       disabled>
              <el-option v-for="item in isBilledList"
                         :key="item.dict_key"
                         :label="item.dict_value"
                         :value="item.dict_key"
                         :disabled="inwarehouse">
              </el-option>
            </el-select>
          </el-col>

          <el-col :span="5"
                  class="el-colc">
            <label>提货方式</label>
            <el-select v-model="formList.pickupType"
                       size="small"
                       placeholder=""
                       disabled>
              <el-option v-for="item in pickupstatus"
                         :key="item.dict_key"
                         :label="item.dict_value"
                         :value="item.dict_key"
                         :disabled="inwarehouse">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="5"
                  class="el-colc">
            <label>是否退货冲销</label>
             <el-input v-model="formList.unwvReverse"
                      class="el-inputs"
                      size="small"
                      disabled></el-input> 
          </el-col>
          <el-col :span="5"
                  class="el-colc">
            <label>船名</label>
             <el-input v-model="formList.shipName"
                      class="el-inputs"
                      size="small"
                      ></el-input> 
          </el-col>
          <div class="remark-style">
            <label>备注 </label>
            <el-input type="textarea"
                      autosize
                      v-model="formList.remark"
                      size="small"
                      class="el-textarea"
                      :disabled="inwarehouse"
                      resize="none"></el-input>
            <div class="empty-class"></div>
          </div>
        </div>
        <div class="button-div">
          <el-button class="addBut"
                     :disabled="isAllowAddDele"
                     @click="addRow"
                     icon="el-icon-plus">新增行</el-button>
          <el-button class="addBut"
                     :disabled="isAllowAddDele"
                     @click="delData"
                     icon="el-icon-minus">删除行</el-button>
          <!-- <el-button class="addBut"
                     @click="debleData"
                     icon="el-icon-document-copy">复制</el-button> -->
        </div>
        <div class="el-table-div">
          <el-table border
                    center
                    show-summary
                    :summary-method="getSummaries"
                    max-height="370"
                    :data="base.tableData"
                    class="el-table"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @row-dblclick="tableDataBdlclick"
                    @row-click="Bdlclick"
                    ref="tableBase"
                    @select-all="dialogCheckbase"
                    @select="selectRow"
                    v-loading="loading">
            <el-table-column type="selection"
                             width="50"
                             align="center"
                             show-overflow-tooltip></el-table-column>
            <el-table-column label="行号"
                             prop="wvRowno"
                             width="60"
                             align="center"
                             show-overflow-tooltip></el-table-column>
            <el-table-column prop="erpPoNo"
                             label="采购合同号"
                             width="120"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="poRowno"
                             label="采购合同行号"
                             width="80"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="extPoNo"
                             label="外部合同号"
                             width="120"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="blNo"
                             :disabled="inTradeStatus"
                             label="提单号"
                             width="80"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="blRowno"
                             label="提单行号"
                             width="100"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="物料编号"
                             width="100"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            placeholder="请输入内容"
                            v-model="scope.row.goodsCode"
                            :disabled="inwarehouse"></el-input>
                  <span class="comicon2"
                        @click="matterTips"><i class="el-icon-search"></i></span>
                </div>
                <div v-else>
                  {{ scope.row.goodsCode }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="goodsName"
                             label="物料名称"
                             width="100"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="goodsCategoryName"
                             label="物料大类"
                             width="100"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="goodsSpec"
                             label="物料规格"
                             width="100"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <!-- <el-table-column prop="gwBoxNo"
                             label="海关编码"
                             width="100"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            placeholder="请输入内容"
                            v-model="scope.row.gwBoxNo"
                            :disabled="inwarehouse"></el-input>
                </div>
                <div v-else>
                  {{ scope.row.gwBoxNo }}
                </div>
              </template>
            </el-table-column> -->
            <el-table-column prop="itemUnitName"
                             label="基础单位"
                             width="100"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="应收数量"
                             prop="shouldReceive"
                             width="100"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            placeholder="请输入内容"
                            v-model="scope.row.shouldReceive"
                            @input="handleShouldRecvChange(scope)"
                            :disabled="disableSelect"></el-input>
                </div>
                <div v-else>
                  {{ scope.row.shouldReceive }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="实收数量"
                             prop="actReceive"
                             width="100"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            placeholder="请输入内容"
                            @input="handleActRcvChange(scope)"
                            v-model="scope.row.actReceive"
                            :disabled="isOnWayOrder"></el-input>
                </div>
                <div v-else>
                  {{ scope.row.actReceive }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="secUnitName"
                             label="第二单位"
                             width="100"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="shouldReceiveSec"
                             label="第二单位应收数量"
                             width="150"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            placeholder="请输入内容"
                            @input="shouldReceiveSecChange(scope.row,scope.$index)"
                            v-model="scope.row.shouldReceiveSec"
                            :disabled="disableSelect"
                            ></el-input>
                </div>
                <div v-else>
                  {{ scope.row.shouldReceiveSec }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="secQty"
                             label="第二单位实收数量"
                             width="150"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            placeholder="请输入内容"
                            @input="handleSecQtyChange(scope)"
                            v-model="scope.row.secQty"
                            :disabled="isOnWayOrder"></el-input>
                </div>
                <div v-else>
                  {{ scope.row.secQty }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="批次号"
                             width="120"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            placeholder="请输入内容"
                            style="width:80%"
                            v-model="scope.row.batchCode"></el-input>
                  <!-- <span class="comicon2"
                        @click="batchCodeTips">
                  </span> -->
                  <!-- <i class="el-icon-search"
                     @click="batchCodeTips"></i> -->
                  <i v-if="scope.row.matterNoIconControl"
                     style="cursor:pointer;line-height:27px"
                     @click="showSearchIcon(scope)"
                     slot="suffix"
                     class="el-input__icon el-icon-circle-close"></i>
                  <i v-else
                     style="cursor:pointer;line-height:27px"
                     @click="batchCodeTips"
                     slot="suffix"
                     class="el-input__icon el-icon-search"></i>
                </div>
                <div v-else>
                  {{ scope.row.batchCode }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="packageCode"
                             label="捆包号"
                             width="100"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            placeholder="请输入内容"
                            v-model="scope.row.packageCode"
                            :disabled="scope.row.isTypeFour"></el-input>
                </div>
                <div v-else>
                  {{ scope.row.packageCode }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="originPrice"
                             label="业务币含税单价"
                             width="120"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            placeholder="请输入内容"
                            v-model="scope.row.originPrice"
                            :disabled="isTypeFour"
                            @input="handleOriginPrice(scope)"></el-input>
                </div>
                <div v-else>
                  {{ scope.row.originPrice }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="originAmtVat"
                             label="业务币含税金额"
                             width="120"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            placeholder="请输入内容"
                            :disabled="isTypeFour"
                            v-model="scope.row.originAmtVat"
                            @input="handleOriginAmtChange(scope)"></el-input>
                </div>
                <div v-else>
                  {{ scope.row.originAmtVat }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="unorginAmt"
                             label="业务币不含税金额"
                             width="120"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="增值税率%"
                             width="100">
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            placeholder="请输入内容"
                            v-model="scope.row.taxRate"
                            :disabled="isTypeFour || inwarehouse"
                            @input="handleTaxRateChange(scope)"></el-input>
                </div>
                <div v-else>
                  {{ scope.row.taxRate }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="业务币增值税额"
                             prop="taxAmt"
                             width="120"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            placeholder="请输入内容"
                            v-model="scope.row.taxAmt"
                            :disabled="isTypeFour || inwarehouse"
                            @input="handleTaxAmtChange(scope)"></el-input>
                </div>
                <div v-else>
                  {{ scope.row.taxAmt }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="basePrice"
                             label="本币含税单价"
                             width="120"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="baseAmt"
                             label="本币含税金额"
                             width="120"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="baseNoAmt"
                             label="本币不含税金额"
                             width="120"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="baseTax"
                             label="本币增值税额"
                             width="120"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="projectName"
                             label="项目号"
                             width="100"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="备注"
                             width="100"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            placeholder="请输入内容"
                            v-model="scope.row.remark"
                            :disabled="inwarehouse"></el-input>
                </div>
                <div v-else>
                  {{ scope.row.remark }}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 创建弹窗 -->
        <warehousing-AddRow v-if="warehousingAddRowShow"
                            :tipShow="warehousingAddRowShow"
                            :externalPoNo="this.formList.externalPoNo || this.formList.extCode"
                            @warehousingAddRowCancle="warehousingAddRowCancle"
                            @warehousingAddRowSure="warehousingAddRowSure"></warehousing-AddRow>
        <!--选择仓库-->
        <warehouse-select v-if="warehouseShow"
                          :tipShow="warehouseShow"
                          :isInactive="0"
                          @warehouseCancle="warehouseCancle"
                          @warehouseSure="warehouseSure">
        </warehouse-select>
        <!--物料编号-->
        <matter-select v-if="base.matterShow"
                       :tipShow="base.matterShow"
                       @matterCancle="matterCancle"
                       @matterSure="matterSure">
        </matter-select>
        <!--批次号弹窗-->
        <batch-Select v-if="batchShow"
                      :tipShow="batchShow"
                      :data="base.tableData[this.base.index]"
                      @batchnumberCancle="batchCancel"
                      @batchnumberSure="batchSure">
        </batch-Select>
      </el-tab-pane>
      <el-tab-pane label="物流信息"
                   name="second"
                   :disabled="inwarehouse">
        <div class="button-div">
          <el-button class="addBut"
                     @click="tableAddRow"
                     icon="el-icon-plus">新增行</el-button>
          <el-button class="addBut"
                     @click="tableRowdelData"
                     icon="el-icon-minus">删除行</el-button>
        </div>
        <div class="el-table-div">
          <el-table border
                    center
                    :data="tableDatas"
                    class="el-table"
                    tooltip-effect="dark"
                    style="width: 100%"
                    max-height="370"
                    ref="table"
                    @row-dblclick="tablelclick"
                    @select-all="dialogCheck"
                    @select="dialogCheck"
                    v-loading="loading">
            <!-- @selection-change="selectRows" -->
            <el-table-column type="selection"
                             width="45"
                             align="center"></el-table-column>
            <el-table-column label="序号"
                             type="index"
                             width="60"
                             align="center"></el-table-column>
            <el-table-column label="运输方式"
                             prop="leaveTransferMode">
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-select clearable
                             size="mini"
                             v-model="scope.row.leaveTransferMode">
                    <el-option v-for="item in transMode"
                               :key="item.dict_code"
                               :label="item.dict_value"
                               :value="item.dict_key"></el-option>
                  </el-select>
                </div>
                <div v-else>
                  <span v-for="(item, index) in transMode"
                        v-show="item.dict_code == scope.row.leaveTransferMode"
                        :key="index">{{ item.dict_value }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="目的地">
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            placeholder="请输入内容"
                            v-model="scope.row.transferTarget"></el-input>
                </div>
                <div v-else>
                  {{ scope.row.transferTarget }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="运输安排人">
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            placeholder="请输入内容"
                            v-model="scope.row.transferPlanMan"></el-input>
                </div>
                <div v-else>
                  {{ scope.row.transferPlanMan }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="承运人">
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            placeholder="请输入内容"
                            v-model="scope.row.transferExcutor"></el-input>
                </div>
                <div v-else>
                  {{ scope.row.transferExcutor }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="承运联系方式">
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            placeholder="请输入内容"
                            v-model="scope.row.transferExcutorTel"></el-input>
                </div>
                <div v-else>
                  {{ scope.row.transferExcutorTel }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="备注">
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            placeholder="请输入内容"
                            v-model="scope.row.transferNote"></el-input>
                </div>
                <div v-else>
                  {{ scope.row.transferNote }}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="打印及附件"
                   name="third"
                   :disabled="tabpane">
        <div class="flex_center">
          <!-- 
          <div class="button-div">
            <el-upload class="upload-demo"
                       :action="action"
                       :before-upload="beforeUpload"
                       :on-success="handleAvatarSuccess"
                       :headers="uploadHeaders"
                       :multiple="false"
                       :show-file-list="false">
              <el-button class="query-button olbutton">附件存档</el-button>
              <span style="vertical-align: middle;">文件上传上限20M</span>
            </el-upload>
          </div> -->

          <div class="button-div">
            <el-upload class="upload-demo"
                       ref="newupload"
                       action="action"
                       :before-upload="beforeUpload"
                       :headers="uploadList.uploadHeaders"
                       :multiple="false"
                       :auto-upload="false"
                       :on-remove="handleRemove"
                       :limit="1"
                       :file-list="uploadList.fileList">
              <el-button slot="trigger"
                         style="color:#3E3F42;"
                         size="small"
                         icon="el-icon-paperclip">选取文件</el-button>
              <el-button style="margin-left: 10px;"
                         size="small"
                         class="addBut"
                         icon="el-icon-upload"
                         @click="submitUpload">上传</el-button>
            </el-upload>
          </div>

        </div>
        <div class="">
          <el-table border
                    center
                    :data="uploadList.tableList"
                    max-height="370"
                    class="el-table">
            <el-table-column label="序号"
                             type="index"
                             show-overflow-tooltip
                             width="55">
            </el-table-column>
            <el-table-column show-overflow-tooltip
                             prop="fileOldName"
                             label="文件名称">
            </el-table-column>
            <!-- <el-table-column show-overflow-tooltip
                             label="类型">
              <template slot-scope="scope">
                <el-input v-model="scope.row.fileType"
                          placeholder="请输入内容"></el-input>
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip
                             label="文档类型名称">
              <template slot-scope="scope">
                <el-input v-model="scope.row.fileSuffix"
                          placeholder="请输入内容"></el-input>
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip
                             prop="signature"
                             label="签章情况">
            </el-table-column> -->
            <el-table-column show-overflow-tooltip
                             prop="createdTime"
                             label="上传时间">
              <template slot-scope="scope">
                {{ scope.row.createdTime | time }}
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip
                             prop="createdBy"
                             label="上传人">
            </el-table-column>
            <el-table-column prop="paritiesDate"
                             label="文件操作">
              <template slot-scope="scope">
                <el-button @click="handleClickE(scope.row)"
                           type="text"
                           size="small">下载</el-button>
                <el-button @click="handleClickDele(scope.row)"
                           type="text"
                           size="small">删除</el-button>
                <!-- <el-button @click="handleClick(scope.row)"
                           type="text"
                           size="small">预览</el-button>
                <el-button @click="handleClick(scope.row)"
                           type="text"
                           size="small">打印</el-button> -->
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="费用预提"
                   name="fifth"
                   :disabled="tabpane">
        <div class="button-div">
          <el-button class="addBut"
                     @click="costAccruedAddRow()"
                     icon="el-icon-plus">添加行</el-button>
          <el-button class="addBut"
                     @click="deleteRow()"
                     icon="el-icon-minus">删除行</el-button>
        </div>
        <div class="el-table-div">
          <el-table :data="costAccruedData.tableData"
                    ref="costTable"
                    tooltip-effect="dark"
                    border
                    max-height="370"
                    stripe
                    style="width: 100%"
                    @select-all="costDialogCheck"
                    @select="costDialogCheck"
                    @selection-change="costHandleChangeTable"
                    @row-dblclick="costDbClick"
                    @row-click="rowClick">
            <el-table-column type="selection"
                             width="45"
                             align="center"
                             show-overflow-tooltip></el-table-column>
            <el-table-column label="序号"
                             type="index"
                             width="60"
                             align="center"
                             show-overflow-tooltip></el-table-column>
            <el-table-column label="供应商"
                             align="center"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <span class="must-full">*</span>
                  <el-input size="mini"
                            placeholder="请输入内容"
                            v-model="scope.row.supplierName"></el-input>
                  <span class="comicon2"
                        @click="supplierTips"><i class="el-icon-search"></i></span>
                </div>
                <div v-else>
                  {{ scope.row.supplierName }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="费用名称"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <span class="must-full">*</span>
                  <el-input size="mini"
                            placeholder="请输入内容"
                            v-model="scope.row.costName"></el-input>
                  <span class="comicon2"
                        @click="costSelectTips"><i class="el-icon-search"></i></span>
                </div>
                <div v-else>
                  {{ scope.row.costName }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="shareDim"
                             label="摊销维度"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <span v-for="item in shareDimList"
                      :key="item.dict_key"
                      v-show="item.dict_key == scope.row.shareDim">
                  {{ item.dict_value }}
                </span>
              </template>
            </el-table-column>
            <el-table-column label="业务币费用金额"
                             align="center"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <span class="must-full">*</span>
                  <el-input size="mini"
                            placeholder="请输入内容"
                            @input="handleAccruedAmtvatChange(scope)"
                            v-model="scope.row.costAmtVat"></el-input>
                </div>
                <div v-else>
                  {{ scope.row.costAmtVat }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="业务币币别"
                             align="center"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <span class="must-full">*</span>
                  <el-input size="mini"
                            placeholder="请输入内容"
                            v-model="scope.row.currencyName"></el-input>
                  <span class="comicon2"
                        @click="coinSelectTips"><i class="el-icon-search"></i></span>
                </div>
                <div v-else>
                  {{ scope.row.currencyName }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="本位币汇率"
                             align="center"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <span class="must-full">*</span>
                  <el-input size="mini"
                            placeholder="请输入内容"
                            v-model="scope.row.baseCurrencyRate"></el-input>
                </div>
                <div v-else>
                  {{ scope.row.baseCurrencyRate }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="税率%"
                             align="center"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <span class="must-full">*</span>
                  <el-input size="mini"
                            placeholder="请输入内容"
                            @input="handleAccruedTaxRateChange(scope)"
                            v-model="scope.row.taxRate"></el-input>
                </div>
                <div v-else>
                  {{ scope.row.taxRate }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="无税金额"
                             prop="costAmt"
                             align="center"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                {{ scope.row.costAmt }}
              </template>
            </el-table-column>
            <el-table-column label="税额"
                             align="center"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <span class="must-full">*</span>
                  <el-input size="mini"
                            placeholder="请输入内容"
                            @input="handleTaxamtRule(scope)"
                            v-model="scope.row.taxAmt"></el-input>
                </div>
                <div v-else>
                  {{ scope.row.taxAmt }}
                </div>
              </template>
            </el-table-column>
             <el-table-column  label="本位币费用金额" prop="costAmtVatBase" align="center" width="120px">
            </el-table-column> 
            <el-table-column  label="无税金额(本位币)" prop="costAmtBase" align="center" width="120px">
            </el-table-column> 
            <el-table-column  label="税额(本位币)" prop="taxAmtBase" align="center" width="120px">
            </el-table-column> 
            <el-table-column label="备注"
                             align="center"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            placeholder="请输入内容"
                            v-model="scope.row.remark"></el-input>
                </div>
                <div v-else>
                  {{ scope.row.remark }}
                </div>
              </template>
            </el-table-column>
          </el-table>
          <!--供应商弹窗-->
          <supplier-select v-if="costAccruedData.supplierShow"
                           :tipShow="costAccruedData.supplierShow"
                           @supplierCancle="supplierCancle"
                           @supplierSure="supplierSure">
          </supplier-select>
          <!-- 费用名称弹窗
          <cost-select
            v-if="costAccruedData.costSelectShow"
            :tipShow="costAccruedData.costSelectShow"
            @costSelectCancle="costSelectCancle"
            @costLink="1"
          >
          </cost-select> -->
          <!--费用弹窗-->
          <cost-select v-if="costAccruedData.costShow"
                       :isShow="costAccruedData.costShow"
                       :costLink="1"
                       @callback="costCallback">
          </cost-select>
          <!--业务币币别弹窗-->
          <coin-select v-if="costAccruedData.coinShow"
                       :tipShow="costAccruedData.coinShow"
                       @coinCancle="coinCancle"
                       @coinSure="coinSure">
          </coin-select>
        </div>
      </el-tab-pane>
      <el-tab-pane label="系统信息"
                   name="sixth"
                   :disabled="tabpane">
        <div class="index-div3">
          <el-col :span="5"
                  class="el-col">
            <label>创建人</label>
            <el-input v-model="formList.createdName"
                      class="el-inputs"
                      size="small"
                      disabled></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>创建时间</label>
            <el-date-picker v-model="formList.createdTime"
                            type="date"
                            class="el-input2"
                            size="small"
                            placeholder="选择日期"
                            disabled>
            </el-date-picker>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>修改人</label>
            <el-input v-model="formList.updatedName"
                      class="el-inputs"
                      size="small"
                      disabled></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>修改时间</label>
            <el-date-picker v-model="formList.updatedTime"
                            type="date"
                            class="el-input2"
                            size="small"
                            placeholder="选择日期"
                            disabled>
            </el-date-picker>
          </el-col>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import api from "@/api/ladingBill/ladingBill";
import warehousingAddRow from "./warehousingAddRow.vue";
import coinSelectVue from "../../components/coinSelect.vue";
import warehouseSelect from "@/components/warehouseSelect.vue";
import supplierSelect from "@/components/supplierSelect.vue";
import costSelect from "@/components/costSelect.vue";
import matterSelect from "@/components/matterSelect.vue";
import coinSelect from "@/components/coinSelect.vue";
import batchSelect from "@/components/batchSelect";
import { Col } from "element-ui";
import { getFiles } from "@/api/contractMange/frameProtocol";
import Bmange from "@/api/contractMange/bmange";
import { getCurrencyRate } from "@/api/contractMange/frameProtocol"; //查汇率
import Compony from "@/api/comdepartment/componySelect";
import calculation from "@/assets/js/calculation";
export default {
  name: "warehousingDetails",
  data () {
    return {
      errorKey: [],
      activeName2: "first", //标签页
      companyName: "",
      warehouseName: [], //仓库
      warehouseShow: false, //仓库
      poId: "",
      blId: "",
      base: {
        //商品详情
        tableData: [
          {
            extPoNo: "",
            projectCode: ""
          }
        ],
        matterShow: false //物料编号
      },
      totalOriginAmt: null, //不含税金额总和
      tableDatas: [],
      tableDataw: [],
      //附件上传
      uploadList: {
        tableList: [],
        fileList: [], //文件
        // sysid: "ac3284d42dcdbc883c3b6598c4fa5e2", //文件上传的参数
        uploadHeaders: { "content-Type": "multipart/form-data" } //文件上传的格式
      },
      loading: false, //表格loading
      page: null, //总页数
      pageNum: 1, //页码
      pageSize: 100, //页显示条数
      total: 0, //总数目
      isBatched: "",
      isTransfered: "",
      selectioned: "",
      selectionedIndex: null,
      index: "",
      formList: {
        blStatus: 10480005, //单据状态 //创建的时候默认为已保存
        wvNo: "", //入库单号
        rmbCurrencyRate: null,
        payAmtTotalRmb: 0,
        // companyCode: "", //公司
        projectCode: "", //部门
        bizPerson: "",
        poType: null, //合同类型
        supplierId: "", //供应商
        wvdoStatus: null, //入库单类型
        postDate: "",
        currencyCode: "", //业务币币别
        currencyRate: 1, //本位币汇率
        wvAmtS: 0, //含税金额
        isBilled: "", //是否完全开发票
        actReceive: 0, //入库数量
        pickupType: "", //提货方式
        remark: "" ,//备注
        unwvReverse:0,//是否冲销驳回
        shipName:"",
      },
      //费用预提数据
      costAccruedData: {
        tableData: [], //费用预提表格数据
        selectioned: "", //费用预提选中
        supplierShow: false, //供应商
        coinShow: false, //业务币币别
        costShow: false, //费用名称
        supplierName: {}, //供应商名称
        supplierId: "", //供应商id
        index: "",
        currencyName: "",
        prefetchIdListDelete: [] //费用预提删除的数据
      },
      blStatusList: [], //单据状态
      isBilledList: [
        { dict_value: "否", dict_key: 0 },
        { dict_value: "是", dict_key: 1 }
      ], //是否完全开票
      value2: "",
      predictArrivedDate: "",
      deliveryBegindate: "",
      delivery: {},
      ToSingle: [],
      pickupstatus: [], //提货方式
      CustomsClearance: [],
      ArrivalPortList: [],
      companyList: [], //公司
      branchList: [], //部门
      supplierList: [], //供应商
      type: "",
      currSel: [
        {
          value: "0",
          label: "空运提单"
        },
        {
          value: "1",
          label: "海运提单"
        }
      ],
      tabpane: false,
      ladingStatus: "",
      transMode: [],
      ladingBillShow: false,
      warehousingAddRowShow: false,
      maxAmt: [],
      wvStatus: [],
      disabletab: false,
      inTradeStatus: false,
      inwarehouse: false, //入库确认
      batchShow: false, //批次号弹窗
      matterInfo: "", //物料信息
      disableSelect: false,
      conTypeList: [],
      isCreate: false,
      isTypeFour: false,
      shareDimList: [],
      formCurrencyCode: "", //查汇率
      uploadHeaders: { "content-Type": "multipart/form-data" }, //文件上传的格式
      sysid: "ac3284d42dcdbc883c3b65981c4fa5e2", //文件上传的参数
      action: "#", //'/oss',
      isOnWayOrder: false, //是否在途单，控制应收、实收数量编辑状态
      poNo: null,
      isAllowAddDele: false,//提交、入库确认时新增行、删除行均不可用
    };
  },
  created () {
    this.initList();
    this.supplierListData();
    this.type = this.$route.query.type;
    this.activeName2 = "first"; 
    switch (this.type) {
      case "10": //物流信息修改
        this.activeName2 = "second";
      case "0": //普通修改
        this.changeMessage();
        break;
      case "1": //提交
        this.isAllowAddDele = true
        this.changeMessage();
        break;
      case "2": //供应商发货
        this.activeName2 = "second";
        this.changeMessage();
        // this.tabpane = true;
        break;
      case "6": //入库确认
        this.inwarehouse = true;
        this.isAllowAddDele = true
        this.changeMessage();
        // this.tabpane = true;
        break;
      default:
        break;
    }
    if (this.$route.query.poId) {
      this.poId = this.$route.query.poId;
      localStorage.setItem("poId", this.poId);
      let type = localStorage.getItem("type");
      if (type == 4) {
        this.isTypeFour = true;
        // this.$set(this, "isTypeFour", true)
      }
      this.tipsSures(); //创建初始化
    }
    if (this.$route.query.blId) {
      this.blId = this.$route.query.blId;
      this.warehousingInSure(); //创建初始化
    }
  },
  mounted () {
    //采购、进口、提单创建时
    //入库单类型
    if (localStorage.getItem("type")) {
      //创建方式
      this.typeStyle = localStorage.getItem("type");
      if (this.typeStyle == 1) {
        this.disabletab = false;
        this.inTradeStatus = true;
      } else if (this.typeStyle == 4 || this.typeStyle == 3) {
        this.disabletab = true;
        this.formList.wvdoStatus = 10620010; //默认入库单
      }
    }
  },
  methods: {
    handleAccruedAmtvatChange (scope) {
      let value = scope.row.costAmtVat;
      value = value
        .replace(/[^\d^\.]+/g, "")
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", ".")
        .replace(/^0[^.]/, "")
        .replace(/^\./, "");
      value = value.replace(/\.\d{3}/, "." + Math.floor((value % 1) * 100));
      scope.row.costAmtVat = value;
      let costAmt =
        Math.round(
          (scope.row.costAmtVat / (scope.row.taxRate / 100 + 1)) * 100
        ) / 100;
      scope.row.costAmt = costAmt;
      scope.row.taxAmt =
        Math.round((scope.row.costAmtVat - costAmt) * 100) / 100;
      scope.row.costAmtBase =scope.row.costAmt;
      scope.row.taxAmtBase=scope.row.taxAmt;//本位币
      scope.row.costAmtVatBase=scope.row.costAmtVat;
    },
    handleAccruedTaxRateChange (scope) {
      let value = scope.row.taxRate;
      value = value.replace(/[^\d]+/g, "");
      scope.row.taxRate = value;
      let costAmt =
        Math.round(
          (scope.row.costAmtVat / (scope.row.taxRate / 100 + 1)) * 100
        ) / 100;
      scope.row.costAmt = costAmt;
      scope.row.taxAmt =
        Math.round((scope.row.costAmtVat - costAmt) * 100) / 100;
      scope.row.costAmtVatBase=scope.row.costAmtVat;
      scope.row.costAmtBase=scope.row.costAmt;
      scope.row.taxAmtBase=scope.row.taxAmt;//本位币
     
    },
    handleTaxamtRule (scope) {
      let value = scope.row.taxAmt;
      value = value
        .replace(/[^\d^\.]+/g, "")
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", ".")
        .replace(/^0[^.]/, "")
        .replace(/^\./, "");
      value = value.replace(/\.\d{3}/, "." + Math.floor((value % 1) * 100));
      scope.row.taxAmt = value;
      scope.row.costAmt =
        Math.round((scope.row.costAmtVat - scope.row.taxAmt) * 100) / 100;
      scope.row.taxAmtBase=scope.row.taxAmt;//本位币
      scope.row.costAmtBase=scope.row.costAmt;
    },
    //物料校验
    qtyChange (row, index) {
      this.originPriceCh(row, index);
    },
    //采购含税单价变动
    originPriceCh (e, index) {
      let row = e;
      //采购不含税单价
      row.unOriginPrice = this.$unorginPrice(row.originPrice, row.taxRate);
      //采购含税金额
      row.originAmtVat = this.$orginAmt(row.originPrice, row.actReceive);
      //采购不含税金额
      row.unorginAmt = this.$unorginAmt(row.originAmtVat, row.taxRate);
      //增值税额
      row.taxAmt = this.$taxAmt(row.originAmtVat, row.unorginAmt);

      //本币计算 对应业务币*汇率
      //本币含税单价  basePrice
      row.basePrice = this.$bbhsdj(row.originPrice, this.formList.currencyRate);
      //本币不含税单价 unBasePrice
      row.unBasePrice = this.$bbnhsdj(
        row.unOriginPrice,
        this.formList.currencyRate
      );
      //本币含税金额 baseAmt
      row.baseAmt = this.$bbhsje(row.originAmtVat, this.formList.currencyRate);
      //本币不含税金额 baseNoAmt
      row.baseTax = this.$bbzzse(row.taxAmt, this.formList.currencyRate);
      row.baseNoAmt = Math.round((row.baseAmt - row.baseTax) * 100) / 100;
      //   row.baseNoAmt = this.$bbnhsje(row.unorginAmt, this.formList.currencyRate);
      //本币增值税额 baseTax
      //   this.$set(this.base.tableData, index, row);
    },
    //采购含税金额变动
    originAmtCh(e, index) {
      
      console.log(this.formList.currencyRate);
      let row = e;
      //采购含税单价
      row.originPrice = this.$orginPrice(row.originAmtVat, row.actReceive);
      //采购不含税单价
      row.unorginPrice = this.$unorginPrice(row.originPrice, row.taxRate);
      //采购不含税金额
      row.unorginAmt = this.$unorginAmt(row.originAmtVat, row.taxRate);
      //增值税额
      row.taxAmt = this.$taxAmt(row.originAmtVat, row.unorginAmt);

      //本币计算 对应业务币*汇率
      //本币含税单价  basePrice
      row.basePrice = this.$bbhsdj(row.originPrice, this.formList.currencyRate);
      row.baseAmt = this.$bbhsje(row.originAmtVat, this.formList.currencyRate);
      //本币不含税金额 baseNoAmt
      //本币不含税单价 unBasePrice
      row.unBasePrice = this.$bbnhsdj(
        row.unorginPrice,
        this.formList.currencyRate
      );
      //本币不含税金额 unBaseAmt
      row.unBaseAmt = this.$bbnhsje(row.unorginAmt, this.formList.currencyRate);
      //本币增值税额 baseTax
      row.baseTax = this.$bbzzse(row.taxAmt, this.formList.currencyRate);
      row.baseNoAmt = Math.round((row.baseAmt - row.baseTax) * 100) / 100;
      //   this.$set(this.base.tableData, index, row);
    },
    //税率变动
    taxRateCh (e, index) {
      let row = e;
      //采购不含税金额
      row.unorginAmt = this.$unorginAmt(row.originAmtVat, row.taxRate);
      //采购不含税单价
      row.unorginPrice = this.$unorginPrice(row.originPrice, row.taxRate);
      //增值税额
      row.taxAmt = this.$taxAmt(row.originAmtVat, row.unorginAmt);

      //本币计算 对应业务币*汇率
      //本币不含税金额 unBaseAmt
      row.unBaseAmt = this.$bbnhsje(row.unorginAmt, this.formList.currencyRate);
      //本币不含税单价 unBasePrice
      row.unBasePrice = this.$bbnhsdj(
        row.unorginPrice,
        this.formList.currencyRate
      );
      //本币增值税额 baseTax
      row.baseTax = this.$bbzzse(row.taxAmt, this.formList.currencyRate);
      this.$set(this.base.tableData, index, row);
    },
    //税额变动 //采购不含税金额=含税总价-税额
    taxAmtCh (e, index) {
      let row = e;
      //采购不含税金额  采购不含税金额=采购含税金额-税额
      row.unorginAmt = this.$unorginAmtCh(row.originAmtVat, row.taxAmt);
      //采购不含税单价 采购不含税金额=采购不含税金额 / 数量
      row.unorginPrice = this.$unPrice(row.unorginAmt, row.actReceive);

      //本币计算 对应业务币*汇率
      //本币不含税金额 unBaseAmt
      row.unBaseAmt = this.$bbnhsje(row.unorginAmt, this.formList.currencyRate);
      //本币不含税单价 unBasePrice
      row.unBasePrice = this.$bbnhsdj(
        row.unorginPrice,
        this.formList.currencyRate
      );
      //本币含税单价  basePrice
      row.basePrice = this.$bbhsdj(row.originPrice, this.formList.currencyRate);
      //本币含税金额 baseAmt
      row.baseAmt = this.$bbhsje(row.originAmtVat, this.formList.currencyRate);
      //本币不含税金额 baseNoAmt
      row.baseTax = this.$bbzzse(row.taxAmt, this.formList.currencyRate);
      row.baseNoAmt = Math.round((row.baseAmt - row.baseTax) * 100) / 100;
      //   row.baseNoAmt = this.$bbnhsje(row.unorginAmt, this.formList.currencyRate);
      //本币增值税额 baseTax
      this.$set(this.base.tableData, index, row);
    },
    //修改的详情
    changeMessage () {
      
      if (localStorage.getItem("wvId")) {
        this.wvId = localStorage.getItem("wvId");
      }
      let params = {
        wvId: this.wvId
      };
      api
        .odWvDetail(params)
        .then(res => {
          
          if (res.code == "success") {
            this.formList = res.data;
            this.costAccruedData.tableData =
              res.data.odPrefetchCostItemsDetailList;
            this.getPrefetchData();
            this.formList.payAmtTotalRmb = res.data.payAmtTotalRmb; //人民币金额
            this.formList.wvAmtS=res.data.wvAmtS;//含税金额
            this.tableDatas = res.data.odWvCtiPathsList;
            this.formList.projectCode = res.data.projectCode;
            this.formList.orgName = res.data.orgName;
            this.formList.bizPerson = res.data.bizPersonName;
            this.formList.bizPersonCode = res.data.bizPersonCode;
            this.warehouseName.warehouseName = res.data.warehouseName; //仓库
            this.formList.wvdoStatus = res.data.wvType;
            this.formList.blStatus = res.data.wvStatus;
            this.base.tableData = res.data.odWvItemsList;
            this.formList.currencyCode = res.data.currencyCodeOrigin;
            this.formList.currencyRate = res.data.baseCurrencyRate;
            this.formList.rmbCurrencyRate = res.data.rmbCurrencyRate;
            this.formList.actReceive=res.data.wvQtyS;//入库数量
            this.formList.unwvReverse=res.data.unwvReverse==1?"是":"否";//是否冲销驳回
            this.formList.shipName=res.data.shipName;
            this.poNo = res.data.erpPoNo;
            this.base.tableData.map((item, index) => {
              item.wvRowno = (index + 1) * 10;
              item.skuCode = item.goodsCode;
              item.poNo = item.erpPoNo;
              //上面两行获取批次号用
              if (res.data.erpBlNo) {
                localStorage.setItem("type", 3);
              }
              //如果是提单，用于新增行的数据源获取
             // item.originAmtVat = item.originAmtVat;
              item.taxAmt = item.originTaxAmt;
              if (!this.isTypeFour) {
                let row = item;
                //采购不含税单价
                row.unOriginPrice = this.$unorginPrice(
                  row.originPrice,
                  row.taxRate
                );
                // //采购含税金额
                // row.originAmtVat = this.$orginAmt(row.originPrice, row.actReceive);
                //采购不含税金额
                row.unorginAmt =
                  Math.round((item.originAmtVat - item.taxAmt) * 100) / 100;

                //本币计算 对应业务币*汇率
                //本币含税单价  basePrice
                // row.basePrice = this.$bbhsdj(
                //   row.originPrice,
                //   this.formList.currencyRate
                // );
                //本币不含税单价 unBasePrice
                row.unBasePrice = this.$bbnhsdj(
                  row.unOriginPrice,
                  this.formList.currencyRate
                );
                // //本币含税金额 baseAmt
                // row.baseAmt = this.$bbhsje(
                //   row.originAmtVat,
                //   this.formList.currencyRate
                // );
                // //本币不含税金额 baseNoAmt
                // row.baseTax = this.$bbzzse(
                //   row.taxAmt,
                //   this.formList.currencyRate
                // );
                row.baseNoAmt =
                  Math.round((row.baseAmt - row.baseTax) * 100) / 100;
                // row.baseNoAmt = this.$bbnhsje(row.unorginAmt, this.formList.currencyRate);
              } else {
                item.originPrice = 0;
                item.originAmtVat = 0;
                item.taxRate = 0;
                item.basePrice = 0;
                item.baseAmt = 0;
                item.baseTax = 0;
              }
              if (this.formList.wvdoStatus == 10620005) {
                // item.actReceive = item.shouldReceive;
                this.isOnWayOrder = true;
              }
              if (item.batchCode == "") {
                item.matterNoIconControl = false;
              }
            });
            
            this.wvhandleChange(this.formList.wvdoStatus); //进入页面时控制数量
            this.companyListData(res.data.companyCode);
            this.getRmbInfo();
            // this.handleTotalCalc(); //计算
            Compony.currenList({
              currencyCode: this.formList.currencyCode
            })
              .then(res => {
                this.formList.currencyName = res.data[0].currencyName;
                this.$forceUpdate();
              })
              .catch(err => { });
            //获取打印及附件
            let businessId = this.formList.wvId;
            const subForm = new FormData();
            subForm.append("businessId", businessId);
            getFiles(subForm)
              .then(res => {
                //   console.log('res :', res);
                this.uploadList.tableList = res.data;
                this.uploadList.tableList.map((item, index) => {
                  item.wvRowno = index + 1;
                });
              })
              .catch(err => { });
            this.selectMessage();
            if (this.inwarehouse && this.type == 6) {
              //this.formList.wvdoStatus = 10620010;
              this.disableSelect = true;
              this.isOnWayOrder = false;
            }
          } else {
            this.$message({
              duration: 1000,
              showClose: true,
              message: "保存失败",
              type: "error"
            });
          }
        })
        .catch();
    },
    selectMessage () {
      let params = {};
      if (this.formList.erpPoNo) {
        params.poNo = this.formList.erpPoNo;
      }
      api.selectOdPoContract(params).then(res => {
        // this.poId = res.data.poId;
        localStorage.setItem("poId", res.data.poId);
      });
    },
    tipsSures () {
      let params = {
        poId: this.poId,
        page: this.pageNum,
        pageSize: this.pageSize
      };
      api
        .selectOdPoContractTransfer(params)
        .then(res => {
          this.formList.shipNo = res.data.shipCode;
          this.tableDatas = res.data.list;
          this.tipSuress();
        })
        .catch(() => { });
    },
    tipSuress () {
      let params = {
        poId: this.poId
      };
      api
        .selectOdPoContract(params)
        .then(res => {
          let erpPoNo = res.data.poNo;
          this.poNo = res.data.poNo;
          let externalPoNo = res.data.extCode;
          let bizPerson = res.data.bizPersonName; //业务员
          this.formList = { ...res.data, erpPoNo, externalPoNo, bizPerson };
          this.getParitiesForIssuePay();
          this.companyListData(res.data.companyCode);
          let type = localStorage.getItem("type");
          if (this.formList.wvdoStatus == 10620005) {
            this.disableSelect = false;
            this.isOnWayOrder = true;
          } else {
            this.disableSelect = true;
            this.isOnWayOrder = false;
          }
          switch (type) {
            case "1":
              this.formList.blStatus = 10480005;
              break;
            case "4":
              this.formList.blStatus = 10480025;
              this.formList.wvdoStatus = 10620010;
              break;
            case "3":
              this.formList.blStatus = 10480005;
              this.formList.wvdoStatus = 10620010;
              this.formList.wvAmtS = 0;
              break;
            default:
              break;
          }
          //无完全开票默认否
          if (res.data.isBilled == undefined) {
            this.formList.isBilled = 0;
          }
          this.isCreate = true;
          Compony.currenList({
            currencyCode: this.formList.currencyCode
          })
            .then(res => {
              this.formList.currencyName = res.data[0].currencyName;
            })
            .catch(err => { });
          this.tipsSure();
        })
        .catch(() => { });
    },
    //采购合同带过来的信息
    tipsSure () {
      this.loading = true;
      let params = {
        poId: this.poId,
        page: this.pageNum,
        pageSize: this.pageSize
      };
      api
        .selectOdPoContractDetail(params)
        .then(res => {
           this.loading = false;
          this.base.tableData = res.data;
          this.getRmbInfo();
          this.base.tableData.map((item, index) => {
            //获取项目号
            item.projectName = this.formList.projectName;
            //获取外部合同号
            item.extPoNo = this.formList.extCode;
            //行号
            item.wvRowno = (index + 1) * 10;
            //设置skCode,获取批次号用
            item.skuCode = item.goodsCode;
            //实收、应收数量
            item.shouldReceive = item.itemQty;
            item.actReceive = item.itemQty;
            //第二应收数量
            item.shouldReceiveSec=item.secQty;
            //采购合同号
            item.erpPoNo = item.poNo;
            //计算金额
            if (!this.isTypeFour) {
              this.originPriceCh(item, index);
            } else {
              item.originPrice = 0;
              item.originAmtVat = 0;
              item.unorginAmt = 0;
              item.taxAmt = 0;
              item.taxRate = 0;
              item.basePrice = 0;
              item.baseNoAmt = 0;
              item.baseAmt = 0;
              item.baseTax = 0;
            }
            if (item.batchCode == "") {
              item.matterNoIconControl = false;
            }
            this.originAmtCh (item, index);  
            this.taxRateCh (item, index); 
          });
    
          this.handleTotalCalc();
          
          this.loading = false;
        })
        .catch(() => { });
    },
    //采购提单带过来的详情
    warehousingInSure () {
      let params = {
        blId: this.blId
      };
      api
        .odBlDetail(params)
        .then(res => {
          this.formList.wvNo = res.data.wvNo; //入库单号
          this.formList.companyCode = res.data.companyCode; //公司
          this.formList.companyName = res.data.companyName; //公司
          this.formList.companyId = res.data.companyId; //公司
          this.formList.orgCode = res.data.orgCode; //部门
          this.formList.orgId = res.data.orgId; //部门
          this.formList.orgName = res.data.orgName; //部门
          this.formList.bizPerson = res.data.bizPersonName; //业务员
          this.formList.bizPersonCode = res.data.bizPersonCode; //业务员
          this.formList.poType = res.data.poType; //合同类型
          this.formList.supplierCode = res.data.supplierCode; //供应商
          this.formList.supplierId = res.data.supplierId; //供应商
          this.formList.supplierName = res.data.supplierName; //供应商
          this.formList.currencyCode = res.data.currencyCode;
          this.formList.currencyName = res.data.currencyName;
          this.formList.currencyRate = res.data.currencyRate;
          this.formList.rmbCurrencyRate = res.data.rmbCurrencyRate;
          this.formList.projectName = res.data.projectName;
          this.formList.projectCode = res.data.projectCode;
          this.formList.payAmtTotalRmb = res.data.payAmtTotalRmb;
          this.formList.blVersion = res.data.version;
          this.formList.sysBlNo = res.data.sysBlNo;
          this.formList.contractNo = res.data.contractNo;
          this.formList.extCode = res.data.extCode;
          this.formList.bizBlNo = res.data.bizBlNo;
          this.base.tableData = res.data.odBlItemsList;
          this.tableDatas = res.data.odBlCtiPathsList;
          this.getParitiesForIssuePay();
          this.companyListData(res.data.companyCode);
          this.base.tableData.map((item, index) => {
            //项目号
            item.projectName = this.formList.projectName;
            //行号
            item.wvRowno = (index + 1) * 10;
            //采购合同号
            item.erpPoNo = item.contractNo;
            //采购合同行号
            item.poRowno = item.contractRowno;
            //外部合同号
            item.extPoNo = this.formList.extCode;
            //实收、应收数量
            item.shouldReceive = item.arrivedQty;
            item.actReceive = item.arrivedQty;
            //第二应收数量
            item.shouldReceiveSec=item.secQty;
            //获取批次号用
            item.skuCode = item.goodsCode;
            //提单号
            item.blNo = res.data.bizBlNo;
            if (!this.isTypeFour) {
              this.originPriceCh(item, index);
            } else {
              item.originPrice = 0;
              item.originAmtVat = 0;
              item.unorginAmt = 0;
              item.taxAmt = 0;
              item.taxRate = 0;
              item.basePrice = 0;
              item.baseNoAmt = 0;
              item.baseAmt = 0;
              item.baseTax = 0;
            }
            if (item.batchCode == "") {
              item.matterNoIconControl = false;
            }
          });
          this.getRmbInfo();
          this.handleTotalCalc();
        
          //是否在途单对实收、应收数量控制
          if (this.formList.wvdoStatus == 10620005) {
            this.disableSelect = false;
            this.isOnWayOrder = true;
          } else {
            this.disableSelect = true;
            this.isOnWayOrder = false;
          }
          let temp = JSON.parse(JSON.stringify(this.base.tableData));
          (this.base.tableData = []),
            this.$nextTick(() => {
              this.base.tableData = temp;
            });
          //无完全开票默认否
          if (res.data.isBilled == undefined) {
            this.formList.isBilled = 0;
          }
          //为了获取提货方式
          api.selectOdPoContract({ poNo: res.data.contractNo }).then(res => {
            this.formList.pickupType = res.data.pickupType;
          });
        })
        .catch(() => { });
    },
    showSearchIcon (scope) {
      scope.row.batchCode = "";
      scope.row.matterNoIconControl = false;
      const temp = JSON.parse(JSON.stringify(this.base.tableData));
      this.$nextTick(() => {
        this.base.tableData = temp;
      });
      //   this.base.tableData[scope.$index].batchCode = '';
      //   this.base.tableData[scope.$index].matterNoIconControl = false;
    },
    handleRateChange (value) {
      value = value
        .replace(/[^\d^\.]+/g, "")
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", ".")
        .replace(/^0[^.]/, "")
        .replace(/^\./, "");
      value = value.replace(
        /\.\d{9}/,
        "." + Math.floor((value % 1) * 100000000)
      );
      this.formList.currencyRate = value;
      let temp = JSON.parse(JSON.stringify(this.base.tableData));
      temp.map((item, index) => {
        // item.originAmtVat = item.originAmtVat;
        // item.originTaxAmt = item.taxAmt;
        if (!this.isTypeFour) {
          // this.originPriceCh(item, index);
          //本币含税单价  basePrice
          item.basePrice = this.$bbhsdj(
            item.originPrice,
            this.formList.currencyRate
          );
          //本币不含税单价 unBasePrice
          item.unBasePrice = this.$bbnhsdj(
            item.unOriginPrice,
            this.formList.currencyRate
          );
          //本币含税金额 baseAmt
          item.baseAmt = this.$bbhsje(
            item.originAmtVat,
            this.formList.currencyRate
          );
          //本币不含税金额 baseNoAmt
          //   item.baseNoAmt = this.$bbnhsje(item.unorginAmt, this.formList.currencyRate);
          //本币增值税额 baseTax
          item.baseTax = this.$bbzzse(item.taxAmt, this.formList.currencyRate);
          item.baseNoAmt =
            Math.round((item.baseAmt - item.baseTax) * 100) / 100;
        } else {
          item.originPrice = 0;
          item.originAmtVat = 0;
          item.taxRate = 0;
          item.basePrice = 0;
          item.baseAmt = 0;
          item.baseTax = 0;
        }
        if (this.formList.wvdoStatus == 10620005) {
          item.actReceive = item.shouldReceive;
          this.isOnWayOrder = true;
        }
      });
      this.$nextTick(() => {
        this.base.tableData = temp;
        this.handleTotalCalc(); //计算
      });
    },
    //获取费用预提信息
    getPrefetchData () {
      //获取业务币币别
      this.costAccruedData.tableData.map((item, idnex) => {
        Compony.currenList({
          currencyCode: item.currencyCode
        }).then(res => {
          item.currencyName = res.data[0].currencyName;
        });
      });
    },
    //控制应收数量
    handleShouldRecvChange (scope) {
      let value = scope.row.shouldReceive;
      value = value
        .replace(/[^\d^\.]+/g, "")
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", ".")
        .replace(/^0[^.]/, "")
        .replace(/^\./, "");
      value = value.replace(/\.\d{5}/, "." + Math.floor((value % 1) * 10000));
      scope.row.shouldReceive = value;
      scope.row.actReceive = value;
      if (this.isOnWayOrder) {
        let row = scope.row;
        //采购不含税单价
        row.unOriginPrice = this.$unorginPrice(row.originPrice, row.taxRate);
        //采购含税金额
        row.originAmtVat = this.$orginAmt(row.originPrice, row.shouldReceive);
        //采购不含税金额
        row.unorginAmt = this.$unorginAmt(row.originAmtVat, row.taxRate);
        //增值税额
        row.taxAmt = this.$taxAmt(row.originAmtVat, row.unorginAmt);

        //本币计算 对应业务币*汇率
        //本币含税单价  basePrice
        row.basePrice = this.$bbhsdj(
          row.originPrice,
          this.formList.currencyRate
        );
        //本币不含税单价 unBasePrice
        row.unBasePrice = this.$bbnhsdj(
          row.unOriginPrice,
          this.formList.currencyRate
        );
        //本币含税金额 baseAmt
        row.baseAmt = this.$bbhsje(row.originAmtVat, this.formList.currencyRate);
        //本币不含税金额 baseNoAmt
        row.baseTax = this.$bbzzse(row.taxAmt, this.formList.currencyRate);
        row.baseNoAmt = Math.round((row.baseAmt - row.baseTax) * 100) / 100;
        // row.baseNoAmt = this.$bbnhsje(row.unorginAmt, this.formList.currencyRate);
        //本币增值税额 baseTax
        this.$set(this.base.tableData, scope.$index, row);
      }
      this.$nextTick(() => {
        this.handleTotalCalc();
        this.$forceUpdate();
      });
    },
    //控制实收数量
    handleActRcvChange (scope) {
      let value = scope.row.actReceive;
      value = value
        .replace(/[^\d^\.]+/g, "")
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", ".")
        .replace(/^0[^.]/, "")
        .replace(/^\./, "");
      value = value.replace(/\.\d{5}/, "." + Math.floor((value % 1) * 10000));
      scope.row.actReceive = value;
      //   this.handleActReceiceRule(scope);
      const temp = JSON.parse(JSON.stringify(this.base.tableData));
      this.$nextTick(() => {
        if (!this.isTypeFour) {
          this.originPriceCh(temp[this.index], this.index);
        }
        this.base.tableData = temp;
        this.handleTotalCalc();
      });
      this.formList.actReceive=0;
      this.base.tableData.forEach(item=>{
          this.formList.actReceive+=calculation.accAdd(item.actReceive,item.actReceive);//总数量
      })
    },
    //控制第二数量
    handleSecQtyChange (scope) {
      let value = scope.row.secQty;
      value = value
        .replace(/[^\d^\.]+/g, "")
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", ".")
        .replace(/^0[^.]/, "")
        .replace(/^\./, "");
      value = value.replace(/\.\d{5}/, "." + Math.floor((value % 1) * 10000));
      scope.row.secQty = value;
    },
    //第二应收数量
    shouldReceiveSecChange(row,index){
       if(this.base.tableData.length){
            this.base.tableData[index].shouldReceiveSec =this.$filterPriceNum(row.shouldReceiveSec,4);
        }
        row.secQty=row.shouldReceiveSec;
    },
    //控制业务币单价
    handleOriginPrice (scope) {
      let value = scope.row.originPrice;
      value = value
        .replace(/[^\d^\.]+/g, "")
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", ".")
        .replace(/^0[^.]/, "")
        .replace(/^\./, "");
      value = value.replace(/\.\d{7}/, "." + Math.floor((value % 1) * 1000000));
      scope.row.originPrice = value;
      this.originPriceCh(scope.row, scope.$index);
      this.handleTotalCalc();
    },
    //控制业务币含税金额
    handleOriginAmtChange (scope) {
      let value = scope.row.originAmtVat;
      value = value
        .replace(/[^\d^\.]+/g, "")
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", ".")
        .replace(/^0[^.]/, "")
        .replace(/^\./, "");
      value = value.replace(/\.\d{3}/, "." + Math.floor((value % 1) * 100));
      scope.row.originAmtVat = value;
      let temp = JSON.parse(JSON.stringify(this.base.tableData));
      this.$nextTick(() => {
        this.originAmtCh(temp[scope.$index], scope.$index);
        this.handleTotalCalc();
        this.base.tableData = temp;
      });
    },
    //控制增值税率
    handleTaxRateChange (scope) {
      let value = scope.row.taxRate;
      //   value = value.replace(/[^\d^\.]+/g, '').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.').replace(/^0[^.]/, '').replace(/^\./, '')
      //   value = value.replace(/\.\d{3}/, '.' + Math.floor((value % 1) * 100))
      value = value.replace(/[^\d]+/g, "");
      scope.row.taxRate = value;
      this.taxRateCh(scope.row, scope.$index);
      this.originPriceCh(scope.row, scope.$index);
      this.handleTotalCalc();
    },
    //控制税额
    handleTaxAmtChange (scope) {
      let value = scope.row.taxAmt;
      value = value
        .replace(/[^\d^\.]+/g, "")
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", ".")
        .replace(/^0[^.]/, "")
        .replace(/^\./, "");
      value = value.replace(/\.\d{3}/, "." + Math.floor((value % 1) * 100));
      scope.row.taxAmt = value;
      this.taxAmtCh(scope.row, scope.$index);
      this.handleTotalCalc();
    },
    //新增行确认
    warehousingAddRowSure (e) {
      //   e.erpPoNo = this.poNo;
      let flag = true;
      let addList = [];
      let type = localStorage.getItem("type");
      if (type == 3) {
        e.map((item, index) => {
          item.erpPoNo = item.contractNo;
          //获取项目号
          item.projectName = this.formList.projectName;
          //设置skCode,获取批次号用
          item.skuCode = item.goodsCode;
          //实收、应收数量
          item.shouldReceive = item.itemQty;
          item.actReceive = item.itemQty;
          //第二应收数量
          item.shouldReceiveSec=item.secQty;
          //计算金额
          if (this.isTypeFour) {
            item.originPrice = 0;
            item.originAmtVat = 0;
            item.taxRate = 0;
            item.basePrice = 0;
            item.baseAmt = 0;
            item.baseTax = 0;
          }
          if (item.batchCode == "") {
            item.matterNoIconControl = false;
          }
          this.originPriceCh(item, index);
        });
      } else {
        e.map((item, index) => {
          item.erpPoNo = item.poNo;
          //获取项目号
          item.projectName = this.formList.projectName;
          //设置skCode,获取批次号用
          item.skuCode = item.goodsCode;
          //实收、应收数量
          item.shouldReceive = item.itemQty;
          item.actReceive = item.itemQty;
          //第二应收数量
          item.shouldReceiveSec=item.secQty;
          //计算金额
          if (this.isTypeFour) {
            item.originPrice = 0;
            item.originAmtVat = 0;
            item.taxRate = 0;
            item.basePrice = 0;
            item.baseAmt = 0;
            item.baseTax = 0;
          }
          if (item.batchCode == "") {
            item.matterNoIconControl = false;
          }
          this.originPriceCh(item, index);
        });
      }
      this.base.tableData.push(...e);
      this.base.tableData.map((item, index) => {
        //行号
        item.wvRowno = (index + 1) * 10;
      });
      this.handleTotalCalc();
    },
    //入库单类型
    wvhandleChange (val) {
      this.formList.wvdoStatus = val;
      // this.$forceUpdate();
      if (this.formList.wvdoStatus == 10620005) {
        this.disableSelect = false;
        this.isOnWayOrder = true;
      } else {
        this.disableSelect = true;
        this.isOnWayOrder = false;
      }
    },
    //单据状态下拉
    initList () {
      //单据状态
      api
        .select({ dictNo: 1048 })
        .then(res => {
          this.blStatusList = res.data;
        })
        .catch(err => { });
      //合同状态
      api
        .select({ dictNo: 1014 })
        .then(res => {
          this.conTypeList = res.data;
        })
        .catch(err => { });
      //入库单类型
      api
        .select({ dictNo: 1062 })
        .then(res => {
          this.wvStatus = res.data;
        })
        .catch(err => { });
      //运输方式
      api
        .select({ dictNo: 1017 })
        .then(res => {
          this.transMode = res.data;
        })
        .catch(err => { });
      //提货方式
      api
        .select({ dictNo: 1061 })
        .then(res => {
          this.pickupstatus = res.data;
        })
        .catch(err => { });
      //摊销维度
      api
        .select({ dictNo: 1064 })
        .then(res => {
          this.shareDimList = res.data;
        })
        .catch(err => { });
    },
    //公司选择
    companyChange (val) {
      this.formList.companyCode = val;
      for (var i = 0; i < this.companyList.length; i++) {
        if (val == this.companyList[i].companyCode) {
          this.companyId = this.companyList[i].companyId;
          this.formCurrencyCode = this.companyList[i].currencyCode;
        }
      }
    },
    //公司获取汇率
    companyListData (companyCode) {
      api
        .selectBbCompanyBase({
          companyCode
        })
        .then(res => {
          this.formList.baseCurrencyCode = res.data.currencyCode;
        })
        .catch(() => { });
    },
    //部门
    branchChange (val) {
      this.formList.projectCode = val;
    },
    //供应商
    supplierChange (val) {
      this.formList.supplierId = val;
    },
    //供应商下拉
    supplierListData () {
      let params = {};
      api
        .supplierList(params)
        .then(res => {
          this.supplierList = res.data.list;
        })
        .catch(() => { });
    },
    matterTips () {
      //物料名称弹窗
      this.base.matterShow = true;
    },
    matterCancle () {
      this.base.matterShow = false;
    },
    matterSure (e) {
      // this.matterInfo = e;
      this.base.matterShow = false;
      this.base.tableData[this.base.index].matterNoIconControl = false;
      this.base.tableData[this.base.index].goodsCode = e.skuCode;
      this.base.tableData[this.base.index].skuCode = e.skuCode;
      this.base.tableData[this.base.index].goodsName = e.skuName;
      this.base.tableData[this.base.index].skuName = e.skuName;
      this.base.tableData[this.base.index].goodsCat = e.categoryCode;
      this.base.tableData[this.base.index].goodsCategoryName=e.categoryShowName;//物料大类
      this.base.tableData[this.base.index].goodsSpec = e.propertyInfo;
      this.base.tableData[this.base.index].itemUnitName = e.firstUnitName;
      this.base.tableData[this.base.index].secUnitName = e.secUnitName;
      this.base.tableData[this.base.index].poNo = this.poNo;
      this.base.tableData[this.base.index].batchCode = "";
    },
    //物流信息新增
    tableAddRow () {
      this.tableDatas.forEach(item => {
        item.edit = false;
      });
      var list = {
        edit: true
      };
      // this.newTbale.unshift(list);
      let newTbale = [];
      newTbale.unshift(list);
      this.tableDatas = newTbale.concat(this.tableDatas);
    },
    //物流信息删除
    tableRowdelData () {
      // 删除选中行
      if (!this.selectioned) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "未选择数据",
          type: "warning"
        });
        return;
      }
      if (localStorage.getItem("wvId")) {
        this.wvId = localStorage.getItem("wvId");
        if (this.wvId) {
          let tips = "删除";

          this.$confirm("是否确定" + tips + "?", tips + "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              if (!this.selectioned.pcpId) {
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
                this.tableDatas.splice(this.index, 1);
              } else {
                let params = {
                  pcpId: this.selectioned.pcpId
                };
                api
                  .deleteOdWvCtiPaths(params)
                  .then(res => {
                    if (res.code == "success") {
                      this.$message({
                        duration: 1000,
                        showClose: true,
                        message: res.data,
                        type: "success"
                      });
                      this.changeMessage();
                    } else {
                      this.$message({
                        duration: 1000,
                        showClose: true,
                        message: "调用失败",
                        type: "error"
                      });
                    }
                  })
                  .catch();
              }
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消"
              });
            });
        }
      } else {
        this.tableDatas.splice(this.index, 1);
        // 删除完数据之后清除勾选框
        this.$refs.table.clearSelection();
      }
    },
    //费用预提 表格单选
    costDialogCheck (selection, row) {
      this.$refs.costTable.clearSelection();
      if (selection.length === 0) {
        // 判断selection是否有值存在
        return;
      }
      this.costAccruedData.selectioned = row;
      this.costAccruedData.index = this.costAccruedData.tableData.indexOf(
        selection[0]
      );
      this.$refs.costTable.toggleRowSelection(row, true);
    },
    //费用预提 表格选中
    costHandleChangeTable (e) {
      if (e.length === 0) {
        // this.basicData.selectioned = null;
      }
    },
    //单行点击
    rowClick (e) {
      this.$refs.costTable.toggleRowSelection(e, true);
      this.costAccruedData.selectioned = e;
      this.costAccruedData.index = this.costAccruedData.tableData.indexOf(e);
    },
    //费用预提 双击选中
    costDbClick (row) {
      this.$refs.costTable.clearSelection();
      this.costAccruedData.tableData.forEach(item => {
        item.edit = false;
      });
      if (row) {
        this.costAccruedData.selectioned = row;
        this.costAccruedData.index = this.costAccruedData.tableData.indexOf(
          row
        );
        this.costAccruedData.tableData[this.costAccruedData.index].edit = true;
      }
      this.$set(
        this.costAccruedData.tableData,
        this.costAccruedData.index,
        row
      );
    },
    //费用预提添加行
    costAccruedAddRow () {
      this.costAccruedData.tableData.forEach(item => {
        item.edit = false;
      });
      let costObj = {
        edit: true,
        supplierName: "", //供应商名称
        supplierId: "", //供应商id
        costName: "", //费用名称
        shareDim: "", //摊销维度
        costAmtVat: "", //业务币费用金额
        taxRate: "", //税率
        costAmt: "", //无税金额
        taxAmt: "", //税额
        baseCurrencyRate: "", //本位币汇率
        currencyName: "" //本位币币别
      };
      this.costAccruedData.tableData.push(costObj);
    },
    //删除行费用预提
    deleteRow (type) {
      if (!this.costAccruedData.selectioned) {
        //判断商品明细是否选中
        this.$message({
          duration: 1000,
          showClose: true,
          message: "未选择数据",
          type: "warning"
        });
        return;
      }
      if (this.costAccruedData.selectioned.id){
        //this.wvId = localStorage.getItem("wvId");
        let tips = "删除";
          this.$confirm("是否确定" + tips + "?", tips + "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
                let params = {
                  id: this.costAccruedData.selectioned.id,
                  version: this.costAccruedData.selectioned.version
                };
                api
                  .deleteCostDetail(params)
                  .then(res => {
                    if (res.code == "success") {
                      this.$message({
                        duration: 1000,
                        showClose: true,
                        message: res.data,
                        type: "success"
                      });
                      this.changeMessage();
                    } else {
                      this.$message({
                        duration: 1000,
                        showClose: true,
                        message: "调用失败",
                        type: "error"
                      });
                    }
                  })
                  .catch();
              
            })
            .catch();
      } else {
        //把删除的数据放入删除数组里
        this.costAccruedData.prefetchIdListDelete.push(
          this.costAccruedData.tableData[this.costAccruedData.index].prefetchId
        );
        this.costAccruedData.tableData.splice(this.costAccruedData.index, 1);
        this.$message({
                  message: "删除成功",
                  type: "success"
                });
        // 删除完数据之后清除勾选框
        this.$refs.costTable.clearSelection();
      }
    },
    //业务币币别
    coinSelectTips () {
      this.costAccruedData.coinShow = true;
    },
    coinSure (e) {
      this.costAccruedData.coinShow = false;
      this.costAccruedData.tableData[this.costAccruedData.index].currencyName =
        e.currencyName;
      this.costAccruedData.tableData[this.costAccruedData.index].currencyCode =
        e.currencyCode;
      this.$forceUpdate();
      api
        .getParitiesByCode({
          formCurrencyCode: e.currencyCode,
          toCurrencyCode: this.formList.baseCurrencyCode
        })
        .then(res => {
          this.costAccruedData.tableData[
            this.costAccruedData.index
          ].baseCurrencyRate = res.data.parities;
        });
    },
    coinCancle () {
      this.costAccruedData.coinShow = false;
    },
    //供应商弹窗
    supplierTips () {
      this.costAccruedData.supplierShow = true;
    },
    //供应商弹窗关闭
    supplierCancle () {
      this.costAccruedData.supplierShow = false;
    },
    //供应商确定获取数据
    supplierSure (e) {
      this.costAccruedData.supplierShow = false;
      this.costAccruedData.tableData[this.costAccruedData.index].supplierName =
        e.supplierName;
      this.costAccruedData.tableData[this.costAccruedData.index].supplierId =
        e.supplierId;
      this.costAccruedData.tableData[this.costAccruedData.index].supplierCode =
        e.supplierCode;
    },
    //批次号
    batchCodeTips () {
      if (this.base.tableData[this.base.index].goodsCode == "") {
        this.$openWarning("请先选择物料号");
        return false;
      }
      this.batchShow = true;
    },
    //批次号弹窗关闭
    batchCancel () {
      this.batchShow = false;
    },
    //批次号弹窗确定并传值
    batchSure (e) {
      let value = e.batchCode;
      let i = 0;
      this.base.tableData.map((item, index) => {
        if (item.batchCode == value) {
          i++;
        }
      });
      let temp = this.base.tableData;
      if (i >= 1) {
        this.$openWarning("已存在重复批次号");
      } else {
        temp[this.index].batchCode = value;
      }
      this.base.tableData = [];
      this.$nextTick(() => {
        this.base.tableData = temp;
        this.batchShow = false;
        this.base.tableData[this.base.index].matterNoIconControl = true;
      });
    },
    //复制
    debleData () {
      if (!this.selectioned) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "未选择数据",
          type: "warning"
        });
        return;
      }
      this.tableData.push(this.selectioned);
      // 复制完数据之后清除勾选框
      this.$refs.table.clearSelection();
    },
    //双击编辑
    tablelclick (e) {
      this.tableDatas.forEach(item => {
        item.edit = false;
      });

      this.index = this.tableDatas.indexOf(e);
      let index = this.index;
      this.tableDatas[index].edit = true;
      this.tableDatas[index].change = 1;
      this.$set(this.tableDatas, this.tableDatas.indexOf(e), e);
    },
    //到单编辑
    dblclick (e) {
      this.ToSingle.forEach(item => {
        item.edit = false;
      });

      this.index = this.ToSingle.indexOf(e);
      let index = this.index;
      if (this.ladingStatus == 10480005) {
        this.ToSingle[index].edit = true;
      } else {
        this.ToSingle[index].edit = false;
      }
      this.ToSingle[index].change = 1;
      this.$set(this.ToSingle, this.ToSingle.indexOf(e), e);
    },
    //商品明细单行编辑
    tableDataBdlclick (e) {
      this.base.tableData.forEach(item => {
        item.edit = false;
      });
      this.index = this.base.tableData.indexOf(e);
      this.base.index = this.index;
      let index = this.index;
      this.base.tableData[index].edit = true;
      localStorage.setItem("selectionedPoNo", e.contractNo);
      this.base.tableData[index].change = 1;
      this.$set(this.base.tableData, this.base.tableData.indexOf(e), e);
    },
    Bdlclick (e) {
      this.$refs.tableBase.clearSelection();
      this.$refs.tableBase.toggleRowSelection(e, true);
      this.selectioned = [e];
      this.selectionedIndex = this.base.tableData.indexOf(e);
    },
    //提单保存//采购保存//进口保存
    addSub () {
      this.errorKey = [];
      if (!this.formList.wvdoStatus) {
        this.errorKey.push('wvdoStatus');
      }
      if (!this.warehouseName.warehouseName) {
        this.errorKey.push('warehouseName');
      }
      if (!this.formList.rmbCurrencyRate) {
        this.errorKey.push('rmbCurrencyRate');
      }
      if (!this.formList.currencyRate) {
        this.errorKey.push('currencyRate');
      }
      if(this.errorKey.length > 0) {
        this.$openWarning('请将必填项补充完整！');
        return false;
      }
      if(this.formList.wvdoStatus==10620005){
        if(!this.tableDatas.length){
          this.$openWarning('请填写物流信息！');
          return false;
        }
        for(let i=0;i<this.tableDatas.length;i++){
          let it=this.tableDatas[i];
          if(!it.leaveTransferMode){
            this.$openWarning('请填写物流运输方式！');
            return;
          }
        }
      }
      let flag = false;
      if (this.formList.wvdoStatus == 10620010) {
        this.base.tableData.map(item => {
          if (item.goodsCode == "") {
            flag = true;
          }
        });
      }
      if (flag) {
        this.$openWarning('类型为"入库单"时，请选择物料编号');
        return;
      }
      //判断第二单位应收数量
      for (const it of this.base.tableData) {
        if(it.shouldReceiveSec==="" || it.shouldReceiveSec===null){
          this.$openWarning("第二单位应收数量不能为空");
          return;
        }else if(it.secQty==="" || it.secQty===null){
          this.$openWarning("第二单位实收数量不能为空");
          return;
        }
      }
      // costAccruedData.tableData
      let costFlag = false;
      this.costAccruedData.tableData.map((item, index) => {
        if (
          !item.supplierName ||
          !item.costName ||
          !item.costAmtVat ||
          !item.currencyName ||
          !item.baseCurrencyRate ||
          !item.taxRate ||
          !item.taxAmt
        ) {
          costFlag = true;
        }
      });
      if (costFlag) {
        this.$openWarning('"费用预提"数据未填写完整');
        return;
      }
      //费用预提，业务币费用金额字段
      this.costAccruedData.tableData.map(item => {
        item.prefetchAmt = item.costAmtVat;
      });
      this.base.tableData.map((item, index) => {
        // item.originAmtVat = item.originAmtVat;
        item.originTaxAmt = item.taxAmt;
        item.projectCode = this.formList.projectCode;
        item.projectName = this.formList.projectName; //项目代码
      });
      if (
        localStorage.getItem("type") == 1 ||
        localStorage.getItem("type") == 4
      ) {
        let odBlForm = {
          wvNo: this.formList.wvNo,
          poVersion: this.formList.version,
          poType: this.formList.poType,
          erpPoNo: this.formList.poNo,
          externalPoNo: this.formList.extCode,
          companyName: this.formList.companyName, //公司名称
          companyCode: this.formList.companyCode, //公司代码
          companyId: this.formList.companyId, //公司id
          projectCode: this.formList.projectCode, //项目代码
          projectName: this.formList.projectName, //项目代码
          wvType: this.formList.wvdoStatus, //入库单状态
          postDate: this.formList.postDate, //入库日期
          bizPersonName: this.formList.bizPerson,
          bizPersonCode: this.formList.bizPersonCode,
          orgId: this.formList.orgId,
          orgCode: this.formList.orgCode,
          rmbCurrencyRate: this.formList.rmbCurrencyRate,
          orgName: this.formList.orgName,
          supplierName: this.formList.supplierName,
          supplierCode: this.formList.supplierCode, //供应商
          supplierId: this.formList.supplierId,
          odWvItemsList: this.base.tableData,
          odWvCtiPathsList: this.tableDatas,
          odPrefetchCostItemsDetailList: this.costAccruedData.tableData,
          sysSystemAccessoryList: this.uploadList.tableList,
          warehouseName: this.warehouseName.warehouseName, //仓库
          warehouseCode: this.warehouseName.warehouseCode, //仓库
          currencyName: this.formList.currencyName, //业务币币别
          currencyCodeOrigin: this.formList.currencyCode, //业务币币别
          baseCurrencyRate: this.formList.currencyRate, //本位币汇率
          wvAmtS: this.formList.wvAmtS, //含税金额
          isBilled: this.formList.isBilled, //是否完全开发票
          // done
          wvQtyS: this.formList.actReceive, //入库数量
          pickupType: this.formList.pickupType, //提货方式
          remark: this.formList.remark, //备注
          payAmtTotalRmb: this.formList.payAmtTotalRmb,
          shipName:this.formList.shipName
        };
        api
          .createOdWv(odBlForm)
          .then(res => {
            if (res.code == "success") {
              this.$message({
                duration: 1000,
                showClose: true,
                message: res.data,
                type: "success"
              });
              this.$router.push({
                path: "/index/Purchase/warehousing" //跳转的路径
              });
            } else {
              this.$message({
                duration: 1000,
                showClose: true,
                message: "保存失败",
                type: "error"
              });
            }
          })
          .catch();
      } else if (localStorage.getItem("type") == 3) {
        let odBlForm = {
          blVersion: this.formList.blVersion,
          blId: this.blId, //提单id
          blNo: this.formList.bizBlNo, //来源单号
          erpBlNo: this.formList.sysBlNo, //系统编号
          externalPoNo: this.formList.extCode, //外部合同号
          poType: this.formList.poType,
          erpPoNo: this.formList.contractNo,
          bizPersonName: this.formList.bizPerson,
          bizPersonCode: this.formList.bizPersonCode,
          postDate: this.formList.postDate, //入库日期
          companyCode: this.formList.companyCode, //公司代码
          companyName: this.formList.companyName, //公司代码
          companyId: this.formList.companyId, //公司id
          projectCode: this.formList.projectCode, //项目代码
          projectName: this.formList.projectName, //项目代码
          orgCode: this.formList.orgCode,
          orgId: this.formList.orgId,
          wvType: this.formList.wvdoStatus, //入库单状态
          orgName: this.formList.orgName,
          rmbCurrencyRate: this.formList.rmbCurrencyRate,
          supplierName: this.formList.supplierName,
          supplierCode: this.formList.supplierCode, //供应商
          supplierId: this.formList.supplierId,
          blType: this.formList.wvdoStatus, //入库单状态
          sysSystemAccessoryList: this.uploadList.tableList, //附件list
          odWvItemsList: this.base.tableData,
          warehouseName: this.warehouseName.warehouseName, //仓库
          warehouseCode: this.warehouseName.warehouseCode, //仓库
          currencyCodeOrigin: this.formList.currencyCode, //业务币币别
          currencyName: this.formList.currencyName, //业务币币别
          baseCurrencyRate: this.formList.currencyRate, //本位币汇率
          wvAmtS: this.formList.wvAmtS, //含税金额
          isBilled: this.formList.isBilled, //是否完全开发票
          actReceive: this.formList.actReceive, //入库数量
          pickupType: this.formList.pickupType, //提货方式
          remark: this.formList.remark, //备注
          odWvCtiPathsList: this.tableDatas,
          wvQtyS: this.formList.actReceive, //入库数量
           shipName:this.formList.shipName,
          odPrefetchCostItemsDetailList: this.costAccruedData.tableData //费用预提list
        };
        api
          .createOdWv(odBlForm)
          .then(res => {
            if (res.code == "success") {
              this.$message({
                duration: 1000,
                showClose: true,
                message: "保存成功",
                type: "success"
              });
              this.$router.push({
                //核心语句
                path: "/index/Purchase/warehousing" //跳转的路径
              });
            } else {
              this.$message({
                duration: 1000,
                showClose: true,
                message: "保存失败",
                type: "error"
              });
            }
          })
          .catch();
      }
    },
    addhouseSub () {
      if (this.$route.query.type == 6) {
        if (localStorage.getItem("wvId")) {
          this.wvId = localStorage.getItem("wvId");
        }
        let data = {
          wvId: this.wvId,
          wvAmtS: this.formList.wvAmtS
        };
        let flag = false;
        if (this.formList.wvdoStatus == 10620010) {
          this.base.tableData.map(item => {
            if (item.goodsCode == "") {
              flag = true;
            }
          });
        }
        if (flag) {
          this.$openWarning("请选择物料编号");
          return;
        }
        api
          .checkIsCloseableByWv(data)
          .then(res => {
            if (res.data.isCloseable == true) {
              this.$confirm(
                "入库金额达合同/提单溢短装范围，是否入库后关闭合同/提单",
                {
                  confirmButtonText: "是",
                  cancelButtonText: "否",
                  type: "warning"
                }
              ).then(() => {
                localStorage.setItem("isClosed", 1);
                this.ConfirmationMin();
              }).catch(() => {
                localStorage.setItem("isClosed", 0);
                this.ConfirmationMin();
              })
            } else {
              localStorage.setItem("isClosed", 0);
              this.ConfirmationMin();
            }
          })
          .catch();
      }
    },
    //入库确认
    ConfirmationMin () {
      if (localStorage.getItem("isClosed")) {
        this.isClosed = localStorage.getItem("isClosed");
      }
      if (localStorage.getItem("wvId")) {
        this.wvId = localStorage.getItem("wvId");
      }
      if (localStorage.getItem("version")) {
        this.version = localStorage.getItem("version");
      }
      if (this.formList.wvdoStatus == null) {
        this.formList.wvdoStatus = "10620010";
      } else if (this.formList.wvdoStatus != null) {
        this.wvStatus.forEach(item => {
          if (this.formList.wvdoStatus == item.dict_value) {
            this.formList.wvdoStatu = item.dict_code;
          }
        });
      }
      // this.pickupstatus.forEach(item1 => { //提货方式
      //   if (this.formList.pickupType == item1.dict_value) {
      //     this.formList.pickupType = item1.dict_code
      //   }
      // })
          //判断第二单位应收数量
      for (const it of this.base.tableData) {
        if(it.shouldReceiveSec==="" || it.shouldReceiveSec===null){
          this.$openWarning("第二单位应收数量不能为空");
          return;
        }else if(it.secQty==="" || it.secQty===null){
          this.$openWarning("第二单位实收数量不能为空");
          return;
        }
      }
      this.base.tableData.map((item, index) => {
       // item.originAmtVat = item.originAmtVat;
        item.originTaxAmt = item.taxAmt;
        item.projectCode = this.formList.projectCode;
        item.projectName = this.formList.projectName; //项目代码
      });
      let obj = {
        wvId: this.wvId,
        version: this.version,
        isClosed: this.isClosed,
        wvNo: this.formList.wvNo,
        poVersion: this.formList.version,
        erpPoNo: this.formList.poNo,
        companyCode: this.formList.companyCode, //公司代码
        wvType: this.formList.wvdoStatus, //入库单状态
        orgCode: this.formList.orgCode,
        odWvItemsList: this.base.tableData,
        odWvCtiPathsList: this.tableDatas,
        odPrefetchCostItemsDetailList: this.costAccruedData.tableData,
        warehouseName: this.warehouseName.warehouseName, //仓库
        warehouseCode: this.warehouseName.warehouseCode, //仓库
        currencyCode: this.formList.currencyCode, //业务币币别
        currencyRate: this.formList.currencyRate, //本位币汇率
        wvAmtS: this.formList.wvAmtS, //含税金额
        isBilled: this.formList.isBilled, //是否完全开发票
        actReceive: this.formList.actReceive, //入库数量
        pickupType: this.formList.pickupType, //提货方式
        wvQtyS: this.formList.actReceive, //入库数量
        remark: this.formList.remark //备注
      };
      api
        .wvWarehouseConfirm(obj)
        .then(res => {
          if (res.code == "success") {
            this.$openSuccess("入库成功");
            this.$router.push({
              //核心语句
              path: "/index/Purchase/warehousing" //跳转的路径
            });
          } else {
            this.$message({
              duration: 1000,
              showClose: true,
              message: "保存失败",
              type: "error"
            });
          }
        })
        .catch();
    },
    //提交保存
    wvSave () {
      if (localStorage.getItem("wvId")) {
        this.wvId = localStorage.getItem("wvId");
      }
      api
        .checkIsCloseableByWv({
          wvId: this.wvId,
          wvAmtS: this.formList.wvAmtS
        })
        .then(res => {
          if (res.data.isCloseable == true) {
            this.$confirm(
              "入库金额达合同/提单溢短装范围，是否入库后关闭合同/提单",
              {
                confirmButtonText: "是",
                cancelButtonText: "否",
                type: "warning"
              }
            ).then(() => {
              localStorage.setItem("isClosed", 1);
              this.mainContract();
            }).catch(() => {
              localStorage.setItem("isClosed", 0);
              this.mainContract();
            })
          } else {
            localStorage.setItem("isClosed", 0);
            this.mainContract();
          }
        })
        .catch();
    },
    //提交
    mainContract () {
      if (localStorage.getItem("wvId")) {
        this.wvId = localStorage.getItem("wvId");
      }
      if (localStorage.getItem("wvVersion")) {
        this.version = localStorage.getItem("wvVersion");
      }
      if (localStorage.getItem("isClosed")) {
        this.isClosed = localStorage.getItem("isClosed");
      }
        //判断第二单位应收数量
      for (const it of this.base.tableData) {
        if(it.shouldReceiveSec==="" || it.shouldReceiveSec===null){
          this.$openWarning("第二单位应收数量不能为空");
          return;
        }else if(it.secQty==="" || it.secQty===null){
          this.$openWarning("第二单位实收数量不能为空");
          return;
        }
      }
      this.base.tableData.map((item, index) => {
       // item.originAmtVat = item.originAmtVat;
        item.originTaxAmt = item.taxAmt;
        item.projectCode = this.formList.projectCode;
        item.projectName = this.formList.projectName; //项目代码
      });
      let params = {
        isClosed: this.isClosed,
        version: this.formList.version,
        warehouseName: this.warehouseName.warehouseName,
        warehouseCode: this.warehouseName.warehouseCode, //仓库
        wvId: this.wvId, //提单id
        postDate: this.formList.postDate,
        currencyRate: this.formList.currencyRate,
        remark: this.formList.remark,
        wvAmtS: this.formList.wvAmtS,
        wvQtyS: this.formList.actReceive,
        erpBlNo: this.formList.erpBlNo, //系统编号
        bizPersonName: this.formList.bizPerson, //业务员
        baseCurrencyRate: this.formList.currencyRate,
        rmbCurrencyRate: this.formList.rmbCurrencyRate,
        payAmtTotalRmb: this.formList.payAmtTotalRmb,
        odWvItemsList: this.base.tableData,
        odWvCtiPathsList: this.tableDatas,
        odPrefetchCostItemsDetailList: this.costAccruedData.tableData //费用预提list
      };
      api.wvCommitApprove(params).then(res => {
        this.$openSuccess("提交成功");
        this.$router.push({
          path: "/index/Purchase/warehousing"
        });
      });
    },

    //修改保存
    changeSub () {
      let costFlag = false;
      this.costAccruedData.tableData.map((item, index) => {
        if (
          !item.supplierName ||
          !item.costName ||
          !item.costAmtVat ||
          !item.currencyName ||
          !item.baseCurrencyRate ||
          !item.taxRate ||
          !item.taxAmt
        ) {
          costFlag = true;
        }
      });
      if (costFlag) {
        this.$openWarning('"费用预提"数据未填写完整');
        return;
      }
      this.errorKey = [];
      if (!this.formList.rmbCurrencyRate) {
        this.errorKey.push('rmbCurrencyRate');
      }
      if (!this.formList.currencyRate) {
        this.errorKey.push('currencyRate');
      }
      if(this.errorKey.length > 0) {
        this.$openWarning('请将必填项补充完整！');
        return false;
      }
        //判断第二单位应收数量
      for (const it of this.base.tableData) {
        if(it.shouldReceiveSec==="" || it.shouldReceiveSec===null){
          this.$openWarning("第二单位应收数量不能为空");
          return;
        }else if(it.secQty==="" || it.secQty===null){
          this.$openWarning("第二单位实收数量不能为空");
          return;
        }
      }
      //费用预提，业务币费用金额字段
      this.costAccruedData.tableData.map(item => {
        item.prefetchAmt = item.costAmtVat;
      });
      this.base.tableData.map(item => {
        item.originTaxAmt = item.taxAmt;
      });
      if (this.formList.erpBlNo != null) {
        if (localStorage.getItem("blId")) {
          this.blId = localStorage.getItem("blId");
        }
        let params = {
          sysBlNo: this.formList.erpBlNo
        };
        api.odBlDetail(params).then(res => {
          this.base.tableData.map((item, index) => {
           // item.originAmtVat = item.originAmtVat;
            item.originTaxAmt = item.taxAmt;
            item.projectCode = this.formList.projectCode;
            item.projectName = this.formList.projectName; //项目代码
          });
          let data = {
            blVersion: res.data.version,
            rmbCurrencyRate: this.formList.rmbCurrencyRate,
            payAmtTotalRmb: this.formList.payAmtTotalRmb,
            wvAmtS:this.formList.wvAmtS,//含税金额
            version: this.formList.version,
            warehouseName: this.warehouseName.warehouseName,
            warehouseCode: this.warehouseName.warehouseCode, //仓库
            wvId: this.wvId, //提单id
            postDate: this.formList.postDate,
            remark: this.formList.remark,
            erpBlNo: this.formList.erpBlNo, //系统编号
            bizPersonName: this.formList.bizPerson, //业务员
            baseCurrencyRate: this.formList.currencyRate,
            odWvItemsList: this.base.tableData,
            odWvCtiPathsList: this.tableDatas,
            wvQtyS: this.formList.actReceive, //入库数量
            shipName:this.formList.shipName,
            odPrefetchCostItemsDetailList: this.costAccruedData.tableData, //费用预提list
            sysSystemAccessoryList: this.uploadList.tableList //附件list
          };
          api
            .updateWv(data)
            .then(res => {
              if (res.code == "success") {
                this.$message({
                  duration: 1000,
                  showClose: true,
                  message: res.data,
                  type: "success"
                });
                this.$router.push({
                  //核心语句
                  path: "/index/Purchase/warehousing" //跳转的路径
                });
              } else {
                this.$message({
                  duration: 1000,
                  showClose: true,
                  message: "保存失败",
                  type: "error"
                });
              }
            })
            .catch();
        });
      } else if (this.formList.erpBlNo == null) {
        let params = {
          poNo: this.formList.erpPoNo
        };
        console.log("params :", params);
        api.selectOdPoContract(params).then(res => {
          let data = {
            poVersion: res.data.version,
            rmbCurrencyRate: this.formList.rmbCurrencyRate,
            wvAmtS:this.formList.wvAmtS,//含税金额
            version: this.formList.version,
            warehouseName: this.warehouseName.warehouseName,
            warehouseCode: this.warehouseName.warehouseCode, //仓库
            wvId: this.wvId, //提单id
            postDate: this.formList.postDate,
            remark: this.formList.remark,
            erpBlNo: this.formList.erpBlNo, //系统编号
            bizPersonName: this.formList.bizPerson, //业务员
            baseCurrencyRate: this.formList.currencyRate,
            odWvItemsList: this.base.tableData,
            odWvCtiPathsList: this.tableDatas,
            wvQtyS: this.formList.actReceive, //入库数量
             shipName:this.formList.shipName,
            odPrefetchCostItemsDetailList: this.costAccruedData.tableData, //费用预提list
            sysSystemAccessoryList: this.uploadList.tableList //附件list
          };
          api
            .updateWv(data)
            .then(res => {
              if (res.code == "success") {
                this.$message({
                  duration: 1000,
                  showClose: true,
                  message: res.data,
                  type: "success"
                });
                this.$router.push({
                  //核心语句
                  path: "/index/Purchase/warehousing" //跳转的路径
                });
              } else {
                this.$message({
                  duration: 1000,
                  showClose: true,
                  message: "保存失败",
                  type: "error"
                });
              }
            })
            .catch();
        });
      }
    },
    //供应商已发货保存
    addData () {
      if (localStorage.getItem("wvId")) {
        this.wvId = localStorage.getItem("wvId");
      }
      let data = {
        wvId: this.wvId,
        odWvCtiPathsList: this.tableDatas
      };
      api
        .purchaseSendOut(data)
        .then(res => {
          if (res.code == "success") {
            this.$message({
              duration: 1000,
              showClose: true,
              message: res.data,
              type: "success"
            });
            this.$router.push({
              //核心语句
              path: "/index/Purchase/warehousing" //跳转的路径
            });
          } else {
            this.$message({
              duration: 1000,
              showClose: true,
              message: "保存失败",
              type: "error"
            });
          }
        })
        .catch();
    },
    //取消
    goBack () {
      this.$router.push({
        //核心语句
        path: "/index/Purchase/warehousing" //跳转的路径
      });
    },
    handleRmbRateChange (value) {
      value = value
        .replace(/[^\d^\.]+/g, "")
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", ".")
        .replace(/^0[^.]/, "")
        .replace(/^\./, "");
      value = value.replace(
        /\.\d{9}/,
        "." + Math.floor((value % 1) * 100000000)
      );
      this.formList.rmbCurrencyRate = value;
      this.formList.payAmtTotalRmb =
        Math.round(value * this.formList.wvAmtS * 100) / 100;
      this.$forceUpdate();
    },
    handleClick (e) { },
    handleClickDele (e) {
      this.$confirm("确定删除吗？", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (e.accessoryId) {
            let params = {
              accessoryId: e.accessoryId,
              version: e.version
            };
            Bmange.delFif(params)
              .then(res => {
                // this.deleIndex(e, this.tableData);
                this.$openSuccess(res.message);
                // this.uploadList.tableList.remove(e)
                let index = this.uploadList.tableList.indexOf(e);
                this.uploadList.tableList.splice(index, 1);
              })
              .catch();
          }
        })
        .catch();
    },
    // 获取表格选中时的数据
    selectRow (e, row) {
      if (e.length === 0) {
        this.selectioned = null;
      }
      if (e.length === 1) {
        this.selectionedIndex = this.base.tableData.indexOf(e[0]);
      } else {
        this.selectionedIndex = null;
      }
      this.selectioned = e;
    },
    addRow () {
      // localStorage.setItem('poId',)
      this.warehousingAddRowShow = true;
    },
    //创建弹框取消
    ladingBillCancle () {
      this.ladingBillShow = false;
    },
    delData () {
      // 删除选中行
      console.log("this.selectioned :", this.selectioned);
      console.log("selectionedIndex :", this.selectionedIndex);
      if (this.selectioned.length == 0) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "未选择数据",
          type: "warning"
        });
      } else if (this.selectioned.length > 1) {
        this.$openWarning("请逐条删除");
      } else {
        let tips = "删除";
        this.$confirm("是否确定" + tips + "?", tips + "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          let idList = [];
          //   this.selectioned.map(item => {
          if (this.selectioned[0].wvItemId) {
            // idlist
            /////批量接口待修改
            let params = {
              wvItemId: this.selectioned[0].wvItemId,
              version: this.selectioned[0].version,
              wvVersion: this.formList.version, //入库主表版本号
              wvId: this.selectioned[0].wvId //入库单ID
            };
            api
              .deleteOdWvItems(params)
              .then(res => {
                this.$message({
                  duration: 1000,
                  showClose: true,
                  message: res.data,
                  type: "success"
                });
                // this.changeMessage();
                this.base.tableData.splice(this.selectionedIndex, 1);
                this.$refs.tableBase.clearSelection();
                this.selectioned = [];
                this.base.tableData.map((item, index) => {
                  item.wvRowno = (index + 1) * 10;
                });
                this.handleTotalCalc();
              })
              .catch(err => { });
          } else {
            //   for (const el of this.selectioned) {
            //     this.base.tableData = this.base.tableData.filter(item => item !== el)
            //   }
            this.base.tableData.splice(this.selectionedIndex, 1);
            this.$refs.tableBase.clearSelection();
            this.selectioned = [];
            this.base.tableData.map((item, index) => {
              item.wvRowno = (index + 1) * 10;
            });
            this.handleTotalCalc();
          }
        });
      }
    },
    dialogCheck (selection, row) {
      this.$refs.table.clearSelection();
      if (selection.length === 0) {
        // 判断selection是否有值存在
        return;
      }
      if (row) {
        this.selectioned = row;
        this.index = this.tableDatas.indexOf(row);
        this.$refs.table.toggleRowSelection(row, true);
      }
    },
    dialogCheckbase (selection, row) {
      this.$refs.table.clearSelection();
      if (selection.length === 0) {
        // 判断selection是否有值存在
        return;
      }
      if (row) {
        this.selectioned = selection;
        this.index = this.base.tableData.indexOf(row);
        this.$refs.table.toggleRowSelection(row, true);
      }
    },
    warehousingAddRowCancle () {
      this.warehousingAddRowShow = false;
    },
    //仓库弹窗打开
    warehouseTips () {
      this.warehouseShow = true;
    },
    //仓库确认
    warehouseSure (e) {
      this.warehouseShow = false;
      this.warehouseName.warehouseName = e.warehouseName;
      this.warehouseName.warehouseCode = e.warehouseCode;
    },
    // //费用名称确定
    // costSelectSure(e) {
    //   this.costAccruedData.costShow = false;
    //   this.costAccruedData.tableData[this.costAccruedData.index].costName =
    //     e.costName;
    //   this.costAccruedData.tableData[this.costAccruedData.index].shareDim =
    //     e.shareDim;
    // },
    //费用名称
    costCallback (e) {
      if (e) {
        // this.costAccruedData.costName = e;
        this.costAccruedData.tableData[this.costAccruedData.index].costName =
          e.costsName;
        this.costAccruedData.tableData[this.costAccruedData.index].costCategoryCode =
          e.costCategoryCode;
        this.costAccruedData.tableData[this.costAccruedData.index].shareDim =
          e.shareDim;
      }
      this.costAccruedData.costShow = false;
    },
    // //费用名称取消
    // costSelectCancle() {
    //   this.costAccruedData.costShow = false;
    // },
    costSelectTips () {
      this.costAccruedData.costShow = true;
    },
    //仓库取消
    warehouseCancle () {
      this.warehouseShow = false;
    },
    //分页
    handleSizeChange (val) {
      this.pageSize = val;
      this.queryData();
    },
    handleCurrentChange (val) {
      this.pageNum = val;
      this.queryData();
    },
    //输入数量校验
    handleActReceiceRule (scope) {
      if (scope.row.actReceive > scope.row.shouldReceive) {
        this.$openWarning('"实收数量"应不大于"应收数量"');
        scope.row.actReceive = null;
      }
    },
    //入库、金额总数
    handleTotalCalc () {
      let actReceive = 0;
      let wvAmtS = 0;
      this.base.tableData.map((item, index) => {
        if (parseFloat(item.actReceive) > 0) {
          actReceive += parseFloat(item.actReceive);
        }
        wvAmtS += parseFloat(item.originAmtVat);
      });
      this.formList.actReceive = Math.round(actReceive * 10000) / 10000;
      this.formList.wvAmtS = Math.round(wvAmtS * 100) / 100;
      this.formList.payAmtTotalRmb =
        Math.round(this.formList.rmbCurrencyRate * this.formList.wvAmtS * 100) /
        100;
    },
     //根据公司id和业务币别获取本位币汇率
    getParitiesForIssuePay(){
        api.getParitiesForIssuePay({
          companyId:this.formList.companyId,
          fromCurrencyCode: this.formList.currencyCode,
      }).then((res) => {
        this.formList.currencyRate = res.data.parities;
        this.base.tableData.forEach((item,index)=>{
          this.originAmtCh(item, index);  
          this.taxRateCh (item, index); 
        });
        this.getRmbInfo();
      }).catch((err) => { })
    },
    //获取rmb信息
    getRmbInfo () {
      api
        .getParitiesByCode({
          formCurrencyCode: this.formList.currencyCode,
          toCurrencyCode: "CNY"
        })
        .then(res => {
          if (!this.formList.rmbCurrencyRate) {
            this.formList.rmbCurrencyRate = res.data.parities;
          }
          this.formList.payAmtTotalRmb =
            Math.round(
              this.formList.rmbCurrencyRate * this.formList.wvAmtS * 100
            ) / 100;
          this.$forceUpdate();
        })
        .catch(err => { });
    },
    //合计计算
    getSummaries (param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
        } else if (
          index === 13 ||
          index === 16 ||
          index === 19 ||
          index === 20 ||
          index === 21 ||
          index === 22 ||
          index === 24 ||
          index === 25 ||
          index === 26
        ) {
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                //let res = (prev * 100000 + curr * 100000) / 100000;
                let res=calculation.accAdd(prev,curr);
                if (
                  index === 19 ||
                  index === 20 ||
                  index === 21 ||
                  index === 22 ||
                  index === 24 ||
                  index === 25 ||
                  index === 26
                ) {
                  if (index === 20) {
                    this.totalOriginAmt = res;
                  }
                  return res.toFixed(2);
                }
                return res;
              } else {
                return prev;
              }
            }, 0);
          } else {
            sums[index] = "";
          }
        } else {
          sums[index] = "";
        }
      });
      return sums;
    },
    //文件上传
    // beforeUpload (file) {
    //   let formdata = new FormData();
    //   formdata.append("file", file); //传文件
    //   formdata.append("_sysid_", this.sysid); //传其他参数
    //   api.uploadFile(formdata).then(res => {
    //     let list = {
    //       fileOldName: res.data.oldFilename,
    //       fileNewName: res.data.newFilename,
    //       fileType: 1, //文件类型
    //       rowno: (this.uploadList.tableList.length + 1) * 10,
    //       fileServerAddress: res.data.filePath
    //     };
    //     this.uploadList.tableList.push(list);
    //     this.uploadList.tableList.map((item, index) => {
    //       item.lineNo = index + 1;
    //     });
    //   });
    //   return false;
    // },
    //文件上传
    beforeUpload (file) {
      var that = this;
      let _this = this.uploadList;
      let formdata = new FormData();
      formdata.append("file", file); //传文件
      //formdata.append('_sysid_',_this.sysid);//传其他参数
      api.uploadFile(formdata).then(function (res) {
        if (res.code == "success") {
          _this.fileList = [];
          let fileData = res.data;
          var list = {
            fileOldName: fileData.oldFilename,
            fileNewName: fileData.newFilename,
            fileType: 1, //文件类型
            fileSuffix: fileData.fileExt,//文件扩展名
            // fileAbsolutePath:"",//文件绝对路径
            // fileRelativePaths:"",//文件相对路径
            // rowno: (this.uploadList.tableList.length + 1) * 10,
            fileServerAddress: fileData.filePath,//文件服务器地址
            createdTime: that.$nowDate(),
            isInactive: 0,//启用，禁用
            createdBy: sessionStorage.getItem("userName") || "admin",
          };
          _this.tableList.unshift(list);
        }
      });
      return false;
    },
    //确定上传
    submitUpload () {
      //确定上传
      this.$refs.newupload.submit();
    },
    //移除
    handleRemove (file, fileList) { },
    handleAvatarSuccess (res, file) {
      // eslint-disable-next-line no-console
      console.log(res, file);
    },
      //下载
    handleClickE(row){
       window.open(row.fileServerAddress);
    },
  },
  components: {
    warehousingAddRow,
    warehouseSelect,
    supplierSelect,
    costSelect,
    matterSelect,
    coinSelect,
    batchSelect
  }
};
</script>
<style lang="scss" scoped>
.remark-style {
  display: flex;
  padding-top: 10px;
  justify-content: space-around;
  width: 100%;
  padding-bottom: 10px;
  label {
    width: 6.89%;
    text-align: right;
    line-height: 31px;
    padding-right: 9px;
  }
  .empty-class {
    width: 3.66%;
  }
}
.fixedHeight {
  height: 30px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
