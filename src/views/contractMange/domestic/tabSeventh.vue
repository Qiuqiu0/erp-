<template>
  <div class="tabSeventh content-div2 contract_css_link width_contract">
    <!-- 搜索 -->
    <div class="input-div input-div-bor">
      <div>
        <el-col :span="5" class="el-col">
          <label class="">含税月息利率</label>
          <el-input
            v-model="vatProfileRate"
            type="number"
            @input="hsYX"
            class="el-inputs"
            placeholder="请输入"
            v-input-filter:num8
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label class="">含税逾期利率</label>
          <el-input
            v-model="vatPredictRate"
            @input="hsYQ"
            type="number"
            class="el-inputs"
            placeholder="请输入"
            v-input-filter:num8
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-colc">
          <label class="">含税代理费率</label>
          <el-input
            v-model="vatProxyRate"
            @input="hsDL"
            type="number"
            class="el-inputs"
            placeholder="请输入"
            v-input-filter:num8
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>含税代理费</label>
          <el-input
            v-model="vatProxyAmt"
            type="number"
            class="el-inputs"
            placeholder="请输入"
            v-input-filter:num2
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label class="">不含税月息利率</label>
          <el-input
            v-model="extaxProfileRate"
            @input="bhsYX"
            type="number"
            class="el-inputs"
            placeholder="请输入"
            v-input-filter:num8
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label class="">不含税逾期利率</label>
          <el-input
            v-model="extaxPredictRate"
            @input="bhsYQ"
            type="number"
            class="el-inputs"
            placeholder="请输入"
            v-input-filter:num8
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-colc">
          <label class="">不含税代理费率</label>
          <el-input
            v-model="extaxProxyRate"
            @input="bhsDL"
            type="number"
            class="el-inputs"
            placeholder="请输入"
            v-input-filter:num8
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label class="">不含税代理费</label>
          <el-input
            v-model="extaxProxyAmt"
            type="number"
            class="el-inputs"
            placeholder="请输入"
            v-input-filter:num2
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-colc">
          <label>结算汇率</label>
          <el-input
            v-model="settleCurrencyRate"
            type="number"
            class="el-inputs"
            placeholder="请输入"
            v-input-filter:num8
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-colc">
          <label class="">计息放货天数</label>
          <el-input
            v-model="calcDays"
            type="number"
            class="el-inputs"
            placeholder="请输入"
            v-input-filter:num2
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-colc">
          <label>计息天数</label>
          <el-input
            v-model="clacProfileDays"
            type="number"
            class="el-inputs"
            placeholder="请输入"
            v-input-filter:num2
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-colc">
          <label>保证金比率</label>
          <el-input
            v-model="insuranceRate"
            type="number"
            class="el-inputs"
            placeholder="请输入"
            v-input-filter:num8
          ></el-input>
        </el-col>
      </div>
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";
import Bmange from "@/api/contractMange/bmange";
import "@/assets/css/contract.scss";
export default {
  name: "tabSeventh",
  data() {
    return {
      soContractId: ``,
      soContractNo: ``,
      version: ``,
      //核算利息
      vatProfileRate: ``, //含税月息利率
      vatPredictRate: ``, //含税逾期利率
      vatProxyRate: ``, //含税代理费率
      vatProxyAmt: ``, //含税代理费
      extaxProfileRate: ``, //不含税月息<br/>利率
      extaxPredictRate: ``, //不含税逾期<br/>利率
      extaxProxyRate: ``, //不含税代理<br/>费率
      extaxProxyAmt: ``, //不含税代理费
      settleCurrencyRate: ``, //结算汇率
      calcDays: ``, //计息放货天数
      clacProfileDays: ``, //计息天数
      insuranceRate: ``, //保证金比率
      LXtaxRate: ``, //增值税率
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
      // $root.Bus: this.$BusFactory(this)
    };
  },
  created() {
    //获取信息
    this.$route.query.id && this.getDetail();
  },
  mounted() {
    if (localStorage.themecolor) {
      this.navColor.button.backgroundColor =
        "#" + localStorage.getItem("themecolor");
    } else {
      this.navColor.button.backgroundColor = "#" + this.themecolor;
    }
    this.$root.Bus.$on("LXtaxRate", e => {
      this.LXtaxRate = e;
      // this.hsYX(this.vatProfileRate);
      // this.bhsYX(this.extaxProfileRate);
      // this.hsYQ(this.vatPredictRate);
      // this.bhsYQ(this.extaxPredictRate);
      // this.hsDL(this.vatProxyRate);
      // this.bhsDL(this.extaxProxyRate);
    });
  },
  methods: {
    getDetail() {
      let params = {
        soContractId: this.$route.query.id
      };
      Bmange.getJx(params)
        .then(res => {
          let red = res.data;
          this.version = red.version;
          this.soContractNo = red.soContractNo; //合同号
          this.soContractId = red.soContractId; //合同id
          this.vatProfileRate = red.vatProfileRate; //含税月息利率
          this.vatPredictRate = red.vatPredictRate; //含税逾期利率
          this.vatProxyRate = red.vatProxyRate; //含税代理费率
          this.vatProxyAmt = red.vatProxyAmt; //含税代理费
          this.extaxProfileRate = red.extaxProfileRate; //不含税月息利率
          this.extaxPredictRate = red.extaxPredictRate; //不含税逾期利率
          this.extaxProxyRate = red.extaxProxyRate; //不含税代理费率
          this.extaxProxyAmt = red.extaxProxyAmt; //不含税代理费
          this.settleCurrencyRate = red.settleCurrencyRate; //结算汇率
          this.calcDays = red.calcDays; //计息放货天数
          this.clacProfileDays = red.clacProfileDays; //计息天数
          this.insuranceRate = red.insuranceRate; //保证金比率
        })
        .catch();
    },
    to() {
      let data = {
        vatProfileRate: this.vatProfileRate, //含税月息利率
        vatPredictRate: this.vatPredictRate, //含税逾期利率
        vatProxyRate: this.vatProxyRate, //含税代理费率
        vatProxyAmt: this.vatProxyAmt, //含税代理费
        extaxProfileRate: this.extaxProfileRate, //不含税月息利率
        extaxPredictRate: this.extaxPredictRate, //不含税逾期利率
        extaxProxyRate: this.extaxProxyRate, //不含税代理费率
        extaxProxyAmt: this.extaxProxyAmt, //不含税代理费
        settleCurrencyRate: this.settleCurrencyRate, //结算汇率
        calcDays: this.calcDays, //计息放货天数
        clacProfileDays: this.clacProfileDays, //计息天数
        insuranceRate: this.insuranceRate //保证金比率
      };
      if (this.$route.query.id) {
        data.soContractNo = this.soContractNo;
        data.soContractId = this.soContractId;
        data.version = this.version;
      }
      this.$emit("get", data, 3);
    },
    hsYX(e) {
      //不含税月息利率
      this.extaxProfileRate = this.$bhsYX(e, this.LXtaxRate);
    },
    bhsYX(e) {
      //含税月息利率
      this.vatProfileRate = this.$hsYX(e, this.LXtaxRate);
    },
    hsYQ(e) {
      //不含税逾期利率
      this.extaxPredictRate = this.$bhsYQ(e, this.LXtaxRate);
    },
    bhsYQ(e) {
      //含税逾期利率
      this.vatPredictRate = this.$hsYQ(e, this.LXtaxRate);
    },
    hsDL(e) {
      //不含税代理费率
      this.extaxProxyRate = this.$bhsDL(e, this.LXtaxRate);
    },
    bhsDL(e) {
      //含税代理费率
      this.vatProxyRate = this.$hsDL(e, this.LXtaxRate);
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
  components: {}
};
</script>

<style lang="scss">
</style>
