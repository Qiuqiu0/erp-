<template>
  <el-select
    :value="executeDocType"
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
import { executeDocTypeOptions } from "@/api/creditManage/selectOptions";
export default {
  name: "businessTypeSelect",
  props: {
    executeDocType: {
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
      executeDocTypeOptions().then(res => {
        if (res.code === "success") {
          this.options = res.data;
        }
      });
    },
    changeHandler(e) {
      this.$emit("update:executeDocType", e);
      this.$emit("change", e);
    }
  },
  mounted() {
    this.getOptions();
  }
};
</script>