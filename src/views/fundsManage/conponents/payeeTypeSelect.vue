<template>
  <el-col :span="5" class="el-col">
    <label v-bind="$attrs">收款方式</label>
    <zl-select
      class="el-inputs"
      :value="payeeType"
      placeholder="请选择"
      size="small"
      filterable
      @change="changeHandler"
      :disabled="disable"
      clearable
      multiple
      collapse-tags
    >
      <zl-option
        v-for="item in payeeTypeOptions"
        :key="item.dict_key"
        :label="item.dict_value"
        :value="item.dict_key"
        :disabled="item.disabled"
      ></zl-option>
    </zl-select>
  </el-col>
</template>
<script>
import { payeeTypeOptions } from "@/api/creditManage/selectOptions";
export default {
  name: "payeeTypeSelect",
  props: {
    payeeType: {
      required: true,
      type: Array | Object
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      payeeTypeOptions: []
    };
  },
  methods: {
    getPayeeTypeOptions() {
      payeeTypeOptions().then(res => {
        if (res.code === "success") {
          this.payeeTypeOptions = res.data;
        }
      });
    },
    changeHandler(e) {
      this.$emit("update:payeeType", e);
      this.$emit("change", e);
    }
  },
  mounted() {
    this.getPayeeTypeOptions();
  }
};
</script>
