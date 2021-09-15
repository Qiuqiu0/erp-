<template>
  <el-col :span="needLabel?5:24">
    <label v-bind="$attrs" v-if="needLabel">款项内容</label>
    <el-select
      filterable
      :value="cashContent"
      clearable
      placeholder="请选择"
      class="el-inputs"
      size="small"
      @change="changeHandler"
    >
      <el-option
        v-for="item in creditContentOptions"
        :key="item.dict_key"
        :label="item.dict_value"
        :value="item.dict_key"
        :disabled="item.disabled"
      ></el-option>
    </el-select>
  </el-col>
</template>
<script>
import { crashContentOptions } from "@/api/creditManage/selectOptions";
export default {
  name: "cashContentSelect2",
  props: {
    cashContent: {
      required: true,
      type: String | Number
    },
    needLabel: {
      default: true,
      type: Boolean
    }
  },
  data() {
    return {
      creditContentOptions: []
    };
  },
  methods: {
    getCrashContentOptions() {
      crashContentOptions().then(res => {
        if (res.code === "success") {
          this.creditContentOptions = res.data;
        }
      });
    },
    changeHandler(e) {
      this.$emit("update:cashContent", e);
      this.$emit("change", e);
    }
  },
  mounted() {
    this.getCrashContentOptions();
  }
};
</script>
<style lang="scss" >
</style>
