<template>
  <div class="createNetrade content-div2">
    <div class="button-div">
      <el-button icon="el-icon-suitcase" class="query-button" @click="addSub">保存</el-button>
      <el-button icon="el-icon-close" @click="goBack">取消</el-button>
    </div>
    <!-- tab标签 -->
    <el-tabs class="el-tabs" v-model="activeName2" type="card" @tab-click="handleClick" >
      <el-tab-pane label="合同信息" name="first" :style="navColor"></el-tab-pane>
      <el-tab-pane label="付款方式" name="third"></el-tab-pane>
      <el-tab-pane label="运输信息" name="second"></el-tab-pane>
      <el-tab-pane label="关联合同" name="eighth"></el-tab-pane>
      <el-tab-pane label="盈亏测算" name="ninth"></el-tab-pane>
      <el-tab-pane label="合同条款" name="tenth"></el-tab-pane>
      <el-tab-pane label="版本" name="fourth" v-if="!$route.query.change"></el-tab-pane>
      <el-tab-pane label="打印及附件" name="fifth"></el-tab-pane>
      <el-tab-pane label="系统信息" name="sixth"></el-tab-pane>
    </el-tabs>
    <!-- tab标签 -->
    <!-- 合同基本信息 -->
    <div v-show="activeName2 == 'first'">
      <tab-first ref="first" @get="get"></tab-first>
    </div>
    <div v-show="activeName2 == 'second'">
      <tab-second ref="second" @get="get"></tab-second>
    </div>
    <div v-show="activeName2 == 'third'">
      <tab-third ref="third" @get="get"></tab-third>
    </div>
    <div v-show="activeName2 == 'fourth'">
      <tab-fourth ref="fourth" @get="get" v-if="!$route.query.change"></tab-fourth>
    </div>
    <div v-show="activeName2 == 'fifth'">
      <tab-fifth ref="fifth" @get="get"></tab-fifth>
    </div>
    <div v-show="activeName2 == 'sixth'">
      <tab-sixth ref="sixth" @get="get"></tab-sixth>
    </div>
    <div v-show="activeName2 == 'eighth'">
      <tab-eight ref="eighth" @get="get"></tab-eight>
    </div>
    <div v-show="activeName2 == 'ninth'">
      <tab-ninth ref="ninth" @get="get"></tab-ninth>
    </div>
    <div v-show="activeName2 == 'tenth'">
      <tab-tenth ref="tenth" @get="get"></tab-tenth>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import tabFirst from "@/views/contractMange/netrade/tabFirst.vue";
import tabSecond from "@/views/contractMange/netrade/tabSecond.vue";
import tabThird from "@/views/contractMange/netrade/tabThird.vue";
import tabFourth from "@/views/contractMange/netrade/tabFourth.vue";
import tabFifth from "@/views/contractMange/netrade/tabFifth.vue";
import tabSixth from "@/views/contractMange/netrade/tabSixth.vue";
import tabEight from "@/views/contractMange/netrade/tabEight.vue";
import tabNinth from "@/views/contractMange/netrade/tabNinth.vue";
import tabTenth from "@/views/contractMange/netrade/tabTenth.vue";

