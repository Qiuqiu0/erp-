<template>
  <div>
    <!--公司选择-->
    <compony-select
    v-if="matchKey==='company' && checked"
    @change="getValue"
    :labelName="label"
    class="el-col el-col-5"
    :companyName.sync="company_"
    @updateBranchName='updateBranchName'
    >
    </compony-select>
    <!--部门选择-->
    <department-select
        v-if="matchKey==='branch' && checked"
        @change="getValue"
        class="el-col el-col-5"
        :labelName="label"
        :branchName.sync="branch_"
        :companyName="company"
        :departmentList.sync="departmentList_"
        :creator.sync="creator_"
    ></department-select>
    <el-col :span="5" class="el-col" v-if="matchKey==='accountYear' && checked" >
      <label>会计年度</label>
      <el-date-picker
          class="el-inputs"
          v-model="accountYear_"
          @change="getValue"
          value-format="yyyy"
          format="yyyy"
          align="right"
          size="small"
          type="year"
          placeholder="选择年"
      ></el-date-picker>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey==='accountingYear' && checked" >
      <label>会计年度</label>
      <el-date-picker
          class="el-inputs"
          v-model="accountingYear_"
          @change="getValue"
          value-format="yyyy"
          format="yyyy"
          align="right"
          size="small"
          type="year"
          placeholder="选择年"
      ></el-date-picker>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey==='gatheringNo' && checked" >
      <label>收款单号</label>
      <el-input v-model="gatheringNo_" class="el-inputs" size="small" placeholder="请输入" @change="getValue"></el-input>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey==='creditDate' && checked">
      <label>收款日期</label>
      <el-date-picker
          class="el-input-date"
          size="mini"
          v-model="creditDate_"
          @change="getValue"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
      ></el-date-picker>
    </el-col>
    <!--收款类别选择-->
    <payee-category-select v-if="matchKey==='payeeCategory' && checked" @change="getValue" :payeeCategory.sync="payeeCategory_"></payee-category-select>
    <!--收款单状态选择-->
    <payee-status-select v-if="matchKey==='payeeStatus' && checked" @change="getValue" :payeeStatus.sync="payeeStatus_"></payee-status-select>
    <!--收款方式选择-->
    <payee-type-select v-if="matchKey==='payeeType' && checked" @change="getValue"  :payeeType.sync="payeeType_"></payee-type-select>
    <!--客户选择-->
    <customer-select
      v-if="matchKey==='customer' && checked"
      @change="getValue"
      :customer.sync="customer_"
      class="el-col el-col-5"
      :supplier="supplier"
      :customerList.sync="customerList_"
      :customerFlag.sync="customerFlag"
      @disableds="disableds($event)"
    >
    </customer-select>
    <!--供应商选择-->
    <supplier-select
      v-if="matchKey==='supplier' && checked"
      @change="getValue"
      :customer="customer"
      class="el-col el-col-5"
      :supplier.sync="supplier_"
      :supplierList.sync="supplierList_"
      :supplierFlag.sync="supplierFlag"
      @disables="disables($event)"
    >
    </supplier-select>
    <!-- 款项内容选择 -->
    <!-- <cash-content-select :cashContent.sync="cashContent"></cash-content-select> -->
    <!-- 币别选择 -->
    <coin-select v-if="matchKey==='coin' && checked" @change="getValue" :coin.sync="coin_" class="el-col el-col-5"></coin-select>
    <el-col :span="5" class="el-col" v-if="matchKey==='instrumentBillNo' && checked">
      <label>{{ label }}</label>
      <el-input v-model="instrumentBillNo_"  @change="getValue" class="el-inputs" placeholder="请输入" size="small"></el-input>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey==='createdName' && checked">
      <label>创建人</label>
      <el-input v-model="createdName_" @change="getValue" class="el-inputs" placeholder="请输入" size="small"></el-input>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey==='createDate' && checked">
      <label>创建日期 </label>
      <el-date-picker
          class="el-input-date"
          size="mini"
          v-model="createDate_"
          @change="getValue"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
      ></el-date-picker>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey==='isConfirmed' && checked">
      <label>是否认领</label>
      <zl-select v-model="isConfirmed_" placeholder="请选择" size="small" @change="getValue" clearable>
        <zl-option label="全部" value></zl-option>
        <zl-option label="否" :value="0"></zl-option>
        <zl-option label="是" :value="1"></zl-option>
      </zl-select>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey==='isInterest' && checked">
        <label >是否计息</label>
        <el-select v-model="isInterest_" placeholder="请选择"  @change="getValue">
          <el-option label="是" :value="1"></el-option>
          <el-option label="否" :value="0"></el-option>
        </el-select>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey==='warrantCode' && checked">
      <label>凭证号</label>
      <el-input v-model="warrantCode_"
                @change="getValue"
                class="el-inputs"
                size="small"
                placeholder="请输入"></el-input>
    </el-col>
    <el-col :span="5" class="el-col" style="margin-bottom:10px" v-if="matchKey==='warrantMonth' && checked">
      <label>期间</label>
      <el-date-picker
          type="month"
          size="small"
          v-model="warrantMonth_"
          @change="getValue"
          placeholder="请选择"
          value-format="yyyy-MM"
      >
      </el-date-picker>
    </el-col>
    <el-col :span="5" class="el-col" style="margin-bottom:10px" v-if="matchKey==='writeoffWarrantCode' && checked">
      <label>冲销凭证号</label>
      <el-input v-model="writeoffWarrantCode_"
                @change="getValue"
                class="el-inputs"
                size="small"
                placeholder="请输入"></el-input>
    </el-col>
    <el-col :span="5" class="el-col" style="margin-bottom:10px" v-if="matchKey==='writeoffWarrantMonth' && checked">
      <label>冲销期间</label>
      <el-date-picker
          type="month"
          size="small"
          v-model="writeoffWarrantMonth_"
          @change="getValue"
          placeholder="请选择"
          value-format="yyyy-MM"
      >
      </el-date-picker>
    </el-col>
    <!-- 认领状态选择 -->
    <shared-status-select :sharedStatus.sync="sharedStatus_" v-if="matchKey==='sharedStatus' && checked" @change="getValue"></shared-status-select>
    <!-- 付款单位 1-->
    <pay-company-select
        v-if="matchKey==='payCompany' && checked" @change="getValue"
        :payCompany.sync="payCompany_"
        class="el-col el-col-5"
        :payeeCategory="payeeCategory"
        :customer.sync="customer_"
        :customerList.sync="customerList_"
        :supplier.sync="supplier_"
        :supplierList.sync="supplierList_"
    ></pay-company-select> 
    <!-- 款项内容选择 -->
    <cash-content-select :cashContent.sync="crashContent_" v-if="matchKey==='crashContent' && checked" @change="getValue"></cash-content-select>
    <el-col :span="5" class="el-col" v-if="matchKey==='paymentCode' && checked" >
      <label>{{ label }}</label>
      <el-input v-model="paymentCode_" class="el-inputs" size="small" placeholder="请输入" @change="getValue"></el-input>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey==='payDate' && checked">
      <label>付款日期</label>
      <el-date-picker
          class="el-inputs"
          size="mini"
          v-model="payDate_"
          @change="getValue"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
      ></el-date-picker>
    </el-col>
    <!-- 款项内容选择 -->
    <cash-content-select :cashContent.sync="moneyContent_" v-if="matchKey==='moneyContent' && checked" @change="getValue"></cash-content-select>
    <!--付款单状态选择-->
    <pay-status-select :payStatus.sync="payStatus_" v-if="matchKey==='payStatus' && checked" @change="getValue"></pay-status-select>
    <!--付款方式选择-->
    <pay-type-select :payType.sync="payType_" v-if="matchKey==='payType' && checked" @change="getValue"></pay-type-select>
    <!--付款类别选择-->
    <paymentType-select  class="el-col " :paymentType.sync="paymentType_" v-if="matchKey==='paymentType' && checked" @change="getValue"></paymentType-select>
    <!--收款单位选择-->
   <payee-company-select
        class="el-col el-col-5" v-if="matchKey==='payeeCompany' && checked" @change="getValue"
        :payeeCompany.sync="payeeCompany_"
        :paymentType="paymentType"
    ></payee-company-select>
    <!-- 业务单据类型 -->
    <apply-invoice-type-select :applyInvoiceType.sync="applyInvoiceType_" v-if="matchKey==='applyInvoiceType' && checked" @change="getValue"></apply-invoice-type-select>
    <el-col :span="5" class="el-col" v-if="matchKey==='docNo' && checked" >
      <label>业务单据编号</label>
      <el-input v-model="docNo_" class="el-inputs" placeholder="请输入" size="small" @change="getValue"></el-input>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey==='payApplyCode' && checked" >
      <label>付款申请单号</label>
      <el-input v-model="payApplyCode_" class="el-inputs" size="small" placeholder="请输入" @change="getValue"></el-input>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey==='applyPayTime' && checked">
      <label>申请付款日期</label>
      <el-date-picker
          class="el-inputs"
          size="mini"
          v-model="applyPayTime_"
          @change="getValue"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
      ></el-date-picker>
    </el-col>
    <!--付款申请单状态选择-->
    <apply-status-select
    :applyStatus.sync="applyStatus_"
    v-if="matchKey==='applyStatus' && checked"
    @change="getValue"
    >
    </apply-status-select>
    <el-col :span="5" class="el-col" v-if="matchKey==='blNo' && checked">
      <label>业务单据编号</label>
      <el-input v-model="blNo_" class="el-inputs" placeholder="请输入" size="small" @change="getValue"></el-input>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey==='closeStatus' && checked">
      <label>关闭状态</label>
      <zl-select v-model="closeStatus_" clearable placeholder="请选择" @change="getValue">
        <zl-option value="0" label="未关闭"></zl-option>
        <zl-option value="1" label="审核中"></zl-option>
        <zl-option value="2" label="已关闭"></zl-option>
      </zl-select>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey==='instrumentNo' && checked">
      <label>票据号</label>
      <el-input v-model="instrumentNo_" class="el-inputs" size="small" placeholder="请输入" @change="getValue"></el-input>
    </el-col>
    <!-- 票据类型 -->
    <invoice-type-select :invoiceType.sync="invoiceType_" :filterType="1" v-if="matchKey==='invoiceType' && checked" @change="getValue"></invoice-type-select>
    <!-- 票据性质： -->
    <invoice-properties-select  :invoiceProperties.sync="invoiceProperties_" v-if="matchKey==='invoiceProperties' && checked" @change="getValue"></invoice-properties-select>
    <compony-select class="el-col el-col-5" :labelName="'出票人'" :companyName.sync="invoiceCompany_" v-if="matchKey==='invoiceCompany' && checked" @change="getValue"></compony-select>
    <bill-status-select :billStatus.sync="billStatus_" v-if="matchKey==='billStatus' && checked" @change="getValue"></bill-status-select>
    <bank-select :labelName="'付款银行'" class="el-col el-col-5" :bank.sync="payBank_" v-if="matchKey==='payBank' && checked" @change="getValue"></bank-select>
    <supplier-select class="el-col el-col-5" :labelName="'受票人'" :supplier.sync="receiptCompany_" v-if="matchKey==='receiptCompany' && checked" @change="getValue"></supplier-select>
    <bank-select :labelName="'受票人银行'" class="el-col el-col-5" :bank.sync="receiptByBank_" v-if="matchKey==='receiptByBank' && checked" @change="getValue"></bank-select>
    <el-col :span="5" class="el-col"  v-if="matchKey==='timelineDate' && checked">
      <label>到期日期</label>
      <el-date-picker
          class="el-inputs"
          size="mini"
          v-model="timelineDate"
          @change="getValue"
          type="daterange"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
      ></el-date-picker>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey==='signDate' && checked">
      <label>签发日期</label>
      <el-date-picker
          class="el-inputs"
          size="mini"
          v-model="signDate_"
          @change="getValue"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
      ></el-date-picker>
    </el-col>
    <el-col :span="5" v-if="matchKey==='isBig' && checked"  class="el-col ">
      <label>大票小票</label>
      <zl-select v-model="isBig_" placeholder="请选择" size="small" @change="getValue" clearable>
        <zl-option label="D—大票" :value="0"></zl-option>
        <zl-option label="X—小票" :value="1"></zl-option>
      </zl-select>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey==='cashCode' && checked">
      <label>现金流量码</label>
      <el-input v-model="cashCode_" class="el-inputs" size="small" disabled placeholder="请输入" @change="getValue"></el-input>
    </el-col>
    <staff-select
        class="el-col el-col-5"
        v-if="matchKey==='creator' && checked"
        @change="getValue"
        :branchName="branch"
        :companyName="company"
        :labelName="'创建人'"
        :staff.sync="creator_"
    ></staff-select>
    <!-- 票据类型 -->
    <!-- <invoice-type-select :invoiceType.sync="instrumentType_"  v-if="matchKey==='instrumentType' && checked"
                         @change="getValue"></invoice-type-select> -->
    <el-col :span="5" class="el-col"  v-if="matchKey==='invoiceArrivedDate' && checked">
      <label>收票日期</label>
      <el-date-picker
          class="el-inputs"
          size="mini"
          v-model="invoiceArrivedDate_"
          @change="getValue"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
      ></el-date-picker>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey==='invoiceDate' && checked">
      <label>开票日期</label>
      <el-date-picker
          class="el-inputs"
          size="mini"
          v-model="invoiceDate_"
          @change="getValue"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
      ></el-date-picker>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey==='instrumentYeildDate' && checked">
      <label>到期日期</label>
      <el-date-picker
          class="el-inputs"
          size="mini"
          v-model="instrumentYeildDate_"
          @change="getValue"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
      ></el-date-picker>
    </el-col>
    <!-- 票据性质： -->
    <invoice-properties-select :invoiceProperties.sync="instrumentProp_" @change="getValue"  v-if="matchKey==='instrumentProp' && checked"></invoice-properties-select>
    <!-- 票据状态 -->
    <instrument-status-select :instrumentStatus.sync="instrumentStatus_"  @change="getValue"  v-if="matchKey==='instrumentStatus' && checked"></instrument-status-select>
    <el-col :span="5" class="el-col" v-if="matchKey==='acceptorInfo' && checked">
      <label>承兑人信息</label>
      <el-input v-model="acceptorInfo_" class="el-inputs" size="small" placeholder="请输入" @change="getValue"></el-input>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey==='acceptorAccount' && checked">
      <label>承兑人账号</label>
      <el-input v-model="acceptorAccount_" class="el-inputs" size="small" placeholder="请输入" @change="getValue"></el-input>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey==='payAmtTotal' && checked" style="display: flex;align-items: center;margin-top:0">
      <label>收款区间</label>
      <div class="el-inputs" style="display: flex;align-items: center;justify-content: space-around">
        <el-input v-model="payAmtTotal_[0]" type="number"  style="width: 45%" size="small" placeholder="请输入" @change="(val)=>setMoney({val,index:0})"></el-input>
        —
        <el-input v-model="payAmtTotal_[1]"  type="number" style="width: 45%" size="small" placeholder="请输入" @change="(val)=>setMoney({val,index:1})"></el-input>
      </div>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey==='payeeAmtOrigin' && checked" style="display: flex;align-items: center;margin-top:0">
      <label>付款区间</label>
      <div class="el-inputs" style="display: flex;align-items: center;justify-content: space-around">
        <el-input v-model="payeeAmtOrigin_[0]" type="number"  style="width: 45%" size="small" placeholder="请输入" @change="(val)=>setMoney({val,index:0})"></el-input>
        —
        <el-input v-model="payeeAmtOrigin_[1]"  type="number" style="width: 45%" size="small" placeholder="请输入" @change="(val)=>setMoney({val,index:1})"></el-input>
      </div>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey==='isBusinessPay' && checked">
      <label>是否非业务付款</label>
      <zl-select v-model="isBusinessPay_" clearable placeholder="请选择" @change="getValue">
        <zl-option value="" label="全部"></zl-option>
        <zl-option value="1" label="是"></zl-option>
        <zl-option value="0" label="否"></zl-option>
      </zl-select>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey==='approvalStatus' && checked" >
      <label>认领审批状态</label>
      <zl-select v-model="approvalStatus_" clearable placeholder="请选择" @change="getValue">
        <zl-option v-for="item in approvalStatusList"
                   :key="item.dict_code"
                   :label="item.dict_value"
                   :value="item.dict_key"
        ></zl-option>
      </zl-select>
    </el-col>
    
  </div>
