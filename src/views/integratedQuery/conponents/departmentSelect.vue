<template>
<el-col :span="5" class="el-col">
        <label>部门</label>
        <el-select  v-model="branchName_"
                class="el-inputs"
                placeholder="请选择"
                multiple
                filterable
                remote
                :remote-method="getDepartment"
                collapse-tags
                value-key="branchId"
                @change="changeHandler"
        >
        <el-option
            v-for="item in departmentList_"
            :key="item.branchId"
            :label="item.branchName"
            :value="item">
        </el-option>
        </el-select>
    <span class="comicon" @click="branchPopup" style="width: 10%;z-index: 2"
        ><i class="el-icon-search"></i
    ></span>    
     <!--部门弹窗-->
    <branch-select v-if="branchShow" :tipShow="branchShow" :data="companyInfo" @departmentCancle="branchCancel" @departmentSure="branchSure"></branch-select>   
</el-col>
    

</template>
<script>
import branchSelect from "@/components/departmentSelect2.vue";
import Compony from "@/api/comdepartment/componySelect";
export default {
  name: "departmentSelect4",
  components: { branchSelect },
  props: {
    companyInfo: {
      required: false,
      type: Object | String
    },
    branchInfo:{
      required: true,
      type: Array
    },
    departmentList:{
      type: Array
    }
  },
  data() {
    return {
      branchShow: false, //弹窗
      branchName_: this.branchInfo,
      departmentList_:this.departmentList
     // branchInfo:[],
    };
  },
  methods:{
    getDepartment(str){
        if(!str){
            return
        }
        let params = {
            pageNum: 1,
            rows: 200,
            companyId: this.companyInfo.companyId ,
            branchName: str,
            branchCode: '',
            isCollected:0
        };
      Compony.brnchList2(params)
          .then(res => {
            this.departmentList_ = res.data.list;
          })
        .catch(() => {
        });
    },
      //部门弹窗
    branchPopup() {
      // if (this.companyInfo == "") {
      //   this.$openWarning("请先选择公司");
      //   return false;
      // }
      this.branchShow = true;
    },
    //部门弹窗关闭
    branchCancel() {
      this.branchShow = false;
    },
    //部门弹窗确定并传值
    branchSure(e) {
      this.branchShow = false;
      this.$emit("update:branchInfo", e);
      this.$emit("change", e);
      this.departmentList_ = e;
    },
    changeHandler(e) {
      if (e.length==0) {
        this.$emit("update:branchInfo", []);
        this.$emit("change", []);
      }else{
        this.$emit("update:branchInfo", e);
        this.$emit("change", e);
      }
    }
  },
  watch: {
    companyInfo(val) {
      if (JSON.stringify(val) === "{}") {
        this.$emit("update:branchInfo", []);
        this.$emit("change", {});
      }
    },
    branchInfo(val) {
      this.branchName_ = val;
    },
    departmentList(val){
      this.departmentList_ = val;
    }
  },
}
</script>
<style scoped lang="scss">
/deep/ .el-select__tags {
  .el-tag--light {
    height: auto;
    line-height: normal;
  }
}
</style>
