<template>
  <div class="invoiceDetails">
    <el-divider></el-divider>
    <div class="button-div">
      <el-button class="query-button"
                 icon="el-icon-suitcase"
                 @click="subFun">保存</el-button>
      <el-button @click="goBack"
                 icon="el-icon-close">取消</el-button>
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
            <label>系统单据号</label>
            <el-input v-model="invoiceCode"
                      class="el-inputs"
                      size="small"
                      placeholder="自动生成"
                      disabled></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col  el-col-required">
            <label class="isrequired"><span class="must-full">*</span>公司</label>
            <el-input v-model="formList.companyName"
                      class="el-inputs"
                      :class="errorKey.includes('companyName') ? 'inputRed' : ''"
                      size="small"
                      placeholder="请选择"
                      disabled></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col  el-col-required">
            <label class="isrequired"><span class="must-full">*</span>部门</label>
            <el-input v-model="formList.orgName"
                      class="el-inputs"
                      :class="errorKey.includes('orgName') ? 'inputRed' : ''"
                      size="small"
                      placeholder="请选择"
                      disabled></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col  el-col-required">
            <label class="isrequired"><span class="must-full">*</span>业务员</label>
            <el-input v-model="formList.empName"
                      class="el-inputs"
                      :class="errorKey.includes('empName') ? 'inputRed' : ''"
                      size="small"
                      placeholder="请选择"
                      disabled></el-input>
            <span class="comicon"
                  @click="manTip"><i class="el-icon-search"></i></span>
          </el-col>
          <el-col :span="5"
                  class="el-col  el-col-required">
            <label class="isrequired"><span class="must-full">*</span>供应商</label>
            <el-input v-model="formList.supplierName"
                      class="el-inputs"
                      :class="errorKey.includes('supplierName') ? 'inputRed' : ''"
                      size="small"
                      placeholder="请选择"
                      disabled></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-colc  el-col-required">
            <label class="isrequired"><span class="must-full">*</span>发票类别</label>
            <el-select v-model="formList.invoiceType"
                       placeholder="请选择"
                      :class="errorKey.includes('invoiceType') ? 'inputRed' : ''"
                       size="small"
                       @change="handleTypeChange(formList.invoiceType)">
              <el-option v-show="type == 0"
                         v-for="item in blueInvoiceTypeList"
                         :disabled="item.isDisabled"
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
                  class="el-col  el-col-required">
            <label class="isrequired"><span class="must-full">*</span>外部发票</label>
            <el-input v-model="formList.extInvoiceCode"
                      class="el-inputs"
                      :class="errorKey.includes('extInvoiceCode') ? 'inputRed' : ''"
                      size="small"
                      placeholder="请输入"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col  el-col-required">
            <label class="isrequired"><span class="must-full">*</span>发票日期</label>
            <el-date-picker v-model="formList.invoiceDate"
                            type="date"
                            :class="errorKey.includes('invoiceDate') ? 'inputRed' : ''"
                            size="small"
                            placeholder="请输入日期"
                            class="el-input2">
            </el-date-picker>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>业务币种</label>
            <el-input v-model="formList.currencyCode"
                      class="el-inputs"
                      size="small"
                      placeholder="请选择"
                      disabled></el-input>
            <!-- <el-select v-model="formList.currencyCode"
                       placeholder="请选择"
                       disabled>
              <el-option v-for="item in currencyList"
                         :key="item.currencyCode"
                         :label="item.currencyName"
                         :value="item.currencyCode">
              </el-option>
            </el-select> -->
          </el-col>
          <el-col :span="5"
                  class="el-col  el-col-required">
            <label class="isrequired"><span class="must-full">*</span>本币汇率</label>
            <el-input v-model="baseCurrencyRate"
                      class="el-inputs"
                      :class="errorKey.includes('baseCurrencyRate') ? 'inputRed' : ''"
                      size="small"
                      disabled
                      @input="handleCurrencyChnage($event)"
                      placeholder="请选择"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>发票数量</label>
            <el-input v-model="invoiceQty"
                      class="el-inputs"
                      size="small"
                      placeholder="请选择"
                      disabled></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>发票金额</label>
            <el-input v-model="invoiceAmt"
                      class="el-inputs"
                      size="small"
                      placeholder="请选择"
                      disabled></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-colc">
            <label>单据状态</label>
            <el-select v-model="formList.invoiceStatus"
                       placeholder="请选择"
                       size="small"
                       disabled>
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
                            placeholder="请输入日期">
            </el-date-picker>
          </el-col>
          <el-col :span="5"
                  class="el-col  el-col-required">
            <label><span class="must-full">*</span>RMB汇率</label>
            <el-input v-model="formList.rmbCurrencyRate"
                      class="el-inputs"
                      :class="errorKey.includes('rmbCurrencyRate') ? 'inputRed' : ''"
                      @input="handleRmbRateChange($event)"
                      size="small"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col  el-col-required">
            <label><span class="must-full">*</span>RMB金额</label>
            <el-input v-model="formList.payAmtTotalRmb"
                      class="el-inputs"
                      :class="errorKey.includes('payAmtTotalRmb') ? 'inputRed' : ''"
                      size="small"
                      disabled></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col  el-col-required">
            <label><span class="must-full">*</span>附件数量</label>
            <el-input v-model="formList.attachmentCount"
                      class="el-inputs"
                      :class="errorKey.includes('attachmentCount') ? 'inputRed' : ''"
                      @input="formList.attachmentCount= $filterPriceNum(formList.attachmentCount,0)"
                      size="small"></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>税金科目</label>
            <el-input v-model="accountData.accountName"
                      class="el-inputs2"
                      disabled
                      size="small"></el-input>
            <span class='comicon'
                  @click="accountTips"><i class="el-icon-search"></i></span>
          </el-col>
          <div class="remark-style">
            <label>备注 </label>
            <el-input type="textarea"
                      autosize
                      v-model="formList.remark"
                      size="small"
                      class="el-textarea"
                      placeholder="请输入内容"></el-input>
            <div class="empty-class"></div>
          </div>
        </div>
        <div class="button-div">
          <el-button class="addBut"
                     @click="addRow"
                     icon="el-icon-plus">新增行</el-button>
          <el-button class="addBut"
                     @click="deleRow"
                     icon="el-icon-minus">删除行</el-button>
        </div>
        <div class="el-table-div">
          <el-table border
                    center
                    show-summary
                    :data="base.tableData"
                    class="el-table"
                    max-height="370"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @row-dblclick="tableDataBdlclick"
                    @row-click="Bdlclick"
                    ref="table"
                    @select-all="dialogCheckbaseAll"
                    @select="dialogCheckbase"
                    v-loading="loading"
                    :summary-method="getSummaries">
            <el-table-column type="selection"
                             width="55"
                             align="center"
                             show-overflow-tooltip></el-table-column>
            <el-table-column label="行号"
                             prop="invoiceRowno"
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
                             width="120"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="externalPoNo"
                             label="外部合同号"
                             width="100"
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
                             width="200"
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
                            @input="handleInvoiceQtyChange(scope);"
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
                  <el-input v-model="scope.row.secUnwvQty"
                            @input="handleSecUnwvQtyChange(scope.row.secUnwvQty,scope.$index,scope.row)"> </el-input>
                </div>
                <div v-else
                     class="fixedHeight">
                  <span slot="reference"> {{ scope.row.secUnwvQty }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="originPrice"
                             label="业务币含税单价"
                             width="120"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input v-model="scope.row.originPrice"
                            @input="handleOriginPriceChange(scope)">
                  </el-input>
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
                  <el-input v-model="scope.row.originAmtVat"
                            @input="handleOriginAmtVatChange(scope)">
                  </el-input>
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
            <el-table-column prop="taxRate"
                             label="增值税率%"
                             width="100"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-input v-model="scope.row.taxRate"
                            @input="handleTaxRateChange(scope)">
                  </el-input>
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
                  <el-input v-model="scope.row.originTaxAmt"
                            @input="handleOriginTaxAmt(scope)">
                  </el-input>
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
                             width="100"
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
        </div>
        <!--税金科目-->
        <subject-frame v-if="subjectShow"
                       :tipShow='subjectShow'
                       :longNumber="22210101"
                       @subjectCancle="subjectCancle"
                       @subjectSure="subjectSure"></subject-frame>
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
                      placeholder="请选择"
                      disabled></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>创建时间</label>
            <el-date-picker v-model="formList.createdTime"
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
            <el-input v-model="formList.updatedName"
                      class="el-inputs"
                      size="small"
                      placeholder="请选择"
                      disabled></el-input>
          </el-col>
          <el-col :span="5"
                  class="el-col">
            <label>修改时间</label>
            <el-date-picker v-model="formList.updatedTime"
                            type="date"
                            size="small"
                            class="el-input2"
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
import staffSelect from "@/components/staffSelect.vue"; //业务员
import {
  getInvoiceStatusList,
  odWvItemsList2PoInvoice,
  odUnwvItemsList2PoInvoice,
  createdPurchaseInvoice,
  updatePurchaseInvoice,
  odPoInvoiceDetail,
  deletePoInvoiceItems
} from "@/api/Purchase/invoice";
import Count from "@/assets/js/calculation";
import { list as coinList } from "@/api/contractMange/frameProtocol";
import subjectFrame from "@/components/subjectFrame.vue";//科目组件
import invoiceAdd from "./invoiceAdd.vue";

export default {
  name: "invoiceDetails",
  data () {
    return {
      errorKey: [],
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
        invoiceStatus: "",
        accountDay: "",
        remark: "",
        rmbCurrencyRate: ""
      }, //表单
      baseCurrencyRate: null,
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
      type: null,
      warehousingAddRowShow: false, //创建弹框
      tableDataw: [], //打印列表
      manName: ``, //业务员
      staffShow: false, //业务员是否显示
      blueInvoiceTypeList: [
        { value: 10700005, label: "标准发票", isDisabled: false },
        { value: 10700015, label: "事后借记", isDisabled: false },
        { value: 10700020, label: "事后贷记", isDisabled: false }
      ],
      redInvoiceTypeList: [
        { value: 10700010, label: "退货发票", isDisabled: false }
      ],
      invoiceStatusList: [], //单据状态
      blStatus: [],
      invoiceShow: false,
      isDisabled: false,
      selectioned: [],
      selectedIndex: null,
      currencyList: [],
      totalSum: 0,
      subjectShow: false,//税金科目
      accountData: {},//税金科目
      invoiceQty:'',//发票总数
      invoiceAmt:"",//发票金额
    };
  },
  methods: {
    initData () {
      this.type = localStorage.getItem("type");
      getInvoiceStatusList({ dictNo: 1081 }).then(res => {
        this.invoiceStatusList = res.data;
        this.formList.invoiceStatus = 10810005;
      });
      //币种列表
      coinList({})
        .then(res => {
          this.currencyList = res.data;
        })
        .catch(() => { });
      if (this.$route.params.modifyData) {
        let tempData = this.$route.params.modifyData;
        odPoInvoiceDetail({
          invoiceId: tempData.invoiceId
        })
          .then(res => {
            let sum = 0;
            this.formList = res.data;
            this.base.tableData = res.data.odPoInvoiceItemsList;
            this.invoiceCode = res.data.invoiceCode;
            this.invoiceQty=res.data.invoiceQty;//发票数量
            this.invoiceAmt=res.data.invoiceAmt;
            this.baseCurrencyRate = res.data.baseCurrencyRate;
            this.formList.empName = res.data.bizPersonName;
            this.formList.empCode = res.data.bizPersonCode;
            if (
              this.formList.invoiceType == 10700015 ||
              this.formList.invoiceType == 10700020
            ) {
              this.isDisabled = true;
              this.blueInvoiceTypeList[0].isDisabled = true;
              this.redInvoiceTypeList[0].isDisabled = true;
            } else if (
              this.formList.invoiceType == 10700005 ||
              this.formList.invoiceType == 10700010
            ) {
              this.isDisabled = false;
              this.blueInvoiceTypeList[1].isDisabled = true;
              this.blueInvoiceTypeList[2].isDisabled = true;
              if (this.formList.invoiceType == 10700010) {
                this.type = 1;
              } else {
                this.type = 0;
              }
            }
            this.base.tableData.map((item, index) => {
              item.invoiceRowno = (index + 1) * 10;
              //字段大小写
              item.unInvoiceQty = item.uninvoiceQty;
              item.invoiceQty = item.invoiceQty;
              //this.originPriceCh(item, index);
              item.baseNoAmt = Math.round((item.baseAmt - item.baseTaxAmt) * 100) / 100;
              //采购不含税金额
              // item.originAmt = this.$unorginAmt(item.originAmtVat, item.taxRate);
              //采购不含税金额
              item.originAmt =this.$unorginAmtCh(item.originAmtVat, item.originTaxAmt);
              sum += item.originAmtVat;
            });
            this.formList.payAmtTotalRmb =
              Math.round(sum * this.formList.rmbCurrencyRate * 100) / 100;
          })
          .catch(() => { });
      } else {
        if (this.$route.params.baseInfo == undefined) {
          this.$openWarning("数据获取失败，请重新创建");
        } else {
          //   console.log('this.$route.params :', this.$route.params);
          this.loading = true;
          this.formList = this.$route.params.baseInfo;
          this.baseCurrencyRate = this.formList.baseCurrencyRate;
          this.formList.currencyCode =
          this.formList.currencyCodeOrigin || this.formList.currencyCode;
          this.formList.empName = this.formList.bizPersonName;
          this.formList.empCode = this.formList.bizPersonCode;
          this.currencyCodeOrigin = this.formList.currencyCodeOrigin;
          const tempList = this.$route.params.invoiceList;
          let type = localStorage.getItem("type");
          if (this.formList.isBilled == 1) {
            if (type == 1) {
              this.formList.invoiceType = 10700010;
            }
            this.blueInvoiceTypeList[0].isDisabled = true;
          } else if (this.formList.isBilled == 0) {
            if (type == 1) {
              this.formList.invoiceType = 10700010;
            } else if (type == 0) {
              this.formList.invoiceType = 10700005;
            }
            this.blueInvoiceTypeList[1].isDisabled = true;
            this.blueInvoiceTypeList[2].isDisabled = true;
          }
          let str = "";
          const searchForm = {};
          searchForm.companyCode = this.formList.companyCode || "";
          searchForm.orgCode = this.formList.orgCode || "";
          searchForm.supplierCode = this.formList.supplierCode || "";
          if (this.type == 0) {
            tempList.forEach(el => {
              str += el.wvNo + ",";
            });
            str = str.substring(0, str.length - 1);
            searchForm.noStr = str;
              if(this.formList.invoiceType=="10700010"){
                parseInt(searchForm.isRedInvoice=1);
              }else{
                  parseInt(searchForm.isRedInvoice=0);
              }
            odWvItemsList2PoInvoice(searchForm)
              .then(res => {
                let sum = 0;
                const temp = res.data;
                if (this.formList.isBilled == 0) {
                  for (let i = 0; i < temp.length; i++) {
                    const el = temp[i];
                    if (el.unInvoiceQty == 0) {
                      temp.splice(i, 1);
                      i--;
                    }
                  }
                }
                this.base.tableData = temp;
                this.base.tableData.map((item, index) => {
                  item.invoiceRowno = (index + 1) * 10;
                  if (!item.externalPoNo) {
                    item.externalPoNo = item.extPoNo;
                  }
                  item.uninvoiceQty = item.unInvoiceQty;
                  item.invoiceQty = item.uninvoiceQty;
                  item.secUnwvQty = item.secQty;
                  if (item.invoiceQty != null) {
                    //纪录原本得金额
                    item.originAmtVatNote=item.originAmtVat;
                    item.originPriceNote=item.originPrice;
                    this.originPriceCh(item, index);
                  }
                  sum += item.originAmtVat;
                });
                if (!this.formList.payAmtTotalRmb) {
                  this.formList.payAmtTotalRmb =
                    Math.round(sum * this.formList.rmbCurrencyRate * 100) / 100;
                }
                this.handleTotalCalc();//人民币金额
                this.loading = false;
              })
              .catch(err => { });
          } else {
            tempList.forEach(el => {
              str += el.unwvNo + ",";
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
                let sum = 0;
                const temp = res.data;
                if (this.formList.isBilled == 0) {
                  for (let i = 0; i < temp.length; i++) {
                    const el = temp[i];
                    if (el.unInvoiceQty == 0) {
                      temp.splice(i, 1);
                      i--;
                    }
                  }
                }
                this.base.tableData = temp;
                this.base.tableData.map((item, index) => {
                  item.invoiceRowno = (index + 1) * 10;
                  if (!item.externalPoNo) {
                    item.externalPoNo = item.extPoNo;
                  }
                  item.secUnwvQty = item.secQty;
                  item.uninvoiceQty = item.unInvoiceQty;
                  item.invoiceQty = item.uninvoiceQty;
                  if (item.invoiceQty != null) {
                    //纪录原本得金额
                    item.originAmtVatNote=item.originAmtVat;
                    item.originPriceNote=item.originPrice;
                    this.originPriceCh(item, index);
                  }
                  sum += item.originAmtVat;
                });
                if (!this.formList.payAmtTotalRmb) {
                  this.formList.payAmtTotalRmb =
                    Math.round(sum * this.formList.rmbCurrencyRate * 100) / 100;
                }
                this.handleTotalCalc();//计算人民币金额
                this.loading = false;
              })
              .catch(err => { });
          }
        }
      }
    },
    //控制第二数量
    handleSecUnwvQtyChange (value,index,row) {
      value = value
        .replace(/[^\d^\.]+/g, "")
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", ".")
        .replace(/^0[^.]/, "")
        .replace(/^\./, "");
      value = value.replace(/\.\d{4}/, "." + Math.floor((value % 1) * 1000));
      this.base.tableData[this.selectedIndex].secUnwvQty = value;
      this.$set(this.base.tableData, index, row);
    },
    // 控制含税单价
    handleOriginPriceChange (scope) {
      //let value = scope.row.originPrice;
      // value = value
      //   .replace(/[^\d^\.]+/g, "")
      //   .replace(".", "$#$")
      //   .replace(/\./g, "")
      //   .replace("$#$", ".")
      //   .replace(/^0[^.]/, "")
      //   .replace(/^\./, "");
      // value = value.replace(/\.\d{7}/, "." + Math.floor((value % 1) * 1000000));
       if (this.base.tableData.length) {
          this.base.tableData[scope.$index].originPrice = this.$filterPriceNum(
            scope.row.originPrice,
            6
          );
        }
      //scope.row.originPrice = value;
      if (!this.isDisabled) {
        this.originPriceCh(scope.row, scope.$index);
      }
      this.handleTotalCalc();
    },
    // 控制含税金额
    handleOriginAmtVatChange (scope) {
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
      if (
        (this.formList.isBilled == 1 && scope.row.invoiceQty != 0) ||
        (this.formList.invoiceType == 10700015 ||
          this.formList.invoiceType == 10700020)
      ) {
        if (scope.row.invoiceQty != 0) {
          this.originAmtCh(temp[scope.$index], scope.$index);
        }
        this.originAmtChNoPrice(temp[scope.$index], scope.$index);
        temp[scope.$index].baseAmt = this.$bbhsje(
          temp[scope.$index].originAmtVat,
          this.baseCurrencyRate
        );
      } else {
        this.originAmtCh(temp[scope.$index], scope.$index);
        // this.originPriceCh(scope.row, scope.$index);
      }
      this.$nextTick(() => {
        this.handleTotalCalc();
        this.base.tableData = temp;
      });
    },
    //控制增值税率
    handleTaxRateChange (scope) {
      let value = scope.row.taxRate;
      value = value.replace(/[^\d]+/g, "");
      scope.row.taxRate = value;
      if (
        (this.formList.isBilled == 1 && scope.row.invoiceQty != 0) ||
        (this.formList.invoiceType == 10700015 ||
          this.formList.invoiceType == 10700020)
      ) {
        this.taxRateCh(scope.row, scope.$index);
      } else {
        this.taxRateCh(scope.row, scope.$index);
      }
      this.handleTotalCalc();
    },
    //控制业务币增值税额
    handleOriginTaxAmt (scope) {
      let value = scope.row.originTaxAmt;
      value = value
        .replace(/[^\d^\.]+/g, "")
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", ".")
        .replace(/^0[^.]/, "")
        .replace(/^\./, "");
      value = value.replace(/\.\d{3}/, "." + Math.floor((value % 1) * 100));
      scope.row.originTaxAmt = value;
      if (
        (this.formList.isBilled == 1 && scope.row.invoiceQty != 0) ||
        (this.formList.invoiceType == 10700015 ||
          this.formList.invoiceType == 10700020)
      ) {
        this.taxAmtCh(scope.row, scope.$index);
      } else {
        this.taxAmtCh(scope.row, scope.$index);
      }
      this.handleTotalCalc();
    },
    //控制未开票数量
    handleInvoiceQtyChange (scope) {
      let value = scope.row.invoiceQty;
      // value = value
      //   .replace(/[^\d^\.]+/g, "")
      //   .replace(".", "$#$")
      //   .replace(/\./g, "")
      //   .replace("$#$", ".")
      //   .replace(/^0[^.]/, "")
      //   .replace(/^\./, "");
      // value = value.replace(/\.\d{5}/, "." + Math.floor((value % 1) * 10000));
      // scope.row.invoiceQty = value;
      if (this.base.tableData.length) {
          this.base.tableData[scope.$index].invoiceQty = this.$filterPriceNum(
            scope.row.invoiceQty,
            4
          );
        }
      if (value > scope.row.unInvoiceQty) {
        this.$openWarning("开票数量不可大于未开票数量");
        scope.row.invoiceQty = 0;
      } else if (value == "") {
        // row.invoiceQty = '0';
      }
      this.originPriceCh(scope.row, scope.$index);
      //this.originAmtCh(scope.row, scope.$index);
      scope.row.originAmt =
        Math.round(
          (scope.row.originAmtVat / (1 + scope.row.taxRate / 100)) * 100
        ) / 100;
      scope.row.baseAmt = this.$bbhsje(
        scope.row.originAmtVat,
        this.baseCurrencyRate
      );
      //本币不含税金额 baseNoAmt
      // scope.row.baseNoAmt = Math.round(scope.row.originAmt * this.baseCurrencyRate * 100) / 100;
      // scope.row.baseNoAmt = this.$bbnhsje(scope.row.originAmt, this.baseCurrencyRate);
      //本币增值税额 baseTaxAmt
      scope.row.baseTaxAmt = this.$bbzzse(
        scope.row.originTaxAmt,
        this.baseCurrencyRate
      );
      //   scope.row.baseNoAmt = Math.round(scope.row.originAmt * this.baseCurrencyRate * 10000) / 10000;
      scope.row.baseNoAmt =
        Math.round((scope.row.baseAmt - scope.row.baseTaxAmt) * 100) / 100;
      // scope.row.originAmtVat = scope.row.invoiceQty * scope.row.originPrice;
      this.handleTotalCalc();
    },
    handleTotalCalc () {
      let sum = 0;
      this.base.tableData.map((item, index) => {
        if (parseFloat(item.invoiceQty) >= 0) {
          sum += parseFloat(item.originAmtVat);
        }
      });
      let rmbSum= sum*parseFloat(this.formList.rmbCurrencyRate);//保留两位小数
      this.formList.payAmtTotalRmb=rmbSum.toFixed(2);
      // this.$forceUpdate()
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
        Math.round(value * this.invoiceAmt * 100) / 100;
      this.$forceUpdate();
    },
    handleCurrencyChnage (value) {
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
      this.baseCurrencyRate = value;
      let temp = JSON.parse(JSON.stringify(this.base.tableData));
      temp.map((item, index) => {
        //本币含税单价  basePrice
        item.basePrice = this.$bbhsdj(item.originPrice, this.baseCurrencyRate);
        //本币含税金额 baseAmt
        item.baseAmt = this.$bbhsje(item.originAmtVat, this.baseCurrencyRate);
        //本币不含税金额 baseNoAmt
        // item.baseNoAmt = Math.round(item.originAmt * this.baseCurrencyRate * 100) / 100;
        // item.baseNoAmt = this.$bbnhsje(item.originAmt, this.baseCurrencyRate);
        //本币增值税额 baseTaxAmt
        item.baseTaxAmt = this.$bbzzse(
          item.originTaxAmt,
          this.baseCurrencyRate
        );
        item.baseNoAmt =
          Math.round((item.baseAmt - item.baseTaxAmt) * 100) / 100;
      });
      this.$nextTick(() => {
        this.base.tableData = temp;
      });
    },
    originPriceCh (row, index) {
      //   let value = row.originPrice
      //   if (typeof value == Number) {
      //     value = value.replace(/[^\d^\.]+/g, '').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.').replace(/^0[^.]/, '').replace(/^\./, '')
      //     value = value.replace(/\.\d{7}/, '.' + Math.floor((value % 1) * 1000000))
      //   }
      //   row.originPrice = value;
      //采购含税金额
      // row.originAmtVat =
      // Math.round(row.originPrice * row.invoiceQty * 100) / 100;
      // if (
      //   (this.formList.isBilled == 1 && row.invoiceQty != 0) ||
      //   (this.formList.invoiceType == 10700015 ||
      //     this.formList.invoiceType == 10700020)
      // ) {
      //   if (row.invoiceQty != 0) {
      //     if(row.invoiceQty==row.actReceive && row.originPriceNote==row.originPrice){
      //       row.originAmtVat =row.originAmtVatNote;
      //     }else{
      //       row.originAmtVat = this.$orginAmt(row.originPrice, row.invoiceQty);
      //     }
      //   }
      // } else {
      //       row.originAmtVat = this.$orginAmt(row.originPrice, row.invoiceQty);
          
      // }
        if (row.invoiceQty != 0) {
          if(row.invoiceQty==row.actReceive && row.originPriceNote==row.originPrice){
            row.originAmtVat =row.originAmtVatNote;
          }else{
            row.originAmtVat = this.$orginAmt(row.originPrice, row.invoiceQty);
          }
        }
      //采购不含税金额
      row.originAmt = this.$unorginAmt(row.originAmtVat, row.taxRate);
      //增值税额
      row.originTaxAmt = this.$taxAmt(row.originAmtVat, row.originAmt);

      //本币计算 对应业务币*汇率
      //本币含税单价  basePrice
      row.basePrice = this.$bbhsdj(row.originPrice, this.baseCurrencyRate);
      //本币含税金额 baseAmt
      row.baseAmt = this.$bbhsje(row.originAmtVat, this.baseCurrencyRate);
      //本币不含税金额 baseNoAmt
      row.baseTaxAmt = this.$bbzzse(row.originTaxAmt, this.baseCurrencyRate);
      row.baseNoAmt = Math.round((row.baseAmt - row.baseTaxAmt) * 100) / 100;
      //   row.baseNoAmt = this.$bbnhsje(row.originAmt, this.baseCurrencyRate);
      //本币增值税额 baseTaxAmt
      //   this.$set(this.base.tableData, index, row);
    },
    originAmtCh (row, index) {
      //采购含税单价
      //   if (this.formList.isBilled == 1) {
      if (![10700015, 10700020, undefined].includes(this.formList.invoiceType)) {
        row.originPrice = this.$orginPrice(row.originAmtVat, row.invoiceQty);
        //本币含税单价  basePrice
        row.basePrice = this.$bbhsdj(row.originPrice, this.baseCurrencyRate);
      }
      //   } else {
      //     row.originPrice = this.$orginPrice(row.originAmtVat, row.invoiceQty);
      //   }
      //采购不含税金额
      row.originAmt = this.$unorginAmt(row.originAmtVat, row.taxRate);
      //增值税额
      row.originTaxAmt = this.$taxAmt(row.originAmtVat, row.originAmt);

      //本币计算 对应业务币*汇率

      //本币不含税金额 baseNoAmt
      //   row.baseNoAmt = this.$bbnhsje(row.originAmt, this.baseCurrencyRate);
      //本币增值税额 baseTaxAmt
      row.baseAmt = this.$bbhsje(row.originAmtVat, this.baseCurrencyRate);
      row.baseTaxAmt = this.$bbzzse(row.originTaxAmt, this.baseCurrencyRate);
      row.baseNoAmt = Math.round((row.baseAmt - row.baseTaxAmt) * 100) / 100;
      //   this.$set(this.base.tableData, index, row);
    },
    originAmtChNoPrice (row, index) {
      //采购不含税金额
      row.originAmt = this.$unorginAmt(row.originAmtVat, row.taxRate);
      row.originTaxAmt = this.$taxAmt(row.originAmtVat, row.originAmt);

      //本币计算 对应业务币*汇率
      //本币不含税金额 baseNoAmt
      row.baseTaxAmt = this.$bbzzse(row.originTaxAmt, this.baseCurrencyRate);
      row.baseNoAmt = Math.round((row.baseAmt - row.baseTaxAmt) * 100) / 100;
      //   row.baseNoAmt = this.$bbnhsje(row.originAmt, this.baseCurrencyRate);
      //本币增值税额 baseTaxAmt
      //   this.$set(this.base.tableData, index, row);
    },
    taxRateCh (row, index) {
      // let value = row.taxRate
      // value = value.replace(/[^\d^\.]+/g, '').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.').replace(/^0[^.]/, '').replace(/^\./, '')
      // value = value.replace(/\.\d{2}/, '.' + Math.floor((value % 1) * 10))
      // this.base.tableData[this.selectedIndex].taxRate = value;
      //采购不含税金额
      row.originAmt = this.$unorginAmt(row.originAmtVat, row.taxRate);
      //增值税额
      row.originTaxAmt = this.$taxAmt(row.originAmtVat, row.originAmt);
      //本币计算 对应业务币*汇率
      //本币不含税金额 baseNoAmt
      //   row.baseNoAmt = this.$bbnhsje(row.originAmt, this.baseCurrencyRate);
      //本币增值税额 baseTaxAmt
      row.baseTaxAmt = this.$bbzzse(row.originTaxAmt, this.baseCurrencyRate);
      row.baseNoAmt = Math.round((row.baseAmt - row.baseTaxAmt) * 100) / 100;
      //   this.$set(this.base.tableData, index, row);
    },
    taxAmtCh (row, index) {
      //采购不含税金额  采购不含税金额=采购含税金额-税额
      row.originAmt = this.$unorginAmtCh(row.originAmtVat, row.originTaxAmt);
      //本币计算 对应业务币*汇率
      //本币不含税金额 baseNoAmt
      //   row.baseNoAmt = this.$bbnhsje(row.originAmt, this.baseCurrencyRate);
      //本币含税单价  basePrice
      row.basePrice = this.$bbhsdj(row.originPrice, this.baseCurrencyRate);
      //本币含税金额 baseAmt
      row.baseAmt = this.$bbhsje(row.originAmtVat, this.baseCurrencyRate);
      //本币增值税额 baseTaxAmt
      row.baseTaxAmt = this.$bbzzse(row.originTaxAmt, this.baseCurrencyRate);
      row.baseNoAmt = Math.round((row.baseAmt - row.baseTaxAmt) * 100) / 100;
      //   this.$set(this.base.tableData, index, row);
    },
    getSummaries (param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
        } else if (
          index === 11 ||
          index === 12 ||
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
        } else {
          sums[index] = "";
        }
      });
      return sums;
    },
    handleTypeChange (status) {
      switch (status) {
        case 10700005:
        case 10700010:
          this.isDisabled = false;
          break;
        case 10700015:
        case 10700020:
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
    subFun () {
      this.errorKey = [];
      let formKey = ['companyName', 'orgName', 'empName', 'supplierName', 'invoiceType', 'extInvoiceCode', 'invoiceDate', 'rmbCurrencyRate', 'attachmentCount'];
      formKey.forEach(item => {
        if(!this.formList[item]) {
          this.errorKey.push(item);
        }
      })
      if(!this.baseCurrencyRate) {
        this.errorKey.push('baseCurrencyRate');
      }
      if(this.errorKey.length > 0) {
        this.$openWarning('请将必填项补充完整！')
        return false;
      }
        let tempList = JSON.parse(JSON.stringify(this.base.tableData));
        for (let i = 0; i < tempList.length; i++) {
          const el = tempList[i];
          if (el.invoiceQty == null) {
            tempList.splice(i, 1);
            i--;
          }
        }
        if (this.invoiceCode) {
          //修改
          updatePurchaseInvoice({
            ...this.formList,
            bizPersonName: this.formList.empName,
            bizPersonCode: this.formList.empCode,
            baseCurrencyRate: this.baseCurrencyRate,
            invoiceCode: this.invoiceCode,
            invoiceQty: this.invoiceQty,
            invoiceAmt: this.invoiceAmt,
            odPoInvoiceItemsList: tempList,
            accountName: this.accountData.accountName,
            accountCode: this.accountData.accountCode,
          })
            .then(res => {
              this.$openSuccess(res.data);
              this.$router.push({ path: "/index/Purchase/invoice" });
            })
            .catch(() => { });
        } else {
          //新增
          createdPurchaseInvoice({
            ...this.formList,
            bizPersonName: this.formList.empName,
            bizPersonCode: this.formList.empCode,
            baseCurrencyRate: this.baseCurrencyRate,
            invoiceCode: this.invoiceCode,
            invoiceQty: this.invoiceQty,
            invoiceAmt: this.invoiceAmt,
            odPoInvoiceItemsList: tempList,
            accountName: this.accountData.accountName,
            accountCode: this.accountData.accountCode,
          })
            .then(res => {
              this.$openSuccess(res.data);
              //保存过来页面数据
              this.$router.push({ path: "/index/Purchase/invoice" });
            })
            .catch(() => { });
        }
    },
    //入库单类型
    warehousingAddRowCancle () {
      this.warehousingAddRowShow = false;
    },
    // 获取表格选中时的数据
    selectRow (e) {
      if (e.length === 0) {
        this.selectioned = null;
      }
    },
    //商品明细单行编辑
    tableDataBdlclick (e) {
      this.base.tableData.forEach(item => {
        item.edit = false;
      });
      this.selectedIndex = this.base.tableData.indexOf(e);
      let index = this.selectedIndex;
      this.base.tableData[index].edit = true;
      this.base.tableData[index].change = 1;
      this.$set(this.base.tableData, this.base.tableData.indexOf(e), e);
    },
    Bdlclick (e) {
      this.$refs.table.toggleRowSelection(e, true);
      this.selectioned = [e];
      if (this.selectioned.length == 1) {
        this.selectedIndex = this.base.tableData.indexOf(e);
      }
    },
    //选中行
    dialogCheckbase (selection, row) {
      // this.$refs.table.clearSelection();
      this.selectioned = selection;
      if (this.selectioned.length == 1) {
        this.selectedIndex = this.base.tableData.indexOf(this.selectioned[0]);
      }
    },
    dialogCheckbaseAll (selection) { },
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
            let temp = res.data;
            let newArr=[];
            for (let index = 0; index < temp.length; index++) {
              if (temp[index].unInvoiceQty != 0) {
                // temp.splice(index, 1);
                // index--;
                let item = temp[index];
                let flag=true;
                this.base.tableData.map((i, k) => {
                  if (item.wvRowno == i.wvRowno && item.wvNo == i.wvNo) {
                    flag=false;
                  }
                });
                if(flag){
                  newArr.push(item);
                }
              }
              
            }
            if (newArr.length > 0) {
              //extPoNo
              this.base.tableData = this.base.tableData.concat(newArr);
            }
            this.base.tableData.map((item, index) => {
              item.invoiceRowno = (index + 1) * 10;
              if (!item.externalPoNo) {
                item.externalPoNo = item.extPoNo;
              }
              if (!item.secUnwvQty) {
                item.secUnwvQty = item.secQty;
              }
              item.uninvoiceQty = item.unInvoiceQty;
              if (!item.invoiceQty) {
                item.invoiceQty = item.unInvoiceQty;
              }
              item.originAmtVatNote=item.originAmtVat;
              item.originPriceNote=item.originPrice;
              this.originPriceCh(item, index);
              
            });
            this.handleTotalCalc();//计算人民币金额
          })
          .catch(err => { });
      } else {
        tempList.forEach(el => {
          str += el.unwvNo + ",";
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
            let temp = res.data;
            let newArr=[];
            for (let index = 0; index < temp.length; index++) {
              const item = temp[index];
              if (!item.externalPoNo) {
                item.externalPoNo = item.extPoNo;
              }
              let flag=true;
              this.base.tableData.map((i, k) => {
                if (item.rowno == i.rowno && item.unwvNo == i.unwvNo) {
                  flag=false;
                  // temp.splice(index, 1);
                  // index--;
                }
              });
              if(flag){
                newArr.push(item);
              }
            }
            this.base.tableData = this.base.tableData.concat(newArr);
            this.base.tableData.map((item, index) => {
              item.invoiceRowno = (index + 1) * 10;
              //纪录原本得金额
                    item.originAmtVatNote=item.originAmtVat;
                    item.originPriceNote=item.originPrice;
               this.originPriceCh(item, index);
            });
            this.handleTotalCalc();//计算人民币金额
          })
          .catch(err => { });
      }
       this.formList.currencyCode=e[0].currencyCodeOrigin;//获取弹框里的币别
       //this.tableData.from(new Set(arr));
    },
    //税金科目打开
    accountTips () {
      this.subjectShow = true;
    },
    //税金科目确认
    subjectSure (e) {
      if (e) {
        this.accountData = e
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
      this.formList.empCode = e.empCode;
    },
    //增加行
    addRow () {
       if(this.formList.invoiceType=="10700010"){
           localStorage.setItem("type",1);
        }else{
           localStorage.setItem("type",0);
        }
      this.invoiceShow = true;
    },
    //删除行
    deleRow () {
      if (this.selectioned.length == 1) {
        this.$confirm("确定删除吗？", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          if (this.selectioned[0].invoiceItemId) {
            deletePoInvoiceItems({
              invoiceItemId: this.selectioned[0].invoiceItemId,
              version: this.selectioned[0].version,
              invoiceVersion: this.formList.version,
              invoiceCode: this.selectioned[0].invoiceCode
            })
              .then(res => {
                this.$openSuccess(res.data);
                this.base.tableData.splice(this.selectedIndex, 1);
                this.base.tableData.map((item, index) => {
                  item.invoiceRowno = (index + 1) * 10;
                });
                this.selectioned = [];
              })
              .catch(() => { });
          } else {
            this.base.tableData.splice(this.selectedIndex, 1);
            this.base.tableData.map((item, index) => {
              item.invoiceRowno = (index + 1) * 10;
            });
            this.selectioned = [];
          }
        });
      } else {
        this.$openWarning("请逐条删除");
      }
      // 删除多行
      // if (this.selectioned.length == 0) {
      //   this.$confirm('确定删除吗？', {
      //     confirmButtonText: '确认',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     let odUnwvItems = [];//有id
      //     let ItemArr = [];//无id
      //     this.selectioned.map((item, index) => {
      //       if (item.invoiceItemId) {
      //         let obj = {
      //           invoiceItemId: item.invoiceId,
      //           version: item.invoiceId,
      //         }
      //         odUnwvItems.push(obj)
      //       } else {
      //         let index = this.base.tableData.indexOf(item)
      //         this.base.tableData.splice(index, 1)
      //       }
      //     })
      //     deletePoInvoiceItems(odUnwvItems)
      //       .then(res => {
      //         this.$openSuccess(res.data);
      //         this.base.tableData.splice(this.index, 1);
      //       })
      //       .catch(() => { });
      //   });
      // } else {
      //   this.$openWarning('请选择数据');
      // }
    },
    //取消
    goBack () {
      this.$router.push({
        //核心语句
        path: "/index/Purchase/invoice" //跳转的路径
      });
    },
    //表单切换
    handleClick (e) { }
    
  },
  mounted () {
    this.initData();
  },
  computed: {
  },
  watch: {
    //监听表格数据的变化
    "base.tableData":{
      deep:true,
      handler(){
        let sumQTy=0;
        let sumAmt=0;
        this.base.tableData.forEach(el => {
            if (el.originAmtVat) {
              sumAmt += 1 * el.originAmtVat;
            }
            if (el.invoiceQty) {
              sumQTy+= 1 * el.invoiceQty;
              this.invoiceQty
            }
        });
        this.invoiceQty=this.$toFixed(sumQTy,4);
        this.invoiceAmt=this.$toFixed(sumAmt,2);
      }
    }  
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
/* .isrequired::before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
} */

.fixedHeight {
  height: 30px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
// .invoiceDetails{
//   .addBut{
//         height: 26px;
//         padding: 0;
//         width: 60px;
//         font-size: 12px;
//         font-weight: 400;
//         text-align: center;
//         background: #fff;
//         border: 1px solid #31478F;
//         color: #31478F;
//         margin-left: 10px;
//         margin-bottom: 8px;
//     }
//    .el-dropdown{font-size: 12px;margin-right: 10px}
//      .el-dropdown-link {
//         cursor: pointer;
//         color: #409EFF;
//     }
//     .el-icon-arrow-down {
//         font-size: 12px;
//     }
//     .index-div3{
//         width: 100%;
//         overflow: hidden;
//         background: #ffffff;
//         text-align: left;
//         margin-bottom: 10px;
//         position: relative;
//         min-height: 14px;
//         padding: 10px;
//         .el-col-5{
//             width: 24%; position: relative; margin-top: 10px;
//         }
//         .el-col-24{margin-top: 10px;margin-left: 10px;}
//        .el-col .el-inputs, .input-div .el-col .el-input__inner{
//             font-size: 12px !important;
//         }
//         .el-col .el-select .el-input .el-input__inner{
//             font-size: 12px !important;
//         }
//         .el-input,.el-select{
//             width:65%;
//             font-size: 12px;
//             .el-input__inner{
//                 font-size: 12px !important;
//                 width: 100%;
//             }
//         }
//         .el-textarea{
//             width: 90.3%;
//             font-family: "MicrosoftYaHei";
//             font-size: 12px;
//         }
//           //时间选择器
//         .el-input2{
//             height: 32px;
//             width: 65%;
//             border-color: #97999e !important;
//         }
//         label{
//             display: inline-block;
//             width: 34%;
//             text-align: right;
//             font-size: 12px;

//         }
//         .el-col{
//             .comicon {
//                 width: 65%;
//                 height: 20px;
//                 position: absolute;
//                 right: 18px;
//                 top: 7px;
//                 cursor: pointer;
//                 text-align: right;
//                 padding-right: 10px;
//             }
//             .el-col:last-child{
//                 margin-right: 0;
//             }
//         }
//         .el-col-btn{
//             margin: 10px;
//             width:100%;
//             position: relative;
//             margin-left:0px !important;
//             .button-div{
//                 margin: 0px auto;
//                 text-align: center;
//             }
//         }
//     }
// }
</style>
