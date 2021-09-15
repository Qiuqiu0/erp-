<template>
  <el-select
    :value="writeOffReason"
    placeholder="请选择"
    @change="changeHandler"
    size="small"
    :disabled="disable"
    clearable
  >
    <el-option
      v-for="item in options"
      :key="item.dict_key"
      :label="item.dict_value"
      :value="item.dict_key"
      :disabled="item.disabled"
    ></el-option>
  </el-select>
</template>
<script>
import { writeOffReasonOptions } from "@/api/creditManage/selectOptions";
export default {
  name: "writeOffReasonSelect",
  props: {
    writeOffReason: {
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
      options: []
    };
  },
  methods: {
    getOptions() {
      writeOffReasonOptions().then(res => {
        if (res.code === "success") {
          this.options = res.data;
        }
      });
    },
    changeHandler(e) {
      this.$emit("update:writeOffReason", e);
      this.$emit("change", e);
    }
  },
  mounted() {
    this.getOptions();
  }
};
</script>
<style lang="scss" scoped>
  .el-select{
    width: 50% !important;
  }
</style>