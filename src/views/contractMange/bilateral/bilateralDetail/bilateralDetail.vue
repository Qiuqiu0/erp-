<template>
  <div class="bilateralDetail contract_css_link">
    <div class="button-div">
      <!-- <el-button class="query-button"  @click="addSub">保存</el-button> -->
      <el-button @click="goBack" icon="el-icon-back">返回</el-button>
    </div>
    <!-- tab标签 -->
    <el-tabs
      class="el-tabs"
      v-model="activeName2"
      type="card"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="合同基本信息"
        name="first"
        :style="navColor"
      ></el-tab-pane>
      <el-tab-pane label="供应商业务详情" name="second"></el-tab-pane>
      <el-tab-pane label="客户业务详情" name="third"></el-tab-pane>
      <el-tab-pane label="版本" name="fourth"></el-tab-pane>
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

import tabFirst from "@/views/contractMange/bilateral/bilateralDetail/tabFirst.vue";
import tabSecond from "@/views/contractMange/bilateral/bilateralDetail/tabSecond.vue";
import tabThird from "@/views/contractMange/bilateral/bilateralDetail/tabThird.vue";
import tabFourth from "@/views/contractMange/bilateral/bilateralDetail/tabFourth.vue";
import tabFifth from "@/views/contractMange/bilateral/bilateralDetail/tabFifth.vue";
import tabSixth from "@/views/contractMange/bilateral/bilateralDetail/tabSixth.vue";

import ExmineStatus from '@/components/exmineStatus'
import Amange from "@/api/contractMange/amange";
export default {
  name: "bilateralDetail",
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
          // this.$openWarning(err.message);
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
        let param = this.getData;
        Amange.savetList(param)
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
      this.addData = [];
      this.$refs["first"].to();
      this.$refs["second"].to();
      this.$refs["third"].to();
      this.$refs["fifth"].to();
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
    'v-exmineStatus': ExmineStatus
  }
};
</script>

<style lang="scss">
</style>
