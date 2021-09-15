<template>
  <el-col :span="5" class="el-col">
    <label v-bind="$attrs">票据类型</label>
    <zl-select
      class="el-inputs"
      :value="invoiceType"
      placeholder="请选择"
      @change="changeHandler"
      size="small"
      :disabled="disable"
      clearable
    >
      <zl-option
        v-for="item in filterOPtions"
        :key="item.dict_key"
        :label="item.dict_value"
        :value="item.dict_key"
        :disabled="item.disabled"
      ></zl-option>
    </zl-select>
  </el-col>
</template>
<script>
import { invoiceTypeOptions } from "@/api/creditManage/selectOptions";
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
    filterType: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      options: [],
      filterAray: [10870015]
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
    filterOPtions() {
      if (this.options.length === 0) return [];
      let filterArr = [[], this.filterAray];
      let template = filterArr[this.filterType];
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
