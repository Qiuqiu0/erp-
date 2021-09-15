<template>
    <el-col :span="5" class="el-col">
      <label v-bind="$attrs">{{labelName}}</label>
      <zl-select class="el-inputs"
        :value="applyInvoiceType"
        placeholder="请选择"
        size="small"
        @change="changeHandler"
        :disabled="disable"
        clearable
        multiple
        collapse-tags
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
import { applyInvoiceTypeOptions } from "@/api/creditManage/selectOptions";
export default {
  name: "applyInvoiceTypeSelect",
  props: {
    applyInvoiceType: {
      required: true,
      type: Array | Object

    },
    disable: {
      type: Boolean,
      default: false
    },
    labelName: {
      type: String,
      default: "业务单据类型 "
    }
  },
  data() {
    return {
      options: []
    };
  },
  methods: {
    getOptions() {
      applyInvoiceTypeOptions().then(res => {
        if (res.code === "success") {
          this.options = res.data;
        }
      });
    },
    changeHandler(e) {
      this.$emit("update:applyInvoiceType", e);
      this.$emit("change", e);
    }
  },
  mounted() {
    this.getOptions();
  }
};
</script>
