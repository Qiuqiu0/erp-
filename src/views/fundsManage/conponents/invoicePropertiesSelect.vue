<template>
  <el-col :span="5" class="el-col">
    <label v-bind="$attrs">票据性质</label>
    <zl-select
      class="el-inputs"
      :value="invoiceProperties"
      placeholder="请选择"
      @change="changeHandler"
      size="small"
      :disabled="disable"
      clearable
    >
      <zl-option
        v-for="item in options"
        :key="item.dict_key"
        :label="item.dict_value"
        :value="item.dict_key"
        :disabled="item.disabled"
      ></zl-option>
    </zl-select>
  </el-col>
</template>
<script>
import { invoicePropertiesOptions } from "@/api/creditManage/selectOptions";
export default {
  name: "invoicePropertiesSelect",
  props: {
    invoiceProperties: {
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
      invoicePropertiesOptions().then(res => {
        if (res.code === "success") {
          this.options = res.data;
        }
      });
    },
    changeHandler(e) {
      this.$emit("update:invoiceProperties", e);
      this.$emit("change", e);
    }
  },
  mounted() {
    this.getOptions();
  }
};
</script>
