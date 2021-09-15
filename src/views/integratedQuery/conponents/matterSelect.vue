<template>
  <div class="matterSelect">
    <label v-bind="$attrs">{{labelName}}</label>
    <el-input
      v-model="goods.goodsCode"
      class="el-inputs"
      placeholder="请选择"
      size="small"
      clearable
      @change="changeHandler"
      :disabled="disable"
      @focus="matterTip"
    >
      <i slot="suffix" class="el-icon-search" v-show="!goods.goodsCode"></i>
    </el-input>
    <!-- 选择物料弹窗 -->
    <matterModal
      v-if="matterShow"
      :tipShow="matterShow"
      @matterCancle="matterCancle"
      @matterSure="matterSure"
    ></matterModal>
  </div>
</template>
<script>
import matterModal from "@/components/matterSelect.vue";
export default {
  name: "matterSelect",
  components: { matterModal },
  props: {
    goods: {
      required: true,
      type: Object
    },
    labelName: {
      type: String,
      default: "物料号"
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      matterShow: false, //物料弹窗
    };
  },
  methods: {
    //物料弹窗打开
    matterTip() {
      this.matterShow = true;
    },
    //物料弹窗关闭
    matterCancle() {
      this.matterShow = false;
    },
    //物料弹窗确定获取数据
    matterSure(e) {
      this.matterShow = false;
      e.goodsId = e.skuId;
      e.goodsCode = e.skuCode;
      e.goodsName = e.skuName;
      this.$emit("update:goods", e);
      this.$emit("change", e);
    },
    changeHandler(e) {
      if (!e) {
        this.$emit("update:goods", {});
        this.$emit("change", {});
      }
    }
  }
};
</script>
