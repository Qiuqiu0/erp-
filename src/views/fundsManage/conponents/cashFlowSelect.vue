<template>
  <div class="cashFlowSelect">
    <label v-bind="$attrs">{{labelName}}</label>
    <el-input
      v-model="cashFlow.name"
      class="el-inputs"
      placeholder="请选择"
      size="small"
      clearable
      @change="changeHandler"
      :disabled="disable"
      @focus="flowTip"
    >
      <i slot="suffix" class="el-icon-search" v-show="!cashFlow.name"></i>
    </el-input>
    <!-- 选择流编码 -->
    <flowCode-modal
      v-if="flowshow"
      :tipShow="flowshow"
      @flowCancle="flowCancle"
      @flowSure="flowSure"
    ></flowCode-modal>
  </div>
</template>
<script>
import flowCodeModal from "@/components/flowCode.vue"; //测试
export default {
  name: "cashFlowSelect",
  components: { flowCodeModal },
  props: {
    cashFlow: {
      required: true,
      type: Object
    },
    labelName: {
      type: String,
      default: "现金流编码"
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      flowshow: false //流量码弹窗
    };
  },
  methods: {
    //流量码弹窗打开
    flowTip() {
      this.flowshow = true;
    },
    //流量码关闭
    flowCancle() {
      this.flowshow = false;
    },
    //流量码确定获取数据
    flowSure(e) {
      this.flowshow = false;
      e.name = e.fnumber + e.fnameL2;
      e.code = e.fnumber;
      this.$emit("update:cashFlow", e);
      this.$emit("change", e);
    },
    changeHandler(e) {
      if (!e) {
        this.$emit("update:cashFlow", {});
        this.$emit("change", {});
      }
    }
  }
};
</script>
