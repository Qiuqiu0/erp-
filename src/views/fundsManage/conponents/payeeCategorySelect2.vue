<template>
  <el-col :span="5" class="el-col">
    <label v-bind="$attrs">收款类别</label>
    <el-select
      class="el-inputs"
      :value="payeeCategory"
      placeholder="请选择"
      size="small"
      @change="changeHandler"
      :disabled="disable"
      clearable
    >
      <el-option
        v-for="item in option"
        :key="item.dict_key"
        :label="item.dict_value"
        :value="item.dict_key"
        :disabled="item.dict_key==10320020||item.dict_key==10320035"
      ></el-option>
    </el-select>
  </el-col>
</template>
<script>
import { payeeCategoryOptions } from "@/api/creditManage/selectOptions";
export default {
  name: "payeeCategorySelect2",
  props: {
    payeeCategory: {
      required: true,
      type: String | Number
    },
    disable: {
      type: Boolean,
      default: false
    },
    needFiltter:{
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      payeeCategoryOptions: []
    };
  },
  computed:{
    option(){
      let filterArray=this.needFiltter?[10320015,10320020,10320025,10320030,10320035]:[]
      return this.payeeCategoryOptions.filter(item => {
        return filterArray.findIndex(it => it === item.dict_key) === -1;
      });
    }
  },
  methods: {
    getPayeeCategoryOptions() {
      payeeCategoryOptions().then(res => {
        if (res.code === "success") {
          this.payeeCategoryOptions = res.data;
        }
      });
    },
    changeHandler(e) {
      this.$emit("update:payeeCategory", e);
      this.$emit("change", e);
    }
  },
  mounted() {
    this.getPayeeCategoryOptions();
  }
};
</script>

