<template>
  <el-form :disabled="flag===0">
    <div class="input-div">
      <!--公司选择-->
      <compony-select
        required
        class="el-col el-col-5  el-col-required"
         :class="errorKey.includes('companyName') ? 'inputRed' : ''"
        :companyName.sync="companyName"
        name="companyId"
        :disable="true"
        @change="companyNameChangeHandler"
      ></compony-select>
      <!--部门选择-->
      <department-select
        class="el-col el-col-5  el-col-required"
         :class="errorKey.includes('branchName') ? 'inputRed' : ''"
        required
        :branchName.sync="branchName"
        :disable="true"
        :companyName="companyName"
      ></department-select>
      <staff-select
        class="el-col el-col-5  el-col-required"
         :class="errorKey.includes('bizPerson') ? 'inputRed' : ''"
        required
        :branchName="branchName"
        :companyName="companyName"
        :labelName="'业务员'"
        @change="bizPersonChangeHandler"
        :staff.sync="bizPerson"
      ></staff-select>
      <el-col :span="5" class="el-col  el-col-required">
        <label required>付款日期</label>
        <accountingDate-select
         :class="errorKey.includes('payDate') ? 'inputRed' : ''"
          :companyId="paymentDetail.companyId"
          :accountingDate.sync="paymentDetail.payDate"
          @change="applyPayTimeChangehandle"
        ></accountingDate-select>
      </el-col>
      <el-col :span="5" class="el-col  el-col-required">
        <label required>年度</label>
        <el-date-picker
          v-model="paymentDetail.accountingYear"
          class="el-inputs"
           :class="errorKey.includes('accountingYear') ? 'inputRed' : ''"
          align="right"
          size="small"
          type="year"
          value-format="yyyy"
          format="yyyy"
          disabled
          placeholder="选择年"
        ></el-date-picker>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>付款单号</label>
        <el-input
          name="payApplyCode"
          class="el-inputs"
          v-model="paymentDetail.paymentCode"
          size="small"
          disabled
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col-required">
        <label required style="width:45%;">有无付款申请单</label>
        <el-select style="width:50%;" v-model="paymentDetail.hasPayApply"
         :class="errorKey.includes('hasPayApply') ? 'inputRed' : ''"
         disabled placeholder="请选择" size="small">
          <el-option label="有" :value="1"></el-option>
          <el-option label="无" :value="0"></el-option>
        </el-select>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>付款申请单号</label>
        <el-input
          name="payApplyCode"
          class="el-inputs"
          v-model="paymentDetail.payApplyCode"
          size="small"
          disabled
          placeholder="请输入"
        ></el-input>
      </el-col>
      <!--付款方式选择-->
      <pay-type-select
      class="el-col-required"
       :class="errorKey.includes('payType') ? 'inputRed' : ''"
        required
        :payType.sync="paymentDetail.payType"
        @change="payTypeChangeHandler"
      ></pay-type-select>
      <!--付款类别选择-->
      <paymentType-select
      class="el-col-required"
       :class="errorKey.includes('paymentType') ? 'inputRed' : ''"
        required
        :filterType="filterType"
        :paymentType.sync="paymentDetail.paymentType"
        @change="paymentTypeChangeHandler"
      ></paymentType-select>
      <!-- 款项内容选择 -->
      <!-- <cash-content-select required :cashContent.sync="paymentDetail.moneyContent"></cash-content-select> -->
      <!--收款单位选择-->
      <el-col :span="5" class="el-col  el-col-required">
        <label required>收款单位</label>
        <el-input
          v-model="paymentDetail.receiverName"
          class="el-inputs"
           :class="errorKey.includes('receiverName') ? 'inputRed' : ''"
          size="small"
          disabled
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="5">
        <label style="width:45%;">是否计息</label>
        <el-select style="width:50%;" v-model="paymentDetail.isInterest" placeholder="请选择" size="small">
          <el-option label="是" :value="1"></el-option>
          <el-option label="否" :value="0"></el-option>
        </el-select>
      </el-col>
      <!--付款单状态选择-->
      <pay-status-select
      class="el-col-required"
       :class="errorKey.includes('payStatus') ? 'inputRed' : ''"
        :disable="true"
        required
        :payStatus.sync="paymentDetail.payStatus"
        :labelName="'付款单状态'"
      ></pay-status-select>
      <!--币别选择-->
      <coin-select
        class="el-col el-col-5  el-col-required"
         :class="errorKey.includes('coin') ? 'inputRed' : ''"
        :coin.sync="coin"
        required
        :labelName="'币别'"
        :disable="true"
        @change="coinChangeHandler"
      ></coin-select>
      <el-col :span="5" class="el-col  el-col-required">
        <label required>付款金额(业务币)</label>
        <el-input
          :disabled="status!=-1 && isBusiness!=1"
          v-model="$store.state.paymentDetail.payAmtTotal"
          class="el-inputs"
           :class="errorKey.includes('payAmtTotal') ? 'inputRed' : ''"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col  el-col-required">
        <label required>汇率(本位币)</label>
        <el-input
          v-input-filter:num6
          v-model="paymentDetail.baseCurrencyRate"
          @input="baseCurrencyRateChangeHandler"
          type="number"
          class="el-inputs"
           :class="errorKey.includes('baseCurrencyRate') ? 'inputRed' : ''"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col  el-col-required">
        <label required>汇率(人民币)</label>
        <el-input
          v-input-filter:num6
          v-model="paymentDetail.rmbCurrencyRate"
          type="number"
          class="el-inputs"
           :class="errorKey.includes('rmbCurrencyRate') ? 'inputRed' : ''"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col  el-col-required">
        <label required>付款金额(本位币)</label>
        <el-input
          disabled
          :value="payAmtTotalBase"
          class="el-inputs"
           :class="errorKey.includes('payAmtTotalBase') ? 'inputRed' : ''"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col  el-col-required">
        <label required>付款金额(人民币)</label>
        <el-input disabled :value="payAmtTotalRmb" class="el-inputs"
         :class="errorKey.includes('payAmtTotalRmb') ? 'inputRed' : ''"
         size="small" placeholder="请输入"></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>付款银行账号标识</label>
        <el-input
          readonly
          v-model="paymentDetail.discountAccountIdentificatio"
          class="el-inputs"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <company-bank-select
        :labelName="'付款银行名称'"
        @change="companyBankChangeHandler"
        :needBills="conUseBills"
        class="el-col el-col-5 el-col-required"
         :class="errorKey.includes('companyBank') ? 'inputRed' : ''"
        :companyBank.sync="companyBank"
        :companyId="companyName.companyId"
      ></company-bank-select>
      <el-col :span="5" class="el-col el-col-required">
        <label>付款银行账号</label>
        <el-input
          v-model="paymentDetail.payBankAccountNo"
          class="el-inputs"
           :class="errorKey.includes('payBankAccountNo') ? 'inputRed' : ''"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <accountingSubject-select
        :labelName="'付款科目'"
        style="width:48.8%"
        class="el-col el-col-10 el-col-required"
         :class="errorKey.includes('subject') ? 'inputRed' : ''"
        :subject.sync="subject"
        @change="subjectChangeHandler"
      ></accountingSubject-select>
      <cashFlow-select
        :labelName="'付款银行现金流代码'"
        class="el-col el-col-5 el-col-required"
         :class="errorKey.includes('payBankCashflow') ? 'inputRed' : ''"
        :cashFlow.sync="payBankCashflow"
        @change="payBankCashflowChangeHandler"
      ></cashFlow-select>
      <!-- 收款开户银行 -->
      <payeeBank-select
        :labelName="'收款开户银行'"
        class="el-col el-col-5"
         :class="errorKey.includes('receiverBank') ? 'inputRed' : ''"
        :payeeBank.sync="receiverBank"
        :payeeId="paymentDetail.receiverId"
        :receiverType="paymentDetail.receiverType"
        @change="receiverBankChangeHandler"
      ></payeeBank-select>
      <el-col :span="5" class="el-col">
        <label>银行账号</label>
        <el-input
          v-model="paymentDetail.receiverBankAccount"
          class="el-inputs"
          :class="errorKey.includes('receiverBankAccount') ? 'inputRed' : ''"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>银行国家代码</label>
        <el-input
          v-model="paymentDetail.bankContryCode"
          class="el-inputs"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>手续费(本位币)</label>
        <el-input
          v-input-filter:price
          v-model="paymentDetail.serviceCharge"
          :disabled="conUseBills"
          type="number"
          class="el-inputs"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <accountingSubject-select
        :labelName="'费用科目'"
        :longNumber="6603"
        :disable="conUseBills"
        style="width:48.8%"
        class="el-col el-col-10"
        :class="errorKey.includes('feeAccount') ? 'inputRed' : ''"
        :subject.sync="feeAccount"
        @change="feeAccountChangeHandler"
      ></accountingSubject-select>
      <accountingSubject-select
        :labelName="'费用银行科目'"
        :disable="conUseBills"
        :longNumber="1002"
        style="width:48.8%"
        class="el-col el-col-10"
         :class="errorKey.includes('feeBankAccount') ? 'inputRed' : ''"
        :subject.sync="feeBankAccount"
        @change="feeBankAccountChangeHandler"
      ></accountingSubject-select>
      <cashFlow-select
        :labelName="'费用银行现金流代码'"
        class="el-col el-col-5"
        :class="errorKey.includes('feeBankCashflow') ? 'inputRed' : ''"
        :cashFlow.sync="feeBankCashflow"
        @change="feeBankCashflowChangeHandler"
      ></cashFlow-select>

       <company-bank-select
        :labelName="'手续费银行名称'"
        @change="companyBankChangeHandler2"
        :needBills="conUseBills"
        class="el-col el-col-5 el-col-required"
         :class="errorKey.includes('companyBank2') ? 'inputRed' : ''"
        :companyBank.sync="companyBank2"
        :companyId="companyName.companyId"
      ></company-bank-select>

      <el-col :span="5" class="el-col el-col-required">
        <label required>手续费银行账号</label>
        <el-input
          v-model="paymentDetail.serviceChargeBankAccount"
          class="el-inputs"
           :class="errorKey.includes('serviceChargeBankAccount') ? 'inputRed' : ''"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>过账日期</label>
        <accountingDate-select
          :disable="true"
          :companyId="paymentDetail.companyId"
           :class="errorKey.includes('postDate') ? 'inputRed' : ''"
          :accountingDate.sync="paymentDetail.postDate"
        ></accountingDate-select>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>冲销原因</label>
        <write-off-reason-select
          :disable="true"
          :writeOffReason.sync="paymentDetail.writeOffReason"
           :class="errorKey.includes('writeOffReason') ? 'inputRed' : ''"
        ></write-off-reason-select>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>冲销日期</label>
        <accountingDate-select
          :disable="true"
          :companyId="paymentDetail.companyId"
          :accountingDate.sync="paymentDetail.writeoffDate"
           :class="errorKey.includes('writeoffDate') ? 'inputRed' : ''"
        ></accountingDate-select>
      </el-col>
      <el-col :span="5" class="el-col  el-col-required">
        <label required>附件数量</label>
        <el-input
          v-model="paymentDetail.attachmentCount"
          v-input-filter:int
          type="number"
          class="el-inputs"
           :class="errorKey.includes('attachmentCount') ? 'inputRed' : ''"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
       <el-col :span="5" class="el-col el-col-required">
        <label>税率</label>
        <el-input
          v-model="paymentDetail.taxRate"
          v-input-filter:int
          type="number"
          class="el-inputs"
           :class="errorKey.includes('taxRate') ? 'inputRed' : ''"
          size="small"
          placeholder="请输入"
        ></el-input>

      </el-col>
      <div v-if="flag==0">
      <el-col :span="5" class="el-col">
          <label>凭证号</label>
          <el-input v-model="warrantCode"
                  class="el-inputs"
                  size="small"
                  disabled></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
          <label style="width:45%;">期间</label>
          <el-date-picker
                  style="width:50%"
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
          <label style="width:45%">冲销期间</label>
          <el-date-picker
              style="width:50%"
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
        style="text-align:left;padding-bottom:20px;height:64px;"
      >
        <label style="width: 14% !important;text-align:right;">备注</label>
        <el-input
          style="width: 45%;"
          v-model="paymentDetail.remark"
          class="el-inputs"
          size="small"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入内容"
        ></el-input>
      </el-col>
      <el-col class="el-col el-col-btn"></el-col>
    </div>
  </el-form>
