<template>
  <div>
    <label v-bind="$attrs">{{ labelName }}</label>
    <el-input
      class="el-inputs"
      v-model="companyName.companyName"
      size="small"
      placeholder="请选择"
      clearable
      @change="changeHandler"
      :disabled="disable"
      @focus="componyTip"
      v-if="!needInput"
    >
      <i slot="suffix" class="el-icon-search" v-show="!companyName.companyName"></i>
    </el-input>
    <el-input
      v-else
      class="el-inputs"
      v-model="companyName.companyName"
      size="small"
      placeholder="请选择"
      clearable
      v-input-filter:special
      @change="changeHandler"
      :disabled="disable"
    >
      <i
        slot="suffix"
        class="el-icon-search"
        @click.stop="componyTip"
        v-show="!companyName.companyName"
      ></i>
    </el-input>
    <!-- 选择公司弹窗 -->
    <compony-modal
      style
      v-if="componyShow"
      :tipShow="componyShow"
      :ztz="ztz"
      @tipsCancle="tipsCancle"
      @tipsSure="tipsSure"
    ></compony-modal>
  </div>
</template>
<script>
import componyModal from "@/components/componySelect.vue";
export default {
  name: "componySelect",
  components: { componyModal },
  props: {
    companyName: {
      required: true,
      type: Object | String,
    },
    labelName: {
      type: String,
      default: "公司",
    },
    disable: {
      type: Boolean,
      default: false,
    },
    ztz: {
      type: Number,
      default: 1,
    },
    needInput: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      componyShow: false, //公司弹窗
    };
  },
  methods: {
    //公司弹窗打开
    componyTip() {
      this.componyShow = true;
    },
    //公司弹窗关闭
    tipsCancle() {
      this.componyShow = false;
    },
    //公司弹窗确定获取数据
    tipsSure(e) {
      this.componyShow = false;
      this.$emit("update:companyName", e);
      this.$emit("change", e);
      this.$emit("updateBranchName", []);
    },
    changeHandler(e) {
      if (!e) {
        this.$emit("update:companyName", ``);
        this.$emit("change", ``);
        this.$emit("updateBranchName", []);
      } else {
        this.$emit("change", this.companyName);
        this.$emit("updateBranchName", []);
      }
    },
  },
};
</script>
