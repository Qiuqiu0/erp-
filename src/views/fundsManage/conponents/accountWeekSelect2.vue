<template>
  <el-col :span="needLabel?5:24">
    <label v-bind="$attrs" v-if="needLabel">{{labelName}}</label>
    <el-select
      filterable
      :value="accountWeek"
      clearable
      placeholder="选择周"
      :disabled="disable"
      class="el-inputs"
      size="small"
      @change="changeHandler"
    >
      <el-option
        v-for="item in accountWeekOptions"
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
  name: "accountWeekSelect2",
  props: {
    accountWeek: {
      required: true,
      type: String | Number
    },
    needLabel: {
      default: true,
      type: Boolean
    },
    labelName: {
      type: String,
      default: "周数"
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
        { dict_key: 0, dict_value: "--",disabled:true },
        { dict_key: 1, dict_value: "第一周" },
        { dict_key: 2, dict_value: "第二周" },
        { dict_key: 3, dict_value: "第三周" },
        { dict_key: 4, dict_value: "第四周" },
        { dict_key: 5, dict_value: "第五周" }
      ]
    };
  },
  computed: {
    accountWeekOptions() {
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
      this.$emit("update:accountWeek", e);
      this.$emit("change", e);
    }
  }
};
</script>
