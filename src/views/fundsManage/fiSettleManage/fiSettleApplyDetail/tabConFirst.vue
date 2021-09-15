<template>
  <el-form :disabled="flag===0" class="tabConFirst">
    <div class="input-div">
      <!--公司选择-->
      <compony-select
        required
        class="el-col el-col-5 el-col-required"
        :class="errorKey.includes('companyName') ? 'inputRed' : ''"
        :companyName.sync="companyName"
        :ztz="0"
        name="companyId"
      ></compony-select>
      <!--部门选择-->
      <department-select
        class="el-col el-col-5 el-col-required"
        :class="errorKey.includes('branchName') ? 'inputRed' : ''"
        required
        :branchName.sync="branchName"
        :departztz="0"
        :companyName="companyName"
      ></department-select>
      <!-- 类型 -->
      <salesType-select class="el-col-required"
      :class="errorKey.includes('salesType') ? 'inputRed' : ''"
       required :salesType.sync="fiSettleApply.salesType"></salesType-select>
      <el-col :span="5" class="el-col">
        <label>申请单据编号</label>
        <el-input
          v-model="fiSettleApply.settleApplyCode"
          class="el-inputs"
          size="small"
          disabled
          placeholder="请输入"
        ></el-input>
      </el-col>
      <!-- 状态 -->
      <salesStatus-select :salesStatus.sync="fiSettleApply.salesStatus" disable></salesStatus-select>
      <!--币别选择-->
      <coin-select
        class="el-col el-col-5 el-col-required"
        :class="errorKey.includes('lockCoin') ? 'inputRed' : ''"
        :coin.sync="lockCoin"
        required
        :labelName="'锁汇币种'"
        @change="lockCoinChangeHandler"
      ></coin-select>
      <el-col :span="5" class="el-col el-col-required">
        <label required>锁汇金额</label>
        <el-input
          class="el-inputs"
          :class="errorKey.includes('lockAmtTotal') ? 'inputRed' : ''"
          :value="fiSettleApplyDetail.lockAmtTotal"
          size="small"
          disabled
          type="number"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>剩余金额</label>
        <el-input
          class="el-inputs"
          v-model="fiSettleApply.leftAmt"
          size="small"
          type="number"
          disabled
          placeholder="请输入"
        ></el-input>
      </el-col>
      <!--参考币别选择-->
      <coin-select
        class="el-col el-col-5"
        :coin.sync="referCoin"
        :labelName="'参考币种'"
        @change="referCoinChangeHandler"
      ></coin-select>
      <el-col :span="5" class="el-col">
        <label>参考金额</label>
        <el-input
          style="width:31.5%!important;"
          class="el-inputs"
          :value="referAmtL"
          size="small"
          type="number"
          placeholder="请输入"
        ></el-input>至
        <el-input
          class="el-inputs"
          style="width:31%!important;"
          :value="referAmtH"
          size="small"
          type="number"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>锁汇汇率区间</label>
        <el-input
          style="width:31%!important;"
          class="el-inputs"
          v-input-filter:num6
          v-model="fiSettleApply.lockCurrencyRateL"
          @change="lockCurrencyRateLChangeHandler"
          size="small"
          type="number"
          placeholder="请输入"
        ></el-input>至
        <el-input
          class="el-inputs"
          style="width:30%!important;"
          v-input-filter:num6
          v-model="fiSettleApply.lockCurrencyRateH"
          @change="valiLockCurrencyRateH"
          size="small"
          type="number"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col
        :span="20"
        class="el-col"
        style="text-align:left;padding-left:10px;padding-bottom:20px;height:64px;"
      >
        <label style="width: 7.8%;text-align:right;">备注</label>
        <el-input
          style="width: 48%;"
          v-model="fiSettleApply.remark"
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
import salesStatusSelect from "@/views/fundsManage/conponents/salesStatusSelect2";
import salesTypeSelect from "@/views/fundsManage/conponents/salesTypeSelect";
import { getFiSettleApplyDetail } from "@/api/fiSettleManage/fiSettleApplyDetail";
import Count from "@/assets/js/calculation";
import { mapState } from "vuex";
export default {
  name: "tabConFirst",
  components: {
    componySelect,
    departmentSelect,
    coinSelect,
    salesStatusSelect,
    salesTypeSelect
  },
  data() {
    return {
      companyName: {}, //公司
      branchName: {}, //部门
      lockCoin: {}, //锁汇币种
      referCoin: {}, //参考币种
      filterType: 0, // 收款类别过滤器 0 不过滤 1 过滤供应商  2过滤客户
      fiSettleApply: {
        settleApplyId: "", //结售汇申请id	varchar(32) [e描述_32]	y		y		结售汇申请id
        settleApplyCode: "", //申请单据编号	varchar(32) [e描述_32]			y		申请单据编号
        companyId: "", //公司id	varchar(32) [e描述_32]			y		公司id
        companyCode: "", //公司编码	varchar(32) [e描述_32]			y		公司编码
        companyName: "", //公司名称	varchar(32) [e描述_32]			y		公司名称
        orgId: "", //部门id	varchar(32) [e描述_32]			y		部门id
        orgCode: "", //部门编码	varchar(32) [e描述_32]			y		部门编码
        orgName: "", //部门名称	varchar(32) [e描述_32]			y		部门名称
        salesType: "", //类型	int [e字典Int8]			y		类型
        salesStatus: "", //状态	int [e字典Int8]			y		状态
        lockCurrencyCode: "", //锁汇币种	varchar(8) [e描述_8]			y		锁汇币种
        lockAmt: "", //锁汇金额
        leftAmt: "", //剩余金额	decimal(20,6) [d(20,6)小数]			y		剩余金额
        referCurrencyCode: "", //参考币种	decimal(20,6) [d(20,6)小数]			y		参考币种
        referAmtL: "", //参考金额l	decimal(20,6) [d(20,6)小数]			y		参考金额l
        referAmtH: "", //参考金额h	decimal(20,6) [d(20,6)小数]			y		参考金额h
        lockCurrencyRateL: "", //锁汇汇率l	decimal(20,6) [d(20,6)小数]			y		锁汇汇率l
        lockCurrencyRateH: "", //锁汇汇率h	decimal(20,6) [d(20,6)小数]			y		锁汇汇率h
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
      errorKey: []
    };
  },
  methods: {
    //获取结售汇申请抬头
    getDetail() {
      let self = this;
      if (self.id == 0) {
        return;
      }
      getFiSettleApplyDetail({ settleApplyId: this.id }).then(res => {
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
          self.lockCoin = {
            currencyCode: res.data.lockCurrencyCode
          };
          self.referCoin = {
            currencyCode: res.data.referCurrencyCode
          };
          self.fiSettleApply = res.data;
          self.$emit("getData", this.fiSettleApply);
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
        this.fiSettleApply[ele] = Obj[ele] ? Obj[ele] : this.fiSettleApply[ele];
      });
      //锁汇金额
      this.fiSettleApply.lockAmt = this.fiSettleApplyDetail.lockAmtTotal;
      //参考金额
      this.fiSettleApply.referAmtL = this.referAmtL;
      this.fiSettleApply.referAmtH = this.referAmtH;
       this.errorKey = [];
      if (!Object.keys(this.companyName).length) {
        this.errorKey.push('companyName');
      }
      if (!Object.keys(this.branchName).length) {
        this.errorKey.push('branchName');
      }
      if (this.fiSettleApply.salesType==='') {
        this.errorKey.push('salesType');
      }
      if (!Object.keys(this.lockCoin).length) {
        this.errorKey.push('lockCoin');
      }
      if(this.fiSettleApplyDetail.lockAmtTotal==0 || this.fiSettleApplyDetail.lockAmtTotal===''){
        this.errorKey.push('lockAmtTotal');
      }
      console.log(this.errorKey)
      if(this.errorKey.length > 0) {
        this.$openWarning(`必填信息请填完整`);
        return false
      }else{
        this.$emit("getData", this.fiSettleApply);
        return true;
      }
      
    },
    lockCoinChangeHandler(value) {
      this.fiSettleApply.lockCurrencyCode = value.currencyCode;
    },
    referCoinChangeHandler(value) {
      this.fiSettleApply.referCurrencyCode = value.currencyCode;
    },
    lockCurrencyRateLChangeHandler(value) {
      this.fiSettleApply.lockCurrencyRateH = Count.accAdd(value, 0);
      // this.fiSettleApply.lockCurrencyRateH = Count.accAdd(value, 0.1);
    },
    valiLockCurrencyRateH(value) {
      if (value < this.fiSettleApply.lockCurrencyRateL) {
        this.$message({
          message: "锁汇汇率区间（结束）必须大于等于锁汇汇率区间（开始）",
          type: "error"
        });
        this.fiSettleApply.lockCurrencyRateH = this.fiSettleApply.lockCurrencyRateL;
      }
    },
    getData() {
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
        this.fiSettleApply[ele] = Obj[ele] ? Obj[ele] : this.fiSettleApply[ele];
      });
      let eleNameObj = {
        companyId: "公司",
        orgId: "部门",
        lockCurrencyCode: "锁汇币种"
      };
      if (this.$validateObj(this.fiSettleApply, eleNameObj)) {
        this.$emit("getData", this.fiSettleApply);
        return true;
      } else {
        return false;
      }
    }
  },
  computed: {
    ...mapState(["fiSettleApplyDetail"]),
    id() {
      return this.$route.params.id;
    },
    flag() {
      return this.$store.state.route.params.editFlag;
    },
    referAmtL() {
      let value = this.$calculationAmount(
        this.fiSettleApply.lockCurrencyRateL,
        this.fiSettleApplyDetail.lockAmtTotal,
        "mul"
      );
      return value
    },
    referAmtH() {
      let value = this.$calculationAmount(
        this.fiSettleApply.lockCurrencyRateH,
        this.fiSettleApplyDetail.lockAmtTotal,
        "mul"
      );
      return value 
    }
  },
  mounted() {
    this.getDetail();
  }
};
</script>
