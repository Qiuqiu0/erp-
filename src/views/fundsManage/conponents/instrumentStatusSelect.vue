<template>
  <el-col :span="5" class="el-col">
    <label v-bind="$attrs">票据状态</label>
    <zl-select
      class="el-inputs"
      :value="instrumentStatus"
      placeholder="请选择"
      @change="changeHandler"
      size="small"
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
import { instrumentStatusOptions } from "@/api/creditManage/selectOptions";
export default {
  name: "instrumentStatusSelect",
  props: {
    instrumentStatus: {
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
      instrumentStatusOptions().then(res => {
        if (res.code === "success") {
          this.options = res.data;
        }
      });
    },
    changeHandler(e) {
      this.$emit("update:instrumentStatus", e);
      this.$emit("change", e);
    }
  },
  mounted() {
    this.getOptions();
  }
};
</script>
