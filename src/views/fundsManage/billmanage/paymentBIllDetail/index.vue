<template>
  <div class="paymentBIllDetail">
    <el-divider></el-divider>
    <div class="button-div auto-sibling">
      <el-button
        v-show="type===1"
        class="query-button"
        icon="el-icon-suitcase"
        @click="savePaymentDetail"
      >保存</el-button>
      <el-button
        v-show="type===3"
        class="query-button"
        icon="el-icon-money"
        @click="postFiPaymentBill"
      >过账</el-button>
      <el-button
        v-show="type===4"
        class="query-button"
        icon="el-icon-document-delete"
        @click="WriteOff"
      >冲销</el-button>
      <el-button @click="goBack" :icon="type===2?'el-icon-back':'el-icon-close'">
        {{
        type===2 ? "返回" : "取消"
        }}
      </el-button>
    </div>
    <el-divider></el-divider>
    <!-- tab标签 -->
    <el-tabs class="el-tabs auto-sibling" v-model="activeName" type="card">
      <el-tab-pane label="基本信息" name="first" :style="navColor"></el-tab-pane>
      <el-tab-pane v-if="type===1" label="系统信息" name="second"></el-tab-pane>
    </el-tabs>
    <!-- tab内容 -->
    <div class="auto-sibling">
      <tab-con-first v-show="activeName == 'first'" @getData="getTopTabFirstData" ref="topTabFirst"></tab-con-first>
      <div v-show="activeName == 'second'" v-if="type===1" class="input-div" style="height:337px;">
        <el-col :span="5" class="el-col">
          <label>创建人</label>
          <el-input
            v-model="paymentBillDetail.createdName"
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
            v-model="paymentBillDetail.createdTime"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>修改人</label>
          <el-input
            v-model="paymentBillDetail.updatedName"
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
            v-model="paymentBillDetail.updatedTime"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-col>
      </div>
    </div>
    <!-- 下部tab内容 -->
    <el-tabs
      class="el-tabs auto-sibling"
      v-model="handerOn"
      type="card"
      v-show="type===2||type===3||type===4"
    >
      <el-tab-pane label="付款明细" name="credit" :style="navColor"></el-tab-pane>
    </el-tabs>
    <template v-if="type===2||type===3||type===4">
      <bottom-table-first
        v-show="handerOn=='credit'"
        v-auto
        ref="tableDetail"
        @reload="reload"
        @getData="getTableDetailData"
        :tableData="paymentBillDetail.fiBillPayableItemsEs"
        :billAmt="paymentBillDetail.billAmt"
        :companyId="paymentBillDetail.companyId"
        :rmbCurrencyRate="paymentBillDetail.rmbCurrencyRate"
      ></bottom-table-first>
    </template>
  </div>
</template>
<script>
import tabConFirst from "./tabConFirst";
import bottomTableFirst from "./bottomTableFirst";
import {
  addFiPaymentBill,
  editFiPaymentBill,
  postFiPaymentBill,
  writeOffFiPaymentBill
} from "@/api/billManage/paymentBIllDetail";
export default {
  name: "paymentBIllDetail",
  components: { tabConFirst, bottomTableFirst },
  data() {
    return {
      companyName: "",
      branchName: "",
      tableData: [],
      navColor: {
        button: {
          backgroundColor: ""
        }
      },
      activeName: "first",
      handerOn: "credit",
      loading: false,
      paymentBillDetail: {}
    };
  },
  computed: {
    flag() {
      return this.$store.state.route.params.editFlag;
    },
    id() {
      return this.$route.params.id;
    },
    type() {
      return this.$store.state.route.params.type;
    }
  },
  methods: {
    goBack() {
      this.$router.push({ name: "paymentBills" });
    },
    getTopTabFirstData(data) {
      this.paymentBillDetail = data;
      this.postData = JSON.parse(JSON.stringify(data));
    },
    getTableDetailData(data) {
      if (data.length > 0) {
        let postData = JSON.parse(JSON.stringify(data));
        postData.map((item, index) => {
          delete item["edit"];
          delete item["one"];
          item.rowno = (index + 1) * 10;
        });
        this.postData.fiBillPayableItemsEs = postData;
      }
    },
    savePaymentDetail() {
      let httpObj;
      if (this.id == 0) {
        httpObj = addFiPaymentBill;
      } else {
        httpObj = editFiPaymentBill;
      }
      if (!this.$refs.topTabFirst.postData()) return;
      let params = { ...this.postData };
      httpObj(params).then(res => {
        if (res.code === "success") {
          this.$openSuccess(res.message);
          this.$router.push({ name: "paymentBills" });
        }
      });
    },
    //过账
    postFiPaymentBill() {
      if (!this.$refs.topTabFirst.postData()) return;
      if (!this.$refs.tableDetail.postData()) return;
      let params = { ...this.postData };
      this.$confirm("是否确定过账该票据?", "过账提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          postFiPaymentBill(params).then(res => {
            if (res.code === "success") {
              this.$openSuccess(res.message);
              this.$router.push({ name: "paymentBills" });
            }
          });
        })
        .catch(() => {});
    },
    //冲销
    WriteOff() {
      if (!this.$refs.topTabFirst.postData()) return;
      let params = { ...this.postData };
      this.$confirm("是否确定冲销该票据?", "过账提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          writeOffFiPaymentBill(params).then(res => {
            if (res.code === "success") {
              this.$openSuccess(res.message);
              this.$router.push({ name: "paymentBills" });
            }
          });
        })
        .catch(() => {});
    },
    //reload
    reload() {
      this.$refs.topTabFirst.getPaymentBillDetail();
    }
  }
};
</script>
<style lang="scss" scoped>
.paymentBIllDetail {
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
