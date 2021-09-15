<template>
  <el-col :span="5" class="el-col">
    <label v-bind="$attrs">{{labelName}}</label>
    <el-select
      :value="invoiceStatus"
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
import { poInvoiceStatusOptions,soInvoiceStatusOptions } from "@/api/reportQuery/selectOptions";
export default {
  name: "invoiceStatusSelect",
  props: {
    invoiceStatus: {
      required: true,
      type: String | Number
    },
    disable: {
      type: Boolean,
      default: false
    },
    labelName: {
      type: String,
      default: "发票状态"
    },
    isSales:{
      type:Boolean,
      default:true
    }
  },
  data() {
    return {
      options: []
    };
  },
  methods: {
    getOptions() {
      let api = this.isSales?soInvoiceStatusOptions:poInvoiceStatusOptions
      api().then(res => {
        if (res.code === "success") {
          this.options = res.data;
        }
      });
    },
    changeHandler(e) {
      this.$emit("update:invoiceStatus", e);
      this.$emit("change", e);
    }
  },
  mounted() {
    this.getOptions();
  }
};
</script>