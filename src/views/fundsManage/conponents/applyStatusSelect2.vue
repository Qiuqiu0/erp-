<template>
  <el-col :span="5" class="el-col">
    <label v-bind="$attrs">状态</label>
    <el-select
      class="el-inputs"
      :value="applyStatus"
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
import { applyStatusOptions } from "@/api/creditManage/selectOptions";
export default {
  name: "applyStatusSelect2",
  props: {
    applyStatus: {
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
      applyStatusOptions().then(res => {
        if (res.code === "success") {
          this.options = res.data;
        }
      });
    },
    changeHandler(e) {
      this.$emit("update:applyStatus", e);
      this.$emit("change", e);
    }
  },
  mounted() {
    this.getOptions();
  }
};
</script>