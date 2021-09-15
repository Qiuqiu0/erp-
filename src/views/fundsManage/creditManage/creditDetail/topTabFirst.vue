<template>
  <div class="input-div">
    <el-form :disabled="type!=1">
      <el-col :span="5" class="el-col">
        <label>收款单号</label>
        <el-input
          v-model="fiGathering.gatheringNo"
          name="gatheringNo"
          size="small"
          class="el-inputs"
          placeholder="请输入"
          disabled
        ></el-input>
      </el-col>
      <!--公司选择-->
      <compony-select
        required
        class="el-col el-col-5 el-col-required"
        :companyName.sync="companyName"
        :class="errorKey.includes('companyName') ? 'inputRed' : ''"
        :disable="lockBillSearch"
        :ztz="0"
        @change="companyNameChangeHandler"
      ></compony-select>
      <!--部门选择-->
      <department-select
        class="el-col el-col-5"
        :branchName.sync="branchName"
        :disable="lockBillSearch"
        :departztz="0"
        :companyName="companyName"
      ></department-select>
      <el-col :span="5" class="el-col el-col-required">
        <label required>收款日期</label>
        <el-date-picker
          class="el-inputs"
           :class="errorKey.includes('payeeDate') ? 'inputRed' : ''"
          size="small"
          v-model="fiGathering.payeeDate"
          @change="payeeDateChangehandle"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
      </el-col>
      <!-- 收款方式 -->
      <payee-type-select
      class="el-col-required"
        required
        :payeeType.sync="fiGathering.payeeType"
         :class="errorKey.includes('payeeType') ? 'inputRed' : ''"
        @change="payeeTypeChangeHandler"
      ></payee-type-select>
      <el-col :span="5" class="el-col el-col-required">
        <label required>年度</label>
        <el-date-picker
          class="el-inputs"
           :class="errorKey.includes('accountYear') ? 'inputRed' : ''"
          v-model="fiGathering.accountYear"
          disabled
          align="right"
          size="small"
          type="year"
          value-format="yyyy"
          format="yyyy"
          placeholder="选择年"
        ></el-date-picker>
      </el-col>
      <!--收款类别选择-->
      <payee-category-select
        required
        class="el-col-required"
         :class="errorKey.includes('payeeCategory') ? 'inputRed' : ''"
        :payeeCategory.sync="fiGathering.payeeCategory"
        :needFiltter="needBills"
        @change="payeeCategorychangeHanlder"
      ></payee-category-select>
      <!--付款单位选择-->
      <pay-company-select
        required
        class="el-col el-col-5 el-col-required"
         :class="errorKey.includes('payCompany') ? 'inputRed' : ''"
        :payCompany.sync="payCompany"
        :disable="lockBillSearch"
        :payeeCategory="fiGathering.payeeCategory"
      ></pay-company-select>
      <!-- 收款银行 -->
      <company-bank-select
        :labelName="'收款银行'"
        :needBills="needBills"
        class="el-col el-col-5 el-col-required"
         :class="errorKey.includes('payeeBank') ? 'inputRed' : ''"
        :companyBank.sync="payeeBank"
        :companyId="companyName.companyId"
        @change="payeeBankChangeHandler"
      ></company-bank-select>
      <el-col :span="5" class="el-col">
        <label>收款银行账号标识</label>
        <el-input
          disabled
          v-model="fiGathering.payeeBankAcdount"
          class="el-inputs"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <accountingSubject-select
        :labelName="'收款银行存款科目'"
        :required="!needBills"
        :longNumber="1002"
        style="width:48%"
        class="el-col el-col-10 el-col-required"
        :class="errorKey.includes('payeeBankSubject') ? 'inputRed' : ''"
        :subject.sync="payeeBankSubject"
        @change="payeeBankSubjectChangeHandler"
      ></accountingSubject-select>
      <cashFlow-select
        :labelName="'现金流量码'"
        :required="!needBills"
        class="el-col el-col-5 el-col-required"
        :class="errorKey.includes('cashFlow') ? 'inputRed' : ''"
        :cashFlow.sync="cashFlow"
        @change="cashFlowChangeHandler"
      ></cashFlow-select>
      <!--币别选择-->
      <coin-select
        required
        class="el-col el-col-5 el-col-required"
        :disable="lockBillSearch"
        :coin.sync="coin"
         :class="errorKey.includes('coin') ? 'inputRed' : ''"
        @change="coinChangeHandler"
      ></coin-select>
      <el-col :span="5" class="el-col el-col-required">
        <label required>收款金额(业务币)</label>
        <el-input
          v-input-filter:price
          v-model="fiGathering.payeeAmtOrigin"
          type="number"
          class="el-inputs"
           :class="errorKey.includes('payeeAmtOrigin') ? 'inputRed' : ''"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col el-col-required">
        <label required>汇率(本位币)</label>
        <el-input
          v-input-filter:num6
          v-model="fiGathering.currentcyRateBase"
          class="el-inputs"
           :class="errorKey.includes('currentcyRateBase') ? 'inputRed' : ''"
          size="small"
          placeholder="请输入"
          type="number"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col el-col-required">
        <label required>汇率(人民币)</label>
        <el-input
          v-input-filter:num6
          v-model="fiGathering.currencyRateRmb"
          type="number"
          class="el-inputs"
           :class="errorKey.includes('currencyRateRmb') ? 'inputRed' : ''"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col el-col-required">
        <label required>收款金额(本位币)</label>
        <el-input :value="payeeAmtBase" disabled class="el-inputs"
         :class="errorKey.includes('payeeAmtBase') ? 'inputRed' : ''"
         size="small" placeholder="请输入"></el-input>
      </el-col>
      <el-col :span="5" class="el-col el-col-required">
        <label required>收款金额(人民币)</label>
        <el-input :value="payeeAmtRmb" disabled class="el-inputs"
         :class="errorKey.includes('payeeAmtRmb') ? 'inputRed' : ''"
         size="small" placeholder="请输入"></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>外币扣费(业务币)</label>
        <el-input
          v-model="fiGathering.fcFeeAmt"
          v-input-filter:price
          type="number"
          class="el-inputs"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>外币扣费(本位币)</label>
        <el-input :value="fcFeeAmtBase" disabled class="el-inputs" size="small" placeholder="请输入"></el-input>
      </el-col>
      <accountingSubject-select
        :labelName="'外币扣费科目'"
        style="width:48%"
        :longNumber="6603"
        class="el-col el-col-10"
        :class="errorKey.includes('fcFeeSubject') ? 'inputRed' : ''"
        :subject.sync="fcFeeSubject"
        @change="fcFeeSubjectChangeHandler"
      ></accountingSubject-select>
      <!-- 辅助核算分类选择 -->
      <zzexpect-select :zzexpect.sync="fiGathering.zzexpect" style="height:32px;"></zzexpect-select>
      <el-col :span="5" class="el-col">
        <label>本币扣费</label>
        <el-input
          type="number"
          v-input-filter:price
          v-model="fiGathering.bcFeeAmt"
          class="el-inputs"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <accountingSubject-select
        :labelName="'本币扣费费用科目'"
        style="width:48%"
        :longNumber="6603"
        class="el-col el-col-10"
        :class="errorKey.includes('bcFeeSubject') ? 'inputRed' : ''"
        :subject.sync="bcFeeSubject"
        @change="bcFeeSubjectChangeHandler"
      ></accountingSubject-select>
      <company-bank-select
        :labelName="'本币扣费银行'"
        :companyId="companyName.companyId"
        class="el-col el-col-5"
        :class="errorKey.includes('bcFeeBank') ? 'inputRed' : ''"
        style="height:32px;"
        :companyBank.sync="bcFeeBank"
        @change="bcFeeBankChangeHandler"
      ></company-bank-select>
      <el-col :span="5" class="el-col">
        <label>本币扣费银行账号标识</label>
        <el-input
          disabled
          v-model="fiGathering.bcFeeAccountLabel"
          class="el-inputs"
          :class="errorKey.includes('bcFeeAccountLabel') ? 'inputRed' : ''"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <accountingSubject-select
        :labelName="'本币扣费银行存款科目'"
        style="width:48%"
        :longNumber="1002"
        class="el-col el-col-10"
        :class="errorKey.includes('bcFeeAccountSubject') ? 'inputRed' : ''"
        :subject.sync="bcFeeAccountSubject"
        @change="bcFeeAccountSubjectChangeHandler"
      ></accountingSubject-select>
      <cashFlow-select
        :labelName="'现金流编码扣费'"
        class="el-col el-col-5"
        :class="errorKey.includes('crashFlowNoFeeSubject') ? 'inputRed' : ''"
        :cashFlow.sync="crashFlowNoFeeSubject"
        @change="crashFlowNoFeeSubjectChangeHandler"
      ></cashFlow-select>
      <fi-gathering-bill-select
        :bill.sync="bill"
        :payeeType="fiGathering.payeeType"
        :disable="billStatus!==10270015"
        :searchOptions="{companyCode:this.companyName.companyCode,payCompanyCode:this.payCompany.payCompanyCode,currencyCode:this.coin.currencyCode}"
        :instrumentStatus="10270010"
        class="el-col el-col-5"
        :needBills="needBills"
         :class="errorKey.includes('bill') ? 'inputRed' : ''"
        :labelName="'票据台账编号'"
        @change="billChangeHandler"
      ></fi-gathering-bill-select>
      <el-col :span="5" class="el-col">
        <label>票据号</label>
        <el-input
          disabled
          v-model="fiGathering.instrumentNo"
          class="el-inputs"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <!-- 收款标识-->
      <payee-label-select :payeeLabel.sync="fiGathering.payeeLabel"></payee-label-select>
      <el-col :span="5" class="el-col">
      <div class="check_box" style="text-align:left;">
        <label style="width:50%">是否认领</label>
        <el-checkbox
          disabled
          style="height:32px;line-height:32px;"
          v-model="fiGathering.isConfirmed"
          :true-label="1"
          :false-label="0"
        ></el-checkbox>
      </div>  
      </el-col>
      <!-- 收款单状态 -->
      <payee-status-select :payeeStatus.sync="fiGathering.payeeStatus" disable></payee-status-select>
      <el-col :span="5" class="el-col">
      <div class="radio_box" style="text-align:left;line-height:22px;">
        <label style="width:50%;">业务环节</label>
        <el-radio style="width:20%" v-model="isSales" disabled :label="true">销售</el-radio>
        <el-radio style="width:10%" v-model="isSales" disabled :label="false">采购</el-radio>
      </div>  
      </el-col>
      <el-col :span="5" class="el-col">
        <label>过账日期</label>
        <accountingDate-select
          :disable="true"
          :companyId="fiGathering.companyId"
          :accountingDate.sync="fiGathering.postDate"
        ></accountingDate-select>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>冲销原因</label>
        <write-off-reason-select :disable="true" :writeOffReason.sync="fiGathering.unReason"></write-off-reason-select>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>冲销日期</label>
        <accountingDate-select
          :disable="true"
          :companyId="fiGathering.companyId"
          :accountingDate.sync="fiGathering.unDate"
        ></accountingDate-select>
      </el-col>
      <el-col :span="5" class="el-col el-col-required" style="margin-bottom:0;">
        <label required>附件数量</label>
        <el-input
          v-model="fiGathering.attachmentCount"
          v-input-filter:int
          type="number"
          class="el-inputs"
           :class="errorKey.includes('attachmentCount') ? 'inputRed' : ''"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
    </el-form>
    <staff-select
    v-if="type==5"
    style="margin-bottom:0;"
      class="el-col el-col-5 el-col-required"
        :class="errorKey.includes('bizPerson') ? 'inputRed' : ''"
      :branchName="branchName"
      :companyName="companyName"
      :labelName="'业务员'"
      @change="bizPersonChangeHandler"
      :staff.sync="bizPerson"
    ></staff-select>
    <staff-select
    v-else
    style="margin-bottom:0;"
      class="el-col el-col-5"
      :disable="type==2"
      :branchName="branchName"
      :companyName="companyName"
      :labelName="'业务员'"
      @change="bizPersonChangeHandler"
      :staff.sync="bizPerson"
    ></staff-select>
    <el-col :span="5">
        <label style="width:45%;">是否计息</label>
        <el-select style="width:50%;" :disabled="type!=1" v-model="fiGathering.isInterest" placeholder="请选择" size="small">
          <el-option label="是" :value="1"></el-option>
          <el-option label="否" :value="0"></el-option>
        </el-select>
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
                  style="width:50%;"
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
              style="width:50%;"
              type="month"
              size="small"
              v-model="writeoffWarrantMonth"
              disabled
              value-format="yyyyMM"
              >
          </el-date-picker>   
      </el-col>
    </div>
    <el-col
      :span="20"
      class="el-col"
      style="text-align:left;padding-left:10px;padding-bottom:20px;height:64px;"
    >
      <label style="width: 13.8%;text-align:right;">备注</label>
      <el-input
        style="width: 48%;"
        :disabled="type!=1"
        v-model="fiGathering.remark"
        class="el-inputs"
        size="small"
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4 }"
        placeholder="请输入内容"
      ></el-input>
    </el-col>
    <el-col class="el-col el-col-btn"></el-col>
  </div>
