<template>
  <div id="costCategoryDetail">
    <!--操作按钮-->
    <div class="button-div">
      <el-button icon="el-icon-back" @click="goBack">返回</el-button>
    </div>
    <el-tabs class="el-tabs" type="card" v-model="currTab">
      <el-tab-pane label="基本信息" name="basic">
        <div class="input-div">
          <el-row>
            <el-col :span="5" class="el-col">
              <label>费用名称</label>
              <el-input v-model="baseInfo.costsName" class="el-inputs" disabled></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>费用环节</label>
              <el-select v-model="baseInfo.bizOccurrence" class="el-selects" disabled>
                <el-option v-for="(item, index) in costLinkDic" :key="index" :label="item.dict_value" :value="item.dict_code"></el-option>
              </el-select>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>摊销维度</label>
              <el-select v-model="baseInfo.shareDim" class="el-selects" disabled>
                <el-option v-for="(item, index) in amortizeDic" :key="index" :label="item.dict_value" :value="item.dict_code"></el-option>
              </el-select>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>计入成本</label>
              <el-select v-model="baseInfo.isInvCost" class="el-selects" disabled>
                <el-option v-for="(item, index) in isIncludeDic" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5" class="el-col">
              <label>是否收入</label>
              <el-select v-model="baseInfo.isIncome" class="el-selects" disabled>
                <el-option v-for="(item, index) in isIncomeDic" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>是否预提</label>
              <el-select v-model="baseInfo.isPrefetch" class="el-selects" disabled>
                <el-option v-for="(item, index) in isPrefetchDic" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5" class="el-col">
              <label>收入科目</label>
              <el-input v-model="incomeAccountName.nameL2" class="el-inputs" disabled></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>费用科目</label>
              <el-input v-model="chargeCatAccountName.nameL2" class="el-inputs" disabled></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>预提科目</label>
              <el-input v-model="preCatAccountName.nameL2" class="el-inputs" disabled></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20" class="el-col el-full">
              <label>备注</label>
              <el-input v-model="baseInfo.remark" class="el-inputs" disabled></el-input>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapState } from "vuex";
import CostApi from "@/api/costData/cost";
export default {
  name: "costCategoryDetail",
  data() {
    return {
      currTab: "basic",
      //基本信息
      baseInfo: {
        costsName: "",
        bizOccurrence: "",
        shareDim: "",
        isInvCost: "",
        isIncome: "",
        isPrefetch: "",
        incomeAccount: "",
        chargeCatAccount: "",
        preCatAccount: "",
        remark: ""
      },
      //基本信息字典
      costLinkDic: [],
      amortizeDic: [],
      isIncludeDic: [
        {value: "0", label: "是"},
        {value: "1", label: "否"}
      ],
      isIncomeDic: [
        {value: "0", label: "是"},
        {value: "1", label: "否"}
      ],
      isPrefetchDic: [
        {value: "0", label: "是"},
        {value: "1", label: "否"}
      ],
      incomeAccountName:{},
      chargeCatAccountName:{},
      preCatAccountName:{},
      navColor: {
        button: {
          backgroundColor: ""
        }
      }
    };
  },
  created() {
    //费用环节字典
    this.costLinkData();
    //摊销维度字典
    this.amortizeData();
    //获取费用类别详情
    this.costCategoryDetail();
  },
  mounted() {
    if (localStorage.themecolor) {
      this.navColor.button.backgroundColor = "#" + localStorage.getItem("themecolor");
    } else {
      this.navColor.button.backgroundColor = "#" + this.themecolor;
    }
  },
  methods: {
    //获取费用类别详情
    costCategoryDetail() {
      CostApi.costCategoryList({
        costCategoryId: this.$route.query.id
      }).then(res => {
        this.baseInfo = res.data.list[0];
        this.baseInfo.bizOccurrence = this.baseInfo.bizOccurrence + "";
        this.baseInfo.shareDim = this.baseInfo.shareDim + "";
        this.baseInfo.isInvCost = this.baseInfo.isInvCost + "";
        this.baseInfo.isIncome = this.baseInfo.isIncome + "";
        this.baseInfo.isPrefetch = this.baseInfo.isPrefetch + "";
        if(this.baseInfo.incomeAccount){
           this.incomeAccountName.nameL2=this.baseInfo.incomeAccount+" "+this.baseInfo.incomeAccountName;//科目名称
        }else{
           this.incomeAccountName=="";
        }
        if(this.baseInfo.chargeCatAccount){
           this.chargeCatAccountName.nameL2=this.baseInfo.chargeCatAccount+" "+this.baseInfo.chargeCatAccountName;//科目名称
        }else{
           this.chargeCatAccountName.nameL2=="";
        }
        if(this.baseInfo.preCatAccount){
           this.preCatAccountName.nameL2=this.baseInfo.preCatAccount+" "+this.baseInfo.preCatAccountName;//科目名称
        }else{
           this.preCatAccountName.nameL2=="";
        }
      }).catch();
    },
    //费用环节字典
    costLinkData() {
      CostApi.dicQuery({
        dictNo: 1060
      }).then(res => {
        this.costLinkDic = res.data;
      }).catch();
    },
    //摊销维度字典
    amortizeData() {
      CostApi.dicQuery({
        dictNo: 1064
      }).then(res => {
        this.amortizeDic = res.data;
      }).catch();
    },
    //取消
    goBack() {
      this.$router.push({name: "costCategory"});
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
  }
};
</script>
<style lang="scss">
#costCategoryDetail {
  .el-row {
    margin-left: 10px;
    .el-col {
      margin: 0;
      padding: 8px 0 10px 10px;
    }
  }
  .is-disabled {
    .el-input__inner {
      color: #666;
      cursor: default;
    }
    .el-input__icon {
      cursor: default;
    }
  }
  label {
    display: inline-block;
    width: 30%;
    vertical-align: middle;
  }
  .el-inputs,
  .el-selects {
    width: 70%;
    .el-input__inner {
      width: 100%;
    }
  }
  .el-col-20 {
    width: 96%;
  }
  .el-full {
    label {
      width: 7.25%;
    }
    .el-inputs {
      width: 92.75% !important;
      .el-input__inner {
        width: 100%;
      }
    }
  }
}
</style>