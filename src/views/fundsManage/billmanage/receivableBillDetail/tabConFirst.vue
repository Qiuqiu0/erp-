<template>
  <div class="input-div">
    <el-form :disabled="flag===0">
      <!--公司选择-->
      <compony-select
        required
        class="el-col el-col-5 el-col-required"
        :class="errorKey.includes('companyName') ? 'inputRed' : ''"
        :companyName.sync="companyName"
        :ztz="0"
        @change="companyNameChangeHandler"
        :labelName="'公司名称'"
      ></compony-select>
      <!--部门选择-->
      <department-select
        class="el-col el-col-5 el-col-required"
        :class="errorKey.includes('branchName') ? 'inputRed' : ''"
        required
        :labelName="'收票部门'"
        :departztz="0"
        :branchName.sync="branchName"
        :companyName="companyName"
      ></department-select>
      <staff-select
        class="el-col el-col-5 el-col-required"
        :class="errorKey.includes('bizPerson') ? 'inputRed' : ''"
        required
        :branchName="branchName"
        :companyName="companyName"
        :labelName="'业务员'"
        @change="bizPersonChangeHandler"
        :staff.sync="bizPerson"
      ></staff-select>
      <!-- 客户选择 -->
      <customer-select
        class="el-col el-col-5 el-col-required"
        :class="errorKey.includes('customer') ? 'inputRed' : ''"
        required
        :labelName="'客户名称'"
        @change="customerChangeHandler"
        :customer.sync="customer"
      ></customer-select>
      <el-col :span="5" class="el-col el-col-required">
        <label required>票据号</label>
        <el-input
          v-model="fiGatheringBill.instrumentNo"
          class="el-inputs"
          :class="errorKey.includes('instrumentNo') ? 'inputRed' : ''"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>票据台账号</label>
        <el-input
          v-model="fiGatheringBill.instrumentBillNo"
          class="el-inputs"
          :class="errorKey.includes('instrumentBillNo') ? 'inputRed' : ''"
          size="small"
          disabled
          placeholder="请输入"
        ></el-input>
      </el-col>
      <!-- 币别 -->
      <coin-select
        class="el-col el-col-5 el-col-required"
        :class="errorKey.includes('coin') ? 'inputRed' : ''"
        :labelName="'币别'"
        @change="coinChangeHandler"
        required
        :coin.sync="coin"
      ></coin-select>
      <el-col :span="5" class="el-col el-col-required">
        <label required>票据金额</label>
        <el-input
          v-model="fiGatheringBill.instrumentAmt"
          v-input-filter:price
          type="number"
          class="el-inputs"
          :class="errorKey.includes('instrumentAmt') ? 'inputRed' : ''"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>银行保证金金额</label>
        <el-input
          v-model="fiGatheringBill.bankMarginAmount"
          v-input-filter:price
          type="number"
          class="el-inputs"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col el-col-required">
        <label required>收票日期</label>
        <el-date-picker
          size="small"
          class="el-inputs"
          :class="errorKey.includes('invoiceArrivedDate') ? 'inputRed' : ''"
          v-model="fiGatheringBill.invoiceArrivedDate"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
      </el-col>
      <el-col :span="5" class="el-col el-col-required">
        <label required>开票日期</label>
        <el-date-picker
          size="small"
          class="el-inputs"
          :class="errorKey.includes('invoiceDate') ? 'inputRed' : ''"
          v-model="fiGatheringBill.invoiceDate"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
      </el-col>
      <el-col :span="5" class="el-col el-col-required">
        <label required>到期日期</label>
        <el-date-picker
          size="small"
          class="el-inputs"
          :class="errorKey.includes('instrumentYeildDate') ? 'inputRed' : ''"
          v-model="fiGatheringBill.instrumentYeildDate"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
      </el-col>
      <!-- 票据类型 -->
      <invoice-type-select class="el-col-required"
      :class="errorKey.includes('instrumentType') ? 'inputRed' : ''"
       required :invoiceType.sync="fiGatheringBill.instrumentType"></invoice-type-select>
      <!-- 票据性质： -->
      <invoice-properties-select class="el-col-required" 
      :class="errorKey.includes('instrumentProp') ? 'inputRed' : ''"
      required :invoiceProperties.sync="fiGatheringBill.instrumentProp"></invoice-properties-select>
      <el-col :span="5" class="el-col-required">
        <label required>大票小票</label>
        <el-select class="el-inputs" :class="errorKey.includes('isBig') ? 'inputRed' : ''"
         v-model="fiGatheringBill.isBig" placeholder="请选择" size="small">
          <el-option label="D—大票" :value="0"></el-option>
          <el-option label="X—小票" :value="1"></el-option>
        </el-select>
      </el-col>
      <!-- 出票人 -->
      <customer-select
        class="el-col el-col-5 el-col-required"
        :class="errorKey.includes('invoiceCompany') ? 'inputRed' : ''"
        required
        :labelName="'出票人'"
        :needInput="true"
        @change="invoiceCompanyChangeHandler"
        :customer.sync="invoiceCompany"
      ></customer-select>
      <!-- 出票人银行 -->
      <customer-bank-select
        :labelName="'出票人银行'"
        :tipsTitle="'出票人'"
        :needInput="true"
        required
        class="el-col el-col-5 el-col-required"
        :class="errorKey.includes('invoiceBank') ? 'inputRed' : ''"
        :customerBank.sync="invoiceBank"
        :customerId="fiGatheringBill.invoiceById"
        @change="invoiceBankChangeHandler"
      ></customer-bank-select>
      <el-col :span="5" class="el-col el-col-required">
        <label required>出票人银行账号</label>
        <el-input
          v-model="fiGatheringBill.invoiceBankAccount"
          v-input-filter:BankNum
          class="el-inputs"
          :class="errorKey.includes('invoiceBankAccount') ? 'inputRed' : ''"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <!-- 受票人 -->
      <compony-select
        class="el-col el-col-5 el-col-required"
        :class="errorKey.includes('receiptCompany') ? 'inputRed' : ''"
        required
        :labelName="'收票人'"
        :ztz="0"
        :needInput="true"
        :companyName.sync="receiptCompany"
        @change="receiptCompanyHandler"
      ></compony-select>
      <!-- 受票人银行 -->
      <company-bank-select
        required
        :labelName="'收票人银行'"
        :needInput="true"
        class="el-col el-col-5 el-col-required"
        :class="errorKey.includes('receiptByBank') ? 'inputRed' : ''"
        :tipsTitle="'收票人'"
        :companyBank.sync="receiptByBank"
        :companyId="fiGatheringBill.receiptById"
        @change="receiptByBankChangeHandler"
      ></company-bank-select>
      <el-col :span="5" class="el-col el-col-required">
        <label required>收票人银行账号</label>
        <el-input
          v-model="fiGatheringBill.receiptBankAccount"
          v-input-filter:BankNum
          class="el-inputs"
          :class="errorKey.includes('receiptBankAccount') ? 'inputRed' : ''"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col el-col-required">
        <label required>本位币汇率</label>
        <el-input
          v-input-filter:num6
          v-model="fiGatheringBill.baseCurrencyRate"
          class="el-inputs"
          :class="errorKey.includes('baseCurrencyRate') ? 'inputRed' : ''"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col el-col-required">
        <label required>人民币汇率</label>
        <el-input
          v-input-filter:num6
          v-model="fiGatheringBill.rmbCurrencyRate"
          class="el-inputs"
          :class="errorKey.includes('rmbCurrencyRate') ? 'inputRed' : ''"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col el-col-required">
        <label required>本位币金额</label>
        <el-input :value="billAmtBase" class="el-inputs"
        :class="errorKey.includes('billAmtBase') ? 'inputRed' : ''"  size="small" disabled placeholder="请输入"></el-input>
      </el-col>
      <el-col :span="5" class="el-col el-col-required">
        <label required>人民币金额</label>
        <el-input :value="billAmtRmb" class="el-inputs"
        :class="errorKey.includes('billAmtRmb') ? 'inputRed' : ''"  size="small" disabled placeholder="请输入"></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>承兑人信息</label>
        <el-input
          v-model="fiGatheringBill.acceptorInfo"
          class="el-inputs"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>承兑人账号</label>
        <el-input
          v-model="fiGatheringBill.acceptorAccount"
          class="el-inputs"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <!-- 票据状态 -->
      <instrument-status-select
        :disable="true"
        :instrumentStatus.sync="fiGatheringBill.instrumentStatus"
      ></instrument-status-select>
      <div v-if="type===2">
      <el-col :span="5" class="el-col">
          <label>凭证号</label>
          <el-input v-model="warrantCode"
                  class="el-inputs"
                  size="small"
                  disabled></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
          <label>期间</label>
          <el-date-picker
                  style="width:63%"
                  type="month"
                  size="small"
                  v-model="warrantMonth"
                  disabled
                  value-format="yyyyMM"
                  >
          </el-date-picker>   
      </el-col>
    </div>
      <el-col
        :span="20"
        class="el-col"
        style="text-align:left;padding-left:10px;padding-bottom:20px;height:84px;"
      >
        <label style="width: 9.6%;text-align:right;">收票目的</label>
        <el-input
          style="width: 47.8%!important;"
          v-model="fiGatheringBill.receiptReason"
          class="el-inputs"
          size="small"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入内容"
        ></el-input>
      </el-col>
      
    </el-form>
  </div>
