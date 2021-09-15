<template>
  <el-col :span="5" class="el-col">
    <label v-bind="$attrs">状态</label>
    <el-select
      class="el-inputs"
      :value="planStatus"
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
import { planStatusOption } from "@/api/fundPlansManage/selectOptions";
export default {
  name: "planStatusSelect2",
  props: {
    planStatus: {
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
      planStatusOption().then(res => {
        if (res.code === "success") {
          this.options = res.data;
        }
      });
    },
    changeHandler(e) {
      this.$emit("update:planStatus", e);
      this.$emit("change", e);
    }
  },
  mounted() {
    this.getOptions();
  }
};
</script>
