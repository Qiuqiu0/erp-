<template>
  <div class="demandPaymentDetail">
    <el-divider class="auto-sibling"></el-divider>
    <div class="button-div auto-sibling" v-if="flag!=3">
      <el-button
        v-show="flag==1"
        icon="el-icon-suitcase"
        class="query-button"
        @click="savePaymentDetail"
      >保存</el-button>
       <el-button
        v-show="flag==2"
        icon="el-icon-suitcase"
        class="query-button"
        @click="closePayMent"
      >提交</el-button>
      <el-button
        @click="goBack"
        :icon="flag==1?'el-icon-close':'el-icon-back'"
      >{{ flag==1? "取消" : "返回" }}</el-button>
    </div>
    <div class="button-div auto-sibling" v-else>
       <el-button
        icon="el-icon-suitcase"
        class="query-button"
        @click="approvalDetail('11610015')"
      >通过</el-button>
       <el-button
        icon="el-icon-suitcase"
        class="query-button"
        @click="approvalDetail('11610020')"
      >驳回</el-button>
    </div>
    <el-divider></el-divider>
    <!-- tab标签 -->
    <el-tabs class="el-tabs auto-sibling" v-model="activeName" type="card">
      <el-tab-pane label="付款单抬头" name="first" :style="navColor"></el-tab-pane>
      <el-tab-pane label="打印及附件" name="second" :style="navColor"></el-tab-pane>
      <el-tab-pane label="付款单信息" name="third" :style="navColor"></el-tab-pane>
      <el-tab-pane label="系统信息" name="fourth"></el-tab-pane>
       <el-tab-pane label="流程详情"
              name="lcxq">
          <div class="input-div input-div-bor bortop0">
              <v-exmineStatus :id="paymentId"></v-exmineStatus>
          </div>
      </el-tab-pane>
    </el-tabs>
    <!-- tab内容 -->
    <div class="auto-sibling">
      <div v-show="activeName == 'first'">
        <tab-con-first @getData="getTopTabFirstData" ref="topTabFirst"></tab-con-first>
      </div>
      <div v-show="activeName == 'second'" style="height:398px;background: #ffffff;">
        <tab-con-second ref="fileTab" :paymentId="paymentDetail.id"></tab-con-second>
      </div>
      <div v-show="activeName == 'third'" style="height:398px;background: #ffffff;">
        <el-table border center :data="tableData">
          <el-table-column show-overflow-tooltip prop="paymentCode" label="付款单号"></el-table-column>
          <el-table-column show-overflow-tooltip prop="payDate" label="付款日期">
            <template slot-scope="scope">
              <span>{{ scope.row.payDate | time2Date }}</span>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="payAmtTotal" label="付款金额（业务币）"></el-table-column>
          <el-table-column show-overflow-tooltip prop="baseCurrencyRate" label="汇率（本位币）"></el-table-column>
          <el-table-column show-overflow-tooltip prop="payAmtTotalBase" label="付款金额（本位币）"></el-table-column>
        </el-table>
      </div>
      <div v-show="activeName == 'fourth'" class="input-div" style="height:398px;">
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
            size="small"
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
            size="small"
            v-model="paymentDetail.updatedTime"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-col>
      </div>
    </div>
    <!-- 下部tab内容 -->
    <el-tabs class="el-tabs auto-sibling" v-model="handerOn" type="card" style>
      <el-tab-pane label="明细" name="credit" :style="navColor"></el-tab-pane>
    </el-tabs>
    <template
      v-if="$store.state.applyPaymentDetail.applyInvoiceType === 10540015&&handerOn == 'credit'"
    >
      <sale-table-detail
        v-auto
        @getData="getTableDetailData"
        :paymentDetail="paymentDetail"
        ref="tableDetail"
      ></sale-table-detail>
    </template>
    <template
      v-if="$store.state.applyPaymentDetail.applyInvoiceType === 10540010&&handerOn == 'credit'"
    >
      <purchase-table-detail
        v-auto
        @getData="getTableDetailData"
        :paymentDetail="paymentDetail"
        ref="tableDetail"
      ></purchase-table-detail>
    </template>
    <template
      v-if="$store.state.applyPaymentDetail.applyInvoiceType === 10540020&&handerOn == 'credit'"
    >
      <cost-table-detail
         v-auto
        @getData="getTableDetailData"
        :paymentDetail="paymentDetail"
        ref="tableDetail"
      ></cost-table-detail>
    </template>
    <template
      v-if="$store.state.applyPaymentDetail.applyInvoiceType === 10540005&&handerOn == 'credit'"
    >
      <contract-table-detail
        v-auto
        @getData="getTableDetailData"
        :paymentDetail="paymentDetail"
        ref="tableDetail"
      ></contract-table-detail>
    </template>
    <template
      v-if="$store.state.applyPaymentDetail.applyInvoiceType === 10540025"
      >
      <payment-detail
          v-auto
          @getData="getTableDetailData"
          :paymentDetail="paymentDetail"
          ref="tableDetail"
      ></payment-detail>
  </template>
  </div>
