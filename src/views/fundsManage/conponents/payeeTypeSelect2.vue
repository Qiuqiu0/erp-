<template>
  <el-col :span="5" class="el-col">
    <label v-bind="$attrs">收款方式</label>
    <el-select
      class="el-inputs"
      :value="payeeType"
      placeholder="请选择"
      size="small"
      filterable
      @change="changeHandler"
      :disabled="disable"
      clearable
    >
      <el-option
        v-for="item in payeeTypeOptions"
        :key="item.dict_key"
        :label="item.dict_value"
        :value="item.dict_key"
        :disabled="item.disabled"
      ></el-option>
    </el-select>
  </el-col>
</template>
<script>
import { payeeTypeOptions } from "@/api/creditManage/selectOptions";
export default {
  name: "payeeTypeSelect2",
  props: {
    payeeType: {
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
