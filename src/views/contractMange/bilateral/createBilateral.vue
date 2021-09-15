<template>
  <div class="createBilateral content-div2">
    <div class="button-div">
      <el-button icon="el-icon-suitcase" class="query-button" @click="addSub">保存</el-button>
      <el-button icon="el-icon-close" @click="goBack">取消</el-button>
    </div>
    <!-- tab标签 -->
    <el-tabs class="el-tabs" v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="合同基本信息" name="first" :style="navColor"></el-tab-pane>
      <el-tab-pane label="供应商业务详情" name="second"></el-tab-pane>
      <el-tab-pane label="客户业务详情" name="third"></el-tab-pane>
      <el-tab-pane label="版本" name="fourth"></el-tab-pane>
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
      <tab-fourth ref="fourth"></tab-fourth>
    </div>
    <div v-show="activeName2 == 'fifth'">
      <tab-fifth ref="fifth" @get="get"></tab-fifth>
    </div>
    <div v-show="activeName2 == 'sixth'">
      <tab-sixth ref="sixth"></tab-sixth>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import tabFirst from "@/views/contractMange/bilateral/tabFirst.vue";
import tabSecond from "@/views/contractMange/bilateral/tabSecond.vue";
import tabThird from "@/views/contractMange/bilateral/tabThird.vue";
import tabFourth from "@/views/contractMange/bilateral/tabFourth.vue";
import tabFifth from "@/views/contractMange/bilateral/tabFifth.vue";
import tabSixth from "@/views/contractMange/bilateral/tabSixth.vue";

import Amange from "@/api/contractMange/amange";
import { Message, Loading } from "element-ui";
export default {
  name: "createBilateral",
  data() {
    return {
      activeName2: "first", //标签页
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
      show: true,
      addData: [], //数据
      getData: {} //获取数据
    };
  },
  created() {
    this.$route.query.id && this.getDeatail();
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
      let param = {
        contractId: this.$route.query.id
      };
      Amange.getCon(param)
        .then(res => {
          // this.$openSuccess(res.message);
        })
        .catch(err => {
          this.$openWarning(err.message);
        });
    },
    // 获取标签
    handleClick(tab, event) {},
    goBack() {
      this.$router.push("/index/contractMange/bilateral/bilateralContracts");
    },
    get(e, o) {
       
      switch (o) {
        case 1:
          this.getData.odPsContractForm = e;
          break;
        case 2:
          this.getData.odPsContractPoForm = e;
          break;
        case 3:
          this.getData.odPsContractSoForm = e;
          break;
        case 4:
          this.getData.sysSystemAccessoryList = e;
          break;
        default:
      }
      this.addData.push(e);
      if (this.addData.length == 4) {
          //使用Element loading-start 方法
        var loading = Loading.service({
          lock: true,
          text: "处理中...",
          background: "rgba(0, 0, 0, 0.7)"
        });
        let param = this.getData;
        Amange.savetList(param)
          .then(res => {
            // this.$openSuccess(res.message);
            loading.close();
            this.goBack();
          })
          .catch(err => {
            loading.close();
            this.$openWarning(err.message);
          });
      }
    },
    //保存数据
    addSub() {
      this.addData = [];
      this.$refs["first"].to();
      this.$refs["second"].to();
      this.$refs["third"].to();
      this.$refs["fifth"].to();
    },
    off() {
      this.$root.Bus.$off("gyshth");
      this.$root.Bus.$off("khhth");
      this.$root.Bus.$off("companyName");
      this.$root.Bus.$off("signTime");
      this.$root.Bus.$off("branchName");
      this.$root.Bus.$off("staffName");
      this.$root.Bus.$off("projectName");
      this.$root.Bus.$off("custName");
      this.$root.Bus.$off("supplierName");
      this.$root.Bus.$off("matterList");
      this.$root.Bus.$off("matterListIndex");
      this.$root.Bus.$off("gyshth");
    }
  },
  beforeDestroy() {
    this.off();
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
    tabSixth
  }
};
</script>

<style lang="scss">
</style>
