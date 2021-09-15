<template>
  <div class="exportDetail content-div2">
    <div class="button-div">
      <!-- <el-button icon="el-icon-suitcase" class="query-button"  @click="addSub">保存</el-button> -->
      <el-button icon="el-icon-back" @click="goBack">返回</el-button>
    </div>
    <!-- tab标签 -->
    <el-tabs class="el-tabs" v-model="activeName2" type="card" @tab-click="handleClick" >
      <el-tab-pane label="合同信息" name="first" :style="navColor"></el-tab-pane>
      <el-tab-pane label="收款方式" name="third"></el-tab-pane>
      <el-tab-pane label="利息收入" name="seventh"></el-tab-pane>
      <el-tab-pane label="运输信息" name="second"></el-tab-pane>
      <el-tab-pane label="关联合同" name="eighth"></el-tab-pane>
      <el-tab-pane label="盈亏测算" name="ninth"></el-tab-pane>
      <el-tab-pane label="合同条款" name="tenth"></el-tab-pane>
      <el-tab-pane label="版本" name="fourth" v-if="!$route.query.isChange"></el-tab-pane>
      <el-tab-pane label="打印及附件" name="fifth"></el-tab-pane>
      <el-tab-pane label="系统信息" name="sixth"></el-tab-pane>
      <el-tab-pane label="流程详情"
                   name="lcxq">
        <div class="input-div input-div-bor bortop0">
          <v-exmineStatus :id="$route.query.id"></v-exmineStatus>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- tab标签 -->
    <!-- 合同基本信息 -->
    <el-form disabled>
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
      <tab-fourth ref="fourth" @get="get" v-if="!$route.query.isChange"></tab-fourth>
    </div>
    <div v-show="activeName2 == 'sixth'">
      <tab-sixth ref="sixth" @get="get"></tab-sixth>
    </div>
    <div v-show="activeName2 == 'seventh'">
      <tab-seventh ref="seventh" @get="get"></tab-seventh>
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
    </el-form>
    <div v-show="activeName2 == 'fifth'">
      <tab-fifth ref="fifth" @get="get"></tab-fifth>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import tabFirst from "@/views/contractMange/export/exportDetail/tabFirst.vue";
import tabSecond from "@/views/contractMange/export/exportDetail/tabSecond.vue";
import tabThird from "@/views/contractMange/export/exportDetail/tabThird.vue";
import tabFourth from "@/views/contractMange/export/exportDetail/tabFourth.vue";
import tabFifth from "@/views/contractMange/export/exportDetail/tabFifth.vue";
import tabSixth from "@/views/contractMange/export/exportDetail/tabSixth.vue";
import tabSeventh from "@/views/contractMange/export/exportDetail/tabSeventh.vue";
import tabEight from "@/views/contractMange/export/exportDetail/tabEight.vue";
import tabNinth from "@/views/contractMange/export/exportDetail/tabNinth.vue";
import tabTenth from "@/views/contractMange/export/exportDetail/tabTenth.vue";
import ExmineStatus from '@/components/exmineStatus';

import Bmange from "@/api/contractMange/bmange";
export default {
  name: "exportDetail",
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
  created() {},
  mounted() {
    if (localStorage.themecolor) {
      this.navColor.button.backgroundColor =
        "#" + localStorage.getItem("themecolor");
    } else {
      this.navColor.button.backgroundColor = "#" + this.themecolor;
    }
  },
  methods: {
    // 获取标签
    handleClick(tab, event) {},
    goBack() {
      this.$router.push("/index/contractMange/export/exportcontract");
    },
    get(e, o) {
      switch (o) {
        case 1:
          //销售合同主表
          this.getData.odSoContract = e.odSoContract;
          this.getData.odSoContractItemsList = e.odSoContractItemsList;
          this.dataLength.push(1);
          break;
        case 2:
          //收款方式
          this.getData.odPsContractGatheringList = e;
          this.dataLength.push(2);
          break;
        case 3:
          //销售合同计息
          this.getData.odSoContractProfilePart = e;
          this.dataLength.push(3);
          break;
        case 4:
          //运输信息
          this.getData.odSoContractTransferInfo = e.odSoContractTransferInfo;
          this.getData.odSoCtiPathsList = e.odSoCtiPathsList;
          this.getData.odSoTransferTargetList = e.odSoTransferTargetList;
          this.dataLength.push(4);
          break;
        case 5:
          //关联合同
          this.getData.odPoSoList = e;
          this.dataLength.push(5);
          break;
        case 6:
          //盈亏预测
          this.getData.odSoSimulateList = e.odSoSimulateList;
          this.getData.soContractProfileSimulateDetailList =
            e.soContractProfileSimulateDetailList;
          this.dataLength.push(6);
          break;
        case 7:
          //销售合同条款
          this.getData.odSoContractTermList = e;
          this.dataLength.push(7);
          break;
        case 8:
          //附件
          this.getData.sysSystemAccessoryList = e;
          this.dataLength.push(8);
          break;
        default:
      }
      if (this.dataLength.length == 8) {
        let param = this.getData;
        Bmange.save(param)
          .then(res => {
            this.$openSuccess(res.message);
            this.goBack();
          })
          .catch(err => {
            this.$openWarning(err.message);
          });
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
      this.$refs["seventh"].to();
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
  components: {
    tabFirst,
    tabSecond,
    tabThird,
    tabFourth,
    tabFifth,
    tabSixth,
    tabSeventh,
    tabEight,
    tabNinth,
    tabTenth,
    'v-exmineStatus': ExmineStatus
  }
};
</script>

<style lang="scss">
</style>
