<template>
  <div class="reversehousingDetails">
    <div class="button-div">
      <el-button class="query-button"
                 v-if="type==1"
                 @click="getBack"
                 icon="el-icon-back">返回</el-button>
      <el-button @click="addSub"
                 v-if="type==1&&formList.unwvStatus==10800005"
                 icon="el-icon-finished">提交</el-button>
      <el-button @click="toExamine"
                 v-else-if="type==1&&formList.unwvStatus==10800010"
                 icon="el-icon-finished">审核</el-button>
      <el-button class="query-button"
                 v-if="!unwvId&&type!=1"
                 @click="addDetail"
                 icon="el-icon-suitcase">保存</el-button>
      <el-button class="query-button"
                 v-else-if="unwvId&&type!=1"
                 @click="addsaveDetail"
                 icon="el-icon-suitcase">保存</el-button>
      <el-button @click="goBack"
                 v-if="type!=1"
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
            <label>退货单号</label>
            <el-input v-model="formList.unwvNo"
                      class="el-inputs"
                      size="small"
                      placeholder="保存后自动生成"
                      disabled></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col  el-col-required">
            <label><span class="must-full">*</span>公司</label>
            <el-input v-model="formList.companyName"
                      class="el-inputs"
                      :class="errorKey.includes('companyName') ? 'inputRed' : ''"
                      size="small"
                      placeholder="请选择"
                      disabled></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col  el-col-required">
            <label><span class="must-full">*</span>部门</label>
            <el-input v-model="formList.orgName"
                      class="el-inputs"
                      :class="errorKey.includes('orgName') ? 'inputRed' : ''"
                      size="small"
                      placeholder="请选择"
                      disabled></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-colc">
            <label>单据状态</label>
            <el-select v-model="formList.unwvStatus"
                       placeholder="请选择"
                       size="small"
                       disabled>
              <el-option v-for="item in blStatus"
                         :key="item.dict_key"
                         :label="item.dict_value"
                         :value="item.dict_key">
              </el-option>
            </el-select>
          </el-col>
          <!-- <el-col :span="5"
                  class="el-col  el-col-required">
            <label><span class="must-full">*</span>入库单号</label>
            <el-input v-model="formList.wvNo"
                      class="el-inputs"
                      size="small"
                      placeholder="请选择"
                      disabled></el-input>
          </el-col> -->
          <el-col :span="5"
                  class="el-col  el-col-required">
            <label><span class="must-full">*</span>供应商</label>
            <el-input v-model="formList.supplierName"
                      class="el-inputs"
                      :class="errorKey.includes('supplierName') ? 'inputRed' : ''"
                      size="small"
                      placeholder="请选择"
                      disabled></el-input>
          </el-col>
          <!-- <el-col :span="5"
                  class="el-col  el-col-required">
            <label><span class="must-full">*</span>采购合同号</label>
            <el-input v-model="formList.erpPoNo"
                      class="el-inputs"
                      size="small"
                      placeholder="请选择"
                      disabled></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col  el-col-required">
            <label><span class="must-full">*</span>外部合同号</label>
            <el-input v-model="formList.externalPoNo"
                      class="el-inputs"
                      size="small"
                      placeholder="请选择"
                      disabled></el-input>
          </el-col> -->
          <el-col :span="5"
                  class="el-col">
            <label>项目号</label>
            <el-input v-model="formList.projectCode"
                      class="el-inputs"
                      size="small"
                      disabled></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>项目名称</label>
            <el-input v-model="formList.projectName"
                      class="el-inputs"
                      size="small"
                      disabled></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col  el-col-required">
            <label><span class="must-full">*</span>业务币币别</label>
            <el-select v-model="formList.currencyCode"
                       class="el-inputs"
                       :class="errorKey.includes('currencyCode') ? 'inputRed' : ''"
                       size="small"
                       placeholder="请选择"
                       disabled>
              <el-option v-for="item in currencyCodeStatus"
                         :key="item.currencyCode"
                         :label="item.currencyName"
                         :value="item.currencyCode">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="5"
                  class="el-col  el-col-required">
            <label><span class="must-full">*</span>本位币汇率</label>
            <el-input v-model="formList.baseCurrencyRate"
                      class="el-inputs"
                      :class="errorKey.includes('baseCurrencyRate') ? 'inputRed' : ''"
                      size="small"
                      placeholder="请选择"
                      disabled
                      @input="basecurrencyRateChange;handlecurrencyRate($event)"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col  el-col-required">
            <label><span class="must-full">*</span>统计数量</label>
            <el-input v-model="formList.unwvQty"
                      class="el-inputs"
                      :class="errorKey.includes('unwvQty') ? 'inputRed' : ''"
                      size="small"
                      placeholder="请选择"
                      disabled></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col  el-col-required">
            <label><span class="must-full">*</span>退货总金额</label>
            <el-input v-model="formList.unwvOriginAmt"
                      class="el-inputs"
                      :class="errorKey.includes('unwvOriginAmt') ? 'inputRed' : ''"
                      size="small"
                      disabled></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col  el-col-required">
            <label><span class="must-full">*</span>人民币汇率</label>
            <el-input v-model="formList.rmbCurrencyRate"
                      class="el-inputs"
                      :class="errorKey.includes('rmbCurrencyRate') ? 'inputRed' : ''"
                      size="small"
                      placeholder="请选择"
                      :disabled="disableStyle"
                      @input="handleRmbCurrencyRate(formList.rmbCurrencyRate)"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>人民币金额</label>
            <el-input v-model="formList.payAmtTotalRmb"
                      class="el-inputs"
                      :class="errorKey.includes('payAmtTotalRmb') ? 'inputRed' : ''"
                      size="small"
                      disabled></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col  el-col-required">
            <label><span class="must-full">*</span>业务员</label>
            <el-input v-model="staffName.bizPersonName"
                      class="el-inputs"
                      :class="errorKey.includes('bizPersonName') ? 'inputRed' : ''"
                      size="small"
                      placeholder="请选择"
                      disabled></el-input>
            <span class="comicon"
                  @click="manTip"><i class="el-icon-search"></i></span>
          </el-col>
          <el-col :span="5"
                  class="el-colc">
            <label>提货方式</label>
            <el-select v-model="formList.pickupType"
                      style="marginBottom:0px;"
                       placeholder="请选择"
                       size="small"
                       @change="handlePickup"
                       :disabled="disableStyle">
              <el-option v-for="item in pickupstatus"
                         :key="item.value"
                         :label="item.dict_value"
                         :value="item.dict_code">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="5"
                  class="el-col  el-col-required">
            <label><span class="must-full">*</span>退货仓库</label>
            <el-input v-model="formList.unwvWarehouseName"
                      class="el-inputs"
                      :class="errorKey.includes('unwvWarehouseName') ? 'inputRed' : ''"
                      size="small"
                      placeholder="请选择"
                      disabled></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col  el-col-required">
            <label><span class="must-full">*</span>退货日期</label>
            <el-date-picker v-model="formList.unwvDate"
                            type="date"
                            class="el-input2"
                            :class="errorKey.includes('unwvDate') ? 'inputRed' : ''"
                            size="small"
                            placeholder="选择日期"
                            :picker-options="pickerOptions"
                            :disabled="disableStyle">
            </el-date-picker>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>收货地址</label>
            <el-input v-model="formList.unwvAddress"
                      class="el-inputs"
                      size="small"
                      placeholder=""
                      :disabled="disableStyle"
                      @input="addressChange"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-colc  el-col-required">
            <label><span class="must-full">*</span>完全开票</label>
            <el-select v-model="formList.isBilled"
                       placeholder="请选择"
                       :class="errorKey.includes('isBilled') ? 'inputRed' : ''"
                       size="small"
                       @change="handleIsbilled"
                       disabled>
              <el-option v-for="item in isBilledList"
                         :key="item.value"
                         :label="item.dict_value"
                         :value="item.dict_code"
                         :disabled="inwarehouse">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="5"
                  class="el-colc  el-col-required">
            <label><span class="must-full">*</span>退货类型</label>
            <el-select v-model="unwvType"
                       placeholder="请选择"
                       :class="errorKey.includes('unwvType') ? 'inputRed' : ''"
                       size="small"
                       :disabled="disableStyle">
              <el-option v-for="item in unwvTypeList"
                         :key="item.value"
                         :label="item.dict_value"
                         :value="item.dict_code"
                         >
              </el-option>
            </el-select>
          </el-col>
          <el-col v-if="type==1" :span="5"
                  class="el-col">
              <label>凭证号</label>
              <el-input v-model="warrantCode"
                        class="el-inputs"
                        size="small"
                        disabled></el-input>
          </el-col>
          <el-col v-if="type==1"  :span="5"
                  class="el-col">
            <label>期间</label>
            <el-date-picker
                    type="month"
                    size="small"
                    v-model="warrantMonth"
                    disabled
                    value-format="yyyyMM"
                    >
            </el-date-picker>   
          </el-col>
          <el-col :span="24"
                  class="el-col el-full"
                  style="margin-top：10px">
            <label style="width:6.6%;vertical-align: 8px;">退货原因</label>
            <el-input type="textarea"
                      autosize
                      v-model="formList.unwvReason"
                      size="small"
                      class="el-textarea"
                      :disabled="disableStyle">
            </el-input>
          </el-col>
        </div>
        <div class="button-div">
          <el-button class="addBut"
                     @click="addRow"
                     icon="el-icon-plus">新增行</el-button>
          <el-button class="addBut"
                     @click="delData"
                     icon="el-icon-minus">删除行</el-button>
          <el-table border
                    center
                    :data="base.tableData"
                    class="el-table"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="selectRow"
                    @row-dblclick="tableDataBdlclick"
                    @row-click="Bdlclick"
                    ref="table"
                    @select-all="dialogCheckbase"
                    @select="selectRow"
                    max-height="254"
                    v-loading="loading">
            <el-table-column type="selection"
                             width="45"
                             align="center"></el-table-column>
            <el-table-column label="行号"
                             prop="rowno"
                             width="60"
                             align="center"></el-table-column>
            <el-table-column prop="poRowno"
                             label="采购合同行号"
                             width="100"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="erpPoNo"
                             label="采购合同号"
                             width="100"
                             :show-overflow-tooltip="true">
            </el-table-column>
             <el-table-column prop="externalPoNo"
                             label="外部合同号"
                             width="100"
                             :show-overflow-tooltip="true">
            </el-table-column>
             <el-table-column prop="wvNo"
                             label="入库单号"
                             width="100"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="wvRowno"
                             label="入库单行号"
                             width="100"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="goodsCode"
                             label="物料编号"
                             width="100"
                             :show-overflow-tooltip="true">
              <!-- <template slot-scope="scope">
                        <div v-if="scope.row.edit">
                          <el-input
                            size="mini"
                            placeholder="请输入内容"
                            v-model="scope.row.goodsCode"
                             :disabled="inwarehouse"
                          ></el-input>
                          <span class="comiconBtn" @click="matterTips"
                            ><i class="el-icon-search"></i
                          ></span>
                        </div>
                        <div v-else>
                          {{ scope.row.goodsCode }}
                        </div>
                      </template> -->
            </el-table-column>
            <el-table-column prop="goodsName"
                             label="物料名称"
                             width="100"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="goodsCategoryName"
                             label="物料大类"
                             width="100"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="goodsSpec"
                             label="物料规格"
                             width="100"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="batchCode"
                             label="批次号"
                             width="100"
                             :show-overflow-tooltip="true">
              <!-- <template slot-scope="scope">
                            <div v-if='scope.row.edit'>
                            <el-input size="mini" placeholder="请输入内容" v-model="scope.row.gwBoxNo" :disabled="inwarehouse"></el-input>
                            </div>
                            <div v-else>
                                {{scope.row.gwBoxNo}}
                            </div>
                        </template> -->
            </el-table-column>
            <el-table-column prop="itemUnit"
                             label="基础单位"
                             width="100"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="canUnwvQty"
                             label="可退货数量"
                             width="100"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="unwvQty"
                             label="退货数量"
                             width="100"
                             :show-overflow-tooltip="true">
              <template slot-scope="scope"
                        :show-overflow-tooltip="true">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            placeholder="请输入内容"
                            v-model="scope.row.unwvQty"
                            :disabled="disableStyle"
                            oninput="value=value.replace(/\.\d{5}/, '.' + Math.floor((value % 1) * 10000)).replace(/[^\d^\.]+/g, '').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.').replace(/^0[^.]/, '').replace(/^\./, '')"
                            @input="qtyChange(scope.row,scope.$index);handleTotalCalc();"></el-input>
                </div>
                <div v-else>
                  {{ scope.row.unwvQty }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="secUnit"
                             label="第二单位"
                             width="100"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="secUnwvQty"
                             label="第二单位退货数量"
                             width="150"
                             :show-overflow-tooltip="true">
              <template slot-scope="scope"
                        :show-overflow-tooltip="true">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            placeholder="请输入内容"
                            v-model="scope.row.secUnwvQty"
                            :disabled="disableStyle"></el-input>
                </div>
                <div v-else>
                  {{ scope.row.secUnwvQty }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="originPrice"
                             label="业务币含税单价"
                             width="120"
                             @input="originPriceCh(scope.row, scope.$index);handleTotalCalc()"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="originAmtVat"
                             label="业务币含税金额"
                             width="120"
                             @input="originAmtCh(scope.row, scope.$index);handleTotalCalc()"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="originPriceExt"
                             label="业务币不含税金额"
                             width="120"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="taxRate"
                             label="增值税率%"
                             width="100"
                             :show-overflow-tooltip="true"
                             @input="taxRateCh(scope.row, scope.$index)">
            </el-table-column>
            <el-table-column prop="originTaxAmt"
                             label="业务币增值税额"
                             width="120"
                             :show-overflow-tooltip="true"
                             @input="taxAmtCh(scope.row, scope.$index)">
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
            <el-table-column prop="baseTaxAmt"
                             label="本币增值税额"
                             width="120"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column label="备注"
                             width="100"
                             :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            placeholder="请输入内容"
                            v-model="scope.row.remark"
                            :disabled="disableStyle"></el-input>
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
                            @warehousingAddRowCancle="warehousingAddRowCancle"
                            @warehousingAddRowSure="warehousingAddRowSure"></warehousing-AddRow>
        <!--物料编号-->
        <matter-select v-if="base.matterShow"
                       :tipShow="base.matterShow"
                       @matterCancle="matterCancle"
                       @matterSure="matterSure">
        </matter-select>
        <!-- 选择业务员弹窗 -->
        <staff-select v-if="manShow"
                    :tipShow="manShow"
                    @staffCancle="manCancle"
                    @staffSure="manSure">
        </staff-select>
      </el-tab-pane>
      <el-tab-pane label="打印及附件"
                   name="third"
                   :disabled="tabpane">
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
            <!-- <el-table-column show-overflow-tooltip
                             prop="paritiesDate"
                             label="类型">
            </el-table-column>
            <el-table-column show-overflow-tooltip
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
                <el-button @click="download(scope.row)"
                           type="text"
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
                   name="sixth"
                   :disabled="tabpane">
        <div class="index-div3">
          <el-col :span="5"
                  class="el-col">
            <label>创建人</label>
            <el-input v-model="createdName"
                      class="el-inputs"
                      size="small"
                      placeholder="请选择"
                      disabled></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>创建时间</label>
            <el-date-picker v-model="createdTime"
                            type="date"
                            size="small"
                            class="el-input2"
                            placeholder="选择日期"
                            disabled>
            </el-date-picker>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>修改人</label>
            <el-input v-model="updatedName"
                      class="el-inputs"
                      size="small"
                      placeholder="请选择"
                      disabled></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>修改时间</label>
            <el-date-picker v-model="updatedTime"
                            type="date"
                            size="small"
                            class="el-inputs"
                            placeholder="选择日期"
                            disabled>
            </el-date-picker>
          </el-col>
        </div>
      </el-tab-pane>
      <el-tab-pane v-if="type==1" label="流程详情"
                   name="lcxq">
                <div class="input-div input-div-bor bortop0">
                    <v-exmineStatus :id="unwvId"></v-exmineStatus>
                </div>
            </el-tab-pane>
    </el-tabs>
    <el-dialog :visible.sync="demonstration"
               title="采购入库信息"
               :show-close="false"
               width="1100px"
               class="popup_box">
      <div class="el-table-div">
        <el-table border
                  center
                  :data="detail.tableData"
                  class="el-table"
                  ref="multipleTable"
                  v-loading="loading"
                  @select-all="dialogCheck"
                  @select="dialogCheck"
                  @row-click="rowClick"
                  :row-class-name="tableRowClassName">
          <el-table-column type="selection">
          </el-table-column>
          <el-table-column prop="erpPoNo"
                           label="采购合同号"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="poRowno"
                           label="采购合同行号"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="extPoNo"
                           label="外部合同号"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="wvNo"
                           label="入库单号"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="wvRowno"
                           label="入库单行号"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="goodsCode"
                           label="物料编号"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="goodsName"
                           label="物料名称"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="goodsCategoryName"
                           label="物料大类"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="goodsSpec"
                           label="物料规格"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="actReceive"
                           label="入库数量"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="canUnwvQty"
                           label="可退数量"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="supplierName"
                           label="供应商"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="postDate"
                           label="入库日期"
                           show-overflow-tooltip>
          </el-table-column>
        </el-table>
        <!--分页background-->
        <el-pagination @size-change="handleSizeChange"
                       @current-change="currentChange"
                       :current-page="pageNum"
                       :page-sizes="[100, 200, 300,500]"
                       :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="total">
        </el-pagination>
      </div>
      <div class="button-div2">
        <el-button type="primary"
                   @click="reverseSure()"
                   icon="el-icon-check">确认</el-button>
        <el-button @click="reverseCancle()"
                   icon="el-icon-close">取 消</el-button>
      </div>
    </el-dialog>
    <!--审核弹窗 开始-->
    <el-dialog :visible.sync="examineShow"
               :show-close="false"
               title="审核"
               width="400px"
               class="popup_box">
      <div class="examine-dialog">
        <el-col :span="24"
                class="el-col">
          <label>审核</label>
          <el-select clearable
                     size="small"
                     class="el-select"
                     @change="examineSelect"
                     v-model="examineValue"
                     placeholder="请选择">
            <el-option v-for="item in examineList"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-col>
        <el-col v-if="examineValue=='1'"
                :span="24"
                class="el-col">
          <label>审核日期</label>
          <el-date-picker class="el-input2"
                          style="width:178px;"
                          v-model="unwvDate"
                          type="date"
                          size="small"
                          placeholder="请选择日期"
                          :picker-options="pickerOptions">
          </el-date-picker>
        </el-col>
        <el-col v-if="examineValue=='2'"
                :span="24"
                class="el-col">
          <label style="vertical-align:top">驳回原因</label>
          <el-input type="textarea"
                    autosize
                    v-model="auditInfo"
                    size="small"
                    class="el-textarea"
                    placeholder="请输入内容">
          </el-input>
        </el-col>
      </div>
      <div class="button-div2">
        <el-button @click="examineSure"
                   icon="el-icon-check">确定</el-button>
        <el-button @click="examineCancle"
                   icon="el-icon-close">取消</el-button>
      </div>
    </el-dialog>
    <!--审核弹窗 结束-->
  </div>
</template>
<script>
import apiReverse from "@/api/reverseInvoice/reverseInvoice";
import uploadApi from "@/api/component";
import staffSelect from "@/components/staffSelect.vue";
import Count from "@/assets/js/calculation";
import ExmineStatus from '@/components/exmineStatus'
export default {
  name: "reversehousingDetails",
  data () {
    return {
      errorKey: [],
      activeName2: "first", //标签页
      tabpane: false, //不可编辑
      creactNo: false, //不可编辑
      formList: {
        unwvStatus: 10800005,//单据状态 //创建的时候默认为已保存
        unwvQty: 0,
        isBilled: 0,
      }, //表单
      blStatus: [], //单据状态
      currencyCodeStatus: [],
      disabletab: false, //不可编辑
      wvStatus: [], //入库单类型
      inwarehouse: "", //不可编辑
      isBilledList: [], //是否完全开发票
      pickupstatus: [], //提货方式
      loading: false, //表格loading
      base: {
        //商品详情
        tableData: [],
        matterShow: false,//物料编号
        selectioned: []
      },
      warehousingAddRowShow: false, //创建弹框
      tableDataw: [], //打印列表
      staffName: [], //业务员
      manShow: false,//业务员是否显示
      getDatalist: [],
      createdName: "",
      createdTime: '',
      updatedName: '',
      updatedTime: '',
      detail: {
        tableData: []
      },
      pageNum: 1, //页码
      pageSize: 100, //页显示条数
      total: 0, //总数目
      demonstration: false,
      selectionedGetdata: [],
      pickerOptions: {},//时间范围
      unwvId: '',
      type: '',
      disableStyle: false,
      examineShow: false,//审核弹窗
      examineOne: true,//审核单条还是多条
      examineValue: '',//审核选中的值
      examineList: [
        { value: "1", label: "通过" },
        { value: "2", label: "驳回" },
      ],
      unwvDate: "", //审核日期
      auditInfo: '',//驳回原因
      uploadHeaders: { "content-Type": "multipart/form-data" }, //文件上传的格式
      action:"#",//附件上传
      fileList:[],//附件
      unwvType:"",//退货类型
      unwvTypeList:[],
       warrantCode:'',//凭证号 
      warrantMonth:'', //期间 
    };
  },
  created () {
    
    if (localStorage.getItem("getData")) {
      this.getDatalist = JSON.parse(localStorage.getItem("getData"))
      this.tipsSure()
      // this.formList.unwvStatus = "10800005"; //创建状态以保存
    }
    this.pickupList();
    this.pickupData();
    this.baseCurrency();
    this.getUnwvType();//退货类型
    //  if (this.$route.query.unwvId){
    //    localStorage.removeItem("getData")
    //    this.unwvId = this.$route.query.unwvId
    //     this.changeDetail()
    //   }
    if (this.$route.query.unwvId && this.$route.query.type) {//查看
      this.type = this.$route.query.type
      this.changeDetail()
      if (this.type == 1) {
        this.disableStyle = true;
      }
    } else if (this.$route.query.unwvId) {
      this.changeDetail()
    } else {
      localStorage.removeItem("getData")
      this.unwvId = this.$route.query.unwvId
    }
  },
  methods: {
    //退货类型
    getUnwvType(){
      let data={
        dictNo:1158
      }
      apiReverse.select(data).then(res=>{
        this.unwvTypeList=res.data;
      })
    },
    //入库单类型
    wvhandleChange (val) {
      this.formList.wvdoStatus = val;
    },
    warehousingAddRowCancle () {
      this.warehousingAddRowShow = false;
    },
    //提货方式
    handlePickup (val) {
      this.formList.pickupType = val;
      this.$forceUpdate();
    },
    //是否完全开发票
    handleIsbilled (val) {
      this.formList.isBilled = val;
    },
    // 获取表格选中时的数据
    selectRow (e) {
      console.log('e :', e);
      if (e.length === 0) {
        this.base.selectioned = [];
      }
      //   this.$refs.table.clearSelection();
      //   this.$refs.table.toggleRowSelection(e, true);
      if (this.base.selectioned.length == 1) {
        this.index = this.base.tableData.indexOf(e[0])
      }
      this.base.selectioned = e
    },
    //供应商接口
    supplierListData () {
      let params = {
        supplierId: this.formList.supplierId
      }
      apiReverse
        .supplierList(params)
        .then(res => {
          this.formList.unwvAddress = res.data.list[0].linkAddress; //收货地址取供应商地址
        })
        .catch(() => { });
    },
    //总计数量
    qtyChange (row, index) {
      this.originPriceCh(row, index);
      let unwvQtyNum = 0
      this.base.tableData.forEach(item => {
        if (Number(item.canUnwvQty) < Number(item.unwvQty)) {
          this.$message({
            duration: 1000,
            showClose: true,
            message: "退货数量不能大于可退货数量",
            type: "error"
          });
          item.unwvQty = 0;
        }
        if (item.unwvQty) {
          unwvQtyNum += Number(item.unwvQty)
        }
      })
      this.formList.unwvQty = unwvQtyNum.toFixed(4)
      this.$forceUpdate()
      // row.unwvQty=row.unwvQty.toFixed(4)
      // this.originAmtCh(row, index);
      // this.taxRateCh(row, index);
      // this.taxAmtCh(row, index);
      // row.baseNoAmt = row.originAmtVat * this.formList.baseCurrencyRate;
    },
    //提单金额总数
    handleTotalCalc () {
      let unwvOriginAmt = 0;
      this.base.tableData.map((item, index) => {
        if (item.originAmtVat) {
          unwvOriginAmt += item.originAmtVat;
        }
      })
      this.formList.unwvOriginAmt = unwvOriginAmt.toFixed(2)
      this.formList.payAmtTotalRmb = Math.round(this.formList.rmbCurrencyRate * this.formList.unwvOriginAmt * 100) / 100
    },
    //采购含税单价变动
    originPriceCh (e, index) {
      let row = e;
      //采购含税金额
      if (row.unwvQty == undefined) {
        row.originAmtVat = this.$orginAmt(row.originPrice, row.itemQty);
      } else {
        row.originAmtVat = this.$orginAmt(row.originPrice, row.unwvQty);
        console.log("ss", row.originAmtVat)
      }
      this.formList.unwvOriginAmt += row.originAmtVat //提单金额
      //采购不含税金额
      row.originPriceExt = this.$unorginAmt(row.originAmtVat, row.taxRate);
      //增值税额
      row.originTaxAmt = this.$taxAmt(row.originAmtVat, row.originPriceExt);

      //本币计算 对应业务币*汇率
      //本币含税单价  basePrice
      row.basePrice = this.$bbhsdj(row.originPrice, this.formList.baseCurrencyRate);
      //本币含税金额 baseAmt
      row.baseAmt = this.$bbhsje(row.originAmtVat, this.formList.baseCurrencyRate);
      //本币不含税金额 unBaseAmt
      //本币增值税额 baseTaxAmt
      row.baseTaxAmt = this.$bbzzse(row.originTaxAmt, this.formList.baseCurrencyRate);
      row.baseNoAmt = this.$tybbnhsje(row.baseAmt, row.baseTaxAmt);
      this.$set(this.base.tableData, index, row);
    },
    //采购含税金额变动
    originAmtCh (e, index) {
      let row = e;
      //采购含税单价
      row.originPrice = this.$orginPrice(row.originAmtVat, row.unwvQty);
      // //采购不含税单价
      // row.unorginPrice = this.$unorginPrice(row.originPrice, row.taxRate);
      row.originPriceExt = this.$unorginAmt(row.originAmtVat, row.taxRate);
      //增值税额
      row.originTaxAmt = this.$taxAmt(row.originAmtVat, row.originPriceExt);
      //采购不含税金额
      this.formList.unwvOriginAmt += row.originAmtVat //提单金额
      //本币计算 对应业务币*汇率
      //本币含税单价  basePrice
      row.basePrice = this.$bbhsdj(row.originPrice, this.formList.baseCurrencyRate);
      // //本币不含税单价 unBasePrice
      // row.unBasePrice = this.$bbnhsdj(row.unorginPrice, this.formList.baseCurrencyRate);
      //本币不含税金额 unBaseAmt
      //本币增值税额 baseTaxAmt
      row.baseTaxAmt = this.$bbzzse(row.originTaxAmt, this.formList.baseCurrencyRate);
      row.baseNoAmt = this.$tybbnhsje(row.baseAmt, row.baseTaxAmt);
      this.$set(this.base.tableData, index, row);
    },
    //税率变动
    taxRateCh (e, index) {
      let row = e;
      //采购不含税金额
      row.originPriceExt = this.$unorginAmt(row.originAmtVat, row.taxRate);
      //增值税额
      row.originTaxAmt = this.$taxAmt(row.originAmtVat, row.originPriceExt);
      //本币计算 对应业务币*汇率
      //本币增值税额 baseTaxAmt
      row.baseTaxAmt = this.$bbzzse(row.originTaxAmt, this.formList.baseCurrencyRate);
      row.baseNoAmt = this.$tybbnhsje(row.baseAmt, row.baseTaxAmt);
      this.$set(this.base.tableData, index, row);
    },
    //税额变动 //采购不含税金额=含税总价-税额
    taxAmtCh (e, index) {
      let row = e;
      //采购不含税金额  采购不含税金额=采购含税金额-税额
      row.originPriceExt = this.$unorginAmt(row.originAmtVat, row.taxRate);
      //本币计算 对应业务币*汇率
      //本币不含税金额 baseNoAmt
      console.log('1v', row.baseNoAmt)
      row.baseNoAmt = this.$tybbnhsje(row.baseAmt, row.baseTaxAmt);
      this.$set(this.base.tableData, index, row);
    },
    handlecurrencyRate (value) {
      value = value.replace(/[^\d^\.]+/g, '').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.').replace(/^0[^.]/, '').replace(/^\./, '')
      value = value.replace(/\.\d{9}/, '.' + Math.floor((value % 1) * 100000000))
      this.formList.baseCurrencyRate = value;
      let temp = JSON.parse(JSON.stringify(this.base.tableData))
      temp.forEach((element, index) => {
        element.basePrice = this.$bbhsdj(element.originPrice, this.formList.baseCurrencyRate);//本币含税金额
        element.baseAmt = this.$bbhsje(element.originAmtVat, this.formList.baseCurrencyRate);//本币含税单价
        element.baseTaxAmt = this.$bbzzse(element.originTaxAmt, this.formList.baseCurrencyRate);
        element.baseNoAmt = this.$tybbnhsje(element.baseAmt, element.baseTaxAmt);
        //element.baseNoAmt = element.originAmt * this.formList.currencyRate;
      })
      this.$nextTick(() => {
        this.base.tableData = temp
      })
    },
    //商品明细单行编辑
    tableDataBdlclick (e) {
      this.base.tableData.forEach(item => {
        item.edit = false;
      });
      this.index = this.base.tableData.indexOf(e);
      let index = this.index;
      this.base.tableData[index].edit = true;
      this.base.tableData[index].change = 1;
      this.$set(this.base.tableData, this.base.tableData.indexOf(e), e);
    },
    Bdlclick () { },
    //选中行
    dialogCheckbase (selection, row) {
      //   this.$refs.table.clearSelection();
      //   if (selection.length === 0) {
      //     // 判断selection是否有值存在
      //     return;
      //   }
      //   if (row) {
      //     this.base.selectioned = row;
      //     this.base.index = this.base.tableData.indexOf(row);
      //     this.$refs.table.toggleRowSelection(row, true);
      //   }
    },
    //修改人民币汇率
    handleRmbCurrencyRate (value) {
      value = value.replace(/[^\d^\.]+/g, '').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.').replace(/^0[^.]/, '').replace(/^\./, '')
      value = value.replace(/\.\d{9}/, '.' + Math.floor((value % 1) * 100000000))
      this.formList.rmbCurrencyRate = value
      this.formList.payAmtTotalRmb = Count.accMul(this.formList.unwvOriginAmt, this.formList.rmbCurrencyRate).toFixed(2);
      this.$forceUpdate();
    },
    //部门弹窗打开
    manTip () {
      if (this.type == 1) {
        return
      }
      this.manShow = true;
    },
    //部门弹窗关闭
    manCancle () {
      this.manShow = false;
    },
    //部门弹窗确定获取数据
    manSure (e) {
      this.manShow = false;
      this.staffName.bizPersonName = e.empName;
      this.staffName.bizPersonCode = e.empCode;
    },
    //增加行
    addRow () {
      this.demonstration = true;
      this.selectionedGetdata = []
      let rownoStr = "";
      let arr1=[]; // 去重数组
      let arr2=[];// 剩下的重复值
      this.base.tableData.map(item => {
        const ind = arr1.findIndex(val => {
          return val.wvNo== item.wvNo
        })
        if (ind == -1) {
          arr1.push(item);
        } else {
          arr2.push(item);
        }
      })
      arr1.map((item, index) => {
        rownoStr+= `${item.wvNo}:${item.wvRowno}`;
        arr2.map(val => {
          if (item.wvNo== val.wvNo) {
            rownoStr+= `:${val.wvRowno}`;
          }
        })
        if (index + 1 < arr1.length) {
          rownoStr+= '_';
        }
      })
      //rownoStr=arr1Str+arr2Str;
      console.log(rownoStr);
  
      // this.base.tableData.forEach((item, index) => {
      //   if()
      // })
      // rownoStr = rownoStr.substring(0, rownoStr.length - 1)
      // console.log('rownoStr :', rownoStr);

      let data = {
        pageNum: this.pageNum,
        rows: this.pageSize,
        warehouseCode: this.formList.unwvWarehouseCode,
        rownoStr: rownoStr,
        erpPoNo:this.formList.erpPoNo,
        supplierCode:this.formList.supplierCode
        //wvNo: this.formList.wvNo
      }
      apiReverse
        .odWvList2CreatedUnWv(data)
        .then(res => {
          this.loading = false;
          this.detail.tableData = res.data;
          this.detail.tableData.forEach(element => {
            element.postDate = this.$timeFun(element.postDate, 1);
            element.externalPoNo=element.extPoNo;
          });
          this.total = res.total;
        })
        .catch(() => { });
      this.loading = false;
    },
    reverseCancle () {
      this.demonstration = false;
    },
    reverseSure () {
      this.demonstration = false;
      //   this.selectionedGetdata.rowno = (this.base.tableData.length + 1) * 10;
      this.selectionedGetdata.map(item => {
        this.base.tableData.push(item)
      })
      this.base.tableData.map((item, index) => {
        item.rowno = (index + 1) * 10;
        //item.externalPoNo=item.extPoNo;

      })
      //   this.base.tableData.push(...this.selectionedGetdata)
      this.reCalcWhenChange();
    },
    //增删明细后更新数据/////
    reCalcWhenChange () {
      this.base.tableData.map((item, index) => {
        // item.unwvQty = item.canUnwvQty
        this.qtyChange(item, index)
        //本币含税单价  basePrice
        item.basePrice = this.$bbhsdj(item.originPrice, this.formList.baseCurrencyRate);
        //本币含税金额 baseAmt
        item.baseAmt = this.$bbhsje(item.originAmtVat, this.formList.baseCurrencyRate);
        //本币增值税额 baseTaxAmt
        item.baseTaxAmt = this.$bbzzse(item.originTaxAmt, this.formList.baseCurrencyRate);
        //本币不含税金额 unBaseAmt
        item.baseNoAmt = this.$tybbnhsje(item.baseAmt, item.baseTaxAmt);
        this.handleTotalCalc()

      })
    },
    //选择框
    dialogCheck (selectionedGetdata, row) {
      //   this.$refs.multipleTable.clearSelection();
      if (selectionedGetdata.length === 0) {
        // 判断selection是否有值存在
        return;
      }
      if (row) {
        this.selectionedGetdata = selectionedGetdata;
        this.index = this.detail.tableData.indexOf(row);
        this.$refs.multipleTable.toggleRowSelection(row, true);
      }
    },
    //删除行
    delData () {
      // 删除选中行
      console.log('this.base.selectioned :', this.base.selectioned);
      if (this.base.selectioned.length == 0) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "未选择数据",
          type: "warning"
        });
        return;
      } else {
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
                if (!this.base.selectioned[0].unwvItemId) {
                  this.$message({
                    message: "删除成功",
                    type: "success"
                  });
                  this.base.tableData.splice(this.index, 1)
                  this.base.tableData = this.reSortRowNo(this.base.tableData, 'rowno')
                } else {
                  let params = {
                    unwvItemId: this.base.selectioned[0].unwvItemId,
                    version: this.base.selectioned[0].version
                  };
                  apiReverse
                    .deleteUnwvItems(params)
                    .then(res => {
                      if (res.code == "success") {
                        this.base.tableData.splice(this.index, 1)
                        this.base.tableData = this.reSortRowNo(this.base.tableData, 'rowno')
                        this.$message({
                          duration: 1000,
                          showClose: true,
                          message: res.data,
                          type: "success"
                        });
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
          this.base.tableData.splice(this.index, 1);
          this.base.tableData = this.reSortRowNo(this.base.tableData, 'rowno')
          // 删除完数据之后清除勾选框
          this.$refs.table.clearSelection();
        }
      }
    },
    reSortRowNo (list, rowno) {
      list.map((item, index) => {
        item.rowno = (index + 1) * 10
      })
      console.log('list :', list);
      return list
    },
    //取消
    goBack () {
      this.$router.push({
        //核心语句
        path: "/index/Purchase/reverse" //跳转的路径
      });
    },
    getBack () {
      this.$router.push({
        //核心语句
        path: "/index/Purchase/reverse" //跳转的路径
      });
    },
    addressChange () {
      this.$forceUpdate()
    },
    tableRowClassName ({ row, rowIndex }) {
      row.index = rowIndex;
    },
    //单行点击
    rowClick (e) {
      console.log('e :', e);
      this.$refs.multipleTable.toggleRowSelection(e, true);
      this.selectionedGetdata.push(e);
      this.index = this.detail.tableData.indexOf(e);
    },
    //修改
    changeDetail () {
      this.unwvId = this.$route.query.unwvId
      console.log('q1', this.$route.query.unwvId)
      let data = {
        unwvId: this.unwvId
      }
      apiReverse.odUnwvDetail(data)
        .then(res => {
          this.formList = res.data;
          this.selectFileList(res.data.unwvId);//查询附件
          this.formList.unwvNo = res.data.unwvNo;//退货单号
          this.formList.companyName = res.data.companyName;//公司
          this.formList.companyId = res.data.companyId; //公司
          this.formList.orgName = res.data.orgName; //部门
          this.formList.orgCode = res.data.orgCode; //部门
          this.formList.orgId = res.data.orgId; //部门
          this.staffName.bizPersonName = res.data.bizPersonName; //业务员
          this.staffName.bizPersonCode = res.data.bizPersonCode; //业务员
          this.formList.wvNo = res.data.wvNo; //入库单号
          this.formList.supplierName = res.data.supplierName; //供应商
          this.formList.supplierCode = res.data.supplierCode; //供应商
          this.formList.supplierId = res.data.supplierId; //供应商
          this.formList.erpPoNo = res.data.erpPoNo; //采购合同号
          this.formList.externalPoNo = res.data.externalPoNo; //外部合同号
          this.formList.projectCode = res.data.projectCode; //项目号
          this.formList.projectName = res.data.projectName; //项目名称
          this.formList.currencyCode = res.data.currencyCode; //业务币币别
          this.formList.baseCurrencyRate = res.data.baseCurrencyRate; //本位币汇率
          this.base.tableData = res.data.odUnwvItemsList;//详情列表
          this.unwvType=res.data.unwvType+"";//退货类型
          this.warrantCode= res.data.warrantCode;//凭证号 
          this.warrantMonth= res.data.warrantMonth; //期间 
          //计算不含税金额
          this.base.tableData.forEach(e => {
            //采购不含税金额
            e.originPriceExt = this.$unorginAmt(e.originAmtVat, e.taxRate);
            //本币不含税金额 unBaseAmt
            e.baseNoAmt = this.$tybbnhsje(e.baseAmt, e.baseTaxAmt);
            
          });
          this.formList.unwvWarehouseName = res.data.unwvWarehouseName; //仓库名称
          if (this.formList.isBilled == 0) {
            this.formList.isBilled = "否"
          } else if (this.formList.isBilled == 1) {
            this.formList.isBilled = "是"
          }
          this.formList.pickupType = res.data.pickupType && res.data.pickupType.toString();; //提货方式
          this.forEach.unwvDate = res.data.unwvDate;//退货日期
          this.forEach.unwvAddress = res.data.unwvAddress;//收货地址
          this.forEach.unwvReason = res.data.unwvReason;//退货原因
          this.formList.unwvStatus = res.data.unwvStatus && res.data.unwvStatus.toString();
          console.log('wv', this.formList.unwvStatus)
          this.formList.version = res.data.version;
         

        })
        .catch(() => { });
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
    //采购退货单详情//采购入库带过来的信息
    tipsSure () {
      console.log('21r', this.getDatalist)
      this.getDatalist.forEach((item, index) => {
        item.rowno = (index + 1) * 10;
        item.originAmtVat = undefined;
        item.baseAmt = undefined;
        // item.canUnwvQty = item.canUnwvQty.toFixed(4)
        //               //业务币不含税金额
        //              item.originPriceExt= this.$unorginAmt(
        //                item.originAmtVat,
        //                 item.taxRate,
        //                 "div",
        //                 1
        //               );
        //              item.baseNoAmt = this.$bbnhsje(item.originPriceExt, this.formList.baseCurrencyRate);
      })
      this.base.tableData = this.getDatalist; //入库单详情
      //转换本位币税额
      this.base.tableData.forEach(el => {
        el.baseTaxAmt = el.baseTax;
        el.externalPoNo=el.extPoNo;
      });
      let data = {
       // wvNo: this.getDatalist[0].wvNo
       supplierCode:this.getDatalist[0].supplierCode,
       erpPoNo:this.getDatalist[0].erpPoNo,
       warehouseCode:this.getDatalist[0].warehouseCode
      }
      apiReverse.odWvDetail(data)
        .then(res => {
          // this.formList = res.data;
          //  this.formList.unwvStatus ="";
          this.formList.companyName = res.data.companyName; //公司
          this.formList.companyCode = res.data.companyCode; //公司
          this.formList.companyId = res.data.companyId; //公司
          this.formList.orgName = res.data.orgName; //部门
          this.formList.orgCode = res.data.orgCode; //部门
          this.formList.orgId = res.data.orgId; //部门
          this.staffName.bizPersonName = res.data.bizPersonName; //业务员
          this.staffName.bizPersonCode = res.data.bizPersonCode; //业务员
          this.formList.wvNo = res.data.wvNo; //入库单号
          this.formList.supplierName = res.data.supplierName; //供应商
          this.formList.supplierCode = res.data.supplierCode; //供应商
          this.formList.supplierId = res.data.supplierId; //供应商
          this.formList.erpPoNo = res.data.erpPoNo; //采购合同号
          this.formList.externalPoNo = res.data.externalPoNo; //外部合同号
          this.formList.projectCode = res.data.projectCode; //项目号
          this.formList.projectName = res.data.projectName; //项目名称
          this.formList.currencyCode = res.data.currencyCodeOrigin && res.data.currencyCodeOrigin.toString(); //业务币币别
          this.formList.baseCurrencyRate = res.data.baseCurrencyRate; //本位币汇率
          this.formList.unwvWarehouseName = res.data.warehouseName; //仓库名称
          this.formList.unwvWarehouseCode = res.data.warehouseCode; //仓库名称
          this.formList.rmbCurrencyRate = res.data.rmbCurrencyRate;//人民币汇率
          this.$forceUpdate();
          if (this.formList.isBilled == 0) {
            this.formList.isBilled = "否"
          } else if (this.formList.isBilled == 1) {
            this.formList.isBilled = "是"
          }
          this.formList.pickupType = res.data.pickupType && res.data.pickupType.toString();; //提货方式
          // this.formList.unwvStatus = res.data.unwvStatus&&res.data.unwvStatus.toString();
          console.log('wv1', this.formList.unwvStatus)
          this.formList.unwvQty = 0;
          this.formList.wvStatus = res.data.wvStatus && res.data.wvStatus.toString()
          // this.formList.unwvAddress = res.data.unwvAddress; //退货地址
          this.supplierListData()
          this.unwuDateList(this.formList.companyId)
          this.getRmbInfo();
        })
        .catch(() => { });
    },
    //可退货数量不可以大于退货数量
    unwvQtydata () {
      // let unwvQtyNum = 0
      // this.getDatalist.forEach(item => {
      //   console.log('1313',item.canUnwvQty<item.unwvQty)
      //   if (item.canUnwvQty < item.unwvQty) {
      //     this.$message({
      //       duration: 10000,
      //       showClose: true,
      //       message: "退货数量不能大于可退货数量",
      //       type: "error"
      //     });
      //      console.log('13132',item.canUnwvQty,item.unwvQty)
      //     item.unwvQty = 0;
      //   }
      //   if (item.unwvQty) {
      //     unwvQtyNum += Number(item.unwvQty)
      //   }
      // })
      // this.formList.unwvQty = unwvQtyNum.toFixed(4)
      // this.$forceUpdate()
    },
    radiochange (e) {
      if (e.length === 0) {
        this.selectionedGetdata = null;
      }
    },
    basecurrencyRateChange (e) {
    },
    //修改保存
    addsaveDetail () {
      if(this.unwvType==""){
        this.$openWarning("退货类型不能为空");
        return;
      }
       for (const it of this.base.tableData) {
        if(it.secUnwvQty==="" || it.secUnwvQty===null){
          this.$openWarning("第二单位退货数量不能为空");
          return;
        }else if(it.unwvQty===0 && it.secUnwvQty){
           this.$openWarning("第一单位退货数量为0且第二单位退货数量不为0，请核对信息");
            return;
        }
      }
      if (this.formList.isBilled == "是") {
        this.formList.isBilled = 1
      } else if (this.formList.isBilled == "否") {
        this.formList.isBilled = 0
      }
      let data = {
        unwvId: this.formList.unwvId,
        unwvNo: this.formList.unwvNo,
        companyId: this.formList.companyId,
        companyCode: this.formList.companyCode,
        companyName: this.formList.companyName,
        orgId: this.formList.orgId,
        orgCode: this.formList.orgCode,
        orgName: this.formList.orgName,
        unwvStatus: this.formList.unwvStatus,
        wvNo: this.formList.wvNo,
        supplierCode: this.formList.supplierCode,
        supplierName: this.formList.supplierName,
        erpPoNo: this.formList.erpPoNo,
        externalPoNo: this.formList.externalPoNo,//外部合同号
        projectCode: this.formList.projectCode,//项目号
        projectName: this.formList.projectName,
        currencyCode: this.formList.currencyCode,
        baseCurrencyRate: this.formList.baseCurrencyRate,
        unwvQty: this.formList.unwvQty,
        unwvOriginAmt: this.formList.unwvOriginAmt,
        unwvWarehouseCode: this.formList.unwvWarehouseCode,
        unwvWarehouseName: this.formList.unwvWarehouseName,
        isBilled: this.formList.isBilled,
        bizPersonCode: this.formList.bizPersonCode,
        bizPersonName: this.formList.bizPersonName,
        pickupType: this.formList.pickupType,
        unwvAddress: this.formList.unwvAddress,
        unwvDate: this.formList.unwvDate,
        unwvReason: this.formList.unwvReason,
        remark: this.formList.remark,
        isInactive: this.formList.isInactive,
        createdBy: this.formList.createdBy,
        createdName: this.createdName,
        createdTime: this.createdTime,
        updatedBy: this.formList.updatedBy,
        updatedName: this.updatedName,
        updatedTime: this.updatedTime,
        version: this.formList.version,
        rmbCurrencyRate: this.formList.rmbCurrencyRate,//人民币汇率
        payAmtTotalRmb: this.formList.payAmtTotalRmb,//人民币金额
        odUnwvItemsList: this.base.tableData,
        sysSystemAccessoryList:this.tableDataw,//附件上传
        unwvType:this.unwvType//退货类型
      }
      apiReverse.updateUnwv(data)
        .then(res => {
          this.$message({
            duration: 1000,
            showClose: true,
            message: res.data,
            type: "success"
          });
          this.$router.push({
            //核心语句
            path: "/index/Purchase/reverse" //跳转的路径
          });
        })

        .catch(() => { });
    },
    //提货方式
    pickupData () {
      let params = {
        dictNo: "1061"
      };
      apiReverse
        .select(params)
        .then(res => {
          if (res.code == "success") {
            this.pickupstatus = res.data;
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
    baseCurrency () {
      let params = {
      }
      apiReverse.listSimple(params)
        .then(res => {
          if (res.code == "success") {
            this.currencyCodeStatus = res.data;
            console.log('213', res.data)
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
    //单据状态
    pickupList () {
      let params = {
        dictNo: "1080"
      };
      apiReverse
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
    //获取rmb信息
    getRmbInfo () {
      api.getParitiesByCode({
        formCurrencyCode: this.formList.currencyCode,
        toCurrencyCode: 'CNY'
      }).then((res) => {
        // this.formList.baseCurrencyCode
        this.formList.rmbCurrencyRate = res.data.parities;
        this.formList.payAmtTotalRmb = Math.round(this.formList.rmbCurrencyRate * this.formList.wvAmtS * 100) / 100
        this.$forceUpdate()
      }).catch((err) => { })
    },
    //退货日期月结范围
    unwuDateList (companyId) {
      let data = {
        companyId: companyId
      };
      apiReverse.getAccountPeriodByCompany(data).then(res => {
        if (res.code == "success") {

          this.$nextTick(() => {
            this.pickerOptions = {
              disabledDate (time) {
                return res.data.enddate < time.getTime() || time.getTime() < res.data.begindate;
              }
            }

          })
        } else {
          this.$openWarning(res.message);
        }
      }).catch();
    },
    //保存
    addDetail () {
      if (this.formList.isBilled == "是") {
        this.formList.isBilled = 1
      } else if (this.formList.isBilled == "否") {
        this.formList.isBilled = 0
      }
      this.errorKey = [];
      if (!this.formList.companyName) {
        this.errorKey.push('companyName');
      }
      if (!this.formList.orgName) {
        this.errorKey.push('orgName');
      }
      if (!this.formList.wvNo) {
        this.errorKey.push('wvNo');
      }
      if (!this.formList.supplierName) {
        this.errorKey.push('supplierName');
      }
      if (!this.formList.unwvDate) {
        this.errorKey.push('unwvDate');
      }
      if (this.formList.rmbCurrencyRate == "") {
        this.errorKey.push('rmbCurrencyRate');
      }
      if(this.unwvType==""){
        this.errorKey.push('unwvType');
      }
      if(this.errorKey.length > 0) {
        this.$openWarning('请将必填项补充完整！')
        return false;
      }
      for (const it of this.base.tableData) {
        if(it.secUnwvQty=="" || it.secUnwvQty==null){
          this.$openWarning("第二单位退货数量不能为空");
          return;
        }else if(it.unwvQty==0 && it.secUnwvQty){
           this.$openWarning("第一单位退货数量为0且第二单位退货数量不为0，请核对信息");
            return;
        }
      }
      if (this.base.tableData) {
        this.base.tableData.forEach((item, index) => {
          if (item.unwvQty == 0) {
            this.base.tableData.splice(index)
          }

        })
      }
      if (this.formList.unwvQty == 0) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "退货数量不能为0!",
          type: "warning"
        });
        return;
      }
      let data = {
        unwvStatus: 10800005,//创建单据状态//以保存
        companyName: this.formList.companyName,
        companyCode: this.formList.companyCode, //公司
        companyId: this.formList.companyId, //公司
        orgName: this.formList.orgName, //部门
        orgCode: this.formList.orgCode, //部门
        orgId: this.formList.orgId, //部门
        bizPersonName: this.staffName.bizPersonName, //业务员
        bizPersonCode: this.staffName.bizPersonCode, //业务员
        wvNo: this.formList.wvNo, //入库单号
        supplierName: this.formList.supplierName, //供应商
        supplierCode: this.formList.supplierCode, //供应商
        supplierId: this.formList.supplierId, //供应商
        erpPoNo: this.formList.erpPoNo, //采购合同号
        externalPoNo: this.formList.externalPoNo, //外部合同号
        projectCode: this.formList.projectCode, //项目号
        projectName: this.formList.projectName, //项目名称
        currencyCode: this.formList.currencyCode,//业务币币别
        baseCurrencyRate: this.formList.baseCurrencyRate, //本位币汇率
        unwvWarehouseName: this.formList.unwvWarehouseName,//仓库名称
        unwvWarehouseCode: this.formList.unwvWarehouseCode,//仓库名称
        isBilled: this.formList.isBilled, //是否完全开票
        pickupType: this.formList.pickupType, //提货方式
        unwvReason: this.formList.unwvReason,//退货原因
        unwvDate: this.formList.unwvDate,//退货日期
        rmbCurrencyRate: this.formList.rmbCurrencyRate,//人民币汇率
        payAmtTotalRmb: this.formList.payAmtTotalRmb,//人民币金额
        unwvQty: this.formList.unwvQty,//退货总数量
        unwvOriginAmt: this.formList.unwvOriginAmt,//退货金额
        unwvAddress: this.formList.unwvAddress,//收货地址
        odUnwvItemsList: this.base.tableData,//详情
        sysSystemAccessoryList:this.tableDataw,//附件上传
        unwvType:this.unwvType,//退货类型
        // this.formList.unwvAddress = res.data.unwvAddress; //退货地址

      }
      apiReverse
        .createUnwv(data)
        .then(res => {
          if (res.code == "success") {
            this.$message({
              duration: 1000,
              showClose: true,
              message: res.data,
              type: "success"
            });
            localStorage.removeItem("getData")
            this.$router.push({
              //核心语句
              path: "/index/Purchase/reverse" //跳转的路径
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
    //提交
    addSub () {
      this.unwvId = this.$route.query.unwvId;
      let params = {
        unwvId: this.unwvId,
        version: this.formList.version
      };
      apiReverse
        .submitApprove(params)
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
              path: "/index/Purchase/reverse" //跳转的路径
            });
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
    },
    //审核(入库单)
    toExamine () {
      this.examineShow = true;
    },
    //审核下拉选中的值
    examineSelect (e) {
      this.examineValue = e;//审核选中的值
      this.auditInfo = '';////驳回原因
      this.unwvDate = '';//审核中的出库日期
    },
    //确定
    examineSure () {
      if (!this.examineValue) {
        this.$openWarning("请选择审核");
        return;
      } else if (this.examineValue == "1" && !this.unwvDate) {
        this.$openWarning("请选择审核日期");
        return;
      } else if (this.examineValue == "2" && !this.auditInfo) {
        this.$openWarning("请选择过期原因");
        return
      }
      var list = [];
      let params = {};
      params.unwvId = this.$route.query.unwvId,
        params.version = this.formList.version
      params.approveStatus = this.examineValue,
        params.auditInfo = this.auditInfo,
        params.unwvDate = this.unwvDate
      list.push(params);
      apiReverse
        .ApproveUnwv(list)
        .then(res => {
          this.examineShow = false;
          if (res.code == "success") {
            this.$message({
              duration: 1000,
              showClose: true,
              message: res.data,
              type: "success"
            });
            this.$router.push({
              //核心语句
              path: "/index/Purchase/reverse" //跳转的路径
            });
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
    },
    //取消
    examineCancle () {
      this.examineShow = false;//审核弹窗
      this.examineValue = '';////审核选中的值
      this.unwvDate = '';//审核中的出库日期
    },
    //更改每页条数
    handleSizeChange (e) {
      this.pageSize = e;
      this.addRow();
    },
    //翻页
    currentChange (e) {
      this.pageNum = e;
      this.addRow();
    },
    //表单切换
    handleClick (e) { },
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
   submitUpload() {
      //确定上传
      this.$refs.newupload.submit();
    },
     //移除
    handleRemove(file, fileList) {},
  //预览
    download(row){
      window.open(row.fileServerAddress);
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
          }
        })
        .catch();
    },

  },
  components: {
     staffSelect,
    'v-exmineStatus': ExmineStatus
  },
};
</script>
<style lang="scss" scoped>
.index .index-div3 .el-col-5 {
    width: 24%;
    position: relative;
    margin-top: 10px;
}

</style>