</template>

<script>
import componySelect from "@/views/fundsManage/conponents/componySelect";
import departmentSelect from "@/views/fundsManage/conponents/departmentSelect";
import customerSelect from "@/views/fundsManage/conponents/customerSelect";
import coinSelect from "@/views/fundsManage/conponents/coinSelect";
import payeeCategorySelect from "@/views/fundsManage/conponents/payeeCategorySelect";
import payeeStatusSelect from "@/views/fundsManage/conponents/payeeStatusSelect";
import payeeTypeSelect from "@/views/fundsManage/conponents/payeeTypeSelect";
import supplierSelect from "@/views/fundsManage/conponents/supplierSelect";
import cashContentSelect from "@/views/fundsManage/conponents/cashContentSelect";
import payCompanySelect from "@/views/fundsManage/conponents/payCompanySelect2";
import sharedStatusSelect from "@/views/fundsManage/conponents/sharedStatusSelect";
import payeeCompanySelect from "@/views/fundsManage/conponents/payeeCompanySelect2";
import paymentTypeSelect from "@/views/fundsManage/conponents/paymentTypeSelect";
import payTypeSelect from "@/views/fundsManage/conponents/payTypeSelect";
import payStatusSelect from "@/views/fundsManage/conponents/payStatusSelect";
import applyInvoiceTypeSelect from "@/views/fundsManage/conponents/applyInvoiceTypeSelect";
import applyStatusSelect from "@/views/fundsManage/conponents/applyStatusSelect";
import bankSelect from "@/views/fundsManage/conponents/bankSelect";
import staffSelect from "@/views/fundsManage/conponents/staffSelect";
import invoiceTypeSelect from "@/views/fundsManage/conponents/invoiceTypeSelect";
import invoicePropertiesSelect from "@/views/fundsManage/conponents/invoicePropertiesSelect";
import billStatusSelect from "@/views/fundsManage/conponents/billStatusSelect";
import instrumentStatusSelect from "@/views/fundsManage/conponents/instrumentStatusSelect";

