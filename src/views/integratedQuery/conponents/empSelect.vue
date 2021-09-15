<template>
    <el-col :span="5"  class="el-col">
      <label>业务员</label>
      <zl-select  v-model="staffName_"
                  class="el-inputs"
                  placeholder="请选择"
                  multiple
                  filterable
                  remote
                  :remote-method="getStaffNameList"
                  collapse-tags
                  value-key="empId"
                  @change="changeHandler"

      >
        <zl-option
            v-for="item in staffNameList_"
            :key="item.empId"
            :label="item.empName"
            :value="item">
        </zl-option>
      </zl-select>
      <span class="comicon" @click="staffTip" style="width: 10%;z-index: 2"
        ><i class="el-icon-search"></i
      ></span>
       <!-- 选择员工弹窗 -->
    <staff-select v-if="staffShow" :tipShow='staffShow' :data={} @staffCancle="staffCancle" @staffSure="staffSure">
    </staff-select>
    </el-col>
</template>
<script>
import staffSelect from "@/components/staffSelect2.vue";
import Compony from "@/api/comdepartment/componySelect";
export default {
    name:"empSelect2",
    components: { staffSelect },
     props: {
        staffName:{
            required: true,
            type: Array
        },
        staffNameList:{
            type: Array
        }
    },
    data(){
        return{
            staffName_:this.staffName,
            staffNameList_:this.staffNameList,
            staffShow:false
        }
    },
    methods:{
    getStaffNameList(str) {
      if (!str) {
        return;
      }
      let params = {
        pageNum: 1,
        rows: 200,
        // companyId: this.data.companyId,
        // branchName: this.data.branchName,
        empName: str,
        //isInactive: 0,
        isCollected: 0,
      };
      Compony.empList2(params)
        .then((res) => {
          this.staffNameList_ = res.data.list;
        })
        .catch(() => {});
    },
        //员工弹窗打开
    staffTip() {
      this.staffShow = true;
    },
    //员工弹窗关闭
    staffCancle() {
      this.staffShow = false;
    },
    //员工弹窗确定获取数据
    staffSure(e) {
      this.staffShow = false;
       this.$emit("update:staffName", e);
      this.$emit("change", e);
     this.staffNameList_=e;
    },
    changeHandler(e) {
      if (e.length==0) {
        this.$emit("update:staffName", []);
        this.$emit("change", []);
      }else{
        this.$emit("update:staffName", e);
        this.$emit("change", e);
      }
    }
 },
  watch: {
    staffName(val) {
      this.staffName_ = val;
    },
    staffNameList(val){
      this.staffNameList_ = val;
    }
  },
}
</script>
<style lang="scss">
/deep/ .el-select__tags {
  .el-tag--light {
    height: auto;
    line-height: normal;
  }
}
</style>