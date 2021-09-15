<template>
  <el-col :span="needLabel?5:24">
    <label v-bind="$attrs" v-if="needLabel">{{labelName}}</label>
    <el-select
      filterable
      :value="accountMonth"
      clearable
      placeholder="选择月"
      :disabled="disable"
      class="el-inputs"
      size="small"
      @change="changeHandler"
    >
      <el-option
        v-for="item in accountMonthOptions"
        :key="item.dict_key"
        :label="item.dict_value"
        :value="item.dict_key"
        :disabled="item.disabled"
      ></el-option>
    </el-select>
  </el-col>
</template>
<script>
export default {
  name: "accountMonthSelect2",
  props: {
    accountMonth: {
      required: true,
      type: String | Number
    },
    needLabel: {
      default: true,
      type: Boolean
    },
    labelName: {
      type: String,
      default: "月份"
    },
    isFilter: {
      type: Boolean,
      default: false
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      options: [
        { dict_key: 0, dict_value: "--" ,disabled:true},
        { dict_key: 1, dict_value: "一月" },
        { dict_key: 2, dict_value: "二月" },
        { dict_key: 3, dict_value: "三月" },
        { dict_key: 4, dict_value: "四月" },
        { dict_key: 5, dict_value: "五月" },
        { dict_key: 6, dict_value: "六月" },
        { dict_key: 7, dict_value: "七月" },
        { dict_key: 8, dict_value: "八月" },
        { dict_key: 9, dict_value: "九月" },
        { dict_key: 10, dict_value: "十月" },
        { dict_key: 11, dict_value: "十一月" },
        { dict_key: 12, dict_value: "十二月" }
      ]
    };
  },
  computed: {
    accountMonthOptions() {
      if (this.isFilter) {
        let arr = this.options.filter(item => {
          return item.dict_key !== 0;
        });
        return arr;
      } else {
        return this.options;
      }
    }
  },
  methods: {
    changeHandler(e) {
      this.$emit("update:accountMonth", e);
      this.$emit("change", e);
    }
  }
};
</script>
