<template>
  <el-col :span="5" class="el-col">
    <label v-bind="$attrs">认领状态</label>
    <el-select
      class="el-inputs"
      :value="sharedStatus"
      placeholder="请选择"
      @change="changeHandler"
      size="small"
      :disabled="disable"
      clearable
      multiple
      collapse-tags
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
export default {
  name: "sharedStatusSelect",
  props: {
    sharedStatus: {
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
      // 0-待认领  1-部分认领  2-完全认领
      options: [
        { dict_key: 0, dict_value: "待认领", dict_code: "0" },
        { dict_key: 1, dict_value: "部分认领", dict_code: "2" },
        { dict_key: 2, dict_value: "完全认领", dict_code: "1" }
      ]
    };
  },
  methods: {
    changeHandler(e) {
      this.$emit("update:sharedStatus", e);
      this.$emit("change", e);
    }
  }
};
</script>
