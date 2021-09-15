<template>
  <el-col :span="5" class="el-col">
    <label v-bind="$attrs">{{labelName}}</label>
    <el-select
      :value="country"
      placeholder="请选择"
      @change="changeHandler"
      size="small"
      :disabled="disable"
      filterable
      clearable
    >
      <el-option
        v-for="item in options"
        :key="item.regionId"
        :label="item.regionName"
        :value="item.regionName"
        :disabled="item.disabled"
      ></el-option>
    </el-select>
  </el-col>
</template>
<script>
import { areaOptions } from "@/api/reportQuery/selectOptions";
export default {
  name: "countrySelect",
  props: {
    country: {
      required: true,
      type: String|Number
    },
    labelName: {
      type: String,
      default: "贸易国别"
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
      areaOptions().then(res => {
        if (res.code === "success") {
          this.options = res.data;
        }
      });
    },
    changeHandler(e) {
      this.$emit("update:country", e);
      this.$emit("change", e);
    }
  },
  mounted() {
    this.getOptions();
  }
};
</script>
