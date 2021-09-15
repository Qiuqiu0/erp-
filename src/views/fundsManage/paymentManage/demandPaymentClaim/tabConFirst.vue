<template>
<div class="input-div demandPaymentClaim" style="border-bottom:0">
  <el-form :disabled="createdtype==3">
    <!-- <div class="input-div" style="border-bottom:0"> -->
      <!--公司选择-->
      <compony-select
        class="el-col el-col-5 el-col-required"
        :companyName.sync="companyName"
        name="companyId"
        disabled
        :class="errorKey.includes('companyName') ? 'inputRed' : ''"
        required
        @change="companyNameChangeHandler"
      ></compony-select>
      <!--部门选择-->
      <department-select
        class="el-col el-col-5 el-col-required"
        :branchName.sync="branchName"
        required
        disabled
         :class="errorKey.includes('branchName') ? 'inputRed' : ''"
        :companyName="companyName"
        @change="branchNameChangeHandler"
      ></department-select>
      <el-col :span="5" class="el-col el-col-required">
        <label required>付款申请日期</label>
        <accountingDate-select
          :companyId="paymentDetail.companyId"
          :accountingDate.sync="paymentDetail.applyPayTime"
          @change="applyPayTimeChangehandle"
          :class="errorKey.includes('applyPayTime') ? 'inputRed' : ''"
        ></accountingDate-select>
      </el-col>
      <el-col :span="5" class="el-col el-col-required">
        <label required>年度</label>
        <el-date-picker
          v-model="paymentDetail.accountingYear"
          class="el-inputs"
          align="right"
          size="small"
          type="year"
          value-format="yyyy"
          format="yyyy"
          disabled
          placeholder="选择年"
          :class="errorKey.includes('accountingYear') ? 'inputRed' : ''"
        ></el-date-picker>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>付款申请单号</label>
        <el-input
          disabled
          name="payApplyCode"
          class="el-inputs"
          v-model="paymentDetail.payApplyCode"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <!--项目选择-->
      <project-select
        class="el-col el-col-5"
        :project.sync="project"
        @change="projectChangeHandler"
      ></project-select>
      <!--付款类别选择-->
      <paymentType-select
      class="el-col-required"
        required
        :filterType="filterType"
        :paymentType.sync="paymentDetail.paymentType"
        @change="paymentTypeChangeHandler"
        :class="errorKey.includes('paymentType') ? 'inputRed' : ''"
      ></paymentType-select>
      <!--收款单位选择-->
      <supplier-select 
        :labelName="'收款单位'"
        class="el-col el-col-5 el-col-required"
        required
        v-if="payeeNameType==0 && createdtype!=3"
        :supplier.sync="supplier"
         :class="errorKey.includes('supplier') ? 'inputRed' : ''"
        @change="supplierHandler">
      </supplier-select>
      <customer-select 
        :labelName="'收款单位'"
        class="el-col el-col-5 el-col-required"
        required
        v-else-if="payeeNameType==3 && createdtype!=3" 
        :customer.sync="customer"
         :class="errorKey.includes('customer') ? 'inputRed' : ''"
        @change="customerHandler">
      </customer-select>
      <el-col v-else :span="5" class="el-col">
        <label>收款单位</label>
        <el-input
          v-model="paymentDetail.payeeName"
          class="el-inputs"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <!--付款方式选择-->
      <pay-type-select class="el-col-required"  :class="errorKey.includes('payType') ? 'inputRed' : ''"
       required :payType.sync="paymentDetail.payType"></pay-type-select>
      <!-- 款项内容选择 -->
      <!-- <cash-content-select required :cashContent.sync="paymentDetail.moneyContent"></cash-content-select> -->
      <payeeBank-select
        :labelName="'收款银行'"
        class="el-col el-col-5"
        :payeeBank.sync="payeeBank"
        :payeeId="paymentDetail.payeeId"
         :class="errorKey.includes('payeeBank') ? 'inputRed' : ''"
        :receiverType="paymentDetail.receiverType"
        @change="payeeBankChangeHandler"
      ></payeeBank-select>
      <el-col :span="5" class="el-col">
        <label>银行账号</label>
        <el-input
          v-model="paymentDetail.payeeBankAccount"
          :class="errorKey.includes('payeeBankAccount') ? 'inputRed' : ''"
          class="el-inputs"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>SWIFT</label>
        <el-input
          v-model="paymentDetail.swift"
          readonly
          class="el-inputs"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="5" style="width:48%;">
        <label style="width:13% !important;">收款方地址</label>
        <el-input
          style="width:76.8%!important; height:32px;"
          v-model="paymentDetail.payeeAddress"
          :autosize="{ minRows: 1, maxRows: 1 }"
          class="el-inputs"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col" style="width:48%">
        <label style="width:13% !important;">收款银行地址</label>
        <el-input
          style="width:77%!important;height:32px;"
          v-model="paymentDetail.payeeBankAddress"
          :autosize="{ minRows: 1, maxRows: 1 }"
          class="el-inputs"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col-required">
        <label required>付款类型</label>
        <el-select v-model="paymentDetail.isPrePay"
        :class="errorKey.includes('isPrePay') ? 'inputRed' : ''"
         placeholder="请选择" size="small">
          <el-option label="预付" :value="1"></el-option>
          <el-option label="非预付" :value="0"></el-option>
        </el-select>
      </el-col>
      <el-col :span="5">
        <label>是否外汇</label>
        <el-select v-model="paymentDetail.isForeignCurrency" placeholder="请选择" size="small">
          <el-option label="是" :value="1"></el-option>
          <el-option label="否" :value="0"></el-option>
        </el-select>
      </el-col>
    <!-- </div> -->
  </el-form>
   <el-form :disabled="createdtype!=3">
    <!-- <div class="input-div" style="border-bottom:0"> -->
      <apply-invoice-type-select
       class="el-col el-col-5  el-col-required"
        required
        :class="errorKey.includes('applyInvoiceType') ? 'inputRed' : ''"
        :applyInvoiceType.sync="paymentDetail.applyInvoiceType"
        :labelName="'申请单据类型'"
        @change="applyInvoiceTypeChangeHandle"
      ></apply-invoice-type-select>
      <!-- </div> -->
   </el-form>
  <el-form :disabled="createdtype==3">
      <!-- <div class="input-div" style="border-bottom:0"> -->
      <el-col :span="5" class="el-col el-col-required">
        <label required>申请金额（业务币）</label>
        <el-input
          v-model="paymentDetail.applyAmt"
           :class="errorKey.includes('applyAmt') ? 'inputRed' : ''"
          class="el-inputs"
          size="small"
          placeholder="请输入"
          @input="getLeftCredit()"
        ></el-input>
      </el-col>
      <!--币别选择-->
      <coin-select
        class="el-col el-col-5  el-col-required"
        :coin.sync="coin"
        required
        :labelName="'币别'"
         :class="errorKey.includes('coin') ? 'inputRed' : ''"
        @change="coinChangeHandler"
      ></coin-select>
      <el-col :span="5" class="el-col  el-col-required">
        <label required>汇率(本位币)</label>
        <el-input
          v-input-filter:num6
          v-model="paymentDetail.baseCurrencyRate"
            :class="errorKey.includes('baseCurrencyRate') ? 'inputRed' : ''"
          type="number"
          class="el-inputs"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col  el-col-required">
        <label required>汇率(人民币)</label>
        <el-input
          v-input-filter:num6
          v-model="paymentDetail.rmbCurrencyRate"
          :class="errorKey.includes('rmbCurrencyRate') ? 'inputRed' : ''"
          type="number"
          class="el-inputs"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col  el-col-required">
        <label required>申请付款金额(本位币)</label>
        <el-input  v-model="applyBaseAmt" disabled class="el-inputs"
         :class="errorKey.includes('applyBaseAmt') ? 'inputRed' : ''"
         size="small" placeholder="请输入"></el-input>
      </el-col>
      <el-col :span="5" class="el-col  el-col-required">
        <label required>申请付款金额(人民币)</label>
        <el-input v-model="applyAmtRmb" class="el-inputs" 
                 :class="errorKey.includes('applyAmtRmb') ? 'inputRed' : ''"
        disabled size="small"  placeholder="请输入"></el-input>
      </el-col>
      <!-- 业务员选择 -->
      <staff-select
        class="el-col el-col-5"
        :branchName="branchName"
        :companyName="companyName"
        :labelName="'业务员'"
        :staff.sync="staff"
        @change="staffChangeHandler"
      ></staff-select>
      <el-col :span="5" class="el-col  el-col-required">
        <label required>期望付款日期</label>
        <el-date-picker
          class="el-inputs"
          size="small"
          v-model="paymentDetail.expPayTime"
          :pickerOptions="pickerOptions"
          :class="errorKey.includes('expPayTime') ? 'inputRed' : ''"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
      </el-col>
      <!--付款申请单状态选择-->
      <apply-status-select :disable="true"  :applyStatus.sync="paymentDetail.applyStatus"></apply-status-select>
      <!--手续承担方选择 feeChargeByeSelect-->
      <fee-charge-by-select :feeChargeBy.sync="paymentDetail.feeChargeBy" :labelName="'手续承担方'"></fee-charge-by-select>
      <el-col :span="5" class="el-col el-col-required">
        <label>税率</label>
        <el-input
          v-model="paymentDetail.taxRate"
          v-input-filter:int
          type="number"
          class="el-inputs"
          size="small"
          placeholder="请输入"
          :class="errorKey.includes('taxRate') ? 'inputRed' : ''"
        ></el-input>
      </el-col>
      <!-- 款项内容选择 -->
      <cash-content-select class="el-col el-col-5  el-col-required" 
       :class="errorKey.includes('moneyContent') ? 'inputRed' : ''"
      required :cashContent.sync="paymentDetail.moneyContent"></cash-content-select>
     <el-col :span="5" class="el-col">
        <label>可用授信额度</label>
        <el-input
          v-model="paymentDetail.leftCredit"
          class="el-inputs"
          size="small"
         disabled
        ></el-input>
      </el-col> 
       <div style="padding:10px 5px 10px 15px;height:68px;display:flex;width: 99.7%;">
        <label style="padding-right: 9px;width: 10.3%;text-align:right;line-height: 31px;">打款批注:</label>
        <el-input
         style="width:86.3%"
          v-model="paymentDetail.moneyRemark"
          class="el-inputs"
          size="small"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入内容"
        ></el-input>
      </div>
      <div style="padding:0px 5px 10px 15px;height:59px;display:flex;width: 99.7%;">
        <label style="padding-right: 9px;width: 10.3%;text-align:right;line-height: 31px;">备注:</label>
        <el-input
           style="width:86.3%"
          v-model="paymentDetail.remark"
          class="el-inputs"
          size="small"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入内容"
        ></el-input>
      </div>
      <!-- <el-col class="el-col el-col-btn"></el-col> -->
    <!-- </div> -->
  </el-form>
    <div class="input-div" style="border: 0;border-bottom: 1px solid #d2dae6;">
    <div  style="padding:0px 5px 10px 15px;height:68px;display:flex;width: 99.7%;">
      <label style="padding-right: 9px;width:10.3%;text-align:right;line-height: 31px;">付款关闭备注:</label>
      <el-input
         style="width:86.3%"
        :disabled="true"
        v-model="paymentDetail.payCloseRemark"
        class="el-inputs"
        size="small"
        type="textarea"
        placeholder="请输入内容"
      ></el-input>
    </div>
    </div>
  </div>
