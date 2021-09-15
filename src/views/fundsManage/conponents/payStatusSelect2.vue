<template>
  <el-col :span="5" class="el-col">
    <label v-bind="$attrs">{{labelName}}</label>
    <el-select
      class="el-inputs"
      :value="payStatus"
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
  </el-col>
</template>
<script>
import { payStatusOptions } from "@/api/creditManage/selectOptions";
export default {
  name: "payStatusSelect2",
  props: {
    payStatus: {
      required: true,
      type: String | Number
    },
    disable: {
      type: Boolean,
      default: false
    },
    labelName: {
      type: String,
      default: "状态"
    }
  },
  data() {
    return {
      options: []
    };
  },
  methods: {
    getOptions() {
      payStatusOptions().then(res => {
        if (res.code === "success") {
          this.options = res.data;
        }
      });
    },
    changeHandler(e) {
      this.$emit("update:payStatus", e);
      this.$emit("change", e);
    }
  },
  mounted() {
    this.getOptions();
  }
};
</script>