</template>
<script>
import componySelect from "@/views/fundsManage/conponents/componySelect";
import departmentSelect from "@/views/fundsManage/conponents/departmentSelect2";
import supplierSelect from "@/views/fundsManage/conponents/supplierSelect2";
import customerSelect from "@/views/fundsManage/conponents/customerSelect2";
import companyBankSelect from "@/views/fundsManage/conponents/companyBankSelect";
import customerBankSelect from "@/views/fundsManage/conponents/customerBankSelect";
import coinSelect from "@/views/fundsManage/conponents/coinSelect";
import staffSelect from "@/views/fundsManage/conponents/staffSelect";
import invoiceTypeSelect from "@/views/fundsManage/conponents/invoiceTypeSelect";
import invoicePropertiesSelect from "@/views/fundsManage/conponents/invoicePropertiesSelect";
import instrumentStatusSelect from "@/views/fundsManage/conponents/instrumentStatusSelect2";
import { getParities } from "@/api/creditManage/creditDetail";
import { getFiGatheringBillDetail } from "@/api/billManage/receivableBillDetail";
import { getRmbParitiesByCurrencyCode } from "@/api/creditManage/creditDetail";
export default {
  name: "tabConFirst",
  components: {
    componySelect,
    departmentSelect,
    supplierSelect,
    customerSelect,
    companyBankSelect,
    customerBankSelect,
    coinSelect,
    staffSelect,
    invoiceTypeSelect,
    invoicePropertiesSelect,
    instrumentStatusSelect
  },
  data() {
    return {
      companyName: {}, //公司
      branchName: {}, //部门
      bizPerson: {},//业务员
      customer: {}, //客户即付款单位 custId  付款单位码 payCompanyCode // 付款单位名称 payCompanyName
      coin: {}, //币别     currencyCode: "", //货币
      invoiceCompany: {}, //出票人    invoiceMan:"",//出票人名 invoiceManName
      invoiceBank: {}, //出票人银行 // invoiceBankCode: "", //出票人银行名称 invoiceBankName
      receiptCompany: {}, //收票人  receiptMan: "", //收票人名称 receiptManName
      receiptByBank: {}, //收票人银行 receiptBankCode: "", //收票人银行名称 receiptBankName
      fiGatheringBill: {
        receivableId: "", //应收票据id	varchar(32) [e描述_32]	y		y		应收票据id
        companyCode: "", //公司编码	varchar(32) [e描述_32]			y		公司编码
        companyId: "", //公司id	varchar(32) [e描述_32]			y		公司id
        companyName: "", //公司名称	varchar(128) [e描述_128]			y		公司名称
        orgId: "", //组织id	varchar(32) [e描述_32]			y		组织id
        orgName: "", //组织名称	varchar(128) [e描述_128]			y		组织名称
        orgCode: "", //组织编码	varchar(32) [e描述_32]			y		组织编码
        custId: "", //客户id	varchar(32) [e描述_32]			y		客户id
        payCompanyCode: "", //付款单位	varchar(64) [e描述_64]			y		付款单位
        payCompanyName: "", //付款单位名称
        accountYear: "", //会计年度	varchar(32) [e描述_32]			y		会计年度
        instrumentNo: "", //票据号	varchar(64) [e描述_64]			y		票据号
        instrumentBillNo: "", //票据台账编号	varchar(64) [e描述_64]			y		票据台账编号
        currencyCode: "", //票据币种	varchar(8) [e描述_8]			y		票据币种
        instrumentAmt: "", //票据金额	decimal(20,6) [d(20,6)小数]			y		票据金额
        baseCurrencyRate: "", //本位币汇率	decimal(20,6) [d(20,6)小数]			y		本位币汇率
        billAmtBase: "", //本位币金额	decimal(20,6) [d(20,6)小数]			y		本位币金额
        rmbCurrencyRate: "", //人民币汇率
        billAmtRmb: "", //人民币金额
        invoiceDate: "", //开票日期	datetime [e时间]			y		开票日期
        bankMarginAmount: 0, //银行保证金金额
        bankMarginRatio: "", //保证金比率
        invoiceArrivedDate: "", //到票日期	datetime [e时间]			y		到票日期
        instrumentYeildDate: "", //到期日期	date [e日期]			y		到期日期
        instrumentType: "", //票据类型	int [e字典Int8]			y		票据类型
        instrumentProp: "", //票据性质	int [e字典Int8]			y		票据性质
        isBig: "", //大票/小票	int [b布尔型]			y	默认值:0大票/小票
        bankType: "", //银行类别	int [e字典Int8]			y		银行类别
        instrumentStatus: "", //票据状态	int [e字典Int8]			y		票据状态
        invoiceById: "", //出票人ID
        invoiceMan: "", //出票人	varchar(64) [e描述_64]			y		出票人
        invoiceManName: "", //出票人名称
        invoiceBankCode: "", //出票人银行	varchar(64) [e描述_64]			y		出票人银行
        invoiceBankName: "", //出票人银行名称
        invoiceBankAccount: "", //出票人银行账号	varchar(64) [e描述_64]			y		出票人银行账号
        receiptById: "", //收票人id
        receiptMan: "", //收票人	varchar(64) [e描述_64]			y		收票人
        receiptManName: "", //收票人名称
        receiptBankCode: "", //收票人银行	varchar(64) [e描述_64]			y		收票人银行
        receiptBankName: "", //收票人银行名称
        receiptBankAccount: "", //收票人银行账号	varchar(64) [e描述_64]			y		收票人银行账号
        acceptorInfo: "", //承兑人信息	varchar(64) [e描述_64]			y		承兑人信息
        acceptorAccount: "", //承兑人账号	varchar(64) [e描述_64]			y		承兑人账号
        receiptReason: "", //收票目的	varchar(512) [e描述_512]			y		收票目的
        remark: "", //备注	varchar(512) [e描述_512]			y		备注
        isInactive: "", //是否停用	int [b布尔型]			y	默认值:0是否停用，0表示激活状态，1表示停用，2表示作废
        createdBy: "", //创建者	varchar(32) [e描述_32]			y		创建者
        createdName: "", //创建者名称	varchar(64) [e描述_64]			y		创建者名称
        createdTime: "", //创建时间	datetime [e时间]			y		创建时间
        updatedBy: "", //更新者	varchar(32) [e描述_32]			y		更新者
        updatedName: "", //更新者名称	varchar(64) [e描述_64]			y		更新者名称
        updatedTime: "", //更新时间	datetime [e时间]			y		更新时间
        bizPersonName:"",//业务员编码   
        bizPersonCode:"",//业务员姓名
        version: "" //数据版本	int [e数字Int10]			y	默认值:0数据版本
      },
      warrantCode:'',//凭证号 
      warrantMonth:'', //期间 
      errorKey:[]
    };
  },
  methods: {
    //获取汇率
    getParities() {
      if (!this.companyName.functionalCurrencyId || !this.coin.currencyId) {
        return;
      }
      getParities({
        formCurrencyId: this.coin.currencyId,
        toCurrencyId: this.companyName.functionalCurrencyId
      }).then(res => {
        if (res.code === "success") {
          this.fiGatheringBill.baseCurrencyRate = res.data.parities;
        }
      });
      getRmbParitiesByCurrencyCode({
        formCurrencyCode: this.coin.currencyCode
      }).then(res => {
        if (res.code === "success") {
          this.fiGatheringBill.rmbCurrencyRate = res.data
            ? res.data.parities
            : 1;
        }
      });
    },
    //获取应付票据抬头
    getDetail() {
      let self = this;
      if (self.id == 0) return;
      getFiGatheringBillDetail({ receivableId: this.id }).then(res => {
        if (res.code === "success") {
          self.companyName = {
            companyId: res.data.companyId,
            companyCode: res.data.companyCode,
            companyName: res.data.companyName
          };
          self.branchName = {
            orgId: res.data.orgId,
            orgCode: res.data.orgCode,
            orgName: res.data.orgName
          };
          self.bizPerson = {
            empName: res.data.bizPersonName,
            empCode: res.data.bizPersonCode
          };
          self.customer = {
            customerName: res.data.payCompanyName,
            customerCode: res.data.payCompanyCode
          };
          self.coin = {
            currencyCode: res.data.currencyCode
          };
          self.invoiceCompany = {
            customerName: res.data.invoiceManName,
            customerCode: res.data.invoiceMan
          };
          self.invoiceBank = {
            bankName: res.data.invoiceBankName,
            bankCode: res.data.invoiceBankCode
          };
          self.receiptCompany = {
            companyName: res.data.receiptManName,
            companyCode: res.data.receiptMan
          };
          self.receiptByBank = {
            bankName: res.data.receiptBankName,
            bankCode: res.data.receiptBankCode
          };
          this.warrantCode=res.data.warrantCode;//凭证号 
          this.warrantMonth=res.data.warrantMonth; //期间 
          self.fiGatheringBill = res.data;
          self.$emit("getData", self.fiGatheringBill);
        }
      });
    },
    postData() {
      const { ...Obj } = {
        ...this.companyName,
        ...this.branchName,
        ...this.coin
      };
      [
        "companyId",
        "companyCode",
        "companyName",
        "orgId",
        "orgName",
        "orgCode",
        "currencyCode"
      ].forEach(ele => {
        this.fiGatheringBill[ele] = Obj[ele]
          ? Obj[ele]
          : this.fiGatheringBill[ele];
      });
      this.fiGatheringBill.billAmtBase = Number(this.billAmtBase);
      this.fiGatheringBill.billAmtRmb = Number(this.billAmtRmb);
      // let eleNameObj = {
      //   companyId: "公司",
      //   orgId: "部门",
      //   bizPersonCode:"业务员",
      //   custId: "客户",
      //   instrumentNo: "票据号",
      //   currencyCode: "币别",
      //   instrumentAmt: "票据金额",
      //   invoiceArrivedDate: "收票日期",
      //   invoiceDate: "开票日期",
      //   instrumentYeildDate: "到期日期",
      //   instrumentType: "票据类型",
      //   instrumentProp: "票据性质",
      //   isBig: "大票小票",
      //   invoiceManName: "出票人",
      //   invoiceBankName: "出票人银行",
      //   invoiceBankAccount: "出票人银行账户",
      //   receiptManName: "收票人",
      //   receiptBankName: "收票人银行",
      //   receiptBankAccount: "收票人银行账号"
      // };
      // if (this.$validateObj(this.fiGatheringBill, eleNameObj)) {
      //   this.$emit("getData", this.fiGatheringBill);
      //   return true;
      // } else {
      //   return false;
      // }
      this.errorKey=[];
      if(!Object.keys(this.companyName).length){
        this.errorKey.push('companyName');
      }
      if(!Object.keys(this.branchName).length){
        this.errorKey.push('branchName');
      }
      if(!Object.keys(this.bizPerson).length){
        this.errorKey.push('bizPerson');
      }
      if(!Object.keys(this.customer).length){
        this.errorKey.push('customer');
      }
      if(!Object.keys(this.coin).length){
        this.errorKey.push('coin');
      }
      if(!Object.keys(this.invoiceCompany).length){
        this.errorKey.push('invoiceCompany');
      }
       if(!Object.keys(this.invoiceBank).length){
        this.errorKey.push('invoiceBank');
      }
       if(!Object.keys(this.receiptCompany).length){
        this.errorKey.push('receiptCompany');
      }
       if(!Object.keys(this.receiptByBank).length){
        this.errorKey.push('receiptByBank');
      }
      if(!this.fiGatheringBill.receiptBankAccount){
           this.errorKey.push('receiptBankAccount');
      }
      if(!this.fiGatheringBill.instrumentNo){
           this.errorKey.push('instrumentNo');
      }
      if(!this.fiGatheringBill.instrumentAmt){
           this.errorKey.push('instrumentAmt');
      }
      if(!this.fiGatheringBill.invoiceBankAccount){
           this.errorKey.push('invoiceBankAccount');
      }
      if(!this.fiGatheringBill.invoiceArrivedDate){
           this.errorKey.push('invoiceArrivedDate');
      }
      if(!this.fiGatheringBill.invoiceDate){
           this.errorKey.push('invoiceDate');
      }
      if(!this.fiGatheringBill.instrumentYeildDate){
           this.errorKey.push('instrumentYeildDate');
      }
      if(!this.fiGatheringBill.instrumentType){
           this.errorKey.push('instrumentType');
      }
      if(!this.fiGatheringBill.instrumentProp){
           this.errorKey.push('instrumentProp');
      }
      if(this.fiGatheringBill.isBig===''){
           this.errorKey.push('isBig');
      }
      if(!this.fiGatheringBill.baseCurrencyRate){
           this.errorKey.push('baseCurrencyRate');
      }
      if(!this.fiGatheringBill.rmbCurrencyRate){
           this.errorKey.push('rmbCurrencyRate');
      }
      if(!this.fiGatheringBill.billAmtBase){
           this.errorKey.push('billAmtBase');
      }
      if(!this.fiGatheringBill.billAmtRmb){
           this.errorKey.push('billAmtRmb');
      }
      
      if(this.errorKey.length > 0) {
        this.$openWarning("必填信息请填完整");
        return false
      }else{
        this.$emit("getData", this.fiGatheringBill);
        return true;
      }
      
    },
    customerChangeHandler(value) {
      this.fiGatheringBill.custId = value.customerId;
      this.fiGatheringBill.payCompanyCode = value.customerCode;
      this.fiGatheringBill.payCompanyName = value.customerName;
    },
    //公司选择
    companyNameChangeHandler() {
      this.getParities();
    },
    //业务员
    bizPersonChangeHandler(value) {
      this.fiGatheringBill.bizPersonName = value.empName ? value.empName : "";
      this.fiGatheringBill.bizPersonCode = value.empCode ? value.empCode : "";
    },
    //出票人选择
    invoiceCompanyChangeHandler(value) {
      this.fiGatheringBill.invoiceById = value.customerId
        ? value.customerId
        : "";
      this.fiGatheringBill.invoiceMan = value.customerCode;
      this.fiGatheringBill.invoiceManName = value.customerName;
    },
    //出票人银行选择
    invoiceBankChangeHandler(value) {
      this.fiGatheringBill.invoiceBankName = value.bankName;
      this.fiGatheringBill.invoiceBankCode = value.bankCode;
      this.fiGatheringBill.invoiceBankAccount = value.bankAccount;
    },
    //受票人选择
    receiptCompanyHandler(value) {
      this.fiGatheringBill.receiptById = value.companyId ? value.companyId : "";
      this.fiGatheringBill.receiptManName = value.companyName;
      this.fiGatheringBill.receiptMan = value.companyCode;
      // this.getParities();
    },
    //受票人银行选择
    receiptByBankChangeHandler(value) {
      this.fiGatheringBill.receiptBankCode = value.bankCode;
      this.fiGatheringBill.receiptBankName = value.bankName;
      this.fiGatheringBill.receiptBankAccount = value.bankAccount;
    },
    coinChangeHandler(value) {
      this.fiGatheringBill.currencyCode = value.currencyCode;
      this.getParities();
    },
    getData() {
      return this.fiGatheringBill;
    }
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    flag() {
      return this.$store.state.route.params.editFlag;
    },
    type() {
      return this.$store.state.route.params.type;
    },
    billAmtBase() {
      let value = this.$calculationAmount(
        this.fiGatheringBill.baseCurrencyRate,
        this.fiGatheringBill.instrumentAmt,
        "mul"
      );
      return value;
    },
    billAmtRmb() {
      let value = this.$calculationAmount(
        this.fiGatheringBill.rmbCurrencyRate,
        this.fiGatheringBill.instrumentAmt,
        "mul"
      );
      return value;
    }
  },
  mounted() {
    this.getDetail();
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
/deep/ .el-col{
  .el-inputs,.el-select{
      width: 63%;
    }
  label{
    width:37%;
  }
}
.input-div{
  padding-left: 15px;
}
</style>
