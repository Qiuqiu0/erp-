<template>
  <div class="coinSelect">
    <label v-bind="$attrs">{{labelName}}</label>
    <el-input
      v-model="coin.currencyCode"
      class="el-inputs"
      placeholder="请选择"
      size="small"
      clearable
      @change="changeHandler"
      :disabled="disable"
      @focus="coinTip"
    >
      <i slot="suffix" class="el-icon-search" v-show="!coin.currencyCode"></i>
    </el-input>
    <!-- 选择币别 -->
    <coinModal v-if="coinShow" :tipShow="coinShow" @coinCancle="coinCancle" @coinSure="coinSure"></coinModal>
  </div>
</template>
<script>
import coinModal from "@/components/coinSelect.vue";
export default {
  name: "coinSelect",
  components: { coinModal },
  props: {
    coin: {
      required: true,
      type: Object
    },
    labelName: {
      type: String,
      default: "币种"
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      coinShow: false //币种弹窗
    };
  },
  methods: {
    //币别弹窗打开
    coinTip() {
      this.coinShow = true;
    },
    //币别弹窗关闭
    coinCancle() {
      this.coinShow = false;
    },
    //币别弹窗确定获取数据
    coinSure(e) {
      this.coinShow = false;
      this.$emit("update:coin", e);
      this.$emit("change", e);
    },
    changeHandler(e) {
      if (!e) {
        this.$emit("update:coin", {});
        this.$emit("change", {});
      }
    }
  }
};
</script>