import Cmange from "@/api/contractMange/cmange";
import { Message, Loading } from "element-ui";
export default {
  name: "createNetrade",
  data() {
    return {
      activeName2: "first", //标签页
      getData: {},
      dataLength: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      pickerClose: {},
      navColor: {
        button: {
          backgroundColor: ""
        }
      },
      show: true
    };
  },
  created() {
    // this.$route.query.contractId && this.getDeatail();
  },
  mounted() {
    if (localStorage.themecolor) {
      this.navColor.button.backgroundColor =
        "#" + localStorage.getItem("themecolor");
    } else {
      this.navColor.button.backgroundColor = "#" + this.themecolor;
    }
  },
  methods: {
    //获取详情
    getDeatail() {
      let param = this.getData;
      Cmange.save(param)
        .then(res => {
          this.goBack();
        })
        .catch(err => {
          this.$openWarning(err.message);
        });
    },
    // 获取标签
    handleClick(tab, event) {},
    goBack() {
      this.$router.push("/index/contractMange/netrade/netradecontract");
    },
    get(e, o) {
      
      switch (o) {
        case 1:
          //销售合同主表
          this.getData.odPoContract = e.odPoContract;
          this.getData.odPoContractItemsList = e.odPoContractItemsList;
          this.dataLength.push(1);
          break;
        case 2:
          //收款方式
          this.getData.odPoPaymentFormList = e;
          this.dataLength.push(2);
          break;
        // case 3:
        //   //销售合同计息
        //   this.getData.odSoContractProfilePart = e;
        //   this.dataLength.push(3);
        //   break;
        case 4:
          //运输信息
          this.getData.odPoTransferInfo = e.odPoTransferInfo;
          this.getData.odPoCtiPathsFormList = e.odPoCtiPathsList;
          this.dataLength.push(4);
          break;
        case 5:
          //关联合同
          this.getData.odPoSoFormList = e;
          this.dataLength.push(5);
          break;
        case 6:
          //盈亏预测
          this.getData.odPoSimulateList = e.odPoSimulateList;
          this.getData.poContractProfileSimulateDetailList =
            e.poContractProfileSimulateDetailList;
          this.dataLength.push(6);
          break;
        case 7:
          //销售合同条款
          this.getData.odPoTermFormList = e;
          this.dataLength.push(7);
          break;
        case 8:
          //附件
          this.getData.sysSystemAccessoryList = e;
          this.dataLength.push(8);
          break;
        default:
      }
      if (this.dataLength.length == 7) {
        if (this.$route.query.change) {
          //变更合同
          this.$confirm("您确定需要变更吗？", {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
                //使用Element loading-start 方法
              var loading = Loading.service({
                lock: true,
                text: "处理中...",
                background: "rgba(0, 0, 0, 0.7)"
              });
              this.getData.isChange = 1;
              let param = this.getData;
              Cmange.save(param)
                .then(res => {
                  loading.close();
                  this.$openSuccess(res.message);
                  this.goBack();
                })
                .catch(err => {
                  loading.close();
                  this.$openWarning(err.message);
                });
            })
            .catch();
        } else {
            //使用Element loading-start 方法
          var loading2 = Loading.service({
            lock: true,
            text: "处理中...",
            background: "rgba(0, 0, 0, 0.7)"
          });
          let param = this.getData;
          Cmange.save(param)
            .then(res => {
              loading2.close();
              this.$openSuccess(res.message);
              this.goBack();
            })
            .catch(err => {
              loading2.close();
              this.$openWarning(err.message);
            });
        }
      }
    },
    //保存数据
    addSub() {
      this.dataLength = [];
      this.getData = {};
      this.$refs["first"].to();
      this.$refs["second"].to();
      this.$refs["third"].to();
      this.$refs["fifth"].to();
      this.$refs["eighth"].to();
      this.$refs["ninth"].to();
      this.$refs["tenth"].to();
    }
  },
  computed: {
    ...mapState({
      themecolor: "themecolor"
    })
  },
  watch: {
    themecolor: {
      handler() {
        this.navColor.button.backgroundColor = "#" + this.themecolor;
      }
    }
  },
  // beforeRouteLeave(to, from, next) {
  //   this.$root.Bus.$off("supplierName");
  //   this.$root.Bus.$off("companyNine");
  //   this.$root.Bus.$off("signTime");
  //   this.$root.Bus.$off("branchName");
  //   this.$root.Bus.$off("staffName");
  //   this.$root.Bus.$off("projectName");
  //   this.$root.Bus.$off("currency");
  //   this.$root.Bus.$off("custName");
  //   this.$root.Bus.$off("matterList");
  //   this.$root.Bus.$off("taxAmt");
  //   this.$root.Bus.$off("company");
  //   this.$root.Bus.$off("no");
  //   this.$root.Bus.$off("currencyRate");
  //   this.$root.Bus.$off("currencyName");
  //   this.$root.Bus.$off("vat");

  //   this.$root.Bus.$off("contractAmtVat");
  //   this.$root.Bus.$off("originTaxAmt");
  //   next();
  // },
  components: {
    tabFirst,
    tabSecond,
    tabThird,
    tabFourth,
    tabFifth,
    tabSixth,
    tabEight,
    tabNinth,
    tabTenth
  }
};
</script>

<style lang="scss">
</style>
