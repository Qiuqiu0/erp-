<template>
  <div class="receivableBillDetail">
    <el-divider></el-divider>
    <div class="button-div">
      <el-button
        v-show="type!==2"
        class="query-button"
        icon="el-icon-suitcase"
        @click="setReceivableBill"
      >保存</el-button>
      <el-button
        v-show="type===3||type===4||type===5"
        class="query-button"
        icon="el-icon-money"
        @click="post"
      >过账</el-button>
      <el-button
        v-show="type===3||type===4||type===5"
        class="query-button"
        icon="el-icon-document-delete"
        @click="writeOff"
      >冲销</el-button>
      <el-button @click="goBack" :icon="type===2?'el-icon-back':'el-icon-close'">
        {{
        type===2 ? "返回" : "取消"
        }}
      </el-button>
    </div>
    <el-divider></el-divider>
    <!-- tab标签 -->
    <el-tabs class="el-tabs" v-model="activeName" type="card">
      <el-tab-pane label="基本信息" name="first" :style="navColor"></el-tab-pane>
      <el-tab-pane label="内部贴现" name="second" :style="navColor"></el-tab-pane>
      <el-tab-pane label="贴现" name="third" :style="navColor"></el-tab-pane>
      <el-tab-pane label="背书" name="fourth" :style="navColor"></el-tab-pane>
      <el-tab-pane label="托收" name="fifth" :style="navColor"></el-tab-pane>
      <el-tab-pane label="质押/赎回" name="sixth"></el-tab-pane>
      <el-tab-pane label="关联" name="seventh"></el-tab-pane>
      <el-tab-pane label="系统信息" name="eighth"></el-tab-pane>
    </el-tabs>
    <!-- 基本信息 -->
    <tab-con-first v-show="activeName == 'first'" @getData="getTopTabFirstData" ref="topTabFirst"></tab-con-first>
    <!-- 内部贴现 -->
    <tab-con-second
      v-show="activeName == 'second'"
      ref="topTabSecond"
      :fiGatheringBill="fiGatheringBill"
      :instrumentAmt="fiGatheringBill.instrumentAmt"
      style="height:349px;"
    ></tab-con-second>
    <!-- 贴现 -->
    <tab-con-third
      :fiGatheringBill="fiGatheringBill"
      v-show="activeName == 'third'"
      ref="topTabThird"
      style="height:349px;"
    ></tab-con-third>
    <!--背书 -->
    <tab-con-fourth
      v-show="activeName == 'fourth'"
      :paymentDetail="paymentDetail"
      style="height:349px;"
    ></tab-con-fourth>
    <!--托收-->
    <tab-con-fifth
      v-show="activeName == 'fifth'"
      :fiGatheringBill="fiGatheringBill"
      ref="topTabFifth"
      style="height:349px;"
    ></tab-con-fifth>
    <!--质押/赎回-->
    <tab-con-sixth
      v-show="activeName == 'sixth'"
      :fiGatheringBill="fiGatheringBill"
      ref="topTabSixth"
      style="height:347px;"
    ></tab-con-sixth>
    <!--关联-->
    <tab-con-seventh
      v-show="activeName == 'seventh'"
      :gatheringDetail="gatheringDetail"
      style="height:349px;"
    ></tab-con-seventh>
    <!--系统信息-->
    <div v-show="activeName == 'eighth'" class="input-div" style="height:349px;">
      <el-col :span="5" class="el-col">
        <label>创建人</label>
        <el-input
          v-model="fiGatheringBill.createdName"
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
          v-model="fiGatheringBill.createdTime"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>修改人</label>
        <el-input
          v-model="fiGatheringBill.updatedName"
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
          v-model="fiGatheringBill.updatedTime"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
      </el-col>
    </div>
  </div>