</template>
<script>
import componySelect from "@/views/fundsManage/conponents/componySelect";
import departmentSelect from "@/views/fundsManage/conponents/departmentSelect2";
import staffSelect from "@/views/fundsManage/conponents/staffSelect";
import payCompanySelect from "@/views/fundsManage/conponents/payCompanySelect";
import coinSelect from "@/views/fundsManage/conponents/coinSelect";
import accountingSubjectSelect from "@/views/fundsManage/conponents/accountingSubjectSelect";
import cashFlowSelect from "@/views/fundsManage/conponents/cashFlowSelect";
import payeeCategorySelect from "@/views/fundsManage/conponents/payeeCategorySelect2";
import payeeStatusSelect from "@/views/fundsManage/conponents/payeeStatusSelect2";
import payeeTypeSelect from "@/views/fundsManage/conponents/payeeTypeSelect2";
import zzexpectSelect from "@/views/fundsManage/conponents/zzexpectSelect";
import payeeLabelSelect from "@/views/fundsManage/conponents/payeeLabelSelect";
import companyBankSelect from "@/views/fundsManage/conponents/companyBankSelect";
import bankSelect from "@/views/fundsManage/conponents/bankSelect";
import fiGatheringBillSelect from "@/views/fundsManage/conponents/fiGatheringBillSelect";
import writeOffReasonSelect from "@/views/fundsManage/conponents/writeOffReasonSelect";
import accountingDateSelect from "@/views/fundsManage/conponents/accountingDateSelect";
import {
  getCreditMainDetail,
  getParities,
  getRmbParitiesByCurrencyCode
} from "@/api/creditManage/creditDetail";
import { mapMutations, mapState } from "vuex";
export default {
  name: "topTabFirst",
  props: {
    billStatus: {
      type: Number,
      default: 10270015
    },
    billAmt: {
      type: Number,
      default: 0
    }
  },
  components: {
    componySelect,
    departmentSelect,
    staffSelect,
    payCompanySelect,
    coinSelect,
    accountingSubjectSelect,
    cashFlowSelect,
    payeeCategorySelect,
    payeeStatusSelect,
    payeeTypeSelect,
    zzexpectSelect,
    payeeLabelSelect,
    bankSelect,
    companyBankSelect,
    fiGatheringBillSelect,
    writeOffReasonSelect,
    accountingDateSelect
  },
  data() {
    return {
      companyName: {}, //公司
      branchName: {}, //部门
      bizPerson: {}, //业务员
      payCompany: {}, //付款单位
      payeeBank: {}, //收款银行
      payeeBankSubject: {}, //收款银行存款科目
      cashFlow: {}, //现金流编码
      bcFeeBank: {}, //本币扣费银行
      coin: {}, //币别
      fcFeeSubject: {}, //外币扣费科目
      bcFeeSubject: {}, //本币扣费费用科目
      bcFeeAccountSubject: {}, //本币扣费银行存款科目
      crashFlowNoFeeSubject: {}, //现金流量码扣费
      bill: {}, //票据
      fiGathering: {
        gatheringNo: "", //收款单号  yes
        companyId: "", //公司id	varchar(32) [e描述_32]			y		公司id  yes
        companyCode: "", //公司编码                                     yes
        companyName: "", //公司名称	varchar(128) [e描述_128]			y		公司名称 yes
        orgId: "", //组织id	varchar(32) [e描述_32]			y		组织id
        orgName: "", //组织名称	varchar(128) [e描述_128]			y		组织名称
        orgCode: "", //部门编码
        payeeDate: "", //收款日期 yes
        payeeType: "", //收款方式 yes
        accountYear: "", //会计年度 yes
        payeeCategory: "", //收款类别 yes
        payCompanyName: "", //付款单位名称 yes
        payCompanyCode: "", //付款单位代码 yes
        payeeBankAccount: "", //收款银行存款科目  弹出框：选择会计科目信息
        cashFlowCode: "", //现金流量码 弹出框：选择现金流量码
        currencyCode: "", //业务币种 ???  yes
        payeeAmtOrigin: "", //收款金额业务币 ：手工输入
        currentcyRateBase: "", //汇率本位币  选择币别时，带出其汇率，或者手工修改
        currencyRateRmb: "", //汇率人民币 选择币别时，带出其汇率，或者手工修改
        payeeAmtBase: "", //收款金额本位币 自动计算，等于【收款金额（业务币）】*【汇率（本位币）】 yes
        payeeAmtRmb: "", //收款金额人民币 自动计算，等于【收款金额（业务币）】*【汇率（本位币）】 yes
        payeeBank: "", //收款银行 ???   弹出框：选择银行信息  bankCode
        payeeBankAcdount: "", //收款银行账号标识 ??? bankSwiftCode
        fcFeeAmt: 0, //外币扣费业务币 手工输入
        bcFeeAccount: "", //本币扣费费用科目 弹出框：选择会计科目信息，若外币扣费（业务币）不为0，则必填
        bcFeeBank: "", //本币扣费银行 弹出框：选择银行信息，若外币扣费（业务币）不为0，则必填
        bcFeeAccountLabel: "", //本币扣费银行账号标识 根据本币扣费银行信息带出
        fcFeeAccount: "", //外币扣费科目  弹出框：选择会计科目信息，若外币扣费（业务币）不为0，则必填
        bcFeeAmt: 0, //本币扣费  手工输入
        fcFeeAmtBase: "", //外币扣费本位币  自动计算，等于【外币扣费（业务币）】*【汇率（本位币）】
        bcFeeAccountSubject: "", //本币扣费银行存款科目 弹出框：选择会计科目信息
        crashFlowNoFee: "", //现金流编码扣费 根据本币扣费银行存款科目带出，或者手工开窗选择
        zzexpect: "", //辅助核算分类
        instrumentBillNo: "", //票据台账编号 开窗选择票据信息
        instrumentNo: "", //票据号 根据选择票据信息回写
        payeeLabel: "", //收款标志
        isConfirmed: "", //是否认领
        payeeStatus: "", //收款状态
        remark: "", //备注  手工输入
        isInactive: "", //是否停用
        createdBy: "", //创建者
        createdName: "", //创建者名称
        createdTime: "", //创建时间
        updatedBy: "", //更新者
        updatedName: "", //更新者名称
        updatedTime: "", //更新时间
        version: "", //数据版本
        unDate: "", //冲销日期	datetime [e时间]			y		冲销日期
        unReason: "", //冲销原因	varchar(512) [e描述_512]			y		冲销原因
        attachmentCount: "",//附件数量
        isInterest:1,
      },
       warrantCode:'',//凭证号 
      warrantMonth:'', //期间 
      writeoffWarrantCode:'',//冲销凭证号
      writeoffWarrantMonth:'',//冲销期间
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 24 * 3600 * 1000;
        }
      },
      lockBillSearch: false,
      errorKey:[]
    };
  },
  methods: {
    ...mapMutations([
      "setCurrentcyRateBase",
      "setCurrencyRateRmb",
      "setPayeeAmtOriginTotal",
      "setIsSales"
    ]),
    //获取收款单抬头
    getCreditMainDetail() {
      console.log(this.type);
      let self = this;
      if (self.id == 0) return;
      getCreditMainDetail({ gatheringId: this.id }).then(res => {
        if (res.code === "success") {
          self.companyName = {
            companyId: res.data.companyId,
            companyCode: res.data.companyCode,
            companyName: res.data.companyName
          };
          self.branchName = {
            orgId: res.data.orgId,
            orgName: res.data.orgName,
            orgCode: res.data.orgCode
          };
          self.bizPerson = {
            empName: res.data.bizPersonName,
            empCode: res.data.bizPersonCode
          };
          self.payCompany = {
            payCompanyName: res.data.payCompanyName,
            payCompanyCode: res.data.payCompanyCode
          };
          self.coin = {
            currencyCode: res.data.currencyCode
          };
          self.bill = {
            instrumentBillNo: res.data.instrumentBillNo
          };
          self.bcFeeBank = {
            bankCode: res.data.bcFeeBank,
            bankName: res.data.bcFeeBankName
          };
          self.payeeBank = {
            bankCode: res.data.payeeBank,
            bankName: res.data.payeeBankName
          };
          //收款银行存款科目
          self.payeeBankSubject = {
            name: res.data.payeeBankAccountName,
            code: res.data.payeeBankAccount
          };
          //现金流量码
          self.cashFlow = {
            name: res.data.cashFlowName,
            code: res.data.cashFlowCode
          };
          //外币扣费科目
          self.fcFeeSubject = {
            name: res.data.fcFeeAccountName,
            code: res.data.fcFeeAccount
          };
          //本币扣费费用科目
          self.bcFeeSubject = {
            name: res.data.bcFeeAccountName,
            code: res.data.bcFeeAccount
          };
          //本币扣费银行存款科目
          self.bcFeeAccountSubject = {
            name: res.data.bcFeeAccountSubjectName,
            code: res.data.bcFeeAccountSubject
          };
          //现金流编码扣费
          self.crashFlowNoFeeSubject = {
            name: res.data.crashFlowNameFee,
            code: res.data.crashFlowNoFee
          };
          self.fiGathering = res.data;
          this.warrantCode=res.data.warrantCode;//凭证号 
          this.warrantMonth=res.data.warrantMonth; //期间 
          this.writeoffWarrantCode=res.data.writeoffWarrantCode;//冲销凭证号
          this.writeoffWarrantMonth=res.data.writeoffWarrantMonth;//冲销期间
          this.setCurrentcyRateBase(res.data.currentcyRateBase);
          this.setCurrencyRateRmb(res.data.currencyRateRmb);
          this.setPayeeAmtOriginTotal(res.data.payeeAmtOrigin);
          this.$emit("getData", this.fiGathering);
        }
      });
    },
    //获取本位币汇率
    getParities() {
      if (!this.companyName.functionalCurrencyId || !this.coin.currencyId) {
        return;
      }
      getParities({
        formCurrencyId: this.coin.currencyId,
        toCurrencyId: this.companyName.functionalCurrencyId
      }).then(res => {
        if (res.code === "success") {
          this.fiGathering.currentcyRateBase = res.data.parities;
        }
      });
    },
    //获取人民币汇率
    getStandardCurrencyParities() {
      if (!this.coin.currencyCode) {
        return;
      }
      getRmbParitiesByCurrencyCode({
        formCurrencyCode: this.coin.currencyCode
      }).then(res => {
        if (res.code === "success") {
          this.fiGathering.currencyRateRmb = res.data.parities;
        }
      });
    },
    postData() {
      const { ...Obj } = {
        ...this.companyName,
        ...this.branchName,
        ...this.payCompany,
        ...this.coin
      };
      [
        "companyId",
        "companyCode",
        "companyName",
        "orgId",
        "orgName",
        "orgCode",
        "payCompanyName",
        "payCompanyCode",
        "currencyCode"
      ].forEach(ele => {
        this.fiGathering[ele] = Obj[ele] ? Obj[ele] : "";
      });
      //收款金额本位币
      this.fiGathering.payeeAmtBase = Number(this.payeeAmtBase);
      //收款金额人民币币
      this.fiGathering.payeeAmtRmb = Number(this.payeeAmtRmb);
      //外币扣费本位币
      this.fiGathering.fcFeeAmtBase = Number(this.fcFeeAmtBase);
      // let eleNameObj = {
      //   companyId: "公司",
      //   payeeDate: "收款日期",
      //   payeeType: "收款方式",
      //   accountYear: "年度",
      //   payeeCategory: "收款类别",
      //   payCompanyCode: "付款单位",
      //   currencyCode: "币种",
      //   payeeAmtOrigin: "收款金额(业务币)",
      //   currentcyRateBase: "汇率(本位币)",
      //   currencyRateRmb: "汇率(人民币)",
      //   attachmentCount: "附件数量"
      // };
      let priceValid = {
        payeeAmtOrigin: "收款金额(业务币)",
        currentcyRateBase: "汇率(本位币)",
        currencyRateRmb: "汇率(人民币)"
      };
      this.errorKey=[];
      if(!Object.keys(this.companyName).length){
        this.errorKey.push('companyName');
      }
      if(!Object.keys(this.payCompany).length){
        this.errorKey.push('payCompany');
      }
      if(!this.fiGathering.payeeDate){
        this.errorKey.push('payeeDate');
      }
       if(!this.fiGathering.payeeType){
        this.errorKey.push('payeeType');
      }
       if(!this.fiGathering.accountYear){
        this.errorKey.push('accountYear');
      }
       if(!this.fiGathering.payeeCategory){
        this.errorKey.push('payeeCategory');
      }
       if(!Object.keys(this.coin).length){
        this.errorKey.push('coin');
      }
      if(!this.fiGathering.currentcyRateBase){
        this.errorKey.push('currentcyRateBase');
      }
      if(!this.fiGathering.payeeAmtOrigin){
        this.errorKey.push('payeeAmtOrigin');
      }
      if(!this.fiGathering.currencyRateRmb){
        this.errorKey.push('currencyRateRmb');
      }
      if(!this.fiGathering.payeeAmtBase){
        this.errorKey.push('payeeAmtBase');
      }
      if(!this.fiGathering.payeeAmtRmb){
        this.errorKey.push('payeeAmtRmb');
      }
      if(!this.fiGathering.attachmentCount){
        this.errorKey.push('attachmentCount');
      }
      if (this.fiGathering.fcFeeAmt > 0) {
        //若外币扣费增加必填项
        // eleNameObj = {
        //   ...eleNameObj,
        //   fcFeeAccount: "外币扣费科目"
        // };
        if(!this.fiGathering.fcFeeAccount){
          this.errorKey.push('fcFeeAccount');
        }
      }
      if (this.fiGathering.bcFeeAmt > 0) {
        //本币扣费有数据时 增加必填项
        // eleNameObj = {
        //   ...eleNameObj,
        //   bcFeeAccount: "本币扣费费用科目",
        //   bcFeeBank: "本币扣费银行",
        //   bcFeeAccountLabel: "本币扣费银行账号标识",
        //   bcFeeAccountSubject: "本币扣费银行存款科目",
        //   crashFlowNoFee: "现金流编码扣费"
        // };
         if(!Object.keys(this.bcFeeSubject).length){
          this.errorKey.push('bcFeeSubject');
        }
        if(!Object.keys(this.bcFeeBank).length){
          this.errorKey.push('bcFeeBank');
        }
        if(!this.fiGathering.bcFeeAccountLabel){
          this.errorKey.push('bcFeeAccountLabel');
        }
        if(!Object.keys(this.bcFeeAccountSubject).length){
          this.errorKey.push('bcFeeAccountSubject');
        }
        if(!Object.keys(this.crashFlowNoFeeSubject).length){
          this.errorKey.push('crashFlowNoFeeSubject');
        }

      }
      //银行承兑 商业承兑 必填项
      if (this.needBills) {
        // eleNameObj = {
        //   ...eleNameObj,
        //   instrumentBillNo: "票据台账编号"
        // };
         if(!this.fiGathering.instrumentBillNo){
          this.errorKey.push('instrumentBillNo');
        }
        let instrumentAmt = this.bill.instrumentAmt
          ? this.bill.instrumentAmt
          : this.billAmt;
        if (this.fiGathering.payeeAmtOrigin != instrumentAmt) {
          this.$message({
            message: "票据金额和收款金额不一致，请修改票据金额或收款金额",
            type: "warning"
          });
          return;
        }
      } else {
        // eleNameObj = {
        //   ...eleNameObj,
        //   payeeBank: "收款银行",
        //   payeeBankAccount: "收款银行存款科目",
        //   cashFlowCode: "现金流量码"
        // };
         if(!Object.keys(this.payeeBankSubject).length){
            this.errorKey.push('payeeBankSubject');
          }
          if(!Object.keys(this.payeeBank).length){
            this.errorKey.push('payeeBank');
          }
          if(!Object.keys(this.cashFlow).length){
            this.errorKey.push('cashFlow');
          }
      }
      // bizPersonCode: "业务员", 部门认领增加必填项
      if (this.type == 5) {
        // eleNameObj = {
        //   ...eleNameObj,
        //   bizPersonCode: "业务员"
        // };
        if(!Object.keys(this.bizPerson).length){
            this.errorKey.push('bizPerson');
          }
      }
     // if (this.$validateObj(this.fiGathering, eleNameObj)) {
      if(this.errorKey.length > 0) {
        this.$openWarning("必填信息请填完整");
        return false
      }else{
        if (this.$validatePrice(this.fiGathering, priceValid)) {
          this.$emit("getData", this.fiGathering);
          return true;
        } else {
          return false;
        }
      }
  
    },
    payeeCategorychangeHanlder() {
      this.payCompany = {};
    },
    coinChangeHandler() {
      this.getParities();
      this.getStandardCurrencyParities();
    },
    companyNameChangeHandler() {
      this.getParities();
      this.payeeBank = {};
      this.payeeBankChangeHandler(this.payeeBank);
    },
    //业务员
    bizPersonChangeHandler(value) {
      this.fiGathering.bizPersonName = value.empName ? value.empName : "";
      this.fiGathering.bizPersonCode = value.empCode ? value.empCode : "";
    },
    payeeBankChangeHandler(val) {
      this.fiGathering.payeeBank = val.bankCode ? val.bankCode : "";
      this.fiGathering.payeeBankName = val.bankName ? val.bankName : "";
      this.fiGathering.payeeBankAcdount = val.bankAccount
        ? val.bankAccount
        : "";
    },
    bcFeeBankChangeHandler(val) {
      this.fiGathering.bcFeeBank = val.bankCode ? val.bankCode : "";
      this.fiGathering.bcFeeBankName = val.bankName ? val.bankName : "";
      this.fiGathering.bcFeeAccountLabel = val.bankAccount
        ? val.bankAccount
        : "";
    },
    billChangeHandler(value) {
      this.fiGathering.instrumentBillNo = value.instrumentBillNo
        ? value.instrumentBillNo
        : "";
      this.fiGathering.instrumentNo = value.instrumentNo
        ? value.instrumentNo
        : "";
      this.fiGathering.payeeAmtOrigin = value.instrumentAmt
        ? value.instrumentAmt
        : this.fiGathering.payeeAmtOrigin;
      this.lockBillSearch = this.fiGathering.instrumentBillNo ? true : false;
    },
    payeeTypeChangeHandler(value) {
      if (
        [10310010, 10310020, 10310120].findIndex(item => item === value) === -1
      ) {
        this.fiGathering.instrumentBillNo = "";
        this.fiGathering.instrumentNo = "";
        this.bill = {};
      }
    },
    payeeDateChangehandle(value) {
      this.fiGathering.accountYear = value ? String(value.getFullYear()) : "";
    },
    payeeBankSubjectChangeHandler(value) {
      this.fiGathering.payeeBankAccount = value.code ? value.code : "";
      this.fiGathering.payeeBankAccountName = value.name ? value.name : "";
    },
    cashFlowChangeHandler(value) {
      this.fiGathering.cashFlowCode = value.code ? value.code : "";
      this.fiGathering.cashFlowName = value.name ? value.name : "";
    },
    fcFeeSubjectChangeHandler(value) {
      this.fiGathering.fcFeeAccount = value.code ? value.code : "";
      this.fiGathering.fcFeeAccountName = value.name ? value.name : "";
    },
    bcFeeSubjectChangeHandler(value) {
      this.fiGathering.bcFeeAccount = value.code ? value.code : "";
      this.fiGathering.bcFeeAccountName = value.name ? value.name : "";
    },
    bcFeeAccountSubjectChangeHandler(value) {
      this.fiGathering.bcFeeAccountSubject = value.code ? value.code : "";
      this.fiGathering.bcFeeAccountSubjectName = value.name ? value.name : "";
    },
    crashFlowNoFeeSubjectChangeHandler(value) {
      this.fiGathering.crashFlowNoFee = value.code ? value.code : "";
      this.fiGathering.crashFlowNameFee = value.name ? value.name : "";
    }
  },
  computed: {
    type() {
      return this.$store.state.route.params.type;
    },
    id() {
      return this.$route.params.id;
    },
    isSales() {
      //判断是销售还是采购
      // 10320015: "R:供应商退款",
      // 10320035: "T:收到往来款（其他应付款-单位往来)"
      let flag =
        [10320015, 10320035].findIndex(
          item => item == this.fiGathering.payeeCategory
        ) != -1
          ? false
          : true;
      this.setIsSales(flag);
      return flag;
    },
    needBills() {
      //判断是否需要验证
      return [10310010, 10310020, 10310120].findIndex(
        item => item === this.fiGathering.payeeType
      ) !== -1
        ? true
        : false;
    },
    // payeeAmtBase: "", //收款金额本位币 自动计算，等于【收款金额（业务币）】*【汇率（本位币）】 yes
    // payeeAmtRmb: "", //收款金额人民币 自动计算，等于【收款金额（业务币）】*【汇率（本位币）】 yes
    // fcFeeAmtBase
    payeeAmtBase() {
      let value = this.$calculationAmount(
        this.fiGathering.payeeAmtOrigin,
        this.fiGathering.currentcyRateBase,
        "mul"
      );
      return value;
    },
    payeeAmtRmb() {
      let value = this.$calculationAmount(
        this.fiGathering.payeeAmtOrigin,
        this.fiGathering.currencyRateRmb,
        "mul"
      );
      return value;
    },
    fcFeeAmtBase() {
      let value = this.$calculationAmount(
        this.fiGathering.fcFeeAmt,
        this.fiGathering.currentcyRateBase,
        "mul"
      );
      return value;
    }
  },
  mounted() {
    this.getCreditMainDetail();
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
/deep/ .el-col{
  .el-inputs{
      width: 50%;
    }
  label{
    width:45%;
  }
}
.input-div{
  padding-left: 0;
}

</style>
