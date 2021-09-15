<template>
  <div class="input-div">
    <el-form :disabled="type!==4&&fiBillDiscount.status===10980010">
      <el-col :span="5" class="el-col el-col-required">
        <label required>贴现日期</label>
        <el-date-picker
          size="small"
          class="el-inputs"
           :class="errorKey.includes('discountDate') ? 'inputRed' : ''"
          v-model="fiBillDiscount.discountDate"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>贴现收款日期</label>
        <el-date-picker
          size="small"
          class="el-inputs"
           :class="errorKey.includes('discountDateReceipt') ? 'inputRed' : ''"
          v-model="fiBillDiscount.discountDateReceipt"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
      </el-col>
      <el-col :span="5" class="el-col el-col-required">
        <label required>贴现利率%</label>
        <el-input
          v-model="fiBillDiscount.discountRate"
          v-input-filter:price
          type="number"
          class="el-inputs"
           :class="errorKey.includes('discountRate') ? 'inputRed' : ''"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col el-col-required">
        <label required>贴现利息</label>
        <el-input :value="discountInterest" class="el-inputs"
         :class="errorKey.includes('discountInterest') ? 'inputRed' : ''"
        size="small" placeholder="请输入"></el-input>
      </el-col>
      <!-- 贴现开户银行 -->
      <company-bank-select
        :labelName="'贴现开户银行'"
        class="el-col el-col-5"
        :companyBank.sync="discountBank"
        :companyId="fiGatheringBill.companyId"
        @change="discountBankChangeHandler"
      ></company-bank-select>
      <el-col :span="5" class="el-col">
        <label>账户标识</label>
        <el-input
          v-model="fiBillDiscount.discountAccountIdentificatio"
          class="el-inputs"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>银行账号</label>
        <el-input
          v-model="fiBillDiscount.discountBankAccountNo"
          class="el-inputs"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <accountingSubject-select
        :labelName="'银行科目'"
        style="width:51.8%;marginLeft:-4%;"
        :longNumber="1002"
        class="el-col el-col-10"
        :subject.sync="discountBankSubject"
        @change="discountBankSubjectChangeHandler"
      ></accountingSubject-select>
      <el-col :span="5" class="el-col" style="text-align:left;">
        <label>是否买方付息</label>
        <el-checkbox
          style="height:32px;line-height:32px;text-align:left;padding-left:2%"
          v-model="fiBillDiscount.isPayInterest"
          :true-label="1"
          :false-label="0"
        ></el-checkbox>
      </el-col>
      <accountingSubject-select
        :labelName="'贴现利息科目'"
        :longNumber="6603"
        style="width:51.8%;marginLeft:-4%;"
        class="el-col el-col-10"
        :subject.sync="discountInterestSubject"
        @change="discountInterestSubjectChangeHandler"
      ></accountingSubject-select>
      <cashFlow-select
        :labelName="'贴息现金流量码'"
        class="el-col el-col-5"
        :cashFlow.sync="discountInterestCashFlow"
        @change="discountInterestCashFlowChangeHandler"
      ></cashFlow-select>
      <el-col :span="5" class="el-col">
        <label>贴现延迟天数</label>
        <el-input
          v-model="fiBillDiscount.discountDelayDays"
          type="number"
          v-input-filter:int
          class="el-inputs"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>贴现净额</label>
        <el-input :value="netDiscount" class="el-inputs" size="small" placeholder="请输入"></el-input>
      </el-col>
      <cashFlow-select
        :labelName="'贴现净额流量码'"
        class="el-col el-col-5"
        :cashFlow.sync="discountNetCashcFlow"
        @change="discountNetCashcFlowChangeHandler"
      ></cashFlow-select>
      <el-col :span="5" class="el-col">
        <label>手续费</label>
        <el-input
          v-input-filter:price
          v-model="fiBillDiscount.discountCommission"
          type="number"
          class="el-inputs"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <accountingSubject-select
        :labelName="'手续费科目'"
        style="width:51.8%;marginLeft:-4%;"
        class="el-col el-col-10"
        :longNumber="6603"
        :subject.sync="discountFeeSubject"
        @change="discountFeeSubjectChangeHandler"
      ></accountingSubject-select>
      <cashFlow-select
        :labelName="'手续费现金流量码'"
        class="el-col el-col-5"
        :cashFlow.sync="feeCashFlow"
        @change="feeCashFlowChangeHandler"
      ></cashFlow-select>
      <el-col :span="5" class="el-col">
        <label>状态</label>
        <el-select
          v-model="fiBillDiscount.status"
          placeholder="请选择"
          size="small"
          disabled
          clearable
        >
          <el-option
            v-for="item in options"
            :key="item.dict_key"
            :label="item.dict_value"
            :value="item.dict_key"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-col>
    </el-form>
    <el-col :span="5" class="el-col">
      <label>过账日期</label>
      <accountingDate-select
        :disable="fiBillDiscount.status!==10980005"
        :companyId="fiGatheringBill.companyId"
        :accountingDate.sync="fiBillDiscount.postDate"
         :class="errorKey.includes('postDate') ? 'inputRed' : ''"
      ></accountingDate-select>
    </el-col>
    <el-col :span="5" class="el-col">
      <label>冲销原因</label>
      <write-off-reason-select
        :disable="fiBillDiscount.status!==10980010"
        :writeOffReason.sync="fiBillDiscount.writeOffReason"
         :class="errorKey.includes('writeOffReason') ? 'inputRed' : ''"
      ></write-off-reason-select>
    </el-col>
    <el-col :span="5" class="el-col">
      <label>冲销日期</label>
      <accountingDate-select
        :disable="fiBillDiscount.status!==10980010"
        :companyId="fiGatheringBill.companyId"
        :accountingDate.sync="fiBillDiscount.writeOffDate"
        :class="errorKey.includes('writeOffDate') ? 'inputRed' : ''"
      ></accountingDate-select>
    </el-col>
    <el-col :span="5" class="el-col el-col-required">
      <label required>附件数量</label>
      <el-input
        :disabled="type!==4&&fiBillDiscount.status===10980010"
        v-model="fiBillDiscount.attachmentCount"
        v-input-filter:int
        type="number"
        class="el-inputs"
         :class="errorKey.includes('attachmentCount') ? 'inputRed' : ''"
        size="small"
        placeholder="请输入"
      ></el-input>
    </el-col>
  </div>
