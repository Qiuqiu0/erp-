<template>
  <el-col :span="5" class="el-col">
    <label v-bind="$attrs">执行类型</label>
    <el-select
      class="el-inputs"
      :value="executeType"
      placeholder="请选择"
      size="small"
      @change="changeHandler"
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
  </el-col>
</template>
<script>
import { executeTypeOptions } from "@/api/creditManage/selectOptions";
export default {
  name: "executeTypeSelect2",
  props: {
    executeType: {
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
      executeTypeOptions().then(res => {
        if (res.code === "success") {
          this.options = res.data;
        }
      });
    },
    changeHandler(e) {
      this.$emit("update:executeType", e);
      this.$emit("change", e);
    }
  },
  mounted() {
    this.getOptions();
  }
};
</script>
