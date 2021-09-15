<template>
  <div class="paymentDetail">
    <el-divider class="auto-sibling"></el-divider>
    <div class="button-div auto-sibling">
      <el-button
        v-show="flag "
        class="query-button"
        icon="el-icon-suitcase"
        @click="savePaymentDetail"
      >保存</el-button>
      <el-button @click="goBack" :icon="flag?'el-icon-close':'el-icon-back'">
        {{
        flag ? "取消" : "返回"
        }}
      </el-button>
    </div>
    <el-divider></el-divider>
    <!-- tab标签 -->
    <el-tabs class="el-tabs auto-sibling" v-model="activeName" type="card">
      <el-tab-pane label="付款单抬头" name="first" :style="navColor"></el-tab-pane>
      <el-tab-pane label="系统信息" name="second"></el-tab-pane>
    </el-tabs>
    <!-- tab内容 -->
    <div class="auto-sibling">
      <tab-con-first
        v-show="activeName == 'first'"
        @payTypeChange="payTypeChangeHandler"
        @getData="getTopTabFirstData"
        ref="topTabFirst"
      ></tab-con-first>
      <div v-show="activeName == 'second'" class="input-div" style="height:315px;">
        <el-col :span="5" class="el-col">
          <label>创建人</label>
          <el-input
            v-model="paymentDetail.createdName"
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
            v-model="paymentDetail.createdTime"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>修改人</label>
          <el-input
            v-model="paymentDetail.updatedName"
            disabled
            class="el-inputs"
            size="small"
            placeholder="请输入"
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>修改日期</label>
          <el-date-picker
            class="el-inputs"
            disabled
            size="mini"
            v-model="paymentDetail.updatedTime"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-col>
      </div>
    </div>

    <!-- 下部tab内容 -->
    <el-tabs v-if="status!=-1 && isBusiness!=1" class="el-tabs auto-sibling" v-model="handerOn" type="card">
      <el-tab-pane  label="付款明细" name="credit" :style="navColor"></el-tab-pane>
      <el-tab-pane label="票据明细" name="claims"></el-tab-pane>
    </el-tabs>
    <bottom-table-first
      v-auto
      v-show="handerOn == 'credit'  && status!=-1"
      ref="tableDetail"
      :key="'tableDetail'"
      :payment="paymentDetail"
      @getData="getTableDetailData"
    ></bottom-table-first>

    <bottom-table-second
      v-show="handerOn == 'claims' && status!=-1"
      v-auto
      :key="'tableDetailbills'"
      ref="tableDetailbills"
      @getData="getTableDetailBillsData"
    ></bottom-table-second>
  </div>
</template>
<script>
import tabConFirst from "./tabConFirst";
import bottomTableFirst from "./bottomTableFirst";
import bottomTableSecond from "./bottomTableSecond";
import { addPayment, updatePayment } from "@/api/paymentManage/paymentDetail";
export default {
  name: "paymentDetail",
  components: { tabConFirst, bottomTableFirst, bottomTableSecond },
  data() {
    return {
      companyName: "",
      branchName: "",
      billAmtTotal: "",
      navColor: {
        button: {
          backgroundColor: "",
        },
      },
      activeName: "first",
      handerOn: "credit",
      loading: false,
      paymentDetail: {},
      isBusiness: "", //是否为业务单据
    };
  },
  computed: {
    flag() {
      return this.$store.state.route.params.editFlag;
    },
    id() {
      return this.$route.params.id;
    },
    status() {
      return this.$route.params.status;
    },
    conUseBills() {
      return [10310010, 10310020, 10310045, 10310120].findIndex(
        (item) => item === this.$store.state.paymentDetail.paymentMain.payType
      ) === -1
        ? false
        : true;
    },
  },
  mounted() {
    this.isBusiness = sessionStorage.getItem("isBusiness");
    console.log(this.isBusiness);
  },
  methods: {
    goBack() {
      sessionStorage.removeItem("isBusiness");
      this.$router.push({ name: "paymentOrder" });
    },

    getTopTabFirstData(data) {
      this.paymentDetail = data;
      this.postData = JSON.parse(JSON.stringify(data));
    },
    //获取明细table
    getTableDetailData(data) {
      if (data.length > 0) {
        let postData = JSON.parse(JSON.stringify(data));
        postData.map((item, index) => {
          delete item["edit"];
          delete item["one"];
          item.itemsRowNo = (index + 1) * 10;
        });
        this.postData.itemsList = postData;
      }
    },
    //获取票据table
    getTableDetailBillsData(data) {
      let total = 0;
      if (data.length > 0) {
        let postData = JSON.parse(JSON.stringify(data));
        postData.map((item, index) => {
          delete item["edit"];
          delete item["one"];
          item.itemsRowNo = (index + 1) * 10;
          total = this.$calculationAmount(total, item.billAmt, "add");
        });
        this.postData.fiPaymentBillItemsList = postData;
        this.billAmtTotal = total;
      }
    },
    savePaymentDetail() {
      let httpObj;
      if (this.id == 0) {
        httpObj = addPayment;
      } else {
        httpObj = updatePayment;
      }
      if (!this.$refs.topTabFirst.postData()) return;
      let isBusiness=sessionStorage.getItem("isBusiness");
      if(isBusiness!=1){
        if (!this.$refs.tableDetail.postData()) return;
        if (this.status != -1) {
          if (this.conUseBills) {
            if (!this.$refs.tableDetailbills.postData()) return;
            if (this.billAmtTotal != this.postData.payAmtTotal) {
              this.$message({
                message: "票据金额和付款金额不一致，请修改票据金额或付款金额",
                type: "warning",
              });
              return;
            }
          }
        }
      }
      
      let params = { ...this.postData };
      httpObj(params).then((res) => {
        if (res.code === "success") {
          this.$openSuccess(res.message);
          sessionStorage.removeItem("isBusiness");
          this.$router.push({ name: "paymentOrder" });
        }
      });
    },
    //清空票据
    payTypeChangeHandler() {
      this.$refs.tableDetailbills.clearBills();
    },
  },
};
</script>
<style lang="scss" >
.paymentDetail {
  .input-div .el-col {
    margin: 8px 0 0 10px;
    height: 26px;
  }
  .input-div .el-col .el-input__icon {
    line-height: 25px;
  }
  .input-div label {
    width: 30%;
    vertical-align: middle;
  }
  .input-div .el-textarea__inner {
    border-color: #97999e !important;
  }
  .el-col {
    position: relative;
    .comicon {
      width: 170px;
      height: 20px;
      position: absolute;
      right: 6px;
      top: 7px;
      cursor: pointer;
    }
  }
  .table-div {
    width: 100%;
    overflow: hidden;
    background: #ffffff;
    text-align: left;
  }
}
</style>