</template>
<script>
import companyBankSelect from "@/views/fundsManage/conponents/companyBankSelect";
import accountingSubjectSelect from "@/views/fundsManage/conponents/accountingSubjectSelect";
import cashFlowSelect from "@/views/fundsManage/conponents/cashFlowSelect";
import writeOffReasonSelect from "@/views/fundsManage/conponents/writeOffReasonSelect";
import accountingDateSelect from "@/views/fundsManage/conponents/accountingDateSelect";
export default {
  name: "tabConThird",
  components: {
    companyBankSelect,
    accountingSubjectSelect,
    cashFlowSelect,
    writeOffReasonSelect,
    accountingDateSelect
  },
  props: {
    fiGatheringBill: {
      type: Object,
      default: Object
    }
  },
  data() {
    return {
      discountBank: {}, //贴现开户银行
      discountBankSubject: {}, //贴现银行科目
      discountInterestSubject: {}, //贴现利息科目
      discountInterestCashFlow: {}, // 贴现利息现金流量代码
      discountNetCashcFlow: {}, //贴现净额现金流量代码
      discountFeeSubject: {}, //贴现手续费科目
      feeCashFlow: {}, //手续费现金流量代码
      fiBillDiscount: {
        id: "", //id	varchar(32) [e描述_32]	y		y		主键id
        receivableId: "", //应收票据id	varchar(32) [e描述_32]			y		应收票据id
        discountDate: "", //贴现日期	datetime [e时间]			y		贴现日期
        discountDelayDays: "", //贴现延迟天数	decimal(20,6) [d(20,6)小数]			y		贴现延迟天数
        discountRate: "", //贴现利率	decimal(20,6) [d(20,6)小数]			y		贴现利率
        discountInterest: "", //贴现利息	decimal(20,6) [d(20,6)小数]			y		贴现利息
        isPayInterest: "", //是否买方付息	int [b布尔型]			y	默认值:0是否买方付息
        discountInterestAccount: "", //贴现利息科目	varchar(16) [e描述_16]			y		贴现利息科目
        discountInterestAccountName: "", //贴现利息科目名称
        discountInterestCashcode: "", //贴现利息现金流量代码	varchar(8) [e描述_8]			y		贴现利息现金流量代码
        discountInterestCashname: "", //贴现利息现金流量名称
        netDiscount: "", //贴现净额   自动计算，等于票据金额-贴现利息
        discountNetCashcode: "", //贴现净额现金流量代码	varchar(8) [e描述_8]			y		贴现净额现金流量代码
        discountNetCashname: "", //贴现净额现金流量名称
        discountCommission: "", //贴现手续费	decimal(20,6) [d(20,6)小数]			y		贴现手续费
        discountFeeAccount: "", //贴现手续费科目	varchar(16) [e描述_16]			y		贴现手续费科目
        discountFeeAccountName: "", //贴现手续费科目名称
        feeCashCode: "", //手续费现金流量代码	varchar(8) [e描述_8]			y		手续费现金流量代码,默认129999，并可手工修改
        feeCashName: "", // 手续费现金流量代码名称
        discountBankCode: "", //贴现开户银行编码	varchar(32) [e描述_32]			y		贴现开户银行编码
        discountBankName: "", //贴现开户银行名称	varchar(128) [e描述_128]			y		贴现开户银行名称
        discountBankAccountNo: "", //贴现银行帐号	varchar(64) [e描述_64]			y		贴现银行帐号
        discountBankAccount: "", //贴现银行科目	varchar(64) [e描述_64]			y		贴现银行科目
        discountBankAccountName: "", //贴现银行科目名称
        discountAccountIdentificatio: "", //贴现账户标识	varchar(8) [e描述_8]			y		贴现账户标识
        discountCertificateDate: "", //贴现凭证日期	datetime [e时间]			y		贴现凭证日期
        discountWriteoffProof: "", //贴现冲销凭证	varchar(64) [e描述_64]			y		贴现冲销凭证
        discountWriteDate: "", //贴现冲销日期	datetime [e时间]			y		贴现冲销日期
        discountOrgCode: "", //贴现部门编码	varchar(32) [e描述_32]			y		部门编码
        discountDateReceipt: "", //贴现收款日期	datetime [e时间]			y		贴现收款日期
        isPost: "", //过账标志	int [b布尔型]			y	默认值:0过账标志（sap发送标志）（0,否，1是）
        isInactive: "", //是否停用	int [b布尔型]			y	默认值:0是否停用
        postOperationDate: "", //过账操作日期	datetime [e时间]			y		过账操作日期
        postBy: "", //过账者	varchar(32) [e描述_32]			y		过账者
        postDate: "", //过账日期	datetime [e时间]			y		过账日期
        accountingCertificate: "", //会计凭证	varchar(64) [e描述_64]			y		会计凭证
        certStatus: "", //凭证标识	int [e字典Int8]			y		凭证标识 dictNo=3029
        sendCertError: "", //推送失败原因	varchar(1024) [e描述_1024]			y		推送失败原因
        writeoffBy: "", //冲销者	varchar(32) [e描述_32]			y		冲销者
        writeoffCertificate: "", //冲销凭证号	varchar(64) [e描述_64]			y		冲销凭证号
        writeOffDate: "", //冲销日期	datetime [e时间]			y		冲销日期
        writeOffReason: "", //冲销原因	int [e字典Int8]			y		冲销原因;03:冲销本期的凭证04:冲销以往期间的凭证
        createdBy: "", //创建者	varchar(32) [e描述_32]			y		创建者
        createdName: "", //创建者名称	varchar(64) [e描述_64]			y		创建者名称
        createdTime: "", //创建时间	datetime [e时间]			y		创建时间
        updatedBy: "", //更新者	varchar(32) [e描述_32]			y		更新者
        updatedName: "", //更新者名称	varchar(64) [e描述_64]			y		更新者名称
        updatedTime: "", //更新时间	datetime [e时间]			y		更新时间
        version: "", //数据版本	int [e数字Int10]			y	默认值:0表示当前数据版本，用于控制业务并发，无其它业务含义
        status: "", //单据状态
        attachmentCount: "" //附件数量
      },
      options: [
        {
          dict_key: 10980005,
          dict_value: "保存",
          dict_code: "10990005"
        },
        {
          dict_key: 10980010,
          dict_value: "已过账",
          dict_code: "10990010"
        },
        {
          dict_key: 10980015,
          dict_value: "已冲销",
          dict_code: "10990015"
        }
      ],
      errorKey:[]
    };
  },
  methods: {
    discountBankChangeHandler(value) {
      this.fiBillDiscount.discountBankName = value.bankName;
      this.fiBillDiscount.discountBankCode = value.bankCode;
      this.fiBillDiscount.discountAccountIdentificatio = value.accountIdentity;
      this.fiBillDiscount.discountBankAccountNo = value.bankAccount;
    },
    discountBankSubjectChangeHandler(value) {
      this.fiBillDiscount.discountBankAccount = value.code ? value.code : "";
      this.fiBillDiscount.discountBankAccountName = value.name
        ? value.name
        : "";
    },
    discountInterestSubjectChangeHandler(value) {
      this.fiBillDiscount.discountInterestAccount = value.code
        ? value.code
        : "";
      this.fiBillDiscount.discountInterestAccountName = value.name
        ? value.name
        : "";
    },
    discountInterestCashFlowChangeHandler(value) {
      this.fiBillDiscount.discountInterestCashcode = value.code
        ? value.code
        : "";
      this.fiBillDiscount.discountInterestCashname = value.name
        ? value.name
        : "";
    },
    discountNetCashcFlowChangeHandler(value) {
      this.fiBillDiscount.discountNetCashcode = value.code ? value.code : "";
      this.fiBillDiscount.discountNetCashname = value.name ? value.name : "";
    },
    discountFeeSubjectChangeHandler(value) {
      this.fiBillDiscount.discountFeeAccount = value.code ? value.code : "";
      this.fiBillDiscount.discountFeeAccountName = value.name ? value.name : "";
    },
    feeCashFlowChangeHandler(value) {
      this.fiBillDiscount.feeCashCode = value.code ? value.code : "";
      this.fiBillDiscount.feeCashName = value.name ? value.name : "";
    },
    postData() {
      let params = this.fiBillDiscount;
      this.fiBillDiscount.receivableId = this.id;
      this.fiBillDiscount.discountInterest = this.discountInterest;
      this.fiBillDiscount.netDiscount = this.netDiscount;
      // let eleNameObj = {
      //   discountDate: "贴现日期",
      //   discountRate: "贴现利率",
      //   discountInterest: "贴现利息",
      //   attachmentCount: "附件数量"
      // };
      // if (this.$validateObj(this.fiBillDiscount, eleNameObj)) {
      //   return this.fiBillDiscount;
      // } else {
      //   return false;
      // }
      this.errorKey=[];
      if(!this.fiBillDiscount.discountDate){
          this.errorKey.push('discountDate');
      }
      if(!this.fiBillDiscount.discountRate){
          this.errorKey.push('discountRate');
      }
      if(!this.fiBillDiscount.discountInterest){
          this.errorKey.push('discountInterest');
      }
      if(!this.fiBillDiscount.attachmentCount){
          this.errorKey.push('attachmentCount');
      }
      if(this.errorKey.length>0){
        this.$openWarning("必填信息请填完整");
        return false
      }else{
        return this.fiBillDiscount;
      }
    },
    post() {
      let params = this.fiBillDiscount;
      this.fiBillDiscount.receivableId = this.id;
      this.fiBillDiscount.discountInterest = this.discountInterest;
      this.fiBillDiscount.netDiscount = this.netDiscount;
      // let eleNameObj = {
      //   discountDate: "贴现日期",
      //   discountRate: "贴现利率",
      //   discountInterest: "贴现利息",
      //   postDate: "过账日期",
      //   attachmentCount: "附件数量"
      // };
      if (this.fiBillDiscount.status !== 10980005) {
        this.$message({ message: "只有保存状态才能过账", type: "warning" });
        return false;
      }
      // if (this.$validateObj(this.fiBillDiscount, eleNameObj)) {
      //   return this.fiBillDiscount;
      // } else {
      //   return false;
      // }
      this.errorKey=[];
      if(!this.fiBillDiscount.discountDate){
          this.errorKey.push('discountDate');
      }
      if(!this.fiBillDiscount.discountRate){
          this.errorKey.push('discountRate');
      }
      if(!this.fiBillDiscount.discountInterest){
          this.errorKey.push('discountInterest');
      }
      if(!this.fiBillDiscount.attachmentCount){
          this.errorKey.push('attachmentCount');
      }
      if(!this.fiBillDiscount.postDate){
          this.errorKey.push('postDate');
      }
      if(this.errorKey.length>0){
        this.$openWarning("必填信息请填完整");
        return false
      }else{
        return this.fiBillDiscount;
      }
    },
    writeOff() {
      let params = this.fiBillDiscount;
      this.fiBillDiscount.receivableId = this.id;
      this.fiBillDiscount.discountInterest = this.discountInterest;
      this.fiBillDiscount.netDiscount = this.netDiscount;
      // let eleNameObj = {
      //   discountDate: "贴现日期",
      //   discountRate: "贴现利率",
      //   discountInterest: "贴现利息",
      //   postDate: "过账日期",
      //   writeOffReason: "冲销原因",
      //   writeOffDate: "冲销日期",
      //   attachmentCount: "附件数量"
      // };
      if (this.fiBillDiscount.status !== 10980010) {
        this.$message({ message: "只有过账才能冲销", type: "warning" });
        return false;
      }
      // if (this.$validateObj(this.fiBillDiscount, eleNameObj)) {
      //   return this.fiBillDiscount;
      // } else {
      //   return false;
      // }
      this.errorKey=[];
      if(!this.fiBillDiscount.discountDate){
          this.errorKey.push('discountDate');
      }
      if(!this.fiBillDiscount.discountRate){
          this.errorKey.push('discountRate');
      }
      if(!this.fiBillDiscount.discountInterest){
          this.errorKey.push('discountInterest');
      }
      if(!this.fiBillDiscount.attachmentCount){
          this.errorKey.push('attachmentCount');
      }
      if(!this.fiBillDiscount.postDate){
          this.errorKey.push('postDate');
      }
       if(!this.fiBillDiscount.writeOffDate){
          this.errorKey.push('writeOffDate');
      }
       if(!this.fiBillDiscount.writeOffReason){
          this.errorKey.push('writeOffReason');
      }
      if(this.errorKey.length>0){
        this.$openWarning("必填信息请填完整");
        return false
      }else{
        return this.fiBillDiscount;
      }
    }
  },
  computed: {
    type() {
      return this.$store.state.route.params.type;
    },
    discountInterest() {
      return (
        (this.fiGatheringBill.instrumentAmt
          ? this.fiGatheringBill.instrumentAmt
          : 0) *
        this.fiBillDiscount.discountRate *
        0.01
      ).toFixed(2);
    },
    netDiscount() {
      return (
        (this.fiGatheringBill.instrumentAmt
          ? this.fiGatheringBill.instrumentAmt
          : 0) - this.discountInterest
      ).toFixed(2);
    },
    id() {
      return this.$store.state.route.params.id;
    }
  },
  watch: {
    fiGatheringBill(val) {
      if (val.hasOwnProperty("fiBillDiscount")) {
        this.fiBillDiscount = JSON.parse(JSON.stringify(val.fiBillDiscount));
        this.discountBank = {
          bankCode: val.fiBillDiscount.discountBankCode, //贴现银行编码
          bankName: val.fiBillDiscount.discountBankName //贴现银行名称
        };
        this.discountBankSubject = {
          name: val.fiBillDiscount.discountBankAccountName,
          code: val.fiBillDiscount.discountBankAccount
        };
        this.discountInterestSubject = {
          name: val.fiBillDiscount.discountInterestAccountName,
          code: val.fiBillDiscount.discountInterestAccount
        };
        this.discountInterestCashFlow = {
          name: val.fiBillDiscount.discountInterestCashname,
          code: val.fiBillDiscount.discountInterestCashcode
        };
        this.discountNetCashcFlow = {
          name: val.fiBillDiscount.discountNetCashname,
          code: val.fiBillDiscount.discountNetCashcode
        };
        this.discountFeeSubject = {
          name: val.fiBillDiscount.discountFeeAccountName,
          code: val.fiBillDiscount.discountFeeAccount
        };
        this.feeCashFlow = {
          name: val.fiBillDiscount.feeCashName,
          code: val.fiBillDiscount.feeCashCode
        };
      }
    }
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
      width: 62%;
    }
  label{
    width:38%;
  }
}
</style>