</template>
<script>
import tabConFirst from "./tabConFirst";
import tabConSecond from "./tabConSecond";
import tabConThird from "./tabConThird";
import tabConFourth from "./tabConFourth";
import tabConFifth from "./tabConFifth";
import tabConSixth from "./tabConSixth";
import tabConSeventh from "./tabConSeventh";
import {
  addFiGatheringBill,
  editFiGatheringBill,
  getRelationPayment,
  getRelationGathering,
  getFiGatheringbillRecite,
  internalDiscount,
  discount,
  collection,
  pledgeOrRedeem,
  postInsideDiscount,
  writeOffInsideDiscount,
  postDiscount,
  writeOffDiscount,
  postCollection,
  writeOffCollection
} from "@/api/billManage/receivableBillDetail";
export default {
  name: "receivableBillDetail",
  components: {
    tabConFirst,
    tabConSecond,
    tabConThird,
    tabConFourth,
    tabConFifth,
    tabConSixth,
    tabConSeventh
  },
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
      fiGatheringBill: {},
      gatheringDetail: {}, //关联收款单
      paymentDetail: {} //关联付款单
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
    },
    instrumentBillNo() {
      return this.$store.state.route.params.instrumentBillNo;
    }
  },
  methods: {
    goBack() {
      this.$router.push({ name: "receivableBills" });
    },
    getTopTabFirstData(data) {
      this.fiGatheringBill = data;
      this.postData = JSON.parse(JSON.stringify(data));
    },
    getRelationPayment() {
      if (this.id == 0) return;
      getFiGatheringbillRecite({ instrumentBillNo: this.instrumentBillNo }).then(
        res => {
          if (res.code === "success") {
            this.paymentDetail = res.data;
          }
        }
      );
    },
    getRelationGathering() {
      if (this.id == 0) return;
      getRelationGathering({ instrumentBillNo: this.instrumentBillNo }).then(
        res => {
          if (res.code === "success") {
            this.gatheringDetail = res.data;
          }
        }
      );
    },
    setReceivableBill() {
      switch (this.type) {
        case 1: //基本信息新增修改
          this.savePaymentDetail();
          break;
        case 3: //内部贴现
          this.internalDiscount();
          break;
        case 4: //贴现
          this.discount();
          break;
        case 5: //托收
          this.collection();
          break;
        case 6: //质押/赎回
          this.pledgeOrRedeem();
          break;
        default:
          break;
      }
    },
    //新建或修改
    savePaymentDetail() {
      let httpObj;
      if (this.id == 0) {
        httpObj = addFiGatheringBill;
      } else {
        httpObj = editFiGatheringBill;
      }
      if (!this.$refs.topTabFirst.postData()) return;
      let params = { ...this.postData };
      httpObj(params).then(res => {
        if (res.code === "success") {
          this.$openSuccess(res.message);
          this.$router.push({ name: "receivableBills" });
        }
      });
    },
    //内部贴现
    internalDiscount() {
      if (!this.$refs.topTabSecond.postData()) return;
      let params = JSON.parse(
        JSON.stringify(this.$refs.topTabSecond.postData())
      );
      internalDiscount(params).then(res => {
        if (res.code === "success") {
          this.$openSuccess(res.message);
          this.$router.push({ name: "receivableBills" });
        }
      });
    },
    //贴现
    discount() {
      if (!this.$refs.topTabThird.postData()) return;
      let params = JSON.parse(
        JSON.stringify(this.$refs.topTabThird.postData())
      );
      discount(params).then(res => {
        if (res.code === "success") {
          this.$openSuccess(res.message);
          this.$router.push({ name: "receivableBills" });
        }
      });
    },
    //托收
    collection() {
      if (!this.$refs.topTabFifth.postData()) return;
      let params = JSON.parse(
        JSON.stringify(this.$refs.topTabFifth.postData())
      );
      collection(params).then(res => {
        if (res.code === "success") {
          this.$openSuccess(res.message);
          this.$router.push({ name: "receivableBills" });
        }
      });
    },
    //质押/赎回
    pledgeOrRedeem() {
      if (!this.$refs.topTabSixth.postData()) return;
      let params = JSON.parse(
        JSON.stringify(this.$refs.topTabSixth.postData())
      );
      params.map((item, index) => {
        delete item["edit"];
        delete item["one"];
        item.rowno = (index + 1) * 10;
      });
      pledgeOrRedeem({ fiBillPledgeForm: params }).then(res => {
        if (res.code === "success") {
          this.$openSuccess(res.message);
          this.$router.push({ name: "receivableBills" });
        }
      });
    },
    //冲销 内部贴现 贴现 托收
    post() {
      let httpObj = {
        3: postInsideDiscount,
        4: postDiscount,
        5: postCollection
      };
      let keyObj = { 3: "topTabSecond", 4: "topTabThird", 5: "topTabFifth" };
      let ref = keyObj[this.type];
      if (!this.$refs[ref].post()) return;
      let params = JSON.parse(JSON.stringify(this.$refs[ref].post()));
      httpObj[this.type](params).then(res => {
        if (res.code === "success") {
          this.$openSuccess("操作成功");
          this.$router.push({ name: "receivableBills" });
        }
      });
    },
    //内部贴现 贴现 托收 冲销
    writeOff() {
      let httpObj = {
        3: writeOffInsideDiscount,
        4: writeOffDiscount,
        5: writeOffCollection
      };
      let keyObj = { 3: "topTabSecond", 4: "topTabThird", 5: "topTabFifth" };
      let ref = keyObj[this.type];
      if (!this.$refs[ref].writeOff()) return;
      let params = JSON.parse(JSON.stringify(this.$refs[ref].writeOff()));
      httpObj[this.type](params).then(res => {
        if (res.code === "success") {
          this.$openSuccess("操作成功");
          this.$router.push({ name: "receivableBills" });
        }
      });
    }
  },
  mounted() {
    switch (this.type) {
      case 1: //基本信息新增修改
        this.activeName = "first";
        break;
      case 3: //内部贴现
        this.activeName = "second";
        break;
      case 4: //贴现
        this.activeName = "third";
        break;
      case 5: //托收
        this.activeName = "fifth";
        break;
      case 6: //质押/赎回
        this.activeName = "sixth";
        break;
      default:
        break;
    }
    this.getRelationPayment();
    this.getRelationGathering();
  }
};
</script>
<style lang="scss" scoped>
.receivableBillDetail {
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
  .el-checkbox::after {
    content: "";
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
}
</style>
