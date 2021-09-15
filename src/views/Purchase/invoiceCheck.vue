<template>
  <div class="invoiceDetails">
    <el-divider></el-divider>
    <div class="button-div">
      <el-button @click="goBack"
                 icon="el-icon-back">返回</el-button>
      <el-button @click="handleInvoiceExam"
                 v-show="showExamBtn"
                 icon="el-icon-receiving">审核</el-button>
    </div>
    <el-tabs class="el-tabs"
             v-model="activeName2"
             type="card"
             @tab-click="handleClick">
      <el-tab-pane label="抬头信息"
                   name="first"
                   :disabled="tabpane">
        <div class="index-div3">
          <el-col :span="5"
                  class="el-col">
            <label>系统单号</label>
            <el-input v-model="invoiceCode"
                      class="el-inputs"
                      size="small"
                      placeholder="自动生成"
                      :disabled="isReadOnly"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label class="isrequired"><span class="must-full">*</span> 公司</label>
            <el-input v-model="formList.companyName"
                      class="el-inputs"
                      size="small"
                      :disabled="isReadOnly"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label class="isrequired"><span class="must-full">*</span> 部门</label>
            <el-input v-model="formList.orgName"
                      class="el-inputs"
                      size="small"
                      :disabled="isReadOnly"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label class="isrequired"><span class="must-full">*</span> 业务员</label>
            <el-input v-model="formList.bizPersonName"
                      class="el-inputs"
                      size="small"
                      :disabled="isReadOnly"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label class="isrequired"><span class="must-full">*</span> 供应商</label>
            <el-input v-model="formList.supplierName"
                      class="el-inputs"
                      size="small"
                      :disabled="isReadOnly"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-colc">
            <label class="isrequired"><span class="must-full">*</span> 发票类别</label>
            <el-select v-model="formList.invoiceType"
                       size="small"
                       @change="handleTypeChange"
                       :disabled="isReadOnly">
              <el-option v-show="type == 0"
                         v-for="item in blueInvoiceTypeList"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
              <el-option v-show="type == 1"
                         v-for="item in redInvoiceTypeList"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label class="isrequired"><span class="must-full">*</span> 外部发票</label>
            <el-input v-model="formList.extInvoiceCode"
                      class="el-inputs"
                      size="small"
                      :disabled="isReadOnly"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label class="isrequired"><span class="must-full">*</span> 发票日期</label>
            <el-date-picker v-model="formList.invoiceDate"
                            type="date"
                            size="small"
                            class="el-input2"
                            :disabled="isReadOnly">
            </el-date-picker>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>业务币种</label>
            <el-input v-model="formList.currencyCode"
                      class="el-inputs"
                      size="small"
                      :disabled="isReadOnly"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label class="isrequired"><span class="must-full">*</span> 本币汇率</label>
            <el-input v-model="formList.baseCurrencyRate"
                      class="el-inputs"
                      size="small"
                      :disabled="isReadOnly"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>发票数量</label>
            <el-input v-model="invoiceQty"
                      class="el-inputs"
                      size="small"
                      :disabled="isReadOnly"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>发票金额</label>
            <el-input v-model="invoiceAmt"
                      class="el-inputs"
                      size="small"
                      :disabled="isReadOnly"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-colc">
            <label>单据状态</label>
            <el-select v-model="formList.invoiceStatus"
                       size="small"
                       :disabled="isReadOnly">
              <el-option v-for="item in invoiceStatusList"
                         :key="item.dict_key"
                         :label="item.dict_value"
                         :value="item.dict_key">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="5"
                  class="el-colc">
            <label>过账日期</label>
            <el-date-picker v-model="formList.accountDay"
                            type="date"
                            class="el-input2"
                            size="small"
                            :disabled="isReadOnly">
            </el-date-picker>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label><span class="must-full">*</span>RMB汇率</label>
            <el-input v-model="formList.rmbCurrencyRate"
                      class="el-inputs"
                      size="small"
                      disabled></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label><span class="must-full">*</span>RMB金额</label>
            <el-input v-model="formList.payAmtTotalRmb"
                      class="el-inputs"
                      size="small"
                      disabled></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label><span class="must-full">*</span>附件数量</label>
            <el-input v-model="formList.attachmentCount"
                      class="el-inputs"
                      :disabled="isReadOnly"
                      @input="formList.attachmentCount= $filterPriceNum(formList.attachmentCount,0)"
                      size="small"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>税金科目</label>
            <el-input v-model="formList.accountName"
                      class="el-inputs"
                      :disabled="isReadOnly"
                      size="small"></el-input>
          </el-col>
          <el-col :span="5"
                    class="el-col">
                <label>凭证号</label>
                <el-input v-model="warrantCode"
                          class="el-inputs"
                          size="small"
                          disabled></el-input>
            </el-col>
            <el-col :span="5"
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
            <el-col :span="5"
                    class="el-col">
              <label>冲销凭证号</label>
              <el-input v-model="writeoffWarrantCode"
                        class="el-inputs"
                        size="small"
                        disabled></el-input>
            </el-col>
            <el-col :span="5"
                    class="el-col">
              <label>冲销期间</label>
              <el-date-picker
                  type="month"
                  size="small"
                  v-model="writeoffWarrantMonth"
                  disabled
                  value-format="yyyyMM"
                  >
              </el-date-picker>   
            </el-col>
          <div class="remark-style">
            <label>备注 </label>
            <el-input type="textarea"
                      autosize
                      v-model="formList.remark"
                      size="small"
                      class="el-textarea"
                      :disabled="isReadOnly"
                      resize="none"></el-input>
            <div class="empty-class"></div>
          </div>
        </div>
        <div class="el-table-div">
          <el-table border
                    center
                    max-height="370"
                    show-summary
                    :data="base.tableData"
                    class="el-table"
                    tooltip-effect="dark"
                    style="width: 100%"
                    ref="table"
                    v-loading="loading"
                    :summary-method="getSummaries">
            <el-table-column type="selection"
                             width="50"
                             align="center"
                             show-overflow-tooltip></el-table-column>
            <el-table-column label="行号"
                             prop="lineNo"
                             width="50"
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
            <el-table-column prop="externalPoNo"
                             label="外部合同号"
                             width="120"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column v-if="type == 0"
                             prop="wvNo"
                             label="入库单号"
                             width="120"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column v-else
                             prop="unwvNo"
                             label="退货单号"
                             width="120"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column v-if="type == 0"
                             prop="wvRowno"
                             label="入库单号行号"
                             width="120"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column v-else
                             prop="unwvRowno"
                             label="退货单号行号"
                             width="120"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="goodsCode"
                             label="物料号"
                             width="100"
                             show-overflow-tooltip>
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
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="unInvoiceQty"
                             label="未开票数量"
                             width="100"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                {{scope.row.uninvoiceQty}}
              </template>
            </el-table-column>
            <el-table-column prop="invoiceQty"
                             label="本次发票数量"
                             width="100"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input v-model="scope.row.invoiceQty"
                            @input="handleInvoiceQtyCheck(scope.row)"
                            :disabled="isDisabled">
                  </el-input>
                </div>
                <div v-else
                     class="fixedHeight">
                  <span slot="reference"> {{ scope.row.invoiceQty }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="itemUnitName"
                             label="基础单位"
                             width="100"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="secUnitName"
                             label="第二单位"
                             width="100"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="第二数量"
                             width="100"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input v-model="scope.row.secUnwvQty"> </el-input>
                </div>
                <div v-else
                     class="fixedHeight">
                  <span slot="reference"> {{ scope.row.secUnwvQty }}</span>
                </div>
              </template>
            </el-table-column>

            <el-table-column label="业务币含税单价"
                             width="120"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input v-model="scope.row.originPrice"> </el-input>
                </div>
                <div v-else
                     class="fixedHeight">
                  <span slot="reference"> {{ scope.row.originPrice }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="originAmtVat"
                             label="业务币含税金额"
                             width="120"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input v-model="scope.row.originAmtVat"> </el-input>
                </div>
                <div v-else
                     class="fixedHeight">
                  <span slot="reference"> {{ scope.row.originAmtVat }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="originAmt"
                             label="业务币不含税金额"
                             width="120"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="增值税率%"
                             width="100"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input v-model="scope.row.taxRate"> </el-input>
                </div>
                <div v-else
                     class="fixedHeight">
                  <span slot="reference"> {{ scope.row.taxRate }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="originTaxAmt"
                             label="业务币税额"
                             width="120"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input v-model="scope.row.originTaxAmt"> </el-input>
                </div>
                <div v-else
                     class="fixedHeight">
                  <span slot="reference"> {{ scope.row.originTaxAmt }}</span>
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
              <!-- 计算 -->
            </el-table-column>
            <el-table-column prop="baseTaxAmt"
                             label="本币增值税额"
                             width="120"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="备注"
                             width="100">
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input size="mini"
                            v-model="scope.row.remark"></el-input>
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
        <staff-select v-if="staffShow"
                      :tipShow="staffShow"
                      :data="formList"
                      @staffCancle="staffCancle"
                      @staffSure="staffSure">
        </staff-select>
        <!-- 创建弹窗 -->
        <invoice-Add ref="invoiceAdd"
                     v-if="invoiceShow"
                     :tipShows="invoiceShow"
                     :createForm="formList"
                     @invoiceCancle="invoiceCancle"
                     @invoiceSure="invoiceSure"></invoice-Add>
      </el-tab-pane>
      <!-- <el-tab-pane label="汇总信息" name="third" :disabled="tabpane">
        <div class="index-div3">
          <el-col :span="7" class="el-col">
            <label>原币总金额</label>
            <el-input
              v-model="formList.wvNo"
              class="el-inputs"
              size="small"
              
              disabled
            ></el-input>
          </el-col>
          <el-col :span="7" class="el-col">
            <label>原币总金额(不含税)</label>
            <el-input
              v-model="formList.companyCode"
              class="el-inputs"
              size="small"
              
              disabled
            ></el-input>
          </el-col>
          <el-col :span="7" class="el-col">
            <label>原币税额</label>
            <el-input
              v-model="formList.projectCode"
              class="el-inputs"
              size="small"
              
              disabled
            ></el-input>
          </el-col>
          <el-col :span="7" class="el-col">
            <label>本币总金额</label>
            <el-input
              v-model="formList.wvNo"
              class="el-inputs"
              size="small"
              
              disabled
            ></el-input>
          </el-col>
          <el-col :span="7" class="el-col">
            <label>本币总金额(不含税)</label>
            <el-input
              v-model="formList.companyCode"
              class="el-inputs"
              size="small"
              
              disabled
            ></el-input>
          </el-col>
          <el-col :span="7" class="el-col">
            <label>本币税额</label>
            <el-input
              v-model="formList.projectCode"
              class="el-inputs"
              size="small"
              
              disabled
            ></el-input>
          </el-col>
          <el-col :span="7" class="el-col">
            <label>票务总数量</label>
            <el-input
              v-model="formList.projectCode"
              class="el-inputs"
              size="small"
              
              disabled
            ></el-input>
          </el-col>
        </div>
      </el-tab-pane>
      <el-tab-pane label="凭证信息" name="fourth" :disabled="tabpane">
        <div class="index-div3">
          <el-col :span="7" class="el-col">
            <label>凭证标识</label>
            <el-select
              v-model="formList.bldoStatus"
              
              size="small"
              disabled
            >
              <el-option
                v-for="item in blStatus"
                :key="item.value"
                :label="item.dict_value"
                :value="item.dict_code"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="7" class="el-col">
            <label>凭证过账标号</label>
            <el-input
              type="text"
              autosize
              v-model="formList.remark"
              size="small"
              disabled
            >
            </el-input>
          </el-col>
          <el-col :span="7" class="el-col">
            <label>推送失败原因</label>
            <el-input
              type="text"
              autosize
              v-model="formList.remark"
              size="small"
              disabled
            >
            </el-input>
          </el-col>
        </div>
      </el-tab-pane> -->
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
                            size="small"
                            class="el-input2"
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
                            size="small"
                            class="el-input2"
                            disabled>
            </el-date-picker>
          </el-col>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 审核弹窗 -->
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
                :span="5"
                class="el-col">
          <label>过账日期</label>
          <el-date-picker class="el-input2"
                          style="width:178px;"
                          v-model="examineDate"
                          type="date"
                          size="small"
                          placeholder="请选择日期"
                          :picker-options="pickerOptions">
          </el-date-picker>
        </el-col>
        <el-col v-if="examineValue=='1'"
                :span="5"
                class="el-col">
          <label style="vertical-align:top">税金科目</label>
          <el-input v-model="accountData.accountName"
                    class="el-inputs2"
                    style="width:178px;"
                    disabled
                    size="small">
            <i slot="suffix"
               style="cursor: pointer;"
               @click="accountTips"
               class="el-icon-search"></i>
          </el-input>
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
                   icon="el-icon-check"
                   :disabled="isAllowedConfirm"
                   v-if="$actionFlag(`F007`)">确定</el-button>
        <el-button @click="examineCancle"
                   icon="el-icon-close">取消</el-button>
      </div>
    </el-dialog>
    <!--税金科目-->
    <subject-frame v-if="subjectShow"
                   :tipShow='subjectShow'
                   :longNumber="22210101"
                   @subjectCancle="subjectCancle"
                   @subjectSure="subjectSure"></subject-frame>
  </div>
</template>
<script>
import staffSelect from "@/components/staffSelect.vue"; //业务员
import subjectFrame from "@//components/subjectFrame.vue";//科目组件
import {
  getInvoiceStatusList,
  odWvItemsList2PoInvoice,
  odUnwvItemsList2PoInvoice,
  createdPurchaseInvoice,
  updatePurchaseInvoice,
  odPoInvoiceDetail,
  approvePoInvoice
} from "@/api/Purchase/invoice";
import api from "@/api/ladingBill/ladingBill";
import invoiceAdd from "./invoiceAdd.vue";

export default {
  name: "invoiceDetails",
  data () {
    return {
      activeName2: "first", //标签页
      tabpane: false, //不可编辑
      creactNo: false, //不可编辑
      invoiceCode: "",
      formList: {
        companyName: "",
        orgName: "",
        empName: "",
        supplierName: "",
        invoiceType: "",
        extInvoiceCode: "",
        invoiceDate: "",
        currencyCode: "",
        baseCurrencyRate: 0,
        invoiceStatus: "",
        accountDay: "",
        remark: ""
      }, //表单
      disabletab: false, //不可编辑
      wvStatus: [], //入库单类型
      isBilledList: [], //是否完全开发票
      pickupstatus: [], //提货方式
      predictArrivedDate: "", //记账日期
      loading: false, //表格loading
      base: {
        //商品详情
        tableData: [],
        matterShow: false //物料编号
      },
      type: 0,
      warehousingAddRowShow: false, //创建弹框
      tableDataw: [], //打印列表
      manName: ``, //业务员
      staffShow: false, //业务员是否显示
      blueInvoiceTypeList: [
        { value: 10700005, label: "标准发票" },
        { value: 10700015, label: "事后借记" },
        { value: 10700020, label: "事后贷记" }
      ],
      redInvoiceTypeList: [{ value: 10700010, label: "退货发票" }],
      invoiceStatusList: [], //单据状态
      blStatus: [],
      invoiceShow: false,
      isDisabled: false,
      isReadOnly: true,
      checkItem: {},
      showExamBtn: false,//显示审核按钮
      examineShow: false,//显示审核弹窗
      examineList: [
        { value: "1", label: "通过" },
        { value: "2", label: "驳回" },
      ],
      examineDate: '',//审核弹窗里的出库日期
      auditInfo: '',//驳回原因
      accountName: '',//税金科目
      pickerOptions: {},//时间范围
      examineValue: '',//审核原因
      isAllowedConfirm: true,//是否允许审核
      subjectShow: false,//税金科目
      accountData: {},//税金科目
      invoiceQty:"",
      invoiceAmt:"",
       warrantCode:'',//凭证号 
      warrantMonth:'', //期间 
      writeoffWarrantCode:'',//冲销凭证号
      writeoffWarrantMonth:'',//冲销期间
    };
  },
  methods: {
    initData () {
      this.type = localStorage.getItem("type");
      getInvoiceStatusList({ dictNo: 1081 }).then(res => {
        this.invoiceStatusList = res.data;
        // this.formList.invoiceStatus = 10810005;
      });
      if (this.$route.params.checkItem != undefined) {
        let tempData = this.$route.params.checkItem;
        odPoInvoiceDetail({
          invoiceId: tempData.invoiceId
        })
          .then(res => {
            let sum = 0;
            this.formList = res.data;
            this.base.tableData = res.data.odPoInvoiceItemsList;
            this.invoiceCode = res.data.invoiceCode;
            this.invoiceQty=res.data.invoiceQty;//发票总数
            this.invoiceAmt=res.data.invoiceAmt;
            this.warrantCode= res.data.warrantCode;//凭证号 
            this.warrantMonth= res.data.warrantMonth; //期间 
            this.writeoffWarrantCode= res.data.writeoffWarrantCode;//冲销凭证号
            this.writeoffWarrantMonth=res.data.writeoffWarrantMonth;//冲销期间

            if (this.formList.invoiceType != 10700010) {
              this.type = 0
            } else {
              this.type = 1
            }
            if (res.data.invoiceStatus == 10810010) {
              this.showExamBtn = true
            }
            this.base.tableData.map((item, index) => {
              item.lineNo = (index + 1) * 10
              item.unInvoiceQty = item.uninvoiceQty;
              item.baseNoAmt = Math.round((item.baseAmt - item.baseTaxAmt) * 100) / 100;
              //采购不含税金额
              item.originAmt =this.$unorginAmtCh(item.originAmtVat, item.originTaxAmt);
              //this.originAmtCh(item, index);
              sum += item.originAmtVat;
            });
            // this.formList.payAmtTotalRmb =
            //   sum * this.formList.rmbCurrencyRate;
          })
          .catch(() => { });
      } else {
        this.$openWarning("数据获取失败，请重新获取");
      }
    },
    handleInvoiceQtyCheck (row) {
      if (row.invoiceQty > row.unInvoiceQty) {
        row.invoiceQty = "";
        this.$openWarning("开票数量不可大于未开票数量");
      } else {
        row.originAmtVat = row.invoiceQty * row.originPrice;
      }
    },
    originPriceCh (row, index) {
      //采购含税金额
      // row.originAmtVat =
      // Math.round(row.originPrice * row.invoiceQty * 100) / 100;
      row.originAmtVat = this.$orginAmt(row.originPrice, row.invoiceQty);
      //采购不含税金额
      row.originAmt = this.$unorginAmt(row.originAmtVat, row.taxRate);
      //增值税额
      row.originTaxAmt = this.$taxAmt(row.originAmtVat, row.originAmt);

      //本币计算 对应业务币*汇率
      //本币含税单价  basePrice
      row.basePrice = this.$bbhsdj(
        row.originPrice,
        this.formList.baseCurrencyRate
      );
      //本币含税金额 baseAmt
      row.baseAmt = this.$bbhsje(
        row.originAmtVat,
        this.formList.baseCurrencyRate
      );
      //本币不含税金额 baseNoAmt
      row.baseNoAmt = Math.round((row.baseAmt - row.baseTaxAmt) * 100) / 100
      //   row.baseNoAmt = this.$bbnhsje(
      // row.originAmt,
      // this.formList.baseCurrencyRate
      //   );
      //本币增值税额 baseTaxAmt
      row.baseTaxAmt = this.$bbzzse(
        row.originTaxAmt,
        this.formList.baseCurrencyRate
      );
      this.$set(this.base.tableData, index, row);
    },
    originAmtCh (row, index) {
      //采购含税单价
      //   row.originPrice = this.$orginPrice(row.originAmtVat, row.invoiceQty);
      //采购不含税金额
      row.originAmt = this.$unorginAmt(row.originAmtVat, row.taxRate);
      //增值税额
      row.originTaxAmt = this.$taxAmt(row.originAmtVat, row.originAmt);

      //本币计算 对应业务币*汇率
      //本币含税单价  basePrice
      //   row.basePrice = this.$bbhsdj(
      //     row.originPrice,
      //     this.formList.baseCurrencyRate
      //   );
      //本币不含税金额 baseNoAmt
      row.baseNoAmt = Math.round((row.baseAmt - row.baseTaxAmt) * 100) / 100

      //   row.baseNoAmt = this.$bbnhsje(
      //     row.originAmt,
      //     this.formList.baseCurrencyRate
      //   );
      //本币增值税额 baseTaxAmt
      row.baseTaxAmt = this.$bbzzse(
        row.originTaxAmt,
        this.formList.baseCurrencyRate
      );
      this.$set(this.base.tableData, index, row);
    },
    taxRateCh (row, index) {
      //采购不含税金额
      row.originAmt = this.$unorginAmt(row.originAmtVat, row.taxRate);
      //增值税额
      row.originTaxAmt = this.$taxAmt(row.originAmtVat, row.originAmt);
      //本币计算 对应业务币*汇率
      //本币不含税金额 baseNoAmt
      row.baseNoAmt = Math.round((row.baseAmt - row.baseTaxAmt) * 100) / 100

      //   row.baseNoAmt = this.$bbnhsje(
      //     row.originAmt,
      //     this.formList.baseCurrencyRate
      //   );
      //本币增值税额 baseTaxAmt
      row.baseTaxAmt = this.$bbzzse(
        row.originTaxAmt,
        this.formList.baseCurrencyRate
      );
      this.$set(this.base.tableData, index, row);
    },
    taxAmtCh (row, index) {
      //采购不含税金额  采购不含税金额=采购含税金额-税额
      row.originAmt = this.$unorginAmtCh(row.originAmtVat, row.originTaxAmt);

      //本币计算 对应业务币*汇率
      //本币不含税金额 baseNoAmt
      row.baseNoAmt = Math.round((row.baseAmt - row.baseTaxAmt) * 100) / 100

      //   row.baseNoAmt = this.$bbnhsje(
      //     row.originAmt,
      //     this.formList.baseCurrencyRate
      //   );
      this.$set(this.base.tableData, index, row);
    },
    handleTypeChange (item) {
      switch (item) {
        case 0:
        case 1:
          this.isDisabled = false;
          break;
        case 2:
        case 3:
          this.base.tableData.map(item => {
            if (item.unInvoiceQty) {
              item.invoiceQty = 0;
            }
          });
          this.isDisabled = true;
          break;

        default:
          break;
      }
    },
    //入库单类型
    warehousingAddRowCancle () {
      this.warehousingAddRowShow = false;
    },
    //创建确定
    invoiceSure (e) {
      this.invoiceShow = false;
      const tempList = e[1];
      const searchForm = {};
      searchForm.companyCode = this.formList.companyCode || "";
      searchForm.orgCode = this.formList.orgCode || "";
      searchForm.supplierCode = this.formList.supplierCode || "";
      let str = "";
      if (this.type == 0) {
        tempList.forEach(el => {
          str += el.wvNo + ",";
        });
        str = str.substring(0, str.length - 1);
        searchForm.noStr = str;
        odWvItemsList2PoInvoice(searchForm)
          .then(res => {
            this.base.tableData = this.base.tableData.concat(res.data);
          })
          .catch(err => { });
      } else {
        tempList.forEach(el => {
          str += el.unwnNo + ",";
        });
        str = str.substring(0, str.length - 1);
        searchForm.noStr = str;
        if(this.formList.invoiceType=="10700010"){
            parseInt(searchForm.isRedInvoice=1);
        }else{
            parseInt(searchForm.isRedInvoice=0);
        }
        odUnwvItemsList2PoInvoice(searchForm)
          .then(res => {
            this.base.tableData = this.base.tableData.concat(res.data);
          })
          .catch(err => { });
      }
      this.formList.currencyCode=e[0].currencyCodeOrigin;//获取弹框里的币别
      this.tableData.from(new Set(arr));
    },
    //税金科目打开
    accountTips () {
      this.subjectShow = true;
    },
    //税金科目确认
    subjectSure (e) {
      console.log('e :', e);
      if (e) {
        this.accountData = e;
        this.accountData.accountName = this.accountData.nameL1
        this.accountData.accountCode = this.accountData.number
        // let nameL1 = this.accountData.nameL1;
        // this.accountData.accountCode = nameL1.substring(0, nameL1.indexOf(' '));
      }
      this.subjectShow = false;
    },
    //税金科目取消
    subjectCancle () {
      this.subjectShow = false;
    },
    //创建取消
    invoiceCancle () {
      this.invoiceShow = false;
    },
    //部门弹窗打开
    manTip () {
      this.staffShow = true;
    },
    //部门弹窗关闭
    staffCancle () {
      this.staffShow = false;
    },
    //部门弹窗确定获取数据
    staffSure (e) {
      this.staffShow = false;
      this.manName = e;
      this.formList.empName = e.empName;
    },
    //增加行
    addRow () {
      this.invoiceShow = true;
    },
    //取消
    goBack () {
      this.$router.push({
        //核心语句
        path: "/index/Purchase/invoice" //跳转的路径
      });
    },
    //审核下拉选中的值
    examineSelect (e) {
      this.isAllowedConfirm = false;
    },
    //审核取消
    examineCancle () {
      this.examineShow = false;//审核弹窗
      this.examineValue = '';////审核选中的值
      this.examineDate = '';//审核中的出库日期
      this.accountData = {}
    },
    //月结
    accountPeriod (companyId) {
      let data = {
        companyId: companyId
      };
      api.getAccountPeriodByCompany(data).then(res => {
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
    //审核
    examineSure () {
      if (this.examineValue == "") {
        this.$openWarning('请选择是否通过审核')
      } else if (this.examineDate == "") {
        this.$openWarning('请选择审核时间')
      } else if (!Object.keys(this.accountData).length) {
        this.$openWarning('请选择税金科目')
      } else {
        if (this.examineValue == 1) {
          this.formList.approveStatus = 1
          this.formList.accountDay = this.examineDate;
          this.formList.accountName = this.accountData.accountName;
          this.formList.accountCode = this.accountData.accountCode;
        } else {
          this.formList.approveStatus = 2
          this.formList.auditInfo = this.auditInfo;
          this.formList.accountName = this.accountData.accountName
          this.formList.accountCode = this.accountData.accountCode
        }
        approvePoInvoice([this.formList])
          .then(res => {
            this.$openSuccess('操作成功！');
            this.$router.push({
              //核心语句
              path: "/index/Purchase/invoice" //跳转的路径
            });
          })
          .catch(() => { });
      }
    },
    //审核弹窗
    handleInvoiceExam () {
      this.accountPeriod(this.formList.companyId);
      this.accountData.accountName=this.formList.accountName;
      this.accountData.accountCode=this.formList.accountCode;
      this.examineDate=this.formList.accountDay;
      this.examineShow = true;
    },
    //表单切换
    handleClick (e) { },
    getSummaries (param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
        } else if (
          index === 11 ||
          index === 12 ||
          index === 16 ||
          index === 17 ||
          index === 18 ||
          index === 20 ||
          index === 22 ||
          index === 23 ||
          index === 24
        ) {
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                let res = (prev * 100000 + curr * 100000) / 100000;
                if (index === 11 || index === 12) {
                    this.totalSum = res.toFixed(4);
                    return res.toFixed(4);
                }else if (
                  index === 17 ||
                  index === 18 ||
                  index === 20 ||
                  index === 22 ||
                  index === 23 ||
                  index === 24
                ) {
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
        }
      });
      return sums;
    },
  },
  created () {
    this.initData();
  },
  components: {
    staffSelect,
    invoiceAdd,
    subjectFrame
  }
};
</script>
<style lang="scss" scoped>
.remark-style {
  display: flex;
  padding-top: 10px;
  justify-content: space-around;
  width: 100%;
  label {
    width: 6.89%;
    text-align: right;
    line-height: 31px;
    padding-right: 9px;
  }
  .empty-class {
    width: 3.8%;
  }
}
.fixedHeight {
  height: 30px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.index .el-button.is-disabled, .index .el-button.is-disabled:focus, .index .el-button.is-disabled:hover{
    color: #c0c4cc;
    cursor: not-allowed;
    background-color: #fff;
    border:1px solid  #ebeef5;
}
</style>