</template>
<script>
import tabConFirst from "./tabConFirst";
import tabConSecond from "./tabConSecond";
import saleTableDetail from "./saleTableDetail";
import purchaseTableDetail from "./purchaseTableDetail";
import costTableDetail from "./costTableDetail";
import contractTableDetail from "./contractTableDetail";

import ExmineStatus from "@/components/exmineStatus";
import paymentDetail from "./paymentDetail";
import {
  getPaymentApplyDetail,
  addPaymentApply,
  updatePaymentApply,
  getPaymentByApplyCode,
  closeOdPayApply,
  auditClaimPayApply,
} from "@/api/paymentManage/applyPaymentDetail";
export default {
  name: "demandPaymentDetail",
  components: {
    tabConFirst,
    tabConSecond,
    saleTableDetail,
    purchaseTableDetail,
    costTableDetail,
    contractTableDetail,
    "v-exmineStatus": ExmineStatus,
    paymentDetail,
  },
  data() {
    return {
      tableData: [],
      navColor: {
        button: {
          backgroundColor: "",
        },
      },
      activeName: "first",
      handerOn: "credit",
      loading: false,
      paymentDetail: {},
    };
  },
  computed: {
    flag() {
      return this.$store.state.route.params.editFlag;
    },
    id() {
      return this.$route.params.id;
    },
    paymentId() {
      return this.$route.params.paymentId;
    },
  },
  methods: {
    goBack() {
      this.$router.push({ name: "demandForPayment" });
    },
    getTopTabFirstData(data) {
      this.paymentDetail = data;
      this.postData = JSON.parse(JSON.stringify(data));
    },
    getTableDetailData(data) {
      if (data.length > 0) {
        let postData = JSON.parse(JSON.stringify(data));
        postData.map((item, index) => {
          delete item["edit"];
          delete item["one"];
          if (item.hasOwnProperty("poType")) {
            delete item["poType"];
          }
          item.payRowNo = (index + 1) * 10;
        });
        this.postData.odPayApplyItemsList = postData;
      }
    },
    savePaymentDetail() {
      let httpObj;
      if (this.id == 0) {
        httpObj = addPaymentApply;
      } else {
        httpObj = updatePaymentApply;
      }
      if (!this.$refs.topTabFirst.postData()) return;
      let isBusinessPay = sessionStorage.getItem("isBusinessPay");
      if (isBusinessPay == 0) {
        if (!this.$refs.tableDetail.postData()) return;
      }
      //
      let params = { ...this.postData };
      params.sysSystemAccessoryList = this.$refs.fileTab.tableData;
      httpObj(params).then((res) => {
        if (res.code === "success") {
          this.$openSuccess(res.message);
          this.$router.push({ name: "demandForPayment" });
        }
      });
    },
    //通过，驳回
    approvalDetail(claimStatus) {
      if (!this.$refs.topTabFirst.postData()) return;
      let params = { ...this.postData };
      params.sysSystemAccessoryList = this.$refs.fileTab.tableData;
      params.claimStatus = claimStatus;
      auditClaimPayApply(params).then((res) => {
        if (res.code === "success") {
          this.$openSuccess(res.message);
          this.$router.push({ name: "demandForPayment" });
        }
      });
    },
    //关闭申请单
    closePayMent() {
      if (!this.$refs.topTabFirst.postData()) return;
      let params = { ...this.postData };
      console.log(params);
      closeOdPayApply(params).then((res) => {
        if (res.code === "success") {
          this.$openSuccess(res.message);
          this.$router.push({ name: "demandForPayment" });
        }
      });
    },
    getPayment() {
      if (this.id == 0) {
        return;
      }
      getPaymentByApplyCode({ payApplyCode: this.id }).then((res) => {
        if (res.code === "success") {
          this.tableData = res.data;
        }
      });
    },
  },
  mounted() {
    this.getPayment();
  },
};
</script>
<style lang="scss" scoped>
.demandPaymentDetail {
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
