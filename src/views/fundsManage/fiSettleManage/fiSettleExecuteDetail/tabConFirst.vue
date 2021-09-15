<template>
  <el-form :disabled="type===2" class="tabConFirst">
    <div class="input-div">
      <el-col :span="5" class="el-col el-col-required">
        <label required>公司</label>
        <el-input
          v-model="fiSettleExecute.companyName"
          class="el-inputs"
          :class="errorKey.includes('companyName') ? 'inputRed' : ''"
          size="small"
          disabled
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col el-col-required">
        <label required>部门</label>
        <el-input
          v-model="fiSettleExecute.orgName"
          class="el-inputs"
          :class="errorKey.includes('orgName') ? 'inputRed' : ''"
          size="small"
          disabled
          placeholder="请输入"
        ></el-input>
      </el-col>
      <!-- 类型 -->
      <salesType-select
      class="el-col-required"
      :class="errorKey.includes('salesType') ? 'inputRed' : ''"
       required :disable="true" :salesType.sync="fiSettleExecute.salesType"></salesType-select>
      <!-- 申请单据编号 -->
      <fi-settle-apply-select
        required
        class="el-col el-col-5 el-col-required"
        :class="errorKey.includes('settleApply') ? 'inputRed' : ''"
        @change="settleApplyChangeHandler"
        :settleApply.sync="settleApply"
        :disable="type!==0"
      ></fi-settle-apply-select>
      <!-- 执行类型 -->
      <executeType-select
        :disable="type!==0"
        @change="executeTypeChangeHandler"
        :executeType.sync="fiSettleExecute.executeType"
      ></executeType-select>
      <el-col :span="5" class="el-col el-col-required">
        <label required>锁汇币种</label>
        <el-input
        :class="errorKey.includes('lockCurrencyCode') ? 'inputRed' : ''"
          v-model="fiSettleExecute.lockCurrencyCode"
          class="el-inputs"
          size="small"
          disabled
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col el-col-required">
        <label required>剩余锁汇金额</label>
        <el-input
          class="el-inputs"
          :class="errorKey.includes('leftAmt') ? 'inputRed' : ''"
          :value="(fiSettleExecute.lockAmt-fiSettleExecuteDetail.execLockAmtTotal).toFixed(2)"
          size="small"
          type="number"
          disabled
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>执行锁汇金额</label>
        <el-input
          class="el-inputs"
          :value="fiSettleExecuteDetail.execLockAmtTotal"
          size="small"
          type="number"
          disabled
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>展期保证金</label>
        <el-input
          class="el-inputs"
          v-model="fiSettleExecute.extendGuardAmt"
          size="small"
          type="number"
          :disabled="fiSettleExecute.executeType!==10750010||type===2"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>违约金</label>
        <el-input
          class="el-inputs"
          v-model="fiSettleExecute.liquidatedDamagesAmt"
          size="small"
          type="number"
          :disabled="fiSettleExecute.executeType!==10750015"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <bank-select
        :labelName="'执行银行'"
        class="el-col el-col-5"
        @change="execBankChangeHandler"
        :disable="fiSettleExecute.executeType!==10750005"
        :bank.sync="execBank"
      ></bank-select>
      <el-col :span="5" class="el-col">
        <label>执行汇率</label>
        <el-input
          class="el-inputs"
          v-model="fiSettleExecute.execCurrencyRate"
          v-input-filter:num6
          :disabled="fiSettleExecute.executeType!==10750005"
          size="small"
          type="number"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <!-- 状态 -->
      <salesStatus-select
        :filterStatus="filterStatus"
        :salesStatus.sync="fiSettleExecute.execStatus"
        disable
      ></salesStatus-select>
      <el-col :span="5" class="el-col">
        <label>执行编号</label>
        <el-input
          v-model="fiSettleExecute.execNo"
          disabled
          class="el-inputs"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col
        :span="20"
        class="el-col"
        style="text-align:left;padding-left:10px;padding-bottom:20px;height:64px;"
      >
        <label style="width: 9%;text-align:right;">备注</label>
        <el-input
          style="width: 48%;"
          v-model="fiSettleExecute.remark"
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
import salesStatusSelect from "@/views/fundsManage/conponents/salesStatusSelect2";
import salesTypeSelect from "@/views/fundsManage/conponents/salesTypeSelect";
import executeTypeSelect from "@/views/fundsManage/conponents/executeTypeSelect2";
import fiSettleApplySelect from "@/views/fundsManage/conponents/fiSettleApplySelect";
import bankSelect from "@/views/fundsManage/conponents/bankSelect";
import { getFiSettleExecuteDetail } from "@/api/fiSettleManage/fiSettleExecuteDetail";
import { findBrothersComponents } from "@/assets/js/findComponents";
import Count from "@/assets/js/calculation";
import { mapState, mapMutations } from "vuex";
export default {
  name: "tabConFirst",
  components: {
    salesStatusSelect,
    salesTypeSelect,
    executeTypeSelect,
    fiSettleApplySelect,
    bankSelect
  },
  data() {
    return {
      filterStatus: 1, // 收款类别过滤器 0 不过滤 1 过滤供应商  2过滤客户
      settleApply: {}, //申请单
      execBank: {}, //执行银行
      fiSettleExecute: {
        executeId: "", //执行id	varchar(32)	y		y		执行id
        companyId: "", //公司id	varchar(32) [e描述_32]			y		公司id
        companyCode: "", //公司编码	varchar(64) [e描述_64]			y		公司编码
        companyName: "", //公司名称	varchar(128) [e描述_128]			y		公司名称
        orgId: "", //组织id	varchar(32) [e描述_32]			y		组织id
        orgCode: "", //组织编码	varchar(64) [e描述_64]			y		组织编码
        orgName: "", //组织名称	varchar(128) [e描述_128]			y		组织名称
        salesType: 10720005, //类型	int [e字典Int8]			y		类型
        settleApplyCode: "", //申请单据编码	varchar(32) [e描述_32]			y		申请单据编码
        executeType: 10750005, //执行类型	int [e字典Int8]			y		执行类型
        lockCurrencyCode: "", //锁汇币种	varchar(8) [e描述_8]			y		锁汇币种
        leftAmt: "", //剩余锁汇金额	decimal(20,6) [d(20,6)小数]			y		剩余锁汇金额
        execLockAmt: "", //执行锁汇金额金额	decimal(20,6) [d(20,6)小数]			y		执行锁汇金额金额
        extendGuardAmt: "", //展期保证金	decimal(20,6) [d(20,6)小数]			y		展期保证金
        liquidatedDamagesAmt: "", //违约金	decimal(20,6) [d(20,6)小数]			y		违约金
        execBankCode: "", //执行银行	varchar(32) [e描述_32]			y		执行银行
        execBankName: "", //执行银行名称	varchar(128) [e描述_128]			y		执行银行名称
        execCurrencyRate: "", //执行汇率	decimal(20,6) [d(20,6)小数]			y		执行汇率
        execStatus: "", //状态	int [e字典Int8]			y		状态
        execNo: "", //执行编号	varchar(32) [e描述_32]			y		执行编号
        remark: "", //备注	varchar(512) [e描述_512]			y		备注
        isInactive: "", //是否停用	int [b布尔型]			y	默认值:0是否停用，0表示激活状态，1表示停用，2表示作废
        createdBy: "", //创建者	varchar(32) [e描述_32]			y		创建者
        createdName: "", //创建者名称	varchar(64) [e描述_64]			y		创建者名称
        createdTime: "", //创建时间	datetime [e时间]			y		创建时间
        updatedBy: "", //更新者	varchar(32) [e描述_32]			y		更新者
        updatedName: "", //更新者名称	varchar(64) [e描述_64]			y		更新者名称
        updatedTime: "", //更新时间	datetime [e时间]			y		更新时间
        version: "" //数据版本	int [e数字Int10]			y	默认值:0数据版本
      },
      errorKey:[]
    };
  },
  methods: {
    ...mapMutations(["setExecuteType", "setSalesType"]),
    //获取结售汇申请抬头
    getDetail() {
      let self = this;
      if (self.id == 0) {
        this.fiSettleExecute = {
          executeId: "", //执行id	varchar(32)	y		y		执行id
          companyId: "", //公司id	varchar(32) [e描述_32]			y		公司id
          companyCode: "", //公司编码	varchar(64) [e描述_64]			y		公司编码
          companyName: "", //公司名称	varchar(128) [e描述_128]			y		公司名称
          orgId: "", //组织id	varchar(32) [e描述_32]			y		组织id
          orgCode: "", //组织编码	varchar(64) [e描述_64]			y		组织编码
          orgName: "", //组织名称	varchar(128) [e描述_128]			y		组织名称
          salesType: 10720005, //类型	int [e字典Int8]			y		类型
          settleApplyCode: "", //申请单据编码	varchar(32) [e描述_32]			y		申请单据编码
          executeType: 10750005, //执行类型	int [e字典Int8]			y		执行类型
          lockCurrencyCode: "", //锁汇币种	varchar(8) [e描述_8]			y		锁汇币种
          leftAmt: "", //剩余锁汇金额	decimal(20,6) [d(20,6)小数]			y		剩余锁汇金额
          execLockAmt: "", //执行锁汇金额金额	decimal(20,6) [d(20,6)小数]			y		执行锁汇金额金额
          extendGuardAmt: "", //展期保证金	decimal(20,6) [d(20,6)小数]			y		展期保证金
          liquidatedDamagesAmt: "", //违约金	decimal(20,6) [d(20,6)小数]			y		违约金
          execBankCode: "", //执行银行	varchar(32) [e描述_32]			y		执行银行
          execBankName: "", //执行银行名称	varchar(128) [e描述_128]			y		执行银行名称
          execCurrencyRate: "", //执行汇率	decimal(20,6) [d(20,6)小数]			y		执行汇率
          execStatus: "", //状态	int [e字典Int8]			y		状态
          execNo: "", //执行编号	varchar(32) [e描述_32]			y		执行编号
          remark: "", //备注	varchar(512) [e描述_512]			y		备注
          isInactive: "", //是否停用	int [b布尔型]			y	默认值:0是否停用，0表示激活状态，1表示停用，2表示作废
          createdBy: "", //创建者	varchar(32) [e描述_32]			y		创建者
          createdName: "", //创建者名称	varchar(64) [e描述_64]			y		创建者名称
          createdTime: "", //创建时间	datetime [e时间]			y		创建时间
          updatedBy: "", //更新者	varchar(32) [e描述_32]			y		更新者
          updatedName: "", //更新者名称	varchar(64) [e描述_64]			y		更新者名称
          updatedTime: "", //更新时间	datetime [e时间]			y		更新时间
          version: "" //数据版本	int [e数字Int10]			y	默认值:0数据版本
        };
        this.settleApply = {}; //申请单
        this.execBank = {}; //执行银行
        return;
      }
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      getFiSettleExecuteDetail({ executeId: this.id }).then(res => {
        loading.close();
        if (res.code === "success") {
          self.fiSettleExecute = res.data;
          self.execBank = {
            bankCode: res.data.execBankCode, //
            bankName: res.data.execBankName //
          };
          self.settleApply = {
            settleApplyCode: res.data.settleApplyCode
          };
          let executeType = { 0: 10750005, 3: 10750010, 4: 10750015 }[
            this.type
          ]; //展期、违约设定执行类型
          self.fiSettleExecute.executeType = executeType
            ? executeType
            : res.data.executeType;

          this.setSalesType(self.fiSettleExecute.salesType);
          this.setExecuteType(self.fiSettleExecute.executeType); //设置默认执行类型
          self.$emit("getData", this.fiSettleExecute);
        }
      });
    },
    postData() {
      //锁汇金额
      this.fiSettleExecute.execLockAmt = this.fiSettleExecuteDetail.execLockAmtTotal;
      this.fiSettleExecute.leftAmt = (
        this.fiSettleExecute.lockAmt -
        this.fiSettleExecuteDetail.execLockAmtTotal
      ).toFixed(2);
      if (this.fiSettleExecute.leftAmt < 0) {
        this.$message({
          message: "执行锁汇金额超出剩余锁汇额度",
          type: "error"
        });
        return false;
      }
      // let eleNameObj = {
      //   companyId: "公司",
      //   orgId: "部门",
      //   salesType: "类型",
      //   settleApplyCode: "申请单据编号",
      //   executeType: "执行类型",
      //   lockCurrencyCode: "锁汇币种",
      //   leftAmt: "剩余锁汇金额"
      // };
      // if (this.$validateObj(this.fiSettleExecute, eleNameObj)) {
      //   this.$emit("getData", this.fiSettleExecute);
      //   return true;
      // } else {
      //   return false;
      // }
       this.errorKey = [];
      if (this.fiSettleExecute.companyName=='') {
        this.errorKey.push('companyName');
      }
      if (this.fiSettleExecute.orgName=='') {
        this.errorKey.push('orgName');
      }
      if (this.fiSettleExecute.salesType==='') {
        this.errorKey.push('salesType');
      }
      if(!Object.keys(this.settleApply).length) {
        this.errorKey.push('settleApply');
      }
      if(this.fiSettleExecute.lockCurrencyCode==''){
        this.errorKey.push('lockCurrencyCode');
      }
      if(this.fiSettleExecute.executeType===''){
        this.errorKey.push('executeType');
      }
      if(this.fiSettleExecute.leftAmt==0 || this.fiSettleExecute.leftAmt=='' || this.fiSettleExecute.leftAmt=='NaN'){
        this.errorKey.push('leftAmt');
      }
      if(this.errorKey.length > 0) {
        this.$openWarning(`必填信息请填完整`);
        return false
      }else{
        this.$emit("getData", this.fiSettleExecute);
        return true;
      }
    },
    getData() {
      let eleNameObj = {
        companyId: "公司",
        orgId: "部门",
        lockCurrencyCode: "锁汇币种"
      };
      if (this.fiSettleExecute.executeType === 10750005) {
        eleNameObj.execBankCode = "执行银行";
        eleNameObj.execCurrencyRate = "执行汇率";
      }
      if (this.$validateObj(this.fiSettleExecute, eleNameObj)) {
        this.$emit("getData", this.fiSettleExecute);
        return true;
      } else {
        return false;
      }
    },
    settleApplyChangeHandler(value) {
      this.fiSettleExecute = {
        ...this.fiSettleExecute,
        companyId: value.companyId, //公司id	varchar(32) [e描述_32]			y		公司id
        companyCode: value.companyCode, //公司编码	varchar(64) [e描述_64]			y		公司编码
        companyName: value.companyName, //公司名称	varchar(128) [e描述_128]			y		公司名称
        orgId: value.orgId, //组织id	varchar(32) [e描述_32]			y		组织id
        orgCode: value.orgCode, //组织编码	varchar(64) [e描述_64]			y		组织编码
        orgName: value.orgName, //组织名称	varchar(128) [e描述_128]			y		组织名称
        salesType: value.salesType ? value.salesType : 10720005, //类型	int [e字典Int8]			y		类型
        settleApplyCode: value.settleApplyCode, //申请单据编码	varchar(32) [e描述_32]			y		申请单据编码
        lockCurrencyCode: value.lockCurrencyCode, //锁汇币种	varchar(8) [e描述_8]			y		锁汇币种
        lockAmt: value.lockAmt
      };
      this.setSalesType(this.fiSettleExecute.salesType);
    },
    execBankChangeHandler(value) {
      this.fiSettleExecute.execBankCode = value.bankCode;
      this.fiSettleExecute.execBankName = value.bankName;
    },
    async executeTypeChangeHandler(value) {
      //验证明细项
      let executeType = value;
      const bottomTableFirst = findBrothersComponents(
        this,
        "bottomTableFirst",
        false
      )[0];
      const bottomTableSecond = findBrothersComponents(
        this,
        "bottomTableSecond",
        false
      )[0];
      const bottomTableThird = findBrothersComponents(
        this,
        "bottomTableThird",
        false
      )[0];
      // 10750005: "正常",
      // 10750010: "展期",
      // 10750015: "违约"
      console.log(bottomTableFirst, bottomTableSecond, bottomTableThird);
      if (bottomTableFirst.fiSettleExecuteItems.length > 0) {
        this.$message({
          message: "已添加执行明细，不允许修改执行类型",
          type: "warning"
        });
        this.fiSettleExecute.executeType = 10750005;
        return;
      } else if (bottomTableSecond.fiSettleExecuteItems.length > 0) {
        this.$message({
          message: "已添加展期明细，不允许修改执行类型",
          type: "warning"
        });
        this.fiSettleExecute.executeType = 10750010;
        return;
      } else if (bottomTableThird.fiSettleExecuteItems.length > 0) {
        this.$message({
          message: "已添加违约明细，不允许修改执行类型",
          type: "warning"
        });
        this.fiSettleExecute.executeType = 10750015;
        return;
      }
      this.setExecuteType(value);
    }
  },
  computed: {
    ...mapState(["fiSettleExecuteDetail"]),
    id() {
      return this.$route.params.id;
    },
    flag() {
      return this.$store.state.route.params.editFlag;
    },
    type() {
      return this.$store.state.route.params.type;
    }
  },
  mounted() {
    this.getDetail();
    this.setExecuteType(10750005); //设置默认执行类型
    this.setSalesType(10720005); //设置默认类型
    if (this.$route.params.settleApply) {
      this.settleApply = this.$route.params.settleApply;
      this.settleApplyChangeHandler(this.settleApply);
    }
  },
  activated() {
    this.getDetail();
    this.setExecuteType(10750005); //设置默认执行类型
    this.setSalesType(10720005); //设置默认类型
    if (this.$route.params.settleApply) {
      this.settleApply = this.$route.params.settleApply;
      this.settleApplyChangeHandler(this.settleApply);
    }
  }
};
</script>
<style lang="scss" scoped>
// .index .tabConFirst .el-col-required .el-input.is-disabled .el-input__inner{
// background-color: #d9e8fd !important;
// }
/deep/ .el-col{
  .el-inputs,.el-select{
      width: 65%;
    }
  label{
    width:35%;
  }
}
.input-div{
  padding-left: 0;
}
</style>
