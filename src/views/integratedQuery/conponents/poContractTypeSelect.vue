<template>
  <el-col :span="5" class="el-col">
    <label v-bind="$attrs">{{labelName}}</label>
    <el-select
      :value="poContractType"
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
import { poContractTypeOptions } from "@/api/reportQuery/selectOptions";
export default {
  name: "poContractTypeSelect",
  props: {
    poContractType: {
      required: true,
      type: String | Number
    },
    disable: {
      type: Boolean,
      default: false
    },
    labelName: {
      type: String,
      default: "合同类型"
    },
    data:{
      type:Object,
    }
  },
  data() {
    return {
      options: []
    };
  },
  methods: {
    getOptions() {
      let data=this.data;
      poContractTypeOptions(data).then(res => {
        if (res.code === "success") {
          this.options = res.data;
        }
      });
    },
    changeHandler(e) {
      this.$emit("update:poContractType", e);
      this.$emit("change", e);
    }
  },
  mounted() {
    this.getOptions();
  }
};
</script>