</template>
<script>
import componySelect from "@/views/fundsManage/conponents/componySelect";
import departmentSelect from "@/views/fundsManage/conponents/departmentSelect2";
import projectSelect from "@/views/fundsManage/conponents/projectSelect";
import staffSelect from "@/views/fundsManage/conponents/staffSelect";
import coinSelect from "@/views/fundsManage/conponents/coinSelect";
import payeeBankSelect from "@/views/fundsManage/conponents/payeeBankSelect";
import paymentTypeSelect from "@/views/fundsManage/conponents/paymentTypeSelect2";
import payTypeSelect from "@/views/fundsManage/conponents/payTypeSelect2";
import cashContentSelect from "@/views/fundsManage/conponents/cashContentSelect2";
import applyInvoiceTypeSelect from "@/views/fundsManage/conponents/applyInvoiceTypeSelect2";
import applyStatusSelect from "@/views/fundsManage/conponents/applyStatusSelect2";
import feeChargeBySelect from "@/views/fundsManage/conponents/feeChargeBySelect";
import accountingDateSelect from "@/views/fundsManage/conponents/accountingDateSelect";
import supplierSelect from "@/views/fundsManage/conponents/supplierSelect2";
import customerSelect from "@/views/fundsManage/conponents/customerSelect2"
import {
  getRmbParitiesByCurrencyCode,
  getBaseParitiesByCompanyId
} from "@/api/creditManage/creditDetail";
import {
  getPaymentApplyDetail,
  getSupplierReceiveBank,
  getCustomerReceiveBank,
  selectLeftAmt
} from "@/api/paymentManage/applyPaymentDetail";
import { mapMutations } from "vuex";
import bankSelectVue from "../../conponents/bankSelect.vue";
export default {
  name: "tabConFirst",
  components: {
    componySelect,
    departmentSelect,
    projectSelect,
    staffSelect,
    coinSelect,
    payeeBankSelect,
    paymentTypeSelect,
    payTypeSelect,
    cashContentSelect,
    applyInvoiceTypeSelect,
    applyStatusSelect,
    feeChargeBySelect,
    accountingDateSelect,
    supplierSelect,
    customerSelect
  },
  data() {
    return {
      companyName: {}, //公司
      branchName: {}, //部门
      project: {}, //项目
      payeeBank: {}, //收款银行
      coin: {}, //币别
      staff: {}, //业务员
      supplier:{},//供应商
      customer:{},//客户
      filterType: 0, // 收款类别过滤器 0 不过滤 1 过滤供应商  2过滤客户 ,3 客户退款,4,“供应商预付款”、“客户退款”、“保证金”
      paymentDetail: {
        id: "", //	付款申请id

        companyCode: "", //	公司编码   是否必填 是
        companyId: "", //	公司id
        companyName: "", //	公司名称
        orgId: "", //	组织id  //部门
        orgName: "", //	组织名称
        orgCode: "", //	组织编码

        accountingYear: "", //	会计年度
        applyPayTime: "", //	申请付款时间
        payApplyCode: "", //	付款申请单号
        projectId: "", //	所属项目 // 弹出框：选择项目信息
        paymentType: "", //	付款类型	下拉选择

        payeeId: "", //	收款单位id
        payeeCompanyCode: "", //	收款单位编码  //弹出框：选择供应商信息
        payeeName: "", //	收款单位名称
        payeeBankAddress: "", //	收款银行地址  选择供应商时，带出其收款银行的银行地址
        payeeBankCode: "", //	收款单位银行编码  选择供应商时，带出其收款银行的字段值
        payeeBankAccount: "", //	收款单位银行账号 选择供应商时，带出其收款银行的银行账号值
        payeeBankCountry: "", //	收款单位银行国家代码
        swift: "", //	选择供应商时，带出其SWITF值，即供应商银行信息中的银行编码字段

        payType: "", //	付款方式	下拉选择
        // moneyContent: "", //	款项内容	下拉选择

        isPrePay: "", //	是否预付	付款类型	y	默认值:0是否预付

        isForeignCurrency: "", //	是否外汇		y	默认值:0是否外汇

        payeeAddress: "", //	收款方地址	选择供应商时，带出其注册地址

        applyInvoiceType: "", //	申请单据类型	新增跳转到单据信息选择界面，选择单据确认后，将选择单据中的该字段带到此处

        applyAmt:0, //	申请金额 等于明细行中【申请金额（业务币）】之和
        currencyCode: "", //	币别
        baseCurrencyCode: "", //	本位币币种
        baseCurrencyRate: "", //	自动带系统汇率，或者手工输入 本位币
        applyBaseAmt: "", //	申请本位币金额 等于抬头表中【申请金额（业务币）*汇率（本位币）】
        rmbCurrencyRate: "", //	人民币汇率	decimal(20,6) [d(20,6)小数]			y		人民币汇率

        bizPerson: "", //	业务员

        applyStatus: "", //	付款申请状态
        feeChargeBy: "", //	手续承担方	int [e字典Int8]			y		(dictNo=3025)手续承担方
        remark: "", //	备注	varchar(512) [e描述_512]			y		备注
        moneyRemark:"",//打款批注
        extApplyCode: "", //	外部付款申请号

        payCompanyCode: "", //	付款单位编号
        payCompanyName: "", //	付款单位名称
        payBankAddress: "", //	付款单位开户银行
        payBankAccount: "", //	付款单位银行账号
        payBankCode: "", //	付款单位银行编码	varchar(64) [e描述_64]			y		付款单位银行编码

        sapPayApplyCode: "", //	sap付款申请编码	varchar(64) [e描述_64]			y		sap付款申请编码
        isSendSap: "", //	是否发送sap	int [b布尔型]			y	默认值:0是否发送sap
        supplierCreditAmt: "", //	供应商信用额度	decimal(20,6) [d(20,6)小数]			y		供应商信用额度
        usedCreditAmt: "", //	已使用付款额度	decimal(20,6) [d(20,6)小数]			y		已使用付款额度
        //leftCreditAmt: "", //	剩余付款额度	decimal(20,6) [d(20,6)小数]			y		剩余付款额度
        payedAmt: "", //	已付款金额	decimal(20,6) [d(20,6)小数]			y		已付款金额
        notPayedAmt: "", //	未付款金额	decimal(20,6) [d(20,6)小数]			y		未付款金额

        actPayTime: "", //	实际付款日期	datetime [e时间]			y		实际付款日期

        basePaiedAmt: "", //	已付款金额（本位币)	decimal(20,6) [d(20,6)小数]			y		已付款金额（本位币)
        creditNo: "", //	信用证号	varchar(64) [e描述_64]			y		信用证号
        needSubmitDetail: "", //	是否提交明细	int [b布尔型]			y	默认值:0是否提交明细
        payRatio: "", //	付款比例	decimal(20,6) [d(20,6)小数]			y		付款比例

        blNo: "", //	提单号	varchar(32) [e描述_32]			y		提单号

        isInactive: "", //	是否停用	int [b布尔型]			y	默认值:0是否停用，0表示激活状态，1表示停用，2表示作废
        createdBy: "", //	创建者	varchar(32) [e描述_32]			y		创建者
        createdName: "", //	创建者名称	varchar(64) [e描述_64]			y		创建者名称
        createdTime: "", //	创建时间	datetime [e时间]			y		创建时间
        updatedBy: "", //	更新者	varchar(32) [e描述_32]			y		更新者
        updatedName: "", //	更新者名称	varchar(64) [e描述_64]			y		更新者名称
        updatedTime: "", //	更新时间	datetime [e时间]			y		更新时间
        version: "", //	数据版本	int [e数字Int10]			y	默认值:0数据版本
        expPayTime: "", //期望付款日期
        taxRate:"",//税率
        moneyContent:"",//款项内容
        payCloseRemark:"",//付款关闭备注
        leftCredit:"",//剩余付款额度
        //认领状态（待认领、待审批、已审批、已驳回）
        claimStatus:11610005,
      //是否非业务付款（是/否，默认为否）
        isBusinessPay:1,
        payeeNameType:'',//付款单位类型
        businessPayType:"",//业务单据类型0：无合同预付 1：无合同客户退款）
      },
      pickerOptions: {},
      errorKey:[],
    };
  },
  created(){
    let type=this.$route.params.createdtype;//1预付物流费  2无合同客户退款 3，申请认领
    this.filterType=type==1?4:(type==2?3:0);
    this.payeeNameType=type==1?0:3;
    this.paymentDetail.businessPayType=type==1?0:1;
    this.paymentDetail.applyAmt=0;
  },
  methods: {
    ...mapMutations(["setApplyInvoiceType", "setContractSearchOptions"]),
    //获取收款单抬头
    getPaymentApplyDetail() {
      let self = this;
      if (!self.id) {
        this.setApplyDetailTitle();
        return;
      }
      getPaymentApplyDetail({ payApplyCode: this.id }).then(res => {
        if (res.code === "success") {
          let dataObj = res.data;
          let paySelectObj={
            companyCode: dataObj.companyCode,
            companyName: dataObj.companyName,
            orgCode: dataObj.orgCode,
            orgName: dataObj.orgName,
            payeeCompanyCode:dataObj.payeeCompanyCode,
            payeeId: dataObj.payeeId,
            payeeName: dataObj.payeeName,
            payApplyCode:dataObj.payApplyCode
          }
          sessionStorage.setItem("paySelectObj",JSON.stringify(paySelectObj));
          self.companyName = {
            companyId: dataObj.companyId,
            companyCode: dataObj.companyCode,
            companyName: dataObj.companyName
          };
          self.branchName = {
            orgId: dataObj.orgId,
            orgCode: dataObj.orgCode,
            orgName: dataObj.orgName
          };
          self.coin = {
            currencyCode: dataObj.currencyCode
          };
          self.payeeBank = {
            bankCode: dataObj.payeeBankCode,
            bankName: dataObj.payeeBankCountry
          };
          self.staff = {
            empCode: dataObj.bizPersonCode,
            empName: dataObj.bizPersonName
          };
          self.project = {
            projectName: dataObj.projectName,
            projectCode: dataObj.projectCode
          };
          this.setApplyInvoiceType(dataObj.applyInvoiceType);
        //  this.filterType = { 1: 1, 0: 2 }[dataObj.receiverType]; //设置收款方式过滤
          let payeeCompanyKey = dataObj.receiverType
            ? "custCode"
            : "supplierCode";
          // payeeId: "", //	收款单位id
          // payeeCompanyCode: "", //	收款单位编码  //弹出框：选择供应商信息
          // payeeName: "", //	收款单位名称
          // 10540005: "框架协议",
          // 10540010: "采购订单",
          // 10540015: "销售订单",
          // 10540020: "费用明细"
          let searchOptions = {};
          switch (res.data.applyInvoiceType) {
            case 10540010:
              searchOptions = {
                companyCode: dataObj.companyCode,
                orgCode: dataObj.orgCode
                // currencyCode: dataObj.currencyCode
              };
              break;
            case 10540015:
              searchOptions = {
                companyCode: dataObj.companyCode,
                orgCode: dataObj.orgCode
                // originCurrencyCode: dataObj.currencyCode
              };
              break;
            case 10540020:
              searchOptions = {
                companyCode: dataObj.companyCode,
                orgCode: dataObj.orgCode,
                billType: dataObj.billType
              };
              break;
            case 10540005:
              searchOptions = {
                companyCode: dataObj.companyCode,
                orgCode: dataObj.orgCode
                // currencyCode: dataObj.currencyCode
              };
              break;
            default:
              break;
          }
          if(this.payeeNameType==3){
            this.customer={
              customerCode:dataObj.receiverCode,
              customerId:dataObj.receiverId,
              customerName:dataObj.receiverName,
            }
          }else{
             this.supplier={
              supplierCode:dataObj.receiverCode,
              supplierId:dataObj.receiverId,
              supplierName:dataObj.receiverName,
            }
          }
          searchOptions[payeeCompanyKey] = dataObj.payeeCompanyCode; //确认是客户还是供应商
          this.setContractSearchOptions(searchOptions);
          this.paymentDetail.applyAmt=res.data.applyAmt;
          self.paymentDetail = res.data;
          this.getLeftCredit();
          this.$emit("getData", this.paymentDetail);
        }
      });
    },
    setApplyDetailTitle() {
     // this.getPayeeBank(applyPayment);
      // this.getParities();
    },
    //获取人民币汇率
    getParities() {
      if (!this.coin.currencyCode) {
        return;
      }
      getRmbParitiesByCurrencyCode({
        formCurrencyCode: this.coin.currencyCode
      }).then(res => {
        if (res.code === "success") {
          this.paymentDetail.rmbCurrencyRate = res.data ? res.data.parities : 1;
        }
      });
      getBaseParitiesByCompanyId({
        companyId: this.companyName.companyId,
        fromCurrencyCode: this.coin.currencyCode
      }).then(res => {
        if (res.code === "success") {
          this.paymentDetail.baseCurrencyRate = res.data
            ? res.data.parities
            : 1;
        }
      });
    },
    //获取可用授信额度
    getLeftCredit(){
      // let applyAmt=0;
      // if(this.id!=0){
      //   applyAmt=this.paymentDetail.applyAmt;
       
      // } 
      if(this.paymentDetail.companyCode && this.paymentDetail.orgCode && this.paymentDetail.payeeCompanyCode){
        let data={
            companyCode:this.paymentDetail.companyCode,
            orgCode:this.paymentDetail.orgCode,
            payeeCompanyCode:this.paymentDetail.payeeCompanyCode,
            applyAmt:this.paymentDetail.applyAmt,
            receiverType:this.paymentDetail.receiverType,
            paymentType:this.paymentDetail.paymentType
          }
        selectLeftAmt(data).then(res=>{
          this.paymentDetail.leftCredit=res.data;
          
        }).catch();
      }
    },
    getPayeeBank(type) {
      // let applyInvoiceType = this.$store.state.applyPaymentDetail
      //   .applyInvoiceType;
      if(JSON.stringify(this.customer) === "{}" && JSON.stringify(this.supplier) === "{}"){
        return;
      }
      if (type==2) {
        
        getCustomerReceiveBank({ customerId: this.customer.customerId }).then(res => {
          if (res.code === "success" && JSON.stringify(res.data)!= "{}") {
            this.paymentDetail = {
              ...this.paymentDetail,
              payeeBankAddress: res.data.payeeBankAddress, //	收款银行地 bankAdress
              payeeBankCode: res.data.payeeBankCode, //	收款单位银行码
              payeeBankAccount: res.data.payeeBankAccount, //	收款单位银行账号
              payeeBankCountry: res.data.bankName, //收款银行名称
              swift: res.data.bankSwiftCode, //	选择客户时，带出其swift
              receiverType: 1 //设置收款公司类别 1为客户
            };
            this.payeeBank = {
              bankName: res.data.bankName,
              bankId: res.data.bankId
            };

           
          }
          //this.filterType = 1; //过滤客户付款选项
          this.paymentDetail.receiverType= 1;//设置收款公司类别 1为客户
          this.getLeftCredit();
        });
        
      } else {
            
        getSupplierReceiveBank({supplierId: this.supplier.supplierId }).then(res => {
           if (res.code === "success" && JSON.stringify(res.data)!= "{}") {
            this.paymentDetail = {
              ...this.paymentDetail,
              payeeBankAddress: res.data.payeeBankAddress, //	收款银行地 bankAdress
              payeeBankCode: res.data.payeeBankCode, //	收款单位银行码
              payeeBankAccount: res.data.payeeBankAccount, //	收款单位银行账号
              payeeBankCountry: res.data.bankName, //收款银行名称
              swift: res.data.bankSwiftCode, //	选择供应商时，带出其swift
              receiverType: 0 //设置收款公司类别 0为供应商
            };
            this.payeeBank = {
              bankName: res.data.bankName,
              bankId: res.data.bankId
            };
            
          }
         // this.filterType = 3; //过滤供应商付款选项
          this.paymentDetail.receiverType=0;
          this.getLeftCredit();
        });
      }
      
    },
    postData() {
    
      const { ...Obj } = {
        ...this.companyName,
        ...this.branchName,
        ...this.project,
        ...this.coin
      };
      [
        "companyId",
        "companyCode",
        "companyName",
        "orgId",
        "orgName",
        "orgCode",
        "projectCode",
        "projectName",
        "currencyCode",
        "moneyContent"
      ].forEach(ele => {
        this.paymentDetail[ele] = Obj[ele] ? Obj[ele] : this.paymentDetail[ele];
      });
      //this.paymentDetail.applyAmt = this.paymentDetail.applyAmt;
      this.paymentDetail.applyBaseAmt = Number(this.applyBaseAmt);
      //付款申请金额人民币
      this.paymentDetail.applyAmtRmb = Number(this.applyAmtRmb);
      console.log(this.paymentDetail);
      //if(this.flag==1){
        // let eleNameObj = {
        //   companyId: "公司",
        //   orgId: "部门",
        //   accountingYear: "年度",
        //   applyPayTime: "付款申请日期",
        //   // projectCode: "项目",
        //   paymentType: "付款类别",
        //   payeeId: "收款单位",
        //   payType: "付款方式",
        //   moneyContent: "款项内容",
        //   isPrePay: "付款类型",
        //   expPayTime: "期望付款日期",
        //   taxRate:"税率"
          
        // };
        this.errorKey=[];
        if(!Object.keys(this.companyName).length){
          this.errorKey.push('companyName');
        }
         if(!Object.keys(this.branchName).length){
          this.errorKey.push('branchName');
        }
         if(!this.paymentDetail.applyPayTime){
          this.errorKey.push('applyPayTime');
        }
         if(!this.paymentDetail.accountingYear){
          this.errorKey.push('accountingYear');
        }
         if(!this.paymentDetail.paymentType){
          this.errorKey.push('paymentType');
        }
         if(!this.paymentDetail.moneyContent){
          this.errorKey.push('moneyContent');
        }
        if(!this.paymentDetail.payType){
          this.errorKey.push('payType');
        }
         if(this.paymentDetail.isPrePay===''){
          this.errorKey.push('isPrePay');
        }
         if(!this.paymentDetail.expPayTime){
          this.errorKey.push('expPayTime');
        }
        if(!this.paymentDetail.payeeName){
          this.errorKey.push('payeeName');
        }
        if(!this.paymentDetail.applyAmt){
          this.errorKey.push('applyAmt');
        }
        if(!this.paymentDetail.applyBaseAmt){
          this.errorKey.push('applyBaseAmt');
        }
        if(!this.paymentDetail.applyAmtRmb){
          this.errorKey.push('applyAmtRmb');
        }
         if(!this.paymentDetail.baseCurrencyRate){
          this.errorKey.push('baseCurrencyRate');
        }
         if(!this.paymentDetail.rmbCurrencyRate){
          this.errorKey.push('rmbCurrencyRate');
        }
        if(this.payeeNameType==3 && !Object.keys(this.customer).length){
           this.errorKey.push('customer');
        }
        if(this.payeeNameType==0 && !Object.keys(this.supplier).length){
           this.errorKey.push('supplier');
        }
        if (!this.conUseBills && this.paymentDetail.paymentType != 10500050) {
          //当为非票据及付款类别不为税款
          // eleNameObj = {
          //   ...eleNameObj,
          //   payeeBankCode: "收款银行",
          //   payeeBankAccount: "银行账号"
          // };
          if(!Object.keys(this.payeeBank).length){
          this.errorKey.push('payeeBank');
          }
          if(!this.paymentDetail.payeeBankAccount){
            this.errorKey.push('payeeBankAccount');
          }
        }
        //if(this.paymentDetail.paymentType==10500050){
          //eleNameObj.taxRate="税率";
           if(this.paymentDetail.taxRate===''){
            this.errorKey.push('taxRate');
          }
       // }
      if(this.errorKey.length > 0) {
        this.$openWarning("必填信息请填完整");
        return false
      }else{
        this.$emit("getData", this.paymentDetail);
        return true;
      }
      
    },
    companyNameChangeHandler(value) {
      this.companyName=value;
      this.paymentDetail.companyCode=value.companyCode; //	公司编码   是否必填 是
      this.paymentDetail.companyId=value.companyId; //	公司id
      this.paymentDetail.companyName=value.companyName; //	公司名称
      if(this.coin.currencyCode){
        this.getParities();
      }
      
    },
    branchNameChangeHandler(value){
      //this.branchName=value;
     this.paymentDetail.orgId=value.orgId;
     this.paymentDetail.orgName=value.orgName;
     this.paymentDetail.orgCode=value.orgCode;
    },
    projectChangeHandler(value) {
      delete value.companyId;
      delete value.companyCode;
      delete value.companyName;
      this.paymentDetail.projectId = value.projectId;
      this.paymentDetail.projectName = value.projectName;
    },
    //客户供应商选择
    customerHandler(value){
      this.customer=value;
      this.paymentDetail.payeeId=value.customerId, //	收款单位id
      this.paymentDetail.payeeCompanyCode=value.customerCode, //	收款单位编码  //弹出框：选择供应商信息
      this.paymentDetail.payeeName=value.customerName, //	收款单位名称
      this.getPayeeBank(2);
    },
    supplierHandler(value){
      this.supplier=value;
      this.paymentDetail.payeeId=value.supplierId, //	收款单位id
      this.paymentDetail.payeeCompanyCode=value.supplierCode, //	收款单位编码  //弹出框：选择供应商信息
      this.paymentDetail.payeeName=value.supplierName, //	收款单位名称
      this.getPayeeBank(1);
     
    },
    payeeBankChangeHandler(value) {
      this.paymentDetail = {
        ...this.paymentDetail,
        payeeBankAccount: value.bankAccount,
        payeeBankAddress: value.bankAddress, //	收款银行地址
        payeeBankCode: value.bankCode, //	收款单位银行编码
        payeeBankCountry: value.bankName, //	收款单位银行国家代码
        swift: value.bankSwiftCode //
      };
    },
    coinChangeHandler(value) {
      this.paymentDetail.currencyCode = value.currencyCode;
      if(this.companyName.companyId){
          this.getParities();
      }
    
    },
    staffChangeHandler(value) {
      this.paymentDetail.bizPersonCode = value.empCode;
      this.paymentDetail.bizPersonName = value.empName;
    },
    applyInvoiceTypeChangeHandle(value) {
      sessionStorage.setItem('applyInvoiceType',value)
      this.setApplyInvoiceType(value);
    },
    applyPayTimeChangehandle(value) {
      this.paymentDetail.accountingYear = value
        ? String(value.getFullYear())
        : "";
      this.pickerOptions = {
        disabledDate(time) {
          return time.getTime() < value;
        }
      };
    },
    paymentTypeChangeHandler(value) {
      let paymentTypeList=JSON.parse(sessionStorage.getItem("paymentTypeList"));
      if(paymentTypeList.length){
          paymentTypeList.forEach(e=>{
            if(value==e.dict_key){
              if(e.biz_category==1){
                this.payeeNameType=0;
              }else{
                this.payeeNameType=3;
              }
            }
           
          })
      }
      if (value == 10500050) {
        this.paymentDetail.payeeId = 0;
        this.paymentDetail.payeeCompanyCode = "S00004";
        this.paymentDetail.payeeName = "海关";
        this.paymentDetail.payeeBankAddress = "";
        this.paymentDetail.payeeBankCode = "";
        this.paymentDetail.payeeBankAccount = "";
        this.paymentDetail.payeeBankCountry = "";
        this.paymentDetail.swift = "";
        this.payeeBank = {};
      }
     
      this.getLeftCredit();
    },
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    createdtype() {
      return this.$route.params.createdtype;
    },
    conUseBills() {
      return [10310010, 10310020, 10310045, 10310120].findIndex(
        item => item === this.paymentDetail.payType
      ) === -1
        ? false
        : true;
    },
    //付款金额本位币
    applyBaseAmt() {
      let value = this.$calculationAmount(
        this.paymentDetail.applyAmt,
        this.paymentDetail.baseCurrencyRate,
        "mul"
      );
      return value;
    },
    //付款申请金额人民币
    applyAmtRmb() {
      let value = this.$calculationAmount(
        this.paymentDetail.applyAmt,
        this.paymentDetail.rmbCurrencyRate,
        "mul"
      );
      return value;
    }

  },
  mounted() {
    this.getPaymentApplyDetail();
  }
};
</script>
<style lang="scss" scoped> 
.index .inputRed .el-input--small .el-input__inner{
  border: 2px solid;
  border-color: #ee2e37a8 !important;
}
.index .el-col-required  .inputRed .el-input.is-disabled .el-input__inner{
  border: 2px solid;
  border-color: #ee2e37a8 !important;
}
.index  .inputRed .el-input__inner,
.index .inputRed .el-input.is-disabled .el-input__inner
{
   border: 2px solid;
  border-color: #ee2e37a8 !important;
}
// .index .el-col-required .el-input.is-disabled .el-input__inner {
//     background-color: #d9e8fd !important;
// }
.input-div{
  padding-left: 0;
}
</style>
<style lang="scss">
.demandPaymentClaim .el-col .el-inputs, .demandPaymentClaim .el-col .el-select, .demandPaymentClaim .el-col .el-date-editor{
      width: 53%;
    }
.demandPaymentClaim .input-div .el-col label{
    width:47% !important;
  }
  .demandPaymentClaim .input-div .el-col{
    margin:8px 0 0 0 !important;
  }
</style>
