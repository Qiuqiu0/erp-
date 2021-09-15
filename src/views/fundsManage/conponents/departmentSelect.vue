<template>
  <div>
    <label v-bind="$attrs">{{labelName}}</label>
   <!-- <el-input
      class="el-inputs"
      v-model="branchName"
      size="small"
      placeholder="请选择"
      clearable
      @change="changeHandler"
      :disabled="disable"
      @focus="departmentTip"
    >
      <i slot="suffix" class="el-icon-search" v-show="!branchName.orgName"></i>
    </el-input> -->
    <zl-select  v-model="branchName_"
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
        <zl-option
            v-for="item in departmentList_"
            :key="item.branchId"
            :label="item.branchName"
            :value="item">
        </zl-option>
      </zl-select>
      <span class="comicon" @click="departmentTip" style="width: 10%;z-index: 2"
        ><i class="el-icon-search"></i
      ></span>
    <!-- 选择部门弹窗 -->
    <department-modal
      v-if="departmentShow"
      :tipShow="departmentShow"
      :departztz="departztz"
      :data="companyName"
      @departmentCancle="departmentCancle"
      @departmentSure="departmentSure"
    ></department-modal>
  </div>
</template>
<script>
import Compony from "@/api/comdepartment/componySelect";
import departmentModal from "@/components/departmentSelect2.vue";
export default {
  name: "departmentSelect3",
  components: { departmentModal },
  props: {
    departmentList:{
      type: Object | Array
    },
    companyName: {
      required: true,
      type: Object | String,
    },
    branchName: {
      required: true,
      type: Object | Array,
    },
    labelName: {
      type: String,
      default: "部门",
    },
    // disable: {
    //   type: Boolean,
    //   default: false,
    // },
    //部门是否选禁用 0过滤禁用 1不过滤
    departztz: {
      type: Number,
      default: 1,
    },
    isPublic: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      departmentShow: false, //部门弹窗
      branchName_: this.branchName,
      departmentList_:this.departmentList
    };
  },
  methods: {
    //部门远程搜索
    getDepartment(str) {
      if (!str) {
        return;
      }
      // if (this.disable) {
      //   this.$openWarning("请先选择公司");
      //   return;
      // }
      let params = {
        pageNum: 1,
        rows: 200,
        companyId: this.companyName.companyId,
        branchName: str,
        branchCode: "",
        isCollected: 0,
      };
      Compony.brnchList2(params)
        .then((res) => {
          this.departmentList_ = res.data.list;
        })
        .catch(() => {});
    },
    //部门弹窗打开
    departmentTip() {
      // if (!this.companyName.companyName && !this.isPublic) {
      //   this.$openWarning("请先选择公司");
      //   return false;
      // }
      this.departmentShow = true;
    },
    //部门弹窗关闭
    departmentCancle() {
      this.departmentShow = false;
    },
    //部门弹窗确定获取数据
    departmentSure(e) {
      this.departmentShow = false;
      e.orgId = e.branchId;
      e.orgName = e.branchName;
      e.orgCode = e.branchCode;
      this.$emit("update:branchName", e);
      this.$emit("change", e);
      this.departmentList_ = e;
    },
    changeHandler(e) {
      if (e.length == 0) {
        this.$emit("update:branchName", []);
        this.$emit("change", []);
      }else{
        this.$emit("update:branchName", e);
        this.$emit("change", e);
      }
    },
  },
  watch: {
    companyName(val) {
      if (JSON.stringify(val) === "{}") {
        this.$emit("update:branchName", []);
        this.$emit("change", {});
      }
    },
    branchName(val) {
      this.branchName_ = val;
    },
    departmentList(val){
      this.departmentList_ = val;
    }
  },
};
</script>
<style scoped lang="scss">
/deep/ .el-select__tags {
  .el-tag--light {
    height: auto;
    line-height: normal;
  }
}
</style>
