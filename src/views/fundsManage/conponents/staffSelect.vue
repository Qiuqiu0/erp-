<template>
  <div>
    <label v-bind="$attrs">{{labelName}}</label>
    <el-input
      v-model="staff.empName"
      class="el-inputs"
      size="small"
      placeholder="请选择"
      clearable
      @change="changeHandler"
      :disabled="branchName.length == 0 || !companyName.companyName || disable"
      @focus="staffTip"
    >
      <i slot="suffix" class="el-icon-search" v-show="!staff.empName"></i>
    </el-input>
    <!-- 选择员工弹窗 -->
    <staff-modal
      v-if="staffShow"
      :tipShow="staffShow"
      :data="branchName"
      @staffCancle="staffCancle"
      @staffSure="staffSure"
    ></staff-modal>
  </div>
</template>
<script>
import staffModal from "@/components/staffSelect.vue";
export default {
  name: "staffSelect",
  components: { staffModal },
  props: {
    companyName: {
      required: true,
      type: Object | String
    },
    branchName: {
      required: true,
      type: Array | Object
    },
    staff: {
      required: true,
      type: Object | String
    },
    labelName: {
      type: String,
      default: "员工"
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      staffShow: false //员工弹窗
    };
  },
  methods: {
    staffTip() {
      if (!this.companyName.companyName || this.branchName.length == 0) {
        this.$openWarning("请先选择公司和部门");
        return false;
      }
      this.staffShow = true;
    },
    //员工弹窗关闭
    staffCancle() {
      this.staffShow = false;
    },
    //员工弹窗确定获取数据
    staffSure(e) {
      this.staffShow = false;
      this.staffName = e;
      this.$emit("update:staff", e);
      this.$emit("change", e);
    },
    changeHandler(e) {
      if (!e) {
        this.$emit("update:staff", {});
        this.$emit("change", {});
      }
    }
  },
  watch: {
    branchName(val) {
      if (JSON.stringify(val) === "{}") {
        this.$emit("update:staff", {});
        this.$emit("change", {});
      }
    }
  }
};
</script>
