<template>
  <div class="input-div">
    <el-form :disabled="type!==3&&fiBillInsideDiscount.status===10990010">
      <el-col :span="5" class="el-col el-col-required">
        <label required>内部贴现日期</label>
        <el-date-picker
          size="small"
          class="el-inputs"
           :class="errorKey.includes('internalDiscountDate') ? 'inputRed' : ''"
          v-model="fiBillInsideDiscount.internalDiscountDate"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
      </el-col>
      <el-col :span="5" class="el-col el-col-required">
        <label required>内部贴现利率%</label>
        <el-input
          v-model="fiBillInsideDiscount.internalDiscountRate"
          class="el-inputs"
           :class="errorKey.includes('internalDiscountRate') ? 'inputRed' : ''"
          type="number"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col el-col-required">
        <label required>内部贴现利息</label>
        <el-input
          :value="internalDiscountInterest"
          class="el-inputs"
           :class="errorKey.includes('internalDiscountInterest') ? 'inputRed' : ''"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <!--部门选择-->
      <department-select
        required
        class="el-col el-col-5 el-col-required"
         :class="errorKey.includes('branchName') ? 'inputRed' : ''"
        :labelName="'贴现部门'"
        :branchName.sync="branchName"
        :isPublic="true"
        :companyName="companyName"
        @change="branchNameChangeHandler"
      ></department-select>
      <accountingSubject-select
        :labelName="'贴现利息科目'"
        :longNumber="7066"
        style="width:52%;marginLeft:-4%;"
        class="el-col el-col-10"
        :subject.sync="interestSubject"
        @change="interestSubjectChangeHandler"
      ></accountingSubject-select>
      <el-col :span="5" class="el-col">
        <label>状态</label>
        <el-select
          v-model="fiBillInsideDiscount.status"
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
          :disable="fiBillInsideDiscount.status!==10990005"
          :companyId="fiGatheringBill.companyId"
          :accountingDate.sync="fiBillInsideDiscount.postDate"
          :class="errorKey.includes('postDate') ? 'inputRed' : ''"
        ></accountingDate-select>
      </el-col>
  </el-form>
    <el-col :span="5" class="el-col" style="textAlign:left">
      <label>冲销原因</label>
      <write-off-reason-select
        :disable="fiBillInsideDiscount.status!==10990010"
        :writeOffReason.sync="fiBillInsideDiscount.writeOffReason"
         :class="errorKey.includes('writeOffReason') ? 'inputRed' : ''"
      ></write-off-reason-select>
    </el-col>
    <el-col :span="5" class="el-col">
      <label>冲销日期</label>
      <accountingDate-select
        :disable="fiBillInsideDiscount.status!==10990010"
        :companyId="fiGatheringBill.companyId"
        :accountingDate.sync="fiBillInsideDiscount.writeOffDate"
        :class="errorKey.includes('writeOffDate') ? 'inputRed' : ''"
      ></accountingDate-select>
    </el-col>
    <el-col :span="5" class="el-col el-col-required">
      <label required>附件数量</label>
      <el-input
        :disabled="type!==3&&fiBillInsideDiscount.status===10990010"
        v-model="fiBillInsideDiscount.attachmentCount"
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
import departmentSelect from "@/views/fundsManage/conponents/departmentSelect2";
import accountingSubjectSelect from "@/views/fundsManage/conponents/accountingSubjectSelect";
import writeOffReasonSelect from "@/views/fundsManage/conponents/writeOffReasonSelect";
import accountingDateSelect from "@/views/fundsManage/conponents/accountingDateSelect";
export default {
  name: "tabConSecond",
  props: {
    instrumentAmt: {
      type: Number,
      default: 0
    },
    fiGatheringBill: {
      type: Object,
      default: Object
    }
  },
  components: {
    departmentSelect,
    accountingSubjectSelect,
    writeOffReasonSelect,
    accountingDateSelect
  },
  data() {
    return {
      companyName: {}, //公司
      branchName: {}, //部门
      interestSubject: {
        code: 7066030102, //内部贴现利息码
        name: "7066030102内部贴现利息" //内部贴现利息科目
      }, //贴现利息科目
      fiBillInsideDiscount: {
        id: "", //id	varchar(32) [e描述_32]	y		y		主键id
        receivableId: "", //应收票据id	varchar(32) [e描述_32]			y		应收票据id
        internalDiscountRate: "", //内部贴现利率	decimal(20,6) [d(20,6)小数]			y		内部贴现利率
        internalDiscountInterest: "", //内部贴现利息	decimal(20,6) [d(20,6)小数]			y		内部贴现利息
        internalDiscountDate: "", //内部贴现日期	datetime [e时间]			y		内部贴现日期
        discountFormCertificate: "", //内部贴现表内凭证	varchar(16) [e描述_16]			y		内部贴现表内凭证
        discountOutCertificate: "", //内部贴现表外凭证	varchar(16) [e描述_16]			y		内部贴现表外凭证
        internalDiscountWriteoffdate: "", //内部贴现冲销日期	datetime [e时间]			y		内部贴现冲销日期
        internalWriteoffFormProof: "", //内部贴现表内冲销凭证	varchar(16) [e描述_16]			y		内部贴现表内冲销凭证
        internalWriteoffOutProof: "", //内部贴现表外冲销凭证	varchar(16) [e描述_16]			y		内部贴现表外冲销凭证
        isPost: "", //过账标志	int [b布尔型]			y	默认值:0过账标志（sap发送标志）（0,否，1是）
        postBy: "", //过账者	varchar(32) [e描述_32]			y		过账者
        accountingCertificate: "", //会计凭证	varchar(64) [e描述_64]			y		会计凭证
        postDate: "", //过账日期	datetime [e时间]			y		过账日期
        postOperationDate: "", //过账操作日期	datetime [e时间]			y		过账操作日期
        certStatus: "", //凭证标识	int [e字典Int8]			y		凭证标识 dictNo=3029
        sendCertError: "", //推送失败原因	varchar(1024) [e描述_1024]			y		推送失败原因
        writeoffBy: "", //冲销者	varchar(32) [e描述_32]			y		冲销者
        writeoffCertificate: "", //冲销凭证号	varchar(64) [e描述_64]			y		冲销凭证号
        postDate: "", //过账日期	datetime [e时间]			y		过账日期
        writeOffDate: "", //冲销日期	datetime [e时间]			y		冲销日期
        writeOffReason: "", //冲销原因	int [e字典Int8]			y		dict_4012 冲销原因;03:冲销本期的凭证04:冲销以往期间的凭证
        isInactive: "", //是否停用	int [b布尔型]			y	默认值:0是否停用，0表示激活状态，1表示停用，2表示作废
        createdBy: "", //创建者	varchar(32) [e描述_32]			y		创建者
        createdName: "", //创建者名称	varchar(64) [e描述_64]			y		创建者名称
        createdTime: "", //创建时间	datetime [e时间]			y		创建时间
        updatedBy: "", //更新者	varchar(32) [e描述_32]			y		更新者
        updatedName: "", //更新者名称	varchar(64) [e描述_64]			y		更新者名称
        updatedTime: "", //更新时间	datetime [e时间]			y		更新时间
        version: "", //数据版本	int [e数字Int10]			y	默认值:0数据版本
        status: "", //单据状态
        orgId: "",
        orgName: "",
        orgCode: "",
        feeAccountCode: 7066030102, //内部贴现利息码
        feeAccountName: "7066030102内部贴现利息", //内部贴现利息科目
        attachmentCount: "" //附件数量
      },
      options: [
        {
          dict_key: 10990005,
          dict_value: "保存",
          dict_code: "10990005"
        },
        {
          dict_key: 10990010,
          dict_value: "已过账",
          dict_code: "10990010"
        },
        {
          dict_key: 10990015,
          dict_value: "已冲销",
          dict_code: "10990015"
        }
      ],
      errorKey:[]
    };
  },
  methods: {
    postData() {
      let params = this.fiBillInsideDiscount;
      this.fiBillInsideDiscount.receivableId = this.id;
      this.fiBillInsideDiscount.internalDiscountInterest = this.internalDiscountInterest;
      // let eleNameObj = {
      //   internalDiscountDate: "内部贴现日期",
      //   internalDiscountRate: "内部贴现利率",
      //   internalDiscountInterest: "内部贴现利息",
      //   orgCode: "贴现部门",
      //   attachmentCount: "附件数量"
      // };
      // if (this.$validateObj(this.fiBillInsideDiscount, eleNameObj)) {
      //   return this.fiBillInsideDiscount;
      // } else {
      //   return false;
      // }
      this.errorKey=[];
      if(!Object.keys(this.branchName).length){
        this.errorKey.push('branchName');
      }
      if(!this.fiBillInsideDiscount.internalDiscountInterest){
        this.errorKey.push('internalDiscountInterest');
      }
       if(!this.fiBillInsideDiscount.internalDiscountDate){
        this.errorKey.push('internalDiscountDate');
      }
       if(!this.fiBillInsideDiscount.internalDiscountRate){
        this.errorKey.push('internalDiscountRate');
      }
       if(!this.fiBillInsideDiscount.attachmentCount){
        this.errorKey.push('attachmentCount');
      }
      if(this.errorKey.length > 0) {
        this.$openWarning("必填信息请填完整");
        return false
      }else{
        return this.fiBillInsideDiscount;
      }
      
    },
    post() {
      let params = this.fiBillInsideDiscount;
      this.fiBillInsideDiscount.receivableId = this.id;
      this.fiBillInsideDiscount.internalDiscountInterest = this.internalDiscountInterest;
      // let eleNameObj = {
      //   internalDiscountDate: "内部贴现日期",
      //   internalDiscountRate: "内部贴现利率",
      //   internalDiscountInterest: "内部贴现利息",
      //   postDate: "过账日期", //过账日期	datetime [e时间]			y
      //   attachmentCount: "附件数量"
      // };
      if (this.fiBillInsideDiscount.status !== 10990005) {
        this.$message({ message: "只有保存状态才能过账", type: "warning" });
        return false;
      }
      // if (this.$validateObj(this.fiBillInsideDiscount, eleNameObj)) {
      //   return this.fiBillInsideDiscount;
      // } else {
      //   return false;
      // }
      this.errorKey=[];
      if(!Object.keys(this.branchName).length){
        this.errorKey.push('branchName');
      }
      if(!this.fiBillInsideDiscount.internalDiscountInterest){
        this.errorKey.push('internalDiscountInterest');
      }
       if(!this.fiBillInsideDiscount.internalDiscountDate){
        this.errorKey.push('internalDiscountDate');
      }
       if(!this.fiBillInsideDiscount.internalDiscountRate){
        this.errorKey.push('internalDiscountRate');
      }
       if(!this.fiBillInsideDiscount.attachmentCount){
        this.errorKey.push('attachmentCount');
      }
       if(!this.fiBillInsideDiscount.postDate){
        this.errorKey.push('postDate');
      }
      if(this.errorKey.length > 0) {
        this.$openWarning("必填信息请填完整");
        return false
      }else{
        return this.fiBillInsideDiscount;
      }
    },
    writeOff() {
      let params = this.fiBillInsideDiscount;
      this.fiBillInsideDiscount.receivableId = this.id;
      this.fiBillInsideDiscount.internalDiscountInterest = this.internalDiscountInterest;
      // let eleNameObj = {
      //   internalDiscountDate: "内部贴现日期",
      //   internalDiscountRate: "内部贴现利率",
      //   internalDiscountInterest: "内部贴现利息",
      //   postDate: "过账日期", //过账日期	datetime [e时间]			y
      //   writeOffReason: "冲销原因",
      //   writeOffDate: "冲销日期"
      // };
      if (this.fiBillInsideDiscount.status !== 10990010) {
        this.$message({ message: "只有过账才能冲销", type: "warning" });
        return false;
      }
      // if (this.$validateObj(this.fiBillInsideDiscount, eleNameObj)) {
      //   return this.fiBillInsideDiscount;
      // } else {
      //   return false;
      // }
      this.errorKey=[];
      if(!Object.keys(this.branchName).length){
        this.errorKey.push('branchName');
      }
      if(!this.fiBillInsideDiscount.internalDiscountInterest){
        this.errorKey.push('internalDiscountInterest');
      }
       if(!this.fiBillInsideDiscount.internalDiscountDate){
        this.errorKey.push('internalDiscountDate');
      }
       if(!this.fiBillInsideDiscount.internalDiscountRate){
        this.errorKey.push('internalDiscountRate');
      }
       if(!this.fiBillInsideDiscount.attachmentCount){
        this.errorKey.push('attachmentCount');
      }
       if(!this.fiBillInsideDiscount.writeOffDate){
        this.errorKey.push('writeOffDate');
      }
       if(!this.fiBillInsideDiscount.writeOffReason){
        this.errorKey.push('writeOffReason');
      }
       if(!this.fiBillInsideDiscount.postDate){
        this.errorKey.push('postDate');
      }
      if(this.errorKey.length > 0) {
        this.$openWarning("必填信息请填完整");
        return false
      }else{
        return this.fiBillInsideDiscount;
      }
    },
    branchNameChangeHandler(value) {
      this.fiBillInsideDiscount = {
        ...this.fiBillInsideDiscount,
        orgId: value.orgId ? value.orgId : "",
        orgName: value.orgName ? value.orgName : "",
        orgCode: value.orgCode ? value.orgCode : ""
      };
    },
    interestSubjectChangeHandler(value) {
      console.log(value);
      this.fiBillInsideDiscount = {
        ...this.fiBillInsideDiscount,
        feeAccountName: value.name ? value.name : "",
        feeAccountCode: value.code ? value.code : ""
      };
    }
  },
  computed: {
    type() {
      return this.$store.state.route.params.type;
    },
    internalDiscountInterest() {
      return (
        this.instrumentAmt *
        this.fiBillInsideDiscount.internalDiscountRate *
        0.01
      ).toFixed(2);
    },
    id() {
      return this.$store.state.route.params.id;
    }
  },
  watch: {
    fiGatheringBill(val) {
      if (val.hasOwnProperty("fiBillInsideDiscount")) {
        this.fiBillInsideDiscount = JSON.parse(
          JSON.stringify(val.fiBillInsideDiscount)
        );
        this.branchName = {
          orgId: val.fiBillInsideDiscount.orgId,
          orgName: val.fiBillInsideDiscount.orgName,
          orgCode: val.fiBillInsideDiscount.orgCode
        };
        this.interestSubject = {
          code: val.fiBillInsideDiscount.feeAccountCode
            ? val.fiBillInsideDiscount.feeAccountCode
            : 7066030102, //内部贴现利息码
          name: val.fiBillInsideDiscount.feeAccountName
            ? val.fiBillInsideDiscount.feeAccountName
            : "7066030102内部贴现利息" //内部贴现利息科目
        };
        this.fiBillInsideDiscount.feeAccountCode = val.fiBillInsideDiscount
          .feeAccountCode
          ? val.fiBillInsideDiscount.feeAccountCode
          : 7066030102; //内部贴现利息码
        this.fiBillInsideDiscount.feeAccountName = val.fiBillInsideDiscount
          .feeAccountName
          ? val.fiBillInsideDiscount.feeAccountName
          : "7066030102内部贴现利息"; //内部贴现利息科目
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
      width: 63%;
    }
  label{
    width:37%;
  }
}
</style>