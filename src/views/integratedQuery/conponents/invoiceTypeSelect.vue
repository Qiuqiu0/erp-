<template>
  <el-col :span="5" class="el-col">
    <label v-bind="$attrs">{{labelName}}</label>
    <el-select
      :value="invoiceType"
      placeholder="请选择"
      @change="changeHandler"
      size="small"
      :disabled="disable"
      clearable
    >
      <el-option
        v-for="item in invoiceTypeList"
        :key="item.dict_key"
        :label="item.dict_value"
        :value="item.dict_key"
        :disabled="item.disabled"
      ></el-option>
    </el-select>
  </el-col>
</template>
<script>
import { invoiceTypeOptions } from "@/api/reportQuery/selectOptions";
export default {
  name: "invoiceTypeSelect",
  props: {
    invoiceType: {
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
    needFiltter: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      options: [],
      filterArr: [10700015,10700020]
    };
  },
  methods: {
    getOptions() {
      invoiceTypeOptions().then(res => {
        if (res.code === "success") {
          this.options = res.data;
        }
      });
    },
    changeHandler(e) {
      this.$emit("update:invoiceType", e);
      this.$emit("change", e);
    }
  },
  computed: {
    invoiceTypeList() {
      if (this.options.length === 0) return [];
      let template = this.needFiltter?this.filterArr:[];
      return this.options.filter(item => {
        return template.findIndex(it => it === item.dict_key) === -1;
      });
    }
  },
  mounted() {
    this.getOptions();
  }
};
</script>