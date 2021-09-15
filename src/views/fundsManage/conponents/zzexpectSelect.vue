<template>
  <el-col :span="5" class="el-col">
    <label>辅助核算分类</label>
    <el-select
      :value="zzexpect"
      placeholder="请选择"
      size="small"
      @change="changeHandler"
      :disabled="disable"
      clearable
    >
      <el-option
        v-for="item in expectOptions"
        :key="item.dict_key"
        :label="item.dict_value"
        :value="item.dict_key"
        :disabled="item.disabled"
      ></el-option>
    </el-select>
  </el-col>
</template>
<script>
import { zzexpectOptions } from "@/api/creditManage/selectOptions";
export default {
  name: "zzexpectSelect",
  props: {
    zzexpect: {
      required: true,
      type: String | Number
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      expectOptions: []
    };
  },
  methods: {
    getZzexpectOptionss() {
      zzexpectOptions().then(res => {
        if (res.code === "success") {
          this.expectOptions = res.data;
        }
      });
    },
    changeHandler(e) {
      this.$emit("update:zzexpect", e);
      this.$emit("change", e);
    }
  },
  mounted() {
    this.getZzexpectOptionss();
  }
};
</script>
<style lang="scss" scoped>
  .el-select{
    width: 50% !important;
  }
</style>