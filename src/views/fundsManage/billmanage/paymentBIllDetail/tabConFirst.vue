<template>
  <div class="input-div" style="padding-bottom:20px">
    <el-form :disabled="flag===0">
      <el-col :span="5" class="el-col">
        <label>票据编号</label>
        <el-input
          v-model="fiPaymentBill.instrumentBillNo"
          class="el-inputs"
          size="small"
          disabled
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col  el-col-required">
        <label required>票据号</label>
        <el-input
          v-model="fiPaymentBill.instrumentNo"
          class="el-inputs"
          :class="errorKey.includes('instrumentNo') ? 'inputRed' : ''"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <!--公司选择-->
      <compony-select
        required
        :ztz="0"
        class="el-col el-col-5 el-col-required"
        :class="errorKey.includes('companyName') ? 'inputRed' : ''"
        :companyName.sync="companyName"
        :labelName="'公司名称'"
        @change="companyNameChangeHandler"
      ></compony-select>
      <!--部门选择-->
      <department-select
        class="el-col el-col-5 el-col-required"
        :class="errorKey.includes('branchName') ? 'inputRed' : ''"
        required
        :departztz="0"
        :labelName="'部门名称'"
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
      <!-- 票据类型 -->
      <invoice-type-select class="el-col-required"
      :class="errorKey.includes('invoiceType') ? 'inputRed' : ''"
       required :filterType="1" :invoiceType.sync="fiPaymentBill.invoiceType"></invoice-type-select>
      <!-- 票据性质： -->
      <invoice-properties-select class="el-col-required"
      :class="errorKey.includes('invoiceProperties') ? 'inputRed' : ''"
       required :invoiceProperties.sync="fiPaymentBill.invoiceProperties"></invoice-properties-select>
      <!-- 出票人 -->
      <compony-select
        class="el-col el-col-5 el-col-required"
        :class="errorKey.includes('invoiceCompany') ? 'inputRed' : ''"
        required
        :ztz="0"
        :labelName="'出票人'"
        @change="invoiceCompanyChangeHandler"
        :companyName.sync="invoiceCompany"
      ></compony-select>
      <!-- 出票人银行 -->
      <company-bank-select
        :labelName="'出票人银行'"
        :tipsTitle="'出票人'"
        required
        :ztz="0"
        class="el-col el-col-5 el-col-required"
        :class="errorKey.includes('invoiceBank') ? 'inputRed' : ''"
        :companyBank.sync="invoiceBank"
        :companyId="fiPaymentBill.invoiceById"
        @change="invoiceBankChangeHandler"
      ></company-bank-select>
      <el-col :span="5" class="el-col">
        <label>出票人账户标识</label>
        <el-input
          v-model="fiPaymentBill.invoiceBankAccount"
          class="el-inputs"
          size="small"
          disabled
          placeholder="请输入"
        ></el-input>
      </el-col>
      <!-- 付款银行 -->
      <company-bank-select
        :labelName="'付款银行'"
        :tipsTitle="'出票人'"
        class="el-col el-col-5"
        :companyBank.sync="payBank"
        :companyId="fiPaymentBill.invoiceById"
        @change="payBankChangeHandler"
      ></company-bank-select>
      <el-col :span="5" class="el-col">
        <label>银行账号</label>
        <el-input v-model="fiPaymentBill.bankNo" class="el-inputs" size="small" placeholder="请输入"></el-input>
      </el-col>
      <el-col :span="5"></el-col>
      <!-- 受票人 -->
      <supplier-select
        class="el-col el-col-5 el-col-required"
        :class="errorKey.includes('receiptCompany') ? 'inputRed' : ''"
        required
        :labelName="'受票人'"
        :supplier.sync="receiptCompany"
        @change="receiptCompanyHandler"
      ></supplier-select>
      <!-- 受票人银行 -->
      <supplier-bank-select
        :labelName="'受票人银行'"
        class="el-col el-col-5"
        :tipsTitle="'受票人'"
        :supplierBank.sync="receiptByBank"
        :supplierId="fiPaymentBill.receiptById"
        @change="receiptByBankChangeHandler"
      ></supplier-bank-select>
      <el-col :span="5" class="el-col">
        <label>受票人银行账号</label>
        <el-input
          v-model="fiPaymentBill.receiptByBankAccount"
          class="el-inputs"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col el-col-required">
        <label required>签发日期</label>
        <el-date-picker
          size="small"
          class="el-inputs"
          :class="errorKey.includes('signDate') ? 'inputRed' : ''"
          v-model="fiPaymentBill.signDate"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
      </el-col>
      <el-col :span="5" class="el-col el-col-required">
        <label required>到期日期</label>
        <el-date-picker
          size="small"
          class="el-inputs"
          :class="errorKey.includes('timelineDate') ? 'inputRed' : ''"
          v-model="fiPaymentBill.timelineDate"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
      </el-col>
      <el-col :span="5" class="el-col el-col-required">
        <label required>票据金额</label>
        <el-input
          v-model="fiPaymentBill.billAmt"
          v-input-filter:price
          class="el-inputs"
          :class="errorKey.includes('billAmt') ? 'inputRed' : ''"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>银行保证金</label>
        <el-input
          v-model="fiPaymentBill.bankMarginAmount"
          v-input-filter:price
          class="el-inputs"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>手续费</label>
        <el-input
          v-model="fiPaymentBill.serviceCharge"
          v-input-filter:price
          type="number"
          class="el-inputs"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col-required">
        <label required>大票小票</label>
        <el-select class="el-inputs"
        :class="errorKey.includes('isBig') ? 'inputRed' : ''"
         v-model="fiPaymentBill.isBig" placeholder="请选择" size="small">
          <el-option label="D—大票" :value="0"></el-option>
          <el-option label="X—小票" :value="1"></el-option>
        </el-select>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>付款日期</label>
        <el-date-picker
          size="small"
          class="el-inputs"
          v-model="fiPaymentBill.payDate"
          type="date"
          disabled
          placeholder="选择日期"
        ></el-date-picker>
      </el-col>
      <template v-if="type===2||type===3||type===4">
        <el-col :span="5" class="el-col">
          <label>创建人</label>
          <el-input
            v-model="fiPaymentBill.createdName"
            disabled
            class="el-inputs"
            size="small"
            placeholder="请输入"
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>创建日期</label>
          <el-date-picker
            class="el-inputs"
            size="mini"
            disabled
            v-model="fiPaymentBill.createdTime"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-col>
      </template>
      <cashFlow-select
        :labelName="'现金流量码'"
        class="el-col el-col-5"
        :cashFlow.sync="cashFlow"
        @change="cashFlowChangeHandler"
      ></cashFlow-select>
      <coin-select required class="el-col el-col-5 el-col-required" 
      :class="errorKey.includes('coin') ? 'inputRed' : ''"
      :coin.sync="coin" @change="coinChangeHandler"></coin-select>
      <el-col :span="5" class="el-col el-col-required">
        <label required>本位币汇率</label>
        <el-input
          v-input-filter:num6
          v-model="fiPaymentBill.baseCurrencyRate"
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
          v-model="fiPaymentBill.rmbCurrencyRate"
          class="el-inputs"
          :class="errorKey.includes('rmbCurrencyRate') ? 'inputRed' : ''"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col el-col-required">
        <label required>本位币金额</label>
        <el-input
          :value="billAmtBase"
          type="number"
          class="el-inputs"
          :class="errorKey.includes('billAmtBase') ? 'inputRed' : ''"
          size="small"
          disabled
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col el-col-required">
        <label required>人民币金额</label>
        <el-input
          :value="billAmtRmb"
          type="number"
          class="el-inputs"
          :class="errorKey.includes('billAmtRmb') ? 'inputRed' : ''"
          size="small"
          disabled
          placeholder="请输入"
        ></el-input>
      </el-col>
      <!-- 票据状态 -->
      <bill-status-select :billStatus.sync="fiPaymentBill.billStatus" :disable="true"></bill-status-select>
    </el-form>
    <el-col :span="5" class="el-col" v-show="type===2||type===3||type===4">
      <label>
        <span v-show="type==3" class="must-full">*</span>
        过账日期
      </label>
      <accountingDate-select
        :companyId="fiPaymentBill.companyId"
        :accountingDate.sync="fiPaymentBill.postTime"
         :class="errorKey.includes('postTime') ? 'inputRed' : ''"
        :disable="type!=3"
      ></accountingDate-select>
    </el-col>
    <el-col style="text-align:left;" :span="5" class="el-col" v-show="type===2||type===3||type===4">
      <label>
        <span v-show="type==4" class="must-full">*</span>
        冲销原因
      </label>
      <write-off-reason-select
        :disable="type!=4"
        @change="writeOffReasonChangeHanlder"
         :class="errorKey.includes('writeOffReason') ? 'inputRed' : ''"
        :writeOffReason.sync="fiPaymentBill.writeOffReason"
      ></write-off-reason-select>
    </el-col>
    <el-col :span="5" class="el-col" v-show="type===2||type===3||type===4">
      <label>
        <span v-show="type==4" class="must-full">*</span>
        冲销日期
      </label>
      <accountingDate-select
        :companyId="fiPaymentBill.companyId"
         :class="errorKey.includes('writeoffTime') ? 'inputRed' : ''"
        :accountingDate.sync="fiPaymentBill.writeoffTime"
        :disable="type!=4"
      ></accountingDate-select>
    </el-col>
    <el-col :span="5" class="el-col el-col-required">
      <label required>附件数量</label>
      <el-input
        :disabled="flag===0"
        v-model="fiPaymentBill.attachmentCount"
        v-input-filter:int
        type="number"
        class="el-inputs"
        :class="errorKey.includes('attachmentCount') ? 'inputRed' : ''"
        size="small"
        placeholder="请输入"
      ></el-input>
    </el-col>
    <div v-if="type==2">
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
                  type="month"
                  size="small"
                  v-model="warrantMonth"
                  disabled
                  value-format="yyyyMM"
                  >
          </el-date-picker>   
      </el-col>
      <el-col :span="5" class="el-col">
          <label>冲销凭证号</label>
          <el-input v-model="writeoffWarrantCode"
                      class="el-inputs"
                      size="small"
                      disabled></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
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
    </div>
    <el-col class="el-col el-col-btn"></el-col>
  </div>