</template>
<script>
import componySelect from "@/views/fundsManage/conponents/componySelect";
import departmentSelect from "@/views/fundsManage/conponents/departmentSelect2";
import coinSelect from "@/views/fundsManage/conponents/coinSelect";
import staffSelect from "@/views/fundsManage/conponents/staffSelect";
import companyBankSelect from "@/views/fundsManage/conponents/companyBankSelect";
import payeeBankSelect from "@/views/fundsManage/conponents/payeeBankSelect";
import accountingSubjectSelect from "@/views/fundsManage/conponents/accountingSubjectSelect";
import cashFlowSelect from "@/views/fundsManage/conponents/cashFlowSelect";
import paymentTypeSelect from "@/views/fundsManage/conponents/paymentTypeSelect2";
import cashContentSelect from "@/views/fundsManage/conponents/cashContentSelect";
import payTypeSelect from "@/views/fundsManage/conponents/payTypeSelect2";
import payStatusSelect from "@/views/fundsManage/conponents/payStatusSelect2";
import writeOffReasonSelect from "@/views/fundsManage/conponents/writeOffReasonSelect";
import accountingDateSelect from "@/views/fundsManage/conponents/accountingDateSelect";
import { getParities,getBaseParitiesByCompanyId } from "@/api/creditManage/creditDetail";
import { getPaymentMain } from "@/api/paymentManage/paymentDetail";
import { mapMutations } from "vuex";
export default {
  name: "tabConFirst",
  components: {
    componySelect,
    departmentSelect,
    staffSelect,
    coinSelect,
    companyBankSelect,
    accountingSubjectSelect,
    cashFlowSelect,
    payeeBankSelect,
    paymentTypeSelect,
    payTypeSelect,
    payStatusSelect,
    cashContentSelect,
    writeOffReasonSelect,
    accountingDateSelect
  },
  data() {
    return {
      companyName: {}, //公司
      branchName: {}, //部门
      bizPerson: {}, //业务员
      project: {}, //项目
      receiverBank: {}, //收款开户银行
      companyBank: {}, //付款银行
      companyBank2: {}, //手续费银行
      coin: {}, //币别
      subject: {}, //付款科目
      payBankCashflow: {}, // 付款银行现金流
      feeAccount: {}, //费用科目
      feeBankAccount: {}, //费用银行科目
      feeBankCashflow: {}, //费用银行现金流代码
      filterType: 0, // 收款类别过滤器 0 不过滤 1 过滤供应商  2过滤客户
      paymentDetail: {
        id: "", //id	varchar(32) [e描述_32]	y		y		付款单id
        companyCode: "", //公司编码	varchar(32) [e描述_32]			y		公司编码
        orgCode: "", //部门编码	varchar(32) [e描述_32]			y		部门编码
        payApplyCode: "", //付款申请单号	varchar(64) [e描述_64]			y		付款申请单号
        paymentCode: "", //付款单号	varchar(64) [e描述_64]			y		付款单号
        payDate: "", //付款日期	datetime [e时间]			y		付款日期
        paymentType: "", //付款类型	int [e字典Int8]			y		(dictNo=2055)付款类型
        receiverName: "", //收款单位名称	varchar(128) [e描述_128]			y		收款单位名称
        receiverCode: "", //收款单位编码	varchar(32) [e描述_32]			y		收款单位编码
        payType: "", //付款方式	int [e字典Int8]			y		付款方式
        accountingYear: "", //会计年度	varchar(32) [e描述_32]			y		会计年度
        // moneyContent: "", //款项内容	int [e字典Int8]			y		款项内容;(dictNo=2058)款项内容
        virtualMark: "", //虚拟标识	int [b布尔型]			y	默认值:0虚拟标识，如打上虚拟标识，则付款单不能过账 付款方式为：应收款链时，更新该字段为勾选状态。
        payAmtTotal: "", //付款金额	decimal(20,6) [d(20,6)小数]			y		付款金额
        payAmtTotalBase: "", //付款金额本币	decimal(20,6) [d(20,6)小数]			y		付款金额本币
        payStatus: "", //付款状态	int [e字典Int8]			y		dictNo=4015付款状态 付款/过账/冲销
        hasPayApply: "", //有无申请单	int [b布尔型]			y	默认值:0有无申请单
        isInterest: "", //是否计息单据	int [b布尔型]			y	默认值:0是否计息单据
        discountAccountIdentificatio: "", //付款银行标识	varchar(8) [e描述_8]			y		贴现账户标识
        payBankAccount: "", //付款科目	varchar(64) [e描述_64]			y		贴现银行科目 由付款银行标识自动带出，可更改。可调用获取sap会计科目接口
        payBankAccountName: "", //付款科目名称
        payBankCashflowCode: "", //付款银行现金流量码
        payBankCashflowName: "", //付款银行现金流量名称
        payBankCode: "", //付款银行编码	varchar(32) [e描述_32]			y		付款银行编码
        payBankName: "", //付款银行名称	varchar(128) [e描述_128]			y		付款银行名称
        payBankAccountNo: "", //付款银行帐号	varchar(64) [e描述_64]			y		付款银行帐号
        receiverBankCode: "", //收款开户银行编码	varchar(32) [e描述_32]			y		收款开户银行编码
        receiverBankName: "", //收款开户银行名称	varchar(128) [e描述_128]			y		收款开户银行名称
        receiverBankAccount: "", //收款开户银行账号	varchar(128) [e描述_128]			y		收款开户银行账号
        serviceCharge: "", // 手续费
        feeAccountCode: "", //费用科目编码
        feeAccountName: "", //费用科目名称
        feeBankAccountCode: "", //费用银行科目编码
        feeBankAccountName: "", // 费用银行科目名称
        feeBankCashflowName: "", //费用银行现金流量名称
        feeBankCashflowCode: "", //费用银行现金流量名称
        docNo: "", //单据号码	varchar(128) [e描述_128]			y		单据号码
        bankContryCode: "", //银行国家代码	varchar(32) [e描述_32]			y		银行国家代码
        paySource: "", //付款来源	int [e字典Int8]			y		付款来源 dictNo=4016
        currencyCode: "", //币别	varchar(8) [e描述_8]			y		币别
        baseCurrencyRate: "", //本位币汇率	decimal(20,6) [d(20,6)小数]			y		本位币汇率
        rmbCurrencyRate: "", //人民币汇率
        billLevel: "", //票据级别	int [e字典Int8]			y		票据级别
        billTimelin: "", //票据到期日期	date [e日期]			y		票据到期日期
        remark: "", //备注	varchar(512) [e描述_512]			y		备注
        foreignExchangeApplyNo: "", //外汇收支申报单号	varchar(64) [e描述_64]			y		外汇收支申报单号
        cashFlowCode: "", //现金流量事务代码	varchar(128) [e描述_128]			y		现金流量事务代码
        postDate: "", //过账日期	datetime [e时间]			y		过账日期
        documentDate: "", //制单日期	datetime [e时间]			y		制单日期
        accountingCertificate: "", //会计凭证	varchar(64) [e描述_64]			y		会计凭证
        postOperationDate: "", //过账操作日期	datetime [e时间]			y		过账操作日期
        posyBy: "", //过账者	varchar(32) [e描述_32]			y		过账人
        certStatus: "", //凭证标识	int [e字典Int8]			y		凭证标识 dictNo=3029
        sendCertError: "", //推送失败原因	varchar(1024) [e描述_1024]			y		推送失败原因
        writeoffCertificate: "", //冲销凭证号	varchar(64) [e描述_64]			y		冲销凭证号
        writeoffDate: "", //冲销日期	datetime [e时间]			y		冲销日期
        billReceiveRemark: "", //票据收到标识	int [b布尔型]			y	默认值:0票据收到标识
        receiveBillNo: "", //收据票据号	varchar(64) [e描述_64]			y		收据票据号
        billDate: "", //开票日期	datetime [e时间]			y		开票日期
        billFrom: "", //开票单位	varchar(64) [e描述_64]			y		开票单位
        writeOffReason: "", //冲销原因	int [e字典Int8]			y		冲销原因;03:冲销本期的凭证04:冲销以往期间的凭证
        isSendSap: "", //是否发送sap	int [b布尔型]			y	默认值:0是否发送sap
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
        attachmentCount: "",//附件数量
        serviceChargeBankCode:"",
        serviceChargeBankName:"",//手续费银行名称
        serviceChargeBankAccount:"",//手续费银行账号
        taxRate:"",//税率

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
      errorKey:[],
      isBusiness:'',
    };
  },
  methods: {
    ...mapMutations(["setBaseCurrencyRate", "setPaymentMain"]),
    //获取收款单抬头
    getPaymentMainDetail() {

      let self = this;
      if (self.id == 0) {
        this.setApplyDetailTitle();
        return;
      }

      getPaymentMain({ paymentCode: this.id }).then(res => {
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
          self.coin = {
            currencyCode: res.data.currencyCode
          };
          // receiverBankCode: "", 收款开户银行编码
          // receiverBankName: "",
          self.receiverBank = {
            bankCode: res.data.receiverBankCode,
            bankName: res.data.receiverBankName
          };
          self.companyBank = {
            bankCode: res.data.payBankCode,
            bankName: res.data.payBankName
          };
          //手续费银行
          self.companyBank2 = {
            bankCode: res.data.serviceChargeBankCode,
            bankName: res.data.serviceChargeBankName
          };
          self.subject = {
            name: res.data.payBankAccountName,
            code: res.data.payBankAccount
          };
          //付款银行现金流编码扣费
          self.payBankCashflow = {
            name: res.data.payBankCashflowName,
            code: res.data.payBankCashflowCode
          };
          self.feeAccount = {
            name: res.data.feeAccountName,
            code: res.data.feeAccountCode
          };
          self.feeBankAccount = {
            name: res.data.feeBankAccountName,
            code: res.data.feeBankAccountCode
          };
          //费用银行现金流编码扣费
          self.feeBankCashflow = {
            name: res.data.feeBankCashflowName,
            code: res.data.feeBankCashflowCode
          };
          self.filterType = { 1: 1, 0: 2 }[res.data.receiverType]; //设置收款方式过滤
          self.paymentDetail = res.data;

          this.warrantCode=res.data.warrantCode;//凭证号
          this.warrantMonth=res.data.warrantMonth; //期间
          this.writeoffWarrantCode=res.data.writeoffWarrantCode;//冲销凭证号
          this.writeoffWarrantMonth=res.data.writeoffWarrantMonth;//冲销期间
          self.$emit("getData", this.paymentDetail);
          this.setPaymentMain(this.paymentDetail);
          this.$store.state.paymentDetail.payAmtTotal=res.data.payAmtTotal;
          this.isBusiness=res.data.isBusinessPay;
          sessionStorage.setItem("isBusiness",res.data.isBusinessPay);
        }
      });
    },

    setApplyDetailTitle() {
      let self = this;
      let applyPayment = self.$store.state.paymentDetail.paymentMain;
      self.companyName = {
        companyId: applyPayment.companyId,
        companyCode: applyPayment.companyCode,
        companyName: applyPayment.companyName
      };
      self.branchName = {
        branchId: applyPayment.orgId,
        branchCode: applyPayment.orgCode,
        branchName: applyPayment.orgName,
        orgId: applyPayment.orgId,
        orgName: applyPayment.orgName,
        orgCode: applyPayment.orgCode
      };

      // payeeId: "", //	             收款单位id
      // receiverName: "",          		收款单位名称
      // receiverCode: "",                收款单位编码
      // receiverBankCode: "",        		收款开户银行编码
      // receiverBankName: "",          	收款开户银行名称
      // receiverBankAccount: "",           		收款开户银行账号

      self.paymentDetail = {
        ...this.paymentDetail,
        bizPersonName: applyPayment.bizPersonName,
        bizPersonCode: applyPayment.bizPersonCode,
        accountingYear: applyPayment.accountingYear,
        payDate: applyPayment.applyPayTime,
        hasPayApply: 1,
        payType: applyPayment.payType,
        paymentType: applyPayment.paymentType,
        moneyContent: applyPayment.moneyContent,
        isInterest: 1,
        payApplyCode: applyPayment.payApplyCode,
        payeeId: applyPayment.payeeId,
        receiverType: applyPayment.receiverType,
        receiverId: applyPayment.payeeId,
        receiverName: applyPayment.payeeName,
        receiverCode: applyPayment.payeeCompanyCode,
        receiverBankCode: applyPayment.payeeBankCode,
        receiverBankName: applyPayment.payeeBankCountry,
        receiverBankAccount: applyPayment.payeeBankAccount,
        serviceChargeBankCode:applyPayment.serviceChargeBankCode,
        serviceChargeBankName:applyPayment.serviceChargeBankName,//手续费银行名称
        serviceChargeBankAccount:applyPayment.serviceChargeBankAccount,//手续费银行账号
        taxRate:applyPayment.taxRate,//税率
        remark: applyPayment.remark,
        isBusinessPay:applyPayment.isBusinessPay //是否非业务单据
      };
      self.project = {
        projectName: applyPayment.projectName,
        projectCode: applyPayment.projectCode
      };
      self.receiverBank = {
        bankName: applyPayment.payeeBankCountry,
        bankCode: applyPayment.payeeBankCode
      };
      self.bizPerson = {
        empName: applyPayment.bizPersonName,
        empCode: applyPayment.bizPersonCode
      };
      self.coin = {
        currencyCode: applyPayment.currencyCode
      };
      //self.paymentDetail.baseCurrencyRate = applyPayment.baseCurrencyRate;
      this.getParitiesForIssue();
      this.isBusiness=applyPayment.isBusinessPay;
      sessionStorage.setItem("isBusiness",applyPayment.isBusinessPay);
      //if(applyPayment.isBusinessPay==1){
        //  self.paymentDetail.payAmtTotal = applyPayment.applyAmt;
        // self.paymentDetail.payAmtTotalRmb=applyPayment.applyAmtRmb;
        // self.paymentDetail.payAmtTotalBase=applyPayment.applyBaseAmt;
        this.$store.state.paymentDetail.payAmtTotal=applyPayment.applyAmt;
      //}
      self.paymentDetail.rmbCurrencyRate = applyPayment.rmbCurrencyRate;
      self.filterType = { 1: 1, 0: 2 }[applyPayment.receiverType]; //设置收款方式过滤
    },
         //根据公司id和业务币别获取本位币汇率
    getParitiesForIssue(){
        getBaseParitiesByCompanyId({
          companyId:this.companyName.companyId,
          fromCurrencyCode: this.coin.currencyCode,
      }).then((res) => {
        this.paymentDetail.baseCurrencyRate = res.data.parities;
        //this.setPaymentMain(this.paymentDetail);
      }).catch((err) => { })
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
          this.paymentDetail.baseCurrencyRate = res.data.parities;
        }
      });
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
        "currencyCode"
      ].forEach(ele => {
        this.paymentDetail[ele] = Obj[ele] ? Obj[ele] : this.paymentDetail[ele];
      });
      this.paymentDetail.payAmtTotal = this.$store.state.paymentDetail.payAmtTotal;
      //付款金额本位币
      this.paymentDetail.payAmtTotalBase = Number(this.payAmtTotalBase);
      //付款金额人民币
      this.paymentDetail.payAmtTotalRmb = Number(this.payAmtTotalRmb);
      // let eleNameObj = {
      //   companyId: "公司",
      //   orgId: "部门",
      //   bizPersonCode: "业务员",
      //   accountingYear: "年度",
      //   payDate: "付款日期",
      //   hasPayApply: "有无付款申请单",
      //   paymentType: "付款类别",
      //   receiverId: "收款单位",
      //   payType: "付款方式",
      //   currencyCode: "币别",
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
      if(!this.paymentDetail.accountingYear){
        this.errorKey.push('accountingYear');
      }
      if(!this.paymentDetail.payDate){
        this.errorKey.push('payDate');
      }
       if(!this.paymentDetail.paymentType){
        this.errorKey.push('paymentType');
      }
       if(this.paymentDetail.hasPayApply===''){
        this.errorKey.push('hasPayApply');
      }

       if(this.paymentDetail.payType===''){
        this.errorKey.push('payType');
      }
      if(this.paymentDetail.receiverName==''){
        this.errorKey.push('receiverName');
      }
       if(this.paymentDetail.attachmentCount===''){
        this.errorKey.push('attachmentCount');
      }
       if(!this.paymentDetail.baseCurrencyRate){
        this.errorKey.push('baseCurrencyRate');
      }
       if(!this.paymentDetail.rmbCurrencyRate){
        this.errorKey.push('rmbCurrencyRate');
      }
      if(!this.paymentDetail.payAmtTotal){
        this.errorKey.push('payAmtTotal');
      }
       if(!this.paymentDetail.payAmtTotalBase){
        this.errorKey.push('payAmtTotalBase');
      }
       if(!this.paymentDetail.payAmtTotalRmb){
        this.errorKey.push('payAmtTotalRmb');
      }
      if (!this.conUseBills) {
        // eleNameObj = {
        //   ...eleNameObj,
        //   receiverBankCode: "收款开户银行",
        //   receiverBankAccount: "银行账号",
        //   payBankCode: "付款银行",
        //   payBankAccountNo: "付款账号",
        //   payBankAccount: "付款科目",
        //   payBankCashflowCode: "付款银行现金流量码",//付款银行现金流量码
        // };
        if(!Object.keys(this.companyBank).length){
          this.errorKey.push('companyBank');
        }
        if(!this.paymentDetail.payBankAccountNo){
          this.errorKey.push('payBankAccountNo');
        }
        if(!Object.keys(this.subject).length){
          this.errorKey.push('subject');
        }
        if(!Object.keys(this.payBankCashflow).length){
          this.errorKey.push('payBankCashflow');
        }
        if (this.paymentDetail.paymentType == 10500050) {
         // delete eleNameObj.receiverBankCode;
         // delete eleNameObj.receiverBankAccount;
          //eleNameObj.taxRate="税率";
          if(this.paymentDetail.taxRate===''){
            this.errorKey.push('taxRate');
          }
        }else{
          if(!Object.keys(this.receiverBank).length){
            this.errorKey.push('receiverBank');
          }
          if(!this.paymentDetail.receiverBankAccount){
            this.errorKey.push('receiverBankAccount');
          }
        }
      }
      if (this.paymentDetail.serviceCharge > 0) {
        // eleNameObj = {
        //   ...eleNameObj,
        //   feeAccountCode: "费用科目",
        //   feeBankAccountCode: "费用银行科目",
        //   feeBankCashflowCode: "费用银行现金流量码", //费用银行现金流量名称
        //   serviceChargeBankName:"手续费银行名称",//手续费银行名称
        //   serviceChargeBankAccount:"手续费银行账号",
        // };
         if(!Object.keys(this.feeAccount).length){
          this.errorKey.push('feeAccount');
        }
        if(!Object.keys(this.feeBankAccount).length){
          this.errorKey.push('feeBankAccount');
        }
         if(!Object.keys(this.feeBankCashflow).length){
          this.errorKey.push('feeBankCashflow');
        }
         if(!Object.keys(this.companyBank2).length){
          this.errorKey.push('companyBank2');
        }
         if(!this.paymentDetail.serviceChargeBankAccount){
          this.errorKey.push('serviceChargeBankAccount');
        }
      }
      // if (this.$validateObj(this.paymentDetail, eleNameObj)) {
      //   this.$emit("getData", this.paymentDetail);
      //   return true;
      // } else {
      //   return false;
      // }
      if(this.paymentDetail.taxRate===''){
            this.errorKey.push('taxRate');
          }
      if(this.errorKey.length > 0) {
        this.$openWarning("必填信息请填完整");
        return false
      }else{
        this.$emit("getData", this.paymentDetail);
         return true;
      }
    },
    companyNameChangeHandler() {
      this.getParities();
    },
    //业务员
    bizPersonChangeHandler(value) {
      this.paymentDetail.bizPersonName = value.empName ? value.empName : "";
      this.paymentDetail.bizPersonCode = value.empCode ? value.empCode : "";
    },
    companyBankChangeHandler(value) {
      this.paymentDetail.payBankCode = value.bankCode;
      this.paymentDetail.payBankName = value.bankName;
      this.paymentDetail.payBankAccountNo = value.bankAccount;
    },
    companyBankChangeHandler2(value) {
      this.paymentDetail.serviceChargeBankCode = value.bankCode;
      this.paymentDetail.serviceChargeBankName = value.bankName;
      this.paymentDetail.serviceChargeBankAccount = value.bankAccount;
    },
    coinChangeHandler(value) {
      this.paymentDetail.currencyCode = value.currencyCode;
      this.getParities();
    },
    baseCurrencyRateChangeHandler(value) {
      this.setBaseCurrencyRate(value);
    },
    payTypeChangeHandler(value) {
      this.$store.state.paymentDetail.paymentMain.payType = value;
      this.setPaymentMain(this.$store.state.paymentDetail.paymentMain);
      this.$emit("payTypeChange");
      if (this.conUseBills) {
        this.paymentDetail = {
          ...this.paymentDetail,
          serviceCharge: "",
          feeAccountCode: "",
          feeAccountName: "",
          feeBankAccountCode: "",
          feeBankAccountName: ""
        };
        this.feeAccount = {
          name: "",
          code: ""
        };
        this.feeBankAccount = {
          name: "",
          code: ""
        };
      }
    },
    receiverBankChangeHandler(value) {
      this.paymentDetail = {
        ...this.paymentDetail,
        receiverBankAccount: value.bankAccount,
        receiverBankCode: value.bankCode, //	收款单位银行编码
        receiverBankName: value.bankName //	收款单位银行国家代码
      };
    },
    applyPayTimeChangehandle(value) {
      this.paymentDetail.accountingYear = value
        ? String(value.getFullYear())
        : "";
    },
    subjectChangeHandler(value) {
      this.paymentDetail = {
        ...this.paymentDetail,
        payBankAccount: value.code ? value.code : "",
        payBankAccountName: value.name ? value.name : ""
      };
    },
    payBankCashflowChangeHandler(value) {
      this.paymentDetail.payBankCashflowCode = value.code ? value.code : "";
      this.paymentDetail.payBankCashflowName = value.name ? value.name : "";
    },
    feeAccountChangeHandler(value) {
      this.paymentDetail = {
        ...this.paymentDetail,
        feeAccountCode: value.code ? value.code : "",
        feeAccountName: value.name ? value.name : ""
      };
    },
    feeBankAccountChangeHandler(value) {
      this.paymentDetail = {
        ...this.paymentDetail,
        feeBankAccountCode: value.code ? value.code : "",
        feeBankAccountName: value.name ? value.name : ""
      };
    },
    feeBankCashflowChangeHandler(value) {
      this.paymentDetail.feeBankCashflowCode = value.code ? value.code : "";
      this.paymentDetail.feeBankCashflowName = value.name ? value.name : "";
    },
    paymentTypeChangeHandler(value) {
      if (value == 10500050) {
        // receiverName: "", //收款单位名称	varchar(128) [e描述_128]			y		收款单位名称
        // receiverCode: "", //收款单位编码	varchar(32) [e描述_32]			y		收款单位编码
        // receiverBankCode: "", //收款开户银行编码	varchar(32) [e描述_32]			y		收款开户银行编码
        // receiverBankName: "", //收款开户银行名称	varchar(128) [e描述_128]			y		收款开户银行名称
        // receiverBankAccount: "", //收款开户银行账号	varchar(128) [e描述_128]			y		收款开户银行账号
        this.paymentDetail.receiverCode = "S00004";
        this.paymentDetail.receiverName = "海关";
        this.paymentDetail.receiverBankCode = "";
        this.paymentDetail.receiverBankCode = "";
        this.paymentDetail.receiverBankName = "";
        this.paymentDetail.receiverBankAccount = "";
        this.receiverBank = {};
      }
    },
    getData() {
      return this.paymentDetail;
    }
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    flag() {
      return this.$store.state.route.params.editFlag;
    },
    status() {
      return this.$route.params.status;
    },
    conUseBills() {
      return [10310010, 10310020, 10310045, 10310120].findIndex(
        item => item === this.paymentDetail.payType
      ) === -1
        ? false
        : true;
    },
    payAmtTotalBase() {
      let value = this.$calculationAmount(
        this.$store.state.paymentDetail.payAmtTotal,
        this.paymentDetail.baseCurrencyRate,
        "mul"
      );
      return value;
    },
    payAmtTotalRmb() {
      let value = this.$calculationAmount(
        this.$store.state.paymentDetail.payAmtTotal,
        this.paymentDetail.rmbCurrencyRate,
        "mul"
      );
      return value;
    }
  },
  // activated() {
  //   this.getPaymentMainDetail();
  // },
  mounted() {
    this.getPaymentMainDetail();
  }
};
</script>
<style lang="scss" scoped>
.index .inputRed .el-input--small .el-input__inner,.index .el-select .inputRed .el-input--small .el-input__inner{
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
    width:45% !important;
  }
}
.input-div{
  padding-left: 0;
}
</style>
