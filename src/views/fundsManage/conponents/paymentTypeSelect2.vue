<template>
  <el-col :span="5" class="paymentTypeSelect">
    <label v-bind="$attrs">付款类别</label>
    <el-select
      style="marginBottom:0px;"
      class="el-inputs"
      :value="paymentType"
      placeholder="请选择"
      size="small"
      @change="changeHandler"
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
import { paymentTypeOptions } from "@/api/creditManage/selectOptions";
export default {
  name: "paymentTypeSelect2",
  props: {
    paymentType: {
      required: true,
      type: String | Number,
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
      disableSupplier: [10500005, 10500010,10500020, 10500030,10500045,10500050],
      disCustomer: [10500005,10500015, 10500025, 10500035, 10500040],
      disCustomer2:[10500005, 10500010,10500020, 10500025, 10500035, 10500040,10500030,10500045,10500050],
      disCustomer3:[10500010,10500025,10500030,10500035, 10500040,10500045,10500050]
    };
  },
  computed: {
    filterOPtions() {
      if (this.options.length === 0) return [];
      let filterArr = [[], this.disableSupplier, this.disCustomer,this.disCustomer2,this.disCustomer3];
      let template = filterArr[this.filterType];
      return this.options.filter(item => {
        return template.findIndex(it => it === item.dict_key) === -1;
      });

    }
  },
  methods: {
    getOptions() {
      paymentTypeOptions().then(res => {
        if (res.code === "success") {
          this.options = res.data || [];
          let paymentTypeList=[];
          res.data.forEach(e=>{
            let obj=new Object();
            obj.biz_category=e.biz_category;
             obj.dict_key=e.dict_key;
             obj.dict_name=e.dict_name;
             paymentTypeList.push(obj);
          })
          sessionStorage.setItem("paymentTypeList",JSON.stringify(paymentTypeList));
        }
      });
    },
    changeHandler(e) {
      this.$emit("update:paymentType", e);
      this.$emit("change", e);
    }
  },
  mounted() {
    this.getOptions();
  },
};
</script>
<style lang="scss" >
</style>
