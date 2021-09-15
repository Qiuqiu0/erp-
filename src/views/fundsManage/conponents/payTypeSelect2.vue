<template>
  <el-col :span="5" class="el-col">
    <label v-bind="$attrs">付款方式</label>
    <el-select
      style="marginBottom:0px;"
      class="el-inputs"
      filterable
      :value="payType"
      placeholder="请选择"
      size="small"
      @change="changeHandler"
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
import { payeeTypeOptions } from "@/api/creditManage/selectOptions";
export default {
  name: "payTypeSelect2",
  props: {
    payType: {
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
      payeeTypeOptions().then(res => {
        if (res.code === "success") {
          this.options = res.data.filter(item=>{
            return item.dict_key!==10310120 //去除应收款链
          });
        }
      });
    },
    changeHandler(e) {
      this.$emit("update:payType", e);
      this.$emit("change", e);
    }
  },
  mounted() {
    this.getOptions();
  }
};
</script>
