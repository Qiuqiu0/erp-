<template>
  <div class="matterSelect">
    <label v-bind="$attrs">{{labelName}}</label>
    <el-input
      v-model="warehouse.warehouseName"
      class="el-inputs"
      placeholder="请选择"
      size="small"
      clearable
      @change="changeHandler"
      :disabled="disable"
      @focus="warehouseTips"
    >
      <i slot="suffix" class="el-icon-search" v-show="!warehouse.warehouseName"></i>
    </el-input>
    <!-- 选择物料弹窗 -->
    <warehouseModal
      v-if="warehouseShow"
      :tipShow="warehouseShow"
      @warehouseCancle="warehouseCancle"
      @warehouseSure="warehouseSure"
    ></warehouseModal>
  </div>
</template>
<script>
import warehouseModal from "@/components/warehouseSelect.vue";
export default {
  name: "warehouseSelect",
  components: { warehouseModal },
  props: {
    warehouse: {
      required: true,
      type: Object
    },
    labelName: {
      type: String,
      default: "仓库"
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      warehouseShow: false //仓库弹窗
    };
  },
  methods: {
    //仓库弹窗
    warehouseTips() {
      if (this.opres) {
        return;
      }
      this.warehouseShow = true;
    },
    //仓库弹窗关闭
    warehouseCancle() {
      this.warehouseShow = false;
    },
    //仓库弹窗确定获取数据
    warehouseSure(e) {
      this.warehouseShow = false;
      this.warehouse= e;
      this.$emit("update:warehouse", e);
      this.$emit("change", e);
    },
    changeHandler(e) {
      if (!e) {
        this.$emit("update:warehouse", {});
        this.$emit("change", {});
      }
    }
  }
};
</script>
