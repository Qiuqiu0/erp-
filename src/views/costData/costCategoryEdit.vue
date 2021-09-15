<template>
  <div id="costCategoryEdit">
    <!--操作按钮-->
    <div class="button-div">
      <el-button icon="el-icon-suitcase" @click="save">保存</el-button>
      <el-button icon="el-icon-close" @click="goBack">取消</el-button>
    </div>
    <el-tabs class="el-tabs" type="card" v-model="currTab">
      <el-tab-pane label="基本信息" name="basic">
        <div class="input-div">
          <el-row>
            <el-col :span="5" class="el-col el-col-required">
              <label><span class="must-full">*</span> 费用名称</label>
              <el-input v-model="baseInfo.costsName" class="el-inputs" :class="errorKey.includes('costsName') ? 'inputRed' : ''"></el-input>
            </el-col>
            <el-col :span="5" class="el-col el-col-required">
              <label><span class="must-full">*</span> 费用环节</label>
              <el-select v-model="baseInfo.bizOccurrence" :class="errorKey.includes('bizOccurrence') ? 'inputRed' : ''" class="el-selects" placeholder="请选择" @change="costLinkChange">
                <el-option v-for="(item, index) in costLinkDic" :key="index" :label="item.dict_value" :value="item.dict_code"></el-option>
              </el-select>
            </el-col>
            <el-col :span="5" class="el-col el-col-required">
              <label><span class="must-full">*</span> 计入成本</label>
              <el-select v-model="baseInfo.isInvCost" :class="errorKey.includes('isInvCost') ? 'inputRed' : ''" class="el-selects" placeholder="请选择" :disabled="isIncludeCanChange" @change="isIncludeChange">
                <el-option v-for="(item, index) in isIncludeDic" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-col>
            <el-col :span="5" class="el-col el-col-required">
              <label><span class="must-full">*</span> 摊销维度</label>
              <el-select v-model="baseInfo.shareDim" :class="errorKey.includes('shareDim') ? 'inputRed' : ''" class="el-selects" placeholder="请选择" :disabled="amortizeCanChange">
                <el-option v-for="(item, index) in amortizeDic" :key="index" :label="item.dict_value" :value="item.dict_code"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5" class="el-col el-col-required">
              <label><span class="must-full">*</span> 是否收入</label>
              <el-select v-model="baseInfo.isIncome" :class="errorKey.includes('isIncome') ? 'inputRed' : ''" class="el-selects" placeholder="请选择">
                <el-option v-for="(item, index) in isIncomeDic" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-col>
            <el-col :span="5" class="el-col el-col-required">
              <label><span class="must-full">*</span> 是否预提</label>
              <el-select v-model="baseInfo.isPrefetch" :class="errorKey.includes('isPrefetch') ? 'inputRed' : ''" class="el-selects" placeholder="请选择">
                <el-option v-for="(item, index) in isPrefetchDic" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5" class="el-col">
              <label>收入科目</label>
              <el-input v-model="incomeAccountName.nameL2" class="el-inputs" disabled></el-input>
              <span class='comicon2' @click="accountTips(1)"><i class="el-icon-search" ></i></span>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>费用科目</label>
              <el-input v-model="chargeCatAccountName.nameL2" :class="errorKey.includes('bizOccurrence') ? 'inputRed' : ''" class="el-inputs" disabled></el-input>
               <span class='comicon2' @click="accountTips(2)"><i class="el-icon-search" ></i></span>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>预提科目</label>
              <el-input v-model="preCatAccountName.nameL2" :class="errorKey.includes('bizOccurrencey') ? 'inputRed' : ''" class="el-inputs" disabled></el-input>
               <span class='comicon2' @click="accountTips(3)"><i class="el-icon-search" ></i></span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20" class="el-col el-full">
              <label>备注</label>
              <el-input v-model="baseInfo.remark" class="el-inputs"></el-input>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
    </el-tabs>
     <!--进项税科目-->
    <subject-frame v-if="subjectShow"  :tipShow='subjectShow' @subjectCancle="subjectCancle" @subjectSure="subjectSure"></subject-frame>
  </div>
