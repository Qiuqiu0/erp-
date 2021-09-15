<template>
  <div class="input-div">
    <el-form :disabled="type!==5&&fiBillCollection.status===11000010">
      <el-col :span="5" class="el-col el-col-required">
        <label required>托收日期</label>
        <el-date-picker
          size="small"
          class="el-inputs"
          :class="errorKey.includes('collectionDate') ? 'inputRed' : ''"
          v-model="fiBillCollection.collectionDate"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
      </el-col>
      <el-col :span="5" class="el-col el-col-required">
        <label required>实际收款日期</label>
        <el-date-picker
          size="small"
          class="el-inputs"
          :class="errorKey.includes('collectionGatheringDate') ? 'inputRed' : ''"
          v-model="fiBillCollection.collectionGatheringDate"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>托收退回日期</label>
        <el-date-picker
          size="small"
          class="el-inputs"
          v-model="fiBillCollection.collectionReturnDate"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
      </el-col>
      <!-- 托收银行银行 -->
      <company-bank-select
        :labelName="'托收银行'"
        required
        class="el-col el-col-5 el-col-required"
        :class="errorKey.includes('collectionBank') ? 'inputRed' : ''"
        :companyBank.sync="collectionBank"
        :companyId="fiGatheringBill.companyId"
        @change="collectionBankChangeHandler"
      ></company-bank-select>
      <el-col :span="5" class="el-col el-col-required">
        <label required>账户标识</label>
        <el-input
          v-model="fiBillCollection.collectionAccountIdentificatio"
          class="el-inputs"
            :class="errorKey.includes('collectionAccountIdentificatio') ? 'inputRed' : ''"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col el-col-required">
        <label required>银行账号</label>
        <el-input
          v-model="fiBillCollection.collectionBankAccountNo"
          class="el-inputs"
            :class="errorKey.includes('collectionBankAccountNo') ? 'inputRed' : ''"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <accountingSubject-select
        :labelName="'银行科目'"
        style="width:51.8%;marginLeft:-4%;"
        :longNumber="1002"
        class="el-col el-col-10"
        :subject.sync="collectionBankSubject"
        @change="collectionBankSubjectChangeHandler"
      ></accountingSubject-select>
      <cashFlow-select
        :labelName="'现金流量代码'"
        class="el-col el-col-5"
        :cashFlow.sync="collectionCashFlow"
        @change="collectionCashFlowChangeHandler"
      ></cashFlow-select>
      <el-col :span="5" class="el-col">
        <label>手续费</label>
        <el-input
          v-model="fiBillCollection.collectionCharge"
          v-input-filter:price
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
        :longNumber="660309"
        :subject.sync="collectionFeeSubject"
        @change="collectionFeeSubjectChangeHandler"
      ></accountingSubject-select>
      <cashFlow-select
        :labelName="'手续费现金流量码'"
        class="el-col el-col-5"
        :cashFlow.sync="collectionFeeCashFlow"
        @change="collectionFeeCashFlowChangeHandler"
      ></cashFlow-select>
      <el-col :span="5" class="el-col">
        <label>状态</label>
        <el-select
          v-model="fiBillCollection.status"
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
    <el-col :span="5" class="el-col">
      <label>过账日期</label>
      <accountingDate-select
       :class="errorKey.includes('postDate') ? 'inputRed' : ''"
        :disable="fiBillCollection.status!==11000005"
        :companyId="fiGatheringBill.companyId"
        :accountingDate.sync="fiBillCollection.postDate"
      ></accountingDate-select>
    </el-col>
    <el-col :span="5" class="el-col">
      <label>冲销原因</label>
      <write-off-reason-select
      :class="errorKey.includes('writeOffReason') ? 'inputRed' : ''"
        :disable="fiBillCollection.status!==11000010"
        :writeOffReason.sync="fiBillCollection.writeOffReason"
      ></write-off-reason-select>
    </el-col>
    </el-form>
    <el-col :span="5" class="el-col">
      <label>冲销日期</label>
      <accountingDate-select
        :disable="fiBillCollection.status!==11000010"
        :companyId="fiGatheringBill.companyId"
         :class="errorKey.includes('writeOffDate') ? 'inputRed' : ''"
        :accountingDate.sync="fiBillCollection.writeOffDate"
      ></accountingDate-select>
    </el-col>
    <el-col :span="5" class="el-col el-col-required">
      <label required>附件数量</label>
      <el-input
        :disabled="type!==5&&fiBillCollection.status===11000010"
        v-model="fiBillCollection.attachmentCount"
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
  name: "tabConFifth",
  components: {
    companyBankSelect,
    writeOffReasonSelect,
    accountingDateSelect,
    accountingSubjectSelect,
    cashFlowSelect
  },
  props: {
    fiGatheringBill: {
      type: Object,
      default: Object
    }
  },
  data() {
    return {
      collectionBank: {}, //托收银行
      collectionBankSubject: {}, //托收银行科目
      collectionCashFlow: {}, //托收现金流量代码
      collectionFeeSubject: {}, //托收手续费科目
      collectionFeeCashFlow: {}, //托收手续费现金流量代码
      fiBillCollection: {
        id: "", //id	varchar(32) [e描述_32]	y		y		主键id
        receivableId: "", //应收票据id	varchar(32) [e描述_32]			y		应收票据id
        collectionBankCode: "", //托收开户银行编码	varchar(32) [e描述_32]			y		托收开户银行编码
        collectionBankName: "", //托收开户银行名称	varchar(128) [e描述_128]			y		托收开户银行名称
        collectionAccountIdentificatio: "", //托收帐号标识	varchar(8) [e描述_8]			y		托收帐号标识
        collectionBankAccountNo: "", //托收银行帐号	varchar(64) [e描述_64]			y		托收银行帐号
        collectionBankAccount: "", //托收银行科目	varchar(64) [e描述_64]			y		托收银行科目
        collectionBankAccountName: "", //托收银行科目名称
        collectionCashCode: "", //托收现金流量代码	varchar(8) [e描述_8]			y		托收现金流量代码
        collectionCashName: "", //托收现金流量代码名称
        collectionCharge: "", //托收手续费	decimal(20,6) [d(20,6)小数]			y		托收手续费
        collectionFeeSubject: "", //托收手续费科目	varchar(16) [e描述_16]			y		托收手续费科目
        collectionFeeSubjectName: "", //托收手续费科目名称
        collectionFeeCashCode: "", //托收手续费现金流量代码	varchar(8) [e描述_8]			y		托收手续费现金流量代码
        collectionFeeCashName: "", //托收手续费现金流量名称
        collectionOrgId: "", //托收部门id	varchar(32) [e描述_32]			y		手续费考核部门id
        collectionOrgCode: "", //托收部门编码	varchar(32) [e描述_32]			y		手续费考核部门编码
        collectionOrgName: "", //托收部门名称	varchar(128) [e描述_128]			y		手续费考核部门名称
        collectionDate: "", //托收日期	datetime [e时间]			y		托收日期
        collectionGatheringDate: "", //托收收款日期	datetime [e时间]			y		托收收款日期
        collectionReturnDate: "", //托收退回日期	datetime [e时间]			y		托收退回日期
        collectionAccountingProof: "", //托收会计凭证	varchar(16) [e描述_16]			y		托收会计凭证
        collectionCertificateDate: "", //托收凭证日期	datetime [e时间]			y		托收凭证日期
        collectionWriteoffProof: "", //托收冲销凭证	varchar(16) [e描述_16]			y		托收冲销凭证
        collectionWriteoffDate: "", //托收冲销日期	datetime [e时间]			y		托收冲销日期
        isPost: "", //过账标志	int [b布尔型]			y	默认值:0过账标志（sap发送标志）（0,否，1是）
        postBy: "", //过账者	varchar(32) [e描述_32]			y		过账者
        writeoffBy: "", //冲销者	varchar(32) [e描述_32]			y		冲销者
        accountingCertificate: "", //会计凭证	varchar(64) [e描述_64]			y		会计凭证
        postDate: "", //过账日期	datetime [e时间]			y		过账日期
        postOperationDate: "", //过账操作日期	datetime [e时间]			y		过账操作日期
        certStatus: "", //凭证标识	int [e字典Int8]			y		凭证标识 dictNo=3029
        sendCertError: "", //推送失败原因	varchar(1024) [e描述_1024]			y		推送失败原因
        writeoffCertificate: "", //冲销凭证号	varchar(64) [e描述_64]			y		冲销凭证号
        writeOffDate: "", //冲销日期	datetime [e时间]			y		冲销日期
        writeOffReason: "", //冲销原因	int [e字典Int8]			y		dict_4012 冲销原因;03:冲销本期的凭证04:冲销以往期间的凭证
        remark: "", //备注	varchar(512) [e描述_512]			y		备注
        isInactive: "", //是否停用	int [b布尔型]			y	默认值:0是否停用，0表示激活状态，1表示停用，2表示作废
        createdBy: "", //创建者	varchar(32) [e描述_32]			y		创建者
        createdName: "", //创建者名称	varchar(64) [e描述_64]			y		创建者名称
        createdTime: "", //创建时间	datetime [e时间]			y		创建时间
        updatedBy: "", //更新者	varchar(32) [e描述_32]			y		更新者
        updatedName: "", //更新者名称	varchar(64) [e描述_64]			y		更新者名称
        updatedTime: "", //更新时间	datetime [e时间]			y		更新时间
        version: "", //数据版本	int [e数字Int10]			y	默认值:0数据版本
        status: "", //单据状态
        attachmentCount: "" //附件数量
      },
      options: [
        {
          dict_key: 11000005,
          dict_value: "保存",
          dict_code: "10990005"
        },
        {
          dict_key: 11000010,
          dict_value: "已过账",
          dict_code: "10990010"
        },
        {
          dict_key: 11000015,
          dict_value: "已冲销",
          dict_code: "10990015"
        }
      ],
      errorKey:[],
    };
  },
  methods: {
    collectionBankChangeHandler(value) {
      this.fiBillCollection.collectionBankName = value.bankName;
      this.fiBillCollection.collectionBankCode = value.bankCode;
      this.fiBillCollection.collectionAccountIdentificatio =
        value.bankSwiftCode;
      this.fiBillCollection.collectionBankAccountNo = value.bankAccount;
    },
    collectionBankSubjectChangeHandler(value) {
      this.fiBillCollection.collectionBankAccount = value.code
        ? value.code
        : "";
      this.fiBillCollection.collectionBankAccountName = value.name
        ? value.name
        : "";
    },
    collectionCashFlowChangeHandler(value) {
      this.fiBillCollection.collectionCashCode = value.code ? value.code : "";
      this.fiBillCollection.collectionCashName = value.name ? value.name : "";
    },
    collectionFeeSubjectChangeHandler(value) {
      this.fiBillCollection.collectionFeeSubject = value.code ? value.code : "";
      this.fiBillCollection.collectionFeeSubjectName = value.name
        ? value.name
        : "";
    },
    collectionFeeCashFlowChangeHandler(value) {
      this.fiBillCollection.collectionFeeCashCode = value.code
        ? value.code
        : "";
      this.fiBillCollection.collectionFeeCashName = value.name
        ? value.name
        : "";
    },
    postData() {
      let params = this.fiBillCollection;
      this.fiBillCollection.receivableId = this.id;
      this.fiBillCollection.discountInterest = this.discountInterest;
      this.fiBillCollection.netDiscount = this.netDiscount;
      // let eleNameObj = {
      //   collectionDate: "托收日期",
      //   collectionGatheringDate: "实际收款日期",
      //   collectionBankCode: "托收银行",
      //   collectionAccountIdentificatio: "账户标识",
      //   collectionBankAccountNo: "银行账号",
      //   attachmentCount: "附件数量"
      // };
      // if (this.$validateObj(this.fiBillCollection, eleNameObj)) {
      //   return this.fiBillCollection;
      // } else {
      //   return false;
      // }
       this.errorKey=[];
      if(!Object.keys(this.collectionBank).length){
        this.errorKey.push('collectionBank');
      }
      if(!this.fiBillCollection.collectionDate){
        this.errorKey.push('collectionDate');
      }
      if(!this.fiBillCollection.collectionGatheringDate){
        this.errorKey.push('collectionGatheringDate');
      }
      if(!this.fiBillCollection.collectionAccountIdentificatio){
        this.errorKey.push('collectionAccountIdentificatio');
      }
      if(!this.fiBillCollection.collectionBankAccountNo){
        this.errorKey.push('collectionBankAccountNo');
      }
      if(!this.fiBillCollection.attachmentCount){
         this.errorKey.push('attachmentCount');
      }
      if(this.errorKey.length > 0) {
        this.$openWarning("必填信息请填完整");
        return false
      }else{
        return this.fiBillCollection;
      }
    },
    post() {
      let params = this.fiBillCollection;
      this.fiBillCollection.receivableId = this.id;
      this.fiBillCollection.discountInterest = this.discountInterest;
      this.fiBillCollection.netDiscount = this.netDiscount;
      // let eleNameObj = {
      //   collectionDate: "托收日期",
      //   collectionGatheringDate: "实际收款日期",
      //   collectionBankCode: "托收银行",
      //   collectionAccountIdentificatio: "账户标识",
      //   collectionBankAccountNo: "银行账号",
      //   postDate: "过账日期",
      //   attachmentCount: "附件数量"
      // };
       this.errorKey=[];
      if(!Object.keys(this.collectionBank).length){
        this.errorKey.push('collectionBank');
      }
      if(!this.fiBillCollection.collectionDate){
        this.errorKey.push('collectionDate');
      }
      if(!this.fiBillCollection.collectionGatheringDate){
        this.errorKey.push('collectionGatheringDate');
      }
      if(!this.fiBillCollection.collectionAccountIdentificatio){
        this.errorKey.push('collectionAccountIdentificatio');
      }
      if(!this.fiBillCollection.collectionBankAccountNo){
        this.errorKey.push('collectionBankAccountNo');
      }
      if(!this.fiBillCollection.attachmentCount){
         this.errorKey.push('attachmentCount');
      }
      if(!this.fiBillCollection.postDate){
         this.errorKey.push('postDate');
      }
      if (this.fiBillCollection.status !== 11000005) {
        this.$message({ message: "只有保存状态才能过账", type: "warning" });
        return false;
      }
      // if (this.$validateObj(this.fiBillCollection, eleNameObj)) {
      //   return this.fiBillCollection;
      // } else {
      //   return false;
      // }
       if(this.errorKey.length > 0) {
        this.$openWarning("必填信息请填完整");
        return false
      }else{
        return this.fiBillCollection;
      }
    },
    writeOff() {
      let params = this.fiBillCollection;
      this.fiBillCollection.receivableId = this.id;
      this.fiBillCollection.discountInterest = this.discountInterest;
      this.fiBillCollection.netDiscount = this.netDiscount;
      // let eleNameObj = {
      //   collectionDate: "托收日期",
      //   collectionGatheringDate: "实际收款日期",
      //   collectionBankCode: "托收银行",
      //   collectionAccountIdentificatio: "账户标识",
      //   collectionBankAccountNo: "银行账号",
      //   postDate: "过账日期",
      //   writeOffReason: "冲销原因",
      //   writeOffDate: "冲销日期",
      //   attachmentCount: "附件数量"
      // };
      if (this.fiBillCollection.status !== 11000010) {
        this.$message({ message: "只有过账才能冲销", type: "warning" });
        return false;
      }
       this.errorKey=[];
      if(!Object.keys(this.collectionBank).length){
        this.errorKey.push('collectionBank');
      }
      if(!this.fiBillCollection.collectionDate){
        this.errorKey.push('collectionDate');
      }
      if(!this.fiBillCollection.collectionGatheringDate){
        this.errorKey.push('collectionGatheringDate');
      }
      if(!this.fiBillCollection.collectionAccountIdentificatio){
        this.errorKey.push('collectionAccountIdentificatio');
      }
      if(!this.fiBillCollection.collectionBankAccountNo){
        this.errorKey.push('collectionBankAccountNo');
      }
      if(!this.fiBillCollection.attachmentCount){
         this.errorKey.push('attachmentCount');
      }
      if(!this.fiBillCollection.writeOffDate){
         this.errorKey.push('writeOffDate');
      }
       if(!this.fiBillCollection.writeOffReason){
         this.errorKey.push('writeOffReason');
      }
      if(!this.fiBillCollection.postDate){
         this.errorKey.push('postDate');
      }
      if(this.errorKey.length > 0) {
        this.$openWarning("必填信息请填完整");
        return false
      }else{
       return this.fiBillCollection;
      }
      // if (this.$validateObj(this.fiBillCollection, eleNameObj)) {
      //   return this.fiBillCollection;
      // } else {
      //   return false;
      // }
    }
  },
  computed: {
    type() {
      return this.$store.state.route.params.type;
    },
    id() {
      return this.$route.params.id;
    }
  },
  watch: {
    fiGatheringBill(val) {
      if (val.hasOwnProperty("fiBillCollection")) {
        this.fiBillCollection = JSON.parse(
          JSON.stringify(val.fiBillCollection)
        );
        this.collectionBank = {
          bankCode: val.fiBillCollection.collectionBankCode, //托收开户银行编码
          bankName: val.fiBillCollection.collectionBankName //托收开户银行名称
        };
        this.collectionBankSubject = {
          name: val.fiBillCollection.collectionBankAccountName,
          code: val.fiBillCollection.collectionBankAccount
        };
        this.collectionCashFlow = {
          name: val.fiBillCollection.collectionCashName,
          code: val.fiBillCollection.collectionCashCode
        };
        this.collectionFeeSubject = {
          name: val.fiBillCollection.collectionFeeSubjectName,
          code: val.fiBillCollection.collectionFeeSubject
        };
        this.collectionFeeCashFlow = {
          name: val.fiBillCollection.collectionFeeCashName,
          code: val.fiBillCollection.collectionFeeCashCode
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