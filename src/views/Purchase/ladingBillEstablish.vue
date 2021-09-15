<template>
  <div class="ladingBillEstablish content-div2">
    <el-divider></el-divider>
    <div class="button-div">
      <el-button class="query-button"
                 v-if="type != 2 && !blId"
                 @click="addSub()"
                 icon="el-icon-suitcase">保存</el-button>
      <el-button class="query-button"
                 v-else-if="type != 2"
                 @click="changeSub()"
                 icon="el-icon-suitcase">保存</el-button>
      <el-button v-else-if="type == 2 && ladingStatus == 10110010||ladingStatus==10110013&&type == 2"
                 class="query-button"
                 @click="saveData()"
                 icon="el-icon-suitcase"
                 :disabled="disArrivalPortList">保存</el-button>
      <el-button v-else-if="type == 2 && ladingStatus == 10110020||ladingStatus==10110025&&type == 2"
                 class="query-button"
                 @click="addData()"
                 icon="el-icon-suitcase"
                 :disabled="disCustomsClearance">保存</el-button>
      <el-button @click="goBack"
                 icon="el-icon-close">取消</el-button>
    </div>
    <el-tabs class="el-tabs"
             v-model="activeName2"
             type="card"
             @tab-click="handleClick">
      <el-tab-pane label="基本信息"
                   name="first">
        <div class="index-div3">
          <el-col :span="5"
                  class="el-col">
            <label>系统提单号</label>
            <el-input v-model="formList.sysBlNo"
                      class="el-inputs"
                      size="small"
                      placeholder="保存后自动生成"
                      :disabled="creactNo"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>采购合同号</label>
            <el-input v-model="formList.contractNo"
                      class="el-inputs"
                      size="small"
                      placeholder="请选择"
                      :disabled="creactNo"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>外部合同号</label>
            <el-input v-model="formList.extCode"
                      class="el-inputs"
                      size="small"
                      placeholder="请选择"
                      :disabled="creactNo"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col  el-col-required">
            <label><span class="must-full">*</span>供应商</label>
            <el-input v-model="formList.supplierName"
                      class="el-inputs"
                      :class="errorKey.includes('supplierName') ? 'inputRed' : ''"
                      size="small"
                      placeholder="请选择"
                      :disabled="creactNo"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col  el-col-required">
            <label><span class="must-full">*</span>公司</label>
            <el-input v-model="formList.companyName"
                      class="el-inputs"
                      :class="errorKey.includes('companyName') ? 'inputRed' : ''"
                      size="small"
                      @change="companyChange"
                      placeholder="请选择"
                      :disabled="creactNo"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col  el-col-required">
            <label><span class="must-full">*</span>部门</label>
            <el-input v-model="formList.orgName"
                      class="el-inputs"
                      :class="errorKey.includes('orgName') ? 'inputRed' : ''"
                      size="small"
                      placeholder="请选择"
                      :disabled="creactNo"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col  el-col-required">
            <label><span class="must-full">*</span>业务员</label>
            <el-select v-model="formList.bizPersonName"
                       placeholder="请选择"
                       clearable
                       size="small"
                       class="el-select"
                       :class="errorKey.includes('bizPersonName') ? 'inputRed' : ''"
                       disabled
                       @change="handlebizChange">
              <el-option v-for="item in bizStatus"
                         :key="item.value"
                         :label="item.bizPersonName"
                         :value="item.bizPersonCode">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="5"
                  class="el-col  el-col-required">
            <label><span class="must-full">*</span>合同类型</label>
            <el-input v-model="formList.poType"
                      class="el-inputs"
                      :class="errorKey.includes('poType') ? 'inputRed' : ''"
                      size="small"
                      placeholder="请选择"
                      :disabled="creactNo"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-colc">
            <label>单据状态</label>
            <el-select v-model="formList.blStatus"
                       placeholder="请选择"
                       clearable
                       size="small"
                       class="el-select"
                       @change="handleChange"
                       disabled>
              <el-option v-for="item in blStatus"
                         :key="item.value"
                         :label="item.dict_value"
                         :value="item.dict_code">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="5" class="el-col-required">
            <label><span class="must-full">*</span>预计到港日</label>
            <el-date-picker v-model="predictArrivedDate"
                            type="date"
                            class="el-input2"
                            :class="errorKey.includes('predictArrivedDate') ? 'inputRed' : ''"
                            size="small"
                            placeholder="选择日期"
                            :disabled="tabpane">
            </el-date-picker>
          </el-col>
          <el-col :span="5"
                  class="el-col  el-col-required">
            <label><span class="must-full">*</span>免箱期限</label>
            <el-input v-model="formList.unboxLimit"
                      class="el-inputs"
                      :class="errorKey.includes('unboxLimit') ? 'inputRed' : ''"
                      size="small"
                      placeholder="请选择"
                      oninput="value=value.replace(/[^\d]/g,'')"
                      :disabled="tabpane"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>交货期限</label>
            <el-date-picker v-model="delivery"
                            type="daterange"
                            class="el-input2"
                            size="small"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :disabled="tabpane">
            </el-date-picker>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>贸易国别</label>
            <el-input v-model="formList.tradeCountryName"
                      class="el-inputs"
                      placeholder="请选择"
                      size="small"
                      :disabled="creactNo"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>业务币币别</label>
            <el-input v-model="formList.currencyCode"
                      class="el-inputs"
                      placeholder="请输入"
                      size="small"
                      :disabled="creactNo"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col  el-col-required">
            <label><span class="must-full">*</span>本位币汇率</label>
            <el-input v-model="formList.currencyRate"
                      class="el-inputs"
                      size="small"
                      placeholder="请选择"
                      :disabled="tabpane"
                      @input="handlecurrencyRate($event)"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>提单金额</label>
            <el-input v-model="sumOriginAmt"
                      class="el-inputs"
                      size="small"
                      :disabled="creactNo"
                      oninput="value = value.replace(/\.\d{3}/, '.' + Math.floor((value % 1) * 10000))"
                      @input="originPriceCh;handleTotalCalc()"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col  el-col-required">
            <label><span class="must-full">*</span>人民币汇率</label>
            <el-input v-model="formList.rmbCurrencyRate"
                      class="el-inputs"
                      size="small"
                      placeholder="请选择"
                      :disabled="tabpane"
                      @input="handleRmbCurrencyRate(formList.rmbCurrencyRate)"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>人民币金额</label>
            <el-input v-model="formList.payAmtTotalRmb"
                      class="el-inputs"
                      size="small"
                      oninput="value = value.replace(/\.\d{3}/, '.' + Math.floor((value % 1) * 10000))"
                      :disabled="creactNo"></el-input>
          </el-col>
          <el-col :span="24"
                  class="el-col el-full"
                  style="margin-top：10px">
            <label style="width:6.6%;vertical-align: 8px;">备注</label>
            <el-input type="textarea"
                      autosize
                      v-model="formList.remark"
                      size="small"
                      class="el-textarea"
                      placeholder="请输入内容"
                      :disabled="tabpane">
            </el-input>
          </el-col>
        </div>
        <div class="button-div">
          <el-button class="addBut"
                     @click="addRow"
                     :disabled="tabpane"
                     icon="el-icon-plus">新增行</el-button>
          <el-button class="addBut"
                     @click="delData"
                     :disabled="tabpane"
                     icon="el-icon-minus">删除行</el-button>
        </div>
        <div class="el-table-div">
          <el-form :rules="formData.rules"
                   :model="formData"
                   ref="formDom"
                   class="demo-ruleForm">
            <el-table border
                      center
                      :data="detial.tableData"
                      class="el-table"
                      tooltip-effect="dark"
                      style="width: 100%"
                      @selection-change="selectRow"
                      @row-dblclick="tableDataBdlclick"
                      @select-all="costDialogCheck"
                      @select="costDialogCheck"
                      max-height="293"
                      v-loading="loading">
              <el-table-column type="selection"
                               width="45"
                               align="center"></el-table-column>
              <el-table-column label="行号"
                               prop="blRowno"
                               width="60"
                               align="center"></el-table-column>
              <el-table-column prop="contractNo"
                               :show-overflow-tooltip="true"
                               label="采购合同号"
                               width="100">
              </el-table-column>
              <el-table-column prop="extCode"
                               :show-overflow-tooltip="true"
                               label="外部合同号"
                               width="100">
              </el-table-column>
              <el-table-column prop="contractRowno"
                               :show-overflow-tooltip="true"
                               label="采购合同行号"
                               width="100">
              </el-table-column>
              <el-table-column label="物料编号"
                               width="100">
                <template slot-scope="scope">
                  <div v-if="scope.row.edit">
                    <el-input size="mini"
                              placeholder="请输入内容"
                              v-model="scope.row.goodsCode"
                              disabled></el-input>
                    <span class="comicon2"
                          @click="matterTips"><i class="el-icon-search"></i></span>
                  </div>
                  <div v-else>
                    {{ scope.row.goodsCode }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="goodsName"
                               :show-overflow-tooltip="true"
                               label="物料名称"
                               width="100">
              </el-table-column>
              <el-table-column prop="goodsCat"
                               :show-overflow-tooltip="true"
                               label="物料大类"
                               width="100">
              </el-table-column>
              <el-table-column prop="goodsSpec"
                               :show-overflow-tooltip="true"
                               label="物料规格"
                               width="100">
              </el-table-column>
              <!-- <el-table-column label="海关编码"
                               width="100">
                <template slot-scope="scope">
                  <div v-if="scope.row.edit">
                    <el-input size="mini"
                              placeholder="请输入内容"
                              v-model="scope.row.gwBoxNo"
                              :disabled="tabpane"></el-input>
                  </div>
                  <div v-else>
                    {{ scope.row.gwBoxNo }}
                  </div>
                </template>
              </el-table-column> -->
              <el-table-column prop="itemUnitName"
                               :show-overflow-tooltip="true"
                               label="基础单位"
                               width="100">
              </el-table-column>
              <el-table-column label="到货数量"
                               :show-overflow-tooltip="true"
                               width="100">
                <template slot-scope="scope">
                  <div v-if="scope.row.edit">
                    <el-input size="mini"
                              placeholder="请输入内容"
                              v-model="scope.row.arrivedQty"
                              :disabled="tabpane"
                              @input="handleArrivedQtyChange(scope)"></el-input>
                  </div>
                  <div v-else>
                    {{ scope.row.arrivedQty }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="业务币含税单价"
                               :show-overflow-tooltip="true"
                               width="120">
                <template slot-scope="scope">
                  <div v-if="scope.row.edit">
                    <el-input size="mini"
                              placeholder="请输入内容"
                              v-model="scope.row.originPrice"
                              @input="handleOriginPriceChange(scope)"
                              :disabled="tabpane"></el-input>
                  </div>
                  <div v-else>
                    {{ scope.row.originPrice }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="业务币含税金额"
                               :show-overflow-tooltip="true"
                               width="120">
                <template slot-scope="scope">
                  <div v-if="scope.row.edit">
                    <el-input size="mini"
                              placeholder="请输入内容"
                              v-model="scope.row.originAmt"
                              @input="handleOriginAmtChange(scope)"
                              :disabled="tabpane"></el-input>
                  </div>
                  <div v-else>
                    {{ scope.row.originAmt }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="unorginAmt"
                               label="业务币不含税金额"
                               width="120"
                               :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column label="增值税率%"
                               :show-overflow-tooltip="true"
                               width="100">
                <template slot-scope="scope">
                  <div v-if="scope.row.edit">
                    <el-input size="mini"
                              placeholder="请输入内容"
                              v-model="scope.row.taxRate"
                              @input="handleTaxRateChange(scope)"
                              :disabled="tabpane"></el-input>
                  </div>
                  <div v-else>
                    {{ scope.row.taxRate }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="业务币增值税额"
                               :show-overflow-tooltip="true"
                               width="120">
                <template slot-scope="scope">
                  <div v-if="scope.row.edit">
                    <el-input size="mini"
                              placeholder="请输入内容"
                              v-model="scope.row.taxAmt"
                              @input="handleTaxAmtChange(scope)"
                              :disabled="tabpane"></el-input>
                  </div>
                  <div v-else>
                    {{ scope.row.taxAmt }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="basePrice"
                               label="本币含税单价"
                               width="120"
                               :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column prop="baseAmt"
                               label="本币含税金额"
                               width="120"
                               :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column prop="baseNoAmt"
                               label="本币不含税金额"
                               width="120"
                               :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column prop="baseTax"
                               label="本币增值税额"
                               width="120"
                               :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column label="第二单位"
                               width="100"
                               :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <div v-if="scope.row.edit">
                    <el-input size="mini"
                              placeholder="请输入内容"
                              v-model="scope.row.secUnitName"
                              :disabled="tabpane"></el-input>
                  </div>
                  <div v-else>
                    {{ scope.row.secUnitName }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="第二数量"
                               width="100"
                               :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <div v-if="scope.row.edit">
                    <el-input size="mini"
                              placeholder="请输入内容"
                              v-model="scope.row.secQty"
                              :disabled="tabpane"></el-input>
                  </div>
                  <div v-else>
                    {{ scope.row.secQty }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="备注"
                               width="100"
                               :show-overflow-tooltip="true">
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
          </el-form>
        </div>
        <!-- 创建行弹窗 -->
        <ladingBill-AddRow v-if="ladingBillShow"
                           :tipShow="ladingBillShow"
                           @ladingBillCancle="ladingBillCancle"
                           @ladingBillAddRowSure="ladingBillAddRowSure"></ladingBill-AddRow>
        <!-- 物料编号-->
        <matter-select v-if="matterShow"
                       :tipShow="matterShow"
                       @matterCancle="matterCancle"
                       @matterSure="matterSure">
        </matter-select>
        <!-- 选择供应商弹窗 -->
        <supplier-Select v-if="supplierShow"
                         :tipShow="supplierShow"
                         @supplierCancle="supplierCancle"
                         @supplierSure="supplierSure"></supplier-Select>
      </el-tab-pane>
      <el-tab-pane label="运输信息"
                   name="second">
        <div class="index-div3">
          <el-col :span="5"
                  class="el-col">
            <label><span class="must-full">*</span>最迟交期</label>
            <el-date-picker v-model="deliveryCutoffDate"
                            type="date"
                            class="el-input2"
                            size="small"
                            placeholder="选择日期"
                            :disabled="tabpane">
            </el-date-picker>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label><span class="must-full">*</span>价格条款</label>
            <el-select v-model="tradeFormList.priceTem"
                       placeholder="请选择"
                       size="small"
                       @change="priceTemChange"
                       :disabled="tabpane">
              <el-option v-for="item in priceTemList"
                         :key="item.value"
                         :label="item.dict_value"
                         :value="item.dict_code">
              </el-option>
            </el-select>
          </el-col>
          <!-- <el-col :span="5"
                  class="el-col">
            <label class="labelstyle"><span class="must-full">*</span>到达港口</label>
            <el-input v-model="tradeFormList.arrivedPort"
                      class="el-inputs"
                      size="small"
                      placeholder="请选择"
                      disabled></el-input>
            <span class="comicon"
                  @click="arrivedPortTip"><i class="el-icon-search"></i></span>
          </el-col> -->
          <el-col :span="5"
                  class="el-col">
            <label class="labelstyle"><span class="must-full">*</span>运输方式</label>
            <el-select v-model="tradeFormList.transMode"
                       placeholder="请选择"
                       size="small"
                       @change="handletransModeChange"
                       :disabled="tabpane">
              <el-option v-for="item in transModeList"
                         :key="item.value"
                         :label="item.dict_value"
                         :value="item.dict_code">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label><span class="must-full">*</span>船运方式</label>
            <el-select v-model="tradeFormList.shipMode"
                       placeholder="请选择"
                       size="small"
                       @change="handleshipChange"
                       :disabled="tabpane">
              <el-option v-for="item in shipModeList"
                         :key="item.value"
                         :label="item.dict_value"
                         :value="item.dict_code">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="5"
                  class="el-col texcen">
            <el-checkbox v-model="tradeFormList.isTransfered"
                      label="isTransfered"
                      @input="radioChange" :disabled="tabpane">转船</el-checkbox>
            <el-checkbox v-model="tradeFormList.isBatched"
                      label="isBatched"
                      @input="radioChanges" :disabled="tabpane">分批</el-checkbox>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label><span class="must-full">*</span>装货港</label>
            <el-input v-model="tradeFormList.loadingPort"
                      class="el-inputs"
                      size="small"
                      placeholder="请选择"
                      disabled></el-input>
            <span class="comicon"
                  @click="loadingPortTip"><i class="el-icon-search"></i></span>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label><span class="must-full">*</span>卸货港</label>
            <el-input v-model="tradeFormList.unloadingPort"
                      class="el-inputs"
                      size="small"
                      placeholder="请选择"
                      disabled></el-input>
            <span class="comicon"
                  v-if="this.ladingStatus==10110013||this.ladingStatus==10110025"
                  @click="unloadingPortTip"><i class="el-icon-search"></i></span>
            <span class="comicon"
                  v-else
                  @click="unloadingPortTip"><i class="el-icon-search"></i></span>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label><span class="must-full">*</span>目的地</label>
            <el-input v-model="tradeFormList.destination"
                      class="el-inputs"
                      size="small"
                      placeholder="请选择"
                      :disabled="tabpane"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>船名</label>
            <el-input v-model="tradeFormList.shipName"
                      class="el-inputs"
                      size="small"
                      placeholder="请输入"
                      :disabled="tabpane"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>船舶识别号</label>
            <el-input v-model="tradeFormList.shipNo"
                      class="el-inputs"
                      size="small"
                      placeholder="请输入"
                      @input="tradeChange"
                      :disabled="tabpane"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label><span class="must-full">*</span>装卸时间</label>
            <el-select v-model="loadTimeType"
                       placeholder="请选择"
                       :disabled="tabpane">
              <el-option v-for="item in zxsjList"
                         :key="item.dict_code"
                         :label="item.dict_value"
                         :value="item.dict_code">
              </el-option>
            </el-select>
          </el-col>
          <!-- 港口弹窗 -->
          <Arrival-Port v-if="ArrivalPortsShow"
                        :tipShow="ArrivalPortsShow"
                        @ArrialPortCancle="ArrialPortsCancle"
                        @ArrialPortSure="ArrialPortsSure"></Arrival-Port>
          <!-- 装货港弹窗 -->
          <Arrival-Port v-if="loadingPortShow"
                        :tipShow="loadingPortShow"
                        @ArrialPortCancle="loadingPortCancle"
                        @ArrialPortSure="loadingPortSure"></Arrival-Port>
          <!-- 卸货港弹窗 -->
          <Arrival-Port v-if="unloadingPortShow"
                        :tipShow="unloadingPortShow"
                        @ArrialPortCancle="unloadingPortCancle"
                        @ArrialPortSure="unloadingPortSure"></Arrival-Port>
        </div>
        <div class="button-div">
          <el-button class="addBut"
                     @click="tableAddRow"
                     :disabled="tabpane"
                     icon="el-icon-plus">新增行</el-button>
          <el-button class="addBut"
                     @click="tableRowdelData"
                     :disabled="tabpane"
                     icon="el-icon-minus">删除行</el-button>
        </div>
        <div class="el-table-div">
          <el-table border
                    center
                    :data="tableDatas"
                    class="el-table"
                    tooltip-effect="dark"
                    style="width: 100%"
                    ref="table"
                    @row-dblclick="tablelclick"
                    @selection-change="selectRow"
                    @select-all="dialogCheck"
                    @select="dialogCheck"
                    v-loading="loading">
            <el-table-column type="selection"
                             width="45"
                             align="center"></el-table-column>
            <el-table-column label="序号"
                             type="index"
                             width="60"
                             align="center"></el-table-column>
            <el-table-column label="出厂运输方式">
              <template slot-scope="scope"
                        :show-overflow-tooltip="true">
                <div v-if="scope.row.edit">
                  <el-select clearable
                             size="mini"
                             v-model="scope.row.leaveTransferMode"
                             placeholder="请选择"
                             :disabled="tabpane">
                    <el-option v-for="item in transModeList"
                               :key="item.value"
                               :label="item.dict_value"
                               :value="item.dict_code"></el-option>
                  </el-select>
                </div>
                <div v-else>
                  <span v-for="(item,index) in transModeList"
                        v-show="item.dict_code==scope.row.leaveTransferMode"
                        :key="index">{{item.dict_value}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="目的地"
                             :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            placeholder="请输入内容"
                            v-model="scope.row.transferTarget"
                            :disabled="tabpane"></el-input>
                </div>
                <div v-else>
                  {{ scope.row.transferTarget }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="承运方"
                             :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            placeholder="请输入内容"
                            v-model="scope.row.transferPlanMan"
                            :disabled="tabpane"></el-input>
                </div>
                <div v-else>
                  {{ scope.row.transferPlanMan }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="承运人"
                             :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            placeholder="请输入内容"
                            v-model="scope.row.transferExcutor"
                            :disabled="tabpane"></el-input>
                </div>
                <div v-else>
                  {{ scope.row.transferExcutor }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="承运联系方式"
                             :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            placeholder="请输入内容"
                            v-model="scope.row.transferExcutorTel"
                            :disabled="tabpane"></el-input>
                </div>
                <div v-else>
                  {{ scope.row.transferExcutorTel }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="备注"
                             :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            placeholder="请输入内容"
                            v-model="scope.row.transferNote"
                            :disabled="tabpane"></el-input>
                </div>
                <div v-else>
                  {{ scope.row.transferNote }}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="业务进程"
                   name="third">
        <div class="table_title">到单</div>
        <div class="el-table-div">
          <el-table border
                    center
                    :data="ToSingle"
                    class="el-table"
                    tooltip-effect="dark"
                    style="width: 100%"
                    ref="table"
                    @row-dblclick="dblclick"
                    @selection-change="selectRow"
                    @select-all="dialogCheck"
                    @select="dialogCheck"
                    v-loading="loading">
            <!-- <el-table-column type="selection"
                             width="45"
                             align="center"></el-table-column> -->
            <el-table-column label="序号"
                             type="index"
                             width="60"
                             align="center"></el-table-column>
            <el-table-column label="提单号"
                             :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            placeholder="请输入内容"
                            v-model="scope.row.bizBlNo"
                            @change="bizBlNoChange"></el-input>
                </div>
                <div v-else>
                  {{ scope.row.bizBlNo }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="提单类型"
                             :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-select v-model="scope.row.blType"
                             size="small"
                             placeholder="请选择">
                    <el-option v-for="item in currSel"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value"
                               @change="blTypeChange">
                    </el-option>
                  </el-select>
                </div>
                <div v-else>
                  {{ scope.row.blType }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="blDate"
                             :show-overflow-tooltip="true"
                             label="提单日期"
                             width="270">
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-date-picker v-model="scope.row.blDate"
                                  type="date"
                                  size="small"
                                  format="yyyy-MM-dd"
                                  value-format="yyyy-MM-dd"
                                  placeholder="选择日期">
                  </el-date-picker>
                </div>
                <div v-else>
                  {{ scope.row.blDate }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="提单发货人"
                             :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            placeholder="请输入内容"
                            v-model="scope.row.blSender"></el-input>
                </div>
                <div v-else>
                  {{ scope.row.blSender }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="柜号"
                             :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            placeholder="请输入内容"
                            v-model="scope.row.counterNo"></el-input>
                </div>
                <div v-else>
                  {{ scope.row.counterNo }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="提单数量"
                             :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            placeholder="请输入内容"
                            v-model="scope.row.blQty"
                            @input="dhNumber"></el-input>
                </div>
                <div v-else>
                  {{ scope.row.blQty }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="备注"
                             :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            placeholder="请输入内容"
                            v-model="scope.row.infoArrivedRemark"></el-input>
                </div>
                <div v-else>
                  {{ scope.row.infoArrivedRemark }}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="table_title">到港</div>
        <div class="el-table-div">
          <el-table border
                    center
                    :data="ArrivalPortList"
                    class="el-table"
                    tooltip-effect="dark"
                    style="width: 100%"
                    ref="table"
                    @row-dblclick="dglclick"
                    @select="ArrivalPortdialogCheck"
                    v-loading="loading">
            <!-- <el-table-column type="selection"
                             width="45"
                             align="center"></el-table-column> -->
            <el-table-column label="序号"
                             type="index"
                             width="60"
                             align="center"></el-table-column>
            <el-table-column label="货代公司"
                             :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            placeholder="请输入内容"
                            v-model="scope.row.goodsProxyCompany"
                            disabled></el-input>
                  <span class="comicon2"
                        @click="goodsProxyTips"><i class="el-icon-search"></i></span>
                </div>
                <div v-else>
                  {{ scope.row.goodsProxyCompany }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="卸货港"
                             :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input v-model="scope.row.unloadPort"
                            size="small"
                            placeholder="请输入内容"
                            disabled></el-input>
                  <span class="comicon2"
                        @click="arrivalTip"><i class="el-icon-search"></i>
                  </span>
                </div>
                <div v-else>
                  {{ scope.row.unloadPort }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="arrivedInfoDate"
                             label="到单寄出日"
                             width="270">
              <template slot-scope="scope"
                        :show-overflow-tooltip="true">
                <div v-if="scope.row.edit">
                  <el-date-picker v-model="scope.row.arrivedInfoDate"
                                  type="date"
                                  size="small"
                                  format="yyyy-MM-dd"
                                  value-format="yyyy-MM-dd"
                                  placeholder="选择日期">
                  </el-date-picker>
                </div>
                <div v-else>
                  {{ scope.row.arrivedInfoDate }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="actArrivedDate"
                             :show-overflow-tooltip="true"
                             label="实际到港日期"
                             width="270">
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-date-picker v-model="scope.row.actArrivedDate"
                                  type="date"
                                  size="small"
                                  format="yyyy-MM-dd"
                                  value-format="yyyy-MM-dd"
                                  placeholder="选择日期"
                                  @change="actchange">
                  </el-date-picker>
                </div>
                <div v-else>
                  {{ scope.row.actArrivedDate }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="备注"
                             :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            placeholder="请输入内容"
                            v-model="scope.row.goodsArrivedRemark"></el-input>
                </div>
                <div v-else>
                  {{ scope.row.goodsArrivedRemark }}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="table_title">清关</div>
        <div class="el-table-div">
          <el-table border
                    center
                    :data="CustomsClearance"
                    class="el-table"
                    tooltip-effect="dark"
                    style="width: 100%"
                    ref="table"
                    @row-dblclick="qglclick"
                    @select="CustomsdialogCheck"
                    v-loading="loading">
            <!-- <el-table-column type="selection"
                             width="45"
                             align="center"></el-table-column> -->
            <el-table-column label="序号"
                             type="index"
                             width="60"
                             align="center"></el-table-column>
            <el-table-column label="报关日期"
                             width="270">
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-date-picker v-model="scope.row.gwDate"
                                  type="date"
                                  size="small"
                                  format="yyyy-MM-dd"
                                  value-format="yyyy-MM-dd"
                                  placeholder="选择日期"
                                  :show-overflow-tooltip="true">
                  </el-date-picker>
                </div>
                <div v-else>
                  {{ scope.row.gwDate }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="报关单号"
                             :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            placeholder="请输入内容"
                            v-model="scope.row.gwCode"></el-input>
                </div>
                <div v-else>
                  {{ scope.row.gwCode }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="免柜天数"
                             :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            placeholder="请输入内容"
                            v-model="scope.row.freeCounterDays"
                            @change="addfreeCounterDays"
                            oninput="value = value.replace(/[^\d]/g,'')"
                            ></el-input>
                </div>
                <div v-else>
                  {{ scope.row.freeCounterDays }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="freeCounterDate"
                             label="免柜日期"
                             :show-overflow-tooltip="true"
                             width="270">
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-date-picker v-model="scope.row.freeCounterDate"
                                  type="date"
                                  size="small"
                                  format="yyyy-MM-dd"
                                  value-format="yyyy-MM-dd"
                                  placeholder="选择日期">
                  </el-date-picker>
                </div>
                <div v-else>
                  {{ scope.row.freeCounterDate }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="备注"
                             :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            placeholder="请输入内容"
                            v-model="scope.row.clearanceArrivedRemark"></el-input>
                </div>
                <div v-else>
                  {{ scope.row.clearanceArrivedRemark }}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="打印及附件"
                   name="fifth">
        <!-- <div class="flex_center">
          <div class="button-div">
            <el-button class="query-button olbutton">附件存档</el-button>
            <span>文件上传上限20M</span>
          </div>
        </div> -->
        <div class="button-div">
         <el-upload class="upload-demo"
                    ref="newupload"
                    :action="action"
                    :before-upload="beforeUpload"
                    :on-success="handleAvatarSuccess"
                    :headers="uploadHeaders"
                    :multiple="false"
                    :file-list="fileList"
                    :auto-upload="false"
                    :on-remove="handleRemove"
                    :limit="1">
          <!-- <el-button class="query-button olbutton">附件存档</el-button>
          <span style="vertical-align: middle;">文件上传上限20M</span> -->
            <el-button slot="trigger" style="color:#3E3F42;" size="small" icon="el-icon-paperclip" >选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" class="addBut" icon="el-icon-upload"  @click="submitUpload">上传</el-button>
        </el-upload>
        </div>
        <div class="">
          <el-table border
                    center
                    :data="tableDataw"
                    class="el-table">
            <el-table-column type="index"
                             label="序号"> </el-table-column>
            <el-table-column show-overflow-tooltip
                             prop="fileOldName"
                             label="文件名称">
            </el-table-column>
            <!-- 
            <el-table-column show-overflow-tooltip
                             prop="paritiesDate"
                             label="类型">
            </el-table-column> -->
            <!-- <el-table-column show-overflow-tooltip
                             prop="paritiesDate"
                             label="文档类型名称">
            </el-table-column>
            <el-table-column show-overflow-tooltip
                             prop="paritiesDate"
                             label="签章情况">
            </el-table-column> -->
            <el-table-column show-overflow-tooltip
                             prop="createdTime"
                             label="上传时间">
            </el-table-column>
            <el-table-column show-overflow-tooltip
                             prop="createdName"
                             label="上传人">
            </el-table-column>
            <el-table-column prop="paritiesDate"
                             label="文件操作">
              <template slot-scope="scope">
                <el-button type="text" @click="download(scope.row)"
                         size="small">下载</el-button>
              <el-button @click="delClick(scope.row)"
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
      <el-tab-pane label="系统信息"
                   name="sixth">
        <div class="index-div3">
          <el-col :span="5"
                  class="el-col">
            <label>创建人</label>
            <el-input v-model="system.createdName"
                      class="el-inputs"
                      size="small"
                      placeholder="请选择"
                      disabled></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>创建时间</label>
            <el-date-picker v-model="system.createdTime"
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
            <el-input v-model="system.updatedName"
                      class="el-inputs"
                      size="small"
                      placeholder="请选择"
                      disabled></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>修改时间</label>
            <el-date-picker v-model="system.updatedTime"
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
    <!-- 港口弹窗 -->
    <Arrival-Port v-if="ArrivalPortShow"
                  :tipShow="ArrivalPortShow"
                  @ArrialPortCancle="ArrialPortCancle"
                  @ArrialPortSure="ArrialPortSure"></Arrival-Port>
    <!-- 关闭合同弹窗 -->
    <el-dialog title="合同关闭确认"
               :visible.sync="dialogVisible"
               width="25%">
      <div>
        <span>已达到提单溢短比范围，是否提单后关闭合同</span>
      </div>
      <span slot="footer"
            class="dialog-footer button-div2">
        <el-button type="primary"
                   @click="updataArrival(1);">确定</el-button>
        <el-button @click="updataArrival(0);dialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import api from "@/api/ladingBill/ladingBill";
import uploadApi from "@/api/component";
import ladingBillAddRow from "./ladingBillAddRow.vue";
import coinSelect from "../../components/coinSelect.vue";
import matterSelect from "../../components/matterSelect.vue";
import supplierSelect from "@/components/supplierSelect.vue";
import ArrivalPort from "@/components/ArrivalPort.vue";
import Count from "@/assets/js/calculation";
export default {
  name: "ladingBillEstablish",
  data () {
    return {
      activeName2: "first", //标签页
      companyName: "",
      blId: "",
      detial: {
        tableData: []
      },
      tableDatas: [],
      tableDataw: [],
      zxsjList: [], //装卸时间列表
      loadTimeType: '',
      branchName: "", //部门
      staffName: "",
      projectCode: "",
      propertiesStatusList: [],
      loading: false, //表格loading
      page: null, //总页数
      pageNum: 1, //页码
      pageSize: 10, //页显示条数
      total: 0, //总数目
      formList: {
        rmbCurrencyRate: "",
        payAmtTotalRmb: 0,
        currencyRate: '',
      },
      sumOriginAmt: 0,
      tradeFormList: {
        isBatched: false,//是否分批
        isTransfered:false,//是否转船
        shipNo: '',

      },
      system: {},//系统信息
      blStatus: [],
      value2: "",
      predictArrivedDate: "",
      deliveryBegindate: "",
      delivery: [],
      ToSingle: [],
      bizStatus: [], //业务员
      shipModeList: [], //船运方式
      priceTemList: [], //价格条款
      CustomsClearance: [],
      ArrivalPortList: [],
      matterShow: false, //物料名称
      supplierShow: "", //货代公司
      selectioned: "",
      isClosed: '',//是否关闭
      ArrivalPortsShow: false,
      unloadingPortShow: false,
      tableDataforbidden: false,//到港禁用
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
      transModeList: [],
      creactNo: false,
      ladingBillShow: false,
      maxAmt: [],
      ArrivalPortShow: false,//港口
      dialogVisible: false,//是否关闭合同
      loadingPortShow: false,//装货港
      unloadingPortList: [],//卸货港
      deliveryCutoffDate: "",
      PurchaseList: '',//实际到港日期
      formData: {
        rules: {
          volume1: {
            type: "string",
            required: true,
            message: "必填字段",
            trigger: "blur"
          }
        }
      },
      disCustomsClearance: false,//禁止保存
      disArrivalPortList: false,
      uploadHeaders: { "content-Type": "multipart/form-data" }, //文件上传的格式
      action:"#",//附件上传
      fileList:[],//附件
      errorKey: []
    };
  },
  created () {
    if (this.$route.query.type) {
      this.type = this.$route.query.type;
      if (this.type == 2) {
        this.activeName2 = "third";
        this.creactNo = true;
        this.tabpane = true;
      } else {
        this.activeName2 = "first";
      }
    }
    if (localStorage.getItem("id")) {
      this.creactNo = true;
      this.blId = localStorage.getItem("id");
      this.changeMessage(); //修改初始化
    }
    this.selectList();
    this.transList();
    if (this.$route.query.poId) {
      this.poId = this.$route.query.poId;
      this.creactNo = true;
      this.tipSuress(); //创建初始化
      this.addList();
    }
    if (this.formList.poType == 10140005) {
      this.formList.poType = "内贸采购";
    }
    if (this.formList.poType == 10140010) {
      this.formList.poType = "进口采购";
    }
    if (this.formList.poType  == 10140010) {
        this.formList.poType = "进口采购"
    } else if(this.formList.poType ==10140020){
        this.formList.poType = "出口采购"
    }else if(this.formList.poType ==10140025){
        this.formList.poType = "转口采购"
   }
    this.bizPersionListData();
    this.shipModeListData();
    this.priceTemData();
    this.zxsjListData();
  },
  methods: {
    //到货数量变动
    handleArrivedQtyChange (scope) {
      let value = scope.row.arrivedQty;
      value = value.replace(/[^\d^\.]+/g, '').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.').replace(/^0[^.]/, '').replace(/^\./, '')
      value = value.replace(/\.\d{5}/, '.' + Math.floor((value % 1) * 10000))
      scope.row.arrivedQty = value;
      //   const temp = JSON.parse(JSON.stringify(this.detial.tableData))
      // let blQty = 0;
      // blQty += Number(row.arrivedQty)//提单数量汇总到货数量
      // this.ToSingle[0].blQty = blQty
      // console.log('1nnnn',this.ToSingle[0].blQty,scope.row.arrivedQty)
      this.dhNumber(scope.row,scope.$index)
      this.qtyChange(scope.row, scope.$index)
      this.handleTotalCalc()
    },
    //单价变动
    handleOriginPriceChange (scope) {
      let value = scope.row.originPrice;
      value = value.replace(/[^\d^\.]+/g, '').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.').replace(/^0[^.]/, '').replace(/^\./, '')
      value = value.replace(/\.\d{7}/, '.' + Math.floor((value % 1) * 1000000))
      scope.row.originPrice = value;
      this.originPriceCh(scope.row, scope.$index)
      this.handleTotalCalc()
    },
    //金额变动
    handleOriginAmtChange (scope) {
      let value = scope.row.originAmt;
      value = value.replace(/[^\d^\.]+/g, '').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.').replace(/^0[^.]/, '').replace(/^\./, '')
      value = value.replace(/\.\d{3}/, '.' + Math.floor((value % 1) * 100))
      scope.row.originAmt = value
      this.originAmtCh(scope.row, scope.$index)
      this.handleTotalCalc()
    },
    //税率变动
    handleTaxRateChange (scope) {
      let value = scope.row.taxRate;
      value = value.replace(/[^\d]+/g, '')
      scope.row.taxRate = value;
      this.taxRateCh(scope.row, scope.$index)
      this.originPriceCh(scope.row, scope.$index);
      this.handleTotalCalc()
    },
    //增值税额变动
    handleTaxAmtChange (scope) {
      let value = scope.row.taxAmt
      value = value.replace(/[^\d^\.]+/g, '').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.').replace(/^0[^.]/, '').replace(/^\./, '')
      value = value.replace(/\.\d{3}/, '.' + Math.floor((value % 1) * 100))
      scope.row.taxAmt = value
      this.taxAmtCh(scope.row, scope.$index);
      this.handleTotalCalc()
    },
    dhNumber(e,index){
      let row = e;
      let blQty = 0;
       this.detial.tableData.forEach(item =>{
          blQty += Number(item.arrivedQty)//提单数量汇总到货数量
          this.ToSingle[0].blQty = blQty
      })
    },
    //采购含税单价变动
    originPriceCh (e, index) {
      let row = e;
      //采购含税金额
      if (row.arrivedQty == undefined) {
        row.originAmt = this.$orginAmt(row.originPrice, row.itemQty);
      } else {
        row.originAmt = this.$orginAmt(row.originPrice, row.arrivedQty);
      }
          console.log('1vs',row.originAmt)
      this.sumOriginAmt += Number(row.originAmt) //提单金额
      console.log('3s',this.sumOriginAmt)
      //采购不含税金额
      row.unorginAmt = this.$unorginAmt(row.originAmt, row.taxRate);
         //增值税额
      row.taxAmt = this.$taxAmt(row.originAmt, row.unorginAmt);

      //本币计算 对应业务币*汇率
      //本币含税单价  basePrice
      row.basePrice = this.$bbhsdj(row.originPrice, this.formList.currencyRate);
      //本币含税金额 baseAmt
      row.baseAmt = this.$bbhsje(row.originAmt, this.formList.currencyRate);
      //本币增值税额 baseTax
      row.baseTax = this.$bbzzse(row.taxAmt, this.formList.currencyRate);
       //本币不含税金额 unBaseAmt
      row.baseNoAmt = this.$tybbnhsje(row.baseAmt, row.baseTax);
      this.$set(this.detial.tableData, index, row);
    },
    //采购含税金额变动
    originAmtCh (e, index) {
      let row = e;
      //采购含税单价
      row.originPrice = this.$orginPrice(row.originAmt, row.arrivedQty);
      row.baseAmt = this.$bbhsje(row.originAmt, this.formList.currencyRate);//本币含税单价
      // //采购不含税单价
      // row.unorginPrice = this.$unorginPrice(row.originPrice, row.taxRate);
      this.sumOriginAmt += Number(row.originAmt) //提单金额
       //采购不含税金额
      row.unorginAmt = this.$unorginAmt(row.originAmt, row.taxRate);
       //增值税额
      row.taxAmt = this.$taxAmt(row.originAmt, row.unorginAmt);
      //本币计算 对应业务币*汇率
      //本币含税单价  basePrice
      row.basePrice = this.$bbhsdj(row.originPrice, this.formList.currencyRate);
      // //本币不含税单价 unBasePrice
      // row.unBasePrice = this.$bbnhsdj(row.unorginPrice, this.formList.currencyRate);
      //本币不含税金额 unBaseAmt
      //本币增值税额 baseTax
      row.baseTax = this.$bbzzse(row.taxAmt, this.formList.currencyRate);
      row.baseNoAmt = this.$tybbnhsje(row.baseAmt, row.baseTax);
      // this.sumOriginAmt += row.originAmt //提单金额
      this.$set(this.detial.tableData, index, row);
    },
    //税率变动
    taxRateCh (e, index) {
      let row = e;
      //采购不含税金额
      row.unorginAmt = this.$unorginAmt(row.originAmt, row.taxRate);
         //增值税额
      row.taxAmt = this.$taxAmt(row.originAmt, row.unorginAmt);
      //本币计算 对应业务币*汇率
      //本币不含税金额 unBaseAmt
      console.log('1f', row.baseNoAmt)
      //本币增值税额 baseTax
      row.baseTax = this.$bbzzse(row.taxAmt, this.formList.currencyRate);
      row.baseNoAmt = this.$tybbnhsje(row.baseAmt, row.baseTax);
      this.$set(this.detial.tableData, index, row);
    },
    //税额变动 //采购不含税金额=含税总价-税额
    taxAmtCh (e, index) {
      let row = e;
      //采购不含税金额  采购不含税金额=采购含税金额-税额
      row.unorginAmt = this.$unorginAmtCh(row.originAmt, row.taxAmt);
      //本币计算 对应业务币*汇率
      //本币不含税金额 baseNoAmt
      console.log('1v', row.baseNoAmt)
      row.baseTax = Math.round(100 * row.taxAmt * this.formList.currencyRate) / 100
      row.baseNoAmt = this.$tybbnhsje(row.baseAmt, row.baseTax);
      this.$set(this.detial.tableData, index, row);
    },
    //总计数量
    qtyChange (row, index) {
      this.originPriceCh(row, index);
      row.baseNoAmt = this.$tybbnhsje(row.baseAmt, row.baseTax);
    },
    handlecurrencyRate (value) {
      value = value.replace(/[^\d^\.]+/g, '').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.').replace(/^0[^.]/, '').replace(/^\./, '')
      value = value.replace(/\.\d{9}/, '.' + Math.floor((value % 1) * 100000000))
      this.formList.currencyRate = value;
      let temp = JSON.parse(JSON.stringify(this.detial.tableData))
      temp.forEach((element, index) => {
        element.basePrice = this.$bbhsdj(element.originPrice, this.formList.currencyRate);//本币含税金额
        element.baseAmt = this.$bbhsje(element.originAmt, this.formList.currencyRate);//本币含税单价
        element.baseTax = this.$bbzzse(element.taxAmt, this.formList.currencyRate);
        element.baseNoAmt = this.$tybbnhsje(element.baseAmt, element.baseTax);
        console.log(element.originAmt)
        //element.baseNoAmt = element.originAmt * this.formList.currencyRate;
      })
      this.$nextTick(() => {
        this.detial.tableData = temp
      })
    },
    //提单金额总数
    handleTotalCalc () {
      let sumOriginAmt = 0;
      this.detial.tableData.map((item, index) => {
        console.log('113',item.originAmt)
        sumOriginAmt += Number(item.originAmt);
      })
      this.sumOriginAmt = Math.round(sumOriginAmt * 100) / 100
      this.formList.payAmtTotalRmb = (this.formList.rmbCurrencyRate * this.sumOriginAmt).toFixed(2)
    },
    //修改的详情
    changeMessage () {
      if (localStorage.getItem("id")) {
        this.blId = localStorage.getItem("id");
      }
      let params = {
        blId: this.blId
      };
      api
        .odBlDetail(params)
        .then(res => {
          if (res.code == "success") {
            res.data.odBlItemsList.forEach((item, index) => {
              item.blRowno = (index + 1) * 10;
            });
            this.detial.tableData = res.data.odBlItemsList;
            localStorage.setItem("contractNo", res.data.contractNo);
            this.formList = res.data;
            this.formList.rmbCurrencyRate = res.data.rmbCurrencyRate;
            this.formList.payAmtTotalRmb = res.data.payAmtTotalRmb;
            this.deliveryCutoffDate = res.data.deliveryCutoffDate;//最迟交货日期
            this.loadTimeType = res.data.loadTimeType && res.data.loadTimeType.toString(); //装卸时间
            let list = res.data.odBlItemsList;
            let blQty = 0;
            list.forEach((element, index) => {
               blQty += Number(element.arrivedQty) //提单数量默认到货数量累加
               res.data.blQty = blQty
               console.log("e",blQty)
              //业务币不含税金额
              element.unorginAmt = this.$unorginAmt(
                element.originAmt,
                element.taxRate,
                "div",
                1
              );
              // this.sumOriginAmt += element.originAmt //提单金额
              list.forEach(element => {
               element.baseNoAmt = this.$tybbnhsje(element.baseAmt, element.baseTax);
              })
              this.originPriceCh(element, index);

            });
            this.tableDatas = res.data.odBlCtiPathsList;//运输信息
            this.tradeFormList = res.data;
            this.tradeFormList.priceTem = res.data.priceTem && res.data.priceTem.toString(); //价格条款
            this.tradeFormList.transMode = res.data.transMode && res.data.transMode.toString(); //运输方式
            this.formList.blStatus += ""//单据状态
             if (res.data.poType == 10140010) {
            this.formList.poType = "进口采购";
          } else if (res.data.poType == 10140005) {
            this.formList.poType = "内贸采购";
          }
          if (res.data.poType == 10140010) {
                this.formList.poType = "进口采购"
            } else if(res.data.poType ==10140020){
                this.formList.poType = "出口采购"
            }else if(res.data.poType==10140025){
                this.formList.poType = "转口采购"
          }
            this.tradeFormList.shipMode = res.data.shipMode && res.data.shipMode.toString(); //船运方式
            this.system.createdName = res.data.createdName;
            this.system.createdTime = res.data.createdTime;
            this.system.updatedName = res.data.updatedName;
            this.system.updatedTime = res.data.updatedTime;
            this.ToSingle.push(res.data);
            this.ToSingle.forEach(item => {
              item.blDate = this.$timeFun(item.blDate, 1);
              if (item.blType == 0) {
                item.blType = "空运提单"
              } else if (item.blType == 1) {
                item.blType = "海运提单"
              }
              // item.blType +=""//提单类型

            })
            this.CustomsClearance.push(res.data);
            this.CustomsClearance.forEach(item => {
              item.gwDate = this.$timeFun(item.gwDate, 1);
              item.freeCounterDate = this.$timeFun(item.freeCounterDate, 1);
            });
            this.ArrivalPortList.push(res.data);
            this.ArrivalPortList.forEach(item => {
              if(res.data.unloadingPort){
                item.unloadPort = res.data.unloadingPort //默认卸货港
              }
              item.arrivedInfoDate = this.$timeFun(item.arrivedInfoDate, 1);
              item.actArrivedDate = this.$timeFun(item.actArrivedDate, 1);
            });
            this.predictArrivedDate = res.data.predictArrivedDate;
            if (res.data.deliveryBegindate != null && res.data.deliveryEnddate != null) {
              this.delivery = [res.data.deliveryBegindate, res.data.deliveryEnddate];
            } else {
              this.delivery = [];
            }
            this.ladingStatus = res.data.blStatus;
            if (this.ladingStatus == 10110013 || this.ladingStatus == 10110025) {
              this.creactNo = true;
              this.tabpane = true;
            }
            if (res.data.isInactive == 0) {
              this.isInactive = false;
            } else {
              this.isInactive = true;
            }
            this.tradeFormList.isTransfered=res.data.isTransfered== 1 ?true : false;//是否转船
            this.tradeFormList.isBatched=res.data.isBatched== 1 ?true : false;//是否分批
         
            // this.tradeFormList.radio =
            //   res.data.isTransfered == 1 ? "isTransfered" : "isBatched"; //是否转船
            this.selectFileList(res.data.blId);//查询附件
            this.selectMessage();
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
      //查询附件
    selectFileList(id){
       let data = {
        businessId:id
      };
      uploadApi.selectFileList(data)
        .then(res => {
          if (res.code == "success") {
            this.tableDataw=res.data;
             this.tableDataw.forEach(element => {
               element.createdTime=this.$timeFun(element.createdTime, true);
            });
          } else {
            this.$openWarning(res.message);
          }
        }).catch();
    },
    //根据公司id和业务币别获取本位币汇率
    getParitiesForIssuePay(){
        api.getParitiesForIssuePay({
          companyId:this.formList.companyId,
          fromCurrencyCode: this.formList.currencyCode,
      }).then((res) => {
        this.formList.currencyRate = res.data.parities;
      }).catch((err) => { })
    },
    //获取rmb信息
    getRmbInfo () {
      api.getParitiesByCode({
        formCurrencyCode: this.formList.currencyCode,
        toCurrencyCode: "CNY"
      }).then((res) => {
        this.formList.rmbCurrencyRate = res.data.parities;
        this.formList.payAmtTotalRmb = Math.round(this.formList.rmbCurrencyRate * this.sumOriginAmt * 100) / 100
        this.$forceUpdate()
      }).catch((err) => { })
    },
    addfreeCounterDays (val) {
      this.CustomsClearance[0].freeCounterDays = val
      this.actDate()

    },
    actchange (val) {
      this.ArrivalPortList[0].actArrivedDate = val
    },
    //清关日期
    actDate () {
      let date = this.ArrivalPortList[0].actArrivedDate
      let days = Number(this.CustomsClearance[0].freeCounterDays)
      var d = new Date(date);
      d.setDate(d.getDate() + days);
      var m = d.getMonth() + 1;
      var da = d.getDate();
      if (m < 10) {
        m = '0' + m;
      }
      if (da < 10) {
        da = '0' + da;
      }
      return this.CustomsClearance[0].freeCounterDate = d.getFullYear() + '-' + m + '-' + da;
    },
    selectMessage () {
      if (localStorage.getItem("id")) {
        this.blId = localStorage.getItem("id");
      }
      if (localStorage.getItem("contractNo")) {
        this.poNo = localStorage.getItem("contractNo");
      }
      let data = {
        blId: this.blId,
        poNo: this.poNo
      };
      api.selectOdPoContract(data).then(res => {
        localStorage.setItem("poId", res.data.poId);
        localStorage.setItem("poNo", res.data.poNo);
        localStorage.setItem("poVersion", res.data.version);
      });
    },
    //采购合同带过来的信息
    tipsSure () {
      let params = {
        poId: this.poId
      };
      api.selectOdPoContractDetail(params)
        .then(res => {
          this.tipsSures();
          let list = res.data;
          this.detial.tableData = list;
          this.detial.tableData.forEach((item, index) => {
            item.contractRowno = list[index].poRowno;
            item.contractNo = list[index].poNo;
            item.arrivedQty = list[index].itemQty;
            item.extCode = this.formList.extCode;
            //业务币不含税金额
            item.unorginAmt = this.$unorginAmt(
              item.originAmt,
              item.taxRate,
              "div",
              1
            );
            item.blRowno = (index + 1) * 10;
            this.originPriceCh(item, index);//提单金额
          })
           this.getRmbInfo();//人民币
          list.forEach((element, index) => {
            // element.extCode = this.formList.extCode;
            //   console.log('element.extCode',list)
            // //业务币不含税金额
            // element.unorginAmt = this.$unorginAmt(
            //   element.originAmt,
            //   element.taxRate,
            //   "div",
            //   1
            // );
            list.forEach(element => {
              element.baseNoAmt = this.$tybbnhsje(element.baseAmt, element.baseTax);
            })
            console.log("r")
            this.dhNumber(element,index);
            this.handleArrivedQtyChange(element,index);
            this.originAmtCh(element, index);  
            this.taxRateCh(element, index) ;
          });
          this.loading = false;

        })
        .catch(() => { });
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
          this.tradeFormList = res.data;
          // this.tradeFormList.radio =
          //   this.tradeFormList.isTransfered == 1 ? "isTransfered" : "isBatched"; //是否转船 
          this.tradeFormList.isTransfered=res.data.isTransfered== 1 ? true : false;//是否转船
          this.tradeFormList.isBatched=res.data.isBatched== 1 ?true : false;//是否分批
          this.loadTimeType = res.data.loadTimeType && res.data.loadTimeType.toString(); //装卸时间
          this.tradeFormList.priceTem = res.data.priceTem && res.data.priceTem.toString(); //价格条款
          this.tradeFormList.transMode = res.data.transMode && res.data.transMode.toString(); //运输方式
          this.tradeFormList.shipMode = res.data.shipMode && res.data.shipMode.toString(); //船运方式
          this.tableDatas = res.data.list;
          this.deliveryCutoffDate = res.data.deliveryCutoffDate;
          this.deliveryCutoffDate = this.$timeFun(this.deliveryCutoffDate, 1);
          this.tradeFormList.shipNo = res.data.shipCode;//船舶识别号

          let list = res.data;
          list.forEach(item => {
            this.priceTemList.forEach(item1 => {
              if (item.priceTem == item1.dict_code) {
                item1.dict_value = item.priceTem
              }
            })
          })
        })
        .catch(() => { });
    },
    tipSuress () {
      let params = {
        poId: this.poId
      };
      api
        .selectOdPoContract(params)
        .then(response => {
          this.formList = response.data;
          this.getParitiesForIssuePay();
          this.formList.rmbCurrencyRate = "";
          let contractNo = response.data.poNo;
          let extCode = response.data.extCode;
          this.formList = { ...response.data, contractNo, extCode };
          if (response.data.poType == 10140010) {
            this.formList.poType = "进口采购";
          } else if (response.data.poType == 10140005) {
            this.formList.poType = "内贸采购";
          }
          if (response.data.poType == 10140010) {
                this.formList.poType = "进口采购"
            } else if(response.data.poType ==10140020){
                this.formList.poType = "出口采购"
            }else if(response.data.poType==10140025){
                this.formList.poType = "转口采购"
          }
          this.tipsSure();
          localStorage.setItem("poId", response.data.poId);
          localStorage.setItem("poVersion", response.data.version);
          this.companyChange(this.formList.companyCode);
        })

        .catch(() => { });
    },
    //公司选择
    companyChange (val) {
      this.formList.companyCode = val;
      for (var i = 0; i < this.companyList.length; i++) {
        if (val == this.companyList[i].companyCode) {
          this.companyId = this.companyList[i].companyId;
          this.formCurrencyCode = this.companyList[i].currencyCode
        }
      }
    },
    // arrivedQtyList(val){

    // },
    //修改人民币汇率
    handleRmbCurrencyRate (value) {
      value = value.replace(/[^\d^\.]+/g, '').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.').replace(/^0[^.]/, '').replace(/^\./, '')
      value = value.replace(/\.\d{9}/, '.' + Math.floor((value % 1) * 100000000))
      this.formList.rmbCurrencyRate = value
      this.formList.payAmtTotalRmb = Count.accMul(this.sumOriginAmt, this.formList.rmbCurrencyRate).toFixed(2);
    },
    //装货港
    handlealoadingPort (val) {
      this.formList.loadingPort = val
    },
    //卸货港
    handleunloadingPort (val) {
      this.formList.unloadingPort = val
    },
    //新增行确认
    ladingBillAddRowSure (e) {
      e.blRowno = (this.detial.tableData.length + 1) * 10;
     // this.detial.tableData.push(e);
      this.sumOriginAmt += e.originAmt; //提单金额计算
      this.ToSingle[0].blQty += Number(e.arrivedQty) //提单数量汇总到货数量
      //业务币不含税金额
      e.unorginAmt = this.$unorginAmt(
        e.originAmt,
        e.taxRate,
        "div",
        1
      );
      e.baseNoAmt = this.$tybbnhsje(e.baseAmt, e.baseTax);
      this.detial.tableData.push(e);
    },
    handleChange (val) {
      this.formList.blStatus = val;
    },
    //业务员
    handlebizChange (val) {
      this.formList.bizPersonName = val;
    },
    blTypeChange (val) {
      this.ToSingle[0].blType = val;
    },
    //船运方式
    handleshipChange (val) {
      this.formList.shipMode = val;
    },
    //价格条款
    priceTemChange (val) {
      this.formList.priceTem = val;
    },
    //供应商弹窗关闭
    supplierCancle () {
      this.supplierShow = false;
    },
    //供应商确认获取数据
    supplierSure (e) {
      this.supplierShow = false;
      this.ArrivalPortList[this.index].goodsProxyCompany = e.supplierName;
    },
    //港口
    arrivedPortTip () {
      if (this.ladingStatus == 10110013 || this.ladingStatus == 10110025 || (this.ladingStatus == 10110010 && this.type == 2) || (this.ladingStatus == 10110020 && this.type == 2)) {
        this.ArrivalPortsShow = false;
      } else {
        this.ArrivalPortsShow = true;

      }
    },
    //港口
    ArrialPortsSure (e) {
      this.ArrivalPortsShow = false;
      this.tradeFormList.arrivedPort = e.portName;
    },
    //港口
    ArrialPortsCancle () {
      this.ArrivalPortsShow = false;
    },
    //装货港
    loadingPortTip () {
      if (this.ladingStatus == 10110013 || this.ladingStatus == 10110025 || (this.ladingStatus == 10110010 && this.type == 2) || (this.ladingStatus == 10110020 && this.type == 2)) {
        this.loadingPortShow = false;
      } else {
        this.loadingPortShow = true;
      }
    },
    //装货港
    loadingPortSure (e) {
      this.loadingPortShow = false;
      this.tradeFormList.loadingPort = e.portName;
    },
    //装货港取消
    loadingPortCancle () {
      this.loadingPortShow = false;
    },
    //卸货港
    unloadingPortTip () {
      if (this.ladingStatus == 10110013 || this.ladingStatus == 10110025 || (this.ladingStatus == 10110010 && this.type == 2) || (this.ladingStatus == 10110020 && this.type == 2)) {
        this.unloadingPortShow = false;
      } else {
        this.unloadingPortShow = true;
      }
    },
    //卸货港确认
    unloadingPortSure (e) {
      this.unloadingPortShow = false;
      this.tradeFormList.unloadingPort = e.portName;
    },
    //卸货港
    unloadingPortCancle () {
      this.unloadingPortShow = false;
    },
    //到达港口
    arrivalTip () {
      this.ArrivalPortShow = true;
    },
    //取消到达港口弹窗
    ArrialPortCancle () {
      this.ArrivalPortShow = false;
    },
    ArrialPortSure (e) {
      this.ArrivalPortShow = false;
      this.ArrivalPortList[this.index].unloadPort = e.portName;
    },
    //业务员下拉
    bizPersionListData () {
      api.employeeSelect().then(res => {
        if (res.code == "success") {
          for (var i = 0; i < res.data.length; i++) {
            res.data[i] = JSON.parse(
              JSON.stringify(res.data[i])
                .replace(/empName/g, "bizPersonName")
                .replace(/flow/g, "cnt")
            );
            res.data[i] = JSON.parse(
              JSON.stringify(res.data[i])
                .replace(/empCode/g, "bizPersonCode")
                .replace(/flow/g, "cnt")
            );
          }
          this.bizStatus = res.data;
        }
      });
    },
    //单据状态下拉
    selectList () {
      let params = {
        dictNo: "1011"
      };
      api
        .select(params)
        .then(res => {
          if (res.code == "success") {
            this.blStatus = res.data;
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
    transList () {
      let params = {
        dictNo: "1017"
      };
      api
        .select(params)
        .then(res => {
          if (res.code == "success") {
            this.transModeList = res.data;
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
    zxsjListData () {
      let params = {
        dictNo: "1018"
      };
      api
        .select(params)
        .then(res => {
          if (res.code == "success") {
            this.zxsjList = res.data;
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
    handletransModeChange (val) {
      this.formList.transferTarget = val;
    },
    radioChange (e) {
      this.$forceUpdate()
    },
    radioChanges (e) {
      this.$forceUpdate()
    },
    //船运方式下拉
    shipModeListData () {
      let params = {
        dictNo: "1019"
      };
      api
        .select(params)
        .then(res => {
          if (res.code == "success") {
            this.shipModeList = res.data;
            this.blStatus.forEach(item => {
              if (this.formList.blStatus == item.dict_code) {
                // this.formList.blStatus = item.dict_value
              }
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
    //价格条款
    priceTemData () {
      let params = {
        dictNo: "1016"
      };
      api
        .select(params)
        .then(res => {
          if (res.code == "success") {
            this.priceTemList = res.data;
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
      if (localStorage.getItem("id")) {
        this.blId = localStorage.getItem("id");
        if (this.blId) {
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
                this.tableDatas.splice(this.index, 1)
              } else {
                let params = {
                  pcpId: this.selectioned.pcpId
                };
                api
                  .deleteOdBlCtiPaths(params)
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
    //生成到港保存
    //采购合同主表接口
    saveData () {
      if (localStorage.getItem("contractNo")) {
        this.poNo = localStorage.getItem("contractNo");
      }
      let data = {
        poNo: this.poNo
      };
      api
        .selectOdPoContract(data)
        .then(res => {
          localStorage.setItem("version", res.data.version);
          this.mainContract();
        })
        .catch();
    },
    //是否关闭验证
    mainContract () {
      if (localStorage.getItem("id")) {
        this.blId = localStorage.getItem("id");
      }
      let data = {
        blId: this.blId
      };
      api
        .checkIsPoCloseableByBl(data)
        .then(res => {
          if (res.data.isCloseable == true) {
            this.dialogVisible = true;
            // this.updataArrival(1);//调用保存的方法
          }else{
            this.updataArrival(0);//调用保存的方法
          }
        })
        .catch();
    },
    tradeChange (e) {
      this.$forceUpdate()
    },
    //到港保存
    updataArrival (isClosed) {
      console.log('12', this.ArrivalPortList[0])
      if (this.ArrivalPortList[0].goodsProxyCompany == null) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "请填写到港信息",
          type: "warning"
        });
        // this.disArrivalPortList = true
        return;
      } else {
        //  this.disArrivalPortList = false;
      }
      if (this.ArrivalPortList[0].goodsProxyCompany) {
        if (!this.ArrivalPortList[0].unloadPort) {
          this.$message({
            duration: 1000,
            showClose: true,
            message: "卸货港不能为空",
            type: "warning"
          });
          return;
        }
        if (!this.ArrivalPortList[0].arrivedInfoDate) {
          this.$message({
            duration: 1000,
            showClose: true,
            message: "到单寄出日不能为空",
            type: "warning"
          });
          return;
        }
        if (!this.ArrivalPortList[0].actArrivedDate) {
          this.$message({
            duration: 1000,
            showClose: true,
            message: "实际到港日期不能为空",
            type: "warning"
          });
          return;
        }
        // if(!this.ArrivalPortList[0].goodsArrivedRemark){
        //   this.$message({
        //   duration: 1000,
        //   showClose: true,
        //   message: "备注不能为空",
        //   type: "warning"
        // });
        // return;
        // }
      }
      if (localStorage.getItem("version")) {
        this.version = localStorage.getItem("version");
      }
      // let odBlForm = this.ArrivalPortList;
      var params = {};
      for (var i = 0; i < this.ArrivalPortList.length; i++) {
        params.blId = this.ArrivalPortList[0].blId,
          params.poVersion = this.version,
          params.version = this.ArrivalPortList[0].version,
          params.isClosed = isClosed,
          params.goodsProxyCompany = this.ArrivalPortList[0].goodsProxyCompany,
          params.unloadPort = this.ArrivalPortList[0].unloadPort,
          params.arrivedDate = this.ArrivalPortList[0].arrivedDate,
          params.actArrivedDate = this.ArrivalPortList[0].actArrivedDate,
          params.goodsArrivedRemark = this.ArrivalPortList[0].goodsArrivedRemark,
          params.arrivedInfoDate = this.ArrivalPortList[0].arrivedInfoDate
      }
      params.sysSystemAccessoryList=this.tableDataw;
      api.updateBlArrivalPort(params)
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
              path: "/index/Purchase/ladingBill" //跳转的路径
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
    addList () {
      this.ToSingle.forEach(item => {
        item.edit = false;
      });

      let data = {
        edit: true,
        bizBlNo: "",
        blType: "",
        blDate: "",
        blSender: "",
        counterNo: "",
        blQty: "",
        infoArrivedRemark: ""
      };
      // this.newTbale.unshift(data);
      let newTbale = [];
      newTbale.unshift(data);
      this.ToSingle = newTbale.concat(this.ToSingle);
    },
    //到单编辑
    dblclick (e) {
      this.ToSingle.forEach(item => {
        item.edit = false;
      });
      this.index = this.ToSingle.indexOf(e);
      let index = this.index;
      // this.ToSingle[index].edit = true;
      if (this.ladingStatus == 10110005 || (this.ladingStatus == 10110010 && this.type != 2)) {
        this.ToSingle[index].edit = true;
      } else {
        this.ToSingle[index].edit = false;
      }
      this.ToSingle[index].change = 1;
      this.$set(this.ToSingle, this.ToSingle.indexOf(e), e);
    },
    //商品明细单行编辑
    tableDataBdlclick (e) {
      this.detial.tableData.forEach(item => {
        item.edit = false;
      });
      this.index = this.detial.tableData.indexOf(e);
      let index = this.index;
      this.detial.tableData[index].edit = true;
      this.detial.tableData[index].change = 1;
      this.$set(this.detial.tableData, this.detial.tableData.indexOf(e), e);
    },
    //单行点击
    rowClick (e) {
      this.$refs.table.toggleRowSelection(e, true);
      this.selectioned = e;
      this.index = this.ArrivalPortList.indexOf(e);
    },
    //单行双击到港
    dglclick (e) {
      this.ArrivalPortList.forEach(item => {
        item.edit = false;
      });
      this.index = this.ArrivalPortList.indexOf(e);
      let index = this.index;
      if (this.ladingStatus == 10110013 || (this.ladingStatus == 10110010 && this.type == 2)) {
        //  this.tableDataforbidden = true
        this.ArrivalPortList[index].edit = true;
      } else {
        //  this.tableDataforbidden = false
        this.ArrivalPortList[index].edit = false;
      }
      this.ArrivalPortList[index].change = 1;
      this.$set(this.ArrivalPortList, this.ArrivalPortList.indexOf(e), e);
    },
    //单行双击清关
    qglclick (e) {
      this.CustomsClearance.forEach(item => {
        item.edit = false;
      });
      this.index = this.CustomsClearance.indexOf(e);
      let index = this.index;
      if (this.ladingStatus == 10110025 || (this.ladingStatus == 10110020 && this.type == 2)) {
        this.CustomsClearance[index].edit = true;
      } else {
        this.CustomsClearance[index].edit = false;
      }
      this.CustomsClearance[index].change = 1;
      this.$set(this.CustomsClearance, this.CustomsClearance.indexOf(e), e);
    },
    //到单联动
    bizBlNoChange (val) {
      if (val) {
        this.formList.bizBlNo = val
      }

    },
    //创建保存
    addSub () {
      for (var i = 0; i < this.tableDatas.length; i++) { //创建时删除合同带过来的运输路径pcpid
        delete this.tableDatas[i].pcpId
      }
      this.errorKey= [];
      if (this.formList.bizBlNo) {
        if (!this.ToSingle[0].blType) {
          this.errorKey.push('blType');
        }
        if (!this.ToSingle[0].blDate) {
          this.errorKey.push('blDate');
        }
        if (!this.ToSingle[0].blSender) {
          this.errorKey.push('blSender');
        }
        if (!this.ToSingle[0].counterNo) {
          this.errorKey.push('counterNo');
        }
        if (!this.ToSingle[0].blQty) {
          this.errorKey.push('blQty');
        }
      }
      if (!this.formList.supplierName) {
        this.errorKey.push('supplierName');
      }
      if (!this.formList.companyCode) {
        this.errorKey.push('companyCode');
      }
      if (!this.formList.orgName) {
        this.errorKey.push('orgName');
      }
      if (!this.formList.bizPersonName) {
        this.errorKey.push('bizPersonName');
      }
      if (!this.formList.poType) {
        this.errorKey.push('poType');
      }
      if (!this.predictArrivedDate) {
        this.errorKey.push('predictArrivedDate');
      }
      if (!this.formList.unboxLimit) {
        this.errorKey.push('unboxLimit');
      }
      if (!this.formList.unboxLimit) {
        this.errorKey.push('unboxLimit');
      }
      if (!this.deliveryCutoffDate) {
        this.errorKey.push('deliveryCutoffDate');
      }
      if (!this.tradeFormList.priceTem) {
        this.errorKey.push('priceTem');
      }
      if (!this.tradeFormList.transMode) {
        this.errorKey.push('transMode');
      }
      if (!this.tradeFormList.shipMode) {
        this.errorKey.push('shipMode');
      }
      if (!this.tradeFormList.loadingPort) {
        this.errorKey.push('loadingPort');
      }
      if (!this.tradeFormList.unloadingPort) {
        this.errorKey.push('unloadingPort');
      }
      if (!this.tradeFormList.destination) {
        this.errorKey.push('destination');
      }
      if (!this.loadTimeType) {
        this.errorKey.push('loadTimeType');
      }
      if (!this.formList.rmbCurrencyRate) {
        this.errorKey.push('rmbCurrencyRate');
      }
      if (!this.formList.currencyRate) {
        this.errorKey.push('currencyRate');
      }
      
      if(this.errorKey.length > 0) {
        this.$openWarning('请将必填项补充完整！')
        return false;
      }
      if (this.detial.tableData.length == null) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "商品明细不能为空!",
          type: "warning"
        });
      }
      if (localStorage.getItem("poId")) {
        this.poId = localStorage.getItem("poId");
      }
      if (localStorage.getItem("poVersion")) {
        this.poVersion = localStorage.getItem("poVersion");
      }
      if (this.formList.poType == "进口采购") {
        this.poType = 10140010
      }
      if (this.formList.poType == "内贸采购") {
        this.poType = 10140005
      }
      if (this.formList.poType =="进口采购") {
          this.poType =10140010;
      } else if(this.formList.poType =="出口采购"){
          this.poType = 10140020;
      }else if(this.formList.poType=="转口采购"){
          this.poType = 10140025;
      }
      this.tableDatas.forEach(item => { //出厂运输方式
        this.transModeList.forEach(element => {
          if (item.transferTarget == element.dict_code) {
            element.dict_value = item.transferTarget
          }
        })
      })
      this.ToSingle.forEach(item => {
        var bizBlNo = item.bizBlNo;
        var blType = item.blType;
        var blDate = item.blDate;
        var blSender = item.blSender;
        var counterNo = item.counterNo;
        var blQty = item.blQty;
        var infoArrivedRemark = item.infoArrivedRemark;
        let odBlForm = {
          priceTem: this.tradeFormList.priceTem, //价格条款
          deliveryCutoffDate: this.deliveryCutoffDate, //最迟交货日期
          sysBlNo: this.formList.sysBlNo, //系统提单号
          contractNo: this.formList.contractNo, //采购合同号
          extCode: this.formList.extCode, //外部合同号
          supplierId: this.formList.supplierId, //供应商
          supplierName: this.formList.supplierName, //供应商
          supplierCode: this.formList.supplierCode, //供应商
          companyCode: this.formList.companyCode, //公司
          companyName: this.formList.companyName, //公司名称
          companyId: this.formList.companyId, //公司名称
          projectCode: this.formList.projectCode, //项目
          orgName: this.formList.orgName, //部门
          orgCode: this.formList.orgCode, //部门
          orgId: this.formList.orgId, //部门
          bizPersonName: this.formList.bizPersonName, //业务员
          bizPersonCode: this.formList.bizPersonCode,//业务员
          projectCode: this.formList.projectCode,//项目号
          projectName: this.formList.projectName,//项目号
          poType: this.poType, //合同类型
          blStatus: this.formList.blStatus, //单据状态
          predictArrivedDate: this.predictArrivedDate, //预计到港日期
          unboxLimit: this.formList.unboxLimit, //免箱期限
          deliveryBegindate: this.delivery[0], //交货期限
          deliveryEnddate: this.delivery[1], //交货期限
          tradeCountry: this.formList.tradeCountry, //贸易国别
          tradeCountryName: this.formList.tradeCountryName, //贸易国别
          currencyId: this.formList.currencyId, //业务币币别
          currencyCode: this.formList.currencyCode, //业务币币别
          sumOriginAmt: this.sumOriginAmt, //提单金额
          rmbCurrencyRate: this.formList.rmbCurrencyRate,//人民币汇率
          payAmtTotalRmb: this.formList.payAmtTotalRmb,//人民币金额
          currencyRate: this.formList.currencyRate, //汇率
          remark: this.formList.remark,
          poId: this.poId,
          poVersion: this.poVersion,
          odBlItemsList: this.detial.tableData,
          odBlCtiPathsList: this.tableDatas, //运输
          arrivedPort: this.tradeFormList.arrivedPort,
          transMode: this.tradeFormList.transMode, //运输路径
          shipMode: this.tradeFormList.shipMode, //船运方式
          isBatched: this.tradeFormList.isBatched==true? 1:0, //是否分批
          isTransfered: this.tradeFormList.isTransfered==true? 1:0, //是否转船
          loadingPort: this.tradeFormList.loadingPort, //装货港
          unloadingPort: this.tradeFormList.unloadingPort, //卸货港
          destination: this.tradeFormList.destination, //目的地
          shipName: this.tradeFormList.shipName, //船名
          shipNo: this.tradeFormList.shipNo, //船舶识别号
          loadTimeType: this.loadTimeType, //卸货日期
          bizBlNo: bizBlNo, //提单号
          blType: blType, //提单类型
          blDate: blDate, //提单日期
          blSender: blSender, //提单发货人
          counterNo: counterNo, //柜号
          blQty: blQty, //提单数量
          infoArrivedRemark: infoArrivedRemark, //备注
          sysSystemAccessoryList:this.tableDataw,//附件上传
        };
        api
          .insertOrUpdateOdBl(odBlForm)
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
                path: "/index/Purchase/ladingBill" //跳转的路径
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
    },
    //修改保存
    changeSub () {
      this.tableDatas.forEach(item => {
        this.transModeList.forEach(element => {
          if (item.transferTarget == element.dict_code) {
            element.dict_value = item.transferTarget
          }
        })
      })
       this.errorKey= [];
      if (this.formList.bizBlNo) {
        if (!this.ToSingle[0].blType) {
          this.errorKey.push('blType');
        }
        if (!this.ToSingle[0].blDate) {
          this.errorKey.push('blDate');
        }
        if (!this.ToSingle[0].blSender) {
          this.errorKey.push('blSender');
        }
        if (!this.ToSingle[0].counterNo) {
          this.errorKey.push('counterNo');
        }
        if (!this.ToSingle[0].blQty) {
          this.errorKey.push('blQty');
        }
      }
      if (!this.formList.supplierName) {
        this.errorKey.push('supplierName');
      }
      if (!this.formList.companyCode) {
        this.errorKey.push('companyCode');
      }
      if (!this.formList.orgName) {
        this.errorKey.push('orgName');
      }
      if (!this.formList.bizPersonName) {
        this.errorKey.push('bizPersonName');
      }
      if (!this.formList.poType) {
        this.errorKey.push('poType');
      }
      if (!this.predictArrivedDate) {
        this.errorKey.push('predictArrivedDate');
      }
      if (!this.formList.unboxLimit) {
        this.errorKey.push('unboxLimit');
      }
      if (!this.formList.unboxLimit) {
        this.errorKey.push('unboxLimit');
      }
      if (!this.deliveryCutoffDate) {
        this.errorKey.push('deliveryCutoffDate');
      }
      if (!this.tradeFormList.priceTem) {
        this.errorKey.push('priceTem');
      }
      if (!this.tradeFormList.transMode) {
        this.errorKey.push('transMode');
      }
      if (!this.tradeFormList.shipMode) {
        this.errorKey.push('shipMode');
      }
      if (!this.tradeFormList.loadingPort) {
        this.errorKey.push('loadingPort');
      }
      if (!this.tradeFormList.unloadingPort) {
        this.errorKey.push('unloadingPort');
      }
      if (!this.tradeFormList.destination) {
        this.errorKey.push('destination');
      }
      if (!this.loadTimeType) {
        this.errorKey.push('loadTimeType');
      }
      if (!this.formList.rmbCurrencyRate) {
        this.errorKey.push('rmbCurrencyRate');
      }
      if (!this.formList.currencyRate) {
        this.errorKey.push('currencyRate');
      }
      
      if(this.errorKey.length > 0) {
        this.$openWarning('请将必填项补充完整！')
        return false;
      }
       
      if (localStorage.getItem("poId")) {
        this.poId = localStorage.getItem("poId");
      }
      if (localStorage.getItem("poVersion")) {
        this.poVersion = localStorage.getItem("poVersion");
      }
      if (localStorage.getItem("id")) {
        this.blId = localStorage.getItem("id");
      }
      // if (this.isBatched == true) {
      //   this.isBatched = 1
      // } else if (this.isBatched == false) {
      //   this.isBatched = 0
      // }
      if (this.ToSingle[0].blType == "空运提单") {
        this.ToSingle[0].blType = 0
      }
      if (this.ToSingle[0].blType == "海运提单") {
        this.ToSingle[0].blType = 1
      }
      if (this.formList.poType == "进口采购") {
        this.poType = 10140010
      }
      if (this.formList.poType == "内贸采购") {
        this.poType = 10140005
      }
      if (this.formList.poType  == "进口采购" ) {
        this.poType =10140010;
        } else if(this.formList.poType =="出口采购"){
            this.poType =10140020; 
        }else if(this.formList.poType =="转口采购"){
            this.poType = 10140025;
      }
      let odBlForm = {
        blId: this.blId,//提单id
        sysBlNo: this.formList.sysBlNo, //系统提单号
        contractNo: this.formList.contractNo, //采购合同号
        extCode: this.formList.extCode, //外部合同号
        supplierId: this.formList.supplierId, //供应商
        companyCode: this.formList.companyCode, //公司
        projectCode: this.formList.projectCode, //部门
        bizPersonName: this.formList.bizPersonName, //业务员
        bizPersonCode: this.formList.bizPersonCode,//业务员
        poType: this.poType, //合同类型
        blStatus: this.formList.blStatus, //单据状态
        predictArrivedDate: this.predictArrivedDate, //预计到港日期
        unboxLimit: this.formList.unboxLimit, //免箱期限
        deliveryBegindate: this.delivery[0], //交货期限
        deliveryEnddate: this.delivery[1], //交货期限
        tradeCountry: this.formList.tradeCountry, //贸易国别
        tradeCountryName: this.formList.tradeCountryName, //贸易国别
        currencyId: this.formList.currencyId, //业务币币别
        currencyCode: this.formList.currencyCode, //业务币币别
        currencyRate: this.formList.currencyRate, //汇率
        sumOriginAmt: this.sumOriginAmt, //提单金额
        rmbCurrencyRate: this.formList.rmbCurrencyRate,//人民币汇率
        payAmtTotalRmb: this.formList.payAmtTotalRmb,//人民币金额
        remark: this.formList.remark,
        poId: this.poId,
        poVersion: this.poVersion,
        version: this.formList.version,
        odBlItemsList: this.detial.tableData,
        odBlCtiPathsList: this.tableDatas, //运输
        arrivedPort: this.tradeFormList.arrivedPort,
        transMode: this.tradeFormList.transMode, //运输路径
        shipMode: this.tradeFormList.shipMode, //船运方式
        isBatched: this.tradeFormList.isBatched==true? 1:0, //是否分批
        isTransfered: this.tradeFormList.isTransfered==true? 1:0, //是否转船
        loadingPort: this.tradeFormList.loadingPort, //装货港
        unloadingPort: this.tradeFormList.unloadingPort, //卸货港
        destination: this.tradeFormList.destination, //目的地
        shipName: this.tradeFormList.shipName, //船名
        shipNo: this.tradeFormList.shipNo, //船舶识别号
        loadTimeType: this.loadTimeType, //卸货日期
        bizBlNo: this.formList.bizBlNo, //到单 提单号
        blType: this.ToSingle[0].blType, //提单类型
        blDate: this.formList.blDate, //提单日期
        blSender: this.formList.blSender, //提单发送人
        counterNo: this.formList.counterNo, //柜号
        blQty: this.formList.blQty, //提单数量
        infoArrivedRemark: this.formList.infoArrivedRemark, //备注
        createdName: this.system.createdName,
        createdTime: this.system.createdTime,
        updatedName: this.system.updatedName,
        updatedTime: this.system.updatedTime,
        sysSystemAccessoryList:this.tableDataw,//附件上传
      };
      api
        .insertOrUpdateOdBl(odBlForm)
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
              path: "/index/Purchase/ladingBill" //跳转的路径
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
    //生成清关保存
    addData () {
      if (this.CustomsClearance[0].gwDate == "") {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "请填写清关信息",
          type: "warning"
        });
        // this.disCustomsClearance = true
        return
      }
      if (this.CustomsClearance[0].gwDate) {
        if (!this.CustomsClearance[0].gwCode) {
          this.$message({
            duration: 1000,
            showClose: true,
            message: "报关单号不能为空",
            type: "warning"
          });
          return;
        }
        if (!this.CustomsClearance[0].freeCounterDays) {
          this.$message({
            duration: 1000,
            showClose: true,
            message: "免柜天数不能为空",
            type: "warning"
          });
          return;
        }
        if (!this.CustomsClearance[0].freeCounterDate) {
          this.$message({
            duration: 1000,
            showClose: true,
            message: "免柜期不能为空",
            type: "warning"
          });
          return;
        }
      }
      let odBlForm = {
        blId: this.formList.blId,
        version: this.formList.version,
        gwDate: this.CustomsClearance[0].gwDate,
        gwCode: this.CustomsClearance[0].gwCode,
        freeCounterDays: this.CustomsClearance[0].freeCounterDays,
        freeCounterDate: this.CustomsClearance[0].freeCounterDate,
        clearanceArrivedRemark: this.CustomsClearance[0].clearanceArrivedRemark,
        sysSystemAccessoryList:this.tableDataw,//附件上传
      }
      api
        .updateBlCustomsClearance(odBlForm)
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
              path: "/index/Purchase/ladingBill" //跳转的路径
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
        path: "/index/Purchase/ladingBill" //跳转的路径
      });
    },
    //物料名称弹框
    matterTips () {
      if (this.ladingStatus == 10110013 || this.ladingStatus == 10110025 || (this.ladingStatus == 10110010 && this.type == 2) || (this.ladingStatus == 10110020 && this.type == 2)) {
        this.matterShow = false;
      } else {
        this.matterShow = true;
      }
    },
    matterCancle () {
      this.matterShow = false;
    },
    matterSure (e) {
      this.matterShow = false;
      this.detial.tableData[this.index].goodsCode = e.skuCode;
      this.detial.tableData[this.index].goodsName = e.skuName;
      this.detial.tableData[this.index].goodsCat = e.categoryCode;
      this.detial.tableData[this.index].goodsCategoryName = e.categoryShowName;
      this.detial.tableData[this.index].goodsSpec = e.propertyInfo;
    },
    //货代公司
    goodsProxyTips () {
      this.supplierShow = true;
    },
    handleClick (e) {
      this.ArrivalPortList.forEach(item => {
        item.edit = false;
      })
      this.CustomsClearance.forEach(item => {
        item.edit = false;
      })

    },
    // 获取表格选中时的数据
    selectRow (e) {
      if (e.length === 0) {
        this.selectioned = null;
      }
    },
    // 获取表格选中时的数据
    selectArrivaRow (e) {
      if (e.length === 0) {
        this.selectioned = null;
      }
    },
    addRow () {
      this.ladingBillShow = true;
    },
    //创建弹框取消
    ladingBillCancle () {
      this.ladingBillShow = false;
    },
    //商品详情删除选中行
    delData () {
      if (!this.selectioned) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "未选择数据",
          type: "warning"
        });
        return;
      }
      let tips = "删除";
      this.$confirm("是否确定" + tips + "?", tips + "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (!this.selectioned.blItemsId) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.detial.tableData.splice(this.index, 1)
            this.sumOriginAmt -= this.selectioned.originAmt; //提单金额计算
           //提单数量汇总到货数量
           this.ToSingle[0].blQty -=this.selectioned.arrivedQty
            this.handleRmbCurrencyRate()//人民币金额
          } else {
            let params = {
              blItemsId: this.selectioned.blItemsId,
              version: this.selectioned.version,
              blId: this.blId,
              blVersion: this.formList.version,
            };
            api
              .deleteOdBlItems(params)
              .then(res => {
                if (res.code == "success") {
                  this.$message({
                    duration: 1000,
                    showClose: true,
                    message: res.data,
                    type: "success"
                  });
                  this.changeMessage();
                  this.sumOriginAmt -= this.selectioned.originAmt; //提单金额计算
                  //提单数量汇总到货数量
                  this.ToSingle[0].blQty -=this.selectioned.arrivedQty
                  this.handleRmbCurrencyRate()//人民币金额
                  this.formList.payAmtTotalRmb = Math.round(this.formList.rmbCurrencyRate * this.sumOriginAmt * 100) / 100
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
    },
    dialogCheck (selection, row) {
      this.$refs.table.clearSelection();
      if (selection.length === 0) {
        // 判断selection是否有值存在
        return;
      }
      if (row) {
        this.selectioned = row;
        this.index = this.detial.tableData.indexOf(row);
        this.$refs.table.toggleRowSelection(row, true);
      }
    },
    CustomsdialogCheck () {
      this.$refs.table.clearSelection();
      if (selection.length === 0) {
        // 判断selection是否有值存在
        return;
      }
      if (row) {
        this.selectioned = row;
        this.index = this.detial.tableData.indexOf(row);
        this.$refs.table.toggleRowSelection(row, true);
      }
    },
    ArrivalPortdialogCheck (selection, row) {
      this.$refs.table.clearSelection();
      if (selection.length === 0) {
        // 判断selection是否有值存在
        return;
      }
      if (row) {
        this.selectioned = row;
        this.index = this.ArrivalPortList.indexOf(row);
        this.$refs.table.toggleRowSelection(row, true);
      }
    },
    //商品明细 表格单选
    costDialogCheck (selection, row) {
      this.$refs.table.clearSelection();
      if (selection.length === 0) {
        // 判断selection是否有值存在
        return;
      }
      if (row) {
        this.selectioned = row;
        this.index = this.detial.tableData.indexOf(row);
        this.$refs.table.toggleRowSelection(row, true);
      }
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
    //附件上传
    //文件上传
    beforeUpload (file) {
      let formdata = new FormData();
      formdata.append("file", file); //传文件
     // formdata.append("_sysid_", this.sysid); //传其他参数
      uploadApi.uploadFile(formdata).then(res => {
        if (res.code == "success") {
          this.fileList = [];
          let fileData=res.data;
          var list = {
            fileOldName: fileData.oldFilename,
            fileNewName: fileData.newFilename,
            fileType:"", //文件类型
            fileSuffix:fileData.fileExt,//文件扩展名
            // fileAbsolutePath:"",//文件绝对路径
            // fileRelativePaths:"",//文件相对路径
            fileServerAddress: fileData.filePath,//文件服务器地址
            createdTime: this.$nowDate(),
            isInactive:0,//启用，禁用
            createdName:sessionStorage.getItem("userName") || "admin",
          };
          this.tableDataw.unshift(list);
        }
      });
      return false;
    },
    handleAvatarSuccess (res, file) {
      // eslint-disable-next-line no-console
      console.log(res, file);
    },
    // 点击删除
    delClick (e) {
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
            uploadApi.delFif(params)
              .then(res => {
                // this.deleIndex(e, this.tableData);
                this.$openSuccess(res.message);
                // this.tableData.remove(e)
                let index = this.tableDataw.indexOf(e);
                this.tableDataw.splice(index, 1);
              })
              .catch();
          }else{
            let index = this.tableDataw.indexOf(e);
            this.tableDataw.splice(index, 1);
             this.$openSuccess("删除成功");
          }
        })
        .catch();
    },
    //预览
    download(row){
      window.open(row.fileServerAddress);
    },
    //移除
    handleRemove(file, fileList) {},
      //确定上传
    submitUpload() {
      //确定上传
      this.$refs.newupload.submit();
    },
  },
  components: {
    ladingBillAddRow,
    matterSelect,
    supplierSelect,
    ArrivalPort,
    coinSelect
  }
};
</script>
<style scoped lang="scss">
.index .index-div3 .el-col-5 {
    width: 25%;
    position: relative;
    margin-top: 10px;
}
</style>