</template>
<script>
import componySelect from "@/views/fundsManage/conponents/componySelect";
import departmentSelect from "@/views/fundsManage/conponents/departmentSelect2";
import supplierSelect from "@/views/fundsManage/conponents/supplierSelect2";
import bankSelect from "@/views/fundsManage/conponents/bankSelect";
import companyBankSelect from "@/views/fundsManage/conponents/companyBankSelect";
import supplierBankSelect from "@/views/fundsManage/conponents/supplierBankSelect";
import cashFlowSelect from "@/views/fundsManage/conponents/cashFlowSelect";
import coinSelect from "@/views/fundsManage/conponents/coinSelect";
import staffSelect from "@/views/fundsManage/conponents/staffSelect";
import invoiceTypeSelect from "@/views/fundsManage/conponents/invoiceTypeSelect";
import invoicePropertiesSelect from "@/views/fundsManage/conponents/invoicePropertiesSelect";
import billStatusSelect from "@/views/fundsManage/conponents/billStatusSelect";
import writeOffReasonSelect from "@/views/fundsManage/conponents/writeOffReasonSelect";
import accountingDateSelect from "@/views/fundsManage/conponents/accountingDateSelect";
import { getParities } from "@/api/creditManage/creditDetail";
import { getFiPaymentBillDetail } from "@/api/billManage/paymentBIllDetail";
import { getRmbParitiesByCurrencyCode } from "@/api/creditManage/creditDetail";
export default {
  name: "tabConFirst",
  components: {
    componySelect,
    departmentSelect,
    supplierSelect,
    bankSelect,
    companyBankSelect,
    supplierBankSelect,
    coinSelect,
    staffSelect,
    cashFlowSelect,
    invoiceTypeSelect,
    invoicePropertiesSelect,
    billStatusSelect,
    writeOffReasonSelect,
    accountingDateSelect
  },
  data() {
    return {
      companyName: {}, //公司
      branchName: {}, //部门
      bizPerson: {},//业务员
      coin: {}, //币别     currencyCode: "", //货币
      invoiceCompany: {}, //出票人   // invoiceBy: "", //出票人名 invoiceByName
      invoiceBank: {}, //出票人银行 // invoiceBankCode: "", //出票人银行 invoiceBankName: "", 	//出票人银行名称
      payBank: {}, //付款银行   // payBank: "", //付款银行
      receiptCompany: {}, //受票人 receiptByCode: "", //受票人编码		受票人名 receiptByName
      receiptByBank: {}, //受票人银行 receiptByBankCode: "", //受票人银行编码		receiptByBankName: "", //受票人银行名称
      cashFlow: {}, //现金流量码
      fiPaymentBill: {
        id: "", //id	varchar(32) [e描述_32]	y		y		主键id
        companyCode: "", //公司编码	varchar(32) [e描述_32]			y		公司编码
        orgCode: "", //组织编码	varchar(32) [e描述_32]			y		组织编码
        instrumentNo: "", //票据号	varchar(64) [e描述_64]			y		票据号
        instrumentBillNo: "", //票据台账号	varchar(64) [e描述_64]			y		票据台账号
        billStatus: "", //票据状态	int [e字典Int8]			y		(dictNo=4006)票据状态:010登记,020认领,030付款过账,040未用退回(作废)
        invoiceType: "", //票据类型	int [e字典Int8]			y		(dictNo=2067)票据类型,b(银行承兑),d（商业承兑），3（应收款链）
        invoiceProperties: "", //票据性质	int [e字典Int8]			y		(dictNo=3031)票据性质: a(纸票)，b（电票）
        isBig: "", //大小票	int [b布尔型]			y	默认值:0大小票:0大票,1小票
        invoiceBy: "", //出票人	varchar(64) [e描述_64]			y		出票人
        invoiceByName: "", //出票人名
        invoiceBankName: "", //出票人银行名称	varchar(128) [e描述_128]			y		出票人银行名称
        invoiceBankCode: "", //出票人银行	varchar(64) [e描述_64]			y		出票人银行
        invoiceBankAccount: "", //出票人银行账户	varchar(64) [e描述_64]			y		出票人银行账户
        payBank: "", //付款银行	varchar(64) [e描述_64]			y		付款银行
        bankNo: "", //银行账号	varchar(64) [e描述_64]			y		银行账号
        signDate: "", //签发日期	datetime [e时间]			y		签发日期
        timelineDate: "", //到期日期	datetime [e时间]			y		到期日期
        billAmt: "", //票据金额	decimal(20,6) [d(20,6)小数]			y		票据金额
        currencyCode: "", //货币	varchar(8) [e描述_8]			y		货币
        receiptByName: "", //受票人
        receiptByCode: "", //受票人编码	varchar(32) [e描述_32]			y		受票人编码
        receiptByBankCode: "", //受票人银行编码	varchar(32) [e描述_32]			y		受票人银行编码,由供应商主数据默认带出，可更改
        receiptByBankName: "", //受票人银行名称	varchar(64) [e描述_64]			y		受票人银行名称,由供应商主数据默认带出，可更改
        receiptByBankAccount: "", //受票人银行账户	varchar(64) [e描述_64]			y		受票人银行账户,由供应商主数据默认带出，可更改
        bankMarginRatio: "", //银行保证金比率	decimal(20,6) [d(20,6)小数]			y		银行保证金比率
        bankMarginAmount: "", //银行保证金金额	decimal(20,6) [d(20,6)小数]			y		银行保证金金额
        serviceCharge: "", //手续费	decimal(20,6) [d(20,6)小数]			y		手续费
        postTime: "", //过账日期	datetime [e时间]			y		过账日期
        accountingCertificate: "", //会计凭证号	varchar(64) [e描述_64]			y		会计凭证号
        writeoffTime: "", //冲销日期	datetime [e时间]			y		冲销日期
        writeoffCertificate: "", //冲销凭证号	varchar(64) [e描述_64]			y		冲销凭证号
        payNo: "", //付款单	varchar(64) [e描述_64]			y		付款单
        payDate: "", //付款日期	datetime [e时间]			y		付款日期
        cashCode: "", //现金流量代码	varchar(8) [e描述_8]			y		现金流量代码
        paymentApplication: "", //付款申请单	varchar(64) [e描述_64]			y		付款申请单
        postOperationDate: "", //过账操作日期	datetime [e时间]			y		过账操作日期
        certStatus: "", //凭证标识	int [e字典Int8]			y		凭证标识 dictNo=3029
        sendCertError: "", //推送失败原因	varchar(1024) [e描述_1024]			y		推送失败原因
        writeOffReason: "", //冲销原因	int [e字典Int8]			y		dict_4012 冲销原因;03:冲销本期的凭证04:冲销以往期间的凭证
        baseCurrencyRate: "", //本位币汇率	decimal(20,6) [d(20,6)小数]			y		本位币汇率
        billAmtBase: "", //本位币金额	decimal(20,6) [d(20,6)小数]			y		本位币金额
        rmbCurrencyRate: "", //人民币汇率
        billAmtRmb: "", //人民币金额
        remark: "", //备注	varchar(512) [e描述_512]			y		备注
        isInactive: "", //是否停用	int [b布尔型]			y	默认值:0是否停用，0表示激活状态，1表示停用，2表示作废
        createdBy: "", //创建者	varchar(32) [e描述_32]			y		创建者
        createdName: "", //创建者名称	varchar(64) [e描述_64]			y		创建者名称
        createdTime: "", //创建时间	datetime [e时间]			y		创建时间
        updatedBy: "", //更新者	varchar(32) [e描述_32]			y		更新者
        updatedName: "", //更新者名称	varchar(64) [e描述_64]			y		更新者名称
        updatedTime: "", //更新时间	datetime [e时间]			y		更新时间
        version: "", //数据版本	int [e数字Int10]			y	默认值:0数据版本
        companyId: "", //公司id	varchar(32) [e描述_32]			y		公司id
        companyName: "", //公司名称	varchar(128) [e描述_128]			y		公司名称
        orgId: "", //组织id	varchar(32) [e描述_32]			y		组织id
        orgName: "", //组织名称	varchar(128) [e描述_128]			y		组织名称
        bizPersonName: "", //业务员编码
        bizPersonCode: "", //业务员姓名
        attachmentCount: "" //附件数量
      },
      warrantCode:'',//凭证号 
      warrantMonth:'', //期间 
      writeoffWarrantCode:'',//冲销凭证号
      writeoffWarrantMonth:'',//冲销期间
      errorKey:[]
    };
  },
  methods: {
    //获取应付票据抬头
    getPaymentBillDetail() {
      let self = this;
      if (self.id == 0) return;
      getFiPaymentBillDetail({ id: this.id }).then(res => {
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
          self.coin = {
            currencyCode: res.data.currencyCode
          };
          self.invoiceCompany = {
            companyName: res.data.invoiceByName,
            companyCode: res.data.invoiceBy
          };
          self.invoiceBank = {
            bankName: res.data.invoiceBankName,
            bankCode: res.data.invoiceBankCode
          };
          self.payBank = {
            bankName: res.data.payBankName,
            bankCode: res.data.payBank
          };
          self.receiptCompany = {
            supplierName: res.data.receiptByName,
            supplierCode: res.data.receiptByCode
          };
          self.receiptByBank = {
            bankName: res.data.receiptByBankName,
            bankCode: res.data.receiptByBankCode
          };
          //现金流量码
          self.cashFlow = {
            name: res.data.cashFlowName,
            code: res.data.cashCode
          };
          self.fiPaymentBill = res.data;
            this.warrantCode=res.data.warrantCode;//凭证号 
          this.warrantMonth=res.data.warrantMonth; //期间 
          this.writeoffWarrantCode=res.data.writeoffWarrantCode;//冲销凭证号
          this.writeoffWarrantMonth=res.data.writeoffWarrantMonth;//冲销期间
          self.$emit("getData", self.fiPaymentBill);
        }
      });
    },
    getParities() {
      if (!this.companyName.functionalCurrencyId || !this.coin.currencyId) {
        return;
      }
      getParities({
        formCurrencyId: this.coin.currencyId,
        toCurrencyId: this.companyName.functionalCurrencyId
      }).then(res => {
        if (res.code === "success") {
          this.fiPaymentBill.baseCurrencyRate = res.data.parities;
        }
      });
      getRmbParitiesByCurrencyCode({
        formCurrencyCode: this.coin.currencyCode
      }).then(res => {
        if (res.code === "success") {
          this.fiPaymentBill.rmbCurrencyRate = res.data ? res.data.parities : 1;
        }
      });
    },
    postData() {
      const { ...Obj } = {
        ...this.companyName,
        ...this.branchName
      };
      [
        "companyId",
        "companyCode",
        "companyName",
        "orgId",
        "orgName",
        "orgCode"
      ].forEach(ele => {
        this.fiPaymentBill[ele] = Obj[ele] ? Obj[ele] : this.fiPaymentBill[ele];
      });
      this.fiPaymentBill.billAmtBase = Number(this.billAmtBase);
      this.fiPaymentBill.billAmtRmb = Number(this.billAmtRmb);
      this.fiPaymentBill.bankMarginAmount = this.fiPaymentBill.bankMarginAmount
        ? this.fiPaymentBill.bankMarginAmount
        : 0;
      this.fiPaymentBill.serviceCharge = this.fiPaymentBill.serviceCharge
        ? this.fiPaymentBill.serviceCharge
        : 0;
      // let eleNameObj = {
      //   instrumentNo: "票据号",
      //   companyId: "公司",
      //   orgId: "部门",
      //   bizPersonCode:"业务员",
      //   invoiceType: "票据类型",
      //   invoiceProperties: "票据性质",
      //   invoiceBy: "出票人",
      //   invoiceBankCode: "出票人银行",
      //   receiptByCode: "受票人",
      //   signDate: "签发日期",
      //   timelineDate: "到期日期",
      //   billAmt: "票据金额",
      //   currencyCode: "币别", //货币
      //   baseCurrencyRate: "本位币汇率",
      //   attachmentCount: "附件数量"
      // };
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
      if(!this.fiPaymentBill.instrumentNo){
        this.errorKey.push('instrumentNo');
      }
      if(!this.fiPaymentBill.invoiceType){
        this.errorKey.push('invoiceType');
      }
      if(!this.fiPaymentBill.invoiceProperties){
        this.errorKey.push('invoiceProperties');
      }
      if(!this.fiPaymentBill.signDate){
        this.errorKey.push('signDate');
      }
      if(!this.fiPaymentBill.timelineDate){
        this.errorKey.push('timelineDate');
      }
      if(this.fiPaymentBill.isBig===''){
        this.errorKey.push('isBig');
      }
      if(!this.fiPaymentBill.billAmt){
        this.errorKey.push('billAmt');
      }
      if(!this.fiPaymentBill.billAmtBase ){
        this.errorKey.push('billAmtBase');
      }
      if(!this.fiPaymentBill.billAmtRmb ){
        this.errorKey.push('billAmtRmb');
      }
      if(!this.fiPaymentBill.rmbCurrencyRate ){
        this.errorKey.push('rmbCurrencyRate');
      }
      if(!this.fiPaymentBill.baseCurrencyRate ){
        this.errorKey.push('baseCurrencyRate');
      }
      if(!this.fiPaymentBill.attachmentCount){
        this.errorKey.push('attachmentCount');
      }
      if (this.type === 3) {
        // // "postTime"
        // eleNameObj = {
        //   ...eleNameObj,
        //   payDate: "付款日期",
        //   postTime: "过账日期"
        // };
         if(!this.fiPaymentBill.payDate){
            this.errorKey.push('payDate');
          }
          if(!this.fiPaymentBill.postTime){
            this.errorKey.push('postTime');
          }
      } else if (this.type === 4) {
        // writeoffTime", "writeOffReason"
        // eleNameObj = {
        //   ...eleNameObj,
        //   payDate: "付款日期",
        //   writeoffTime: "冲销日期",
        //   writeOffReason: "冲销原因"
        // };
          if(!this.fiPaymentBill.payDate){
            this.errorKey.push('payDate');
          }
          if(!this.fiPaymentBill.writeoffTime){
            this.errorKey.push('writeoffTime');
          }
           if(!this.fiPaymentBill.writeOffReason){
            this.errorKey.push('writeOffReason');
          }
      }
      // if (this.$validateObj(this.fiPaymentBill, eleNameObj)) {
      //   this.$emit("getData", this.fiPaymentBill);
      //   return true;
      // } else {
      //   return false;
      // }
      if(this.errorKey.length > 0) {
        this.$openWarning("必填信息请填完整");
        return false
      }else{
        this.$emit("getData", this.fiPaymentBill);
         return true;
      }
    },
    writeOffReasonChangeHanlder(value) {
      if (value === 10780005) {
        this.fiPaymentBill.writeoffTime = this.fiPaymentBill.postTime;
      } else {
        this.fiPaymentBill.writeoffTime = null;
      }
    },
    companyNameChangeHandler() {
      this.getParities();
    },
    //业务员
    bizPersonChangeHandler(value) {
      this.fiPaymentBill.bizPersonName = value.empName ? value.empName : "";
      this.fiPaymentBill.bizPersonCode = value.empCode ? value.empCode : "";
    },
    //出票人选择
    invoiceCompanyChangeHandler(value) {
      this.fiPaymentBill.invoiceById = value.companyId;
      this.fiPaymentBill.invoiceBy = value.companyCode;
      this.fiPaymentBill.invoiceByName = value.companyName;
      // this.getParities();
    },
    //出票人银行选择
    invoiceBankChangeHandler(value) {
      this.fiPaymentBill.invoiceBankName = value.bankName;
      this.fiPaymentBill.invoiceBankCode = value.bankCode;
      this.fiPaymentBill.invoiceBankAccount = value.bankAccount;
      this.payBank = {
        bankName: value.bankName,
        bankCode: value.bankCode
      };
      this.fiPaymentBill.payBank = value.bankCode;
      this.fiPaymentBill.payBankName = value.bankName;
      this.fiPaymentBill.bankNo = value.bankAccount;
    },
    //付款银行选择
    payBankChangeHandler(value) {
      this.fiPaymentBill.payBank = value.bankCode ? value.bankCode : "";
      this.fiPaymentBill.payBankName = value.bankName ? value.bankName : "";
      this.fiPaymentBill.bankNo = value.bankAccount ? value.bankAccount : "";
    },
    //受票人选择
    receiptCompanyHandler(value) {
      this.fiPaymentBill.receiptById = value.supplierId ? value.supplierId : "";
      this.fiPaymentBill.receiptByName = value.supplierName
        ? value.supplierName
        : "";
      this.fiPaymentBill.receiptByCode = value.supplierCode
        ? value.supplierCode
        : "";
    },
    //受票人银行选择
    receiptByBankChangeHandler(value) {
      this.fiPaymentBill.receiptByBankCode = value.bankCode
        ? value.bankCode
        : "";
      this.fiPaymentBill.receiptByBankName = value.bankName
        ? value.bankName
        : "";
      this.fiPaymentBill.receiptByBankAccount = value.bankAccount
        ? value.bankAccount
        : "";
    },
    coinChangeHandler(value) {
      this.fiPaymentBill.currencyCode = value.currencyCode;
      this.getParities();
    },
    cashFlowChangeHandler(value) {
      this.fiPaymentBill.cashCode = value.code ? value.code : "";
      this.fiPaymentBill.cashFlowName = value.name ? value.name : "";
    },
    getData() {
      return this.fiPaymentBill;
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
        this.fiPaymentBill.baseCurrencyRate,
        this.fiPaymentBill.billAmt,
        "mul"
      );
      return value;
    },
    billAmtRmb() {
      let value = this.$calculationAmount(
        this.fiPaymentBill.rmbCurrencyRate,
        this.fiPaymentBill.billAmt,
        "mul"
      );
      return value;
    }
  },
  mounted() {
    this.getPaymentBillDetail();
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
// .index .el-col-required .el-input.is-disabled .el-input__inner {
//     background-color: #d9e8fd !important;
// }
/deep/ .el-col{
  .el-inputs,.el-select,.el-date-editor{
      width: 64%;
    }
  label{
    width:35%;
  }
}
.input-div{
  padding-left: 0;
}
</style>
