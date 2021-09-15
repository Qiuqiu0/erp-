<template>
  <el-col :span="5" class="el-col">
    <label v-bind="$attrs">状态</label>
    <el-select
      class="el-inputs"
      :value="salesStatus"
      placeholder="请选择"
      @change="changeHandler"
      size="small"
      :disabled="disable"
      clearable
      multiple
      collapse-tags
    >
      <el-option
        v-for="item in filterOPtions"
        :key="item.dict_key"
        :label="item.dict_value"
        :value="item.dict_key"
        :disabled="item.disabled"
      ></el-option>
    </el-select>
  </el-col>
</template>
<script>
import { salesStatusOptions } from "@/api/creditManage/selectOptions";
export default {
  name: "salesStatusSelect",
  props: {
    salesStatus: {
      required: true,
      type: Array | Object
    },
    disable: {
      type: Boolean,
      default: false
    },
    filterStatus: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      options: [],
      filterAray: [10730010, 10730015, 10730020]
    };
  },
  methods: {
    getOptions() {
      salesStatusOptions().then(res => {
        if (res.code === "success") {
          this.options = res.data;
        }
      });
    },
    changeHandler(e) {
      this.$emit("update:salesStatus", e);
      this.$emit("change", e);
    }
  },
  computed: {
    filterOPtions() {
      if (this.options.length === 0) return [];
      let filterArr = [[], this.filterAray];
      let template = filterArr[this.filterStatus];
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
