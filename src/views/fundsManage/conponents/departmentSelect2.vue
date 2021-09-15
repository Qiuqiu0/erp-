<template>
  <div>
    <label v-bind="$attrs">{{labelName}}</label>
    <el-input
      class="el-inputs"
      v-model="branchName.orgName"
      size="small"
      placeholder="请选择"
      clearable
      @change="changeHandler"
      :disabled="disable"
      @focus="departmentTip"
    >
      <i slot="suffix" class="el-icon-search" v-show="!branchName.orgName"></i>
    </el-input>
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
import departmentModal from "@/components/departmentSelect.vue";
export default {
  name: "departmentSelect2",
  components: { departmentModal },
  props: {
    companyName: {
      required: true,
      type: Object
    },
    branchName: {
      required: true,
      type: Object
    },
    labelName: {
      type: String,
      default: "部门"
    },
    disable: {
      type: Boolean,
      default: false
    },
    //部门是否选禁用 0过滤禁用 1不过滤
    departztz: {
      type: Number,
      default: 1
    },
    isPublic:{
      default:false,
      type:Boolean
    }
  },
  data() {
    return {
      departmentShow: false //部门弹窗
    };
  },
  methods: {
    //部门弹窗打开
    departmentTip() {
      if (!this.companyName.companyName&&!this.isPublic) {
        this.$openWarning("请先选择公司");
        return false;
      }
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
    },
    changeHandler(e) {
      if (!e) {
        this.$emit("update:branchName", {});
        this.$emit("change", {});
      }
    }
  },
  watch: {
    companyName(val) {
      if (JSON.stringify(val) === "{}") {
        this.$emit("update:branchName", {});
        this.$emit("change", {});
      }
    }
  }
};
</script>