export default {
  name: "contractSearch",
  components: {
    instrumentStatusSelect,
    bankSelect,
    staffSelect,
    invoiceTypeSelect,
    invoicePropertiesSelect,
    billStatusSelect,
    payCompanySelect,
    sharedStatusSelect,
    componySelect,
    departmentSelect,
    payeeCategorySelect,
    payeeStatusSelect,
    payeeTypeSelect,
    customerSelect,
    supplierSelect,
    cashContentSelect,
    coinSelect,
    payeeCompanySelect,
    paymentTypeSelect,
    payTypeSelect,
    payStatusSelect,
    applyInvoiceTypeSelect,
    applyStatusSelect,
  },
  data() {
    return {
      customerFlag:false,
      supplierFlag:false,
      departmentList_:this.departmentList,
      customerList_:this.customerList,
      supplierList_:this.supplierList,
      company_: this.company,
      branch_: this.branch,
      accountYear_: this.accountYear,
      gatheringNo_: this.gatheringNo,
      creditDate_: this.creditDate,
      payeeCategory_: this.payeeCategory,
      payeeStatus_: this.payeeStatus,
      payeeType_: this.payeeType,
      customer_: this.customer,
      coin_: this.coin,
      supplier_: this.supplier,
      instrumentBillNo_: this.instrumentBillNo,
      createdName_: this.createdName,
      createDate_: this.createDate,
      isConfirmed_: this.isConfirmed,
      warrantCode_: this.warrantCode,
      warrantMonth_: this.warrantMonth,
      writeoffWarrantCode_: this.writeoffWarrantCode,
      writeoffWarrantMonth_: this.writeoffWarrantMonth,
      sharedStatus_: this.sharedStatus,
      payCompany_: this.payCompany,
      crashContent_: this.crashContent,
      paymentCode_: this.paymentCode,
      moneyContent_: this.moneyContent,
      payStatus_: this.payStatus,
      payDate_: this.payDate,
      payType_: this.payType,
      paymentType_: this.paymentType,
      payeeCompany_: this.payeeCompany,
      applyInvoiceType_: this.applyInvoiceType,
      docNo_: this.docNo,
      payApplyCode_: this.payApplyCode,
      applyPayTime_: this.applyPayTime,
      applyStatus_: this.applyStatus,
      blNo_: this.blNo,
      closeStatus_: this.closeStatus,
      instrumentNo_: this.instrumentNo,
      invoiceType_: this.invoiceType,
      invoiceProperties_: this.invoiceProperties,
      invoiceCompany_: this.invoiceCompany,
      invoiceBank_: this.invoiceBank,
      billStatus_: this.billStatus,
      payBank_: this.payBank,
      receiptCompany_: this.receiptCompany,
      receiptByBank_: this.receiptByBank,
      timelineDate_: this.timelineDate,
      signDate_: this.signDate,
      isBig_: this.isBig,
      cashCode_: this.cashCode,
      creator_: this.creator,
      instrumentType_: this.instrumentType,
      invoiceArrivedDate_: this.invoiceArrivedDate,
      invoiceDate_: this.invoiceDate,
      instrumentYeildDate_: this.instrumentYeildDate,
      instrumentProp_: this.instrumentProp,
      instrumentStatus_: this.instrumentStatus,
      acceptorInfo_: this.acceptorInfo,
      acceptorAccount_: this.acceptorAccount,
      payAmtTotal_:this.payAmtTotal,
      payeeAmtOrigin_:this.payeeAmtOrigin,
      isBusinessPay_:this.isBusinessPay,
      approvalStatus_:this.approvalStatus,
      accountingYear_:this.accountingYear,
      isInterest_:this.isInterest,
    };
  },
  created() {},
  methods: {
    disableds(val){
      this.supplierFlag = val;
    },
    disables(val){
      this.customerFlag = val;
    },
    getValue(val) {
      this.$emit("changeInput", {
        val,
        key: this.otherKey ? this.otherKey : this.matchKey,
      });
    },
    setMoney({val,index}){
      this[`${this.matchKey}_`][index]=val
      this.$emit("changeInput", {
        val:this[`${this.matchKey}_`],
        key: this.otherKey ? this.otherKey : this.matchKey,
      })

    },
    updateBranchName(val){
      this.branch_ = val;
    }
  },
  props: {
    departmentList:{
      type: Object | Array
    },
    customerList:{
      type: Array
    },
    supplierList:{
      type: Array
    },
    otherKey: {
      type: String,
    },
    checked: {
      type: Boolean,
    },
    matchKey: {
      type: String,
    },
    label: {
      type: String,
    },
    company: {
      type: Object | String,
    },
    branch: {
      type: Array | Object,
    },
    accountYear: {
      type: String | Object,
    },
    gatheringNo: {
      type: String | Object,
    },
    creditDate: {
      type: Object | String,
    },
    payeeCategory: {
      type: Array | Object,
    },
    payeeStatus: {
      type: Object | Array,
    },
    payeeType: {
      type: Array | Object,
    },
    customer: {
      type: Array | Object,
    },
    coin: {
      type: Number | String,
    },
    supplier: {
      type: Array | Object,
    },
    instrumentBillNo: {
      type: Number | String,
    },
    createdName: {
      type: Number | String,
    },
    createDate: {
      type: Object | String,
    },
    isConfirmed: {
      type: Number | String,
    },
    warrantCode: {
      type: Number | String,
    },
    warrantMonth: {
      type: Object | String,
    },
    writeoffWarrantCode: {
      type: Number | String,
    },
    writeoffWarrantMonth: {
      type: Object | String,
    },

    sharedStatus: {
      type: Array | Object,
    },
    payCompany: {
      type: Object | String,
    },
    crashContent: {
      type: Array | Object,
    },

    paymentCode: {
      type: Number | String,
    },
    payDate: {
      type: Object | String,
    },
    moneyContent: {
      type: Array | Object,
    },
    payStatus: {
      type: Array | Object,
    },
    payType: {
      type: Array | Object,
    },
    paymentType: {
      type: Array | Object,
    },
    payeeCompany: {
      type: Object | String,
    },
    applyInvoiceType: {
      type: Array | Object,
    },
    docNo: {
      type: Number | String,
    },

    payApplyCode: {
      type: Number | String,
    },
    applyPayTime: {
      type: Object | String,
    },
    applyStatus: {
      type: Array | Object,
    },
    blNo: {
      type: Number | String,
    },
    closeStatus: {
      type: Number | String,
    },

    instrumentNo: {
      type: Number | String,
    },
    invoiceType: {
      type: Number | String,
    },
    invoiceProperties: {
      type: Number | String,
    },
    invoiceCompany: {
      type: Object | String,
    },
    invoiceBank: {
      type: Object | String,
    },
    billStatus: {
      type: Array | Object,
    },
    payBank: {
      type: Number | String,
    },
    receiptCompany: {
      type: Object | String,
    },
    receiptByBank: {
      type: Object | String,
    },
    timelineDate: {
      type: Object | String,
    },
    signDate: {
      type: Object | String,
    },
    isBig: {
      type: Number | String,
    },
    cashCode: {
      type: Number | String,
    },
    creator: {
      type: Object | String,
    },

    instrumentType: {
      type: Number | String,
    },
    invoiceArrivedDate: {
      type: Object | String,
    },
    invoiceDate: {
      type: Object | String,
    },
    instrumentYeildDate: {
      type: Object | String,
    },
    instrumentProp: {
      type: Number | String,
    },
    instrumentStatus: {
      type: Array | Object,
    },
    acceptorInfo: {
      type: Number | String,
    },
    acceptorAccount: {
      type: Number | String,
    },
    payAmtTotal:{
      type: Array
    },
    payeeAmtOrigin:{
      type: Array
    },
    isBusinessPay:{
      type: String | Number
    },
    approvalStatus:{
      type: String | Number
    },
    approvalStatusList:{
      type: Array
    },
    accountingYear:{
      type: Array | Object
    },
    isInterest:{
      type: String | Number
    }
  },
  watch: {
    supplierFlag:{
      handler(val) {
      this.supplierFlag = val;
      },
      immediate: true,
      deep: true
    },
    customerFlag:{
      handler(val) {
      this.customerFlag = val;
      },
      immediate: true,
      deep: true
    },
    crashContent(val){
      this.crashContent_ = val;
    },
    departmentList(val){
      this.departmentList_ = val;
    },
    payAmtTotal(val){
      this.payAmtTotal_ = val;
    },
    payeeAmtOrigin(val){
      this.payeeAmtOrigin_ = val;
    },
    customerList(val){
      this.customerList_ = val;
    },
    supplierList(val){
      this.supplierList_ = val;
    },
    company(val) {
      this.company_ = val;
    },
    branch(val) {
      this.branch_ = val;
    },
    accountYear(val) {
      this.accountYear_ = val;
    },
    gatheringNo(val) {
      this.gatheringNo_ = val;
    },
    creditDate(val) {
      this.creditDate_ = val;
    },
    payeeCategory(val) {
      this.payeeCategory_ = val;
    },
    payeeStatus(val) {
      this.payeeStatus_ = val;
    },
    payeeType(val) {
      this.payeeType_ = val;
    },
    customer(val) {
      this.customer_ = val;
    },
    coin(val) {
      this.coin_ = val;
    },
    supplier(val) {
      this.supplier_ = val;
    },
    instrumentBillNo(val) {
      this.instrumentBillNo_ = val;
    },
    createdName(val) {
      this.createdName_ = val;
    },
    createDate(val) {
      this.createDate_ = val;
    },
    isConfirmed(val) {
      this.isConfirmed_ = val;
    },
    warrantCode(val) {
      this.warrantCode_ = val;
    },
    warrantMonth(val) {
      this.warrantMonth_ = val;
    },
    writeoffWarrantCode(val) {
      this.writeoffWarrantCode_ = val;
    },
    writeoffWarrantMonth(val) {
      this.writeoffWarrantMonth_ = val;
    },
    sharedStatus(val) {
      this.sharedStatus_ = val;
    },
    payCompany(val) {
      this.payCompany_ = val;
    },
    paymentCode(val) {
      this.paymentCode_ = val;
    },
    moneyContent(val) {
      this.moneyContent_ = val;
    },
    payStatus(val) {
      this.payStatus_ = val;
    },
    payDate(val) {
      this.payDate_ = val;
    },
    payType(val) {
      this.payType_ = val;
    },
    paymentType(val) {
      this.paymentType_ = val;
    },
    payeeCompany(val) {
      this.payeeCompany_ = val;
    },
    applyInvoiceType(val) {
      this.applyInvoiceType_ = val;
    },
    docNo(val) {
      this.docNo_ = val;
    },
    payApplyCode(val) {
      this.payApplyCode_ = val;
    },
    applyPayTime(val) {
      this.applyPayTime_ = val;
    },
    applyStatus(val) {
      this.applyStatus_ = val;
    },
    blNo(val) {
      this.blNo_ = val;
    },
    closeStatus(val) {
      this.closeStatus_ = val;
    },
    instrumentNo(val) {
      this.instrumentNo_ = val;
    },
    invoiceType(val) {
      this.invoiceType_ = val;
    },
    invoiceProperties(val) {
      this.invoiceProperties_ = val;
    },
    invoiceCompany(val) {
      this.invoiceCompany_ = val;
    },
    invoiceBank(val) {
      this.invoiceBank_ = val;
    },
    billStatus(val) {
      this.billStatus_ = val;
    },
    payBank(val) {
      this.payBank_ = val;
    },
    receiptCompany(val) {
      this.receiptCompany_ = val;
    },
    receiptByBank(val) {
      this.receiptByBank_ = val;
    },
    timelineDate(val) {
      this.timelineDate_ = val;
    },
    signDate(val) {
      this.signDate_ = val;
    },
    isBig(val) {
      this.isBig_ = val;
    },
    cashCode(val) {
      this.cashCode_ = val;
    },
    creator(val) {
      this.creator_ = val;
    },
    instrumentType(val) {
      this.instrumentType_ = val;
    },
    invoiceArrivedDate(val) {
      this.invoiceArrivedDate_ = val;
    },
    invoiceDate(val) {
      this.invoiceDate_ = val;
    },
    instrumentYeildDate(val) {
      this.instrumentYeildDate_ = val;
    },
    instrumentProp(val) {
      this.instrumentProp_ = val;
    },
    instrumentStatus(val) {
      this.instrumentStatus_ = val;
    },
    acceptorInfo(val) {
      this.acceptorInfo_ = val;
    },
    acceptorAccount(val) {
      this.acceptorAccount_ = val;
    },
    isBusinessPay(val) {
      this.isBusinessPay_ = val;
    },
    approvalStatus(val) {
      this.approvalStatus_ = val;
    },
    accountingYear(val) {
      this.accountingYear_ = val;
    },
    isInterest(val){
      this.isInterest_=val;
    }
  },
};
</script>

<style lang="scss" scoped>
.input-div .el-col:last-child {
  margin-bottom: 0px;
}
  .el-date-editor{
      width: 70% !important;
  }
</style>