</template>
<script>
import { mapState } from "vuex";
import CostApi from "@/api/costData/cost";
import subjectFrame from "@/components/subjectFrame.vue";//科目组件
export default {
  name: "costCategoryEdit",
  data() {
    return {
      errorKey: [],
      currTab: "basic",
      //基本信息
      baseInfo: {
        costsName: "",
        bizOccurrence: "",
        isInvCost: "",
        shareDim: "",
        isIncome: "",
        isPrefetch: "",
        incomeAccount:'',
        chargeCatAccount:'',
        preCatAccount:'',
        remark: ""
      },
      //基本信息字典
      costLinkDic: [],
      isIncludeDic: [
        {value: "0", label: "是"},
        {value: "1", label: "否"}
      ],
      isIncludeCanChange: false, //能否选择计入成本
      amortizeDic: [],
      amortizeCanChange: false, //能否选择摊销维度
      isIncomeDic: [
        {value: "0", label: "是"},
        {value: "1", label: "否"}
      ],
      isPrefetchDic: [
        {value: "0", label: "是"},
        {value: "1", label: "否"}
      ],
      navColor: {
        button: {
          backgroundColor: ""
        }
      },
      subjectShow:false,
      incomeAccountName:{},
      chargeCatAccountName:{},
      preCatAccountName:{},
      checkedValue:0,//选中
      
    };
  },
   components: { 
    subjectFrame,
  },
  created() {
    //费用环节字典
    this.costLinkData();
    //摊销维度字典
    this.amortizeData();
    //获取费用类别详情
    if (this.$route.query.id) {
      this.costCategoryDetail();
    }
  },
  mounted() {
    if (localStorage.themecolor) {
      this.navColor.button.backgroundColor = "#" + localStorage.getItem("themecolor");
    } else {
      this.navColor.button.backgroundColor = "#" + this.themecolor;
    }
  },
  methods: {
     //进项税科目
    accountTips(type){
      this.checkedValue=type;
      this.subjectShow=true;
    },
    subjectSure(e){
        if(this.checkedValue==1){
          this.incomeAccountName=e;
        }else if(this.checkedValue==2){
          this.chargeCatAccountName=e;
        }else if(this.checkedValue==3){
          this.preCatAccountName=e;
        }
        this.subjectShow=false;
    },
    subjectCancle(){
        this.subjectShow=false;
    },
    //获取费用类别详情
    costCategoryDetail() {
      CostApi.costCategoryList({
        costCategoryId: this.$route.query.id
      }).then(res => {
        this.baseInfo = res.data.list[0];
        this.baseInfo.bizOccurrence = this.baseInfo.bizOccurrence + "";
        this.baseInfo.isInvCost = this.baseInfo.isInvCost + "";
        this.baseInfo.shareDim = this.baseInfo.shareDim + "";
        this.baseInfo.isIncome = this.baseInfo.isIncome + "";
        this.baseInfo.isPrefetch = this.baseInfo.isPrefetch + "";
        if(this.baseInfo.incomeAccount){
           this.incomeAccountName.nameL2=this.baseInfo.incomeAccount+" "+this.baseInfo.incomeAccountName;//科目名称
        }else{
           this.incomeAccountName.nameL2=="";
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
    //保存
    save() {
      this.errorKey = [];
      let keyArr = ['costsName', 'bizOccurrence', 'bizOccurrence', 'isInvCost', 'shareDim', 'shareDim', 'isIncome', 'isPrefetch'];
      keyArr.forEach(item => {
        if(!this.baseInfo[item]) {
          this.errorKey.push(item);
        }
      })
      if(JSON.stringify(this.incomeAccountName)!="{}"){
          this.baseInfo.incomeAccountName=this.incomeAccountName.longName;
          this.baseInfo.incomeAccount=this.incomeAccountName.number;
      }
      if(JSON.stringify(this.chargeCatAccountName) != "{}"){
          this.baseInfo.chargeCatAccountName=this.chargeCatAccountName.longName;
          this.baseInfo.chargeCatAccount=this.chargeCatAccountName.number;
      }else{
        if(this.baseInfo.bizOccurrence=="10600010"){
          this.errorKey.push('bizOccurrence');
          this.$openWarning("请选择费用科目");
          return;
        }
      }
      if(JSON.stringify(this.preCatAccountName)!="{}"){
          this.baseInfo.preCatAccountName=this.preCatAccountName.longName;
          this.baseInfo.preCatAccount=this.preCatAccountName.number;
      }else{
         if(this.baseInfo.bizOccurrence=="10600010"){
          this.errorKey.push('bizOccurrencey');
        }
      }
      if(this.errorKey.length > 0) {
        this.$openWarning("请将必填项补充完整！");
        return false;
      }
      this.$confirm("是否确定保存？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        closeOnClickModal: false
      }).then(() => {
        if (this.$route.query.id) {
          CostApi.costCategoryUpdate(this.baseInfo).then(res => {
            if (res.code == "success") {
              this.$openSuccess(res.message);
              this.$router.push({name: "costCategory"});
            } else {
              this.$openWarning(res.message);
            }
          }).catch();
        } else {
          CostApi.costCategoryInsert(this.baseInfo).then(res => {
            if (res.code == "success") {
              this.$openSuccess(res.message);
              this.$router.push({name: "costCategory"});
            } else {
              this.$openWarning(res.message);
            }
          }).catch();
        }
      });
    },
    //取消
    goBack() {
      this.$router.push({name: "costCategory"});
    },
    //选择费用环节
    costLinkChange(code) {
      if (code == 10600005) { //采购
        this.baseInfo.isInvCost = "";
        this.baseInfo.shareDim = "";
        this.isIncludeCanChange = false;
      } else if (code == 10600010) { //销售
        this.baseInfo.isInvCost = "1";
        this.isIncludeCanChange = true;
      }
    },
    //选择计入成本
    isIncludeChange(value) {
      if (value == 0) { //是
        this.baseInfo.shareDim = "10640005";
        this.amortizeCanChange = true;
      } else if (value == 1) { //否
        this.baseInfo.shareDim = "";
        this.amortizeCanChange = false;
      }
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
.index .comicon2{
  top:11px;
}
#costCategoryEdit {
  .el-row {
    margin-left: 10px;
  }
  .el-col {
    position: relative;
    margin: 0;
    padding: 8px 0 10px 10px;
    .moreIcon {
      width: 70%;
      height: 24px;
      position: absolute;
      top: 10px;
      right: 0;
      padding: 4px 5px;
      cursor: pointer;
    }
  }
  .is-disabled {
    .el-input__inner {
      color: #666;
      cursor: pointer;
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