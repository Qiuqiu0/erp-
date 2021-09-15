<template>
  <el-col :span="5" class="el-col">
    <label v-bind="$attrs">{{labelName}}</label>
    <el-select
      :value="warehouseType"
      placeholder="请选择"
      @change="changeHandler"
      size="small"
      :disabled="disable"
      clearable
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
import { warehouseTypeOptions } from "@/api/reportQuery/selectOptions";
export default {
  name: "warehouseTypeSelect",
  props: {
    warehouseType: {
      required: true,
      type: String | Number
    },
    disable: {
      type: Boolean,
      default: false
    },
    labelName: {
      type: String,
      default: "业务类型"
    }
  },
  data() {
    return {
      options: []
    };
  },
  computed: {
    filterOPtions() {
      if (this.options.length === 0) return [];
      let filterArr = [
        10790005,
        10790080,
        10790175,
        10790190,
        10790196,
        10790165,
        10790140,
        10790090,
        10790180,
        10790185,
        10790195,
        10790050
      ];
      return this.options.filter(item => {
        return filterArr.findIndex(it => it === item.dict_key) !== -1;
      });
    }
  },
  methods: {
    getOptions() {
      warehouseTypeOptions().then(res => {
        if (res.code === "success") {
          this.options = res.data;
        }
      });
    },
    changeHandler(e) {
      this.$emit("update:warehouseType", e);
      this.$emit("change", e);
    }
  },
  mounted() {
    this.getOptions();
  }
};
</script>