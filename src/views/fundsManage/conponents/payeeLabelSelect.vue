<template>
  <el-col :span="5" class="el-col">
    <label v-bind="$attrs">收款标识</label>
    <el-select
      class="el-inputs"
      :value="payeeLabel"
      placeholder="请选择"
      size="small"
      @change="changeHandler"
      :disabled="disable"
      clearable
    >
      <el-option
        v-for="item in payeeLabelOptions"
        :key="item.dict_key"
        :label="item.dict_value"
        :value="item.dict_key"
        :disabled="item.disabled"
      ></el-option>
    </el-select>
  </el-col>
</template>
<script>
import { payeeLabelOptions } from "@/api/creditManage/selectOptions";
export default {
  name: "payeeLabelSelect",
  props: {
    payeeLabel: {
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
      payeeLabelOptions: []
    };
  },
  methods: {
    getPayeeLabelOptions() {
      payeeLabelOptions().then(res => {
        if (res.code === "success") {
          this.payeeLabelOptions = res.data;
        }
      });
    },
    changeHandler(e) {
      this.$emit("update:payeeLabel", e);
      this.$emit("change", e);
    }
  },
  mounted() {
    this.getPayeeLabelOptions();
  }
};
</script>