<template>
  <div class="arrivalPortSelect">
    <label v-bind="$attrs">{{labelName}}</label>
    <el-input
      v-model="arrivalPort.portName"
      class="el-inputs"
      placeholder="请选择"
      size="small"
      clearable
      @change="changeHandler"
      :disabled="disable"
      @focus="arrTip"
    >
      <i slot="suffix" class="el-icon-search" v-show="!arrivalPort.portName"></i>
    </el-input>
    <!-- 选择港口弹窗 -->
    <arrivalPortModal
      v-if="arrShow"
      :tipShow="arrShow"
      @ArrialPortCancle="ArrialPortCancle"
      @ArrialPortSure="ArrialPortSure"
    ></arrivalPortModal>
  </div>
</template>
<script>
import arrivalPortModal from "@/components/ArrivalPort.vue";
export default {
  name: "arrivalPortSelect",
  components: { arrivalPortModal },
  props: {
    arrivalPort: {
      required: true,
      type: Object
    },
    labelName: {
      type: String,
      default: "目的港口"
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      arrShow: false, //港口弹窗
    };
  },
  methods: {
    //港口弹窗打开
    arrTip() {
      this.arrShow = true;
    },
    //港口弹窗关闭
    ArrialPortCancle() {
      this.arrShow = false;
    },
    //港口弹窗确定获取数据
    ArrialPortSure(e) {
      this.arrShow = false;
      this.$emit("update:arrivalPort", e);
      this.$emit("change", e);
    },
    changeHandler(e) {
      if (!e) {
        this.$emit("update:arrivalPort", {});
        this.$emit("change", {});
      }
    }
  }
};
</script>
