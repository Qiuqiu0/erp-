<template>
  <el-col :span="5" class="el-col">
    <label v-bind="$attrs">付款方式</label>
    <zl-select
      class="el-inputs"
      filterable
      :value="payType"
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
import { payeeTypeOptions } from "@/api/creditManage/selectOptions";
export default {
  name: "payTypeSelect",
  props: {
    payType: {
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
      options: []
    };
  },
  methods: {
    getOptions() {
      payeeTypeOptions().then(res => {
        if (res.code === "success") {
          this.options = res.data.filter(item => {
            return item.dict_key !== 10310120; //去除应收款链
          });
        }
      });
    },
    changeHandler(e) {
      this.$emit("update:payType", e);
      this.$emit("change", e);
    }
  },
  mounted() {
    this.getOptions();
  }
};
</script>
