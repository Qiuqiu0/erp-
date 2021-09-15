<template>
  <el-col :span="5" class="el-col">
    <label v-bind="$attrs">收款单状态</label>
    <el-select
      class="el-inputs"
      :value="payeeStatus"
      placeholder="请选择"
      @change="changeHandler"
      size="small"
      :disabled="disable"
      clearable
    >
      <el-option
        v-for="item in statusOptions"
        :key="item.dict_key"
        :label="item.dict_value"
        :value="item.dict_key"
        :disabled="item.disabled"
      ></el-option>
    </el-select>
  </el-col>
</template>
<script>
import { payeeStatusOptions } from "@/api/creditManage/selectOptions";
export default {
  name: "payeeStatusSelect2",
  props: {
    payeeStatus: {
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
      statusOptions: []
    };
  },
  methods: {
    getPayeeStatusOptions() {
      payeeStatusOptions().then(res => {
        if (res.code === "success") {
          this.statusOptions = res.data;
        }
      });
    },
    changeHandler(e) {
      this.$emit("update:payeeStatus", e);
      this.$emit("change", e);
    }
  },
  mounted() {
    this.getPayeeStatusOptions();
  }
};
</script>