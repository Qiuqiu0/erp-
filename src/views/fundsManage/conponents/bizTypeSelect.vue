<template>
  <el-col :span="needLabel?5:24">
    <label v-bind="$attrs" v-if="needLabel">{{labelName}}</label>
    <el-select
      filterable
      :value="bizType"
      clearable
      placeholder="请选择"
      class="el-inputs"
      size="small"
      @change="changeHandler"
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
import { bizTypeOption } from "@/api/fundPlansManage/selectOptions";
export default {
  name: "bizTypeSelect",
  props: {
    bizType: {
      required: true,
      type: String | Number
    },
    needLabel: {
      default: true,
      type: Boolean
    },
    labelName:{
      type:String,
      default:"业务类型"
    }
  },
  data() {
    return {
      options: []
    };
  },
  methods: {
    getOptions() {
      bizTypeOption().then(res => {
        if (res.code === "success") {
          this.options = res.data;
        }
      });
    },
    changeHandler(e) {
      this.$emit("update:bizType", e);
      this.$emit("change", e);
    }
  },
  mounted() {
    this.getOptions();
  }
};
</script>
<style lang="scss" >
</style>
